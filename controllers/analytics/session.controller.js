const db = require('../../models');
const { v4: uuidv4 } = require('uuid');

const { parse } = require('../../utils/ua');
const { tag } = require('../../utils/locale');
const e = require('express');

/**
 * Check if user is in the tenant
 * @param {*} user
 * @param {*} tenant
 */
function isUserInTenant(user, tenant) {
  if (!user || !user.tenants) {
    return false;
  }

  if (!tenant || !tenant.id) {
    return true;
  }

  return user.tenants.some((tenantUser) => tenantUser.site.id === tenant.id);
}

exports.insertSession = async (req, res) => {
  const session = req.body;
  const {
    userId = uuidv4(),
    sessionId = uuidv4(),
    type,
    element,
    seed,
    language = 'en-GB',
    referrer,
    fingerprint,
    scrap = [],
  } = session;

  const ua = parse(req.headers['user-agent']);
  const locale = tag(language);

  if (req.params.siteId || seed) {
    const siteData = await db.sites.findByPk(req.params.siteId || seed);

    if (siteData && siteData.siteId) {
      let hasError = false;

      if (session && userId && sessionId && !hasError) {
        // Browser
        const browsers = await db.browser.findOrCreate({
          where: {
            name: ua.browser.name,
            version: ua.browser.version,
            major: ua.browser.major,
          },
          defaults: {
            name: ua.browser.name,
            version: ua.browser.version,
            major: ua.browser.major,
          },
        });
        const browser = browsers && browsers[0] ? browsers[0] : null;

        // Engine
        const engines = await db.engine.findOrCreate({
          where: {
            name: ua.engine.name,
            version: ua.engine.version,
          },
          defaults: { name: ua.engine.name, version: ua.engine.version },
        });
        const engine = engines && engines[0] ? engines[0] : null;

        // Os
        const oses = await db.os.findOrCreate({
          where: {
            name: ua.os.name,
            version: ua.os.version,
          },
          defaults: { name: ua.os.name, version: ua.os.version },
        });
        const os = oses && oses[0] ? oses[0] : null;

        // Create Device
        const devices = await db.device.findOrCreate({
          where: {
            vendor: ua.device.vendor,
            model: ua.device.model,
            type: ua.device.type,
          },
          defaults: {
            vendor: ua.device.vendor,
            model: ua.device.model,
            type: ua.device.type,
          },
        });
        const device = devices && devices[0] ? devices[0] : null;

        // Locale
        const locations = await db.locale.findOrCreate({
          where: {
            name: locale.name,
            local: locale.local,
            location: locale.location,
            tag: locale.tag,
          },
          defaults: {
            name: locale.name,
            local: locale.local,
            location: locale.location,
            tag: locale.tag,
          },
        });
        const location = locations && locations[0] ? locations[0] : null;

        // Create Event
        const event = await db.event.create({
          type: type,
          element: element,
          referrer: referrer || null,
          hash: fingerprint,
          sessionSessionId: sessionId,
          siteSiteId: req.params.siteId,
        });

        const newSession = {
          userId: userId,
          sessionId: sessionId,
          userIp: req.clientIp,
          device: device,
          browser: browser,
          engine: engine,
          os: os,
          device: device,
          location: location,
          referer: referrer,
          sessionScrap: scrap || [],
          siteSiteId: req.params.siteId || null,
          eventId: event.id,
          browserId: browser.id,
          engineId: engine.id,
          osId: os.id,
          deviceId: device.id,
          localeId: location.id,
        };

        const record = await db.session.create(newSession);

        if (record) {
          res.status(200);
          res.json({
            status: 'success',
            message: 'Session was created.',
            sessionID: record.sessionId,
            userId: record.userId,
            siteSiteId: record.siteSiteId,
          });
        } else {
          res.status(404);
          res.json({ status: 'error', message: 'No data was found.' });
        }
      } else if (!hasError) {
        res.status(404);
        res.json({
          status: 'error',
          message: 'Required params were not provided.',
          session,
          userId,
          sessionId,
          hasError,
        });
      }
    } else {
      res.status(404);
      res.json({
        status: 'error',
        message: 'No site was found with that ID',
      });
    }
  } else {
    res.status(404);
    res.json({
      status: 'error',
      message: 'No site ID was provided',
    });
  }
};

exports.getAllSessions = async (req, res) => {
  if (
    res.locals.user &&
    isUserInTenant(res.locals.user, { id: req.params.siteId })
  ) {
    const record = await db.session.findAll({
      includes: ['browser', 'engine', 'os', 'device', 'locale'],
      where: {
        siteSiteId: req.params.siteId,
      },
    });

    if (record) {
      res.status(200);
      res.json(record);
    } else {
      res.status(404);
      res.json({ status: 'error', message: 'No data was found.' });
    }
  } else {
    res.status(403);
  }
};

exports.getSingleSession = async (req, res) => {
  const record = await db.session.findOne({
    includes: ['browser', 'engine', 'os', 'device', 'locale'],
    where: { siteSiteId: req.params.siteId, sessionId: req.params.id },
    attributes: ['sessionId', 'userId'],
  });

  if (record) {
    res.status(200);
    res.json(record);
  } else {
    res.status(404);
    res.json({ status: 'error', message: 'No data was found.' });
  }
};

exports.getAllUsersSessions = async (req, res) => {
  if (
    res.locals.user &&
    isUserInTenant(res.locals.user, { id: req.params.siteId })
  ) {
    const record = await db.session.findAll({
      includes: ['browser', 'engine', 'os', 'device', 'locale'],
      where: { siteSiteId: req.params.siteId, userId: req.params.id },
    });

    if (record) {
      res.status(200);
      res.json(record);
    } else {
      res.status(404);
      res.json({ status: 'error', message: 'No data was found.' });
    }
  } else {
    res.status(403);
  }
};

exports.updateSession = async (req, res) => {
  if (
    res.locals.user &&
    isUserInTenant(res.locals.user, { id: req.params.siteId })
  ) {
    const session = await db.session.findOne({
      includes: ['browser', 'engine', 'os', 'device', 'locale'],
      where: { siteSiteId: req.params.siteId, sessionId: req.params.id },
    });

    if (session) {
      if (req.body.userId !== undefined) {
        if (typeof req.body.userId !== 'string') {
          res.status(404);
          res.json('Incorrect user id format');
        } else {
          await session.update({
            userId: req.body.userId,
          });
        }
      }
      if (req.body.userIp !== undefined) {
        if (typeof req.body.userIp !== 'string') {
          res.status(404);
          res.json('Incorrect user ip format');
        } else {
          await session.update({
            userIp: req.body.userIp,
          });
        }
      }
      if (req.body.device !== undefined) {
        await session.update({
          deviceId: req.body.device,
        });
      }
      if (req.body.browser !== undefined) {
        await session.update({
          browserId: req.body.browser,
        });
      }
      if (req.body.location !== undefined) {
        await session.update({
          localeId: req.body.location,
        });
      }
      if (req.body.referer !== undefined) {
        if (typeof req.body.referer !== 'string') {
          res.body.status(404);
          res.json('Incorrect referer format');
        } else {
          await session.update({
            referer: req.body.referer,
          });
        }
      }
      if (req.body.sessionScrap !== undefined) {
        if (req.body.sessionScrap.mouseX && req.body.sessionScrap.mouseX < 0) {
          res.status(404);
          res.json('Mouse position cant be negative');
        } else if (
          req.body.sessionScrap.mouseY &&
          req.body.sessionScrap.mouseY < 0
        ) {
          res.status(404);
          res.json('Mouse position cant be negative');
        } else if (
          req.body.sessionScrap.windowWidth &&
          req.body.sessionScrap.windowWidth <= 0
        ) {
          res.status(404);
          res.json('Window width must be higher than 0');
        } else if (
          req.body.sessionScrap.windowHeigth &&
          req.body.sessionScrap.windowHeigth <= 0
        ) {
          res.status(404);
          res.json('Window height must be higher than 0');
        } else if (
          req.body.sessionScrap.scrollTopPosition &&
          req.body.sessionScrap.scrollTopPosition < 0
        ) {
          res.status(404);
          res.json('Scroll position cant be negative');
        } else if (
          req.body.sessionScrap.windowWidth &&
          typeof req.body.sessionScrap.windowWidth !== 'number'
        ) {
          res.status(404);
          res.json('Window width incorrect format');
        } else if (
          req.body.sessionScrap.windowHeigth &&
          typeof req.body.sessionScrap.windowHeigth !== 'number'
        ) {
          res.status(404);
          res.json('Window height incorrect format');
        } else if (
          req.body.sessionScrap.currentPage &&
          typeof req.body.sessionScrap.currentPage !== 'string'
        ) {
          res.status(404);
          res.json('Incorrect current page format');
        } else if (
          req.body.sessionScrap.scrollTopPosition &&
          typeof req.body.sessionScrap.scrollTopPosition !== 'number'
        ) {
          res.status(404);
          res.json('Incorrect scroll top position format');
        } else if (
          req.body.sessionScrap.mouseX &&
          typeof req.body.sessionScrap.mouseX !== 'number'
        ) {
          res.status(404);
          res.json('Mouse X position incorrect format');
        } else if (
          req.body.sessionScrap.mouseY &&
          typeof req.body.sessionScrap.mouseY !== 'number'
        ) {
          res.status(404);
          res.json('Mouse Y position incorrect format');
        } else if (
          req.body.sessionScrap.clickedItemId &&
          typeof req.body.sessionScrap.clickedItemId !== 'string'
        ) {
          res.status(404);
          res.json('Clicked Item Id incorrect format');
        } else {
          await session.update({
            sessionScrap: req.body.sessionScrap,
          });
        }
      }

      res.status(200);
      res.json({
        status: 'success',
        message: 'Session updated',
        sessionID: session.sessionId,
        userId: session.userId,
        siteSiteId: session.siteSiteId,
      });
    } else {
      res.status(404);
      res.json({ status: 'error', message: 'No session was found.' });
    }
  } else {
    res.status(403);
  }
};

exports.addSessionPages = async (req, res) => {
  const { element, referrer, fingerprint } = req.body;

  if (!element) {
    res.status(404);
    res.json('Page data is required');
  } else {
    const session = await db.session.findOne({
      where: { siteSiteId: req.params.siteId, sessionId: req.params.id },
    });

    if (session) {
      // Create Event
      const event = await db.event.create({
        type: 'pageView',
        element,
        category: '',
        action: '',
        label: '',
        value: '',
        referrer: referrer || null,
        hash: fingerprint,
        sessionSessionId: session.sessionId,
        siteSiteId: req.params.siteId,
      });

      res.status(200);
      res.json({
        status: 'success',
        message: 'Session updated',
        sessionID: session.sessionId,
        userId: session.userId,
        siteSiteId: session.siteSiteId,
        eventId: event.id,
      });
    } else {
      res.status(404);
      res.json({ status: 'error', message: 'No session was found.' });
    }
  }
};

exports.addEventItem = async (req, res) => {
  const {
    timeOn,
    referrer,
    fingerprint,
    element,
    category,
    action,
    label,
    value,
    eventData,
  } = req.body;

  if (!category || category === '') {
    res.status(404);
    res.json('Event category must not be empty');
  } else if (typeof category !== 'string') {
    res.status(404);
    res.json('Event category must be a string');
  } else if (!action || action === '') {
    res.status(404);
    res.json('Event action must not be empty');
  } else if (typeof action !== 'string') {
    res.status(404);
    res.json('Event action must be a string');
  } else if (!label || label === '') {
    res.status(404);
    res.json('Event label must not be empty');
  } else if (typeof label !== 'string') {
    res.status(404);
    res.json('Event label must be a string');
  } else if (value && typeof value !== 'number') {
    res.status(404);
    res.json('Event value must be a number');
  } else {
    const session = await db.session.findOne({
      where: { siteSiteId: req.params.siteId, sessionId: req.params.id },
    });

    if (session) {
      // Create Event
      const event = await db.event.create({
        type: 'event',
        element,
        eventData,
        category: category,
        action: action,
        label: label,
        value: value,
        duration: timeOn,
        referrer: referrer || null,
        hash: fingerprint,
        sessionSessionId: session.sessionId,
        siteSiteId: req.params.siteId,
      });

      res.status(200);
      res.json({
        status: 'success',
        message: 'Session updated',
        sessionID: session.sessionId,
        userId: session.userId,
        siteSiteId: session.siteSiteId,
        eventId: event.id,
      });
    } else {
      res.status(404);
      res.json({ status: 'error', message: 'No session was found.' });
    }
  }
};

exports.updateEventItemPerformance = async (req, res) => {
  const { duration } = req.body;
  const eventId = req.params.eventId;

  if (!eventId) {
    res.status(404);
    res.json('Event id must not be empty');
  } else if (!duration) {
    res.status(404);
    res.json('Duration must not be empty');
  } else {
    const event = await db.event.findOne({
      where: {
        id: eventId,
        siteSiteId: req.params.siteId,
        sessionSessionId: req.params.id,
      },
    });

    if (!event) {
      res.status(404);
      res.json('Event could not be found');
    } else {
      event.update({
        duration,
      });

      res.status(200);
      res.json({
        status: 'success',
        message: 'Event performance updated',
        sessionID: event.sessionSessionId,
        siteSiteId: event.siteSiteId,
        eventId: event.id,
      });
    }
  }
};

exports.addSessionScrap = async (req, res) => {
  if (req.body.mouseX && req.body.mouseX < 0) {
    res.status(404);
    res.json('Mouse position cant be negative');
  } else if (req.body.mouseY && req.body.mouseY < 0) {
    res.status(404);
    res.json('Mouse position cant be negative');
  } else if (req.body.windowWidth && req.body.windowWidth <= 0) {
    res.status(404);
    res.json('Window width must be higher than 0');
  } else if (req.body.windowHeight && req.body.windowHeight <= 0) {
    res.status(404);
    res.json('Window height must be higher than 0');
  } else if (req.body.scrollTopPosition && req.body.scrollTopPosition < 0) {
    res.status(404);
    res.json('Scroll position cant be negative');
  } else {
    const session = await db.session.findOne({
      where: { siteSiteId: req.params.siteId, sessionId: req.params.id },
    });
    if (session) {
      const bodyData = req.body;

      await session.update({
        sessionScrap: { ...session.sessionScrap, ...bodyData },
      });

      res.status(200);
      res.json({
        status: 'success',
        message: 'Session updated',
        sessionID: session.sessionId,
        userId: session.userId,
        siteSiteId: session.siteSiteId,
      });
    } else {
      res.status(404);
      res.json({ status: 'error', message: 'No session was found.' });
    }
  }
};

exports.deleteSession = async (req, res) => {
  const sessions = await db.session.destroy({
    where: {
      siteSiteId: req.params.siteId,
      sessionId: req.params.id,
    },
  });
  res.status(200);
  res.json(sessions.length + ' session(s) deleted');
};
