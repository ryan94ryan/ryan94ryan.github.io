/* ============================================
   Banner Carousel — fetches data/banners.json
   Auto-rotates, pauses on hover, supports touch.
   ============================================ */
(function () {
  'use strict';

  var AUTO_INTERVAL = 5000;
  var transitioning = false;
  var idx = 0;
  var items = [];
  var timer = null;
  var track, dotsEl, container;

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s == null ? '' : s;
    return d.innerHTML;
  }

  function render(banners) {
    items = (banners || []).filter(function (b) {
      return b && b.image && b.enabled !== false;
    });
    if (!items.length) {
      container.style.display = 'none';
      return;
    }
    container.style.display = '';

    track.innerHTML = items.map(function (b, i) {
      var inner =
        '<img src="' + esc(b.image) + '" alt="' + esc(b.title || '') + '" loading="' + (i === 0 ? 'eager' : 'lazy') + '">' +
        (b.title || b.subtitle
          ? '<div class="banner-slide-caption">' +
              (b.title ? '<h3>' + esc(b.title) + '</h3>' : '') +
              (b.subtitle ? '<p>' + esc(b.subtitle) + '</p>' : '') +
            '</div>'
          : '');
      var wrap = b.link
        ? '<a href="' + esc(b.link) + '">' + inner + '</a>'
        : '<div class="banner-slide-inner">' + inner + '</div>';
      return '<div class="banner-slide' + (i === 0 ? ' active' : '') + '">' + wrap + '</div>';
    }).join('');

    dotsEl.innerHTML = items.map(function (_, i) {
      return '<button class="banner-dot' + (i === 0 ? ' active' : '') + '" data-i="' + i + '" aria-label="第 ' + (i + 1) + ' 張"></button>';
    }).join('');

    dotsEl.querySelectorAll('.banner-dot').forEach(function (d) {
      d.addEventListener('click', function () { goTo(parseInt(d.dataset.i, 10)); });
    });

    // hide nav if only one
    if (items.length <= 1) {
      document.getElementById('bannerPrev').style.display = 'none';
      document.getElementById('bannerNext').style.display = 'none';
      dotsEl.style.display = 'none';
      return;
    }

    startAuto();
  }

  function goTo(i) {
    if (transitioning || items.length === 0) return;
    transitioning = true;
    idx = ((i % items.length) + items.length) % items.length;
    track.style.transform = 'translateX(-' + (idx * 100) + '%)';

    track.querySelectorAll('.banner-slide').forEach(function (s, j) {
      s.classList.toggle('active', j === idx);
    });
    dotsEl.querySelectorAll('.banner-dot').forEach(function (d, j) {
      d.classList.toggle('active', j === idx);
    });

    setTimeout(function () { transitioning = false; }, 650);
  }

  function next() { goTo(idx + 1); }
  function prev() { goTo(idx - 1); }

  function startAuto() {
    stopAuto();
    if (items.length <= 1) return;
    timer = setInterval(next, AUTO_INTERVAL);
  }
  function stopAuto() { if (timer) { clearInterval(timer); timer = null; } }

  function init() {
    container = document.getElementById('bannerCarousel');
    track = document.getElementById('bannerTrack');
    dotsEl = document.getElementById('bannerDots');
    if (!container || !track) return;

    document.getElementById('bannerPrev').addEventListener('click', function () { prev(); startAuto(); });
    document.getElementById('bannerNext').addEventListener('click', function () { next(); startAuto(); });

    container.addEventListener('mouseenter', stopAuto);
    container.addEventListener('mouseleave', startAuto);

    // touch swipe
    var startX = 0, dx = 0;
    container.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX; dx = 0; stopAuto();
    }, { passive: true });
    container.addEventListener('touchmove', function (e) {
      dx = e.touches[0].clientX - startX;
    }, { passive: true });
    container.addEventListener('touchend', function () {
      if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
      startAuto();
    });

    fetch('data/banners.json?v=' + Date.now())
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(render)
      .catch(function () { container.style.display = 'none'; });

    window.addEventListener('message', function (e) {
      if (e.data && e.data.type === 'preview-banners') {
        stopAuto();
        idx = 0;
        track.style.transform = 'translateX(0)';
        document.getElementById('bannerPrev').style.display = '';
        document.getElementById('bannerNext').style.display = '';
        dotsEl.style.display = '';
        render(e.data.payload || []);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
