'use strict';

//updated url parameters to selected display status from status filter
angular.module('risevision.displaysApp.controllers')
  .controller('displayDetails', ['$scope', '$q', '$routeParams',
    'display', '$location', '$loading', '$modal', '$log',
    function ($scope, $q, $routeParams, display, $location,
      $loading, $modal, $log) {
      $scope.displayId = $routeParams.displayId;
      $scope.savingDisplay = false;

      $scope.$watch('loadingDisplay', function (loading) {
        if (loading) {
          $loading.start('display-loader');
        } else {
          $loading.stop('display-loader');
        }
      });

      $scope.$watch('displayId', function (displayId) {
        if (displayId) {
          _getDisplay();
        }
      });

      var _getDisplay = function () {
        //load the display based on the url param
        $scope.loadingDisplay = true;

        display.get($scope.displayId)
          .then(function (result) {
            $scope.display = result.item;
          })
          .then(null, function (e) {
            $scope.submitError = e.message ? e.message : e.toString();
          })
          .finally(function () {
            $scope.loadingDisplay = false;
          });
      };

      var _delete = function () {
        //show loading spinner
        $scope.loadingDisplay = true;

        display.delete($scope.displayId)
          .then(function (result) {
            $scope.display = result.item;

            $location.path('#/');
          })
          .then(null, function (e) {
            $scope.submitError = e.message ? e.message : e.toString();
          })
          .finally(function () {
            $scope.loadingDisplay = false;
          });
      };

      $scope.confirmDelete = function () {
        $scope.modalInstance = $modal.open({
          templateUrl: 'partials/confirm-modal.html',
          controller: 'confirmInstance',
          windowClass: 'modal-custom',
          resolve: {
            confirmationTitle: function () {
              return 'displays-app.details.deleteTitle';
            },
            confirmationMessage: function () {
              return 'displays-app.details.deleteWarning';
            },
            confirmationButton: function () {
              return 'common.delete-forever';
            },
            cancelButton: null
          }
        });

        $scope.modalInstance.result.then(function () {
          // do what you need if user presses ok
          _delete();
        }, function () {
          // do what you need to do if user cancels
        });
      };

      $scope.addDisplay = function () {
        if (!$scope.displayDetails.$dirty) {
          $location.path('display');
        } else {
          $scope.modalInstance = $modal.open({
            templateUrl: 'partials/confirm-modal.html',
            controller: 'confirmInstance',
            windowClass: 'modal-custom',
            resolve: {
              confirmationTitle: function () {
                return 'displays-app.details.unsavedTitle';
              },
              confirmationMessage: function () {
                return 'displays-app.details.unsavedWarning';
              },
              confirmationButton: function () {
                return 'common.save';
              },
              cancelButton: function () {
                return 'common.discard';
              }
            }
          });

          $scope.modalInstance.result.then(function () {
            // do what you need if user presses ok
            $scope.save()
              .then(function () {
                $location.path('display');
              });
          }, function (value) {
            // do what you need to do if user cancels
            if (value) {
              $location.path('display');
            }
          });
        }
      };

      $scope.save = function () {
        var deferred = $q.defer();

        if (!$scope.displayDetails.$valid) {
          $log.error('form not valid: ', $scope.displayDetails.errors);
          deferred.reject();
        } else {
          $scope.savingDisplay = true;

          display.update($scope.displayId, $scope.display)
            .then(function (displayId) {
              if (!$scope.displayId) {
                $location.path('displays/' + displayId);
              }

              deferred.resolve();
            })
            .then(null, function (e) {
              $scope.submitError = e.message ? e.message : e.toString();

              deferred.reject();
            })
            .finally(function () {
              $scope.savingDisplay = false;
            });
        }

        return deferred.promise;
      };

    }
  ]);
