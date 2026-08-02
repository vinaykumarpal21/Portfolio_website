// Theme Toggle Logic[cite: 2]
const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// Mobile Menu Toggle[cite: 2]
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.querySelector('i').className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
    });
}

// Game Engine Logic
let userScore = 0;
let compScore = 0;

const userScoreElem = document.getElementById("user-score");
const compScoreElem = document.getElementById("comp-score");
const userDisplay = document.getElementById("user-display");
const compDisplay = document.getElementById("comp-display");
const gameMsg = document.getElementById("game-msg");

const getComputerChoice = () => {
    const choices = ["Stone", "Paper", "Scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
};

const playGame = (userChoice) => {
    const compChoice = getComputerChoice();

    userDisplay.innerText = userChoice;
    compDisplay.innerText = compChoice;

    if (userChoice === compChoice) {
        gameMsg.innerText = `Muqabla Barabari Ka! Dono ne '${userChoice}' chuna tha.`;
        gameMsg.style.color = "var(--accent-yellow)";
    } else if (
        (userChoice === "Stone" && compChoice === "Scissors") ||
        (userChoice === "Paper" && compChoice === "Stone") ||
        (userChoice === "Scissors" && compChoice === "Paper")
    ) {
        userScore++;
        userScoreElem.innerText = userScore;
        gameMsg.innerText = `Badhai Ho! Aapka ${userChoice} Bot ke ${compChoice} par bhaari pada! 🎉`;
        gameMsg.style.color = "#4ecc6d";
    } else {
        compScore++;
        compScoreElem.innerText = compScore;
        gameMsg.innerText = `Oops! Bot ka ${compChoice} aapke ${userChoice} ko hara gaya. 🤖`;
        gameMsg.style.color = "#ff7675";
    }
};