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
    
    it('should successfully render details page when valid capability name added to form', async function() {
        await driver.get('http://localhost:3001/capabilities/familyform');
        const title = await driver.getTitle();
        expect(title).equal('Search for Family by Capability Name');
        await driver.findElement(webdriver.By.id('capName')).sendKeys('Engineering');
        await driver.findElement(webdriver.By.id('submitbutton')).click();
        const resultsTitle = await driver.getTitle();
        //expect(resultsTitle).equal('Search for Family by Capability Name');
    })
    it('should successfully render form page again and error message if capability name entered is not valid', async function() {
        await driver.get('http://localhost:3001/capabilities/familyform');
        const title = await driver.getTitle();
        expect(title).equal('Search for Family by Capability Name');
        await driver.findElement(webdriver.By.id('capName')).sendKeys('abc');
        await driver.findElement(webdriver.By.id('submitbutton')).click();
        const resultsTitle = await driver.getTitle();
        expect(resultsTitle).equal('Search for Family by Capability Name');
        const errorMessage = await driver.findElement(webdriver.By.id('errorMessage')).getText();
        expect(errorMessage).equal('Enter Selection');
    })
    it('should successfully render form page again and error message if no capability name is entered', async function() {
        await driver.get('http://localhost:3001/capabilities/familyform');
        const title = await driver.getTitle();
        expect(title).equal('Search for Family by Capability Name');
        await driver.findElement(webdriver.By.id('capName')).sendKeys('10000');
        await driver.findElement(webdriver.By.id('submitbutton')).click();
        const resultsTitle = await driver.getTitle();
        expect(resultsTitle).equal('Search for Family by Capability Name');
        const errorMessage = await driver.findElement(webdriver.By.id('errorMessage')).getText();
        expect(errorMessage).equal('Enter Selection');
    })  
});