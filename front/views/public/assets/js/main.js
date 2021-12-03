async function getActiveRegisters() {
  var res;
  await axios.get('http://localhost:8082/api/tickets')
  .then(response => { 
      let headers = ["ID" , "Entrada", "Tipo Veiculo", "Preferencial", "Action"]
      //var table = document.getElementById("myTable");
      let headerRow =  document.getElementById("tableHeader");
      headers.forEach(headerText => {
          let header = document.createElement("th");
          let textNode = document.createTextNode(headerText);
          header.appendChild(textNode);
          headerRow.appendChild(header);
      });

      var table = document.getElementById("table");
      table.appendChild(headerRow);
      
      res = response.data;
      res.forEach(element  => {
          let btnExcluir = document.createElement("button");
          btnExcluir.classList.add("btn");
          btnExcluir.classList.add("btn-danger");
          btnExcluir.classList.add("text-white");
          btnExcluir.addEventListener("onclick", {
          });

          let btnText = document.createTextNode("Excluir");
          btnExcluir.appendChild(btnText);
          let row = document.createElement('tr');
          Object.values(element).forEach(text => {
            let cell = document.createElement("td");
            let textNode = document.createTextNode(text);
            cell.appendChild(textNode);
            row.appendChild(cell);
            row.appendChild(btnExcluir);
          });
          table.appendChild(row);
      });

      var rows = document.querySelectorAll("tr");
      

  })
  .catch(error => console.log(error));
  return res;
};


async function insertPayment(id, entrance_id, payment_type, payment_value) {
  var res;
  await axios.post('http://localhost:8082/payment', null,  { params: {id: id, entrance_id: entrance_id, payment_type: payment_type, payment_value: payment_value} })
  .then(response => { res = response.data;} )
  .catch(error => console.log(error));
  return res;
}