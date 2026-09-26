// ===== INTRO / BRAND ENTRANCE ANIMATION =====
(function initIntro(){
  const overlay = document.getElementById('introOverlay');
  const particleField = document.getElementById('introParticles');
  const skipBtn = document.getElementById('introSkip');
  if (!overlay) return;

  // seed floating gold particles
  const PARTICLE_COUNT = 22;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('span');
    const left = Math.random() * 100;
    const delay = Math.random() * 2.2;
    const duration = 3.2 + Math.random() * 2.6;
    const size = 2 + Math.random() * 4;
    p.style.left = left + '%';
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.animationDuration = duration + 's';
    p.style.animationDelay = delay + 's';
    particleField.appendChild(p);
  }

  let dismissed = false;
  const dismiss = () => {
    if (dismissed) return;
    dismissed = true;
    overlay.classList.add('intro-hide');
    document.body.classList.remove('intro-lock');
    window.setTimeout(() => { overlay.remove(); }, 1200);
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const AUTO_DISMISS_MS = reduceMotion ? 300 : 3400;

  window.setTimeout(dismiss, AUTO_DISMISS_MS);
  if (skipBtn) skipBtn.addEventListener('click', dismiss);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) dismiss(); });
})();

// ===== NAV SCROLL STATE =====
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== MOBILE MENU =====
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
navToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ===== SCROLL REVEAL =====
const revealTargets = document.querySelectorAll(
  '.service-card, .experience-card, .designer-card, .gallery-item, .testimonial, .about-content, .about-media, .stat'
);
revealTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

// ===== ENQUIRY FORM =====
const form = document.getElementById('enquiryForm');
const formNote = document.getElementById('formNote');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();

    if (!name || !phone) {
      formNote.textContent = 'Please share your name and phone number so we can reach you.';
      return;
    }

    // Build a WhatsApp message so the enquiry reaches Sehras directly
    const date = form.date.value.trim();
    const city = form.city.value.trim();
    const message = form.message.value.trim();

    const lines = [
      `Hello Sehras, I'd like to enquire about a wedding.`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      date ? `Event date: ${date}` : null,
      city ? `City / destination: ${city}` : null,
      message ? `Details: ${message}` : null,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join('\n'));
    const whatsappUrl = `https://wa.me/919353127120?text=${text}`;

    formNote.textContent = 'Thank you — opening WhatsApp to send your enquiry to Shreyas...';
    window.open(whatsappUrl, '_blank');
    form.reset();
  });
}

// ===== DÉCOR: FALLING PETALS TOGGLE =====
(function(){
  const stage = document.getElementById('petalsStage');
  const toggle = document.getElementById('petalToggle');
  const stateLabel = document.getElementById('petalToggleState');
  if (!stage || !toggle) return;

  const petalSVG = (color) => `
    <svg viewBox="0 0 24 24"><path d="M12 2c4 3 7 7 7 11a7 7 0 1 1-14 0c0-4 3-8 7-11z" fill="${color}"/></svg>`;
  const colors = ['#c98b7a', '#e3b9ad', '#cba968', '#f1d9d2'];

  function spawnPetal(){
    if (stage.classList.contains('petals-off')) return;
    const petal = document.createElement('div');
    petal.className = 'petal';
    const size = 10 + Math.random() * 10;
    const left = Math.random() * 100;
    const duration = 7 + Math.random() * 6;
    const drift = (Math.random() * 120 - 60) + 'px';
    petal.style.left = left + '%';
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    petal.style.animationDuration = duration + 's';
    petal.style.setProperty('--drift', drift);
    petal.innerHTML = petalSVG(colors[Math.floor(Math.random() * colors.length)]);
    stage.appendChild(petal);
    setTimeout(() => petal.remove(), duration * 1000 + 200);
  }

  let spawnTimer = setInterval(spawnPetal, 450);
  for (let i = 0; i < 10; i++) setTimeout(spawnPetal, i * 200);

  toggle.addEventListener('click', () => {
    const isOn = toggle.getAttribute('aria-pressed') === 'true';
    const next = !isOn;
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

// ===== PHOTO LIGHTBOX (click to view gallery images one by one) =====
(function(){
  const images = Array.from(document.querySelectorAll('.gallery-item img'));
  if (!images.length) return;

  const lightbox = document.getElementById('lightbox');
  const imgEl = document.getElementById('lightboxImg');
  const counter = document.getElementById('lightboxCounter');
  const btnClose = document.getElementById('lightboxClose');
  const btnPrev = document.getElementById('lightboxPrev');
  const btnNext = document.getElementById('lightboxNext');
  let currentIndex = 0;

  function show(index){
    currentIndex = (index + images.length) % images.length;
    const img = images[currentIndex];
    imgEl.src = img.src;
    imgEl.alt = img.alt || '';
    counter.textContent = (currentIndex + 1) + ' / ' + images.length;
  }

  function open(index){
    show(index);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  images.forEach((img, i) => {
    img.parentElement.addEventListener('click', () => open(i));
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', () => show(currentIndex - 1));
  btnNext.addEventListener('click', () => show(currentIndex + 1));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(currentIndex - 1);
    if (e.key === 'ArrowRight') show(currentIndex + 1);
  });
})();
