package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.BubbleChart
import androidx.compose.material.icons.filled.Eco
import androidx.compose.material.icons.filled.LocalDrink
import androidx.compose.material.icons.filled.LocalFireDepartment
import androidx.compose.material.icons.filled.Restaurant
import androidx.compose.material.icons.filled.Science
import androidx.compose.material.icons.filled.Security
import androidx.compose.material.icons.filled.SetMeal
import androidx.compose.material.icons.filled.Thermostat
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.model.Language
import com.example.ui.GastroViewModel

@Composable
fun ScienceGuideScreen(
    viewModel: GastroViewModel,
    modifier: Modifier = Modifier
) {
    val language by viewModel.language.collectAsStateWithLifecycle()
    val scrollState = rememberScrollState()

    Column(
        modifier = modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp)
            .testTag("science_guide_screen"),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Hero Header
        Surface(
            shape = RoundedCornerShape(16.dp),
            color = MaterialTheme.colorScheme.primaryContainer,
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.Science,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.onPrimaryContainer,
                        modifier = Modifier.size(28.dp)
                    )
                    Spacer(modifier = Modifier.width(10.dp))
                    Text(
                        text = if (language == Language.DE) "Gastronomie-Wirkungslehre & Chemie" else "Hospitality Science & Beverage Chemistry",
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onPrimaryContainer
                    )
                }
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = if (language == Language.DE)
                        "Verstehe die physikalischen & biochemischen Grundlagen von Zuckerumwandlung, Brennvorgängen, Kohlensäure und Filler-Zutaten."
                    else
                        "Master the biochemical and physical principles behind sugar-to-alcohol conversion, distillation curves, and carbonation.",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onPrimaryContainer
                )
            }
        }

        // SECTION 1: HOW ALCOHOL IS FORMED (ZUCKERUMWANDLUNG)
        ScienceCard(
            title = if (language == Language.DE) "1. Die alkoholische Gärung (Zuckerumwandlung)" else "1. Alcoholic Fermentation (Sugar Conversion)",
            icon = Icons.Default.Eco
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text(
                    text = if (language == Language.DE)
                        "Alkohol entsteht in der Natur niemals von selbst – er ist immer das Stoffwechselprodukt von Hefepilzen (meist Saccharomyces cerevisiae), die einfache Zucker (Glukose, Fruktose) anaerob (unter Luftausschluss) verstoffwechseln."
                    else
                        "Alcohol never occurs spontaneously in nature — it is always the metabolic byproduct of yeast (primarily Saccharomyces cerevisiae) metabolizing simple sugars anaerobically (without oxygen).",
                    style = MaterialTheme.typography.bodyMedium
                )

                // Chemical Equation Box
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(MaterialTheme.colorScheme.surface, RoundedCornerShape(8.dp))
                        .border(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.3f), RoundedCornerShape(8.dp))
                        .padding(12.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text(
                            text = "C₆H₁₂O₆  ➜  2 C₂H₅OH  +  2 CO₂  +  Wärme",
                            fontFamily = FontFamily.Monospace,
                            fontWeight = FontWeight.Bold,
                            fontSize = 14.sp,
                            color = MaterialTheme.colorScheme.primary
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = if (language == Language.DE)
                                "1 Molekül Zucker ➜ 2 Moleküle Ethanol + 2 Moleküle Kohlendioxid"
                            else
                                "1 Sugar Molecule ➜ 2 Ethanol Molecules + 2 Carbon Dioxide Molecules",
                            style = MaterialTheme.typography.labelSmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }

                Text(
                    text = if (language == Language.DE)
                        "• Natürliche Grenze: Bei etwa 14% bis max. 16% Vol. sterben Hefen an ihrem eigenen Stoffwechselprodukt ab (Ethanol-Toxizität). Für höhere Alkoholstärken ist zwingend eine Destillation notwendig!"
                    else
                        "• Biological Limit: At ~14% to 16% ABV, yeast cells perish from ethanol toxicity. Higher alcohol concentrations strictly require distillation!",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }

        // SECTION 2: BRAUVORGANG & MAISCHEN VS DESTILLAT
        ScienceCard(
            title = if (language == Language.DE) "2. Brauvorgang vs. Destillation" else "2. Brewing & Mashing vs. Distillation",
            icon = Icons.Default.Thermostat
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                ComparisonConcept(
                    title = if (language == Language.DE) "Brauvorgang & Maischen (Stärkeaufspaltung)" else "Brewing & Mashing (Starch Breakdown)",
                    desc = if (language == Language.DE)
                        "Getreide (Gerste, Weizen, Mais) enthält keinen freien Zucker, sondern lange Stärkeketten. Durch das 'Mälzen' (Ankeimen und Darren) werden Enzyme (Alpha- und Beta-Amylasen) geweckt. Beim Maischen mit warmem Wasser zerlegen diese Enzyme Stärke in vergärbare Maltose. Erst jetzt kann die Hefe arbeiten!"
                    else
                        "Grains (barley, rye, wheat, corn) do not contain free simple sugar, only long starch chains. 'Malting' (germination and kilning) activates amylase enzymes. During warm-water mashing, amylases cleave starch into fermentable maltose for yeast to consume."
                )

                HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f))

                ComparisonConcept(
                    title = if (language == Language.DE) "Destillation (Siedepunkt-Trennung)" else "Distillation (Boiling Point Separation)",
                    desc = if (language == Language.DE)
                        "Reines Ethanol siedet bereits bei 78,3°C, Wasser erst bei 100°C. Durch Erhitzen der vergorenen Maische verdampft der Alkohol zuerst, steigt in der Brennblase auf, wird im Kühler kondensiert und als hochprozentiges Destillat (60-96% Vol.) aufgefangen.\n" +
                        "• Pot Still (Kupferblase): Behält viele Aromastoffe (Scotch, Cognac, Rum).\n" +
                        "• Column Still (Kolonne): Rektifiziert neutral und extrem rein (Wodka, London Dry Gin Base)."
                    else
                        "Pure ethanol boils at 78.3°C, water at 100°C. Heating the fermented mash vaporizes ethanol first; vapors rise up the still, condense in cold coils, and yield high-proof distillate (60-96% ABV).\n" +
                        "• Pot Still: Retains heavy flavorful congeners (Scotch, Cognac, Jamaican Rum).\n" +
                        "• Column Still: Continuous rectification to pristine purity (Vodka, Gin neutral base)."
                )
            }
        }

        // SECTION 3: DER STOFF IM WASSER (KOHLENSÄURE)
        ScienceCard(
            title = if (language == Language.DE) "3. Warum sprudelt Wasser? (CO₂ & Kohlensäure)" else "3. Why Water Fizzes (Carbonic Acid Science)",
            icon = Icons.Default.BubbleChart
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text(
                    text = if (language == Language.DE)
                        "Gastfrage: 'Was ist der Stoff im Wasser, damit das sprudelt?'\n" +
                        "Es ist reines Kohlendioxidgas (CO₂). Wird CO₂ unter hohem Druck (3-5 bar) in kaltes Wasser gepresst, löst es sich physikalisch auf. Ein kleiner Teil (~0,2%) reagiert chemisch mit H₂O zu echter Kohlensäure:"
                    else
                        "Guest Question: 'What is the substance in water that makes it bubble?'\n" +
                        "It is carbon dioxide gas (CO2). Injected into cold water under 3-5 bar of pressure, it dissolves into the water. A small fraction (~0.2%) reacts chemically to form true carbonic acid:",
                    style = MaterialTheme.typography.bodyMedium
                )

                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(MaterialTheme.colorScheme.surface, RoundedCornerShape(8.dp))
                        .border(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.3f), RoundedCornerShape(8.dp))
                        .padding(10.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "CO₂ (Gas) + H₂O (Wasser) ⇌ H₂CO₃ (Kohlensäure)",
                        fontFamily = FontFamily.Monospace,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF0288D1)
                    )
                }

                Text(
                    text = if (language == Language.DE)
                        "• Warum schmeckt Sprudel frisch? Die Kohlensäure senkt den pH-Wert leicht ab. Im Mund stimulieren die platzenden Bläschen sowohl Kälterezeptoren als auch das Enzym Carboanhydrase auf der Zunge – das Gehirn meldet 'maximale Frische'!\n" +
                        "• Physik-Fakt: Kaltes Wasser kann viel mehr CO₂ binden als warmes. Steht eine Flasche in der Sonne, gast das CO₂ explosionsartig aus."
                    else
                        "• Why is it perceived as fresh? Carbonic acid lowers pH to ~4.5. On the tongue, bursting micro-bubbles stimulate TRPA1 mechanoreceptors and the enzyme carbonic anhydrase — perceived by the brain as effervescent freshness!\n" +
                        "• Temperature rule: Cold water dissolves substantially more gas than warm liquid. Warm soda degasses instantly upon opening.",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }

        // SECTION 4: INGREDIENTS OF SOFT DRINKS (COLA, TONIC, BITTER LEMON, ENERGY)
        ScienceCard(
            title = if (language == Language.DE) "4. Filler- & Softdrink-Geheimnisse" else "4. Soft Drink & Mixer Formulations",
            icon = Icons.Default.LocalDrink
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                ComparisonConcept(
                    title = if (language == Language.DE) "Cola: Warum Phosphorsäure statt Zitronensäure?" else "Cola: Why Phosphoric Acid?",
                    desc = if (language == Language.DE)
                        "Klassische Fruchtlimonaden nutzen Zitronensäure. Cola setzt auf Phosphorsäure (H₃PO₄), weil sie keinen fruchtigen Beigeschmack hat, sondern einen trockenen, säuerlich-herben Biss liefert, der die enorme Süße (über 100g Zucker/Liter) am Gaumen ausbalanciert."
                    else
                        "Fruity sodas utilize citric acid. Cola relies on phosphoric acid (H3PO4) because it delivers a neutral, sharp, dry bite without fruity undertones, cutting through heavy sugar levels (~100g/L)."
                )

                HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f))

                ComparisonConcept(
                    title = if (language == Language.DE) "Tonic Water & Bitter Lemon: Das Chinin-Phänomen" else "Tonic & Bitter Lemon: The Quinine Phenomenon",
                    desc = if (language == Language.DE)
                        "Chinin wird aus der Rinde des Chinarindenbaums gewonnen. Es bindet an die menschlichen TAS2R-Bitterrezeptoren und diente ursprünglich als Malariaprophylaxe. Chinin ist photoaktiv: Unter Schwarzlicht (UV-A) leuchtet es strahlend blau!"
                    else
                        "Extracted from Cinchona tree bark, quinine binds to TAS2R bitter receptors. Photoactive alkaloid: Absorbs ultraviolet photons and emits a brilliant blue fluorescence under UV blacklight."
                )

                HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f))

                ComparisonConcept(
                    title = if (language == Language.DE) "Energy Drinks: Taurin & Koffein-Synergie" else "Energy Drinks: Taurine & Caffeine Synergy",
                    desc = if (language == Language.DE)
                        "Koffein (32mg/100ml) blockiert die schlaffördernden Adenosin-Rezeptoren im Gehirn. Taurin ist eine körpereigene Aminosulfonsäure, die den Flüssigkeitshaushalt der Muskelzellen stabilisiert. Entgegen Mythen stammt Taurin nicht aus Stieren, sondern wird rein synthetisch hergestellt."
                    else
                        "Caffeine (32mg/100ml legal EU cap) blocks adenosine fatigue receptors. Taurine is an amino sulfonic acid regulating cellular hydration and bile function. Synthesized 100% vegan in certified laboratories."
                )
            }
        }

        // SECTION 5: PLANT ORIGINS COMPASS (WELCHE PFLANZE ERZEUGT WAS?)
        ScienceCard(
            title = if (language == Language.DE) "5. Rohstoff-Kompass: Welche Pflanze ergibt was?" else "5. Botanical Origins Compass",
            icon = Icons.Default.Eco
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                BotanicalOriginItem(
                    plant = if (language == Language.DE) "Gerste / Gerstenmalz (Hordeum vulgare)" else "Barley (Hordeum vulgare)",
                    yields = if (language == Language.DE) "Bier, Single Malt Scotch Whisky, Irish Whiskey" else "Beer, Single Malt Scotch, Irish Whiskey"
                )
                BotanicalOriginItem(
                    plant = if (language == Language.DE) "Mais (Zea mays)" else "Corn / Maize (Zea mays)",
                    yields = if (language == Language.DE) "Bourbon Whiskey (mind. 51%), Moonshine" else "Bourbon Whiskey (>=51% mash), Moonshine"
                )
                BotanicalOriginItem(
                    plant = if (language == Language.DE) "Zuckerrohr (Saccharum officinarum)" else "Sugarcane (Saccharum officinarum)",
                    yields = if (language == Language.DE) "Rum (Melasse oder frischer Saft), Cachaça" else "Rum (molasses or fresh cane juice), Cachaça"
                )
                BotanicalOriginItem(
                    plant = if (language == Language.DE) "Blaue Agave (Agave tequilana Weber)" else "Blue Agave (Agave tequilana)",
                    yields = if (language == Language.DE) "Tequila (Jalisco), Mezcal (weitere Agavenarten)" else "Tequila (Jalisco), Mezcal (various agaves)"
                )
                BotanicalOriginItem(
                    plant = if (language == Language.DE) "Weintrauben (Vitis vinifera)" else "Wine Grapes (Vitis vinifera)",
                    yields = if (language == Language.DE) "Wein, Champagner, Cognac, Armagnac, Grappa" else "Wine, Champagne, Cognac, Armagnac, Grappa"
                )
                BotanicalOriginItem(
                    plant = if (language == Language.DE) "Wacholder (Juniperus communis)" else "Juniper (Juniperus communis)",
                    yields = if (language == Language.DE) "Gin, Genever, Steinhäger" else "London Dry Gin, Genever, Distilled Gin"
                )
                BotanicalOriginItem(
                    plant = if (language == Language.DE) "Kartoffel & Weizen (Solanum / Triticum)" else "Potato & Wheat (Solanum / Triticum)",
                    yields = if (language == Language.DE) "Wodka, Korn, Neutralalkohol für Liköre" else "Vodka, Korn, Neutral spirit for liqueurs"
                )
            }
        }

        // SECTION 6: FOOD SAFETY & GRILLEN GEPOEKELTER WAREN (NITROSAMINE)
        ScienceCard(
            title = if (language == Language.DE) "6. Lebensmittelsicherheit: Grillen gepökelter & geräucherter Fleischwaren" else "6. Food Safety: Grilling Cured & Smoked Meats",
            icon = Icons.Default.Warning
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                ComparisonConcept(
                    title = if (language == Language.DE) "⚠️ Krebserregende Nitrosamine: Warum Brüh- & Pökelwürste nicht auf den Grill gehören!" else "⚠️ Carcinogenic Nitrosamines: Why Cured Sausages Must Not Be Grilled",
                    desc = if (language == Language.DE)
                        "Gepökelte Fleischwaren (Kasseler, Wiener Würstchen, Bockwurst, Fleischkäse, Speck, geräucherter Schinken) enthalten Natriumnitrit (E250). Bei hohen Temperaturen (Grillrost, heiße Pfanne über 150°C) reagiert das Nitrit mit körpereigenen Aminosäuren zu krebserregenden Nitrosaminen (v.a. Dimethylnitrosamin).\n\n" +
                        "• Faustregel für die Küche: Gepökelte Brühwürste ausschließlich im heißen Wasserbad (max. 80°C) ziehen lassen – niemals direkt auf offenes Feuer oder Grillstäbe legen!\n" +
                        "• Für Grill & BBQ: Nur rohe, ungepökelte Grillwürste (z.B. Thüringer Rostbratwurst mit reinem Kochsalz) oder frisches Fleisch verwenden."
                    else
                        "Cured meats (cured pork loin, frankfurters, bockwurst, leberkäse, bacon, smoked ham) contain sodium nitrite (E250). Exposed to high dry heat (>150°C / grilling / searing), nitrites react with secondary meat amines forming highly carcinogenic nitrosamines.\n\n" +
                        "• Kitchen Golden Rule: Gently steep cured sausages in water bath (<80°C) — never grill over direct open fire or charcoal!\n" +
                        "• For Grills & BBQ: Exclusively grill uncured raw bratwurst preserved solely with pure table salt."
                )

                HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f))

                ComparisonConcept(
                    title = if (language == Language.DE) "Rauchgase & PAK (Polyzyklische Aromatische Kohlenwasserstoffe)" else "Smoke & PAHs (Polycyclic Aromatic Hydrocarbons)",
                    desc = if (language == Language.DE)
                        "Tropft Fett oder Marinade direkt in die glühenden Kohlen, verbrennt es unvollständig und erzeugt giftigen, bläulichen Rauch reich an Benzo[a]pyren. Dieser Rauch schlägt sich direkt auf der Fleischoberfläche nieder. Verwende Grillschalen oder indirekte Grillzonen."
                    else
                        "Fat dripping onto hot coals pyrolyzes into polycyclic aromatic hydrocarbons (PAHs such as benzo[a]pyrene), rising back into the food via smoke. Always use drip trays or indirect heat zones."
                )
            }
        }

        // SECTION 7: HACCP & KREUZKONTAMINATION IN DER PROFIKÜCHE
        ScienceCard(
            title = if (language == Language.DE) "7. HACCP & Kreuzkontamination (Schneidbrett-System)" else "7. HACCP & Cross-Contamination (Color-Coded Boards)",
            icon = Icons.Default.Security
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                ComparisonConcept(
                    title = if (language == Language.DE) "Strengste Trennung von Rohwaren: Gemüse vs. Geflügel vs. Fisch" else "Strict Separation: Raw Poultry vs. Fish vs. Vegetables",
                    desc = if (language == Language.DE)
                        "Kreuzkontamination entsteht, wenn Keime von rohen tierischen Produkten (Campylobacter auf Geflügel, Salmonellen auf Eiern/Schweinefleisch, Listerien oder Anisakis auf Fisch) auf verzehrfertige Lebensmittel wie Salat oder Obst übertragen werden.\n\n" +
                        "Profi-Schneidebrett-Farbkodierung nach HACCP:\n" +
                        "🔴 ROT: Rohes Fleisch (Rind, Schwein, Lamm)\n" +
                        "🟡 GELB: Rohes Geflügel (Hähnchen, Pute – höchste Keimlast!)\n" +
                        "🔵 BLAU: Roher Fisch & Meeresfrüchte\n" +
                        "🟢 GRÜN: Gemüse, Obst & Salate\n" +
                        "⚪ WEISS: Backwaren, Milchprodukte & Käse\n" +
                        "🟤 BRAUN: Gegartes / gebratenes Fleisch"
                    else
                        "Cross-contamination occurs when pathogens from raw animal products (Campylobacter, Salmonella, Listeria) transfer onto ready-to-eat salads or fruit.\n\n" +
                        "HACCP Color-Coded Cutting Board Standard:\n" +
                        "🔴 RED: Raw red meat (beef, pork, lamb)\n" +
                        "🟡 YELLOW: Raw poultry (highest bacterial risk!)\n" +
                        "🔵 BLUE: Raw fish & seafood\n" +
                        "🟢 GREEN: Produce, fruit & salads\n" +
                        "⚪ WHITE: Bakery, cheese & dairy\n" +
                        "🟤 BROWN: Cooked & carved meats"
                )
            }
        }

        // SECTION 8: KERNTEMPERATUREN & GARSTUFEN (ROH VS. DURCHGEGART)
        ScienceCard(
            title = if (language == Language.DE) "8. Garstufen & Mikrobiologie: Was darf roh gegessen werden?" else "8. Safe Cooking Temperatures: What Can Be Eaten Raw?",
            icon = Icons.Default.LocalFireDepartment
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                ComparisonConcept(
                    title = if (language == Language.DE) "Verzehrsicherheit von Rohwaren" else "Microbiological Raw Safety Rules",
                    desc = if (language == Language.DE)
                        "• Rindfleisch (Steak, Carpaccio, Tatar): Keime sitzen nur auf der äußeren Schnittfläche. Daher kann ein Rindersteak innen blutig (Rare 48-52°C) oder rosa (Medium 56-58°C) gegessen werden, sobald die Außenfläche scharf angebraten ist. Tatar muss tagesfrisch zubereitet werden!\n" +
                        "• Geflügel (Huhn, Pute, Ente): NIEMALS roh oder rosa verzehren! Geflügel muss ausnahmslos auf mindestens 74°C Kerntemperatur durchgegart werden, um Salmonellen & Campylobacter sicher abzutöten.\n" +
                        "• Schweinefleisch: Früher wegen Trichinen zwingend durchgegart; heute in der EU kontrolliert. Hochwertiges Schweinefilet darf leicht zartrosa (60-65°C) serviert werden. Mett / Hackepeter unterliegt strengster Hackfleisch-Verordnung (Herstellung & Verkauf am selben Kalendertag bei max. 4°C).\n" +
                        "• Fisch & Sushi: Rohverzehr (Lachs, Gelbflossenthunfisch) erfordert nach EU-Verordnung 853/2004 ein gesetzliches Schockfrosten bei mind. -20°C für mindestens 24 Stunden, um Fadenwurm-Parasiten (Anisakis) zuverlässig abzutöten. Wildfisch aus Flüssen oder Seen niemals roh essen!"
                    else
                        "• Beef (Steaks, Carpaccio, Tartare): Bacteria colonize only external cuts. A whole steak can be served rare (48-52°C) once exterior is seared. Fresh tartare must be prepared on day of consumption!\n" +
                        "• Poultry (Chicken, Turkey): NEVER eaten raw or pink. Core temperature must reach min. 74°C to neutralize Campylobacter & Salmonella.\n" +
                        "• Pork: High quality pork tenderloin can be served tender pink at 62-65°C. Raw minced pork (Mett) strictly governed by cold-chain laws (<4°C, sold on production day).\n" +
                        "• Fish & Sushi: Under EU Regulation 853/2004, wild fish destined for raw eating must be blast-frozen at -20°C for at least 24 hours to eradicate Anisakis parasites."
                )

                HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f))

                ComparisonConcept(
                    title = if (language == Language.DE) "Die mikrobiologische Temperaturzone (Gefahrenbereich)" else "The Bacterial Danger Zone",
                    desc = if (language == Language.DE)
                        "Zwischen +10°C und +60°C verdoppeln sich pathogene Keime alle 20 Minuten! Gekochte Speisen müssen entweder über 65°C heiß gehalten oder innerhalb von maximal 90 Minuten auf unter 10°C schockgekühlt werden."
                    else
                        "Between 10°C and 60°C, foodborne bacteria double exponentially every 20 minutes! Hot food must be held >65°C or blast-chilled to <10°C within 90 minutes."
                )
            }
        }

        Spacer(modifier = Modifier.height(80.dp))
    }
}

@Composable
fun ScienceCard(
    title: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    content: @Composable () -> Unit
) {
    Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.primary,
                    modifier = Modifier.size(22.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurface
                )
            }
            Spacer(modifier = Modifier.height(12.dp))
            content()
        }
    }
}

@Composable
fun ComparisonConcept(title: String, desc: String) {
    Column {
        Text(
            text = title,
            style = MaterialTheme.typography.titleSmall,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.primary
        )
        Spacer(modifier = Modifier.height(4.dp))
        Text(
            text = desc,
            style = MaterialTheme.typography.bodySmall,
            lineHeight = 20.sp,
            color = MaterialTheme.colorScheme.onSurface
        )
    }
}

@Composable
fun BotanicalOriginItem(plant: String, yields: String) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.Top
    ) {
        Text(
            text = plant,
            style = MaterialTheme.typography.bodySmall,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onSurface,
            modifier = Modifier.weight(1f)
        )
        Spacer(modifier = Modifier.width(8.dp))
        Text(
            text = yields,
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.primary,
            modifier = Modifier.weight(1.2f)
        )
    }
}
