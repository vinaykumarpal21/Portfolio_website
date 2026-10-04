document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const menuBtn = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  // Theme: set data-theme on <html>, matching the CSS variables.
  const setTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (_) {}
    if (themeBtn) {
      themeBtn.innerHTML = theme === 'dark'
        ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
      themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      themeBtn.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    }
  };
  let savedTheme = 'light';
  try { savedTheme = localStorage.getItem('theme') || 'light'; } catch (_) {}
  setTheme(savedTheme === 'dark' ? 'dark' : 'light');
  themeBtn?.addEventListener('click', () => {
    setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  // Mobile menu
  const closeMenu = () => {
    navMenu?.classList.remove('active');
    menuBtn?.setAttribute('aria-expanded', 'false');
    const icon = menuBtn?.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars-staggered');
    }
  };
  menuBtn?.addEventListener('click', (event) => {
    event.stopPropagation();
    const opening = !navMenu?.classList.contains('active');
    navMenu?.classList.toggle('active', opening);
    menuBtn.setAttribute('aria-expanded', String(opening));
    const icon = menuBtn.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-xmark', opening);
      icon.classList.toggle('fa-bars-staggered', !opening);
    }
  });
  document.addEventListener('click', (event) => {
    if (navMenu && menuBtn && !navMenu.contains(event.target) && !menuBtn.contains(event.target)) closeMenu();
  });
  navMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { closeMenu(); closeModal(); } });

  // Project carousel uses the actual IDs present in index.html.
  const projectCards = [...document.querySelectorAll('.project-card')];
  const prevBtn = document.getElementById('prevProjBtn');
  const nextBtn = document.getElementById('nextProjBtn');
  const counter = document.getElementById('projCounter');
  let currentIndex = Math.max(0, projectCards.findIndex(card => card.classList.contains('active')));
  const showProject = (index) => {
    if (!projectCards.length) return;
    currentIndex = (index + projectCards.length) % projectCards.length;
    projectCards.forEach((card, i) => {
      card.classList.toggle('active', i === currentIndex);
      card.setAttribute('aria-hidden', String(i !== currentIndex));
    });
    if (counter) counter.textContent = `${currentIndex + 1} / ${projectCards.length}`;
  };
  prevBtn?.addEventListener('click', () => showProject(currentIndex - 1));
  nextBtn?.addEventListener('click', () => showProject(currentIndex + 1));
  showProject(currentIndex);

  // Project details modal
  const modal = document.getElementById('detailsModal');
  const modalBody = document.getElementById('modalBodyContent');
  const closeModalBtn = document.getElementById('closeModalBtn');
  function openModal(card) {
    if (!modal || !modalBody || !card) return;
    const title = card.dataset.title || card.querySelector('h3')?.textContent || 'Project details';
    const description = card.dataset.desc || card.querySelector('.project-info p')?.textContent || '';
    const tech = (card.dataset.tech || '').split(',').map(s => s.trim()).filter(Boolean);
    modalBody.replaceChildren();
    const heading = document.createElement('h2'); heading.textContent = title;
    const paragraph = document.createElement('p'); paragraph.textContent = description;
    modalBody.append(heading, paragraph);
    if (tech.length) {
      const techHeading = document.createElement('h3'); techHeading.textContent = 'Technologies Used';
      const list = document.createElement('div'); list.className = 'tech-tags';
      tech.forEach(name => { const tag = document.createElement('span'); tag.textContent = name; list.append(tag); });
      modalBody.append(techHeading, list);
    }
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    closeModalBtn?.focus();
  }
  function closeModal() {
    modal?.classList.remove('active');
    modal?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }
  document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', () => openModal(button.closest('.project-card')));
  });
  closeModalBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', event => { if (event.target === modal) closeModal(); });

  // Reliable typewriter animation; does not depend on an external CDN.
  const typingTarget = document.getElementById('typing-text');
  if (typingTarget) {
    const phrases = ['DevOps Engineer', 'Cloud & AWS Enthusiast', 'CI/CD Automation Learner'];
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    const typeNext = () => {
      const phrase = phrases[phraseIndex];
      typingTarget.textContent = phrase.slice(0, charIndex);
      let delay = deleting ? 45 : 85;
      if (!deleting && charIndex < phrase.length) {
        charIndex++;
      } else if (deleting && charIndex > 0) {
        charIndex--;
      } else if (!deleting) {
        deleting = true;
        delay = 1400;
      } else {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 350;
      }
      window.setTimeout(typeNext, delay);
    };
    typingTarget.textContent = '';
    typeNext();
  }
});