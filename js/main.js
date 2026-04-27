// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav   = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
  navToggle.classList.toggle('active');
});

// Close nav on link click (mobile)
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// Dropdown con timer compartido entre el <li> y el propio dropdown
document.querySelectorAll('.has-dropdown').forEach(item => {
  const dropdown = item.querySelector('.dropdown');
  let timer = null;

  function show() {
    clearTimeout(timer);
    item.classList.add('dropdown-open');
  }

  function hide() {
    timer = setTimeout(() => item.classList.remove('dropdown-open'), 200);
  }

  // Desktop: hover en el <li> Y en el dropdown para que el timer se cancele al entrar
  if (window.innerWidth >= 768) {
    item.addEventListener('mouseenter', show);
    item.addEventListener('mouseleave', hide);
    if (dropdown) {
      dropdown.addEventListener('mouseenter', show);
      dropdown.addEventListener('mouseleave', hide);
    }
  }

  // Mobile: toggle con tap en el enlace padre
  item.querySelector(':scope > a').addEventListener('click', e => {
    if (window.innerWidth < 768) {
      e.preventDefault();
      item.classList.toggle('dropdown-open');
    }
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav ul li > a:not(.btn-nav)');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.3 });

sections.forEach(s => observer.observe(s));

// Contact form mock submit
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Enviando...';
  setTimeout(() => {
    btn.textContent = 'Enviar mensaje';
    btn.disabled = false;
    successMsg.classList.add('show');
    form.reset();
    setTimeout(() => successMsg.classList.remove('show'), 5000);
  }, 1200);
});

// Header shadow on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10
    ? '0 4px 24px rgba(0,42,92,.15)'
    : '0 2px 12px rgba(0,42,92,.10)';
});

// Animate stats counter on first view
const statNumbers = document.querySelectorAll('.stat-number');

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const raw = el.textContent;
    const prefix = raw.startsWith('+') ? '+' : '';
    const num = parseInt(raw.replace(/\D/g, ''), 10);
    if (isNaN(num)) return;
    let current = 0;
    const step = Math.ceil(num / 40);
    const timer = setInterval(() => {
      current = Math.min(current + step, num);
      el.textContent = prefix + current;
      if (current >= num) clearInterval(timer);
    }, 30);
    statObserver.unobserve(el);
  });
}, { threshold: 0.5 });

statNumbers.forEach(n => statObserver.observe(n));
