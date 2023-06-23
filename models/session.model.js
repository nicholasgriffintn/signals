const { v4: uuidv4 } = require('uuid');

('use strict');
module.exports = (sequelize, DataTypes) => {
  const session = sequelize.define(
    'session',
    {
      sessionId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
      },
      userFullName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      userEmail: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      userIp: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: '1.1.1.1',
      },
      visitCounter: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      visitDate: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      referer: {
        allowNull: true,
        type: DataTypes.JSONB,
      },
      sessionScrap: {
        allowNull: true,
        type: DataTypes.JSONB,
      },
    },
    {
      timestamps: true,
    }
  );

  session.associate = function (models) {
    models.session.belongsTo(models.browser, {
      as: 'browser',
      constraints: false,
    });
    models.session.belongsTo(models.device, {
      as: 'device',
      constraints: false,
    });
    models.session.belongsTo(models.engine, {
      as: 'engine',
      constraints: false,
    });
    models.session.belongsTo(models.event, {
      as: 'event',
      constraints: false,
    });
    models.session.belongsTo(models.locale, {
      as: 'locale',
      constraints: false,
    });
    models.session.belongsTo(models.os, {
      as: 'os',
      constraints: false,
    });
    models.session.belongsTo(models.sites, {
      as: 'site',
      constraints: false,
    });
  };

  return session;
};
