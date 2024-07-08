import { Locator, type Page } from '@playwright/test';

export class ProductPage {
    constructor(private page: Page) {
        this.page = page;
    }

    // Product page elements
    addToCartButtonLocator: Locator = this.page.getByRole('button', { name: 'Dodaj do koszyka' });
    openCartButtonLocator: Locator = this.page.getByTestId('mini_basket_link');
    closeInsurancePopUpButton: Locator = this.page.getByRole('button', { name: 'Zamknij' });
    insurancePopUpOverlay: Locator = this.page.locator("//*[contains(@class, 'ReactModal__Overlay')]");

    async closeInsurancePopUp(): Promise<void> {
        await this.closeInsurancePopUpButton.click();
        await this.insurancePopUpOverlay.waitFor({ state: 'hidden' });
    }
}