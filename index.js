const playBtn = document.getElementById("playButton")
const gamebox = document.getElementById("gameContainer")
const player1 = document.getElementById("player1")
const player2 = document.getElementById("player2")
const box = document.querySelectorAll(".cell")
const resetgame = document.getElementById("restartButton")
const playerX = document.getElementById("playerXScore")
const playerO = document.getElementById("playerOScore");
const creatspan1 = document.createElement("span")
const creatspan2 = document.createElement("span")
let current_player
 let player1_count = 0;
 let player2_count = 0;


// To Start Game
const startGame = () => {
    playBtn.classList.add("hidden")
    gamebox.classList.remove('hidden')
    current_player = witchplyerturn()
    ScoreBorad()
    // console.log(current_player);
}
playBtn.addEventListener("click", startGame) // Start Game 


const witchplyerturn = () => { // Choose witch player Turn
    const randomnumber = Math.floor(Math.random() * 2) + 1
    //const player1 = document.getElementById("player1")
    //const player2 = document.getElementById("player2")

    if (randomnumber == 1) {
        player1.style.color = "#00FFFF"
    } else {
        player2.style.color = "#ff69b4"
    }
    // console.log(randomnumber);
    return randomnumber
}

// This is for click on the box to add 'X' Or 'O' 
box.forEach((item) => {
    item.addEventListener("click", (e) => {
        if (item === e.currentTarget) {
            if (item.innerHTML !== "") return;
            if (current_player == 2) {
                current_player = 1
                player1.style.color = "#00FFFF"
                player2.style.color = "#e3e3e3"
                item.innerHTML = "X"

                //console.log("player1",current_player);
            } else {
                current_player = 2
                player2.style.color = "#ff69b4"
                player1.style.color = "#e3e3e3"
                item.innerHTML = "O"
                //console.log("player2",current_player);

            }
            //console.log("Target match");
        }
        checkwiner()
    })
    // console.log(item);
})


//// This for to check winner
const checkwiner = () => {
    const winningPatterns = [
        [0, 1, 2], // Row 1
        [3, 4, 5], // Row 2
        [6, 7, 8], // Row 3
        [0, 3, 6], // Column 1
        [1, 4, 7], // Column 2
        [2, 5, 8], // Column 3
        [0, 4, 8], // Diagonal 1
        [2, 4, 6], // Diagonal 2
    ];

    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;
        const val1 = box[a].innerHTML;
        const val2 = box[b].innerHTML;
        const val3 = box[c].innerHTML;

        if (val1 !== "" && val1 === val2 && val2 === val3) {
            box[a].style.background = "#90EE90";
            box[b].style.background = "#90EE90";
            box[c].style.background = "#90EE90";

            if (val1 === "X") {
                player1.innerHTML = "&#127881 Player 1 Winner &#127881"
                player2.innerHTML = "&#128540 Player 2 Looser &#128540"
                player1_count++
                //console.log("PlayerX",player1_count);
                ScoreBorad()
                setTimeout(() => {
                    RestartGame()
                }, 1000);
            } else {
                player2.innerHTML = "&#127881 Player 2 Winner &#127881"
                player1.innerHTML = "&#128540 Player 1 Looser &#128540"
                  player2_count++
                 //console.log("PlayerO",player2_count);
                 ScoreBorad()
                setTimeout(() => {
                    RestartGame()
                }, 1000);
            }

            box.forEach((cell) => (cell.style.pointerEvents = "none"));
            return;
        }
    }

    let allFilled = true;
    box.forEach((cell) => {
        if (cell.innerHTML === "") allFilled = false;
    });

    if (allFilled) {
        player1.innerHTML = "😜Both Are Looser😜"
        player2.innerHTML = "😜Both Are Looser😜"
        setTimeout(() => {
            RestartGame()
        }, 1000);
    }
};


// THis Is For to resstart the game reset boxs and player Turn
const RestartGame = () => {
    box.forEach((cell) => {
        cell.textContent = "";
        cell.style.backgroundColor = "";
        cell.style.pointerEvents = "auto";
    });
    player1.innerHTML = "Player 1's Turn"
    player2.innerHTML = "Player 2's Turn"
    let current_player = witchplyerturn();
    if (current_player == 1) {
        player1.style.color = "#00FFFF"
        player2.style.color = "#e3e3e3"
    } else {
        player2.style.color = "#ff69b4"
        player1.style.color = "#e3e3e3"
    }

}
resetgame.addEventListener("click", RestartGame)


//This is For Update Score of the players 
const ScoreBorad = () => {
    //const creatspan1 = document.createElement("span")
    playerX.append(creatspan1)
    //console.log("PlayerX",player1_count);
    creatspan1.innerHTML=player1_count

    //const creatspan2 = document.createElement("span")
    playerO.append(creatspan2)
    //console.log("PlayerO",player2_count);
    creatspan2.innerHTML=player2_count


}

