import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/specs', // Point directly to your specs folder
  timeout: 30 * 1000,
  retries: 1,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
  use: {
    baseURL: 'https://www.nursingcenter.com/', // Match your test file's BASE_URL
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retry-with-video'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});