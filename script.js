document.addEventListener('DOMContentLoaded', () => {

    // 1. MOBILE MENU TOGGLE
    const menuToggle = document.getElementById('menuToggle');
    const navMenu    = document.getElementById('navMenu');

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

    // 2. THEME TOGGLE (Light / Dark)
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (htmlElement.getAttribute('data-theme') === 'dark') {
                htmlElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                htmlElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // 3. TYPING EFFECT
    if (document.getElementById('typing-text')) {
        new Typed('#typing-text', {
            strings: ['DevOps Engineer', 'CI/CD Pipeline Specialist', 'B.Sc IT Graduate'],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1500,
            loop: true
        });
    }

    // 4. PROJECT CAROUSEL
    const projectCards = document.querySelectorAll('.project-card');
    const prevProjBtn  = document.getElementById('prevProjBtn');
    const nextProjBtn  = document.getElementById('nextProjBtn');
    const projCounter  = document.getElementById('projCounter');
    let currentIndex   = 0;
    const total        = projectCards.length;

    function updateCarousel() {
        projectCards.forEach((card, i) => card.classList.toggle('active', i === currentIndex));
        if (projCounter) projCounter.textContent = `${currentIndex + 1} / ${total}`;
    }

    if (nextProjBtn && prevProjBtn) {
        nextProjBtn.addEventListener('click', () => { currentIndex = (currentIndex + 1) % total; updateCarousel(); });
        prevProjBtn.addEventListener('click', () => { currentIndex = (currentIndex - 1 + total) % total; updateCarousel(); });
    }

    // 5. PROJECT DETAILS MODAL
    const detailsModal   = document.getElementById('detailsModal');
    const modalBody      = document.getElementById('modalBodyContent');
    const closeModalBtn  = document.getElementById('closeModalBtn');

    function openModal(title, desc, tech) {
        if (modalBody) {
            modalBody.innerHTML = `
                <h3 style="margin-bottom:0.8rem;font-size:1.3rem;color:var(--primary-color);">${title}</h3>
                <p style="margin-bottom:1rem;font-size:0.95rem;line-height:1.5;opacity:0.9;">${desc}</p>
                <h4 style="font-size:0.95rem;margin-bottom:0.4rem;color:var(--text-color);">Technologies Used:</h4>
                <p style="font-size:0.9rem;opacity:0.85;background:var(--border-color);padding:6px 10px;border-radius:6px;display:inline-block;">${tech}</p>
            `;
        }
        if (detailsModal) detailsModal.classList.add('active');
    }

    function closeModal() {
        if (detailsModal) detailsModal.classList.remove('active');
    }

    document.querySelectorAll('.view-details').forEach((btn, i) => {
        btn.addEventListener('click', () => {
            const card = projectCards[i];
            if (card) openModal(
                card.getAttribute('data-title'),
                card.getAttribute('data-desc'),
                card.getAttribute('data-tech')
            );
        });
    });

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (detailsModal)  detailsModal.addEventListener('click', (e) => { if (e.target === detailsModal) closeModal(); });

    // 6. CONTACT FORM — Formspree AJAX
    const contactForm = document.querySelector('form');
    const successMsg  = document.getElementById('formSuccessMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                const res = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });
                if (res.ok) {
                    contactForm.reset();
                    if (successMsg) {
                        successMsg.style.display = 'block';
                        setTimeout(() => { successMsg.style.display = 'none'; }, 4000);
                    }
                } else {
                    alert('Oops! There was a problem submitting your form.');
                }
            } catch {
                alert('Network error. Please check your connection and try again.');
            }
        });
    }

});
