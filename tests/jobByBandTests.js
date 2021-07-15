const webdriver = require('selenium-webdriver');

const chai = require('chai');

const { expect } = chai;

describe('Test Suite', function () {
  this.timeout(0);
  let driver;

  before(async () => {
    driver = await new webdriver.Builder().forBrowser('chrome').build();
  });

  it('should render on view job role by band page', async () => {
    await driver.get('http://localhost:3001/jobs/viewRoleByBand');
    const title = await driver.getTitle();
    expect(title).equal('Job role by band');
    const roleHeader = await driver.findElement(webdriver.By.id('RoleCol')).getText();
    const bandHeader = await driver.findElement(webdriver.By.id('BandCol')).getText();
    expect(roleHeader).equal('Job Role');
    expect(bandHeader).equal('Job Band');
  });

  it('should render on view job role by band page, enter invalid input and get error message back', async () => {
    await driver.get('http://localhost:3001/jobs/viewRoleByBand');
    await driver.findElement(webdriver.By.name('roleInput')).sendKeys('Chief Technical Officer');
    await driver.findElement(webdriver.By.id('getRoles')).click();
    const title = await driver.getTitle();
    expect(title).equal('Job role by band');
    const roleHeader = await driver.findElement(webdriver.By.id('RoleCol')).getText();
    const bandHeader = await driver.findElement(webdriver.By.id('BandCol')).getText();
    const roleElement = await driver.findElement(webdriver.By.id('RoleElement')).getText();
    const bandElement = await driver.findElement(webdriver.By.id('BandElement')).getText();
    expect(roleHeader).equal('Job Role');
    expect(bandHeader).equal('Job Band');
    expect(roleElement).equal('Chief Technical Officer');
    expect(bandElement).equal('Leadership Community');
  });

  it('should render on view job role by band page, enter invalid input and get error message back', async () => {
    await driver.get('http://localhost:3001/jobs/viewRoleByBand');
    await driver.findElement(webdriver.By.name('roleInput')).sendKeys('1010101');
    await driver.findElement(webdriver.By.id('getRoles')).click();
    const title = await driver.getTitle();
    expect(title).equal('Job role by band');
    const errorMessage = await driver.findElement(webdriver.By.id('errorMessage')).getText();
    expect(errorMessage).equal('Error: Invalid input (can only enter letters and numbers)');
  });

  it('should render on view job role by band page, enter valid input but a non-existant role and get error message back', async () => {
    await driver.get('http://localhost:3001/jobs/viewRoleByBand');
    const title = await driver.getTitle();
    expect(title).equal('Job role by band');
    await driver.findElement(webdriver.By.id('roleInput')).sendKeys('NotARealRoleeeeee');
    await driver.findElement(webdriver.By.id('getRoles')).click();
    const errorMessage = await driver.findElement(webdriver.By.id('errorMessage')).getText();
    expect(errorMessage).equal('Role not found. Ensure the role exists and is spelt correctly');
  });

  after(async () => {
    driver.quit();
  });
});
