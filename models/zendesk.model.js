('use strict');
module.exports = (sequelize, DataTypes) => {
  const zendesk = sequelize.define(
    'zendesk',
    {
      apiKey: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      apiEndpoint: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      timestamps: true,
    }
  );
  zendesk.associate = function (models) {
    models.zendesk.hasMany(models.chat, {
      as: 'chat',
      constraints: false,
    });
  };

  return zendesk;
};
