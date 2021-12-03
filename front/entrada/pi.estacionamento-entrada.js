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
        //entrada.ticket = this;
    }
    tempo_total(){
        let tempo = (Math.floor(Date.now()) - Math.floor(this.horaEntrada.getTime())) / 60000;
        if (tempo <= 15) return -1;
        else tempo /= 60;
        return tempo;
    }
    total_devido = function (tempo = this.tempo_total()) {

        switch (tempo) {
            case -1:
                return 0;
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
    data_br(horaEntrada){      
        let dia = horaEntrada.slice(0,3);
        let mes = horaEntrada.slice(4,7);
        switch(dia){
            case 'Sun':
                dia = 'Domingo, ';
                break;
            case 'Mon':
                dia = 'Segunda-feira, ';
                break;
            case 'Tue':
                dia = 'Terça-feira, ';
                break;
            case 'Wed':
                dia  = 'Quarta-feira, ';
                break;
            case 'Thu':
                dia = 'Quinta-feira, ';
                break;
            case 'Fri':
                dia = 'Sexta-feira, ';
                break;
            case 'Sat':
                dia = 'Sábado, ';
                break;
        }
        switch(mes){
            case 'Jan':
                mes = ' de Janeiro de ' ;
                break;
            case 'Feb':
                mes = ' de Fevereiro de '
                break;
            case 'Mar':
                mes = ' de Março de ';
                break;
            case 'Apr':
                mes = ' de Abril de ';
                break;
            case 'May':
                mes = ' de Maio de ';
                break;
            case 'Jun':
                mes = ' de Junho de ';
                break;
            case 'Jul':
                mes = ' de Julho de ';
                break;
            case 'Aug':
                mes = ' de Agosto de ';
                break;
            case 'Sep':
                mes = ' de Setembro de ';
                break;
            case 'Oct':
                mes =  ' de Outubro de ';
                break;
            case 'Nov':
                mes = ' de Novembro de ';
                break;
            case 'Dec':
                mes = ' de Dezembro de ';
                break;
            
        }
        return dia + horaEntrada.slice(8,10) + mes + horaEntrada.slice(10);
    }
    bar_code_generator(){
        const barCode = document.createElement('div');
        barCode.classList = 'codigoDeBarra';
        let barWidth = [1,2,3,5,8]
        let codeHeight = 0;
        let barCount = 0;
        while(codeHeight < 175){
            let bar = document.createElement('div');
            bar.style.backgroundColor = ['black','white'][barCount%2];
            bar.style.height = `${barWidth[Math.floor(Math.random()*5)]}px`;
            barCode.appendChild(bar);
            codeHeight += parseInt(bar.style.height[0]);
            barCount++;
        }
        return barCode;
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
        ${this.data_br(this.horaEntrada.toDateString())} ${this.horaEntrada.toTimeString().slice(0,8)}\n
        `
        const bemVindo = document.createElement('h2');
        bemVindo.innerText = "Bem-Vindo!";
        bemVindo.id = 'bemVindo';

        if (this.vagaPreferencial){
            const faixaVagaPreferencial = document.createElement('div');
            faixaVagaPreferencial.classList = 'faixaVagaPreferencial';
            faixaVagaPreferencial.innerText = 'PREFERENCIAL';
            ticket.appendChild(faixaVagaPreferencial);
        }

        const codigoDeBarra = this.bar_code_generator();

        document.body.appendChild(ticket)
        ticket.appendChild(nomeEstacionamento);
        ticket.appendChild(veiculoSprite)
        ticket.appendChild(infoCliente);
        ticket.appendChild(bemVindo);
        ticket.appendChild(codigoDeBarra);

        //nextPage
        const nextPage = document.createElement('a');
        nextPage.href = "../Pagamento/";
        const nextPageFrame = document.createElement('div');
        
        nextPage.appendChild(nextPageFrame);
        const nextPageArrow = document.createElement('div');
        nextPageArrow.classList = 'nextPageArrow';
        nextPageFrame.classList = 'nextPageFrame';
        ticket.append(nextPage);
        nextPageFrame.appendChild(nextPageArrow);


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
