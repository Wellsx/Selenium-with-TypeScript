import { By, until } from 'selenium-webdriver';
import { Browser } from './browser';
import { expect } from 'chai';

export class UserMenuPage {
  private browser: Browser;

  // selectors
  private menuButton = By.id("react-burger-menu-btn");
  private menuCloseButton = By.id("react-burger-cross-btn")
  private menu = By.className("bm-menu-wrap");
  private menuItemList = By.className("bm-item-list");
  private allItemsButton = By.id("inventory_sidebar_link");
  private aboutButton = By.id("about_sidebar_link");
  private logoutButton = By.id("logout_sidebar_link")

  constructor(browser: Browser) {
    this.browser = browser;
   
  }

  public async openMenu(): Promise<void> {
    const menuButton = await this.browser.get(this.menuButton)
    await this.browser.assertWebElementVisibility(menuButton)
    await menuButton.click();
    await this.browser.assertElementVisibility(this.menu)
    
    
  }
  public async assertMenuLinks(): Promise<void> {
   
    await this.browser.assertElementVisibility(this.allItemsButton)
    await this.browser.assertElementVisibility(this.aboutButton)
    await this.browser.assertElementVisibility(this.logoutButton)

  }
  public async closeMenu(): Promise<void> {
   
    const menuCloseButton = await this.browser.get(this.menuCloseButton)
    await this.browser.assertWebElementVisibility(menuCloseButton)
    menuCloseButton.click();
    await this.browser.assertElementVisibility(this.menuButton)
    
  }
  public async openAbout(): Promise<void> {
    const aboutButton = await this.browser.get(this.aboutButton)
    await this.browser.assertWebElementVisibility(aboutButton)
    await aboutButton.click();
    const currentUrl = await this.browser.getCurrentUrl()
    expect(currentUrl).to.equal("https://saucelabs.com/")
  }
  public async clickLogout(): Promise<void> { 
    const logoutButton = await this.browser.get(this.logoutButton);
    await this.browser.assertWebElementVisibility(logoutButton)
    await logoutButton.click();
    const currentUrl = await this.browser.getCurrentUrl();
    expect(currentUrl).to.equal("https://www.saucedemo.com/")

  }
  



}
