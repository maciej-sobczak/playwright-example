import { Locator, type Page } from '@playwright/test';
import { RegistrationPage } from './registration.page';
import { userData } from '../test-data/test.data';
import { LoginPage } from './login.page';
import { SearchPage } from './search.page';

export class HomescreenPage {
    constructor(private page: Page) {
        this.page = page;
    }

    // Cookies pop-up elements
    settingsButtonLocator: Locator = this.page.getByRole('button', { name: 'Ustawienia' });
    confirmButtonLocator: Locator = this.page.getByRole('button', { name: 'W porządku' });
    cookiesOverlayLocator: Locator = this.page.locator("//*[contains(@class, 'ReactModal__Overlay')]");

    // Homescreen elements
    loginMenuButtonLocator: Locator = this.page.getByTestId('user_login_tab');
    loginButtonLocator: Locator = this.page.getByTestId('scroll-content').getByRole('link', { name: 'Zaloguj się' });
    logoutButtonLocator: Locator = this.page.getByTestId('scroll-content').getByRole('link', { name: 'Wyloguj się' });
    createAccountButtonLocator: Locator = this.page.getByRole('link', { name: 'Załóż konto' });
    searchInputLocator: Locator = this.page.getByPlaceholder('Czego szukasz?');
    searchButtonLocator: Locator = this.page.getByRole('banner').getByRole('button').last();

    // Messages
    correctLoginMessage: string = `Cześć, ${userData.firstName}`

    async closeCookiesPopUp(): Promise<void> {
        await this.confirmButtonLocator.click();
        await this.cookiesOverlayLocator.waitFor({ state: 'hidden' });
    }

    async goToRegistrationPage(): Promise<void> {
        const registration = new RegistrationPage(this.page);

        await this.loginMenuButtonLocator.hover();
        await this.createAccountButtonLocator.click();
        await registration.registrationMenuHeaderLocator.waitFor({ state: 'visible' });
    }

    async goToLoginPage(): Promise<void> {
        const login = new LoginPage(this.page);

        await this.loginMenuButtonLocator.hover();
        await this.loginButtonLocator.click();
        await login.loginMenuHeaderLocator.waitFor({ state: 'visible' });
    }

    async performLogout(): Promise<void> {
        await this.loginMenuButtonLocator.hover();
        await this.logoutButtonLocator.click();
    }

    async searchForItem(searchedItem: string): Promise<void> {
        const search = new SearchPage(this.page);

        await this.searchInputLocator.fill(searchedItem);
        await this.searchButtonLocator.click();
        await (await search.getSearchHeaderLocator(searchedItem)).waitFor({ state: 'visible' });
    }
}