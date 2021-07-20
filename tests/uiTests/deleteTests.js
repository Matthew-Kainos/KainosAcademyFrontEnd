const webdriver = require('selenium-webdriver');
// const { By } = require('selenium-webdriver');
// const { until } = require('selenium-webdriver');

const chai = require('chai');
require('dotenv').config();

const { expect } = chai;

let driver;

const adminDetails = {
  username: process.env.DB_Admin_Username,
  password: process.env.DB_Admin_Pw,
};

describe('Delete', function () {
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
    it('should successfully not delete job role selected from drop down if message warning canceled', async () => {
      await driver.get('http://localhost:3001/delete/role');
      const title = await driver.getTitle();
      expect(title).equal('Admin Delete Role');
      driver.findElement(webdriver.By.id('RoleName')).sendKeys('Selenium');
      await driver.findElement(webdriver.By.id('SubmitButton')).click();
      const confirmationAlert = await driver.switchTo().alert();
      const confirmationAlertText = await confirmationAlert.getText();
      expect(confirmationAlertText).equal('Are you sure?');
      confirmationAlert.dismiss();
      const titleAfterSubmission = await driver.getTitle();
      expect(titleAfterSubmission).equal('Admin Delete Role');
    });
    it('should successfully delete job role selected from drop down and recieve warning message before redirecting to all jobs', async () => {
      await driver.get('http://localhost:3001/delete/role');
      const title = await driver.getTitle();
      expect(title).equal('Admin Delete Role');
      driver.findElement(webdriver.By.id('RoleName')).sendKeys('Selenium');
      await driver.findElement(webdriver.By.id('SubmitButton')).click();
      const confirmationAlert = await driver.switchTo().alert();
      const confirmationAlertText = await confirmationAlert.getText();
      expect(confirmationAlertText).equal('Are you sure?');
      confirmationAlert.accept();
      const titleAfterSubmission = await driver.getTitle();
      expect(titleAfterSubmission).equal('Show Job Roles in hierarchy');
    });
  });
});
