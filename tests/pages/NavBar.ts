import { WebDriver, By, until } from 'selenium-webdriver';
import { BasePage } from './BasePage';

export class NavBar extends BasePage {
  constructor(driver: WebDriver) {
    super(driver);
  }

  async isVisible(): Promise<boolean> {
    return super.isVisible('nav');
  }

  async clickLink(nameFragment: string) {
    const lower = nameFragment.toLowerCase();
    const el = await this.findByXpath(
      `//nav//a[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${lower}')]`
    );
    await el.click();
  }

  async getLanguageButton() {
    const buttons = await this.driver.findElements(By.css('nav button[aria-haspopup="true"]'));
    for (const btn of buttons) {
      if (await btn.isDisplayed()) return btn;
    }
    throw new Error('No visible language button found');
  }

  async openLanguageDropdown() {
    const btn = await this.getLanguageButton();
    await btn.click();
    await this.driver.wait(
      until.elementLocated(By.xpath("//*[@role='menuitem'][contains(., 'English')]")),
      5000
    );
  }

  async selectLanguage(name: string) {
    await this.openLanguageDropdown();
    const item = await this.findByXpath(`//*[@role='menuitem'][contains(., '${name}')]`);
    await item.click();
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
