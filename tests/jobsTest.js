const webdriver = require('selenium-webdriver');
const chai = require('chai');

const { expect } = chai;

let driver;

describe('Jobs', function () {
  this.timeout(0);
  before(async () => {
    driver = await new webdriver.Builder().forBrowser('chrome').build();
  });

  after(async () => {
    driver.quit();
  });

  it('should render job spec page with job roles details when role id is valid', async () => {
    await driver.get('http://localhost:3001/jobs/job-roles-spec/2');

    const title = await driver.getTitle();
    expect(title).equal('Specification for Job Role');

    const roleIDText = await driver.findElement(webdriver.By.id('roleID')).getText();
    expect(roleIDText).equal('2');

    const roleNameText = await driver.findElement(webdriver.By.id('roleName')).getText();
    expect(roleNameText).equal('Innovation Lead');

    const specSumText = await driver.findElement(webdriver.By.id('specSum')).getText();
    expect(specSumText).equal('As an Innovation Lead (Consultant) in Kainos, you’ll be responsible will lead the team, working with the Innovation Lead in a dynamic and hands-on role');

    const roleLinkText = await driver.findElement(webdriver.By.id('specLink')).getText();
    expect(roleLinkText).equal('Sharepoint Link');
  });

  it('should render job spec page with all details when there is no sharepoint link and role id is valid', async () => {
    await driver.get('http://localhost:3001/jobs/job-roles-spec/1');

    const title = await driver.getTitle();
    expect(title).equal('Specification for Job Role');

    const roleIDText = await driver.findElement(webdriver.By.id('roleID')).getText();
    expect(roleIDText).equal('1');

    const roleNameText = await driver.findElement(webdriver.By.id('roleName')).getText();
    expect(roleNameText).equal('Chief Technical Officer');

    const specSumText = await driver.findElement(webdriver.By.id('specSum')).getText();
    expect(specSumText).equal('Takes care of computer systems and IT processes');

    const roleLinkText = await driver.findElement(webdriver.By.id('noLink')).getText();
    expect(roleLinkText).equal('No link Available.');
  });

  it('should render job spec page with warning message when role id is not valid', async () => {
    await driver.get('http://localhost:3001/jobs/job-roles-spec/99999999');

    const title = await driver.getTitle();
    expect(title).equal('Specification for Job Role');

    const noJobsText = await driver.findElement(webdriver.By.id('noJobs')).getText();
    expect(noJobsText).equal('No jobs Specification with that ID');
  });
});