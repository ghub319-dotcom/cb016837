// ==========================
// Live clock
// ==========================
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  const s = String(now.getSeconds()).padStart(2,'0');
  document.getElementById('clock').textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();


// ==========================
// Breathing animation
// ==========================
let iv;
const rect = document.getElementById('rect');
const steps = ['Inhale','Hold','Exhale','Hold'];
const scales = ['scale(1)','scale(1.3)','scale(1)','scale(0.8)'];
let idx = 0;

document.getElementById('start-breath').addEventListener('click', () => {
  idx = 0;
  iv = setInterval(() => {
    rect.textContent = steps[idx];
    rect.style.transform = scales[idx];
    idx = (idx + 1) % steps.length;
  }, 3000);
});

document.getElementById('stop-breath').addEventListener('click', () => {
  clearInterval(iv);
  rect.textContent = 'Breathe';
  rect.style.transform = 'scale(1)';
});


// ==========================
// Calm music toggle
// ==========================
function toggleMusic(id) {
  const audio = document.getElementById(id);
  audio.paused ? audio.play() : audio.pause();
}

document.getElementById('toggle-nature').addEventListener('click', () => toggleMusic('nature'));
document.getElementById('toggle-piano').addEventListener('click', () => toggleMusic('piano'));
