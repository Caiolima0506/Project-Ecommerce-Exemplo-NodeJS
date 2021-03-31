
const port = 3001;
const allowCors = require('./cors');
const express = require('express');
const server = express();
const bodyParser = require('body-parser');

require('../api/routes/index')(server);
server.use(bodyParser.json());

server.use(bodyParser.urlencoded({ extended: true}));


server.use(allowCors);

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port} ${new Date()}`)
});