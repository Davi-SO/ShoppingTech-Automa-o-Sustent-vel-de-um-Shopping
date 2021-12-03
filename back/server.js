const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const controlsTicket = require('./src/controllers/controller.ticket.js');
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

//default
app.get("/", async function(req, res){
  await controlsTicket.selectAllTickets(req, res);
});

// -------------------------------------------------------------------------


//get /tickets
app.get('/api/tickets', async function(req, res){
  controlsTicket.selectAllTickets(req, res);
})

// -------------------------------------------------------------------------



//get /ticket/id
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

// -------------------------------------------------------------------------


app.get('/api/veiculo/:veiculo', async function(req, res){
  var veiculo = req.params.veiculo;

  if(typeof veiculo !== 'string'){
    res.send("Query param veiculo is not a string!")
    return
  }
  getAllVeiculos(req,res,veiculo);

});

// -------------------------------------------------------------------------


//del /ticket/id
app.delete('/api/ticket/del/:id', async function (req, res){
  //get query param :id
  var id = req.params.id;
  // id param if it is number
  if (isNaN(id)) {
    res.send('Query param id is not number');
    return
  }
  remove(req, res, id);
});

//Insert

app.put('/api/newTicket', async function (req, res){

  var timeLord = moment(Date.now()).format('DD-MM-YYYY HH:mm:ss');
  JSON.stringify(timeLord);

  criaTicket(req, res, timeLord);
});


app.post('/api/newPayment', async function (req, res){

  var timeLord = moment(Date.now()).format('DD-MM-YYYY HH:mm:ss');
  JSON.stringify(timeLord);

  criaPagamento(req, res, timeLord);
});


// -------------------------------------------------------------------------

//UPDATE
/*async function updateById(req, res, id) {
  try{
    connection = await oracledb.getConnection({
      user: "system",
      password: password,
      connectString: "localhost:1521/XE"
    });

    result = await connection.execute(`UPDATE Pagamento SET `)
  } 
} */

app.listen(port, () => console.log("nodeOracleRestApi app listening on port %s!", port))