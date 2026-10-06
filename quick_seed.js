/**
 * GastroDex Quick CloudShell Seeder
 * Seeds categories, metadata, and core encyclopedia items into Firestore gastrodex-823d7
 */
const https = require('https');
const { execSync } = require('child_process');

const PROJECT_ID = 'gastrodex-823d7';

function toFirestoreFields(obj) {
  const fields = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === null || v === undefined) fields[k] = { nullValue: null };
    else if (typeof v === 'boolean') fields[k] = { booleanValue: v };
    else if (typeof v === 'number') fields[k] = Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
    else if (Array.isArray(v)) fields[k] = { arrayValue: { values: v.map(s => ({ stringValue: String(s) })) } };
    else if (typeof v === 'object') fields[k] = { mapValue: { fields: toFirestoreFields(v) } };
    else fields[k] = { stringValue: String(v) };
  }
  return fields;
}

function writeDoc(collection, docId, data, token) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ fields: toFirestoreFields(data) });
    const req = https.request({
      hostname: 'firestore.googleapis.com',
      port: 443,
      path: `/v1/projects/${PROJECT_ID}/databases/(default)/documents/${collection}/${docId}`,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve(JSON.parse(body || '{}'));
        else reject(new Error(`HTTP ${res.statusCode}: ${body}`));
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function run() {
  console.log('🚀 Starte GastroDex Firestore Seeder...');
  const token = execSync('gcloud auth print-access-token', { encoding: 'utf8' }).trim();
  if (!token) throw new Error('Kein gcloud Token gefunden. Bitte führe gcloud auth login aus.');

  // Categories
  const categories = [
    { id: 'all', titleDe: '✨ Alle Einträge', titleEn: '✨ All Entries' },
    { id: 'spirits', titleDe: '🥃 Spirituosen & Destillate', titleEn: '🥃 Spirits & Distillates' },
    { id: 'wine', titleDe: '🍷 Wein & Schaumweine', titleEn: '🍷 Wine & Champagne' },
    { id: 'spices_herbs', titleDe: '🌿 Gewürze & Kräuter', titleEn: '🌿 Spices & Herbs' },
    { id: 'olives', titleDe: '🫒 Oliven', titleEn: '🫒 Olives' },
    { id: 'oils_vinegars', titleDe: '🏺 Öle & Essig', titleEn: '🏺 Oils & Vinegars' },
    { id: 'nuts', titleDe: '🥜 Nüsse & Saaten', titleEn: '🥜 Nuts & Seeds' },
    { id: 'coffee', titleDe: '☕ Kaffeespezialitäten', titleEn: '☕ Coffee Specialties' },
    { id: 'dairy', titleDe: '🥛 Milch & Molkerei', titleEn: '🥛 Dairy & Milk Science' },
    { id: 'cheese', titleDe: '🧀 Käsekunde & g.U.', titleEn: '🧀 Cheese & DOP / g.U.' },
    { id: 'eggs', titleDe: '🍳 Eierspeisen & Eierkunde', titleEn: '🍳 Egg Dishes & Science' },
    { id: 'vegetables', titleDe: '🍄 Gemüse & Speisepilze', titleEn: '🍄 Vegetables & Mushrooms' },
    { id: 'fruits', titleDe: '🍓 Früchte & Beeren', titleEn: '🍓 Fruits & Berries' }
  ];

  console.log(`📂 Schreibe ${categories.length} Kategorien...`);
  for (const c of categories) {
    await writeDoc('categories', c.id, c, token);
    process.stdout.write('.');
  }
  console.log(' Fertig!');

  // Catalog metadata
  console.log('📋 Aktualisiere Katalog-Status...');
  await writeDoc('catalog', 'latest', {
    version: 25,
    versionName: 'v2.5 (GastroDex Firebase Live)',
    updatedAt: new Date().toISOString(),
    status: 'ONLINE'
  }, token);
  console.log('✅ Katalog-Metadaten aktiv.');

  // Core items
  const coreItems = [
    {
      id: 'olive_kalamata_pdo',
      category: 'olives',
      nameDe: 'Kalamata-Oliven g.U. (Griechenland)',
      nameEn: 'Kalamata Olives PDO (Greece)',
      subtitleDe: 'Mandelform, tiefdunkles Violett, in Rotweinessig und nativem Olivenöl gereift',
      subtitleEn: 'Almond-shaped, deep aubergine-purple, cured in red wine vinegar & EVOO',
      origin: 'Griechenland (Peloponnes / Messenien - g.U.)',
      tasteDe: 'Fleischig-saftiger Biss, feine Weinessigsäure, edle Fruchtnote, öliger Schmelz',
      scienceDe: 'Reifen natürlich am Baum; Bitterstoff Oleuropein wird durch Wässern und Rotweinessig abgebaut.',
      allergens: ['None'],
      tags: ['Kalamata', 'Olives', 'Greece', 'PDO'],
      inStock: true,
      stockQuantity: 8
    },
    {
      id: 'oil_natives_olivenoel_extra',
      category: 'oils_vinegars',
      nameDe: 'Natives Olivenöl Extra (EVOO / Nativ Extra)',
      nameEn: 'Extra Virgin Olive Oil (EVOO)',
      subtitleDe: 'Höchste Güteklasse, mechanische Kaltextraktion (<27°C), freie Fettsäuren <=0,8%',
      subtitleEn: 'Top legal grade, cold extraction (<27°C), free fatty acidity <=0.8%',
      origin: 'Mittelmeerraum (Spanien, Griechenland, Italien)',
      tasteDe: 'Frisches Gras, grüne Tomate, Artischocke, pfeffriges Oleocanthal-Kratzen im Hals',
      scienceDe: 'Rein mechanische Kaltpressung unter 27°C. Das Kratzen im Hals beweist den Schutzstoff Oleocanthal.',
      allergens: ['None'],
      tags: ['EVOO', 'OliveOil', 'Oleocanthal', 'ColdPressed'],
      inStock: true,
      stockQuantity: 12
    },
    {
      id: 'spice_meersalz_fleur_de_sel',
      category: 'spices_herbs',
      nameDe: 'Meersalz & Fleur de Sel (Salzblume)',
      nameEn: 'Sea Salt & Fleur de Sel',
      subtitleDe: 'Handgeschöpftes Meersalz aus Atlantik-Salinen, Restfeuchte & Edelschmelz',
      subtitleEn: 'Hand-harvested sea salt flakes, natural moisture & mineral crunch',
      origin: 'Frankreich (Guérande, Camargue) / Portugal',
      tasteDe: 'Zarter mineralischer Knusper-Biss, milde Salzigkeit, schmilzt sanft auf der Zunge',
      scienceDe: 'Zarte Salzkristallblumen bilden sich an windstillen Sommertagen an der Wasseroberfläche der Salinen.',
      allergens: ['None'],
      tags: ['Salt', 'FleurDeSel', 'SeaSalt', 'FinishingSalt'],
      inStock: true,
      stockQuantity: 6
    },
    {
      id: 'vinegar_balsamico_tradizionale_dop',
      category: 'oils_vinegars',
      nameDe: 'Aceto Balsamico Tradizionale di Modena DOP',
      nameEn: 'Aceto Balsamico Tradizionale di Modena DOP',
      subtitleDe: '12 bis über 25 Jahre im Holzfass-Batterie gereifter eingekochter Traubenmost',
      subtitleEn: '12 to 25+ years aged in battery casks of progressive woods, cooked grape must only',
      origin: 'Italien (Modena & Reggio Emilia - DOP)',
      tasteDe: 'Sirupartig dickflüssig, perfektes Gleichgewicht aus Edelsüße und Weinsäure, Feige & Eiche',
      scienceDe: 'Wird rein aus eingekochtem Traubenmost ohne Weinessig hergestellt und über Jahrzehnte in 5-7 Holzfässern verdunstet.',
      allergens: ['Natural Sulphites'],
      tags: ['Balsamico', 'Tradizionale', 'DOP', 'Modena'],
      inStock: true,
      stockQuantity: 2
    },
    {
      id: 'wine_champagne_aoc_brut',
      category: 'wine',
      nameDe: 'Champagner AOC (Brut & Blanc de Blancs)',
      nameEn: 'Champagne AOC (Brut, Blanc de Blancs & Vintage)',
      subtitleDe: 'Klassische Flaschengärung, Kreideböden & autolytischer Brioche-Schmelz',
      subtitleEn: 'Méthode Champenoise bottle fermentation, chalk terroir & brioche perlage',
      origin: 'Frankreich (Champagne: Reims, Épernay - AOC)',
      tasteDe: 'Grüner Apfel, warmes Brioche-Hefegebäck, Zitronenabrieb, Kreidestein, zarte Perlage',
      scienceDe: 'Zweite Gärung in der Flasche; mind. 15 Monate Hefelagerung (Autolyse) lösen Mannoproteine für feine Perlage (5-6 bar).',
      allergens: ['Contains Sulphites'],
      tags: ['Champagne', 'Brut', 'France', 'AOC'],
      inStock: true,
      stockQuantity: 6
    },
    {
      id: 'spirit_tequila_mezcal',
      category: 'spirits',
      nameDe: 'Tequila 100% Agave & Mezcal',
      nameEn: 'Tequila 100% Agave & Mezcal',
      subtitleDe: 'Destillat aus Agavenherzen (gedämpft vs. in Erdgruben über Holz geröstet)',
      subtitleEn: 'Distilled spirits from succulent Agave hearts (steamed vs pit-roasted)',
      imageUrl: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=800&auto=format&fit=crop&q=80',
      origin: 'Mexiko (Jalisco & Oaxaca)',
      tasteDe: 'Gekochte Agavensüße, Zitruspfeffer, mineralisch-vegetabil, Lagerfeuer-Rauch',
      scienceDe: 'Agaven-Inulin wird gedämpft (Tequila) oder in Erdöfen über Mesquite-Holz geröstet (Mezcal).',
      allergens: ['None'],
      tags: ['Tequila', 'Mezcal', 'Agave', 'Mexico'],
      inStock: true,
      stockQuantity: 4
    }
  ];

  console.log(`🍽️ Schreibe GastroDex-Referenzeinträge...`);
  for (const it of coreItems) {
    await writeDoc('items', it.id, it, token);
    process.stdout.write('.');
  }

  console.log('\n\n🎉 ERFOLG! Deine Firestore-Datenbank ist jetzt befüllt!');
  console.log(`Prüfe es direkt in der Konsole: https://console.firebase.google.com/project/${PROJECT_ID}/firestore`);
}

run().catch(err => {
  console.error('Fehler beim Seeden:', err.message);
  process.exit(1);
});
