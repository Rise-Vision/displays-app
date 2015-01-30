'use strict';

/*jshint camelcase: false */

angular.module('risevision.displaysApp.services')
  .constant('DISPLAY_WRITABLE_FIELDS', [
    'name', 'status', 'useCompanyAddress', 'addressDescription', 'street',
    'unit', 'city', 'province', 'country', 'postalCode', 'timeZoneOffset',
    'restartEnabled', 'restartTime', 'monitoringEnabled',
    'browserUpgradeMode', 'width', 'height'
  ])
  .service('display', ['$q', '$log', 'coreAPILoader', 'userState',
    'pick', 'DISPLAY_WRITABLE_FIELDS',
    function ($q, $log, coreAPILoader, userState, pick,
      DISPLAY_WRITABLE_FIELDS) {

      var service = {
        list: function (search, cursor) {
          var deferred = $q.defer();

          var query = search.query ? 'name: ~\'' + search.query + '\'' :
            'companyId: ' +
            userState.getSelectedCompanyId();

          var obj = {
            'companyId': userState.getSelectedCompanyId(),
            'search': query,
            'cursor': cursor,
            'count': search.count,
            'sort': search.sortBy + (search.reverse ? ' desc' : ' asc')
          };
          $log.debug('list displays called with', obj);
          coreAPILoader().then(function (coreApi) {
            return coreApi.display.list(obj);
          })
            .then(function (resp) {
              deferred.resolve(resp.result);
            })
            .then(null, function (e) {
              $log.error('Failed to get list of displays.', e);
              deferred.reject(e);
            });

          return deferred.promise;
        },
        get: function (displayId) {
          var deferred = $q.defer();

          var obj = {
            'id': displayId
          };

          $log.debug('get display called with', displayId);
          coreAPILoader().then(function (coreApi) {
            return coreApi.display.get(obj);
          })
            .then(function (resp) {
              $log.debug('get display resp', resp);
              deferred.resolve(resp.result);
            })
            .then(null, function (e) {
              $log.error('Failed to get display.', e);
              deferred.reject(e);
            });

          return deferred.promise;
        },
        add: function (display) {
          var deferred = $q.defer();

          var fields = pick.apply(this, [display].concat(
            DISPLAY_WRITABLE_FIELDS));
          var obj = {
            'companyId': userState.getSelectedCompanyId(),
            'data': fields
          };
          coreAPILoader().then(function (coreApi) {
            return coreApi.display.add(obj);
          })
            .then(function (resp) {
              $log.debug('added display', resp);
              deferred.resolve(resp);
            })
            .then(null, function (e) {
              $log.error('Failed to add display.', e);
              deferred.reject(e);
            });
          return deferred.promise;
        },
        update: function (displayId, display) {
          var deferred = $q.defer();

          var fields = pick.apply(this, [display].concat(
            DISPLAY_WRITABLE_FIELDS));
          var obj = {
            'id': displayId,
            'data': fields
          };

          $log.debug('update display called with', displayId);
          coreAPILoader().then(function (coreApi) {
            return coreApi.display.patch(obj);
          })
            .then(function (resp) {
              $log.debug('update display resp', resp);
              deferred.resolve(resp);
            })
            .then(null, function (e) {
              $log.error('Failed to update display.', e);
              deferred.reject(e);
            });

          return deferred.promise;
        },
        delete: function (displayId) {
          var deferred = $q.defer();

          var obj = {
            'id': displayId
          };

          $log.debug('delete display called with', displayId);
          coreAPILoader().then(function (coreApi) {
            return coreApi.display.delete(obj);
          })
            .then(function (resp) {
              $log.debug('delete display resp', resp);
              deferred.resolve(resp);
            })
            .then(null, function (e) {
              $log.error('Failed to delete display.', e);
              deferred.reject(e);
            });

          return deferred.promise;
        },
        restart: function (displayId) {
          var deferred = $q.defer();

          var obj = {
            'id': displayId
          };

          $log.debug('restart display called with', displayId);
          coreAPILoader().then(function (coreApi) {
            return coreApi.display.restart(obj);
          })
            .then(function (resp) {
              $log.debug('restart display resp', resp);
              deferred.resolve(resp);
            })
            .then(null, function (e) {
              $log.error('Failed to restart display.', e);
              deferred.reject(e);
            });

          return deferred.promise;
        },
        reboot: function (displayId) {
          var deferred = $q.defer();

          var obj = {
            'id': displayId
          };

          $log.debug('reboot display called with', displayId);
          coreAPILoader().then(function (coreApi) {
            return coreApi.display.reboot(obj);
          })
            .then(function (resp) {
              $log.debug('reboot display resp', resp);
              deferred.resolve(resp);
            })
            .then(null, function (e) {
              $log.error('Failed to reboot display.', e);
              deferred.reject(e);
            });

          return deferred.promise;
        }
      };

      return service;
    }
  ]);
