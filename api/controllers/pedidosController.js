
const pedidosData = require('../data/pedidosData');
const clientesData = require('../data/clientesData');
const quantidadesData = require('../data/QuantidadesData');
const reports = require('../reports/pedidos/pedidos');
const nodemailer = require('nodemailer');
const { createGzip } = require('zlib');

const pedidos = {

  get : async (req, res, next) => {

    let result = await pedidosData.findAll();

    res.status(200).json({Success : true, Data : await pedidos.agruparProdutos(result), Message: ""});

  },
  put : async (req, res, next) => {

    let id = req.params.id;
 


    let result = await pedidosData.update(id, req.body);

    
    res.status(200).send(JSON.stringify({Success : true, Data : result, Message:""}));

  },
  delete : async (req, res, next) => {

    let id = req.params.id;

    let result = await pedidosData.delete(id);

    res.status(200).send({Success : true, Data : [], Message: "Produto deletado com sucesso!"});

  },
  getById : async (req, res, next) => {

    let id = req.params.id;

    let result = await pedidosData.findOne(id);

    res.status(200).json({Success : true, Data : await pedidos.agruparProdutos(result), Message: ""});

  },
  post : async (req, res, next) => {

    let pedidoToInsert = {
      ClienteId: req.body.ClienteId,
      FormaPagamento: req.body.FormaPagamento,
      Observacao: req.body.Observacao,
      Data: req.body.Data,
    };

    let quantidadesToInsert = req.body.Produtos;

    let pedido = await pedidosData.insert(pedidoToInsert)


    let quantidades = await quantidadesData.insert(quantidadesToInsert, pedido);
  
  
    let result = {
      ClienteId: pedido.ClienteId,
      FormaPagamento: pedido.FormaPagamento,
      Observacao: pedido.Observacao,
      Data: pedido.Data,
      Produtos : quantidades
    }


    res.status(200).send(JSON.stringify({Success : true, Data : result, Message:""}));
 


  },
  agruparProdutos: (pedidos) => {
    return new Promise((resolve, reject)=>{

        var newPedidos = [];
        
        pedidos.forEach(pedido => {

            let exists = newPedidos.findIndex(np => np.PedidoId === pedido.PedidoId );

            if(newPedidos.length === 0 || exists === -1){
                newPedidos.push({
                    PedidoId : pedido.PedidoId,
                    Data: pedido.Data,
                    Observacao: pedido.Observacao,
                    FormaPagamento: pedido.FormaPagamento,
                    Cliente:pedido.NomeCliente,
                    Produtos: [{
                        ProdutoId: pedido.ProdutoId,
                        Nome: pedido.Nome,
                        Cor: pedido.Cor,
                        Tamanho: pedido.Tamanho,
                        Quantidade: pedido.Quantidade,
                        Valor: pedido.Valor
                    }]
                });
            }else{
                newPedidos[exists].Produtos.push({
                    ProdutoId: pedido.ProdutoId,
                    Nome: pedido.Nome,
                    Cor: pedido.Cor,
                    Tamanho: pedido.Tamanho,
                    Quantidade: pedido.Quantidade,
                    Valor: pedido.Valor
                })
            }

            
        });

        resolve(newPedidos);
    });

},
report : async (req, res, next)=> {

  let id = req.params.id;

  let result = await pedidosData.findOne(id);

  let cliente = await  clientesData.findOne(result[0].ClienteId);

  var report = await reports.pedido(await pedidos.agruparProdutos(result), cliente, false);
  
  res.writeHead(200, {
    'Content-Type': 'application/pdf; charset=utf-8',
    'Content-Disposition': 'attachment; filename=some_doc.pdf;',
    'Content-Encoding': 'gzip'
  })
  

  report.file.pipe(createGzip()).pipe(res);

  

},
sendmail: async (req, res, next) =>{

  let id = req.params.id;

  let result = await pedidosData.findOne(id);

  let cliente = await  clientesData.findOne(result[0].ClienteId);

  var html = await reports.pedido(await pedidos.agruparProdutos(result), cliente, true);


  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "caiolima0506@gmail.com",
      pass: "Caio49183@"
    }
  });

  const mailOptions = {
    from: 'caiolima0506@gmail.com',
    to: 'pricilla61@gmail.com',
    subject: 'E-mail enviado usando Node!',
    html: html
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {

      res.status(200).send(JSON.stringify({Success : true, Data : [], Message:"'Email enviado: '" + info.response}));
    }
  });



}

};

module.exports = pedidos;