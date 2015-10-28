'use strict';
var config = require('../config/config.json');
var HomePage = function() {
  var url = config.rootUrl + '/#';
  var displaysAppContainer = element(by.css('.displays-app'));
  var displaysImage = element(by.id('displays-image'));
  var manageDisplaysText = element(by.id('manage-displays-text'));
  var displaysExplanationText = element(by.id('displays-explanation-text'));
  var signUpText = element(by.id('sign-up-text'));
  var signInText = element(by.id('sign-in-text'));
  var signUpLink = element(by.id('sign-up-link'));
  var signInLink = element(by.id('sign-in-link'));

  this.get = function() {
    browser.get(url);
  };

  this.getUrl = function() {
    return url;
  };

  this.getDisplaysAppContainer = function() {
    return displaysAppContainer;
  };

  this.getDisplaysImage = function() {
    return displaysImage;
  };

  this.getManageDisplaysText = function() {
    return manageDisplaysText;
  };

  this.getDisplaysExplanationText = function() {
    return displaysExplanationText;
  };

  this.getSignUpText = function() {
    return signUpText;
  };

  this.getSignInText = function() {
    return signInText;
  };

  this.getSignUpLink = function() {
    return signUpLink;
  };

  this.getSignInLink = function() {
    return signInLink;
  };

  this.getMetaByName = function(name) {
    return element(by.xpath("//meta[@name='"+name+"']"));
  };

  this.getMetaByItemProp = function(itemprop) {
    return element(by.xpath("//meta[@itemprop='"+itemprop+"']"));
  };

  this.getMetaByProperty = function(property) {
    return element(by.xpath("//meta[@property='"+property+"']"));
  };

};

module.exports = HomePage;