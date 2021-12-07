const payInfo = JSON.parse(localStorage.getItem('pagamento'));
console.log(payInfo)
function display_totem() {
    const totemCancela = document.createElement('div');
    totemCancela.classList = 'cancelaFechada';
    totemCancela.id = 'cancela';
    totemCancela.style.marginLeft = '-200px';
    totemCancela.style.width = '600px';
    document.body.appendChild(totemCancela);

    const totemHead = document.createElement('div');
    totemHead.classList = 'totemHead';
    totemHead.id = 'totemHead';

    const totemBody = document.createElement('div');
    totemBody.classList = 'totemBody'
    totemBody.id = 'totemBody'
    totemBody.style.marginLeft = '-200px'
    document.body.appendChild(totemBody);
    totemBody.appendChild(totemHead)

    const totemFlag = document.createElement('div');
    totemFlag.classList = 'totemFlag';
    totemFlag.id = 'totemFlag';
    totemHead.appendChild(totemFlag);

    const totemBoca = document.createElement('div');
    totemBoca.classList = 'totemBoca';
    totemBoca.id = 'totemBoca';
    totemBody.appendChild(totemBoca);
    display_mini_ticket()


}

function display_mini_ticket() {
    const miniTicket = document.createElement('p');
    miniTicket.classList = 'miniTicket';
    miniTicket.id = 'miniTicket';
    miniTicket.innerHTML = "~~~~\n~~~~";
    miniTicket.onclick = 
    function (){
        if(payInfo.status == 'I'){
            alert('Pagamento inválido!')
            return
        }
        miniTicket.style.height = '0px'
        miniTicket.innerHTML = '' 
        miniTicket.style.visibility = 'hidden'
        document.getElementById('cancela').classList = 'cancelaAberta'
        document.getElementById('volteSempre').innerText= 'V O L T E  S E M P R E'
        const nextPage = document.createElement('a');
        nextPage.href = "../root/index.html";
        const nextPageFrame = document.createElement('div');
        
        nextPage.appendChild(nextPageFrame);
        const nextPageArrow = document.createElement('div');
        nextPageArrow.classList = 'nextPageArrow';
        nextPageFrame.classList = 'nextPageFrame';
        document.body.appendChild(nextPage);
        nextPageFrame.appendChild(nextPageArrow);
        

    };
    document.getElementById('totemBoca').appendChild(miniTicket);
    const p = document.createElement('p');
    p.innerText = 'Insira o ticket';
    p.style.paddingTop = '60px';
    p.style.textAlign = 'center'
    document.getElementById('totemHead').appendChild(p)
}

function volte_sempre(){
    const sign = document.createElement('div')
    sign.id = 'volteSempre'
    document.body.appendChild(sign)
}
display_totem()
volte_sempre()
