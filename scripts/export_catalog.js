const fs = require('fs');
const path = require('path');

const CATEGORIES = [
  { id: 'all', titleDe: '✨ Alle Einträge', titleEn: '✨ All Entries' },
  { id: 'spirits', titleDe: '🥃 Spirituosen & Destillate', titleEn: '🥃 Spirits & Distillates' },
  { id: 'wine', titleDe: '🍷 Wein & Schaumweine', titleEn: '🍷 Wine & Champagne' },
  { id: 'tea', titleDe: '🍵 Teekunde & Aufgüsse', titleEn: '🍵 Tea & Infusions' },
  { id: 'coffee', titleDe: '☕ Kaffeespezialitäten', titleEn: '☕ Coffee Specialties' },
  { id: 'pasta_rice', titleDe: '🍝 Pasta & Reisvariationen', titleEn: '🍝 Pasta & Rice Varieties' },
  { id: 'sauces_condiments', titleDe: '🥣 Saucen, Dressings & Senf', titleEn: '🥣 Sauces, Dressings & Mustard' },
  { id: 'soft_drinks', titleDe: '🥤 Erfrischung & Mixer', titleEn: '🥤 Soft Drinks & Mixers' },
  { id: 'dairy', titleDe: '🥛 Milch & Molkerei', titleEn: '🥛 Dairy & Milk Science' },
  { id: 'cheese', titleDe: '🧀 Käsekunde & g.U.', titleEn: '🧀 Cheese & DOP / g.U.' },
  { id: 'eggs', titleDe: '🍳 Eierspeisen & Eierkunde', titleEn: '🍳 Egg Dishes & Science' },
  { id: 'vegetables', titleDe: '🍄 Gemüse & Speisepilze', titleEn: '🍄 Vegetables & Mushrooms' },
  { id: 'fruits', titleDe: '🍓 Früchte & Beeren', titleEn: '🍓 Fruits & Berries' },
  { id: 'nuts', titleDe: '🥜 Nüsse & Saaten', titleEn: '🥜 Nuts & Seeds' },
  { id: 'spices_herbs', titleDe: '🌿 Gewürze & Kräuter', titleEn: '🌿 Spices & Herbs' },
  { id: 'olives', titleDe: '🫒 Oliven', titleEn: '🫒 Olives' },
  { id: 'oils_vinegars', titleDe: '🏺 Öle & Essig', titleEn: '🏺 Oils & Vinegars' }
];

const kotlinFiles = [
  'app/src/main/java/com/example/data/CuratedSpiritsData.kt',
  'app/src/main/java/com/example/data/CuratedWineData.kt',
  'app/src/main/java/com/example/data/CuratedTeaData.kt',
  'app/src/main/java/com/example/data/CuratedBeveragesData.kt',
  'app/src/main/java/com/example/data/CuratedPastaRiceData.kt',
  'app/src/main/java/com/example/data/CuratedSaucesCondimentsData.kt',
  'app/src/main/java/com/example/data/CuratedProduceData.kt',
  'app/src/main/java/com/example/data/CuratedDairyCheeseEggsData.kt',
  'app/src/main/java/com/example/data/CuratedSpicesHerbsData.kt',
  'app/src/main/java/com/example/data/CuratedOlivesData.kt',
  'app/src/main/java/com/example/data/CuratedOilsVinegarsData.kt'
];

function parseKotlinItems(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const items = [];
  const startRegex = /GastroItem\s*\(/g;
  let match;
  while ((match = startRegex.exec(content)) !== null) {
    const startIndex = match.index + match[0].length;
    let depth = 1;
    let inString = false;
    let quoteChar = '';
    let escape = false;
    let endIndex = startIndex;
    for (let i = startIndex; i < content.length; i++) {
      const c = content[i];
      if (escape) { escape = false; continue; }
      if (c === '\\') { escape = true; continue; }
      if (inString) {
        if (c === quoteChar) inString = false;
        continue;
      }
      if (c === '"') { inString = true; quoteChar = c; continue; }
      if (c === '(') depth++;
      else if (c === ')') {
        depth--;
        if (depth === 0) {
          endIndex = i;
          break;
        }
      }
    }
    const block = content.substring(startIndex, endIndex);

    const getField = (name) => {
      const m = new RegExp('\\b' + name + '\\s*=\\s*"([\\s\\S]*?)"(?:,\\s*|\\s*$)', 'm').exec(block);
      return m ? m[1].replace(/\\"/g, '"') : '';
    };
    const getEnum = (name) => {
      const m = new RegExp('\\b' + name + '\\s*=\\s*GastroCategory\\.([A-Z_]+)').exec(block);
      return m ? m[1].toLowerCase() : '';
    };
    const getBool = (name) => {
      const m = new RegExp('\\b' + name + '\\s*=\\s*(true|false)').exec(block);
      return m ? m[1] === 'true' : false;
    };
    const getList = (name) => {
      const m = new RegExp('\\b' + name + '\\s*=\\s*listOf\\(([\\s\\S]*?)\\)', 's').exec(block);
      if (!m) return [];
      return m[1].split(/",\s*"|",\s*\n\s*"/).map(s => s.trim().replace(/^["\s]+|["\s]+$/g, '')).filter(Boolean);
    };

    const id = getField('id');
    if (!id) continue;

    let cat = getEnum('category');
    if (cat === 'nuts_seeds') cat = 'nuts';

    // Parse coffee layers if present
    let coffeeLayers = null;
    const clMatch = /CoffeeLayers\s*\(([\s\S]*?)\)/.exec(block);
    if (clMatch) {
      const clBlock = clMatch[1];
      const getFloat = (n) => {
        const fm = new RegExp('\\b' + n + '\\s*=\\s*([0-9.]+)[fF]?').exec(clBlock);
        return fm ? parseFloat(fm[1]) : 0;
      };
      const getCLField = (n) => {
        const sm = new RegExp('\\b' + n + '\\s*=\\s*"([^"]*)"').exec(clBlock);
        return sm ? sm[1] : '';
      };
      coffeeLayers = {
        espressoPercent: getFloat('espressoPercent'),
        steamedMilkPercent: getFloat('steamedMilkPercent'),
        milkFoamPercent: getFloat('milkFoamPercent'),
        waterPercent: getFloat('waterPercent'),
        descriptionEn: getCLField('descriptionEn'),
        descriptionDe: getCLField('descriptionDe')
      };
    }

    const item = {
      id,
      category: cat || 'spirits',
      nameEn: getField('nameEn'),
      nameDe: getField('nameDe'),
      subtitleEn: getField('subtitleEn'),
      subtitleDe: getField('subtitleDe'),
      imageUrl: getField('imageUrl'),
      origin: getField('origin'),
      isImport: block.includes('isImport') ? getBool('isImport') : false,
      abv: getField('abv'),
      tasteEn: getField('tasteProfileEn'),
      tasteDe: getField('tasteProfileDe'),
      scienceEn: getField('scienceExplainedEn'),
      scienceDe: getField('scienceExplainedDe'),
      culinaryEn: getField('culinaryServingEn'),
      culinaryDe: getField('culinaryServingDe'),
      faqEn: getField('guestFaqEn'),
      faqDe: getField('guestFaqDe'),
      allergens: getList('allergens').length > 0 ? getList('allergens') : ['None'],
      tags: getList('tags').length > 0 ? getList('tags') : [],
      inStock: true,
      stockQuantity: 5,
      storageLocation: 'Zentrallager',
      isFavorite: false
    };

    if (coffeeLayers) {
      item.coffeeLayers = coffeeLayers;
    }

    items.push(item);
  }
  return items;
}

function parseQuizQuestions(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const questions = [];
  const startRegex = /QuizQuestion\s*\(/g;
  let match;
  while ((match = startRegex.exec(content)) !== null) {
    const startIndex = match.index + match[0].length;
    let depth = 1;
    let inString = false;
    let quoteChar = '';
    let escape = false;
    let endIndex = startIndex;
    for (let i = startIndex; i < content.length; i++) {
      const c = content[i];
      if (escape) { escape = false; continue; }
      if (c === '\\') { escape = true; continue; }
      if (inString) {
        if (c === quoteChar) inString = false;
        continue;
      }
      if (c === '"') { inString = true; quoteChar = c; continue; }
      if (c === '(') depth++;
      else if (c === ')') {
        depth--;
        if (depth === 0) {
          endIndex = i;
          break;
        }
      }
    }
    const block = content.substring(startIndex, endIndex);

    const getField = (name) => {
      const m = new RegExp('\\b' + name + '\\s*=\\s*"([\\s\\S]*?)"(?:,\\s*|\\s*$)', 'm').exec(block);
      return m ? m[1].replace(/\\"/g, '"') : '';
    };
    const getEnum = (name) => {
      const m = new RegExp('\\b' + name + '\\s*=\\s*GastroCategory\\.([A-Z_]+)').exec(block);
      return m ? m[1].toLowerCase() : '';
    };
    const getInt = (name) => {
      const m = new RegExp('\\b' + name + '\\s*=\\s*([0-9]+)').exec(block);
      return m ? parseInt(m[1], 10) : 0;
    };
    const getList = (name) => {
      const m = new RegExp('\\b' + name + '\\s*=\\s*listOf\\(([\\s\\S]*?)\\)(?:,\\s*|\\s*$)', 'm').exec(block);
      if (!m) return [];
      return m[1].split(/",\s*"|",\s*\n\s*"/).map(s => s.trim().replace(/^["\s]+|["\s]+$/g, '')).filter(Boolean);
    };

    const id = getField('id');
    const cat = getEnum('category');
    const qEn = getField('questionEn');
    const qDe = getField('questionDe');
    const optionsEn = getList('optionsEn');
    const optionsDe = getList('optionsDe');
    const correct = getInt('correctIndex');
    const explEn = getField('explanationEn');
    const explDe = getField('explanationDe');

    questions.push({
      id,
      category: cat,
      qEn,
      qDe,
      optEn: optionsEn,
      optDe: optionsDe,
      correct,
      explEn,
      explDe,
      questionEn: qEn,
      questionDe: qDe,
      optionsEn,
      optionsDe,
      correctIndex: correct,
      explanationEn: explEn,
      explanationDe: explDe
    });
  }
  return questions;
}

// 1. Gather all items
const itemsDict = {};
for (const kf of kotlinFiles) {
  if (!fs.existsSync(kf)) {
    console.warn('File not found: ' + kf);
    continue;
  }
  const parsed = parseKotlinItems(kf);
  for (const item of parsed) {
    itemsDict[item.id] = item;
  }
}

const allItems = Object.values(itemsDict);
console.log(`Extracted ${allItems.length} complete curated items across ${kotlinFiles.length} files.`);

// 2. Gather all quiz questions
const quizFile = 'app/src/main/java/com/example/data/CuratedGastroData.kt';
const allQuiz = parseQuizQuestions(quizFile);
console.log(`Extracted ${allQuiz.length} quiz questions from CuratedGastroData.kt.`);

// 3. Construct payloads
const catalogPayload = {
  catalogVersion: 26,
  versionName: 'v2.6 (GastroDex Complete Encyclopedia Live)',
  updatedAt: new Date().toISOString(),
  itemCount: allItems.length,
  categoryCount: CATEGORIES.length,
  quizCount: allQuiz.length,
  categories: CATEGORIES,
  items: allItems,
  quizQuestions: allQuiz
};

const versionPayload = {
  version: 26,
  versionName: 'v2.6 (GastroDex Complete Encyclopedia Live)',
  itemCount: allItems.length,
  categoryCount: CATEGORIES.length,
  quizCount: allQuiz.length,
  updatedAt: new Date().toISOString()
};

fs.writeFileSync('pwa/catalog_latest.json', JSON.stringify(catalogPayload, null, 2));
fs.writeFileSync('app/src/main/assets/pwa/catalog_latest.json', JSON.stringify(catalogPayload, null, 2));
fs.writeFileSync('pwa/catalog_version.json', JSON.stringify(versionPayload, null, 2));
fs.writeFileSync('app/src/main/assets/pwa/catalog_version.json', JSON.stringify(versionPayload, null, 2));
fs.writeFileSync('firestore_export.json', JSON.stringify(catalogPayload, null, 2));

console.log('✅ Successfully wrote catalog_latest.json, catalog_version.json and firestore_export.json!');
