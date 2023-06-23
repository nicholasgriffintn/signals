/**
 * Sites database model.
 * See https://sequelize.org/v5/manual/models-definition.html to learn how to customize it.
 */
module.exports = function (sequelize, DataTypes) {
  const formResponse = sequelize.define(
    "formResponse",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      submittedfrom: {
        type: DataTypes.STRING,
      },
      payload: {
        type: DataTypes.JSONB,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      userInformationData: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {}
      },
      emailGUID: {
        type: DataTypes.UUID,
      },
      currentConverstationId: {
        type: DataTypes.UUID,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  formResponse.associate = (models) => {
    models.formResponse.belongsTo(models.formDefinition, {
      as: "definition",
      constraints: false,
    });
    models.formResponse.belongsTo(models.sites, {
      as: "site",
      constraints: false,
    });
    models.formResponse.belongsTo(models.session, {
      as: "session",
      constraints: false,
    });
  };

  return formResponse;
};
