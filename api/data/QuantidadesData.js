
const Quantidades = require('../data/schema/quantidades');

const produtosData = {

    insert: async (produtos, pedidoId) => {

        var produtosList = [];

        for (let index = 0; index < produtos.length; index++) {
            const produto = produtos[index];


            produto.PedidoId = pedidoId;

           let insertQuantidades = await Quantidades.create(produto);

           produtosList.push(insertQuantidades);

        }
        
        return produtosList;
   
    },
    findAll: async () => {

       const resultFindAll = await Quantidades.findAll();

       return resultFindAll;
    },
    findOne: async (id) => {

       const resultFindOne = await Quantidades.findByPk(id);

       return resultFindOne;

    },
    update: async (id, produtoParam) => {

        const resultUpdate = await Quantidades.update(produtoParam, {
            where: { ProdutoId: id }
          });

        return resultUpdate;
    },
    delete: async (id) =>{

        Quantidades.destroy({ where: { ProdutoId: id }});

      return;
    }
};


module.exports = produtosData;