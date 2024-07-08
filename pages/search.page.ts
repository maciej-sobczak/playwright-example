import { Locator, type Page } from '@playwright/test';

export class SearchPage {
    constructor(private page: Page) {
        this.page = page;
    }

    // Search filters elements
    expandManufacturersButtonLocator: Locator = this.page.getByRole('button', { name: '+ Więcej' });
    lowerPriceRangeInputLocator: Locator = this.page.getByPlaceholder('od');
    upperPriceRangeInputLocator: Locator = this.page.getByPlaceholder('do');

    // Search results elements
    allProductsContainerLocators: Locator = this.page.locator('//*[@id="listing-container"]/div');
    allProductsPriceLocators: Locator = this.page.getByTestId('price-wrapper');

    async getSearchHeaderLocator(searchedItem: string): Promise<Locator> {
        return this.page.getByRole('heading', { name: `„ ${searchedItem} ”` });
    }

    async getManufacturerCheckboxLocator(manufacturer: string): Promise<Locator> {
        return this.page.locator('label').filter({ hasText: `${manufacturer}` });
    }

    async getProductButtonLocator(manufacturer: string, productType: string, itemNumber: number): Promise<Locator> {
        return this.page.getByRole('link', { name: `${productType} ${manufacturer}` }).nth(itemNumber);
    }

    async getProductDescriptionLocator(itemNumber: number): Promise<Locator> {
        return this.page.locator(`//*[@id="listing-container"]/div[${itemNumber}]/div/div[2]/div[2]/div`);
    }

    async selectManufacturer(manufacturer: string): Promise<void> {
        await this.expandManufacturersButtonLocator.click();
        await (await this.getManufacturerCheckboxLocator(manufacturer)).click();
    }

    async selectPriceRange(lowerPriceRange: string, upperPriceRange: string): Promise<void> {
        await this.lowerPriceRangeInputLocator.fill(lowerPriceRange);
        await this.upperPriceRangeInputLocator.fill(upperPriceRange);
    }
}