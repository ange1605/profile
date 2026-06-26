// ============================================================
//  contact.js — Contact form logic
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  const form    = document.getElementById('contact-form');
  const status  = document.getElementById('form-status');
  const btn     = document.getElementById('form-submit');

  if (!form) return;

  // ── Field validation ─────────────────────────────────────
  function validate(field) {
    const val = field.value.trim();
    const group = field.closest('.form-group');
    const err   = group?.querySelector('.form-error');

    let message = '';

    if (!val) {
      message = 'This field is required.';
    } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      message = 'Please enter a valid email address.';
    } else if (field.id === 'msg' && val.length < 20) {
      message = 'Message must be at least 20 characters.';
    }

    if (err) err.textContent = message;
    group?.classList.toggle('has-error', !!message);
    return !message;
  }

  // Live validation on blur
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', () => validate(field));
    field.addEventListener('input', () => {
      if (field.closest('.form-group')?.classList.contains('has-error')) {
        validate(field);
      }
    });
  });

  // ── Submit ────────────────────────────────────────────────
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields  = form.querySelectorAll('input, textarea');
    const allValid = [...fields].map(validate).every(Boolean);

    if (!allValid) return;

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const msg     = document.getElementById('msg').value.trim();

    // Build mailto link
    const to      = PROFILE.contact.email;
    const subLine = subject || `Message from ${name} via portfolio`;
    const body    = `Hi Angeline,\n\n${msg}\n\n---\nFrom: ${name}\nEmail: ${email}`;
    const mailURL = `mailto:${to}?subject=${encodeURIComponent(subLine)}&body=${encodeURIComponent(body)}`;

    // Show loading
    btn.disabled = true;
    btn.textContent = 'Opening mail client…';

    // Open mailto
    window.location.href = mailURL;

    setTimeout(() => {
      showStatus('success', `Thanks, ${name}! Your mail client should have opened. If not, email me directly at ${to}.`);
      form.reset();
      form.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }, 1200);
  });

  function showStatus(type, message) {
    status.textContent = message;
    status.className   = `form-status form-status--${type}`;
    status.style.display = 'block';
    status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setTimeout(() => { status.style.display = 'none'; }, 8000);
  }
});