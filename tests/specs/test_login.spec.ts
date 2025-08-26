import { test, expect } from '@playwright/test';
// Minimal demo spec — replace with your real app URL
const BASE_URL ='https://www.nursingcenter.com/';
test.describe('Smoke: Login', () => {
test('login page loads', async ({ page }) => {
await page.goto(BASE_URL);
await expect(page).toHaveTitle("Lippincott NursingCenter | Professional Development for Nurses");
});
});