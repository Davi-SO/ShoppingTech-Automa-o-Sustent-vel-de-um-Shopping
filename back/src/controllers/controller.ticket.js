//Inserir PUT
//Excluir DELETE
//Listar GET
//Processo complexo POST
const oracledb = require('oracledb');
oracledb.autoCommit = true;

async function selectAllTickets(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "system",
      password: "admin",
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
      return res.render('pages/index', {
        Tickets: result.rows
      });
    }
  }
}

async function selectTicketsById(req, res, id) {
  try {
    connection = await oracledb.getConnection({
      user: "system",
      password: "admin",
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

async function removeTicket(req, res, id) {
  try {
    connection = await oracledb.getConnection({
      user: "system",
      password: "admin",
      connectString: "localhost:1521/XE"
    });
    
    result = await connection.execute(`DELETE FROM Ticket where id_ticket = :id`, [id]);

    atual = await connection.execute(`SELECT * FROM Ticket`);
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
    if (atual.rows.length == 0) {
      //query return zero employees
      return res.send('params send no rows');
    } else {
      //send all employees
      //return res.send(atual.rows);
      return res.render('pages/index', {
        Tickets: atual.rows
      });
    }
  }
}

async function criaTicket(req, res, time, veiculo, preferencial){
  try {
    connection = await oracledb.getConnection({
      user: "system",
      password: "admin",
      connectString: "localhost:1521/XE"
    });

    result = await connection.execute(`INSERT INTO Ticket (hora_entrada, tipo_veiculo, cliente_preferencial) VALUES ('${time}', :veiculo, :preferencial)`, [veiculo, preferencial]);

    atual = await connection.execute(`SELECT * FROM Ticket`);
    
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
    if (atual.rows.length == 0) {
      //query return zero employees
      return res.send('params send no rows');
    } else {
      //send all employees
      
      return res.render('pages/index', {
        Tickets: atual.rows
      });
    }
  }
}

module.exports = {
  selectAllTickets: selectAllTickets,
  selectTicketsById: selectTicketsById,
  removeTicket: removeTicket,
  criaTicket: criaTicket, 
}