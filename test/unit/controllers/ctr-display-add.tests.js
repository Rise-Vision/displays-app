'use strict';
describe('controller: display add', function() {
  var displayId = 1234;
  beforeEach(module('risevision.displaysApp.controllers'));
  beforeEach(module('risevision.displaysApp.services'));
  beforeEach(module(function ($provide) {
    $provide.service('userState',userState);
    $provide.service('display',function(){
      return {
        _display: {},
        add : function(display){
          var deferred = Q.defer();
          if(updateDisplay){
            this._display = display;
            deferred.resolve({item: display});
          }else{
            deferred.reject('ERROR; could not create display');
          }
          return deferred.promise;
        }
      }
    });
    $provide.service('$state',function(){
      return {
        _state : '',
        go : function(state, params){
          if (state){
            this._state = state;
          }
          return this._state;
        }
      }
    });
  }));
  var $scope, userState, $state, updateDisplay, confirmDelete;
  beforeEach(function(){
    updateDisplay = true;
    
    userState = function(){
      return {
        getSelectedCompanyId : function(){
          return 'some_company_id';
        },
        _restoreState : function(){

        },
        isSubcompanySelected : function(){
          return true;
        }
      }
    };
    inject(function($injector,$rootScope, $controller){
      $scope = $rootScope.$new();
      $state = $injector.get('$state');
      $controller('displayAdd', {
        $scope : $scope,
        userState : $injector.get('userState'),
        display:$injector.get('display'),
        $state : $state,
        $log : $injector.get('$log')});
      $scope.$digest();
    });
  });
  
  it('should exist',function(){
    expect($scope).to.be.truely;

    expect($scope.save).to.be.a('function');
  });

  it('should init the correct defaults',function(){
    expect($scope.display).to.be.truely;
    expect($scope.display).to.deep.equal({
      'width': 1920,
      'height': 1080,
      'status': 1,
      'restartEnabled': true,
      'restartTime': '02:00',
      'monitoringEnabled': true,
      'useCompanyAddress': true
    });
  });

  it('should return early if the form is invalid',function(){
    $scope.displayDetails = {};
    $scope.displayDetails.$valid = false;
    $scope.save();
  });

  it('should save the display',function(done){
    updateDisplay = true;

    $scope.displayDetails = {};
    $scope.displayDetails.$valid = true;
    $scope.display = {id:123};
    $scope.save();
    expect($scope.savingDisplay).to.be.true;
    setTimeout(function(){
      expect($state._state).to.equal('display.details');
      expect($scope.savingDisplay).to.be.false;
      expect($state.submitError).to.not.be.ok;
      done();
    },10);
  });

  it('should show an error if fails to create display',function(done){
    updateDisplay = false;

    $scope.$digest();
    $scope.displayDetails = {};
    $scope.displayDetails.$valid = true;
    $scope.save();
    setTimeout(function(){
      expect($state._state).to.be.empty;
      expect($scope.savingDisplay).to.be.false;
      expect($scope.submitError).to.be.ok;
      done();
    },10);
  });

});
