
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
let currentTab = 'home';
let activeCategory = 'all';
let searchQuery = '';
let filterOnlyStock = false;
let filterOnlyFav = false;
let filterImport = null; // null, true, false
let currentSortOrder = 'default';
let selectedItem = null;

function changeSortOrder(val) {
  currentSortOrder = val || 'default';
  renderCatalog();
}

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
      return MASTER_ITEMS.map(m => {
        const ov = overrideMap[m.id];
        return ov ? { ...m, ...ov } : { ...m };
      });
    } catch(e) {
      console.error(e);
    }
  }
  return MASTER_ITEMS.map(m => ({ ...m }));
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
  renderKnowledgeGuides();
  renderCategoryChips();
  renderQuizCategoryButtons();
  renderHomeCategoryLauncher();
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
  renderKnowledgeGuides();
  renderCategoryChips();
  renderQuizCategoryButtons();
  renderHomeCategoryLauncher();
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
  
  const homeWelcomeTitle = document.getElementById('homeWelcomeTitle');
  if (homeWelcomeTitle) homeWelcomeTitle.textContent = isDe ? "Willkommen bei GastroDex" : "Welcome to GastroDex";
  const homeWelcomeSub = document.getElementById('homeWelcomeSub');
  if (homeWelcomeSub) homeWelcomeSub.textContent = isDe ? 
    "Dein professioneller Wissenskompass für Bar, Gastronomie, Weinkunde, Kaffee-Labor und Team-Schulungen." : 
    "Your professional knowledge base for gastronomy, spirits, wine, coffee science, and interactive staff training.";

  const tabHomeLabel = document.getElementById('tabHomeLabel');
  if (tabHomeLabel) tabHomeLabel.textContent = isDe ? "Startseite" : "Home";
  document.getElementById('tabCatalogLabel').textContent = isDe ? "Lexikon" : "Catalog";
  document.getElementById('tabWineLabel').textContent = isDe ? "Wein-Guide" : "Wine Guide";
  document.getElementById('tabCoffeeLabel').textContent = isDe ? "Kaffee-Labor" : "Coffee Lab";
  document.getElementById('tabScienceLabel').textContent = isDe ? "Wirkungslehre" : "Science";
  document.getElementById('tabQuizLabel').textContent = isDe ? "Quiz-Trainer" : "Quiz";

  const homeCatalog = document.getElementById('homeCardCatalog');
  if (homeCatalog) homeCatalog.textContent = isDe ? "Lexikon & Katalog" : "Catalog & Lexicon";
  const homeCatalogSub = document.getElementById('homeCardCatalogSub');
  if (homeCatalogSub) homeCatalogSub.textContent = isDe ? "24 Kategorien & Fachartikel" : "24 Categories & Entries";

  const homeWine = document.getElementById('homeCardWine');
  if (homeWine) homeWine.textContent = isDe ? "Wein-Guide" : "Wine Guide";
  const homeWineSub = document.getElementById('homeCardWineSub');
  if (homeWineSub) homeWineSub.textContent = isDe ? "Schaumwein & Rebsorten" : "Sparkling & Viticulture";

  const homeCoffee = document.getElementById('homeCardCoffee');
  if (homeCoffee) homeCoffee.textContent = isDe ? "Kaffee-Labor" : "Coffee Lab";
  const homeCoffeeSub = document.getElementById('homeCardCoffeeSub');
  if (homeCoffeeSub) homeCoffeeSub.textContent = isDe ? "Schichten & Glas-Physik" : "Glass layers & Physics";

  const homeScience = document.getElementById('homeCardScience');
  if (homeScience) homeScience.textContent = isDe ? "Alkohol-Wirkungslehre" : "Alcohol Science";
  const homeScienceSub = document.getElementById('homeCardScienceSub');
  if (homeScienceSub) homeScienceSub.textContent = isDe ? "Metabolismus & Promille" : "Metabolism & Effects";

  const homeQuiz = document.getElementById('homeCardQuiz');
  if (homeQuiz) homeQuiz.textContent = isDe ? "Quiz-Trainer" : "Quiz Trainer";
  const homeQuizSub = document.getElementById('homeCardQuizSub');
  if (homeQuizSub) homeQuizSub.textContent = isDe ? "Wissen spielend testen" : "Test your knowledge";

  const homeGrid = document.getElementById('homeCardGrid');
  if (homeGrid) homeGrid.textContent = isDe ? "Alle Kategorien" : "All Categories";
  const homeGridSub = document.getElementById('homeCardGridSub');
  if (homeGridSub) homeGridSub.textContent = isDe ? "Schnellwahl-Raster" : "Quick 24-grid selector";

  const homeCocktails = document.getElementById('homeCardCocktails');
  if (homeCocktails) homeCocktails.textContent = isDe ? "Cocktails & Bar" : "Cocktails & Bar";
  const homeCocktailsSub = document.getElementById('homeCardCocktailsSub');
  if (homeCocktailsSub) homeCocktailsSub.textContent = isDe ? "Longdrinks & Technik" : "Longdrinks & Tech";

  const homeService = document.getElementById('homeCardService');
  if (homeService) homeService.textContent = isDe ? "Service & Kultur" : "Service & Culture";
  const homeServiceSub = document.getElementById('homeCardServiceSub');
  if (homeServiceSub) homeServiceSub.textContent = isDe ? "Tischdecke & HACCP" : "Table & HACCP";

  const tabCocktailsLabel = document.getElementById('tabCocktailsLabel');
  if (tabCocktailsLabel) tabCocktailsLabel.textContent = isDe ? "Cocktails" : "Cocktails";
  const tabServiceLabel = document.getElementById('tabServiceLabel');
  if (tabServiceLabel) tabServiceLabel.textContent = isDe ? "Service" : "Service";

  const coffeeBackBtn = document.getElementById('coffeeBackBtn');
  if (coffeeBackBtn) coffeeBackBtn.textContent = isDe ? 'Zurück zur Übersicht' : 'Back to Overview';
  const quizBackBtn = document.getElementById('quizBackBtn');
  if (quizBackBtn) quizBackBtn.textContent = isDe ? 'Zurück zur Übersicht' : 'Back to Overview';

  const homeRecipes = document.getElementById('homeCardRecipes');
  if (homeRecipes) homeRecipes.textContent = isDe ? "Basis-Rezepte" : "Basic Recipes";
  const homeRecipesSub = document.getElementById('homeCardRecipesSub');
  if (homeRecipesSub) homeRecipesSub.textContent = isDe ? "In Vorbereitung" : "Coming Soon";

  // Detail Modal section headers & labels
  const originLabel = document.getElementById('detailOriginLabel');
  if (originLabel) originLabel.textContent = isDe ? 'Herkunft' : 'Origin';

  const faqTitle = document.getElementById('detailFaqTitle');
  if (faqTitle) faqTitle.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px;">help_outline</span><span>${isDe ? 'Gastfragen souverän beantworten' : 'How to Answer Guest Inquiries'}</span>`;

  const scienceTitle = document.getElementById('detailScienceTitle');
  if (scienceTitle) scienceTitle.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px;">science</span><span>${isDe ? 'Wissenschaft & Herstellung' : 'Science & Production'}</span>`;

  const rawTitle = document.getElementById('detailRawMaterialTitle');
  if (rawTitle) rawTitle.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px;">spa</span><span>${isDe ? 'Rohstoffe & Botanicals' : 'Raw Materials & Botanicals'}</span>`;

  const tasteTitle = document.getElementById('detailTasteTitle');
  if (tasteTitle) tasteTitle.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px;">restaurant</span><span>${isDe ? 'Sensorik & Geschmacksprofil' : 'Sensory & Flavor Profile'}</span>`;

  const culinaryTitle = document.getElementById('detailCulinaryTitle');
  if (culinaryTitle) culinaryTitle.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px;">local_bar</span><span>${isDe ? 'Servierempfehlung & Gastronomie-Einsatz' : 'Serving Recommendation & Bar Use'}</span>`;

  const allergenTitle = document.getElementById('detailAllergenTitle');
  if (allergenTitle) allergenTitle.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px;">warning</span><span>${isDe ? 'Allergen- & Inhaltsstoffhinweis (EU)' : 'Allergen & Ingredient Notice (EU)'}</span>`;

  // Filter Buttons
  const filterFavBtn = document.getElementById('filterFavBtn');
  if (filterFavBtn) filterFavBtn.textContent = isDe ? '❤️ Favoriten' : '❤️ Favorites';
  const filterStockBtn = document.getElementById('filterStockBtn');
  if (filterStockBtn) filterStockBtn.textContent = isDe ? '📦 Auf Lager' : '📦 In Stock';

  // Quiz Next Button
  const quizNextBtn = document.getElementById('quizNextBtn');
  if (quizNextBtn) quizNextBtn.textContent = isDe ? 'Nächste Frage ➜' : 'Next Question ➜';

  // Category Grid Modal
  const catModalTitle = document.getElementById('categoryModalTitle');
  if (catModalTitle) catModalTitle.innerHTML = `<span class="material-symbols-outlined">grid_view</span><span>${isDe ? 'Kategorie-Schnellauswahl (24 Fachbereiche)' : 'Category Quick Select (24 Categories)'}</span>`;
  const catModalSub = document.getElementById('categoryModalSub');
  if (catModalSub) catModalSub.textContent = isDe ? 'Wähle direkt eine der 24 Fachkategorien aus der Gastronomie-Wissensdatenbank:' : 'Select directly from the 24 gastronomy categories in the knowledge database:';
  const catModalClose = document.getElementById('categoryModalCloseBtn');
  if (catModalClose) catModalClose.textContent = isDe ? 'Fertig' : 'Done';

  // In Prep Modal
  const inPrepTitle = document.getElementById('inPrepTitle');
  if (inPrepTitle) inPrepTitle.textContent = isDe ? 'In Vorbereitung' : 'Coming Soon';
  const inPrepText = document.getElementById('inPrepText');
  if (inPrepText) inPrepText.textContent = isDe ? 'Dieser Bereich wird aktuell für dich entwickelt und steht in Kürze zur Verfügung.' : 'This section is currently under development and will be available soon.';
  const inPrepClose = document.getElementById('inPrepCloseBtn');
  if (inPrepClose) inPrepClose.textContent = isDe ? 'Verstanden' : 'Got it';

  // iOS Install Modal
  const iosTitle = document.getElementById('iosInstallTitle');
  if (iosTitle) iosTitle.textContent = isDe ? 'Zum Startbildschirm hinzufügen' : 'Add to Home Screen';
  const iosSub = document.getElementById('iosInstallSub');
  if (iosSub) iosSub.textContent = isDe ? 'Nutze GastroDex wie eine echte App direkt auf deinem Smartphone:' : 'Use GastroDex like a native app directly on your smartphone:';
  const iosSteps = document.getElementById('iosInstallSteps');
  if (iosSteps) iosSteps.innerHTML = isDe ? 
    '<p style="margin-bottom: 8px;">1. Im Browser auf das <strong>Teilen-Symbol</strong> <span style="font-size: 1.1rem; vertical-align: middle;">⎋</span> (iOS Safari) oder die <strong>Drei Punkte</strong> <strong>⋮</strong> (Chrome/Android) tippen.</p><p>2. Wähle <strong>„Zum Home-Bildschirm“</strong> bzw. <strong>„App installieren“</strong> aus.</p>' : 
    '<p style="margin-bottom: 8px;">1. In your browser tap the <strong>Share icon</strong> <span style="font-size: 1.1rem; vertical-align: middle;">⎋</span> (iOS Safari) or the <strong>Three dots</strong> <strong>⋮</strong> (Chrome/Android).</p><p>2. Select <strong>"Add to Home Screen"</strong> or <strong>"Install App"</strong>.</p>';
  const iosBtn = document.getElementById('iosInstallBtn');
  if (iosBtn) iosBtn.textContent = isDe ? 'Verstanden' : 'Got it';

  // PWA Install Banner
  const pwaTitle = document.getElementById('pwaInstallTitle');
  if (pwaTitle) pwaTitle.textContent = isDe ? 'GastroDex installieren?' : 'Install GastroDex?';
  const pwaSub = document.getElementById('pwaInstallSub');
  if (pwaSub) pwaSub.textContent = isDe ? 'Als Web-App auf dem Homescreen speichern für blitzschnellen Offline-Zugriff.' : 'Save as web app on your home screen for instant offline access.';
  const pwaDismiss = document.getElementById('pwaInstallDismissBtn');
  if (pwaDismiss) pwaDismiss.textContent = isDe ? 'Später' : 'Later';
  const pwaInstall = document.getElementById('pwaInstallBtn');
  if (pwaInstall) pwaInstall.textContent = isDe ? '📲 Installieren' : '📲 Install';
}

function renderKnowledgeGuides() {
  const isDe = (currentLang === 'de');
  renderWineGuide(isDe);
  renderCoffeeGuide(isDe);
  renderCocktailsGuide(isDe);
  renderServiceGuide(isDe);
  renderScienceGuide(isDe);
  renderQuizHeaderStrings(isDe);
}

function renderWineGuide(isDe) {
  const el = document.getElementById('wineGuideContent');
  if (!el) return;
  el.innerHTML = `
    <!-- Back to Overview Button -->
    <div style="margin-bottom: 14px;">
      <button onclick="switchTab('home')" class="btn-subtle" style="display:inline-flex; align-items:center; gap:6px; padding:6px 14px; border-radius:20px; font-size:0.82rem; font-weight:700; background:var(--bg-surface-variant); border:1px solid var(--border-subtle); color:var(--text-secondary); cursor:pointer;">
        <span class="material-symbols-outlined" style="font-size:16px;">arrow_back</span>
        <span>${isDe ? 'Zurück zur Übersicht' : 'Back to Overview'}</span>
      </button>
    </div>
    <div class="detail-section" style="margin-bottom: 16px;">
      <h2 style="font-size: 1.25rem; font-weight: 800; color: var(--accent-gold); margin-bottom: 8px;">
        🍷 ${isDe ? 'Wein- & Schaumweinkompass' : 'Wine & Sparkling Wine Master Guide'}
      </h2>
      <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">
        ${isDe ? 
          'Von den feinsten Perlen der Champagne über deutschen Steillagen-Riesling bis hin zum geschützten Asti Spumante DOCG und den Geheimnissen der Roséwein-Kelterung.' :
          'From the finest bubbles of Champagne to German steep-slope Riesling, protected Asti Spumante DOCG, and the secrets of Rosé vinification.'}
      </p>
    </div>

    <div class="detail-section" style="margin-bottom: 14px;">
      <h3 class="detail-section-title">🍾 ${isDe ? 'Das Schaumwein-Dreieck' : 'The Sparkling Wine Triangle'}</h3>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Champagner (AOP Frankreich):' : 'Champagne (AOP France):'}</strong> ${isDe ? 
          'Ausschließlich traditionelle Flaschengärung (Méthode Champenoise) in der Champagne; mind. 15 Monate Hefelager lösen Mannoproteine (Autolyse) für edle Brioche-Aromen und ultra-feine Perlage (5-6 bar).' : 
          'Exclusively traditional in-bottle fermentation in the Champagne region; min. 15 months lees aging releases mannoproteins for brioche nuances and velvety micro-bubbles.'}<br/>
        • <strong>${isDe ? 'Deutscher Sekt & Winzersekt:' : 'German Sekt & Winzersekt:'}</strong> ${isDe ? 
          'Riesling- oder Burgunderbasis; lebendige rassige Säure, feinfruchtig, erzeugt im Drucktank oder als traditioneller Winzersekt mit mindestens 9 Monaten Flaschenhefelager.' : 
          'Riesling or Pinot base; crisp racy acidity, vibrant minerality, produced in autoclave tanks or as traditional Winzersekt with min. 9 months on the lees.'}<br/>
        • <strong>${isDe ? 'Asti Spumante (DOCG Piemont):' : 'Asti Spumante (DOCG Piedmont):'}</strong> ${isDe ? 
          '100% aromatische Moscato Bianco-Traube. Das Geheimnis: Die Gärung im Autoklaven wird bei ca. 7–9% Vol. durch Kälteschock gestoppt! So bleibt der natürliche Fruchtzucker erhalten – herrlich süß mit Aromen von weißem Pfirsich und Salbei!' : 
          '100% Moscato Bianco. The secret: Pressurized fermentation is chilled and halted at ~7-9% ABV! Preserving natural grape sugars without added dosage – lush, floral, and perfect with desserts!'}
      </p>
    </div>

    <div class="detail-section" style="margin-bottom: 14px;">
      <h3 class="detail-section-title">🍇 ${isDe ? 'Rebsorten & Kelterung' : 'Grape Varieties & Vinification'}</h3>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Riesling (Königin der Weißweine):' : 'Riesling (Queen of White Grapes):'}</strong> ${isDe ? 
          'Sehr hohe natürliche Säure, Schiefermineralik, Aromen von grünem Apfel und Pfirsich; bildet bei langer Reife die edle TDN-Petrolnote aus.' : 
          'High natural acidity, slate minerality, aromas of crisp green apple and peach; develops complex petrol (TDN) nuances with maturity.'}<br/>
        • <strong>${isDe ? 'Roséwein-Gesetz (EU-Recht):' : 'Rosé Wine Laws (EU Regulation):'}</strong> ${isDe ? 
          'In der Europäischen Union ist das Verschneiden von Weiß- und Rotwein für Stillweine streng gesetzlich verboten! Die zartrosa bis lachsfarbene Tönung entsteht rein aus kurzer Maischestandzeit (2–12 Stunden) roter Traubenhäute.' : 
          'In the EU, blending white and red wine for still wine is strictly prohibited! The pale pink color comes exclusively from brief skin contact (2-12h maceration) of red grapes.'}
      </p>
    </div>
  `;
}

function renderCoffeeGuide(isDe) {
  const headerTitle = document.getElementById('coffeeHeaderTitle');
  if (headerTitle) headerTitle.textContent = isDe ? '☕ Kaffeespezialitäten & Schichten-Labor' : '☕ Coffee Specialties & Layer Lab';
  
  const headerSub = document.getElementById('coffeeHeaderSub');
  if (headerSub) headerSub.textContent = isDe ? 
    'Interaktive Getränke-Schichtung im Glas, Extraktionsphysik (9 bar, 25s) und der Unterschied zwischen Arabica und Robusta.' :
    'Interactive beverage layering, extraction physics (9 bar, 25s), and Arabica vs. Robusta science.';

  const compareTitle = document.getElementById('coffeeCompareTitle');
  if (compareTitle) compareTitle.textContent = isDe ? '🥛 Getränke-Schichten im Glas vergleichen' : '🥛 Compare Drink Layers in Realistic Glassware';

  const labelLeft = document.getElementById('coffeeLabelLeft');
  if (labelLeft) labelLeft.textContent = isDe ? 'GETRÄNK 1:' : 'BEVERAGE 1:';

  const labelRight = document.getElementById('coffeeLabelRight');
  if (labelRight) labelRight.textContent = isDe ? 'GETRÄNK 2:' : 'BEVERAGE 2:';

  const species = document.getElementById('coffeeSpeciesSection');
  if (species) {
    species.innerHTML = `
      <h3 class="detail-section-title">🌱 ${isDe ? 'Arabica vs. Robusta' : 'Arabica vs. Robusta'}</h3>
      <p class="detail-section-text">
        • <strong>Coffea Arabica:</strong> ${isDe ? 
          'Hochlagen (1000–2200m), feine elegante Fruchtsäuren, 60% mehr Lipide/Öle, milderer Koffeingehalt (1,1–1,4%).' : 
          'High altitudes (1000-2200m), delicate fruit acids, 60% more lipids/oils, lower caffeine (1.1-1.4%).'}<br/>
        • <strong>Coffea Robusta (Canephora):</strong> ${isDe ? 
          'Tiefland (0–800m), doppelter Koffeingehalt (2,2–2,7%), weniger Fette -> erzeugt die dichte, elastische, nussbraune Crema im echten italienischen Bar-Espresso!' : 
          'Low altitudes (0-800m), double caffeine content (2.2-2.7%), lower fats -> produces the dense, hazelnut crema in authentic Italian espresso!'}
      </p>
    `;
  }
  updateCoffeeComparison();
}


let currentServiceSchema = 'gala';

function setServiceSchema(schema) {
  currentServiceSchema = schema;
  renderServiceGuide(currentLang === 'de');
}

function renderCocktailsGuide(isDe) {
  const el = document.getElementById('cocktailsGuideContent');
  if (!el) return;
  el.innerHTML = `
    <!-- Back to Overview Button -->
    <div style="margin-bottom: 14px;">
      <button onclick="switchTab('home')" class="btn-subtle" style="display:inline-flex; align-items:center; gap:6px; padding:6px 14px; border-radius:20px; font-size:0.82rem; font-weight:700; background:var(--bg-surface-variant); border:1px solid var(--border-subtle); color:var(--text-secondary); cursor:pointer;">
        <span class="material-symbols-outlined" style="font-size:16px;">arrow_back</span>
        <span>${isDe ? 'Zurück zur Übersicht' : 'Back to Overview'}</span>
      </button>
    </div>

    <!-- Header Section -->
    <div class="detail-section" style="margin-bottom: 16px;">
      <h2 style="font-size: 1.25rem; font-weight: 800; color: var(--accent-gold); margin-bottom: 8px;">
        🍸 ${isDe ? 'Cocktails, Bar-Technik & Longdrinks' : 'Cocktails, Bar Technique & Highballs'}
      </h2>
      <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">
        ${isDe ? 
          'Klassische Bar-Rezepte, Highball-Balance, Eis-Thermodynamik, Rühr- und Schütteltechnik mit fotorealistischen Impressionen für Bartender und Servicekräfte.' : 
          'Classic bar recipes, highball balance, ice thermodynamics, stirring & shaking craft with photo inspiration for bartenders and floor staff.'}
      </p>
    </div>

    <!-- Section 1: Classic Cocktails with Photos -->
    <div class="detail-section" style="margin-bottom: 16px;">
      <h3 class="detail-section-title" style="margin-bottom: 12px;">🍹 ${isDe ? '1. Zeitlose Bar-Klassiker & Rezepturen' : '1. Timeless Bar Classics & Recipes'}</h3>
      
      <!-- Negroni Card -->
      <div style="background: var(--bg-surface-variant); border-radius: 12px; overflow: hidden; margin-bottom: 14px; border: 1px solid var(--border-subtle);">
        <img src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80" alt="Negroni Cocktail" style="width: 100%; height: 180px; object-fit: cover; display: block;" />
        <div style="padding: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
            <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--accent-gold);">Negroni (IBA Official)</h4>
            <span style="font-size: 0.75rem; font-weight: 700; background: rgba(231,111,81,0.2); color: #e76f51; padding: 2px 8px; border-radius: 10px;">${isDe ? 'Gerührt (Stirred)' : 'Stirred'}</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-primary); margin-bottom: 6px;">
            <strong>${isDe ? 'Zutaten:' : 'Ingredients:'}</strong> 3 cl Dry Gin, 3 cl Campari (Bitter), 3 cl Vermouth Rosso (Süß).
          </p>
          <p style="font-size: 0.83rem; color: var(--text-secondary); line-height: 1.4;">
            <strong>${isDe ? 'Zubereitung:' : 'Method:'}</strong> ${isDe ? 
              'Im Rührglas auf massivem Eis 30 Sekunden kalt rühren, bis das Glas beschlägt. In einen Tumbler mit frischem Eisblock abseihen, mit Orangenzeste abspritzen und garnieren.' : 
              'Stir with large ice in a mixing glass for 30s until chilled. Strain into rocks glass over a fresh clear ice block; express orange peel.'}
          </p>
        </div>
      </div>

      <!-- Gin & Tonic Card -->
      <div style="background: var(--bg-surface-variant); border-radius: 12px; overflow: hidden; margin-bottom: 14px; border: 1px solid var(--border-subtle);">
        <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=80" alt="Gin Tonic Highball" style="width: 100%; height: 180px; object-fit: cover; display: block;" />
        <div style="padding: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
            <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--accent-gold);">Gin & Tonic (Highball Standard)</h4>
            <span style="font-size: 0.75rem; font-weight: 700; background: rgba(42,157,143,0.2); color: #2a9d8f; padding: 2px 8px; border-radius: 10px;">${isDe ? 'Gäste-Glas (Built)' : 'Built in Glass'}</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-primary); margin-bottom: 6px;">
            <strong>${isDe ? 'Zutaten:' : 'Ingredients:'}</strong> 5 cl Premium Dry Gin, 150–200 ml Tonic Water (chilled).
          </p>
          <p style="font-size: 0.83rem; color: var(--text-secondary); line-height: 1.4;">
            <strong>${isDe ? 'Zubereitung:' : 'Method:'}</strong> ${isDe ? 
              'Ballonglas oder Highball komplett mit großen Eiswürfeln füllen. Gin eingießen, eiskaltes Tonic vorsichtig über den Barlöffel einfließen lassen (Kohlensäureschutz), einmal sanft anheben. Garnitur: Zitruszeste oder Gurkenscheibe.' : 
              'Fill balloon or highball glass with solid ice. Pour gin, gently pour cold tonic water over barspoon to preserve bubbles, lift once. Garnish: Citrus twist or cucumber slice.'}
          </p>
        </div>
      </div>

      <!-- Espresso Martini Card -->
      <div style="background: var(--bg-surface-variant); border-radius: 12px; overflow: hidden; margin-bottom: 14px; border: 1px solid var(--border-subtle);">
        <img src="https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&auto=format&fit=crop&q=80" alt="Espresso Martini" style="width: 100%; height: 180px; object-fit: cover; display: block;" />
        <div style="padding: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
            <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--accent-gold);">Espresso Martini</h4>
            <span style="font-size: 0.75rem; font-weight: 700; background: rgba(251,133,0,0.2); color: #fb8500; padding: 2px 8px; border-radius: 10px;">${isDe ? 'Kräftig geschüttelt' : 'Hard Shake'}</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-primary); margin-bottom: 6px;">
            <strong>${isDe ? 'Zutaten:' : 'Ingredients:'}</strong> 4 cl Vodka, 2 cl Kaffeelikör (Kahlúa), 3 cl frischer Espresso, 1 cl Zuckersirup.
          </p>
          <p style="font-size: 0.83rem; color: var(--text-secondary); line-height: 1.4;">
            <strong>${isDe ? 'Zubereitung:' : 'Method:'}</strong> ${isDe ? 
              'Sehr kräftig mit Eis im Shaker schütteln (Hard Shake), um das Kaffeefett zu einer dichten, samtigen Schaumkrone zu emulgieren. Fein in eine vorgekühlte Coupette seihen. Mit 3 Kaffeebohnen garnieren.' : 
              'Shake intensely with ice (Hard Shake) to emulsify coffee oils into a thick velvet crema. Fine-strain into chilled coupe. Garnish with 3 coffee beans.'}
          </p>
        </div>
      </div>

      <!-- Moscow Mule Card -->
      <div style="background: var(--bg-surface-variant); border-radius: 12px; overflow: hidden; border: 1px solid var(--border-subtle);">
        <img src="https://images.unsplash.com/photo-1556881286-fc6915169721?w=800&auto=format&fit=crop&q=80" alt="Moscow Mule Copper Mug" style="width: 100%; height: 180px; object-fit: cover; display: block;" />
        <div style="padding: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
            <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--accent-gold);">Moscow Mule</h4>
            <span style="font-size: 0.75rem; font-weight: 700; background: rgba(33,158,188,0.2); color: #219ebc; padding: 2px 8px; border-radius: 10px;">${isDe ? 'Kupferbecher' : 'Copper Mug'}</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-primary); margin-bottom: 6px;">
            <strong>${isDe ? 'Zutaten:' : 'Ingredients:'}</strong> 5 cl Vodka, 2 cl frischer Limettensaft, 150 ml Spicy Ginger Beer.
          </p>
          <p style="font-size: 0.83rem; color: var(--text-secondary); line-height: 1.4;">
            <strong>${isDe ? 'Zubereitung:' : 'Method:'}</strong> ${isDe ? 
              'Im Kupferbecher auf reichlich Crushed Ice oder Eiswürfeln bauen. Vodka und Limettensaft hinzugeben, mit Ginger Beer auffüllen. Mit Gurkenscheibe und Minzzweig servieren.' : 
              'Build in traditional copper mug over ice. Add vodka and lime juice, top with ginger beer. Garnish with cucumber wheel and fresh mint sprig.'}
          </p>
        </div>
      </div>
    </div>

    <!-- Section 2: Bar Technique & Ice Thermodynamics -->
    <div class="detail-section" style="margin-bottom: 16px;">
      <h3 class="detail-section-title" style="margin-bottom: 12px;">🧊 ${isDe ? '2. Eis-Thermodynamik & Bartender-Handwerk' : '2. Ice Thermodynamics & Bartending Craft'}</h3>
      
      <div style="border-radius: 12px; overflow: hidden; margin-bottom: 12px; border: 1px solid var(--border-subtle);">
        <img src="https://images.unsplash.com/photo-1560512823-829485b8bf24?w=800&auto=format&fit=crop&q=80" alt="Clear Ice Blocks" style="width: 100%; height: 180px; object-fit: cover; display: block;" />
      </div>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Klare Eisblöcke (Clear Ice):' : 'Directionally Frozen Clear Ice:'}</strong> ${isDe ? 
          'Durch gerichtete Einfrierung entstehen kristallklare Eisblöcke ohne Luftblasen und Kalk. Sie schmelzen bis zu 3x langsamer als hohle Maschineneiswürfel und halten Drinks eiskalt ohne Verwässerung.' : 
          'Directionally frozen clear ice has zero trapped air or minerals. It melts up to 3x slower than hollow machine ice, chilling without dilution.'}<br/>
        • <strong>${isDe ? 'Glas-Vorkühlung:' : 'Glass Pre-Chilling:'}</strong> ${isDe ? 
          'Gläser vor dem Einschenken im Tiefkühler kühlen oder mit Eiswürfeln vorrühren. Verhindert Temperaturschocks und stabilisiert die Kohlensäure.' : 
          'Keep glassware in freezer or stir with ice before pouring. Prevents temperature shock and preserves sparkling carbonation.'}
      </p>

      <div style="border-radius: 12px; overflow: hidden; margin: 16px 0 12px 0; border: 1px solid var(--border-subtle);">
        <img src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&auto=format&fit=crop&q=80" alt="Bartender Stirring" style="width: 100%; height: 180px; object-fit: cover; display: block;" />
      </div>
      <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--accent-gold); margin-bottom: 6px;">
        🥄 ${isDe ? 'Rühren (Stir) vs. Schütteln (Shake)' : 'Stirring vs. Shaking Technique'}
      </h4>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Rühren (Stir):' : 'Stirring:'}</strong> ${isDe ? 
          'Für reine Spirituosen-Mischungen ohne Zitrussäfte oder Eier (z.B. Negroni, Manhattan, Martini). Erhält die kristallklare, seidenweiche Textur ohne Trübung.' : 
          'For spirit-only cocktails without citrus or cream (Negroni, Manhattan, Dry Martini). Preserves diamond clarity and unctuous viscosity.'}<br/>
        • <strong>${isDe ? 'Schütteln (Shake):' : 'Shaking:'}</strong> ${isDe ? 
          'Für Drinks mit Zitrussäften, Eiweiß, Sahne oder Pürees (z.B. Sour, Daiquiri, Espresso Martini). Erzeugt Mikrobelüftung und eine dichte Schaumkrone.' : 
          'For drinks with citrus juices, egg whites, cream, or syrups (Sour, Daiquiri, Espresso Martini). Aerates and creates velvety microfoam.'}
      </p>
    </div>
  `;
}

function renderServiceGuide(isDe) {
  const el = document.getElementById('serviceCultureContent');
  if (!el) return;

  // Schema diagram SVGs
  const galaSvg = `
    <svg viewBox="0 0 700 420" style="width:100%; height:auto; display:block; background:#181512; border-radius:12px; border:1px solid #3d3429;">
      <!-- Table Edge Indicator -->
      <line x1="20" y1="395" x2="680" y2="395" stroke="#c98822" stroke-width="2" stroke-dasharray="6,4" />
      <text x="350" y="412" fill="#c98822" font-size="12" font-weight="700" text-anchor="middle">${isDe ? 'TISCHKANTE (Abstand Teller & Besteck: genormte 1-2 cm)' : 'TABLE EDGE (Standard Cutlery Margin: 1-2 cm)'}</text>
      
      <!-- Charger Plate & Dinner Plate -->
      <circle cx="350" cy="245" r="110" fill="#241e17" stroke="#8d6e63" stroke-width="3"/>
      <circle cx="350" cy="245" r="85" fill="#2d241c" stroke="#c98822" stroke-width="2"/>
      <circle cx="350" cy="245" r="60" fill="#382d22" stroke="#5d4037" stroke-width="1.5"/>
      <text x="350" y="240" fill="#ffffff" font-size="13" font-weight="800" text-anchor="middle">${isDe ? 'PLATZTELLER' : 'CHARGER'}</text>
      <text x="350" y="258" fill="#c98822" font-size="11" font-weight="600" text-anchor="middle">${isDe ? '& Speiseteller' : '& Dinner Plate'}</text>

      <!-- Napkin on Plate -->
      <polygon points="325,185 375,185 365,225 335,225" fill="#e0e0e0" stroke="#bdbdbd" stroke-width="1.5"/>
      <text x="350" y="208" fill="#181512" font-size="9" font-weight="700" text-anchor="middle">${isDe ? 'SERVIETTE' : 'NAPKIN'}</text>

      <!-- Left: Forks (Outside to inside) -->
      <!-- 1. Salad Fork (Far Left) -->
      <rect x="180" y="160" width="10" height="200" rx="3" fill="#cfd8dc" stroke="#90a4ae" stroke-width="1"/>
      <rect x="176" y="135" width="18" height="35" rx="2" fill="#b0bec5"/>
      <text x="185" y="380" fill="#a09080" font-size="10" font-weight="600" text-anchor="middle">${isDe ? 'Vorspeisen-' : 'Salad'}</text>
      <text x="185" y="392" fill="#a09080" font-size="9" text-anchor="middle">${isDe ? 'gabel' : 'Fork'}</text>

      <!-- 2. Fish Fork (Middle) -->
      <rect x="225" y="150" width="10" height="210" rx="3" fill="#cfd8dc" stroke="#90a4ae" stroke-width="1"/>
      <rect x="221" y="125" width="18" height="35" rx="2" fill="#b0bec5"/>
      <text x="230" y="380" fill="#a09080" font-size="10" font-weight="600" text-anchor="middle">${isDe ? 'Fischgabel' : 'Fish Fork'}</text>

      <!-- 3. Dinner Fork (Inner Left) -->
      <rect x="270" y="140" width="11" height="220" rx="3" fill="#eceff1" stroke="#b0bec5" stroke-width="1"/>
      <rect x="266" y="110" width="19" height="40" rx="2" fill="#cfd8dc"/>
      <text x="275" y="380" fill="#c98822" font-size="10" font-weight="700" text-anchor="middle">${isDe ? 'Menügabel' : 'Dinner Fork'}</text>

      <!-- Right: Knives & Spoon (Outside to inside) -->
      <!-- 1. Dinner Knife (Inner Right, blade facing plate) -->
      <rect x="420" y="140" width="11" height="220" rx="3" fill="#eceff1" stroke="#b0bec5" stroke-width="1"/>
      <path d="M 420 140 Q 431 100 420 90 L 420 140 Z" fill="#cfd8dc"/>
      <text x="425" y="380" fill="#c98822" font-size="10" font-weight="700" text-anchor="middle">${isDe ? 'Menümesser' : 'Dinner Knife'}</text>

      <!-- 2. Fish Knife (Middle Right) -->
      <rect x="465" y="150" width="10" height="210" rx="3" fill="#cfd8dc" stroke="#90a4ae" stroke-width="1"/>
      <polygon points="465,150 475,150 475,115 465,125" fill="#b0bec5"/>
      <text x="470" y="380" fill="#a09080" font-size="10" font-weight="600" text-anchor="middle">${isDe ? 'Fischmesser' : 'Fish Knife'}</text>

      <!-- 3. Soup Spoon (Far Right) -->
      <rect x="510" y="160" width="10" height="200" rx="3" fill="#cfd8dc" stroke="#90a4ae" stroke-width="1"/>
      <ellipse cx="515" cy="140" rx="14" ry="22" fill="#b0bec5"/>
      <text x="515" y="380" fill="#a09080" font-size="10" font-weight="600" text-anchor="middle">${isDe ? 'Suppenlöffel' : 'Soup Spoon'}</text>

      <!-- Top: Dessert Cutlery -->
      <!-- Dessert Spoon (Handle to right) -->
      <rect x="300" y="90" width="100" height="8" rx="2" fill="#cfd8dc"/>
      <ellipse cx="295" cy="94" rx="14" ry="9" fill="#b0bec5"/>
      <text x="350" y="82" fill="#c98822" font-size="10" font-weight="700" text-anchor="middle">${isDe ? 'Dessertlöffel (Griff rechts ➔)' : 'Dessert Spoon (➔ handle right)'}</text>

      <!-- Dessert Fork (Handle to left) -->
      <rect x="300" y="112" width="100" height="8" rx="2" fill="#cfd8dc"/>
      <rect x="400" y="108" width="18" height="16" rx="2" fill="#b0bec5"/>
      <text x="350" y="135" fill="#a09080" font-size="10" font-weight="600" text-anchor="middle">${isDe ? 'Dessertgabel (Griff links ⬅)' : 'Dessert Fork (⬅ handle left)'}</text>

      <!-- Top Left: Bread Plate & Butter Knife -->
      <circle cx="160" cy="80" r="45" fill="#2d241c" stroke="#8d6e63" stroke-width="2"/>
      <text x="160" y="76" fill="#e0e0e0" font-size="10" font-weight="700" text-anchor="middle">${isDe ? 'Brotteller' : 'Bread Plate'}</text>
      <!-- Butter Knife on plate -->
      <rect x="180" y="45" width="6" height="70" rx="2" fill="#cfd8dc" transform="rotate(-20 180 80)"/>
      <text x="160" y="92" fill="#c98822" font-size="8.5" text-anchor="middle">${isDe ? 'Buttermesser' : 'Butter Knife'}</text>

      <!-- Top Right: Glassware Hierarchy (45° Diagonal) -->
      <!-- 1. Water Glass (Anchor / Richtglas over Dinner Knife) -->
      <circle cx="430" cy="55" r="24" fill="#219ebc" fill-opacity="0.25" stroke="#219ebc" stroke-width="2.5"/>
      <text x="430" y="52" fill="#81d4fa" font-size="10" font-weight="800" text-anchor="middle">${isDe ? 'Wasserglas' : 'Water Goblet'}</text>
      <text x="430" y="65" fill="#ffffff" font-size="8.5" font-weight="600" text-anchor="middle">${isDe ? '(Richtglas)' : '(Anchor)'}</text>

      <!-- 2. Red Wine Glass (Diagonal right down) -->
      <circle cx="490" cy="65" r="22" fill="#9e2a2b" fill-opacity="0.3" stroke="#e07a5f" stroke-width="2"/>
      <text x="490" y="63" fill="#ffcdd2" font-size="9" font-weight="700" text-anchor="middle">${isDe ? 'Rotweinglas' : 'Red Wine'}</text>

      <!-- 3. White Wine Glass -->
      <circle cx="545" cy="80" r="19" fill="#ffb703" fill-opacity="0.25" stroke="#ffb703" stroke-width="2"/>
      <text x="545" y="78" fill="#ffe082" font-size="9" font-weight="700" text-anchor="middle">${isDe ? 'Weißwein' : 'White Wine'}</text>

      <!-- 4. Champagne Flute -->
      <circle cx="595" cy="98" r="16" fill="#fb8500" fill-opacity="0.25" stroke="#fb8500" stroke-width="1.8"/>
      <text x="595" y="96" fill="#ffe0b2" font-size="8" font-weight="700" text-anchor="middle">${isDe ? 'Champagner' : 'Flute'}</text>
    </svg>
  `;

  const alacarteSvg = `
    <svg viewBox="0 0 600 360" style="width:100%; height:auto; display:block; background:#181512; border-radius:12px; border:1px solid #3d3429;">
      <line x1="20" y1="335" x2="580" y2="335" stroke="#c98822" stroke-width="2" stroke-dasharray="6,4" />
      <text x="300" y="352" fill="#c98822" font-size="12" font-weight="700" text-anchor="middle">${isDe ? 'TISCHKANTE (1-2 cm Abstand für Teller & Besteck)' : 'TABLE EDGE (1-2 cm Cutlery Margin)'}</text>
      
      <!-- Dinner Plate -->
      <circle cx="300" cy="205" r="95" fill="#241e17" stroke="#c98822" stroke-width="3"/>
      <circle cx="300" cy="205" r="70" fill="#2d241c" stroke="#5d4037" stroke-width="1.5"/>
      <text x="300" y="200" fill="#ffffff" font-size="14" font-weight="800" text-anchor="middle">${isDe ? 'SPEISETELER' : 'DINNER PLATE'}</text>
      
      <!-- Folded Napkin -->
      <polygon points="275,150 325,150 315,190 285,190" fill="#e0e0e0" stroke="#bdbdbd" stroke-width="1.5"/>
      <text x="300" y="173" fill="#181512" font-size="9" font-weight="700" text-anchor="middle">${isDe ? 'SERVIETTE' : 'NAPKIN'}</text>

      <!-- Left: Dinner Fork -->
      <rect x="170" y="110" width="12" height="210" rx="3" fill="#eceff1" stroke="#b0bec5" stroke-width="1"/>
      <rect x="166" y="80" width="20" height="40" rx="2" fill="#cfd8dc"/>
      <text x="176" y="318" fill="#c98822" font-size="11" font-weight="700" text-anchor="middle">${isDe ? 'Menügabel' : 'Dinner Fork'}</text>

      <!-- Right: Dinner Knife (Blade facing inside) -->
      <rect x="420" y="110" width="12" height="210" rx="3" fill="#eceff1" stroke="#b0bec5" stroke-width="1"/>
      <path d="M 420 110 Q 432 70 420 60 L 420 110 Z" fill="#cfd8dc"/>
      <text x="426" y="318" fill="#c98822" font-size="11" font-weight="700" text-anchor="middle">${isDe ? 'Menümesser' : 'Dinner Knife'}</text>

      <!-- Top Right: Water & Wine Glass -->
      <circle cx="430" cy="40" r="22" fill="#219ebc" fill-opacity="0.3" stroke="#219ebc" stroke-width="2"/>
      <text x="430" y="44" fill="#81d4fa" font-size="10" font-weight="800" text-anchor="middle">${isDe ? 'Wasserglas' : 'Water Glass'}</text>
      <circle cx="485" cy="52" r="19" fill="#9e2a2b" fill-opacity="0.3" stroke="#e07a5f" stroke-width="1.8"/>
      <text x="485" y="55" fill="#ffcdd2" font-size="9" font-weight="700" text-anchor="middle">${isDe ? 'Weinglas' : 'Wine Glass'}</text>

      <!-- Top Left: Bread Plate -->
      <circle cx="150" cy="55" r="35" fill="#2d241c" stroke="#8d6e63" stroke-width="2"/>
      <text x="150" y="58" fill="#e0e0e0" font-size="9.5" font-weight="700" text-anchor="middle">${isDe ? 'Brotteller' : 'Bread Plate'}</text>
    </svg>
  `;

  const breakfastSvg = `
    <svg viewBox="0 0 600 360" style="width:100%; height:auto; display:block; background:#181512; border-radius:12px; border:1px solid #3d3429;">
      <line x1="20" y1="335" x2="580" y2="335" stroke="#c98822" stroke-width="2" stroke-dasharray="6,4" />
      <text x="300" y="352" fill="#c98822" font-size="12" font-weight="700" text-anchor="middle">${isDe ? 'TISCHKANTE (1-2 cm Abstand für Frühstücksgedeck)' : 'TABLE EDGE (1-2 cm Breakfast Cover Margin)'}</text>
      
      <!-- Breakfast Plate -->
      <circle cx="280" cy="205" r="85" fill="#241e17" stroke="#c98822" stroke-width="3"/>
      <text x="280" y="200" fill="#ffffff" font-size="13" font-weight="800" text-anchor="middle">${isDe ? 'FRÜHSTÜCKS-' : 'BREAKFAST'}</text>
      <text x="280" y="218" fill="#c98822" font-size="11" font-weight="600" text-anchor="middle">${isDe ? 'TELLER' : 'PLATE'}</text>

      <!-- Left: Breakfast Fork -->
      <rect x="155" y="130" width="10" height="190" rx="2" fill="#eceff1"/>
      <rect x="151" y="105" width="18" height="35" rx="2" fill="#cfd8dc"/>
      <text x="160" y="318" fill="#c98822" font-size="10" font-weight="700" text-anchor="middle">${isDe ? 'Gabel' : 'Fork'}</text>

      <!-- Right: Breakfast Knife -->
      <rect x="395" y="130" width="10" height="190" rx="2" fill="#eceff1"/>
      <path d="M 395 130 Q 405 95 395 85 L 395 130 Z" fill="#cfd8dc"/>
      <text x="400" y="318" fill="#c98822" font-size="10" font-weight="700" text-anchor="middle">${isDe ? 'Messer' : 'Knife'}</text>

      <!-- Top Right: Coffee Cup & Saucer + Spoon -->
      <circle cx="490" cy="115" r="42" fill="#2d241c" stroke="#8d6e63" stroke-width="2"/>
      <circle cx="490" cy="115" r="28" fill="#3e2723" stroke="#c98822" stroke-width="2"/>
      <path d="M 518 115 A 8 8 0 0 1 518 125" stroke="#c98822" stroke-width="3" fill="none"/>
      <!-- Teaspoon -->
      <rect x="525" y="125" width="6" height="50" rx="2" fill="#cfd8dc" transform="rotate(-30 525 125)"/>
      <text x="490" y="112" fill="#ffffff" font-size="9" font-weight="800" text-anchor="middle">${isDe ? 'Kaffee-' : 'Coffee'}</text>
      <text x="490" y="124" fill="#c98822" font-size="8.5" text-anchor="middle">${isDe ? 'tasse' : 'Cup'}</text>

      <!-- Top Right: Juice Glass -->
      <circle cx="430" cy="45" r="20" fill="#fb8500" fill-opacity="0.3" stroke="#fb8500" stroke-width="1.8"/>
      <text x="430" y="48" fill="#ffe0b2" font-size="9" font-weight="700" text-anchor="middle">${isDe ? 'Saftglas' : 'Juice Glass'}</text>
    </svg>
  `;

  let activeSvg = galaSvg;
  if (currentServiceSchema === 'alacarte') activeSvg = alacarteSvg;
  if (currentServiceSchema === 'breakfast') activeSvg = breakfastSvg;

  el.innerHTML = `
    <!-- Back to Overview Button -->
    <div style="margin-bottom: 14px;">
      <button onclick="switchTab('home')" class="btn-subtle" style="display:inline-flex; align-items:center; gap:6px; padding:6px 14px; border-radius:20px; font-size:0.82rem; font-weight:700; background:var(--bg-surface-variant); border:1px solid var(--border-subtle); color:var(--text-secondary); cursor:pointer;">
        <span class="material-symbols-outlined" style="font-size:16px;">arrow_back</span>
        <span>${isDe ? 'Zurück zur Übersicht' : 'Back to Overview'}</span>
      </button>
    </div>

    <!-- Header Section -->
    <div class="detail-section" style="margin-bottom: 16px;">
      <h2 style="font-size: 1.25rem; font-weight: 800; color: var(--accent-gold); margin-bottom: 8px;">
        🛎️ ${isDe ? 'Service, Eindecken & Tischkultur' : 'Service, Table Setting & Etiquette'}
      </h2>
      <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">
        ${isDe ? 
          'Professionelle Eindeck-Schemata, Couvert-Architektur, Gläser-Hierarchie, Serviettenfalttechniken und Servierregeln mit fotorealistischen Vorlagen.' : 
          'Professional table setting blueprints, cover architecture, glassware hierarchy, napkin folding craft, and service etiquette with photo inspiration.'}
      </p>
    </div>

    <!-- 1. Interactive Table Cover Scheme Visualizer -->
    <div class="detail-section" style="margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
        <h3 class="detail-section-title" style="margin: 0;">📐 ${isDe ? 'Eindeck-Schemata (Vorlagen)' : 'Table Setting Blueprints'}</h3>
        
        <!-- Scheme Switcher Buttons -->
        <div style="display: flex; gap: 6px;">
          <button onclick="setServiceSchema('gala')" class="btn-subtle" style="padding: 4px 10px; border-radius: 8px; font-size: 0.78rem; font-weight: 700; background: ${currentServiceSchema === 'gala' ? 'var(--accent-gold)' : 'var(--bg-surface-variant)'}; color: ${currentServiceSchema === 'gala' ? '#000' : 'var(--text-primary)'}; border: 1px solid var(--border-subtle); cursor: pointer;">
            ${isDe ? 'Gala (5-Gänge)' : 'Gala Dinner'}
          </button>
          <button onclick="setServiceSchema('alacarte')" class="btn-subtle" style="padding: 4px 10px; border-radius: 8px; font-size: 0.78rem; font-weight: 700; background: ${currentServiceSchema === 'alacarte' ? 'var(--accent-gold)' : 'var(--bg-surface-variant)'}; color: ${currentServiceSchema === 'alacarte' ? '#000' : 'var(--text-primary)'}; border: 1px solid var(--border-subtle); cursor: pointer;">
            ${isDe ? 'À-la-carte' : 'À la carte'}
          </button>
          <button onclick="setServiceSchema('breakfast')" class="btn-subtle" style="padding: 4px 10px; border-radius: 8px; font-size: 0.78rem; font-weight: 700; background: ${currentServiceSchema === 'breakfast' ? 'var(--accent-gold)' : 'var(--bg-surface-variant)'}; color: ${currentServiceSchema === 'breakfast' ? '#000' : 'var(--text-primary)'}; border: 1px solid var(--border-subtle); cursor: pointer;">
            ${isDe ? 'Frühstück' : 'Breakfast'}
          </button>
        </div>
      </div>

      <!-- Rendered SVG Schema -->
      <div style="margin-bottom: 14px;">
        ${activeSvg}
      </div>

      <div style="background: var(--bg-surface-variant); padding: 12px; border-radius: var(--radius-md); font-size: 0.83rem; line-height: 1.5; color: var(--text-secondary); border: 1px solid var(--border-subtle);">
        • <strong>${isDe ? 'Abstand zur Tischkante:' : 'Margin from Edge:'}</strong> ${isDe ? 'Genau 1 bis 2 cm (zwei Daumenbreiten) für Teller und Besteckstiele.' : 'Strictly 1 to 2 cm (two thumbs) for plates and cutlery handles.'}<br/>
        • <strong>${isDe ? 'Besteck-Reihenfolge:' : 'Cutlery Sequence:'}</strong> ${isDe ? 'Grundsätzlich von außen nach innen zum Teller hin gangweise arbeiten.' : 'Work from the outermost cutlery inward toward the plate.'}<br/>
        • <strong>${isDe ? 'Richtglas-Prinzip:' : 'Anchor Goblet:'}</strong> ${isDe ? 'Das Haupt-Wasserglas steht exakt senkrecht über der Spitze des Fleischmessers; die Weinkelche reihen sich im 45°-Winkel schräg rechts darunter an.' : 'Water goblet stands precisely above the dinner knife tip; wine stems slope down diagonally at 45 degrees.'}
      </div>
    </div>

    <!-- 2. Photo Reference Gallery -->
    <div class="detail-section" style="margin-bottom: 16px;">
      <h3 class="detail-section-title" style="margin-bottom: 12px;">📸 ${isDe ? 'Fotogalerie & Praxis-Vorlagen' : 'Photo Reference Library & Setting Standards'}</h3>
      
      <!-- Photo 1: Banquet Table -->
      <div style="background: var(--bg-surface-variant); border-radius: 12px; overflow: hidden; margin-bottom: 14px; border: 1px solid var(--border-subtle);">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80" alt="Gala Table Setting" style="width: 100%; height: 180px; object-fit: cover; display: block;" />
        <div style="padding: 12px;">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--accent-gold); margin-bottom: 4px;">
            ${isDe ? 'Festliche Gala-Tafel & Couvert-Architektur' : 'Gala Dinner Banquet & Setting Architecture'}
          </h4>
          <p style="font-size: 0.82rem; color: var(--text-secondary); margin: 0;">
            ${isDe ? 'Makellose Symmetrie, gebügelte Tischwäsche mit 25-30 cm Überhang, glänzendes Tafelsilber und zentrierte Stoffservietten.' : 'Pristine symmetry, ironed linen tablecloth with 25-30 cm drop, polished silverware and centered napkins.'}
          </p>
        </div>
      </div>

      <!-- Photo 2: Glassware Hierarchy -->
      <div style="background: var(--bg-surface-variant); border-radius: 12px; overflow: hidden; margin-bottom: 14px; border: 1px solid var(--border-subtle);">
        <img src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&auto=format&fit=crop&q=80" alt="Glassware Hierarchy" style="width: 100%; height: 180px; object-fit: cover; display: block;" />
        <div style="padding: 12px;">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--accent-gold); margin-bottom: 4px;">
            ${isDe ? 'Kristallgläser-Hierarchie & Anordnung' : 'Crystal Glassware Hierarchy & Stem Alignment'}
          </h4>
          <p style="font-size: 0.82rem; color: var(--text-secondary); margin: 0;">
            ${isDe ? 'Wasserglas über der Messerspitze, gefolgt von Rotweinkelch, Weißweinkelch und Dessert-/Sektkelch im 45°-Winkel.' : 'Water goblet at knife tip, followed by red wine bowl, white wine stem, and dessert flute at 45 degrees.'}
          </p>
        </div>
      </div>

      <!-- Photo 3: Napkin Folds -->
      <div style="background: var(--bg-surface-variant); border-radius: 12px; overflow: hidden; margin-bottom: 14px; border: 1px solid var(--border-subtle);">
        <img src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&auto=format&fit=crop&q=80" alt="Napkin Folding" style="width: 100%; height: 180px; object-fit: cover; display: block;" />
        <div style="padding: 12px;">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--accent-gold); margin-bottom: 4px;">
            ${isDe ? 'Serviettenfaltkunst & Hygiene-Schutz' : 'Napkin Folding Art & Sanitary Protection'}
          </h4>
          <p style="font-size: 0.82rem; color: var(--text-secondary); margin: 0;">
            ${isDe ? 'Bischofsmütze, Tafelspitz und Bestecktasche. Wichtig: Mundberührungsflächen beim Falten niemals mit bloßen Fingern berühren!' : 'Bishop’s Hat, Fan, and Cutlery Pouch. Critical: Never touch mouth-contact areas during folding!'}
          </p>
        </div>
      </div>

      <!-- Photo 4: Service Etiquette -->
      <div style="background: var(--bg-surface-variant); border-radius: 12px; overflow: hidden; border: 1px solid var(--border-subtle);">
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80" alt="Service Presentation" style="width: 100%; height: 180px; object-fit: cover; display: block;" />
        <div style="padding: 12px;">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--accent-gold); margin-bottom: 4px;">
            ${isDe ? 'Präsentations- und Einsetz-Etikette' : 'Presentation & Serving Etiquette'}
          </h4>
          <p style="font-size: 0.82rem; color: var(--text-secondary); margin: 0;">
            ${isDe ? 'Speisen und Getränke grundsätzlich von der rechten Seite des Gastes einsetzen. Leere Teller von links abräumen.' : 'Serve food and beverages strictly from the guest’s right side. Clear empty courses from the left.'}
          </p>
        </div>
      </div>
    </div>

    <!-- 3. Dedicated Service Knowledge Entries (From Database) -->
    <div class="detail-section">
      <h3 class="detail-section-title" style="margin-bottom: 12px;">📖 ${isDe ? '3. Fachartikel: Service & Tischkultur' : '3. Reference Entries: Service & Table Culture'}</h3>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        ${renderServiceCatalogItems(isDe)}
      </div>
    </div>
  `;
}

function renderServiceCatalogItems(isDe) {
  const serviceItems = items.filter(it => it.category === 'service' || it.category === 'non_food');
  if (serviceItems.length === 0) {
    return `<p style="font-size: 0.85rem; color: var(--text-muted);">${isDe ? 'Keine Service-Einträge gefunden.' : 'No service entries found.'}</p>`;
  }

  return serviceItems.map(it => {
    const title = isDe ? (it.nameDe || it.nameEn) : (it.nameEn || it.nameDe);
    const sub = isDe ? (it.subtitleDe || it.subtitleEn) : (it.subtitleEn || it.subtitleDe);
    const science = isDe ? (it.scienceDe || it.scienceExplainedDe || '') : (it.scienceExplainedEn || it.scienceDe || '');
    const culinary = isDe ? (it.culinaryDe || it.culinaryServingDe || '') : (it.culinaryServingEn || it.culinaryEn || '');
    const imgUrl = it.imageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80';

    return `
      <div style="background: var(--bg-surface-variant); border-radius: 12px; padding: 12px; border: 1px solid var(--border-subtle); display: flex; gap: 12px; align-items: flex-start;">
        <img src="${imgUrl}" alt="${title}" style="width: 75px; height: 75px; object-fit: cover; border-radius: 8px; flex-shrink: 0;" />
        <div style="flex: 1; min-width: 0;">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">${title}</h4>
          <p style="font-size: 0.8rem; color: var(--accent-gold); font-weight: 600; margin-bottom: 6px;">${sub}</p>
          <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 8px;">${science || culinary}</p>
          <button onclick="showItemDetail('${it.id}')" style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 6px; font-size: 0.76rem; font-weight: 700; background: var(--bg-surface); border: 1px solid var(--border-subtle); color: var(--accent-gold); cursor: pointer;">
            <span class="material-symbols-outlined" style="font-size: 15px;">visibility</span>
            <span>${isDe ? 'Im Detail ansehen' : 'View Full Details'}</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function renderScienceGuide(isDe) {
  const el = document.getElementById('scienceGuideContent');
  if (!el) return;
  el.innerHTML = `
    <!-- Back to Overview Button -->
    <div style="margin-bottom: 14px;">
      <button onclick="switchTab('home')" class="btn-subtle" style="display:inline-flex; align-items:center; gap:6px; padding:6px 14px; border-radius:20px; font-size:0.82rem; font-weight:700; background:var(--bg-surface-variant); border:1px solid var(--border-subtle); color:var(--text-secondary); cursor:pointer;">
        <span class="material-symbols-outlined" style="font-size:16px;">arrow_back</span>
        <span>${isDe ? 'Zurück zur Übersicht' : 'Back to Overview'}</span>
      </button>
    </div>
    <div class="detail-section" style="margin-bottom: 16px;">
      <h2 style="font-size: 1.25rem; font-weight: 800; color: var(--accent-gold); margin-bottom: 8px;">
        🔬 ${isDe ? 'Wirkungslehre & Gastronomie-Physik' : 'Science & Culinary Physics'}
      </h2>
      <p style="font-size: 0.88rem; color: var(--text-secondary);">
        ${isDe ? 
          'Die chemischen und biologischen Vorgänge hinter Gärung, Destillation, Kohlensäure, Milch- und Eierkunde verständlich erklärt.' : 
          'Chemical and biological principles behind fermentation, distillation, carbonation, milk science, and HACCP food safety.'}
      </p>
    </div>

    <div class="detail-section" style="margin-bottom: 14px;">
      <h3 class="detail-section-title">⚗️ ${isDe ? 'Destillation vs. Fermentation' : 'Distillation vs. Fermentation'}</h3>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Fermentation (Gärung):' : 'Fermentation:'}</strong> ${isDe ? 
          'Hefen wandeln Einfachzucker (Fruktose, Glukose) unter Sauerstoffabschluss in Ethanol und CO2 um (Bier max. 12%, Wein max. 16%).' : 
          'Yeasts metabolize simple sugars anaerobically into ethanol and CO2 (beer max ~12%, wine max ~16%).'}<br/>
        • <strong>${isDe ? 'Destillation (Brennen):' : 'Distillation:'}</strong> ${isDe ? 
          'Trennt Alkohol (Siedepunkt 78,3°C) vom Wasser (100°C) durch kontrolliertes Verdampfen und anschließendes Kondensieren in Kupferkühlern.' : 
          'Separates volatile ethanol (boiling point 78.3°C) from water (100°C) through thermal vaporization and copper condensation.'}
      </p>
    </div>

    <div class="detail-section" style="margin-bottom: 14px;">
      <h3 class="detail-section-title">🫧 ${isDe ? 'Kohlensäure & Henry-Gesetz' : 'Carbonation & Henry\'s Law'}</h3>
      <p class="detail-section-text">
        ${isDe ? 
          'Gase lösen sich in kalten Flüssigkeiten physikalisch viel stabiler als in warmen. Eiskaltes Mineralwasser oder Tonic bindet CO2 fest im Glas; bei Erwärmung perlt es explosionsartig aus.' : 
          'Gas solubility increases inversely with temperature. Chilled tonic or soda retains carbonation tightly; warm liquids release bubbles prematurely.'}
      </p>
    </div>

    <div class="detail-section" style="margin-bottom: 14px;">
      <h3 class="detail-section-title">🍳 ${isDe ? 'Eier-Chemie: 62°C vs. 68°C' : 'Egg Coagulation: 62°C vs. 68°C'}</h3>
      <p class="detail-section-text">
        ${isDe ? 
          'Eiklar gerinnt bei 62–65°C; Eidotter verdickt erst bei 65–70°C. Dieser thermische Abstand ermöglicht das perfekte wachsweiche Frühstücksei (6 Min) und das Onsen-Ei bei 64,5°C.' : 
          'Egg white proteins denature at 62-65°C; egg yolk thickens at 65-70°C. This temperature differential yields perfect soft-boiled and 64.5°C onsen eggs.'}
      </p>
    </div>

    <div class="detail-section" style="margin-bottom: 14px; border-left: 4px solid #ff4757;">
      <h3 class="detail-section-title" style="color: #ff6b81;">⚠️ ${isDe ? 'Lebensmittelsicherheit: Grillen & Brühwürste (Nitrosamine)' : 'Food Safety: Grilling & Cured Sausages (Nitrosamines)'}</h3>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Krebserregende Nitrosamine:' : 'Carcinogenic Nitrosamines:'}</strong> ${isDe ? 
          'Gepökelte Fleischwaren enthalten Natriumnitrit (E250). Bei hohen Temperaturen (>150°C auf dem Grillrost) reagiert Nitrit mit Fleisch-Aminen zu krebserregenden Nitrosaminen.' : 
          'Cured meats contain sodium nitrite (E250). High grilling heat (>150°C) causes nitrites and meat amines to synthesize carcinogenic nitrosamines.'}<br/>
        • <strong>${isDe ? 'Küchen-Regel:' : 'Kitchen Rule:'}</strong> ${isDe ? 
          'Brüh- und Pökelwürste (Wiener, Bockwurst, Leberkäse) nur im Wasserbad bei max. 80°C sieden – niemals grillen! Auf den Grill gehören ausschließlich ungepökelte Rostbratwürste.' : 
          'Poach cured sausages in water under 80°C – never grill directly! Use only fresh, uncured sausages prepared with plain sea salt for barbecue.'}
      </p>
    </div>

    <div class="detail-section" style="margin-bottom: 14px; border-left: 4px solid #2ed573;">
      <h3 class="detail-section-title" style="color: #2ed573;">🛡️ ${isDe ? 'HACCP & Schneidbrett-Farblehre' : 'HACCP Color-Coded Cutting Board Standard'}</h3>
      <p class="detail-section-text">
        ${isDe ? 
          'Strikte Trennung von Rohwaren verhindert Keimverschleppung:<br/>• 🔴 <strong>ROT:</strong> Rohes Fleisch (Rind, Schwein)<br/>• 🟡 <strong>GELB:</strong> Rohes Geflügel (Huhn, Pute – höchste Salmonellengefahr!)<br/>• 🔵 <strong>BLAU:</strong> Roher Fisch & Meeresfrüchte<br/>• 🟢 <strong>GRÜN:</strong> Gemüse, Salate & Obst<br/>• ⚪ <strong>WEISS:</strong> Backwaren, Käse & Milchprodukte<br/>• 🟤 <strong>BRAUN:</strong> Gegartes / gebratenes Fleisch' : 
          'Strict separation prevents bacterial cross-contamination:<br/>• 🔴 <strong>RED:</strong> Raw red meat (beef, pork)<br/>• 🟡 <strong>YELLOW:</strong> Raw poultry (chicken, turkey - high salmonella risk)<br/>• 🔵 <strong>BLUE:</strong> Raw fish & seafood<br/>• 🟢 <strong>GREEN:</strong> Fresh produce, vegetables & fruit<br/>• ⚪ <strong>WHITE:</strong> Bakery & dairy products<br/>• 🟤 <strong>BROWN:</strong> Cooked meats'}
      </p>
    </div>
  `;
}

function renderQuizHeaderStrings(isDe) {
  const title = document.getElementById('quizHeaderTitle');
  if (title) title.textContent = isDe ? '🎯 Multiple-Choice Team-Quiz' : '🎯 Multiple-Choice Team Quiz';

  const desc = document.getElementById('quizHeaderDesc');
  if (desc) desc.textContent = isDe ? 
    'Wähle eine Kategorie oder mixe alle Bereiche für deine 10 Prüfungsfragen:' : 
    'Choose a category or mix all topics for your 10 training questions:';

  const completeTitle = document.getElementById('quizCompleteTitle');
  if (completeTitle) completeTitle.textContent = isDe ? 'Schulung abgeschlossen!' : 'Training Completed!';

  const nameLabel = document.getElementById('quizStaffNameLabel');
  if (nameLabel) nameLabel.textContent = isDe ? 'Dein Name für den Barchef-Bericht:' : 'Your Name for Manager Report:';

  const staffInput = document.getElementById('quizStaffName');
  if (staffInput) staffInput.placeholder = isDe ? 'z.B. Anna Müller (Chef de Rang)' : 'e.g. Alex Miller (Sommelier)';

  const shareBtn = document.getElementById('quizShareBtn');
  if (shareBtn) shareBtn.textContent = isDe ? '📤 Ergebnis an Barchef / Quizmaster senden' : '📤 Send Score to Manager / Quizmaster';

  const restartBtn = document.getElementById('quizRestartBtn');
  if (restartBtn) restartBtn.textContent = isDe ? '🔄 Quiz erneut starten' : '🔄 Restart Quiz Session';
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

function selectCategoryAndOpenCatalog(catId) {
  activeCategory = catId;
  searchQuery = '';
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';

  // Cleanly close the category grid modal
  const modal = document.getElementById('categoryGridModal');
  if (modal) modal.classList.remove('active');

  // Switch to catalog
  switchTab('catalog');
  renderCategoryChips();
  renderCatalog();
  renderQuizCategoryButtons();

  setTimeout(() => {
    const chip = document.querySelector(`.chip[data-cat="${catId}"]`);
    if (chip) {
      chip.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, 80);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCategoryChips() {
  const container = document.getElementById('categoryScroll');
  if (!container) return;
  container.innerHTML = '';
  CATEGORIES_LIST.forEach(cat => {
    const chip = document.createElement('button');
    chip.className = `chip ${activeCategory === cat.id ? 'active' : ''}`;
    chip.setAttribute('data-cat', cat.id);
    const iconSpan = cat.icon ? `<span class="chip-icon material-symbols-outlined">${cat.icon}</span>` : '';
    const label = (currentLang === 'de') ? cat.titleDe : cat.titleEn;
    chip.innerHTML = `${iconSpan}<span>${label}</span>`;
    chip.onclick = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      selectCategoryAndOpenCatalog(cat.id);
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
  if (e) {
    if (e.target && e.target.id !== 'categoryGridModal' && !e.target.classList.contains('modal-close-btn') && e.target.id !== 'categoryModalCloseBtn') {
      return;
    }
  }
  const modal = document.getElementById('categoryGridModal');
  if (modal) modal.classList.remove('active');
}

function renderCategoryGrid() {
  const container = document.getElementById('categoryGridContainer');
  if (!container) return;
  container.innerHTML = '';
  const isDe = (currentLang === 'de');

  CATEGORIES_LIST.forEach(cat => {
    const isSelected = activeCategory === cat.id;
    const item = document.createElement('div');
    item.className = 'cat-grid-card';
    item.style.padding = '12px 10px';
    item.style.borderRadius = '12px';
    item.style.border = isSelected ? '2px solid var(--accent-gold)' : '1px solid var(--border-subtle)';
    item.style.background = isSelected ? 'var(--accent-gold-container)' : 'var(--bg-surface)';
    item.style.cursor = 'pointer';
    item.style.textAlign = 'center';
    item.style.transition = 'all 0.15s ease';
    item.style.display = 'flex';
    item.style.flexDirection = 'column';
    item.style.alignItems = 'center';
    item.style.gap = '6px';

    const count = cat.id === 'all' 
      ? items.length 
      : items.filter(it => it.category === cat.id).length;

    const label = isDe ? cat.titleDe : cat.titleEn;
    const iconHtml = cat.icon ? `<span class="material-symbols-outlined" style="font-size: 26px; color: ${isSelected ? 'var(--accent-gold)' : 'var(--text-secondary)'};">${cat.icon}</span>` : '';

    item.innerHTML = `
      ${iconHtml}
      <div style="font-size: 0.85rem; font-weight: ${isSelected ? '800' : '700'}; color: var(--text-primary); line-height: 1.25;">${label}</div>
      <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 1px;">${count} ${isDe ? 'Einträge' : 'Entries'}</div>
    `;

    item.onclick = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      selectCategoryAndOpenCatalog(cat.id);
    };

    container.appendChild(item);
  });
}

function renderHomeCategoryLauncher() {
  const container = document.getElementById('homeCategoryGrid');
  if (!container) return;
  container.innerHTML = '';
  const isDe = (currentLang === 'de');

  const titleEl = document.getElementById('homeDirectCatTitle');
  if (titleEl) titleEl.textContent = isDe ? 'Direkte Kategorie-Auswahl (24)' : 'Explore Categories Directly (24)';

  const allBtn = document.getElementById('homeDirectCatAllBtn');
  if (allBtn) allBtn.textContent = isDe ? 'Alle anzeigen ➔' : 'View all ➔';

  // The 24 specialized categories
  const specificCats = CATEGORIES_LIST.filter(c => c.id !== 'all');

  specificCats.forEach(cat => {
    const card = document.createElement('div');
    card.style.padding = '12px 10px';
    card.style.borderRadius = '12px';
    card.style.border = '1px solid var(--border-subtle)';
    card.style.background = 'var(--bg-surface-variant)';
    card.style.cursor = 'pointer';
    card.style.transition = 'all 0.15s ease';
    card.style.display = 'flex';
    card.style.alignItems = 'center';
    card.style.gap = '10px';

    const count = items.filter(it => it.category === cat.id).length;
    const label = isDe ? cat.titleDe : cat.titleEn;
    const iconHtml = cat.icon ? `<span class="material-symbols-outlined" style="font-size: 24px; color: var(--accent-gold); flex-shrink: 0;">${cat.icon}</span>` : '';

    card.innerHTML = `
      ${iconHtml}
      <div style="flex: 1; min-width: 0;">
        <div style="font-size: 0.84rem; font-weight: 700; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${label}</div>
        <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 1px;">${count} ${isDe ? 'Einträge' : 'Entries'}</div>
      </div>
      <span class="material-symbols-outlined" style="font-size: 16px; color: var(--text-muted); flex-shrink: 0;">chevron_right</span>
    `;

    card.onmouseover = () => {
      card.style.borderColor = 'var(--accent-gold)';
      card.style.background = 'var(--bg-surface)';
    };
    card.onmouseout = () => {
      card.style.borderColor = 'var(--border-subtle)';
      card.style.background = 'var(--bg-surface-variant)';
    };

    card.onclick = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      selectCategoryAndOpenCatalog(cat.id);
    };

    container.appendChild(card);
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

  if (currentSortOrder === 'fav') {
    filtered.sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0));
  } else if (currentSortOrder === 'az') {
    filtered.sort((a, b) => {
      const nameA = (currentLang === 'de' ? (a.nameDe || a.nameEn) : (a.nameEn || a.nameDe)).toLowerCase();
      const nameB = (currentLang === 'de' ? (b.nameDe || b.nameEn) : (b.nameEn || b.nameDe)).toLowerCase();
      return nameA.localeCompare(nameB, currentLang);
    });
  } else if (currentSortOrder === 'za') {
    filtered.sort((a, b) => {
      const nameA = (currentLang === 'de' ? (a.nameDe || a.nameEn) : (a.nameEn || a.nameDe)).toLowerCase();
      const nameB = (currentLang === 'de' ? (b.nameDe || b.nameEn) : (b.nameEn || b.nameDe)).toLowerCase();
      return nameB.localeCompare(nameA, currentLang);
    });
  }

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
          <span class="badge badge-category" style="display:inline-flex;align-items:center;gap:3px;"><span class="material-symbols-outlined" style="font-size:13px;">${catIconName}</span>${catDisplayName}</span>
          ${item.isImport ? '<span class="badge badge-origin-import" style="display:inline-flex;align-items:center;gap:3px;"><span class="material-symbols-outlined" style="font-size:13px;">flight</span>Import</span>' : '<span class="badge badge-origin-regional" style="display:inline-flex;align-items:center;gap:3px;"><span class="material-symbols-outlined" style="font-size:13px;">eco</span>Regional</span>'}
        </div>
        <button class="card-fav-btn ${item.isFavorite ? 'active' : ''}" onclick="event.stopPropagation(); toggleItemFavorite('${item.id}');" title="Favorit">
          ${item.isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="item-body">
        <div class="item-title-row">
          <h3 class="item-title">${title}</h3>
          ${((item.category === 'spirits' || item.category === 'wine' || item.category === 'beer') && item.abv && !item.abv.startsWith('0.0%') && item.abv !== '0%') ? `<span class="item-abv">${item.abv}</span>` : ''}
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

  // Dynamic Process & Kennwert (strictly separated: spirits/wine/beer show alcohol stats; foods show category & character)
  const isAlcoholItem = (item.category === 'spirits' || item.category === 'wine' || item.category === 'beer') && item.abv && !item.abv.startsWith('0.0%') && item.abv !== '0%';
  let proc = item.alcoholProcess;
  if (!proc || proc === 'NONE') {
    if (item.category === 'spirits') proc = 'DISTILLATION';
    else if (item.category === 'wine') proc = 'FERMENTATION';
    else if (item.category === 'beer') proc = 'BREWING';
    else proc = 'NONE';
  }
  const procMap = {
    'DISTILLATION': isDe ? '🥃 Destillation' : '🥃 Distillation',
    'FERMENTATION': isDe ? '🍷 Fermentation' : '🍷 Fermentation',
    'BREWING': isDe ? '🍺 Brauen & Maischen' : '🍺 Brewing',
    'FORTIFIED': isDe ? '🍷 Aufgespritet' : '🍷 Fortified',
    'NONE': isDe ? '🌱 Frische / Küche' : '🌱 Culinary Fresh'
  };
  const procEl = document.getElementById('detailProcess');
  const procLabel = document.getElementById('detailProcessLabel');
  if (procLabel) procLabel.textContent = isAlcoholItem ? (isDe ? 'Verfahren' : 'Process') : (isDe ? 'Kategorie' : 'Category');
  if (procEl) procEl.textContent = isAlcoholItem ? (procMap[proc] || proc) : (catObj ? (isDe ? catObj.titleDe : catObj.titleEn) : (isDe ? 'Kulinarik' : 'Culinary'));

  const kwEl = document.getElementById('detailKennwert');
  const kwLabel = document.getElementById('detailKennwertLabel');
  if (kwLabel) kwLabel.textContent = isAlcoholItem ? (isDe ? 'Alkoholgehalt' : 'Alcohol by Vol') : (isDe ? 'Charakter' : 'Character');
  if (kwEl) {
    if (isAlcoholItem) {
      kwEl.textContent = item.abv;
    } else {
      kwEl.textContent = item.isImport ? (isDe ? 'International' : 'Import') : (isDe ? 'Klassiker / Regional' : 'Classic / Regional');
    }
  }

  // Dynamic ABV top badge
  const abvEl = document.getElementById('detailAbv');
  if (abvEl) {
    if (isAlcoholItem) {
      abvEl.style.display = 'inline-block';
      abvEl.textContent = item.abv;
    } else {
      abvEl.style.display = 'none';
      abvEl.textContent = '';
    }
  }

  // Dynamic Translation of Detail Modal Section Headers
  const originLabel = document.getElementById('detailOriginLabel');
  if (originLabel) originLabel.textContent = isDe ? 'Herkunft' : 'Origin';

  const faqTitle = document.getElementById('detailFaqTitle');
  if (faqTitle) faqTitle.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px;">help_outline</span><span>${isDe ? 'Gastfragen souverän beantworten' : 'How to Answer Guest Inquiries'}</span>`;

  const scienceTitle = document.getElementById('detailScienceTitle');
  if (scienceTitle) scienceTitle.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px;">science</span><span>${isDe ? 'Wissenschaft & Herstellung' : 'Science & Production Breakdown'}</span>`;

  const rawTitle = document.getElementById('detailRawMaterialTitle');
  if (rawTitle) rawTitle.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px;">spa</span><span>${isDe ? 'Rohstoffe & Botanicals' : 'Raw Materials & Botanicals'}</span>`;

  const tasteTitle = document.getElementById('detailTasteTitle');
  if (tasteTitle) tasteTitle.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px;">restaurant</span><span>${isDe ? 'Sensorik & Geschmacksprofil' : 'Sensory & Tasting Notes'}</span>`;

  const culinaryTitle = document.getElementById('detailCulinaryTitle');
  if (culinaryTitle) culinaryTitle.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px;">local_bar</span><span>${isDe ? 'Servierempfehlung & Gastronomie-Einsatz' : 'Service & Culinary Applications'}</span>`;

  const allergenTitle = document.getElementById('detailAllergenTitle');
  if (allergenTitle) allergenTitle.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px;">warning</span><span>${isDe ? 'Allergen- & Inhaltsstoffhinweis (EU)' : 'Allergen & Ingredient Notice (EU)'}</span>`;

  // Content sections
  const faqEl = document.getElementById('detailFaq');
  if (faqEl) faqEl.textContent = faq || (isDe ? 'Unsere exklusive Hausspezialität, sorgfältig ausgewählt für erstklassigen Genuss.' : 'Curated house specialty selected for premium enjoyment.');

  const sciEl = document.getElementById('detailScience');
  if (sciEl) sciEl.textContent = science || (isDe ? 'Zubereitung nach traditionellen gastronomischen Handwerksstandards.' : 'Prepared according to traditional gastronomy standards.');

  const rawEl = document.getElementById('detailRawMaterial');
  const rawBox = document.getElementById('detailRawMaterialBox');
  if (rawEl) {
    rawEl.textContent = raw || (isDe ? 'Ausgewählte Gastronomie-Zutaten' : 'Curated ingredients');
    if (rawBox) rawBox.style.display = raw ? 'block' : 'none';
  }

  const tasteEl = document.getElementById('detailTaste');
  const tasteBox = document.getElementById('detailTasteBox');
  if (tasteEl) {
    tasteEl.textContent = taste || (isDe ? 'Ausgewogenes, sortentypisches Aromenspiel.' : 'Balanced varietal flavor profile.');
    if (tasteBox) tasteBox.style.display = taste ? 'block' : 'none';
  }

  const culEl = document.getElementById('detailCulinary');
  const culBox = document.getElementById('detailCulinaryBox');
  if (culEl) {
    culEl.textContent = culinary || (isDe ? 'Im passenden Glas bei optimaler Serviertemperatur anreichen.' : 'Serve in appropriate glassware at optimal temperature.');
    if (culBox) culBox.style.display = culinary ? 'block' : 'none';
  }

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

  const tabBtn = document.getElementById(`tab-${tabId}`);
  if (tabBtn) tabBtn.classList.add('active');
  const targetPane = document.getElementById(`pane-${tabId}`);
  if (targetPane) targetPane.classList.add('active');

  const isDe = (currentLang === 'de');
  if (tabId === 'home') renderHomeCategoryLauncher();
  if (tabId === 'cocktails') renderCocktailsGuide(isDe);
  if (tabId === 'service') renderServiceGuide(isDe);
  if (tabId === 'wine') renderWineGuide(isDe);
  if (tabId === 'coffee') renderCoffeeGuide(isDe);
  if (tabId === 'science') renderScienceGuide(isDe);
  if (tabId === 'quiz') renderQuizHeaderStrings(isDe);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupEventListeners() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderCatalog();
    });
    searchInput.addEventListener('change', (e) => {
      addSearchHistory(e.target.value);
    });
    searchInput.addEventListener('focus', () => {
      renderSearchHistory();
    });
  }
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

// ==========================================
// SEARCH HISTORY & IN PREPARATION MODAL
// ==========================================
const STORAGE_KEY_SEARCH_HISTORY = 'gastrodex_search_history';

function getSearchHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_SEARCH_HISTORY)) || [];
  } catch(e) {
    return [];
  }
}

function addSearchHistory(query) {
  if (!query || query.trim().length < 2) return;
  let history = getSearchHistory();
  history = history.filter(q => q.toLowerCase() !== query.toLowerCase());
  history.unshift(query.trim());
  if (history.length > 5) history = history.slice(0, 5);
  localStorage.setItem(STORAGE_KEY_SEARCH_HISTORY, JSON.stringify(history));
  renderSearchHistory();
}

function renderSearchHistory() {
  const container = document.getElementById('searchHistoryContainer');
  if (!container) return;
  const history = getSearchHistory();
  if (history.length === 0) {
    container.style.display = 'none';
    return;
  }
  container.style.display = 'flex';
  const isDe = (currentLang === 'de');
  container.innerHTML = `<span style="font-size:0.75rem; color:var(--text-muted); width:100%; margin-bottom:2px;">${isDe ? 'Letzte Suchen:' : 'Recent searches:'}</span>` + history.map(q => `
    <button onclick="selectSearchHistory('${q}')" style="background: var(--bg-surface-variant); border: 1px solid var(--border-subtle); color: var(--text-secondary); font-size: 0.78rem; padding: 3px 10px; border-radius: 12px; cursor: pointer;">
      🕒 ${q}
    </button>
  `).join('');
}

function selectSearchHistory(q) {
  const input = document.getElementById('searchInput');
  if (input) {
    input.value = q;
    searchQuery = q;
    renderCatalog();
    const container = document.getElementById('searchHistoryContainer');
    if (container) container.style.display = 'none';
  }
}

function openInPreparationModal(sectionName) {
  const modal = document.getElementById('inPrepModal');
  const titleEl = document.getElementById('inPrepTitle');
  const textEl = document.getElementById('inPrepText');
  const isDe = (currentLang === 'de');
  if (titleEl) titleEl.textContent = isDe ? "In Vorbereitung" : "Coming Soon";
  if (textEl) textEl.textContent = isDe 
    ? `Der Bereich "${sectionName}" wird aktuell ausgearbeitet und steht in Kürze zur Verfügung.` 
    : `The section "${sectionName}" is currently under development and will be available soon.`;
  if (modal) modal.classList.add('active');
}

function closeInPrepModal(e) {
  if (!e || e.target.id === 'inPrepModal' || e.target.tagName === 'BUTTON') {
    const modal = document.getElementById('inPrepModal');
    if (modal) modal.classList.remove('active');
  }
}

