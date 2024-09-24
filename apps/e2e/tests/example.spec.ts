import { test, expect } from '@playwright/test';

test.describe('Product Search and Details Navigation', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the search page before each test
    await page.goto('http://localhost:4173/');
  });

  test('apply collection filter and sort products', async ({ page }) => {
    // Ensure the search page loads
    await expect(page).toHaveTitle(/Store/);
    await expect(page.getByText('Store')).toBeVisible();
    await expect(page.getByText('Collections')).toBeVisible();
    
    // Apply collection filter (for example: 'Electronics' collection)
    await page.getByRole('button', { name: 'Electronics' }).click();

    // Wait for the filtered results to load (assuming 'Filtered Results' appears)
    await expect(page.getByText('Filtered Results')).toBeVisible();

    // Apply sorting (Pricing Lowest to Highest)
    await page.getByRole('button', { name: 'Pricing (Lowest to Highest)' }).click();

    // Wait for the sorted products to load (Optional: check sorting via price texts)
    const prices = await page.$$eval('.product-price', prices => prices.map(el => el.textContent));
    expect(prices).toEqual(prices.sort()); // Ensures the products are sorted by price (lowest to highest)
  });

  test('click on a product and navigate to its details page', async ({ page }) => {
    // Assuming the products are listed after filters or sorting

    // Click on the first product card (Assuming the card has the product name)
    await page.locator('.card').first().click(); // Replace 'Product 1' with actual product name

    // Ensure the product details page URL changes
    await expect(page).toHaveURL(/.*\/about\/product1/); // Replace 'product1' with actual product ID

    // Verify that the product details page shows the correct product information
    await expect(page.getByRole('heading', { name: 'Product 1 Details' })).toBeVisible();
    await expect(page.getByText('VARIANTS')).toBeVisible(); // Replace with actual product price
    await expect(page.getByText('Description')).toBeVisible();
  });
});
