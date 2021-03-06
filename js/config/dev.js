/*
 * App Configuration File
 * Put environment-specific global variables in this file.
 *
 * In general, if you put an variable here, you will want to
 * make sure to put an equivalent variable in all three places:
 * dev.js, test.js & prod.js
 *
 */

(function (angular) {

  'use strict';

  angular.module('risevision.common.i18n.config', [])
    .constant('LOCALES_PREFIX',
      'bower_components/rv-common-i18n/dist/locales/translation_')
    .constant('LOCALES_SUFIX', '.json');

  angular.module('risevision.displaysApp.config', [])
    .value('STORAGE_API_ROOT',
      'https://storage-dot-rvacore-test.appspot.com/_ah/api')
    .value('ALERTS_WS_URL',
      'https://rvacore-test.appspot.com/alerts/cap')
    .value('CORE_URL',
      'https://rvacore-test.appspot.com/_ah/api'); // override default core value

})(angular);
