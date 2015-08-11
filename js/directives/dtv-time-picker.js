'use strict';

angular.module('risevision.displaysApp.directives')
  .directive('timePicker', ['timeParser',
    function (timeParser) {

      return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
          disabled: '=ngDisabled',
          timeString: '=ngModel'
        },
        templateUrl: 'partials/time-picker.html',
        link: function ($scope, elm, attrs, ctrl) {
            $scope.hstep = 1;
            $scope.mstep = 15;
            $scope.ismeridian = true;

            $scope.changed = function () {
              ctrl.$setViewValue(timeParser.getTime($scope.time));
            };

            $scope.$watch('timeString', function (newValue, oldValue) {
              $scope.time = timeParser.parseTime(newValue);
            });

          } //link()
      };
    }
  ]);
