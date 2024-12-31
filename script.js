// Particle.js Configuration
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
        }
    },
    retina_detect: true
});

function celebrateNewYear() {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#FFD1DC', '#FFF', '#FF69B4']
        });

        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#FFD1DC', '#FFF', '#FF69B4']
        });
    }, 50);

    // Play celebration sound with error handling
    const audio = new Audio();
    audio.src = 'remember24.mp3'; // Use local audio file

    // Handle audio playback with promise
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Audio playback failed:", error);
        });
    }

    document.body.style.animation = 'gradientFlow 5s ease infinite';
}

function updateCountdown() {
    const newYear = new Date('January 1, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = newYear - now;

    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    if (timeLeft < 0) {
        document.querySelector('.title').textContent = 'Mutlu bir 2025 yılı dileğiyle!';
        celebrateNewYear();
        clearInterval(countdownInterval);
    }
}

// Initialize countdown
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Remove test button and add keyboard handler
document.addEventListener('DOMContentLoaded', function() {
    const testButton = document.getElementById('testButton');
    if (testButton) {
        testButton.parentNode.removeChild(testButton);
    }

    const typedTextElement = document.createElement('span');
    typedTextElement.id = 'typedText';
    typedTextElement.style.display = 'none';
    document.body.appendChild(typedTextElement);

    function handleKeyboardInput(event) {
        const typedChar = event.key;
        const typedTextElement = document.getElementById('typedText');
        typedTextElement.textContent += typedChar;

        if (typedTextElement.textContent.includes('test')) {
            celebrateNewYear();
            typedTextElement.textContent = '';
        }
    }

    document.addEventListener('keypress', handleKeyboardInput);
});