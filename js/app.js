'use strict';

angular.module('risevision.displaysApp', [
  'ngRoute',
  'risevision.common.header',
  'risevision.common.header.templates',
  'ngTouch',
  'ui.bootstrap',
  'ui.bootstrap.showErrors',
  'dotdotdot-angular',
  'risevision.displaysApp.services',
  'risevision.displaysApp.controllers',
  'risevision.displaysApp.filters',
  'risevision.displaysApp.directives',
  'risevision.common.loading',
  'risevision.common.i18n'
])
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'partials/displays-list.html',
          controller: 'displaysList',
          resolve: {
            loggedInUser: ['userState',
              function (userState) {
                return userState.authenticate(false);
              }
            ]
          }
        })
        .when('/display', {
          templateUrl: 'partials/display-add.html',
          controller: 'displayAdd',
          resolve: {
            loggedInUser: ['userState',
              function (userState) {
                return userState.authenticate(false);
              }
            ]
          }
        })
        .when('/display/:displayId', {
          templateUrl: 'partials/display-details.html',
          controller: 'displayDetails',
          resolve: {
            loggedInUser: ['userState',
              function (userState) {
                return userState.authenticate(false);
              }
            ]
          }
        })
        .otherwise({
          redirectTo: '/'
        });
    }
  ])
  .run(['$rootScope', 'userState', '$location',
    function ($rootScope, userState, $location) {
      // [AD] If the path is '/' and we try to redirect to the same path,
      // the routeProvider doesn't reload. As a workaround, redirecting to 
      // an unregistered path, which will redirect back to '/' and reload
      // the controller
      var _gotoRootAndRestoreState = function () {
        $location.path('/sign-out');
      };

      $rootScope.$on('risevision.user.signedOut', function () {
        //redirect to root when the user signs out
        _gotoRootAndRestoreState();
      });

      $rootScope.$watch(function () {
        return userState.getSelectedCompanyId();
      }, function (newVal, oldVal) {
        if (newVal && oldVal && $location.path() !== '/') {
          $location.path('/');
        }
      }, true);
    }
  ])
  .config(['showErrorsConfigProvider',
    function (showErrorsConfigProvider) {
      showErrorsConfigProvider.trigger('keypress');
    }
  ]);

angular.module('risevision.displaysApp.services', [
  'risevision.common.header',
  'risevision.common.gapi'
]);

angular.module('risevision.displaysApp.filters', []);
angular.module('risevision.displaysApp.directives', [
  'risevision.displaysApp.filters'
]);
angular.module('risevision.displaysApp.controllers', []);
