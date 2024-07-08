import { test, expect, Locator } from '@playwright/test';
import { HomescreenPage } from '../pages/homescreen.page';
import { itemData } from '../test-data/test.data';
import { SearchPage } from '../pages/search.page';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test('tc_01 verify product search', async ({ page }) => {
    const homescreen = new HomescreenPage(page);
    const search = new SearchPage(page);

    // Close cookies pop-up
    await homescreen.closeCookiesPopUp();

    // Perform item search
    await homescreen.searchForItem(itemData.category);
    await search.selectManufacturer(itemData.manufacturer);
    await search.selectPriceRange(itemData.lowerPriceRange, itemData.upperPriceRange);

    // Verify if expected number of items have been displayed
    await expect(search.allProductsContainerLocators).toHaveCount(itemData.expectedItemCount);

    // Verify if search filters have been applied correctly
    await verifyProductDescription(search);
    await verifyProductPrice(search);
});

async function verifyProductDescription(search: SearchPage) {
    for (let index = 0; index < itemData.expectedItemCount; index++) {
        let itemLocator: Locator = await search.getProductDescriptionLocator(index + 1);
        await expect(itemLocator).toContainText(itemData.manufacturer);
    }
}

async function verifyProductPrice(search: SearchPage) {
    for (const locator of await search.allProductsPriceLocators.all()) {
        const price = await locator.evaluate((node) => node.textContent);
        expect(
            await evaluatePrice(price!, itemData.lowerPriceRange, itemData.upperPriceRange), 
            'Price does not match the selected range'
        ).toBe(true);
    }
}

async function evaluatePrice(price: string, lowerPriceRange: string, upperPriceRange: string) {
    const priceNumber: number = Number(
        price.slice(0, price.length - 3).replace(',', '.')
    );
    const lowerPriceRangeNumber: number = Number(lowerPriceRange);
    const upperPriceRangeNumber: number = Number(upperPriceRange);

    return (priceNumber >= lowerPriceRangeNumber && priceNumber <= upperPriceRangeNumber);
}