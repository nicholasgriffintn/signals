('use strict');
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      firstname: {
        type: DataTypes.TEXT,
      },
      lastname: {
        type: DataTypes.TEXT,
      },
      email: {
        type: DataTypes.TEXT,
      },
      password: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: true,
    }
  );
  user.associate = function (models) {};

  return user;
};
