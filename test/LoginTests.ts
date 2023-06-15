import { Builder, Capabilities, WebDriver, By, WebElement } from 'selenium-webdriver';
import { LoginPage } from '../pages/loginPage';
import { Browser } from '../pages/browser';
import { data } from '../support/data';

describe('Login Tests', () => {
  let browser: Browser;
  let loginPage: LoginPage;

  beforeEach(async () => {
    browser = new Browser();
    loginPage = new LoginPage(browser);
    await browser.visit(data.baseURL);
    
  });

  afterEach(async () => {
    await browser.quit();
  });

  it('should login successfully', async () => {
    await loginPage.login(data.username, data.password);
    await loginPage.verifyUrl();
  });

  it('should dislplay error message on missing username', async () => {
    await loginPage.login(data.empty_user, data.password)
    await loginPage.getErrorMessage("Epic sadface: Username is required")
  });

  it('should display error message on missing password', async () => {
    await loginPage.login(data.username, data.empty_pass)
    await loginPage.getErrorMessage("Epic sadface: Password is required")
  });

  it('should display error message on wrong password', async () => {
    await loginPage.login(data.username, data.invalid_pass)
    await loginPage.getErrorMessage("Epic sadface: Username and password do not match any user in this service")
  });
});
