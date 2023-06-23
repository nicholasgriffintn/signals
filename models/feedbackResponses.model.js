/**
 * Audit Log database model.
 * See https://sequelize.org/v5/manual/models-definition.html to learn how to customize it.
 */
module.exports = function (sequelize, DataTypes) {
  const feedbackResponse = sequelize.define(
    "feedbackResponse",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      feedbackResponse: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: []
      },
      userInformationData: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {}
      },
      submittedfrom: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "Submitted",
      },
      type: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "Submitted",
      },
      ticketNo: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "NA",
      },
      sprintNo: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "NA",
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
    },
  );

  feedbackResponse.associate = (models) => {
    models.feedbackResponse.belongsTo(models.feedbackDefinition, {
      as: "definition",
      constraints: false,
    });
    models.feedbackResponse.belongsTo(models.sites, {
      as: "site",
      constraints: false,
    });
    models.feedbackResponse.belongsTo(models.session, {
      as: "session",
      constraints: false,
    });
  };

  return feedbackResponse;
};
