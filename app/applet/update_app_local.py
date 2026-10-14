with open('pwa/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

old_labels = '''  const tabQuizLabel = document.getElementById('tabQuizLabel');
  if (tabQuizLabel) tabQuizLabel.textContent = isDe ? "Quiz-Trainer" : "Quiz";'''

new_labels = '''  const tabCocktailsLabel = document.getElementById('tabCocktailsLabel');
  if (tabCocktailsLabel) tabCocktailsLabel.textContent = isDe ? "Cocktails" : "Cocktails";
  const tabServiceLabel = document.getElementById('tabServiceLabel');
  if (tabServiceLabel) tabServiceLabel.textContent = isDe ? "Service" : "Service";
  const tabQuizLabel = document.getElementById('tabQuizLabel');
  if (tabQuizLabel) tabQuizLabel.textContent = isDe ? "Quiz-Trainer" : "Quiz";'''

if old_labels in text:
    text = text.replace(old_labels, new_labels)

new_service = '''
function renderServiceGuide(isDe) {
  const el = document.getElementById('serviceCultureContent');
  if (!el) return;
  el.innerHTML = `
    <div class="detail-section" style="margin-bottom: 16px;">
      <h2 style="font-size: 1.25rem; font-weight: 800; color: var(--accent-gold); margin-bottom: 8px;">
        🛎️ ${isDe ? 'Service, Eindecken & Tischkultur (PBA Non-Food)' : 'Service, Table Setting & Etiquette (Non-Food)'}
      </h2>
      <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">
        ${isDe ? 
          'Professionelles Eindecken, Tischabdeckung, Serviettenfalttechniken, Gläser- & Besteckkunde sowie Vorlegebesteck-Regeln mit fotorealistischen Schema-Vorlagen.' : 
          'Professional table setting, cover arrangements, napkin folding, glassware hierarchy, and service etiquette with visual layout diagrams.'}
      </p>
    </div>

    <!-- 1. Table Setting Schema Card with Photo -->
    <div class="detail-section" style="margin-bottom: 16px;">
      <div style="border-radius: 12px; overflow: hidden; margin-bottom: 12px; border: 1px solid var(--border-subtle);">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80" alt="Table Setting Schema" style="width: 100%; height: 200px; object-fit: cover; display: block;" />
      </div>
      <h3 class="detail-section-title">🍽️ ${isDe ? '1. Professionelle Tisch-Eindeckung (Gala vs. À la carte)' : '1. Professional Table Settings (Gala vs. À la carte)'}</h3>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Abstand zur Tischkante:' : 'Edge Distance:'}</strong> ${isDe ? 
          'Genormte 1 bis 2 cm (ca. zwei Daumenbreiten) vom Tischrand für Teller und Besteck.' : 
          'Standardized 1 to 2 cm from table edge for plates and cutlery.'}<br/>
        • <strong>${isDe ? 'Besteck-Logik:' : 'Cutlery Logic:'}</strong> ${isDe ? 
          'Von außen nach innen arbeiten. Der erste Gang liegt ganz außen. Gabeln links, Messer (Klinge zum Teller) und Suppenlöffel rechts.' : 
          'Work from outside in. First course is outermost. Forks left, knives (blade inward) and soup spoon right.'}<br/>
        • <strong>${isDe ? 'Brotteller & Buttermesser:' : 'Bread Plate & Butter Knife:'}</strong> ${isDe ? 
          'Links neben dem Couvert platziert. Das Buttermesser liegt auf der rechten Kante mit Klinge nach links.' : 
          'Placed left of cover. Butter knife rests on the right edge with blade facing left.'}
      </p>
    </div>

    <!-- 2. Glassware Hierarchy Schema Card with Photo -->
    <div class="detail-section" style="margin-bottom: 16px;">
      <div style="border-radius: 12px; overflow: hidden; margin-bottom: 12px; border: 1px solid var(--border-subtle);">
        <img src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&auto=format&fit=crop&q=80" alt="Glassware Hierarchy" style="width: 100%; height: 200px; object-fit: cover; display: block;" />
      </div>
      <h3 class="detail-section-title">🍷 ${isDe ? '2. Gläser-Hierarchie & Anordnung' : '2. Glassware Hierarchy & Arrangement'}</h3>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Richtglas:' : 'Anchor Glass:'}</strong> ${isDe ? 
          'Das Haupt-Wasserglas (oder Rotweinglas beim Menü) steht genau senkrecht über der Spitze des Fleischmessers.' : 
          'Main water glass (or red wine glass) stands precisely above the tip of the dinner knife.'}<br/>
        • <strong>${isDe ? 'Diagonale Aufstellung (Klassiker):' : 'Diagonal Setup (Classic):'}</strong> ${isDe ? 
          'Vom Wasserglas schräg nach rechts unten im 45°-Winkel: Rotweinglas, Weißweinglas, Champagnerflöte.' : 
          'From water glass sloping down right at 45 degrees: red wine glass, white wine glass, flute.'}
      </p>
    </div>

    <!-- 3. Napkin Folding & Hygiene Card with Photo -->
    <div class="detail-section" style="margin-bottom: 16px;">
      <div style="border-radius: 12px; overflow: hidden; margin-bottom: 12px; border: 1px solid var(--border-subtle);">
        <img src="https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80" alt="Napkin Folding" style="width: 100%; height: 200px; object-fit: cover; display: block;" />
      </div>
      <h3 class="detail-section-title">🧻 ${isDe ? '3. Serviettenfalttechnik & Hygiene' : '3. Napkin Folding & Hygiene Protocol'}</h3>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Hygiene-Protokoll:' : 'Hygiene Protocol:'}</strong> ${isDe ? 
          'Stoffservietten ausschließlich mit frisch gewaschenen, desinfizierten Händen oder Servierzangen falten.' : 
          'Fabric napkins must be folded exclusively with freshly washed, sanitized hands or tongs.'}<br/>
        • <strong>${isDe ? 'Mundkontakt-Schutz:' : 'Mouth Contact Protection:'}</strong> ${isDe ? 
          'Bereiche der Serviette, die mit dem Gesicht des Gastes in Berührung kommen, beim Falten niemals berühren.' : 
          'Never touch areas of the napkin that will contact the guest\\'s mouth during folding.'}
      </p>
    </div>

    <!-- 4. Serving Utensils & Etiquette -->
    <div class="detail-section">
      <div style="border-radius: 12px; overflow: hidden; margin-bottom: 12px; border: 1px solid var(--border-subtle);">
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80" alt="Service Etiquette" style="width: 100%; height: 200px; object-fit: cover; display: block;" />
      </div>
      <h3 class="detail-section-title">👥 ${isDe ? '4. Vorlegebesteck & Service-Etikette' : '4. Serving Utensils & Etiquette'}</h3>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Keine Kreuzkontamination:' : 'No Cross-Contamination:'}</strong> ${isDe ? 
          'Niemals Vorlegebestecke zwischen Allergenen oder Roh- und Garwaren vertauschen.' : 
          'Never mix serving utensils between allergens or raw and cooked goods.'}<br/>
        • <strong>${isDe ? 'Einsetzen & Abräumen:' : 'Serving & Clearing:'}</strong> ${isDe ? 
          'Speisen und Getränke grundsätzlich von der rechten Seite des Gastes einsetzen.' : 
          'Always serve food and beverages from the guest\\'s right side.'}
      </p>
    </div>
  `;
}
'''

new_cocktails = '''
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
          'Klassische Bar-Rezepte, Highball-Balance, Eis-Thermodynamik und professionelle Bartender-Handgriffe mit Foto-Impressionen.' : 
          'Classic bar recipes, highball balance, ice thermodynamics, and professional mixology techniques with photo inspiration.'}
      </p>
    </div>

    <!-- Cocktail Photo Banner 1 -->
    <div class="detail-section" style="margin-bottom: 16px;">
      <div style="border-radius: 12px; overflow: hidden; margin-bottom: 12px; border: 1px solid var(--border-subtle);">
        <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=80" alt="Cocktail Bar" style="width: 100%; height: 200px; object-fit: cover; display: block;" />
      </div>
      <h3 class="detail-section-title">🧊 ${isDe ? 'Eis-Thermodynamik & Vorkühlung' : 'Ice Thermodynamics & Pre-Chilling'}</h3>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Große Eiswürfel & Chunks:' : 'Large Ice Cubes & Chunks:'}</strong> ${isDe ? 
          'Große, klare Eisblöcke besitzen ein minimales Oberflächen-zu-Volumen-Verhältnis, schmelzen extrem langsam und halten Longdrinks eiskalt ohne Verwässerung.' : 
          'Large clear ice blocks have minimal surface-to-volume ratio, melting slowly and keeping highballs ice cold without watering down.'}<br/>
        • <strong>${isDe ? 'Glas-Vorkühlung:' : 'Glass Pre-Chilling:'}</strong> ${isDe ? 
          'Vorgekühlte Tumbler oder Ballongläser verhindern Temperaturschocks und halten Kohlensäure länger im Getränk.' : 
          'Pre-chilled tumblers prevent temperature shock and keep carbonation longer.'}
      </p>
    </div>

    <!-- Cocktail Photo Banner 2 -->
    <div class="detail-section" style="margin-bottom: 16px;">
      <div style="border-radius: 12px; overflow: hidden; margin-bottom: 12px; border: 1px solid var(--border-subtle);">
        <img src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80" alt="Cocktail Glass" style="width: 100%; height: 200px; object-fit: cover; display: block;" />
      </div>
      <h3 class="detail-section-title">🍹 ${isDe ? 'Klassische Longdrink-Standards' : 'Classic Highball Standards'}</h3>
      <p class="detail-section-text">
        • <strong>Gin & Tonic:</strong> ${isDe ? '5 cl Premium Dry Gin, 150-200 ml Tonic Water, massives Eis, frische botanische Garnitur (Zitruszeste oder Gurke).' : '5 cl premium dry gin, 150-200 ml tonic water, solid ice, fresh botanical garnish.'}<br/>
        • <strong>Moscow Mule:</strong> ${isDe ? '5 cl Vodka, 2 cl Limettensaft, 150 ml Ginger Beer, Gurkenscheibe & Minze im Kupferbecher.' : '5 cl vodka, 2 cl lime juice, 150 ml ginger beer, cucumber & mint in a copper mug.'}<br/>
        • <strong>Negroni:</strong> ${isDe ? 'Zu gleichen Teilen (je 3 cl) Gin, Vermouth Rosso und Campari; auf Eis gerührt, mit Orangenzeste.' : 'Equal parts (3 cl each) gin, sweet vermouth, and Campari; stirred with ice, orange zest.'}
      </p>
    </div>

    <!-- Cocktail Photo Banner 3 -->
    <div class="detail-section">
      <div style="border-radius: 12px; overflow: hidden; margin-bottom: 12px; border: 1px solid var(--border-subtle);">
        <img src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&auto=format&fit=crop&q=80" alt="Bartender Mixing" style="width: 100%; height: 200px; object-fit: cover; display: block;" />
      </div>
      <h3 class="detail-section-title">🥄 ${isDe ? 'Rühren (Stir) vs. Schütteln (Shake)' : 'Stirring vs. Shaking Technique'}</h3>
      <p class="detail-section-text">
        • <strong>${isDe ? 'Rühren (Stir):' : 'Stirring:'}</strong> ${isDe ? 'Für Drinks aus reinen Spirituosen ohne Fruchtsaft oder Eier (z.B. Negroni, Martini). Verhindert Trübung für seidenweiche Textur.' : 'For spirit-only drinks without juice or egg (Negroni, Martini). Preserves velvety clarity.'}<br/>
        • <strong>${isDe ? 'Schütteln (Shake):' : 'Shaking:'}</strong> ${isDe ? 'For ingredients with citrus, eggs, or syrup (Sour, Daiquiri). Kühlt rasch und erzeugt eine feine Schaumkrone.' : 'For ingredients with citrus, eggs, or syrup (Sour, Daiquiri). Chills quickly and creates a frothy head.'}
      </p>
    </div>
  `;
}
'''

import re
text = re.sub(r'function renderServiceGuide\(isDe\)\s*\{.*?\n\}\s*\n', new_service, text, flags=re.DOTALL)
text = re.sub(r'function renderCocktailsGuide\(isDe\)\s*\{.*?\n\}\s*\n', new_cocktails, text, flags=re.DOTALL)

with open('pwa/app.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('pwa/app.js updated successfully!')
