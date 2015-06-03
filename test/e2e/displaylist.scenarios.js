'use strict';
var expect = require('./common/expect.js');
var HomePage = require('./pages/homepage.js');
var CommonHeaderPage = require('./pages/commonheaderpage.js');
var DisplaysListPage = require('./pages/displaysListPage.js');

browser.driver.manage().window().setSize(1024, 768);
describe("In order to manage displays " +
  "As a user signed in " +
  "I would like to see a list of my displays", function() {
  this.timeout(2000);// to allow for protactor to load the seperate page
  var homepage;
  var commonHeaderPage;
  var displaysListPage;

  beforeEach(function (){
    homepage = new HomePage();
    displaysListPage = new DisplaysListPage();
    commonHeaderPage = new CommonHeaderPage();

    homepage.get();
    //wait for spinner to go away.
    browser.wait(function() {
      return element(by.css('.spinner-backdrop')).isDisplayed().then(function(result){return !result});
    }, 20000);
    commonHeaderPage.signin();
  });

  it('should show displays list page',function(){
    expect(displaysListPage.getDisplaysAppContainer().isPresent()).to.eventually.be.true;
  });

  it('should show Displays as title',function(){
    expect(displaysListPage.getTitle().isPresent()).to.eventually.be.true;
    expect(displaysListPage.getTitle().getText()).to.eventually.equal('Displays');
  });

  it('should show the search bar',function(){
    expect(displaysListPage.getSearchFilter().isPresent()).to.eventually.be.true;
  });

  it('should show display list table',function(){
    expect(displaysListPage.getDisplaysListTable().isPresent()).to.eventually.be.true;
  });

  it('should show display add button',function(){
    expect(displaysListPage.getDisplayAddButton().isPresent()).to.eventually.be.true;
    expect(displaysListPage.getDisplayAddButton().getText()).to.eventually.equal('Add Display');
  });

  it('should show display list table header Name',function(){
    expect(displaysListPage.getTableHeaderName().isPresent()).to.eventually.be.true;
    expect(displaysListPage.getTableHeaderName().getText()).to.eventually.equal('Name');
  });

  it('should show display list table header Status',function(){
    expect(displaysListPage.getTableHeaderStatus().isPresent()).to.eventually.be.true;
    expect(displaysListPage.getTableHeaderStatus().getText()).to.eventually.equal('Status');
  });

  it('should show display list table header Activity',function(){
    expect(displaysListPage.getTableHeaderActivity().isPresent()).to.eventually.be.true;
    expect(displaysListPage.getTableHeaderActivity().getText()).to.eventually.equal('Last Connection');
  });

});
