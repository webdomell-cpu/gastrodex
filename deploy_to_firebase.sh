#!/usr/bin/env bash
set -e

PROJECT_ID="gastrodex-823d7"

echo "=========================================================="
echo "🔥 GastroDex Firebase Deployment & Firestore Database Seed"
echo "Project: $PROJECT_ID"
echo "=========================================================="

# 1. Select the project in gcloud
echo "👉 Setting gcloud project to $PROJECT_ID..."
gcloud config set project "$PROJECT_ID"

# 2. Check and enable Cloud Firestore native database if not created yet
echo "👉 Checking Cloud Firestore database status..."
if ! gcloud firestore databases describe --database="(default)" >/dev/null 2>&1; then
    echo "Creating Cloud Firestore Native database in europe-west3..."
    gcloud firestore databases create --location=europe-west3 --type=firestore-native || true
fi

# 3. Deploy Firebase Hosting, Firestore Rules and Storage Rules
echo "👉 Deploying Firebase Hosting, Firestore Security Rules & Storage Rules..."
firebase deploy --project "$PROJECT_ID" --only firestore:rules,storage,hosting

# 4. Populate Firestore collections with the complete curated database
echo "👉 Populating Firestore collections (items, categories, quiz_questions)..."
export FIREBASE_PROJECT_ID="$PROJECT_ID"
node seed_firestore.js

echo ""
echo "=========================================================="
echo "🎉 ALLES ERFOLGREICH EINGERICHTET & BEREITGESTELLT!"
echo "🌐 PWA / Web-App:           https://$PROJECT_ID.web.app"
echo "🌐 PWA Alternative URL:     https://$PROJECT_ID.firebaseapp.com"
echo "📦 Live Katalog-JSON:       https://$PROJECT_ID.web.app/catalog_latest.json"
echo "🔥 Firestore Konsole:       https://console.firebase.google.com/project/$PROJECT_ID/firestore"
echo "=========================================================="
