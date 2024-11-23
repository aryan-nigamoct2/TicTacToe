// Variables
let sign = '';
let lineVal = 0;
let isPlay = true;
let sounds = [new Audio("sounds/click.mp3"),
new Audio("sounds/lose.mp3"),
new Audio("sounds/win.mp3")
]
let rows = {
    0: ["cell1", "cell2", "cell3"],
    1: ["cell4", "cell5", "cell6"],
    2: ["cell7", "cell8", "cell9"]
}

let rowsInnerHtml = {
    0: [],
    1: [],
    2: []
}

// Function to toggle the sign
function toggleSign() {
    if (sign == '' || sign == "O") {
        sign = "X"
    }
    else if (sign == "X") {
        sign = "O"
    }
}

// Function to do things after winning
function afterWin() {
    isPlay = false;
    sounds[2].play()
    for (index = 0; index < 3; index++) {
        rows[index].forEach((e) => {
            document.getElementById(e).style.cursor = "";
            document.getElementById(e).classList.remove("hover")
        })
    }
    document.getElementById("turn").innerHTML = `${sign} wins`
}

// Function to show the line animation
function lineAnimation(translate, rotate, state = "row") {
    document.getElementById("line").style.transform = `translate(${translate}) rotate(${rotate})`
    document.getElementById("line").style.visibility = "visible";
    if (state == "row") {
        document.getElementById("line").style.animation = "lineAnimation 1.5s ease-in";
    }
    else if (state == "column") {
        document.getElementById("line").style.height = "100%";
        document.getElementById("line").style.width = "6px";
        document.getElementById("line").style.animation = "lineAnimationCol 1.5s ease-in";
    }
    else if (state == "diagonal") {
        document.getElementById("line").style.transformOrigin = "left";
        document.getElementById("line").style.width = "135%";
        document.getElementById("line").style.animation = "lineAnimationDia 1.5s ease-in";
    }
}

// Function to make line animation repsonsive
function lineResponsive(v1, v2, v3, v4, v5) {
    if (window.innerWidth > 981) {
        lineVal = v1
    }
    if (window.innerWidth <= 981) {
        lineVal = v2
    }
    if (window.innerWidth <= 684) {
        lineVal = v3
    }
    if (window.innerWidth <= 420) {
        lineVal = v4
    }
    if (window.innerWidth <= 292) {
        lineVal = v5
    }
}

// Function to decide the winner
function decideWin() {
    if (rowsInnerHtml[0] != []) {
        Object.keys(rowsInnerHtml).forEach((key) => {
            rowsInnerHtml[key] = []
        })
    }
    for (index = 0; index < 3; index++) {
        rows[index].forEach((row) => {
            rowsInnerHtml[index].push(document.getElementById(row).innerHTML)
        })
    }
    // first row
    if ((rowsInnerHtml[0][0] == "X" && rowsInnerHtml[0][1] == "X" && rowsInnerHtml[0][2] == "X") || (rowsInnerHtml[0][0] == "O" && rowsInnerHtml[0][1] == "O" && rowsInnerHtml[0][2] == "O")) {
        lineResponsive("11.5vh", "9.8vh", "7vh", "5.5vh", "5vh")
        lineAnimation(`0, ${lineVal}`, "0deg")
        afterWin()
    }
    // second row
    else if ((rowsInnerHtml[1][0] == "X" && rowsInnerHtml[1][1] == "X" && rowsInnerHtml[1][2] == "X") || (rowsInnerHtml[1][0] == "O" && rowsInnerHtml[1][1] == "O" && rowsInnerHtml[1][2] == "O")) {
        lineResponsive("37vh", "30vh", "22.5vh", "19.3vh", "18vh")
        lineAnimation(`0, ${lineVal}`, "0deg")
        afterWin()
    }
    // third row
    else if ((rowsInnerHtml[2][0] == "X" && rowsInnerHtml[2][1] == "X" && rowsInnerHtml[2][2] == "X") || (rowsInnerHtml[2][0] == "O" && rowsInnerHtml[2][1] == "O" && rowsInnerHtml[2][2] == "O")) {
        lineResponsive("62vh", "50vh", "37.3vh", "32.3vh", "29.7vh")
        lineAnimation(`0, ${lineVal}`, "0deg")
        afterWin()
    }
    // first column
    else if ((rowsInnerHtml[0][0] == "X" && rowsInnerHtml[1][0] == "X" && rowsInnerHtml[2][0] == "X") || (rowsInnerHtml[0][0] == "O" && rowsInnerHtml[1][0] == "O" && rowsInnerHtml[2][0] == "O")) {
        lineResponsive("11.4vh", "8.6vh", "6.2vh", "5.6vh", "5.2vh")
        lineAnimation(`${lineVal}, 0`, "0deg", "column")
        afterWin()
    }
    // second column
    else if ((rowsInnerHtml[0][1] == "X" && rowsInnerHtml[1][1] == "X" && rowsInnerHtml[2][1] == "X") || (rowsInnerHtml[0][1] == "O" && rowsInnerHtml[1][1] == "O" && rowsInnerHtml[2][1] == "O")) {
        lineResponsive("36.7vh", "29vh", "21.6vh", "18.5vh", "17vh")
        lineAnimation(`${lineVal}, 0`, "0deg", "column")
        afterWin()
    }
    // third column
    else if ((rowsInnerHtml[0][2] == "X" && rowsInnerHtml[1][2] == "X" && rowsInnerHtml[2][2] == "X") || (rowsInnerHtml[0][2] == "O" && rowsInnerHtml[1][2] == "O" && rowsInnerHtml[2][2] == "O")) {
        lineResponsive("62vh", "49.5vh", "37vh", "32vh", "29.5vh")
        lineAnimation(`${lineVal}, 0`, "0deg", "column")
        afterWin()
    }
    // first diagonal
    else if ((rowsInnerHtml[0][0] == "X" && rowsInnerHtml[1][1] == "X" && rowsInnerHtml[2][2] == "X") || (rowsInnerHtml[0][0] == "O" && rowsInnerHtml[1][1] == "O" && rowsInnerHtml[2][2] == "O")) {
        lineAnimation("1vh, 1vh", "45deg", "diagonal")
        afterWin()
    }
    // second diagonal
    else if ((rowsInnerHtml[0][2] == "X" && rowsInnerHtml[1][1] == "X" && rowsInnerHtml[2][0] == "X") || (rowsInnerHtml[0][2] == "O" && rowsInnerHtml[1][1] == "O" && rowsInnerHtml[2][0] == "O")) {
        lineResponsive("75vh", "60vh", "45vh", "39vh", "36vh")
        lineAnimation(`${lineVal}, 0vh`, "135.5deg", "diagonal")
        afterWin()
    }
    else if (rowsInnerHtml[0].includes("") == false && rowsInnerHtml[1].includes("") == false && rowsInnerHtml[2].includes("") == false) {
        isPlay = false;
        document.getElementById("turn").innerHTML = "Draw";
        for (index = 0; index < 3; index++) {
            rows[index].forEach((e) => {
                document.getElementById(e).style.cursor = "";
                document.getElementById(e).classList.remove("hover")
            })
        }
        sounds[1].play();
    }
}

// Main game function
function game() {
    // If the cell is clicked
    Array.from(document.getElementsByClassName("cell")).forEach((item) => {
        item.addEventListener("click", () => {
            if (isPlay && item.innerHTML == '') {
                toggleSign();
                sounds[0].play()
                item.innerHTML = sign;
                document.getElementById("turn").innerHTML = sign == "X" ? "O turn" : "X turn"
                decideWin();
            }
        })
    })
    // reset button
    document.getElementById("reset").addEventListener("click", () => {
        Array.from(document.getElementsByClassName("cell")).forEach((element) => {
            element.innerHTML = '';
        })
        if (!isPlay) {
            for (index = 0; index < 3; index++) {
                rows[index].forEach((e) => {
                    document.getElementById(e).style.cursor = "pointer";
                    document.getElementById(e).classList.add("hover")
                })
            }
        }
        isPlay = true;
        sign = '';
        document.getElementById("turn").innerHTML = "X turn"
        if (document.getElementById("line").style.visibility == "visible") {
            document.getElementById("line").style.visibility = "hidden";
            document.getElementById("line").style.animation = "";
            document.getElementById("line").style.transformOrigin = "";
            document.getElementById("line").style.width = "100%";
            document.getElementById("line").style.height = "6px";
        }
    })
}

// Initialising the game
game()