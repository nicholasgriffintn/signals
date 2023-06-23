const { v4: uuidv4 } = require('uuid');

const crypto = require('crypto');

function returnPublicPrivateKey() {
  return {
    privateKey: crypto.randomBytes(48).toString('hex'),
    publicKey: crypto.randomBytes(48).toString('hex'),
  };
}

('use strict');
module.exports = (sequelize, DataTypes) => {
  const sites = sequelize.define(
    'sites',
    {
      shared: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      siteId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
      },
      siteName: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      siteLogo: {
        type: DataTypes.TEXT,
        defaultValue: 'https://example.com/static/img/footer-logo-dark.svg',
      },
      siteUrl: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      tenantUrl: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      keys: {
        allowNull: false,
        type: DataTypes.JSONB,
        defaultValue: returnPublicPrivateKey(),
      },
    },
    {
      timestamps: true,
    }
  );
  sites.associate = function (models) {
    models.sites.hasMany(models.chat, {
      as: 'chat',
      constraints: false,
    });
  };

  return sites;
};
