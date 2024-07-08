import { Locator, type Page } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {
        this.page = page;
    }

    // Login menu elements
    loginMenuHeaderLocator: Locator = this.page.getByRole('heading', { name: 'Zaloguj się' });
    emailInputLocator: Locator = this.page.getByTestId('login-input-wrapper').getByPlaceholder(' ');
    passwordInputLocator: Locator = this.page.getByTestId('password-input-wrapper').getByPlaceholder(' ');
    loginButtonLocator: Locator = this.page.getByRole('button', { name: 'Zaloguj się' })


    async inputLoginData(email: string, password: string): Promise<void> {
        await this.emailInputLocator.fill(email);
        await this.passwordInputLocator.fill(password);
    }

    async performLogin(email:string, password: string): Promise<void> {
        await this.inputLoginData(email, password);
        await this.loginButtonLocator.click();
    }
}