import json

with open('pwa/app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add scrollCategories function
scroll_code = '''
function scrollCategories(offset) {
  const scrollEl = document.getElementById('categoryScroll');
  if (scrollEl) {
    scrollEl.scrollBy({ left: offset, behavior: 'smooth' });
  }
}
'''

# 2. Add rich interactive coffee comparison logic
coffee_logic = '''
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
'''

# 3. Clean up inventory from app.js
code = code.replace("renderInventoryList();\n", '')
code = code.replace("renderInventoryList();", '')
code = code.replace("document.getElementById('tabInventoryLabel').textContent = isDe ? \"Lagerbestand\" : \"Inventory\";", '')

# Replace item card badges in renderCatalog: remove stock badge, add favorite heart button
old_badges = """      <div class="item-image-wrapper">
        ${imgMarkup}
        <div class="item-badges">
          <span class="badge">${catLabel.split(' ')[0]}</span>
          ${item.isImport ? '<span class="badge">✈️ Import</span>' : '<span class="badge">🌱 Regional</span>'}
        </div>
        <span class="badge-stock ${item.inStock ? 'in-stock' : 'out-stock'}">
          ${item.inStock ? '✓ ' + (currentLang === 'de' ? 'Auf Lager (' + item.stockQuantity + ')' : 'In Stock (' + item.stockQuantity + ')') : (currentLang === 'de' ? 'Nicht vorrätig' : 'Out of Stock')}
        </span>
      </div>"""

new_badges = """      <div class="item-image-wrapper">
        ${imgMarkup}
        <div class="item-badges">
          <span class="badge">${catLabel.split(' ')[0]}</span>
          ${item.isImport ? '<span class="badge">✈️ Import</span>' : '<span class="badge">🌱 Regional</span>'}
        </div>
        <button class="card-fav-btn ${item.isFavorite ? 'active' : ''}" onclick="event.stopPropagation(); toggleItemFavorite('${item.id}');" title="Favorit">
          ${item.isFavorite ? '❤️' : '🤍'}
        </button>
      </div>"""

if old_badges in code:
    code = code.replace(old_badges, new_badges)
    print("Replaced card badges with favorite button!")
else:
    print("Warning: old_badges snippet not found verbatim")

# Add toggleItemFavorite function
toggle_fav_fn = '''
function toggleItemFavorite(id) {
  const it = items.find(i => i.id === id);
  if (!it) return;
  it.isFavorite = !it.isFavorite;
  saveItems();
  renderCatalog();
}
'''

# Put everything together
code = scroll_code + '\n' + toggle_fav_fn + '\n' + coffee_logic + '\n' + code

# Call updateCoffeeComparison on DOMContentLoaded
code = code.replace("initQuizSession('all', 10);", "initQuizSession('all', 10);\n  updateCoffeeComparison();")

with open('pwa/app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated pwa/app.js successfully!")
