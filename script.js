let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector("#reset-game");
let newGameBtn = document.querySelector("#new-game");
let winningMessage = document.querySelector("#message");
let msgContainer = document.querySelector(".message-container");


let winnPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let turnO = true;  // turn0 = true means Player 0's turn, turn0 = false means Player X's turn
let gotWinner = false;
let totalMoves = 0;

boxes.forEach(box => {
    box.addEventListener('click', () => {
        if(!gotWinner){
            if(turnO){
                box.innerText = "O";
                turnO = false;
            }else{
                box.innerText = "X";
                turnO = true;
            }
            totalMoves += 1;
        }
        box.disabled = true;
        
        // Check for winning condition

        checkWiner();
        if(!gotWinner && totalMoves === 9){
            drawMessage();
        }
    })
})

let checkWiner = () => {
    for(let pattern of winnPatterns){
        let box1Value = boxes[pattern[0]].innerText;
        let box2Value = boxes[pattern[1]].innerText;
        let box3Value = boxes[pattern[2]].innerText;

        if(box1Value != "" && box2Value != "" && box3Value != ""){

            if(box1Value === box2Value && box2Value === box3Value){
                gotWinner = true;
                showWinner(box1Value);
                
            }
        }
    }
}

let drawMessage = () => {
    winningMessage.innerText = `It's a Draw!`;
    msgContainer.classList.remove('hidden');
}

let showWinner = (winner) => {
    winningMessage.innerText = `Player "${winner}" has won the game!`;
    msgContainer.classList.remove('hidden');
}

let resetGame = () => {
    gotWinner = false;
    msgContainer.classList.add('hidden');
    turnO = true;
    totalMoves = 0;
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    })
}

resetBtn.addEventListener('click', resetGame);
newGameBtn.addEventListener('click', resetGame);