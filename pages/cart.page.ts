import { Locator, type Page } from '@playwright/test';

export class CartPage {
    constructor(private page: Page) {
        this.page = page;
    }

    // Cart page elements
    productNameLocator: Locator = this.page.getByTestId('hashLink').last();
    productPriceLocator: Locator = this.page.locator("[data-name='productPrice']").first();
    productCountLocator: Locator = this.page.getByTestId('input-wrapper').getByPlaceholder(' ');
    totalCartPriceLocator: Locator = this.page.locator('//*[@id="app"]/div[2]/div[1]/div[3]/div/div/div[2]/div[2]/div/div');
}