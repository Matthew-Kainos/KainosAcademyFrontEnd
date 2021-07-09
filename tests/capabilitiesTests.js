const webdriver = require('selenium-webdriver');
const chai = require('chai');  
const expect = chai.expect;
    
let driver;

describe('Capabilities', function() {
    this.timeout(0);
    before(async function() {
        driver = await new webdriver.Builder().forBrowser('chrome').build();
    });

    after(async function() {
        driver.quit();
    });
    
    it('should successfully render details page when valid job name added to form', async function() {
        await driver.get('http://localhost:3001/capabilities/findByJobNameForm');
        const title = await driver.getTitle();
        expect(title).equal('Search for Capability by Job Name');
        await driver.findElement(webdriver.By.id('jobName')).sendKeys('Chief Technical Officer');
        await driver.findElement(webdriver.By.id('submitbutton')).click();
        const resultsTitle = await driver.getTitle();
        expect(resultsTitle).equal('Capability By Job Name Results');
    })
    it('should successfully render form page again and error message if job name entered is not valid', async function() {
        const invalidName = 'abc'
        await driver.get('http://localhost:3001/capabilities/findByJobNameForm');
        const title = await driver.getTitle();
        expect(title).equal('Search for Capability by Job Name');
        await driver.findElement(webdriver.By.id('jobName')).sendKeys(invalidName);
        await driver.findElement(webdriver.By.id('submitbutton')).click();
        const resultsTitle = await driver.getTitle();
        expect(resultsTitle).equal('Search for Capability by Job Name');
        const errorMessage = await driver.findElement(webdriver.By.id('errorMessage')).getText();
        expect(errorMessage).equal(`Job Role with name "${invalidName}" does not exist`);
    })
    it('should successfully render form page again and error message if no job name entered', async function() {
        await driver.get('http://localhost:3001/capabilities/findByJobNameForm');
        const title = await driver.getTitle();
        expect(title).equal('Search for Capability by Job Name');
        await driver.findElement(webdriver.By.id('submitbutton')).click();
        const resultsTitle = await driver.getTitle();
        expect(resultsTitle).equal('Search for Capability by Job Name');
        const errorMessage = await driver.findElement(webdriver.By.id('errorMessage')).getText();
        expect(errorMessage).equal('Enter Selection');
    })  
});
