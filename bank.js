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

// Tab Switching
function switchTab(tabId, evt) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    if(tabId === 'banking') {
        document.getElementById('bankingTab').classList.add('active');
    } else {
        document.getElementById('emiTab').classList.add('active');
        calculateEMI();
    }
    evt.currentTarget.classList.add('active');
}

// Banking Simulator Logic
let balance = 5000.0;
let accountType = "Savings";
const out = document.getElementById('consoleOutput');

function printConsole(text, type = "normal") {
    const line = document.createElement('div');
    line.className = `console-line ${type === 'success' ? 'console-success' : type === 'error' ? 'console-error' : type === 'warn' ? 'console-warn' : ''}`;
    line.textContent = `> ${text}`;
    out.appendChild(line);
    out.scrollTop = out.scrollHeight;
}

function changeAccountType() {
    accountType = document.getElementById('accType').value;
    const interestBtn = document.getElementById('interestBtn');
    if(accountType === "Savings") {
        interestBtn.style.display = "flex";
        printConsole(`Polymorphism: Account reference re-assigned to SavingsAccount class. Min balance rule: ₹1,000.`, "success");
    } else if(accountType === "Current") {
        interestBtn.style.display = "none";
        printConsole(`Polymorphism: Account reference re-assigned to CurrentAccount class. Overdraft facility: ₹50,000 enabled.`, "success");
    } else {
        interestBtn.style.display = "none";
        printConsole(`Polymorphism: Account reference re-assigned to SalaryAccount class. Zero minimum balance policy active.`, "success");
    }
}

function deposit() {
    const amt = parseFloat(document.getElementById('amount').value);
    if (isNaN(amt) || amt <= 0) return printConsole("Error: Please enter a valid positive deposit amount!", "error");
    balance += amt;
    printConsole(`[SUCCESS] Deposited ₹${amt.toLocaleString('en-IN')} via ${accountType}.getAccountType()`, "success");
    printConsole(`Encapsulation Check: private balance updated -> ₹${balance.toLocaleString('en-IN')}`, "warn");
}

function withdraw() {
    const amt = parseFloat(document.getElementById('amount').value);
    if (isNaN(amt) || amt <= 0) return printConsole("Error: Please enter a valid withdrawal amount.", "error");
    
    if(accountType === "Savings") {
        if((balance - amt) < 1000) {
            return printConsole(`RuleViolationException: SavingsAccount requires maintaining minimum balance of ₹1,000! Current: ₹${balance}`, "error");
        }
    } else if(accountType === "Current") {
        if((balance - amt) < -50000) {
            return printConsole(`OverdraftLimitException: Maximum overdraft limit of ₹50,000 exceeded!`, "error");
        }
    } else {
        if(amt > balance) {
            return printConsole(`InsufficientFundsException: SalaryAccount has zero overdraft facility.`, "error");
        }
    }
    
    balance -= amt;
    printConsole(`[SUCCESS] Withdrew ₹${amt.toLocaleString('en-IN')} from ${accountType}. Remaining Balance: ₹${balance.toLocaleString('en-IN')}`, "success");
}

function checkBalance() {
    printConsole(`Account Holder: Vinay Kumar | Type: ${accountType} | Liquidity: ₹${balance.toLocaleString('en-IN')} [Encapsulation Verified via getter]`, "warn");
}

function applyInterest() {
    if(accountType !== "Savings") return printConsole("Operation Not Supported: Interest applicable only on SavingsAccount.", "error");
    let interest = balance * 0.04;
    balance += interest;
    printConsole(`[INTEREST APPLIED] 4% annual interest credited: +₹${interest.toFixed(2)}. New Balance: ₹${balance.toLocaleString('en-IN')}`, "success");
}

// EMI Calculator Logic
const loanRates = { "Home": 8.5, "Car": 9.0, "Personal": 11.5, "Education": 7.5 };

function updateLoanDefaults() {
    const type = document.getElementById('loanType').value;
    document.getElementById('interestRate').value = loanRates[type];
    calculateEMI();
}

function calculateEMI() {
    const p = parseFloat(document.getElementById('loanAmount').value);
    const annualRate = parseFloat(document.getElementById('interestRate').value);
    const years = parseFloat(document.getElementById('loanTenure').value);

    if(isNaN(p) || isNaN(annualRate) || isNaN(years) || p <= 0 || annualRate <= 0 || years <= 0) return;

    const r = annualRate / 12 / 100;
    const n = years * 12;

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    document.getElementById('resEmi').textContent = `₹${Math.round(emi).toLocaleString('en-IN')}`;
    document.getElementById('resPrincipal').textContent = `₹${Math.round(p).toLocaleString('en-IN')}`;
    document.getElementById('resInterest').textContent = `₹${Math.round(totalInterest).toLocaleString('en-IN')}`;
    document.getElementById('resTotal').textContent = `₹${Math.round(totalPayment).toLocaleString('en-IN')}`;
}

// Initial EMI Calculation on load
calculateEMI();