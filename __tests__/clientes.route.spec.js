const request = require('supertest');
const server = require('../config/server');

describe('Teste de integração das rotas de Clientes', () => {

    it('Devemos realizar um post em Clientes', async () => {

        let bodyReq = {
            Nome:"José",
            CPF: "9999999999",
            Sexo: "Masculino",
            Email: "teste@teste.com"
        };

        const res = await request(server)
        .post('/clientes')
        .send(bodyReq);

        expect(res.statusCode).toEqual(201);

    });

    it('Devemos realizar um put em Clientes', async () => {

        let bodyReq = {
            Nome:"José alves",
            CPF: "9999999999",
            Sexo: "Masculino",
            Email: "teste1@teste.com"
        };

        const res = await request(server)
        .put('/clientes/1')
        .send(bodyReq);

        expect(res.statusCode).toEqual(200);

    });


    it('Devemos realizar um get em Clientes', async () =>{
        const res = await request(server).get('/clientes').expect(200);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('Success', true);
        expect(res.body).toHaveProperty('Message', "Dados Carregados com Sucesso");
        expect(res.body).toHaveProperty('Data');

    })

    it('Devemos realizar um get one em Clientes', async () =>{
        const res = await request(server).get('/clientes/1').expect(200);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('Success', true);
        expect(res.body).toHaveProperty('Message', "Cliente carregado com sucesso!");
        expect(res.body).toHaveProperty('Data');

    })

    it('Devemos realizar um get one em Clientes com id inexistente', async () =>{
        const res = await request(server).get('/clientes/999').expect(404);

        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('Success', true);
        expect(res.body).toHaveProperty('Message', "Cliente 999 não encontrado!");
        expect(res.body).toHaveProperty('Data');

    })

    it('Devemos realizar um delete em Clientes', async () =>{
        const res = await request(server).delete('/clientes/1').expect(200);

        expect(res.statusCode).toEqual(204);
        expect(res.body).toHaveProperty('Success', true);

    })

})
