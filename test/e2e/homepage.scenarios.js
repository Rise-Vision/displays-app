'use strict';
var expect = require('rv-common-e2e').expect;
var HomePage = require('./pages/homepage.js');
var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
var GoogleAuthPage = require('rv-common-e2e').googleAuthPage;

browser.driver.manage().window().setSize(1024, 768);
describe("In order to manage displays " +
         "As a user " +
         "I would like to have access to the homepage of the displays app", function() {
  this.timeout(2000);// to allow for protactor to load the seperate page
  var homepage;
  var commonHeaderPage;
  var googleAuthPage;
  before(function (){
    homepage = new HomePage();
    commonHeaderPage = new CommonHeaderPage();
    googleAuthPage = new GoogleAuthPage();
    homepage.get();
    //wait for spinner to go away.
    browser.wait(function() {
      return element(by.css('.spinner-backdrop')).isDisplayed().then(function(result){return !result});
    }, 20000);
  });

  describe("Given a user who access the displays app", function() {

    before(function (){
      homepage.get();
      //wait for spinner to go away.
      browser.wait(function() {
        return element(by.css('.spinner-backdrop')).isDisplayed().then(function(result){return !result});
      }, 20000);
    });

    it('should load',function(){
      expect(homepage.getDisplaysAppContainer().isPresent()).to.eventually.be.true;
    });

    it('should load common header',function(){
      expect(commonHeaderPage.getCommonHeader().isPresent()).to.eventually.be.true;
    });

    it('should have a display menu item on the common header',function(){
      expect(commonHeaderPage.getCommonHeaderMenuItems().get(0).isPresent()).to.eventually.be.true;
      expect(commonHeaderPage.getCommonHeaderMenuItems().get(0).getText()).to.eventually.equal('Displays');
    });

    it('should go to home when clicking on Displays menu item',function(){
      commonHeaderPage.getCommonHeaderMenuItems().get(0).click();
      expect(browser.getCurrentUrl()).to.eventually.equal(homepage.getUrl());
    });

    it('should show the displays image',function(){
      expect(homepage.getDisplaysImage().isPresent()).to.eventually.be.true;
    });

    it('should show the manage displays text',function(){
      expect(homepage.getManageDisplaysText().getText()).to.eventually.equal('Manage an unlimited number of digital signage displays anywhere in the world.');
    });

    it('should show the displays explanation text',function(){
      expect(homepage.getDisplaysExplanationText().getText()).to.eventually.equal('Displays is where you can add, remove, configure, connect, disconnect and restart any display in your network.');
    });

    it('should show the Sign Up link',function(){
      expect(homepage.getSignUpLink().isPresent()).to.eventually.be.true;
    });

    it('should show the Sign In link',function(){
      expect(homepage.getSignInLink().isPresent()).to.eventually.be.true;
    });

    it('should show the Sign Up text',function(){
      expect(homepage.getSignUpText().getText()).to.eventually.equal('for free, no credit card required, or');
    });

    it('should show the Sign In text',function(){
      expect(homepage.getSignInText().getText()).to.eventually.equal('if you already have an account.');
    });
  });

  describe("Given a user who wants to sign up", function() {
    before(function (){
      homepage.get();
      //wait for spinner to go away.
      browser.wait(function() {
        return element(by.css('.spinner-backdrop')).isDisplayed().then(function(result){return !result});
      }, 20000);
    });
    it('should open sign up model when clicking on the sign up link',function(){
      homepage.getSignUpLink().click();
      expect(commonHeaderPage.getModalDialog().isPresent()).to.eventually.be.true;
    });
  });

  describe("Given a user who wants to sign in", function() {
    before(function (){
      homepage.get();
      //wait for spinner to go away.
      browser.wait(function() {
        return element(by.css('.spinner-backdrop')).isDisplayed().then(function(result){return !result});
      }, 20000);
    });
    it('should go to google authentication when clicking on the sign in link',function(){
      homepage.getSignInLink().click();
      browser.ignoreSynchronization = true;
      expect(browser.getCurrentUrl()).to.eventually.contain(googleAuthPage.getUrl());
      browser.ignoreSynchronization = false;
    });
  });

});
