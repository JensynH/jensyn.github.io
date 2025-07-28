// Select the glowing cursor element
const glowingCursor = document.getElementById('glowing-cursor');

// Function to update the cursor position
document.addEventListener('mousemove', (e) => {
    // Get the mouse coordinates
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Update the glowing cursor position
    glowingCursor.style.transform = `translate(${mouseX - 50}px, ${mouseY - 50}px)`; // Center the glowing circle around the cursor
});

// Load the theme from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.getElementById('theme-stylesheet').setAttribute('href', savedTheme);
    }
});

// Ai portion
document.addEventListener('DOMContentLoaded', () => {
    /* Qualifications */
    const statItems = document.querySelectorAll('.stat-item');

    statItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    /* Game */
    const startScreen = document.getElementById('start-screen');
    const game = document.getElementById('game');
    const endScreen = document.getElementById('end-screen');
    const player = document.getElementById('player');
    const button = document.getElementById('button');
    const obstacle = document.getElementById('obstacle');
    const endMessage = document.getElementById('end-message');
    const kiddingMessage = document.getElementById('kidding-message');
    const changeThemeButton = document.getElementById('change-theme-button');

    let isJumping = false;
    let isGameOver = false;

    // Start the game when 'Yes' button is clicked
    document.getElementById('start-yes').onclick = () => {
        startScreen.classList.add('hidden');
        game.classList.remove('hidden');
        startGame();
    };

    // Redirect to index.html when 'No' button is clicked
    document.getElementById('start-no').onclick = () => {
        window.location.href = 'index.html';
    };

    // Jump function for the player when space bar is pressed
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !isJumping && !isGameOver) {
            jump();
        }
    });

    // Player jump function
    function jump() {
        isJumping = true;
        let position = 0;
        let intervalUp = setInterval(() => {
            if (position >= 60) {
                clearInterval(intervalUp);
                let intervalDown = setInterval(() => {
                    if (position <= 0) {
                        clearInterval(intervalDown);
                        isJumping = false;
                    }
                    position -= 2;
                    player.style.bottom = position + 'px';
                }, 20);
            }
            position += 2;
            player.style.bottom = position + 'px';
        }, 20);
    }

    // Start the game function
    function startGame() {
        let obstacleMovement = setInterval(() => {
            if (isGameOver) {
                clearInterval(obstacleMovement);
            }
            checkCollision();
        }, 10);
    }

    // Check for collisions between the player and the obstacle
    function checkCollision() {
        let playerRect = player.getBoundingClientRect();
        let obstacleRect = obstacle.getBoundingClientRect();

        if (playerRect.right > obstacleRect.left &&
            playerRect.left < obstacleRect.right &&
            playerRect.bottom > obstacleRect.top &&
            playerRect.top < obstacleRect.bottom) {
            endGame();
        }
    }

    // End the game function
    function endGame() {
        isGameOver = true;
        game.classList.add('hidden');
        endScreen.classList.remove('hidden');
        setTimeout(() => {
            kiddingMessage.classList.remove('hidden');
            changeThemeButton.classList.add('show'); // Show the button
        }, 1500);
    }

    // Change theme function
    changeThemeButton.onclick = () => {
        // Toggle theme between style1.css and style2.css
        const currentTheme = localStorage.getItem('theme') || 'style1.css';
        const newTheme = currentTheme === 'style1.css' ? 'style2.css' : 'style1.css';
        localStorage.setItem('theme', newTheme);

        // Redirect to index.html to apply theme changes
        window.location.href = 'index.html';
    };
});

