import { By } from 'selenium-webdriver';
import { Browser } from './browser';
import { expect } from 'chai';
import { data } from '../support/data';

export class CheckoutPage {
  private browser: Browser;

  private continueButton = By.id("continue")
  private cancelButton = By.id("cancel")
  private finishButton = By.id("finish")
  private backHomeButton = By.id("back-to-products")
  private firstNameInput = By.id("first-name")
  private lastNameInput = By.id("last-name")
  private zipInput = By.id("postal-code")
  private orderHeader = By.className("complete-header")
  

  constructor(browser: Browser) {
    this.browser = browser;
   
  }

  public async inputInformation(): Promise<void> {
    const firstName = await this.browser.get(this.firstNameInput)
    await this.browser.assertWebElementVisibility(firstName)
    firstName.sendKeys(data.firstName)
    const lastName = await this.browser.get(this.lastNameInput)
    await this.browser.assertWebElementVisibility(lastName)
    lastName.sendKeys(data.lastName)
    const zipCode = await this.browser.get(this.zipInput)
    await this.browser.assertWebElementVisibility(zipCode)
    zipCode.sendKeys(data.zipCode)
  }
  public async clickContinue(): Promise<void> {
    const continueButton = await this.browser.get(this.continueButton)
    await this.browser.assertWebElementVisibility(continueButton)
    await continueButton.click();
  }
  public async clickFinish(): Promise<void> {
    const finishButton = await this.browser.get(this.finishButton)
    await this.browser.assertWebElementVisibility(finishButton)
    await finishButton.click();
  }
  public async assertOrder(): Promise<void> {
    const orderHeader = await this.browser.get(this.orderHeader)
    await this.browser.assertWebElementVisibility(orderHeader)
    const text = await orderHeader.getText();
    expect(text).to.equal("Thank you for your order!")

  }
}