const pedidosController = require('../api/controllers/pedidosController');

describe('Teste do  Controller de pedidos', () => {

    it('devemos Agrupar os produtos nos pedido', async () => {

        expect( await pedidosController.agruparProdutos())
        
    });
    
});