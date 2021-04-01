const clientesData = require('../data/clientesData');
const util = require('../controllers/utilController');

const clientes = {
  get : async (req, res, next) =>{

    let result = await clientesData.findAll();

    if(result.length > 0){
      res.status(200).json({Success : true, Data : result, Message: "Dados Carregados com Sucesso"});
    }else{
      res.status(404).json({Success : true, Data : result, Message: "Não existem dados a serem carregados"});
    }

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

    res.status(204).send({Success : true, Data : [], Message: "Deletado com sucesso!"});

  },
  getById : async (req, res, next) => {

    let id = req.params.id;

    let result = await clientesData.findOne(id);

    if(result){
      res.status(200).json({Success : true, Data : result, Message: "Cliente carregado com sucesso!"});
    }else{
      res.status(404).json({Success : true, Data : result, Message: `Cliente ${id} não encontrado!`});
    }


  },
  post : async (req, res, next) => {


    if(!util.IsEmail(req.body.Email)){

      res.status(400).send(JSON.stringify({Success : false, Data : [], Message:"Email  do Cliente é inválido"}));
      return;
    }

    let clienteToInsert = {
      Nome: req.body.Nome,
      CPF: req.body.CPF,
      Sexo: req.body.Sexo,
      Email:req.body.Email
    }

    let result = await clientesData.insert(clienteToInsert);

    res.status(201).send(JSON.stringify({Success : true, Data : result, Message:""}));
  }
};

module.exports = clientes;