'use strict';

/* ==========================================================
   DATA
   ========================================================== */
const ICON = (name, variant = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant}.svg`;

// Every tool appears once. Duplicates are also removed in code (see renderSkills).
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

const PROJECTS = [
  {
    title: 'Jenkins CI/CD Pipeline Automation',
    summary: 'Personal project: a Jenkins pipeline that pulls code from GitHub, builds a Docker image and deploys it to AWS EC2.',
    details: 'A personal learning project that automates build and deployment of a sample application using a Jenkinsfile, Docker and AWS EC2, triggered from a GitHub repository.',
    problem: 'Manual builds and deployments are slow and easy to get wrong.',
    built: 'A Jenkins pipeline that pulls code from GitHub, builds a Docker image and deploys the container to an AWS EC2 instance.',
    learned: 'Writing pipelines as code, Docker image builds, and how a failed stage stops a bad release.',
    image: 'images/jenkins-pipeline.svg',
    tags: ['GitHub', 'Docker', 'Jenkins', 'AWS EC2'],
    tools: [
      { name: 'GitHub',  icon: ICON('github'), invertInDark: true },
      { name: 'Docker',  icon: ICON('docker') },
      { name: 'Jenkins', icon: ICON('jenkins') },
      { name: 'AWS EC2', icon: ICON('amazonwebservices', 'plain-wordmark'), invertInDark: true },
    ],
    repo: '', // paste the real repo URL here; falls back to GITHUB_PROFILE while empty
  },
  {
    title: 'Terraform AWS Infrastructure',
    summary: 'Personal project: Terraform code that creates a VPC, EC2 Auto Scaling, load balancer, RDS and S3 on AWS.',
    details: 'A personal learning project that provisions a small AWS environment with Terraform instead of clicking through the console, so it can be recreated the same way every time.',
    problem: 'Creating cloud resources by hand is slow and hard to repeat.',
    built: 'Terraform modules for a VPC with public and private subnets, an Application Load Balancer, EC2 Auto Scaling, RDS MySQL and S3, with remote state in S3 and DynamoDB locking.',
    learned: 'Infrastructure as Code basics, Terraform modules and state, and core AWS networking.',
    image: 'images/terraform-aws.svg',
    tags: ['Terraform', 'AWS VPC', 'EC2', 'RDS', 'S3', 'ALB'],
    tools: [
      { name: 'Terraform', icon: ICON('terraform') },
      { name: 'AWS',       icon: ICON('amazonwebservices', 'plain-wordmark'), invertInDark: true },
    ],
    repo: '', // paste the real repo URL here; falls back to GITHUB_PROFILE while empty
  },
  {
    title: 'Prometheus & Grafana Monitoring',
    summary: 'Personal project: a Docker Compose monitoring stack with dashboards and threshold alerts.',
    details: 'A personal learning project that monitors a host and its containers with Prometheus and Grafana, running everything with Docker Compose.',
    problem: 'Without monitoring, problems are noticed only after something breaks.',
    built: 'Prometheus scraping Node Exporter and cAdvisor, Grafana dashboards for CPU, memory, disk and container health, and AlertManager email alerts on thresholds.',
    learned: 'How metrics are collected and queried, building dashboards, and setting alert rules.',
    image: 'images/monitoring-stack.svg',
    tags: ['Prometheus', 'Grafana', 'AlertManager', 'Docker Compose'],
    tools: [
      { name: 'Prometheus', icon: ICON('prometheus') },
      { name: 'Grafana',    icon: ICON('grafana') },
      { name: 'Docker',     icon: ICON('docker') },
    ],
    repo: '', // paste the real repo URL here; falls back to GITHUB_PROFILE while empty
  },
];

// Used by any project whose own `repo` is empty. Replace with your real profile URL.
const GITHUB_PROFILE = 'https://github.com';

const TYPING_PHRASES = ['an Aspiring DevOps Engineer', 'a DevOps Intern', 'a Cloud & CI/CD Learner'];

/* ==========================================================
   HELPERS
   ========================================================== */
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

function toolImg(tool) {
  const img = el('img', { src: tool.icon, alt: tool.name, loading: 'lazy' });
  if (tool.invertInDark) img.classList.add('invert-dark');
  return img;
}

/* ==========================================================
   SKILLS (names + icons only, no percentages, no duplicates)
   ========================================================== */
function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;
  const seen = new Set();

  SKILL_GROUPS.forEach(group => {
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
   PROJECTS + MODAL + CAROUSEL
   ========================================================== */
const modal = document.getElementById('detailsModal');
const modalBody = document.getElementById('modalBodyContent');
const closeModalBtn = document.getElementById('closeModalBtn');
let lastFocused = null;

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
  document.body.classList.add('modal-open');
  closeModalBtn?.focus();
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  lastFocused?.focus?.();
}

function renderProjects() {
  const carousel = document.getElementById('projectCarousel');
  const prevBtn = document.getElementById('prevProjBtn');
  const nextBtn = document.getElementById('nextProjBtn');
  const counter = document.getElementById('projCounter');
  if (!carousel) return;

  const cards = PROJECTS.map(project => {
    const detailsBtn = el('button', { type: 'button', class: 'btn btn-sm btn-primary view-details' },
      [el('i', { class: 'fa-solid fa-circle-info', 'aria-hidden': 'true' }), ' Details']);
    detailsBtn.addEventListener('click', () => openModal(project));

    return el('article', { class: 'project-card' }, [
      el('div', { class: 'project-thumb' }, [el('img', { src: project.image, alt: `${project.title} diagram` })]),
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

  let current = 0;
  const show = index => {
    current = (index + cards.length) % cards.length;
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
   THEME + MOBILE MENU
   ========================================================== */
function initTheme() {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');

  const apply = theme => {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (_) { /* storage unavailable */ }
    if (!btn) return;
    const dark = theme === 'dark';
    btn.innerHTML = `<i class="fa-solid ${dark ? 'fa-sun' : 'fa-moon'}" aria-hidden="true"></i>`;
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
  };

  let saved = 'light';
  try { saved = localStorage.getItem('theme') || 'light'; } catch (_) { /* ignore */ }
  apply(saved === 'dark' ? 'dark' : 'light');
  btn?.addEventListener('click', () => apply(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));
}

function initMenu() {
  const menuBtn = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  if (!menuBtn || !navMenu) return;

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
  document.addEventListener('click', e => {
    if (!navMenu.contains(e.target) && !menuBtn.contains(e.target)) setOpen(false);
  });
  navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { setOpen(false); closeModal(); }
  });
}

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
   TYPING ANIMATION (fixed-size box so layout never shifts)
   ========================================================== */
function initTyping() {
  const target = document.getElementById('typing-text');
  if (!target) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const phrase = TYPING_PHRASES[phraseIndex];
    target.textContent = phrase.slice(0, charIndex);
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
      phraseIndex = (phraseIndex + 1) % TYPING_PHRASES.length;
      delay = 350;
    }
    setTimeout(tick, delay);
  };
  tick();
}


/* ==========================================================
   CONTACT FORM (sends in the background, stays on the page)
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

  const showMessage = box => {
    success.hidden = true;
    error.hidden = true;
    box.hidden = false;
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => { box.hidden = true; }, 5000);
  };

  form.addEventListener('submit', async event => {
    event.preventDefault(); // never navigate away from the page
    if (!form.reportValidity()) return;

    sendBtn.disabled = true;
    label.textContent = 'Sending...';

    try {
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
   INIT
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
  modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });
});
