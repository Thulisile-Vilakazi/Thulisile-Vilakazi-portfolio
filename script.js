// Mobile nav toggle
const nav = document.getElementById('site-nav');
const toggle = document.querySelector('.nav-toggle');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

// Smooth scroll (respects reduced motion)
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

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// CV link (replace with your real PDF URL)
document.getElementById('cv-link').href = '#'; // e.g., 'https://your-domain/cv.pdf'

// Projects data
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
    image: 'https://placehold.co/1200x700/0f1a30/ffffff?text=Legal+Companion+App',
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

// Contact form (EmailJS optional; fallback shows message)
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const btn = document.getElementById('send-btn');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.textContent = '';
  btn.disabled = true; btn.textContent = 'Sending…';

  // Fill and enable if you want EmailJS:
  // emailjs.sendForm('SERVICE_ID','TEMPLATE_ID',form)
  //   .then(() => { status.textContent='Thanks! Your message was sent.'; form.reset(); })
  //   .catch(() => { status.textContent='Could not send via EmailJS. Please use the email button.'; })
  //   .finally(() => { btn.disabled = false; btn.textContent = 'Send'; });

  // Fallback (no EmailJS configured):
  status.textContent = 'EmailJS not configured. Use the "Email me instead" button.';
  btn.disabled = false; btn.textContent = 'Send';
});
