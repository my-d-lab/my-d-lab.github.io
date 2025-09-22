// nav.js: Injects navigation and handles arrow/scroll navigation
const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/pages/about.html' },
  { name: 'Services', href: '/pages/services.html' },
  { name: 'Portfolio', href: '/pages/portfolio.html' },
  { name: 'Blog', href: '/pages/blog.html' },
  { name: 'Contact', href: '/pages/contact.html' },
  { name: 'FAQ', href: '/pages/faq.html' }
];

function injectNav() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  nav.innerHTML = `
    <ul class="nav-list">
      ${navLinks.map(link => `<li><a href="${link.href}">${link.name}</a></li>`).join('')}
    </ul>
    <div class="nav-arrows">
      <button id="nav-arrow-left" aria-label="Previous section/page">&#8592;</button>
      <button id="nav-arrow-right" aria-label="Next section/page">&#8594;</button>
    </div>
  `;
}

function getCurrentPageIndex() {
  const path = window.location.pathname;
  return navLinks.findIndex(link => link.href === path || (link.href === '/' && path === '/index.html'));
}

function goToPage(idx) {
  if (idx < 0 || idx >= navLinks.length) return;
  window.location.href = navLinks[idx].href;
}

document.addEventListener('DOMContentLoaded', () => {
  injectNav();
  const idx = getCurrentPageIndex();
  document.getElementById('nav-arrow-left').onclick = () => goToPage(idx - 1);
  document.getElementById('nav-arrow-right').onclick = () => goToPage(idx + 1);

  // Keyboard navigation (left/right arrows)
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') goToPage(idx - 1);
    if (e.key === 'ArrowRight') goToPage(idx + 1);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
