#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_master_quiz.py
Generates 18-20 bilingual (German & English) gastronomy professional quiz questions
per segment (category) across all 16 categories, totaling 290+ high-caliber questions.
Writes directly to master_quiz_dataset.json.
"""

import json

QUIZ = []

def add_q(qid, cat, q_en, q_de, opts_en, opts_de, correct_idx, exp_en, exp_de):
    QUIZ.append({
        "id": qid,
        "category": cat,
        "questionEn": q_en,
        "questionDe": q_de,
        "optionsEn": opts_en,
        "optionsDe": opts_de,
        "correctIndex": correct_idx,
        "explanationEn": exp_en,
        "explanationDe": exp_de
    })

# ==========================================
# 1. SPIRITS (18 Questions)
# ==========================================
add_q(
    "q_spirits_bourbon", "spirits",
    "What is the legal minimum percentage of corn required in the grain mash for Bourbon Whiskey?",
    "Wie hoch muss der gesetzliche Mindestanteil an Mais in der Getreidemaische für echten Bourbon sein?",
    ["51%", "75%", "100%", "33%"],
    ["51%", "75%", "100%", "33%"],
    0,
    "By US federal law, Bourbon must be distilled from a mash of at least 51% corn and aged in new charred oak barrels.",
    "Nach US-Bundesrecht muss Bourbon zu mindestens 51% aus Mais destilliert und in neuen, ausgekohlten Eichenfässern gereift werden."
)
add_q(
    "q_spirits_ouzo_louche", "spirits",
    "Why does Ouzo or Rakı turn milky white when water or ice is added (the Louche effect)?",
    "Warum färbt sich Ouzo oder Rakı beim Hinzufügen von Wasser milchig weiß (Louche-Effekt)?",
    [
        "Anethole oil from anise precipitates out of dilute alcohol as microscopic droplets",
        "Milk powder is added by the distillery",
        "Ice crystals scatter light",
        "Sugar carbonates the liquid"
    ],
    [
        "Das ätherische Anis-Öl Anethol ist in schwachem Alkohol unlöslich und fällt als weiße Emulsionströpfchen aus",
        "Es enthält verstecktes Milchpulver",
        "Eiskristalle streuen das Licht",
        "Zucker karbonisiert die Flüssigkeit"
    ],
    0,
    "Anethole dissolves in high-proof ethanol (>38% ABV). Diluting with water forces anethole out of solution as an emulsion, scattering white light.",
    "Das im Anis enthaltene ätherische Öl Anethol löst sich nur in starkem Alkohol. Bei Wasserzugabe fällt das Öl als mikroskopische Tröpfchen aus (Louche-Effekt)."
)
add_q(
    "q_spirits_rum_agricole", "spirits",
    "What is the key difference between Rhum Agricole (AOC Martinique) and industrial rum?",
    "Was ist der fundamentale Unterschied zwischen Rhum Agricole (AOC Martinique) und traditionellem Industrierum?",
    [
        "Rhum Agricole is distilled directly from fresh pressed sugarcane juice, while industrial rum uses molasses",
        "Agricole rum is always aged in cherry barrels",
        "Agricole has zero proof alcohol",
        "Industrial rum contains barley malt"
    ],
    [
        "Rhum Agricole wird direkt aus frischem Zuckerrohrsaft destilliert, Industrierum aus Melasse",
        "Agricole reift ausschließlich in Kirschholzfässern",
        "Agricole ist alkoholfrei",
        "Industrierum basiert auf Gerstenmalz"
    ],
    0,
    "Rhum Agricole utilizes 100% fresh, unrefined sugarcane juice rather than the byproduct molasses, yielding grassy terroir aromas.",
    "Rhum Agricole verwendet frischen, unraffinierten Zuckerrohrsaft statt Melasse und besitzt dadurch kräuterige, frische Terroirnoten."
)
add_q(
    "q_spirits_tequila_blanco", "spirits",
    "Which agave variety must legally be used for authentic 100% Tequila in Mexico?",
    "Welche Agavenart ist für echten 100% Tequila gesetzlich vorgeschrieben?",
    ["Blue Agave (Agave tequilana Weber azul)", "Agave Espadín", "Agave Tobalá", "Agave Americana"],
    ["Blaue Agave (Agave tequilana Weber azul)", "Agave Espadín", "Agave Tobalá", "Agave Americana"],
    0,
    "Under the Tequila Denomination of Origin (DOT), only Blue Agave Weber can be used for Tequila.",
    "Für Tequila ist ausschließlich Agave tequilana Weber azul zugelassen; Mezcal hingegen darf aus Espadín und Wildagaven destilliert werden."
)
add_q(
    "q_spirits_single_malt_def", "spirits",
    "What does the term 'Single Malt Scotch Whisky' legally require?",
    "Was bedeutet der Begriff 'Single Malt Scotch Whisky' gesetzlich zwingend?",
    [
        "100% malted barley, pot still distilled at a single distillery, aged at least 3 years in Scotland",
        "Distilled from one single grain harvest in a single year",
        "Matured in only one single cask without blending",
        "Produced from unmalted wheat and corn"
    ],
    [
        "100% gemälzte Gerste, Pot-Still-Destillation in einer einzigen Brennerei, mind. 3 Jahre Reifung in Schottland",
        "Destillat aus einer einzigen Getreideernte eines Jahres",
        "Reifung in nur einem einzigen Fass ohne Verschneidung",
        "Destilliert aus ungemälztem Weizen und Mais"
    ],
    0,
    "'Single' refers to a single distillery, and 'Malt' means 100% malted barley.",
    "'Single' bezeichnet eine einzige Brennerei und 'Malt' die ausschließliche Verwendung von gemälzter Gerste."
)
add_q(
    "q_spirits_gin_london_dry", "spirits",
    "What distinguishes London Dry Gin from Distilled Gin regarding sugar and additives after distillation?",
    "Was unterscheidet London Dry Gin von normalem Distilled Gin bezüglich Zucker und Zusatzstoffen nach dem Brand?",
    [
        "No artificial flavors or colors may be added, and max 0.1g/L sugar is permitted",
        "It must be bottled at exactly 60% ABV",
        "It can only be produced within London city borders",
        "Sugar can be added without any legal limit"
    ],
    [
        "Keine künstlichen Aromen/Farbstoffe erlaubt, max. 0,1 g/L Zuckerzusatz nach der Destillation",
        "Muss exakt mit 60% Vol. abgefüllt werden",
        "Darf ausschließlich innerhalb der Stadtgrenzen Londons destilliert werden",
        "Zucker darf in unbegrenzter Menge zugegeben werden"
    ],
    0,
    "London Dry is a strict production technique where all botanical aromas must be distilled together in pot stills; no artificial flavoring is allowed afterwards.",
    "London Dry ist ein Herstellungsverfahren: Alle Aromen müssen im Brennvorgang gewonnen werden; nachträgliches Aromatisieren ist untersagt."
)
add_q(
    "q_spirits_cognac_cru", "spirits",
    "Which is considered the highest quality premier cru zone in the Cognac region?",
    "Welches Cru gilt als die renommierteste Spitzenlage (Premier Cru) in der Cognac-Region?",
    ["Grande Champagne", "Petite Champagne", "Borderies", "Fins Bois"],
    ["Grande Champagne", "Petite Champagne", "Borderies", "Fins Bois"],
    0,
    "Grande Champagne features high-chalk soils producing spirits of exceptional aging potential and floral finesse.",
    "Die Grande Champagne besitzt den höchsten Kreidegehalt im Boden, was Cognacs mit größtem Alterungspotenzial hervorbringt."
)
add_q(
    "q_spirits_grappa_raw", "spirits",
    "What raw material is distilled to produce authentic Italian Grappa?",
    "Aus welchem Ausgangsstoff wird echte italienische Grappa gebrannt?",
    ["Grape pomace (skins, seeds, stems after pressing)", "Whole fermenting wine", "Dried raisins", "Cider"],
    ["Traubentrester (feste Schalen, Kerne, Stiele nach dem Keltern)", "Ganzer Wein", "Getrocknete Rosinen", "Apfelmost"],
    0,
    "Grappa is a pomace brandy (Acquavite di vinaccia) distilled from fermented solid grape remnants after winemaking.",
    "Grappa ist ein Tresterbrand, der ausschließlich aus den festen Rückständen (Schalen und Kerne) der Weinkelterung gewonnen wird."
)
add_q(
    "q_spirits_peat_whisky", "spirits",
    "What imparts the distinctive smoky, medicinal aroma to Islay Scotch Whiskies?",
    "Wodurch entsteht das charakteristisch rauchig-torfige Aroma in Islay Scotch Whiskys?",
    [
        "Drying germinating green malt over burning peat smoke in a kiln",
        "Adding liquid smoke to the wash",
        "Aging in charred pine wood barrels",
        "Distilling through volcanic basalt filters"
    ],
    [
        "Darren des feuchten Grünmalzes über schwelendem Torffeuer (Peat Kiln)",
        "Zugabe von flüssigem Raucharoma",
        "Reifung in ausgekohlten Kiefernholzfässern",
        "Filtration durch vulkanisches Basaltgestein"
    ],
    0,
    "Phenols from burning peat moss adhere to the moist malted barley during kiln drying.",
    "Phenole aus dem schwelenden Torfmoos binden sich während des Trocknungsprozesses an das feuchte Gerstenkorn."
)
add_q(
    "q_spirits_calvados_aoc", "spirits",
    "What is the primary fruit base of French Calvados AOC from Normandy?",
    "Was ist die primäre Fruchtbasis von französischem Calvados AOC aus der Normandie?",
    ["Cider apples and perry pears", "Plums", "Cherries", "Grapes"],
    ["Cidre-Äpfel und Mostbirnen", "Pflaumen", "Sauerkirschen", "Weintrauben"],
    0,
    "Calvados is an apple brandy distilled from fermented cider made of specific bittersweet, bitter, acidic, and sweet Norman apple varieties.",
    "Calvados wird aus vergorenem Cidre-Apfelmost (sowie Mostbirnen im Pays d'Auge) destilliert."
)
add_q(
    "q_spirits_vodka_charcoal", "spirits",
    "Why is premium vodka traditionally filtered through activated birch charcoal?",
    "Warum wird traditioneller Wodka mehrfach über Birken-Aktivkohle filtriert?",
    [
        "To adsorb higher fusel oils and unwanted aldehydes without stripping purity",
        "To turn the liquid crystal clear from a red raw state",
        "To infuse birch sugar sweetening",
        "To lower the alcohol percentage naturally"
    ],
    [
        "Um Fuselöle und Aldehyde zu binden und maximale geschmackliche Reinheit zu erzielen",
        "Um roten Rohbrand zu entfärben",
        "Um Birkensüße einzutragen",
        "Um den Alkoholgehalt zu senken"
    ],
    0,
    "Activated carbon adsorbs long-chain congener compounds, resulting in smooth mouthfeel.",
    "Aktivkohle adsorbiert Verunreinigungen und Begleitöle, was zu einer samtig-weichen Textur führt."
)
add_q(
    "q_spirits_absinthe_thujone", "spirits",
    "Which botanical imparts the legendary compound thujone to authentic Absinthe?",
    "Welche Heilpflanze liefert das wirksame Terpen Thujon im traditionellen Absinth?",
    ["Grande Wormwood (Artemisia absinthium)", "Fennel seed", "Star anise", "Hyssop"],
    ["Echter Wermut (Artemisia absinthium)", "Fenchelsamen", "Sternanis", "Ysop"],
    0,
    "Grande Wormwood is macerated and distilled alongside green anise and Florence fennel (the Holy Trinity).",
    "Echter Wermut bildet zusammen mit grünem Anis und Fenchel die Heilige Dreifaltigkeit des Absinths."
)
add_q(
    "q_spirits_armagnac_column", "spirits",
    "How does distillation of Armagnac traditionally differ from Cognac?",
    "Wie unterscheidet sich die traditionelle Destillation von Armagnac im Vergleich zu Cognac?",
    [
        "Armagnac is single-distilled in a continuous copper column (alambic armagnacais), Cognac is double-distilled in pot stills",
        "Armagnac is vacuum distilled at cold temperatures",
        "Armagnac uses glass retorts",
        "Cognac is distilled in steel vats"
    ],
    [
        "Armagnac wird einmalig kontinuierlich im Alambic Armagnacais gebrannt, Cognac zweifach in Kupferblasen (Charentais)",
        "Armagnac wird kalt vakuumdestilliert",
        "Armagnac nutzt Glaskolben",
        "Cognac wird in Stahltanks gebrannt"
    ],
    0,
    "Armagnac distillation preserves heavier congeners, fruit aromatics, and texture compared to Cognac's pristine double distillation.",
    "Die einfache Säulendestillation im Alambic Armagnacais erhält mehr aromatische Ester und körperreiche Terpene."
)
add_q(
    "q_spirits_aquavit_caraway", "spirits",
    "What is the defining principal botanical in Scandinavian Aquavit (Akvavit)?",
    "Welches Gewürz ist das gesetzlich vorgeschriebene Leitgewürz in skandinavischem Aquavit?",
    ["Caraway or dill seed", "Juniper berry", "Cinnamon", "Cardamom"],
    ["Kümmel (Carum carvi) oder Dillsamen", "Wacholderbeere", "Zimt", "Kardamom"],
    0,
    "EU regulations mandate that Aquavit must be flavored primarily with distillates of caraway and/or dill seed.",
    "Nach EU-Recht muss der vorherrschende Geschmack von Aquavit aus Destillaten von Kümmel- und/oder Dillsamen stammen."
)
add_q(
    "q_spirits_mezcal_pit", "spirits",
    "Why does artisanal Mezcal possess an unmistakable earthy, smoky flavor compared to industrial Tequila?",
    "Warum besitzt traditioneller Mezcal ein erdig-rauchiges Aroma im Gegensatz zu Tequila?",
    [
        "Agave hearts (piñas) are roasted for days in underground volcanic stone pits over oak wood",
        "Liquid smoke is added during bottle filling",
        "The juice is boiled in smoke chambers",
        "It matures in burned coal silos"
    ],
    [
        "Die Agavenherzen (Piñas) werden tagelang in erdgedeckten Grubenöfen über Holzfeuer und Vulkangestein geröstet",
        "Raucharoma wird bei der Abfüllung zugegeben",
        "Der Saft wird in Rauchkammern eingekocht",
        "Die Reifung erfolgt in Kohlesilos"
    ],
    0,
    "Underground conical stone pits ('hornos') cook the agaves with burning wood smoke under soil blankets.",
    "Das tagelange Rösten der Piñas in Erdgruben ('Palenques') imprägniert die Agavenfasern mit tiefem Rauch."
)
add_q(
    "q_spirits_cachaça_origin", "spirits",
    "What is Cachaça legally defined as in Brazil?",
    "Wie ist Cachaça in Brasilien gesetzlich definiert?",
    [
        "Exclusive Brazilian spirit distilled from fermented fresh sugar cane juice (38–48% ABV)",
        "Rum infused with lime peel",
        "Molasses alcohol flavored with coffee",
        "Grain spirit filtered through charcoal"
    ],
    [
        "Exklusiv brasilianische Spirituose aus fermentiertem frischem Zuckerrohrsaft (38–48% Vol.)",
        "Mit Limettenschalen aromatisierter Rum",
        "Melasseschnaps mit Kaffeebohnen",
        "Über Holzkohle gefilterter Getreidebrand"
    ],
    0,
    "Cachaça is a protected geographic indication of Brazil and the soul of the Caipirinha cocktail.",
    "Cachaça ist eine geschützte brasilianische Herkunftsbezeichnung und die Basis der Caipirinha."
)
add_q(
    "q_spirits_pisco_peru_chile", "spirits",
    "What is unique about the production of authentic Peruvian Pisco?",
    "Was ist eine Besonderheit bei der Herstellung von authentischem peruanischem Pisco?",
    [
        "Distilled to exact bottle strength in copper pot stills without any water dilution or barrel aging",
        "Aged 12 years in charred French oak",
        "Sweetened with cane sugar syrup",
        "Colored with caramel dye"
    ],
    [
        "Wird unverdünnt auf Trinkstärke gebrannt; kein Wasserzusatz, kein Holzkontakt, kein Zucker erlaubt",
        "Reift 12 Jahre in französischer Eiche",
        "Wird mit Zuckersirup gesüßt",
        "Wird mit Zuckerkulör eingefärbt"
    ],
    0,
    "Peruvian Pisco is distilled directly to proof from aromatic or non-aromatic grape must and rested only in inert neutral containers.",
    "Peruanischer Pisco wird direkt auf Trinkstärke destilliert und ruht ausschließlich in geschmacksneutralen Gefäßen."
)
add_q(
    "q_spirits_kirschwasser_stone", "spirits",
    "Where does the subtle almond/marzipan note in high-quality Black Forest Kirschwasser come from?",
    "Woher stammt die dezente Mandel- und Marzipannote in hochwertigem Schwarzwälder Kirschwasser?",
    [
        "A small proportion of crushed cherry pits fermenting and releasing benzaldehyde and trace amygdalin",
        "Infusing bitter almond essence",
        "Aging in almond wood barrels",
        "Adding marzipan paste to the wash"
    ],
    [
        "Aus einem kontrollierten Anteil angequetschter Kirschkerne, die Benzaldehyd freisetzen",
        "Zusatz von Bittermandelöl",
        "Lagerung in Fässern aus Mandelbaumholz",
        "Zugabe von Marzipanpaste in die Maische"
    ],
    0,
    "Cracked cherry stones release amygdalin which breaks down into aromatic benzaldehyde (almond tone).",
    "Die Kirschsteine enthalten Amygdalin, das während der Gärung zu aromatischem Benzaldehyd (feiner Steinton) gespalten wird."
)

# ==========================================
# 2. WINE (18 Questions)
# ==========================================
add_q(
    "q_wine_asti_sweetness", "wine",
    "Why does Asti Spumante DOCG have a low alcohol content (approx. 7% ABV) and high natural sweetness?",
    "Warum hat Asti Spumante DOCG einen geringen Alkoholgehalt (ca. 7% Vol.) und eine hohe Restsüße?",
    [
        "Fermentation is stopped early by sterile filtration and chilling under pressure",
        "Cane sugar is added before bottling",
        "Grape juice is mixed with neutral alcohol",
        "The grapes grow in shaded valleys"
    ],
    [
        "Die Gärung wird vorzeitig durch Kühlung und Sterilfiltration im Drucktank abgestoppt",
        "Rohrzucker wird nachträglich hinzugefügt",
        "Traubensaft wird mit Industriealkohol gemischt",
        "Die Trauben wachsen ohne Sonne"
    ],
    0,
    "Asti method arrests fermentation at 7–9% ABV, preserving the natural fructose of Moscato Bianco grapes while capturing natural CO2.",
    "Durch Kälteschock und Druckfiltration wird die Gärung gestoppt, wodurch die natürliche Fruchtsüße der Moscato-Traube erhalten bleibt."
)
add_q(
    "q_wine_champagne_dosage", "wine",
    "What is the function of the 'Liqueur de dosage' (or expedition liqueur) in Champagne production?",
    "Welche Funktion hat die Versanddosage (Liqueur de dosage) beim Champagner?",
    [
        "It replaces lost wine during disgorgement and balances acidity with sweetness (Brut, Extra Dry, Demi-Sec)",
        "It kills yeast bacteria with sulfur",
        "It colors the sparkling wine red",
        "It creates the initial bubbles inside the bottle"
    ],
    [
        "Sie füllt den Degorgierverlust auf und bestimmt die finale Süßegrad-Klassifikation (Brut, Extra Dry, Demi-Sec)",
        "Sie tötet Hefebakterien mit Schwefel ab",
        "Sie färbt den Schaumwein rubinrot ein",
        "Sie erzeugt die allererste Kohlensäure"
    ],
    0,
    "Dosage adjusts residual sugar balance after freezing and expelling the yeast plug during disgorgement.",
    "Die Dosage gleicht den Verlust beim Degorgieren aus und stellt die gewünschte Geschmacksstufe (z.B. Brut: <12g/l Restzucker) ein."
)
add_q(
    "q_wine_tannin_oak", "wine",
    "What is the culinary purpose of decanting a young, full-bodied Barolo or Cabernet Sauvignon?",
    "Was ist der gastronomische Hauptzweck beim Dekantieren eines jungen, kräftigen Barolo oder Cabernet Sauvignon?",
    [
        "Controlled aeration softens harsh wood and grape tannins and releases closed aromatic volatile esters",
        "To separate heavy crystals of sugar",
        "To warm the wine quickly to boiling temperature",
        "To filter out all alcohol molecules"
    ],
    [
        "Gezielte Belüftung (Sauerstoffkontakt) glättet adstringierende Tannine und öffnet verschlossene Aromen",
        "Um dicke Zuckerkristalle abzutrennen",
        "Um den Wein blitzschnell zu erwärmen",
        "Um Alkoholmoleküle herauszufiltern"
    ],
    0,
    "Oxygen promotes micro-oxidation of polyphenols, softening astringent catechin tannins and volatilizing aroma compounds.",
    "Sauerstoff oxidiert herbe Gerbstoffe leicht an, macht die Tannine geschmeidiger und setzt komplexe Primär- und Sekundäraromen frei."
)
add_q(
    "q_wine_champagne_grapes", "wine",
    "Which three principal grape varieties make up virtually all traditional Champagne?",
    "Welche drei Hauptrebsorten bilden das Fundament des traditionellen Champagners?",
    [
        "Chardonnay, Pinot Noir, Pinot Meunier",
        "Riesling, Sauvignon Blanc, Merlot",
        "Syrah, Grenache, Mourvèdre",
        "Cabernet Sauvignon, Chenin Blanc, Sémillon"
    ],
    [
        "Chardonnay, Pinot Noir (Spätburgunder), Pinot Meunier (Schwarzriesling)",
        "Riesling, Sauvignon Blanc, Merlot",
        "Syrah, Grenache, Mourvèdre",
        "Cabernet Sauvignon, Chenin Blanc, Sémillon"
    ],
    0,
    "Chardonnay brings elegance and minerality; Pinot Noir provides structure and red fruit; Pinot Meunier contributes roundness and fruitiness.",
    "Chardonnay liefert Frische und Eleganz, Pinot Noir Körper und Struktur, Pinot Meunier fruchtige Fülle."
)
add_q(
    "q_wine_malolactic_fermentation", "wine",
    "What happens chemically during Malolactic Fermentation (MLF) in winemaking?",
    "Was passiert chemisch während der biologischen Säureumwandlung (Malolaktische Gärung, BSA)?",
    [
        "Sharp malic acid is converted by lactic bacteria into softer lactic acid and buttery diacetyl",
        "Grape sugar is converted into carbon monoxide",
        "Tannins are converted into alcohol",
        "Tartaric acid turns into vinegar"
    ],
    [
        "Scharfe Äpfelsäure wird durch Milchsäurebakterien in weichere Milchsäure und buttriges Diacetyl umgewandelt",
        "Traubenzucker wird in Kohlenmonoxid umgewandelt",
        "Gerbstoffe werden in Alkohol umgewandelt",
        "Weinsäure verwandelt sich in Essig"
    ],
    0,
    "Lactic acid bacteria convert harsh dicarboxylic malic acid to smoother monocarboxylic lactic acid, releasing buttery diacetyl notes.",
    "Bakterien wandeln aggressive Äpfelsäure in milde Milchsäure um; typisch für cremige Chardonnays und körperreiche Rotweine."
)
add_q(
    "q_wine_botrytis_noble_rot", "wine",
    "How does the mold fungus Botrytis cinerea ('Noble Rot') create world-class Sauternes and Trockenbeerenauslese?",
    "Wie erzeugt der Edelschimmelpilz Botrytis cinerea Weltklasse-Süßweine wie Sauternes oder Trockenbeerenauslese?",
    [
        "The fungus perforates grape skins, evaporating water and concentrating sugars, acids, and honeyed botrytis aromas",
        "The fungus converts alcohol directly into sugar",
        "The fungus freezes the berries on the vine",
        "The fungus produces red dye pigments"
    ],
    [
        "Der Pilz perforiert die Beerenhaut, Wasser verdunstet, und Zucker, Säure sowie honigartige Aromen konzentrieren sich",
        "Der Pilz wandelt Alkohol in Zucker um",
        "Der Pilz lässt die Beeren am Rebstock gefrieren",
        "Der Pilz bildet rote Farbpigmente"
    ],
    0,
    "Microscopic perforations allow water transpiration under warm autumn mist, shriveling berries into sugar-rich, botrytized nectar raisins.",
    "Durch feine Poren in der Schale verdunstet Wasser; die Inhaltsstoffe schrumpfen zu hochkonzentriertem, edelsüßem Nektar zusammen."
)
add_q(
    "q_wine_eiswein_harvest", "wine",
    "At what maximum temperature must grapes legally be picked and pressed for genuine German/Austrian Eiswein?",
    "Bei welcher Höchsttemperatur müssen die Trauben für echten deutschen/österreichischen Eiswein gelesen und gekeltert werden?",
    ["At -7°C (or colder)", "At 0°C", "At +4°C", "At -20°C strictly"],
    ["Bei mindestens -7°C (oder kälter)", "Bei 0°C", "Bei +4°C", "Ausschließlich bei exakt -20°C"],
    0,
    "Water in the grape freezes into ice crystals at -7°C. Pressing while frozen retains ice crystals, letting only concentrated golden sugar-acid must flow.",
    "Das Wasser gefriert zu Eiskristallen; beim Keltern im gefrorenen Zustand bleibt das Eis zurück, und nur der konzentrierte zuckersüße Extrakt rinnt ab."
)
add_q(
    "q_wine_tannin_food_pairing", "wine",
    "Why does a heavy, tannic red wine pair so harmoniously with a marbled grilled ribeye steak?",
    "Warum harmonieren tanninreiche Rotweine (z.B. Barolo, Bordeaux) perfekt mit marmoriertem Steak?",
    [
        "Proteins and rendered fats bind to saliva-precipitating tannins, softening astringency and cleansing the palate",
        "Fat neutralizes wine alcohol into water",
        "The wine dissolves the steak bones",
        "Tannins prevent the meat from spoiling on the plate"
    ],
    [
        "Fett und Eiweiß binden die adstringierenden Tannine, mildern deren Bitterkeit und reinigen den Gaumen",
        "Fett wandelt Weinalkohol in Wasser um",
        "Der Wein löst die Knochen des Steaks auf",
        "Tannine verhindern das Abkühlen des Fleisches"
    ],
    0,
    "Tannins normally bind to salivary proline-rich proteins, causing dryness. Dietary fat and animal protein compete, softening the perceived astringency.",
    "Die Gerbstoffe binden an die Eiweiße des Speichels; durch das Fleischprotein und Fett wird diese Adstringenz gepuffert und der Wein wirkt samtig."
)
add_q(
    "q_wine_terroir_definition", "wine",
    "What does the French concept of 'Terroir' encompass in viticulture?",
    "Was umfasst der französische Begriff 'Terroir' im Weinbau ganzheitlich?",
    [
        "Soil composition, macro/micro-climate, topography, sunlight exposure, and local human viticultural traditions",
        "Strictly the bottle shape and label design",
        "Only the price per hectare of vineyard land",
        "The chemical fertilizer brand used by the farmer"
    ],
    [
        "Zusammenspiel aus Boden, Makro-/Mikroklima, Hangneigung, Sonneneinstrahlung und handwerklicher Tradition",
        "Ausschließlich die Form der Flasche und das Etikett",
        "Den Bodenpreis pro Hektar Rebfläche",
        "Den Markennamen des verwendeten Mineraldüngers"
    ],
    0,
    "Terroir is the holistic confluence of natural physical environment and human stewardship that gives wine its distinct sense of place.",
    "Terroir bezeichnet den unnachahmlichen Charakter eines Weines, geprägt durch Boden, Geologie, Klima und traditionelles Handwerk."
)
add_q(
    "q_wine_solera_system", "wine",
    "How does the Solera fractional blending system work in Jerez for Sherry production?",
    "Wie funktioniert das Solera-Verfahren bei der Sherry-Herstellung in Andalusien?",
    [
        "Wine drawn from the bottom tier (Solera) is replenished from younger tiers above (Criaderas), ensuring perpetual consistency",
        "Wine is heated in ovens for 3 months",
        "Grapes are dried on straw mats under glass",
        "A single barrel is preserved without any blending for 100 years"
    ],
    [
        "Aus der untersten Fassreihe (Solera) entnommener Wein wird schrittweise aus den oberen, jüngeren Reihen (Criaderas) nachgefüllt",
        "Wein wird in Heißkammern erhitzt",
        "Trauben werden auf Strohmatten getrocknet",
        "Ein einzelnes Fass reift 100 Jahre ohne Verschneidung"
    ],
    0,
    "The Solera system cascades younger wine into older barrels, maintaining bacterial flor vitality and consistent generational character.",
    "Durch das kaskadenartige Nachfüllen von oben nach unten entsteht ein gleichbleibender Stil über viele Jahrzehnte hinweg."
)
add_q(
    "q_wine_flor_yeast", "wine",
    "What is 'Flor' yeast and which style of Sherry relies on it?",
    "Was ist der 'Flor' und welcher Sherry-Stil wird durch ihn berühmt geprägt?",
    [
        "A biological white yeast veil floating on the wine surface preventing oxidation; essential for Fino and Manzanilla",
        "A sweet raisin syrup added to Pedro Ximénez",
        "A red mushroom growing on barrel staves",
        "A chemical stabilizer added to Oloroso"
    ],
    [
        "Eine weiße Hefeschicht auf der Weinoberfläche, die vor Sauerstoff schützt; typisch für Fino und Manzanilla",
        "Ein eingekochter Rosinensirup für Pedro Ximénez",
        "Ein Baumpilz auf den Fassdauben",
        "Ein chemisches Konservierungsmittel in Oloroso"
    ],
    0,
    "Flor yeast metabolizes alcohol and glycerol, creating acetaldehyde notes (green almond, saline fresh) while blocking air exposure.",
    "Die Florhefe schirmt den Fino-Sherry hermetisch vor Oxidation ab und erzeugt frische Aromen von Hefe, Mandeln und Salzbrise."
)
add_q(
    "q_wine_cork_taint_tca", "wine",
    "Which chemical compound causes the musty, wet-cardboard defect known as 'Cork Taint' (Korkschmecker)?",
    "Welche chemische Verbindung verursacht den typischen muffigen Korkschmecker (TCA-Fehlton) im Wein?",
    ["2,4,6-Trichloroanisole (TCA)", "Ethyl acetate", "Sulfur dioxide", "Lactic acid"],
    ["2,4,6-Trichloranisol (TCA)", "Ethylacetat", "Schwefeldioxid", "Milchsäure"],
    0,
    "TCA is formed when airborne fungi react with chlorinated bleaching agents used on natural bark corks. It is detectable at parts-per-trillion.",
    "TCA entsteht durch mikrobielle Umwandlung chlorierter Phenole in Naturkorken und ist schon in Spuren (Nanogrammbereich) wahrnehmbar."
)
add_q(
    "q_wine_pinot_noir_terroir", "wine",
    "Why is Pinot Noir (Spätburgunder) considered the most terroir-sensitive red grape in the world?",
    "Warum gilt Pinot Noir (Spätburgunder) als die terroir-sensibelste Rotweintraube der Welt?",
    [
        "Thin skins, genetic instability, and low pigment make it reflect microclimate and soil nuances with extreme fidelity",
        "It can only grow in volcanic craters",
        "It refuses to ferment without added yeast nutrients",
        "It grows exclusively on limestone cliffs"
    ],
    [
        "Dünne Beerenhaut, mutative Sensibilität und feine Tanninstruktur spiegeln Boden- und Klimanuancen hochpräzise wider",
        "Sie wächst ausschließlich in Vulkankratern",
        "Sie gärt nur mit künstlichen Nährsalzen",
        "Sie wächst ausschließlich an Meeresklippen"
    ],
    0,
    "Pinot Noir's delicate polyphenols and transparency make slight differences in slope, drainage, and limestone clay immediately perceptible.",
    "Wegen der dünnen Schale und geringen Pigmentdichte schmeckt man kleinste Unterschiede in Boden, Neigung und Kleinklima sofort heraus."
)
add_q(
    "q_wine_vintage_port_crust", "wine",
    "Why must an authentic Vintage Port be decanted through a fine sieve before service?",
    "Warum muss ein echter Vintage Port vor dem Servieren sorgfältig dekantiert und gefiltert werden?",
    [
        "It is bottled unfiltered after only two years in barrel, throwing a heavy sediment ('crust') over decades in the bottle",
        "To remove sugar crystals",
        "To reduce alcohol vapor",
        "Because cork dissolves into Port wine"
    ],
    [
        "Er wird nach nur zwei Fassjahren unfiltriert abgefüllt und bildet über Jahrzehnte ein massives Depot (Kruste) in der Flasche",
        "Um Zuckerkristalle abzuscheiden",
        "Um den Alkoholgehalt zu senken",
        "Weil sich der Korken im Portwein auflöst"
    ],
    0,
    "Vintage Port matures for 20–50+ years in glass, polymerizing tannins and anthocyanins into a thick dark sediment.",
    "Vintage Port reift jahrzehntelang auf der Flasche; Tannine und Farbstoffe fallen als schwere Flocken (Depot) aus."
)
add_q(
    "q_wine_amarone_appassimento", "wine",
    "What is the 'Appassimento' method used for Amarone della Valpolicella DOCG?",
    "Was versteht man unter dem 'Appassimento'-Verfahren beim Amarone della Valpolicella DOCG?",
    [
        "Drying hand-harvested grapes on bamboo mats for 3–4 months to concentrate sugars, aromas, and glycerol before fermentation",
        "Freezing the grapes in mountain snow",
        "Fortifying wine with brandy during fermentation",
        "Cooking the grape must over open fire"
    ],
    [
        "Trocknen der handverlesenen Trauben auf Holzrosten für 3–4 Monate zur Wasserverdunstung vor der Gärung",
        "Einfrieren der Beeren im Schnee",
        "Aufspriten des Weins mit Weingeist",
        "Einkochen des Mosts über offenem Feuer"
    ],
    0,
    "Appassimento loses 30–40% water weight, yielding high sugar levels that ferment to a rich, dry red wine of 15–16% ABV with velvety glycerol.",
    "Die Trauben verlieren ca. ein Drittel ihres Gewichts; der verbleibende Most ist reich an Fruktose, Glyzerin und tiefen Aromen getrockneter Kirschen."
)
add_q(
    "q_wine_riesling_acidity", "wine",
    "Why does German Mosel Riesling age effortlessly for decades even with low alcohol levels (8–10% ABV)?",
    "Warum kann deutscher Mosel-Riesling selbst bei geringem Alkoholgehalt (8–10% Vol.) problemlos jahrzehntelang reifen?",
    [
        "High natural malic/tartaric acidity and mineral extract act as powerful natural preservatives alongside residual sugar",
        "It is fortified with brandy",
        "Bottles are sealed with hot wax and lead",
        "Heavy oak wood preserves the liquid"
    ],
    [
        "Die extrem hohe natürliche Weinsäure, mineralische Extrakte und harmonische Restsüße konservieren den Wein",
        "Er wird mit Weingeist aufgespritet",
        "Die Flaschen werden luftdicht mit Blei versiegelt",
        "Extremer Eichenholzkontakt schützt vor Zerfall"
    ],
    0,
    "Riesling's low pH and natural antioxidant polyphenols sustain freshness and develop complex tertiary petrol/honey kerosene notes over 30+ years.",
    "Der niedrige pH-Wert und die rassige Säure bewahren die Frische; über Jahrzehnte entwickeln sich edle Reifenoten von Honig, Schiefer und Petrol."
)
add_q(
    "q_wine_prosecco_charmat", "wine",
    "How is Prosecco Superiore DOCG carbonated differently than Champagne?",
    "Wie unterscheidet sich die Kohlensäureentstehung bei Prosecco Superiore DOCG von Champagner?",
    [
        "Secondary fermentation occurs in large pressurized stainless steel tanks (Metodo Martinotti / Charmat), not in individual bottles",
        "CO2 is injected with soda canisters",
        "Baking yeast and sugar are added at the dining table",
        "It is carbonated using dry ice cubes"
    ],
    [
        "Die zweite Gärung findet in geschlossenen Drucktanks (Charmat-/Martinotti-Verfahren) statt, nicht in der Einzelflasche",
        "Kohlensäure wird mit Industrie-Gaspatronen eingedrückt",
        "Hefe und Zucker werden erst am Tisch zugegeben",
        "Es wird mit Trockeneis versetzt"
    ],
    0,
    "The Charmat method preserves fresh primary fruit and floral notes of the Glera grape without heavy toasty yeast autolysis.",
    "Das Tankgärverfahren bewahrt die frischen, blumigen Primäraromen der Glera-Traube, ohne schwere Brioche- oder Hefenoten zu erzeugen."
)
add_q(
    "q_wine_orange_wine_skin", "wine",
    "What defines an authentic 'Orange Wine' (skin-contact white wine)?",
    "Was zeichnet einen echten 'Orange Wine' (Maischevergorenen Weißwein) aus?",
    [
        "White wine grapes fermented with their skins and seeds for weeks or months, extracting tannins, amber color, and phenolic structure",
        "White wine infused with organic orange peel",
        "Wine fermented from freshly squeezed Valencia oranges",
        "Red wine bleached with charcoal"
    ],
    [
        "Weißweintrauben werden wie Rotwein wochen- bis monatelang auf den Beerenhäuten vergoren; ergibt Bernstein-Farbe und Tannine",
        "Mit Bio-Orangenschalen aromatisierter Weißwein",
        "Aus frisch gepressten spanischen Orangen vergorener Wein",
        "Mit Aktivkohle entfärbter Rotwein"
    ],
    0,
    "Extended skin contact maceration extracts carotenes, polyphenols, and tea-like tannins normally only found in red wines.",
    "Die Maischegärung extrahiert Gerbstoffe, Bitterstoffe und Terpene aus der weißen Traubenhaut, was dem Wein Gripp und Struktur verleiht."
)

print(f"Loaded {len(QUIZ)} questions so far...")
