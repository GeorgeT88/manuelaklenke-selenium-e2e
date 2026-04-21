import { expect } from 'chai';
import { BasePage } from './pages/BasePage';
import { getDriver } from './hooks';

describe('Home Page', () => {
  let page: BasePage;

  beforeEach(() => {
    page = new BasePage(getDriver());
  });

  it('page loads successfully', async () => {
    await page.navigate('/');
    expect(await page.getCurrentUrl()).to.match(/manuelaklenke\.com/);
    expect(await page.getTitle()).to.not.equal('');
  });

  it('main content area is visible', async () => {
    await page.navigate('/');
    expect(await (await page.getMainContent()).isDisplayed()).to.be.true;
  });
});
