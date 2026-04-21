import { expect } from 'chai';
import { BasePage } from './pages/BasePage';
import { getDriver } from './hooks';

describe('Events Page', () => {
  let page: BasePage;

  beforeEach(() => {
    page = new BasePage(getDriver());
  });

  it('page loads successfully', async () => {
    await page.navigate('/events');
    expect(await page.getCurrentUrl()).to.include('/events');
    expect(await (await page.getMainContent()).isDisplayed()).to.be.true;
  });
});
