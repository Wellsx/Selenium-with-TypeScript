import { assert } from 'chai';
import { Builder, Capabilities, WebDriver, By, WebElement, until } from 'selenium-webdriver';


export class Browser {
  private driver: WebDriver;

  constructor() {
    this.driver = new Builder().withCapabilities(Capabilities.chrome()).build();
    this.driver.manage().setTimeouts({ implicit: 5000, pageLoad: 10000, script: 10000 })
   // this.driver.manage().setTimeouts({implicit: 10000})
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
  public async getMultiple(locator: By): Promise<WebElement[]> {
    return await this.driver.findElements(locator);
  }
  
  public async assertElementVisibility(locator: By): Promise<void> {
    const element = await this.get(locator);
    assert.isTrue(await element.isDisplayed(), 'Element is not displayed');
    assert.isTrue(await this.isElementLocated(locator), 'Element is not located');
  }
  
  public async assertWebElementVisibility(element: WebElement): Promise<void> {
    assert.isTrue(await element.isDisplayed(), 'Element is not displayed');
   
  }
  public async waitUntilElementStale(element: WebElement): Promise<void> {
    await this.driver.wait(async () => {
      try {
        await element.isDisplayed();
        return false; 
      } catch (error) {
        return true;
      }
    }, 5000); 
  }
  

  private async isElementLocated(locator: By ): Promise<boolean> {
    try {
      await this.driver.findElement(locator);
      return true;
    } catch (error) {
      return false;
    }
  }
  public async assertIsNotVisible(element: WebElement): Promise<void> {
    const isDisplayed = await element.isDisplayed();
    assert.isFalse(isDisplayed, 'Element is displayed');
  }
  
}
