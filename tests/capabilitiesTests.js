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
    
    it('should successfully render details page when valid job id added to form', async function() {
        await driver.get('http://localhost:3001/');
        const title = await driver.getTitle();
        expect(title).equal('Search for Capability by Job Id');
        await driver.findElement(webdriver.By.id('jobID')).sendKeys('1');
        await driver.findElement(webdriver.By.id('submitbutton')).click();
        const resultsTitle = await driver.getTitle();
        expect(resultsTitle).equal('Capability By Job ID Results');
    })
    it('should successfully render form page again and error message if job id entered is of wrong type', async function() {
        await driver.get('http://localhost:3001/');
        const title = await driver.getTitle();
        expect(title).equal('Search for Capability by Job Id');
        await driver.findElement(webdriver.By.id('jobID')).sendKeys('abc');
        await driver.findElement(webdriver.By.id('submitbutton')).click();
        const resultsTitle = await driver.getTitle();
        expect(resultsTitle).equal('Search for Capability by Job Id');
        const errorMessage = await driver.findElement(webdriver.By.id('errorMessage')).getText();
        expect(errorMessage).equal('Invalid selection. Enter Integer');
    })
    it('should successfully render form page again and error message if job id entered not present in database', async function() {
        await driver.get('http://localhost:3001/');
        const title = await driver.getTitle();
        expect(title).equal('Search for Capability by Job Id');
        await driver.findElement(webdriver.By.id('jobID')).sendKeys('10000');
        await driver.findElement(webdriver.By.id('submitbutton')).click();
        const resultsTitle = await driver.getTitle();
        expect(resultsTitle).equal('Search for Capability by Job Id');
        const errorMessage = await driver.findElement(webdriver.By.id('errorMessage')).getText();
        expect(errorMessage).equal('Employee ID does not exist. Select again');
    })  
});
