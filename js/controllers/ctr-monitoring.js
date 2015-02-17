'use strict';

// controls Restart/Reboot functionality
angular.module('risevision.displaysApp.controllers')
  .controller('monitoring', ['$scope', 'userState',
    function ($scope, userState) {
      $scope.monitoringEmails = userState.getCopyOfSelectedCompany().notificationEmails;
    }
  ]);
