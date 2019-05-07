//variables
var snake;
var food;
var canvas;
var size = 32;
var speed = 100;
var score = 0;
var newDirection = -1
var interval;
var leftClick = false;
var gameOverCheck = true;

// Listen to key events
document.addEventListener('keydown', function(event) {
    const key = event.key;
    switch (event.key) {
        case "ArrowUp":
            // Up pressed
            newDirection = 0
            break;
        case "ArrowRight":
            // Right pressed
            newDirection = 1
            break;
        case "ArrowDown":
            // Down pressed
            newDirection = 2
            break;
        case "ArrowLeft":
            // Left pressed
            newDirection = 3
            break;
        case "Enter":
            // Enter pressed
            //Start Game
            if (gameOverCheck){
                gameOverCheck = false;
                interval = setInterval(() => {
                    update();
                }, speed);
            };
            break;
    };
});

function update(){
     
    changeDirection();
    moveSnake();
    // Clear Canvas
    const context = canvas.getContext('2d');
    
    drawAll();
    checkCollision();

}; 

function createSnake(){
    snake = {
        direction:1,
        body:[{x:10,y:10}, {x:9,y:10}, {x:8,y:10},{x:7,y:10},{x:6,y:10}],
    };
};

function createFood(){

    food = {
        x:Math.floor(Math.random() * 26),
        y:Math.floor(Math.random() * 20)
    };
    for(var i = 1; i< snake.body.length; i++){
        if(food.x === snake.body[i].x && food.y === snake.body[i].y){
            // Call on itself to generate new x y values
            createFood();
            break;
        };
    };
};

function changeDirection(){
    // Check if a turn can be made
    if ((snake.direction === 0 || snake.direction === 2) && (newDirection === 1 || newDirection === 3) || (snake.direction === 1 || snake.direction === 3) && (newDirection === 0 || newDirection === 2)){
        snake.direction = newDirection;
    };
};


function moveSnake(){
    var newXpos = snake.body[0].x;
    var newYpos = snake.body[0].y;
    switch (snake.direction){
        case 0:
            newYpos--
            break;

        case 1:
            newXpos++
            break;
        
        case 2:
            newYpos++
            break;
        
        case 3:
            newXpos--
            break;
    }

    snake.body.unshift({x:newXpos,y:newYpos});
    snake.body.pop();
};

function drawAll(){
    var draw = canvas.getContext("2d");
    // Draw black background
    draw.fillStyle = "#000000";
    draw.fillRect(0, 0, canvas.width, canvas.height);
    // Draw food
    draw.fillStyle = "#FF0000";
    draw.fillRect(food.x * size, food.y * size, size, size)

    // Draw Snake
    draw.fillStyle = "#FFFFFF";
    for(var i = 0; i< snake.body.length; i++){
        draw.fillRect(snake.body[i].x * size, snake.body[i].y * size, size, size);
    };
};

function checkCollision(){
    // Check Tail Collision
    for(var i = 1; i< snake.body.length; i++){
        if(snake.body[0].x === snake.body[i].x){
            if(snake.body[0].y === snake.body[i].y){
                gameOver();
            };
        };
    };

    //Check Wall Collision
    if(snake.body[0].x < 0 || snake.body[0].y < 0 || snake.body[0].x >= 26 || snake.body[0].y >= 20 ){
        gameOver();
    }

    // Check Food Colliison
    if (snake.body[0].x === food.x && snake.body[0].y === food.y){
        score += 100;
        createFood();
        // Duplicate Last Tail
        snake.body.push(snake.body[snake.body.length - 1]);

    }
};

function gameOver(){
    alert("You lost! Score: " + score);
    clearInterval(interval);
    gameOverCheck = true;
    score = 0;
    setUpGame();
};

function setUpGame(){
    canvas = document.getElementById('game');
    createSnake();
    createFood();
    drawAll();
    canvasText = canvas.getContext('2d');
    canvasText.font = 'bold 48px sans-serif';
    canvasText.fillStyle = '#FFFFFF';
    canvasText.fillText("Press Enter to Start!", 50, 100);
}

window.onload = function (){
    setUpGame();
};
