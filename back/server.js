const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const controlsTicket = require('./src/controllers/controller.ticket.js');
const controlsPagamento = require('./src/controllers/controller.pagamento.js')
var moment = require('moment');

const app = express();

app.set('views', '../front/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '../front/views/public'));

var corsOptions = {
  origin: "http://localhost"
};

const port = process.env.port || 8082;

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// TICKETS

app.get("/", async function(req, res){
  await controlsTicket.selectAllTickets(req, res);
});

app.get('/api/ticket/:id', async function (req, res){
  //get query param :id
  var id = req.params.id;
  // id param if it is number
  if (isNaN(id)) {
    res.send('Query param id is not number');
    return
  }
  selectTicketsById(req, res, id);
});

app.get('/api/ticket/del/:id', async function (req, res){
  //get query param :id
  var id = req.params.id;
  // id param if it is number
  if (isNaN(id)) {
    res.send('Query param id is not number');
    return
  }
  await controlsTicket.removeTicket(req, res, id);
});

app.post('/api/newTicket/', async function (req, res){

  var timeLord = moment(Date.now()).format('DD-MM-YYYY HH:mm:ss');
  JSON.stringify(timeLord);

  const veiculo = req.body.veiculo;
  const preferencial = req.body.preferencial;


  await controlsTicket.criaTicket(req, res, timeLord, veiculo, preferencial);
});

// PAGAMENTOS

app.get('/pagamentos', async function(req, res){
  await controlsPagamento.getAllPagamentos(req,res);
});

app.get('/api/pagamento/del/:id', async function (req, res){
  //get query param :id
  var id = req.params.id;
  // id param if it is number
  if (isNaN(id)) {
    res.send('Query param id is not number');
    return
  }
  await controlsPagamento.removePagamento(req, res, id);
});

app.post('/api/newPayment/', async function (req, res){

  const codigoTicket = req.body.ticketId;
  const valor = req.body.valor;

  var timeLord = moment(Date.now()).format('DD-MM-YYYY HH:mm:ss');
  JSON.stringify(timeLord);

  await controlsPagamento.criaPagamento(req, res, timeLord, valor, codigoTicket);
});

app.listen(port, () => console.log("nodeOracleRestApi app listening on port %s!", port))