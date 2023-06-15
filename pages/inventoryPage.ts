import { By } from 'selenium-webdriver';
import { Browser } from './browser';
import { expect } from 'chai';

export class InventoryPage {
  private browser: Browser;

  //selector
  private sortMenu = By.css('[data-test="product_sort_container"]')
  private inventoryList = By.className('inventory_list');
  private inventoryItem = By.css('.inventory_list > .inventory_item');
  private addToCartButton = By.css('button[id^="add-to-cart-"]')
  private removeButton = By.css('button[id^="remove-"]')
  private cartBadge = By.className("shopping_cart_badge")
  private itemPrice = By.className("inventory_item_price")
  private lowToHigh = By.css('option[value="lohi"]')
  private highToLow = By.css('option[value="hilo"]')
  private sortAZ = By.css('option[value="az"]')
  private sortZA = By.css('option[value="za"]')
  private itemName = By.className("inventory_item_name")
  

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
  public async addFIrstItemToCart(): Promise<void> {
    const inventoryList = await this.browser.get(this.inventoryList);
    const inventoryItems = await inventoryList.findElements(this.inventoryItem);
    const item = inventoryItems[0]
    const addToCartButton = await item.findElement(this.addToCartButton);
    await this.browser.assertWebElementVisibility(addToCartButton)
    
    await addToCartButton.click()
    const removeButton = await item.findElement(this.removeButton)
    await this.browser.assertWebElementVisibility(removeButton)
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

  public async sortLowToHigh(): Promise<void> {
    const sortDropdown = await this.browser.get(this.sortMenu)
      await sortDropdown.click()
      const option = await this.browser.get(this.lowToHigh)
      await option.click()
  }
  public async sortHighToLow(): Promise<void> {
    const sortDropdown = await this.browser.get(this.sortMenu)
      await sortDropdown.click()
      const option = await this.browser.get(this.highToLow)
      await option.click()
  }
  public async sortAtoZ(): Promise<void> {
    const sortDropdown = await this.browser.get(this.sortMenu)
      await sortDropdown.click()
      const option = await this.browser.get(this.sortAZ)
      await option.click()
  }
  public async sortZtoA(): Promise<void> {
    const sortDropdown = await this.browser.get(this.sortMenu)
      await sortDropdown.click()
      const option = await this.browser.get(this.sortZA)
      await option.click()
  }

  public async assertSortOrder(sortOrder: 'lowToHigh' | 'highToLow'): Promise<void> {
    const inventoryList = await this.browser.get(this.inventoryList);
    const inventoryItems = await inventoryList.findElements(this.inventoryItem);
    
    const sortedItems = await Promise.all(inventoryItems.map(async (item) => {
      const priceElement = await item.findElement(this.itemPrice);
      const priceText = await priceElement.getText();
      const price = parseFloat(priceText.split('$')[1]);
      return { item, price };
    }));
    
    sortedItems.sort((item1, item2) => {
      if (sortOrder === 'lowToHigh') {
        return item1.price - item2.price;
      } else if (sortOrder === 'highToLow') {
        return item2.price - item1.price;
      }
      return 0;
    });
    
    const firstItem = sortedItems[0];
    const lastItem = sortedItems[sortedItems.length - 1];
    
    const firstItemPrice = firstItem.price;
    const lastItemPrice = lastItem.price;
    
    if (sortOrder === 'lowToHigh') {
      expect(firstItemPrice).to.be.lessThan(lastItemPrice);
    } else if (sortOrder === 'highToLow') {
      expect(firstItemPrice).to.be.greaterThan(lastItemPrice);
    }
  }

  private isSortedAlphabetically(arr: string[]): boolean {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i - 1].localeCompare(arr[i]) > 0) {
        return false;
      }
    }
    return true;
  }
  public async assertAlphabeticalSortOrder(): Promise<void> {
    const inventoryList = await this.browser.get(this.inventoryList);
    const inventoryItems = await inventoryList.findElements(this.inventoryItem);
    
    const sortedItems = await Promise.all(inventoryItems.map(async (item) => {
      const nameElement = await item.findElement(this.itemName);
      const name = await nameElement.getText();
      return { item, name };
    }));
    
    const sortedNames = sortedItems.map((item) => item.name);
    const isSorted = this.isSortedAlphabetically(sortedNames);
    
    expect(isSorted).to.be.true;
  }

  
};
