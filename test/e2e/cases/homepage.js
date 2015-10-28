'use strict';
var expect = require('rv-common-e2e').expect;
var HomePage = require('./../pages/homepage.js');
var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
var GoogleAuthPage = require('rv-common-e2e').googleAuthPage;
var helper = require('rv-common-e2e').helper;

var HomePageScenarios = function() {

  browser.driver.manage().window().setSize(1920, 1080);
  describe("In order to manage displays " +
    "As a user " +
    "I would like to have access to the homepage of the displays app", function () {
    this.timeout(2000);// to allow for protactor to load the seperate page
    var homepage;
    var commonHeaderPage;
    var googleAuthPage;
    before(function () {
      homepage = new HomePage();
      commonHeaderPage = new CommonHeaderPage();
      googleAuthPage = new GoogleAuthPage();
    });

    describe("Given a user who access the displays app", function () {

      before(function () {
        homepage.get();
        //wait for spinner to go away.
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');
      });

      it('should load', function () {
        expect(homepage.getDisplaysAppContainer().isPresent()).to.eventually.be.true;
      });

      it('should load common header', function () {
        expect(commonHeaderPage.getCommonHeader().isPresent()).to.eventually.be.true;
      });

      it('should have a display menu item on the common header', function () {
        expect(commonHeaderPage.getCommonHeaderMenuItems().get(0).isPresent()).to.eventually.be.true;
        expect(commonHeaderPage.getCommonHeaderMenuItems().get(0).getText()).to.eventually.equal('Displays');
      });

      it('should go to home when clicking on Displays menu item', function () {
        commonHeaderPage.getCommonHeaderMenuItems().get(0).click();
        expect(browser.getCurrentUrl()).to.eventually.contain(homepage.getUrl());
      });

      it('should show the displays image', function () {
        expect(homepage.getDisplaysImage().isPresent()).to.eventually.be.true;
      });

      it('should show the manage displays text', function () {
        expect(homepage.getManageDisplaysText().getText()).to.eventually.equal('Manage and monitor your digital signage displays, anywhere, anytime.');
      });

      it('should show the Sign Up link', function () {
        expect(homepage.getSignUpLink().isPresent()).to.eventually.be.true;
      });

      it('should show the Sign In link', function () {
        expect(homepage.getSignInLink().isPresent()).to.eventually.be.true;
      });

      it('should show the Sign Up text', function () {
        expect(homepage.getSignUpText().getText()).to.eventually.equal('for free, no credit card required, or');
      });

      it('should show the Sign In text', function () {
        expect(homepage.getSignInText().getText()).to.eventually.equal('if you already have an account.');
      });
    });

    describe("Given a user who wants to sign up", function () {
      before(function () {
        homepage.get();
        //wait for spinner to go away.
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');
      });

      it('should open sign up model when clicking on the sign up link', function () {
        homepage.getSignUpLink().click();
        expect(commonHeaderPage.getModalDialog().isPresent()).to.eventually.be.true;
      });
    });

    describe("Given a user who wants to sign in", function () {
      before(function () {
        homepage.get();
        //wait for spinner to go away.
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');
      });

      it('should go to google authentication when clicking on the sign in link', function (done) {
        homepage.getSignInLink().click().then(function () {
          googleAuthPage.signin();
          expect(browser.getCurrentUrl()).to.eventually.contain(homepage.getUrl());

          done();
        });
      });
    });

    describe("Given a user who wants to share the url", function () {
      before(function () {
        homepage.get();
        //wait for spinner to go away.
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');
      });

      it('should contain meta tags for sharing it nicely', function () {
        expect(homepage.getMetaByName('description').getAttribute('content')).to.eventually.equal('Manage and monitor your digital signage displays, anywhere, anytime.');
      });

      it('should contain meta tags for sharing it nicely on G+', function () {
        expect(homepage.getMetaByItemProp('name').getAttribute('content')).to.eventually.equal('Rise Vision Displays');
        expect(homepage.getMetaByItemProp('description').getAttribute('content')).to.eventually.equal('Manage and monitor your digital signage displays, anywhere, anytime.');
        expect(homepage.getMetaByItemProp('image').getAttribute('content')).to.eventually.equal('https://s3.amazonaws.com/Rise-Images/landing-page/displays-image.png');
      });

      it('should contain meta tags for sharing it nicely on Twitter', function () {
        expect(homepage.getMetaByName('twitter:card').getAttribute('content')).to.eventually.equal('summary_large_image');
        expect(homepage.getMetaByName('twitter:site').getAttribute('content')).to.eventually.equal('@RiseVision');
        expect(homepage.getMetaByName('twitter:domain').getAttribute('content')).to.eventually.equal('https://displays.risevision.com/');
        expect(homepage.getMetaByName('twitter:title').getAttribute('content')).to.eventually.equal('Rise Vision Displays');
        expect(homepage.getMetaByName('twitter:description').getAttribute('content')).to.eventually.equal('Manage and monitor your digital signage displays, anywhere, anytime.');
        expect(homepage.getMetaByName('twitter:image:src').getAttribute('content')).to.eventually.equal('https://s3.amazonaws.com/Rise-Images/landing-page/displays-image.png');
        expect(homepage.getMetaByName('twitter:url').getAttribute('content')).to.eventually.equal('https://displays.risevision.com/');
      });

      it('should contain meta tags for sharing it nicely on Facebook', function () {
        expect(homepage.getMetaByProperty('og:locale').getAttribute('content')).to.eventually.equal('en_US');
        expect(homepage.getMetaByProperty('og:title').getAttribute('content')).to.eventually.equal('Rise Vision Displays');
        expect(homepage.getMetaByProperty('og:type').getAttribute('content')).to.eventually.equal('product');
        expect(homepage.getMetaByProperty('og:url').getAttribute('content')).to.eventually.equal('https://displays.risevision.com/');
        expect(homepage.getMetaByProperty('og:image').getAttribute('content')).to.eventually.equal('https://s3.amazonaws.com/Rise-Images/landing-page/displays-image.png');
        expect(homepage.getMetaByProperty('og:description').getAttribute('content')).to.eventually.equal('Manage and monitor your digital signage displays, anywhere, anytime.');
        expect(homepage.getMetaByProperty('article:publisher').getAttribute('content')).to.eventually.equal('https://www.facebook.com/risevision');
        expect(homepage.getMetaByProperty('og:site_name').getAttribute('content')).to.eventually.equal('Rise Vision Displays');
      });
    });

  });
};

module.exports = HomePageScenarios;
