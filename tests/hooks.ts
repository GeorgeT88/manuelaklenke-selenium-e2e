import { Builder, WebDriver } from 'selenium-webdriver';

export const BASE_URL = 'https://manuelaklenke.com';

declare global {
  var driver: WebDriver;
}

export function getDriver(): WebDriver {
  return global.driver;
}

before(async () => {
  global.driver = await new Builder()
    .forBrowser('chrome')
    .withCapabilities({
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--window-size=1280,800']
      }
    })
    .build();
});

after(async () => {
  await global.driver.quit();
});
