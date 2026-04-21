import { WebDriver } from 'selenium-webdriver';
import { BasePage } from './BasePage';

export class ContactPage extends BasePage {
  readonly path = '/contact';

  constructor(driver: WebDriver) {
    super(driver);
  }

  async open() {
    await this.navigate(this.path);
  }

  async isFormVisible(): Promise<boolean> {
    return this.isVisible('[data-testid="contact-form"]');
  }

  async isNameVisible(): Promise<boolean> {
    return this.isVisible('[data-testid="contact-name"]');
  }

  async isEmailVisible(): Promise<boolean> {
    return this.isVisible('[data-testid="contact-email"]');
  }

  async isMessageVisible(): Promise<boolean> {
    return this.isVisible('[data-testid="contact-message"]');
  }

  async isSubmitVisible(): Promise<boolean> {
    return this.isVisible('[data-testid="contact-submit"]');
  }

  async isSubmitEnabled(): Promise<boolean> {
    return (await this.findElement('[data-testid="contact-submit"]')).isEnabled();
  }

  async fillName(value: string) {
    await (await this.findElement('[data-testid="contact-name"]')).sendKeys(value);
  }

  async fillEmail(value: string) {
    await (await this.findElement('[data-testid="contact-email"]')).sendKeys(value);
  }

  async fillMessage(value: string) {
    await (await this.findElement('[data-testid="contact-message"]')).sendKeys(value);
  }

  async submit() {
    await (await this.findElement('[data-testid="contact-submit"]')).click();
  }
}
