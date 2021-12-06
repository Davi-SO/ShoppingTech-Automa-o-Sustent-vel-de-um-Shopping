
const ticket = JSON.parse(localStorage.getItem('ticket'));
class Pagamento{
    constructor(){

        this.cod = ticket.codigoTicket*7
        this.dataPagamento = new Date();

        this.status =  'V';
        this.idTicket = ticket.codigoTicket;
    }
}
let payInfo = new Pagamento(ticket);
console.log()
let now = Math.floor(Date.now())
ticket.horaEntrada = new Date(Date.parse(ticket.horaEntrada))
function data_br(horaEntrada){      
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
function tempo_total(){
        let tempo = (now - ticket.horaEntrada) / 60000;
        if (tempo <= 15) return -1;
        else tempo /= 60;
        console.log(tempo)
        return Math.floor(tempo);
    }
function total_devido () {
        let tempo = tempo_total()
        return cash =( 
        tempo==-1? 0:
        tempo==0||tempo==1? 17:
        tempo==2? 19:
        tempo==3? 22:
        tempo==4? 25:
        tempo==5? 32:
        tempo==6? 40:
        tempo==7? 45:50) - (ticket.tipoVeiculo=='B'? 20:0);
    }
function tabela_de_preços(){
    const tabelaDiv =  document.createElement('div');
    const preços = {
        div : document.createElement('div'),
        0 : "R$ 00,00",
        2 : "R$ 17,00",
        3 : "R$ 19,00",
        4 : "R$ 22,00",
        5 : "R$ 25,00",
        6 : "R$ 32,00",
        7 : "R$ 40,00",
        8 : "R$ 45,00",
    };

    Object.assign(tabelaDiv,{classList : 'tabela'})
    Object.assign(preços.div,{classList:'preços' , innerText:'PREÇOS'})

    const line = document.createElement('p')
    line.innerText += `Obs: Até 15 min - Sem pagamento`;

    preços.div.appendChild(line)
    for(let i=0;i<9;i++){
        if (preços[i]&&i){
            const line = document.createElement('p')
            line.innerText += `Até ${i}h - ${preços[i]}`;
            preços.div.appendChild(line);
        }
    }
    const maxVal = document.createElement('p');
    maxVal.innerText = 'Acima de 8h - R$50,00';

    preços.div.appendChild(maxVal);
    document.body.appendChild(tabelaDiv);
    tabelaDiv.appendChild(preços.div);

}

function terminal(){

    let tela = document.getElementById('telaDePagamento');
    let dinheiroBtn = document.getElementById('dinheiroBtn');
    let pixBtn = document.getElementById('pixBtn');
    let startBtn  = document.getElementById('startBtn');

    Object.assign(tela, {classList:'telaDePagamento'});

    Object.assign(dinheiroBtn, {
        classList: 'dinheiroBtn', 
        innerText: 'Dinheiro', 
        onclick: pagamento_em_dinheiro});

    Object.assign(pixBtn, {
        classList:'pixBtn' ,
        innerText: 'Pix',
        onclick : pagamento_em_pix});

    Object.assign(startBtn,{
        classList: 'startBtn',
        innerText: 'Iniciar pagamento',
        onclick: () => {
                document.getElementById('dinheiroBtn').style.visibility ='visible';
                document.getElementById('pixBtn').style.visibility ='visible';
                document.getElementById('startBtn').style.visibility ='hidden';
                let selectionHeader = document.createElement('h1');
                selectionHeader.id = 'selectionHeader'
                Object.assign(selectionHeader,
                    {innerText:'Selecione o modo de pagamento',classList : 'selectionHeader',id:'selectionHeader'})
                document.getElementById('telaDePagamento').appendChild(selectionHeader);


            }
    })

}
function displayInfo(){
    payInfo.valorPagamento = total_devido()<0?
    0:total_devido();
    const w = document.createElement('div');
    w.id = 'clientInfo';
    const cod = document.createElement('p');
    const In = document.createElement('p');
    const ride = document.createElement('p');
    const debt = document.createElement('p');
    debt.id = 'totalDevido'
    ride.innerText = 
    ticket['tipoVeiculo']=='C'?'O seu Carro':
    ticket['tipoVeiculo']=='M'?'A sua Moto':'A sua Bicicleta';
    cod.innerText = 'De codigo ' + ticket['codigoTicket'];
    In.innerText = 'Chegou às - ' + ticket.horaEntrada.toTimeString().slice(0,9)
    debt.innerText = 'Total devido: R$' + (total_devido()<0?
    0:total_devido()) + ',00';
    w.appendChild(ride);
    w.appendChild(cod);
    w.appendChild(In);
    w.appendChild(debt);
    document.getElementById('telaDePagamento').appendChild(w)
}
function pagamento_em_dinheiro(){

    document.getElementById('telaDePagamento').classList = 'inCash'
    document.getElementById('telaDePagamento').removeChild(document.getElementById('selectionHeader'));
    document.getElementById('dinheiroBtn').style.visibility = 'hidden'
    document.getElementById('pixBtn').style.visibility = 'hidden'
    let timeLapse  = document.createElement('div');
    let currentTime  = document.createElement('p');
    var skipTime  = document.createElement('button');
    skipTime.classList = 'forward';
    timeLapse.id = 'clock';
    currentTime.id = 'currentTime';
    currentTime.innerText = data_br((new Date(now).toDateString())) + ' ' + (new Date(now)).toTimeString().slice(0,5);
    document.getElementById('telaDePagamento').appendChild(timeLapse);
    timeLapse.appendChild(currentTime);
    timeLapse.appendChild(skipTime);
    skipTime.onclick = ()=> {    
        document.getElementById('currentTime').innerText =data_br((new Date(now).toDateString())) + ' ' + (new Date(now+=3600000)).toTimeString().slice(0,5);
        document.getElementById('totalDevido').innerText = 'Total devido: R$' + (total_devido()<0?
        0:total_devido()) + ',00';
        payInfo.valorPagamento = total_devido()<0?
        0:total_devido();
        if(payInfo.status = 'V') payInfo.status = 'I'
        console.log(payInfo.valorPagamento)
    } 
    displayInfo();

    const payBtn = document.createElement('button');
    payBtn.id = 'payBtn';
    payBtn.innerText = 'PAGAR $';
    document.getElementById('clientInfo').appendChild(payBtn);
    payBtn.onclick = finalizar_pagamento

    

    

}
function pagamento_em_pix(){
    document.getElementById('telaDePagamento').classList = 'inPix'
    document.getElementById('telaDePagamento').removeChild(document.getElementById('selectionHeader'));
    document.getElementById('dinheiroBtn').style.visibility = 'hidden'
    document.getElementById('pixBtn').style.visibility = 'hidden'
    let timeLapse  = document.createElement('div');
    let currentTime  = document.createElement('p');
    var skipTime  = document.createElement('button');
    skipTime.classList = 'forward';
    timeLapse.id = 'clock';
    currentTime.id = 'currentTime';
    currentTime.innerText = data_br((new Date(now).toDateString())) + ' ' + (new Date(now)).toTimeString().slice(0,5);
    document.getElementById('telaDePagamento').appendChild(timeLapse);
    timeLapse.appendChild(currentTime);
    timeLapse.appendChild(skipTime);
    skipTime.onclick = ()=> {    
        document.getElementById('currentTime').innerText =data_br((new Date(now).toDateString())) + ' ' + (new Date(now+=3600000)).toTimeString().slice(0,5);
        document.getElementById('totalDevido').innerText = 'Total devido: R$' + (total_devido()<0?
        0:total_devido()) + ',00';
        payInfo.valorPagamento = total_devido()<0?
        0:total_devido();
        if(payInfo.status = 'V') payInfo.status = 'I'
        console.log(payInfo.valorPagamento)
    } 
    displayInfo();

    const payBtn = document.createElement('button');
    payBtn.id = 'payBtn';
    payBtn.innerText = 'PAGAR $';
    document.getElementById('clientInfo').appendChild(payBtn);
    payBtn.onclick = finalizar_pagamento
    const chavePix = document.createElement('h1');
    chavePix.innerText = 'Nossa chave PIX: ' 
    + Math.floor(Math.random()*89 + 10) + '.' + Math.floor(Math.random()*899 + 100)+ '.' + Math.floor(Math.random()*899 + 100) + '/0001' + '-' +Math.floor(Math.random()*89 + 10)   ;
    document.getElementById('clientInfo').appendChild(chavePix);
    chavePix.style.fontSize = '12px';
    chavePix.style.width = '600px';
}

 

function finalizar_pagamento(){
    localStorage.setItem('payInfo',payInfo)
    document.getElementById('clock').style.visibility = 'hidden'
    document.getElementById('clientInfo').innerText = 'Pagamento finalizado!';
  
    const nextPage = document.createElement('a');
    nextPage.href = '../saida/saida.html';
    const nextPageFrame = document.createElement('div');  
    nextPage.appendChild(nextPageFrame);
    const nextPageArrow = document.createElement('div');
    nextPageArrow.classList = 'nextPageArrow';
    nextPageFrame.classList = 'nextPageFrame';
    document.body.append(nextPage);
    nextPageFrame.appendChild(nextPageArrow);
    payInfo.status = 'V'
    payInfo = JSON.stringify(payInfo);
    localStorage.setItem('pagamento',payInfo);
}

tabela_de_preços();
terminal();
