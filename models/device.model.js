('use strict');
module.exports = (sequelize, DataTypes) => {
  const device = sequelize.define(
    'device',
    {
      vendor: {
        type: DataTypes.TEXT,
      },
      model: {
        type: DataTypes.TEXT,
      },
      type: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: true,
    }
  );
  device.associate = function (models) {};

  return device;
};
