'use strict';

angular.module('risevision.displaysApp', [
    'ui.router',
    'risevision.common.header',
    'risevision.common.header.templates',
    'risevision.common.components.last-modified',
    'risevision.common.components.search-filter',
    'risevision.common.components.scrolling-list',
    'risevision.common.components.focus-me',
    'risevision.common.components.confirm-instance',
    'risevision.common.components.analytics',
    'risevision.common.components.distribution-selector',
    'risevision.common.components.presentation-selector',
    'ngTouch',
    'ui.bootstrap',
    'ui.bootstrap.showErrors',
    'risevision.displaysApp.partials',
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
      $stateProvider.state('display', {
        template: '<div ui-view></div>'
      })

      .state('display.root', {
        templateProvider: ['$templateCache', function ($templateCache) {
          return $templateCache.get('partials/landing-page.html');
        }],
        url: '/',
        controller: ['canAccessDisplays', '$state',

          function (canAccessDisplays, $state) {
            canAccessDisplays().then(function () {
              $state.go('display.list');
            });
          }
        ]
      })

      .state('display.list', {
        url: '/display/list',
        templateProvider: ['$templateCache', function ($templateCache) {
          return $templateCache.get('partials/displays-list.html');
        }],
        controller: 'displaysList',
        resolve: {
          canAccessDisplays: ['canAccessDisplays',
            function (canAccessDisplays) {
              return canAccessDisplays();
            }
          ]
        }
      })

      .state('display.change', {
        url: '/display/change/:displayId/:companyId',
        controller: ['canAccessDisplays', 'userState', '$stateParams',
          '$state', '$location',
          function (canAccessDisplays, userState, $stateParams, $state,
            $location) {
            return canAccessDisplays().then(function () {
                if (userState.getSelectedCompanyId() !== $stateParams
                  .companyId) {
                  return userState.switchCompany($stateParams.companyId);
                } else {
                  return true;
                }
              })
              .then(function () {
                $location.replace();
                $state.go('display.details', {
                  displayId: $stateParams.displayId
                });
              });
          }
        ]
      })

      .state('display.details', {
        url: '/display/details/:displayId',
        templateProvider: ['$templateCache', function ($templateCache) {
          return $templateCache.get('partials/display-details.html');
        }],
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
        templateProvider: ['$templateCache', function ($templateCache) {
          return $templateCache.get('partials/display-add.html');
        }],
        controller: 'displayAdd',
        resolve: {
          canAccessDisplays: ['canAccessDisplays',
            function (canAccessDisplays) {
              return canAccessDisplays();
            }
          ]
        }
      })

      .state('display.alerts', {
        url: '/alerts',
        templateProvider: ['$templateCache', function ($templateCache) {
          return $templateCache.get('partials/alerts.html');
        }],
        controller: 'AlertsCtrl',
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
        $state.go('display.root');
      });

      $rootScope.$on('risevision.company.selectedCompanyChanged', function () {
        if ($state.current.name === 'display.list' ||
          $state.current.name === 'display.root') {
          $state.go($state.current.name, null, {
            reload: true
          });
        }
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
