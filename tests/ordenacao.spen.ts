// tests/ordenacao.spec.ts
import { test, expect } from '../Fixtures/auth.fixture';
import { InventoryPage } from '../Pages/InventoryPage';

test('Ordenar produtos por preço (menor para maior)', async ({ loggedInPage }) => {
  const inventoryPage = new InventoryPage(loggedInPage);

  // 1. Seleciona a opção de ordenação por preço (menor para maior)
  await loggedInPage.locator('[data-test="product-sort-container"]').selectOption('lohi');

  // 2. Pega todos os preços da lista
  const prices = await loggedInPage.locator('.inventory_item_price').allTextContents();

  // 3. Converte os preços (ex: "$29.99" → 29.99) e verifica se estão em ordem crescente
  const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
  const sortedPrices = [...numericPrices].sort((a, b) => a - b);

  expect(numericPrices).toEqual(sortedPrices);
});