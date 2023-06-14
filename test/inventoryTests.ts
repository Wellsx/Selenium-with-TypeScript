import { LoginPage } from '../pages/loginPage';
import { Browser } from '../pages/browser';
import { data } from '../support/data';
import { InventoryPage } from '../pages/inventoryPage';

describe('Login Tests', () => {
  let browser: Browser;
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  beforeEach(async () => {
    browser = new Browser();
    loginPage = new LoginPage(browser);
    inventoryPage = new InventoryPage(browser)
    await browser.visit(data.baseURL);
    await loginPage.login(data.username, data.password)
           
  });

 /*  afterEach(async () => {
    await browser.quit();
  }); */

  it('should display all inventory items', async () => {
    await inventoryPage.getInventoryItems()
        
  });
  it('should add item to cart', async () => {
    await inventoryPage.addRandomItemToCart();
    await inventoryPage.getCartBadgeNumber(1)
  });
  it('should remove item from cart', async () => {
    await inventoryPage.removeRandomItemFromCart();
  })
  it('should add multiple items to cart', async () => {
    await inventoryPage.addMultipleItemsToCart()
    await inventoryPage.getCartBadgeNumber(2)
  });
})