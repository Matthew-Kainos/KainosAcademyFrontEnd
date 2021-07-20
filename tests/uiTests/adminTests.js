const webdriver = require('selenium-webdriver');
const chai = require('chai');
require('dotenv').config();

const { expect } = chai;

let driver;

const userDetails = {
  username: process.env.DB_User_Username,
  password: process.env.DB_User_Pw,
};

const adminDetails = {
  username: process.env.DB_Admin_Username,
  password: process.env.DB_Admin_Pw,
};

describe('Admin', function () {
  this.timeout(0);
  beforeEach(async () => {
    driver = await new webdriver.Builder().forBrowser('chrome').build();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('should successfully render login page if trying to access admin URL and not logged in', async () => {
    // Trying to access the home URL
    await driver.get('http://localhost:3001/admin');
    // Expecting the login page to be rendered
    const title = await driver.getTitle();
    expect(title).equal('Login');
    const currentURL = await driver.getCurrentUrl();
    expect(currentURL).equal('http://localhost:3001/');
  });

  it('should successfully render home page if trying to access admin URL and logged in as employee user', async () => {
    await driver.get('http://localhost:3001/');
    const title = await driver.getTitle();
    expect(title).equal('Login');
    await driver.findElement(webdriver.By.id('Username')).sendKeys(userDetails.username);
    await driver.findElement(webdriver.By.id('Password')).sendKeys(userDetails.password);
    await driver.findElement(webdriver.By.id('SubmitButton')).click();
    const titleAfterSubmission = await driver.getTitle();
    expect(titleAfterSubmission).equal('Home');
    await driver.get('http://localhost:3001/admin');
    const redirectedTitle = await driver.getTitle();
    expect(redirectedTitle).equal('Home');
    const currentURL = await driver.getCurrentUrl();
    expect(currentURL).equal('http://localhost:3001/home');
  });

  it('should successfully render admin menu page logged in as admin user via navigation bar', async () => {
    await driver.get('http://localhost:3001/');
    const title = await driver.getTitle();
    expect(title).equal('Login');
    await driver.findElement(webdriver.By.id('Username')).sendKeys(adminDetails.username);
    await driver.findElement(webdriver.By.id('Password')).sendKeys(adminDetails.password);
    await driver.findElement(webdriver.By.id('SubmitButton')).click();
    const titleAfterSubmission = await driver.getTitle();
    expect(titleAfterSubmission).equal('Home');
    await driver.findElement(webdriver.By.id('AdminOptionNav')).click();
    const adminMenuTitle = await driver.getTitle();
    expect(adminMenuTitle).equal('Admin Menu');
    const logOutOption = await driver.findElement(webdriver.By.id('LogOutOptionNav')).getText();
    expect(logOutOption).to.equal('Log Out');
    const adminOption = await driver.findElement(webdriver.By.id('AdminOptionNav')).getText();
    expect(adminOption).to.equal('Admin');
  });

  it('should successfully render admin menu page logged in as admin user via url', async () => {
    await driver.get('http://localhost:3001/');
    const title = await driver.getTitle();
    expect(title).equal('Login');
    await driver.findElement(webdriver.By.id('Username')).sendKeys(adminDetails.username);
    await driver.findElement(webdriver.By.id('Password')).sendKeys(adminDetails.password);
    await driver.findElement(webdriver.By.id('SubmitButton')).click();
    const titleAfterSubmission = await driver.getTitle();
    expect(titleAfterSubmission).equal('Home');
    await driver.get('http://localhost:3001/admin');
    const adminMenuTitle = await driver.getTitle();
    expect(adminMenuTitle).equal('Admin Menu');
    const logOutOption = await driver.findElement(webdriver.By.id('LogOutOptionNav')).getText();
    expect(logOutOption).to.equal('Log Out');
    const adminOption = await driver.findElement(webdriver.By.id('AdminOptionNav')).getText();
    expect(adminOption).to.equal('Admin');
  });
});
