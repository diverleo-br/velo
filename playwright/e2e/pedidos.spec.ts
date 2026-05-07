import { test, expect } from '@playwright/test';

///AAA - Arrange, Act, Assert

test('deve consultar um pedido aprovado', async ({ page }) => {
  //Arrange
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();

  //checkpoint 2: verifica o texto Consultar Pedido na tela
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  // Act
  await page.getByTestId('search-order-id').fill('VLO-290N33');
  await page.getByTestId('search-order-button').click();

  //Assert
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-290N33');
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');

});