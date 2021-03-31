const clientesData = require('../data/clientesData');

const clientes = {
  get : (req, res, next) =>{
    res.status(200).json({teste:123});
  },
  put : (req, res, next) => {
    let id = req.params.id;
    res.status(201).send(`${id}`);
  },
  delete : async (req, res, next) => {
    let id = req.params.id;

    let result = await clientesData.delete(id);

    res.status(200).send({Success : true, Data : [], Message: "Deletado com sucesso!"});
  },
  getById : (req, res, next) => {
    let id = req.params.id;
    res.status(200).send(` ${id}`);
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