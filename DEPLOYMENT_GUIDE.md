# GastroDex – PWA & Firebase Setup

## 🌐 Deine Firebase Hosting Links
Nach dem Deployment über Firebase stehen dir deine offiziellen Hosting-URLs zur Verfügung:

- **PWA Hauptlink:** `https://gastrodex-823d7.web.app`
- **PWA Alternative:** `https://gastrodex-823d7.firebaseapp.com`
- **Web-Admin / CMS:** `https://gastrodex-823d7.web.app/admin` (bzw. `/admin.html`)
- **Live-Katalog-JSON:** `https://gastrodex-823d7.web.app/catalog_latest.json`
- **Firebase Konsole:** `https://console.firebase.google.com/project/gastrodex-823d7`

---

## 🚀 1. Einmaliges manuelles Deployment (CLI / Google Cloud Shell)
In deinem lokalen Terminal oder in der Google Cloud Shell (wo du mit `firebase login` angemeldet bist):
```bash
./deploy_to_firebase.sh
```
Oder direkt:
```bash
firebase deploy --project gastrodex-823d7 --only firestore:rules,storage,hosting
node seed_firestore.js
```

---

## ⚡ 2. Vollautomatisches Deployment von GitHub zu Firebase (CI/CD)
Damit Firebase bei jedem `git push` auf GitHub vollautomatisch aktualisiert wird:

1. **Service Account Key erstellen:**
   - Gehe in die [Google Cloud Console](https://console.cloud.google.com/iam-admin/serviceaccounts?project=gastrodex-823d7) oder Firebase Projekteinstellungen -> Dienstkonten.
   - Wähle das Firebase-Dienstkonto oder erstelle eines mit der Rolle **Firebase Hosting Admin**.
   - Klicke auf **Schlüssel erstellen (JSON)** und lade die JSON-Datei herunter.

2. **GitHub Secret hinterlegen:**
   - Öffne dein GitHub Repository -> **Settings** -> **Secrets and variables** -> **Actions**.
   - Klicke auf **New repository secret**.
   - Name: `FIREBASE_SERVICE_ACCOUNT`
   - Value: Kopiere den gesamten Inhalt der heruntergeladenen JSON-Datei hinein.

3. **Fertig!**
   - Die Workflow-Datei `.github/workflows/firebase-deploy.yml` ist bereits hinterlegt.
   - Bei jedem Commit/Push auf `main` oder `master` baut GitHub automatisch die PWA und schiebt sie direkt live auf `https://gastrodex-823d7.web.app`.
