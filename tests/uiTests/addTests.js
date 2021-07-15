const webdriver = require('selenium-webdriver');
const chai = require('chai');
require('dotenv').config();

const { expect } = chai;

let driver;

// const userDetails = {
//   username: process.env.DB_User_Username,
//   password: process.env.DB_User_Pw,
// };

const adminDetails = {
  username: process.env.DB_Admin_Username,
  password: process.env.DB_Admin_Pw,
};

describe.only('Add', function () {
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
      await driver.manage().window().maximize();
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
      await driver.manage().window().maximize();
      await driver.get('http://localhost:3001/add/role');
      const title = await driver.getTitle();
      expect(title).equal('Admin Add Role');
      await driver.findElement(webdriver.By.id('RoleName')).sendKeys('Valid Name Length');
      await driver.findElement(webdriver.By.id('SpecSum')).sendKeys('abc');
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
  });
});
