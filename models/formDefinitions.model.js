/**
 * Sites database model.
 * See https://sequelize.org/v5/manual/models-definition.html to learn how to customize it.
 */
module.exports = function (sequelize, DataTypes) {
  const formDefinition = sequelize.define(
    "formDefinition",
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
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "public",
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      definitionkey: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      definitionrevision: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      definitionJSON: {
        type: DataTypes.JSONB,
        defaultValue: [
          {
            "category": "Signals",
            "settings": {
              "formTitle": "Contact Form",
              "displayFormTitle": false,
              "sendEmailConfirmation": false,
              "submissionDestination": null,
              "emailConfirmationMessage": "Thanks for submitting our form.\nOne of our team members will get back to you soon.",
              "emailConfirmationSubject": "Thanks for submitting our form"
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
                "placeholder": "Please enter your lastname",
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
                "typeField": "textArea",
                "label": "Your Message",
                "required": true,
                "name": "field_8d_1617274753725",
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
              { "typeField": "button", "label": "Submit", "type": "submit", "class": "" }
            ],
          }
        ]
      }
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  formDefinition.associate = (models) => {
    models.formDefinition.belongsTo(models.sites, {
      as: "site",
      constraints: false,
    });
    models.formDefinition.belongsTo(models.session, {
      as: "session",
      constraints: false,
    });
  };

  return formDefinition;
};
