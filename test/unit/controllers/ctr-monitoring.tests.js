'use strict';
describe('controller: display add', function() {
  var displayId = 1234;
  beforeEach(module('risevision.displaysApp.controllers'));
  beforeEach(module('risevision.displaysApp.services'));
  beforeEach(module(function ($provide) {
    $provide.service('userState',userState);
  }));
  var $scope, userState, userStateGetCopyOfSelectedCompanySpy;
  beforeEach(function(){

    userState = function(){
      return {
        getCopyOfSelectedCompany : function(){
          return {id: 'anyId', notificationEmails: ['email1', 'email2'] };
        },
        _restoreState : function(){

        }
      }
    };

    inject(function($injector,$rootScope, $controller){
      $scope = $rootScope.$new();
      userState = $injector.get('userState');
      userStateGetCopyOfSelectedCompanySpy = sinon.spy(userState, 'getCopyOfSelectedCompany');
      $controller('monitoring', {
        $scope : $scope,
        userState: userState
      });
      $scope.$digest();
    });
  });
  
  it('should exist',function(){
    expect($scope).to.be.truely;
  });

  it('should set the scope monitoringEmails',function(){
    userStateGetCopyOfSelectedCompanySpy.should.have.been.called;
    expect($scope.monitoringEmails).to.be.truely;
    expect($scope.monitoringEmails).to.deep.equal(['email1', 'email2']);
  });
});
