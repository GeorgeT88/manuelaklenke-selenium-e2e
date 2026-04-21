import { Builder, WebDriver } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome.js';

export const BASE_URL = 'https://manuelaklenke.com';

declare global {
  var driver: WebDriver;
}

export function getDriver(): WebDriver {
  return global.driver;
}

before(async () => {
  const options = new ChromeOptions();
  options.addArguments('--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--window-size=1280,800');

  global.driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
});

after(async () => {
  await global.driver.quit();
});
