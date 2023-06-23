('use strict');
module.exports = (sequelize, DataTypes) => {
  const engine = sequelize.define(
    'engine',
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
  engine.associate = function (models) {};

  return engine;
};
