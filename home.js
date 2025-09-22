// Rotating quotes
const quotes = [
  "🥗 Eat to nourish your body.",
  "🚶 Move your body every day.",
  "🌱 Small steps create big changes.",
  "💧 Hydrate — it's that simple.",
  "🧘 Mindfulness fuels a healthy life."
];
let qi = 0;
function rotateQuote() {
  document.getElementById('rotating-quote').textContent = quotes[qi];
  qi = (qi + 1) % quotes.length;
}
rotateQuote();
setInterval(rotateQuote, 3500);

// Tip of the day based on date
function tipOfDay() {
  const tips = [
    "💧 Start your day with a glass of water.",
    "🥦 Include a portion of vegetables with each meal.",
    "🚶‍♂️ Take a 10-minute walk after lunch.",
    "🍳 Add protein to breakfast to stay full longer.",
    "😌 Practice 5 minutes of deep breathing."
  ];
  const d = new Date();
  const idx = d.getDate() % tips.length;
  document.getElementById('tip-of-day').textContent = tips[idx];
}
tipOfDay();

// Newsletter subscription
document.getElementById('subscribe-btn').addEventListener('click', () => {
  const email = document.getElementById('newsletter-email').value.trim();
  if (!email || !email.includes('@')) return alert('⚠️ Please enter a valid email.');
  const emails = JSON.parse(localStorage.getItem('gb_news') || '[]');
  emails.push({ email, date: new Date().toISOString() });
  localStorage.setItem('gb_news', JSON.stringify(emails));
  alert('🎉 Thanks — subscription saved locally for your viva demo.');
});
