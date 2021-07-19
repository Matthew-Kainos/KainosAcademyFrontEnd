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

describe('Jobs', function () {
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

  it('should render job spec page with job roles details when role id is valid', async () => {
    await driver.get('http://localhost:3001/jobSpec/2');

    const title = await driver.getTitle();
    expect(title).equal('Specification for Job Role');

    const roleNameText = await driver.findElement(webdriver.By.id('roleName')).getText();
    expect(roleNameText).equal('Innovation Lead');

    const specSumText = await driver.findElement(webdriver.By.id('specSum')).getText();
    expect(specSumText).equal('As an Innovation Lead (Consultant) in Kainos, you’ll be responsible will lead the team, working with the Innovation Lead in a dynamic and hands-on role');

    const roleLinkText = await driver.findElement(webdriver.By.id('specLink')).getText();
    expect(roleLinkText).equal('Sharepoint Link');
  });

  it('should render job spec page with all details when there is no sharepoint link and role id is valid', async () => {
    await driver.get('http://localhost:3001/jobSpec/1');

    const title = await driver.getTitle();
    expect(title).equal('Specification for Job Role');

    const roleNameText = await driver.findElement(webdriver.By.id('roleName')).getText();
    expect(roleNameText).equal('Chief Technical Officer');

    const specSumText = await driver.findElement(webdriver.By.id('specSum')).getText();
    expect(specSumText).equal('Takes care of computer systems and IT processes');

    const roleLinkText = await driver.findElement(webdriver.By.id('noLink')).getText();
    expect(roleLinkText).equal('No link Available.');
  });

  it('should render job spec page with warning message when role id is not valid', async () => {
    await driver.get('http://localhost:3001/jobSpec/99999999');

    const title = await driver.getTitle();
    expect(title).equal('Specification for Job Role');

    const noJobsText = await driver.findElement(webdriver.By.id('noJobs')).getText();
    expect(noJobsText).equal('No job Specification with that ID');
  });

  it('should successfully show all list of Job Roles in hierarchy', async () => {
    await driver.get('http://localhost:3001/jobs/job-roles');
    const title = await driver.getTitle();
    expect(title).equal('Show Job Roles in hierarchy');
    const table = await driver.findElement(webdriver.By.id('jobRolesTable')).getText();
    expect(table).to.include('Job Role Name');
  });

  it('should successfully render job spec for Job Role Name', async () => {
    await driver.get('http://localhost:3001/jobs/job-roles');
    await driver.findElement(webdriver.By.id('1joblink')).click();
    const title = await driver.getTitle();
    expect(title).equal('Specification for Job Role');

    const roleNameText = await driver.findElement(webdriver.By.id('roleName')).getText();
    expect(roleNameText).equal('Chief Technical Officer');

    const specSumText = await driver.findElement(webdriver.By.id('specSum')).getText();
    expect(specSumText).equal('Takes care of computer systems and IT processes');

    const roleLinkText = await driver.findElement(webdriver.By.id('noLink')).getText();
    expect(roleLinkText).equal('No link Available.');
  });
});
