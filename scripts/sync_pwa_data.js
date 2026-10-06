const fs = require('fs');
const path = require('path');

// 1. Run export_catalog.js logic
require('./export_catalog.js');

// 2. Read generated firestore_export.json
const catalog = JSON.parse(fs.readFileSync('firestore_export.json', 'utf8'));
console.log(`Loaded ${catalog.items.length} items, ${catalog.quizQuestions.length} quiz questions, ${catalog.categories.length} categories.`);

// 3. Format items and quiz for app.js
const appJsPath = 'app/src/main/assets/pwa/app.js';
let appJs = fs.readFileSync(appJsPath, 'utf8');

// Replace CATEGORIES
const catStart = appJs.indexOf('const CATEGORIES = [');
if (catStart !== -1) {
  const catEnd = appJs.indexOf('];', catStart) + 2;
  const newCatCode = `const CATEGORIES = ${JSON.stringify(catalog.categories, null, 2)};`;
  appJs = appJs.substring(0, catStart) + newCatCode + appJs.substring(catEnd);
  console.log('Updated CATEGORIES in app.js');
}

// Replace MASTER_ITEMS
const itemsStart = appJs.indexOf('const MASTER_ITEMS = [');
const quizStart = appJs.indexOf('const MASTER_QUIZ = [');
if (itemsStart !== -1 && quizStart !== -1) {
  const newItemsCode = `const MASTER_ITEMS = ${JSON.stringify(catalog.items, null, 2)};\n\n`;
  appJs = appJs.substring(0, itemsStart) + newItemsCode + appJs.substring(quizStart);
  console.log('Updated MASTER_ITEMS in app.js');
}

// Replace MASTER_QUIZ
const newQuizStart = appJs.indexOf('const MASTER_QUIZ = [');
const loadItemsStart = appJs.indexOf('// LOAD & SAVE DATA');
if (newQuizStart !== -1 && loadItemsStart !== -1) {
  const newQuizCode = `const MASTER_QUIZ = ${JSON.stringify(catalog.quizQuestions, null, 2)};\n\n`;
  appJs = appJs.substring(0, newQuizStart) + newQuizCode + appJs.substring(loadItemsStart);
  console.log('Updated MASTER_QUIZ in app.js');
}

// Update loadItems() to merge overrides with MASTER_ITEMS
const oldLoadItems = `function loadItems() {
  const saved = localStorage.getItem(STORAGE_KEY_ITEMS);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch(e) {
      console.error(e);
    }
  }
  return [...MASTER_ITEMS];
}`;

const newLoadItems = `function loadItems() {
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
}`;

if (appJs.includes('function loadItems() {')) {
  const liStart = appJs.indexOf('function loadItems() {');
  const liEnd = appJs.indexOf('let items = loadItems();', liStart);
  if (liStart !== -1 && liEnd !== -1) {
    appJs = appJs.substring(0, liStart) + newLoadItems + '\n\n' + appJs.substring(liEnd);
    console.log('Updated loadItems() to robustly merge MASTER_ITEMS with user overrides.');
  }
}

// Update renderCurrentQuestion in app.js to support both qDe/questionDe, optDe/optionsDe, etc.
appJs = appJs.replace(
  "document.getElementById('quizQuestionText').textContent = isDe ? currentQ.qDe : currentQ.qEn;",
  "document.getElementById('quizQuestionText').textContent = isDe ? (currentQ.qDe || currentQ.questionDe) : (currentQ.qEn || currentQ.questionEn);"
);

appJs = appJs.replace(
  "const opts = isDe ? currentQ.optDe : currentQ.optEn;",
  "const opts = isDe ? (currentQ.optDe || currentQ.optionsDe || []) : (currentQ.optEn || currentQ.optionsEn || []);"
);

appJs = appJs.replace(
  "if (index === currentQ.correct) {",
  "const corr = currentQ.correct !== undefined ? currentQ.correct : currentQ.correctIndex;\n    if (index === corr) {"
);

appJs = appJs.replace(
  "if (index === currentQ.correct) {\n    quizScore++;\n  }",
  "const corr = currentQ.correct !== undefined ? currentQ.correct : currentQ.correctIndex;\n  if (index === corr) {\n    quizScore++;\n  }"
);

appJs = appJs.replace(
  "document.getElementById('quizExpText').textContent = isDe ? currentQ.expDe : currentQ.expEn;",
  "document.getElementById('quizExpText').textContent = isDe ? (currentQ.expDe || currentQ.explDe || currentQ.explanationDe) : (currentQ.expEn || currentQ.explEn || currentQ.explanationEn);"
);

// Save updated app.js to both locations
fs.writeFileSync('app/src/main/assets/pwa/app.js', appJs);
fs.writeFileSync('pwa/app.js', appJs);
console.log('Saved app/src/main/assets/pwa/app.js and pwa/app.js successfully!');

// 4. Update admin.html filter pills and category select
function updateAdminHtml(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');

  // Stats
  html = html.replace(/<div class="val" id="statTotalItems">\d+<\/div>/, `<div class="val" id="statTotalItems">${catalog.items.length}</div>`);
  html = html.replace(/<div class="val" id="statCategories">\d+<\/div>/, `<div class="val" id="statCategories">${catalog.categories.length}</div>`);

  // Filter pills
  const newPills = `    <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 12px; margin-bottom: 16px;" id="adminCatFilterRow">
      <button class="btn-action btn-primary-action" onclick="setAdminCategory('ALL')">Alle (${catalog.items.length})</button>
      <button class="btn-action" onclick="setAdminCategory('spirits')">🥃 Spirituosen</button>
      <button class="btn-action" onclick="setAdminCategory('wine')">🍷 Wein</button>
      <button class="btn-action" onclick="setAdminCategory('tea')">🍵 Tee</button>
      <button class="btn-action" onclick="setAdminCategory('coffee')">☕ Kaffee</button>
      <button class="btn-action" onclick="setAdminCategory('pasta_rice')">🍝 Pasta & Reis</button>
      <button class="btn-action" onclick="setAdminCategory('sauces_condiments')">🥣 Saucen & Senf</button>
      <button class="btn-action" onclick="setAdminCategory('cheese')">🧀 Käse</button>
      <button class="btn-action" onclick="setAdminCategory('dairy')">🥛 Milch</button>
      <button class="btn-action" onclick="setAdminCategory('eggs')">🍳 Eier</button>
      <button class="btn-action" onclick="setAdminCategory('vegetables')">🍄 Gemüse</button>
      <button class="btn-action" onclick="setAdminCategory('fruits')">🍓 Früchte</button>
      <button class="btn-action" onclick="setAdminCategory('nuts')">🥜 Nüsse</button>
      <button class="btn-action" onclick="setAdminCategory('spices_herbs')">🌿 Gewürze</button>
      <button class="btn-action" onclick="setAdminCategory('olives')">🫒 Oliven</button>
      <button class="btn-action" onclick="setAdminCategory('oils_vinegars')">🏺 Öle & Essig</button>
    </div>`;

  const pillsStart = html.indexOf('<div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 12px; margin-bottom: 16px;" id="adminCatFilterRow">');
  if (pillsStart !== -1) {
    const pillsEnd = html.indexOf('</div>', pillsStart) + 6;
    html = html.substring(0, pillsStart) + newPills + html.substring(pillsEnd);
  }

  // Category select options
  const newOptions = `            <select id="category" class="form-control" required>
              <option value="spirits">Spirituosen & Destillate</option>
              <option value="wine">Wein & Schaumweine</option>
              <option value="tea">Teekunde & Aufgüsse</option>
              <option value="coffee">Kaffeespezialitäten</option>
              <option value="pasta_rice">Pasta & Reisvariationen</option>
              <option value="sauces_condiments">Saucen, Dressings & Senf</option>
              <option value="soft_drinks">Softdrinks & Mixer</option>
              <option value="cheese">Käsekunde & DOP / g.U.</option>
              <option value="dairy">Milch & Molkerei-Wissenschaft</option>
              <option value="eggs">Eierspeisen & Eierkunde</option>
              <option value="vegetables">Gemüse & Speisepilze</option>
              <option value="fruits">Früchte & Beeren</option>
              <option value="nuts">Nüsse & Saaten</option>
              <option value="spices_herbs">Gewürze & Kräuter</option>
              <option value="olives">Oliven</option>
              <option value="oils_vinegars">Öle & Essig</option>
            </select>`;

  const selectStart = html.indexOf('<select id="category" class="form-control" required>');
  if (selectStart !== -1) {
    const selectEnd = html.indexOf('</select>', selectStart) + 9;
    html = html.substring(0, selectStart) + newOptions + html.substring(selectEnd);
  }

  fs.writeFileSync(filePath, html);
  console.log(`Updated ${filePath}`);
}

updateAdminHtml('app/src/main/assets/pwa/admin.html');
updateAdminHtml('pwa/admin.html');

console.log('🎉 Sync complete!');
