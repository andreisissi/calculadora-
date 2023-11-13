const visor = document.querySelector('#visor');
const historicoCalc = document.querySelector('#historico');

let display = '';
let historico = [];
let result = '';

/* Funcionalidade Dark/Light mode */ 
function toggleMode() {
    const html = document.documentElement
    const mode = html.classList.toggle('light')

    if(mode) {
        localStorage.setItem('lightMode', JSON.stringify(mode))
    }
}

function btnMode() {
    const modeBtn = localStorage.getItem('lightMode')

    if (modeBtn) {
        const isLightMode = JSON.parse(modeBtn);

        const html = document.documentElement;
        if (isLightMode) {
            html.classList.add('light');
        } else {
            html.classList.remove('light');
        }
    }
}
btnMode()

/* Função para fazer os números aparecerem no visor e limpa visor quando terminar uma operação */
function number(num) {
    if(result !== '') {
        display = num;
        result = '';
    } else {
        let numero = '';
        display += num + numero;
    }
    atualizaDisplay();
};

/* Funcionalidade do botão Clean */
function clean(){
    visor.innerHTML = '';
    if(display !== '') {
        return display = '';
    }
}

/* Função de funcionalidade das operações */
function operacao(op) {
    display += op;
    atualizaDisplay()
 }

 /* Função de funcionalidade do botão igual que já adiciona o resultado no histórico */
 function resultado() {
    if(display !== '') {
    result = eval(display);
    const operation = display;
    

    let data = new Date();
    let dia = data.getDate();
    let mes = data.getMonth();
    let ano = data.getFullYear().toString();
    let ano_digito = ano.slice(-2);
    let hora = data.getHours();
    let min = data.getMinutes();

    historico.push({ 
        operation: operation,
        result: result,
        date: `${hora}:${min} - ${dia}/${mes}/${ano_digito}`,
    });

    if(historico.length > 4){
        historico.shift();
    }
    
    display = result;
    atualizaDisplay()
    atualizaHistorico()
    }
 };

 /* Atualiza o visor (limite de caracteres)*/
 function atualizaDisplay() {
    if(display.length > 14) {
        display = display.substring(0, 14)
    }
    visor.innerHTML = display;
 }

 /* Atualiza o histórico */
 function atualizaHistorico() {
    historicoCalc.innerHTML = '';

    for (const item of historico) {  

        const historicoItem = document.createElement('div');
        historicoItem.classList.add('historico-item');
        historicoItem.setAttribute('title', 'visualizar operação no visor')
        
        const dataHora = document.createElement('p');
        dataHora.classList.add('data_time');
        dataHora.textContent = `${item.date}`

        const opResultado = document.createElement('p');
        opResultado.classList.add('resultado');
        opResultado.textContent = `${item.operation} = ${item.result}`;

        historicoItem.appendChild(dataHora);
        historicoItem.appendChild(opResultado);

        historicoItem.addEventListener('click', function() {
            display = item.operation;
            atualizaDisplay();

        });

        historicoCalc.appendChild(historicoItem);

        if(historicoCalc) {
            localStorage.setItem('historico', JSON.stringify(historico))
        }
    }
 }

 function loadHistory() {

    const save = localStorage.getItem('historico')
    if(save) {
        historico = JSON.parse(save);
        atualizaHistorico()
    }
 }
 loadHistory();