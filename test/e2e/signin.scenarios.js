/**
 * Created by rodrigopavezi on 6/5/15.
 */
'use strict';
var expect = require('rv-common-e2e').expect;
var HomePage = require('./pages/homepage.js');
var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
var DisplaysListPage = require('./pages/displaysListPage.js');
var helper = require('rv-common-e2e').helper;
browser.driver.manage().window().setSize(1024, 768);
describe("In order to manage displays " +
         "As a user " +
         "I would like to be able to sign in to the Displays app", function() {
  this.timeout(2000);// to allow for protactor to load the seperate page
  var homepage;
  var commonHeaderPage;
  var displaysListPage;
  beforeEach(function (){
    homepage = new HomePage();
    commonHeaderPage = new CommonHeaderPage();
    displaysListPage = new DisplaysListPage();

    homepage.get();
    //wait for spinner to go away.
    browser.wait(function() {
      return element(by.css('.spinner-backdrop')).isDisplayed().then(function(result){return !result});
    }, 20000);
  });

  it('should sign in to the Displays app',function(){
    commonHeaderPage.signin();
    expect(displaysListPage.getTitle().isPresent()).to.eventually.be.true;
  });
});
