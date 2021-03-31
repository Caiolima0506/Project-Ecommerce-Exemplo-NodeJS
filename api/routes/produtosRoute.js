const ProdutosController = require('../controllers/produtosController');

module.exports = (app) => {
   app.post('/produtos', ProdutosController.post);
   app.put('/produtos/:id', ProdutosController.put);
   app.delete('/produtos/:id', ProdutosController.delete);
   app.get('/produtos', ProdutosController.get);
   app.get('/produtos/:id', ProdutosController.getById);
}