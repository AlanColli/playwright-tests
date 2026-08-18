// fixtures/auth.fixture.ts
import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';

// 1. DECLARA O TIPO DA FIXTURE
type MyFixtures = {
  loggedInPage: Page;
};

// 2. CRIA O TEST COM O TIPO DECLARADO
export const test = base.extend<MyFixtures>({
  loggedInPage: async ({ page }: { page: Page }, use) => {
    // ADICIONEI O TIPO AQUI
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await use(page);
  }
});

// 3. EXPORTA O EXPECT
export { expect } from '@playwright/test';
