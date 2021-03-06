'use strict';
describe('controller: app', function() {
  beforeEach(module('risevision.displaysApp.controllers'));
  
  beforeEach(module(function ($provide) {
    $provide.factory('$state',function(){
      return {
        current: {
          name: "display.alerts"
        }
      };
    });      
  }));

  var $scope,stateName,rootScope;
  beforeEach(function(){
    inject(function($injector,$rootScope, $controller){
      rootScope = $rootScope;
      $scope = $rootScope.$new();
      $controller('AppCtrl', {
        $scope: $scope,
        $rootScope : $rootScope,
        $state: $injector.get('$state')
      });
      $scope.$digest();
    });
  });

  it('should exist',function(){
    expect($scope).to.be.truely;
    expect($scope.navOptions).to.be.truely;
    expect($scope.navSelected).to.be.truely;
  });

  it('should update $scope.navSelected based on state',function(){
    expect($scope.navSelected).to.equal('display.root');
    rootScope.$broadcast('$stateChangeSuccess');
    expect($scope.navSelected).to.equal('display.alerts');
  })
});
