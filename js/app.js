'use strict';

angular.module('risevision.displaysApp', [
  'ui.router',
  'risevision.common.header',
  'risevision.common.header.templates',
  'risevision.common.components.last-modified',
  'risevision.common.components.search-filter',
  'risevision.common.components.scrolling-list',
  'risevision.common.components.focus-me',
  'risevision.common.components.google-analytics',
  'ngTouch',
  'ui.bootstrap',
  'ui.bootstrap.showErrors',
  'risevision.displaysApp.config',
  'risevision.displaysApp.services',
  'risevision.displaysApp.controllers',
  'risevision.displaysApp.filters',
  'risevision.displaysApp.directives',
  'risevision.common.loading',
  'risevision.common.i18n'
])
// Set up our mappings between URLs, templates, and controllers
.config(['$urlRouterProvider', '$stateProvider',
  function storeRouteConfig($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/display/list');

    // Use $stateProvider to configure states.
    $stateProvider

    .state('display', {
      template: '<div ui-view></div>'
    })

    .state('display.reset', {
      template: '',
      url: '/reset',
      controller: ['$timeout', '$state',

        function ($timeout, $state) {
          $timeout(function () {
            $state.go('display.list');
          });
        }
      ]
    })

    .state('display.list', {
      url: '/display/list',
      templateUrl: 'partials/displays-list.html',
      controller: 'displaysList',
      resolve: {
        canAccessDisplays: ['canAccessDisplays',
          function (canAccessDisplays) {
            return canAccessDisplays();
          }
        ]
      }
    })

    .state('display.details', {
      url: '/display/details/:displayId',
      templateUrl: 'partials/display-details.html',
      controller: 'displayDetails',
      resolve: {
        canAccessDisplays: ['canAccessDisplays',
          function (canAccessDisplays) {
            return canAccessDisplays();
          }
        ]
      }
    })

    .state('display.add', {
      url: '/display/add',
      templateUrl: 'partials/display-add.html',
      controller: 'displayAdd',
      resolve: {
        canAccessDisplays: ['canAccessDisplays',
          function (canAccessDisplays) {
            return canAccessDisplays();
          }
        ]
      }
    });
  }
])
  .run(['$rootScope', '$state', 'userState',
    function ($rootScope, $state, userState) {
      $rootScope.$on('risevision.user.signedOut', function () {
        $state.go('display.reset');
      });
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
