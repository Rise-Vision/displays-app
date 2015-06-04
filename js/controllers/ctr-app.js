'use strict';

angular.module('risevision.displaysApp.controllers')
  .controller('AppCtrl', ['$scope', '$location',
    function ($scope, $rootScope, $location) {
      $scope.navOptions = [{
        title: 'Displays',
        link: '#/',
        states: ['root.common.displays']
      }];
      $scope.navSelected = 'root.common.displays';
    }
  ]); //ctr
