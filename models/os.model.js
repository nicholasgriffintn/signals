('use strict');
module.exports = (sequelize, DataTypes) => {
  const os = sequelize.define(
    'os',
    {
      name: {
        type: DataTypes.TEXT,
      },
      version: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: true,
    }
  );
  os.associate = function (models) {};

  return os;
};
