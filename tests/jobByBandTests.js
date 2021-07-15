const webdriver = require('selenium-webdriver');
const chai = require('chai');

const { expect } = chai;

let driver;

describe('View Jobs and Bands', function () {
  this.timeout(0);
  before(async () => {
    driver = await new webdriver.Builder().forBrowser('chrome').build();
  });

  after(async () => {
    driver.quit();
  });

  it('should successfully render list all role and their band', async () => {
    await driver.get('http://localhost:3001/jobs/viewRoleByBand');
    const title = await driver.getTitle();
    expect(title).equal('View Role and Band Level');
    const capListText = await driver.findElement(webdriver.By.id('allJobsList')).getText();
    expect(capListText.length).to.be.greaterThan(0);
    expect(capListText).to.not.include('No Results Matching Name');
  });
  it('should successfully search jobs list and return job and band details', async () => {
    await driver.get('http://localhost:3001/jobs/viewRoleByBand');
    const title = await driver.getTitle();
    expect(title).equal('View Role and Band Level');
    await driver.findElement(webdriver.By.id('searchBar')).sendKeys('Innovation');
    const capListText = await driver.findElement(webdriver.By.id('allJobsList')).getText();
    expect(capListText).to.include('Innovation Lead');
    expect(capListText).to.include('Band: Consultant');
  });
  it('should successfully render no role details if role searched does not exist',
    async () => {
      await driver.get('http://localhost:3001/jobs/viewRoleByBand');
      const title = await driver.getTitle();
      expect(title).equal('View Role and Band Level');
      await driver.findElement(webdriver.By.id('searchBar')).sendKeys('abc');
      const capListText = await driver.findElement(webdriver.By.id('allJobsList')).getText();
      expect(capListText).to.equal('No Results Matching Name');
    });
});
