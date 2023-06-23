const Sequelize = require('sequelize');
const config = require('../config/db.config');

const env = process.env.NODE_ENV || 'development';

let models = {};

(async function (config) {
  if (Object.keys(models).length) {
    return models;
  }

  const sequelize = new Sequelize(
    config.DATABASE.database,
    config.DATABASE.username,
    config.DATABASE.password,
    config.DATABASE,
    {
      dialect: 'postgres',
      pool: {
        min: 0,
        max: 1,
        idle: 1000,
      },
    }
  );

  let modules = [
    require('./user.model.js'),
    require('./zendesk.model.js'),
    require('./chat.model.js'),
    require('./sites.model.js'),
    require('./browser.model.js'),
    require('./device.model.js'),
    require('./engine.model.js'),
    require('./event.model.js'),
    require('./locale.model.js'),
    require('./os.model.js'),
    require('./session.model.js'),
    require('./feedbackResponses.model.js'),
    require('./feedbackDefinitions.model.js'),
    require('./formDefinitions.model.js'),
    require('./formResponses.model.js'),
  ];

  modules.forEach((module) => {
    const model = module(sequelize, Sequelize, config);
    models[model.name] = model;
  });

  Object.keys(models).forEach((key) => {
    if ('associate' in models[key]) {
      models[key].associate(models);
    }
  });

  models.sequelize = sequelize;
  models.Sequelize = Sequelize;

  await sequelize.sync({ alter: true });

  return models;
})(config);

module.exports = models;
