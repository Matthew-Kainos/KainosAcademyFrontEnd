const webdriver = require('selenium-webdriver');
const { until } = require('selenium-webdriver');
const { By } = require('selenium-webdriver');
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;

let driver;

describe('Jobs', function () {
    this.timeout(0);

    before(async function () {
        this.driver = await new webdriver.Builder().forBrowser('chrome').build();
    });

    after(async function () {
        this.driver.quit();
    })

    it('should render job spec page with job roles details when role id is valid', async function () {
        await this.driver.get('http://localhost:3001/jobs/job-roles-spec/2');
        
        const title = await this.driver.getTitle();
        expect(title).equal('Specification for Job Role');  

        var roleIDText = await this.driver.findElement(webdriver.By.id('roleID')).getText();
        expect(roleIDText).equal('2');

        var roleNameText = await this.driver.findElement(webdriver.By.id('roleName')).getText();
        expect(roleNameText).equal('Innovation Lead');

        var specSumText = await this.driver.findElement(webdriver.By.id('specSum')).getText();
        expect(specSumText).equal('As an Innovation Lead (Consultant) in Kainos, you’ll be responsible will lead the team, working with the Innovation Lead in a dynamic and hands-on role');

        var roleLinkText = await this.driver.findElement(webdriver.By.id('specLink')).getText();
        expect(roleLinkText).equal('Sharepoint Link');
    })

    it('should render job spec page with all details when there is no sharepoint link and role id is valid', async function () {
        await this.driver.get('http://localhost:3001/jobs/job-roles-spec/1');
        
        const title = await this.driver.getTitle();
        expect(title).equal('Specification for Job Role');  

        var roleIDText = await this.driver.findElement(webdriver.By.id('roleID')).getText();
        expect(roleIDText).equal('1');

        var roleNameText = await this.driver.findElement(webdriver.By.id('roleName')).getText();
        expect(roleNameText).equal('Chief Technical Officer');

        var specSumText = await this.driver.findElement(webdriver.By.id('specSum')).getText();
        expect(specSumText).equal('Takes care of computer systems and IT processes');

        var roleLinkText = await this.driver.findElement(webdriver.By.id('noLink')).getText();
        expect(roleLinkText).equal('No link available.');
    })

    it('should render job spec page with warning message when role id is not valid', async function () {
        await this.driver.get('http://localhost:3001/jobs/job-roles-spec/99999999');
        
        const title = await this.driver.getTitle();
        expect(title).equal('Specification for Job Role');  

        var noJobsText = await this.driver.findElement(webdriver.By.id('noJobs')).getText();
        expect(noJobsText).equal('No jobs Specification with that ID');
    })

});