document.addEventListener('DOMContentLoaded', () => {
    // 1. MOBILE MENU TOGGLE
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            
            if (navMenu.classList.contains('active')) {
                icon.classList.replace('fa-bars-staggered', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars-staggered');
            }
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.classList.replace('fa-times', 'fa-bars-staggered');
            }
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.classList.replace('fa-times', 'fa-bars-staggered');
            });
        });
    }
    // 2. THEME TOGGLE (Light / Dark Mode)
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                htmlElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                htmlElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // 3. TYPING EFFECT (Hero Section)
    if (document.getElementById('typing-text')) {
        new Typed('#typing-text', {
            strings: [
                "DevOps Engineer",
                "CI/CD Pipeline Specialist",
                "B.Sc IT Graduate"
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1500,
            loop: true
        });
    }

    // 4. PROJECTS CAROUSEL LOGIC
    const projectCards = document.querySelectorAll('.project-card');
    const prevProjBtn = document.getElementById('prevProjBtn');
    const nextProjBtn = document.getElementById('nextProjBtn');
    const projCounter = document.getElementById('projCounter');
    let currentProjectIndex = 0;
    const totalProjects = projectCards.length;

    function updateCarousel() {
        projectCards.forEach((card, index) => {
            if (index === currentProjectIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        if (projCounter) {
            projCounter.textContent = `${currentProjectIndex + 1} / ${totalProjects}`;
        }
    }

    if (nextProjBtn && prevProjBtn) {
        nextProjBtn.addEventListener('click', () => {
            currentProjectIndex = (currentProjectIndex + 1) % totalProjects;
            updateCarousel();
        });

        prevProjBtn.addEventListener('click', () => {
            currentProjectIndex = (currentProjectIndex - 1 + totalProjects) % totalProjects;
            updateCarousel();
        });
    }

    // 5. MODAL POPUP FOR PROJECT DETAILS
    const detailsModal = document.getElementById('detailsModal');
    const modalBodyContent = document.getElementById('modalBodyContent');
    const closeModalBtn = document.getElementById('closeModalBtn');

    function openModal(title, description, techStack) {
        if (modalBodyContent) {
            modalBodyContent.innerHTML = `
                <h3 style="margin-bottom: 0.8rem; font-size: 1.3rem; color: var(--primary-color);">${title}</h3>
                <p style="margin-bottom: 1rem; font-size: 0.95rem; line-height: 1.5; opacity: 0.9;">${description}</p>
                <h4 style="font-size: 0.95rem; margin-bottom: 0.4rem; color: var(--text-color);">Technologies Used:</h4>
                <p style="font-size: 0.9rem; opacity: 0.85; background: var(--border-color); padding: 6px 10px; border-radius: 6px; display: inline-block;">${techStack}</p>
            `;
        }
        if (detailsModal) {
            detailsModal.classList.add('active');
        }
    }

    function closeModal() {
        if (detailsModal) {
            detailsModal.classList.remove('active');
        }
    }

    document.querySelectorAll('.view-details').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const card = projectCards[index];
            if (card) {
                const title = card.getAttribute('data-title');
                const desc = card.getAttribute('data-desc');
                const tech = card.getAttribute('data-tech');
                openModal(title, desc, tech);
            }
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (detailsModal) {
        detailsModal.addEventListener('click', (e) => {
            if (e.target === detailsModal) closeModal();
        });
    }

    // 6. CONTACT FORM AJAX SUBMISSION (Formspree)
    const contactForm = document.querySelector('form');
    const successMsg = document.getElementById('formSuccessMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    contactForm.reset();
                    if (successMsg) {
                        successMsg.style.display = 'block';
                        setTimeout(() => { successMsg.style.display = 'none'; }, 4000);
                    }
                } else {
                    alert('Oops! There was a problem submitting your form.');
                }
            } catch (error) {
                alert('Network error. Please check your connection and try again.');
            }
        });
    }

});