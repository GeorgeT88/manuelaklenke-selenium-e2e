import { WebDriver } from 'selenium-webdriver';
import { step } from './step';
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
    await step(`Type name: "${value}"`, async () => {
      await (await this.findElement('[data-testid="contact-name"]')).sendKeys(value);
    });
  }

  async fillEmail(value: string) {
    await step(`Type email: "${value}"`, async () => {
      await (await this.findElement('[data-testid="contact-email"]')).sendKeys(value);
    });
  }

  async fillMessage(value: string) {
    await step(`Type message: "${value}"`, async () => {
      await (await this.findElement('[data-testid="contact-message"]')).sendKeys(value);
    });
  }

  async submit() {
    await step('Click submit button', async () => {
      await (await this.findElement('[data-testid="contact-submit"]')).click();
    });
  }
}
