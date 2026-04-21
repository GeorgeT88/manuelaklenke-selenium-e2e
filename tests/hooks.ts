import { Builder, WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

export const BASE_URL = 'https://manuelaklenke.com';

declare global {
  var driver: WebDriver;
}

export function getDriver(): WebDriver {
  return global.driver;
}

before(async () => {
  const options = new chrome.Options();
  options.addArguments('--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--window-size=1280,800');

  global.driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
});

after(async () => {
  await global.driver.quit();
});
