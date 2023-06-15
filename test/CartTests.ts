import { LoginPage } from '../pages/loginPage';
import { Browser } from '../pages/browser';
import { data } from '../support/data';
import { CartPage } from '../pages/cartPage';
import { InventoryPage } from '../pages/inventoryPage';


describe.only('User menu tests', () => {
    let browser: Browser;
    let loginPage: LoginPage;
    let cartPage: CartPage
    let inventoryPage: InventoryPage

    beforeEach(async () => {
        browser = new Browser();
        loginPage = new LoginPage(browser);
        cartPage = new CartPage(browser)
        inventoryPage = new InventoryPage(browser)
        await browser.visit(data.baseURL);
        await loginPage.login(data.username, data.password)
               
    });
    
    afterEach(async () => {
        await browser.quit();
    });

    it('should open cart page', async () => {
        await cartPage.openCart()
    });
    it('should return to inventory', async () => {
        await cartPage.openCart()
        await cartPage.clickContinueShopping();
    });
    it('should verify item is added to cart', async () => {
        await inventoryPage.addRandomItemToCart()
        await cartPage.openCart()
        await cartPage.verifyItem()
    });
    it('should remove item from cart', async () => {
        await inventoryPage.addRandomItemToCart()
        await cartPage.openCart()
        await cartPage.removeItem();
    });
    it('should continue to checkout', async () => {
        await inventoryPage.addRandomItemToCart()
        await cartPage.openCart()
        await cartPage.clickCheckout();
    });

})