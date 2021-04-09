# REST API 



# Passo 1

-Colocar as cofigurações do banco Mysql nos arquivos (./config/config.json) e (./config/dbConfig.js) 

# Passo 2  

- No Arquivo ./appsetting.js colocar um email Gmail e senha
- verifique se a opção deste [link](https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4ORr5nEKwH0tYxYNPNALDN7UpzBnCXjLECOBu9sFoBBFUIAdm_JWQl7UkR4Ag1_dbJOBNw02C6C3XSgCkCGfG6M4YC5jg) esta ativada.



## Instalar os pacotes 

    npm install

## Executar Migrations

    npx sequelize-cli db:migrate

## Executar os testes

    npm run test

## Executar a API

    npm start

# REST API

A Collection do Postman se encontra na raiz do projeto com o nome `collectionPostman.json`


## Get lista de Clientes

### Request

`GET /clientes/`

     'Accept: application/json' http://localhost:3000/clientes/

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Apr 2021 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []

## Criar um novo Cliente

### Request

`POST /clientes/`

     'Accept: application/json' 'name=Foo&status=new' http://localhost:3000/clientes

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Apr 2021 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 36

    {"ClienteId":1,"Nome":"João","Email":"teste@teste.com", Sexo:"Masculino" CPF:11 }

## Get em um Cliente 

### Request

`GET /clientes/id`

    'Accept: application/json' http://localhost:3000/clientes/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Apr 2021 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 36

    {"ClienteId":1,"Nome":"João","Email":"teste@teste.com", Sexo:"Masculino" CPF:11 }


## Alterar um Cliente

### Request

`PUT /clientes/:id`

    'Accept: application/json'  http://localhost:3000/clientes/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Apr 2021 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 40

    {"ClienteId":1,"Nome":"João","Email":"teste@teste.com", Sexo:"Masculino" CPF:11 }


## Deletar um Cliente

### Request

`DELETE /clientes/id`

    'Accept: application/json'  http://localhost:3000/clientes/1/

### Response

    HTTP/1.1 204 No Content
    Date: Thu, 24 Apr 2021 12:36:30 GMT
    Status: 204 No Content
    Connection: close



## Get lista de Produtos

### Request

`GET /produtos/`

     'Accept: application/json' http://localhost:3000/produtos/

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Apr 2021 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []

## Criar um novo Produto

### Request

`POST /produtos/`

     'Accept: application/json' http://localhost:3000/produtos

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Apr 2021 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 36

    {"ProdutoId":1,	"Nome":"Feijão","Cor":"Marrom","Tamanho": "25x10","Valor":7}

## Get em um Produto 

### Request

`GET /produtos/id`

    'Accept: application/json' http://localhost:3000/produtos/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Apr 2021 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 36

    {"ProdutoId":1,	"Nome":"Feijão","Cor":"Marrom","Tamanho": "25x10","Valor":7}


## Alterar um Produto

### Request

`PUT /produtos/:id`

    'Accept: application/json' http://localhost:3000/produtos/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Apr 2021 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 40

    {"ProdutoId":1,	"Nome":"Feijão","Cor":"roxo","Tamanho": "25x10","Valor":10}


## Deletar um produto

### Request

`DELETE /produtos/id`

    'Accept: application/json' http://localhost:3000/produtos/1/

### Response

    HTTP/1.1 204 No Content
    Date: Thu, 24 Apr 2021 12:36:30 GMT
    Status: 204 No Content
    Connection: close


## Get lista de Pedidos

### Request

`GET /pedidos/`

     'Accept: application/json' http://localhost:3000/pedidos/

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Apr 2021 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []

## Criar um novo Pedido

### Request

`POST /pedidos/`

     'Accept: application/json' http://localhost:3000/pedidos

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Apr 2021 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 36

    {
	"ClienteId":4,
	"FormaPagamento":"Dinheiro",
	"Observacao":"teste observação",
	"Data":"2021-03-31T22:36:00.000",
	"Produtos":[
		{
			"ProdutoId":3,
			"Quantidade":5
			
		},
		{
			"ProdutoId":1,
			"Quantidade":10
			
		}]
}

## Get em um Pedido 

### Request

`GET /pedidos/id`

    'Accept: application/json' http://localhost:3000/pedisos/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Apr 2021 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 36

    {
            "PedidoId": 27,
            "Data": "2021-04-01T01:36:00.000Z",
            "Observacao": "teste observação",
            "FormaPagamento": "Dinheiro",
            "Cliente": "Caio Henrique De Carvalho LIma",
            "Produtos": [
                {
                    "ProdutoId": 3,
                    "Nome": "Arroz",
                    "Cor": "Branco",
                    "Tamanho": "25x10",
                    "Quantidade": 5,
                    "Valor": "15"
                }
            ]
        }


## Alterar um Pedido

### Request

`PUT /pedidos/:id`

    'Accept: application/json' http://localhost:3000/pedidos/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Apr 2021 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 40

    {
            "PedidoId": 27,
            "Data": "2021-04-01T01:36:00.000Z",
            "Observacao": "teste observação",
            "FormaPagamento": "Dinheiro",
            "Cliente": "Caio Henrique De Carvalho LIma",
            "Produtos": [
                {
                    "ProdutoId": 3,
                    "Nome": "Arroz",
                    "Cor": "Branco",
                    "Tamanho": "25x10",
                    "Quantidade": 5,
                    "Valor": "15"
                }
            ]
        }


## Deletar um Pedido

### Request

`DELETE /pedidos/id`

    'Accept: application/json' http://localhost:3000/pedidos/1/

### Response

    HTTP/1.1 204 No Content
    Date: Thu, 24 Apr 2021 12:36:30 GMT
    Status: 204 No Content
    Connection: close


## Emitir um relatório em PDF com os dados do Pedido

### Request

`POST /pedidos/:id/report`

    'Accept: application/json' http://localhost:3000/pedidos/1/report

### Response

    HTTP/1.1 200 ok
    Date: Thu, 24 Apr 2021 12:36:30 GMT
    Status: 204 No Content
    Connection: close

## Enviar email para o Cliente com os dados do pedido 

### Request

`POST /pedidos/:id/sendmail`

    'Accept: application/json' http://localhost:3000/pedidos/1/sendmail

### Response

    HTTP/1.1 200 ok
    Date: Thu, 24 Apr 2021 12:36:30 GMT
    Status: 204 No Content
    Connection: close
