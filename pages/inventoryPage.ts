import { By } from 'selenium-webdriver';
import { Browser } from './browser';

export class InventoryPage {
  private browser: Browser;

  //selector

  constructor(browser: Browser) {
    this.browser = browser;
  }
}