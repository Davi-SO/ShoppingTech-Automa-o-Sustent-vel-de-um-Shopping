class TabelaPreços  {
    constructor(){
        this.preços = {
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
        
        this.tabela = document.createElement('div');
        this.tabela.classList = 'tabela';
        this.preços.div.classList = 'preços';
        this.preços.div.innerText = 'PREÇOS';
        const line = document.createElement('p')
        line.innerText += `Obs: Até 15 min - Sem pagamento`;
        this.preços.div.appendChild(line)
        for(let i=0;i<9;i++){
            if (this.preços[i]&&i){
                const line = document.createElement('p')
                line.innerText += `Até ${i}h - ${this.preços[i]}`;
                this.preços.div.appendChild(line)
            }
        }
        const maxVal = document.createElement('p');
        maxVal.innerText = 'Acima de 8h - R$50,00';
        this.preços.div.appendChild(maxVal);

        document.body.appendChild(this.tabela);
        this.tabela.appendChild(this.preços.div)

    }
    
    total_devido = function (ticket) {
        let tempo = (Math.floor(Date.now()) - Math.floor(ticket.horaEntrada.getTime())) / 60000;
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

class TerminalDePagamento{
    constructor(){
        this.tela = document.createElement('div');
        this.tela.classList = 'telaDePagamento';
        this.tela.id = 'telaDePagamento';
        document.body.appendChild(this.tela);


        this.dinheiroBtn = document.createElement('button');
        this.dinheiroBtn.classList = 'dinheiroBtn';
        this.dinheiroBtn.id = 'dinheiroBtn';
        this.dinheiroBtn.onclick =()=>alert('IN CONSTRUCTION') ;
        this.dinheiroBtn.innerText = 'Dinheiro';
        this.tela.appendChild(this.dinheiroBtn)
        
        
        this.creditoBtn = document.createElement('button');
        this.creditoBtn.disabled = 'true';
        this.creditoBtn.classList = 'creditoBtn';
        this.creditoBtn.id = 'creditoBtn';
        this.creditoBtn.innerText = 'Crédito';
        this.tela.appendChild(this.creditoBtn)

        this.debitoBtn = document.createElement('button');
        this.debitoBtn.disabled = 'true';
        this.debitoBtn.classList = 'debitoBtn';
        this.debitoBtn.id = 'debitoBtn';
        this.debitoBtn.innerText = 'Débito';
        this.tela.appendChild(this.debitoBtn)

        this.startBtn = document.createElement('button');
        this.startBtn.classList = 'startBtn';
        this.startBtn.id = 'startBtn';
        this.tela.appendChild(this.startBtn)
        this.startBtn.innerText = 'Iniciar pagamento'
        this.startBtn.onclick =
            function(){
                document.getElementById('dinheiroBtn').style.visibility ='visible';
                document.getElementById('creditoBtn').style.visibility ='visible';
                document.getElementById('debitoBtn').style.visibility ='visible';
                document.getElementById('startBtn').style.visibility ='hidden';
                const selectionHeader = document.createElement('h1');
                selectionHeader.innerText = 'Selecione o modo de pagamento';
                selectionHeader.classList = 'selectionHeader';
                document.getElementById('telaDePagamento').appendChild(selectionHeader);
            }

    }
}
const tabelaPreços = new TabelaPreços;
const telaDePagamento = new TerminalDePagamento;