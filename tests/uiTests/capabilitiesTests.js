/* eslint-disable func-names */
const webdriver = require('selenium-webdriver');
const chai = require('chai');
require('dotenv').config();

const { expect } = chai;

let driver;

const userDetails = {
  username: process.env.DB_User_Username,
  password: process.env.DB_User_Pw,
};

describe('Capabilities', function () {
  this.timeout(0);
  beforeEach(async () => {
    driver = await new webdriver.Builder().forBrowser('chrome').build();

    // Login as employee before each test
    await driver.get('http://localhost:3001/');
    await driver.findElement(webdriver.By.id('Username')).sendKeys(userDetails.username);
    await driver.findElement(webdriver.By.id('Password')).sendKeys(userDetails.password);
    await driver.findElement(webdriver.By.id('SubmitButton')).click();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('should successfully render list all capabilities and families associated', async () => {
    await driver.get('http://localhost:3001/capabilities/family');
    const title = await driver.getTitle();
    expect(title).equal('Search for Family by Capability Name');
    const capListText = await driver.findElement(webdriver.By.id('allCapabilitiesList')).getText();
    expect(capListText.length).to.be.greaterThan(0);
    expect(capListText).to.not.include('No Results Matching Name');
  });
  it('should successfully search capabilities list for capabilites based on name and return family details', async () => {
    await driver.get('http://localhost:3001/capabilities/family');
    const title = await driver.getTitle();
    expect(title).equal('Search for Family by Capability Name');
    await driver.findElement(webdriver.By.id('searchBar')).sendKeys('Engineering');
    const capListText = await driver.findElement(webdriver.By.id('allCapabilitiesList')).getText();
    expect(capListText).to.include('Engineering');
    expect(capListText).to.include('Family: Engineering and Strategy Planning');
  });
  it('should successfully render no family details if capability searched does not exist',
    async () => {
      await driver.get('http://localhost:3001/capabilities/family');
      const title = await driver.getTitle();
      expect(title).equal('Search for Family by Capability Name');
      await driver.findElement(webdriver.By.id('searchBar')).sendKeys('abc');
      const capListText = await driver.findElement(webdriver.By.id('allCapabilitiesList')).getText();
      expect(capListText).to.equal('No Results Matching Name');
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

  it('should render capability lead information based on valid capability id', async () => {
    await driver.get('http://localhost:3001/capabilities/viewCapabilityLead/1');
    const title = await driver.getTitle();
    expect(title).equal('View Capability Lead');
    const capIDText = await driver.findElement(webdriver.By.id('capID')).getText();
    expect(capIDText).equal('View Capability Lead: 1');
    const capNameText = await driver.findElement(webdriver.By.id('capName')).getText();
    expect(capNameText).equal('Engineering');
    const capabilityLeadText = await driver.findElement(webdriver.By.id('capLeadName')).getText();
    expect(capabilityLeadText).equal('Aislinn McBride');
    const capabilityLeadMessageText = await driver.findElement(webdriver.By.id('capLeadMessage')).getText();
    expect(capabilityLeadMessageText).equal('Test Message 2');
  });
  it('should successfully render no capability leads if capability lead unavailable', async () => {
    await driver.get('http://localhost:3001/capabilities/viewCapabilityLead/999999');
    const title = await driver.getTitle();
    expect(title).equal('View Capability Lead');
    const noLeadsText = await driver.findElement(webdriver.By.id('noLeads')).getText();
    expect(noLeadsText).equal('No Capability Leads.');
  });
});
