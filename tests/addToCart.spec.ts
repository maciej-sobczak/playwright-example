import { test, expect, Locator } from '@playwright/test';
import { HomescreenPage } from '../pages/homescreen.page';
import { itemData } from '../test-data/test.data';
import { SearchPage } from '../pages/search.page';
import { ProductPage } from '../pages/product.page';
import { CartPage } from '../pages/cart.page';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test('tc_01 add product to cart', async ({ page }) => {
    const homescreen = new HomescreenPage(page);
    const search = new SearchPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);

    const addedItemCount: string = '1';

    // Close cookies pop-up
    await homescreen.closeCookiesPopUp();

    // Perform item search
    await homescreen.searchForItem(itemData.category);
    await search.selectManufacturer(itemData.manufacturer);
    await search.selectPriceRange(itemData.lowerPriceRange, itemData.upperPriceRange);

    // Verify if expected number of items have been displayed
    await expect(search.allProductsContainerLocators).toHaveCount(itemData.expectedItemCount);

    // Open selected item's detail page
    await (await search.getProductButtonLocator(itemData.manufacturer, itemData.productType, 0)).click()

    // Add product to the cart
    await product.addToCartButtonLocator.click();
    await product.closeInsurancePopUp();

    // Navigate to the cart and verify the correct product has been added
    await product.openCartButtonLocator.click();

    await expect(cart.productNameLocator).toHaveText(itemData.fullProductName);
    await expect(cart.productPriceLocator).toHaveText(itemData.productPrice);
    await expect(cart.productCountLocator).toHaveValue(addedItemCount);
    await expect(cart.totalCartPriceLocator).toHaveText(itemData.productPrice);
});