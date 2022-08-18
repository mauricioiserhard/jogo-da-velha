// Dados iniciais
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let player = '';

let warning = '';

let playing = false;

reset();

//eventos
  
document.querySelector('.reset').addEventListener('click', reset);

document.querySelectorAll('.item').forEach(item =>{
    item.addEventListener('click', itemClick);
});


// FUNÇÕES
    // Sabendo qual foi clicado.
    function itemClick(event) {
        let item = event.target.getAttribute('data-item');
        if(playing && square[item] === '') { 
            square[item] = player; 
            renderSquare(); // Mostrando na tela.
            togglePlayer();
        }
    };


    function reset() {
        warning = ''; // limpa o warning.

        let random = Math.floor(Math.random() * 2); 
        player = (random === 0) ? 'x' : 'o'; // If/else simplificado.
       
        // Pra zerar tabuleiro, percorre cada item, e deixa eles sem nada. 
        for(let i in square) {
            square[i] = '';
        }

        playing = true; // reseta o jogo.

        renderSquare();
        renderInfo();
    };

    function renderSquare() {
        for(let i in square) {
            let item = document.querySelector(`div[data-item=${i}]`); 
            item.innerHTML = square[i]; 
        }

        checkGame();
    };

    // Vai pegar as duas variaveis (player e warning) e colocar no HTML. 
    function renderInfo() {
        document.querySelector('.vez').innerHTML = player; // vez
        document.querySelector('.resultado').innerHTML = warning; // resultado
    };

    // Alternar jogadores.
    function togglePlayer() {
        player = (player === 'x') ? 'o' : 'x';
        renderInfo(); // Mostra o novo player.
    };

    // Verifica quem ganhou ou empate. 
    function checkGame() {
        if(checkWinnerFor('x')) {
            warning = 'O "x" venceu'; 
            playing = false; // Para o jogo.  
        } else if(checkWinnerFor('o')) {
            warning = 'O "o" venceu';
            playing = false;
        } else if(isFull()) {
            warning = 'Deu empate';
            playing = false;
        }
    };

    //possibilidades de ganhar. 
    function checkWinnerFor(player) {
        let posibilities = [ 
            'a1,a2,a3',
            'b1,b2,b3',
            'c1,c2,c3',

            'a1,b1,c1',
            'a2,b2,c2',
            'a3,b3,c3',

            'a1,b2,c3',
            'a3,b2,c1'
        ];

        for(let w in posibilities) {
            let pArray = posibilities[w].split(','); 
            /*pArray.every((option)=>{ 
                if(square[option] === player){ 
                    return true;
                } else {
                    return false;
                }
            }) */
            let hasWon = pArray.every(option => square[option] === player); // simplificado do de cima.
            if(hasWon) {
                return true;
            }
        }

        return false; // Se passar for e nao achar vencedor. 
    };


    // Checando empate.
        function isFull() {
            for(let i in square) {  //loop no square, se todos tao preenchidos empatou.
                if(square[i] === '') {
                    return false;
                }
            }
            return true;
        }