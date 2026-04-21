import { expect } from 'chai';
import { ContactPage } from './pages/ContactPage';
import { getDriver } from './hooks';

describe('Contact Page', () => {
  let page: ContactPage;

  beforeEach(async () => {
    page = new ContactPage(getDriver());
    await page.open();
  });

  it('contact form and all fields are visible', async () => {
    expect(await page.isFormVisible()).to.be.true;
    expect(await page.isNameVisible()).to.be.true;
    expect(await page.isEmailVisible()).to.be.true;
    expect(await page.isMessageVisible()).to.be.true;
    expect(await page.isSubmitVisible()).to.be.true;
  });

  it('submit does nothing when form is empty', async () => {
    await page.submit();
    expect(await page.getCurrentUrl()).to.include('/contact');
  });

  it('submit button becomes enabled when all required fields are filled', async () => {
    await page.fillName('Test User');
    await page.fillEmail('test@example.com');
    await page.fillMessage('Hello, this is a test message.');
    expect(await page.isSubmitEnabled()).to.be.true;
  });

  it('email field rejects invalid format', async () => {
    await page.fillName('Test User');
    await page.fillEmail('not-an-email');
    await page.fillMessage('Test message');
    await page.submit();
    expect(await page.getCurrentUrl()).to.include('/contact');
  });
});
