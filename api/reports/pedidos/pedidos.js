
const pdf = require('html-pdf');
const fs = require('fs');
const ejs = require('ejs');
var dateFormat = require('dateformat');

const pedidoReports = {

    pedido: (pedido, cliente) => {

        return new Promise((resolve, reject)=>{

            var options = { format: 'Letter' };

            
            var produtos = [];
            
            for (let index = 0; index < pedido[0].Produtos.length; index++) {
                const produto = pedido[0].Produtos[index];
                
                produtos.push({
                    Valor: parseFloat(produto.Valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}),
                    ValorTotal : parseFloat(produto.Quantidade * produto.Valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}),
                    ValorTotalNum : produto.Quantidade * produto.Valor,
                    Quantidade : produto.Quantidade,
                    Nome: produto.Nome
                });
                
            }
            
            let total = produtos.reduce(function(prev, cur) {
                return parseFloat(prev) + parseFloat(cur.ValorTotalNum);
            }, 0);

            cliente.CPF = formataCPF(cliente.CPF);

            let values = {
                table: produtos,
                total: parseFloat(total).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}),
                pedido: {
                    Observacao : pedido[0].Observacao,
                    Data: dateFormat(pedido[0].Data, "yyyy-mm-dd h:MM:ss"),
                    FormaPagamento : pedido[0].FormaPagamento
                },
                cliente: cliente
            };


            ejs.renderFile("./api/reports/pedidos/pedidos.ejs", values, (err, html)=> {

                if(err){
                    console.log("ejs",err);
                    reject(err)
                }

                pdf.create(html, options).toStream((err, stream)=>{
    
                   resolve({file: stream});
        
                });
            })
        });







    }


};

function formataCPF(cpf){
    
    cpf = cpf.replace(/[^\d]/g, "");
  
    //realizar a formatação...
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

module.exports = pedidoReports