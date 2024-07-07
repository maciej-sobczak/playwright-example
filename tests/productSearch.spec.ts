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

    // Verify if search filters have been applied correctly
    await verifyProductDescription(search);

});

async function verifyProductDescription(search: SearchPage) {
    for (let index = 0; index < itemData.expectedItemCount; index++) {
        let itemLocator: Locator = await search.getProductDescriptionLocator(index + 1);
        await expect(itemLocator).toContainText(itemData.manufacturer);
    }
}