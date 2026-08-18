// tests/carrinho.spec.ts
import { test, expect } from '../Fixtures/auth.fixture';  
import { InventoryPage } from '../Pages/InventoryPage';
import { CartPage } from '../Pages/CartPage';

test.describe('Testes de Carrinho de Compras', () => {

  test('Adicionar produto ao carrinho e validar', async ({ loggedInPage }) => {
    // 1. Instancia os Page Objects usando a página já logada
    const inventoryPage = new InventoryPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);

    // 2. Adiciona um produto ao carrinho
    await inventoryPage.addProductToCart('sauce-labs-backpack');

    // 3. Verifica se o ícone do carrinho atualizou para "1"
    await expect(inventoryPage.cartBadge).toHaveText('1');

    // 4. Vai para a página do carrinho
    await inventoryPage.goToCart();

    // 5. Verifica se o produto está na lista do carrinho
    await expect(cartPage.cartItem('Sauce Labs Backpack')).toBeVisible();

    // 6. Clica em "Checkout"
    await cartPage.proceedToCheckout();

    // 7. Verifica se a URL mudou para a página de checkout
    await expect(loggedInPage).toHaveURL(/checkout-step-one/);
  });

});