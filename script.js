/* ═══════════════════════════════════════════════════════════════════════════
   MANISH KULKARNI — Site JavaScript
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Footer year ─────────────────────────────────────────────────────── */
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── Back to top — smooth scroll override ────────────────────────────── */
document.querySelectorAll('a[href="#top"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

/* ── Mobile nav toggle ───────────────────────────────────────────────── */
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }));
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    }
  });
}

/* ── Scroll-reveal (IntersectionObserver) ────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

/* ── Video modal ─────────────────────────────────────────────────────── */
const modal = document.getElementById('video-modal');
const iframe = document.getElementById('video-modal-iframe');
const modalTitle = document.getElementById('video-modal-title');
const ytLink = document.getElementById('video-modal-yt-link');
const closeBtn = modal ? modal.querySelector('.video-modal-close') : null;
const backdrop = modal ? modal.querySelector('.video-modal-backdrop') : null;

function openModal(videoId, title, originalHref) {
  if (!modal || !iframe) return;
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  if (modalTitle) modalTitle.textContent = title || '';
  if (ytLink) ytLink.href = originalHref || '#';
  modal.hidden = false;
  document.body.classList.add('modal-open');
}
function closeModal() {
  if (!modal || !iframe) return;
  iframe.src = '';
  modal.hidden = true;
  document.body.classList.remove('modal-open');
}
document.querySelectorAll('[data-video-id]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(link.getAttribute('data-video-id'), link.getAttribute('data-video-title'), link.getAttribute('href'));
  });
});
if (closeBtn) closeBtn.addEventListener('click', closeModal);
if (backdrop) backdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && !modal.hidden) closeModal();
});

/* ── Contact form fallback submit handler (non-contact pages) ────────── */
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', () => {
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
    }, 2500);
  });
}
