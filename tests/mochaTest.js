const webdriver = require('selenium-webdriver');
const { until } = require('selenium-webdriver');
const { By } = require('selenium-webdriver');
const assert = require('assert');

describe('Test Suite', function() {
  this.timeout(0);

  before(async function() {
      this.driver = await new webdriver.Builder().forBrowser('chrome').build();
  });

  it('should do', async function() {
      await this.driver.get('http://www.google.com');
      const title = await this.driver.getTitle();
      assert.strictEqual(title, 'Google');
  })

  after(async function() {
      this.driver.quit();
  })
});