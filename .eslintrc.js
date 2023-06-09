/* @flow */

module.exports = {
  extends: "@krakenjs/eslint-config-grumbler/eslintrc-browser",

  globals: {
    __STAGE__: true,
    __VERSION__: true,

    __PROTOCOL__: true,
    __SDK_HOST__: true,
    __HOST__: true,
    __HOSTNAME__: true,
    __PORT__: true,
    __PATH__: true,
    __STAGE_HOST__: true,
    __SERVICE_STAGE_HOST__: true,
    __CORRELATION_ID__: true,
    __NAMESPACE__: true,
    __COMPONENTS__: true,
    __FUNDING_ELIGIBILITY__: true,
    __PAYPAL_DOMAIN__: true,
    __PAYPAL_API_DOMAIN__: true,
    __PAYPAL_POPUP_DOMAIN__: true,
  },
};
