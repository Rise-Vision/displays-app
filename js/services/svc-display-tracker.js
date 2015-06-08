'use strict';

angular.module('risevision.displaysApp.services')
  .factory('displayTracker', ['userState', 'segmentAnalytics',
    function (userState, segmentAnalytics) {
      return function (eventName, displayId, displayName) {
        if (eventName) {
          segmentAnalytics.track(eventName, {
            displayId: displayId,
            displayName: displayName,
            companyId: userState.getSelectedCompanyId()
          });
        }
      };
    }
  ]);
