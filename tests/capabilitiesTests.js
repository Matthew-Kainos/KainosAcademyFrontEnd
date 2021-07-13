const webdriver = require('selenium-webdriver');
const chai = require('chai');

const { expect } = chai;

let driver;

describe('Capabilities', function () {
  this.timeout(0);
  before(async () => {
    driver = await new webdriver.Builder().forBrowser('chrome').build();
  });

  after(async () => {
    driver.quit();
  });

  it('should successfully render details page when valid capability name added to form', async () => {
    await driver.get('http://localhost:3001/capabilities/familyform');
    const title = await driver.getTitle();
    expect(title).equal('Search for Family by Capability Name');
    await driver.findElement(webdriver.By.id('capName')).sendKeys('Engineering');
    await driver.findElement(webdriver.By.id('submitbutton')).click();
  });
  it('should successfully render form page again and error message if capability name entered is not valid', async () => {
    await driver.get('http://localhost:3001/capabilities/familyform');
    const title = await driver.getTitle();
    expect(title).equal('Search for Family by Capability Name');
    await driver.findElement(webdriver.By.id('capName')).sendKeys('abc');
    await driver.findElement(webdriver.By.id('submitbutton')).click();
    const resultsTitle = await driver.getTitle();
    expect(resultsTitle).equal('Search for Family by Capability Name');
    const errorMessage = await driver.findElement(webdriver.By.id('errorMessage')).getText();
    expect(errorMessage).equal('Enter Selection');
  });
  it('should successfully render form page again and error message if no capability name is entered', async () => {
    await driver.get('http://localhost:3001/capabilities/familyform');
    const title = await driver.getTitle();
    expect(title).equal('Search for Family by Capability Name');
    await driver.findElement(webdriver.By.id('capName')).sendKeys('10000');
    await driver.findElement(webdriver.By.id('submitbutton')).click();
    const resultsTitle = await driver.getTitle();
    expect(resultsTitle).equal('Search for Family by Capability Name');
    const errorMessage = await driver.findElement(webdriver.By.id('errorMessage')).getText();
    expect(errorMessage).equal('Enter Selection');
  });

  it('should successfully render list all jobs and capability associated', async () => {
    await driver.get('http://localhost:3001/capabilities/findByJobName');
    const title = await driver.getTitle();
    expect(title).equal('Search for Capability by Job Name');
    const jobListText = await driver.findElement(webdriver.By.id('allJobsList')).getText();
    expect(jobListText.length).to.be.greaterThan(0);
    expect(jobListText).to.not.include('No Results Matching Name');
  });
  it('should successfully search jobs list for job based on name and return capability details', async () => {
    await driver.get('http://localhost:3001/capabilities/findByJobName');
    const title = await driver.getTitle();
    expect(title).equal('Search for Capability by Job Name');
    await driver.findElement(webdriver.By.id('searchBar')).sendKeys('Chief');
    const jobListText = await driver.findElement(webdriver.By.id('allJobsList')).getText();
    expect(jobListText).to.include('Chief Technical Officer');
    expect(jobListText).to.include('Capability: Engineering');
  });
  it('should successfully render no job details if job searched does not exist', async () => {
    await driver.get('http://localhost:3001/capabilities/findByJobName');
    const title = await driver.getTitle();
    expect(title).equal('Search for Capability by Job Name');
    await driver.findElement(webdriver.By.id('searchBar')).sendKeys('abc');
    const jobListText = await driver.findElement(webdriver.By.id('allJobsList')).getText();
    expect(jobListText).to.equal('No Results Matching Name');
  });
});
