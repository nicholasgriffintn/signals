const { v4: uuidv4 } = require('uuid');

const crypto = require('crypto');

('use strict');
module.exports = (sequelize, DataTypes) => {
  const chat = sequelize.define(
    'chat',
    {
      openByDefault: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      stateActionsLayout: {
        type: DataTypes.TEXT,
        defaultValue: 'Default',
        isIn: ['Default', 'Tabs'],
      },
      initialChatState: {
        type: DataTypes.TEXT,
        defaultValue: 'intro',
      },
      showIntroState: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      showStatusCheckWidget: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      statusCheckAPI: {
        type: DataTypes.TEXT,
        defaultValue: '',
      },
      showChangelogWidget: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      changelogAPI: {
        type: DataTypes.TEXT,
        defaultValue: '',
      },
      chatHeaderTitle: {
        type: DataTypes.TEXT,
        defaultValue: 'Hey 👋',
      },
      chatHeaderSubTitle: {
        type: DataTypes.TEXT,
        defaultValue:
          'Welcome to our chat! Please use the options below to get in touch with us.',
      },
      initialChatMessage: {
        type: DataTypes.TEXT,
        defaultValue: 'Hi there! How can we help you today?',
      },
      initialChatTitle: {
        type: DataTypes.TEXT,
        defaultValue: 'Hello there 👋',
      },
      chatProvider: {
        type: DataTypes.TEXT,
        defaultValue: 'Signals',
        isIn: ['Signals', 'ZenDesk', 'Papercuts'],
      },
      chatProviderSettings: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
      converstationCardOptions: {
        type: DataTypes.JSONB,
        defaultValue: [
          {
            title: 'Start a chat',
            message: 'Message a member of our team directly.',
            name: 'Normal Chat Flow',
            author: 'Operator',
            avatar: 'https://cdn1.example.com/chat-icon-logo.png',
            optionsLink: {
              title: 'Hello there',
              message: 'How can we help you?',
              options: [
                {
                  title: 'Support',
                  message: 'How can we help you?',
                  name: "I'm looking for support",
                  options: [],
                },
                {
                  title: 'Upgrade',
                  message:
                    'Sure thing! Fill in your details below and one of our account managers will get in touch.',
                  name: 'I want to upgrade my plan',
                  options: [],
                },
                {
                  title: 'Just Browsing',
                  message:
                    "No problem! Enter your details below if you'd like to get in touch later.",
                  name: 'Just Browsing',
                  options: [],
                },
              ],
            },
          },
        ],
      },
      avatarIcon: {
        type: DataTypes.TEXT,
        defaultValue: 'https://cdn1.example.com/chat-icon-logo.png',
      },
      mainColor: {
        type: DataTypes.TEXT,
        defaultValue: 'rgb(148,0,211)',
      },
      secondaryColor: {
        type: DataTypes.TEXT,
        defaultValue: 'rgb(148,0,211)',
      },
      sendButtonColor: {
        type: DataTypes.TEXT,
        defaultValue: 'rgb(148,0,211)',
      },
      emailPlaceholder: {
        type: DataTypes.TEXT,
        defaultValue: 'Please fill in your e-mail adresss',
      },
      messagePlaceholder: {
        type: DataTypes.TEXT,
        defaultValue: 'Please provide further details about your query',
      },
      finalTitle: {
        type: DataTypes.TEXT,
        defaultValue: 'Thanks!',
      },
      finalSubTitle: {
        type: DataTypes.TEXT,
        defaultValue: 'A member of our team will get back to you soon.',
      },
      finalButtonText: {
        type: DataTypes.TEXT,
        defaultValue: 'Go Back',
      },
    },
    {
      timestamps: true,
    }
  );
  chat.associate = function (models) {
    models.chat.belongsTo(models.sites, {
      as: 'site',
      constraints: false,
    });
    models.chat.belongsTo(models.zendesk, {
      as: 'zendesk',
      constraints: false,
    });
  };

  return chat;
};
