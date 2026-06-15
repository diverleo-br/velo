import { test, expect } from '@playwright/test';
import { gerarCodigoPedido } from '../support/helpers';

///AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', ()=>{

 
  test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:5173');
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
    
    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    //checkpoint 2: verifica o texto Consultar Pedido na tela
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
  })
  
 
  const order = "VLO-290N33";

  console.log(order); // Exemplo: VLO-290N33

  test('deve consultar um pedido aprovado', async ({ page }) => {

    // teste data
    //const order = 'VLO-290N33' // numero do pedido
    //Arrange
    //criando um objeto
    const order = {
      number: 'VLO-290N33',
      status: 'APROVADO',
      color: 'Midnight Black',
      wheels: 'aero Wheels',
      custumer: {
        name: 'leo euzebio',
        email: 'diver@velo.dev.com',

    },
    payment: 'À Vista',
    }
   
    // Act
    //mudando o nome do input para order-id
    //await page.locator('input[name="order-id"]').fill('VLO-290N33');
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number);
    //await page.getByTestId('search-order-button').click();
    await page.getByRole('button', { name: 'Buscar Pedido' }).click();
  
    //Assert
    //await page.waitForTimeout(10000);//thead sleep ou cypress wait não é correto usar esse modo de esperar
 

    /* //estes são utilizando os IDs
    await expect(page.getByTestId('order-result-id')).toBeVisible({timeout: 10_000});
    await expect(page.getByTestId('order-result-id')).toContainText(order);
    await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
   */

    //teste de snapshot
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.custumer.name}
      - paragraph: Email
      - paragraph: ${order.custumer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

      //validação do status mais detalhado validando o background e o texto e o icon
      const statusBadge =page.getByRole('status').filter({hasText: order.status})

      await expect(statusBadge).toHaveClass(/bg-green-100/)
      await expect(statusBadge).toHaveClass(/text-green-700/)

      const statusIcon = statusBadge.locator('svg')
      await expect(statusIcon).toHaveClass(/lucide-circle-check-big/)

    //removendo os ids (order-result-id e order-result-status)
    //const orderCode = page.locator('//p[text()="Pedido"]~/..//p[text()="VLO-290N33"]')
    //await expect(orderCode).toBeVisible({timeout: 10_000})
  
    //melhor modo
    // const containerPedido = page.getByRole('paragraph')
    // .filter({hasText: /^Pedido$/})
    // .locator('..')  //sobe para o elemento pai (a div que agrupa ambos)
    // await expect(containerPedido).toContainText("VLO-290N33")
  
  });
  
  test ('deve exibir mensagem quando o pedido não for encontrado', async ({page})=>{
  
    const order = gerarCodigoPedido();
  
    //Arrange

  
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order);
    await page.getByRole('button', { name: 'Buscar Pedido' }).click();
  
    // await expect(page.locator('#root')).toContainText('Pedido não encontrado');
    // await expect(page.locator('#root')).toContainText('Verifique o número do pedido e tente novamente');
  
    const title = page.getByRole('heading', {name:'Pedido não encontrado'})
    await expect(title).toBeVisible()
  
    //const message = page.getByText('Verifique o número do pedido e tente novamente')
    // const message = page.locator('p', {hasText:'Verifique o número do pedido e tente novamente'})
    // await expect(message).toBeVisible()
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `);
  });
  test('deve consultar um pedido reprovado', async ({ page }) => {

    // teste data
    //const order = 'VLO-9GKXPY' // numero do pedido
    //Arrange
    const order = {
      number: 'VLO-9GKXPY',
      status: 'REPROVADO',
      color: 'Lunar White',
      wheels: 'sport Wheels',
      custumer: {
        name: 'Bruce Euzebio',
        email: 'bruce@iron.com.br',

    },
    payment: 'À Vista',
    }

    // Act
    //mudando o nome do input para order-id
    //await page.locator('input[name="order-id"]').fill('VLO-290N33');
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number);
    //await page.getByTestId('search-order-button').click();
    await page.getByRole('button', { name: 'Buscar Pedido' }).click();
  
    //Assert
    //await page.waitForTimeout(10000);//thead sleep ou cypress wait não é correto usar esse modo de esperar
 

    /* //estes são utilizando os IDs
    await expect(page.getByTestId('order-result-id')).toBeVisible({timeout: 10_000});
    await expect(page.getByTestId('order-result-id')).toContainText(order);
    await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
   */

    //teste de snapshot
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.custumer.name}
      - paragraph: Email
      - paragraph: ${order.custumer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);
      //validação do status mais detalhado validando o background e o texto e o icon
      const statusBadge =page.getByRole('status').filter({hasText: order.status})

      await expect(statusBadge).toHaveClass(/bg-red-100/)
      await expect(statusBadge).toHaveClass(/text-red-700/)

      const statusIcon = statusBadge.locator('svg')
      await expect(statusIcon).toHaveClass(/lucide-circle-x/)

  });  
  test('deve consultar um pedido em analise', async ({ page }) => {

    // teste data
    //const order = 'VLO-U0DM7F' // numero do pedido
    //Arrange
    const order = {
      number: 'VLO-U0DM7F',
      status: 'EM_ANALISE',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      custumer: {
        name: 'Maira Carolina',
        email: 'maira@velo.dev',

    },
    payment: 'À Vista',
    }

    // Act
    //mudando o nome do input para order-id
    //await page.locator('input[name="order-id"]').fill('VLO-290N33');
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number);
    //await page.getByTestId('search-order-button').click();
    await page.getByRole('button', { name: 'Buscar Pedido' }).click();
  
    //Assert
    //await page.waitForTimeout(10000);//thead sleep ou cypress wait não é correto usar esse modo de esperar
 

    /* //estes são utilizando os IDs
    await expect(page.getByTestId('order-result-id')).toBeVisible({timeout: 10_000});
    await expect(page.getByTestId('order-result-id')).toContainText(order);
    await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
   */

    //teste de snapshot
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.custumer.name}
      - paragraph: Email
      - paragraph: ${order.custumer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);
      //validação do status mais detalhado validando o background e o texto e o icon
      const statusBadge =page.getByRole('status').filter({hasText: order.status})

      await expect(statusBadge).toHaveClass(/bg-amber-100/)
      await expect(statusBadge).toHaveClass(/text-amber-700/)

      const statusIcon = statusBadge.locator('svg')
      await expect(statusIcon).toHaveClass(/lucide-clock/)

  });
})


