const serverless = require('serverless-http');
const pkg = require('./package.json');

const express = require('express');
const cors = require('cors');

const axios = require('axios');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
const requestIp = require('request-ip');

const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_DEFAULT_ACCESS_KEY,
  secretAccessKey: process.env.AWS_DEFAULT_SECRET,
  region: process.env.AWS_SES_REGION,
});

const app = express();

// Add bodyParse middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add CORS middleware
app.options('*', cors());

// Add static folder
app.use(express.static('public'));

// Add Request IP middleware -> req.clientIp
app.use(requestIp.mw());

// Validate token
async function validateAccessToken(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        'https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_ikMKshN4Q/.well-known/jwks.json',
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => {
        const body = response.data;
        let pems = {};
        const keys = body['keys'];
        keys.forEach((key) => {
          const keyId = key.kid;
          const modulus = key.n;
          const exponent = key.e;
          const keyType = key.kty;
          const jwk = { kty: keyType, n: modulus, e: exponent };
          const pem = jwkToPem(jwk);
          pems[keyId] = pem;
        });
        const decodedJwt = jwt.decode(token, { complete: true });
        if (!decodedJwt) {
          reject('No token could be decoded');
        }
        const kid = decodedJwt['header'].kid;
        const pem = pems[kid];
        if (!pem) {
          reject('No token supplied');
        }
        jwt.verify(token, pem, (err, payload) => {
          if (err) {
            reject(err);
          } else {
            resolve(pem);
          }
        });
      });
  });
}

// Authentication
function checkUser(req, res, next) {
  // get  the token from headers
  let accessTokenFromClient = req.headers.accesstoken;

  //Fail if token not present in header.
  if (!accessTokenFromClient) {
    return res.status(401).send({
      status: 'error',
      message: 'no access token',
    });
  }

  // TODO: Restrict routes to users in admin groups

  validateAccessToken(accessTokenFromClient)
    .then((data) => {
      if (data) {
        // credentials have been authenticated. Proceed.
        axios
          .get('https://api.example.com/api/auth/me', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessTokenFromClient}`,
            },
          })
          .then((response) => {
            const body = response.data;

            if (body && body.id) {
              res.locals.user = body;

              next();
            } else {
              return res.status(401).send({
                status: 'error',
                message: 'No user found with those credentials.',
              });
            }
          });
      } else {
        return res.status(401).send({
          status: 'error',
          message: err,
        });
      }
    })
    .catch((err) => {
      return res.status(401).send({
        status: 'error',
        message: err,
      });
    });
}

// Add Utils APIs
app.options('/:siteId?/utils/verify-hcaptcha', cors());
// Utils controller and endpoints
const utilsController = require('./controllers/utils.controller');
app.post(
  '/:siteId?/utils/verify-hcaptcha',
  cors(),
  utilsController.verifyHCaptcha
);

// Add feedback APIs
// CORS
app.options('/:siteId?/feedback/definition', cors());
app.options('/:siteId?/feedback/definition/:definitionId', cors());
app.options('/:siteId?/feedback/response', cors());
app.options('/:siteId?/feedback/response/:definitionId', cors());
app.options('/:siteId?/feedback/response/:definitionId/:responseId', cors());
// Feedback controller and endpoints
const feedbackController = require('./controllers/feedback/feedback.controller');
app.post(
  '/:siteId?/feedback/definition',
  checkUser,
  cors(),
  feedbackController.createFeedbackDefinition
);
app.put(
  '/:siteId?/feedback/definition/:definitionId',
  checkUser,
  cors(),
  feedbackController.updateFeedbackDefinition
);
app.get(
  '/:siteId?/feedback/definition/:definitionId',
  cors(),
  feedbackController.getFeedbackDefinition
);
app.get(
  '/:siteId?/feedback/definition/',
  cors(),
  feedbackController.getAllFeedbackDefinitions
);

app.post(
  '/:siteId?/feedback/response/:definitionId',
  cors(),
  feedbackController.createFeedbackResponse
);
app.put(
  '/:siteId?/feedback/response/:definitionId/:responseId',
  checkUser,
  cors(),
  feedbackController.updateFeedbackResponse
);
app.get(
  '/:siteId?/feedback/response/:definitionId/:responseId',
  checkUser,
  cors(),
  feedbackController.getFeedbackResponse
);
app.get(
  '/:siteId?/feedback/response/:definitionId',
  checkUser,
  cors(),
  feedbackController.getAllFeedbackResponses
);

// Add form APIs
// CORS
app.options('/:siteId?/form/definition', cors());
app.options('/:siteId?/form/definition/:definitionId', cors());
app.options('/:siteId?/form/response', cors());
app.options('/:siteId?/form/response/:definitionId', cors());
app.options('/:siteId?/form/response/:definitionId/:responseId', cors());
// Feedback controller and endpoints
const formController = require('./controllers/form/form.controller');
app.post(
  '/:siteId?/form/definition',
  checkUser,
  cors(),
  formController.createFormDefinition
);
app.put(
  '/:siteId?/form/definition/:definitionId',
  checkUser,
  cors(),
  formController.updateFormDefinition
);
app.get(
  '/:siteId?/form/definition/:definitionId',
  cors(),
  formController.getFormDefinition
);
app.get(
  '/:siteId?/form/definition/',
  cors(),
  formController.getAllFormDefinitions
);

app.post(
  '/:siteId?/form/response/:definitionId',
  cors(),
  formController.createFormResponse
);
app.put(
  '/:siteId?/form/response/:definitionId/:responseId',
  checkUser,
  cors(),
  formController.updateFormResponse
);
app.get(
  '/:siteId?/form/response/:definitionId/:responseId',
  checkUser,
  cors(),
  formController.getFormResponse
);
app.get(
  '/:siteId?/form/response/:definitionId',
  checkUser,
  cors(),
  formController.getAllFormResponses
);

// Add sites APIs
// Site controller and endpoints
const sitesController = require('./controllers/sites/sites.controller');
app.post('/:siteId?/sites', checkUser, cors(), sitesController.insertSite);
app.get('/:siteId?/sites', checkUser, cors(), sitesController.getAllSites);
app.get('/:siteId?/sites/:id', checkUser, cors(), sitesController.getSite);
app.get('/:siteId?/sites/info/:id', cors(), sitesController.getSitePublic);
app.post(
  '/:siteId?/sites/chat',
  checkUser,
  cors(),
  sitesController.createChatSettings
);
app.put(
  '/:siteId?/sites/chat',
  checkUser,
  cors(),
  sitesController.updateChatSettings
);
app.get(
  '/:siteId?/sites/chat/zendesk-kb',
  cors(),
  sitesController.getZenDeskKnowledgeBase
);

// Add analytics APIs
// Session CORS
app.options('/:siteId?/analytics/sessions', cors());
app.options('/:siteId?/analytics/sessions/:id', cors());
app.options('/:siteId?/analytics/sessions_user/:id', cors());
app.options('/:siteId?/analytics/sessions_logged/:id', cors());
app.options('/:siteId?/analytics/sessions_contacted/:id', cors());
app.options('/:siteId?/analytics/sessions_pages/:id', cors());
app.options('/sessions_scrap/:id', cors());
// Users CORS
app.options('/:siteId?/analytics/users', cors());
app.options('/:siteId?/analytics/users/:id', cors());
app.options('/:siteId?/analytics/users_average', cors());
app.options('/:siteId?/analytics/users_average/:id', cors());
// Analytics Controller and endpoints
const sessionController = require('./controllers/analytics/session.controller');
app.post(
  '/:siteId?/analytics/sessions',
  cors(),
  sessionController.insertSession
);
app.get(
  '/:siteId?/analytics/sessions',
  checkUser,
  cors(),
  sessionController.getAllSessions
);
app.get(
  '/:siteId?/analytics/sessions/:id',
  cors(),
  sessionController.getSingleSession
);
app.get(
  '/:siteId?/analytics/sessions_user/:id',
  checkUser,
  cors(),
  sessionController.getAllUsersSessions
);
app.patch(
  '/:siteId?/analytics/sessions/:id',
  checkUser,
  sessionController.updateSession
);
app.post(
  '/:siteId?/analytics/sessions/:id/pageView',
  cors(),
  sessionController.addSessionPages
);
app.post(
  '/:siteId?/analytics/sessions/:id/event',
  cors(),
  sessionController.addEventItem
);
app.post(
  '/:siteId?/analytics/sessions/:id/event/:eventId/performance',
  cors(),
  sessionController.updateEventItemPerformance
);
app.post(
  '/:siteId?/analytics/sessions/:id/scrap',
  cors(),
  sessionController.addSessionScrap
);
app.delete(
  '/:siteId?/analytics/sessions/:id',
  checkUser,
  cors(),
  sessionController.deleteSession
);
const usersController = require('./controllers/analytics/user.controller');
app.get(
  '/:siteId?/analytics/users',
  checkUser,
  cors(),
  usersController.getAllUsers
);
app.get(
  '/:siteId?/analytics/users/:id',
  checkUser,
  cors(),
  usersController.getUser
);
app.get(
  '/:siteId?/analytics/users_average',
  checkUser,
  cors(),
  usersController.getAllAverage
);
app.get(
  '/:siteId?/analytics/users_average/:id',
  checkUser,
  cors(),
  usersController.getUserAverage
);

// Package Info
/* app.get('/package', cors(), function (req, res) {
  res.status(200).send({
    status: 'success',
    package: pkg,
  });
}); */

// Health Check
app.get('/health', cors(), function (req, res) {
  res.status(200).send({
    status: 'success',
    message: 'Signals is working.',
    version: pkg.version,
  });
});

// Home
app.get('/', cors(), function (req, res) {
  res.status(200).send({
    status: 'success',
    message:
      'Welcome to Signals, please check the API documentation for more information.',
    version: pkg.version,
  });
});

// Catch all
app.get('*', cors(), function (req, res) {
  res.status(404).send({
    status: 'error',
    message: 'No API could be found at this endpoint.',
    version: pkg.version,
  });
});

// Error Handeling
app.use((error, req, res, next) => {
  console.log('Error condition met');
  console.log('Path: ', req.path);
  console.error('Error: ', error);

  if (error.type == 'redirect') res.redirect('/error');
  else if (error.type == 'timeout') res.status(408).send(error);
  else res.status(500).send(error);
});

// Export the server
const handler = serverless(app);
module.exports.handler = async (event, context) => {
  // you can do other things here
  const result = await handler(event, context);
  // and here
  return result;
};
