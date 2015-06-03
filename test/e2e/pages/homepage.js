'use strict';
var config = require('../config/config.json');
var HomePage = function() {
  var url = config.rootUrl + '/#/';
  var displaysAppContainer = element(by.css('.displays-app'));



  this.get = function() {
    browser.get(url);
  };

  this.getUrl = function() {
    return url;
  }

  this.getDisplaysAppContainer = function() {
    return displaysAppContainer;
  };
};

module.exports = HomePage;