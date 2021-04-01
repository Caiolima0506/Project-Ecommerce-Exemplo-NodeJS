
const Pedido = require('../data/schema/pedido');

const { QueryTypes } = require('sequelize');

const sequelize = require('../../config/db');

const produtosData = {

    insert: async (pedidoValues) => {
        return  new Promise ((resolve,reject)=>{


            const resultoCreate =  Pedido.create({
                ClienteId : pedidoValues.ClienteId,
                FormaPagamento : pedidoValues.FormaPagamento,
                Data : pedidoValues.Data,
                Observacao : pedidoValues.Observacao
            }).then(  (x) => {
    
                resolve(x.PedidoId);
    
            });
        });
 
    },
    findAll: async () => {


       const resultFindAll = await sequelize.query(`SELECT p.*, q.*, pro.*, c.Nome as NomeCliente FROM Pedidos p
                                                    INNER JOIN Quantidades q on q.PedidoId = p.PedidoId
                                                    INNER JOIN Produtos pro on pro.ProdutoId = q.ProdutoId
                                                    LEFT JOIN Clientes c on c.ClienteId = p.ClienteId`, { type: QueryTypes.SELECT });
                                                    

       return resultFindAll;
    },
    findOne: async (id) => {


        const resultFindOne = await sequelize.query(`SELECT p.*, q.*, pro.*, c.Nome as NomeCliente FROM Pedidos p
                                                    INNER JOIN Quantidades q on q.PedidoId = p.PedidoId
                                                    INNER JOIN Produtos pro on pro.ProdutoId = q.ProdutoId
                                                    LEFT JOIN Clientes c on c.ClienteId = p.ClienteId
                                                    WHERE p.PedidoId = ${id}`, { type: QueryTypes.SELECT });


       return resultFindOne;

    },
    update: async (id, pedidoParam) => {

        const resultUpdate = await Pedido.update(pedidoParam, {
            where: { PedidoId: id }
          });

        return resultUpdate;
    },
    delete: async (id) =>{

        Pedido.destroy({ where: { PedidoId: id }});

      return;
    }
};

module.exports = produtosData;