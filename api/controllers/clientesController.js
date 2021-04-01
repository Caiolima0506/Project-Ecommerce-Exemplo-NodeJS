const clientesData = require('../data/clientesData');

const clientes = {
  get : async (req, res, next) =>{

    let result = await clientesData.findAll();
    res.status(200).json({Success : true, Data : result, Message: "Dados Carregados com Sucesso"});

  },
  put : async (req, res, next) => {

    let id = req.params.id;
 
    let clienteToUpdate = {
      Nome: req.body.Nome,
      CPF: req.body.CPF,
      Sexo: req.body.Sexo,
      Email:req.body.Email
    }

    let result = await clientesData.update(id, clienteToUpdate);

    res.status(200).send(JSON.stringify({Success : true, Data : result, Message:""}));

  },
  delete : async (req, res, next) => {
    let id = req.params.id;

    let result = await clientesData.delete(id);

    res.status(200).send({Success : true, Data : [], Message: "Deletado com sucesso!"});

  },
  getById : async (req, res, next) => {

    let id = req.params.id;

    let result = await clientesData.findOne(id);

    res.status(200).json({Success : true, Data : result, Message: ""});

  },
  post : async (req, res, next) => {

    let clienteToInsert = {
      Nome: req.body.Nome,
      CPF: req.body.CPF,
      Sexo: req.body.Sexo,
      Email:req.body.Email
    }

    let result = await clientesData.insert(clienteToInsert);

    res.status(200).send(JSON.stringify({Success : true, Data : result, Message:""}));
  }
};

module.exports = clientes;