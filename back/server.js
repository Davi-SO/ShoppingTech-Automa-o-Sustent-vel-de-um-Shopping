const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

const port = process.env.port || 8082;

var password = 'admin';

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//default
app.get("/", (req, res) => {
  res.json({messsage: "Welcome to Eminem Show!"});
});

// -------------------------------------------------------------------------
async function selectAllTickets(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "system",
      password: password,
      connectString: "localhost:1521/xe"
    });

    console.log('connected to database');
    // run query to get all employees
    result = await connection.execute(`SELECT * FROM Ticket`);

  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('query send no rows');
    } else {
      //send all employees
      return res.send(result.rows);
    }

  }
}

//get /employess
app.get('/tickets', function (req, res) {
  selectAllTickets(req, res);
})

// -------------------------------------------------------------------------

async function selectTicketsById(req, res, id) {
  try {
    connection = await oracledb.getConnection({
      user: "system",
      password: password,
      connectString: "localhost:1521/XE"
    });
    // run query to get employee with employee_id
    result = await connection.execute(`SELECT * FROM Ticket where id_ticket=:id`, [id]);

  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close(); 
      } catch (err) {
        return console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('params send no rows');
    } else {
      //send all employees
      return res.send(result.rows);
    }
  }
}

//get /ticket/id
app.get('/ticket/:id', function (req, res) {
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
async function getAllVeiculos(req,res, veiculo) {
  try{
    connection = await oracledb.getConnection({
      user: "system",
      password: password,
      connectString: "localhost:1521/XE"
    });
    result = await connection.execute(`SELECT * FROM Ticket where tipo_veiculo like '%${veiculo}%'`);

  } catch(err) {
    return res.send(err.message);
  } finally {
    if(connection) {
      try{
        await connection.close();
      } catch(err) {
        returnconsole.error(err.message);
      }
    }
    if(result.rows.length == 0) {
      return res.send('params send no rows');
    } else {
      return res.send(result.rows);
    }
  }
}

app.get('/veiculo/:veiculo', function(req, res) {
  var veiculo = req.params.veiculo;

  if(typeof veiculo !== 'string'){
    res.send("Query param veiculo is not a string!")
    return
  }
  getAllVeiculos(req,res,veiculo);

});

// -------------------------------------------------------------------------
async function remove(req, res, id) {
  try {
    connection = await oracledb.getConnection({
      user: "system",
      password: password,
      connectString: "localhost:1521/XE"
    });
    
    result = await connection.execute('DELETE FROM Ticket where id = :id', [id]);
  } catch(err) {
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close(); 
      } catch (err) {
        return console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('params send no rows');
    } else {
      //send all employees
      return res.send(result.rows);
    }
  }
}

//del /ticket/id
app.delete('/ticket/del/:id', function (req, res) {
  //get query param :id
  var id = req.params.id;
  // id param if it is number
  if (isNaN(id)) {
    res.send('Query param id is not number');
    return
  }
  remove(req, res, id);
});

// -------------------------------------------------------------------------
//Insert
/*
async function cria(req, res, id,)
*/

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