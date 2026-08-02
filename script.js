// ==========================================
// TYPED.JS CONFIGURATION FOR HERO SECTION
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("typing-text")) {
        const typed = new Typed("#typing-text", {
            strings: [
                "B.Sc IT Graduate",
                "SAP ABAP Cloud Developer",
                "Software Engineer",
                "DevOps Enthusiast"
            ],
            typeSpeed: 70,
            backSpeed: 50,
            backDelay: 1500,
            loop: true
        });
    }
});

// ==========================================
// THEME SWITCHER (DARK / LIGHT MODE)
// ==========================================
const themeToggleBtn = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme") || "light";

if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    if (themeToggleBtn) {
        themeToggleBtn.querySelector("i").className = "fas fa-sun";
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
        let theme = document.documentElement.getAttribute("data-theme");
        if (theme === "dark") {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            themeToggleBtn.querySelector("i").className = "fas fa-moon";
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            themeToggleBtn.querySelector("i").className = "fas fa-sun";
        }
    });
}

// ==========================================
// MOBILE MENU TOGGLE & SMOOTH CLOSING
// ==========================================
const menuToggleBtn = document.getElementById("menuToggle");
const navLinksList = document.getElementById("navLinks");

if (menuToggleBtn && navLinksList) {
    menuToggleBtn.addEventListener("click", () => {
        navLinksList.classList.toggle("active");
        const icon = menuToggleBtn.querySelector("i");
        if (navLinksList.classList.contains("active")) {
            icon.className = "fas fa-times";
        } else {
            icon.className = "fas fa-bars";
        }
    });

    // Close mobile menu when clicking any nav link
    document.querySelectorAll(".menu-items-list a").forEach(link => {
        link.addEventListener("click", () => {
            navLinksList.classList.remove("active");
            menuToggleBtn.querySelector("i").className = "fas fa-bars";
        });
    });
}

// ==========================================
// CONTACT FORM AJAX SUBMISSION & SUCCESS ALERT
// ==========================================
const contactForm = document.querySelector(".contact-form-card form");
const successAlertMsg = document.getElementById("formSuccessMessage");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                if (successAlertMsg) {
                    successAlertMsg.style.display = "block";
                }
                contactForm.reset();
                setTimeout(() => {
                    if (successAlertMsg) {
                        successAlertMsg.style.display = "none";
                    }
                }, 5000);
            } else {
                alert("Oops! There was a problem submitting your form.");
            }
        }).catch(error => {
            alert("Oops! There was a problem submitting your form.");
        });
    });
}