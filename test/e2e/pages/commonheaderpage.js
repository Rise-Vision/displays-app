'use strict';
var GoogleAuthPage = require('./googleAuthPage.js');
var helper = require('../common/helper.js');
var DisplaysListPage = require('../pages/displaysListPage.js');

var CommonHeaderPage = function() {
  var googleAuthPage = new GoogleAuthPage();
  var displaysListPage = new DisplaysListPage();
  var commonHeader = element(by.tagName('common-header'));
  var commonHeaderMenuItems = element.all(by.repeater('opt in navOptions'));
  var signInButton = element(by.buttonText('Sign In'));

  this.signin = function () {
      var username = browser.params.login.user;
      var password = browser.params.login.pass;

      signInButton.isDisplayed().then(function (state) {
        if(state) {
          browser.ignoreSynchronization = true;
          signInButton.click().then(function () {
            googleAuthPage.getSigninCard().isDisplayed().then(function () {
              helper.wait(googleAuthPage.getSigninCard(), "Google Sigin Card").then(function () {
                helper.wait(googleAuthPage.getEmailField(), "Google Sigin Email Field").then(function () {
                  helper.wait(googleAuthPage.getPasswordField(), "Google Sigin Password Field").then(function () {
                    helper.wait(googleAuthPage.getSignInButton(), "Google Sigin Sign In Button").then(function () {

                      googleAuthPage.getEmailField().sendKeys(username);
                      googleAuthPage.getPasswordField().sendKeys(password);
                      googleAuthPage.getSignInButton().click().then(function() {
                        googleAuthPage.getThirdPartyInfo().isDisplayed().then(function () {
                          helper.wait(googleAuthPage.getThirdPartyInfo(), "Google Third Party Info").then(function () {
                            helper.wait(googleAuthPage.getSubmitApproveAccessButton(), "Google Approce Access Button").then(function () {
                              googleAuthPage.getSubmitApproveAccessButton().click().then(function () {
                                browser.ignoreSynchronization = false;
                                browser.wait(function () {
                                  return element(by.css('.spinner-backdrop')).isDisplayed().then(function (result) {
                                    return !result
                                  });
                                }, 20000);
                                helper.wait(displaysListPage.getDisplaysAppContainer(), "Display App Container");
                              });
                            });
                          });
                        }, function() {
                          browser.ignoreSynchronization = false;
                          browser.wait(function () {
                            return element(by.css('.spinner-backdrop')).isDisplayed().then(function (result) {
                              return !result
                            });
                          }, 20000);
                          helper.wait(displaysListPage.getDisplaysAppContainer(), "Display App Container");
                        });
                      });
                    });
                  });
                });
              });
            }, function() {
              helper.wait(googleAuthPage.getAccountchooserTitle(), "Google Account Chooser").then(function () {
                helper.wait(googleAuthPage.getChooseAccountFirstButton(), "Google Account Chooser").then(function () {
                  googleAuthPage.getChooseAccountFirstButton().click().then(function () {
                    browser.ignoreSynchronization = false;
                    browser.wait(function () {
                      return element(by.css('.spinner-backdrop')).isDisplayed().then(function (result) {
                        return !result
                      });
                    }, 20000);
                    helper.wait(displaysListPage.getDisplaysAppContainer(), "Display App Container");
                  });
                });
              });
            });
          });
        }
      });
  }

  this.getDisplaysAppContainer = function() {
    return displaysAppContainer;
  };

  this.getCommonHeader = function() {
    return commonHeader;
  };

  this.getCommonHeaderMenuItems = function() {
    return commonHeaderMenuItems;
  };

  this.getDisplayMenuItem = function() {
    return commonHeaderMenuItems.get(0);
  };

  this.getSignInButton = function() {
    return signInButton;
  }
};

module.exports = CommonHeaderPage;