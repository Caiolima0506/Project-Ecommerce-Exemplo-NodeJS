
const Cliente = require('../data/schema/cliente');

const clientesData = {
    insert: async (clienteValues) => {
        
        const resultoCreate = await Cliente.create({
            Nome: clienteValues.Nome,
            CPF: clienteValues.CPF,
            Sexo: clienteValues.Sexo,
            Email: clienteValues.Email
        });

        return resultoCreate;
   
    },
    findAll: async () => {

       const resultFindAll = await Cliente.findAll();

       return resultFindAll;
    },
    findOne: async (id) => {

       const resultFindOne = await Cliente.findByPk(id);

       return resultFindOne;

    },
    update: async (clienteParam, id) => {

        const clienteDb = await this.findOne(id);

        clienteDb.Nome = clienteParam.Nome;
        clienteDb.Sexo = clienteParam.Sexo;
        clienteDb.CPF = clienteParam.CPF;
        clienteDb.Email = clienteParam.Email;


        const resultUpdate = await Cliente.save();

        return resultUpdate;
    },
    delete: async (id) =>{

      Cliente.destroy({ where: { ClienteId: id }});

      return;
    }
};


module.exports = clientesData;