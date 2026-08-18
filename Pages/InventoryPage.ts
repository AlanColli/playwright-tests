import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly productsTitle: Locator;
  readonly addToCartButtons: (productName: string) => Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsTitle = page.locator('.title');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.addToCartButtons = (productName: string) => page.locator(`[data-test="add-to-cart-${productName}"]`);
  }

  async addProductToCart(productName: string) {
    await this.addToCartButtons(productName).click();
  }

    async goToCart() {
    await this.cartBadge.click();
  }
}
