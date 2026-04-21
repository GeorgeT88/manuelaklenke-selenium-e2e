import { WebDriver, By, until, WebElement } from 'selenium-webdriver';
import { step } from 'allure-js-commons';

export const BASE_URL = 'https://manuelaklenke.com';

export class BasePage {
  constructor(protected driver: WebDriver) {}

  async navigate(path: string = '/') {
    await step(`Navigate to ${path}`, async () => {
      await this.driver.get(`${BASE_URL}${path}`);
    });
  }

  async getCurrentUrl(): Promise<string> {
    return this.driver.getCurrentUrl();
  }

  async getTitle(): Promise<string> {
    return this.driver.getTitle();
  }

  async findElement(selector: string): Promise<WebElement> {
    return this.driver.findElement(By.css(selector));
  }

  async findElements(selector: string): Promise<WebElement[]> {
    return this.driver.findElements(By.css(selector));
  }

  async findByXpath(xpath: string): Promise<WebElement> {
    return this.driver.findElement(By.xpath(xpath));
  }

  async findAllByXpath(xpath: string): Promise<WebElement[]> {
    return this.driver.findElements(By.xpath(xpath));
  }

  async waitForElement(selector: string, timeout: number = 5000): Promise<WebElement> {
    return this.driver.wait(until.elementLocated(By.css(selector)), timeout);
  }

  async isVisible(selector: string): Promise<boolean> {
    try {
      const el = await this.findElement(selector);
      return el.isDisplayed();
    } catch {
      return false;
    }
  }

  async getMainContent(): Promise<WebElement> {
    return this.waitForElement('#main');
  }

  async getH1Count(): Promise<number> {
    return (await this.findElements('h1')).length;
  }

  async getImagesWithoutAlt(): Promise<number> {
    return (await this.findAllByXpath('//img[not(@alt)]')).length;
  }

  async getSkipLinks(): Promise<WebElement[]> {
    return this.findElements('[data-testid="skip-to-content"]');
  }
}
