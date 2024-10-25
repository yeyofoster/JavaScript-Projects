// Implement a simple app where there is a box in center and four buttons on each side. Clicking on each button will move the box to the side button is at. Box should not move beyond limits.
// question: regarding the rectangular gray buttons, are they supposed to be buttons or squares? let's use buttons
// required to click the buttons for the box to move (not hover)
// idea: modify the padding on the pink box
// using flex for the positioning of the buttons?
// GIF Example: https://imgur.com/a/GGaAj

// DOM references.
const squareElement = document.getElementById("square");
const boardElement = document.getElementById("board");

// Board dimensions.
const boardWidth = boardElement.offsetWidth;
const boardHeight = boardElement.offsetHeight;

// Square dimensions.
const squareWidth = squareElement.offsetWidth;
const squareHeight = squareElement.offsetHeight;

// Number of pixels to move the square.
const STEP = 50;

// Variables to save the square position.
let squarePositionX;
let squarePositionY;

// Function to center the square.
function centerSquare() {
    squarePositionX = (boardWidth - squareWidth) / 2;
    squarePositionY = (boardHeight - squareHeight) / 2;
    squareElement.style.left = squarePositionX + 'px';
    squareElement.style.top = squarePositionY + 'px';
}

// Function that handles the movements of the square.
function moveSquare(direction) {
    switch (direction) {
        case "UP":
            squarePositionY = Math.max(0, squarePositionY - STEP);
            break;
        case "DOWN":
            squarePositionY = Math.min(boardHeight - squareHeight, squarePositionY + STEP);
            break;
        case "LEFT":
            squarePositionX = Math.max(0, squarePositionX - STEP);
            break;
        case "RIGHT":
            squarePositionX = Math.min(boardWidth - squareWidth, squarePositionX + STEP);
            break;
    }

    //  Update square position in DOM.
    squareElement.style.left = squarePositionX + 'px';
    squareElement.style.top = squarePositionY + 'px';
}

// Centering the square when the page first loads.
window.onload = centerSquare();