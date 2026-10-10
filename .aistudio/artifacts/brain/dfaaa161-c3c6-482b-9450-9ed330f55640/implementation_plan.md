# Implementation Plan - GastroDex Expansion & Enhancements

## User Goals & Requirements
1. **New Categories:**
   - **Non-Food / Service & Basics:** Table setting guides (Restaurant, Gala, Breakfast), napkin folding techniques, cutlery & glassware rules, serving utensil etiquette, and presentation standards.
   - **Cereals & Breakfast:** Porridge, muesli, cornflakes, chocolate puffs, oats, and breakfast cereal varieties.
2. **Food Security & HACCP:**
   - Integrated into the Science / Wirkungslehre tab (Android & PWA) as an essential professional guideline.
3. **Deep Content Expansions:**
   - **Cheese:** Additional regional and PDO cheese varieties.
   - **Meat & Steaks:** Essential steak cuts (Entrecôte, Rumpsteak, Flank, Tenderloin).
   - **Coffee:** Standard coffees (Filter coffee, Americano, coffee creamer/milk).
   - **Spices & Herbs:** Expanded culinary herb and spice profiles.
   - **Nuts & Seeds:** Peanuts, walnuts, pistachios, sesame, sunflower seeds, pumpkin seeds.
   - **Fruits & Citrus:** Apples (red vs. green varieties), citrus (mandarins, clementines, oranges, juice oranges), bananas, kiwis, gold kiwis.
4. **Sync & Deployment:**
   - Full 1:1 synchronization between Android Kotlin curated data files, PWA `data_bundle.js`, `catalog_latest.json`, and database export bundles.

---

## Proposed Changes

### 1. Data Models & Categories (`GastroCategory.kt` & `pwa/app.js`)
- Add `NON_FOOD_SERVICE` and `CEREALS_BREAKFAST` to `GastroCategory` enum (bringing total categories to 23).
- Update category icons and German/English titles.

### 2. Android App Data Curations
- **`CuratedNonFoodData.kt`**: Table settings, napkin folding, service rules.
- **`CuratedCerealsData.kt`**: Porridge, muesli, cornflakes, oats.
- **`CuratedMeatDeliData.kt`**, **`CuratedDairyCheeseEggsData.kt`**, **`CuratedBeveragesData.kt`**, **`CuratedSpicesHerbsData.kt`**, **`CuratedProduceData.kt`**: Expand with requested items (steaks, cheese, coffee, nuts, fruits).
- **`CuratedGastroData.kt`**: Combine all datasets.
- **`ScienceGuideScreen.kt`**: Ensure HACCP and Food Security section is prominent and complete.

### 3. PWA & Admin Web App (`pwa/data_bundle.js`, `pwa/index.html`, `pwa/catalog_latest.json`)
- Update `CATEGORIES_LIST` with the 2 new categories.
- Append all expanded items and Non-Food / Cereals items to `MASTER_ITEMS`.
- Enhance PWA Science/Wirkung tab with Food Security & HACCP guidelines.

---

## Verification Plan
- Compile Android applet using `compile_applet`.
- Verify item counts and category filters in both Android and PWA.
