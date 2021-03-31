const ClientesRoute = require('./clientesRoute');
const ProdutosRoute = require('./produtosRoute');
const PedidosRoute = require('./pedidosRoute');

module.exports = (app) => {
    ClientesRoute(app);
    ProdutosRoute(app);
    PedidosRoute(app);

}