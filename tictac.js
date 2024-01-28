let playerText = document.getElementById('playerText')
let restartbtn = document.getElementById('restarbtn')
 let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winner-blocks')

 const O_Text = "O"
 const X_Text = "X"
 let currentplayer = X_Text
 let spaces = Array(9).fill(null)

 const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
 }
  function boxClicked(e){
    const id = e.target.id

    if(playerHasWon() !== false || isDraw()){
        return;
    }

    if(!spaces[id]){
        spaces[id] = currentplayer
        e.target.innerText = currentplayer

        if(playerHasWon() !== false){
            playerText.innerHTML = `${currentplayer} has won!`;
            let winning_blocks = playerHasWon()

            winning_blocks.map(box => boxes[box].style.backgroundColor=winnerIndicator)

         } else if(isDraw()){
            playerText.innerText = 'It is a Draw!'
         }

        currentplayer = currentplayer == X_Text ? O_Text : X_Text
    }

  }

  function isDraw(){
    return spaces.every(space => space !== null)
  }

  const winningcombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  function playerHasWon(){
    for (const conditon of winningcombo) {
        let[a,b,c] = conditon
        
        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){
            return [a,b,c] 
        }
    }
    return false
  }

  restartbtn.addEventListener('click', restart)

  function restart(){
    spaces.fill(null)

    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })
    playerText.innerHTML = 'Tic Tac Toe'

    currentplayer = X_Text
  }


  startGame()