// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright configuration for Singlish to Sinhala transliteration negative test suite.
 * Assignment 1 – IT3040 ITPM | Student ID: IT23671874
 */
module.exports = defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',

  /* Maximum time one test can run (ms) */
  timeout: 30000,

  /* Maximum time the expect() assertion can wait */
  expect: {
    timeout: 5000,
  },

  /* Run tests in files in parallel */
  fullyParallel: false,

  /* Fail the build on CI if test.only is accidentally left in source code */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,

  /* Number of workers (sequential for deterministic ordering) */
  workers: 1,

  /* Reporter */
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],

  use: {
    /* Base URL for all tests */
    baseURL: 'https://www.google.com/inputtools/try/',

    /* Collect trace on first retry */
    trace: 'on-first-retry',

    /* Screenshot on failure */
    screenshot: 'only-on-failure',

    /* Video on failure */
    video: 'retain-on-failure',

    /* Browser headless mode */
    headless: true,

    /* Default navigation timeout */
    navigationTimeout: 30000,

    /* Default action timeout */
    actionTimeout: 10000,

    /* Viewport */
    viewport: { width: 1280, height: 720 },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Output folder for test artifacts */
  outputDir: 'test-results/',
});
