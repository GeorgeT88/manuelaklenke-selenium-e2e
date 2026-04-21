import { expect } from 'chai';
import { NavBar } from './pages/NavBar';
import { getDriver } from './hooks';

describe('Language Switcher', () => {
  let nav: NavBar;

  beforeEach(async () => {
    nav = new NavBar(getDriver());
    await nav.navigate('/');
  });

  it('language switcher button is visible in the navbar', async () => {
    const btn = await nav.getLanguageButton();
    expect(await btn.isDisplayed()).to.be.true;
  });

  it('language dropdown offers three language options', async () => {
    await nav.openLanguageDropdown();
    const { english, romana, deutsch } = await nav.getLanguageMenuItems();
    expect(await english.isDisplayed()).to.be.true;
    expect(await romana.isDisplayed()).to.be.true;
    expect(await deutsch.isDisplayed()).to.be.true;
  });

  it('switching to English updates the navbar language button', async () => {
    await nav.selectLanguage('English');
    expect(await nav.getLanguageButtonText()).to.include('EN');
  });

  it('switching to Deutsch updates the navbar language button', async () => {
    await nav.selectLanguage('Deutsch');
    expect(await nav.getLanguageButtonText()).to.include('DE');
  });
});
