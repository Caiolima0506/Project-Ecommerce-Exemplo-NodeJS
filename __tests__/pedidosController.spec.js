const pedidosController = require('../api/controllers/pedidosController');
const util = require('../api/controllers/utilController');
describe('Teste do  Controller de pedidos', () => {

    it('devemos Agrupar os produtos nos pedido', async () => {

        let env = [{
            PedidoId: 5523,
            Data: '2021-04-01T01:36:00.000Z',
            Observacao: 'teste observação',
            FormaPagamento: 'Dinheiro',
            ClienteId: 4,
            QuantidadeId: 1,
            Quantidade: 5,
            ProdutoId: 1,
            Nome: 'Arroz',
            Cor: 'Branco',
            Tamanho: '25x10',
            Valor: '15',
            NomeCliente: 'João da silva'
          }];

          exp = [
              {
                PedidoId: 5523,
                Data: "2021-04-01T01:36:00.000Z",
                Observacao: "teste observação",
                FormaPagamento: "Dinheiro",
                Cliente: "João da silva",
                Produtos: [
                    {
                        ProdutoId: 1,
                        Nome: "Arroz",
                        Cor: "Branco",
                        Tamanho: "25x10",
                        Quantidade: 5,
                        Valor: "15"
                    }
                ]
            }
        ];

         let result = await pedidosController.agruparProdutos(env);

        expect(exp).toEqual(result);
        
    });

    it('Devemos testar se email é valido ', () => {

        let result = util.IsEmail("teste@teste.com");

        expect(result).toEqual(true)
        
    });

    it('Devemos testar se email é Inválido ', () => {

        let result = util.IsEmail("teste.com");

        expect(result).toEqual(false)
        
    });
    
});