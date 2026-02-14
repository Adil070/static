// Password validation
const passwordScreen = document.getElementById('passwordScreen');
const passwordInput = document.getElementById('passwordInput');
const submitPassword = document.getElementById('submitPassword');
const errorMessage = document.getElementById('errorMessage');

let currentUser = '';

const users = {
    'AdilAli': 'Keezo',
    'khanZadi': 'tinker bell',
    'adilKacchi': 'kacchi'
};

function checkPassword() {
    const password = passwordInput.value;
    
    if (users[password]) {
        currentUser = users[password];
        passwordScreen.classList.remove('active');
        questionScreen.classList.add('active');
        errorMessage.textContent = '';
    } else {
        errorMessage.textContent = 'Incorrect password! Try again.';
        passwordInput.value = '';
        passwordInput.classList.add('shake');
        setTimeout(() => passwordInput.classList.remove('shake'), 500);
    }
}

submitPassword.addEventListener('click', checkPassword);
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

// Floating hearts animation
const heartsCanvas = document.getElementById('heartsCanvas');
const heartsCtx = heartsCanvas.getContext('2d');
heartsCanvas.width = window.innerWidth;
heartsCanvas.height = window.innerHeight;

class Heart {
    constructor() {
        this.x = Math.random() * heartsCanvas.width;
        this.y = heartsCanvas.height + 50;
        this.size = Math.random() * 20 + 10;
        this.speed = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.wobble = Math.random() * 2;
    }

    draw() {
        heartsCtx.save();
        heartsCtx.globalAlpha = this.opacity;
        heartsCtx.font = `${this.size}px Arial`;
        heartsCtx.fillText('❤️', this.x, this.y);
        heartsCtx.restore();
    }

    update() {
        this.y -= this.speed;
        this.x += Math.sin(this.y * 0.01) * this.wobble;
        if (this.y < -50) {
            this.y = heartsCanvas.height + 50;
            this.x = Math.random() * heartsCanvas.width;
        }
    }
}

const hearts = Array.from({ length: 8 }, () => new Heart());
let heartsAnimationId;

function animateHearts() {
    heartsCtx.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);
    hearts.forEach(heart => {
        heart.update();
        heart.draw();
    });
    heartsAnimationId = requestAnimationFrame(animateHearts);
}
animateHearts();

// NO button drama logic
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const dramaticMessage = document.getElementById('dramaticMessage');
const questionScreen = document.getElementById('questionScreen');
const celebrationScreen = document.getElementById('celebrationScreen');

// Update the main question to show the user's name
const mainQuestion = document.querySelector('.main-question');
if (currentUser) {
    mainQuestion.textContent = `${currentUser}, Will you be my Valentine? ❤️`;
}

const messages = [
    "Wait... really? 😢",
    "My heart just skipped a beat... 💔",
    "Please think about it... 🥺",
    "I've been dreaming of this moment... 💭",
    "You mean everything to me... ❤️",
    "Just one chance? 🥹",
    "I promise to make you smile every day... 😊",
    "You're my favorite person... 💕",
    "This hurts more than I expected... 😞",
    "I can't imagine life without you... 💫",
    "My heart is breaking... 💔",
    "Please don't go... 🥺",
    "You're worth every risk... ✨",
    "I'll wait forever if I have to... ⏳",
    "Fine... I give up... 😭"
];

let attemptCount = 0;

function moveNoButton() {
    if (attemptCount >= messages.length) {
        // Explode and disappear
        noBtn.classList.add('exploding');
        setTimeout(() => {
            noBtn.style.display = 'none';
            yesBtn.classList.add('enlarged');
        }, 500);
        return;
    }

    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    noBtn.classList.add('moving');
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.transform = `rotate(${Math.random() * 30 - 15}deg) scale(${1 - attemptCount * 0.02})`;
    
    // Show dramatic message
    dramaticMessage.textContent = messages[attemptCount];
    dramaticMessage.style.left = (newX + noBtn.offsetWidth / 2) + 'px';
    dramaticMessage.style.top = (newY - 50) + 'px';
    dramaticMessage.classList.add('show');
    
    setTimeout(() => {
        dramaticMessage.classList.remove('show');
    }, 5000);
    
    attemptCount++;
}

noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// YES button celebration
yesBtn.addEventListener('click', () => {
    // Stop hearts animation to free up resources
    cancelAnimationFrame(heartsAnimationId);
    heartsCanvas.style.display = 'none';
    
    // Vibration on mobile
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
    }
    
    // Zoom effect
    document.body.style.animation = 'zoomIn 1s ease forwards';
    
    setTimeout(() => {
        questionScreen.classList.remove('active');
        celebrationScreen.classList.add('active');
        startCelebration();
    }, 500);
});

// Celebration animations
let celebrationActive = false;

function startCelebration() {
    if (celebrationActive) return;
    celebrationActive = true;
    
    startConfetti();
    createBalloons();
    typewriterEffect();
    
    // Try to play music (user interaction required)
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.play().catch(() => console.log('Audio autoplay prevented'));
}

// Confetti (CSS-based for better performance)
function startConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#ff6b9d', '#ffd93d', '#6bcf7f', '#4d9de0', '#e15554'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
        container.appendChild(confetti);
    }
}

// Balloons
function createBalloons() {
    const container = document.getElementById('balloonsContainer');
    const balloonEmojis = ['🎈', '🎈', '💖', '💕', '💗', '🎀'];
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.textContent = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
            balloon.style.left = Math.random() * 100 + '%';
            balloon.style.animationDelay = Math.random() * 2 + 's';
            balloon.style.animationDuration = (Math.random() * 3 + 4) + 's';
            container.appendChild(balloon);
        }, i * 200);
    }
}

// Typewriter effect
function typewriterEffect() {
    const element = document.getElementById('typewriterText');
    const messages = [
        `${currentUser}, you just made me the happiest person alive ❤️`,
        "My valentine 💍✨"
    ];
    
    let messageIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (messageIndex < messages.length) {
            if (charIndex < messages[messageIndex].length) {
                const span = document.createElement('div');
                span.textContent = messages[messageIndex].substring(0, charIndex + 1);
                element.innerHTML = '';
                for (let i = 0; i <= messageIndex; i++) {
                    const div = document.createElement('div');
                    if (i < messageIndex) {
                        div.textContent = messages[i];
                    } else {
                        div.textContent = messages[i].substring(0, charIndex + 1);
                    }
                    element.appendChild(div);
                }
                charIndex++;
                setTimeout(type, 50);
            } else {
                charIndex = 0;
                messageIndex++;
                setTimeout(type, 500);
            }
        }
    }
    
    type();
}

// Zoom animation
const style = document.createElement('style');
style.textContent = `
    @keyframes zoomIn {
        0% { transform: scale(1); }
        100% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);

// Resize handler
window.addEventListener('resize', () => {
    heartsCanvas.width = window.innerWidth;
    heartsCanvas.height = window.innerHeight;
});
