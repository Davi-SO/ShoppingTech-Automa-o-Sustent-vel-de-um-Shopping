



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
            console.log(bar.style.backgroundColor);
            bar.style.height = `${barWidth[Math.floor(Math.random()*5)]}px`;
            barCode.appendChild(bar);
            codeHeight += parseInt(bar.style.height[0]);
            console.log(codeHeight);
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
        const nextPageFrame = document.createElement('div');
        const nextPageArrow = document.createElement('div');
        nextPageArrow.classList = 'nextPageArrow';
        nextPageFrame.classList = 'nextPageFrame';
        nextPageFrame.onclick = () => alert('in construction');
        ticket.append(nextPageFrame);
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
