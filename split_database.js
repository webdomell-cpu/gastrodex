const fs = require('fs');
const path = require('path');

const catalogPath = 'pwa/catalog_latest.json';
if (!fs.existsSync(catalogPath)) {
  console.error("catalog_latest.json not found");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const items = data.items || [];

// Ensure database directory exists
const dbDir = 'pwa/database';
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Group items by category
const categoriesMap = {};
items.forEach(item => {
  const cat = item.category || 'other';
  if (!categoriesMap[cat]) {
    categoriesMap[cat] = [];
  }
  categoriesMap[cat].push(item);
});

// Also add a Longdrinks & Service category if not present
if (!categoriesMap['longdrinks_service']) {
  categoriesMap['longdrinks_service'] = [
    {
      id: 'longdrink_gin_tonic',
      category: 'longdrinks_service',
      nameEn: 'Gin & Tonic',
      nameDe: 'Gin & Tonic',
      subtitleEn: 'Highball Classic with Botanical Balance',
      subtitleDe: 'Highball-Klassiker mit botanischer Balance',
      origin: 'UK / Global',
      isImport: true,
      tasteEn: 'Crisp, juniper-forward, effervescent quinine bitterness',
      tasteDe: 'Frisch, Wacholderbetont, prickelnde Chinin-Bitternote',
      culinaryEn: 'Served in a balloon glass or highball with plenty of ice and botanical garnish.',
      culinaryDe: 'Serviert im Ballonglas oder Highball mit reichlich Eis und botanischer Garnitur.',
      tags: ['longdrink', 'bar', 'gin']
    },
    {
      id: 'service_table_coverage',
      category: 'longdrinks_service',
      nameEn: 'Table Coverage & Gastronomy Setup',
      nameDe: 'Tischabdeckung & Service-Standard',
      subtitleEn: 'Professional Restaurant Setting & Cutlery Placement',
      subtitleDe: 'Professionelles Gedeck & Besteckplatzierung',
      origin: 'International Gastronomy',
      isImport: false,
      tasteEn: 'Precision hospitality setup, alignment of cutlery and glassware',
      tasteDe: 'Präzises Gedeck, Ausrichtung von Besteck und Gläsern',
      culinaryEn: 'Fork to the left, knife and spoon to the right, bread plate upper left, water/wine glasses upper right.',
      culinaryDe: 'Gabel links, Messer und Löffel rechts, Teller oben links, Gläser oben rechts.',
      tags: ['service', 'tischabdeckung', 'gastronomie']
    }
  ];
}

const categoryMetaList = [
  { id: 'spirits', titleDe: 'Spirituosen & Bar', titleEn: 'Spirits & Bar', icon: 'liquor' },
  { id: 'wine', titleDe: 'Wein & Schaumwein', titleEn: 'Wine & Sparkling', icon: 'wine_bar' },
  { id: 'beer', titleDe: 'Bier & Braukunst', titleEn: 'Beer & Brewing', icon: 'sports_bar' },
  { id: 'coffee', titleDe: 'Kaffee & Heißgetränke', titleEn: 'Coffee & Hot Drinks', icon: 'coffee' },
  { id: 'fruit', titleDe: 'Obst & Früchte', titleEn: 'Fruit & Produce', icon: 'nutrition' },
  { id: 'vegetables', titleDe: 'Gemüse & Kräuter', titleEn: 'Vegetables & Herbs', icon: 'eco' },
  { id: 'cheese', titleDe: 'Käse & Milchprodukte', titleEn: 'Cheese & Dairy', icon: 'cheese' },
  { id: 'meat', titleDe: 'Fleisch & Delikatessen', titleEn: 'Meat & Delicatessen', icon: 'kebab_dining' },
  { id: 'bakery', titleDe: 'Brot & Backwaren', titleEn: 'Bakery & Pastry', icon: 'bakery_dining' },
  { id: 'longdrinks_service', titleDe: 'Longdrinks & Service', titleEn: 'Longdrinks & Service', icon: 'room_service' }
];

// Write individual JSON files per category
for (const [catKey, catItems] of Object.entries(categoriesMap)) {
  const fileContent = {
    category: catKey,
    count: catItems.length,
    items: catItems
  };
  fs.writeFileSync(path.join(dbDir, `${catKey}.json`), JSON.stringify(fileContent, null, 2), 'utf8');
  console.log(`Created ${catKey}.json with ${catItems.length} items.`);
}

fs.writeFileSync(path.join(dbDir, 'categories.json'), JSON.stringify({ categories: categoryMetaList }, null, 2), 'utf8');
console.log("Created categories.json");
