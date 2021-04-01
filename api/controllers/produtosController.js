const produtosData = require('../data/produtosData');

const produtos = {
  get : async (req, res, next) =>{

    let result = await produtosData.findAll();
    res.status(200).json({Success : true, Data : result, Message: ""});

  },
  put : async (req, res, next) => {

    let id = req.params.id;
 
    let produtoToUpdate = {
      Nome: req.body.Nome,
      Cor: req.body.Cor,
      Tamanho: req.body.Tamanho,
      Valor:req.body.Valor
    }

    let result = await produtosData.update(id, produtoToUpdate);

    res.status(200).send(JSON.stringify({Success : true, Data : result, Message:""}));

  },
  delete : async (req, res, next) => {

    let id = req.params.id;

    let result = await produtosData.delete(id);

    res.status(200).send({Success : true, Data : [], Message: "Produto deletado com sucesso!"});

  },
  getById : async (req, res, next) => {

    let id = req.params.id;

    let result = await produtosData.findOne(id);

    res.status(200).json({Success : true, Data : result, Message: ""});

  },
  post : async (req, res, next) => {

    let produtoToInsert = {
      Nome: req.body.Nome,
      Cor: req.body.Cor,
      Tamanho: req.body.Tamanho,
      Valor:req.body.Valor
    }

    let result = await produtosData.insert(produtoToInsert);

    res.status(200).send(JSON.stringify({Success : true, Data : result, Message:""}));

  }
};

module.exports = produtos;