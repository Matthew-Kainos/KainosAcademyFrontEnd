const webdriver = require('selenium-webdriver');
const chai = require('chai');
require('dotenv').config();

const { expect } = chai;

let driver;

const adminDetails = {
  username: process.env.DB_Admin_Username,
  password: process.env.DB_Admin_Pw,
};

describe('Add', function () {
  this.timeout(0);
  beforeEach(async () => {
    driver = await new webdriver.Builder().forBrowser('chrome').build();

    // Login as admin before each test
    await driver.get('http://localhost:3001/');
    await driver.findElement(webdriver.By.id('Username')).sendKeys(adminDetails.username);
    await driver.findElement(webdriver.By.id('Password')).sendKeys(adminDetails.password);
    await driver.findElement(webdriver.By.id('SubmitButton')).click();
  });

  afterEach(async () => {
    await driver.quit();
  });
  describe('Role', () => {
    it('should successfully return popup message if trying to add role of invalid name length', async () => {
      await driver.get('http://localhost:3001/add/role');
      const title = await driver.getTitle();
      expect(title).equal('Admin Add Role');
      await driver.findElement(webdriver.By.id('RoleName')).sendKeys('a');
      await driver.findElement(webdriver.By.id('SpecSum')).sendKeys('Fake Summary');
      await driver.findElement(webdriver.By.id('SpecLink')).sendKeys('Fake Link');
      await driver.findElement(webdriver.By.css('#Capability > option:nth-child(1)'))
        .click();
      await driver.findElement(webdriver.By.css('#Band > option:nth-child(2)'))
        .click();
      await driver.executeScript('window.scrollTo(0,10000);');
      await driver.findElement(webdriver.By.id('AddSubmitButton')).click();
      const titleAfterSubmission = await driver.getTitle();
      expect(titleAfterSubmission).equal('Admin Add Role');
      const errorText = await driver.findElement(webdriver.By.id('popupMessage')).getText();
      expect(errorText).to.equal('Invalid Role Name length');
    });
    it('should successfully return popup message if trying to add role of invalid summary length', async () => {
      await driver.get('http://localhost:3001/add/role');
      const title = await driver.getTitle();
      expect(title).equal('Admin Add Role');
      await driver.findElement(webdriver.By.id('RoleName')).sendKeys('Valid Name Length');
      await driver.findElement(webdriver.By.id('SpecSum')).sendKeys('a');
      await driver.findElement(webdriver.By.id('SpecLink')).sendKeys('Fake Link');
      await driver.findElement(webdriver.By.css('#Capability > option:nth-child(1)'))
        .click();
      await driver.findElement(webdriver.By.css('#Band > option:nth-child(2)'))
        .click();
      await driver.executeScript('window.scrollTo(0,10000);');
      await driver.findElement(webdriver.By.id('AddSubmitButton')).click();
      const titleAfterSubmission = await driver.getTitle();
      expect(titleAfterSubmission).equal('Admin Add Role');
      const errorText = await driver.findElement(webdriver.By.id('popupMessage')).getText();
      expect(errorText).to.equal('Invalid Summary length. Maximum 255 characters. Mimimum 10');
    });
    it('should successfully return popup message if trying to add role of invalid link length', async () => {
      await driver.get('http://localhost:3001/add/role');
      const title = await driver.getTitle();
      expect(title).equal('Admin Add Role');
      await driver.findElement(webdriver.By.id('RoleName')).sendKeys('Valid Name Length');
      await driver.findElement(webdriver.By.id('SpecSum')).sendKeys('Valid Summary Length');
      await driver.findElement(webdriver.By.id('SpecLink')).sendKeys('a');
      await driver.findElement(webdriver.By.css('#Capability > option:nth-child(1)'))
        .click();
      await driver.findElement(webdriver.By.css('#Band > option:nth-child(2)'))
        .click();
      await driver.executeScript('window.scrollTo(0,10000);');
      await driver.findElement(webdriver.By.id('AddSubmitButton')).click();
      const titleAfterSubmission = await driver.getTitle();
      expect(titleAfterSubmission).equal('Admin Add Role');
      const errorText = await driver.findElement(webdriver.By.id('popupMessage')).getText();
      expect(errorText).to.equal('Invalid Link length. Maximum 30 characters. Mimimum 5');
    });
    it.skip('should successfully return success popup message adding new role successful', async () => {
      await driver.get('http://localhost:3001/add/role');
      const title = await driver.getTitle();
      expect(title).equal('Admin Add Role');
      await driver.findElement(webdriver.By.id('RoleName')).sendKeys('Selenium Developer');
      await driver.findElement(webdriver.By.id('SpecSum')).sendKeys('You make UI Tests');
      await driver.findElement(webdriver.By.id('SpecLink')).sendKeys('This is a link');
      await driver.findElement(webdriver.By.css('#Capability > option:nth-child(1)'))
        .click();
      await driver.findElement(webdriver.By.css('#Band > option:nth-child(2)'))
        .click();
      await driver.executeScript('window.scrollTo(0,10000);');
      await driver.findElement(webdriver.By.id('AddSubmitButton')).click();
      const titleAfterSubmission = await driver.getTitle();
      expect(titleAfterSubmission).equal('Admin Add Role');
      const errorText = await driver.findElement(webdriver.By.id('popupMessage')).getText();
      expect(errorText).to.equal('New Role Selenium Developer Added');
    });
    it.skip('should successfully return success returm popup message if duplicate role name used', async () => {
      await driver.get('http://localhost:3001/add/role');
      const title = await driver.getTitle();
      expect(title).equal('Admin Add Role');
      await driver.findElement(webdriver.By.id('RoleName')).sendKeys('Selenium Developer');
      await driver.findElement(webdriver.By.id('SpecSum')).sendKeys('You make UI Tests');
      await driver.findElement(webdriver.By.id('SpecLink')).sendKeys('This is a link');
      await driver.findElement(webdriver.By.css('#Capability > option:nth-child(1)'))
        .click();
      await driver.findElement(webdriver.By.css('#Band > option:nth-child(2)'))
        .click();
      await driver.executeScript('window.scrollTo(0,10000);');
      await driver.findElement(webdriver.By.id('AddSubmitButton')).click();
      const titleAfterSubmission = await driver.getTitle();
      expect(titleAfterSubmission).equal('Admin Add Role');
      const errorText = await driver.findElement(webdriver.By.id('popupMessage')).getText();
      expect(errorText).to.equal('Unable to add Role due to Duplicate Role Name');
    });
  });

  afterEach(async () => {
    await driver.quit();
  });
  describe('Family', () => {
    it('should successfully return popup message if trying to add family of invalid name length', async () => {
      await driver.get('http://localhost:3001/add/family');
      const title = await driver.getTitle();
      expect(title).equal('Admin Add Family');
      await driver.findElement(webdriver.By.id('FamilyName')).sendKeys('a');
      await driver.findElement(webdriver.By.id('LeadName')).sendKeys('FakeLeadName');
      await driver.findElement(webdriver.By.id('LeadMessage')).sendKeys('FakeMessage');
      await driver.findElement(webdriver.By.id('LeadImage')).sendKeys('FakeImageURL');
      await driver.findElement(webdriver.By.css('#Capability > option:nth-child(1)'))
        .click();
      await driver.executeScript('window.scrollTo(0,10000);');
      await driver.findElement(webdriver.By.id('AddSubmitButton')).click();
      const titleAfterSubmission = await driver.getTitle();
      expect(titleAfterSubmission).equal('Admin Add Family');
      const errorText = await driver.findElement(webdriver.By.id('popupMessage')).getText();
      expect(errorText).to.equal('Invalid Family Name length');
    });
    it('should successfully return popup message if trying to add role of invalid lead name length', async () => {
      await driver.get('http://localhost:3001/add/family');
      const title = await driver.getTitle();
      expect(title).equal('Admin Add Family');
      await driver.findElement(webdriver.By.id('FamilyName')).sendKeys('FakeFamileName');
      await driver.findElement(webdriver.By.id('LeadName')).sendKeys('a');
      await driver.findElement(webdriver.By.id('LeadMessage')).sendKeys('FakeMessage');
      await driver.findElement(webdriver.By.id('LeadImage')).sendKeys('FakeImageURL');
      await driver.findElement(webdriver.By.css('#Capability > option:nth-child(1)'))
        .click();
      await driver.executeScript('window.scrollTo(0,10000);');
      await driver.findElement(webdriver.By.id('AddSubmitButton')).click();
      const titleAfterSubmission = await driver.getTitle();
      expect(titleAfterSubmission).equal('Admin Add Family');
      const errorText = await driver.findElement(webdriver.By.id('popupMessage')).getText();
      expect(errorText).to.equal('Invalid Lead Name length');
    });
    it('should successfully return popup message if trying to add role of invalid lead message length', async () => {
      await driver.get('http://localhost:3001/add/family');
      const title = await driver.getTitle();
      expect(title).equal('Admin Add Family');
      await driver.findElement(webdriver.By.id('FamilyName')).sendKeys('FakeFamileName');
      await driver.findElement(webdriver.By.id('LeadName')).sendKeys('FakeLeadName');
      await driver.findElement(webdriver.By.id('LeadMessage')).sendKeys('a');
      await driver.findElement(webdriver.By.id('LeadImage')).sendKeys('FakeImageURL');
      await driver.findElement(webdriver.By.css('#Capability > option:nth-child(1)'))
        .click();
      await driver.executeScript('window.scrollTo(0,10000);');
      await driver.findElement(webdriver.By.id('AddSubmitButton')).click();
      const titleAfterSubmission = await driver.getTitle();
      expect(titleAfterSubmission).equal('Admin Add Family');
      const errorText = await driver.findElement(webdriver.By.id('popupMessage')).getText();
      expect(errorText).to.equal('Invalid Lead Message length. Maximum 250 characters. Mimimum 5');
    });
    it('should successfully return popup message if trying to add role of invalid lead image length', async () => {
      await driver.get('http://localhost:3001/add/family');
      const title = await driver.getTitle();
      expect(title).equal('Admin Add Family');
      await driver.findElement(webdriver.By.id('FamilyName')).sendKeys('FakeFamileName');
      await driver.findElement(webdriver.By.id('LeadName')).sendKeys('FakeLeadName');
      await driver.findElement(webdriver.By.id('LeadMessage')).sendKeys('FakeMessage');
      await driver.findElement(webdriver.By.id('LeadImage')).sendKeys('a');
      await driver.findElement(webdriver.By.css('#Capability > option:nth-child(1)'))
        .click();
      await driver.executeScript('window.scrollTo(0,10000);');
      await driver.findElement(webdriver.By.id('AddSubmitButton')).click();
      const titleAfterSubmission = await driver.getTitle();
      expect(titleAfterSubmission).equal('Admin Add Family');
      const errorText = await driver.findElement(webdriver.By.id('popupMessage')).getText();
      expect(errorText).to.equal('Invalid Image URL length. Maximum 400 characters. Mimimum 10');
    });
    it.skip('should successfully return success popup message adding new family successful', async () => {
      await driver.get('http://localhost:3001/add/family');
      const title = await driver.getTitle();
      expect(title).equal('Admin Add Family');
      await driver.findElement(webdriver.By.id('FamilyName')).sendKeys('Selenium Developer');
      await driver.findElement(webdriver.By.id('LeadName')).sendKeys('You make UI Tests');
      await driver.findElement(webdriver.By.id('LeadMessage')).sendKeys('You make UI Tests');
      await driver.findElement(webdriver.By.id('LeadImage')).sendKeys('You make UI Tests');
      await driver.findElement(webdriver.By.css('#Capability > option:nth-child(1)'))
        .click();
      await driver.executeScript('window.scrollTo(0,10000);');
      await driver.findElement(webdriver.By.id('AddSubmitButton')).click();
      const titleAfterSubmission = await driver.getTitle();
      expect(titleAfterSubmission).equal('Admin Add Family');
      const errorText = await driver.findElement(webdriver.By.id('popupMessage')).getText();
      expect(errorText).to.equal('New Family Selenium Developer Added');
    });
    it.skip('should successfully return success returm popup message if duplicate family name used', async () => {
      await driver.get('http://localhost:3001/add/family');
      const title = await driver.getTitle();
      expect(title).equal('Admin Add Family');
      await driver.findElement(webdriver.By.id('FamilyName')).sendKeys('Selenium Developer');
      await driver.findElement(webdriver.By.id('LeadName')).sendKeys('You make UI Tests');
      await driver.findElement(webdriver.By.id('LeadMessage')).sendKeys('You make UI Tests');
      await driver.findElement(webdriver.By.id('LeadImage')).sendKeys('You make UI Tests');
      await driver.findElement(webdriver.By.css('#Capability > option:nth-child(1)'))
        .click();
      await driver.executeScript('window.scrollTo(0,10000);');
      await driver.findElement(webdriver.By.id('AddSubmitButton')).click();
      const titleAfterSubmission = await driver.getTitle();
      expect(titleAfterSubmission).equal('Admin Add Family');
      const errorText = await driver.findElement(webdriver.By.id('popupMessage')).getText();
      expect(errorText).to.equal('Unable to add Role due to Duplicate Family Name');
    });
  });
});
