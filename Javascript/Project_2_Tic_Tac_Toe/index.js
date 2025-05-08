const Gameboard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
    
    const getBoard = () => board;

    const reset = () => {
        board = ['', '', '', '', '', '', '', '', ''];
    };

    const setMark = (index, mark) => {
        if(board[index] === ''){
            board[index] = mark;
            return true;
        }
        return false;
    };

    const checkWinner = () =>{
        const win = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];

        for(let [a,b,c] of win){
            if(board[a] === board[b] && board[b] === board[c] && board[a] === board[c]){
                return board[a];
            }
        }
        return board.includes("") ? null : 'tie';
    };

    return { getBoard, setMark, reset, checkWinner };
})();

const Player = (playerName,marker) => ({playerName, marker});

const GameController = (() => {
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");

    let currentPlayer = player1;
    let gameOver = false;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const getCurrentPlayer = () => currentPlayer;

    const resetGame = () => {
        Gameboard.reset();

        currentPlayer = player1;

        gameOver = false;

        DisplayController.render();
        DisplayController.setMessage(`${currentPlayer.playerName}'s turn.`);
    };

    const playRound = (index) => {
        if(gameOver || !Gameboard.setMark(index, currentPlayer.marker)) return;

        DisplayController.render();

        const winner = Gameboard.checkWinner();

        if(winner === 'tie'){
            DisplayController.setMessage("It's a Tie");
            gameOver = true;
        } else if(winner){
            DisplayController.setMessage(`${currentPlayer.playerName} wins!`);
            gameOver = true;
        } else{
            switchPlayer();
            DisplayController.setMessage(`${currentPlayer.playerName}'s turn.`)
        }
    };

    return { playRound, resetGame, getCurrentPlayer };


})();

const DisplayController = (() => {
    const boardDiv = document.getElementById("board");
    const messageDiv = document.getElementById("message");
    const restartButton = document.getElementById("restart");

    const render = () => {
        boardDiv.innerHTML = '';

        Gameboard.getBoard().forEach((mark,index) => {
            const square = document.createElement("div");

            square.classList.add("square");
            square.textContent = mark;
            square.addEventListener("click", () => GameController.playRound(index));
            boardDiv.appendChild(square);
        });
    };

    const setMessage = (message) => {
        messageDiv.textContent = message;
    };

    restartButton.addEventListener("click", GameController.resetGame);

    return { render, setMessage }

})();


GameController.resetGame();