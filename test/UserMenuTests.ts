import { LoginPage } from '../pages/loginPage';
import { Browser } from '../pages/browser';
import { data } from '../support/data';
import { UserMenuPage } from '../pages/userMenuPage';


describe('User menu tests', () => {
    let browser: Browser;
    let loginPage: LoginPage;
    let userMenuPage: UserMenuPage

    beforeEach(async () => {
        browser = new Browser();
        loginPage = new LoginPage(browser);
        userMenuPage = new UserMenuPage(browser)
        await browser.visit(data.baseURL);
        await loginPage.login(data.username, data.password)
               
    });
    
    afterEach(async () => {
        await browser.quit();
    });
    
    it('should open and close user menu', async () => {
        await userMenuPage.openMenu();
        await userMenuPage.assertMenuLinks();
        await userMenuPage.closeMenu(); 
    });
    it('should open about page', async () => {
        await userMenuPage.openMenu();
        await userMenuPage.openAbout();       
    });
    it('should logout user', async () => {
        await userMenuPage.openMenu();
        await userMenuPage.clickLogout();       
    });
});