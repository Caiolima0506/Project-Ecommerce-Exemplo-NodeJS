
const pedidos = {
  get : (req, res, next) =>{
    res.status(200).json({teste:123});
  },
  put : (req, res, next) => {
    let id = req.params.id;
    res.status(201).send(`${id}`);
  },
  delete : (req, res, next) => {
    let id = req.params.id;
    res.status(200).send(`${id}`);
  },
  getById : (req, res, next) => {
    let id = req.params.id;
    res.status(200).send(` ${id}`);
  },
  post : (req, res, next) => {
    res.status(201).send('POST!');
  }
};

module.exports = pedidos;