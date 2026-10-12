
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
  renderCatalog();
  setupEventListeners();
  initQuizSession('all', 10);
  updateCoffeeComparison();
  updateCoffeeComparison();
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

  const homeRecipes = document.getElementById('homeCardRecipes');
  if (homeRecipes) homeRecipes.textContent = isDe ? "Basis-Rezepte" : "Basic Recipes";
  const homeRecipesSub = document.getElementById('homeCardRecipesSub');
  if (homeRecipesSub) homeRecipesSub.textContent = isDe ? "In Vorbereitung" : "Coming Soon";
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

function renderCocktailsGuide(isDe) {
  const el = document.getElementById('cocktailsGuideContent');
  if (!el) return;
  el.innerHTML = `
    <div class="detail-section" style="margin-bottom: 16px;">
      <h2 style="font-size: 1.25rem; font-weight: 800; color: var(--accent-gold); margin-bottom: 8px;">
        🍸 ${isDe ? 'Cocktails, Longdrinks & Bar-Technik' : 'Cocktails, Highballs & Bar Technique'}
      </h2>
      <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">
        ${isDe ? 
          'Klassische Bar-Rezepte, Highball-Balance, Eis-Physik und die grundlegenden Handgriffe professioneller Bartender.' : 
          'Classic bar recipes, highball balance, ice thermodynamics, and fundamental mixology techniques.'}
      </p>
    </div>

    <div class="detail-section" style="margin-bottom: 14px;">
      <h3 class="detail-section-title">🧊 ${isDe ? 'Eis-Physik & Glas-Kompensation' : 'Ice Thermodynamics & Glass Pre-Chilling'}</h3>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Großes Eis vs. Schmelzwasser:' : 'Large Ice Blocks vs. Dilution:'}</strong> ${isDe ? 
          'Große, kristallklare Eiswürfel oder Sphären besitzen ein geringeres Oberflächen-zu-Volumen-Verhältnis. Sie schmelzen extrem langsam, kühlen den Drink maximal und verhindern Verwässern.' : 
          'Large crystal-clear ice blocks possess a low surface-to-volume ratio, chilling drinks rapidly with minimal dilution.'}<br/>
        • <strong>${isDe ? 'Glas-Vorkühlung:' : 'Glass Pre-Chilling:'}</strong> ${isDe ? 
          'Ein vorgekühltes Ballonglas oder Tumbler verhindert den thermischen Schock beim Eingießen und hält Kohlensäure länger im Getränk gebunden.' : 
          'Pre-chilled glassware prevents thermal shock and preserves carbonation.'}
      </p>
    </div>

    <div class="detail-section" style="margin-bottom: 14px;">
      <h3 class="detail-section-title">🍹 ${isDe ? 'Klassische Longdrink-Standards' : 'Classic Highball & Cocktail Standards'}</h3>
      <p class="detail-section-text">
        • <strong>Gin & Tonic:</strong> ${isDe ? 
          '5 cl Dry Gin, 150-200 ml Premium Tonic Water, reichlich massives Eis, frische botanische Garnitur (Zitruszeste, Rosmarinzweig oder Gurke).' : 
          '5 cl dry gin, 150-200 ml premium tonic, abundant solid ice, fresh botanical garnish.'}<br/>
        • <strong>Moscow Mule:</strong> ${isDe ? 
          '5 cl Vodka, 2 cl frischer Limettensaft, 150 ml würziges Ginger Beer, Gurkenscheibe & Minze im eiskalten Kupferbecher.' : 
          '5 cl vodka, 2 cl fresh lime juice, 150 ml spicy ginger beer, cucumber wheel & mint in a chilled copper mug.'}<br/>
        • <strong>Negroni (IBA Official):</strong> ${isDe ? 
          'Zu gleichen Teilen (je 3 cl) London Dry Gin, Roter Wermut (Vermouth Rosso) und Campari; auf Eis im Rührglas gerührt, mit Orangenzeste im Tumbler serviert.' : 
          'Equal parts (3 cl each) gin, sweet vermouth, and Campari; stirred with ice and garnished with orange peel.'}
      </p>
    </div>

    <div class="detail-section">
      <h3 class="detail-section-title">🥄 ${isDe ? 'Rühren (Stir) vs. Schütteln (Shake)' : 'Stirring vs. Shaking Technique'}</h3>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Rühren (Stir):' : 'Stirring:'}</strong> ${isDe ? 
          'Für Drinks aus rein klaren Spirituosen ohne Zitrussaft oder Eiweiß (z.B. Martini, Negroni, Manhattan). Verhindert Trübung und Luftblasen für eine seidige, glasklare Textur.' : 
          'For spirit-only cocktails without citrus or egg (Martini, Negroni, Manhattan). Preserves silky clarity and velvet mouthfeel.'}<br/>
        • <strong>${isDe ? 'Schütteln (Shake):' : 'Shaking:'}</strong> ${isDe ? 
          'Für Rezepte mit Zitrussäften, Eiweiß, Sahne oder Pürees (z.B. Whiskey Sour, Daiquiri). Kühlt blitzschnell ab und erzeugt durch Belüftung eine feine, cremige Schaumkrone.' : 
          'For drinks containing citrus juices, egg whites, cream, or syrups (Whiskey Sour, Daiquiri). Chills instantly and aerates to create a luscious frothy head.'}
      </p>
    </div>
  `;
}

function renderServiceGuide(isDe) {
  const el = document.getElementById('serviceCultureContent');
  if (!el) return;
  el.innerHTML = `
    <div class="detail-section" style="margin-bottom: 16px;">
      <h2 style="font-size: 1.25rem; font-weight: 800; color: var(--accent-gold); margin-bottom: 8px;">
        🛎️ ${isDe ? 'Service & Tischkultur (Eindecken, Gläser & Knigge)' : 'Service & Table Culture (Setting, Glassware & Etiquette)'}
      </h2>
      <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">
        ${isDe ? 
          'Professionelles Eindecken, Menü-Hierarchien, Besteckkunde, Servietten-Faltregeln und Weinservice-Standards im Restaurant.' : 
          'Professional table setting, cutlery logic, glassware hierarchy, napkin etiquette, and wine service standards.'}
      </p>
    </div>

    <div class="detail-section" style="margin-bottom: 14px;">
      <h3 class="detail-section-title">🍽️ ${isDe ? 'Professionelle Tisch-Eindeckung' : 'Professional Table Setting Protocol'}</h3>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Abstand zur Tischkante:' : 'Table Edge Distance:'}</strong> ${isDe ? 
          'Genormte 1 bis 2 cm (entspricht ca. zwei Fingerbreiten bzw. Daumenbreite).' : 
          'Standard 1 to 2 cm (approx. two finger breadths from the edge).'}<br/>
        • <strong>${isDe ? 'Besteck-Logik:' : 'Cutlery Sequence:'}</strong> ${isDe ? 
          'Von außen nach innen arbeiten. Der erste Gang liegt ganz außen. Gabeln stets links, Messer (Schneide immer nach innen zum Teller) und Suppenlöffel rechts.' : 
          'Work from outside in. First course is outermost. Forks on the left, knives (cutting edge inward facing plate) and soup spoon on the right.'}<br/>
        • <strong>${isDe ? 'Brotteller & Buttermesser:' : 'Bread Plate & Butter Knife:'}</strong> ${isDe ? 
          'Steht links neben dem Couvert. Das Buttermesser liegt auf der rechten Kante des Brottellers mit Klinge nach links.' : 
          'Positioned left of the cover. Butter spreader lies on the right edge with blade facing left.'}<br/>
        • <strong>${isDe ? 'Dessertbesteck:' : 'Dessert Cutlery:'}</strong> ${isDe ? 
          'Oberhalb des Platztellers platziert. Löffel zeigt nach links (Griff rechts), Gabel darunter zeigt nach rechts (Griff links).' : 
          'Above the show plate. Spoon points left (handle right), fork points right (handle left).'}
      </p>
    </div>

    <div class="detail-section" style="margin-bottom: 14px;">
      <h3 class="detail-section-title">🍷 ${isDe ? 'Gläser-Hierarchie & Anordnung' : 'Glassware Arrangement & Hierarchy'}</h3>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Richtglas:' : 'Anchor Glass:'}</strong> ${isDe ? 
          'Das Haupt-Wasserglas (oder Hauptweinglas) steht exakt über der Spitze des großen Fleischmessers.' : 
          'Water goblet positioned precisely above the tip of the dinner knife.'}<br/>
        • <strong>${isDe ? 'Diagonale Aufstellung (Klassiker):' : 'Diagonal Setting (Classic):'}</strong> ${isDe ? 
          'Vom Wasserglas ausgehend schräg nach rechts unten im 45°-Winkel: Rotweinglas, Weißweinglas, optional Champagnerflöte.' : 
          'From water glass sloping down right at 45 degrees: red wine glass, white wine glass, champagne flute.'}<br/>
        • <strong>${isDe ? 'Dreiecks-Aufstellung:' : 'Triangle Setting:'}</strong> ${isDe ? 
          'Kompakte Eleganz für Rundtische: Wasserglas hinten, Rotweinglas vorne links, Weißweinglas vorne rechts.' : 
          'Compact elegance for round tables: water back, red wine front left, white wine front right.'}
      </p>
    </div>

    <div class="detail-section" style="margin-bottom: 14px;">
      <h3 class="detail-section-title">🍴 ${isDe ? 'Vorlegebesteck & Kreuzkontaminationsschutz' : 'Serving Cutlery & Anti-Contamination Rules'}</h3>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Strikte Zuordnung:' : 'Strict Separation:'}</strong> ${isDe ? 
          'Jede Platte und Schüssel erhält ein eigenes, fest zugeordnetes Vorlegebesteck (Salatzange, Tortenheber, Suppenkelle).' : 
          'Every platter receives its dedicated serving utensil (tongs, cake server, ladle).'}<br/>
        • <strong>${isDe ? 'Allergen- & Keimschutz:' : 'Allergen & Cross-Contamination Guard:'}</strong> ${isDe ? 
          'Niemals Vorlegebestecke zwischen Allergenen (z.B. Nüsse, Milch) oder Roh- und Garwaren vertauschen!' : 
          'Never cross utensils between allergens (nuts, dairy) or raw and cooked items!'}
      </p>
    </div>

    <div class="detail-section">
      <h3 class="detail-section-title">👥 ${isDe ? 'Service-Etikette & Weinservice' : 'Service Etiquette & Wine Presentation'}</h3>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Einsetzen & Servieren:' : 'Placing & Serving:'}</strong> ${isDe ? 
          'Grundsätzlich von der rechten Seite des Gastes mit der rechten Hand. Vorlegeplatten von links präsentieren.' : 
          'Always served from the guest\'s right side with the right hand. Sharing platters presented from the left.'}<br/>
        • <strong>${isDe ? 'Weinservice:' : 'Wine Service:'}</strong> ${isDe ? 
          'Flaschenetikett zeigt stets sichtbar zum Gast. Glas beim Einschenken niemals anheben; Tropfen mit eleganter Drehung und Serviette auffangen.' : 
          'Label kept facing the host. Never lift the glass while pouring; catch drops with a quarter-turn rotation and service cloth.'}<br/>
        • <strong>${isDe ? 'Bestecksprache:' : 'Cutlery Language:'}</strong> ${isDe ? 
          'Parallel auf 20 nach 4 Uhr = Gang beendet, bereit zum Abservieren. Gekreuzt auf dem Teller = kurze Essenspause.' : 
          'Parallel at twenty past four = course finished, ready to clear. Crossed on plate = pausing.'}
      </p>
    </div>
  `;
}

function renderScienceGuide(isDe) {
  const el = document.getElementById('scienceGuideContent');
  if (!el) return;
  el.innerHTML = `
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

