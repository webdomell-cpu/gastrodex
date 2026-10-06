// GastroDex PWA - High-Performance Hospitality & Gastronomy Encyclopedia
// Offline-first with LocalStorage synchronization & Bilingual EN/DE support

const STORAGE_KEY_ITEMS = 'gastrodex_items_v3';
const STORAGE_KEY_LANG = 'gastrodex_lang';
const STORAGE_KEY_QUIZ_RESULTS = 'gastrodex_quiz_results';

// Firebase Firestore Client Integration
const firebaseConfig = {
  apiKey: "AIzaSyD3FCooDWBQagyDEKMZf0OkmB2FfihEK6E",
  projectId: "gastrodex-823d7",
  authDomain: "gastrodex-823d7.firebaseapp.com"
};
let firestoreDb = null;
try {
  if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    firestoreDb = firebase.firestore();
    console.log("🔥 GastroDex PWA Firestore live connected to gastrodex-823d7");
  }
} catch (e) {
  console.warn("Firestore client init notice:", e);
}


let currentLang = localStorage.getItem(STORAGE_KEY_LANG) || 'de';
let currentTab = 'catalog';
let activeCategory = 'all';
let searchQuery = '';
let filterOnlyStock = false;
let filterOnlyFav = false;
let filterImport = null; // null, true, false
let selectedItem = null;

// Quiz Session State
let quizCategory = 'all';
let quizTargetCount = 10;
let quizQuestionsPool = [];
let activeQuizQuestions = [];
let quizCurrentIndex = 0;
let quizSelectedOption = null;
let quizIsRevealed = false;
let quizScore = 0;
let quizIsCompleted = false;

// INITIAL MASTER DATA: Loaded from data_bundle.js or fallback
const FALLBACK_ITEMS = (typeof MASTER_ITEMS !== "undefined") ? MASTER_ITEMS : [];

function loadItems() {
  const saved = localStorage.getItem(STORAGE_KEY_ITEMS);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      const overrideMap = {};
      parsed.forEach(it => {
        if (it && it.id) {
          overrideMap[it.id] = {
            isFavorite: it.isFavorite,
            stockQuantity: it.stockQuantity,
            inStock: it.inStock,
            userNotes: it.userNotes
          };
        }
      });
      return FALLBACK_ITEMS.map(m => {
        const ov = overrideMap[m.id];
        return ov ? { ...m, ...ov } : { ...m };
      });
    } catch(e) {
      console.error(e);
    }
  }
  return FALLBACK_ITEMS.map(m => ({ ...m }));
}

let items = loadItems();

function saveItems() {
  localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));
}

// FIREBASE CLOUD FIRESTORE SYNCHRONIZATION
const FIREBASE_CONFIG = {
  projectId: 'gastrodex-823d7',
  hostingUrl: 'https://gastrodex-823d7.web.app',
  firestoreRestEndpoint: 'https://firestore.googleapis.com/v1/projects/gastrodex-823d7/databases/(default)/documents'
};

async function syncWithFirebaseCloud() {
  // 1. First attempt: Direct real-time Firebase Firestore query
  if (firestoreDb) {
    try {
      console.log('🔥 Connecting to live Firestore collection "items"...');
      const snap = await firestoreDb.collection('items').get();
      if (!snap.empty && snap.docs.length > 0) {
        console.log(`🔥 Synchronized ${snap.docs.length} live items directly from Firestore DB!`);
        const remoteItems = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const localOverrides = (items || []).reduce((acc, it) => {
          acc[it.id] = { isFavorite: it.isFavorite, stockQuantity: it.stockQuantity, inStock: it.inStock };
          return acc;
        }, {});
        items = remoteItems.map(remoteItem => {
          const ov = localOverrides[remoteItem.id];
          return ov ? { ...remoteItem, ...ov } : remoteItem;
        });
        saveItems();
        renderCatalog();
        renderInventoryList();
        const badge = document.getElementById('itemCountBadge');
        if (badge) badge.title = `🔥 Firestore Live DB aktiv (${items.length} Einträge)`;
        return;
      }
    } catch (dbErr) {
      console.warn('Firestore live query notice:', dbErr.message);
    }
  }

  // 2. Second attempt: Fetch latest JSON bundle from Firebase Hosting
  try {
    const url = window.location.hostname.includes('gastrodex-823d7') 
      ? './catalog_latest.json' 
      : `${FIREBASE_CONFIG.hostingUrl}/catalog_latest.json`;
    const res = await fetch(url, { cache: 'no-cache' });
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.items) && data.items.length > 0) {
        console.log(`🔥 Synchronized ${data.items.length} items from Firebase Hosting JSON!`);
        const localOverrides = (items || []).reduce((acc, it) => {
          acc[it.id] = { isFavorite: it.isFavorite, stockQuantity: it.stockQuantity, inStock: it.inStock };
          return acc;
        }, {});
        items = data.items.map(remoteItem => {
          const ov = localOverrides[remoteItem.id];
          return ov ? { ...remoteItem, ...ov } : remoteItem;
        });
        saveItems();
        renderCatalog();
        renderInventoryList();
        const badge = document.getElementById('itemCountBadge');
        if (badge) badge.title = `🔥 Firebase Cloud Sync aktiv (${data.items.length} Einträge)`;
      }
    }
  } catch (err) {
    console.log('Firebase Cloud offline or pending deployment, using local offline cache:', err.message);
  }
}

// APP INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  renderLanguageLabels();
  renderCategoryChips();
  renderQuizCategoryButtons();
  renderCatalog();
  renderInventoryList();
  setupEventListeners();
  initQuizSession('all', 10);
  syncWithFirebaseCloud();
});

function toggleLanguage() {
  currentLang = (currentLang === 'de') ? 'en' : 'de';
  localStorage.setItem(STORAGE_KEY_LANG, currentLang);
  renderLanguageLabels();
  renderCategoryChips();
  renderQuizCategoryButtons();
  renderCatalog();
  renderInventoryList();
  if (quizIsRevealed || !quizIsCompleted) {
    renderCurrentQuestion();
  }
  if (selectedItem) {
    showItemDetail(selectedItem.id);
  }
}

function renderLanguageLabels() {
  document.getElementById('langToggleBtn').innerHTML = (currentLang === 'de') ? '🇩🇪 DE' : '🇬🇧 EN';
  
  // Update UI strings based on language
  const isDe = (currentLang === 'de');
  document.getElementById('topBarSubtitle').textContent = isDe ? "Gastronomie & Hotellerie Wissenskompass" : "Hospitality & Gastronomy Encyclopedia";
  document.getElementById('searchInput').placeholder = isDe ? "Suche Spirituosen, Weine, Kaffee, Eier, Käse..." : "Search spirits, wine, coffee, eggs, cheese...";
  
  document.getElementById('tabCatalogLabel').textContent = isDe ? "Lexikon" : "Catalog";
  document.getElementById('tabWineLabel').textContent = isDe ? "Wein-Guide" : "Wine Guide";
  document.getElementById('tabCoffeeLabel').textContent = isDe ? "Kaffee-Labor" : "Coffee Lab";
  document.getElementById('tabScienceLabel').textContent = isDe ? "Wirkungslehre" : "Science";
  document.getElementById('tabQuizLabel').textContent = isDe ? "Quiz-Trainer" : "Staff Quiz";
  document.getElementById('tabInventoryLabel').textContent = isDe ? "Lagerbestand" : "Inventory";
}

// Categories loaded from data_bundle.js
const CATEGORIES_LIST = (typeof CATEGORIES !== "undefined") ? CATEGORIES : [
  { "id": "all", "titleDe": "✨ Alle Einträge", "titleEn": "✨ All Entries", "icon": "restaurant" }
];


function toggleFavoriteFilter() {
  filterOnlyFav = !filterOnlyFav;
  const btn = document.getElementById('filterFavBtn');
  if (btn) btn.classList.toggle('active', filterOnlyFav);
  renderCatalog();
}

function toggleStockFilter() {
  filterOnlyStock = !filterOnlyStock;
  const btn = document.getElementById('filterStockBtn');
  if (btn) btn.classList.toggle('active', filterOnlyStock);
  renderCatalog();
}

function cycleImportFilter() {
  const isDe = (currentLang === 'de');
  const label = document.getElementById('filterImportLabel');
  const btn = document.getElementById('filterImportBtn');
  if (filterImport === null) {
    filterImport = true;
    if (label) label.textContent = isDe ? '✈️ Nur Import' : '✈️ Imported Only';
    if (btn) btn.classList.add('active');
  } else if (filterImport === true) {
    filterImport = false;
    if (label) label.textContent = isDe ? '🌱 Nur Regional' : '🌱 Regional Only';
    if (btn) btn.classList.add('active');
  } else {
    filterImport = null;
    if (label) label.textContent = isDe ? 'Alle Herkünfte' : 'All Origins';
    if (btn) btn.classList.remove('active');
  }
  renderCatalog();
}

function renderQuizCategoryButtons() {
  const container = document.getElementById('quizCategoryButtons');
  if (!container) return;
  container.innerHTML = '';
  CATEGORIES_LIST.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `filter-btn ${quizCategory === cat.id ? 'active' : ''}`;
    btn.textContent = (currentLang === 'de') ? cat.titleDe : cat.titleEn;
    btn.onclick = () => {
      initQuizSession(cat.id, 10);
      renderQuizCategoryButtons();
    };
    container.appendChild(btn);
  });
}

function renderCategoryChips() {
  const container = document.getElementById('categoryScroll');
  container.innerHTML = '';
  CATEGORIES_LIST.forEach(cat => {
    const chip = document.createElement('button');
    chip.className = `chip ${activeCategory === cat.id ? 'active' : ''}`;
    chip.textContent = (currentLang === 'de') ? cat.titleDe : cat.titleEn;
    chip.onclick = () => {
      activeCategory = cat.id;
      renderCategoryChips();
  renderQuizCategoryButtons();
      renderCatalog();
    };
    container.appendChild(chip);
  });
}

function renderCatalog() {
  const grid = document.getElementById('catalogGrid');
  grid.innerHTML = '';

  const filtered = items.filter(item => {
    // category
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;
    // stock filter
    if (filterOnlyStock && !item.inStock) return false;
    // favorite filter
    if (filterOnlyFav && !item.isFavorite) return false;
    // import filter
    if (filterImport !== null && item.isImport !== filterImport) return false;
    // search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const name = (currentLang === 'de' ? item.nameDe : item.nameEn).toLowerCase();
      const subtitle = (currentLang === 'de' ? item.subtitleDe : item.subtitleEn).toLowerCase();
      const tags = (item.tags || []).join(' ').toLowerCase();
      const origin = (item.origin || '').toLowerCase();
      if (!name.includes(q) && !subtitle.includes(q) && !tags.includes(q) && !origin.includes(q)) {
        return false;
      }
    }
    return true;
  });

  document.getElementById('itemCountBadge').textContent = `${filtered.length} ` + (currentLang === 'de' ? 'Einträge' : 'Items');

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.onclick = () => showItemDetail(item.id);

    const title = (currentLang === 'de') ? item.nameDe : item.nameEn;
    const subtitle = (currentLang === 'de') ? item.subtitleDe : item.subtitleEn;
    const catObj = CATEGORIES_LIST.find(c => c.id === item.category);
    const catLabel = catObj ? (currentLang === 'de' ? catObj.titleDe : catObj.titleEn) : item.category;

    let coffeeBarHtml = '';
    if (item.coffeeLayers) {
      coffeeBarHtml = `
        <div class="coffee-mini-bar">
          <div class="coffee-bar-espresso" style="width: ${item.coffeeLayers.espresso}%"></div>
          <div class="coffee-bar-milk" style="width: ${item.coffeeLayers.milk}%"></div>
          <div class="coffee-bar-foam" style="width: ${item.coffeeLayers.foam}%"></div>
        </div>
      `;
    }

    const imgMarkup = item.imageUrl ? 
      `<img class="item-img" src="${item.imageUrl}" alt="${title}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" /><div class="item-placeholder" style="display:none;"><span class="placeholder-icon">${catLabel.split(' ')[0]}</span><span class="placeholder-title">${title}</span></div>` :
      `<div class="item-placeholder"><span class="placeholder-icon">${catLabel.split(' ')[0]}</span><span class="placeholder-title">${title}</span></div>`;

    card.innerHTML = `
      <div class="item-image-wrapper">
        ${imgMarkup}
        <div class="item-badges">
          <span class="badge">${catLabel.split(' ')[0]}</span>
          ${item.isImport ? '<span class="badge">✈️ Import</span>' : '<span class="badge">🌱 Regional</span>'}
        </div>
        <span class="badge-stock ${item.inStock ? 'in-stock' : 'out-stock'}">
          ${item.inStock ? '✓ ' + (currentLang === 'de' ? 'Auf Lager (' + item.stockQuantity + ')' : 'In Stock (' + item.stockQuantity + ')') : (currentLang === 'de' ? 'Nicht vorrätig' : 'Out of Stock')}
        </span>
      </div>
      <div class="item-body">
        <div class="item-title-row">
          <h3 class="item-title">${title}</h3>
          <span class="item-abv">${item.abv || ''}</span>
        </div>
        <p class="item-subtitle">${subtitle}</p>
        ${coffeeBarHtml}
        <div class="item-tags">
          ${(item.tags || []).map(t => `<span class="tag-pill">#${t}</span>`).join('')}
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function showItemDetail(id) {
  const item = items.find(i => i.id === id);
  if (!item) return;
  selectedItem = item;

  const isDe = (currentLang === 'de');
  const modal = document.getElementById('detailModal');
  const title = isDe ? item.nameDe : item.nameEn;
  const subtitle = isDe ? item.subtitleDe : item.subtitleEn;
  const taste = isDe ? item.tasteDe : item.tasteEn;
  const science = isDe ? item.scienceDe : item.scienceEn;
  const culinary = isDe ? item.culinaryDe : item.culinaryEn;
  const faq = isDe ? item.faqDe : item.faqEn;

  const detailImg = document.getElementById('detailImage');
  const detailPh = document.getElementById('detailPlaceholder');
  const catObj = CATEGORIES_LIST.find(c => c.id === item.category);
  const catIcon = catObj ? catObj.titleDe.split(' ')[0] : '🍽️';

  if (item.imageUrl && item.imageUrl.trim() !== '') {
    detailImg.style.display = 'block';
    detailImg.src = item.imageUrl;
    if (detailPh) detailPh.style.display = 'none';
    detailImg.onerror = () => {
      detailImg.style.display = 'none';
      if (detailPh) {
        detailPh.style.display = 'flex';
        detailPh.innerHTML = `<span class="placeholder-icon" style="font-size:3.5rem;">${catIcon}</span><span class="placeholder-title" style="font-size:1.1rem;margin-top:8px;">${title}</span>`;
      }
    };
  } else {
    detailImg.style.display = 'none';
    if (detailPh) {
      detailPh.style.display = 'flex';
      detailPh.innerHTML = `<span class="placeholder-icon" style="font-size:3.5rem;">${catIcon}</span><span class="placeholder-title" style="font-size:1.1rem;margin-top:8px;">${title}</span>`;
    }
  }

  document.getElementById('detailTitle').textContent = title;
  document.getElementById('detailSubtitle').textContent = subtitle;
  document.getElementById('detailOrigin').textContent = item.origin;

  // Category Badge
  const catBadge = document.getElementById('detailCategoryBadge');
  if (catBadge) {
    catBadge.textContent = catObj ? (isDe ? catObj.titleDe : catObj.titleEn) : '';
  }

  // Dynamic ABV: only show for spirits/wine or items with actual ABV percentage
  const abvEl = document.getElementById('detailAbv');
  const isAlcoholCat = item.category === 'spirits' || item.category === 'wine' || (item.abv && item.abv.includes('%'));
  if (abvEl) {
    if (isAlcoholCat) {
      abvEl.style.display = 'inline-block';
      abvEl.textContent = item.abv || '';
    } else {
      abvEl.style.display = 'none';
      abvEl.textContent = '';
    }
  }

  document.getElementById('detailTaste').textContent = taste || '-';
  document.getElementById('detailScience').textContent = science || '-';
  document.getElementById('detailCulinary').textContent = culinary || '-';
  document.getElementById('detailFaq').textContent = faq || '-';

  // Allergens section
  const allergenSec = document.getElementById('detailAllergenSection');
  const allergenTxt = document.getElementById('detailAllergens');
  if (allergenSec && allergenTxt) {
    if (item.allergens && item.allergens.length > 0 && !item.allergens.includes('None')) {
      allergenSec.style.display = 'block';
      allergenTxt.textContent = item.allergens.join(', ');
    } else {
      allergenSec.style.display = 'none';
    }
  }

  // Stock counter in detail modal
  document.getElementById('detailStockCount').textContent = item.stockQuantity;
  document.getElementById('detailLocation').textContent = item.storageLocation || (isDe ? 'Nicht zugewiesen' : 'Not assigned');

  modal.classList.add('active');
}

function closeDetailModal() {
  document.getElementById('detailModal').classList.remove('active');
}

function changeStockInDetail(delta) {
  if (!selectedItem) return;
  selectedItem.stockQuantity = Math.max(0, (selectedItem.stockQuantity || 0) + delta);
  selectedItem.inStock = selectedItem.stockQuantity > 0;
  document.getElementById('detailStockCount').textContent = selectedItem.stockQuantity;
  saveItems();
  renderCatalog();
  renderInventoryList();
}

// INVENTORY MANAGEMENT
function renderInventoryList() {
  const list = document.getElementById('inventoryList');
  if (!list) return;
  list.innerHTML = '';

  items.forEach(item => {
    const isDe = (currentLang === 'de');
    const title = isDe ? item.nameDe : item.nameEn;
    const row = document.createElement('div');
    row.className = 'item-card';
    row.style.marginBottom = '12px';

    row.innerHTML = `
      <div style="display: flex; gap: 12px; padding: 12px; align-items: center;">
        <img src="${item.imageUrl}" style="width: 65px; height: 65px; object-fit: cover; border-radius: 8px;" />
        <div style="flex-grow: 1;">
          <h4 style="font-size: 1rem; font-weight: 700;">${title}</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted);">${item.storageLocation || (isDe ? 'Kein Lagerplatz' : 'No shelf')}</p>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <button class="stepper-btn" onclick="updateStock('${item.id}', -1)">-</button>
          <span style="font-weight: 800; min-width: 25px; text-align: center; color: var(--accent-gold);">${item.stockQuantity}</span>
          <button class="stepper-btn" onclick="updateStock('${item.id}', 1)">+</button>
          <button class="btn-secondary" onclick="openPhotoChanger('${item.id}')" title="${isDe ? 'Foto ändern' : 'Change photo'}">📷</button>
        </div>
      </div>
    `;
    list.appendChild(row);
  });
}

function updateStock(id, delta) {
  const item = items.find(i => i.id === id);
  if (!item) return;
  item.stockQuantity = Math.max(0, (item.stockQuantity || 0) + delta);
  item.inStock = item.stockQuantity > 0;
  saveItems();
  renderInventoryList();
  renderCatalog();
}

function openPhotoChanger(id) {
  const item = items.find(i => i.id === id);
  if (!item) return;
  const isDe = (currentLang === 'de');
  const promptText = isDe ? `Neue Bild-URL für "${item.nameDe}" eingeben:` : `Enter new image URL for "${item.nameEn}":`;
  const newUrl = prompt(promptText, item.imageUrl);
  if (newUrl && newUrl.trim() !== '') {
    item.imageUrl = newUrl.trim();
    saveItems();
    renderInventoryList();
    renderCatalog();
  }
}

// QUIZ SYSTEM (10 QUESTIONS WITH CATEGORY SELECTION)
function initQuizSession(cat = 'all', count = 10) {
  quizCategory = cat;
  quizTargetCount = count;
  quizCurrentIndex = 0;
  quizSelectedOption = null;
  quizIsRevealed = false;
  quizScore = 0;
  quizIsCompleted = false;

  let pool = (typeof MASTER_QUIZ !== "undefined") ? MASTER_QUIZ : [];
  if (cat !== 'all') {
    pool = MASTER_QUIZ.filter(q => q.category === cat);
    if (pool.length === 0) pool = MASTER_QUIZ;
  }

  // Shuffle and sample
  activeQuizQuestions = [...pool].sort(() => 0.5 - Math.random()).slice(0, count);
  renderQuizUI();
}

function renderQuizUI() {
  const isDe = (currentLang === 'de');
  document.getElementById('quizCategoryDisplay').textContent = (quizCategory === 'all') ? 
    (isDe ? "✨ Mix durch alle Kategorien" : "✨ Mix all categories") : 
    (CATEGORIES_LIST.find(c => c.id === quizCategory)?.[isDe ? 'titleDe' : 'titleEn'] || quizCategory);

  if (quizIsCompleted) {
    document.getElementById('quizActiveCard').style.display = 'none';
    document.getElementById('quizCompletedCard').style.display = 'block';

    const percent = Math.round((quizScore / activeQuizQuestions.length) * 100);
    document.getElementById('quizScoreRate').textContent = `${percent}% ` + (isDe ? 'Erfolgsquote' : 'Score rate');
    document.getElementById('quizScoreRate').style.color = (percent >= 75) ? 'var(--success)' : 'var(--danger)';
    document.getElementById('quizScoreDetail').textContent = isDe ? 
      `${quizScore} von ${activeQuizQuestions.length} Fragen richtig beantwortet` : 
      `${quizScore} of ${activeQuizQuestions.length} questions answered correctly`;
  } else {
    document.getElementById('quizActiveCard').style.display = 'block';
    document.getElementById('quizCompletedCard').style.display = 'none';
    renderCurrentQuestion();
  }
}

function renderCurrentQuestion() {
  const currentQ = activeQuizQuestions[quizCurrentIndex];
  if (!currentQ) return;
  const isDe = (currentLang === 'de');

  document.getElementById('quizProgressText').textContent = isDe ? 
    `Frage ${quizCurrentIndex + 1} von ${activeQuizQuestions.length}` : 
    `Question ${quizCurrentIndex + 1} of ${activeQuizQuestions.length}`;
  
  const progressPercent = ((quizCurrentIndex) / activeQuizQuestions.length) * 100;
  document.getElementById('quizProgressFill').style.width = `${progressPercent}%`;

  document.getElementById('quizQuestionText').textContent = isDe ? (currentQ.qDe || currentQ.questionDe) : (currentQ.qEn || currentQ.questionEn);

  const optionsList = document.getElementById('quizOptionsList');
  optionsList.innerHTML = '';

  const opts = isDe ? (currentQ.optDe || currentQ.optionsDe || []) : (currentQ.optEn || currentQ.optionsEn || []);
  opts.forEach((optText, index) => {
    const optDiv = document.createElement('div');
    optDiv.className = 'quiz-option';

    if (quizIsRevealed) {
      const corr = currentQ.correct !== undefined ? currentQ.correct : currentQ.correctIndex;
    if (index === corr) {
        optDiv.classList.add('correct');
      } else if (index === quizSelectedOption) {
        optDiv.classList.add('incorrect');
      }
    } else if (index === quizSelectedOption) {
      optDiv.style.borderColor = 'var(--accent-gold)';
    }

    optDiv.onclick = () => {
      if (!quizIsRevealed) {
        answerQuestion(index);
      }
    };

    const letter = String.fromCharCode(65 + index);
    optDiv.innerHTML = `
      <div class="quiz-opt-letter">${letter}</div>
      <div style="flex-grow: 1;">${optText}</div>
    `;
    optionsList.appendChild(optDiv);
  });

  const expBox = document.getElementById('quizExplanationBox');
  const nextBtn = document.getElementById('quizNextBtn');

  if (quizIsRevealed) {
    expBox.style.display = 'block';
    expBox.innerHTML = `<strong>💡 ${isDe ? 'Erklärung & Gastronomie-Wissen' : 'Explanation & Knowledge'}:</strong><br/>` + 
      (isDe ? currentQ.expDe : currentQ.expEn);
    nextBtn.style.display = 'flex';
    nextBtn.textContent = (quizCurrentIndex + 1 < activeQuizQuestions.length) ? 
      (isDe ? "Nächste Frage ➜" : "Next Question ➜") : 
      (isDe ? "Ergebnis anzeigen" : "View Results");
  } else {
    expBox.style.display = 'none';
    nextBtn.style.display = 'none';
  }
}

function answerQuestion(index) {
  quizSelectedOption = index;
  quizIsRevealed = true;
  const currentQ = activeQuizQuestions[quizCurrentIndex];
  const corr = currentQ.correct !== undefined ? currentQ.correct : currentQ.correctIndex;
  if (index === corr) {
    quizScore++;
  }
  renderCurrentQuestion();
}

function nextQuestion() {
  if (quizCurrentIndex + 1 < activeQuizQuestions.length) {
    quizCurrentIndex++;
    quizSelectedOption = null;
    quizIsRevealed = false;
    renderCurrentQuestion();
  } else {
    quizIsCompleted = true;
    renderQuizUI();
  }
}

function shareQuizScore() {
  const isDe = (currentLang === 'de');
  const name = document.getElementById('quizStaffName').value.trim() || (isDe ? "Service-Mitarbeiter" : "Staff Member");
  const percent = Math.round((quizScore / activeQuizQuestions.length) * 100);
  const text = isDe ? 
    `📋 GastroDex Prüfungsergebnis für den Quizmaster / Barchef:\n` +
    `Mitarbeiter: ${name}\n` +
    `Ergebnis: ${quizScore} von ${activeQuizQuestions.length} richtig (${percent}%)\n` +
    `Kategorie: ${quizCategory}\n` +
    `Status: ${percent >= 75 ? '✅ BESTANDEN' : '⚠️ NACHSCHULUNG EMPFOHLEN'}` :
    `📋 GastroDex Quiz Report for Bar Manager:\n` +
    `Staff: ${name}\n` +
    `Score: ${quizScore} of ${activeQuizQuestions.length} correct (${percent}%)\n` +
    `Category: ${quizCategory}\n` +
    `Status: ${percent >= 75 ? '✅ PASSED' : '⚠️ FURTHER TRAINING NEEDED'}`;

  if (navigator.share) {
    navigator.share({ title: 'GastroDex Report', text });
  } else {
    navigator.clipboard.writeText(text);
    alert(isDe ? "Prüfungsbericht in die Zwischenablage kopiert! Kann jetzt in WhatsApp oder E-Mail eingefügt werden." : "Report copied to clipboard! You can paste it into WhatsApp or Email.");
  }
}

// NAVIGATION SWITCHER
function switchTab(tabId) {
  currentTab = tabId;
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));

  document.getElementById(`tab-${tabId}`).classList.add('active');
  const targetPane = document.getElementById(`pane-${tabId}`);
  if (targetPane) targetPane.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupEventListeners() {
  document.getElementById('searchInput').addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderCatalog();
  });
}
