const ClientesController = require('../controllers/clientesController');

module.exports = (app) => {
   app.post('/clientes', ClientesController.post);
   app.put('/clientes/:id', ClientesController.put);
   app.delete('/clientes/:id', ClientesController.delete);
   app.get('/clientes', ClientesController.get);
   app.get('/clientes/:id', ClientesController.getById);
}