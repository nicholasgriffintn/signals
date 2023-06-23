('use strict');
module.exports = (sequelize, DataTypes) => {
  const locale = sequelize.define(
    'locale',
    {
      name: {
        type: DataTypes.TEXT,
      },
      local: {
        type: DataTypes.TEXT,
      },
      location: {
        type: DataTypes.TEXT,
      },
      tag: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: true,
    }
  );
  locale.associate = function (models) {};

  return locale;
};
