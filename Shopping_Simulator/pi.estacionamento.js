

class Ticket {    
    constructor(codigoTicket,tipoVeiculo,vagaPreferencial){
        this.codigoTicket = codigoTicket;
        this.tipoVeiculo = tipoVeiculo;
        this.horaEntrada = new Date();
        this.vagaPreferencial = vagaPreferencial;
    }
    total_devido(){
        let tempo = (Math.floor(Date.now()) - Math.floor(this.horaEntrada.getTime()))/60000;
        if (tempo<=15) return 0;
        else tempo /=60;
        switch (tempo){
            case 0:
            case 1:             // ATÉ 2 HORAS - R$ 17,00
                return 17;
            case 2:             // ATÉ 3 HORAS - R$ 19,00
                return 19;
            case 3:             // ATÉ 4 HORAS - R$ 22,00
                return 22;
            case 4:             // ATÉ 5 HORAS - R$ 25,00
                return 25;
            case 5:             // ATÉ 6 HORAS - R$ 32,00
                return 32;
            case 6:             // ATÉ 7 HORAS - R$ 40,00
                return 40;
            case 7:             // ATÉ 8 HORAS - R$ 45,00
                return 45;
            default:            // ACIMA DE 8 HORAS - R$ 50,00.
                return 50;
        }
    }
}



console.log(3)
