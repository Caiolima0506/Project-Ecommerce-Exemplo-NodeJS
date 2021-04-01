
const pedidosData = require('../data/pedidosData');
const clientesData = require('../data/clientesData');
const quantidadesData = require('../data/quantidadesData');
const reports = require('../reports/pedidos/pedidos');
const nodemailer = require('nodemailer');
const { createGzip } = require('zlib');
const appsettings = require('../../appsettings');
const util = require('../controllers/utilController');

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

    res.status(204).send({Success : true, Data : [], Message: "Produto deletado com sucesso!"});

  },
  getById : async (req, res, next) => {

    let id = req.params.id;

    let result = await pedidosData.findOne(id);

    res.status(200).json({Success : true, Data : await pedidos.agruparProdutos([result]), Message: ""});

  },
  post : async (req, res, next) => {

    let pedidoToInsert = {
      ClienteId: req.body.ClienteId,
      FormaPagamento: req.body.FormaPagamento,
      Observacao: req.body.Observacao,
      Data: req.body.Data,
    };

    console.info(pedidoToInsert)

    let quantidadesToInsert = req.body.Produtos;

    let pedido = await pedidosData.insert(pedidoToInsert);

    let quantidades = await quantidadesData.insert(quantidadesToInsert, pedido);
  
    let result = {
      ClienteId: pedido.ClienteId,
      FormaPagamento: pedido.FormaPagamento,
      Observacao: pedido.Observacao,
      Data: pedido.Data,
      Produtos : quantidades
    }

    res.status(201).send(JSON.stringify({Success : true, Data : result, Message:""}));
 
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

  let pedido = await pedidosData.findOne(id);

  let cliente = await  clientesData.findOne(pedido.ClienteId);

  let pedidoAgrupado = await pedidos.agruparProdutos([pedido]);

  var report = await reports.pedido(pedidoAgrupado[0], cliente, false);
  
  res.writeHead(200, {
    'Content-Type': 'application/pdf; charset=utf-8',
    'Content-Disposition': 'attachment; filename=some_doc.pdf;',
    'Content-Encoding': 'gzip'
  })
  
  report.file.pipe(createGzip()).pipe(res);

},
sendmail: async (req, res, next) =>{

  let id = req.params.id;

  let pedido = await pedidosData.findOne(id);

  let cliente = await  clientesData.findOne(pedido.ClienteId);

  if(!util.IsEmail(cliente.Email)){

    res.status(400).send(JSON.stringify({Success : false, Data : [], Message:"Email  do Cliente é inválido"}));
    return;
  }

  let pedidoAgrupado = await pedidos.agruparProdutos([pedido]);

  var html = await reports.pedido(pedidoAgrupado[0], cliente, true);

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: appsettings.authEmail
  });

  const mailOptions = {
    from: appsettings.authEmail.user,
    to: cliente.Email,
    subject: `Pedido Nº ${pedido.PedidoId}`,
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