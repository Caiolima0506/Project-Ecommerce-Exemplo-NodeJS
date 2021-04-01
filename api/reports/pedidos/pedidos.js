
const pdf = require('html-pdf');
const fs = require('fs');
const ejs = require('ejs');
var dateFormat = require('dateformat');

const pedidoReports = {

    pedido: (pedido, cliente, htmlResult) => {

        return new Promise((resolve, reject)=>{

            var options = { format: 'Letter' };

            var produtos = [];
            
            for (let index = 0; index < pedido.Produtos.length; index++) {
                const produto = pedido.Produtos[index];
                
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
                    Observacao : pedido.Observacao,
                    Data: dateFormat(pedido.Data, "yyyy-mm-dd h:MM:ss"),
                    FormaPagamento : pedido.FormaPagamento
                },
                cliente: cliente
            };


            ejs.renderFile("./api/reports/pedidos/pedidos.ejs", values, (err, html)=> {

                if(err){
                    console.log("ejs",err);
                    reject(err)
                }

                if(htmlResult){
                    resolve(html);
                }

                pdf.create(html, options).toStream((err, stream)=>{
                    
                   resolve({file: stream});
        
                });
            })
        });

    }

};

function formataCPF(cpf){
    
    let cpfRepalce = cpf.replace(/[^\d]/g, "");

    return cpfRepalce.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

module.exports = pedidoReports