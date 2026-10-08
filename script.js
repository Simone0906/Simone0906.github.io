const root = document.documentElement;
const toggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('portfolio-theme');

if (savedTheme === 'dark') {
  root.classList.add('dark');
  toggle.setAttribute('aria-pressed', 'true');
}

toggle.addEventListener('click', () => {
  const isDark = root.classList.toggle('dark');
  toggle.setAttribute('aria-pressed', String(isDark));
  localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const navLinks = [...document.querySelectorAll('nav a')];
const sections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-25% 0px -65% 0px' });

sections.forEach((section) => navObserver.observe(section));
