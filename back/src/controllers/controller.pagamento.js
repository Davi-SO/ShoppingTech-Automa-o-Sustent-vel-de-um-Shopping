const oracledb = require('oracledb');
oracledb.autoCommit = true;

async function getAllPagamentos(req,res) {
  try{
    connection = await oracledb.getConnection({
      user: "system",
      password: "admin",
      connectString: "localhost:1521/XE"
    });
    result = await connection.execute(`SELECT * FROM Pagamento`);

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
      return res.render('pages/pagamentos', {
        Pagamentos: result.rows
      });
    }
  }
}

async function removePagamento(req, res, id) {
  try {
    connection = await oracledb.getConnection({
      user: "system",
      password: "admin",
      connectString: "localhost:1521/XE"
    });
    
    result = await connection.execute(`DELETE FROM Pagamento where cod_pagamento = :id`, [id]);

    atual = await connection.execute(`SELECT * FROM Pagamento`);
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
      return res.render('pages/pagamentos', {
        Pagamentos: atual.rows
      });
    }
  }
}

async function criaPagamento(req, res, time, valor, codigoTicket){
  try {
    connection = await oracledb.getConnection({
      user: "system",
      password: "admin",
      connectString: "localhost:1521/XE"
    });

    result = await connection.execute(`INSERT INTO Pagamento (hora_pagamento, valor_pagamento, id_ticket) VALUES ('${time}', :valor, :codigoTicket)`, [valor, codigoTicket]);

    atual = await connection.execute(`SELECT * FROM Pagamento`);
    
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
      return res.render('pages/pagamentos', {
        Pagamentos: atual.rows
      });
    }
  }
}

module.exports = {
  getAllPagamentos: getAllPagamentos, 
  removePagamento: removePagamento,
  criaPagamento: criaPagamento
}