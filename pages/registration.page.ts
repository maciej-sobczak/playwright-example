import { Locator, type Page } from '@playwright/test';

export class RegistrationPage {
    constructor(private page: Page) {
        this.page = page;
    }

    // Registration menu elements
    registrationMenuHeaderLocator: Locator = this.page.getByRole('heading', { name: 'Załóż konto w 20 sekund' });
    firstNameInputLocator: Locator = this.page.getByTestId('firstName-input-wrapper').getByPlaceholder(' ');
    lastNameInputLocator: Locator = this.page.getByTestId('lastName-input-wrapper').getByPlaceholder(' ');
    emailInputLocator: Locator = this.page.getByTestId('email-input-wrapper').getByPlaceholder(' ');
    passwordInputLocator: Locator = this.page.getByTestId('password-input-wrapper').getByPlaceholder(' ');
    acceptRulesCheckboxLocator: Locator = this.page.getByRole('checkbox').nth(1);
    createAccountButtonLocator: Locator = this.page.getByRole('button', { name: 'Załóż konto' });

    // Registration menu error elements
    noFirstNameErrorLocator: Locator = this.page.getByTestId('firstName-input-wrapper').locator('div').nth(1);
    noLastNameErrorLocator: Locator = this.page.getByTestId('lastName-input-wrapper').locator('div').nth(1)
    noEmailErrorLocator: Locator = this.page.getByTestId('email-input-wrapper').locator('div').nth(1);
    noPasswordErrorLocator: Locator = this.page.getByTestId('password-input-wrapper').locator('div').nth(2);

    // Registration menu error messages
    noFirstNameErrorMessage: string = 'Pole jest wymagane. Uzupełnij dane.';
    noLastNameErrorMessage: string = 'Pole jest wymagane. Uzupełnij dane.';
    noEmailErrorMessage: string = 'Wpisz adres e-mail.';
    noPasswordErrorMessage: string = 'Wpisz hasło. Powinno składać się minimum z 8 znaków.';
    shortPasswordErrorMessage: string = 'Hasło powinno mieć minimum 8 znaków';

    async inputRegistrationData(testDataMapping: Map<Locator, string>, acceptRules?: boolean): Promise<void> {
        for (let [locator, testData] of testDataMapping) {
            await locator.fill(testData);
        };

        if (acceptRules) {
            await this.acceptRulesCheckboxLocator.click();
        };
    }
}