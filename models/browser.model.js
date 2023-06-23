('use strict');
module.exports = (sequelize, DataTypes) => {
  const browser = sequelize.define(
    'browser',
    {
      name: {
        type: DataTypes.TEXT,
      },
      version: {
        type: DataTypes.TEXT,
      },
      major: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: true,
    }
  );
  browser.associate = function (models) {};

  return browser;
};
