const gameinf = document.querySelector('.header');
const boxes = document.querySelectorAll('.box')
const newgame = document.querySelector('.end'); 

let currentPlayer ;
let currentGrid;
const winningOption= [
    [0,1,2],
    [0,3,6],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
]
 
function start (){
    currentGrid = ['','','','','','','','','']
    boxes.forEach((box,index)=>{
        box.innerText = '';
        boxes[index].style.pointerEvents='all'
        boxes[index].style.backgroundColor=''


    })

    currentPlayer = 'x';
    gameinf.innerHTML = `the current player is : ${currentPlayer}`
    newgame.classList.remove('active');


}
start()
function gameover() {
    let playerMoves = [];

    // Step 1: Collect all the indexes where currentPlayer has played
    for (let i = 0; i < currentGrid.length; i++) {
        if (currentGrid[i] === currentPlayer) {
            playerMoves.push(i);
        }
    }

    // Step 2: Check if any winning combination is fully inside playerMoves
    for (let i = 0; i < winningOption.length; i++) {
        let winningCombo = winningOption[i];

        // Check if all 3 positions in the winningCombo are present in playerMoves
        let isWin = true;
        for (let j = 0; j < winningCombo.length; j++) {
            if (!playerMoves.includes(winningCombo[j])) {
                isWin = false;
                break;
            }
        }

        // Step 3: If win found, highlight winning boxes and show new game button
        if (isWin) {
            for (let j = 0; j < winningCombo.length; j++) {
                let winningIndex = winningCombo[j];
                boxes[winningIndex].style.backgroundColor = 'green';
                boxes.forEach((box,index) => {
                    boxes[index].style.pointerEvents = 'none'
                })
            }

            newgame.classList.add('active');
            break; // no need to check further once win is found
        }
    }
}

function swapup(){
    if (currentPlayer === 'x') {
        currentPlayer ='0'
        
    }
    else{
        currentPlayer = 'x'
    }
    gameinf.innerHTML = `the current player is : ${currentPlayer}`
}

function handleClick(index){
    if (currentGrid[index] === '') {
        currentGrid[index] = currentPlayer
        boxes[index].innerHTML = currentPlayer
        boxes[index].style.pointerEvents='none'
        gameover()
        swapup()
        
    }
}
boxes.forEach((box,index)=>{
    box.addEventListener('click',function(){
        handleClick(index)
    })


})
newgame.addEventListener('click',start)
