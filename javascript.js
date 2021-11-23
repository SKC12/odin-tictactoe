const boardHTML = document.getElementById("board");

const gameboard = (() => {
    let boardState = ["", "", "", "", "", "", "", "", ""];
    const makeMove = (square, move) => {
        boardState[square-1]=move;
        updateBoard();        
    };
    const updateBoard = () => {
        let square = boardHTML.children;
        for (let i = 0; i < square.length; i++){
            square[i].textContent = boardState[i];
        };
    };

    const freezeBoard = () => {
        let square = boardHTML.children;
        for (let i = 0; i < square.length; i++){
            square[i].removeEventListener("click", gameLogic.handleClick);
        };
    }

    const initBoard = () => {
        boardState = ["", "", "", "", "", "", "", "", ""];

        while(boardHTML.firstChild){
            boardHTML.removeChild(boardHTML.lastChild);
        }

        for (let i = 0; i < 9; i++){
            let squareHTML = document.createElement("div");
            squareHTML.id = `${i+1}`;
            squareHTML.classList.add('game-square');
            squareHTML.textContent="";

            squareHTML.addEventListener("click", gameLogic.handleClick);
            boardHTML.appendChild(squareHTML);
        }
    }

    const checkWin = () => {
        if(boardState[0]==boardState[1] && boardState[0]==boardState[2] && boardState[0]!=""){
            return boardState[0];
        } else if(boardState[3]==boardState[4] && boardState[3]==boardState[5] && boardState[3]!="") {
            return boardState[3];
        } else if(boardState[6]==boardState[7] && boardState[6]==boardState[8] && boardState[6]!="") {
            return boardState[6];
        }else if(boardState[0]==boardState[3] && boardState[0]==boardState[6] && boardState[0]!="") {
            return boardState[0];
        }else if(boardState[1]==boardState[4] && boardState[1]==boardState[7] && boardState[1]!="") {
            return boardState[1];
        }else if(boardState[2]==boardState[5] && boardState[2]==boardState[8] && boardState[2]!="") {
            return boardState[2];
        }else if(boardState[0]==boardState[4] && boardState[0]==boardState[8] && boardState[0]!="") {
            return boardState[0];
        }else if(boardState[2]==boardState[4] && boardState[2]==boardState[6] && boardState[2]!="") {
            return boardState[2];
        } else {
            return false;
        }
    }

    const checkDraw = () => {
        if (boardState.includes("")){
            return false;
        } else return true;
    }


    return {
        makeMove,
        updateBoard,
        initBoard,
        checkWin,
        checkDraw,
        freezeBoard,
    }

})();

const gameLogic = (() =>{
    let currentTurn = "X";

    const handleClick = (e) => {
        //console.log(e.target.id);
        if(e.target.textContent==""){
            gameboard.makeMove(e.target.id, currentTurn);
        (currentTurn == "X") ? newTurn("O") : newTurn("X");
        checkGameState();
        }        
    }

    function newTurn(player) {
        currentTurn = player;
        displayController.updateTurn(player);

    }

    const resetGameLogic = () => {currentTurn = "X"};

    const checkGameState = () => {
        let result = gameboard.checkWin()
        if(result){
            displayController.endGame(result)
            gameboard.freezeBoard();
        } else if(gameboard.checkDraw()){
            displayController.endGame("draw")
        }   
    }

    return {
        handleClick,
        resetGameLogic,
    }

})();

const displayController = (() => {
    let p1Display = document.getElementById("player-name-1");
    let p2Display = document.getElementById("player-name-2");

    let announcer = document.getElementById("announcer");

    let p1Name = p1Display.value;
    let p2Name = p2Display.value;

    const updateTurn = (player) => {
        if (player=="X"){
            announcer.innerText = `It is ${document.getElementById("player-name-1").value}'s turn to play!`
        } else {
            announcer.innerText = `It is ${document.getElementById("player-name-2").value}'s turn to play!`
        }
    }

    const endGame = (end) => {
        if (end=="X"){
            announcer.innerText = `${document.getElementById("player-name-1").value} won! Congratulations!`

        } else if (end=="O"){
            announcer.innerText = `${document.getElementById("player-name-1").value}won! Congratulations!`
        } else if (end="draw"){
            announcer.innerText = "It's a draw!"
        }
    }

    const resetDisplayController = () => {
        p1Display.value = "Player 1"
        p2Display.value = "Player 2"

        announcer.innerText = "You may choose your player names. Click on a square to start playing."
    }

    return {
        resetDisplayController,
        updateTurn,
        endGame,
    }


})();

function init() {
    gameboard.initBoard();
    gameLogic.resetGameLogic();
    displayController.resetDisplayController();
}



init()



function testBoard(){
    for (let i = 0; i < 9; i++){
        if(i%2==0){
            gameboard.makeMove(i+1, "X"); 
        } else {
            gameboard.makeMove(i+1, "O");
        }
    }
}

