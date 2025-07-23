const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ball properties
let ball = {
    x: 300,
    y: 50,
    radius: 10,
    dx: 2,
    dy: 2,
};

// Bat properties
let bat = {
    x: 250,
    y: 350,
    width: 100,
    height: 20,
};

// Score
let score = 0;

// Track mouse movement to move the bat
document.addEventListener('mousemove', (e) => {
    bat.x = e.clientX - canvas.offsetLeft - bat.width / 2;
});

// Draw the ball on canvas
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#ff4500'; // Ball color
    ctx.fill();
    ctx.closePath();
}

// Draw the bat on canvas
function drawBat() {
    ctx.beginPath();
    ctx.rect(bat.x, bat.y, bat.width, bat.height);
    ctx.fillStyle = '#228B22'; // Bat color
    ctx.fill();
    ctx.closePath();
}

// Display score on canvas
function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 10, 30);
}

// Detect collision between ball and bat
function collisionDetection() {
    if (ball.y + ball.radius >= bat.y && ball.y + ball.radius <= bat.y + bat.height) {
        if (ball.x >= bat.x && ball.x <= bat.x + bat.width) {
            ball.dy = -ball.dy; // Bounce the ball off the bat
            score++; // Increase the score
        }
    }
}

// Update the ball's position and handle boundaries
function updateBallPosition() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Bounce off left/right walls
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }

    // Bounce off top wall
    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }

    // Check if the ball goes past the bat (bottom of the canvas)
    if (ball.y + ball.radius > canvas.height) {
        // Ball goes past the bat, reset position and score
        ball.x = canvas.width / 2;
        ball.y = 50;
        ball.dy = 2;
        ball.dx = 2;
        score = 0; // Reset score
    }
}

// Main game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    drawBall();   // Draw the ball
    drawBat();    // Draw the bat
    drawScore();  // Draw the score
    collisionDetection(); // Check for collisions
    updateBallPosition(); // Update ball position

    requestAnimationFrame(gameLoop); // Continue the game loop
}

gameLoop(); // Start the game loop
