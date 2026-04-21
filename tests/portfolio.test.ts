import { expect } from 'chai';
import { BasePage } from './pages/BasePage';
import { getDriver } from './hooks';

describe('Portfolio Page', () => {
  let page: BasePage;

  beforeEach(() => {
    page = new BasePage(getDriver());
  });

  it('page loads successfully', async () => {
    await page.navigate('/portfolio');
    expect(await page.getCurrentUrl()).to.include('/portfolio');
    expect(await (await page.getMainContent()).isDisplayed()).to.be.true;
  });
});
