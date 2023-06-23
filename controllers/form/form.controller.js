const db = require('../../models');
const { resolveMx } = require('dns');

const {
  sendEmail,
  clearCloudfront,
  verifyHCaptchaFromResource,
} = require('../utils.controller');

/**
 * Check if user is in the tenant
 * @param {*} user
 * @param {*} tenant
 */
function isUserInTenant(user, tenant) {
  if (!user || !user.tenants) {
    return false;
  }

  if (!tenant || !tenant.id) {
    return true;
  }

  return user.tenants.some((tenantUser) => tenantUser.site.id === tenant.id);
}

exports.createFormDefinition = async (req, res) => {
  if (
    res.locals.user &&
    isUserInTenant(res.locals.user, { id: req.params.siteId })
  ) {
    let publicKeyFromClient = req.headers.publickey;
    let privateKeyFromClient = req.headers.privatekey;

    if (req.params.siteId && publicKeyFromClient && privateKeyFromClient) {
      const siteData = await db.sites.findByPk(req.params.siteId);

      if (siteData && siteData.siteId) {
        if (
          siteData.keys &&
          siteData.keys.privateKey === privateKeyFromClient &&
          siteData.keys.publicKey === publicKeyFromClient
        ) {
          const session = req.body;

          if (session && session.formDefinition) {
            const newFormDefinition = {
              siteSiteId: req.params.siteId || null,
              definitionJSON: session.formDefinition,
              formsProvider: session.formsProvider,
              name: session.name,
              status: session.status,
              definitionkey: session.definitionkey,
              definitionrevision: session.definitionrevision,
            };

            const record = await db.formDefinition.create(newFormDefinition);

            if (record) {
              clearCloudfront(
                [
                  `/${
                    req.params.siteId || definitionData.siteSiteId
                  }/form/definition/`,
                ],
                1
              )
                .then((data) => {
                  console.log('clear cloudfront response', data);

                  res.status(200);
                  res.json({
                    status: 'success',
                    message: 'Definition was created.',
                    record: record,
                  });
                })
                .catch((err) => {
                  res.status(200);
                  res.json({
                    status: 'success',
                    message: 'Definition was created.',
                    record: record,
                    cfErr: err,
                  });
                });
            } else {
              res.status(404);
              res.json({ status: 'error', message: 'No data was found.' });
            }
          } else {
            res.status(404);
            res.json({
              status: 'error',
              message: 'Required params were not provided.',
            });
          }
        } else {
          res.status(404);
          res.json({
            status: 'error',
            message: 'Keys did not match',
          });
        }
      } else {
        res.status(404);
        res.json({
          status: 'error',
          message: 'No site was found with that ID',
        });
      }
    } else {
      res.status(404);
      res.json({
        status: 'error',
        message: 'No site ID was provided',
      });
    }
  } else {
    res.status(403);
  }
};

exports.updateFormDefinition = async (req, res) => {
  if (
    res.locals.user &&
    isUserInTenant(res.locals.user, { id: req.params.siteId })
  ) {
    let publicKeyFromClient = req.headers.publickey;
    let privateKeyFromClient = req.headers.privatekey;

    if (req.params.siteId && publicKeyFromClient && privateKeyFromClient) {
      const siteData = await db.sites.findByPk(req.params.siteId);

      if (siteData && siteData.siteId) {
        if (
          siteData.keys &&
          siteData.keys.privateKey === privateKeyFromClient &&
          siteData.keys.publicKey === publicKeyFromClient
        ) {
          const session = req.body;

          if (req.params.definitionId) {
            const definitionData = await db.formDefinition.findByPk(
              req.params.definitionId
            );

            if (definitionData) {
              const newFormDefinition = {
                siteSiteId: req.params.siteId || definitionData.siteSiteId,
                definitionJSON:
                  session.formDefinition || definitionData.formDefinition,
                formsProvider:
                  session.formsProvider || definitionData.formsProvider,
                name: session.name || definitionData.name,
                status: session.status || definitionData.status,
                definitionkey:
                  session.definitionkey || definitionData.definitionkey,
                definitionrevision:
                  session.definitionrevision ||
                  definitionData.definitionrevision,
              };

              const record = await db.formDefinition.update(newFormDefinition, {
                where: {
                  siteSiteId: req.params.siteId || definitionData.siteSiteId,
                  id: req.params.definitionId,
                },
              });

              if (record) {
                clearCloudfront(
                  [
                    `/${
                      req.params.siteId || definitionData.siteSiteId
                    }/form/definition/`,
                    `/${
                      req.params.siteId || definitionData.siteSiteId
                    }/form/definition/${req.params.definitionId}`,
                  ],
                  2
                )
                  .then((data) => {
                    console.log('clear cloudfront response', data);

                    res.status(200);
                    res.json({
                      status: 'success',
                      message: 'Definition was updated.',
                      record: record,
                    });
                  })
                  .catch((err) => {
                    res.status(200);
                    res.json({
                      status: 'success',
                      message: 'Definition was updated.',
                      record: record,
                      cfErr: err,
                    });
                  });
              } else {
                res.status(404);
                res.json({ status: 'error', message: 'No data was found.' });
              }
            } else {
              res.status(404);
              res.json({
                status: 'error',
                message: 'No session could be found with that ID',
              });
            }
          } else {
            res.status(404);
            res.json({
              status: 'error',
              message: 'Required params were not provided.',
            });
          }
        } else {
          res.status(404);
          res.json({
            status: 'error',
            message: 'Keys did not match',
          });
        }
      } else {
        res.status(404);
        res.json({
          status: 'error',
          message: 'No site was found with that ID',
        });
      }
    } else {
      res.status(404);
      res.json({
        status: 'error',
        message: 'No site ID was provided',
      });
    }
  } else {
    res.status(403);
  }
};

exports.getFormDefinition = async (req, res) => {
  if (req.params.siteId) {
    const siteData = await db.sites.findByPk(req.params.siteId);

    if (siteData && siteData.siteId) {
      if (req.params.definitionId === 'contact-form') {
        const formDefinitionResponse = {
          status: 'success',
          message: 'Definition was retrieved.',
          record: {
            id: 'contact-form',
            formsProvider: 'Signals',
            name: 'Contact Us',
            status: 'public',
            definitionkey: 'Contact Us',
            definitionrevision: '1',
            definitionJSON: [
              {
                fields: [
                  {
                    name: 'first_name',
                    size: 'small',
                    type: 'text',
                    class: '',
                    group: 'user',
                    label: 'First Name',
                    regex: '',
                    title: 'First Name',
                    value: '',
                    prefix: '',
                    suffix: '',
                    tipText: '',
                    bordered: true,
                    disabled: false,
                    required: true,
                    typeField: 'text',
                    typefield: 'text',
                    max_length: '',
                    min_length: '',
                    placeholder: 'Please enter your first name',
                  },
                  {
                    name: 'last_name',
                    size: 'small',
                    type: 'text',
                    class: '',
                    group: 'user',
                    label: 'Last Name',
                    regex: '',
                    title: 'Last Name',
                    value: '',
                    prefix: '',
                    suffix: '',
                    tipText: '',
                    bordered: true,
                    disabled: false,
                    required: true,
                    typeField: 'text',
                    typefield: 'text',
                    max_length: '',
                    min_length: '',
                    placeholder: 'Please enter your last name',
                  },
                  {
                    name: 'email',
                    size: 'small',
                    type: 'email',
                    class: '',
                    group: 'user',
                    label: 'Your Email',
                    regex: '',
                    title: 'Email',
                    value: '',
                    prefix: '',
                    suffix: '',
                    tipText: '',
                    bordered: true,
                    disabled: false,
                    required: true,
                    typeField: 'text',
                    typefield: 'text',
                    max_length: '',
                    min_length: '',
                    placeholder: 'Please enter your email address',
                  },
                  {
                    cols: '3',
                    name: 'your_message',
                    rows: '6',
                    size: 'small',
                    class: '',
                    group: 'common',
                    label: 'Your Message',
                    regex: '',
                    value: '',
                    fields: {
                      cols: {
                        name: 'cols',
                        step: '1',
                        label: 'Cols',
                        value: '3',
                        inputType: 'number',
                      },
                      rows: {
                        name: 'rows',
                        step: '1',
                        label: 'Rows',
                        value: '6',
                        inputType: 'number',
                      },
                      maxLength: {
                        name: 'max_length',
                        step: '1',
                        label: 'Max length',
                        value: '',
                        inputType: 'number',
                      },
                      minLength: {
                        name: 'min_length',
                        step: '1',
                        label: 'Min length',
                        value: '',
                        inputType: 'number',
                      },
                      showCount: {
                        name: 'showCount',
                        label: 'Show Count?',
                        value: true,
                        inputType: 'checkbox',
                      },
                    },
                    tipText: '',
                    bordered: true,
                    disabled: false,
                    required: true,
                    classIcon: 'fa-align-left',
                    showCount: true,
                    typeField: 'textArea',
                    typefield: 'textArea',
                    max_length: '',
                    min_length: '',
                    placeholder: 'Enter your message',
                  },
                  {
                    name: 'capatchaToken',
                    size: 'small',
                    group: 'miscellaneous',
                    label: 'Captcha Test',
                    value: '',
                    fields: {
                      value: {
                        name: 'value',
                        label: 'Value',
                        value: '',
                        inputType: 'text',
                      },
                    },
                    banField: {},
                    bordered: true,
                    disabled: false,
                    classIcon: 'fa-eye-slash',
                    typeField: 'captcha',
                    typefield: 'captcha',
                    showFields: {},
                  },
                  {
                    href: '',
                    size: 'small',
                    type: 'submit',
                    class: '',
                    group: 'common',
                    label: 'Submit',
                    fields: {
                      href: {
                        name: 'href',
                        label: 'Link Value',
                        value: '',
                        inputType: 'text',
                      },
                      type: {
                        name: 'type',
                        label: 'Type',
                        options: [
                          {
                            label: 'Button',
                            value: 'button',
                          },
                          {
                            label: 'Submit',
                            value: 'submit',
                          },
                          {
                            label: 'Reset',
                            value: 'reset',
                          },
                        ],
                        inputType: 'select',
                      },
                      target: {
                        name: 'target',
                        label: 'Link Target',
                        value: '',
                        inputType: 'text',
                      },
                      display: {
                        name: 'display',
                        label: 'Display',
                        options: [
                          {
                            label: 'Default',
                            value: 'default',
                          },
                          {
                            label: 'Primary',
                            value: 'primary',
                          },
                          {
                            label: 'Ghost',
                            value: 'ghost',
                          },
                          {
                            label: 'Dashed',
                            value: 'dashed',
                          },
                          {
                            label: 'Link',
                            value: 'link',
                          },
                        ],
                        inputType: 'select',
                      },
                    },
                    target: '',
                    display: 'primary',
                    banField: {},
                    bordered: true,
                    disabled: false,
                    classIcon: 'fa-circle',
                    typeField: 'button',
                    typefield: 'button',
                    showFields: {},
                  },
                ],
                category: 'Signals',
                settings: {
                  formTitle: 'Contact Us',
                  displayFormTitle: false,
                  sendEmailConfirmation: false,
                  submissionDestination: siteData.notificationsEmail
                    ? siteData.notificationsEmail
                    : `${siteData.siteId}@example.com`,
                  emailConfirmationMessage:
                    'Thank you for submitting our contact us form.\n\nOne of our team members will be in touch as soon as possible.',
                  emailConfirmationSubject:
                    'Thank you for submitting our contact us form',
                },
              },
            ],
            createdAt: '2021-06-29 05:51:21.13+00',
            updatedAt: '2021-06-29 05:51:21.13+00',
            deletedAt: null,
            siteSiteId: siteData.siteId,
            sessionSessionId: null,
          },
        };

        res.status(200);
        res.json(formDefinitionResponse);
      } else if (
        req.params.definitionId &&
        req.params.definitionId !== 'contact-form'
      ) {
        const definitionData = await db.formDefinition.findByPk(
          req.params.definitionId
        );

        if (definitionData) {
          res.status(200);
          res.json({
            status: 'success',
            message: 'Definition was retrieved.',
            record: definitionData,
          });
        } else {
          res.status(404);
          res.json({ status: 'error', message: 'No data was found.' });
        }
      } else {
        res.status(404);
        res.json({
          status: 'error',
          message: 'Required params were not provided.',
        });
      }
    } else {
      res.status(404);
      res.json({
        status: 'error',
        message: 'No site was found with that ID',
      });
    }
  } else {
    res.status(404);
    res.json({
      status: 'error',
      message: 'No site ID was provided',
    });
  }
};

exports.getAllFormDefinitions = async (req, res) => {
  if (req.params.siteId) {
    const siteData = await db.sites.findByPk(req.params.siteId);

    if (siteData && siteData.siteId) {
      const definitionData = await db.formDefinition.findAll({
        where: {
          siteSiteId: req.params.siteId,
        },
        attributes: [
          'id',
          'formsProvider',
          'name',
          'status',
          'definitionkey',
          'definitionrevision',
          'createdAt',
          'updatedAt',
          'siteSiteId',
          'sessionSessionId',
        ],
      });

      if (definitionData) {
        // Push the default form
        let allDefinitionsData = [];

        definitionData.map((record) => {
          const plainRecord = record.get({ plain: true });

          allDefinitionsData.push(plainRecord);
        });

        if (allDefinitionsData) {
          allDefinitionsData.push({
            id: 'contact-form',
            formsProvider: 'Signals',
            name: 'Default Contact Form',
            status: 'locked',
            definitionkey: 'Default Contact Form',
            definitionrevision: '1',
            createdAt: '2021-06-29 05:51:21.13+00',
            updatedAt: '2021-06-29 05:51:21.13+00',
            siteSiteId: req.params.siteId,
            sessionSessionId: null,
          });

          res.status(200);
          res.json({
            status: 'success',
            message: 'Definitions were retrieved.',
            record: allDefinitionsData,
          });
        } else {
          res.status(404);
          res.json({ status: 'error', message: 'No data was found.' });
        }
      } else {
        res.status(404);
        res.json({ status: 'error', message: 'No data was found.' });
      }
    } else {
      res.status(404);
      res.json({
        status: 'error',
        message: 'No site was found with that ID',
      });
    }
  } else {
    res.status(404);
    res.json({
      status: 'error',
      message: 'No site ID was provided',
    });
  }
};

exports.createFormResponse = async (req, res) => {
  if (req.params.siteId) {
    const siteData = await db.sites.findByPk(req.params.siteId);

    if (siteData && siteData.siteId) {
      if (req.params.definitionId) {
        let definitionData = null;

        if (req.params.definitionId === 'contact-form') {
          definitionData = {
            id: 'contact-form',
            formsProvider: 'Signals',
            name: 'Contact Us',
            status: 'public',
            definitionkey: 'Contact Us',
            definitionrevision: '1',
            definitionJSON: [
              {
                fields: [
                  {
                    name: 'first_name',
                    size: 'small',
                    type: 'text',
                    class: '',
                    group: 'user',
                    label: 'First Name',
                    regex: '',
                    title: 'First Name',
                    value: '',
                    prefix: '',
                    suffix: '',
                    tipText: '',
                    bordered: true,
                    disabled: false,
                    required: true,
                    typeField: 'text',
                    typefield: 'text',
                    max_length: '',
                    min_length: '',
                    placeholder: 'Please enter your first name',
                  },
                  {
                    name: 'last_name',
                    size: 'small',
                    type: 'text',
                    class: '',
                    group: 'user',
                    label: 'Last Name',
                    regex: '',
                    title: 'Last Name',
                    value: '',
                    prefix: '',
                    suffix: '',
                    tipText: '',
                    bordered: true,
                    disabled: false,
                    required: true,
                    typeField: 'text',
                    typefield: 'text',
                    max_length: '',
                    min_length: '',
                    placeholder: 'Please enter your last name',
                  },
                  {
                    name: 'email',
                    size: 'small',
                    type: 'email',
                    class: '',
                    group: 'user',
                    label: 'Your Email',
                    regex: '',
                    title: 'Email',
                    value: '',
                    prefix: '',
                    suffix: '',
                    tipText: '',
                    bordered: true,
                    disabled: false,
                    required: true,
                    typeField: 'text',
                    typefield: 'text',
                    max_length: '',
                    min_length: '',
                    placeholder: 'Please enter your email address',
                  },
                  {
                    cols: '3',
                    name: 'your_message',
                    rows: '6',
                    size: 'small',
                    class: '',
                    group: 'common',
                    label: 'Your Message',
                    regex: '',
                    value: '',
                    fields: {
                      cols: {
                        name: 'cols',
                        step: '1',
                        label: 'Cols',
                        value: '3',
                        inputType: 'number',
                      },
                      rows: {
                        name: 'rows',
                        step: '1',
                        label: 'Rows',
                        value: '6',
                        inputType: 'number',
                      },
                      maxLength: {
                        name: 'max_length',
                        step: '1',
                        label: 'Max length',
                        value: '',
                        inputType: 'number',
                      },
                      minLength: {
                        name: 'min_length',
                        step: '1',
                        label: 'Min length',
                        value: '',
                        inputType: 'number',
                      },
                      showCount: {
                        name: 'showCount',
                        label: 'Show Count?',
                        value: true,
                        inputType: 'checkbox',
                      },
                    },
                    tipText: '',
                    bordered: true,
                    disabled: false,
                    required: true,
                    classIcon: 'fa-align-left',
                    showCount: true,
                    typeField: 'textArea',
                    typefield: 'textArea',
                    max_length: '',
                    min_length: '',
                    placeholder: 'Enter your message',
                  },
                  {
                    name: 'capatchaToken',
                    size: 'small',
                    group: 'miscellaneous',
                    label: 'Captcha Test',
                    value: '',
                    fields: {
                      value: {
                        name: 'value',
                        label: 'Value',
                        value: '',
                        inputType: 'text',
                      },
                    },
                    banField: {},
                    bordered: true,
                    disabled: false,
                    classIcon: 'fa-eye-slash',
                    typeField: 'captcha',
                    typefield: 'captcha',
                    showFields: {},
                  },
                  {
                    href: '',
                    size: 'small',
                    type: 'submit',
                    class: '',
                    group: 'common',
                    label: 'Submit',
                    fields: {
                      href: {
                        name: 'href',
                        label: 'Link Value',
                        value: '',
                        inputType: 'text',
                      },
                      type: {
                        name: 'type',
                        label: 'Type',
                        options: [
                          {
                            label: 'Button',
                            value: 'button',
                          },
                          {
                            label: 'Submit',
                            value: 'submit',
                          },
                          {
                            label: 'Reset',
                            value: 'reset',
                          },
                        ],
                        inputType: 'select',
                      },
                      target: {
                        name: 'target',
                        label: 'Link Target',
                        value: '',
                        inputType: 'text',
                      },
                      display: {
                        name: 'display',
                        label: 'Display',
                        options: [
                          {
                            label: 'Default',
                            value: 'default',
                          },
                          {
                            label: 'Primary',
                            value: 'primary',
                          },
                          {
                            label: 'Ghost',
                            value: 'ghost',
                          },
                          {
                            label: 'Dashed',
                            value: 'dashed',
                          },
                          {
                            label: 'Link',
                            value: 'link',
                          },
                        ],
                        inputType: 'select',
                      },
                    },
                    target: '',
                    display: 'primary',
                    banField: {},
                    bordered: true,
                    disabled: false,
                    classIcon: 'fa-circle',
                    typeField: 'button',
                    typefield: 'button',
                    showFields: {},
                  },
                ],
                category: 'Signals',
                settings: {
                  formTitle: 'Contact Us',
                  displayFormTitle: false,
                  sendEmailConfirmation: false,
                  submissionDestination: siteData.notificationsEmail
                    ? siteData.notificationsEmail
                    : `${siteData.siteId}@example.com`,
                  emailConfirmationMessage:
                    'Thank you for submitting our contact us form.\n\nOne of our team members will be in touch as soon as possible.',
                  emailConfirmationSubject:
                    'Thank you for submitting our contact us form',
                },
              },
            ],
            createdAt: '2021-06-29 05:51:21.13+00',
            updatedAt: '2021-06-29 05:51:21.13+00',
            deletedAt: null,
            siteSiteId: siteData.siteId,
            sessionSessionId: null,
          };
        } else {
          definitionData = await db.formDefinition.findByPk(
            req.params.definitionId
          );
        }

        if (
          definitionData &&
          definitionData.definitionJSON &&
          definitionData.definitionJSON[0] &&
          definitionData.definitionJSON[0].fields
        ) {
          const session = req.body;

          if (session && session.formResponse) {
            const submittedFormResponse = session.formResponse;

            const doEmailStuff = async () => {
              const userInformationData = {};

              if (submittedFormResponse['first_name']) {
                userInformationData['first_name'] =
                  submittedFormResponse['first_name'];
              }
              if (submittedFormResponse['last_name']) {
                userInformationData['last_name'] =
                  submittedFormResponse['last_name'];
              }
              if (submittedFormResponse['address']) {
                userInformationData['address'] =
                  submittedFormResponse['address'];
              }
              if (submittedFormResponse['city']) {
                userInformationData['city'] = submittedFormResponse['city'];
              }
              if (submittedFormResponse['country']) {
                userInformationData['country'] =
                  submittedFormResponse['country'];
              }
              if (submittedFormResponse['postcode']) {
                userInformationData['postcode'] =
                  submittedFormResponse['postcode'];
              }
              if (submittedFormResponse['email']) {
                userInformationData['email'] = submittedFormResponse['email'];
              }

              const validatedFormResponse = {};

              let invalidFormResponse = false;
              let invalidFormResponseReason = null;

              definitionData.definitionJSON[0].fields.map((field) => {
                const {
                  name,
                  type,
                  regex,
                  required,
                  max_length,
                  min_length,
                  max_value,
                  min_value,
                } = field;

                if (
                  name === 'capatchaToken' &&
                  !submittedFormResponse['capatchaToken']
                ) {
                  invalidFormResponse = true;
                  invalidFormResponseReason = 'A capatcha token is required';
                } else if (required && !submittedFormResponse[name]) {
                  invalidFormResponse = true;
                  invalidFormResponseReason = `${name} is required.`;
                } else if (
                  regex &&
                  submittedFormResponse[name] &&
                  !regex.test(submittedFormResponse[name])
                ) {
                  invalidFormResponse = true;
                  invalidFormResponseReason = `${name} is not valid.`;
                } else if (
                  max_length &&
                  submittedFormResponse[name] &&
                  submittedFormResponse[name].length > max_length
                ) {
                  invalidFormResponse = true;
                  invalidFormResponseReason = `${name} is too long.`;
                } else if (
                  max_length &&
                  submittedFormResponse[name] &&
                  submittedFormResponse[name].length < min_length
                ) {
                  invalidFormResponse = true;
                  invalidFormResponseReason = `${name} is too short.`;
                } else if (
                  max_length &&
                  submittedFormResponse[name] &&
                  submittedFormResponse[name] > max_value
                ) {
                  invalidFormResponse = true;
                  invalidFormResponseReason = `${name} is too high.`;
                } else if (
                  max_length &&
                  submittedFormResponse[name] &&
                  submittedFormResponse[name] < min_value
                ) {
                  invalidFormResponse = true;
                  invalidFormResponseReason = `${name} is too low.`;
                }

                if (
                  !invalidFormResponse &&
                  submittedFormResponse[name] &&
                  String(submittedFormResponse[name])
                ) {
                  validatedFormResponse[name] = submittedFormResponse[name]
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/"/g, '&quot;');
                } else if (
                  !invalidFormResponse &&
                  submittedFormResponse[name]
                ) {
                  validatedFormResponse[name] = submittedFormResponse[name];
                }

                return field;
              });

              if (invalidFormResponse) {
                res.status(500);
                res.json({
                  status: 'error',
                  message: invalidFormResponseReason,
                });
              } else {
                const newResponseData = {
                  siteSiteId: req.params.siteId || null,
                  definitionId:
                    req.params.definitionId !== 'contact-form'
                      ? req.params.definitionId
                      : req.params.definitionId === 'contact-form'
                      ? '94ab9866-3561-42ff-a80f-1ccdab22b390'
                      : null,
                  sessionSessionId: session.sessionId || null,
                  payload: validatedFormResponse || null,
                  userInformationData: userInformationData,
                  submittedfrom: session.submittedfrom,
                };

                const record = await db.formResponse.create(newResponseData);

                if (record) {
                  const parsedDefinitionJSON = definitionData.definitionJSON[0];

                  const definitionSettings = parsedDefinitionJSON.settings;

                  const toEmailAddress =
                    definitionSettings &&
                    definitionSettings.submissionDestination
                      ? definitionSettings.submissionDestination
                      : `${siteData.siteId}@example.com`;
                  const sendEmailConfirmation =
                    definitionSettings &&
                    definitionSettings.sendEmailConfirmation
                      ? definitionSettings.sendEmailConfirmation
                      : false;
                  const emailConfirmationSubject =
                    definitionSettings &&
                    definitionSettings.emailConfirmationSubject
                      ? definitionSettings.emailConfirmationSubject
                      : false;
                  const emailConfirmationMessage =
                    definitionSettings &&
                    definitionSettings.emailConfirmationMessage
                      ? definitionSettings.emailConfirmationMessage
                      : false;

                  const formName =
                    definitionSettings && definitionSettings.formTitle
                      ? definitionSettings.formTitle
                      : `Form`;

                  const emailMailObject = {
                    to: [
                      {
                        name: siteData.siteName,
                        emailAddress: toEmailAddress,
                      },
                    ],
                    cc: [],
                    bcc: [],
                    from: {
                      name: 'Example',
                      emailAddress: `${siteData.siteId}@example.com`,
                    },
                    replyTo: `${siteData.siteId}@example.com`,
                    subject: `${formName} submission from your site.`,
                    htmlBody: null,
                    htmlTemplateS3Path: {
                      bucket: 'email-templates.example.com',
                      key: 'standardEmailTemplate.html',
                    },
                    attachmentS3Paths: [],
                    replacements: [
                      {
                        key: '{Subject}',
                        value: `${formName} submission from your site.`,
                      },
                      {
                        key: '{Content}',
                        value: `<p>Hey,</p>
                      <p>We have recieved a form submission of your form${
                        formName !== 'Form' ? ` "${formName}` : ''
                      }</p>
                      <p>Here are the quick details:</p>
                      <br></br>
                      ${
                        userInformationData['first_name']
                          ? `<strong>First Name:</strong><span>${userInformationData['first_name']}</span>`
                          : ''
                      }
                      <br></br>
                      ${
                        userInformationData['last_name']
                          ? `<strong>Last Name:</strong><span>${userInformationData['last_name']}</span>`
                          : ''
                      }
                      <br></br>
                      ${
                        userInformationData['email']
                          ? `<strong>Email Address:</strong><span>${userInformationData['email']}</span>`
                          : ''
                      }
                      <br></br>
                      <p>You can view the full response here:</p>
                      <p>
                        <a href="https://${
                          siteData.tenantUrl
                        }.workspace.example.com/dashboard/signals/forms/responses/${
                          req.params.definitionId
                        }/${record.id}">
                          https://${
                            siteData.tenantUrl
                          }.workspace.example.com/dashboard/signals/forms/responses/${
                          req.params.definitionId
                        }/${record.id}
                        </a>
                      </p>`,
                      },
                      {
                        key: '{SiteName}',
                        value: siteData.siteName,
                      },
                      {
                        key: '{SiteLogo}',
                        value: siteData.siteLogo,
                      },
                    ],
                    pendingSendDateTime: null,
                    isConversation: true,
                    conversationGUID: null,
                    category: 'SITE-NOTIFICATION',
                  };

                  sendEmail(siteData.siteId, emailMailObject)
                    .then((data) => {
                      // TODO: Add email guuid to form response
                      // TODO: Add conversation ID to form response

                      const sendEmailPayload = JSON.parse(data.Payload);
                      const sendEmailPayloadBody = JSON.parse(
                        sendEmailPayload.body
                      );

                      const emailGUID = sendEmailPayloadBody.emailGUID;
                      const currentConverstationId =
                        sendEmailPayloadBody.currentConverstationId;
                      console.log('sendEmail response', sendEmailPayloadBody);

                      record.update({
                        emailGUID,
                        currentConverstationId,
                      });

                      if (
                        sendEmailConfirmation &&
                        userInformationData['first_name'] &&
                        userInformationData['last_name'] &&
                        userInformationData['email']
                      ) {
                        console.log('Sending email confirmation');
                        // TODO: send the email confirmation
                        const emailMailObject = {
                          to: [
                            {
                              name: `${userInformationData['first_name']} ${userInformationData['last_name']}`,
                              emailAddress: userInformationData['email'],
                            },
                          ],
                          cc: [],
                          bcc: [],
                          from: {
                            name: siteData.siteName,
                            emailAddress: `${siteData.siteId}@example.com`,
                          },
                          replyTo: `${siteData.siteId}@example.com`,
                          subject: emailConfirmationSubject,
                          htmlBody: null,
                          htmlTemplateS3Path: {
                            bucket: 'email-templates.example.com',
                            key: 'brandedEmailTemplate.html',
                          },
                          attachmentS3Paths: [],
                          replacements: [
                            {
                              key: '{Subject}',
                              value: emailConfirmationSubject,
                            },
                            {
                              key: '{Content}',
                              value: `<p>Hey ${userInformationData['first_name']},</p>
                          <p>${emailConfirmationMessage}</p>`,
                            },
                            {
                              key: '{SiteName}',
                              value: siteData.siteName,
                            },
                            {
                              key: '{SiteLogo}',
                              value: siteData.siteLogo,
                            },
                          ],
                          pendingSendDateTime: null,
                          isConversation: currentConverstationId ? true : false,
                          conversationGUID: currentConverstationId,
                          category: 'SITE-NOTIFICATION',
                        };
                        sendEmail(siteData.siteId, emailMailObject)
                          .then(() => {
                            res.status(200);
                            res.json({
                              status: 'success',
                              message: 'Response was created.',
                              record: record,
                            });
                          })
                          .catch((err) => {
                            // TODO: Need some way back from this
                            console.log('sendEmail response', err);

                            res.status(200);
                            res.json({
                              status: 'error',
                              message:
                                'Response was created, but the confirmation failed.',
                              record: record,
                              error: err,
                            });
                          });
                      } else {
                        res.status(200);
                        res.json({
                          status: 'success',
                          message: 'Response was created.',
                          record: record,
                        });
                      }
                    })
                    .catch((err) => {
                      // TODO: Need some way back from this
                      console.log('sendEmail response', err);

                      res.status(400);
                      res.json({
                        status: 'error',
                        message: 'Response was created, but the send failed.',
                        record: record,
                        error: err,
                      });
                    });
                } else {
                  res.status(404);
                  res.json({ status: 'error', message: 'No data was found.' });
                }
              }
            };

            // validate the input first
            let failedValidation = false;

            if (submittedFormResponse['first_name']) {
              if (!/^[a-zA-Z]+$/.test(submittedFormResponse['first_name'])) {
                failedValidation = true;
              }
            }

            if (submittedFormResponse['last_name']) {
              if (!/^[a-zA-Z]+$/.test(submittedFormResponse['last_name'])) {
                failedValidation = true;
              }
            }

            if (submittedFormResponse['email']) {
              submittedFormResponse['email'] = String(
                submittedFormResponse['email']
              ).toLowerCase();

              const validateEmailRegex =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              const validateEmail = validateEmailRegex.test(
                submittedFormResponse['email']
              );

              if (!validateEmail) {
                failedValidation = true;
              }
            }

            if (failedValidation) {
              res.status(403);
              res.json({
                status: 'error',
                message: 'The submitted data failed validation.',
              });
            } else {
              if (submittedFormResponse.capatchaToken) {
                verifyHCaptchaFromResource(
                  submittedFormResponse.capatchaToken,
                  null
                )
                  .then((data) => {
                    if (data) {
                      doEmailStuff();
                    } else {
                      res.status(403);
                      res.json({
                        status: 'error',
                        message: 'Failed to verify capatcha.',
                      });
                    }
                  })
                  .catch((err) => {
                    console.error(err);
                    res.status(500);
                    res.json({
                      status: 'error',
                      message:
                        'The capatcha token provided could not be validated',
                    });
                  });
              } else {
                doEmailStuff();
              }
            }
          } else {
            res.status(404);
            res.json({ status: 'error', message: 'No definition was found.' });
          }
        } else {
          res.status(404);
          res.json({ status: 'error', message: 'No definition was supplied.' });
        }
      } else {
        res.status(404);
        res.json({
          status: 'error',
          message: 'Required params were not provided.',
        });
      }
    } else {
      res.status(404);
      res.json({
        status: 'error',
        message: 'No site was found with that ID',
      });
    }
  } else {
    res.status(404);
    res.json({
      status: 'error',
      message: 'No site ID was provided',
    });
  }
};

exports.updateFormResponse = async (req, res) => {
  if (
    res.locals.user &&
    isUserInTenant(res.locals.user, { id: req.params.siteId })
  ) {
    let publicKeyFromClient = req.headers.publickey;
    let privateKeyFromClient = req.headers.privatekey;

    if (req.params.siteId && publicKeyFromClient && privateKeyFromClient) {
      const siteData = await db.sites.findByPk(req.params.siteId);

      if (siteData && siteData.siteId) {
        if (
          siteData.keys &&
          siteData.keys.privateKey === privateKeyFromClient &&
          siteData.keys.publicKey === publicKeyFromClient
        ) {
          if (req.params.definitionId) {
            let definitionData = null;

            if (req.params.definitionId === 'contact-form') {
              definitionData = {
                id: 'contact-form',
                formsProvider: 'Signals',
                name: 'Contact Us',
                status: 'public',
                definitionkey: 'Contact Us',
                definitionrevision: '1',
                definitionJSON: [
                  {
                    fields: [
                      {
                        name: 'first_name',
                        size: 'small',
                        type: 'text',
                        class: '',
                        group: 'user',
                        label: 'First Name',
                        regex: '',
                        title: 'First Name',
                        value: '',
                        prefix: '',
                        suffix: '',
                        tipText: '',
                        bordered: true,
                        disabled: false,
                        required: true,
                        typeField: 'text',
                        typefield: 'text',
                        max_length: '',
                        min_length: '',
                        placeholder: 'Please enter your first name',
                      },
                      {
                        name: 'last_name',
                        size: 'small',
                        type: 'text',
                        class: '',
                        group: 'user',
                        label: 'Last Name',
                        regex: '',
                        title: 'Last Name',
                        value: '',
                        prefix: '',
                        suffix: '',
                        tipText: '',
                        bordered: true,
                        disabled: false,
                        required: true,
                        typeField: 'text',
                        typefield: 'text',
                        max_length: '',
                        min_length: '',
                        placeholder: 'Please enter your last name',
                      },
                      {
                        name: 'email',
                        size: 'small',
                        type: 'email',
                        class: '',
                        group: 'user',
                        label: 'Your Email',
                        regex: '',
                        title: 'Email',
                        value: '',
                        prefix: '',
                        suffix: '',
                        tipText: '',
                        bordered: true,
                        disabled: false,
                        required: true,
                        typeField: 'text',
                        typefield: 'text',
                        max_length: '',
                        min_length: '',
                        placeholder: 'Please enter your email address',
                      },
                      {
                        cols: '3',
                        name: 'your_message',
                        rows: '6',
                        size: 'small',
                        class: '',
                        group: 'common',
                        label: 'Your Message',
                        regex: '',
                        value: '',
                        fields: {
                          cols: {
                            name: 'cols',
                            step: '1',
                            label: 'Cols',
                            value: '3',
                            inputType: 'number',
                          },
                          rows: {
                            name: 'rows',
                            step: '1',
                            label: 'Rows',
                            value: '6',
                            inputType: 'number',
                          },
                          maxLength: {
                            name: 'max_length',
                            step: '1',
                            label: 'Max length',
                            value: '',
                            inputType: 'number',
                          },
                          minLength: {
                            name: 'min_length',
                            step: '1',
                            label: 'Min length',
                            value: '',
                            inputType: 'number',
                          },
                          showCount: {
                            name: 'showCount',
                            label: 'Show Count?',
                            value: true,
                            inputType: 'checkbox',
                          },
                        },
                        tipText: '',
                        bordered: true,
                        disabled: false,
                        required: true,
                        classIcon: 'fa-align-left',
                        showCount: true,
                        typeField: 'textArea',
                        typefield: 'textArea',
                        max_length: '',
                        min_length: '',
                        placeholder: 'Enter your message',
                      },
                      {
                        name: 'capatchaToken',
                        size: 'small',
                        group: 'miscellaneous',
                        label: 'Captcha Test',
                        value: '',
                        fields: {
                          value: {
                            name: 'value',
                            label: 'Value',
                            value: '',
                            inputType: 'text',
                          },
                        },
                        banField: {},
                        bordered: true,
                        disabled: false,
                        classIcon: 'fa-eye-slash',
                        typeField: 'captcha',
                        typefield: 'captcha',
                        showFields: {},
                      },
                      {
                        href: '',
                        size: 'small',
                        type: 'submit',
                        class: '',
                        group: 'common',
                        label: 'Submit',
                        fields: {
                          href: {
                            name: 'href',
                            label: 'Link Value',
                            value: '',
                            inputType: 'text',
                          },
                          type: {
                            name: 'type',
                            label: 'Type',
                            options: [
                              {
                                label: 'Button',
                                value: 'button',
                              },
                              {
                                label: 'Submit',
                                value: 'submit',
                              },
                              {
                                label: 'Reset',
                                value: 'reset',
                              },
                            ],
                            inputType: 'select',
                          },
                          target: {
                            name: 'target',
                            label: 'Link Target',
                            value: '',
                            inputType: 'text',
                          },
                          display: {
                            name: 'display',
                            label: 'Display',
                            options: [
                              {
                                label: 'Default',
                                value: 'default',
                              },
                              {
                                label: 'Primary',
                                value: 'primary',
                              },
                              {
                                label: 'Ghost',
                                value: 'ghost',
                              },
                              {
                                label: 'Dashed',
                                value: 'dashed',
                              },
                              {
                                label: 'Link',
                                value: 'link',
                              },
                            ],
                            inputType: 'select',
                          },
                        },
                        target: '',
                        display: 'primary',
                        banField: {},
                        bordered: true,
                        disabled: false,
                        classIcon: 'fa-circle',
                        typeField: 'button',
                        typefield: 'button',
                        showFields: {},
                      },
                    ],
                    category: 'Signals',
                    settings: {
                      formTitle: 'Contact Us',
                      displayFormTitle: false,
                      sendEmailConfirmation: false,
                      submissionDestination: siteData.notificationsEmail
                        ? siteData.notificationsEmail
                        : `${siteData.siteId}@example.com`,
                      emailConfirmationMessage:
                        'Thank you for submitting our contact us form.\n\nOne of our team members will be in touch as soon as possible.',
                      emailConfirmationSubject:
                        'Thank you for submitting our contact us form',
                    },
                  },
                ],
                createdAt: '2021-06-29 05:51:21.13+00',
                updatedAt: '2021-06-29 05:51:21.13+00',
                deletedAt: null,
                siteSiteId: siteData.siteId,
                sessionSessionId: null,
              };
            } else {
              definitionData = await db.formDefinition.findByPk(
                req.params.definitionId
              );
            }

            if (definitionData) {
              const session = req.body;

              if (req.params.responseId) {
                const responseData = await db.formResponse.findByPk(
                  req.params.responseId
                );

                if (responseData) {
                  const submittedFormResponse =
                    session.payload || responseData.payload;

                  // validate the input first
                  let failedValidation = false;

                  if (submittedFormResponse['first_name']) {
                    if (
                      !/^[a-zA-Z]+$/.test(submittedFormResponse['first_name'])
                    ) {
                      failedValidation = true;
                    }
                  }

                  if (submittedFormResponse['last_name']) {
                    if (
                      !/^[a-zA-Z]+$/.test(submittedFormResponse['last_name'])
                    ) {
                      failedValidation = true;
                    }
                  }

                  if (submittedFormResponse['email']) {
                    submittedFormResponse['email'] = String(
                      submittedFormResponse['email']
                    ).toLowerCase();

                    const validateEmailRegex =
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    const validateEmail = validateEmailRegex.test(
                      submittedFormResponse['email']
                    );

                    if (!validateEmail) {
                      failedValidation = true;
                    }
                  }

                  if (failedValidation) {
                    res.status(403);
                    res.json({
                      status: 'error',
                      message: 'The submitted data failed validation.',
                    });
                  } else {
                    const userInformationData =
                      responseData.userInformationData || {};

                    if (submittedFormResponse['first_name']) {
                      userInformationData['first_name'] =
                        submittedFormResponse['first_name'];
                    }
                    if (submittedFormResponse['last_name']) {
                      userInformationData['last_name'] =
                        submittedFormResponse['last_name'];
                    }
                    if (submittedFormResponse['address']) {
                      userInformationData['address'] =
                        submittedFormResponse['address'];
                    }
                    if (submittedFormResponse['city']) {
                      userInformationData['city'] =
                        submittedFormResponse['city'];
                    }
                    if (submittedFormResponse['country']) {
                      userInformationData['country'] =
                        submittedFormResponse['country'];
                    }
                    if (submittedFormResponse['postcode']) {
                      userInformationData['postcode'] =
                        submittedFormResponse['postcode'];
                    }
                    if (submittedFormResponse['email']) {
                      userInformationData['email'] =
                        submittedFormResponse['email'];
                    }

                    const newResponseData = {
                      siteSiteId: req.params.siteId || responseData.siteSiteId,
                      definitionId:
                        req.params.definitionId || responseData.definitionId,
                      payload: session.payload || responseData.payload,
                      userInformationData: userInformationData,
                      submittedfrom:
                        session.submittedfrom || responseData.submittedfrom,
                    };

                    const record = await db.formResponse.update(
                      newResponseData,
                      {
                        where: {
                          siteSiteId: req.params.siteId,
                          id: req.params.responseId,
                        },
                      }
                    );

                    if (record) {
                      res.status(200);
                      res.json({
                        status: 'success',
                        message: 'Response was updated.',
                        record: record,
                      });
                    } else {
                      res.status(404);
                      res.json({
                        status: 'error',
                        message: 'No data was found.',
                      });
                    }
                  }
                } else {
                  res.status(404);
                  res.json({
                    status: 'error',
                    message: 'No response was found.',
                  });
                }
              } else {
                res.status(404);
                res.json({
                  status: 'error',
                  message: 'No response ID was provided.',
                });
              }
            } else {
              res.status(404);
              res.json({
                status: 'error',
                message: 'No definition was found.',
              });
            }
          } else {
            res.status(404);
            res.json({
              status: 'error',
              message: 'No definition was supplied.',
            });
          }
        } else {
          res.status(404);
          res.json({
            status: 'error',
            message: 'Keys did not match',
          });
        }
      } else {
        res.status(404);
        res.json({
          status: 'error',
          message: 'No site was found with that ID',
        });
      }
    } else {
      res.status(404);
      res.json({
        status: 'error',
        message: 'No site ID was provided',
      });
    }
  } else {
    res.status(403);
  }
};

exports.getFormResponse = async (req, res) => {
  if (
    res.locals.user &&
    isUserInTenant(res.locals.user, { id: req.params.siteId })
  ) {
    let publicKeyFromClient = req.headers.publickey;
    let privateKeyFromClient = req.headers.privatekey;

    if (req.params.siteId && publicKeyFromClient && privateKeyFromClient) {
      const siteData = await db.sites.findByPk(req.params.siteId);

      if (siteData && siteData.siteId) {
        if (
          siteData.keys &&
          siteData.keys.privateKey === privateKeyFromClient &&
          siteData.keys.publicKey === publicKeyFromClient
        ) {
          if (req.params.definitionId) {
            let definitionData = null;

            if (req.params.definitionId === 'contact-form') {
              definitionData = {
                id: 'contact-form',
                formsProvider: 'Signals',
                name: 'Contact Us',
                status: 'public',
                definitionkey: 'Contact Us',
                definitionrevision: '1',
                definitionJSON: [
                  {
                    fields: [
                      {
                        name: 'first_name',
                        size: 'small',
                        type: 'text',
                        class: '',
                        group: 'user',
                        label: 'First Name',
                        regex: '',
                        title: 'First Name',
                        value: '',
                        prefix: '',
                        suffix: '',
                        tipText: '',
                        bordered: true,
                        disabled: false,
                        required: true,
                        typeField: 'text',
                        typefield: 'text',
                        max_length: '',
                        min_length: '',
                        placeholder: 'Please enter your first name',
                      },
                      {
                        name: 'last_name',
                        size: 'small',
                        type: 'text',
                        class: '',
                        group: 'user',
                        label: 'Last Name',
                        regex: '',
                        title: 'Last Name',
                        value: '',
                        prefix: '',
                        suffix: '',
                        tipText: '',
                        bordered: true,
                        disabled: false,
                        required: true,
                        typeField: 'text',
                        typefield: 'text',
                        max_length: '',
                        min_length: '',
                        placeholder: 'Please enter your last name',
                      },
                      {
                        name: 'email',
                        size: 'small',
                        type: 'email',
                        class: '',
                        group: 'user',
                        label: 'Your Email',
                        regex: '',
                        title: 'Email',
                        value: '',
                        prefix: '',
                        suffix: '',
                        tipText: '',
                        bordered: true,
                        disabled: false,
                        required: true,
                        typeField: 'text',
                        typefield: 'text',
                        max_length: '',
                        min_length: '',
                        placeholder: 'Please enter your email address',
                      },
                      {
                        cols: '3',
                        name: 'your_message',
                        rows: '6',
                        size: 'small',
                        class: '',
                        group: 'common',
                        label: 'Your Message',
                        regex: '',
                        value: '',
                        fields: {
                          cols: {
                            name: 'cols',
                            step: '1',
                            label: 'Cols',
                            value: '3',
                            inputType: 'number',
                          },
                          rows: {
                            name: 'rows',
                            step: '1',
                            label: 'Rows',
                            value: '6',
                            inputType: 'number',
                          },
                          maxLength: {
                            name: 'max_length',
                            step: '1',
                            label: 'Max length',
                            value: '',
                            inputType: 'number',
                          },
                          minLength: {
                            name: 'min_length',
                            step: '1',
                            label: 'Min length',
                            value: '',
                            inputType: 'number',
                          },
                          showCount: {
                            name: 'showCount',
                            label: 'Show Count?',
                            value: true,
                            inputType: 'checkbox',
                          },
                        },
                        tipText: '',
                        bordered: true,
                        disabled: false,
                        required: true,
                        classIcon: 'fa-align-left',
                        showCount: true,
                        typeField: 'textArea',
                        typefield: 'textArea',
                        max_length: '',
                        min_length: '',
                        placeholder: 'Enter your message',
                      },
                      {
                        name: 'capatchaToken',
                        size: 'small',
                        group: 'miscellaneous',
                        label: 'Captcha Test',
                        value: '',
                        fields: {
                          value: {
                            name: 'value',
                            label: 'Value',
                            value: '',
                            inputType: 'text',
                          },
                        },
                        banField: {},
                        bordered: true,
                        disabled: false,
                        classIcon: 'fa-eye-slash',
                        typeField: 'captcha',
                        typefield: 'captcha',
                        showFields: {},
                      },
                      {
                        href: '',
                        size: 'small',
                        type: 'submit',
                        class: '',
                        group: 'common',
                        label: 'Submit',
                        fields: {
                          href: {
                            name: 'href',
                            label: 'Link Value',
                            value: '',
                            inputType: 'text',
                          },
                          type: {
                            name: 'type',
                            label: 'Type',
                            options: [
                              {
                                label: 'Button',
                                value: 'button',
                              },
                              {
                                label: 'Submit',
                                value: 'submit',
                              },
                              {
                                label: 'Reset',
                                value: 'reset',
                              },
                            ],
                            inputType: 'select',
                          },
                          target: {
                            name: 'target',
                            label: 'Link Target',
                            value: '',
                            inputType: 'text',
                          },
                          display: {
                            name: 'display',
                            label: 'Display',
                            options: [
                              {
                                label: 'Default',
                                value: 'default',
                              },
                              {
                                label: 'Primary',
                                value: 'primary',
                              },
                              {
                                label: 'Ghost',
                                value: 'ghost',
                              },
                              {
                                label: 'Dashed',
                                value: 'dashed',
                              },
                              {
                                label: 'Link',
                                value: 'link',
                              },
                            ],
                            inputType: 'select',
                          },
                        },
                        target: '',
                        display: 'primary',
                        banField: {},
                        bordered: true,
                        disabled: false,
                        classIcon: 'fa-circle',
                        typeField: 'button',
                        typefield: 'button',
                        showFields: {},
                      },
                    ],
                    category: 'Signals',
                    settings: {
                      formTitle: 'Contact Us',
                      displayFormTitle: false,
                      sendEmailConfirmation: false,
                      submissionDestination: siteData.notificationsEmail
                        ? siteData.notificationsEmail
                        : `${siteData.siteId}@example.com`,
                      emailConfirmationMessage:
                        'Thank you for submitting our contact us form.\n\nOne of our team members will be in touch as soon as possible.',
                      emailConfirmationSubject:
                        'Thank you for submitting our contact us form',
                    },
                  },
                ],
                createdAt: '2021-06-29 05:51:21.13+00',
                updatedAt: '2021-06-29 05:51:21.13+00',
                deletedAt: null,
                siteSiteId: siteData.siteId,
                sessionSessionId: null,
              };
            } else {
              definitionData = await db.formDefinition.findByPk(
                req.params.definitionId
              );
            }

            if (definitionData) {
              if (req.params.responseId) {
                const responseData = await db.formResponse.findByPk(
                  req.params.responseId
                );

                if (responseData) {
                  res.status(200);
                  res.json({
                    status: 'success',
                    message: 'Response was retrieved.',
                    record: responseData,
                  });
                } else {
                  res.status(404);
                  res.json({ status: 'error', message: 'No data was found.' });
                }
              } else {
                res.status(404);
                res.json({
                  status: 'error',
                  message: 'No response ID was provided.',
                });
              }
            } else {
              res.status(404);
              res.json({
                status: 'error',
                message: 'No definition was found.',
              });
            }
          } else {
            res.status(404);
            res.json({
              status: 'error',
              message: 'No definition was supplied.',
            });
          }
        } else {
          res.status(404);
          res.json({
            status: 'error',
            message: 'Keys did not match',
          });
        }
      } else {
        res.status(404);
        res.json({
          status: 'error',
          message: 'No site was found with that ID',
        });
      }
    } else {
      res.status(404);
      res.json({
        status: 'error',
        message: 'No site ID was provided',
      });
    }
  } else {
    res.status(403);
  }
};

exports.getAllFormResponses = async (req, res) => {
  if (
    res.locals.user &&
    isUserInTenant(res.locals.user, { id: req.params.siteId })
  ) {
    let publicKeyFromClient = req.headers.publickey;
    let privateKeyFromClient = req.headers.privatekey;

    if (req.params.siteId && publicKeyFromClient && privateKeyFromClient) {
      const siteData = await db.sites.findByPk(req.params.siteId);

      if (siteData && siteData.siteId) {
        if (
          siteData.keys &&
          siteData.keys.privateKey === privateKeyFromClient &&
          siteData.keys.publicKey === publicKeyFromClient
        ) {
          if (req.params.definitionId) {
            let definitionData = null;

            if (req.params.definitionId === 'contact-form') {
              definitionData = {
                id: 'contact-form',
                formsProvider: 'Signals',
                name: 'Contact Us',
                status: 'public',
                definitionkey: 'Contact Us',
                definitionrevision: '1',
                definitionJSON: [
                  {
                    fields: [
                      {
                        name: 'first_name',
                        size: 'small',
                        type: 'text',
                        class: '',
                        group: 'user',
                        label: 'First Name',
                        regex: '',
                        title: 'First Name',
                        value: '',
                        prefix: '',
                        suffix: '',
                        tipText: '',
                        bordered: true,
                        disabled: false,
                        required: true,
                        typeField: 'text',
                        typefield: 'text',
                        max_length: '',
                        min_length: '',
                        placeholder: 'Please enter your first name',
                      },
                      {
                        name: 'last_name',
                        size: 'small',
                        type: 'text',
                        class: '',
                        group: 'user',
                        label: 'Last Name',
                        regex: '',
                        title: 'Last Name',
                        value: '',
                        prefix: '',
                        suffix: '',
                        tipText: '',
                        bordered: true,
                        disabled: false,
                        required: true,
                        typeField: 'text',
                        typefield: 'text',
                        max_length: '',
                        min_length: '',
                        placeholder: 'Please enter your last name',
                      },
                      {
                        name: 'email',
                        size: 'small',
                        type: 'email',
                        class: '',
                        group: 'user',
                        label: 'Your Email',
                        regex: '',
                        title: 'Email',
                        value: '',
                        prefix: '',
                        suffix: '',
                        tipText: '',
                        bordered: true,
                        disabled: false,
                        required: true,
                        typeField: 'text',
                        typefield: 'text',
                        max_length: '',
                        min_length: '',
                        placeholder: 'Please enter your email address',
                      },
                      {
                        cols: '3',
                        name: 'your_message',
                        rows: '6',
                        size: 'small',
                        class: '',
                        group: 'common',
                        label: 'Your Message',
                        regex: '',
                        value: '',
                        fields: {
                          cols: {
                            name: 'cols',
                            step: '1',
                            label: 'Cols',
                            value: '3',
                            inputType: 'number',
                          },
                          rows: {
                            name: 'rows',
                            step: '1',
                            label: 'Rows',
                            value: '6',
                            inputType: 'number',
                          },
                          maxLength: {
                            name: 'max_length',
                            step: '1',
                            label: 'Max length',
                            value: '',
                            inputType: 'number',
                          },
                          minLength: {
                            name: 'min_length',
                            step: '1',
                            label: 'Min length',
                            value: '',
                            inputType: 'number',
                          },
                          showCount: {
                            name: 'showCount',
                            label: 'Show Count?',
                            value: true,
                            inputType: 'checkbox',
                          },
                        },
                        tipText: '',
                        bordered: true,
                        disabled: false,
                        required: true,
                        classIcon: 'fa-align-left',
                        showCount: true,
                        typeField: 'textArea',
                        typefield: 'textArea',
                        max_length: '',
                        min_length: '',
                        placeholder: 'Enter your message',
                      },
                      {
                        name: 'capatchaToken',
                        size: 'small',
                        group: 'miscellaneous',
                        label: 'Captcha Test',
                        value: '',
                        fields: {
                          value: {
                            name: 'value',
                            label: 'Value',
                            value: '',
                            inputType: 'text',
                          },
                        },
                        banField: {},
                        bordered: true,
                        disabled: false,
                        classIcon: 'fa-eye-slash',
                        typeField: 'captcha',
                        typefield: 'captcha',
                        showFields: {},
                      },
                      {
                        href: '',
                        size: 'small',
                        type: 'submit',
                        class: '',
                        group: 'common',
                        label: 'Submit',
                        fields: {
                          href: {
                            name: 'href',
                            label: 'Link Value',
                            value: '',
                            inputType: 'text',
                          },
                          type: {
                            name: 'type',
                            label: 'Type',
                            options: [
                              {
                                label: 'Button',
                                value: 'button',
                              },
                              {
                                label: 'Submit',
                                value: 'submit',
                              },
                              {
                                label: 'Reset',
                                value: 'reset',
                              },
                            ],
                            inputType: 'select',
                          },
                          target: {
                            name: 'target',
                            label: 'Link Target',
                            value: '',
                            inputType: 'text',
                          },
                          display: {
                            name: 'display',
                            label: 'Display',
                            options: [
                              {
                                label: 'Default',
                                value: 'default',
                              },
                              {
                                label: 'Primary',
                                value: 'primary',
                              },
                              {
                                label: 'Ghost',
                                value: 'ghost',
                              },
                              {
                                label: 'Dashed',
                                value: 'dashed',
                              },
                              {
                                label: 'Link',
                                value: 'link',
                              },
                            ],
                            inputType: 'select',
                          },
                        },
                        target: '',
                        display: 'primary',
                        banField: {},
                        bordered: true,
                        disabled: false,
                        classIcon: 'fa-circle',
                        typeField: 'button',
                        typefield: 'button',
                        showFields: {},
                      },
                    ],
                    category: 'Signals',
                    settings: {
                      formTitle: 'Contact Us',
                      displayFormTitle: false,
                      sendEmailConfirmation: false,
                      submissionDestination: siteData.notificationsEmail
                        ? siteData.notificationsEmail
                        : `${siteData.siteId}@example.com`,
                      emailConfirmationMessage:
                        'Thank you for submitting our contact us form.\n\nOne of our team members will be in touch as soon as possible.',
                      emailConfirmationSubject:
                        'Thank you for submitting our contact us form',
                    },
                  },
                ],
                createdAt: '2021-06-29 05:51:21.13+00',
                updatedAt: '2021-06-29 05:51:21.13+00',
                deletedAt: null,
                siteSiteId: siteData.siteId,
                sessionSessionId: null,
              };
            } else {
              definitionData = await db.formDefinition.findByPk(
                req.params.definitionId
              );
            }

            if (definitionData) {
              const responseData = await db.formResponse.findAll({
                attributes: [
                  'id',
                  'submittedfrom',
                  'userInformationData',
                  'createdAt',
                  'updatedAt',
                  'definitionId',
                  'siteSiteId',
                  'sessionSessionId',
                ],
                where: {
                  siteSiteId: req.params.siteId,
                  definitionId:
                    req.params.definitionId !== 'contact-form'
                      ? req.params.definitionId
                      : req.params.definitionId === 'contact-form'
                      ? '94ab9866-3561-42ff-a80f-1ccdab22b390'
                      : null,
                },
              });

              if (definitionData) {
                res.status(200);
                res.json({
                  status: 'success',
                  message: 'Responses were retrieved.',
                  record: responseData,
                });
              } else {
                res.status(404);
                res.json({ status: 'error', message: 'No data was found.' });
              }
            } else {
              res.status(404);
              res.json({
                status: 'error',
                message: 'No definition was found.',
              });
            }
          } else {
            res.status(404);
            res.json({
              status: 'error',
              message: 'No definition was supplied.',
            });
          }
        } else {
          res.status(404);
          res.json({
            status: 'error',
            message: 'Keys did not match',
          });
        }
      } else {
        res.status(404);
        res.json({
          status: 'error',
          message: 'No site was found with that ID',
        });
      }
    } else {
      res.status(404);
      res.json({
        status: 'error',
        message: 'No site ID was provided',
      });
    }
  } else {
    res.status(403);
  }
};
