// tests/checkout-validacao.spec.ts
import { test, expect } from '../Fixtures/auth.fixture';
import { InventoryPage } from '../Pages/InventoryPage';
import { CartPage } from '../Pages/CartPage';
import { CheckoutPage } from '../Pages/CheckoutPage';

test('Impedir checkout sem preencher campos obrigatórios', async ({ loggedInPage }) => {
  const inventoryPage = new InventoryPage(loggedInPage);
  const cartPage = new CartPage(loggedInPage);
  const checkoutPage = new CheckoutPage(loggedInPage);

  // 1. Adiciona um produto e vai para o checkout
  await inventoryPage.addProductToCart('sauce-labs-backpack');
  await inventoryPage.goToCart();
  await cartPage.proceedToCheckout();

  // 2. Clica em "Continue" sem preencher os campos
  await checkoutPage.continueCheckout();

  // 3. Valida a mensagem de erro
  const errorMessage = loggedInPage.locator('[data-test="error"]');
  await expect(errorMessage).toHaveText('Error: First Name is required');
});