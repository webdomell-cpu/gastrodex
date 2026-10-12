import sys

with open('pwa/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update toggleLanguage and DOMContentLoaded to call renderKnowledgeGuides()
text = text.replace(
    '  renderLanguageLabels();\n  renderCategoryChips();',
    '  renderLanguageLabels();\n  renderKnowledgeGuides();\n  renderCategoryChips();'
)

helpers = '''
function renderKnowledgeGuides() {
  const isDe = (currentLang === 'de');
  renderWineGuide(isDe);
  renderCoffeeGuide(isDe);
  renderCocktailsGuide(isDe);
  renderServiceGuide(isDe);
  renderScienceGuide(isDe);
  renderQuizHeaderStrings(isDe);
}

function renderWineGuide(isDe) {
  const el = document.getElementById('wineGuideContent');
  if (!el) return;
  el.innerHTML = `
    <div class="detail-section" style="margin-bottom: 16px;">
      <h2 style="font-size: 1.25rem; font-weight: 800; color: var(--accent-gold); margin-bottom: 8px;">
        🍷 ${isDe ? 'Wein- & Schaumweinkompass' : 'Wine & Sparkling Wine Master Guide'}
      </h2>
      <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">
        ${isDe ? 
          'Von den feinsten Perlen der Champagne über deutschen Steillagen-Riesling bis hin zum geschützten Asti Spumante DOCG und den Geheimnissen der Roséwein-Kelterung.' :
          'From the finest bubbles of Champagne to German steep-slope Riesling, protected Asti Spumante DOCG, and the secrets of Rosé vinification.'}
      </p>
    </div>

    <div class="detail-section" style="margin-bottom: 14px;">
      <h3 class="detail-section-title">🍾 ${isDe ? 'Das Schaumwein-Dreieck' : 'The Sparkling Wine Triangle'}</h3>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Champagner (AOP Frankreich):' : 'Champagne (AOP France):'}</strong> ${isDe ? 
          'Ausschließlich traditionelle Flaschengärung (Méthode Champenoise) in der Champagne; mind. 15 Monate Hefelager lösen Mannoproteine (Autolyse) für edle Brioche-Aromen und ultra-feine Perlage (5-6 bar).' : 
          'Exclusively traditional in-bottle fermentation in the Champagne region; min. 15 months lees aging releases mannoproteins for brioche nuances and velvety micro-bubbles.'}<br/>
        • <strong>${isDe ? 'Deutscher Sekt & Winzersekt:' : 'German Sekt & Winzersekt:'}</strong> ${isDe ? 
          'Riesling- oder Burgunderbasis; lebendige rassige Säure, feinfruchtig, erzeugt im Drucktank oder als traditioneller Winzersekt mit mindestens 9 Monaten Flaschenhefelager.' : 
          'Riesling or Pinot base; crisp racy acidity, vibrant minerality, produced in autoclave tanks or as traditional Winzersekt with min. 9 months on the lees.'}<br/>
        • <strong>${isDe ? 'Asti Spumante (DOCG Piemont):' : 'Asti Spumante (DOCG Piedmont):'}</strong> ${isDe ? 
          '100% aromatische Moscato Bianco-Traube. Das Geheimnis: Die Gärung im Autoklaven wird bei ca. 7–9% Vol. durch Kälteschock gestoppt! So bleibt der natürliche Fruchtzucker erhalten – herrlich süß mit Aromen von weißem Pfirsich und Salbei!' : 
          '100% Moscato Bianco. The secret: Pressurized fermentation is chilled and halted at ~7-9% ABV! Preserving natural grape sugars without added dosage – lush, floral, and perfect with desserts!'}
      </p>
    </div>

    <div class="detail-section" style="margin-bottom: 14px;">
      <h3 class="detail-section-title">🍇 ${isDe ? 'Rebsorten & Kelterung' : 'Grape Varieties & Vinification'}</h3>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Riesling (Königin der Weißweine):' : 'Riesling (Queen of White Grapes):'}</strong> ${isDe ? 
          'Sehr hohe natürliche Säure, Schiefermineralik, Aromen von grünem Apfel und Pfirsich; bildet bei langer Reife die edle TDN-Petrolnote aus.' : 
          'High natural acidity, slate minerality, aromas of crisp green apple and peach; develops complex petrol (TDN) nuances with maturity.'}<br/>
        • <strong>${isDe ? 'Roséwein-Gesetz (EU-Recht):' : 'Rosé Wine Laws (EU Regulation):'}</strong> ${isDe ? 
          'In der Europäischen Union ist das Verschneiden von Weiß- und Rotwein für Stillweine streng gesetzlich verboten! Die zartrosa bis lachsfarbene Tönung entsteht rein aus kurzer Maischestandzeit (2–12 Stunden) roter Traubenhäute.' : 
          'In the EU, blending white and red wine for still wine is strictly prohibited! The pale pink color comes exclusively from brief skin contact (2-12h maceration) of red grapes.'}
      </p>
    </div>
  `;
}

function renderCoffeeGuide(isDe) {
  const headerTitle = document.getElementById('coffeeHeaderTitle');
  if (headerTitle) headerTitle.textContent = isDe ? '☕ Kaffeespezialitäten & Schichten-Labor' : '☕ Coffee Specialties & Layer Lab';
  
  const headerSub = document.getElementById('coffeeHeaderSub');
  if (headerSub) headerSub.textContent = isDe ? 
    'Interaktive Getränke-Schichtung im Glas, Extraktionsphysik (9 bar, 25s) und der Unterschied zwischen Arabica und Robusta.' :
    'Interactive beverage layering, extraction physics (9 bar, 25s), and Arabica vs. Robusta science.';

  const compareTitle = document.getElementById('coffeeCompareTitle');
  if (compareTitle) compareTitle.textContent = isDe ? '🥛 Getränke-Schichten im Glas vergleichen' : '🥛 Compare Drink Layers in Realistic Glassware';

  const labelLeft = document.getElementById('coffeeLabelLeft');
  if (labelLeft) labelLeft.textContent = isDe ? 'GETRÄNK 1:' : 'BEVERAGE 1:';

  const labelRight = document.getElementById('coffeeLabelRight');
  if (labelRight) labelRight.textContent = isDe ? 'GETRÄNK 2:' : 'BEVERAGE 2:';

  const species = document.getElementById('coffeeSpeciesSection');
  if (species) {
    species.innerHTML = `
      <h3 class="detail-section-title">🌱 ${isDe ? 'Arabica vs. Robusta' : 'Arabica vs. Robusta'}</h3>
      <p class="detail-section-text">
        • <strong>Coffea Arabica:</strong> ${isDe ? 
          'Hochlagen (1000–2200m), feine elegante Fruchtsäuren, 60% mehr Lipide/Öle, milderer Koffeingehalt (1,1–1,4%).' : 
          'High altitudes (1000-2200m), delicate fruit acids, 60% more lipids/oils, lower caffeine (1.1-1.4%).'}<br/>
        • <strong>Coffea Robusta (Canephora):</strong> ${isDe ? 
          'Tiefland (0–800m), doppelter Koffeingehalt (2,2–2,7%), weniger Fette -> erzeugt die dichte, elastische, nussbraune Crema im echten italienischen Bar-Espresso!' : 
          'Low altitudes (0-800m), double caffeine content (2.2-2.7%), lower fats -> produces the dense, hazelnut crema in authentic Italian espresso!'}
      </p>
    `;
  }
  updateCoffeeComparison();
}

function renderCocktailsGuide(isDe) {
  const el = document.getElementById('cocktailsGuideContent');
  if (!el) return;
  el.innerHTML = `
    <div class="detail-section" style="margin-bottom: 16px;">
      <h2 style="font-size: 1.25rem; font-weight: 800; color: var(--accent-gold); margin-bottom: 8px;">
        🍸 ${isDe ? 'Cocktails, Longdrinks & Bar-Technik' : 'Cocktails, Highballs & Bar Technique'}
      </h2>
      <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">
        ${isDe ? 
          'Klassische Bar-Rezepte, Highball-Balance, Eis-Physik und die grundlegenden Handgriffe professioneller Bartender.' : 
          'Classic bar recipes, highball balance, ice thermodynamics, and fundamental mixology techniques.'}
      </p>
    </div>

    <div class="detail-section" style="margin-bottom: 14px;">
      <h3 class="detail-section-title">🧊 ${isDe ? 'Eis-Physik & Glas-Kompensation' : 'Ice Thermodynamics & Glass Pre-Chilling'}</h3>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Großes Eis vs. Schmelzwasser:' : 'Large Ice Blocks vs. Dilution:'}</strong> ${isDe ? 
          'Große, kristallklare Eiswürfel oder Sphären besitzen ein geringeres Oberflächen-zu-Volumen-Verhältnis. Sie schmelzen extrem langsam, kühlen den Drink maximal und verhindern Verwässern.' : 
          'Large crystal-clear ice blocks possess a low surface-to-volume ratio, chilling drinks rapidly with minimal dilution.'}<br/>
        • <strong>${isDe ? 'Glas-Vorkühlung:' : 'Glass Pre-Chilling:'}</strong> ${isDe ? 
          'Ein vorgekühltes Ballonglas oder Tumbler verhindert den thermischen Schock beim Eingießen und hält Kohlensäure länger im Getränk gebunden.' : 
          'Pre-chilled glassware prevents thermal shock and preserves carbonation.'}
      </p>
    </div>

    <div class="detail-section" style="margin-bottom: 14px;">
      <h3 class="detail-section-title">🍹 ${isDe ? 'Klassische Longdrink-Standards' : 'Classic Highball & Cocktail Standards'}</h3>
      <p class="detail-section-text">
        • <strong>Gin & Tonic:</strong> ${isDe ? 
          '5 cl Dry Gin, 150-200 ml Premium Tonic Water, reichlich massives Eis, frische botanische Garnitur (Zitruszeste, Rosmarinzweig oder Gurke).' : 
          '5 cl dry gin, 150-200 ml premium tonic, abundant solid ice, fresh botanical garnish.'}<br/>
        • <strong>Moscow Mule:</strong> ${isDe ? 
          '5 cl Vodka, 2 cl frischer Limettensaft, 150 ml würziges Ginger Beer, Gurkenscheibe & Minze im eiskalten Kupferbecher.' : 
          '5 cl vodka, 2 cl fresh lime juice, 150 ml spicy ginger beer, cucumber wheel & mint in a chilled copper mug.'}<br/>
        • <strong>Negroni (IBA Official):</strong> ${isDe ? 
          'Zu gleichen Teilen (je 3 cl) London Dry Gin, Roter Wermut (Vermouth Rosso) und Campari; auf Eis im Rührglas gerührt, mit Orangenzeste im Tumbler serviert.' : 
          'Equal parts (3 cl each) gin, sweet vermouth, and Campari; stirred with ice and garnished with orange peel.'}
      </p>
    </div>

    <div class="detail-section">
      <h3 class="detail-section-title">🥄 ${isDe ? 'Rühren (Stir) vs. Schütteln (Shake)' : 'Stirring vs. Shaking Technique'}</h3>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Rühren (Stir):' : 'Stirring:'}</strong> ${isDe ? 
          'Für Drinks aus rein klaren Spirituosen ohne Zitrussaft oder Eiweiß (z.B. Martini, Negroni, Manhattan). Verhindert Trübung und Luftblasen für eine seidige, glasklare Textur.' : 
          'For spirit-only cocktails without citrus or egg (Martini, Negroni, Manhattan). Preserves silky clarity and velvet mouthfeel.'}<br/>
        • <strong>${isDe ? 'Schütteln (Shake):' : 'Shaking:'}</strong> ${isDe ? 
          'Für Rezepte mit Zitrussäften, Eiweiß, Sahne oder Pürees (z.B. Whiskey Sour, Daiquiri). Kühlt blitzschnell ab und erzeugt durch Belüftung eine feine, cremige Schaumkrone.' : 
          'For drinks containing citrus juices, egg whites, cream, or syrups (Whiskey Sour, Daiquiri). Chills instantly and aerates to create a luscious frothy head.'}
      </p>
    </div>
  `;
}

function renderServiceGuide(isDe) {
  const el = document.getElementById('serviceCultureContent');
  if (!el) return;
  el.innerHTML = `
    <div class="detail-section" style="margin-bottom: 16px;">
      <h2 style="font-size: 1.25rem; font-weight: 800; color: var(--accent-gold); margin-bottom: 8px;">
        🛎️ ${isDe ? 'Service & Tischkultur (Eindecken, Gläser & Knigge)' : 'Service & Table Culture (Setting, Glassware & Etiquette)'}
      </h2>
      <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">
        ${isDe ? 
          'Professionelles Eindecken, Menü-Hierarchien, Besteckkunde, Servietten-Faltregeln und Weinservice-Standards im Restaurant.' : 
          'Professional table setting, cutlery logic, glassware hierarchy, napkin etiquette, and wine service standards.'}
      </p>
    </div>

    <div class="detail-section" style="margin-bottom: 14px;">
      <h3 class="detail-section-title">🍽️ ${isDe ? 'Professionelle Tisch-Eindeckung' : 'Professional Table Setting Protocol'}</h3>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Abstand zur Tischkante:' : 'Table Edge Distance:'}</strong> ${isDe ? 
          'Genormte 1 bis 2 cm (entspricht ca. zwei Fingerbreiten bzw. Daumenbreite).' : 
          'Standard 1 to 2 cm (approx. two finger breadths from the edge).'}<br/>
        • <strong>${isDe ? 'Besteck-Logik:' : 'Cutlery Sequence:'}</strong> ${isDe ? 
          'Von außen nach innen arbeiten. Der erste Gang liegt ganz außen. Gabeln stets links, Messer (Schneide immer nach innen zum Teller) und Suppenlöffel rechts.' : 
          'Work from outside in. First course is outermost. Forks on the left, knives (cutting edge inward facing plate) and soup spoon on the right.'}<br/>
        • <strong>${isDe ? 'Brotteller & Buttermesser:' : 'Bread Plate & Butter Knife:'}</strong> ${isDe ? 
          'Steht links neben dem Couvert. Das Buttermesser liegt auf der rechten Kante des Brottellers mit Klinge nach links.' : 
          'Positioned left of the cover. Butter spreader lies on the right edge with blade facing left.'}<br/>
        • <strong>${isDe ? 'Dessertbesteck:' : 'Dessert Cutlery:'}</strong> ${isDe ? 
          'Oberhalb des Platztellers platziert. Löffel zeigt nach links (Griff rechts), Gabel darunter zeigt nach rechts (Griff links).' : 
          'Above the show plate. Spoon points left (handle right), fork points right (handle left).'}
      </p>
    </div>

    <div class="detail-section" style="margin-bottom: 14px;">
      <h3 class="detail-section-title">🍷 ${isDe ? 'Gläser-Hierarchie & Anordnung' : 'Glassware Arrangement & Hierarchy'}</h3>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Richtglas:' : 'Anchor Glass:'}</strong> ${isDe ? 
          'Das Haupt-Wasserglas (oder Hauptweinglas) steht exakt über der Spitze des großen Fleischmessers.' : 
          'Water goblet positioned precisely above the tip of the dinner knife.'}<br/>
        • <strong>${isDe ? 'Diagonale Aufstellung (Klassiker):' : 'Diagonal Setting (Classic):'}</strong> ${isDe ? 
          'Vom Wasserglas ausgehend schräg nach rechts unten im 45°-Winkel: Rotweinglas, Weißweinglas, optional Champagnerflöte.' : 
          'From water glass sloping down right at 45 degrees: red wine glass, white wine glass, champagne flute.'}<br/>
        • <strong>${isDe ? 'Dreiecks-Aufstellung:' : 'Triangle Setting:'}</strong> ${isDe ? 
          'Kompakte Eleganz für Rundtische: Wasserglas hinten, Rotweinglas vorne links, Weißweinglas vorne rechts.' : 
          'Compact elegance for round tables: water back, red wine front left, white wine front right.'}
      </p>
    </div>

    <div class="detail-section" style="margin-bottom: 14px;">
      <h3 class="detail-section-title">🍴 ${isDe ? 'Vorlegebesteck & Kreuzkontaminationsschutz' : 'Serving Cutlery & Anti-Contamination Rules'}</h3>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Strikte Zuordnung:' : 'Strict Separation:'}</strong> ${isDe ? 
          'Jede Platte und Schüssel erhält ein eigenes, fest zugeordnetes Vorlegebesteck (Salatzange, Tortenheber, Suppenkelle).' : 
          'Every platter receives its dedicated serving utensil (tongs, cake server, ladle).'}<br/>
        • <strong>${isDe ? 'Allergen- & Keimschutz:' : 'Allergen & Cross-Contamination Guard:'}</strong> ${isDe ? 
          'Niemals Vorlegebestecke zwischen Allergenen (z.B. Nüsse, Milch) oder Roh- und Garwaren vertauschen!' : 
          'Never cross utensils between allergens (nuts, dairy) or raw and cooked items!'}
      </p>
    </div>

    <div class="detail-section">
      <h3 class="detail-section-title">👥 ${isDe ? 'Service-Etikette & Weinservice' : 'Service Etiquette & Wine Presentation'}</h3>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Einsetzen & Servieren:' : 'Placing & Serving:'}</strong> ${isDe ? 
          'Grundsätzlich von der rechten Seite des Gastes mit der rechten Hand. Vorlegeplatten von links präsentieren.' : 
          'Always served from the guest\\'s right side with the right hand. Sharing platters presented from the left.'}<br/>
        • <strong>${isDe ? 'Weinservice:' : 'Wine Service:'}</strong> ${isDe ? 
          'Flaschenetikett zeigt stets sichtbar zum Gast. Glas beim Einschenken niemals anheben; Tropfen mit eleganter Drehung und Serviette auffangen.' : 
          'Label kept facing the host. Never lift the glass while pouring; catch drops with a quarter-turn rotation and service cloth.'}<br/>
        • <strong>${isDe ? 'Bestecksprache:' : 'Cutlery Language:'}</strong> ${isDe ? 
          'Parallel auf 20 nach 4 Uhr = Gang beendet, bereit zum Abservieren. Gekreuzt auf dem Teller = kurze Essenspause.' : 
          'Parallel at twenty past four = course finished, ready to clear. Crossed on plate = pausing.'}
      </p>
    </div>
  `;
}

function renderScienceGuide(isDe) {
  const el = document.getElementById('scienceGuideContent');
  if (!el) return;
  el.innerHTML = `
    <div class="detail-section" style="margin-bottom: 16px;">
      <h2 style="font-size: 1.25rem; font-weight: 800; color: var(--accent-gold); margin-bottom: 8px;">
        🔬 ${isDe ? 'Wirkungslehre & Gastronomie-Physik' : 'Science & Culinary Physics'}
      </h2>
      <p style="font-size: 0.88rem; color: var(--text-secondary);">
        ${isDe ? 
          'Die chemischen und biologischen Vorgänge hinter Gärung, Destillation, Kohlensäure, Milch- und Eierkunde verständlich erklärt.' : 
          'Chemical and biological principles behind fermentation, distillation, carbonation, milk science, and HACCP food safety.'}
      </p>
    </div>

    <div class="detail-section" style="margin-bottom: 14px;">
      <h3 class="detail-section-title">⚗️ ${isDe ? 'Destillation vs. Fermentation' : 'Distillation vs. Fermentation'}</h3>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Fermentation (Gärung):' : 'Fermentation:'}</strong> ${isDe ? 
          'Hefen wandeln Einfachzucker (Fruktose, Glukose) unter Sauerstoffabschluss in Ethanol und CO2 um (Bier max. 12%, Wein max. 16%).' : 
          'Yeasts metabolize simple sugars anaerobically into ethanol and CO2 (beer max ~12%, wine max ~16%).'}<br/>
        • <strong>${isDe ? 'Destillation (Brennen):' : 'Distillation:'}</strong> ${isDe ? 
          'Trennt Alkohol (Siedepunkt 78,3°C) vom Wasser (100°C) durch kontrolliertes Verdampfen und anschließendes Kondensieren in Kupferkühlern.' : 
          'Separates volatile ethanol (boiling point 78.3°C) from water (100°C) through thermal vaporization and copper condensation.'}
      </p>
    </div>

    <div class="detail-section" style="margin-bottom: 14px;">
      <h3 class="detail-section-title">🫧 ${isDe ? 'Kohlensäure & Henry-Gesetz' : 'Carbonation & Henry\\'s Law'}</h3>
      <p class="detail-section-text">
        ${isDe ? 
          'Gase lösen sich in kalten Flüssigkeiten physikalisch viel stabiler als in warmen. Eiskaltes Mineralwasser oder Tonic bindet CO2 fest im Glas; bei Erwärmung perlt es explosionsartig aus.' : 
          'Gas solubility increases inversely with temperature. Chilled tonic or soda retains carbonation tightly; warm liquids release bubbles prematurely.'}
      </p>
    </div>

    <div class="detail-section" style="margin-bottom: 14px;">
      <h3 class="detail-section-title">🍳 ${isDe ? 'Eier-Chemie: 62°C vs. 68°C' : 'Egg Coagulation: 62°C vs. 68°C'}</h3>
      <p class="detail-section-text">
        ${isDe ? 
          'Eiklar gerinnt bei 62–65°C; Eidotter verdickt erst bei 65–70°C. Dieser thermische Abstand ermöglicht das perfekte wachsweiche Frühstücksei (6 Min) und das Onsen-Ei bei 64,5°C.' : 
          'Egg white proteins denature at 62-65°C; egg yolk thickens at 65-70°C. This temperature differential yields perfect soft-boiled and 64.5°C onsen eggs.'}
      </p>
    </div>

    <div class="detail-section" style="margin-bottom: 14px; border-left: 4px solid #ff4757;">
      <h3 class="detail-section-title" style="color: #ff6b81;">⚠️ ${isDe ? 'Lebensmittelsicherheit: Grillen & Brühwürste (Nitrosamine)' : 'Food Safety: Grilling & Cured Sausages (Nitrosamines)'}</h3>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Krebserregende Nitrosamine:' : 'Carcinogenic Nitrosamines:'}</strong> ${isDe ? 
          'Gepökelte Fleischwaren enthalten Natriumnitrit (E250). Bei hohen Temperaturen (>150°C auf dem Grillrost) reagiert Nitrit mit Fleisch-Aminen zu krebserregenden Nitrosaminen.' : 
          'Cured meats contain sodium nitrite (E250). High grilling heat (>150°C) causes nitrites and meat amines to synthesize carcinogenic nitrosamines.'}<br/>
        • <strong>${isDe ? 'Küchen-Regel:' : 'Kitchen Rule:'}</strong> ${isDe ? 
          'Brüh- und Pökelwürste (Wiener, Bockwurst, Leberkäse) nur im Wasserbad bei max. 80°C sieden – niemals grillen! Auf den Grill gehören ausschließlich ungepökelte Rostbratwürste.' : 
          'Poach cured sausages in water under 80°C – never grill directly! Use only fresh, uncured sausages prepared with plain sea salt for barbecue.'}
      </p>
    </div>

    <div class="detail-section" style="margin-bottom: 14px; border-left: 4px solid #2ed573;">
      <h3 class="detail-section-title" style="color: #2ed573;">🛡️ ${isDe ? 'HACCP & Schneidbrett-Farblehre' : 'HACCP Color-Coded Cutting Board Standard'}</h3>
      <p class="detail-section-text">
        ${isDe ? 
          'Strikte Trennung von Rohwaren verhindert Keimverschleppung:<br/>• 🔴 <strong>ROT:</strong> Rohes Fleisch (Rind, Schwein)<br/>• 🟡 <strong>GELB:</strong> Rohes Geflügel (Huhn, Pute – höchste Salmonellengefahr!)<br/>• 🔵 <strong>BLAU:</strong> Roher Fisch & Meeresfrüchte<br/>• 🟢 <strong>GRÜN:</strong> Gemüse, Salate & Obst<br/>• ⚪ <strong>WEISS:</strong> Backwaren, Käse & Milchprodukte<br/>• 🟤 <strong>BRAUN:</strong> Gegartes / gebratenes Fleisch' : 
          'Strict separation prevents bacterial cross-contamination:<br/>• 🔴 <strong>RED:</strong> Raw red meat (beef, pork)<br/>• 🟡 <strong>YELLOW:</strong> Raw poultry (chicken, turkey - high salmonella risk)<br/>• 🔵 <strong>BLUE:</strong> Raw fish & seafood<br/>• 🟢 <strong>GREEN:</strong> Fresh produce, vegetables & fruit<br/>• ⚪ <strong>WHITE:</strong> Bakery & dairy products<br/>• 🟤 <strong>BROWN:</strong> Cooked meats'}
      </p>
    </div>
  `;
}

function renderQuizHeaderStrings(isDe) {
  const title = document.getElementById('quizHeaderTitle');
  if (title) title.textContent = isDe ? '🎯 Multiple-Choice Team-Quiz' : '🎯 Multiple-Choice Team Quiz';

  const desc = document.getElementById('quizHeaderDesc');
  if (desc) desc.textContent = isDe ? 
    'Wähle eine Kategorie oder mixe alle Bereiche für deine 10 Prüfungsfragen:' : 
    'Choose a category or mix all topics for your 10 training questions:';

  const completeTitle = document.getElementById('quizCompleteTitle');
  if (completeTitle) completeTitle.textContent = isDe ? 'Schulung abgeschlossen!' : 'Training Completed!';

  const nameLabel = document.getElementById('quizStaffNameLabel');
  if (nameLabel) nameLabel.textContent = isDe ? 'Dein Name für den Barchef-Bericht:' : 'Your Name for Manager Report:';

  const staffInput = document.getElementById('quizStaffName');
  if (staffInput) staffInput.placeholder = isDe ? 'z.B. Anna Müller (Chef de Rang)' : 'e.g. Alex Miller (Sommelier)';

  const shareBtn = document.getElementById('quizShareBtn');
  if (shareBtn) shareBtn.textContent = isDe ? '📤 Ergebnis an Barchef / Quizmaster senden' : '📤 Send Score to Manager / Quizmaster';

  const restartBtn = document.getElementById('quizRestartBtn');
  if (restartBtn) restartBtn.textContent = isDe ? '🔄 Quiz erneut starten' : '🔄 Restart Quiz Session';
}
'''

idx = text.find('function renderLanguageLabels() {')
depth = 0
found_close = -1
for i in range(idx, len(text)):
    if text[i] == '{':
        depth += 1
    elif text[i] == '}':
        depth -= 1
        if depth == 0:
            found_close = i + 1
            break

text = text[:found_close] + '\n' + helpers + '\n' + text[found_close:]

with open('pwa/app.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('pwa/app.js successfully updated with bilingual knowledge guides!')
