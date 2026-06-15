
/* ==========================================================
   HAMBURGER MENU
========================================================== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
if (mobileMenu) mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ==========================================================
   AUTH MODAL
========================================================== */
const overlay   = document.getElementById('authOverlay');
const authModal = document.getElementById('authModal');

function openModal(tab) {
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTab(tab);
}
function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Open triggers
document.getElementById('openLogin').addEventListener('click', () => openModal('login'));
document.getElementById('openSignup').addEventListener('click', () => openModal('signup'));
document.getElementById('openLoginMobile').addEventListener('click', () => { openModal('login'); mobileMenu.classList.remove('open'); hamburger.classList.remove('open'); });
document.getElementById('openSignupMobile').addEventListener('click', () => { openModal('signup'); mobileMenu.classList.remove('open'); hamburger.classList.remove('open'); });

// Close triggers
document.getElementById('authClose').addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// In-modal switches
document.getElementById('switchToSignup').addEventListener('click', () => setTab('signup'));
document.getElementById('switchToLogin').addEventListener('click',  () => setTab('login'));

// Tab switching
function setTab(name) {
  document.querySelectorAll('.auth-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === name);
  });
  document.querySelectorAll('.auth-panel').forEach(p => {
    p.classList.toggle('active', p.id === 'panel-' + name);
  });
}
document.querySelectorAll('.auth-tab').forEach(t => {
  t.addEventListener('click', () => setTab(t.dataset.tab));
});

// Password strength meter
const pwInput = document.getElementById('signupPassword');
if (pwInput) {
  pwInput.addEventListener('input', () => {
    const v = pwInput.value;
    const score = [v.length >= 8, /[A-Z]/.test(v), /[0-9]/.test(v), /[^A-Za-z0-9]/.test(v)].filter(Boolean).length;
    const cls = score <= 1 ? 'weak' : score <= 2 ? 'medium' : 'strong';
    ['s1','s2','s3','s4'].forEach((id, i) => {
      const bar = document.getElementById(id);
      bar.className = 'strength-bar';
      if (i < score) bar.classList.add(cls);
    });
  });
}

/* ==========================================================
   SCROLL REVEAL
========================================================== */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObserver.observe(el));

/* ==========================================================
   HERO COUNTER ANIMATION
========================================================== */
function animateCount(el, target, prefix='', suffix='') {
  const isFloat = target.includes('.');
  const num = parseFloat(target.replace(/[^0-9.]/g,''));
  const dur = 2000;
  const start = performance.now();
  function step(now) {
    const t = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    const val = num * ease;
    el.textContent = prefix + (isFloat ? val.toFixed(1) : Math.floor(val)) + suffix;
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = prefix + target + suffix;
  }
  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('.hero-stat-num');
let counted = false;
const heroObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !counted) {
    counted = true;
    const targets = ['2.4M', '$4.2M', '128', '38'];
    const prefixes = ['', '$', '', ''];
    const suffixes = ['M', '', '', ''];
    const cores = ['2.4', '4.2', '128', '38'];
    statNums.forEach((el, i) => {
      animateCount(el, cores[i], prefixes[i], suffixes[i]);
    });
  }
}, { threshold: 0.5 });
if (statNums[0]) heroObserver.observe(statNums[0]);

/* ==========================================================
   SCHEDULE TABS
========================================================== */
const tabs = document.querySelectorAll('.schedule-tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

/* ==========================================================
   NAV ACTIVE STATE ON SCROLL
========================================================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--cyan)' : '';
  });
});


/* Active link for separate pages */
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) link.classList.add('active');
});
