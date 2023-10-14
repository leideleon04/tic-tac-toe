

$(document).ready(function () {
    const cells = $('.cell-block');
    const turnIndicator = $('#turn-indicator');
    const restartButton = $('#restart-button');
    const resultMessage = $('#result-message');

    let currentPlayer = 'X';
    let gameBoard = Array(9).fill('');

    cells.click(function () {
        const cell = $(this);
        const cellIndex = cells.index(cell);

        if (gameBoard[cellIndex] === '' && !isGameOver()) {
            gameBoard[cellIndex] = currentPlayer;
            cell.text(currentPlayer);

            if (checkWin()) {
                resultMessage.text(`${currentPlayer} wins!`);
            } else if (checkDraw()) {
                resultMessage.text("It's a draw!");
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                turnIndicator.text(`It's ${currentPlayer}'s turn`);
            }
        }

        
        $('#restart-button').click(function () {
            currentPlayer = 'X';
            gameBoard = Array(9).fill('');
            cells.text(''); 
            resultMessage.text(''); 
            updateTurnIndicator(); 
});

    });

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6] 
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
        });
    }

    function checkDraw() {
        return gameBoard.every(cell => cell !== '');
    }

    function isGameOver() {
        return checkWin() || checkDraw();
    }

    function updateTurnIndicator() {
        const turnIndicator = $('#turn-indicator');
        const currentPlayer = getCurrentPlayer();
        turnIndicator.text(`It's ${currentPlayer}'s turn`);
        turnIndicator.removeClass('alert-primary alert-success');
        turnIndicator.addClass(currentPlayer === 'X' ? 'alert-primary' : 'alert-success'); 
    }
    
    
    if (checkWin()) {
        resultMessage.text(`${currentPlayer} wins!`);
        $('#turn-indicator').removeClass('alert-primary alert-success'); 
    } else if (checkDraw()) {
        resultMessage.text("It's a draw!");
        $('#turn-indicator').removeClass('alert-primary alert-success'); 
    } else {
        updateTurnIndicator(); 
    }

    restartButton.click(function () {
        gameBoard.fill('');
        cells.text('');
        currentPlayer = 'X';
        turnIndicator.text(`It's ${currentPlayer}'s turn`);
        resultMessage.text('');
    });
});
