import { test, expect, Locator } from '@playwright/test';
import { HomescreenPage } from '../pages/homescreen.page';
import { RegistrationPage } from '../pages/registration.page';
import { userData } from '../test-data/test.data';
import { LoginPage } from '../pages/login.page';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test('tc_01 verify account creation - missing first name', async ({ page }) => {
    const homescreen = new HomescreenPage(page);
    const registration = new RegistrationPage(page);

    const registrationDataMapping = new Map<Locator, string>([
        [registration.lastNameInputLocator, userData.lastName],
        [registration.emailInputLocator, userData.email],
        [registration.passwordInputLocator, userData.password]
    ]);

    // Close cookies pop-up
    await homescreen.closeCookiesPopUp();

    // Navigate to registration page
    await homescreen.goToRegistrationPage();

    // Verify if user is not able to create account without inputting first name
    await registration.inputRegistrationData(registrationDataMapping, true);
    await registration.createAccountButtonLocator.click();

    await expect(registration.noFirstNameErrorLocator).toHaveText(registration.noFirstNameErrorMessage);
});

test('tc_02 verify account creation - missing last name', async ({ page }) => {
    const homescreen = new HomescreenPage(page);
    const registration = new RegistrationPage(page);

    const registrationDataMapping = new Map<Locator, string>([
        [registration.firstNameInputLocator, userData.firstName],
        [registration.emailInputLocator, userData.email],
        [registration.passwordInputLocator, userData.password]
    ]);

    // Close cookies pop-up
    await homescreen.closeCookiesPopUp();

    // Navigate to registration page
    await homescreen.goToRegistrationPage();

    // Verify if user is not able to create account without inputting last name
    await registration.inputRegistrationData(registrationDataMapping, true);
    await registration.createAccountButtonLocator.click();

    await expect(registration.noLastNameErrorLocator).toHaveText(registration.noLastNameErrorMessage);
});

test('tc_03 verify account creation - missing email', async ({ page }) => {
    const homescreen = new HomescreenPage(page);
    const registration = new RegistrationPage(page);

    const registrationDataMapping = new Map<Locator, string>([
        [registration.firstNameInputLocator, userData.firstName],
        [registration.lastNameInputLocator, userData.lastName],
        [registration.passwordInputLocator, userData.password]
    ]);

    // Close cookies pop-up
    await homescreen.closeCookiesPopUp();

    // Navigate to registration page
    await homescreen.goToRegistrationPage();

    // Verify if user is not able to create account without inputting email
    await registration.inputRegistrationData(registrationDataMapping, true);
    await registration.createAccountButtonLocator.click();

    await expect(registration.noEmailErrorLocator).toHaveText(registration.noEmailErrorMessage);
});

test('tc_04 verify account creation - missing password', async ({ page }) => {
    const homescreen = new HomescreenPage(page);
    const registration = new RegistrationPage(page);

    const registrationDataMapping = new Map<Locator, string>([
        [registration.firstNameInputLocator, userData.firstName],
        [registration.lastNameInputLocator, userData.lastName],
        [registration.emailInputLocator, userData.email]
    ]);

    // Close cookies pop-up
    await homescreen.closeCookiesPopUp();

    // Navigate to registration page
    await homescreen.goToRegistrationPage();

    // Verify if user is not able to create account without inputting password
    await registration.inputRegistrationData(registrationDataMapping, true);
    await registration.createAccountButtonLocator.click();

    await expect(registration.noPasswordErrorLocator).toHaveText(registration.noPasswordErrorMessage);
});

test('tc_05 verify account creation - password too short', async ({ page }) => {
    const homescreen = new HomescreenPage(page);
    const registration = new RegistrationPage(page);

    const registrationDataMapping = new Map<Locator, string>([
        [registration.firstNameInputLocator, userData.firstName],
        [registration.lastNameInputLocator, userData.lastName],
        [registration.emailInputLocator, userData.email],
        [registration.passwordInputLocator, userData.shortPassword]
    ]);

    // Close cookies pop-up
    await homescreen.closeCookiesPopUp();

    // Navigate to registration page
    await homescreen.goToRegistrationPage();

    // Verify if user is not able to create account without inputting too short password
    await registration.inputRegistrationData(registrationDataMapping, true);
    await registration.createAccountButtonLocator.click();

    await expect(registration.noPasswordErrorLocator).toHaveText(registration.shortPasswordErrorMessage);
});


test('tc_06 verify account creation', async ({ page }) => {
    const homescreen = new HomescreenPage(page);
    const registration = new RegistrationPage(page);
    const login = new LoginPage(page);

    const registrationDataMapping = new Map<Locator, string>([
        [registration.firstNameInputLocator, userData.firstName],
        [registration.lastNameInputLocator, userData.lastName],
        [registration.emailInputLocator, userData.email],
        [registration.passwordInputLocator, userData.password]
    ]);

    // Close cookies pop-up
    await homescreen.closeCookiesPopUp();

    // Navigate to registration page
    await homescreen.goToRegistrationPage();

    // Verify if user is able to create account
    await registration.inputRegistrationData(registrationDataMapping, true);
    await registration.createAccountButtonLocator.click();

    await expect(homescreen.searchInputLocator).toBeVisible();
    await expect(homescreen.loginMenuButtonLocator).toHaveText(homescreen.correctLoginMessage);

    // Log out
    await homescreen.performLogout();
    
    // Verify, if user can log in with account that was just created
    await homescreen.goToLoginPage();
    await login.performLogin(userData.email, userData.password);
    
    await expect(homescreen.loginMenuButtonLocator).toHaveText(homescreen.correctLoginMessage);
});
