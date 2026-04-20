/* ============================================
   Portfolio Template — Main JS
   Multi-purpose: gamedev, videoeditor, illustrator, youtuber, vtuber
   JSON-driven rendering + section toggle
   ============================================ */

(function () {
  'use strict';

  /* ---------- Fallback Data ---------- */
  var FALLBACK = {
    template: 'gamedev',
    sections: { hero: true, games: true, contentFeed: true, about: true, support: true },
    site: { title: 'Portfolio' },
    hero: {
      tagline: 'CREATOR',
      heading: 'Hello',
      subtitle: 'Welcome to my portfolio',
      ctaText: 'View Works'
    },
    about: {
      avatar: 'assets/images/avatar.jpg',
      bio: '',
      skills: [],
      contactEmail: '',
      collaborationNote: ''
    },
    games: [],
    gallery: { heading: '作品集', items: [] },
    playlists: [],
    videoShowcase: [],
    services: [],
    liveSchedule: { heading: '直播時間表', schedule: [] },
    stats: [],
    content: { youtubeVideos: [], instagramPosts: [], twitchChannel: '' },
    support: { heading: '支持我', message: '', opayUrl: '' },
    social: {}
  };

  /* ---------- Nav Section Config ---------- */
  var NAV_MAP = {
    games:        { href: '#games',          label: '作品集' },
    gallery:      { href: '#gallery',        label: '作品集' },
    playlists:    { href: '#playlists',      label: '播放清單' },
    videoShowcase:{ href: '#videoShowcase',   label: '影片作品' },
    contentFeed:  { href: '#content-feed',   label: '創作動態' },
    services:     { href: '#services',       label: '服務項目' },
    liveSchedule: { href: '#liveSchedule',   label: '直播時間' },
    about:        { href: '#about',          label: '關於' },
    support:      { href: '#support',        label: '支持我' }
  };

  /* ---------- SVG Icons ---------- */
  var ICONS = {
    facebook: '<svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
    twitter: '<svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    twitch: '<svg viewBox="0 0 24 24"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>',
    bahamut: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><text x="12" y="16" text-anchor="middle" font-size="10" font-weight="bold" fill="currentColor">B</text></svg>',
    discord: '<svg viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>'
  };

  var SERVICE_ICONS = {
    film: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/><line x1="17" y1="17" x2="22" y2="17"/></svg>',
    palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/><circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/><circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/><circle cx="6.5" cy="12.5" r="0.5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
    motion: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>',
    shorts: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="2" width="12" height="20" rx="2"/><line x1="6" y1="18" x2="18" y2="18"/><line x1="6" y1="6" x2="18" y2="6"/><polygon points="10 10 10 14 14 12 10 10" fill="currentColor" stroke="none"/></svg>',
    design: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    music: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
    mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>'
  };

  /* ---------- Helpers ---------- */
  function el(id) { return document.getElementById(id); }
  function esc(str) {
    var d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  function parseYouTube(input) {
    if (!input) return null;
    input = input.trim();
    var shortsMatch = input.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
    if (shortsMatch) return { id: shortsMatch[1], isShort: true };
    var shortUrlMatch = input.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (shortUrlMatch) return { id: shortUrlMatch[1], isShort: false };
    var watchMatch = input.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if (watchMatch) return { id: watchMatch[1], isShort: false };
    var embedMatch = input.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
    if (embedMatch) return { id: embedMatch[1], isShort: false };
    if (/^[a-zA-Z0-9_-]{5,15}$/.test(input)) return { id: input, isShort: false };
    if (input.length > 0) return { id: input, isShort: false };
    return null;
  }

  function getIgEmbedUrl(url) {
    if (!url) return null;
    url = url.trim();
    var match = url.match(/instagram\.com\/(?:[^/]+\/)?(?:p|reel)\/([a-zA-Z0-9_-]+)/);
    if (match) return 'https://www.instagram.com/p/' + match[1] + '/embed';
    return null;
  }

  /* ---------- Section Toggle Engine ---------- */
  function applySectionToggles(sections) {
    document.querySelectorAll('.section-toggle').forEach(function (sec) {
      var key = sec.dataset.section;
      if (key && sections[key] === false) {
        sec.style.display = 'none';
      } else {
        sec.style.removeProperty('display');
      }
    });
  }

  /* ---------- Section Order Engine ---------- */
  function applySectionOrder(order) {
    if (!Array.isArray(order) || !order.length) return;
    var footer = document.querySelector('footer.footer');
    if (!footer) return;
    var parent = footer.parentNode;
    order.forEach(function (key) {
      var sec = document.querySelector('.section-toggle[data-section="' + key + '"]');
      if (sec && sec.parentNode === parent) parent.insertBefore(sec, footer);
    });
  }

  /* ---------- Dynamic Navigation ---------- */
  function buildNav(sections, navOrder, navExtra) {
    var navLinksEl = el('navLinks');
    var mobileMenuEl = el('mobileMenu');
    var defaultBuiltin = ['games', 'gallery', 'playlists', 'videoShowcase', 'contentFeed', 'services', 'liveSchedule', 'about', 'support'];

    // Backward compat: if navOrder missing, synthesize from defaults + legacy navExtra
    var order;
    if (Array.isArray(navOrder) && navOrder.length) {
      order = navOrder;
    } else {
      var builtinEntries = defaultBuiltin.map(function (k) { return { type: 'builtin', key: k }; });
      var startExtras = [], beforeArticleExtras = [], endExtras = [];
      (Array.isArray(navExtra) ? navExtra : []).forEach(function (x) {
        if (!x || !x.label || !x.url) return;
        var e = { type: 'custom', label: x.label, url: x.url, featured: !!x.featured, newTab: x.newTab !== false };
        if (x.position === 'start') startExtras.push(e);
        else if (x.position === 'end') endExtras.push(e);
        else beforeArticleExtras.push(e);
      });
      order = [].concat(startExtras, builtinEntries, beforeArticleExtras, [{ type: 'article' }], endExtras);
    }

    var items = [];
    order.forEach(function (entry) {
      if (!entry || !entry.type) return;
      if (entry.type === 'builtin') {
        var k = entry.key;
        if (!k || !NAV_MAP[k] || !sections[k]) return;
        items.push({ label: NAV_MAP[k].label, href: NAV_MAP[k].href, newTab: false, featured: !!entry.featured });
      } else if (entry.type === 'article') {
        items.push({ label: entry.label || '文章', href: entry.url || 'news.html', newTab: false, featured: !!entry.featured });
      } else if (entry.type === 'custom') {
        if (!entry.label || !entry.url) return;
        items.push({ label: entry.label, href: entry.url, newTab: entry.newTab !== false, featured: !!entry.featured });
      }
    });

    var desktopHtml = '', mobileHtml = '';
    items.forEach(function (item) {
      var attrs = '';
      if (item.newTab) attrs += ' target="_blank" rel="noopener"';
      if (item.featured) attrs += ' class="nav-featured"';
      desktopHtml += '<li><a href="' + item.href + '"' + attrs + '>' + item.label + '</a></li>';
      mobileHtml += '<a href="' + item.href + '"' + attrs + '>' + item.label + '</a>';
    });

    navLinksEl.innerHTML = desktopHtml;
    mobileMenuEl.innerHTML = mobileHtml;
  }

  /* ---------- Theme Toggle ---------- */
  function initTheme() {
    var saved = localStorage.getItem('theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcon();

    el('themeToggle').addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      var isDark;
      if (current === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        isDark = false;
      } else if (current === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        isDark = true;
      } else {
        isDark = !window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      }
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcon();
    });
  }

  function updateThemeIcon() {
    var theme = document.documentElement.getAttribute('data-theme');
    var isDark;
    if (theme === 'dark') isDark = true;
    else if (theme === 'light') isDark = false;
    else isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    el('themeIcon').textContent = isDark ? '☀️' : '🌙';
  }

  /* ---------- Mobile Menu ---------- */
  function initMobileMenu() {
    var btn = el('hamburgerBtn');
    var menu = el('mobileMenu');

    btn.addEventListener('click', function () {
      btn.classList.toggle('active');
      menu.classList.toggle('open');
    });

    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        btn.classList.remove('active');
        menu.classList.remove('open');
      }
    });
  }

  /* ---------- Scroll Animations ---------- */
  function initScrollAnimations() {
    var targets = document.querySelectorAll('.fade-in');
    if (!targets.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var parent = entry.target.closest('.games-grid, .gallery-grid, .videos-grid, .services-grid, .stats-grid');
          if (parent) {
            var siblings = Array.from(parent.querySelectorAll('.fade-in'));
            var idx = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = (idx * 100) + 'ms';
          }
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    targets.forEach(function (t) { observer.observe(t); });
  }

  /* ---------- Video Modal ---------- */
  function initModal() {
    var modal = el('videoModal');
    var iframe = el('videoModalIframe');
    if (!modal) return;

    function closeModal() {
      modal.classList.remove('open');
      iframe.src = '';
    }

    window.openVideoModal = function (ytId) {
      iframe.src = 'https://www.youtube.com/embed/' + ytId + '?autoplay=1';
      modal.classList.add('open');
    };

    el('videoModalClose').addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
  }

  /* ---------- Hero Background ---------- */
  var particleAnimId = null;

  function initHeroBackground(style) {
    var hero = document.querySelector('.hero');
    if (!hero) return;

    // Remove previous bg class
    ['minimal', 'gradient', 'particles', 'waves', 'aurora', 'cyber'].forEach(function (s) {
      hero.classList.remove('hero-bg-' + s);
    });

    // Stop any running particle animation
    if (particleAnimId) {
      cancelAnimationFrame(particleAnimId);
      particleAnimId = null;
    }

    var chosen = style || 'minimal';
    hero.classList.add('hero-bg-' + chosen);

    // Particle canvas system
    if (chosen === 'particles') {
      initParticleCanvas();
    }
  }

  function initParticleCanvas() {
    var canvas = el('heroCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var particles = [];
    var PARTICLE_COUNT = 60;

    function resize() {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Get accent color from CSS variable
    var accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#d4a017';

    function hexToRgb(hex) {
      hex = hex.replace('#', '');
      if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
      var r = parseInt(hex.substring(0, 2), 16);
      var g = parseInt(hex.substring(2, 4), 16);
      var b = parseInt(hex.substring(4, 6), 16);
      return { r: r, g: g, b: b };
    }

    var rgb = hexToRgb(accentColor);

    for (var i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.1
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connection lines
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            var lineAlpha = (1 - dist / 120) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + lineAlpha + ')';
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (var k = 0; k < particles.length; k++) {
        var p = particles[k];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + p.alpha + ')';
        ctx.fill();

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }

      particleAnimId = requestAnimationFrame(draw);
    }

    draw();
  }

  /* ---------- Gallery Lightbox ---------- */
  var lightboxItems = [];
  var lightboxIdx = 0;

  function initLightbox() {
    var lb = el('lightbox');
    if (!lb) return;

    function closeLb() { lb.classList.remove('open'); }

    function showItem(idx) {
      if (idx < 0 || idx >= lightboxItems.length) return;
      lightboxIdx = idx;
      el('lightboxImg').src = lightboxItems[idx].src;
      el('lightboxCaption').textContent = lightboxItems[idx].caption || '';
      el('lightboxPrev').style.display = idx > 0 ? '' : 'none';
      el('lightboxNext').style.display = idx < lightboxItems.length - 1 ? '' : 'none';
    }

    window.openLightbox = function (idx) {
      showItem(idx);
      lb.classList.add('open');
    };

    el('lightboxClose').addEventListener('click', closeLb);
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    el('lightboxPrev').addEventListener('click', function () { showItem(lightboxIdx - 1); });
    el('lightboxNext').addEventListener('click', function () { showItem(lightboxIdx + 1); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') showItem(lightboxIdx - 1);
      if (e.key === 'ArrowRight') showItem(lightboxIdx + 1);
    });
  }

  /* ============================================
     Render Functions
     ============================================ */

  function renderHero(data) {
    var h = data.hero || FALLBACK.hero;
    el('heroTagline').textContent = h.tagline;
    el('heroHeading').textContent = h.heading;
    el('heroSubtitle').textContent = h.subtitle;
    var cta = el('heroCta');
    cta.textContent = h.ctaText;

    // Apply custom height (vh units, 30-100). Default 100.
    var heroEl = el('hero');
    if (heroEl) {
      var vh = parseInt(h.minHeightVh, 10);
      if (!isNaN(vh) && vh >= 20 && vh <= 100) {
        heroEl.style.minHeight = vh + 'vh';
      } else {
        heroEl.style.removeProperty('min-height');
      }
    }

    // Point CTA to first visible content section
    var sections = data.sections || {};
    if (sections.games) cta.href = '#games';
    else if (sections.gallery) cta.href = '#gallery';
    else if (sections.playlists) cta.href = '#playlists';
    else if (sections.videoShowcase) cta.href = '#videoShowcase';
    else if (sections.contentFeed) cta.href = '#content-feed';
    else cta.href = '#about';

    // Apply background style
    initHeroBackground(h.backgroundStyle);
  }

  /* ---------- Games ---------- */
  function renderGames(data) {
    var games = data.games || [];
    if (!games.length) return;
    var featured = games.filter(function (g) { return g.featured; });
    var others = games.filter(function (g) { return !g.featured; });

    var featuredEl = el('gameFeatured');
    featured.forEach(function (g) { featuredEl.innerHTML += buildGameCard(g); });

    var VISIBLE_COUNT = 3;
    var visibleGames = others.slice(0, VISIBLE_COUNT);
    var hiddenGames = others.slice(VISIBLE_COUNT);

    var gridEl = el('gamesGrid');
    visibleGames.forEach(function (g) { gridEl.innerHTML += buildGameCard(g); });

    if (hiddenGames.length > 0) {
      var hiddenEl = el('gamesHidden');
      hiddenGames.forEach(function (g) { hiddenEl.innerHTML += buildGameCard(g); });
      el('gamesToggle').style.display = 'block';

      el('gamesToggleBtn').addEventListener('click', function () {
        var hidden = el('gamesHidden');
        if (hidden.classList.contains('show')) {
          hidden.classList.remove('show');
          this.textContent = '查看全部作品';
        } else {
          hidden.classList.add('show');
          this.textContent = '收起';
          hidden.querySelectorAll('.fade-in').forEach(function (el) { el.classList.add('visible'); });
        }
      });
    }

    document.querySelectorAll('.game-card').forEach(function (card) { card.classList.add('fade-in'); });
  }

  function buildGameCard(game) {
    var platformBadges = (game.platforms || []).map(function (p) {
      return '<span class="platform-badge">' + esc(p) + '</span>';
    }).join('');
    var tags = (game.tags || []).map(function (t) {
      return '<span class="game-tag">' + esc(t) + '</span>';
    }).join('');
    var links = '';
    if (game.links) {
      if (game.links.steam) links += '<a href="' + esc(game.links.steam) + '" class="game-link" target="_blank" rel="noopener noreferrer">Steam</a>';
      if (game.links.android) links += '<a href="' + esc(game.links.android) + '" class="game-link" target="_blank" rel="noopener noreferrer">Google Play</a>';
      if (game.links.ios) links += '<a href="' + esc(game.links.ios) + '" class="game-link" target="_blank" rel="noopener noreferrer">App Store</a>';
    }
    if (!links && game.platforms && game.platforms.length > 0) {
      links = '<span class="game-link" style="opacity:0.6;cursor:default;">即將上架</span>';
    }
    var imgHtml = game.image
      ? '<img src="' + esc(game.image) + '" alt="' + esc(game.name) + '" loading="lazy" onerror="this.parentElement.classList.add(\'img-placeholder\');this.style.display=\'none\'">'
      : '';

    return '<div class="game-card">' +
      '<div class="game-card-image' + (!game.image ? ' img-placeholder' : '') + '">' + imgHtml +
        '<div class="game-platforms">' + platformBadges + '</div>' +
      '</div>' +
      '<div class="game-card-body">' +
        '<h3 class="game-card-title">' + esc(game.name) + '</h3>' +
        '<p class="game-card-genre">' + esc(game.genre || '') + '</p>' +
        (game.description ? '<p class="game-card-desc">' + esc(game.description) + '</p>' : '') +
        (tags ? '<div class="game-tags">' + tags + '</div>' : '') +
        '<div class="game-links">' + links + '</div>' +
      '</div></div>';
  }

  /* ---------- Gallery ---------- */
  function renderGallery(data) {
    var gallery = data.gallery || FALLBACK.gallery;
    var items = gallery.items || [];
    if (!items.length) return;

    if (gallery.heading) el('galleryHeading').textContent = gallery.heading;

    lightboxItems = [];
    var gridEl = el('galleryGrid');
    var html = '';

    items.forEach(function (item, idx) {
      lightboxItems.push({ src: item.image, caption: item.title || '' });
      html += '<div class="gallery-item fade-in" onclick="openLightbox(' + idx + ')">' +
        '<img src="' + esc(item.image) + '" alt="' + esc(item.title || '') + '" loading="lazy">' +
        (item.title ? '<div class="gallery-overlay"><span>' + esc(item.title) + '</span></div>' : '') +
      '</div>';
    });

    gridEl.innerHTML = html;
  }

  /* ---------- Playlists ---------- */
  function renderPlaylists(data) {
    var playlists = data.playlists || [];
    if (!playlists.length) return;

    var tabsEl = el('playlistTabs');
    var embedsEl = el('playlistEmbeds');
    var tabsHtml = '';
    var embedsHtml = '';

    playlists.forEach(function (pl, idx) {
      var activeClass = idx === 0 ? ' active' : '';
      tabsHtml += '<button class="playlist-tab' + activeClass + '" data-index="' + idx + '">' + esc(pl.title) + '</button>';

      var displayStyle = idx === 0 ? '' : 'display:none;';
      var plId = pl.youtubePlaylistId || '';
      var embedContent = '';
      if (plId.length > 5) {
        embedContent = '<div class="playlist-embed-wrap"><iframe src="https://www.youtube.com/embed/videoseries?list=' + esc(plId) + '" ' +
          'loading="lazy" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>';
      } else {
        embedContent = '<div class="embed-skeleton" style="aspect-ratio:16/9;">播放清單 ID 無效</div>';
      }

      embedsHtml += '<div class="playlist-panel" data-index="' + idx + '" style="' + displayStyle + '">' +
        (pl.description ? '<p class="playlist-desc">' + esc(pl.description) + '</p>' : '') +
        embedContent + '</div>';
    });

    tabsEl.innerHTML = tabsHtml;
    embedsEl.innerHTML = embedsHtml;

    // Tab switching
    tabsEl.addEventListener('click', function (e) {
      var tab = e.target.closest('.playlist-tab');
      if (!tab) return;
      var idx = tab.dataset.index;
      tabsEl.querySelectorAll('.playlist-tab').forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      embedsEl.querySelectorAll('.playlist-panel').forEach(function (p) {
        p.style.display = p.dataset.index === idx ? '' : 'none';
      });
    });
  }

  /* ---------- Video Showcase ---------- */
  function renderVideoShowcase(data) {
    var videos = data.videoShowcase || [];
    if (!videos.length) return;

    // Build category filters
    var categories = [];
    videos.forEach(function (v) {
      if (v.category && categories.indexOf(v.category) === -1) categories.push(v.category);
    });

    var filtersEl = el('videoFilters');
    var gridEl = el('videosGrid');

    if (categories.length > 1) {
      var filtersHtml = '<button class="video-filter-btn active" data-cat="all">全部</button>';
      categories.forEach(function (cat) {
        filtersHtml += '<button class="video-filter-btn" data-cat="' + esc(cat) + '">' + esc(cat) + '</button>';
      });
      filtersEl.innerHTML = filtersHtml;

      filtersEl.addEventListener('click', function (e) {
        var btn = e.target.closest('.video-filter-btn');
        if (!btn) return;
        filtersEl.querySelectorAll('.video-filter-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        renderVideoGrid(videos, btn.dataset.cat, gridEl);
      });
    }

    renderVideoGrid(videos, 'all', gridEl);
  }

  function renderVideoGrid(videos, category, container) {
    var filtered = category === 'all' ? videos : videos.filter(function (v) { return v.category === category; });
    var html = '';
    filtered.forEach(function (v) {
      var parsed = parseYouTube(v.youtubeId);
      if (!parsed) return;
      var thumbUrl = 'https://img.youtube.com/vi/' + parsed.id + '/hqdefault.jpg';
      html += '<div class="video-card fade-in" onclick="openVideoModal(\'' + esc(parsed.id) + '\')">' +
        '<div class="video-card-thumb">' +
          '<img src="' + thumbUrl + '" alt="' + esc(v.title || '') + '" loading="lazy">' +
          '<div class="video-play-overlay"><div class="play-btn-circle"><svg viewBox="0 0 24 24" fill="white"><polygon points="10,8 16,12 10,16"/></svg></div></div>' +
        '</div>' +
        '<div class="video-card-body">' +
          '<h3 class="video-card-title">' + esc(v.title || '') + '</h3>' +
          (v.client ? '<p class="video-card-client">' + esc(v.client) + '</p>' : '') +
          (v.description ? '<p class="video-card-desc">' + esc(v.description) + '</p>' : '') +
        '</div></div>';
    });
    container.innerHTML = html;
    // Re-trigger scroll animations for new cards
    container.querySelectorAll('.fade-in').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---------- Content Feed ---------- */
  function renderContent(data) {
    var content = data.content || FALLBACK.content;

    // YouTube
    var ytGrid = el('ytGrid');
    if (content.youtubeVideos && content.youtubeVideos.length > 0) {
      var parsedVideos = [];
      content.youtubeVideos.forEach(function (v) {
        var parsed = parseYouTube(v.id);
        if (parsed && parsed.id) parsedVideos.push({ id: parsed.id, isShort: parsed.isShort, title: v.title });
      });

      var normalVideos = parsedVideos.filter(function (v) { return !v.isShort; });
      var shortVideos = parsedVideos.filter(function (v) { return v.isShort; });

      normalVideos.forEach(function (v) {
        ytGrid.innerHTML += '<div class="yt-embed"><iframe src="https://www.youtube.com/embed/' + esc(v.id) + '" title="' + esc(v.title || '') + '" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
      });

      if (shortVideos.length > 0) {
        var shortsContainer = document.createElement('div');
        shortsContainer.className = 'yt-shorts-grid';
        shortVideos.forEach(function (v) {
          shortsContainer.innerHTML += '<div class="yt-short-embed"><iframe src="https://www.youtube.com/embed/' + esc(v.id) + '" title="' + esc(v.title || '') + '" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
        });
        ytGrid.parentElement.appendChild(shortsContainer);
      }
    }

    // Instagram
    var igGrid = el('igGrid');
    if (content.instagramPosts && content.instagramPosts.length > 0) {
      var hasRealPosts = content.instagramPosts.some(function (p) { return p.url && !p.url.includes('POST_ID'); });
      if (hasRealPosts) {
        content.instagramPosts.forEach(function (p) {
          if (p.url && !p.url.includes('POST_ID')) {
            var embedUrl = getIgEmbedUrl(p.url);
            if (embedUrl) {
              igGrid.innerHTML += '<div class="ig-embed-card"><iframe src="' + esc(embedUrl) + '" loading="lazy" allowtransparency="true" frameborder="0" scrolling="no"></iframe></div>';
            } else {
              igGrid.innerHTML += '<a href="' + esc(p.url) + '" class="ig-card" target="_blank" rel="noopener noreferrer"><div class="img-placeholder" style="aspect-ratio:1;">Instagram</div><span class="ig-link">查看貼文 →</span></a>';
            }
          }
        });
      }
    }

    // Twitch
    var twitchContainer = el('twitchContainer');
    if (content.twitchChannel) {
      twitchContainer.innerHTML = '<div class="twitch-offline">' +
        '<p class="twitch-offline-text">目前離線</p>' +
        '<a href="https://www.twitch.tv/' + esc(content.twitchChannel) + '" class="twitch-link" target="_blank" rel="noopener noreferrer">' + ICONS.twitch + ' 前往 Twitch 頻道</a>' +
      '</div>';
    }
  }

  /* ---------- Services ---------- */
  function renderServices(data) {
    var services = data.services || [];
    if (!services.length) return;

    var gridEl = el('servicesGrid');
    var html = '';
    services.forEach(function (s) {
      var iconSvg = SERVICE_ICONS[s.icon] || SERVICE_ICONS.design;
      html += '<div class="service-card fade-in">' +
        '<div class="service-icon">' + iconSvg + '</div>' +
        '<h3 class="service-title">' + esc(s.title) + '</h3>' +
        '<p class="service-desc">' + esc(s.description) + '</p>' +
      '</div>';
    });
    gridEl.innerHTML = html;
  }

  /* ---------- Live Schedule ---------- */
  function renderSchedule(data) {
    var sched = data.liveSchedule || FALLBACK.liveSchedule;
    if (!sched.schedule || !sched.schedule.length) return;

    if (sched.heading) el('scheduleHeading').textContent = sched.heading;

    var gridEl = el('scheduleGrid');
    var html = '';
    var dayNames = { mon: '週一', tue: '週二', wed: '週三', thu: '週四', fri: '週五', sat: '週六', sun: '週日' };

    sched.schedule.forEach(function (item) {
      var dayLabel = dayNames[item.day] || item.day;
      html += '<div class="schedule-item fade-in">' +
        '<div class="schedule-day">' + esc(dayLabel) + '</div>' +
        '<div class="schedule-time">' + esc(item.time || '') + '</div>' +
        '<div class="schedule-desc">' + esc(item.description || '') + '</div>' +
      '</div>';
    });

    if (sched.channelUrl) {
      html += '<div class="schedule-cta"><a href="' + esc(sched.channelUrl) + '" class="schedule-link" target="_blank" rel="noopener noreferrer">' + ICONS.twitch + ' 前往頻道</a></div>';
    }

    gridEl.innerHTML = html;
  }

  /* ---------- Stats ---------- */
  function renderStats(data) {
    var stats = data.stats || [];
    if (!stats.length) {
      var statsSection = el('stats');
      if (statsSection) statsSection.style.display = 'none';
      return;
    }

    var gridEl = el('statsGrid');
    var html = '';
    stats.forEach(function (s) {
      html += '<div class="stat-item fade-in">' +
        '<div class="stat-number">' + esc(s.number) + '</div>' +
        '<div class="stat-label">' + esc(s.label) + '</div>' +
      '</div>';
    });
    gridEl.innerHTML = html;
  }

  /* ---------- About ---------- */
  function renderAbout(data) {
    var about = data.about || FALLBACK.about;
    var container = el('aboutContent');
    var bioLines = (about.bio || '').split('\n').map(function (line) { return esc(line); }).join('<br>');
    var skills = (about.skills || []).map(function (s) { return '<span class="skill-pill">' + esc(s) + '</span>'; }).join('');
    var emailHtml = about.contactEmail ? '<p class="about-collab"><a href="mailto:' + esc(about.contactEmail) + '">' + esc(about.contactEmail) + '</a></p>' : '';

    container.innerHTML =
      '<img src="' + esc(about.avatar || 'assets/images/avatar.jpg') + '" alt="頭像" class="about-avatar" onerror="this.style.background=\'var(--accent-light)\'">' +
      '<div class="about-text">' +
        '<p class="about-bio">' + bioLines + '</p>' +
        '<div class="about-skills">' + skills + '</div>' +
        (about.collaborationNote ? '<p class="about-collab">' + esc(about.collaborationNote) + '</p>' : '') +
        emailHtml +
      '</div>';
  }

  /* ---------- About Notices (latest articles in sidebar) ---------- */
  function formatNoticeDate(s) {
    if (!s) return '';
    var d = new Date(s);
    if (isNaN(d.getTime())) return s;
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return y + '/' + m + '/' + day;
  }
  function renderAboutNoticesFrom(list) {
    var container = el('aboutNoticesList');
    if (!container) return;
    var items = (list || []).filter(function (a) { return a && !a.draft; });
    items.sort(function (a, b) {
      if (!!b.pinned !== !!a.pinned) return b.pinned ? 1 : -1;
      return (b.date || '').localeCompare(a.date || '');
    });
    items = items.slice(0, 5);
    if (!items.length) {
      container.innerHTML = '<div class="about-notices-empty">目前沒有公告</div>';
      return;
    }
    container.innerHTML = items.map(function (a) {
      var pin = a.pinned ? '<span class="about-notice-pin">★ 置頂</span>' : '';
      return '<a class="about-notice-item" href="article.html?slug=' + encodeURIComponent(a.slug || '') + '">' +
        '<div class="about-notice-meta">' + pin + '<span>' + esc(formatNoticeDate(a.date)) + '</span></div>' +
        '<div class="about-notice-title">' + esc(a.title || '(未命名)') + '</div>' +
      '</a>';
    }).join('');
  }
  function loadAboutNotices() {
    var container = el('aboutNoticesList');
    if (!container) return;
    fetch('data/articles/index.json?v=' + Date.now())
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (list) { renderAboutNoticesFrom(Array.isArray(list) ? list : []); })
      .catch(function () { renderAboutNoticesFrom([]); });
  }

  /* ---------- Support ---------- */
  function renderSupport(data) {
    var support = data.support || FALLBACK.support;
    el('supportHeading').textContent = support.heading || '支持我';
    el('supportMessage').textContent = support.message || '';
    el('supportBtn').href = support.opayUrl || '#';
  }

  /* ---------- Social ---------- */
  function renderSocial(data) {
    var social = data.social || {};
    var container = el('socialIcons');
    var html = '';
    var platforms = [
      { key: 'facebook', name: 'Facebook' },
      { key: 'instagram', name: 'Instagram' },
      { key: 'twitter', name: 'X (Twitter)' },
      { key: 'youtube', name: 'YouTube' },
      { key: 'twitch', name: 'Twitch' },
      { key: 'bahamut', name: '巴哈姆特' },
      { key: 'discord', name: 'Discord' }
    ];
    platforms.forEach(function (p) {
      if (social[p.key]) {
        html += '<a href="' + esc(social[p.key]) + '" class="social-icon" data-platform="' + p.key + '" target="_blank" rel="noopener noreferrer" aria-label="' + p.name + '">' + (ICONS[p.key] || '') + '</a>';
      }
    });
    container.innerHTML = html;
    var side = el('aboutSideSocial');
    if (side) side.style.display = html ? '' : 'none';
    var layout = document.querySelector('.about-layout');
    if (layout) layout.classList.toggle('no-social', !html);
  }

  /* ============================================
     Notices
     ============================================ */
  var NOTICE_TYPE_ICONS = {
    info: 'ℹ️',
    important: '🔴',
    event: '🎉',
    update: '🆕'
  };

  function renderNotices(data) {
    var notices = data.notices || {};

    // Main notice bar
    var bar = el('noticeBar');
    if (!bar) return;
    var main = notices.main;
    if (main && main.enabled && (main.title || main.body)) {
      bar.className = 'notice-bar notice-bar-' + (main.type || 'info');
      bar.style.display = '';
      el('noticeBarIcon').textContent = NOTICE_TYPE_ICONS[main.type] || NOTICE_TYPE_ICONS.info;
      el('noticeBarTitle').textContent = main.title || '';
      el('noticeBarBody').textContent = main.body ? ' — ' + main.body : '';
      var link = el('noticeBarLink');
      if (main.url) {
        link.href = main.url;
        link.textContent = main.urlText || '前往查看';
        link.style.display = '';
      } else {
        link.style.display = 'none';
      }
      el('noticeBarClose').onclick = function () {
        bar.style.display = 'none';
        document.body.style.paddingTop = '';
        var nav = document.querySelector('.navbar');
        if (nav) nav.style.top = '';
      };
      // Push navbar and body down after bar renders
      requestAnimationFrame(function () {
        var barH = bar.offsetHeight;
        document.body.style.paddingTop = barH + 'px';
        var nav = document.querySelector('.navbar');
        if (nav) nav.style.top = barH + 'px';
      });
    } else {
      bar.style.display = 'none';
      document.body.style.paddingTop = '';
      var nav = document.querySelector('.navbar');
      if (nav) nav.style.top = '';
    }

    // Floating notices
    var container = el('floatingNotices');
    if (!container) return;
    container.innerHTML = '';
    var floating = (notices.floating || []).filter(function (n) { return n.title || n.body; });
    if (floating.length === 0) return;

    // Shuffle and pick up to 3
    var shuffled = floating.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = tmp;
    }
    var picked = shuffled.slice(0, 3);

    // Stagger appearance
    picked.forEach(function (n, idx) {
      var toast = document.createElement('div');
      toast.className = 'floating-notice floating-notice-' + (n.type || 'info');

      var html = '<div class="floating-notice-header">' +
        '<span>' + (NOTICE_TYPE_ICONS[n.type] || NOTICE_TYPE_ICONS.info) + ' <strong>' + esc(n.title || '') + '</strong></span>' +
        '<button class="floating-notice-close" aria-label="關閉">&times;</button>' +
      '</div>';
      if (n.body) html += '<p class="floating-notice-body">' + esc(n.body) + '</p>';
      if (n.url) html += '<a class="floating-notice-link" href="' + esc(n.url) + '" target="_blank" rel="noopener noreferrer">' + esc(n.urlText || '了解更多') + '</a>';

      toast.innerHTML = html;
      container.appendChild(toast);

      // Close button
      toast.querySelector('.floating-notice-close').addEventListener('click', function () {
        toast.classList.add('floating-notice-hide');
        setTimeout(function () { toast.remove(); }, 300);
      });

      // Stagger slide-in
      setTimeout(function () { toast.classList.add('floating-notice-show'); }, 2000 + idx * 3000);
    });
  }

  /* ============================================
     Init
     ============================================ */
  function init() {
    initTheme();
    initMobileMenu();
    initModal();
    initLightbox();
    loadAboutNotices();

    fetch('data/site-data.json?v=' + Date.now())
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load');
        return res.json();
      })
      .then(function (data) { render(data); })
      .catch(function () {
        console.warn('Failed to load site-data.json, using fallback data');
        render(FALLBACK);
      });
  }

  /* ---------- Clear for Re-render ---------- */
  function clearRendered() {
    var ids = [
      'gameFeatured', 'gamesGrid', 'gamesHidden',
      'galleryGrid', 'playlistTabs', 'playlistEmbeds',
      'videoFilters', 'videosGrid',
      'ytGrid', 'igGrid', 'twitchContainer',
      'servicesGrid', 'scheduleGrid', 'statsGrid',
      'aboutContent', 'socialIcons', 'floatingNotices'
    ];
    ids.forEach(function (id) {
      var e = el(id);
      if (e) e.innerHTML = '';
    });
    // Remove dynamically added shorts grids
    document.querySelectorAll('.yt-shorts-grid').forEach(function (e) { e.remove(); });
    // Reset games toggle
    var gt = el('gamesToggle');
    if (gt) gt.style.display = 'none';
  }

  function render(data) {
    clearRendered();

    // Apply site meta
    var site = data.site || {};
    if (site.title) document.title = site.title;
    if (site.description) {
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', site.description);
    }
    if (site.ogImage) {
      var ogImg = document.querySelector('meta[property="og:image"]');
      if (ogImg) ogImg.setAttribute('content', site.ogImage);
    }

    var sections = data.sections || FALLBACK.sections;

    // Apply order first (DOM reflow), then visibility
    applySectionOrder(data.sectionsOrder);
    applySectionToggles(sections);

    // Build dynamic navigation
    buildNav(sections, data.navOrder, data.navExtra);

    // Render all active sections
    if (sections.hero !== false) renderHero(data);
    if (sections.games) renderGames(data);
    if (sections.gallery) renderGallery(data);
    if (sections.playlists) renderPlaylists(data);
    if (sections.videoShowcase) renderVideoShowcase(data);
    if (sections.contentFeed) renderContent(data);
    if (sections.services) renderServices(data);
    if (sections.liveSchedule) renderSchedule(data);
    if (sections.stats) renderStats(data);
    if (sections.about !== false) renderAbout(data);
    if (sections.support !== false) renderSupport(data);
    renderSocial(data);
    renderNotices(data);

    requestAnimationFrame(function () { initScrollAnimations(); });
  }

  /* ---------- Preview Helpers ---------- */
  function deepMapStrings(obj, fn) {
    if (Array.isArray(obj)) return obj.map(function (v) { return deepMapStrings(v, fn); });
    if (obj && typeof obj === 'object') {
      var o = {};
      Object.keys(obj).forEach(function (k) { o[k] = deepMapStrings(obj[k], fn); });
      return o;
    }
    if (typeof obj === 'string') return fn(obj);
    return obj;
  }
  function overrideImages(data, imageMap, ghBase) {
    if (!data) return data;
    var hasMap = imageMap && Object.keys(imageMap).length;
    if (!hasMap && !ghBase) return data;
    return deepMapStrings(data, function (v) {
      if (hasMap && imageMap[v]) return imageMap[v];
      if (ghBase && /^assets\//.test(v)) return ghBase + v;
      return v;
    });
  }

  /* ---------- Wireframe Mode ---------- */
  var WIREFRAME_LABELS = {
    hero: 'Hero 首屏',
    games: '作品集',
    gallery: '畫廊',
    playlists: '播放清單',
    videoShowcase: '影片作品',
    contentFeed: '創作動態',
    services: '服務項目',
    liveSchedule: '直播時間',
    stats: '數據',
    about: '關於我',
    social: '社群連結',
    support: '支持我'
  };
  function applyWireframe(enabled) {
    if (!enabled) {
      document.body.classList.remove('wireframe-mode');
      return;
    }
    document.body.classList.add('wireframe-mode');
    document.querySelectorAll('.section-toggle').forEach(function (s) {
      var key = s.dataset.section;
      s.setAttribute('data-wlabel', WIREFRAME_LABELS[key] || key || 'section');
    });
    var navbar = document.querySelector('.navbar');
    if (navbar) navbar.setAttribute('data-wlabel', '頂部導覽列');
    var banner = document.querySelector('.banner-carousel');
    if (banner) banner.setAttribute('data-wlabel', '首頁輪播');
    var footer = document.querySelector('footer.footer');
    if (footer) footer.setAttribute('data-wlabel', '頁尾 Footer');
    var bar = document.getElementById('noticeBar');
    if (bar) bar.setAttribute('data-wlabel', '頂部公告');
    var floating = document.getElementById('floatingNotices');
    if (floating) floating.setAttribute('data-wlabel', '浮動公告');
  }

  /* ---------- Preview Message Listener ---------- */
  window.addEventListener('message', function (e) {
    if (!e.data) return;
    if (e.data.type === 'preview-update') {
      var images = e.data.images || {};
      var ghBase = e.data.ghBase || '';
      var siteData = overrideImages(e.data.payload, images, ghBase);
      render(siteData);
      // Forward banners to carousel.js
      var banners = overrideImages(e.data.banners || [], images, ghBase);
      window.postMessage({ type: 'preview-banners', payload: banners }, '*');
      // Use the articles from preview payload (admin's in-memory list)
      if (Array.isArray(e.data.articles)) renderAboutNoticesFrom(e.data.articles);
      applyWireframe(!!e.data.wireframe);
      window.scrollTo(0, 0);
      // Confirm receipt so admin stops retrying
      if (e.source) {
        try { e.source.postMessage({ type: 'preview-received' }, '*'); } catch (err) { /* ignore */ }
      }
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
