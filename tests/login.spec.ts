import { test, expect } from '../Fixtures/auth.fixture';
import { LoginPage } from '../Pages/LoginPage';

test.describe('Testes de Login - SauceDemo', () => {

  test('Login com sucesso usando fixture', async ({ loggedInPage }) => {
    await expect(loggedInPage).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(loggedInPage.getByText('Products')).toBeVisible();
  });

  test('Login com senha incorreta', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('standard_user', 'senha_errada');
    
    //AGORA USA O LOCALIZADOR DIRETAMENTE
    await expect(loginPage.errorMessage).toBeVisible();
  });

});