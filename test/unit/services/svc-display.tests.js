'use strict';
describe('service: display:', function() {
  beforeEach(module('risevision.displaysApp.services'));
  beforeEach(module(function ($provide) {
    $provide.service('$q', function() {return Q;});
    $provide.service('userState',function(){
      return {
        getAccessToken : function(){
          return{access_token: 'TEST_TOKEN'};
        },
        getSelectedCompanyId : function(){
          return 'TEST_COMP_ID';
        },
        getCopyOfSelectedCompany : function(){
          return {
            name : 'TEST_COMP',
            id : 'TEST_COMP_ID'
          }
        },
        getCopyOfProfile : function(){
          return {
            firstName : 'first',
            lastName : 'lastName',
            telephone : '123',
            email : 'foo@bar'
          };
        },
        _restoreState:function(){}
      }
    });

    $provide.service('coreAPILoader',function () {
      return function(){
        var deferred = Q.defer();
                
        deferred.resolve({
          display: {
            list: function(obj){
              expect(obj).to.be.ok;
              
              searchString = obj.search;
              sortString = obj.sort;

              var def = Q.defer();
              if (returnList) {
                def.resolve({
                  result : {
                    nextPageToken : 1,
                    items : [{}]
                  }
                });
              } else {
                def.reject("API Failed");
              }
              return def.promise;
            },
            get: function(obj){
              expect(obj).to.be.ok;
              
              var def = Q.defer();
              if (obj.id) {
                def.resolve({
                  result: {
                    item: {
                      "id": "display1",
                      "companyId": "TEST_COMP_ID",
                      "name": "Test Display",
                      "creationDate": "2012-04-02T14:19:36.000Z",
                      "status": 1,
                      "width": 1124,
                      "height": 768,
                      "restartEnabled": true,
                      "restartTime": "02:45",
                      "connected": false
                    }
                  }
                });
              } else {
                def.reject("API Failed");
              }
              return def.promise;
            },
            add: function(obj) {
              expect(obj).to.be.ok;
              expect(obj.companyId).to.equal('TEST_COMP_ID');
              expect(obj).to.have.property("data");
              
              var def = Q.defer();
              if (obj.data.name) {
                expect(obj.data).to.have.property("name");
                expect(obj.data).to.not.have.property("id");
                
                obj.data.id = "display1"
                
                def.resolve({
                  result: {
                    item: obj.data
                  }
                });
              } else {
                def.reject("API Failed");
              }
              return def.promise;
            },
            patch: function(obj) {
              expect(obj).to.be.ok;
              expect(obj.id).to.equal('display1');
              expect(obj.data).to.be.ok;
              
              var def = Q.defer();
              if (obj.data.name) {
                expect(obj.data).to.have.property("name");
                
                def.resolve({
                  result: {
                    item: obj.data
                  }
                });
              } else {
                def.reject("API Failed");
              }
              return def.promise;
            },
            delete: function(obj) {
              expect(obj).to.be.ok;

              var def = Q.defer();
              if (obj.id) {
                def.resolve({
                  item: {}
                });
              } else {
                def.reject("API Failed");
              }
              return def.promise;
            },
            restart: function(obj) {
              expect(obj).to.be.ok;

              var def = Q.defer();
              if (obj.id) {
                def.resolve({
                  item: {}
                });
              } else {
                def.reject("API Failed");
              }
              return def.promise;
            },
            reboot: function(obj) {
              expect(obj).to.be.ok;

              var def = Q.defer();
              if (obj.id) {
                def.resolve({
                  item: {}
                });
              } else {
                def.reject("API Failed");
              }
              return def.promise;
            }
          }
        });
        return deferred.promise;
      };
    });

  }));
  var display, returnList, searchString, sortString;
  beforeEach(function(){
    returnList = true;
    searchString = '';
    sortString='';
    
    inject(function($injector){  
      display = $injector.get('display');
    });
  });

  it('should exist',function(){
    expect(display).to.be.truely;
    expect(display.list).to.be.a('function');
    expect(display.get).to.be.a('function');
    expect(display.add).to.be.a('function');
    expect(display.update).to.be.a('function');
    expect(display.delete).to.be.a('function');
    expect(display.restart).to.be.a('function');
    expect(display.reboot).to.be.a('function');
  });
  
  describe('list:',function(){
    it('should return a list of displays',function(done){
      display.list({})
      .then(function(result){
        expect(result).to.be.truely;
        expect(result.items).to.be.an.array;
        expect(result.items).to.have.length.above(0);
        done();
      })
      .then(null,done);
    });
    
    it('should create an empty searchString if query is empty',function(done){
      display.list({})
      .then(function(result){
        expect(searchString).to.equal('');

        done();
      })
      .then(null,done);
    });

    it('should set sort to be desc if reverse option is passed',function(done){
      display.list({sortBy: 'anyThing', reverse: true})
        .then(function(result){
          expect(sortString).to.equal('anyThing desc');

          done();
        })
        .then(null,done);
    });

    it('should set sort to be asc if reverse option is not passed',function(done){
      display.list({sortBy: 'anyThing'})
        .then(function(result){
          expect(sortString).to.equal('anyThing asc');

          done();
        })
        .then(null,done);
    });

    it('should output a proper search string',function(done){
      display.list({query: 'str'})
        .then(function(result){
          expect(searchString).to.equal('name:~\'str\' OR id:~\'str\' OR street:~\'str\' OR unit:~\'str\' OR city:~\'str\' OR province:~\'str\' OR country:~\'str\' OR postalCode:~\'str\'');

          done();
        })
        .then(null,done);
    });
    
    it("should handle failure to get list correctly",function(done){
      returnList = false;
      
      display.list({})
      .then(function(displays) {
        done(displays);
      })
      .then(null, function(error) {
        expect(error).to.deep.equal('API Failed');
        done();
      })
      .then(null,done);
    });
  });
  
  describe('get:',function(){
    it('should return a display',function(done){
      display.get('display1')
      .then(function(result){
        expect(result).to.be.truely;
        expect(result.item).to.be.truely;
        expect(result.item).to.have.property("name");
        
        done();
      })
      .then(null,done);
    });
    
    it("should handle failure to get display correctly",function(done){
      display.get()
      .then(function(result) {
        done(result);
      })
      .then(null, function(error) {
        expect(error).to.deep.equal('API Failed');
        done();
      })
      .then(null,done);
    });
  });
  
  describe('add:',function(){
    var displayObject = {
      "name": "Test Display",
      "status": 1,
      "width": 1124,
      "height": 768,
      "restartEnabled": true,
      "restartTime": "02:45",
    };
    
    it('should add a display',function(done){
      display.add(displayObject)
      .then(function(result){
        expect(result).to.be.truely;
        expect(result.item).to.be.truely;
        expect(result.item).to.have.property("name");
        expect(result.item).to.have.property("id");
        expect(result.item.id).to.equal("display1");
        
        done();
      })
      .then(null,done);
    });
    
    it("should handle failure to add display",function(done){
      display.add({})
      .then(function(result) {
        done(result);
      })
      .then(null, function(error) {
        expect(error).to.deep.equal('API Failed');
        done();
      })
      .then(null,done);
    });
  });
  
  describe('update:',function(){
    var displayObject = {
      "name": "Test Display",
      "id": "display1",
      "companyId": "TEST_COMP_ID",
      "status": 1,
      "width": 1124,
      "height": 768,
      "restartEnabled": true,
      "restartTime": "02:45",
    };
    
    it('should update a display',function(done){
      display.update(displayObject.id, displayObject)
      .then(function(result){
        expect(result).to.be.truely;
        expect(result.item).to.be.truely;
        
        done();
      })
      .then(null,done);
    });
    
    it('should remove extra properties',function(done){
      display.update(displayObject.id, displayObject)
      .then(function(result){
        expect(result).to.be.truely;
        expect(result.item).to.be.truely;
        expect(result.item).to.not.have.property("connected");
        
        done();
      })
      .then(null,done);
    });
    
    it("should handle failure to update display",function(done){
      display.update(displayObject.id, {})
      .then(function(result) {
        done(result);
      })
      .then(null, function(error) {
        expect(error).to.deep.equal('API Failed');
        done();
      })
      .then(null,done);
    });
  });

  describe('delete:',function(){
    it('should delete a display',function(done){
      display.delete('display1')
        .then(function(result){
          expect(result).to.be.truely;
          expect(result.item).to.be.truely;

          done();
        })
        .then(null,done);
    });

    it("should handle failure to delete display",function(done){
      display.delete()
        .then(function(result) {
          done(result);
        })
        .then(null, function(error) {
          expect(error).to.deep.equal('API Failed');
          done();
        })
        .then(null,done);
    });
  });

  describe('restart:',function(){
    it('should restart a display',function(done){
      display.restart('display1')
        .then(function(result){
          expect(result).to.be.truely;
          expect(result.item).to.be.truely;

          done();
        })
        .then(null,done);
    });

    it("should handle failure to restart display",function(done){
      display.restart()
        .then(function(result) {
          done(result);
        })
        .then(null, function(error) {
          expect(error).to.deep.equal('API Failed');
          done();
        })
        .then(null,done);
    });
  });


  describe('reboot', function(){
    it('should reboot a display',function(done){
      display.reboot('display1')
        .then(function(result){
          expect(result).to.be.truely;
          expect(result.item).to.be.truely;

          done();
        })
        .then(null,done);
    });

    it("should handle failure to reboot display",function(done){
      display.reboot()
        .then(function(result) {
          done(result);
        })
        .then(null, function(error) {
          expect(error).to.deep.equal('API Failed');
          done();
        })
        .then(null,done);
    });
  });
});
