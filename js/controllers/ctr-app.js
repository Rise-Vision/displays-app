'use strict';

angular.module('risevision.displaysApp.controllers')
  .controller('AppCtrl', ['$scope', '$rootScope', '$state',
    function ($scope, $rootScope, $state) {
      $scope.navOptions = [{
        title: 'Displays',
        link: '#/',
        states: ['display.root', 'display.list', 'display.add',
          'display.details'
        ]
      }, {
        title: 'Alerts',
        link: '#/alerts',
        states: ['display.alerts']
      }];
      $scope.navSelected = 'display.root';
      $rootScope.$on('$stateChangeSuccess', function () {
        $scope.navSelected = $state.current.name;
      });
    }
  ]); //ctr
