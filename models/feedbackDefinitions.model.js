/**
 * Audit Log database model.
 * See https://sequelize.org/v5/manual/models-definition.html to learn how to customize it.
 */
module.exports = function (sequelize, DataTypes) {
  const feedbackDefinition = sequelize.define(
    "feedbackDefinition",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      formsProvider: {
        type: DataTypes.TEXT,
        defaultValue: "Signals",
        validate: {
          isIn: [["Standard", "Canvas", "Signals"]],
        },
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "public",
        allowNull: true,
      },
      definitionkey: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      definitionrevision: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      triggerOnPageURL: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      triggerOnEvent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      triggerParams: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: []
      },
      feedbackType: {
        type: DataTypes.TEXT,
        defaultValue: "Feedback",
        validate: {
          isIn: [["Comment", "Feedback", "Rating"]],
        },
      },
      feedbackDefinition: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: [
          {
            "category": "Signals",
            "settings": {
              "formTitle": "What's your feedback",
              "displayFormTitle": false,
              "sendEmailConfirmation": false,
              "submissionDestination": null,
              "emailConfirmationMessage": "We have recieved your feedback and will reply if necessary soon.",
              "emailConfirmationSubject": "Thanks for sending your feedback"
            },
            "fields": [
              {
                "typeField": "text",
                "label": "First Name",
                "required": false,
                "type": "text",
                "name": "field_p_1617274430916",
                "class": "",
                "tipText": "",
                "regex": "",
                "placeholder": "Please enter your first name",
                "value": "",
                "min_length": "",
                "max_length": "",
                "suffix": ""
              },
              {
                "typeField": "text",
                "label": "Last Name",
                "required": false,
                "type": "text",
                "name": "field_mh_1617274447729",
                "class": "",
                "tipText": "",
                "regex": "",
                "placeholder": "Please enter your last name",
                "value": "",
                "min_length": "",
                "max_length": "",
                "suffix": ""
              },
              {
                "typeField": "text",
                "label": "Email",
                "required": true,
                "type": "email",
                "name": "field_7_1617274463795",
                "class": "",
                "tipText": "",
                "regex": "",
                "placeholder": "Enter your email address",
                "value": "",
                "min_length": "",
                "max_length": "",
                "suffix": ""
              },
              {
                "typeField": "radio",
                "label": "How would you rate our services?",
                "required": true,
                "options": [
                  { "pos": 1, "label": "Very Satisfied", "value": "Very Satisfied" },
                  { "pos": 2, "label": "Satisfied", "value": "Satisfied" },
                  { "pos": 4, "label": "Unsatisfied", "value": "Unsatisfied" },
                  { "pos": 6, "label": "Very Unsatisfied", "value": "Very Unsatisfied" }
                ],
                "name": "field_0u_1617274482101",
                "class": "",
                "tipText": "",
                "placeholder": "",
                "value": ""
              },
              {
                "typeField": "textArea",
                "label": "Do you have any additional feedback?",
                "required": false,
                "name": "field_8v_1617274558701",
                "class": "",
                "tipText": "",
                "regex": "",
                "placeholder": "",
                "value": "",
                "min_length": "",
                "max_length": "",
                "cols": "6",
                "rows": "3"
              },
              {
                "typeField": "button",
                "label": "Submit Feedback",
                "type": "submit",
                "class": ""
              }
            ]
          }
        ]
      },
    },
    {
      timestamps: true,
    },
  );

  feedbackDefinition.associate = (models) => {
    models.feedbackDefinition.belongsTo(models.sites, {
      as: "site",
      constraints: false,
    });
  };

  return feedbackDefinition;
};
