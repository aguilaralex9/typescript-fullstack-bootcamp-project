import { test, expect } from '@playwright/test';

test.describe('Product Search and Navigation to Details Page', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('http://localhost:4173/');
  });

  test('apply collection filter and sort products', async ({ page }) => {

    await expect(page).toHaveTitle(/Store/);
    await expect(page.getByText('Store')).toBeVisible();
    await expect(page.getByText('Collections')).toBeVisible();
    await expect(page.getByText('Sort by')).toBeVisible();
    
    await page.getByRole('button', { name: 'Grocery' }).click();

    await page.getByRole('button', { name: 'Pricing (Lowest to Highest)' }).click({ force: true });

  });

  test('click on a product and navigate to its details page', async ({ page }) => {

    await page.locator('.card').first().click(); 

    await expect(page).toHaveURL(/.*\/about\/26/); 

    await expect(page.getByRole('heading', { name: 'Recycled Steel Table' })).toBeVisible();
    await expect(page.getByText('$47.77')).toBeVisible();
    await expect(page.getByText('VARIANTS')).toBeVisible();
  });
});
