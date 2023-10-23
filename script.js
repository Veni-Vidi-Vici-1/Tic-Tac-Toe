// Game variables
let XorO
let againstWho
let hasFinished = false
let trackBoard = [0,1,2,3,4,5,6,7,8]
let winner

// Game Parameters
const xbox = document.querySelector(".xbox")
const obox = document.querySelector(".obox")
const player = document.querySelector(".player")
const computer = document.querySelector(".computer")

// Game Boxes
const body = document.querySelector("body")
const options = document.querySelector(".options")
const gameBoard = document.querySelector(".gameBoard")

function chooseGameParams() {

xbox.addEventListener("click",() => {

XorO = "X"

xbox.style.backgroundColor = "orangered"
obox.style.backgroundColor = ""
gotoPlayGame()

})

obox.addEventListener("click",() => {

XorO = "O"

obox.style.backgroundColor = "orangered"
xbox.style.backgroundColor = ""
gotoPlayGame()

})

player.addEventListener("click",() => {

againstWho = "Player"
player.style.backgroundColor = "darkblue"
computer.style.backgroundColor = ""
gotoPlayGame()

})

computer.addEventListener("click",() => {

againstWho = "Computer"
computer.style.backgroundColor = "darkblue"
player.style.backgroundColor = ""
gotoPlayGame()


})

}

function gotoPlayGame() {

if (againstWho != null && XorO != null) {

options.style.display = "none"
gameBoard.classList.remove("hidden")
playGame()
}
}

function playGame() {

for (let i = 0; i < 9; i ++) {

const Square = document.createElement("div")
Square.classList.add("square")
gameBoard.append(Square)
Square.addEventListener("click",() => {
makeMove(Square,i)

})
}
}

function makeMove(el,index) {

const squares = document.querySelectorAll(".square")
const squaresArray = Array.from(squares)

if (againstWho === "Player" && el.innerHTML === "" && hasFinished === false) {

el.innerHTML = XorO
trackXandO[index] = XorO
checkWinner()
changeXorO(el)

} else if (againstWho === "Computer" && el.innerHTML === "" & hasFinished === false) {
//console.log(index)
el.innerHTML = XorO
trackXandO[index] = XorO
checkWinner()
changeXorO(el)
trackBoard = trackBoard.filter((item) => {

return item !== index

})
const random = Math.floor(Math.random() * trackBoard.length)
const randomBox = trackBoard[random]
squaresArray[randomBox].innerHTML = XorO
trackXandO[randomBox] = XorO
changeXorO(squaresArray[randomBox])
checkWinner()
trackBoard = trackBoard.filter((item) => {

return item !== randomBox

})
console.log(trackBoard)

}  else if (el.innerHTML != "") {

showMessage("This tile have already been chosen!!!!")

}
}

let trackXandO = ["","","","","","","","",""]

const win = [

[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6],

]

function checkWinner() {

for (let i = 0; i < win.length; i ++) {

let winArray = win[i]

const cellA = trackXandO[winArray[0]]
const cellB = trackXandO[winArray[1]]
const cellC = trackXandO[winArray[2]]

if (cellA == cellB && cellB == cellC && cellA != "") {

hasFinished = true
winner = cellA
break

}}

if (hasFinished && winner != null) {

showMessage(`Game Has Finished.!!! ${winner} Has Won the Game`)
makebutton()

} else if (!trackXandO.includes("") && winner == null) {

showMessage("Game Has Finished.!!! It is a tie.")
makebutton()

}

}

function changeXorO(el) {

if (XorO === "X") {

XorO = "O"
el.style.color = "orangered"

} else {

XorO = "X"
el.style.color = "darkblue"

}
}

function showMessage(message) {

const divTag = document.createElement("div")
const pTag = document.createElement("p")
pTag.innerHTML = message
divTag.classList.add("message")
divTag.append(pTag)
body.append(divTag)
setTimeout(() => {divTag.remove()},2000)
}

function makebutton() {

const refreshButton = document.createElement("button")
refreshButton.classList.add("refresh")
refreshButton.innerHTML = "Refresh"
body.append(refreshButton)
refreshButton.addEventListener("click",() => {
location.reload()

})
}

document.addEventListener("DOMContentLoaded",() => chooseGameParams())