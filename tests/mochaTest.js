const webdriver = require('selenium-webdriver');
const { until } = require('selenium-webdriver');
const { By } = require('selenium-webdriver');
const assert = require('assert');

describe('webdriver', () => {
    let driver;
    before(async () => {
      driver = new webdriver.Builder().forBrowser('chrome')
      .build();
     
      await driver.get(`https://localhost:3001`);
    });
  
    after(async () => {
      await driver.quit();
    });
  
    it('test google search', async () => {

        await driver.findElement(webdriver.By.name('q')).sendKeys('webdriver\n')
        
        const title = await driver.getTitle()
        console.log(title)
        assert.strictEqual(title, "webdriver - Google Search")
    });
  });