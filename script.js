'use strict';

/* ==========================================================
   SCRIPT.JS  -  is file me sirf website ka behaviour hai.

   Aap yahan se ye cheezein badal sakte ho:
   1. SKILL_GROUPS    -> skills section
   2. PROJECTS        -> projects section (sirf 2 projects rakhe hain)
   3. TYPING_PHRASES  -> hero me jo text type hota hai
   4. GITHUB_PROFILE  -> apna GitHub link
   ========================================================== */


/* ==========================================================
   1. DATA (content yahan likha hai)
   ========================================================== */

// Tool ka icon link banane ka chhota helper.
// Example: ICON('docker') -> docker ka logo
const ICON = (name, variant = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant}.svg`;

// Skills: har group me title, icon aur tools ki list.
// Same tool 2 baar likha ho to code usse khud hata deta hai.
const SKILL_GROUPS = [
  {
    title: 'DevOps & CI/CD Tools',
    icon: 'fa-solid fa-network-wired',
    tools: [
      { name: 'Jenkins',        icon: ICON('jenkins') },
      { name: 'GitHub Actions', icon: ICON('githubactions') },
      { name: 'Docker',         icon: ICON('docker') },
      { name: 'Kubernetes',     icon: ICON('kubernetes', 'plain') },
      { name: 'Terraform',      icon: ICON('terraform') },
    ],
  },
  {
    title: 'Cloud, OS & Monitoring',
    icon: 'fa-solid fa-cloud',
    tools: [
      // invertInDark: true = dark mode me logo ka color ulta (white) ho jata hai
      { name: 'AWS',        icon: ICON('amazonwebservices', 'plain-wordmark'), invertInDark: true },
      { name: 'Linux',      icon: ICON('linux') },
      { name: 'Bash',       icon: ICON('bash') },
      { name: 'Prometheus', icon: ICON('prometheus') },
      { name: 'Grafana',    icon: ICON('grafana') },
    ],
  },
  {
    title: 'Languages, Version Control & Databases',
    icon: 'fa-solid fa-code',
    tools: [
      { name: 'Java',   icon: ICON('java') },
      { name: 'Python', icon: ICON('python') },
      { name: 'Git',    icon: ICON('git') },
      { name: 'GitHub', icon: ICON('github'), invertInDark: true },
      { name: 'MySQL',  icon: ICON('mysql') },
    ],
  },
];

// Projects: sirf 2 projects.
// Naya project add karna ho to ek { ... } block copy karke yahan paste karo.
const PROJECTS = [
  {
    // ---------- Project 1: End-to-end CI/CD ----------
    title: 'End-to-End CI/CD Pipeline (GitHub to AWS EC2)',
    summary: 'Personal project: every push to GitHub triggers Jenkins, which builds a Docker image and deploys it automatically to AWS EC2.',
    details: 'A personal project that automates the full journey of an application: from a git push on GitHub to a running Docker container on an AWS EC2 server, with no manual steps.',
    problem: 'Manual builds and deployments are slow and easy to get wrong.',
    built: 'A GitHub webhook triggers a Jenkins pipeline (Jenkinsfile). It builds a Docker image, pushes it to Docker Hub, then connects to the EC2 server over SSH and runs the new container.',
    learned: 'Writing pipelines as code, Docker image builds, SSH deployment to EC2, and how a failed stage stops a bad release.',
    image: 'images/jenkins-pipeline.svg',
    tags: ['GitHub', 'Jenkins', 'Docker', 'AWS EC2'],
    tools: [
      { name: 'GitHub',  icon: ICON('github'), invertInDark: true },
      { name: 'Jenkins', icon: ICON('jenkins') },
      { name: 'Docker',  icon: ICON('docker') },
      { name: 'AWS EC2', icon: ICON('amazonwebservices', 'plain-wordmark'), invertInDark: true },
    ],
    repo: '', // yahan project ka asli GitHub link daalo. Khali raha to GITHUB_PROFILE khulega.
  },
  {
    // ---------- Project 2: Monitoring ----------
    title: 'Prometheus & Grafana Monitoring',
    summary: 'Personal project: a Docker Compose monitoring stack with dashboards and threshold alerts for a server and its containers.',
    details: 'A personal project that monitors a server and its containers using Prometheus and Grafana. Everything starts with one Docker Compose command.',
    problem: 'Without monitoring, problems are noticed only after something breaks.',
    built: 'Prometheus collects metrics from Node Exporter (server) and cAdvisor (containers). Grafana shows CPU, memory, disk and container dashboards. AlertManager sends email alerts when a limit is crossed.',
    learned: 'How metrics are collected and queried, building dashboards, and setting alert rules.',
    image: 'images/monitoring-stack.svg',
    tags: ['Prometheus', 'Grafana', 'AlertManager', 'Docker Compose'],
    tools: [
      { name: 'Prometheus', icon: ICON('prometheus') },
      { name: 'Grafana',    icon: ICON('grafana') },
      { name: 'Docker',     icon: ICON('docker') },
    ],
    repo: '', // yahan project ka asli GitHub link daalo.
  },
];

// Jis project ka `repo` khali hai, uska GitHub button yahi link kholega.
const GITHUB_PROFILE = 'https://github.com';

// Hero section me jo lines type hoti hain.
const TYPING_PHRASES = ['an Aspiring DevOps Engineer', 'a DevOps Intern', 'a Cloud & CI/CD Learner'];


/* ==========================================================
   2. HELPERS (chhote kaam ke functions)
   ========================================================== */

// el() = HTML element banane ka short tareeka.
// Example: el('p', { text: 'Hello' }) -> <p>Hello</p>
function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([key, value]) => {
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else node.setAttribute(key, value);
  });
  [].concat(children).forEach(child => child && node.append(child));
  return node;
}

// Tool ka logo (<img>) banata hai.
function toolImg(tool) {
  const img = el('img', { src: tool.icon, alt: tool.name, loading: 'lazy' });
  if (tool.invertInDark) img.classList.add('invert-dark');
  return img;
}


/* ==========================================================
   3. SKILLS SECTION
   ========================================================== */
function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;

  const seen = new Set(); // jo tool dikh chuka hai uska naam yahan rakhte hain

  SKILL_GROUPS.forEach(group => {
    // Duplicate tools hatao, phir har tool ka card banao
    const cards = group.tools
      .filter(tool => {
        const key = tool.name.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map(tool => el('div', { class: 'skill-card' }, [
        toolImg(tool),
        el('span', { text: tool.name }),
      ]));

    if (!cards.length) return;

    grid.append(el('div', { class: 'card glass skill-group' }, [
      el('h3', {}, [el('i', { class: group.icon, 'aria-hidden': 'true' }), ` ${group.title}`]),
      el('div', { class: 'skill-cards' }, cards),
    ]));
  });
}


/* ==========================================================
   4. PROJECTS SECTION (cards + Details popup + Next/Previous)
   ========================================================== */
const modal = document.getElementById('detailsModal');
const modalBody = document.getElementById('modalBodyContent');
const closeModalBtn = document.getElementById('closeModalBtn');
let lastFocused = null; // popup band hone par focus wapas yahin aayega

// "Details" dabane par popup kholo
function openModal(project) {
  if (!modal || !modalBody) return;
  lastFocused = document.activeElement;

  modalBody.replaceChildren(
    el('h2', { text: project.title }),
    el('p', { text: project.details }),
    el('h3', { text: 'Problem' }),
    el('p', { text: project.problem }),
    el('h3', { text: 'What I Built' }),
    el('p', { text: project.built }),
    el('h3', { text: 'What I Learned' }),
    el('p', { text: project.learned }),
    el('h3', { text: 'Technologies Used' }),
    el('div', { class: 'tech-tags' }, project.tags.map(t => el('span', { text: t }))),
  );

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open'); // peeche ka page scroll band
  closeModalBtn?.focus();
}

// Popup band karo
function closeModal() {
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  lastFocused?.focus?.();
}

// PROJECTS list se cards banao aur Next/Previous chalao
function renderProjects() {
  const carousel = document.getElementById('projectCarousel');
  const prevBtn = document.getElementById('prevProjBtn');
  const nextBtn = document.getElementById('nextProjBtn');
  const counter = document.getElementById('projCounter');
  if (!carousel) return;

  // Har project ke liye ek card
  const cards = PROJECTS.map(project => {
    const detailsBtn = el('button', { type: 'button', class: 'btn btn-sm btn-primary view-details' },
      [el('i', { class: 'fa-solid fa-circle-info', 'aria-hidden': 'true' }), ' Details']);
    detailsBtn.addEventListener('click', () => openModal(project));

    return el('article', { class: 'project-card' }, [
      // Image ka size CSS (.project-thumb) sambhalta hai, isliye har screen par same rehta hai
      el('div', { class: 'project-thumb' }, [
        el('img', { src: project.image, alt: `${project.title} diagram` }),
      ]),
      el('div', { class: 'project-info' }, [
        el('h3', { text: project.title }),
        el('p', { text: project.summary }),
        el('div', { class: 'tech-tags' }, project.tags.map(t => el('span', { text: t }))),
        el('div', { class: 'project-tool-icons' }, project.tools.map(toolImg)),
        el('div', { class: 'project-actions' }, [
          el('a', { href: project.repo || GITHUB_PROFILE, target: '_blank', rel: 'noopener', class: 'btn btn-sm btn-primary' },
            [el('i', { class: 'fa-brands fa-github', 'aria-hidden': 'true' }), ' GitHub']),
          detailsBtn,
        ]),
      ]),
    ]);
  });
  carousel.replaceChildren(...cards);

  // Ek time par sirf ek card dikhao (index = kaun sa card)
  let current = 0;
  const show = index => {
    current = (index + cards.length) % cards.length; // last ke baad phir pehla
    cards.forEach((card, i) => {
      card.classList.toggle('active', i === current);
      card.setAttribute('aria-hidden', String(i !== current));
    });
    if (counter) counter.textContent = `${current + 1} / ${cards.length}`;
  };

  prevBtn?.addEventListener('click', () => show(current - 1));
  nextBtn?.addEventListener('click', () => show(current + 1));
  show(0);
}


/* ==========================================================
   5. DARK / LIGHT THEME
   ========================================================== */
function initTheme() {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');

  // Theme lagao, button ka icon badlo aur browser me yaad rakho
  const apply = theme => {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (_) { /* storage band ho to koi dikkat nahi */ }
    if (!btn) return;
    const dark = theme === 'dark';
    btn.innerHTML = `<i class="fa-solid ${dark ? 'fa-sun' : 'fa-moon'}" aria-hidden="true"></i>`;
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
  };

  // Pehle se saved theme padho (nahi mila to light)
  let saved = 'light';
  try { saved = localStorage.getItem('theme') || 'light'; } catch (_) { /* ignore */ }
  apply(saved === 'dark' ? 'dark' : 'light');

  btn?.addEventListener('click', () => apply(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));
}


/* ==========================================================
   6. MOBILE MENU (hamburger button)
   ========================================================== */
function initMenu() {
  const menuBtn = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  if (!menuBtn || !navMenu) return;

  // Menu kholo (true) ya band karo (false)
  const setOpen = open => {
    navMenu.classList.toggle('active', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    const icon = menuBtn.querySelector('i');
    icon?.classList.toggle('fa-xmark', open);
    icon?.classList.toggle('fa-bars-staggered', !open);
  };

  menuBtn.addEventListener('click', e => {
    e.stopPropagation();
    setOpen(!navMenu.classList.contains('active'));
  });

  // Menu ke bahar click karo -> menu band
  document.addEventListener('click', e => {
    if (!navMenu.contains(e.target) && !menuBtn.contains(e.target)) setOpen(false);
  });

  // Menu ka link dabao -> menu band
  navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));

  // Esc dabao -> menu aur popup dono band
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { setOpen(false); closeModal(); }
  });
}


/* ==========================================================
   7. SCROLL SPY (scroll karte time menu me current section highlight)
   ========================================================== */
function initScrollSpy() {
  const links = [...document.querySelectorAll('.nav-menu a[href^="#"]')];
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if (!sections.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(a => a.classList.toggle('is-current', a.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
}


/* ==========================================================
   8. TYPING ANIMATION (hero ka typing text)
   ========================================================== */
function initTyping() {
  const target = document.getElementById('typing-text');
  if (!target) return;

  let phraseIndex = 0;   // kaun si line chal rahi hai
  let charIndex = 0;     // kitne letters dikh rahe hain
  let deleting = false;  // true = letters mit rahe hain

  const tick = () => {
    const phrase = TYPING_PHRASES[phraseIndex];
    target.textContent = phrase.slice(0, charIndex);
    let delay = deleting ? 45 : 85; // milliseconds

    if (!deleting && charIndex < phrase.length) {
      charIndex++;                         // ek letter aur likho
    } else if (deleting && charIndex > 0) {
      charIndex--;                         // ek letter mitao
    } else if (!deleting) {
      deleting = true;                     // line poori likh gayi, thoda ruko
      delay = 1400;
    } else {
      deleting = false;                    // line mit gayi, agli line shuru
      phraseIndex = (phraseIndex + 1) % TYPING_PHRASES.length;
      delay = 350;
    }
    setTimeout(tick, delay);
  };
  tick();
}


/* ==========================================================
   9. CONTACT FORM (page chhode bina message bhejta hai)
   ========================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const sendBtn = document.getElementById('sendBtn');
  const success = document.getElementById('formSuccessMessage');
  const error = document.getElementById('formErrorMessage');
  if (!form || !sendBtn || !success || !error) return;

  const label = sendBtn.querySelector('span');
  const defaultLabel = label.textContent;
  let hideTimer;

  // Success ya error box 5 second dikhao, phir chhupa do
  const showMessage = box => {
    success.hidden = true;
    error.hidden = true;
    box.hidden = false;
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => { box.hidden = true; }, 5000);
  };

  form.addEventListener('submit', async event => {
    event.preventDefault();               // page reload nahi hone dena
    if (!form.reportValidity()) return;   // khali field ho to browser khud bata dega

    sendBtn.disabled = true;
    label.textContent = 'Sending...';

    try {
      // Formspree ko form ka data bhejo
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      form.reset();
      showMessage(success);
    } catch (err) {
      console.error(err);
      showMessage(error);
    } finally {
      sendBtn.disabled = false;
      label.textContent = defaultLabel;
    }
  });
}


/* ==========================================================
   10. START (page load hote hi sab chalu)
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMenu();
  renderSkills();
  renderProjects();
  initScrollSpy();
  initTyping();
  initContactForm();
  closeModalBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); }); // popup ke bahar click
});
