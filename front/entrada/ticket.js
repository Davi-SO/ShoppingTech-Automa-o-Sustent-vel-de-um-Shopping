class Ticket {
    constructor() {
        this.codigoTicket = Math.round(Math.random() * (9999 - 1000) + 1000);
        this.horaEntrada = new Date();
        this.horaSaida = null;
        ///100 motos
        ///80 bikes
        ///400 carros
        this.tipoVeiculo = "MMMBCCCCCC"[(Math.floor(Math.random()*10))];
        ///125 pref
        this.vagaPreferencial = Math.round(Math.random()*0.8);
    }

    data_br(horaEntrada = this.horaEntrada.toDateString()){      
        let dia = horaEntrada.slice(0,3);
        let mes = horaEntrada.slice(4,7);
        return(
        
       (dia = dia == 'Sun'?'Domingo, ':
        dia = dia == 'Mon'?'Segunda-feira, ':
        dia = dia == 'Tue'?'Terça-feira, ':
        dia = dia == 'Wed'?'Quarta-feira, ':
        dia = dia == 'Thu'?'Quinta-feira, ':
        dia = dia == 'Fri'?'Sexta-feira, ':'Sábado, ')
      +horaEntrada.slice(8,10)
      +(mes = 
        mes=='Jan'?' de Janeiro de ':
        mes=='Feb'?' de Fevereiro de ':
        mes=='Mar'?' de Março de ':
        mes=='Apr'?' de Abril de ':
        mes=='May'?' de de Maio de ':
        mes=='Jun'?' de Junho de ':
        mes=='Jul'?' de Julho de ':
        mes=='Aug'?' de Agosto de ':
        mes=='Sep'?' de Setembro de ':
        mes=='Oct'?' de Outubro de de ':
        mes=='Nov'?' de de Novembro de de ':' de Dezembro de ')
      +horaEntrada.slice(10))
    }





}
function tkt(){return new Ticket};
exports = {tkt}