/* ── Nav scroll */
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40));

/* ── Hamburger */
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobileNav');
ham.addEventListener('click', () => {
  ham.classList.toggle('active');
  mob.classList.toggle('open');
  document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
});
mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  ham.classList.remove('active'); mob.classList.remove('open'); document.body.style.overflow = '';
}));

/* ── Scroll reveal */
const io = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      const existing = e.target.style.transitionDelay;
      if (!existing) e.target.style.transitionDelay = (i % 4) * 0.08 + 's';
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach(el => io.observe(el));

/* ── Process step switcher */
const steps = [
  { num:'01', title:'Process Mapping & Audit', body:'We deeply audit your current workflows, identify bottlenecks, and map every process the system must support. You receive a full System Requirements Document before any design or development begins.', dels:['Workflow audit report','Process flow diagrams','Pain point analysis','System requirements doc','Project timeline'], pNum:'02', pTitle:'System Design', pBody:'Data model, role hierarchy, module architecture, and third-party integrations fully designed before development.' },
  { num:'02', title:'System Design', body:'We design the complete data model, role hierarchy, module structure, and integration map. Every entity, relationship, and permission is defined and documented — approved by you before a single component is built.', dels:['Data model diagram','Role & permission matrix','Module architecture map','Integration specification','API contract docs'], pNum:'03', pTitle:'UI Design', pBody:'High-fidelity Figma designs for every dashboard, form, and workflow screen — approved before development.' },
  { num:'03', title:'UI Design in Figma', body:'Every dashboard, form, report, and workflow screen designed in high-fidelity Figma. We prioritise usability for daily users, not just aesthetics. You approve every screen before development begins.', dels:['Full Figma design file','Dashboard wireframes','Mobile + desktop views','User flow prototypes','Design handoff specs'], pNum:'04', pTitle:'Development Sprints', pBody:'Two-week sprints, live staging demos every cycle, and 85%+ test coverage throughout.' },
  { num:'04', title:'Development Sprints', body:'Two-week agile sprints with a live staging demo at the end of every cycle. You test real working software on staging and give direct feedback before each sprint closes. 85%+ test coverage maintained.', dels:['Working staging system','Sprint demo recordings','Code review reports','85%+ test coverage','Weekly progress reports'], pNum:'05', pTitle:'Migration & Go-Live', pBody:'Clean data migration, staff training sessions, and zero-downtime go-live with a full post-launch support period.' },
  { num:'05', title:'Migration & Go-Live', body:'We handle the full data migration from your existing systems — cleaning, transforming, and importing all historical records. Staff training sessions included. Zero-downtime go-live with a dedicated post-launch support period.', dels:['Data migration scripts','Historical data import','Staff training sessions','Go-live runbook','Post-launch support plan'], pNum:'01', pTitle:'Process Mapping', pBody:'Back to the start for your next module, feature expansion, or process automation.' },
];
document.querySelectorAll('.step-btn').forEach((btn, i) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.step-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const d = steps[i];
    document.getElementById('paneNum').textContent = d.num;
    document.getElementById('paneTitle').textContent = d.title;
    document.getElementById('paneBody').textContent = d.body;
    document.getElementById('paneDels').innerHTML = d.dels.map(t => `<span class="del-tag">${t}</span>`).join('');
    document.getElementById('previewNum').textContent = d.pNum;
    document.getElementById('previewTitle').textContent = d.pTitle;
    document.getElementById('previewBody').textContent = d.pBody;
  });
});

/* ── FAQ */
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item'), isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ── Counter animation */
const cio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const raw = el.getAttribute('data-count');
    if (!raw) return;
    const target = parseInt(raw);
    const sup = el.querySelector('sup') ? el.querySelector('sup').outerHTML : '';
    const dur = 1400, start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.innerHTML = Math.floor(ease * target) + sup;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    cio.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));