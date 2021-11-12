

class Ticket {
    constructor() {
        this.codigoTicket = Math.round(Math.random() * (9999 - 1000) + 1000);
        this.horaEntrada = new Date();
        ///100 motos
        ///80 bikes
        ///400 carros
        this.tipoVeiculo = "MMMBCCCCCC"[(Math.floor(Math.random()*10))];
        ///125 pref
        this.vagaPreferencial = Math.round(Math.random()*0.8);
    }

    display_ticket() {
        
        const backgroundShade = document.createElement('div')
        backgroundShade.classList = 'backgroundShade';
        backgroundShade.id = 'backgroundShade';
        document.body.appendChild(backgroundShade);
        
        const ticket = document.createElement('div');
        ticket.id = 'ticket';
        ticket.classList = 'ticket';
        
        const nomeEstacionamento = document.createElement('h1')
        nomeEstacionamento.id = 'nomeEstacionamento';
        nomeEstacionamento.innerText = 'Shopping Amélia';

        const veiculoSprite = document.createElement('img')
        veiculoSprite.classList  = 'VSprite';
        veiculoSprite.src = `assets/${this.tipoVeiculo}Sprite.png`;
        
        const infoCliente = document.createElement('p');
        infoCliente.id = 'infoCliente';
        infoCliente.innerText = 
        `
        Seu código: ${this.codigoTicket}\n
        ${this.horaEntrada.toDateString()} ${this.horaEntrada.toTimeString().slice(0,8)}\n
        `
        const bemVindo = document.createElement('h2');
        bemVindo.innerText = "Bem-Vindo!";
        bemVindo.id = 'bemVindo';

        if (this.vagaPreferencial){
            const faixaVagaPreferencial = document.createElement('div');
            faixaVagaPreferencial.classList = 'faixaVagaPreferencial';
            faixaVagaPreferencial.innerText = "\n\nPREFERENCIAL";
            ticket.appendChild(faixaVagaPreferencial);
        }


        document.body.appendChild(ticket)
        ticket.appendChild(nomeEstacionamento);
        ticket.appendChild(veiculoSprite)
        ticket.appendChild(infoCliente);
        ticket.appendChild(bemVindo);

    }

    total_devido() {
        let tempo = (Math.floor(Date.now()) - Math.floor(this.horaEntrada.getTime())) / 60000;
        if (tempo <= 15) return 0;
        else tempo /= 60;
        switch (tempo) {
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


//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
class Totem {
    constructor() {
        this.botão = document.createElement('button');
        this.botão.onclick = this.display_mini_ticket
    }

    
    entrada_start() {
        return;
    }
    display_totem() {
        const totemCancela = document.createElement('div');
        totemCancela.classList = 'cancelaFechada';
        totemCancela.id = 'cancela';
        document.body.appendChild(totemCancela);

        const totemHead = document.createElement('div');
        totemHead.classList = 'totemHead';
        totemHead.id = 'totemHead';

        const totemBody = document.createElement('div');
        totemBody.classList = 'totemBody'
        totemBody.id = 'totemBody'
        document.body.appendChild(totemBody);
        totemBody.appendChild(totemHead)

        const totemBtn = this.botão
        totemBtn.value = 'press'
        totemBtn.classList = 'totemBtn';
        totemBtn.id = 'totemBtn';
        totemHead.appendChild(totemBtn);

        const totemFlag = document.createElement('div');
        totemFlag.classList = 'totemFlag';
        totemFlag.id = 'totemFlag';
        totemHead.appendChild(totemFlag);

        const totemBoca = document.createElement('div');
        totemBoca.classList = 'totemBoca';
        totemBoca.id = 'totemBoca';
        totemBody.appendChild(totemBoca);


    }

    display_mini_ticket() {
        const miniTicket = document.createElement('p');
        miniTicket.classList = 'miniTicket';
        miniTicket.id = 'miniTicket';
        miniTicket.innerHTML = "~~~~\n~~~~";
        miniTicket.onclick = 
        function (){
            miniTicket.style.paddingTop = '8px';
            miniTicket.style.backgroundColor = 'transparent';
            miniTicket.style.setProperty('--v', 'hidden');
            miniTicket.innerHTML = '';
            document.getElementById('cancela').classList = 'cancelaAberta';
            let myTicket = new Ticket;
            myTicket.display_ticket();
        };
        document.getElementById('totemBoca').appendChild(miniTicket);
    }
}

const totem = new Totem;
totem.display_totem();
