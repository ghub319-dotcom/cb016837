// ==========================
// Feedback form
// ==========================
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const name  = document.getElementById('c-name').value.trim();
  const email = document.getElementById('c-email').value.trim();
  const msg   = document.getElementById('c-msg').value.trim();

  if (!name || !email || !msg) return alert('Please fill all fields.');

  const fb = JSON.parse(localStorage.getItem('gb_feedback') || '[]');
  fb.push({name, email, msg, date: new Date().toISOString()});
  localStorage.setItem('gb_feedback', JSON.stringify(fb));

  const confirm = document.getElementById('confirm');
  confirm.classList.remove('hidden');
  confirm.textContent = '✅ Thank you — your feedback is saved locally (for viva).';
  e.target.reset();
});


// ==========================
// FAQ Accordion
// ==========================
document.querySelectorAll('.acc-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    const panel = btn.nextElementSibling;
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
  });
});
