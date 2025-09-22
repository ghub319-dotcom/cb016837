// Populate filter categories
const filter = document.getElementById('filter-cat');
const catSet = new Set(recipes.map(r => r.category));
[...catSet].forEach(c => {
  const o = document.createElement('option');
  o.value = c;
  o.textContent = c;
  filter.appendChild(o);
});

// Render recipe grid
function renderGrid(list) {
  const g = document.getElementById('recipes-grid');
  g.innerHTML = '';
  list.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
      <img src="${r.img}" alt="">
      <h4>${r.title}</h4>
      <p>${r.desc}</p>
      <button data-id="${i}" class="open-btn">View</button>
    `;
    g.appendChild(card);
  });
}
renderGrid(recipes);

// Search and filter
document.getElementById('search').addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase();
  const cat = filter.value;
  const filtered = recipes.filter(r =>
    r.title.toLowerCase().includes(q) && (cat ? r.category === cat : true)
  );
  renderGrid(filtered);
});
filter.addEventListener('change', () => document.getElementById('search').dispatchEvent(new Event('input')));

// Modal logic
const modal = document.getElementById('modal');
document.getElementById('recipes-grid').addEventListener('click', (e) => {
  if (!e.target.classList.contains('open-btn')) return;
  const id = +e.target.dataset.id;
  const r = recipes[id];

  document.getElementById('modal-title').textContent = r.title;
  document.getElementById('modal-img').src = r.img;

  const ul = document.getElementById('modal-ingredients');
  ul.innerHTML = '';
  r.ingredients.forEach(i => {
    const li = document.createElement('li');
    li.textContent = i;
    ul.appendChild(li);
  });

  const ol = document.getElementById('modal-steps');
  ol.innerHTML = '';
  r.steps.forEach(s => {
    const li = document.createElement('li');
    li.textContent = s;
    ol.appendChild(li);
  });

  const tb = document.querySelector('#modal-nutrition tbody');
  tb.innerHTML = '';
  Object.entries(r.nutrition).forEach(([k, v]) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${k}</td><td>${v}</td>`;
    tb.appendChild(tr);
  });

  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
});

document.getElementById('modal-close').addEventListener('click', () => {
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
});
