const db = require('../../models');

const axios = require('axios');

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

exports.insertSite = async (req, res) => {
  const site = await db.sites.findOne({
    where: { siteId: req.body.siteId },
  });

  if (!site) {
    if (
      req.body.siteId &&
      req.body.siteUrl &&
      req.body.siteName &&
      req.body.siteLogo &&
      req.body.tenantUrl
    ) {
      const record = await db.sites.create({
        id: req.body.siteId,
        siteId: req.body.siteId,
        siteUrl: req.body.siteUrl,
        siteName: req.body.siteName,
        siteLogo: req.body.siteLogo,
        tenantUrl: req.body.tenantUrl,
      });

      if (record) {
        res.status(200);
        res.json({
          status: 'success',
          message: 'Site was created.',
          record: record,
        });
      } else {
        res.status(404);
        res.json({ status: 'error', message: 'No data was found.' });
      }
    } else {
      res.status(404);
      res.json({
        status: 'error',
        message: 'Required params were not provided.',
      });
    }
  } else {
    res.status(404);
    res.json({ status: 'error', message: 'Site already exists.' });
  }
};

exports.getAllSites = async (req, res) => {
  if (
    res.locals.user &&
    res.locals.user.roles &&
    res.locals.user.roles.includes('god')
  ) {
    const record = await db.sites.findAll({});

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

exports.getSite = async (req, res) => {
  if (
    res.locals.user &&
    isUserInTenant(res.locals.user, { id: req.params.id })
  ) {
    const site = await db.sites.findOne({
      where: { siteId: req.params.id },
    });

    if (site) {
      res.status(200);
      res.json(site);
    } else {
      res.status(404);
      res.json({ status: 'error', message: 'No data was found.' });
    }
  } else {
    res.status(403);
  }
};

exports.getSitePublic = async (req, res) => {
  const site = await db.sites.findOne({
    where: { siteId: req.params.id },
    attributes: ['siteId', 'siteName', 'siteUrl'],
    include: [
      {
        model: db.chat,
        as: 'chat',
      },
    ],
  });

  if (site) {
    res.status(200);
    res.json(site);
  } else {
    res.status(404);
    res.json({ status: 'error', message: 'No data was found.' });
  }
};

exports.createChatSettings = async (req, res) => {
  const bodyData = req.body;

  const site = await db.sites.findOne({
    where: { siteId: req.params.id },
    attributes: ['siteId', 'siteName', 'siteUrl'],
    include: [
      {
        model: db.chat,
        as: 'chat',
      },
    ],
  });

  if (site) {
    if (site.chat && site.chat.id) {
      res.status(500);
      res.json({
        status: 'error',
        message: 'This site already has a chat configured.',
      });
    }

    const record = await db.chat.create({
      siteId: req.params.id,
      openByDefault: bodyData.openByDefault,
      avatarIcon: bodyData.avatarIcon,
      mainColor: bodyData.mainColor,
      secondaryColor: bodyData.secondaryColor,
      sendButtonColor: bodyData.sendButtonColor,
      emailPlaceholder: bodyData.emailPlaceholder,
      messagePlaceholder: bodyData.messagePlaceholder,
      finalTitle: bodyData.finalTitle,
      finalSubTitle: bodyData.finalSubTitle,
      finalButtonText: bodyData.finalButtonText,
      showStatusCheckWidget: bodyData.showStatusCheckWidget,
      statusCheckAPI: bodyData.statusCheckAPI,
      showChangelogWidget: bodyData.showChangelogWidget,
      changelogAPI: bodyData.changelogAPI,
      chatProvider: bodyData.chatProvider,
      chatProviderSettings: bodyData.chatProviderSettings,
      converstationCardOptions: bodyData.converstationCardOptions,
      initialChatState: bodyData.initialChatState,
      chatHeaderTitle: bodyData.chatHeaderTitle,
      chatHeaderSubTitle: bodyData.chatHeaderSubTitle,
      initialChatMessage: bodyData.initialChatMessage,
      initialChatTitle: bodyData.initialChatTitle,
    });

    if (record) {
      const siteUpdate = site.update({ chatId: record.id });

      if (siteUpdate) {
        res.status(200);
        res.json({
          status: 'success',
          message: 'Chat link to site was created.',
          record: record,
          site: siteUpdate,
        });
      } else {
        res.status(404);
        res.json({ status: 'error', message: 'No data was found.' });
      }
    } else {
      res.status(404);
      res.json({ status: 'error', message: 'No data was found.' });
    }
  } else {
    res.status(404);
    res.json({ status: 'error', message: 'No data was found.' });
  }
};

exports.updateChatSettings = async (req, res) => {
  const bodyData = req.body;

  const chat = await db.chat.findOne({
    where: { siteId: req.params.siteId, id: req.params.id },
    include: [
      {
        model: db.sites,
        as: 'site',
      },
    ],
  });

  if (chat) {
    const record = await db.chat.create({
      openByDefault: bodyData.openByDefault || chat.openByDefault,
      avatarIcon: bodyData.avatarIcon || chat.avatarIcon,
      mainColor: bodyData.mainColor || chat.mainColor,
      secondaryColor: bodyData.secondaryColor || chat.secondaryColor,
      sendButtonColor: bodyData.sendButtonColor || chat.sendButtonColor,
      emailPlaceholder: bodyData.emailPlaceholder || chat.emailPlaceholder,
      messagePlaceholder:
        bodyData.messagePlaceholder || chat.messagePlaceholder,
      finalTitle: bodyData.finalTitle || chat.finalTitle,
      finalSubTitle: bodyData.finalSubTitle || chat.finalSubTitle,
      finalButtonText: bodyData.finalButtonText || chat.finalButtonText,
      showStatusCheckWidget:
        bodyData.showStatusCheckWidget || chat.showStatusCheckWidget,
      statusCheckAPI: bodyData.statusCheckAPI || chat.statusCheckAPI,
      showChangelogWidget:
        bodyData.showChangelogWidget || chat.showChangelogWidget,
      changelogAPI: bodyData.changelogAPI || chat.changelogAPI,
      chatProvider: bodyData.chatProvider || chat.chatProvider,
      chatProviderSettings:
        bodyData.chatProviderSettings || chat.chatProviderSettings,
      converstationCardOptions:
        bodyData.converstationCardOptions || chat.converstationCardOptions,
      initialChatState: bodyData.initialChatState || chat.initialChatState,
      chatHeaderTitle: bodyData.chatHeaderTitle || chat.chatHeaderTitle,
      chatHeaderSubTitle:
        bodyData.chatHeaderSubTitle || chat.chatHeaderSubTitle,
      initialChatMessage:
        bodyData.initialChatMessage || chat.initialChatMessage,
      initialChatTitle: bodyData.initialChatTitle || chat.initialChatTitle,
    });

    if (record) {
      res.status(200);
      res.json({ status: 'success', message: 'Chat updated successfully' });
    } else {
      res.status(404);
      res.json({ status: 'error', message: 'No data was found.' });
    }
  } else {
    res.status(404);
    res.json({ status: 'error', message: 'No data was found.' });
  }
};

exports.getZenDeskKnowledgeBase = async (req, res) => {
  const site = await db.sites.findOne({
    where: { siteId: req.params.siteId },
    include: [
      {
        model: db.chat,
        as: 'chat',
        include: [
          {
            model: db.zendesk,
            as: 'zendesk',
          },
        ],
      },
    ],
  });

  if (
    site &&
    site.chat &&
    site.chat[0] &&
    site.chat[0].zendesk &&
    site.chat[0].zendesk.dataValues
  ) {
    const zendeskData = site.chat[0].dataValues.zendesk.dataValues;
    const searchTerm = req.query;

    let zendeskQuery = '';

    if (!searchTerm || !searchTerm.title) {
      zendeskQuery += '?sort_by=updated_at&sort_order=desc';
    } else if (searchTerm.title) {
      zendeskQuery += '?sort_by=title&sort_order=desc';
    }

    if (searchTerm.startTime) {
      zendeskQuery += `&start_time=${searchTerm.startTime}`;
    }

    if (searchTerm.labels) {
      zendeskQuery += `&label_names=${searchTerm.labels}`;
    }

    axios
      .get(
        `${zendeskData.apiEndpoint}help_center/${
          zendeskData.locale || 'en-us'
        }/${
          searchTerm.starttime ? 'incremental/' : ''
        }articles.json${zendeskQuery}`,
        {
          headers: {
            Authorization: `Basic ${zendeskData.apiKey}`,
          },
        }
      )
      .then(function (response) {
        if (response.status === 200) {
          // handle success
          res.status(200);
          res.json({ status: 'success', response: response.data });
        } else {
          res.status(404);
          res.json({ status: 'error', message: 'No data was found.' });
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        res.status(404);
        res.json({ status: 'error', message: 'No data was found.' });
      });
  } else {
    res.status(404);
    res.json({ status: 'error', message: 'No site was found.' });
  }
};
