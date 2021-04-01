const server = require('../config/server');
const request = require('supertest');

describe('Teste de integração das rotas de Produtos', () => {

    it('Devemos realizar um post em Produtos', async () => {

        let bodyReq = {
            "Nome":"Feijão",
            "Cor":"Marrom",
            "Tamanho": "25x10",
            "Valor":7
        };

        const res = await request(server)
        .post('/produtos')
        .send(bodyReq);

        expect(res.statusCode).toEqual(201);

    });

    it('Devemos realizar um put em produtos', async () => {

        let bodyReq = {
            "Nome":"Feijão preto",
            "Cor":"preto",
            "Tamanho": "25x10",
            "Valor":8
        };

        const res = await request(server)
        .put('/produtos/1')
        .send(bodyReq);

        expect(res.statusCode).toEqual(200);

    });


    it('Devemos realizar um get em Clientes', async () =>{
        const res = await request(server).get('/produtos').expect(200);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('Success', true);
        expect(res.body).toHaveProperty('Message', "Dados Carregados com Sucesso");
        expect(res.body).toHaveProperty('Data');

    })

    it('Devemos realizar um get one em Clientes', async () =>{
        const res = await request(server).get('/produtos/1').expect(200);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('Success', true);
        expect(res.body).toHaveProperty('Message', "Produto carregado com sucesso!");
        expect(res.body).toHaveProperty('Data');

    })

    it('Devemos realizar um get one em produtos com id inexistente', async () =>{
        const res = await request(server).get('/produtos/999').expect(404);

        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('Success', true);
        expect(res.body).toHaveProperty('Message', "Produto 999 não encontrado!");
        expect(res.body).toHaveProperty('Data');

    })

    it('Devemos realizar um delete produtos', async () =>{
        const res = await request(server).delete('/produtos/1').expect(200);

        expect(res.statusCode).toEqual(204);
        expect(res.body).toHaveProperty('Success', true);;

    })

})
