import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly cartItem: (productName: string) => Locator;

  constructor(page: Page) {
    this.page = page;
   
//1. botao checkout
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });

//2. itens do carrinho (dinâmico)
    this.cartItem = (productName: string) => page.locator('.cart_item', { hasText: productName });
    }

//3. Acao ir para o checkout
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

//4. Acao verificar se o item esta no carrinho
  async isProductInCart(productName: string): Promise<boolean> {
    return await this.cartItem(productName).isVisible();
  }
}