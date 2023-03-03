//board
var blockSize = 20;
var rows = 50;
var cols = 30;
var board;
var context;
//score
var score = 0;
//other
function checkForBonusFoodSpawn() {
 for (let w = 0; w <= 10; w = Math.floor(Math.random() * 10)){
         wait(placeOtherFood,5000);
         
}
}

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;
var bonusfoodX;
var bonusfoodY;

var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board
    checkForBonusFoodSpawn();
    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1000/10); //100 milliseconds
}

function update() {
    if (gameOver) {
        return;
    }
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="lime";
    context.fillRect(foodX, foodY, blockSize, blockSize);
    context.fillStyle="orange";
    context.fillRect(bonusfoodX, bonusfoodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        score++
        document.getElementById("score").innerHTML = 'Score:' + score;
        placeFood();
    }
      if (snakeX == bonusfoodX && snakeY == bonusfoodY) {
        snakeBody.push([bonusfoodX, bonusfoodY]);
        score++
        score++
        document.getElementById("score").innerHTML = 'Score:' + score;
    checkForBonusFoodSpawn();
    }
        if (bonusfoodX == foodX && bonusfoodY == foodY) {
    placeFood();
    placeOtherFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="blue";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize); 10
    }

    //game over conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("Game Over");
    }
 {
          placeOtherFood();
        }
            
          for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("GG");
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


function placeFood() {
    //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}
function placeOtherFood() {
    //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
   
    bonusfoodX = Math.floor(Math.random() * cols) * blockSize;
    bonusfoodY = Math.floor(Math.random() * rows) * blockSize;
}
