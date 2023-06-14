import { By } from 'selenium-webdriver';
import { Browser } from './browser';
import { expect } from 'chai';

export class InventoryPage {
  private browser: Browser;

  //selector
  private cartButton = By.id("shopping_cart_container")
  private menuButton = By.id("react-burger-menu-btn")
  private sortMenu = By.css('[data-test="product_sort_container"]')
  private inventoryList = By.className('inventory_list');
  private inventoryItem = By.css('.inventory_list > .inventory_item');
  private addToCartButton = By.css('button[id^="add-to-cart-"]')
  private removeButton = By.css('button[id^="remove-"]')
  private cartBadge = By.className("shopping_cart_badge")
  

  constructor(browser: Browser) {
    this.browser = browser;
   
  }

  public async getInventoryItems(): Promise<void>{

    const inventoryList = await this.browser.get(this.inventoryList)
    expect(inventoryList).to.have.lengthOf(6, "Not all list items present")
    const inventoryItems = await this.browser.getMultiple(this.inventoryItem)

    inventoryItems.forEach(async (inventoryItem) => {
      await this.browser.assertWebElementVisibility(inventoryItem);
    });
  }
  public async addRandomItemToCart(): Promise<void> {
    const inventoryList = await this.browser.get(this.inventoryList);
    const inventoryItems = await inventoryList.findElements(this.inventoryItem);
    const randomIndex = Math.floor(Math.random() * inventoryItems.length);
    const randomItem = inventoryItems[randomIndex];
    const addToCartButton = await randomItem.findElement(this.addToCartButton);
    await this.browser.assertWebElementVisibility(addToCartButton)
    
    await addToCartButton.click();
    const removeButton = await randomItem.findElement(this.removeButton)
    await this.browser.assertWebElementVisibility(removeButton)
    
  }
  public async addMultipleItemsToCart(): Promise<void> {
    const inventoryList = await this.browser.get(this.inventoryList);
    const inventoryItems = await inventoryList.findElements(this.inventoryItem);
    const totalItems = Math.min(inventoryItems.length, 2); 

    for (let i = 0; i < totalItems; i++) {
      const item = inventoryItems[i];
      const addToCartButton = await item.findElement(this.addToCartButton);
      await this.browser.assertWebElementVisibility(addToCartButton);
      await addToCartButton.click();
    }



  }
  public async getCartBadgeNumber(number: number): Promise<void> {
    const cartBadge = await this.browser.get(this.cartBadge);
    const badgeNumber = await cartBadge.getText()
    expect(badgeNumber).to.equal(number.toString())
    
  }
  public async removeRandomItemFromCart(): Promise<void> {
    await this.addRandomItemToCart()
    const removeButton = await this.browser.get(this.removeButton)
    await removeButton.click();
    await this.browser.waitUntilElementStale(removeButton);
  
    
  }
  
}