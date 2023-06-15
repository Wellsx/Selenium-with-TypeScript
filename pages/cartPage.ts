import { By } from 'selenium-webdriver';
import { Browser } from './browser';
import { expect } from 'chai';
import { data } from '../support/data';

export class CartPage {
  private browser: Browser;

  private cartButton = By.id("shopping_cart_container")
  private continueShopping = By.id("continue-shopping")
  private checkout = By.id("checkout")
  private cartItem = By.className("cart_item")

  constructor(browser: Browser) {
    this.browser = browser;
   
  }

  public async openCart(): Promise<void> {
    const cart = await this.browser.get(this.cartButton)
    await this.browser.assertWebElementVisibility(cart)
    await cart.click()
    const currentUrl = await this.browser.getCurrentUrl()
    expect(currentUrl).to.deep.equal(data.baseURL + "cart.html", "Url doesn't match.")
  }
  
  public async clickContinueShopping(): Promise<void> {
    const continueShopping = await this.browser.get(this.continueShopping)
    await this.browser.assertWebElementVisibility(continueShopping)
    await continueShopping.click();
    const currentUrl = await this.browser.getCurrentUrl()
    expect(currentUrl).to.deep.equal(data.baseURL + "inventory.html", "Url doesn't match.")
  }
  public async clickCheckout(): Promise<void> {
    const checkout = await this.browser.get(this.checkout)
    await this.browser.assertWebElementVisibility(checkout)
    await checkout.click();
    const currentUrl = await this.browser.getCurrentUrl()
    expect(currentUrl).to.deep.equal(data.baseURL + "checkout-step-one.html", "Url doesn't match.")
  }
  public async verifyItem(): Promise<void> {
    const cartItem = await this.browser.get(this.cartItem)
    await this.browser.assertWebElementVisibility(cartItem)

  }
  public async removeItem(): Promise<void> {
    const cartItem = await this.browser.get(this.cartItem)
    const removeButton = cartItem.findElement(By.css('button[id^="remove-"]'))
    await this.browser.assertWebElementVisibility(removeButton)
    await removeButton.click();
    const isDisplayed = await cartItem.isDisplayed()
    expect(isDisplayed).to.be.false
  }




}
