'use strict';

// Status Filter
angular.module('risevision.displaysApp.filters')
  .filter('status', function () {
    return function (display) {
      if (angular.isUndefined(display)) {
        return 'notinstalled';
      } else {
        if (display.blockExpiryDate) {
          return 'blocked';
        } else if (display.lastConnectionDate) {
          if (display.playerErrorCode !== 0) {
            return 'error';
          } else if (display.connected) {
            return 'online';
          } else {
            return 'offline';
          }
        } else {
          return 'notinstalled';
        }
      }
    };
  });
