# <img src="https://raw.githubusercontent.com/SeleniumHQ/seleniumhq.github.io/trunk/website_and_docs/static/images/selenium_logo_square_green.png" height="28" align="center" /> Selenium E2E Tests — manuelaklenke.com

End-to-end test suite for [manuelaklenke.com](https://manuelaklenke.com) using Selenium WebDriver and Mocha. Tests run automatically after every deployment and results are published as an Allure report to GitHub Pages.

---

## 📊 Test Report

Latest report: **[https://georget88.github.io/manuelaklenke-selenium-e2e/](https://georget88.github.io/manuelaklenke-selenium-e2e/)**

---

## 🛠️ Tech Stack

- [Selenium WebDriver](https://www.selenium.dev/) — browser automation
- [Mocha](https://mochajs.org/) — test runner
- [Chai](https://www.chaijs.com/) — assertions
- TypeScript + tsx
- [Allure](https://allurereport.org/) — test reporting (allure-mocha@3 + allure-js-commons@3 + allure-commandline@2)
- GitHub Actions — CI/CD pipeline
- GitHub Pages — Allure report hosting

---

## 📁 Project Structure

```
tests/
├── pages/
│   ├── BasePage.ts       # Base page object (navigate, accessibility helpers)
│   ├── NavBar.ts         # Navbar page object
│   ├── ContactPage.ts    # Contact form page object
│   └── step.ts           # Allure step() re-export shim
├── hooks.ts              # Mocha root hooks (WebDriver setup/teardown)
├── navigation.test.ts    # Navbar links, footer, 404 page
├── home.test.ts          # Home page load and content
├── about.test.ts         # About page load
├── portfolio.test.ts     # Portfolio page load
├── events.test.ts        # Events page load
├── contact.test.ts       # Contact form fields and validation
├── accessibility.test.ts # Skip-to-content link, image alt text, single h1
└── language.test.ts      # Language switcher (EN / DE / RO)
```

---

## ✅ Test Coverage

| File | Tests | What is covered |
|---|---|---|
| navigation.test.ts | 7 | Navbar, footer, all page links, 404 |
| accessibility.test.ts | 15 | Skip-to-content link, image alt text, single h1 on all 5 public pages |
| language.test.ts | 4 | Language switcher visibility and switching |
| contact.test.ts | 4 | Form fields, validation, submit behaviour |
| home.test.ts | 2 | Page load, main content area |
| about.test.ts | 1 | Page load |
| portfolio.test.ts | 1 | Page load |
| events.test.ts | 1 | Page load |
| **Total** | **35** | |

---

## 🚀 Running Tests Locally

**Install dependencies:**
```bash
npm install
```

**Run all tests:**
```bash
npm test
```

This generates raw Allure results in `allure-results/`.

**Generate and open the Allure report:**
```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

---

## ⚙️ CI/CD Pipeline

Tests are triggered automatically by [GeorgeT88/manuelaklenke-web](https://github.com/GeorgeT88/manuelaklenke-web) after every push to `main`, once the Vercel production deployment is confirmed live:

```
📦 Push to manuelaklenke-web
        ↓
🔨 Build passes
        ↓
⏳ Vercel deployment confirmed live
        ↓
⚡ repository_dispatch: vercel-deploy
        ↓
🔬 35 Selenium tests run against https://manuelaklenke.com
        ↓
📊 Allure report published to GitHub Pages
```

Tests can also be triggered manually from **Actions → Selenium E2E Tests → Run workflow**, and run on a nightly schedule at **07:00 UTC**.

---

## 🏷️ Run Name Convention

| Trigger | Run name |
|---|---|
| Push via app repo | `Selenium E2E Tests — triggered by Vercel deploy` |
| Manual | `Selenium E2E Tests — manual run` |
| Nightly schedule (07:00 UTC) | `Selenium E2E Tests — nightly run` |

---

## ⚠️ Known App Issues

The following issues exist in the app and are documented in the tests:

- `ipapi.co` CORS errors on all pages — caused by IP-based language detection on a free-tier API
