import { WebDriver, By, until } from 'selenium-webdriver';
import { step } from 'allure-js-commons';
import { BasePage } from './BasePage';

export class NavBar extends BasePage {
  constructor(driver: WebDriver) {
    super(driver);
  }

  async isNavVisible(): Promise<boolean> {
    return super.isVisible('nav');
  }

  async clickLink(href: string) {
    await step(`Click nav link: ${href}`, async () => {
      const el = await this.findByXpath(`//nav//a[@href='${href}']`);
      await el.click();
    });
  }

  async getLanguageButton() {
    const buttons = await this.driver.findElements(By.css('nav button[aria-haspopup="true"]'));
    for (const btn of buttons) {
      if (await btn.isDisplayed()) return btn;
    }
    throw new Error('No visible language button found');
  }

  async openLanguageDropdown() {
    await step('Open language dropdown', async () => {
      const btn = await this.getLanguageButton();
      await btn.click();
      await this.driver.wait(
        until.elementLocated(By.xpath("//*[@role='menuitem'][contains(., 'English')]")),
        5000
      );
    });
  }

  async selectLanguage(name: string) {
    await step(`Select language: ${name}`, async () => {
      await this.openLanguageDropdown();
      const item = await this.findByXpath(`//*[@role='menuitem'][contains(., '${name}')]`);
      await item.click();
    });
  }

  async getLanguageButtonText(): Promise<string> {
    return (await this.getLanguageButton()).getText();
  }

  async getLanguageMenuItems() {
    return {
      english: await this.findByXpath("//*[@role='menuitem'][contains(., 'English')]"),
      romana: await this.findByXpath("//*[@role='menuitem'][contains(., 'Romana')]"),
      deutsch: await this.findByXpath("//*[@role='menuitem'][contains(., 'Deutsch')]"),
    };
  }
}
