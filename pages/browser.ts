import { assert } from 'chai';
import { Builder, Capabilities, WebDriver, By, WebElement } from 'selenium-webdriver';


export class Browser {
  private driver: WebDriver;

  constructor() {
    this.driver = new Builder().withCapabilities(Capabilities.chrome()).build();
  }

  public async visit(url: string): Promise<void> {
    await this.driver.get(url);
  }

  public async getTitle(): Promise<string> {
    return await this.driver.getTitle();
  }
  
  public async getCurrentUrl(): Promise<string> {
    return await this.driver.getCurrentUrl();
  }

  public async getText(locator: By): Promise<string> {
    const element = await this.get(locator);
    return await element.getText();

  }

  public async quit(): Promise<void> {
    await this.driver.quit();
  }

  public async get(locator: By): Promise<WebElement> {
    return await this.driver.findElement(locator);
  }
  
  public async assertElementVisibility(locator: By): Promise<void> {
    const element = await this.get(locator);
    assert.isTrue(await element.isDisplayed(), 'Element is not displayed');
    assert.isTrue(await this.isElementLocated(locator), 'Element is not located');
  }

  private async isElementLocated(locator: By): Promise<boolean> {
    try {
      await this.driver.findElement(locator);
      return true;
    } catch (error) {
      return false;
    }
  }
}
