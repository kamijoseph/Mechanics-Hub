
// script.js — small shared interactions: mobile nav, year update, simple form handling

document.addEventListener('DOMContentLoaded', function () {
  // set year in footer
  const years = document.querySelectorAll('[id^="year"]');
  years.forEach(el => el.textContent = new Date().getFullYear());

  // mobile nav toggles: find all .nav-toggle buttons and their adjacent nav
  document.querySelectorAll('.nav-toggle').forEach(btn => {
    btn.addEventListener('click', function () {
      // the nav to control: nextElementSibling or query by aria-controls
      const aria = btn.getAttribute('aria-controls');
      let nav = document.getElementById(aria) || btn.nextElementSibling;
      if (!nav) return;
      const isVisible = nav.getAttribute('data-visible') === 'true';
      nav.setAttribute('data-visible', (!isVisible).toString());
      btn.setAttribute('aria-expanded', (!isVisible).toString());
    });
  });

  // simple contact form UX: prevent real submit and show a quick success microanimation
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // minor simulated delay for UX (replace with real AJAX/fetch)
      setTimeout(() => {
        btn.textContent = 'Sent ✓';
        btn.classList.add('success');
        // reset after a few seconds
        setTimeout(() => {
          btn.textContent = orig;
          btn.disabled = false;
          btn.classList.remove('success');
          form.reset();
        }, 1600);
      }, 700);
    });
  }
});
