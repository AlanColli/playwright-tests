//pages/LoginPage.ts
import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    //1. Declaracao dos localizadores (mapeamento de objetos)
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  


  constructor(page: Page) {
    //2. Construtor (Inicializa os elementos)
    this.page = page;

    //Mapeamento usando os melhores localizadores (getByRole, getByPlaceholder, etc
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.getByText('Epic sadface: Username and password do not match any user in this service');
  }

  //3. Acoes da pagina (metodos que os testes vao usar)

  // navega ate a pagina de login
  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  // realiza o login com usuario e senha
  
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // verifica se a mensagem de erro esta visivel
  async getErrorMessage() {
    return this.errorMessage;
  }
}
