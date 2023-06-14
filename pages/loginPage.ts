import { By, WebElement } from 'selenium-webdriver';
import { Browser } from './browser';
import { expect } from 'chai';
import { data } from '../support/data';

export class LoginPage {
    private browser: Browser;
  
    // selectors
    private usernameInput = By.id('user-name');
    private passwordInput = By.id('password');
    private loginButton = By.id('login-button');
    private errorMessage = By.xpath("//h3[@data-test='error']")
    
  
    constructor(browser: Browser) {
      this.browser = browser;
    }
    
    // methods
    public async login(username: string, password: string): Promise<void> {
      await this.enterUsername(username);
      await this.enterPassword(password);
      await this.clickLoginButton();
    }
  
    private async enterUsername(username: string): Promise<void> {
      const usernameInput = await this.browser.get(this.usernameInput);
      await this.browser.assertElementVisibility(this.usernameInput)
      await usernameInput.sendKeys(username);
    }
  
    private async enterPassword(password: string): Promise<void> {
      const passwordInput = await this.browser.get(this.passwordInput);
      await this.browser.assertElementVisibility(this.passwordInput)
      await passwordInput.sendKeys(password);
    }
  
    private async clickLoginButton(): Promise<void> {
      const loginButton = await this.browser.get(this.loginButton);
      await this.browser.assertElementVisibility(this.loginButton)
      await loginButton.click()
    }

    public async verifyUrl(): Promise<void>{
      const currentURL = await this.browser.getCurrentUrl();
      expect(currentURL).to.deep.equal(data.baseURL + "inventory.html", "Url doesn't match.")
    }
  
    public async getErrorMessage(expectedMessage: string): Promise<void> {
        const errorMessage = await this.browser.get(this.errorMessage);
        await this.browser.assertElementVisibility(this.errorMessage)
        const errorText = await errorMessage.getText();
        expect(errorText).to.deep.equal(expectedMessage, "Error message does not match.")
    }
  }
  