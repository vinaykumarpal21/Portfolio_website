// Theme Toggle Logic
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

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.querySelector('i').className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
    });
}

// Calculator Engine Logic
const screen = document.getElementById('screen');
function append(val) {
    if(screen.value === '0') screen.value = '';
    screen.value += val;
}
function clearScreen() { screen.value = '0'; }
function backspace() {
    screen.value = screen.value.slice(0, -1);
    if(screen.value === '') screen.value = '0';
}
function calculate() {
    try { screen.value = eval(screen.value); } 
    catch { screen.value = 'Error'; }
}