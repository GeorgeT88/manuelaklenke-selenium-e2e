import { expect } from 'chai';
import { NavBar } from './pages/NavBar';
import { getDriver } from './hooks';

describe('Navigation', () => {
  let nav: NavBar;

  beforeEach(async () => {
    nav = new NavBar(getDriver());
    await nav.navigate('/');
  });

  it('navbar is visible on all pages', async () => {
    expect(await nav.isVisible()).to.be.true;
  });

  it('footer is visible on all pages', async () => {
    expect(await nav.isVisible('footer')).to.be.true;
  });

  it('can navigate to About page via navbar', async () => {
    await nav.clickLink('about me');
    expect(await nav.getCurrentUrl()).to.include('/about');
  });

  it('can navigate to Portfolio page via navbar', async () => {
    await nav.clickLink('translated books');
    expect(await nav.getCurrentUrl()).to.include('/portfolio');
  });

  it('can navigate to Events page via navbar', async () => {
    await nav.clickLink('events');
    expect(await nav.getCurrentUrl()).to.include('/events');
  });

  it('can navigate to Contact page via navbar', async () => {
    await nav.clickLink('contact');
    expect(await nav.getCurrentUrl()).to.include('/contact');
  });

  it('404 page is shown for unknown routes', async () => {
    await nav.navigate('/this-page-does-not-exist');
    expect(await nav.isVisible()).to.be.true;
  });
});
