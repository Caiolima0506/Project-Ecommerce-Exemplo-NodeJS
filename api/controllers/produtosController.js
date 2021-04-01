const produtosData = require('../data/produtosData');

const produtos = {
  get : async (req, res, next) =>{

    let result = await produtosData.findAll();

    if(result.length > 0){
      res.status(200).json({Success : true, Data : result, Message: "Dados Carregados com Sucesso"});
    }else{
      res.status(404).json({Success : true, Data : result, Message: "Não existem dados a serem carregados"});
    }

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

    res.status(204).send({Success : true, Data : [], Message: "Produto deletado com sucesso!"});

  },
  getById : async (req, res, next) => {

    let id = req.params.id;

    let result = await produtosData.findOne(id);

    if(result){
      res.status(200).json({Success : true, Data : result, Message: "Produto carregado com sucesso!"});
    }else{
      res.status(404).json({Success : true, Data : result, Message: `Produto ${id} não encontrado!`});
    }

  },
  post : async (req, res, next) => {

    let produtoToInsert = {
      Nome: req.body.Nome,
      Cor: req.body.Cor,
      Tamanho: req.body.Tamanho,
      Valor:req.body.Valor
    }

    let result = await produtosData.insert(produtoToInsert);

    res.status(201).send(JSON.stringify({Success : true, Data : result, Message:""}));

  }
};

module.exports = produtos;