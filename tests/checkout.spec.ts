// tests/checkout.spec.ts
import { test, expect } from '../Fixtures/auth.fixture';
import { InventoryPage } from '../Pages/InventoryPage';
import { CartPage } from '../Pages/CartPage';
import { CheckoutPage } from '../Pages/CheckoutPage';
import { faker } from '@faker-js/faker'; // 👈 Dados dinâmicos

test.describe('Fluxo Completo de Compra', () => {

  test('Compra com 2 produtos e validação de preços', async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);
    const checkoutPage = new CheckoutPage(loggedInPage);

    // 1. Adiciona 2 produtos
    await inventoryPage.addProductToCart('sauce-labs-backpack');
    await inventoryPage.addProductToCart('sauce-labs-bolt-t-shirt');

    // 2. Valida o ícone do carrinho
    await expect(inventoryPage.cartBadge).toHaveText('2');

    // 3. Vai para o carrinho
    await inventoryPage.goToCart();

    // 4. Valida que os 2 produtos estão no carrinho
    await expect(cartPage.cartItem('Sauce Labs Backpack')).toBeVisible();
    await expect(cartPage.cartItem('Sauce Labs Bolt T-Shirt')).toBeVisible();

    // 5. Vai para o checkout
    await cartPage.proceedToCheckout();

    // 6. Preenche o formulário com dados dinâmicos (faker)
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const postalCode = faker.location.zipCode('#####');

    await checkoutPage.fillCheckoutForm(firstName, lastName, postalCode);
    await checkoutPage.continueCheckout();

    // 7. Valida a URL da página de resumo
    await expect(loggedInPage).toHaveURL(/checkout-step-two/);

    // 8. Finaliza a compra
    await checkoutPage.finishCheckout();

    // 9. Valida a mensagem de sucesso
    await expect(checkoutPage.successMessage).toBeVisible();
  });

});