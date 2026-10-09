/**
 * GastroDex - Firebase Firestore Database Seeder
 * Uploads all 89+ curated items, categories, and quiz questions into Firestore:
 * - /items/{itemId}
 * - /categories/{catId}
 * - /quiz_questions/{questionId}
 * - /catalog/latest
 *
 * Runs seamlessly in Google Cloud Shell or any authenticated environment.
 * Supports both Google Cloud Firestore SDK and direct gcloud OAuth REST API fallback.
 */

const fs = require('fs');
const https = require('https');
const { execSync } = require('child_process');

const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'gastrodex-823d7';
const DATABASE_ID = '(default)';
const EXPORT_FILE = fs.existsSync('firestore_export.json') ? 'firestore_export.json' : 'pwa/catalog_latest.json';

if (!fs.existsSync(EXPORT_FILE)) {
  console.error(`❌ Export file not found: ${EXPORT_FILE}`);
  process.exit(1);
}

const catalog = JSON.parse(fs.readFileSync(EXPORT_FILE, 'utf8'));
const categories = catalog.categories || [];
const items = catalog.items || [];
const quizQuestions = catalog.quizQuestions || [];

console.log(`Loaded catalog v${catalog.catalogVersion} with ${items.length} items, ${categories.length} categories, ${quizQuestions.length} quiz questions.`);

// Format JS object into Firestore REST API value format
function toFirestoreValue(val) {
  if (val === null || val === undefined) return { nullValue: null };
  if (typeof val === 'boolean') return { booleanValue: val };
  if (typeof val === 'number') {
    if (Number.isInteger(val)) return { integerValue: val.toString() };
    return { doubleValue: val };
  }
  if (typeof val === 'string') return { stringValue: val };
  if (Array.isArray(val)) {
    return { arrayValue: { values: val.map(toFirestoreValue) } };
  }
  if (typeof val === 'object') {
    const fields = {};
    for (const [k, v] of Object.entries(val)) {
      fields[k] = toFirestoreValue(v);
    }
    return { mapValue: { fields } };
  }
  return { stringValue: String(val) };
}

function toFirestoreFields(obj) {
  const fields = {};
  for (const [k, v] of Object.entries(obj)) {
    fields[k] = toFirestoreValue(v);
  }
  return fields;
}

async function getAccessToken() {
  if (process.env.GOOGLE_OAUTH_TOKEN) return process.env.GOOGLE_OAUTH_TOKEN;
  try {
    const token = execSync('gcloud auth print-access-token', { encoding: 'utf8' }).trim();
    if (token) return token;
  } catch (e) {
    // ignore
  }
  return null;
}

function restRequest(path, method, data, token) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'firestore.googleapis.com',
      port: 443,
      path: `/v1/projects/${PROJECT_ID}/databases/${DATABASE_ID}/documents/${path}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(body || '{}'));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function seedWithRest(token) {
  console.log(`🔐 Using authenticated Google Cloud OAuth token for project: ${PROJECT_ID}`);

  // 1. Categories
  console.log(`\n📁 Seeding ${categories.length} Categories...`);
  for (const cat of categories) {
    const fields = toFirestoreFields(cat);
    await restRequest(`categories/${cat.id}`, 'PATCH', { fields }, token);
    process.stdout.write('.');
  }
  console.log(' Done!');

  // 2. Items
  console.log(`\n🍽️ Seeding ${items.length} Gastronomy Encyclopedia Items...`);
  let count = 0;
  for (const item of items) {
    const fields = toFirestoreFields(item);
    await restRequest(`items/${item.id}`, 'PATCH', { fields }, token);
    count++;
    if (count % 10 === 0) process.stdout.write(` [${count}/${items.length}]`);
    else process.stdout.write('.');
  }
  console.log(`\n✅ ${items.length} Items successfully uploaded.`);

  // 3. Quiz Questions
  if (quizQuestions.length > 0) {
    console.log(`\n🎓 Seeding ${quizQuestions.length} Staff Quiz Questions...`);
    for (const q of quizQuestions) {
      const fields = toFirestoreFields(q);
      await restRequest(`quiz_questions/${q.id}`, 'PATCH', { fields }, token);
      process.stdout.write('.');
    }
    console.log(' Done!');
  }

  // 4. Catalog Metadata
  console.log(`\n📋 Seeding Catalog Version Metadata...`);
  const metaFields = toFirestoreFields({
    version: catalog.catalogVersion,
    versionName: catalog.versionName,
    itemCount: catalog.itemCount,
    updatedAt: catalog.updatedAt
  });
  await restRequest(`catalog/latest`, 'PATCH', { fields: metaFields }, token);
  console.log('✅ Catalog version metadata recorded.');
}

async function main() {
  console.log(`====================================================`);
  console.log(`🔥 GastroDex Firestore Database Seeder`);
  console.log(`Target: Firestore (default) in project: ${PROJECT_ID}`);
  console.log(`====================================================`);

  const token = await getAccessToken();
  if (token) {
    try {
      await seedWithRest(token);
      console.log(`\n🎉 FIRESTORE SEEDING COMPLETE!`);
      console.log(`Visit your database: https://console.firebase.google.com/project/${PROJECT_ID}/firestore`);
      return;
    } catch (err) {
      console.warn(`REST upload encountered notice: ${err.message}`);
      console.log(`Falling back to checking @google-cloud/firestore SDK...`);
    }
  }

  // Fallback to @google-cloud/firestore SDK
  try {
    const { Firestore } = require('@google-cloud/firestore');
    const db = new Firestore({ projectId: PROJECT_ID });

    console.log(`Writing via @google-cloud/firestore SDK...`);
    const batch = db.batch();

    for (const cat of catalog.categories) {
      batch.set(db.collection('categories').doc(cat.id), cat, { merge: true });
    }
    for (const q of catalog.quizQuestions) {
      batch.set(db.collection('quiz_questions').doc(q.id), q, { merge: true });
    }
    batch.set(db.collection('catalog').doc('latest'), {
      version: catalog.catalogVersion,
      versionName: catalog.versionName,
      itemCount: catalog.itemCount,
      updatedAt: catalog.updatedAt
    }, { merge: true });

    await batch.commit();

    // Items in batches of 200
    const itemChunks = [];
    for (let i = 0; i < catalog.items.length; i += 200) {
      itemChunks.push(catalog.items.slice(i, i + 200));
    }
    for (const chunk of itemChunks) {
      const b = db.batch();
      for (const item of chunk) {
        b.set(db.collection('items').doc(item.id), item, { merge: true });
      }
      await b.commit();
    }

    console.log(`✅ ${catalog.items.length} items successfully committed via Firestore SDK.`);
  } catch (sdkErr) {
    console.error(`\n❌ Could not automatically connect:`, sdkErr.message);
    console.log(`\n💡 To seed from Google Cloud Shell, run:`);
    console.log(`   export FIREBASE_PROJECT_ID="${PROJECT_ID}"`);
    console.log(`   node seed_firestore.js\n`);
  }
}

main().catch(err => {
  console.error("Error running seeder:", err);
  process.exit(1);
});
