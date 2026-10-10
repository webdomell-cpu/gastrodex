
function scrollCategories(offset) {
  const scrollEl = document.getElementById('categoryScroll');
  if (scrollEl) {
    scrollEl.scrollBy({ left: offset, behavior: 'smooth' });
  }
}


function toggleItemFavorite(id) {
  const it = items.find(i => i.id === id);
  if (!it) return;
  it.isFavorite = !it.isFavorite;
  saveItems();
  renderCatalog();
}


// COFFEE LAB INTERACTIVE GLASS COMPARISON
const COFFEE_DRINKS_DEF = {
  'coffee_cappuccino': {
    nameDe: 'Cappuccino',
    nameEn: 'Cappuccino',
    layers: [
      { nameDe: 'Milchschaum (cremig)', nameEn: 'Microfoam', pct: 34, type: 'foam' },
      { nameDe: 'Warme Milch', nameEn: 'Steamed Milk', pct: 33, type: 'milk' },
      { nameDe: 'Espresso (Single)', nameEn: 'Espresso (Single)', pct: 33, type: 'espresso' }
    ],
    summaryDe: 'Klassische Drittel-Regel: 1/3 Espresso, 1/3 heiße Milch, 1/3 feinporiger Milchschaum in einer bauchigen Tasse (~180ml). Harmonisch, samtig und ausgewogen.',
    summaryEn: 'Classic rule of thirds: 1/3 espresso, 1/3 steamed milk, 1/3 dense microfoam in a rounded cup (~180ml). Balanced, velvet texture.'
  },
  'coffee_latte_macchiato': {
    nameDe: 'Latte Macchiato',
    nameEn: 'Latte Macchiato',
    layers: [
      { nameDe: 'Fester Milchschaum', nameEn: 'Milk Foam Cap', pct: 25, type: 'foam' },
      { nameDe: 'Espresso (mittig)', nameEn: 'Espresso Layer', pct: 20, type: 'espresso' },
      { nameDe: 'Heiße Milch (Basis)', nameEn: 'Steamed Milk Base', pct: 55, type: 'milk' }
    ],
    summaryDe: 'Dreischichtige Optik im hohen Glas (~300ml): Durch Temperatur- und Dichteunterschiede schwimmt der Espresso stabil zwischen der heißen Milch und dem festen Schaum.',
    summaryEn: 'Three-layer glass presentation (~300ml): Due to temperature and density differences, espresso floats stably between hot milk and thick milk foam.'
  },
  'coffee_espresso': {
    nameDe: 'Espresso',
    nameEn: 'Espresso',
    layers: [
      { nameDe: 'Haselnussbraune Crema', nameEn: 'Hazelnut Crema', pct: 20, type: 'foam' },
      { nameDe: 'Extrakt (9 bar, 25-30ml)', nameEn: 'Pure Extraction', pct: 80, type: 'espresso' }
    ],
    summaryDe: 'Die Essenz aller Kaffeespezialitäten: 25-30 ml reinster Kaffeekonzentrat unter 9 bar Druck in 25 Sekunden extrahiert. Gekrönt von einer elastischen Crema.',
    summaryEn: 'The core base of all drinks: 25-30 ml pure extraction brewed at 9 bar pressure in 25 seconds. Crowned by a dense, elastic crema.'
  },
  'coffee_flat_white': {
    nameDe: 'Flat White',
    nameEn: 'Flat White',
    layers: [
      { nameDe: 'Flacher Mikroschaum', nameEn: 'Flat Microfoam', pct: 15, type: 'foam' },
      { nameDe: 'Seidige Milch', nameEn: 'Silky Milk', pct: 45, type: 'milk' },
      { nameDe: 'Doppelter Ristretto / Espresso', nameEn: 'Double Espresso', pct: 40, type: 'espresso' }
    ],
    summaryDe: 'Australischer Liebling: Doppelter Ristretto mit samtigem, flachem Mikroschaum durchzogen. Intensiverer Kaffeegeschmack als beim Cappuccino.',
    summaryEn: 'Australasian specialty: Double espresso seamlessly folded with glossy microfoam. Higher coffee strength than a traditional cappuccino.'
  },
  'coffee_caffe_latte': {
    nameDe: 'Caffè Latte',
    nameEn: 'Caffè Latte',
    layers: [
      { nameDe: 'Hauchdünner Schaum', nameEn: 'Thin Foam Layer', pct: 10, type: 'foam' },
      { nameDe: 'Viel warme Milch', nameEn: 'Warm Steamed Milk', pct: 70, type: 'milk' },
      { nameDe: 'Espresso', nameEn: 'Espresso Shot', pct: 20, type: 'espresso' }
    ],
    summaryDe: 'Der sanfte Milchkaffee: Hoher Milchanteil (~200ml) gemischt mit einem Espresso, serviert in einer großen Tasse oder Schale.',
    summaryEn: 'Mild and comforting milk coffee: High milk ratio blended with single/double espresso, served in a large cup.'
  },
  'coffee_americano': {
    nameDe: 'Americano',
    nameEn: 'Americano',
    layers: [
      { nameDe: 'Leichte Crema-Reste', nameEn: 'Light Crema', pct: 10, type: 'foam' },
      { nameDe: 'Heißes Wasser', nameEn: 'Hot Water', pct: 60, type: 'water' },
      { nameDe: 'Espresso', nameEn: 'Espresso Base', pct: 30, type: 'espresso' }
    ],
    summaryDe: 'Verlängerter Espresso: Ein Espresso wird mit heißem Wasser gestreckt, wodurch die Bitterstoffe mild bleiben, aber das Aroma erhalten bleibt.',
    summaryEn: 'Diluted espresso: Hot water added to espresso, matching the strength of drip coffee while keeping espresso nuance.'
  }
};

function renderGlassLayers(cupElId, legendElId, drinkKey) {
  const cup = document.getElementById(cupElId);
  const legend = document.getElementById(legendElId);
  if (!cup || !legend) return;
  const drink = COFFEE_DRINKS_DEF[drinkKey] || COFFEE_DRINKS_DEF['coffee_cappuccino'];
  const isDe = (currentLang === 'de');

  cup.innerHTML = '';
  legend.innerHTML = '';

  drink.layers.forEach(layer => {
    const lDiv = document.createElement('div');
    lDiv.className = `coffee-layer layer-${layer.type}`;
    lDiv.style.height = `${layer.pct}%`;
    const label = isDe ? layer.nameDe : layer.nameEn;
    lDiv.textContent = `${layer.pct}% ${label.split(' ')[0]}`;
    lDiv.title = `${layer.pct}% ${label}`;
    cup.appendChild(lDiv);
  });

  legend.innerHTML = drink.layers.map(l => {
    const name = isDe ? l.nameDe : l.nameEn;
    return `<div>• <strong>${l.pct}%</strong> ${name}</div>`;
  }).join('');
}

function updateCoffeeComparison() {
  const leftKey = document.getElementById('coffeeSelectLeft')?.value || 'coffee_cappuccino';
  const rightKey = document.getElementById('coffeeSelectRight')?.value || 'coffee_latte_macchiato';
  const isDe = (currentLang === 'de');

  const leftDef = COFFEE_DRINKS_DEF[leftKey];
  const rightDef = COFFEE_DRINKS_DEF[rightKey];

  if (document.getElementById('coffeeNameLeft')) {
    document.getElementById('coffeeNameLeft').textContent = isDe ? leftDef.nameDe : leftDef.nameEn;
  }
  if (document.getElementById('coffeeNameRight')) {
    document.getElementById('coffeeNameRight').textContent = isDe ? rightDef.nameDe : rightDef.nameEn;
  }

  renderGlassLayers('coffeeCupLeft', 'coffeeLegendLeft', leftKey);
  renderGlassLayers('coffeeCupRight', 'coffeeLegendRight', rightKey);

  const summary = document.getElementById('coffeeComparisonSummary');
  if (summary) {
    summary.innerHTML = `
      <p style="margin-bottom: 8px;"><strong>${isDe ? leftDef.nameDe : leftDef.nameEn}:</strong> ${isDe ? leftDef.summaryDe : leftDef.summaryEn}</p>
      <p><strong>${isDe ? rightDef.nameDe : rightDef.nameEn}:</strong> ${isDe ? rightDef.summaryDe : rightDef.summaryEn}</p>
    `;
  }
}

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


let currentLang = localStorage.getItem(STORAGE_KEY_LANG) || 'en';
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
  const masterList = (typeof MASTER_ITEMS !== "undefined") ? MASTER_ITEMS : FALLBACK_ITEMS;
  const saved = localStorage.getItem(STORAGE_KEY_ITEMS);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const masterIds = new Set(masterList.map(m => m.id));
        const overrideMap = {};
        const customOrAdded = [];
        parsed.forEach(it => {
          if (it && it.id) {
            if (masterIds.has(it.id)) {
              overrideMap[it.id] = it;
            } else {
              customOrAdded.push(it);
            }
          }
        });
        const mergedMaster = masterList.map(m => {
          const ov = overrideMap[m.id];
          return ov ? { ...m, ...ov } : { ...m };
        });
        return [...customOrAdded, ...mergedMaster];
      }
    } catch(e) {
      console.error('Error loading stored items:', e);
    }
  }
  return masterList.map(m => ({ ...m }));
}

let items = loadItems();

// --- ROBUST INDEXEDDB STORAGE WITH DEXIE.JS ---
let db = null;
if (typeof Dexie !== 'undefined') {
  try {
    db = new Dexie('GastroDexIndexedDB');
    db.version(1).stores({
      items: 'id, category, isFavorite',
      settings: 'key'
    });
  } catch (e) {
    console.warn('Dexie setup notice:', e);
  }
}

async function initDexieStorage() {
  if (!db) return;
  try {
    await db.open();
    const count = await db.items.count();
    const masterList = (typeof MASTER_ITEMS !== "undefined") ? MASTER_ITEMS : FALLBACK_ITEMS;
    if (count === 0) {
      const initial = loadItems();
      await db.items.bulkPut(initial);
      console.log(`📦 Dexie.js IndexedDB initialized & seeded with ${initial.length} items.`);
    } else {
      const stored = await db.items.toArray();
      if (stored && stored.length > 0) {
        const masterIds = new Set(masterList.map(m => m.id));
        const overrideMap = {};
        const customOrAdded = [];
        stored.forEach(it => {
          if (it && it.id) {
            if (masterIds.has(it.id)) {
              overrideMap[it.id] = it;
            } else {
              customOrAdded.push(it);
            }
          }
        });
        const mergedMaster = masterList.map(m => {
          const ov = overrideMap[m.id];
          return ov ? { ...m, ...ov } : { ...m };
        });
        items = [...customOrAdded, ...mergedMaster];
        saveItems(); // Sync to localStorage
        renderCatalog();
        console.log(`📦 Loaded ${items.length} items from IndexedDB (Dexie.js). Favorites & stock quantities fully restored across reloads.`);
      }
    }
  } catch (err) {
    console.warn('Dexie initialization error:', err);
  }
}

function saveItems() {
  localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));
  if (db) {
    db.items.bulkPut(items).catch(err => console.warn('Dexie save error:', err));
  }
}

// FIREBASE CLOUD FIRESTORE SYNCHRONIZATION
const FIREBASE_CONFIG = {
  projectId: 'gastrodex-823d7',
  hostingUrl: 'https://gastrodex-823d7.web.app',
  firestoreRestEndpoint: 'https://firestore.googleapis.com/v1/projects/gastrodex-823d7/databases/(default)/documents'
};

function setupFirebaseRealtimeListener() {
  if (!firestoreDb) return;
  try {
    firestoreDb.collection('items').onSnapshot(snapshot => {
      if (!snapshot.empty) {
        const cloudItems = [];
        snapshot.forEach(doc => {
          const d = doc.data();
          if (d && !d.isDeleted) {
            cloudItems.push({ id: doc.id, ...d });
          }
        });
        if (cloudItems.length > 0) {
          console.log(`🔥 Realtime sync: received ${cloudItems.length} items from Firestore!`);
          const masterList = (typeof MASTER_ITEMS !== "undefined") ? MASTER_ITEMS : FALLBACK_ITEMS;
          const cloudMap = {};
          cloudItems.forEach(it => { cloudMap[it.id] = it; });

          const mergedMaster = masterList.map(m => cloudMap[m.id] ? { ...m, ...cloudMap[m.id] } : { ...m });
          const newFromCloud = cloudItems.filter(it => !masterList.some(m => m.id === it.id));
          items = [...newFromCloud, ...mergedMaster];
          saveItems();
          renderCatalog();
          const badge = document.getElementById('itemCountBadge');
          if (badge) badge.title = `🔥 Firestore Live DB aktiv (${items.length} Einträge)`;
        }
      }
    }, err => console.warn('Firestore snapshot error:', err));
  } catch (e) {
    console.warn('Realtime listener notice:', e);
  }
}

async function syncWithFirebaseCloud() {
  // 1. Direct real-time Firebase Firestore query
  if (firestoreDb) {
    try {
      console.log('🔥 Connecting to live Firestore collection "items"...');
      const snap = await firestoreDb.collection('items').get();
      if (!snap.empty && snap.docs.length > 0) {
        const cloudItems = snap.docs.map(doc => ({ id: doc.id, ...doc.data() })).filter(d => !d.isDeleted);
        console.log(`🔥 Synchronized ${cloudItems.length} live items directly from Firestore DB!`);
        const masterList = (typeof MASTER_ITEMS !== "undefined") ? MASTER_ITEMS : FALLBACK_ITEMS;
        const cloudMap = {};
        cloudItems.forEach(it => { cloudMap[it.id] = it; });

        const mergedMaster = masterList.map(m => cloudMap[m.id] ? { ...m, ...cloudMap[m.id] } : { ...m });
        const newFromCloud = cloudItems.filter(it => !masterList.some(m => m.id === it.id));
        items = [...newFromCloud, ...mergedMaster];
        saveItems();
        renderCatalog();
        const badge = document.getElementById('itemCountBadge');
        if (badge) badge.title = `🔥 Firestore Live DB aktiv (${items.length} Einträge)`;
        return;
      }
    } catch (dbErr) {
      console.warn('Firestore live query notice:', dbErr.message);
    }
  }

  // 2. Fetch latest catalog JSON bundle
  try {
    let res = null;
    try {
      res = await fetch('./catalog_latest.json', { cache: 'no-cache' });
    } catch (_) {}
    if (!res || !res.ok) {
      try {
        res = await fetch(`${FIREBASE_CONFIG.hostingUrl}/catalog_latest.json`, { cache: 'no-cache' });
      } catch (_) {}
    }
    if (res && res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.items) && data.items.length > 0) {
        console.log(`🔥 Synchronized ${data.items.length} items from catalog JSON!`);
        const masterList = (typeof MASTER_ITEMS !== "undefined") ? MASTER_ITEMS : FALLBACK_ITEMS;
        const cloudMap = {};
        data.items.forEach(it => { if (it && it.id) cloudMap[it.id] = it; });

        const mergedMaster = masterList.map(m => cloudMap[m.id] ? { ...m, ...cloudMap[m.id] } : { ...m });
        const newFromCloud = data.items.filter(it => !masterList.some(m => m.id === it.id));
        items = [...newFromCloud, ...mergedMaster];
        saveItems();
        renderCatalog();
        const badge = document.getElementById('itemCountBadge');
        if (badge) badge.title = `🔥 Katalog Sync aktiv (${items.length} Einträge)`;
      }
    }
  } catch (err) {
    console.log('Firebase Cloud offline or pending deployment, using local offline cache:', err.message);
  }
}

// APP INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('catalogGrid')) {
    return;
  }
  initDexieStorage();
  renderLanguageLabels();
  renderCategoryChips();
  renderQuizCategoryButtons();
  renderCatalog();
  setupEventListeners();
  initQuizSession('all', 10);
  updateCoffeeComparison();
  syncWithFirebaseCloud();
  setupFirebaseRealtimeListener();
});

function toggleLanguage() {
  currentLang = (currentLang === 'de') ? 'en' : 'de';
  localStorage.setItem(STORAGE_KEY_LANG, currentLang);
  renderLanguageLabels();
  renderCategoryChips();
  renderQuizCategoryButtons();
  renderCatalog();
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
    const iconSpan = cat.icon ? `<span class="material-symbols-outlined" style="font-size:16px; vertical-align:middle; margin-right:4px;">${cat.icon}</span>` : '';
    btn.innerHTML = `${iconSpan}${(currentLang === 'de') ? cat.titleDe : cat.titleEn}`;
    btn.onclick = () => {
      initQuizSession(cat.id, 10);
      renderQuizCategoryButtons();
    };
    container.appendChild(btn);
  });
}

function renderCategoryChips() {
  const container = document.getElementById('categoryScroll');
  if (!container) return;
  container.innerHTML = '';
  CATEGORIES_LIST.forEach(cat => {
    const chip = document.createElement('button');
    chip.className = `chip ${activeCategory === cat.id ? 'active' : ''}`;
    const iconSpan = cat.icon ? `<span class="chip-icon material-symbols-outlined">${cat.icon}</span>` : '';
    const label = (currentLang === 'de') ? cat.titleDe : cat.titleEn;
    chip.innerHTML = `${iconSpan}<span>${label}</span>`;
    chip.onclick = () => {
      activeCategory = cat.id;
      renderCategoryChips();
      renderCategoryGrid();
      renderQuizCategoryButtons();
      renderCatalog();
    };
    container.appendChild(chip);
  });
}

function openCategoryGridModal() {
  renderCategoryGrid();
  const modal = document.getElementById('categoryGridModal');
  if (modal) modal.classList.add('active');
}

function closeCategoryGridModal(e) {
  if (e && e.target && e.target.id !== 'categoryGridModal' && !e.target.classList.contains('modal-close-btn') && !e.target.classList.contains('btn-primary')) {
    return;
  }
  const modal = document.getElementById('categoryGridModal');
  if (modal) modal.classList.remove('active');
}

function renderCategoryGrid() {
  const container = document.getElementById('categoryGridContainer');
  if (!container) return;
  container.innerHTML = '';

  CATEGORIES_LIST.forEach(cat => {
    const isSelected = activeCategory === cat.id;
    const item = document.createElement('div');
    item.style.padding = '10px 8px';
    item.style.borderRadius = '10px';
    item.style.border = isSelected ? '2px solid var(--accent-gold)' : '1px solid var(--border-subtle)';
    item.style.background = isSelected ? 'var(--accent-gold-container)' : 'var(--bg-surface)';
    item.style.cursor = 'pointer';
    item.style.textAlign = 'center';
    item.style.transition = 'all 0.15s ease';
    item.style.display = 'flex';
    item.style.flexDirection = 'column';
    item.style.alignItems = 'center';
    item.style.gap = '4px';

    const count = cat.id === 'all' 
      ? items.length 
      : items.filter(it => it.category === cat.id).length;

    const label = (currentLang === 'de') ? cat.titleDe : cat.titleEn;
    const iconHtml = cat.icon ? `<span class="material-symbols-outlined" style="font-size: 24px; color: ${isSelected ? 'var(--accent-gold)' : 'var(--text-secondary)'};">${cat.icon}</span>` : '';

    item.innerHTML = `
      ${iconHtml}
      <div style="font-size: 0.84rem; font-weight: ${isSelected ? '800' : '600'}; color: ${isSelected ? 'var(--text-primary)' : 'var(--text-primary)'}; line-height: 1.2;">${label}</div>
      <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 1px;">${count} Einträge</div>
    `;

    item.onclick = () => {
      activeCategory = cat.id;
      renderCategoryChips();
      renderCategoryGrid();
      renderQuizCategoryButtons();
      renderCatalog();
      closeCategoryGridModal();
    };

    container.appendChild(item);
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

    const catIconName = catObj ? (catObj.icon || 'restaurant') : 'restaurant';
    const catDisplayName = catObj ? (currentLang === 'de' ? catObj.titleDe : catObj.titleEn) : item.category;

    const imgMarkup = item.imageUrl ? 
      `<img class="item-img" src="${item.imageUrl}" alt="${title}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" /><div class="item-placeholder" style="display:none;"><span class="material-symbols-outlined placeholder-icon">${catIconName}</span><span class="placeholder-title">${title}</span></div>` :
      `<div class="item-placeholder"><span class="material-symbols-outlined placeholder-icon">${catIconName}</span><span class="placeholder-title">${title}</span></div>`;

    card.innerHTML = `
      <div class="item-image-wrapper">
        ${imgMarkup}
        <div class="item-badges">
          <span class="badge" style="display:flex;align-items:center;gap:3px;"><span class="material-symbols-outlined" style="font-size:13px;">${catIconName}</span>${catDisplayName}</span>
          ${item.isImport ? '<span class="badge" style="display:flex;align-items:center;gap:3px;"><span class="material-symbols-outlined" style="font-size:13px;">flight</span>Import</span>' : '<span class="badge" style="display:flex;align-items:center;gap:3px;"><span class="material-symbols-outlined" style="font-size:13px;">eco</span>Regional</span>'}
        </div>
        <button class="card-fav-btn ${item.isFavorite ? 'active' : ''}" onclick="event.stopPropagation(); toggleItemFavorite('${item.id}');" title="Favorit">
          ${item.isFavorite ? '❤️' : '🤍'}
        </button>
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
  if (!modal) return;

  const title = isDe ? (item.nameDe || item.nameEn) : (item.nameEn || item.nameDe);
  const subtitle = isDe ? (item.subtitleDe || item.subtitleEn) : (item.subtitleEn || item.subtitleDe);
  const taste = isDe ? (item.tasteProfileDe || item.tasteDe || item.tasteProfileEn || item.tasteEn) : (item.tasteProfileEn || item.tasteEn || item.tasteProfileDe || item.tasteDe);
  const science = isDe ? (item.scienceExplainedDe || item.scienceDe || item.scienceExplainedEn || item.scienceEn) : (item.scienceExplainedEn || item.scienceEn || item.scienceExplainedDe || item.scienceDe);
  const culinary = isDe ? (item.culinaryServingDe || item.culinaryDe || item.culinaryServingEn || item.culinaryEn) : (item.culinaryServingEn || item.culinaryEn || item.culinaryServingDe || item.culinaryDe);
  const faq = isDe ? (item.guestFaqDe || item.faqDe || item.guestFaqEn || item.faqEn) : (item.guestFaqEn || item.faqEn || item.guestFaqDe || item.faqDe);
  const raw = isDe ? (item.rawMaterialDe || item.rawMaterialEn) : (item.rawMaterialEn || item.rawMaterialDe);

  const detailImg = document.getElementById('detailImage');
  const detailPh = document.getElementById('detailPlaceholder');
  const catObj = CATEGORIES_LIST.find(c => c.id === item.category);
  const catIconName = catObj ? (catObj.icon || 'restaurant') : 'restaurant';

  if (detailImg) {
    if (item.imageUrl && item.imageUrl.trim() !== '') {
      detailImg.style.display = 'block';
      detailImg.src = item.imageUrl;
      if (detailPh) detailPh.style.display = 'none';
      detailImg.onerror = () => {
        detailImg.style.display = 'none';
        if (detailPh) {
          detailPh.style.display = 'flex';
          detailPh.innerHTML = `<span class="material-symbols-outlined placeholder-icon" style="font-size:3.5rem; color: var(--accent-gold);">${catIconName}</span><span class="placeholder-title" style="font-size:1.1rem;margin-top:8px;">${title}</span>`;
        }
      };
    } else {
      detailImg.style.display = 'none';
      if (detailPh) {
        detailPh.style.display = 'flex';
        detailPh.innerHTML = `<span class="material-symbols-outlined placeholder-icon" style="font-size:3.5rem; color: var(--accent-gold);">${catIconName}</span><span class="placeholder-title" style="font-size:1.1rem;margin-top:8px;">${title}</span>`;
      }
    }
  }

  // Header Title & Subtitle
  const tEl = document.getElementById('detailTitle');
  if (tEl) tEl.textContent = title;
  const sEl = document.getElementById('detailSubtitle');
  if (sEl) sEl.textContent = subtitle || '';

  // Origin & Badges
  const oEl = document.getElementById('detailOrigin');
  if (oEl) oEl.textContent = item.origin || (isDe ? 'International' : 'International');

  const catBadge = document.getElementById('detailCategoryBadge');
  if (catBadge) {
    catBadge.innerHTML = `<span class="material-symbols-outlined" style="font-size:13px;vertical-align:middle;margin-right:3px;">${catIconName}</span>` + (catObj ? (isDe ? catObj.titleDe : catObj.titleEn) : (item.category || '').toUpperCase());
  }

  const impBadge = document.getElementById('detailImportBadge');
  if (impBadge) {
    impBadge.innerHTML = item.isImport 
      ? `<span class="material-symbols-outlined" style="font-size:13px;vertical-align:middle;margin-right:3px;">flight</span>${isDe ? 'IMPORTPRODUKT' : 'IMPORTED'}` 
      : `<span class="material-symbols-outlined" style="font-size:13px;vertical-align:middle;margin-right:3px;">eco</span>${isDe ? 'REGIONAL / HEIMISCH' : 'REGIONAL'}`;
    impBadge.style.color = item.isImport ? '#FFD166' : '#88D49E';
  }

  // Dynamic Process & Kennwert
  let proc = item.alcoholProcess;
  if (!proc || proc === 'NONE') {
    if (item.category === 'spirits') proc = 'DISTILLATION';
    else if (item.category === 'wine') proc = 'FERMENTATION';
    else proc = 'NONE';
  }
  const procMap = {
    'DISTILLATION': isDe ? '🥃 Destillation' : '🥃 Distillation',
    'FERMENTATION': isDe ? '🍷 Fermentation' : '🍷 Fermentation',
    'BREWING': isDe ? '🍺 Brauen & Maischen' : '🍺 Brewing',
    'FORTIFIED': isDe ? '🍷 Aufgespritet' : '🍷 Fortified',
    'NONE': isDe ? '🌱 Alkoholfrei' : '🌱 Non-Alcoholic'
  };
  const procEl = document.getElementById('detailProcess');
  if (procEl) procEl.textContent = procMap[proc] || proc;

  const kwEl = document.getElementById('detailKennwert');
  if (kwEl) kwEl.textContent = item.abv || (item.isImport ? (isDe ? 'International' : 'Import') : (isDe ? 'Regional' : 'Native'));

  // Dynamic ABV top badge
  const abvEl = document.getElementById('detailAbv');
  const isAlcoholCat = item.category === 'spirits' || item.category === 'wine' || (item.abv && item.abv.includes('%'));
  if (abvEl) {
    if (isAlcoholCat && item.abv) {
      abvEl.style.display = 'inline-block';
      abvEl.textContent = item.abv;
    } else {
      abvEl.style.display = 'none';
      abvEl.textContent = '';
    }
  }

  // Content sections
  const faqEl = document.getElementById('detailFaq');
  if (faqEl) faqEl.textContent = faq || (isDe ? 'Unsere exklusive Hausspezialität, sorgfältig ausgewählt für erstklassigen Genuss.' : 'Curated house specialty selected for premium enjoyment.');

  const sciEl = document.getElementById('detailScience');
  if (sciEl) sciEl.textContent = science || (isDe ? 'Zubereitung nach traditionellen gastronomischen Handwerksstandards.' : 'Prepared according to traditional gastronomy standards.');

  const rawEl = document.getElementById('detailRawMaterial');
  if (rawEl) rawEl.textContent = raw || (isDe ? 'Ausgewählte Gastronomie-Zutaten' : 'Curated ingredients');

  const tasteEl = document.getElementById('detailTaste');
  if (tasteEl) tasteEl.textContent = taste || (isDe ? 'Ausgewogenes, sortentypisches Aromenspiel.' : 'Balanced varietal flavor profile.');

  const culEl = document.getElementById('detailCulinary');
  if (culEl) culEl.textContent = culinary || (isDe ? 'Im passenden Glas bei optimaler Serviertemperatur anreichen.' : 'Serve in appropriate glassware at optimal temperature.');

  // Allergens section
  const allergenSec = document.getElementById('detailAllergenSection');
  const allergenTxt = document.getElementById('detailAllergens');
  if (allergenSec && allergenTxt) {
    const allgList = Array.isArray(item.allergens) ? item.allergens : (item.allergens ? [item.allergens] : []);
    const filteredAllg = allgList.filter(a => a && a !== 'None' && a !== 'Keine' && a !== 'None declared');
    if (filteredAllg.length > 0) {
      allergenSec.style.display = 'block';
      allergenTxt.textContent = filteredAllg.join(', ');
    } else {
      allergenSec.style.display = 'none';
    }
  }

  // Tags
  const tagsContainer = document.getElementById('detailTagsContainer');
  if (tagsContainer) {
    const tagList = Array.isArray(item.tags) ? item.tags : [];
    if (tagList.length > 0) {
      tagsContainer.style.display = 'flex';
      tagsContainer.innerHTML = tagList.map(t => `<span class="tag-pill" style="font-size: 0.75rem; padding: 4px 8px;">#${t}</span>`).join('');
    } else {
      tagsContainer.style.display = 'none';
    }
  }

  // Stock counter in detail modal
  const stockCountEl = document.getElementById('detailStockCount');
  if (stockCountEl) stockCountEl.textContent = item.stockQuantity != null ? item.stockQuantity : 0;
  
  const locEl = document.getElementById('detailLocation');
  if (locEl) locEl.textContent = item.storageLocation || (isDe ? 'Zentrallager' : 'Main storage');

  // Favorite & Share buttons
  const favBtn = document.getElementById('detailFavBtn');
  if (favBtn) favBtn.textContent = item.isFavorite ? '❤️' : '🤍';

  modal.classList.add('active');
}

function closeDetailModal() {
  const modal = document.getElementById('detailModal');
  if (modal) modal.classList.remove('active');
}

function shareCurrentItem() {
  if (!selectedItem) return;
  const isDe = (currentLang === 'de');
  const name = isDe ? (selectedItem.nameDe || selectedItem.nameEn) : (selectedItem.nameEn || selectedItem.nameDe);
  const sub = isDe ? (selectedItem.subtitleDe || '') : (selectedItem.subtitleEn || '');
  const shareText = `${name} - ${sub}\nMehr erfahren im GastroDex Gastronomie-Lexikon!`;
  
  if (navigator.share) {
    navigator.share({
      title: `GastroDex: ${name}`,
      text: shareText,
      url: window.location.href
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
    alert(isDe ? 'Link & Beschreibung in Zwischenablage kopiert!' : 'Link copied to clipboard!');
  }
}

function toggleCurrentItemFavorite() {
  if (!selectedItem) return;
  selectedItem.isFavorite = !selectedItem.isFavorite;
  const favBtn = document.getElementById('detailFavBtn');
  if (favBtn) favBtn.textContent = selectedItem.isFavorite ? '❤️' : '🤍';
  saveItems();
  renderCatalog();
}

function changeStockInDetail(delta) {
  if (!selectedItem) return;
  selectedItem.stockQuantity = Math.max(0, (selectedItem.stockQuantity || 0) + delta);
  selectedItem.inStock = selectedItem.stockQuantity > 0;
  const countEl = document.getElementById('detailStockCount');
  if (countEl) countEl.textContent = selectedItem.stockQuantity;
  saveItems();
  renderCatalog();
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

// ==========================================
// PWA AUTOMATIC INSTALL PROMPT / HOMESCREEN
// ==========================================
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent immediate default mini-infobar on mobile Chrome
  e.preventDefault();
  deferredPrompt = e;
  // Automatically show the install prompt banner/dialog to the user
  showPwaInstallPrompt();
});

window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
  const banner = document.getElementById('pwaInstallBanner');
  if (banner) banner.style.display = 'none';
  console.log('GastroDex was successfully installed on the device.');
});

function showPwaInstallPrompt() {
  // Don't show if already dismissed in this session
  if (sessionStorage.getItem('pwa_prompt_dismissed') === 'true') {
    return;
  }
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if (isStandalone) {
    return; // Already running as installed PWA app
  }

  const isDe = (currentLang === 'de');
  const banner = document.getElementById('pwaInstallBanner');
  if (banner) {
    const titleEl = document.getElementById('pwaInstallTitle');
    const subEl = document.getElementById('pwaInstallSub');
    if (titleEl) titleEl.textContent = isDe ? 'GastroDex auf dem Gerät installieren?' : 'Install GastroDex on your device?';
    if (subEl) subEl.textContent = isDe 
      ? 'Als App auf dem Startbildschirm speichern für schnellen Offline-Zugriff.' 
      : 'Add to homescreen for instant offline hospitality reference.';
    banner.style.display = 'flex';
  }
}

function triggerPwaInstall() {
  if (deferredPrompt) {
    // Native browser prompt on Android / Chromium / Desktop
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted PWA installation');
      } else {
        console.log('User dismissed PWA installation');
      }
      deferredPrompt = null;
      dismissInstallPrompt();
    });
  } else {
    // iOS Safari or browser without beforeinstallprompt support: show step-by-step instructions
    const iosModal = document.getElementById('iosInstallModal');
    if (iosModal) {
      iosModal.classList.add('active');
    }
  }
}

function dismissInstallPrompt() {
  const banner = document.getElementById('pwaInstallBanner');
  if (banner) banner.style.display = 'none';
  sessionStorage.setItem('pwa_prompt_dismissed', 'true');
}

function closeIosInstallModal(e) {
  if (e && e.target && e.target.id !== 'iosInstallModal' && !e.target.classList.contains('btn-primary')) {
    return;
  }
  const modal = document.getElementById('iosInstallModal');
  if (modal) modal.classList.remove('active');
  dismissInstallPrompt();
}

// Proactive check on page load: if not triggered via event after 1.8s (e.g. iOS or manual browser), check if mobile
setTimeout(() => {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if (!isStandalone && sessionStorage.getItem('pwa_prompt_dismissed') !== 'true') {
    const banner = document.getElementById('pwaInstallBanner');
    if (banner && banner.style.display === 'none') {
      showPwaInstallPrompt();
    }
  }
}, 1800);
