/* ============================================
   Admin Panel — Multi-purpose Template
   Wizard + Section Manager + All Editors
   ============================================ */

(function () {
  'use strict';

  var data = null;
  var savedData = null;

  /* ---------- Template Presets ---------- */
  var PRESETS = {
    gamedev:     { hero: true, games: true, gallery: false, playlists: false, videoShowcase: false, contentFeed: true,  services: false, liveSchedule: false, stats: false, about: true, support: true },
    videoeditor: { hero: true, games: false, gallery: false, playlists: true, videoShowcase: true, contentFeed: false,  services: true,  liveSchedule: false, stats: true,  about: true, support: true },
    illustrator: { hero: true, games: false, gallery: true,  playlists: false, videoShowcase: false, contentFeed: true,  services: true,  liveSchedule: false, stats: false, about: true, support: true },
    youtuber:    { hero: true, games: false, gallery: false, playlists: true,  videoShowcase: true,  contentFeed: true,  services: false, liveSchedule: false, stats: true,  about: true, support: true },
    vtuber:      { hero: true, games: false, gallery: true,  playlists: false, videoShowcase: false, contentFeed: true,  services: false, liveSchedule: true,  stats: false, about: true, support: true },
    custom:      { hero: true, games: true, gallery: true,  playlists: true,  videoShowcase: true,  contentFeed: true,  services: true,  liveSchedule: true,  stats: true,  about: true, support: true }
  };

  var SECTION_LABELS = {
    hero: '🏠 首頁橫幅',
    games: '🎮 遊戲作品',
    gallery: '🎨 圖片作品集',
    playlists: '📋 播放清單',
    videoShowcase: '🎬 影片作品',
    contentFeed: '📺 創作動態',
    services: '🛠️ 服務項目',
    liveSchedule: '📅 直播時間表',
    stats: '📊 數據統計',
    about: '👤 關於我',
    support: '☕ 支持我'
  };

  var SERVICE_ICON_OPTIONS = ['film', 'palette', 'motion', 'shorts', 'design', 'code', 'music', 'mic'];

  var SERVICE_ICON_SVGS = {
    film: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>',
    palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
    motion: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>',
    shorts: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="2" width="12" height="20" rx="2"/><line x1="6" y1="18" x2="18" y2="18"/><line x1="6" y1="6" x2="18" y2="6"/></svg>',
    design: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><circle cx="11" cy="11" r="2"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    music: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
    mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>'
  };

  /* ---------- Helpers ---------- */
  function el(id) { return document.getElementById(id); }
  function val(id) { return el(id) ? el(id).value : ''; }
  function setVal(id, v) { if (el(id)) el(id).value = v || ''; }

  function showToast(msg, type) {
    var t = el('toast');
    t.textContent = msg;
    t.className = 'toast show ' + (type || '');
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.className = 'toast'; }, 2500);
  }

  function generateId(prefix) {
    return (prefix || 'item') + '-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4);
  }

  function esc(str) {
    if (!str) return '';
    var d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  /* ---------- Tab Navigation ---------- */
  function initTabs() {
    document.querySelectorAll('.admin-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        document.querySelectorAll('.admin-tab').forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        document.querySelectorAll('.admin-section').forEach(function (s) { s.classList.remove('active'); });
        var sec = el('sec-' + tab.dataset.tab);
        if (sec) sec.classList.add('active');
      });
    });
  }

  /* ---------- Image Preview ---------- */
  function initImagePreviews() {
    var pairs = [
      ['site-ogImage', 'site-ogImage-preview'],
      ['about-avatar', 'about-avatar-preview']
    ];
    pairs.forEach(function (p) {
      var input = el(p[0]);
      if (!input) return;
      input.addEventListener('input', function () {
        var preview = el(p[1]);
        if (this.value) {
          preview.src = this.value;
          preview.style.display = 'block';
          preview.onerror = function () { preview.style.display = 'none'; };
        } else {
          preview.style.display = 'none';
        }
      });
    });
  }

  /* ---------- File Picker ---------- */
  function initFilePicker() {
    var picker = el('filePicker');
    var currentTarget = null;

    // Top-level pick files button
    el('btnPickFiles').addEventListener('click', function () {
      currentTarget = null;
      picker.click();
    });

    // Individual field pick buttons
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.pick-file-btn');
      if (btn) {
        currentTarget = btn.dataset.target;
        picker.click();
      }
    });

    picker.addEventListener('change', function (e) {
      var files = e.target.files;
      if (!files.length) return;

      if (currentTarget && files.length === 1) {
        // Single file for specific field
        var input = el(currentTarget);
        if (input) {
          input.value = 'assets/images/' + files[0].name;
          input.dispatchEvent(new Event('input'));
          showToast('已填入: ' + files[0].name, 'success');
        }
      } else {
        // Show file names
        var names = Array.from(files).map(function (f) { return f.name; }).join(', ');
        showToast('選擇了: ' + names + '（請手動複製到 assets/images/）', 'success');
      }

      e.target.value = '';
      currentTarget = null;
    });
  }

  /* ==============================
     Wizard
     ============================== */
  function initWizard() {
    var overlay = el('wizardOverlay');

    // Show wizard only if no data loaded and no template set
    function shouldShowWizard() {
      return !data || !data.template;
    }

    overlay.querySelectorAll('.wizard-option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tpl = btn.dataset.template;
        applyTemplate(tpl);
        overlay.classList.remove('show');
        showToast('已套用「' + btn.querySelector('strong').textContent + '」模板', 'success');
      });
    });

    return {
      show: function () { overlay.classList.add('show'); },
      hide: function () { overlay.classList.remove('show'); }
    };
  }

  function applyTemplate(tpl) {
    if (!data) return;
    data.template = tpl;
    data.sections = JSON.parse(JSON.stringify(PRESETS[tpl] || PRESETS.custom));
    renderSectionToggles();
    updateTemplateButtons();
  }

  /* ==============================
     Section Manager
     ============================== */
  function renderSectionToggles() {
    var container = el('sectionToggles');
    if (!container) return;
    var sections = data.sections || {};
    var html = '';

    Object.keys(SECTION_LABELS).forEach(function (key) {
      var checked = sections[key] !== false ? 'checked' : '';
      html += '<div class="section-toggle-item">' +
        '<label>' + SECTION_LABELS[key] + '</label>' +
        '<label class="toggle-switch">' +
          '<input type="checkbox" data-section="' + key + '" ' + checked + '>' +
          '<span class="toggle-slider"></span>' +
        '</label>' +
      '</div>';
    });

    container.innerHTML = html;

    container.querySelectorAll('input[type="checkbox"]').forEach(function (cb) {
      cb.addEventListener('change', function () {
        data.sections = data.sections || {};
        data.sections[this.dataset.section] = this.checked;
        data.template = 'custom';
        updateTemplateButtons();
      });
    });
  }

  function updateTemplateButtons() {
    document.querySelectorAll('.template-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.tpl === data.template);
    });
  }

  function initSectionManager() {
    el('templateButtons').addEventListener('click', function (e) {
      var btn = e.target.closest('.template-btn');
      if (!btn) return;
      applyTemplate(btn.dataset.tpl);
      showToast('已切換模板', 'success');
    });
  }

  /* ---------- Background Style Selector ---------- */
  function initBgStyleSelect() {
    var container = el('bgStyleSelect');
    if (!container) return;
    container.addEventListener('click', function (e) {
      var opt = e.target.closest('.bg-style-option');
      if (!opt) return;
      container.querySelectorAll('.bg-style-option').forEach(function (o) { o.classList.remove('selected'); });
      opt.classList.add('selected');
      setVal('hero-backgroundStyle', opt.dataset.style);
    });
  }

  /* ==============================
     Populate & Collect Form
     ============================== */
  function populateForm(d) {
    data = JSON.parse(JSON.stringify(d));

    // Ensure defaults
    data.sections = data.sections || PRESETS.gamedev;
    data.template = data.template || 'gamedev';
    data.gallery = data.gallery || { heading: '作品集', items: [] };
    data.playlists = data.playlists || [];
    data.videoShowcase = data.videoShowcase || [];
    data.services = data.services || [];
    data.liveSchedule = data.liveSchedule || { heading: '直播時間表', schedule: [], channelUrl: '' };
    data.stats = data.stats || [];
    data.content = data.content || { youtubeVideos: [], instagramPosts: [], twitchChannel: '' };

    // Site
    setVal('site-title', (data.site || {}).title);
    setVal('site-description', (data.site || {}).description);
    setVal('site-ogImage', (data.site || {}).ogImage);
    var ogInput = el('site-ogImage');
    if (ogInput) ogInput.dispatchEvent(new Event('input'));

    // Hero
    if (data.hero) {
      setVal('hero-tagline', data.hero.tagline);
      setVal('hero-heading', data.hero.heading);
      setVal('hero-subtitle', data.hero.subtitle);
      setVal('hero-ctaText', data.hero.ctaText);
      setVal('hero-backgroundStyle', data.hero.backgroundStyle || 'minimal');
      // Update visual selector
      var bgSelect = el('bgStyleSelect');
      if (bgSelect) {
        bgSelect.querySelectorAll('.bg-style-option').forEach(function (opt) {
          opt.classList.toggle('selected', opt.dataset.style === (data.hero.backgroundStyle || 'minimal'));
        });
      }
    }

    // Section toggles
    renderSectionToggles();
    updateTemplateButtons();

    // Games
    renderGamesEditor();

    // Gallery
    setVal('gallery-heading', data.gallery.heading);
    renderGalleryEditor();

    // Playlists
    renderPlaylistEditor();

    // Video Showcase
    renderVideoEditor();

    // Content
    setVal('content-twitchChannel', data.content.twitchChannel);
    renderYtEditor();
    renderIgEditor();

    // Services
    renderServiceEditor();

    // Schedule
    setVal('schedule-heading', data.liveSchedule.heading);
    setVal('schedule-channelUrl', data.liveSchedule.channelUrl);
    renderScheduleEditor();

    // Stats
    renderStatEditor();

    // About
    if (data.about) {
      setVal('about-avatar', data.about.avatar);
      var avatarInput = el('about-avatar');
      if (avatarInput) avatarInput.dispatchEvent(new Event('input'));
      setVal('about-bio', data.about.bio);
      setVal('about-contactEmail', data.about.contactEmail);
      setVal('about-collaborationNote', data.about.collaborationNote);
      renderSkillsEditor();
    }

    // Support
    if (data.support) {
      setVal('support-heading', data.support.heading);
      setVal('support-message', data.support.message);
      setVal('support-opayUrl', data.support.opayUrl);
    }

    // Social
    if (data.social) {
      ['facebook','instagram','twitter','youtube','twitch','bahamut','discord'].forEach(function (k) {
        setVal('social-' + k, data.social[k]);
      });
    }
  }

  function collectForm() {
    // Sections
    data.sections = data.sections || {};
    el('sectionToggles').querySelectorAll('input[type="checkbox"]').forEach(function (cb) {
      data.sections[cb.dataset.section] = cb.checked;
    });

    data.site = {
      title: val('site-title'),
      description: val('site-description'),
      ogImage: val('site-ogImage')
    };
    data.hero = {
      tagline: val('hero-tagline'),
      heading: val('hero-heading'),
      subtitle: val('hero-subtitle'),
      ctaText: val('hero-ctaText'),
      backgroundStyle: val('hero-backgroundStyle') || 'minimal'
    };

    collectGames();
    collectGallery();
    collectPlaylists();
    collectVideos();

    data.content = data.content || {};
    data.content.twitchChannel = val('content-twitchChannel');
    collectYt();
    collectIg();

    collectServices();

    data.liveSchedule = data.liveSchedule || {};
    data.liveSchedule.heading = val('schedule-heading');
    data.liveSchedule.channelUrl = val('schedule-channelUrl');
    collectSchedule();

    collectStats();

    data.about = {
      avatar: val('about-avatar'),
      bio: val('about-bio'),
      skills: collectSkills(),
      contactEmail: val('about-contactEmail'),
      collaborationNote: val('about-collaborationNote')
    };
    data.support = {
      heading: val('support-heading'),
      message: val('support-message'),
      opayUrl: val('support-opayUrl')
    };
    data.social = {};
    ['facebook','instagram','twitter','youtube','twitch','bahamut','discord'].forEach(function (k) {
      var v = val('social-' + k);
      if (v) data.social[k] = v;
    });

    return data;
  }

  /* ==============================
     Games Editor
     ============================== */
  function renderGamesEditor() {
    var list = el('gamesEditorList');
    list.innerHTML = '';
    (data.games || []).forEach(function (game, idx) {
      list.appendChild(createGameCard(game, idx));
    });
    initDragAndDrop();
  }

  function createGameCard(game, idx) {
    var card = document.createElement('div');
    card.className = 'game-editor-card';
    card.draggable = true;
    card.dataset.index = idx;

    var platformChecks = ['Steam','Android','iOS'].map(function (p) {
      var checked = (game.platforms || []).indexOf(p) !== -1 ? 'checked' : '';
      return '<label><input type="checkbox" value="' + p + '" ' + checked + '> ' + p + '</label>';
    }).join('');

    var tags = (game.tags || []).map(function (t) {
      return '<span class="tag-item">' + esc(t) + ' <span class="tag-remove" data-tag="' + esc(t) + '">&times;</span></span>';
    }).join('');

    card.innerHTML =
      '<div class="game-editor-header">' +
        '<span class="drag-handle">&#9776;</span>' +
        '<span class="game-title-preview">' + esc(game.name || '新遊戲') + '</span>' +
        '<div class="header-actions">' +
          '<button class="btn btn-sm btn-secondary toggle-btn">展開</button>' +
          '<button class="btn btn-sm btn-danger delete-btn">刪除</button>' +
        '</div>' +
      '</div>' +
      '<div class="game-editor-body">' +
        '<div class="field"><label>遊戲 ID</label><input type="text" class="g-id" value="' + esc(game.id || '') + '"></div>' +
        '<div class="field"><label>遊戲名稱 <span class="required">*</span></label><input type="text" class="g-name" value="' + esc(game.name || '') + '"></div>' +
        '<div class="field"><label>類型</label><input type="text" class="g-genre" value="' + esc(game.genre || '') + '"></div>' +
        '<div class="field"><label>一句話描述</label><input type="text" class="g-desc" value="' + esc(game.description || '') + '"></div>' +
        '<div class="field"><label>封面圖路徑</label><div class="field-with-picker"><input type="text" class="g-image" value="' + esc(game.image || '') + '"><button class="btn btn-sm btn-secondary pick-file-btn" data-target="">📁</button></div><p class="field-hint">圖片放到 assets/images/games/ 資料夾</p></div>' +
        '<div class="field"><label>平台</label><div class="platform-checks">' + platformChecks + '</div></div>' +
        '<div class="field"><label>Steam 連結</label><input type="url" class="g-link-steam" value="' + esc((game.links || {}).steam || '') + '"></div>' +
        '<div class="field"><label>Android 連結</label><input type="url" class="g-link-android" value="' + esc((game.links || {}).android || '') + '"></div>' +
        '<div class="field"><label>iOS 連結</label><input type="url" class="g-link-ios" value="' + esc((game.links || {}).ios || '') + '"></div>' +
        '<div class="field"><label>標籤</label><div class="tags-editor game-tags-editor">' + tags + '<input type="text" class="tag-add-input" placeholder="輸入後按 Enter"></div></div>' +
        '<div class="field-checkbox"><input type="checkbox" class="g-featured" ' + (game.featured ? 'checked' : '') + '><label>主打作品（會放大顯示）</label></div>' +
      '</div>';

    // Wire up game card pick-file button to target the image input
    var pickBtn = card.querySelector('.pick-file-btn');
    var imgInput = card.querySelector('.g-image');
    pickBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var picker = el('filePicker');
      picker.onchange = function (ev) {
        if (ev.target.files.length) {
          imgInput.value = 'assets/images/games/' + ev.target.files[0].name;
          showToast('已填入: ' + ev.target.files[0].name, 'success');
        }
        ev.target.value = '';
        picker.onchange = null;
      };
      picker.click();
    });

    card.querySelector('.toggle-btn').addEventListener('click', function () {
      var body = card.querySelector('.game-editor-body');
      body.classList.toggle('open');
      this.textContent = body.classList.contains('open') ? '收起' : '展開';
    });

    card.querySelector('.delete-btn').addEventListener('click', function () {
      if (confirm('確定要刪除「' + (game.name || '此遊戲') + '」？')) {
        data.games.splice(idx, 1);
        renderGamesEditor();
        showToast('已刪除', 'error');
      }
    });

    card.querySelector('.g-name').addEventListener('input', function () {
      card.querySelector('.game-title-preview').textContent = this.value || '新遊戲';
    });

    initTagInput(card.querySelector('.tag-add-input'));
    card.querySelectorAll('.tag-remove').forEach(function (btn) { bindTagRemove(btn.parentElement); });

    return card;
  }

  function collectGames() {
    var cards = el('gamesEditorList').querySelectorAll('.game-editor-card');
    data.games = [];
    cards.forEach(function (card) {
      var platforms = [];
      card.querySelectorAll('.platform-checks input:checked').forEach(function (cb) { platforms.push(cb.value); });
      var tags = [];
      card.querySelectorAll('.game-tags-editor .tag-item').forEach(function (t) {
        var text = t.querySelector('.tag-remove').dataset.tag;
        if (text) tags.push(text);
      });
      var links = {};
      var s = card.querySelector('.g-link-steam').value;
      var a = card.querySelector('.g-link-android').value;
      var i = card.querySelector('.g-link-ios').value;
      if (s) links.steam = s;
      if (a) links.android = a;
      if (i) links.ios = i;

      data.games.push({
        id: card.querySelector('.g-id').value,
        name: card.querySelector('.g-name').value,
        genre: card.querySelector('.g-genre').value,
        description: card.querySelector('.g-desc').value,
        image: card.querySelector('.g-image').value,
        platforms: platforms, links: links, tags: tags,
        featured: card.querySelector('.g-featured').checked
      });
    });
  }

  el('btnAddGame').addEventListener('click', function () {
    collectGames();
    data.games.push({ id: generateId('game'), name: '', genre: '', description: '', image: '', platforms: [], links: {}, tags: [], featured: false });
    renderGamesEditor();
    var cards = el('gamesEditorList').querySelectorAll('.game-editor-card');
    var last = cards[cards.length - 1];
    if (last) {
      last.querySelector('.game-editor-body').classList.add('open');
      last.querySelector('.toggle-btn').textContent = '收起';
      last.scrollIntoView({ behavior: 'smooth' });
    }
    showToast('已新增遊戲');
  });

  function initDragAndDrop() {
    var list = el('gamesEditorList');
    var cards = list.querySelectorAll('.game-editor-card');
    var dragSrc = null;
    cards.forEach(function (card) {
      card.addEventListener('dragstart', function (e) {
        collectGames();
        dragSrc = card;
        card.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', card.dataset.index);
      });
      card.addEventListener('dragend', function () { card.classList.remove('dragging'); dragSrc = null; });
      card.addEventListener('dragover', function (e) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; });
      card.addEventListener('drop', function (e) {
        e.preventDefault();
        if (dragSrc && dragSrc !== card) {
          var fromIdx = parseInt(dragSrc.dataset.index);
          var toIdx = parseInt(card.dataset.index);
          var moved = data.games.splice(fromIdx, 1)[0];
          data.games.splice(toIdx, 0, moved);
          renderGamesEditor();
          showToast('已重新排序');
        }
      });
    });
  }

  /* ==============================
     Gallery Editor
     ============================== */
  function renderGalleryEditor() {
    var list = el('galleryEditorList');
    list.innerHTML = '';
    (data.gallery.items || []).forEach(function (item, i) {
      list.innerHTML +=
        '<div class="editor-card" data-idx="' + i + '">' +
          '<div class="editor-card-header"><strong>' + esc(item.title || '圖片 ' + (i + 1)) + '</strong><button class="btn btn-sm btn-danger gallery-del">刪除</button></div>' +
          '<div class="field"><label>圖片路徑</label><div class="field-with-picker"><input type="text" class="gal-image" value="' + esc(item.image || '') + '"><button class="btn btn-sm btn-secondary pick-file-btn" data-target="">📁</button></div></div>' +
          '<div class="field"><label>標題（選填）</label><input type="text" class="gal-title" value="' + esc(item.title || '') + '"></div>' +
        '</div>';
    });

    list.querySelectorAll('.gallery-del').forEach(function (btn) {
      btn.addEventListener('click', function () {
        collectGallery();
        var idx = parseInt(btn.closest('.editor-card').dataset.idx);
        data.gallery.items.splice(idx, 1);
        renderGalleryEditor();
      });
    });

    // Wire up pick-file buttons
    list.querySelectorAll('.pick-file-btn').forEach(function (btn) {
      var imgInput = btn.closest('.field-with-picker').querySelector('input');
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var picker = el('filePicker');
        picker.onchange = function (ev) {
          if (ev.target.files.length) {
            imgInput.value = 'assets/images/' + ev.target.files[0].name;
            showToast('已填入: ' + ev.target.files[0].name, 'success');
          }
          ev.target.value = '';
          picker.onchange = null;
        };
        picker.click();
      });
    });
  }

  function collectGallery() {
    data.gallery = data.gallery || { items: [] };
    data.gallery.heading = val('gallery-heading');
    data.gallery.items = [];
    el('galleryEditorList').querySelectorAll('.editor-card').forEach(function (card) {
      var image = card.querySelector('.gal-image').value.trim();
      if (image) {
        data.gallery.items.push({
          image: image,
          title: card.querySelector('.gal-title').value
        });
      }
    });
  }

  el('btnAddGalleryItem').addEventListener('click', function () {
    collectGallery();
    data.gallery.items.push({ image: '', title: '' });
    renderGalleryEditor();
  });

  /* ==============================
     Playlist Editor
     ============================== */
  function renderPlaylistEditor() {
    var list = el('playlistEditorList');
    list.innerHTML = '';
    (data.playlists || []).forEach(function (pl, i) {
      list.innerHTML +=
        '<div class="editor-card" data-idx="' + i + '">' +
          '<div class="editor-card-header"><strong>' + esc(pl.title || '播放清單 ' + (i + 1)) + '</strong><button class="btn btn-sm btn-danger pl-del">刪除</button></div>' +
          '<div class="field"><label>標題 <span class="required">*</span></label><input type="text" class="pl-title" value="' + esc(pl.title || '') + '"></div>' +
          '<div class="field"><label>說明（選填）</label><input type="text" class="pl-desc" value="' + esc(pl.description || '') + '"></div>' +
          '<div class="field"><label>YouTube 播放清單 ID <span class="required">*</span></label><input type="text" class="pl-ytid" value="' + esc(pl.youtubePlaylistId || '') + '"><p class="field-hint">從 YouTube 播放清單網址複製 list= 後面的那串文字</p></div>' +
        '</div>';
    });

    list.querySelectorAll('.pl-del').forEach(function (btn) {
      btn.addEventListener('click', function () {
        collectPlaylists();
        var idx = parseInt(btn.closest('.editor-card').dataset.idx);
        data.playlists.splice(idx, 1);
        renderPlaylistEditor();
      });
    });
  }

  function collectPlaylists() {
    data.playlists = [];
    el('playlistEditorList').querySelectorAll('.editor-card').forEach(function (card) {
      data.playlists.push({
        id: generateId('pl'),
        title: card.querySelector('.pl-title').value,
        description: card.querySelector('.pl-desc').value,
        youtubePlaylistId: card.querySelector('.pl-ytid').value
      });
    });
  }

  el('btnAddPlaylist').addEventListener('click', function () {
    collectPlaylists();
    data.playlists.push({ id: generateId('pl'), title: '', description: '', youtubePlaylistId: '' });
    renderPlaylistEditor();
  });

  /* ==============================
     Video Showcase Editor
     ============================== */
  function renderVideoEditor() {
    var list = el('videoEditorList');
    list.innerHTML = '';
    (data.videoShowcase || []).forEach(function (v, i) {
      list.innerHTML +=
        '<div class="editor-card" data-idx="' + i + '">' +
          '<div class="editor-card-header"><strong>' + esc(v.title || '影片 ' + (i + 1)) + '</strong><button class="btn btn-sm btn-danger vid-del">刪除</button></div>' +
          '<div class="field"><label>影片標題 <span class="required">*</span></label><input type="text" class="vid-title" value="' + esc(v.title || '') + '"></div>' +
          '<div class="field"><label>YouTube 網址或 ID <span class="required">*</span></label><input type="text" class="vid-ytid" value="' + esc(v.youtubeId || '') + '"><p class="field-hint">貼上 YouTube 網址，系統會自動辨識</p></div>' +
          '<div class="field"><label>分類（選填）</label><input type="text" class="vid-cat" value="' + esc(v.category || '') + '"><p class="field-hint">用來做篩選分類，例如：MV、Vlog、教學</p></div>' +
          '<div class="field"><label>客戶名稱（選填）</label><input type="text" class="vid-client" value="' + esc(v.client || '') + '"></div>' +
          '<div class="field"><label>簡介（選填）</label><input type="text" class="vid-desc" value="' + esc(v.description || '') + '"></div>' +
        '</div>';
    });

    list.querySelectorAll('.vid-del').forEach(function (btn) {
      btn.addEventListener('click', function () {
        collectVideos();
        var idx = parseInt(btn.closest('.editor-card').dataset.idx);
        data.videoShowcase.splice(idx, 1);
        renderVideoEditor();
      });
    });
  }

  function collectVideos() {
    data.videoShowcase = [];
    el('videoEditorList').querySelectorAll('.editor-card').forEach(function (card) {
      var ytid = card.querySelector('.vid-ytid').value.trim();
      if (ytid) {
        data.videoShowcase.push({
          id: generateId('vid'),
          title: card.querySelector('.vid-title').value,
          youtubeId: ytid,
          category: card.querySelector('.vid-cat').value,
          client: card.querySelector('.vid-client').value,
          description: card.querySelector('.vid-desc').value
        });
      }
    });
  }

  el('btnAddVideo').addEventListener('click', function () {
    collectVideos();
    data.videoShowcase.push({ id: generateId('vid'), title: '', youtubeId: '', category: '', client: '', description: '' });
    renderVideoEditor();
  });

  /* ==============================
     YouTube Editor (Content Feed)
     ============================== */
  function renderYtEditor() {
    var list = el('ytEditorList');
    list.innerHTML = '';
    var vids = (data.content && data.content.youtubeVideos) || [];
    vids.forEach(function (v, i) {
      list.innerHTML +=
        '<div class="list-item" data-idx="' + i + '">' +
          '<div class="field" style="flex:2;"><label>YouTube 網址</label><input type="text" class="yt-id" value="' + esc(v.id || '') + '" placeholder="貼上 YouTube 網址或影片 ID"></div>' +
          '<div class="field" style="flex:1;"><label>標題（選填）</label><input type="text" class="yt-title" value="' + esc(v.title || '') + '" placeholder="方便自己辨識用"></div>' +
          '<button class="btn btn-sm btn-danger yt-del" style="align-self:flex-end;margin-bottom:0.25rem;">刪除</button>' +
        '</div>';
    });
    list.querySelectorAll('.yt-del').forEach(function (btn) {
      btn.addEventListener('click', function () {
        collectYt();
        var idx = parseInt(btn.closest('.list-item').dataset.idx);
        data.content.youtubeVideos.splice(idx, 1);
        renderYtEditor();
      });
    });
  }

  function collectYt() {
    data.content = data.content || {};
    data.content.youtubeVideos = [];
    el('ytEditorList').querySelectorAll('.list-item').forEach(function (item) {
      var rawInput = item.querySelector('.yt-id').value.trim();
      if (rawInput) {
        data.content.youtubeVideos.push({ id: rawInput, title: item.querySelector('.yt-title').value });
      }
    });
  }

  el('btnAddYt').addEventListener('click', function () {
    collectYt();
    data.content.youtubeVideos.push({ id: '', title: '' });
    renderYtEditor();
    var items = el('ytEditorList').querySelectorAll('.yt-id');
    if (items.length) items[items.length - 1].focus();
  });

  /* ==============================
     Instagram Editor
     ============================== */
  function renderIgEditor() {
    var list = el('igEditorList');
    list.innerHTML = '';
    var posts = (data.content && data.content.instagramPosts) || [];
    posts.forEach(function (p, i) {
      list.innerHTML +=
        '<div class="list-item" data-idx="' + i + '">' +
          '<div class="field" style="flex:1;"><label>Instagram 貼文網址</label><input type="url" class="ig-url" value="' + esc(p.url || '') + '" placeholder="https://www.instagram.com/p/xxxxx/"></div>' +
          '<button class="btn btn-sm btn-danger ig-del" style="align-self:flex-end;margin-bottom:0.25rem;">刪除</button>' +
        '</div>';
    });
    list.querySelectorAll('.ig-del').forEach(function (btn) {
      btn.addEventListener('click', function () {
        collectIg();
        var idx = parseInt(btn.closest('.list-item').dataset.idx);
        data.content.instagramPosts.splice(idx, 1);
        renderIgEditor();
      });
    });
  }

  function collectIg() {
    data.content = data.content || {};
    data.content.instagramPosts = [];
    el('igEditorList').querySelectorAll('.list-item').forEach(function (item) {
      var url = item.querySelector('.ig-url').value.trim();
      if (url) data.content.instagramPosts.push({ url: url });
    });
  }

  el('btnAddIg').addEventListener('click', function () {
    collectIg();
    data.content.instagramPosts.push({ url: '' });
    renderIgEditor();
    var items = el('igEditorList').querySelectorAll('.ig-url');
    if (items.length) items[items.length - 1].focus();
  });

  /* ==============================
     Services Editor
     ============================== */
  function renderServiceEditor() {
    var list = el('serviceEditorList');
    list.innerHTML = '';
    (data.services || []).forEach(function (s, i) {
      var iconOptions = SERVICE_ICON_OPTIONS.map(function (icon) {
        var selected = (s.icon === icon) ? ' selected' : '';
        return '<div class="icon-option' + selected + '" data-icon="' + icon + '">' + (SERVICE_ICON_SVGS[icon] || '') + '</div>';
      }).join('');

      list.innerHTML +=
        '<div class="editor-card" data-idx="' + i + '">' +
          '<div class="editor-card-header"><strong>' + esc(s.title || '服務 ' + (i + 1)) + '</strong><button class="btn btn-sm btn-danger svc-del">刪除</button></div>' +
          '<div class="field"><label>服務名稱 <span class="required">*</span></label><input type="text" class="svc-title" value="' + esc(s.title || '') + '"></div>' +
          '<div class="field"><label>說明</label><input type="text" class="svc-desc" value="' + esc(s.description || '') + '"></div>' +
          '<div class="field"><label>圖示</label><div class="icon-select svc-icon-select">' + iconOptions + '</div><input type="hidden" class="svc-icon" value="' + esc(s.icon || 'design') + '"></div>' +
        '</div>';
    });

    // Icon selection
    list.querySelectorAll('.icon-option').forEach(function (opt) {
      opt.addEventListener('click', function () {
        var parent = opt.closest('.field');
        parent.querySelectorAll('.icon-option').forEach(function (o) { o.classList.remove('selected'); });
        opt.classList.add('selected');
        parent.querySelector('.svc-icon').value = opt.dataset.icon;
      });
    });

    list.querySelectorAll('.svc-del').forEach(function (btn) {
      btn.addEventListener('click', function () {
        collectServices();
        var idx = parseInt(btn.closest('.editor-card').dataset.idx);
        data.services.splice(idx, 1);
        renderServiceEditor();
      });
    });
  }

  function collectServices() {
    data.services = [];
    el('serviceEditorList').querySelectorAll('.editor-card').forEach(function (card) {
      data.services.push({
        icon: card.querySelector('.svc-icon').value || 'design',
        title: card.querySelector('.svc-title').value,
        description: card.querySelector('.svc-desc').value
      });
    });
  }

  el('btnAddService').addEventListener('click', function () {
    collectServices();
    data.services.push({ icon: 'design', title: '', description: '' });
    renderServiceEditor();
  });

  /* ==============================
     Schedule Editor
     ============================== */
  var DAY_OPTIONS = [
    { key: 'mon', label: '週一' },
    { key: 'tue', label: '週二' },
    { key: 'wed', label: '週三' },
    { key: 'thu', label: '週四' },
    { key: 'fri', label: '週五' },
    { key: 'sat', label: '週六' },
    { key: 'sun', label: '週日' }
  ];

  function renderScheduleEditor() {
    var list = el('scheduleEditorList');
    list.innerHTML = '';
    var items = (data.liveSchedule && data.liveSchedule.schedule) || [];
    items.forEach(function (item, i) {
      var dayBtns = DAY_OPTIONS.map(function (d) {
        var selected = item.day === d.key ? ' selected' : '';
        return '<span class="day-option' + selected + '" data-day="' + d.key + '">' + d.label + '</span>';
      }).join('');

      list.innerHTML +=
        '<div class="editor-card" data-idx="' + i + '">' +
          '<div class="editor-card-header"><strong>時段 ' + (i + 1) + '</strong><button class="btn btn-sm btn-danger sched-del">刪除</button></div>' +
          '<div class="field"><label>星期</label><div class="day-select">' + dayBtns + '</div><input type="hidden" class="sched-day" value="' + esc(item.day || '') + '"></div>' +
          '<div class="field"><label>時間</label><input type="text" class="sched-time" value="' + esc(item.time || '') + '" placeholder="例如：20:00 - 22:00"></div>' +
          '<div class="field"><label>內容（選填）</label><input type="text" class="sched-desc" value="' + esc(item.description || '') + '" placeholder="例如：聊天雜談"></div>' +
        '</div>';
    });

    // Day selection
    list.querySelectorAll('.day-option').forEach(function (opt) {
      opt.addEventListener('click', function () {
        var parent = opt.closest('.field');
        parent.querySelectorAll('.day-option').forEach(function (o) { o.classList.remove('selected'); });
        opt.classList.add('selected');
        parent.querySelector('.sched-day').value = opt.dataset.day;
      });
    });

    list.querySelectorAll('.sched-del').forEach(function (btn) {
      btn.addEventListener('click', function () {
        collectSchedule();
        var idx = parseInt(btn.closest('.editor-card').dataset.idx);
        data.liveSchedule.schedule.splice(idx, 1);
        renderScheduleEditor();
      });
    });
  }

  function collectSchedule() {
    data.liveSchedule = data.liveSchedule || {};
    data.liveSchedule.schedule = [];
    el('scheduleEditorList').querySelectorAll('.editor-card').forEach(function (card) {
      data.liveSchedule.schedule.push({
        day: card.querySelector('.sched-day').value,
        time: card.querySelector('.sched-time').value,
        description: card.querySelector('.sched-desc').value
      });
    });
  }

  el('btnAddSchedule').addEventListener('click', function () {
    collectSchedule();
    data.liveSchedule.schedule.push({ day: '', time: '', description: '' });
    renderScheduleEditor();
  });

  /* ==============================
     Stats Editor
     ============================== */
  function renderStatEditor() {
    var list = el('statEditorList');
    list.innerHTML = '';
    (data.stats || []).forEach(function (s, i) {
      list.innerHTML +=
        '<div class="list-item" data-idx="' + i + '">' +
          '<div class="field" style="flex:1;"><label>數字</label><input type="text" class="stat-number" value="' + esc(s.number || '') + '" placeholder="100+"></div>' +
          '<div class="field" style="flex:1;"><label>標籤</label><input type="text" class="stat-label" value="' + esc(s.label || '') + '" placeholder="完成專案"></div>' +
          '<button class="btn btn-sm btn-danger stat-del" style="align-self:flex-end;margin-bottom:0.25rem;">刪除</button>' +
        '</div>';
    });

    list.querySelectorAll('.stat-del').forEach(function (btn) {
      btn.addEventListener('click', function () {
        collectStats();
        var idx = parseInt(btn.closest('.list-item').dataset.idx);
        data.stats.splice(idx, 1);
        renderStatEditor();
      });
    });
  }

  function collectStats() {
    data.stats = [];
    el('statEditorList').querySelectorAll('.list-item').forEach(function (item) {
      var num = item.querySelector('.stat-number').value.trim();
      var label = item.querySelector('.stat-label').value.trim();
      if (num || label) {
        data.stats.push({ number: num, label: label });
      }
    });
  }

  el('btnAddStat').addEventListener('click', function () {
    collectStats();
    data.stats.push({ number: '', label: '' });
    renderStatEditor();
  });

  /* ==============================
     Skills Editor
     ============================== */
  function renderSkillsEditor() {
    var container = el('about-skills-editor');
    container.innerHTML = '';
    (data.about.skills || []).forEach(function (s) {
      var span = document.createElement('span');
      span.className = 'tag-item';
      span.innerHTML = esc(s) + ' <span class="tag-remove" data-tag="' + esc(s) + '">&times;</span>';
      container.appendChild(span);
      bindTagRemove(span);
    });
    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'tag-add-input';
    input.placeholder = '輸入後按 Enter 新增';
    initTagInput(input);
    container.appendChild(input);
  }

  function collectSkills() {
    var skills = [];
    el('about-skills-editor').querySelectorAll('.tag-item').forEach(function (t) {
      var text = t.querySelector('.tag-remove').dataset.tag;
      if (text) skills.push(text);
    });
    return skills;
  }

  /* ---------- Tag Helpers ---------- */
  function initTagInput(input) {
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && this.value.trim()) {
        e.preventDefault();
        var tagVal = this.value.trim();
        this.value = '';
        var tagSpan = document.createElement('span');
        tagSpan.className = 'tag-item';
        tagSpan.innerHTML = esc(tagVal) + ' <span class="tag-remove" data-tag="' + esc(tagVal) + '">&times;</span>';
        this.parentElement.insertBefore(tagSpan, this);
        bindTagRemove(tagSpan);
      }
    });
  }

  function bindTagRemove(tagEl) {
    tagEl.querySelector('.tag-remove').addEventListener('click', function () { tagEl.remove(); });
  }

  /* ==============================
     Import / Export / Reset
     ============================== */
  el('btnImport').addEventListener('click', function () { el('fileInput').click(); });

  el('fileInput').addEventListener('change', function (e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (ev) {
      try {
        var imported = JSON.parse(ev.target.result);
        savedData = JSON.parse(JSON.stringify(imported));
        populateForm(imported);
        showToast('匯入成功！', 'success');
      } catch (err) {
        showToast('JSON 格式錯誤', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  });

  el('btnExport').addEventListener('click', function () {
    var result = collectForm();
    var json = JSON.stringify(result, null, 2);
    var blob = new Blob([json], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'site-data.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('已匯出！把 site-data.json 放到 data/ 資料夾覆蓋', 'success');
  });

  /* ==============================
     GitHub Publish
     ============================== */
  var GH_STORAGE_KEY = 'portfolio-gh-settings';

  function getGhSettings() {
    try {
      return JSON.parse(localStorage.getItem(GH_STORAGE_KEY)) || null;
    } catch (e) { return null; }
  }

  function saveGhSettings(settings) {
    localStorage.setItem(GH_STORAGE_KEY, JSON.stringify(settings));
  }

  function clearGhSettings() {
    localStorage.removeItem(GH_STORAGE_KEY);
  }

  function showGhModal() {
    var settings = getGhSettings();
    if (settings) {
      setVal('gh-owner', settings.owner);
      setVal('gh-repo', settings.repo);
      setVal('gh-token', settings.token);
      setVal('gh-branch', settings.branch || 'main');
    }
    el('ghModal').classList.add('show');
  }

  function hideGhModal() {
    el('ghModal').classList.remove('show');
  }

  function utf8ToBase64(str) {
    var bytes = new TextEncoder().encode(str);
    var binary = '';
    for (var i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  function publishToGithub(settings) {
    var btn = el('btnPublish');
    btn.disabled = true;
    btn.textContent = '⏳ 發布中...';

    var result = collectForm();
    var json = JSON.stringify(result, null, 2);
    var contentBase64 = utf8ToBase64(json);

    var apiBase = 'https://api.github.com/repos/' + settings.owner + '/' + settings.repo;
    var filePath = 'data/site-data.json';
    var headers = {
      'Authorization': 'token ' + settings.token,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json'
    };

    // Step 1: Get current file SHA (needed for update)
    fetch(apiBase + '/contents/' + filePath + '?ref=' + (settings.branch || 'main'), {
      headers: headers
    })
    .then(function (res) {
      if (res.status === 404) return { sha: null };
      if (!res.ok) throw new Error('GitHub API 錯誤 (' + res.status + ')');
      return res.json();
    })
    .then(function (fileData) {
      // Step 2: Create or update file
      var body = {
        message: '更新網站內容 (via Admin Panel)',
        content: contentBase64,
        branch: settings.branch || 'main'
      };
      if (fileData.sha) body.sha = fileData.sha;

      return fetch(apiBase + '/contents/' + filePath, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body)
      });
    })
    .then(function (res) {
      if (!res.ok) {
        return res.json().then(function (err) {
          throw new Error(err.message || 'GitHub API 錯誤');
        });
      }
      return res.json();
    })
    .then(function () {
      showToast('發布成功！網站約 1-2 分鐘後更新', 'success');
    })
    .catch(function (err) {
      showToast('發布失敗：' + err.message, 'error');
    })
    .finally(function () {
      btn.disabled = false;
      btn.textContent = '🚀 發布到 GitHub';
    });
  }

  el('btnPublish').addEventListener('click', function () {
    var settings = getGhSettings();
    if (!settings || !settings.token) {
      showGhModal();
    } else {
      publishToGithub(settings);
    }
  });

  el('ghCancel').addEventListener('click', hideGhModal);

  el('ghModal').addEventListener('click', function (e) {
    if (e.target === el('ghModal')) hideGhModal();
  });

  el('ghSaveAndPublish').addEventListener('click', function () {
    var owner = val('gh-owner').trim();
    var repo = val('gh-repo').trim();
    var token = val('gh-token').trim();
    var branch = val('gh-branch').trim() || 'main';

    if (!owner || !repo || !token) {
      showToast('請填寫所有欄位', 'error');
      return;
    }

    var settings = { owner: owner, repo: repo, token: token, branch: branch };
    saveGhSettings(settings);
    hideGhModal();
    publishToGithub(settings);
  });

  el('ghClearSettings').addEventListener('click', function () {
    if (confirm('確定要清除已儲存的 GitHub 設定？')) {
      clearGhSettings();
      setVal('gh-owner', '');
      setVal('gh-repo', '');
      setVal('gh-token', '');
      setVal('gh-branch', 'main');
      showToast('GitHub 設定已清除', 'success');
    }
  });

  el('btnReset').addEventListener('click', function () {
    if (!savedData) {
      showToast('沒有已匯入的資料可還原', 'error');
      return;
    }
    if (confirm('確定要還原到上次匯入的狀態？所有未匯出的修改會消失。')) {
      populateForm(savedData);
      showToast('已重置', 'success');
    }
  });

  /* ==============================
     Init
     ============================== */
  function init() {
    initTabs();
    initImagePreviews();
    initFilePicker();
    initSectionManager();
    initBgStyleSelect();
    var wizard = initWizard();

    fetch('data/site-data.json')
      .then(function (res) {
        if (!res.ok) throw new Error('No data');
        return res.json();
      })
      .then(function (d) {
        savedData = JSON.parse(JSON.stringify(d));
        populateForm(d);
        showToast('已自動載入資料', 'success');

        // Show wizard if no template set (first-time user)
        if (!d.template) {
          wizard.show();
        }
      })
      .catch(function () {
        data = {
          template: '',
          sections: {},
          site: {}, hero: {}, games: [],
          gallery: { heading: '作品集', items: [] },
          playlists: [], videoShowcase: [], services: [],
          liveSchedule: { heading: '直播時間表', schedule: [], channelUrl: '' },
          stats: [],
          content: { youtubeVideos: [], instagramPosts: [], twitchChannel: '' },
          about: { skills: [] }, support: {}, social: {}
        };
        populateForm(data);
        wizard.show();
      });
  }

  /* ==============================
     Preview
     ============================== */
  function initPreview() {
    var iframe = el('previewIframe');
    var isOpen = false;

    function sendPreviewData() {
      if (!iframe || !iframe.contentWindow) return;
      var previewData = collectForm();
      iframe.contentWindow.postMessage({
        type: 'preview-update',
        payload: previewData
      }, '*');
    }

    function openPreview() {
      isOpen = true;
      document.body.classList.add('preview-open');
      // Wait for iframe to load then send data
      if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
        sendPreviewData();
      } else {
        iframe.onload = function () { sendPreviewData(); };
      }
    }

    function closePreview() {
      isOpen = false;
      document.body.classList.remove('preview-open');
    }

    el('btnPreview').addEventListener('click', function () {
      if (isOpen) { closePreview(); } else { openPreview(); }
    });
    el('btnPreviewRefresh').addEventListener('click', sendPreviewData);
    el('btnPreviewClose').addEventListener('click', closePreview);

    // New tab preview — no nested iframe, YouTube works
    el('btnPreviewTab').addEventListener('click', function () {
      var previewData = collectForm();
      var newWin = window.open('index.html', '_blank');
      if (!newWin) {
        showToast('瀏覽器擋住了彈出視窗，請允許此頁面開啟新分頁', 'error');
        return;
      }
      // Keep sending until the new page is ready to receive
      var attempts = 0;
      var sender = setInterval(function () {
        attempts++;
        try {
          newWin.postMessage({ type: 'preview-update', payload: previewData }, '*');
        } catch (e) { /* ignore */ }
        if (attempts > 20) clearInterval(sender);
      }, 300);
      // Stop when the new page confirms receipt
      window.addEventListener('message', function handler(e) {
        if (e.data && e.data.type === 'preview-received') {
          clearInterval(sender);
          window.removeEventListener('message', handler);
        }
      });
      showToast('已在新分頁開啟預覽', 'success');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(); initPreview(); });
  } else {
    init();
    initPreview();
  }
})();
