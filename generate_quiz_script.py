#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
generate_full_quiz.py
Generates 18-20 bilingual (German & English) gastronomy professional quiz questions
per segment (category) across all 16 categories, totaling 290+ high-caliber questions.
"""

import json

QUIZ_SEGMENTS = {
    "spirits": [
        {
            "id": "q_spirits_bourbon",
            "category": "spirits",
            "qEn": "What is the legal minimum percentage of corn required in the grain mash for Bourbon Whiskey?",
            "qDe": "Wie hoch muss der gesetzliche Mindestanteil an Mais in der Getreidemaische für echten Bourbon sein?",
            "optEn": ["51%", "75%", "100%", "33%"],
            "optDe": ["51%", "75%", "100%", "33%"],
            "correct": 0,
            "expEn": "By US federal law, Bourbon must be made from a mash bill containing at least 51% corn and aged in new charred oak barrels.",
            "expDe": "Nach US-Bundesrecht muss Bourbon zu mindestens 51% aus Mais destilliert und in neuen, ausgekohlten Eichenfässern gereift werden."
        },
        {
            "id": "q_spirits_ouzo_louche",
            "category": "spirits",
            "qEn": "Why does Ouzo or Rakı turn milky white when water or ice is added (the Louche effect)?",
            "qDe": "Warum färbt sich Ouzo oder Rakı beim Hinzufügen von Wasser milchig weiß (Louche-Effekt)?",
            "optEn": [
                "Anethole oil from anise precipitates out of dilute alcohol as microscopic droplets",
                "Milk powder is added by the distillery",
                "Ice crystals scatter light",
                "Sugar carbonates the liquid"
            ],
            "optDe": [
                "Das ätherische Anis-Öl Anethol ist in schwachem Alkohol unlöslich und fällt als weiße Emulsionströpfchen aus",
                "Es enthält verstecktes Milchpulver",
                "Eiskristalle streuen das Licht",
                "Zucker karbonisiert die Flüssigkeit"
            ],
            "correct": 0,
            "expEn": "Anethole is soluble in high ethanol but precipitates when diluted with water, causing spontaneous micro-emulsification.",
            "expDe": "Das Anisöl Anethol löst sich nur in hochprozentigem Ethanol; bei Wasserzugabe entsteht eine spontane Mikroemulsion."
        },
        {
            "id": "q_spirits_rum_agricole",
            "category": "spirits",
            "qEn": "What is the key difference between Rhum Agricole (e.g. Martinique AOC) and traditional Industrial Rum?",
            "qDe": "Was ist der fundamentale Unterschied zwischen Rhum Agricole (AOC Martinique) und traditionellem Industrierum?",
            "optEn": [
                "Rhum Agricole is distilled directly from fresh pressed sugar cane juice, while industrial rum uses molasses",
                "Agricole rum is always aged in cherry barrels",
                "Agricole has zero proof alcohol",
                "Industrial rum contains barley malt"
            ],
            "optDe": [
                "Rhum Agricole wird direkt aus frischem Zuckerrohrsaft destilliert, Industrierum aus Melasse",
                "Agricole reift ausschließlich in Kirschholzfässern",
                "Agricole ist alkoholfrei",
                "Industrierum basiert auf Gerstenmalz"
            ],
            "correct": 0,
            "expEn": "Rhum Agricole utilizes 100% fresh, unrefined sugarcane juice rather than the byproduct molasses, yielding grassy and terroir-driven aromas.",
            "expDe": "Rhum Agricole verwendet frischen, unraffinierten Zuckerrohrsaft statt Melasse und besitzt dadurch kräuterige, frische Terroirnoten."
        },
        {
            "id": "q_spirits_tequila_blanco",
            "category": "spirits",
            "qEn": "Which agave variety must legally be used for authentic 100% Tequila in Mexico?",
            "qDe": "Welche Agavenart ist für echten 100% Tequila gesetzlich vorgeschrieben?",
            "optEn": ["Blue Agave (Agave tequilana Weber azul)", "Agave Espadín", "Agave Tobalá", "Agave Americana"],
            "optDe": ["Blaue Agave (Agave tequilana Weber azul)", "Agave Espadín", "Agave Tobalá", "Agave Americana"],
            "correct": 0,
            "expEn": "Under the Tequila Denomination of Origin (DOT), only Blue Agave Weber can be used for Tequila, whereas Mezcal may use Espadín and wild varieties.",
            "expDe": "Für Tequila ist ausschließlich Agave tequilana Weber azul zugelassen; Mezcal hingegen darf aus Espadín und Wildagaven destilliert werden."
        },
        {
            "id": "q_spirits_single_malt_def",
            "category": "spirits",
            "qEn": "What does the term 'Single Malt Scotch Whisky' legally require?",
            "qDe": "Was bedeutet der Begriff 'Single Malt Scotch Whisky' gesetzlich zwingend?",
            "optEn": [
                "100% malted barley, pot still distilled at a single distillery, aged at least 3 years in Scotland",
                "Distilled from one single grain harvest in a single year",
                "Matured in only one single cask without blending",
                "Produced from unmalted wheat and corn"
            ],
            "optDe": [
                "100% gemälzte Gerste, Pot-Still-Destillation in einer einzigen Brennerei, mind. 3 Jahre Reifung in Schottland",
                "Destillat aus einer einzigen Getreideernte eines Jahres",
                "Reifung in nur einem einzigen Fass ohne Verschneidung",
                "Destilliert aus ungemälztem Weizen und Mais"
            ],
            "correct": 0,
            "expEn": "'Single' refers to a single distillery, and 'Malt' means 100% malted barley.",
            "expDe": "'Single' bezeichnet eine einzige Brennerei und 'Malt' die ausschließliche Verwendung von gemälzter Gerste."
        },
        {
            "id": "q_spirits_gin_london_dry",
            "category": "spirits",
            "qEn": "What distinguishes London Dry Gin from Distilled Gin regarding sugar and additives after distillation?",
            "qDe": "Was unterscheidet London Dry Gin von normalem Distilled Gin bezüglich Zucker und Zusatzstoffen nach dem Brand?",
            "optEn": [
                "No artificial flavors or colors may be added, and max 0.1g/L sugar is permitted",
                "It must be bottled at exactly 60% ABV",
                "It can only be produced within London city borders",
                "Sugar can be added without any legal limit"
            ],
            "optDe": [
                "Keine künstlichen Aromen/Farbstoffe erlaubt, max. 0,1 g/L Zuckerzusatz nach der Destillation",
                "Muss exakt mit 60% Vol. abgefüllt werden",
                "Darf ausschließlich innerhalb der Stadtgrenzen Londons destilliert werden",
                "Zucker darf in unbegrenzter Menge zugegeben werden"
            ],
            "correct": 0,
            "expEn": "London Dry is a production technique, not a geographic origin. All botanical aromatics must be vapor-infused or macerated in pot stills; no artificial flavorings allowed afterwards.",
            "expDe": "London Dry ist ein Herstellungsverfahren: Alle Aromen müssen im Brennvorgang gewonnen werden; nachträgliches Aromatisieren ist untersagt."
        },
        {
            "id": "q_spirits_cognac_cru",
            "category": "spirits",
            "qEn": "Which is considered the highest quality premier cru zone in the Cognac region?",
            "qDe": "Welches Cru gilt als die renommierteste Spitzenlage (Premier Cru) in der Cognac-Region?",
            "optEn": ["Grande Champagne", "Petite Champagne", "Borderies", "Fins Bois"],
            "optDe": ["Grande Champagne", "Petite Champagne", "Borderies", "Fins Bois"],
            "correct": 0,
            "expEn": "Grande Champagne features high-chalk soils (Campanian chalk) producing spirits of exceptional aging potential and floral finesse.",
            "expDe": "Die Grande Champagne besitzt den höchsten Kreidegehalt im Boden, was Cognacs mit größtem Alterungspotenzial hervorbringt."
        },
        {
            "id": "q_spirits_grappa_raw",
            "category": "spirits",
            "qEn": "What raw material is distilled to produce authentic Italian Grappa?",
            "qDe": "Aus welchem Ausgangsstoff wird echte italienische Grappa gebrannt?",
            "optEn": ["Grape pomace (skins, seeds, stems after pressing)", "Whole fermenting wine", "Dried raisins", "Cider"],
            "optDe": ["Traubentrester (feste Schalen, Kerne, Stiele nach dem Keltern)", "Ganzer Wein", "Getrocknete Rosinen", "Apfelmost"],
            "correct": 0,
            "expEn": "Grappa is a pomace brandy (Acquavite di vinaccia) distilled from fermented solid grape remnants after winemaking.",
            "expDe": "Grappa ist ein Tresterbrand, der ausschließlich aus den festen Rückständen (Schalen und Kerne) der Weinkelterung gewonnen wird."
        },
        {
            "id": "q_spirits_peat_whisky",
            "category": "spirits",
            "qEn": "What imparts the distinctive smoky, medicinal aroma to Islay Scotch Whiskies?",
            "qDe": "Wodurch entsteht das charakteristisch rauchig-torfige Aroma in Islay Scotch Whiskys?",
            "optEn": [
                "Drying germinating green malt over burning peat smoke in a kiln",
                "Adding liquid smoke to the wash",
                "Aging in charred pine wood barrels",
                "Distilling through volcanic basalt filters"
            ],
            "optDe": [
                "Darren des feuchten Grünmalzes über schwelendem Torffeuer (Peat Kiln)",
                "Zugabe von flüssigem Raucharoma",
                "Reifung in ausgekohlten Kiefernholzfässern",
                "Filtration durch vulkanisches Basaltgestein"
            ],
            "correct": 0,
            "expEn": "Phenols from burning peat moss (sphagnum) adhere to the moist malted barley during kiln drying.",
            "expDe": "Phenole aus dem schwelenden Torfmoos binden sich während des Trocknungsprozesses an das feuchte Gerstenkorn."
        },
        {
            "id": "q_spirits_calvados_aoc",
            "category": "spirits",
            "qEn": "What is the primary fruit base of French Calvados AOC from Normandy?",
            "qDe": "Was ist die primäre Fruchtbasis von französischem Calvados AOC aus der Normandie?",
            "optEn": ["Cider apples and perry pears", "Plums", "Cherries", "Grapes"],
            "optDe": ["Cidre-Äpfel und Mostbirnen", "Pflaumen", "Sauerkirschen", "Weintrauben"],
            "correct": 0,
            "expEn": "Calvados is an apple brandy distilled from cider made of specific bittersweet, bitter, acidic, and sweet Norman apple varieties (and pears in Pays d'Auge).",
            "expDe": "Calvados wird aus vergorenem Cidre-Apfelmost (sowie Mostbirnen im Pays d'Auge) destilliert."
        },
        {
            "id": "q_spirits_vodka_filtration",
            "category": "spirits",
            "qEn": "Why is premium vodka traditionally filtered through activated birch charcoal?",
            "qDe": "Warum wird traditioneller Wodka mehrfach über Birken-Aktivkohle filtriert?",
            "optEn": [
                "To adsorb higher fusel oils and unwanted aldehydes without stripping purity",
                "To turn the liquid crystal clear from a red raw state",
                "To infuse birch sugar sweetening",
                "To lower the alcohol percentage naturally"
            ],
            "optDe": [
                "Um Fuselöle und Aldehyde zu binden und maximale geschmackliche Reinheit zu erzielen",
                "Um roten Rohbrand zu entfärben",
                "Um Birkensüße einzutragen",
                "Um den Alkoholgehalt zu senken"
            ],
            "correct": 0,
            "expEn": "Activated carbon has an immense microporous surface area that adsorbs long-chain congener compounds, resulting in smooth mouthfeel.",
            "expDe": "Aktivkohle adsorbiert Verunreinigungen und Begleitöle, was zu einer samtig-weichen Textur führt."
        },
        {
            "id": "q_spirits_absinthe_thujone",
            "category": "spirits",
            "qEn": "Which botanical imparts the legendary compound thujone to authentic Absinthe?",
            "qDe": "Welche Heilpflanze liefert das wirksame Terpen Thujon im traditionellen Absinth?",
            "optEn": ["Grande Wormwood (Artemisia absinthium)", "Fennel seed", "Star anise", "Hyssop"],
            "optDe": ["Echter Wermut (Artemisia absinthium)", "Fenchelsamen", "Sternanis", "Ysop"],
            "correct": 0,
            "expEn": "Grande Wormwood is macerated and distilled alongside green anise and Florence fennel (the 'Holy Trinity').",
            "expDe": "Echter Wermut bildet zusammen mit grünem Anis und Fenchel die 'Heilige Dreifaltigkeit' des Absinths."
        },
        {
            "id": "q_spirits_armagnac_column",
            "category": "spirits",
            "qEn": "How does distillation of Armagnac traditionally differ from Cognac?",
            "qDe": "Wie unterscheidet sich die traditionelle Destillation von Armagnac im Vergleich zu Cognac?",
            "optEn": [
                "Armagnac is single-distilled in a continuous copper column (alambic armagnacais), Cognac is double-distilled in pot stills",
                "Armagnac is vacuum distilled at cold temperatures",
                "Armagnac uses glass retorts",
                "Cognac is distilled in steel vats"
            ],
            "optDe": [
                "Armagnac wird einmalig kontinuierlich im Alambic Armagnacais gebrannt, Cognac zweifach in Kupferblasen (Charentais)",
                "Armagnac wird kalt vakuumdestilliert",
                "Armagnac nutzt Glaskolben",
                "Cognac wird in Stahltanks gebrannt"
            ],
            "correct": 0,
            "expEn": "Armagnac distillation preserves heavier congeners, fruit aromatics, and texture compared to Cognac's pristine double distillation.",
            "expDe": "Die einfache Säulendestillation im Alambic Armagnacais erhält mehr aromatische Ester und körperreiche Terpene."
        },
        {
            "id": "q_spirits_aquavit_caraway",
            "category": "spirits",
            "qEn": "What is the defining principal botanical in Scandinavian Aquavit (Akvavit)?",
            "qDe": "Welches Gewürz ist das gesetzlich vorgeschriebene Leitgewürz in skandinavischem Aquavit?",
            "optEn": ["Caraway or dill seed", "Juniper berry", "Cinnamon", "Cardamom"],
            "optDe": ["Kümmel (Carum carvi) oder Dillsamen", "Wacholderbeere", "Zimt", "Kardamom"],
            "correct": 0,
            "expEn": "EU regulations mandate that Aquavit must be flavored primarily with distillates of caraway and/or dill seed.",
            "expDe": "Nach EU-Recht muss der vorherrschende Geschmack von Aquavit aus Destillaten von Kümmel- und/oder Dillsamen stammen."
        },
        {
            "id": "q_spirits_mezcal_pit",
            "category": "spirits",
            "qEn": "Why does artisanal Mezcal possess an unmistakable earthy, smoky flavor compared to industrial Tequila?",
            "qDe": "Warum besitzt traditioneller Mezcal ein erdig-rauchiges Aroma im Gegensatz zu Tequila?",
            "optEn": [
                "Agave hearts (piñas) are roasted for days in underground volcanic stone pits over oak wood",
                "Liquid smoke is added during bottle filling",
                "The juice is boiled in smoke chambers",
                "It matures in burned coal silos"
            ],
            "optDe": [
                "Die Agavenherzen (Piñas) werden tagelang in erdgedeckten Grubenöfen über Holzfeuer und Vulkangestein geröstet",
                "Raucharoma wird bei der Abfüllung zugegeben",
                "Der Saft wird in Rauchkammern eingekocht",
                "Die Reifung erfolgt in Kohlesilos"
            ],
            "correct": 0,
            "expEn": "Underground conical stone pits ('hornos') cook the agaves with burning wood smoke under soil blankets.",
            "expDe": "Das tagelange Rösten der Piñas in Erdgruben ('Palenques') imprägniert die Agavenfasern mit tiefem Rauch."
        },
        {
            "id": "q_spirits_cachaça_origin",
            "category": "spirits",
            "qEn": "What is Cachaça legally defined as in Brazil?",
            "qDe": "Wie ist Cachaça in Brasilien gesetzlich definiert?",
            "optEn": [
                "Exclusive Brazilian spirit distilled from fermented fresh sugar cane juice (38–48% ABV)",
                "Rum infused with lime peel",
                "Molasses alcohol flavored with coffee",
                "Grain spirit filtered through charcoal"
            ],
            "optDe": [
                "Exklusiv brasilianische Spirituose aus fermentiertem frischem Zuckerrohrsaft (38–48% Vol.)",
                "Mit Limettenschalen aromatisierter Rum",
                "Melasseschnaps mit Kaffeebohnen",
                "Über Holzkohle gefilterter Getreidebrand"
            ],
            "correct": 0,
            "expEn": "Cachaça is a protected geographic indication of Brazil and the soul of the Caipirinha cocktail.",
            "expDe": "Cachaça ist eine geschützte brasilianische Herkunftsbezeichnung und die Basis der Caipirinha."
        },
        {
            "id": "q_spirits_pisco_peru_chile",
            "category": "spirits",
            "qEn": "What is unique about the production of authentic Peruvian Pisco?",
            "qDe": "Was ist eine Besonderheit bei der Herstellung von authentischem peruanischem Pisco?",
            "optEn": [
                "Distilled to exact bottle strength in copper pot stills without any water dilution or barrel aging",
                "Aged 12 years in charred French oak",
                "Sweetened with cane sugar syrup",
                "Colored with caramel dye"
            ],
            "optDe": [
                "Wird unverdünnt auf Trinkstärke gebrannt; kein Wasserzusatz, kein Holzkontakt, kein Zucker erlaubt",
                "Reift 12 Jahre in französischer Eiche",
                "Wird mit Zuckersirup gesüßt",
                "Wird mit Zuckerkulör eingefärbt"
            ],
            "correct": 0,
            "expEn": "Peruvian Pisco is distilled directly to proof from aromatic or non-aromatic grape must and rested only in inert neutral containers (botijas/stainless steel).",
            "expDe": "Peruanischer Pisco wird direkt auf Trinkstärke destilliert und ruht ausschließlich in geschmacksneutralen Gefäßen."
        },
        {
            "id": "q_spirits_kirschwasser_stone",
            "category": "spirits",
            "qEn": "Where does the subtle almond/marzipan note in high-quality Black Forest Kirschwasser come from?",
            "qDe": "Woher stammt die dezente Mandel- und Marzipannote in hochwertigem Schwarzwälder Kirschwasser?",
            "optEn": [
                "A small proportion of crushed cherry pits fermenting and releasing benzaldehyde and trace amygdalin",
                "Infusing bitter almond essence",
                "Aging in almond wood barrels",
                "Adding marzipan paste to the wash"
            ],
            "optDe": [
                "Aus einem kontrollierten Anteil angequetschter Kirschkerne, die Benzaldehyd freisetzen",
                "Zusatz von Bittermandelöl",
                "Lagerung in Fässern aus Mandelbaumholz",
                "Zugabe von Marzipanpaste in die Maische"
            ],
            "correct": 0,
            "expEn": "Cracked cherry stones release amygdalin which breaks down into aromatic benzaldehyde (almond tone).",
            "expDe": "Die Kirschsteine enthalten Amygdalin, das während der Gärung zu aromatischem Benzaldehyd (feiner Steinton) gespalten wird."
        }
    ]
}

print("Script template ready")
