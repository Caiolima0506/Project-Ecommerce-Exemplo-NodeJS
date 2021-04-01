const PedidosController = require('../controllers/pedidosController');

module.exports = (app) => {
   app.post('/pedidos', PedidosController.post);
   app.put('/pedidos/:id', PedidosController.put);
   app.delete('/pedidos/:id', PedidosController.delete);
   app.get('/pedidos', PedidosController.get);
   app.get('/pedidos/:id', PedidosController.getById);
   app.post('/pedidos/:id/report', PedidosController.report);
   app.post('/pedidos/:id/sendmail', PedidosController.sendmail);


}