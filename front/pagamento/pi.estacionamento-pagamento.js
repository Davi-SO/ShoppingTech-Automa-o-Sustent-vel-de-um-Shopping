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
        onclick: ()=>alert('IN CONSTRUCTION')});

    Object.assign(pixBtn, {disabled:'true' , classList:'pixBtn' , innerText: 'Pix'});

    Object.assign(startBtn,{
        classList: 'startBtn',
        innerText: 'Iniciar pagamento',
        onclick: () => {
                document.getElementById('dinheiroBtn').style.visibility ='visible';
                document.getElementById('pixBtn').style.visibility ='visible';
                document.getElementById('startBtn').style.visibility ='hidden';
                let selectionHeader = document.createElement('h1');
                Object.assign(selectionHeader,
                    {innerText:'Selecione o modo de pagamento',classList : 'selectionHeader'})
                document.getElementById('telaDePagamento').appendChild(selectionHeader);
            }
    })

}
tabela_de_preços();
terminal();
