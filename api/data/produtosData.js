
const Produtos = require('../data/schema/produto');

const produtosData = {

    insert: async (produtoValues) => {
        
        const resultoCreate = await Produtos.create({
            Nome: produtoValues.Nome,
            Cor: produtoValues.Cor,
            Tamanho: produtoValues.Tamanho,
            Valor: produtoValues.Valor
        });


        return resultoCreate;
   
    },
    findAll: async () => {

       const resultFindAll = await Produtos.findAll();

       return resultFindAll;
    },
    findOne: async (id) => {

       const resultFindOne = await Produtos.findByPk(id);

       return resultFindOne;

    },
    update: async (id, produtoParam) => {

        const resultUpdate = await Produtos.update(produtoParam, {
            where: { ProdutoId: id }
          });

        return resultUpdate;
    },
    delete: async (id) =>{

        Produtos.destroy({ where: { ProdutoId: id }});

      return;
    }
};


module.exports = produtosData;