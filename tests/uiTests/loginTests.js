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

describe('Login', function () {
  this.timeout(0);
  beforeEach(async () => {
    driver = await new webdriver.Builder().forBrowser('chrome').build();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('should give appropiate menssage if incorrect userame provided', async () => {
    await driver.get('http://localhost:3001/');
    const title = await driver.getTitle();
    expect(title).equal('Login');
    await driver.findElement(webdriver.By.id('Username')).sendKeys('fakeUsername');
    await driver.findElement(webdriver.By.id('Password')).sendKeys('fakePassword');
    await driver.findElement(webdriver.By.id('SubmitButton')).click();
    const titleAfterSubmission = await driver.getTitle();
    expect(titleAfterSubmission).equal('Login');
    const errorText = await driver.findElement(webdriver.By.id('ErrorMessage')).getText();
    expect(errorText).to.equal('Incorrect Username');
  });

  it('should give appropiate menssage if incorrect password provided', async () => {
    await driver.get('http://localhost:3001/');
    const title = await driver.getTitle();
    expect(title).equal('Login');
    await driver.findElement(webdriver.By.id('Username')).sendKeys(userDetails.username);
    await driver.findElement(webdriver.By.id('Password')).sendKeys('fakePassword');
    await driver.findElement(webdriver.By.id('SubmitButton')).click();
    const titleAfterSubmission = await driver.getTitle();
    expect(titleAfterSubmission).equal('Login');
    const errorText = await driver.findElement(webdriver.By.id('ErrorMessage')).getText();
    expect(errorText).to.equal('Incorrect Password');
  });

  it('should render home page with no admin options if correct employee details entered', async () => {
    await driver.get('http://localhost:3001/');
    const title = await driver.getTitle();
    expect(title).equal('Login');
    await driver.findElement(webdriver.By.id('Username')).sendKeys(userDetails.username);
    await driver.findElement(webdriver.By.id('Password')).sendKeys(userDetails.password);
    await driver.findElement(webdriver.By.id('SubmitButton')).click();
    const titleAfterSubmission = await driver.getTitle();
    expect(titleAfterSubmission).equal('Home');
    const logOutOption = await driver.findElement(webdriver.By.id('LogOutOptionNav')).getText();
    expect(logOutOption).to.equal('Log Out');
    try {
      await driver.findElement(webdriver.By.id('AdminOptionNav'));
    } catch (e) {
      expect(e.message).to.include('no such element: Unable to locate element');
      expect(e.message).to.include('AdminOptionNav');
    }
  });

  it('should render home page with admin options if correct admin details entered', async () => {
    await driver.get('http://localhost:3001/');
    const title = await driver.getTitle();
    expect(title).equal('Login');
    await driver.findElement(webdriver.By.id('Username')).sendKeys(adminDetails.username);
    await driver.findElement(webdriver.By.id('Password')).sendKeys(adminDetails.password);
    await driver.findElement(webdriver.By.id('SubmitButton')).click();
    const titleAfterSubmission = await driver.getTitle();
    expect(titleAfterSubmission).equal('Home');
    const logOutOption = await driver.findElement(webdriver.By.id('LogOutOptionNav')).getText();
    expect(logOutOption).to.equal('Log Out');
    const adminOption = await driver.findElement(webdriver.By.id('AdminOptionNav')).getText();
    expect(adminOption).to.equal('Admin');
  });

  it('should successfully logout if logged in and be redirected back to login page', async () => {
    await driver.get('http://localhost:3001/');
    const title = await driver.getTitle();
    expect(title).equal('Login');
    await driver.findElement(webdriver.By.id('Username')).sendKeys(userDetails.username);
    await driver.findElement(webdriver.By.id('Password')).sendKeys(userDetails.password);
    await driver.findElement(webdriver.By.id('SubmitButton')).click();
    const titleAfterSubmission = await driver.getTitle();
    expect(titleAfterSubmission).equal('Home');
    await driver.findElement(webdriver.By.id('LogOutOptionNav')).click();
    expect(title).equal('Login');
  });
  it('should successfully render login page if trying to access another URL and not logged in', async () => {
    // Trying to access the home URL without being logged in
    await driver.get('http://localhost:3001/home');
    // Expecting the login page to be rendered
    const title = await driver.getTitle();
    expect(title).equal('Login');
    const currentURL = await driver.getCurrentUrl();
    expect(currentURL).equal('http://localhost:3001/');
  });
  it('should successfully redirect to home page if accessing login url and already logged in', async () => {
    await driver.get('http://localhost:3001/');
    const title = await driver.getTitle();
    expect(title).equal('Login');
    await driver.findElement(webdriver.By.id('Username')).sendKeys(userDetails.username);
    await driver.findElement(webdriver.By.id('Password')).sendKeys(userDetails.password);
    await driver.findElement(webdriver.By.id('SubmitButton')).click();
    const titleAfterSubmission = await driver.getTitle();
    expect(titleAfterSubmission).equal('Home');
    await driver.get('http://localhost:3001/');
    const redirectedTitle = await driver.getTitle();
    expect(redirectedTitle).equal('Home');
    const currentURL = await driver.getCurrentUrl();
    expect(currentURL).equal('http://localhost:3001/home');
  });
});
