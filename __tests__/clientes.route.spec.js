const request = require('supertest');
const server = require('../config/server');

describe('Teste de integração das rotas de Clientes', () => {
    it('Devemos dar get em Clientes', async () =>{
        const res = await request(server).get('/clientes').expect(200);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('Success', true);
        expect(res.body).toHaveProperty('Message', "Dados Carregados com Sucesso");
        expect(res.body).toHaveProperty('Data');

   
    })
})
