// ==========================
// Live Clock
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
// Workout Generation
// ==========================
function genWorkout(){
  const bp = document.getElementById('bodypart').value;
  const eq = document.getElementById('equip').value;
  const pool = workouts.filter(w=> (w.body===bp||bp==='full'&&w.body==='full') && (w.equipment==='any' || w.equipment===eq));
  const chosen = [];
  for(let i=0;i<5 && pool.length;i++){
    const idx = Math.floor(Math.random()*pool.length);
    chosen.push(pool[idx]);
    pool.splice(idx,1);
  }
  const ol = document.getElementById('ex-list'); ol.innerHTML='';
  chosen.forEach(c=>{
    const li = document.createElement('li');
    li.innerHTML = `<strong>${c.name}</strong> — ${c.duration}s`;
    li.dataset.duration = c.duration;
    ol.appendChild(li);
  });
  document.getElementById('plan').classList.remove('hidden');
  saveToLocal('last_workout', {date:new Date().toISOString(), plan: chosen});
}

document.getElementById('gen-btn').addEventListener('click', genWorkout);


// ==========================
// Timer Functionality
// ==========================
let timerInterval, currentIndex=0, currentList=[];

document.getElementById('start-ex').addEventListener('click', startExercise);

function startExercise(){
  const items = document.querySelectorAll('#ex-list li');
  currentList = Array.from(items);
  if(!currentList.length) return;
  currentIndex = 0;
  document.getElementById('timer-area').classList.remove('hidden');
  nextExercise();
}

function nextExercise(){
  if(currentIndex >= currentList.length){
    document.getElementById('current-ex').textContent = 'Done!';
    document.getElementById('countdown').textContent = '00:00';
    window.clearInterval(timerInterval);
    return;
  }
  const li = currentList[currentIndex];
  const name = li.querySelector('strong').textContent, dur = +li.dataset.duration;
  document.getElementById('current-ex').textContent = name;
  let t = dur;
  const display = document.getElementById('countdown');
  display.textContent = t.toString().padStart(2,'0') + ':00'.slice(3);

  window.clearInterval(timerInterval);
  timerInterval = setInterval(()=>{
    if(t<=0){ clearInterval(timerInterval); currentIndex++; nextExercise(); return; }
    t--;
    display.textContent = t.toString().padStart(2,'0') + ':00'.slice(3);
  }, 1000);
}

document.getElementById('workout-form').addEventListener('submit', (e)=>e.preventDefault());
