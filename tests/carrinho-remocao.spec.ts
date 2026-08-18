// tests/carrinho-remocao.spec.ts
import { test, expect } from '../Fixtures/auth.fixture';
import { InventoryPage } from '../Pages/InventoryPage';
import { CartPage } from '../Pages/CartPage';

test('Remover produto do carrinho e validar ícone', async ({ loggedInPage }) => {
  const inventoryPage = new InventoryPage(loggedInPage);
  const cartPage = new CartPage(loggedInPage);

  // 1. Adiciona um produto
  await inventoryPage.addProductToCart('sauce-labs-backpack');
  await expect(inventoryPage.cartBadge).toHaveText('1');

  // 2. Vai para o carrinho
  await inventoryPage.goToCart();

  // 3. Remove o produto
  await loggedInPage.locator('[data-test="remove-sauce-labs-backpack"]').click();

  // 4. Valida que o produto sumiu
  await expect(cartPage.cartItem('Sauce Labs Backpack')).not.toBeVisible();

  // 5. Volta para a página de produtos
  await loggedInPage.goto('https://www.saucedemo.com/inventory.html');

  // 6. Valida que o ícone do carrinho sumiu (ou está vazio)
  await expect(inventoryPage.cartBadge).not.toBeVisible();
});