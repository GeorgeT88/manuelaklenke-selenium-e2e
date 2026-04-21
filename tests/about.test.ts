import { expect } from 'chai';
import { BasePage } from './pages/BasePage';
import { getDriver } from './hooks';

describe('About Page', () => {
  let page: BasePage;

  beforeEach(() => {
    page = new BasePage(getDriver());
  });

  it('page loads successfully', async () => {
    await page.navigate('/about');
    expect(await page.getCurrentUrl()).to.include('/about');
    expect(await (await page.getMainContent()).isDisplayed()).to.be.true;
  });
});
