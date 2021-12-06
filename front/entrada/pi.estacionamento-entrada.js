function  bar_code_generator(){
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

function display_ticket(ticket) {
    const backgroundShade = document.createElement('div')
    backgroundShade.classList = 'backgroundShade';
    backgroundShade.id = 'backgroundShade';
    document.body.appendChild(backgroundShade);
    
    const divTicket = document.createElement('div');
    divTicket.id = 'ticket';
    divTicket.classList = 'ticket';
    
    const nomeEstacionamento = document.createElement('h1')
    nomeEstacionamento.id = 'nomeEstacionamento';
    nomeEstacionamento.innerText = 'Shopping Amélia';

    const veiculoSprite = document.createElement('img')
    veiculoSprite.classList  = 'VSprite';
    veiculoSprite.src = `assets/${ticket.tipoVeiculo}Sprite.png`;
    
    const infoCliente = document.createElement('p');
    infoCliente.id = 'infoCliente';
    infoCliente.innerText = 
    `
    Seu código: ${ticket.codigoTicket}\n
    ${ticket.data_br(ticket.horaEntrada.toDateString())} ${ticket.horaEntrada.toTimeString().slice(0,8)}\n
    `
    const bemVindo = document.createElement('h2');
    bemVindo.innerText = "Bem-Vindo!";
    bemVindo.id = 'bemVindo';

    if (ticket.vagaPreferencial){
        const faixaVagaPreferencial = document.createElement('div');
        faixaVagaPreferencial.classList = 'faixaVagaPreferencial';
        faixaVagaPreferencial.innerText = 'PREFERENCIAL';
        divTicket.appendChild(faixaVagaPreferencial);
    }

    const codigoDeBarra = bar_code_generator();

    document.body.appendChild(divTicket)
    let properties = [nomeEstacionamento,veiculoSprite,infoCliente,bemVindo,codigoDeBarra].forEach(
        e => {
            console.log(e)
            divTicket.append(e)});

    //nextPage
    const nextPage = document.createElement('a');
    nextPage.href = "../pagamento/pagamento.html";
    const nextPageFrame = document.createElement('div');
    
    nextPage.appendChild(nextPageFrame);
    const nextPageArrow = document.createElement('div');
    nextPageArrow.classList = 'nextPageArrow';
    nextPageFrame.classList = 'nextPageFrame';
    divTicket.append(nextPage);
    nextPageFrame.appendChild(nextPageArrow);


}
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
function display_totem() {
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

    const totemBtn = document.createElement('button');
    totemBtn.onclick = display_mini_ticket
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

function display_mini_ticket() {
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
        let myTicket = tkt();
        display_ticket(myTicket)
        myTicket = JSON.stringify(myTicket);
        localStorage.setItem("ticket",myTicket)

    };
    document.getElementById('totemBoca').appendChild(miniTicket);
}


display_totem();