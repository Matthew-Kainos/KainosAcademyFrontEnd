const webdriver = require('selenium-webdriver');
const chai = require('chai');  
const expect = chai.expect;

let driver;

describe('JobRoles', function() {
    this.timeout(0);
    before(async function() {
        driver = await new webdriver.Builder().forBrowser('chrome').build();
    });

    after(async function() {
        driver.quit();
    });

    it('should successfully show all list of Job Roles in hierarchy', async function() {
        await driver.get('http://localhost:3001/jobs/job-roles');
        const title = await driver.getTitle();
        expect(title).equal('Show Job Roles in hierarchy');
        const table = await driver.findElement(webdriver.By.id('jobRolesTable')).getText();
        expect(table).to.include("Job Role ID");
    })
});