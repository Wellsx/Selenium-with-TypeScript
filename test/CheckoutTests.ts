import { LoginPage } from '../pages/loginPage';
import { Browser } from '../pages/browser';
import { data } from '../support/data';
import { CartPage } from '../pages/cartPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CheckoutPage } from '../pages/checkoutPage';


describe.only('Checkout page tests', () => {
    let browser: Browser;
    let loginPage: LoginPage;
    let cartPage: CartPage
    let inventoryPage: InventoryPage
    let checkoutPage: CheckoutPage

    beforeEach(async () => {
        browser = new Browser();
        loginPage = new LoginPage(browser);
        cartPage = new CartPage(browser)
        inventoryPage = new InventoryPage(browser)
        checkoutPage = new CheckoutPage(browser)
        await browser.visit(data.baseURL);
        await loginPage.login(data.username, data.password)
               
    });
    
   /*  afterEach(async () => {
        await browser.quit();
    }) */

    it('should checkout an item', async () => {
        await inventoryPage.addFIrstItemToCart()
        await cartPage.openCart()
        await cartPage.clickCheckout();
        await checkoutPage.inputInformation();
        await checkoutPage.clickContinue()
        await checkoutPage.clickFinish()
        await checkoutPage.assertOrder()

    });

})