const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// ===== INTRO / BRAND ENTRANCE ANIMATION =====
(function initIntro(){
  const overlay = document.getElementById('introOverlay');
  const particleField = document.getElementById('introParticles');
  const skipBtn = document.getElementById('introSkip');
  const markReady = () => document.body.classList.add('ready');
  if (!overlay) { markReady(); return; }

  // seed floating gold particles
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('span');
    const size = 2 + Math.random() * 5;
    p.style.left = Math.random() * 100 + '%';
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.animationDuration = 3 + Math.random() * 2.8 + 's';
    p.style.animationDelay = Math.random() * 2 + 's';
    particleField.appendChild(p);
  }

  let dismissed = false;
  const dismiss = () => {
    if (dismissed) return;
    dismissed = true;
    overlay.classList.add('intro-hide');
    document.body.classList.remove('intro-lock');
    window.setTimeout(markReady, 350);
    window.setTimeout(() => overlay.remove(), 1400);
  };

  window.setTimeout(dismiss, reduceMotion ? 300 : 3200);
  if (skipBtn) skipBtn.addEventListener('click', dismiss);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) dismiss(); });
})();

// ===== NAV: SCROLL STATE, HIDE ON SCROLL DOWN, PROGRESS BAR =====
(function(){
  const nav = document.getElementById('nav');
  const bar = document.getElementById('scrollProgress');
  const fab = document.querySelector('.wa-fab');
  const mobileMenu = document.getElementById('mobileMenu');
  let lastY = window.scrollY;

  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 60);
    const goingDown = y > lastY && y > 400;
    nav.classList.toggle('hidden', goingDown && !mobileMenu.classList.contains('open'));
    lastY = y;

    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    if (fab) fab.classList.toggle('show', y > window.innerHeight * 0.6);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // highlight the nav link for the section in view
  const links = Array.from(document.querySelectorAll('.nav-links a'));
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));
})();

// ===== MOBILE MENU =====
(function(){
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  const setOpen = (open) => {
    menu.classList.toggle('open', open);
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  toggle.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('open')) setOpen(false); });
})();

// ===== SCROLL REVEAL (staggered among siblings) =====
(function(){
  const targets = document.querySelectorAll('.reveal');
  targets.forEach(el => {
    const siblings = Array.from(el.parentElement.children).filter(c => c.classList.contains('reveal'));
    const i = siblings.indexOf(el);
    if (i > 0) el.style.setProperty('--d', Math.min(i * 0.09, 0.5) + 's');
  });

  // once revealed, hand the element back to its own hover transitions
  const settle = (el) => {
    el.classList.remove('reveal', 'in');
    el.style.removeProperty('--d');
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('in');
      io.unobserve(el);
      el.addEventListener('transitionend', function done(e){
        if (e.target !== el || e.propertyName !== 'transform') return;
        el.removeEventListener('transitionend', done);
        settle(el);
      });
      // fallback in case transitionend never fires
      window.setTimeout(() => settle(el), 2200);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  targets.forEach(el => io.observe(el));
})();

// ===== STATEMENT: WORDS LIGHT UP AS YOU SCROLL =====
(function(){
  const el = document.getElementById('statementText');
  if (!el || reduceMotion) return;

  const wrapWords = (node) => {
    Array.from(node.childNodes).forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const span = document.createElement('span');
          span.className = 'w';
          span.textContent = part;
          frag.appendChild(span);
        });
        node.replaceChild(frag, child);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        wrapWords(child);
      }
    });
  };
  wrapWords(el);
  const words = el.querySelectorAll('.w');

  let ticking = false;
  const update = () => {
    ticking = false;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    // 0 when the paragraph's top hits 85% of the viewport, 1 when its bottom reaches 45%
    const start = vh * 0.85, end = vh * 0.45;
    const progress = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height)));
    const lit = Math.round(progress * words.length);
    words.forEach((w, i) => w.classList.toggle('lit', i < lit));
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
})();

// ===== HERO SLIDESHOW =====
(function(){
  const slides = document.querySelectorAll('.hero-slide');
  const idxEl = document.getElementById('heroIndex');
  const totalEl = document.getElementById('heroTotal');
  const bar = document.getElementById('heroBar');
  if (slides.length < 2) return;

  const pad = (n) => String(n).padStart(2, '0');
  totalEl.textContent = pad(slides.length);
  let current = 0;

  const restartBar = () => {
    bar.classList.remove('run');
    void bar.offsetWidth; // restart CSS animation
    bar.classList.add('run');
  };

  const go = (n) => {
    slides[current].classList.remove('is-active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    idxEl.textContent = pad(current + 1);
    restartBar();
  };

  restartBar();
  if (!reduceMotion) window.setInterval(() => go(current + 1), 6000);
})();

// ===== HERO GOLD SPARKLES (canvas) =====
(function(){
  const canvas = document.getElementById('heroSparkles');
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext('2d');
  const hero = canvas.parentElement;
  let w, h, dpr, particles = [], running = true;

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = hero.clientWidth; h = hero.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const spawn = (initial) => ({
    x: Math.random() * w,
    y: initial ? Math.random() * h : h + 10,
    r: 0.6 + Math.random() * 2.2,
    vy: 0.15 + Math.random() * 0.45,
    vx: (Math.random() - 0.5) * 0.2,
    a: 0.2 + Math.random() * 0.6,
    tw: Math.random() * Math.PI * 2,
  });

  resize();
  const count = w < 600 ? 28 : 60;
  for (let i = 0; i < count; i++) particles.push(spawn(true));
  window.addEventListener('resize', resize);

  const tick = () => {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p, i) => {
      p.y -= p.vy; p.x += p.vx; p.tw += 0.03;
      if (p.y < -10) particles[i] = spawn(false);
      const alpha = p.a * (0.6 + 0.4 * Math.sin(p.tw));
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      g.addColorStop(0, `rgba(243,226,184,${alpha})`);
      g.addColorStop(1, 'rgba(226,195,133,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2); ctx.fill();
    });
    requestAnimationFrame(tick);
  };

  // pause when the hero is off-screen
  new IntersectionObserver(([entry]) => {
    const wasRunning = running;
    running = entry.isIntersecting;
    if (running && !wasRunning) requestAnimationFrame(tick);
  }).observe(hero);
  requestAnimationFrame(tick);
})();

// ===== COUNT-UP NUMBERS =====
(function(){
  const els = document.querySelectorAll('[data-count]');
  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = target + suffix; return; }
    const duration = 1800;
    const t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - k, 4);
      el.textContent = Math.round(target * eased) + suffix;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      // hero numbers wait for the intro to finish
      const el = entry.target;
      const run = () => animate(el);
      if (el.closest('.hero') && !document.body.classList.contains('ready')) {
        const wait = setInterval(() => { if (document.body.classList.contains('ready')) { clearInterval(wait); setTimeout(run, 700); } }, 100);
      } else run();
      io.unobserve(el);
    });
  }, { threshold: 0.6 });
  els.forEach(el => io.observe(el));
})();

// ===== SERVICE CARD SPOTLIGHT =====
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
});

// ===== PROCESS: GOLD RAIL FILLS ON SCROLL =====
(function(){
  const track = document.getElementById('processTrack');
  const fill = document.getElementById('processFill');
  if (!track) return;
  const steps = track.querySelectorAll('.process-step');

  const update = () => {
    const r = track.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / (r.height + vh * 0.25)));
    if (fill) fill.style.transform = `scaleX(${progress})`;
    steps.forEach((s, i) => s.classList.toggle('on', progress >= (i / steps.length) + 0.02 || (i === 0 && progress > 0)));
  };
  window.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  update();
})();

// ===== 3D TILT ON EXPERIENCE CARDS =====
if (finePointer && !reduceMotion) {
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}

// ===== PARALLAX =====
(function(){
  if (reduceMotion) return;
  const items = document.querySelectorAll('.parallax');
  if (!items.length) return;
  const update = () => {
    const vh = window.innerHeight;
    items.forEach(el => {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const speed = parseFloat(el.dataset.speed || '0.1');
      const offset = (r.top + r.height / 2 - vh / 2) * -speed;
      const target = el.querySelector('img') || el;
      target.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
  };
  window.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  update();
})();

// ===== MAGNETIC BUTTONS + CURSOR RING =====
if (finePointer && !reduceMotion) {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
  });

  const ring = document.getElementById('cursorRing');
  let tx = 0, ty = 0, cx = 0, cy = 0;
  window.addEventListener('pointermove', (e) => {
    tx = e.clientX; ty = e.clientY;
    ring.classList.add('is-visible');
  });
  document.addEventListener('pointerleave', () => ring.classList.remove('is-visible'));
  const follow = () => {
    cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
    ring.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(follow);
  };
  follow();
  document.querySelectorAll('a, button, .gallery-item, .chip').forEach(el => {
    el.addEventListener('pointerenter', () => ring.classList.add('is-hover'));
    el.addEventListener('pointerleave', () => ring.classList.remove('is-hover'));
  });
}

// ===== GALLERY: FILTERS, VIEW MORE, LIGHTBOX =====
(function(){
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  const items = Array.from(grid.querySelectorAll('.gallery-item'));
  const chips = document.querySelectorAll('.gallery-filters .chip');
  const moreWrap = document.getElementById('galleryMore').parentElement;
  const moreBtn = document.getElementById('galleryMore');
  const INITIAL = 14;
  let filter = 'all';
  let expanded = false;

  const apply = () => {
    const matching = items.filter(it => filter === 'all' || it.dataset.set === filter);
    items.forEach(it => it.classList.add('is-hidden'));
    const limit = (filter === 'all' && !expanded) ? INITIAL : matching.length;
    matching.slice(0, limit).forEach(it => {
      it.classList.remove('is-hidden');
      it.style.animation = 'none'; void it.offsetWidth; it.style.animation = '';
    });
    moreWrap.classList.toggle('is-hidden', limit >= matching.length);
  };

  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(c => { c.classList.remove('is-active'); c.setAttribute('aria-selected', 'false'); });
    chip.classList.add('is-active');
    chip.setAttribute('aria-selected', 'true');
    filter = chip.dataset.filter;
    apply();
  }));
  moreBtn.addEventListener('click', () => { expanded = true; apply(); });
  apply();

  // lightbox — steps through the photos currently visible
  const lightbox = document.getElementById('lightbox');
  const imgEl = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');
  const counter = document.getElementById('lightboxCounter');
  let visible = [];
  let index = 0;

  const show = (i) => {
    index = (i + visible.length) % visible.length;
    const src = visible[index].querySelector('img');
    imgEl.classList.remove('loaded');
    imgEl.onload = () => imgEl.classList.add('loaded');
    imgEl.src = src.src.replace(/w=\d+/, 'w=2000');
    imgEl.alt = src.alt || '';
    caption.textContent = src.alt || '';
    counter.textContent = `${index + 1} / ${visible.length}`;
  };
  const open = (item) => {
    visible = items.filter(it => !it.classList.contains('is-hidden'));
    show(visible.indexOf(item));
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.getElementById('lightboxClose').focus();
  };
  const close = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  items.forEach(item => {
    item.tabIndex = 0;
    item.setAttribute('role', 'button');
    item.addEventListener('click', () => open(item));
    item.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(item); } });
  });
  document.getElementById('lightboxClose').addEventListener('click', close);
  document.getElementById('lightboxPrev').addEventListener('click', () => show(index - 1));
  document.getElementById('lightboxNext').addEventListener('click', () => show(index + 1));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox || e.target.classList.contains('lightbox-figure')) close(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  // swipe on touch devices
  let startX = null;
  lightbox.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    startX = null;
  });
})();

// ===== TESTIMONIAL CAROUSEL =====
(function(){
  const root = document.getElementById('tCarousel');
  if (!root) return;
  const slides = root.querySelectorAll('.t-slide');
  const dotsWrap = document.getElementById('tDots');
  let current = 0;
  let timer = null;

  const dots = Array.from(slides).map((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', `Show story ${i + 1}`);
    b.addEventListener('click', () => { go(i); restart(); });
    dotsWrap.appendChild(b);
    return b;
  });

  const go = (n) => {
    slides[current].classList.remove('is-active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    dots.forEach((d, i) => d.setAttribute('aria-current', String(i === current)));
  };
  const restart = () => {
    clearInterval(timer);
    if (!reduceMotion) timer = setInterval(() => go(current + 1), 7000);
  };

  document.getElementById('tPrev').addEventListener('click', () => { go(current - 1); restart(); });
  document.getElementById('tNext').addEventListener('click', () => { go(current + 1); restart(); });
  root.addEventListener('mouseenter', () => clearInterval(timer));
  root.addEventListener('mouseleave', restart);
  go(0);
  restart();
})();

// ===== ENQUIRY FORM → WHATSAPP =====
(function(){
  const form = document.getElementById('enquiryForm');
  const formNote = document.getElementById('formNote');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();

    form.name.parentElement.classList.toggle('invalid', !name);
    form.phone.parentElement.classList.toggle('invalid', !phone);
    if (!name || !phone) {
      formNote.textContent = 'Please share your name and phone number so we can reach you.';
      (name ? form.phone : form.name).focus();
      return;
    }

    const event = (form.querySelector('input[name="event"]:checked') || {}).value;
    const rawDate = form.date.value;
    const date = rawDate ? rawDate.split('-').reverse().join('/') : '';
    const city = form.city.value.trim();
    const guests = form.guests.value;
    const message = form.message.value.trim();

    const lines = [
      `Hello Sehras, I'd like to enquire about ${event ? 'a ' + event.toLowerCase() : 'a wedding'}.`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      date ? `Event date: ${date}` : null,
      city ? `City / destination: ${city}` : null,
      guests ? `Expected guests: ${guests}` : null,
      message ? `Details: ${message}` : null,
    ].filter(Boolean);

    const whatsappUrl = `https://wa.me/919353127120?text=${encodeURIComponent(lines.join('\n'))}`;
    formNote.textContent = 'Thank you — opening WhatsApp to send your enquiry to Shreyas…';
    window.open(whatsappUrl, '_blank');
    form.reset();
  });
})();

// ===== DÉCOR: FALLING PETALS TOGGLE =====
(function(){
  const stage = document.getElementById('petalsStage');
  const toggle = document.getElementById('petalToggle');
  const stateLabel = document.getElementById('petalToggleState');
  if (!stage || !toggle) return;

  const petalSVG = (color) => `<svg viewBox="0 0 24 24"><path d="M12 2c4 3 7 7 7 11a7 7 0 1 1-14 0c0-4 3-8 7-11z" fill="${color}"/></svg>`;
  const colors = ['#c98b7a', '#e3b9ad', '#e2c385', '#f1d9d2', '#b8914a'];

  function spawnPetal(){
    if (stage.classList.contains('petals-off') || document.hidden) return;
    const petal = document.createElement('div');
    petal.className = 'petal';
    const size = 10 + Math.random() * 10;
    const duration = 7 + Math.random() * 6;
    petal.style.left = Math.random() * 100 + '%';
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    petal.style.animationDuration = duration + 's';
    petal.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
    petal.innerHTML = petalSVG(colors[Math.floor(Math.random() * colors.length)]);
    stage.appendChild(petal);
    setTimeout(() => petal.remove(), duration * 1000 + 200);
  }

  let spawnTimer = setInterval(spawnPetal, 450);
  for (let i = 0; i < 10; i++) setTimeout(spawnPetal, i * 200);

  toggle.addEventListener('click', () => {
    const next = toggle.getAttribute('aria-pressed') !== 'true';
    toggle.setAttribute('aria-pressed', String(next));
    stateLabel.textContent = next ? 'On' : 'Off';
    stage.classList.toggle('petals-off', !next);
    if (next && !spawnTimer) {
      spawnTimer = setInterval(spawnPetal, 450);
    } else if (!next && spawnTimer) {
      clearInterval(spawnTimer);
      spawnTimer = null;
    }
  });
})();
