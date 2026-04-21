import { expect } from 'chai';
import { BasePage } from './pages/BasePage';
import { getDriver } from './hooks';

const publicPages = ['/', '/about', '/portfolio', '/events', '/contact'];

describe('Accessibility', () => {
  let page: BasePage;

  beforeEach(() => {
    page = new BasePage(getDriver());
  });

  for (const path of publicPages) {
    it(`skip-to-content link exists on ${path}`, async () => {
      await page.navigate(path);
      const links = await page.getSkipLinks();
      expect(links.length).to.be.greaterThan(0);
    });

    it(`page has exactly one h1 on ${path}`, async () => {
      await page.navigate(path);
      expect(await page.getH1Count()).to.equal(1);
    });

    it(`all images have alt text on ${path}`, async () => {
      await page.navigate(path);
      expect(await page.getImagesWithoutAlt()).to.equal(0);
    });
  }
});
