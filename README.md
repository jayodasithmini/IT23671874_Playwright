# IT23671874_Playwright

**Playwright automation for Singlish to Sinhala transliteration testing**
Assignment 1 | IT3040 ITPM | Student ID: IT23671874

---

## Overview

This project contains **50 negative test cases** that cover **24 input types** for the
[Google Input Tools](https://www.google.com/inputtools/try/) Singlish → Sinhala
transliteration feature.

Negative test cases verify that the tool handles invalid or boundary inputs gracefully
and does **not** produce erroneous Sinhala output.

---

## 24 Input Types Covered

| # | Input Type | TCs |
|---|-----------|-----|
| 1 | Empty Input | TC01 – TC02 |
| 2 | Numeric – Integers | TC03 – TC05 |
| 3 | Numeric – Decimals / Floats | TC06 – TC07 |
| 4 | Numeric – Negative Numbers | TC08 – TC09 |
| 5 | Special Characters – Basic Punctuation | TC10 – TC11 |
| 6 | Special Characters – Extended Symbols | TC12 – TC13 |
| 7 | Whitespace – Spaces | TC14 – TC15 |
| 8 | Whitespace – Tabs | TC16 – TC17 |
| 9 | Whitespace – Newlines | TC18 – TC19 |
| 10 | HTML Tags | TC20 – TC21 |
| 11 | Script / XSS Injection | TC22 – TC23 |
| 12 | SQL Injection Strings | TC24 – TC25 |
| 13 | Emoji Characters | TC26 – TC27 |
| 14 | Chinese / CJK Characters | TC28 – TC29 |
| 15 | Arabic / RTL Characters | TC30 – TC31 |
| 16 | Japanese Characters | TC32 – TC33 |
| 17 | Sinhala Unicode Directly | TC34 – TC35 |
| 18 | Binary Strings | TC36 – TC37 |
| 19 | Hexadecimal Strings | TC38 – TC39 |
| 20 | URL-Encoded Strings | TC40 – TC41 |
| 21 | Control Characters | TC42 – TC43 |
| 22 | Mathematical Symbols | TC44 – TC45 |
| 23 | Repeated / Monotone Characters | TC46 – TC47 |
| 24 | Mixed Valid Singlish + Invalid Characters | TC48 – TC50 |

---

## Project Structure

```
IT23671874_Playwright/
├── tests/
│   └── negative-tests.spec.js   # 50 negative test cases
├── playwright.config.js          # Playwright configuration
├── package.json
└── README.md
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

---

## Setup

```bash
# 1. Clone the repository
git clone https://github.com/jayodasithmini/IT23671874_Playwright.git
cd IT23671874_Playwright

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install chromium
```

---

## Running Tests

```bash
# Run all 50 negative tests (headless)
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Open the HTML test report
npm run test:report
```

---

## Test Results

After running, Playwright generates:
- **Console output** – pass/fail for each test case
- **HTML Report** – in `playwright-report/` (open with `npm run test:report`)
- **Failure screenshots** – in `test-results/` (captured automatically on failure)

---

## Technologies

- [Playwright](https://playwright.dev/) v1.59+
- Node.js
- Chromium (headless)
