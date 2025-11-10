const nav = document.getElementById('site-nav');
const toggle = document.querySelector('.nav-toggle');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id && id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
    }
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('cv-link').href = 'assets/Thulisile_Vilakazi_CV_.pdf';

const projects = [
  {
    title: 'Bus Schedule App (Python ETL)',
    desc: 'Parses PDF timetables into structured CSV/JSON with a clean pipeline.',
    image: 'https://placehold.co/1200x700/162447/ffffff?text=Bus+Schedule+App',
    tags: ['Python','Pandas','ETL'],
    github: '',
    demo: ''
  },
  {
    title: 'Legal Companion App',
    desc: 'Plain-language legal-tech for SA customary marriage law.',
    image: 'assets/Legal.png',
    tags: ['Django','UX Writing'],
    github: '',
    demo: ''
  },
  {
    title: 'Mukuru Loyalty Rewards Hub (SheHacks)',
    desc: 'Hackathon prototype for onboarding and points logic.',
    image: 'assets/mukuru_display.png',
    tags: ['Django','Postgres','Teamwork'],
    github: '',
    demo: ''
  }
];

const grid = document.getElementById('project-grid');
grid.innerHTML = projects.map(p => {
  const tags = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
  const github = p.github
    ? `<a class="btn" href="${p.github}" target="_blank" rel="noreferrer">GitHub</a>`
    : `<span class="btn" style="opacity:.6;cursor:default">GitHub (soon)</span>`;
  const demo = p.demo
    ? `<a class="btn" href="${p.demo}" target="_blank" rel="noreferrer">Demo</a>`
    : `<span class="btn" style="opacity:.6;cursor:default">Demo (soon)</span>`;
  return `
    <article class="project">
      <img src="${p.image}" alt="${p.title}">
      <div class="inner">
        <h3>${p.title}</h3>
        <p class="body">${p.desc}</p>
        <div class="meta">${tags}</div>
        <div class="links">${github}${demo}</div>
      </div>
    </article>
  `;
}).join('');

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const btn = document.getElementById('send-btn');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.textContent = '';
  btn.disabled = true; btn.textContent = 'Sending…';

  status.textContent = 'EmailJS not configured. Use the "Email me instead" button.';
  btn.disabled = false; btn.textContent = 'Send';
});
(function () {
  const el = document.querySelector('.intro-type');
  if (!el) return;

  const text = el.getAttribute('data-text') || '';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { el.textContent = text; return; }

  el.textContent = '';
  let i = 0;

  // slightly vary speed; pause a touch after punctuation
  const base = 80; // ms
  function next() {
    if (i >= text.length) return; // done
    el.textContent += text[i];
    i++;
    const ch = text[i - 1];
    let delay = base + Math.random() * 40;
    if (',.:—–'.includes(ch)) delay += 120;
    if (ch === ' ') delay -= 20;
    setTimeout(next, Math.max(30, delay));
  }
  next();
})();

// Community slider (scoped)
(function(){
  const slider = document.querySelector('.comm-slider');
  if(!slider) return;

  const track = slider.querySelector('.slides');
  const imgs = Array.from(slider.querySelectorAll('img'));
  const dots = Array.from(slider.querySelectorAll('.dot'));
  const prev = slider.querySelector('.prev');
  const next = slider.querySelector('.next');

  let index = 0;
  let timer = null;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function go(i) {
    index = (i + imgs.length) % imgs.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, j) => d.setAttribute('aria-selected', j === index ? 'true' : 'false'));
  }

  function startAuto() {
    if (prefersReduced) return;
    stopAuto();
    timer = setInterval(() => go(index + 1), 4000);
  }
  function stopAuto() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  prev.addEventListener('click', () => { go(index - 1); startAuto(); });
  next.addEventListener('click', () => { go(index + 1); startAuto(); });
  dots.forEach((d, j) => d.addEventListener('click', () => { go(j); startAuto(); }));

  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  // init
  go(0);
  startAuto();
})();

