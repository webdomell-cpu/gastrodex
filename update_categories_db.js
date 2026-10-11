const fs = require('fs');
const path = require('path');

const dbDir = 'pwa/database';
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// 1. Longdrinks & Cocktails JSON
const longdrinksCocktails = {
  category: 'longdrinks_cocktails',
  count: 6,
  items: [
    {
      id: 'cocktail_mojito',
      category: 'longdrinks_cocktails',
      nameEn: 'Mojito',
      nameDe: 'Mojito',
      subtitleEn: 'Cuban Highball with Rum, Mint & Lime',
      subtitleDe: 'Kubanischer Highball mit Rum, Minze & Limette',
      origin: 'Cuba / Havana',
      isImport: true,
      tasteEn: 'Refreshing, citrusy, minty, balanced sweetness and rum warmth',
      tasteDe: 'Erfrischend, zitrusfrisch, minzig, ausgewogene Süße und Rumnote',
      culinaryEn: 'Muddle mint leaves gently with lime juice and sugar, add white rum and crushed ice, top with club soda.',
      culinaryDe: 'Minzblätter sanft mit Limettensaft und Rohrzucker anmösern, weißem Rum und Crushed Ice auffüllen, mit Sodawasser aufgießen.',
      tags: ['cocktail', 'rum', 'mint', 'bar']
    },
    {
      id: 'longdrink_gin_tonic',
      category: 'longdrinks_cocktails',
      nameEn: 'Gin & Tonic',
      nameDe: 'Gin & Tonic',
      subtitleEn: 'Highball Classic with Botanical Balance',
      subtitleDe: 'Highball-Klassiker mit botanischer Balance',
      origin: 'UK / Global',
      isImport: true,
      tasteEn: 'Crisp, juniper-forward, effervescent quinine bitterness',
      tasteDe: 'Frisch, Wacholderbetont, prickelnde Chinin-Bitternote',
      culinaryEn: 'Served in a balloon glass with plenty of ice, premium tonic water and fresh botanical garnish.',
      culinaryDe: 'Serviert im Ballonglas mit reichlich Eis, Premium Tonic Water und frischer botanischer Garnitur.',
      tags: ['longdrink', 'bar', 'gin']
    },
    {
      id: 'cocktail_negroni',
      category: 'longdrinks_cocktails',
      nameEn: 'Negroni',
      nameDe: 'Negroni',
      subtitleEn: 'Italian Aperitivo Classic with Equal Parts',
      subtitleDe: 'Italienischer Aperitivo-Klassiker zu gleichen Teilen',
      origin: 'Florence, Italy',
      isImport: true,
      tasteEn: 'Bitter-sweet, complex herbal notes, rich vermouth and gin backbone',
      tasteDe: 'Bitter-süß, komplexe Kräuternoten, kräftiges Wermut- und Gin-Fundament',
      culinaryEn: 'Stir equal parts Gin, Campari, and Sweet Red Vermouth with ice, strain into a rocks glass over a large ice cube, garnish with orange peel.',
      culinaryDe: 'Gleiche Teile Gin, Campari und roter Wermut auf Eis rühren, in ein Tumbler-Glas auf einen großen Eiswürkel abseihen, Orangenzahne.',
      tags: ['cocktail', 'aperitivo', 'gin', 'campari']
    },
    {
      id: 'cocktail_cuba_libre',
      category: 'longdrinks_cocktails',
      nameEn: 'Cuba Libre',
      nameDe: 'Cuba Libre',
      subtitleEn: 'Rum, Cola & Fresh Lime Juice Highball',
      subtitleDe: 'Rum, Cola & frischer Limettensaft Highball',
      origin: 'Havana, Cuba',
      isImport: true,
      tasteEn: 'Sweet caramel cola balanced by zesty lime juice and aged rum character',
      tasteDe: 'Süße Karamell-Cola, ausgeglichen durch spritzigen Limettensaft und gealterten Rum',
      culinaryEn: 'Build over ice in a highball glass, squeeze fresh lime juice, top with cola, garnish with lime wedge.',
      culinaryDe: 'Im Highball-Glas auf Eis bauen, frischen Limettensaft auspressen, mit Cola auffüllen, Limettenscheibe.',
      tags: ['longdrink', 'rum', 'cola', 'bar']
    },
    {
      id: 'cocktail_moscow_mule',
      category: 'longdrinks_cocktails',
      nameEn: 'Moscow Mule',
      nameDe: 'Moscow Mule',
      subtitleEn: 'Vodka, Spicy Ginger Beer & Lime in Copper Mug',
      subtitleDe: 'Wodka, scharfes Ginger Beer & Limette im Kupferbecher',
      origin: 'Moscow / USA',
      isImport: true,
      tasteEn: 'Spicy ginger kick, crisp vodka spirit, refreshing lime acidity',
      tasteDe: 'Scharfer Ingwer-Kick, klarer Wodka, erfrischende Limettensäure',
      culinaryEn: 'Serve in a chilled copper mug with crushed ice, vodka, fresh lime juice and premium spicy ginger beer.',
      culinaryDe: 'Im gekühlten Kupferbecher mit Crushed Ice, Wodka, frischem Limettensaft und Premium Ginger Beer servieren.',
      tags: ['cocktail', 'vodka', 'ginger', 'bar']
    },
    {
      id: 'cocktail_aperol_spritz',
      category: 'longdrinks_cocktails',
      nameEn: 'Aperol Spritz',
      nameDe: 'Aperol Spritz',
      subtitleEn: 'Prosecco, Aperol & Soda with Orange Slice',
      subtitleDe: 'Prosecco, Aperol & Soda mit Orangenscheibe',
      origin: 'Veneto, Italy',
      isImport: true,
      tasteEn: 'Bittersweet orange, effervescent sparkling wine, refreshing and light',
      tasteDe: 'Bitter-süße Orange, prickelnder Schaumwein, erfrischend und leicht',
      culinaryEn: 'Build in a wine glass filled with ice: 3 parts Prosecco, 2 parts Aperol, a splash of soda water and orange wheel.',
      culinaryDe: 'Im Weinglas mit Eis bauen: 3 Teile Prosecco, 2 Teile Aperol, ein Schuss Soda und Orangenscheibe.',
      tags: ['cocktail', 'spritz', 'aperol', 'wine']
    }
  ]
};

// 2. Service & Table Coverage JSON
const serviceTable = {
  category: 'service_table',
  count: 5,
  items: [
    {
      id: 'service_table_coverage',
      category: 'service_table',
      nameEn: 'Table Setting & Cutlery Placement',
      nameDe: 'Tischeindeckung & Besteckplatzierung',
      subtitleEn: 'Professional Restaurant Setting Standards',
      subtitleDe: 'Professionelle Restaurant-Gedeckstandards',
      origin: 'Fine Dining Gastronomy',
      isImport: false,
      tasteEn: 'Precise geometrical hospitality setting, flawless guest ergonomics',
      tasteDe: 'Präzises geometrisches Gedeck, perfekte Gast-Ergonomie',
      culinaryEn: 'Fork to the left, knife and spoon to the right (cutting edge inward), bread plate upper left, water/wine glasses upper right.',
      culinaryDe: 'Gabel links, Messer (Klinge nach innen) und Löffel rechts, Teller oben links, Gläser oben rechts angeordnet.',
      tags: ['service', 'tischeindeckung', 'restaurant']
    },
    {
      id: 'service_wine_etiquette',
      category: 'service_table',
      nameEn: 'Wine Service & Decanting Etiquette',
      nameDe: 'Weinservice & Dekantier-Etikette',
      subtitleEn: 'Professional Presentation, Pouring & Temperature',
      subtitleDe: 'Professionelle Präsentation, Einschenken & Temperatur',
      origin: 'Sommelier Standards',
      isImport: false,
      tasteEn: 'Flawless presentation of bottle label to host, tasting taste sample, graceful pouring',
      tasteDe: 'Makellose Etikettenpräsentation beim Gastgeber, Probeschluck, eleganter Schenkservice',
      culinaryEn: 'Present bottle to host, open without touching cork with hands if possible, pour a tasting sip, fill guests clockwise.',
      culinaryDe: 'Flasche dem Gastgeber präsentieren, Etikett lesbar, Probeschluck ausschenken, im Uhrzeigersinn nachschenken.',
      tags: ['service', 'wein', 'sommelier']
    },
    {
      id: 'service_napkin_folds',
      category: 'service_table',
      nameEn: 'Napkin Folding & Table Linen',
      nameDe: 'Serviettenbrechen & Tischwäsche',
      subtitleEn: 'Classic Gastronomy Napkin Folds & Hygiene',
      subtitleDe: 'Klassische Gastronomie-Serviettenformen & Hygiene',
      origin: 'Hospitality Tradition',
      isImport: false,
      tasteEn: 'Immaculately starched linen, elegant geometric folds for plate or glassware',
      tasteDe: 'Makellos gestärkte Leinen, elegante geometrische Formen für Teller oder Gläser',
      culinaryEn: 'Fold using clean hands or cotton gloves. Common forms: Bishop hat, pyramid, pocket for cutlery.',
      culinaryDe: 'Mit sauberen Händen oder Baumwollhandschuhen brechen. Klassiker: Bischofsmütze, Pyramide, Bestecktasche.',
      tags: ['service', 'serviette', 'hygiene']
    },
    {
      id: 'service_sequence',
      category: 'service_table',
      nameEn: 'Service Sequence & Course Clearance',
      nameDe: 'Ablauf & Gang-Service (Service-Sequence)',
      subtitleEn: 'Professional Order of Service & Plate Clearing',
      subtitleDe: 'Professionelle Service-Reihenfolge & Abräumregeln',
      origin: 'Gastronomic Service Rules',
      isImport: false,
      tasteEn: 'Serving from the right (or left for platters), clearing plates from the right in unison',
      tasteDe: 'Servieren von rechts (Platten von links), Abräumen von rechts im Synchron-Service',
      culinaryEn: 'Clear plates from the right using the right hand, never stack more than two plates at the table.',
      culinaryDe: 'Teller von rechts mit der rechten Hand abräumen, nie mehr als zwei Teller am Tisch stapeln.',
      tags: ['service', 'ablauf', 'gastronomie']
    },
    {
      id: 'service_guest_welcome',
      category: 'service_table',
      nameEn: 'Guest Greeting & Coat Check',
      nameDe: 'Gästebegrüßung & Garderobenservice',
      subtitleEn: 'First Impression & Professional Reception',
      subtitleDe: 'Erster Eindruck & professioneller Empfang',
      origin: 'Front of House Standards',
      isImport: false,
      tasteEn: 'Warm verbal welcome within 30 seconds, attentive coat reception, guiding to table',
      tasteDe: 'Herzliche verbale Begrüßung in 30 Sekunden, aufmerksame Garderobenannahme, Tischführung',
      culinaryEn: 'Acknowledge entering guests immediately with a smile, take coats promptly, pull out chairs for ladies/guests.',
      culinaryDe: 'Eintretende Gäste sofort mit Blickkontakt und Lächeln begrüßen, Garderobe annehmen, Stühle rücken.',
      tags: ['service', 'empfang', 'gastfreundschaft']
    }
  ]
};

fs.writeFileSync(path.join(dbDir, 'longdrinks_cocktails.json'), JSON.stringify(longdrinksCocktails, null, 2), 'utf8');
fs.writeFileSync(path.join(dbDir, 'service_table.json'), JSON.stringify(serviceTable, null, 2), 'utf8');
console.log("Created longdrinks_cocktails.json and service_table.json");

// Update categories.json
const categoryMetaList = [
  { id: 'spirits', titleDe: 'Spirituosen & Bar', titleEn: 'Spirits & Bar', icon: 'liquor' },
  { id: 'longdrinks_cocktails', titleDe: 'Longdrinks & Cocktails', titleEn: 'Longdrinks & Cocktails', icon: 'local_bar' },
  { id: 'wine', titleDe: 'Wein & Schaumwein', titleEn: 'Wine & Sparkling', icon: 'wine_bar' },
  { id: 'beer', titleDe: 'Bier & Braukunst', titleEn: 'Beer & Brewing', icon: 'sports_bar' },
  { id: 'coffee', titleDe: 'Kaffee & Heißgetränke', titleEn: 'Coffee & Hot Drinks', icon: 'coffee' },
  { id: 'fruit', titleDe: 'Obst & Früchte', titleEn: 'Fruit & Produce', icon: 'nutrition' },
  { id: 'vegetables', titleDe: 'Gemüse & Kräuter', titleEn: 'Vegetables & Herbs', icon: 'eco' },
  { id: 'cheese', titleDe: 'Käse & Milchprodukte', titleEn: 'Cheese & Dairy', icon: 'cheese' },
  { id: 'meat', titleDe: 'Fleisch & Delikatessen', titleEn: 'Meat & Delicatessen', icon: 'kebab_dining' },
  { id: 'bakery', titleDe: 'Brot & Backwaren', titleEn: 'Bakery & Pastry', icon: 'bakery_dining' },
  { id: 'service_table', titleDe: 'Service & Tischeindeckung', titleEn: 'Service & Table Setting', icon: 'room_service' }
];

fs.writeFileSync(path.join(dbDir, 'categories.json'), JSON.stringify({ categories: categoryMetaList }, null, 2), 'utf8');
console.log("Updated categories.json with new category structure");
