// ── Scroll-triggered Reveal Animations ──
const revealElements = document.querySelectorAll('.reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach((el, i) => {
  el.style.transitionDelay = `${i % 4 * 80}ms`;
  revealObserver.observe(el);
});

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  navbar.classList.toggle('navbar--scrolled', currentScroll > 50);
  navbar.classList.toggle('navbar--hidden', currentScroll > lastScroll && currentScroll > 400);
  lastScroll = currentScroll;
});

// ── Mobile menu toggle ──
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.classList.toggle('menu-open');
});

navMenu.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
  });
});

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Active nav link highlighting ──
const sections = document.querySelectorAll('section[id]');

const highlightNav = () => {
  const scrollY = window.scrollY + 120;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
};

window.addEventListener('scroll', highlightNav);
highlightNav();

// ── Animated counter for achievement numbers ──
const counterElements = document.querySelectorAll('.achievement-card__number');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

function animateCounter(el) {
  const text = el.textContent;
  const prefix = text.match(/^[^0-9]*/)[0];
  const suffix = text.match(/[^0-9]*$/)[0];
  const num = parseInt(text.replace(/[^0-9]/g, ''));
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * num);
    el.textContent = prefix + current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

counterElements.forEach((el) => counterObserver.observe(el));

// ── Hero background grid animation via CSS custom properties ──
document.addEventListener('mousemove', (e) => {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const rect = hero.getBoundingClientRect();
  if (e.clientY > rect.bottom) return;
  const x = ((e.clientX / window.innerWidth) - 0.5) * 20;
  const y = ((e.clientY / window.innerHeight) - 0.5) * 20;
  hero.style.setProperty('--mouse-x', `${e.clientX}px`);
  hero.style.setProperty('--mouse-y', `${e.clientY}px`);
  document.querySelectorAll('.hero-glow').forEach((glow, i) => {
    const factor = i === 0 ? 1 : -0.6;
    glow.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});
