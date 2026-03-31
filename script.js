/* =============================================
   NAVEGACIÓN — SPA
   ============================================= */
function showSection(id) {
  document.querySelectorAll('section').forEach(function (s) { s.classList.remove('active'); });
  document.querySelectorAll('.nav-links a').forEach(function (a) { a.classList.remove('active'); });
  document.getElementById(id).classList.add('active');
  var link = document.getElementById('nav-' + id);
  if (link) link.classList.add('active');
  document.getElementById('nav-menu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMenu() {
  document.getElementById('nav-menu').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}

/* =============================================
   FILTROS
   ============================================= */
function filtrar(categoria, btn) {
  document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
  btn.classList.add('active');
  document.querySelectorAll('.project-card').forEach(function (card) {
    card.style.display = (categoria === 'todos' || card.dataset.cat === categoria) ? 'flex' : 'none';
  });
}

/* =============================================
   SELECTOR DE SERVICIO
   ============================================= */
function selectService(card, nombre) {
  document.querySelectorAll('.service-card').forEach(function (c) { c.classList.remove('selected'); });
  card.classList.add('selected');
  var input = document.getElementById('f-service');
  if (input) input.value = nombre;
}

/* =============================================
   CARRUSELES
   ============================================= */
document.addEventListener('DOMContentLoaded', function () {

  document.querySelectorAll('.carousel-wrap').forEach(function (wrap) {
    var track   = wrap.querySelector('.carousel-track');
    var dotsEl  = wrap.querySelector('.carousel-dots');
    var counter = wrap.querySelector('.carousel-counter');
    var btnPrev = wrap.querySelector('.carousel-btn.prev');
    var btnNext = wrap.querySelector('.carousel-btn.next');
    if (!track) return;

    var slides  = Array.from(track.querySelectorAll('img'));
    var current = 0;
    var timer;

    function buildDots() {
      if (!dotsEl) return;
      dotsEl.innerHTML = '';
      slides.forEach(function (_, i) {
        var d = document.createElement('button');
        d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', 'Imagen ' + (i + 1));
        d.addEventListener('click', function (e) { e.stopPropagation(); goTo(i); resetTimer(); });
        dotsEl.appendChild(d);
      });
    }

    function updateUI() {
      if (counter) counter.textContent = (current + 1) + ' / ' + slides.length;
      if (dotsEl) {
        dotsEl.querySelectorAll('.carousel-dot').forEach(function (d, i) {
          d.classList.toggle('active', i === current);
        });
      }
    }

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + current * 100 + '%)';
      updateUI();
    }

    function setup() {
      slides = Array.from(track.querySelectorAll('img'));
      if (slides.length <= 1) {
        if (btnPrev) btnPrev.style.display = 'none';
        if (btnNext) btnNext.style.display = 'none';
        if (dotsEl)  dotsEl.style.display  = 'none';
        if (counter) counter.style.display  = 'none';
      } else {
        buildDots();
      }
      updateUI();
    }

    if (btnPrev) btnPrev.addEventListener('click', function (e) { e.stopPropagation(); goTo(current - 1); resetTimer(); });
    if (btnNext) btnNext.addEventListener('click', function (e) { e.stopPropagation(); goTo(current + 1); resetTimer(); });

    /* Click en imagen → abrir lightbox */
    wrap.addEventListener('click', function () {
      var images = [];
      try { images = JSON.parse(wrap.dataset.images || '[]'); } catch (e) {}
      if (images.length === 0) {
        slides.forEach(function (img) { images.push(img.src); });
      }
      openLightbox(images, current);
    });

    /* Auto-play */
    function startTimer() {
      timer = setInterval(function () { if (slides.length > 1) goTo(current + 1); }, 4000);
    }
    function resetTimer() { clearInterval(timer); startTimer(); }

    /* Swipe */
    var touchX = 0;
    wrap.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    wrap.addEventListener('touchend', function (e) {
      var diff = touchX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) { goTo(diff > 0 ? current + 1 : current - 1); resetTimer(); }
    }, { passive: true });

    /* Imagen rota */
    slides.forEach(function (img) {
      img.addEventListener('error', function () {
        img.parentNode && img.parentNode.removeChild(img);
        slides = Array.from(track.querySelectorAll('img'));
        current = 0; track.style.transform = 'translateX(0)';
        setup();
      });
    });

    setup();
    startTimer();
  });

});

/* =============================================
   LIGHTBOX
   ============================================= */
var _lbImages = [];
var _lbIndex  = 0;

function openLightbox(images, startIndex) {
  _lbImages = images;
  _lbIndex  = startIndex || 0;
  renderLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderLightbox() {
  var img = document.getElementById('lightbox-img');
  var ctr = document.getElementById('lightbox-counter');
  if (img) img.src = _lbImages[_lbIndex];
  if (ctr) ctr.textContent = (_lbIndex + 1) + ' / ' + _lbImages.length;

  /* Ocultar controles si hay 1 sola imagen */
  var btns = document.querySelectorAll('.lightbox-btn');
  var ctrEl = document.getElementById('lightbox-counter');
  btns.forEach(function (b) { b.style.display = _lbImages.length <= 1 ? 'none' : ''; });
  if (ctrEl) ctrEl.style.display = _lbImages.length <= 1 ? 'none' : '';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function lightboxNav(dir) {
  _lbIndex = (_lbIndex + dir + _lbImages.length) % _lbImages.length;
  renderLightbox();
}

/* Cerrar con ESC o clic en fondo */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') lightboxNav(1);
  if (e.key === 'ArrowLeft')  lightboxNav(-1);
});
document.getElementById && document.addEventListener('DOMContentLoaded', function () {
  var lb = document.getElementById('lightbox');
  if (lb) lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
});

/* =============================================
   FORMULARIO — Formspree
   ============================================= */
function submitForm() {
  var name    = document.getElementById('f-name').value.trim();
  var email   = document.getElementById('f-email').value.trim();
  var service = document.getElementById('f-service').value.trim();
  var msg     = document.getElementById('f-msg').value.trim();

  if (!name || !email || !msg) {
    alert('Por favor completa nombre, email y mensaje.');
    return;
  }
  if (!email.includes('@')) {
    alert('Ingresa un email válido.');
    return;
  }

  var btn = document.querySelector('.form-submit');
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  fetch('https://formspree.io/f/mgonjnpk', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre: name, email: email, servicio: service, mensaje: msg })
  })
  .then(function (res) {
    if (res.ok) {
      document.getElementById('contact-form').style.display = 'none';
      document.getElementById('success-msg').style.display  = 'block';
    } else {
      alert('Hubo un error al enviar. Inténtalo de nuevo.');
      btn.textContent = 'Enviar mensaje →';
      btn.disabled = false;
    }
  })
  .catch(function () {
    alert('Error de conexión. Inténtalo de nuevo.');
    btn.textContent = 'Enviar mensaje →';
    btn.disabled = false;
  });
}
