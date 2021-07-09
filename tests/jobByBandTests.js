const webdriver = require('selenium-webdriver');
const { until } = require('selenium-webdriver');
const { By } = require('selenium-webdriver');
const chai = require('chai');
const expect = chai.expect;

describe('Test Suite', function() {
  this.timeout(0);
  var driver

  before(async function() {
      driver = await new webdriver.Builder().forBrowser('chrome').build();
  });

  it('should render on view job role by band page', async function() {
      await driver.get('http://localhost:3001/jobs/viewRoleByBand');
      const title = await driver.getTitle();
      expect(title).equal('Job role by band')
  })

  it('should render on view job role by band page, enter invalid input and get error message back', async function() {
    await driver.get('http://localhost:3001/jobs/viewRoleByBand');
    await driver.findElement(webdriver.By.name('roleInput')).sendKeys('1010101')
    await driver.findElement(webdriver.By.id('getRoles')).click();
    const title = await driver.getTitle();
    expect(title).equal('Job role by band');
    const errorMessage = await driver.findElement(webdriver.By.id('errorMessage')).getText();
    expect(errorMessage).equal('Error: Invalid input (can only enter letters and numbers)');
  })

  it('should render on view job role by band page, enter valid input but a non-existant role and get error message back', async function() {
    await driver.get('http://localhost:3001/jobs/viewRoleByBand');
    const title = await driver.getTitle();
    expect(title).equal('Job role by band');
    await driver.findElement(webdriver.By.id('roleInput')).sendKeys('NotARealRoleeeeee');
    await driver.findElement(webdriver.By.id('getRoles')).click();
    const errorMessage = await driver.findElement(webdriver.By.id('errorMessage')).getText();
    expect(errorMessage).equal('Role not found. Ensure the role exists and is spelt correctly');
  })

  after(async function() {
      driver.quit();
  })
});

