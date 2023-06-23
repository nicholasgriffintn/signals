const { json } = require("body-parser");
const db = require("../../models");

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

function getMostOfAverage(
  mostUsedDevices = [],
  mostUsedBrowsers = [],
  mostPopularLocations = [],
  mostPopularreferers = [],
  averageTimeOnPages = [],
  eventData = []
) {
  return {
    mostUsedDevice: getMostPopular(mostUsedDevices),
    mostUsedBrowser: getMostPopular(mostUsedBrowsers),
    mostPopularLocation: getMostPopular(mostPopularLocations),
    mostPopularreferer: getMostPopular(mostPopularreferers),
    averageTimeOnPages: getAverage(averageTimeOnPages),
    aveventData: getMostPopular(eventData),
  };
}

function getAverage(array = []) {
  return getSum(array) / array.length || 0;
}

function getSum(array = []) {
  return array.reduce((a, b) => a + b, 0);
}

function getMostPopular(array) {
  const frequency = {};
  let max = 0;
  let result = [];
  array.forEach(function (a) {
    frequency[a] = (frequency[a] || 0) + 1;
    if (frequency[a] > max) {
      max = frequency[a];
      result = [a];
      return;
    }
    if (frequency[a] === max) {
      result.push(a);
    }
  });
  return result[0];
}

function getMostPopularBool(array = []) {
  const frequency = {};
  let max = 0;
  let result = [];
  array.forEach(function (value) {
    let a;
    if (value === true) a = 1;
    else a = 0;
    frequency[a] = (frequency[a] || 0) + 1;
    if (frequency[a] > max) {
      max = frequency[a];
      result = [a];
      return;
    }
    if (frequency[a] === max) {
      result.push(a);
    }
  });
  if (result[0] === 1) return true;
  else return false;
}

function sumTimeOnPages(pages) {
  let uniquePagesList = getUniquePages(pages);
  if (!(pages == null))
    pages.forEach((page) => {
      for (let i = 0; i < uniquePagesList.length; i++) {
        if (uniquePagesList[i].name === page.name)
          uniquePagesList[i].timeOn = uniquePagesList[i].timeOn + page.timeOn;
      }
    });
  return uniquePagesList;
}

function getUniquePages(pages) {
  let uniquePagesList = [];
  let pagesWithDubs = [];
  if (!(pages == null)) {
    pages.forEach((page) => {
      pagesWithDubs.push(page.name);
    });
  }
  const uniquePages = new Set(pagesWithDubs);
  const uniquePagesArray = [...uniquePages].forEach((pageName) => {
    uniquePagesList.push({ name: pageName, timeOn: 0 });
  });
  return uniquePagesList;
}

function removeDuplicates(array) {
  let sortedArray = [];
  const uniquesArray = new Set(array);
  sortedArray = [...uniquesArray];
  return sortedArray;
}


exports.getAllUsers = async (req, res) => {
  if (res.locals.user && isUserInTenant(res.locals.user, { id: req.params.siteId })) {
    const record = await db.session.findAll({
      where: {
        siteSiteId: req.params.siteId
      }
    });

    if (record && record.length > 0) {
      let userList = [];

      let pages = [];
      let eventData = [];
      const sessionIds = [];
      const visitDates = [];
      const noSortDevices = [];
      const noSortBrowsers = [];
      const noSortLocations = [];
      const noSortRefferers = [];

      record.forEach((name) => userList.push(name.userId));

      const uniqueUsers = new Set(userList);

      userList = [...uniqueUsers];

      const newUsers = userList.forEach(async (user) => {
        const record = await db.session.findAll({
          where: { siteSiteId: req.params.siteId, userId: user },
        });

        if (record) {
          record.forEach((ss) => {
            sessionIds.push(ss.sessionId);
            visitDates.push(ss.visitDate);
            noSortDevices.push(ss.device);
            noSortBrowsers.push(ss.browser);
            noSortLocations.push(ss.location);
            noSortRefferers.push(ss.referer);
            if (ss.pages !== null) {
              if (ss.pages.length !== 0) {
                ss.pages.forEach((page) => pages.push(page));
              }
            }
            if (ss.eventData !== null) {
              if (ss.eventData.length !== 0) {
                ss.eventData.forEach((eventItem) => eventData.push(eventItem));
              }
            }
          });
        } else {
          res.status(404);
          res.json({ status: "error", message: "No data was found." });
        }
      });
      setTimeout(() => {
        const visits = record.length;
        const devices = removeDuplicates(noSortDevices);
        const browsers = removeDuplicates(noSortBrowsers);
        const locations = removeDuplicates(noSortLocations);
        const referers = removeDuplicates(noSortRefferers);

        pages = sumTimeOnPages(pages);
        res.status(200);
        res.json({
          visits: visits,
          sessionIds: sessionIds,
          visitDates: visitDates,
          devices: devices,
          browsers: browsers,
          locations: locations,
          referers: referers,
          pages: pages,
          eventData: eventData,
        });
      }, 3000);
    } else {
      res.status(404);
      res.json({ status: "error", message: "No data was found." });
    }
  } else {
    res.status(403);
  }
};

exports.getUser = async (req, res) => {
  if (res.locals.user && isUserInTenant(res.locals.user, { id: req.params.siteId })) {
    let length = 0;
    let pages = [];
    let eventData = [];
    const sessionIds = [];
    const visitDates = [];
    const noSortDevices = [];
    const noSortBrowsers = [];
    const noSortLocations = [];
    const noSortRefferers = [];

    const session = await db.session.findAll({
      where: { siteSiteId: req.params.siteId, userId: req.params.id },
    });

    if (session) {
      length = session.length;
      const newSessions = session.forEach((ss) => {
        sessionIds.push(ss.sessionId);
        visitDates.push(ss.visitDate);
        noSortDevices.push(ss.device);
        noSortBrowsers.push(ss.browser);
        noSortLocations.push(ss.location);
        noSortRefferers.push(ss.referer);
        if (ss.pages !== null) {
          if (ss.pages.length !== 0) {
            ss.pages.forEach((page) => pages.push(page));
          }
        }
        if (ss.eventData !== null) {
          if (ss.eventData.length !== 0) {
            ss.eventData.forEach((eventItem) => eventData.push(eventItem));
          }
        }
      });
      const visits = length;
      const devices = removeDuplicates(noSortDevices);
      const browsers = removeDuplicates(noSortBrowsers);
      const locations = removeDuplicates(noSortLocations);
      const referers = removeDuplicates(noSortRefferers);

      pages = sumTimeOnPages(pages);
      res.status(200);
      res.json({
        visits: visits,
        sessionIds: sessionIds,
        visitDates: visitDates,
        devices: devices[0],
        browsers: browsers[0],
        locations: locations[0],
        referers: referers[0],
        pages: pages,
        eventData: eventData,
      });
    } else {
      res.status(404);
      res.json({ status: "error", message: "No data was found." });
    }
  } else {
    res.status(403);
  }
};

exports.getAllAverage = async (req, res) => {
  if (res.locals.user && isUserInTenant(res.locals.user, { id: req.params.siteId })) {
    let mostUsedDevices = [];
    let mostUsedBrowsers = [];
    let mostPopularLocations = [];
    let mostPopularreferers = [];
    let averageTimeOnPages = [];
    let averageEvents = [];
    let mostlyLogged = [];

    const record = await db.session.findAll({
      where: {
        siteSiteId: req.params.siteId
      }
    });

    if (record) {
      let userList = [];
      record.forEach((name) => userList.push(name.userId));
      const uniqueUsers = new Set(userList);
      userList = [...uniqueUsers];

      let ips = [];
      let devices = [];
      let browsers = [];
      let locations = [];
      let referers = [];
      let loggeds = [];
      let timeOnPages = [];
      let eventData = [];

      userList.map(async (userId) => {
        const sessions = await db.session.findAll({ where: { siteSiteId: req.params.siteId, userId: userId } });
        sessions.forEach((ss) => {
          if (ss.userIp !== undefined && ss.userIp !== null) ips.push(ss.userIp);
          if (ss.device !== undefined && ss.device !== null)
            devices.push(ss.device);
          if (ss.browser !== undefined && ss.browser !== null)
            browsers.push(ss.browser);
          if (ss.location !== undefined && ss.location !== null)
            locations.push(ss.location);
          if (ss.referer !== undefined && ss.referer !== null)
            referers.push(ss.referer);
          if (ss.pages !== null && ss.pages !== undefined) {
            ss.pages.forEach((page) => {
              if (page !== null && page !== undefined)
                timeOnPages.push(page.timeOn);
            });
          }
          if (ss.eventData !== null && ss.eventData !== undefined) {
            ss.eventData.forEach((eventItem) => {
              if (eventItem !== null && eventItem !== undefined) {
                eventData.push(eventItem.itemAction);
              }
            });
          }
          if (ss.didLogged !== undefined && ss.didLogged !== null)
            loggeds.push(ss.didLogged);
        });

        if (devices >= 1) mostUsedDevices.push(getMostPopular(devices));
        if (browsers >= 1) mostUsedBrowsers.push(getMostPopular(browsers));
        if (locations >= 1) mostPopularLocations.push(getMostPopular(locations));
        if (referers >= 1) mostPopularreferers.push(getMostPopular(referers));
        if (timeOnPages >= 1) averageTimeOnPages.push(getAverage(timeOnPages));
        if (eventData && eventData.length >= 1)
          averageEvents.push(getMostPopular(eventData));
        if (loggeds >= 1) mostlyLogged.push(getMostPopularBool(loggeds));

        res.status(200);
        res.json(
          getMostOfAverage(
            devices,
            browsers,
            locations,
            referers,
            timeOnPages,
            eventData,
            loggeds
          )
        );
      });
    } else {
      res.status(404);
      res.json({ status: "error", message: "No data was found." });
    }
  } else {
    res.status(403)
  }
};

exports.getUserAverage = async (req, res) => {
  if (res.locals.user && isUserInTenant(res.locals.user, { id: req.params.siteId })) {
    const record = await db.session.findAll({
      where: {
        siteSiteId: req.params.siteId
      }
    });

    if (record) {
      let userList = [];
      record.forEach((name) => userList.push(name.userId));
      const uniqueUsers = new Set(userList);
      userList = [...uniqueUsers];

      let ips = [];
      let devices = [];
      let browsers = [];
      let locations = [];
      let referers = [];
      let loggeds = [];
      let eventData = [];
      let timeOnPages = [];

      userList.map(async (userId) => {
        const sessions = await db.session.findAll({ where: { siteSiteId: req.params.siteId, userId: userId } });

        sessions.forEach((ss) => {
          if (ss.userIp !== undefined && ss.userIp !== null) ips.push(ss.userIp);
          if (ss.device !== undefined && ss.device !== null)
            devices.push(ss.device);
          if (ss.browser !== undefined && ss.browser !== null)
            browsers.push(ss.browser);
          if (ss.location !== undefined && ss.location !== null)
            locations.push(ss.location);
          if (ss.referer !== undefined && ss.referer !== null)
            referers.push(ss.referer);
          if (ss.pages !== null && ss.pages !== undefined) {
            ss.pages.forEach((page) => {
              if (page !== null && page !== undefined)
                timeOnPages.push(page.timeOn);
            });
          }
          if (ss.eventData !== null && ss.eventData !== undefined) {
            ss.eventData.forEach((eventItem) => {
              if (eventItem !== null && eventItem !== undefined) {
                eventData.push(eventItem.itemAction);
              }
            });
          }
        });
      });
      setTimeout(() => {
        res.status(200);
        res.json({
          userId: req.params.userId,
          userIp: getMostPopular(ips),
          mostUsedDevice: getMostPopular(devices),
          mostUsedBrowser: getMostPopular(browsers),
          mostPopularLocation: getMostPopular(locations),
          mostPopularreferer: getMostPopular(referers),
          averageTimeOnPages: getAverage(timeOnPages),
          aveventData: getMostPopular(eventData),
        });
      }, 1000);
    } else {
      res.status(404);
      res.json({ status: "error", message: "No data was found." });
    }
  } else {
    res.status(403);
  }
};