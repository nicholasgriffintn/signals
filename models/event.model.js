('use strict');
module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define(
    'event',
    {
      type: {
        type: DataTypes.TEXT,
      },
      element: {
        type: DataTypes.JSONB,
      },
      category: {
        type: DataTypes.TEXT,
      },
      action: {
        type: DataTypes.TEXT,
      },
      label: {
        type: DataTypes.TEXT,
      },
      value: {
        type: DataTypes.TEXT,
      },
      referrer: {
        type: DataTypes.TEXT,
      },
      hash: {
        type: DataTypes.TEXT,
      },
      duration: {
        type: DataTypes.DECIMAL,
      },
      eventData: {
        allowNull: true,
        type: DataTypes.JSONB,
      },
    },
    {
      timestamps: true,
    }
  );
  event.associate = function (models) {
    models.event.belongsTo(models.session, {
      as: 'session',
      constraints: false,
    });
    models.event.belongsTo(models.sites, {
      as: 'site',
      constraints: false,
    });
  };

  return event;
};
