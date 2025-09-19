
// Reusable JS across pages
function saveToLocal(key, obj){
  try{
    localStorage.setItem(key, JSON.stringify(obj));
  }catch(e){ console.warn('storage error', e); }
}

// Simple responsive hamburger
document.querySelectorAll('.hamburger').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const nav = document.querySelector('nav');
    if(nav.style.display === 'block') nav.style.display = '';
    else nav.style.display = 'block';
  });
});

// Register a basic service worker for PWA (works if served over HTTPS or localhost)
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js').catch(()=>{});
}
