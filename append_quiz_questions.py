#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
append_quiz_questions.py
Appends all remaining 14 categories (Tea, Coffee, Pasta/Rice, Sauces/Condiments,
Soft Drinks, Dairy, Cheese, Eggs, Vegetables, Fruits, Nuts, Spices/Herbs, Olives, Oils/Vinegars)
with 18 high-caliber bilingual gastronomy questions each to build_master_quiz.py.
"""

questions_data = """
# ==========================================
# 3. TEA (18 Questions)
# ==========================================
add_q(
    "q_tea_earl_grey_bergamot", "tea",
    "Which essential oil gives Earl Grey tea its characteristic citrus aroma and flavor?",
    "Welches ätherische Öl verleiht Earl Grey Tee sein charakteristisches zitrisches Aroma?",
    ["Bergamot orange oil (Citrus bergamia)", "Lemon zest oil", "Bitter orange blossom oil", "Kaffir lime oil"],
    ["Bergamottöl (Citrus bergamia)", "Zitronenschalenöl", "Pomeranzenblütenöl", "Kaffir-Limettenöl"],
    0,
    "Earl Grey is traditionally made by scenting black tea (such as Keemun or Ceylon) with oil expressed from cold-pressed Bergamot citrus peel.",
    "Earl Grey basiert auf feinem Schwarztee, der mit dem ätherischen Öl der kalabrischen Bergamotte aromatisiert wird."
)
add_q(
    "q_tea_matcha_shade", "tea",
    "Why are Tencha tea bushes shaded from sunlight for 3-4 weeks prior to harvest for ceremonial Matcha?",
    "Warum werden Teebüsche für rituellen Matcha (Tencha) vor der Ernte 3–4 Wochen mit Netzen beschattet?",
    [
        "To boost chlorophyll and L-theanine amino acid production, maximizing umami and reducing bitter catechins",
        "To protect tea leaves from frost and insects",
        "To dry the leaves directly on the bush",
        "To turn the leaves red"
    ],
    [
        "Um Chlorophyll und die Aminosäure L-Theanin anzureichern, was volles Umami erzeugt und Gerbstoffe hemmt",
        "Um die Blätter vor Frost und Insekten zu schützen",
        "Um die Blätter direkt am Strauch zu dörren",
        "Damit sich die Blätter rot färben"
    ],
    0,
    "Blocking up to 90% of sunlight slows photosynthesis, preventing L-theanine from converting into bitter polyphenols, yielding intense savory umami.",
    "Durch den Lichtentzug bleibt die Aminosäure L-Theanin erhalten; der Tee schmeckt süßlich-grasig mit ausgeprägtem Umami."
)
add_q(
    "q_tea_green_water_temp", "tea",
    "Why should delicate Japanese green tea (Gyokuro/Sencha) never be brewed with 100°C boiling water?",
    "Warum darf edler japanischer Grüntee (Gyokuro, Sencha) keinesfalls mit kochendem 100°C Wasser aufgegossen werden?",
    [
        "Boiling water extracts bitter tannins and astringent catechins too rapidly, scorching delicate amino acids",
        "Boiling water destroys the caffeine molecule",
        "Boiling water makes the cup explode",
        "The tea leaves would melt completely"
    ],
    [
        "Kochendes Wasser löst aggressive Catechine und Bitterstoffe explosionsartig, wodurch das feine Umami überdeckt wird",
        "Kochendes Wasser zerstört das Koffeinmolekül",
        "Kochendes Wasser lässt Teegeschirr springen",
        "Die Teeblätter würden sich auflösen"
    ],
    0,
    "High-grade green teas require 60°C to 75°C to gently extract sweet theanine without harsh bitter polyphenols.",
    "Ideale Aufgusstemperaturen liegen zwischen 60°C und 75°C, um Süße und Aminosäuren harmonisch ohne bittere Schärfe zu lösen."
)
add_q(
    "q_tea_oolong_oxidation", "tea",
    "What defines Oolong tea in terms of leaf processing and fermentation?",
    "Was zeichnet Oolong-Tee in Bezug auf die Verarbeitung und Fermentation aus?",
    [
        "It is semi-oxidized (partially fermented), falling between unoxidized green tea and fully oxidized black tea (15% to 85%)",
        "It is fermented underground with vinegar",
        "It is smoked over pine wood exclusively",
        "It is 100% white tea infused with honey"
    ],
    [
        "Er ist teilfermentiert (teiloxidiert) und liegt mit 15% bis 85% Oxidation zwischen Grüntee und Schwarztee",
        "Er wird unterirdisch mit Essig vergoren",
        "Er wird ausschließlich über Kiefernholz geräuchert",
        "Er ist reiner Weißer Tee mit Honigzusatz"
    ],
    0,
    "Repeated bruising, tossing, and controlled pan-firing allow tea masters to dial in floral, peach, roasted, or nutty nuances.",
    "Durch wiederholtes Schütteln und Wenden bricht die Zellstruktur der Blattränder auf; der Oxidationsgrad wird präzise gesteuert."
)
add_q(
    "q_tea_darjeeling_flushes", "tea",
    "What makes a 'First Flush' Darjeeling tea distinctly different from a 'Second Flush' Darjeeling?",
    "Was unterscheidet einen Darjeeling 'First Flush' geschmacklich von einem 'Second Flush'?",
    [
        "First Flush (spring) is light, floral, and brisk with muscatel notes; Second Flush (summer) is amber, rich, and rounded",
        "First Flush is pure herbal mint; Second Flush is spiced chai",
        "First Flush contains zero caffeine",
        "Second Flush is always artificially flavored"
    ],
    [
        "First Flush (Frühjahr) ist spritzig, blumig-hellgrün und herb-frisch; Second Flush (Sommer) ist bernsteinfarben, rund und voll-muskatellig",
        "First Flush ist reiner Minztee, Second Flush ist Chai",
        "First Flush ist völlig koffeinfrei",
        "Second Flush wird immer künstlich aromatisiert"
    ],
    0,
    "The first spring harvest yields vibrant crisp teas with pale liquor, whereas the intense June summer sun develops ripe muscatel fruit and amber body.",
    "Die Frühjahrsernte liefert zarte, grüne Tassen mit blumigem Bouquet; die Sommersonne sorgt für das berühmte Reife Muskateller-Aroma."
)
add_q(
    "q_tea_rooibos_caffeine", "tea",
    "From which plant and region is caffeine-free Rooibos tea harvested?",
    "Aus welcher Pflanze und Region stammt koffeinfreier Rooibos-Tee?",
    [
        "Aspalathus linearis, endemic exclusively to the Cederberg mountains of South Africa",
        "Camellia sinensis from the slopes of Mount Fuji",
        "Ilex paraguariensis from the Argentine pampas",
        "Mentha spicata from the Atlas Mountains"
    ],
    [
        "Aspalathus linearis, ein endemischer Rotbusch aus den Cederbergen in Südafrika",
        "Camellia sinensis von den Hängen des Fuji",
        "Ilex paraguariensis aus der argentinischen Pampa",
        "Mentha spicata aus dem Atlasgebirge"
    ],
    0,
    "Rooibos is a broom-like legume bush with needle-shaped leaves that turn ruby-red during bruising and sun-drying fermentation.",
    "Der Rotbusch gehört zur Familie der Hülsenfrüchtler und wächst nur im ariden Fynbos-Biom Südafrikas; er ist von Natur aus 100% koffeinfrei."
)
add_q(
    "q_tea_white_pai_mu_tan", "tea",
    "What characterizes Pai Mu Tan (White Peony) tea processing?",
    "Was zeichnet die handwerkliche Herstellung von Pai Mu Tan (Weißer Tee) aus?",
    [
        "Minimal processing: young unopened silvery buds and tender two leaves, naturally withered in sunlight and dried without rolling",
        "Extensive charcoal roasting in deep ovens",
        "Crushing leaves with heavy rollers and oxidizing in steaming chambers",
        "Smoking over cypress needles"
    ],
    [
        "Minimalste Verarbeitung: silbrige Knospen und die ersten beiden Blätter werden nur sanft sonnengetrocknet, ohne Rollen oder Erhitzen",
        "Intensive Holzkohleröstung in Tieföfen",
        "Maschinelles Quetschen und Dämpfen der Teeblätter",
        "Räuchern über Zypressennadeln"
    ],
    0,
    "White tea retains its silvery down hairs ('bai hao') and has an extraordinarily clean, velvety mouthfeel with notes of melon and peony.",
    "Weißer Tee erfährt kaum menschliche Intervention; die weiße Behaarung der Knospen verleiht dem Aufguss eine seidige Eleganz."
)
add_q(
    "q_tea_jasmin_scenting", "tea",
    "How is authentic Chinese Jasmine tea traditionally scented?",
    "Wie wird traditioneller chinesischer Jasmintee auf natürliche Weise aromatisiert?",
    [
        "Freshly harvested night-blooming jasmine flowers (Jasminum sambac) are layered with green tea leaves overnight and removed repeatedly",
        "Jasmine oil perfume is sprayed onto dried tea bags",
        "Tea is soaked in boiling jasmine water",
        "Leaves are stored in wooden boxes made of jasmine roots"
    ],
    [
        "Nachts aufblühende Jasminblüten werden schichtweise mit den getrockneten Teeblättern vermengt und mehrfach ausgetauscht",
        "Synthetisches Jasminparfüm wird auf die Blätter gesprüht",
        "Der Tee wird in heißem Jasminwasser gekocht",
        "Die Lagerung erfolgt in Kisten aus Jasminwurzeln"
    ],
    0,
    "High-grade Jasmine Yin Zhen is scented up to seven consecutive nights using fresh blossom batches before hand-sifting them out.",
    "Die Teeblätter saugen die ätherischen Öle der nachts duftenden Blüten wie ein Schwamm auf; Blütenreste werden anschließend penibel abgesiebt."
)
add_q(
    "q_tea_pu_erh_microbial", "tea",
    "What unique transformation occurs during the aging of Sheng (raw) and Shou (ripe) Pu-Erh tea?",
    "Welche biologische Besonderheit zeichnet echten Pu-Erh-Tee aus Yunnan aus?",
    [
        "True post-fermentation driven by microbial activity (Aspergillus fungi and bacteria) in compressed tea cakes over decades",
        "Alcoholic fermentation yielding 5% ABV",
        "Carbonation produced by active brewer yeast",
        "Fermentation caused by dairy kefir cultures"
    ],
    [
        "Echte mikrobielle Nachfermentation durch Schimmelpilzkulturen und Bakterien in gepressten Fladen (Bing Cha) über Jahrzehnte",
        "Alkoholische Gärung mit 5% Vol.",
        "Kohlensäurebildung durch Bierhefe",
        "Fermentation durch Kefirpilze"
    ],
    0,
    "Pu-Erh undergoes real biological aging, developing deep earthy, forest floor, camphor, and leather notes with a digestive soothing profile.",
    "Pu-Erh reift mikrobiologisch ähnlich einem edlen Käse; mit den Jahren wird der Sud pechschwarz, erdig, samtig und extrem magenfreundlich."
)
add_q(
    "q_tea_english_breakfast_blend", "tea",
    "Which robust black tea regions traditionally comprise an English Breakfast blend?",
    "Aus welchen Anbaugebieten stammt traditionell ein robuster English Breakfast Tea Blend?",
    [
        "Assam (India) for malty body, Ceylon (Sri Lanka) for brightness, and Kenyan black tea for copper color",
        "Japanese Sencha and Chinese Dragonwell",
        "South African Honeybush and chamomile",
        "Darjeeling First Flush exclusively"
    ],
    [
        "Assam (Indien) für malzigen Körper, Ceylon (Sri Lanka) für Spritzigkeit und Kenia für kupferrote Farbe",
        "Japanischer Sencha und Grüner Longjing",
        "Südafrikanischer Honeybush und Kamille",
        "Reiner Darjeeling First Flush"
    ],
    0,
    "The malty, full-bodied strength of Assam enables the tea to cut cleanly through cold whole milk and stand up to bacon and eggs.",
    "Die kräftige Assam-Basis verträgt problemlos einen Schuss kalte Milch und harmoniert mit herzhaftem, fettreichem Frühstück."
)
add_q(
    "q_tea_lapsang_souchong_smoke", "tea",
    "How does traditional Lapsang Souchong from the Wuyi Mountains acquire its intense smoky character?",
    "Wie erhält traditioneller Lapsang Souchong aus dem Wuyi-Gebirge sein unverwechselbares Raucharoma?",
    [
        "The withered leaves are dried and smoke-roasted over burning Pinus massoniana (pine resin wood) fires in bamboo baskets",
        "Liquid hickory smoke is added to the tea liquor",
        "The tea plants grow on volcanic ash slopes",
        "The tea is aged in peated whisky barrels"
    ],
    [
        "Die Teeblätter werden in Bambuskörben über schwelendem harzreichem Kiefernholzfeuer gedörrt",
        "Flüssiges Hickory-Raucharoma wird aufgesprüht",
        "Die Sträucher wachsen in feuchter Vulkanasche",
        "Der Tee reift in schottischen Torffässern"
    ],
    0,
    "Pine resin smoke permeates the tea cells, creating resinous notes of campfire, smoked ham, and dried dates.",
    "Das Kiefernharzfeuer durchdringt das Blattgewebe; das Resultat erinnert an Lagerfeuer, getrocknete Pflaumen und feinen Schinken."
)
add_q(
    "q_tea_matcha_whisk_chasen", "tea",
    "Why is a multi-tined bamboo whisk ('Chasen') essential for preparing ceremonial Matcha?",
    "Warum wird für die Zubereitung von zeremoniellem Matcha ein feingespaltener Bambusbesen (Chasen) verwendet?",
    [
        "It shears the micro-milled tea suspension into a silky emulsion with micro-foam without bruising the green tea compounds",
        "It acts as a thermometer",
        "It filters out whole leaves",
        "It sweetens the tea naturally"
    ],
    [
        "Er schlägt das mikrogemahlene Teepulver mit Wasser zu einer stabilen, samtigen Emulsion mit feinstem Schaum (Jade-Krone)",
        "Er dient als Temperaturmesser",
        "Er filtert grobe Blattadern heraus",
        "Er gibt natürliche Zuckersüße ab"
    ],
    0,
    "Matcha is not steeped; the entire powdered leaf is suspended in warm water, requiring mechanical aeration to achieve jade crema.",
    "Da Matcha als Schwebstoff getrunken wird, emulgiert der Chasen das Pulver im Wasser zu einem cremigen, schaumigen Getränk."
)
add_q(
    "q_tea_sencha_steaming", "tea",
    "What is the key difference between Japanese green tea processing and Chinese green tea processing?",
    "Was ist der wesentliche technologische Unterschied zwischen japanischem und chinesischem Grüntee?",
    [
        "Japanese green tea enzymes are halted by steaming (preserving bright green color and vegetal notes), while Chinese tea is pan-fired in woks",
        "Japanese tea is fermented with milk",
        "Chinese tea is sun-dried without heat",
        "Japanese tea is always smoked"
    ],
    [
        "In Japan wird die Fermentation durch Dämpfen gestoppt (smaragdgrüne Farbe, Grasnoten), in China meist durch Rösten im Wok",
        "Japanischer Tee wird mit Milch fermentiert",
        "Chinesischer Tee wird ohne Hitze luftgetrocknet",
        "Japanischer Tee wird grundsätzlich geräuchert"
    ],
    0,
    "Steaming inactivates polyphenol oxidase quickly, preserving chlorophyllic green vibrancy, seaweed tones, and sweet maritime freshness.",
    "Das Dämpfen schont das Blattchlorophyll und erzeugt das typische grasig-maritime Aromaprofil japanischer Tees."
)
add_q(
    "q_tea_genmaicha_rice", "tea",
    "What ingredient is blended with green tea leaves to create traditional Japanese Genmaicha?",
    "Welche Zutat wird grünem Sencha beigemischt, um traditionellen japanischen Genmaicha zu kreieren?",
    [
        "Roasted and popped brown rice grains (Genmai)",
        "Toasted sesame seeds",
        "Puffed wheat grains",
        "Fried garlic flakes"
    ],
    [
        "Gerösteter und teilweise gepoppter Naturreis (Genmai)",
        "Geröstete Sesamsamen",
        "Gepuffte Weizenkörner",
        "Knusprige Knoblauchflocken"
    ],
    0,
    "Genmaicha (popcorn tea) offers nutty, toasty aromatics and lower caffeine, making it an ideal companion for hearty sushi or tempura.",
    "Der geröstete braune Reis mildert die Herbe des Tees und verleiht eine nussig-brotige, wärmende Geschmacksnote."
)
add_q(
    "q_tea_moroccan_mint_gunpowder", "tea",
    "Which base green tea is traditionally used for Moroccan Maghrebi Mint Tea?",
    "Welcher Basis-Grüntee wird für traditionellen marokkanischen Minztee (Thé à la Menthe) verwendet?",
    [
        "Chinese Gunpowder green tea (tightly rolled pellets of Special Gunpowder)",
        "Japanese Matcha powder",
        "White Silver Needle",
        "Black English Breakfast"
    ],
    [
        "Chinesischer Gunpowder-Grüntee (zu kleinen Kügelchen gerollte Teeblätter)",
        "Japanisches Matcha-Pulver",
        "Weißer Silbernadel-Tee",
        "Schwarzer Assam-Tee"
    ],
    0,
    "Gunpowder tea unfurls slowly under boiling water, providing a sturdy, astringent backbone that balances fresh Nana mint and cane sugar.",
    "Die fest gerollten 'Kanonenpulver'-Kügelchen halten dem Aufkochen stand und bilden das herbe Rückgrat für frische Nanaminze und Zucker."
)
add_q(
    "q_tea_tannin_oversteep", "tea",
    "Why does black tea turn unpleasantly dry and astringent when steeped for longer than 5 minutes?",
    "Warum schmeckt Schwarztee adstringierend und pelzig, wenn er länger als 5 Minuten zieht?",
    [
        "Caffeine and light volatile aromas extract within 2–3 minutes; heavy polyphenolic tannins extract continuously thereafter",
        "The water evaporates, making the tea concentrated syrup",
        "The leaves absorb all oxygen from the teapot",
        "Calcium precipitates out of the cup"
    ],
    [
        "Koffein und ätherische Öle lösen sich in den ersten 2–3 Minuten; danach diffundieren schwere, bittere Gerbstoffe (Tannine) aus",
        "Das Wasser verdampft vollständig zu Sirup",
        "Die Blätter saugen den gesamten Sauerstoff aus der Kanne",
        "Kalk flockt am Tassenrand aus"
    ],
    0,
    "After 3–4 minutes, high-molecular-weight thearubigins and theaflavins saturate the infusion, bonding aggressively to oral proteins.",
    "Nach etwa drei Minuten sind die feinen Aromen gelöst; längeres Ziehen laugt die bitteren Gerbsäuren aus dem Zellinneren aus."
)
add_q(
    "q_tea_masala_chai_spices", "tea",
    "Which combination of whole spices defines traditional Indian Masala Chai?",
    "Welche Gewürzkombination bildet die klassische Seele eines indischen Masala Chai?",
    [
        "Cardamom, fresh ginger, cinnamon, cloves, and black peppercorns simmered with whole milk",
        "Vanilla bean, nutmeg, and chili powder",
        "Cumin, coriander, and turmeric",
        "Star anise, dill, and bay leaves"
    ],
    [
        "Grüner Kardamom, frischer Ingwer, Zimtstangen, Nelken und schwarzer Pfeffer gekocht in Vollmilch",
        "Vanilleschote, Muskatnuss und Chilipulver",
        "Kreuzkümmel, Koriander und Kurkuma",
        "Sternanis, Dill und Lorbeerblätter"
    ],
    0,
    "Simmering cracked spices alongside CTC Assam black tea, water, full-fat milk, and raw jaggery sugar emulsifies spicy warming essential oils.",
    "Die Gewürze werden direkt in der Milch-Wasser-Mischung ausgekocht; Schärfe (Pfeffer, Ingwer) und Süße (Zimt, Kardamom) harmonieren mit dem Tee."
)
add_q(
    "q_tea_cold_brew_sweetness", "tea",
    "Why does cold-brewing loose-leaf tea in the refrigerator (for 12 hours) produce a sweeter, smoother drink than iced hot tea?",
    "Warum schmeckt Cold-Brew-Tee (12 Std. im Kühlschrank) deutlich süßer und milder als abgekühlter Heißtee?",
    [
        "Cold water extracts natural amino acids and sugars while leaving bitter catechins and harsh tannins largely trapped inside the leaf matrix",
        "Cold water adds extra sugar into the glass",
        "The refrigerator removes all acid through condensation",
        "Cold temperatures convert caffeine into honey"
    ],
    [
        "Kaltes Wasser löst Aminosäuren und Fruchtnoten, lässt jedoch thermisch lösliche Catechine und herbe Gerbstoffe im Blatt zurück",
        "Kaltes Wasser bildet spontan Zucker",
        "Die Kälte entzieht der Flüssigkeit sämtliche Säure",
        "Niedrige Temperaturen wandeln Koffein in Traubenzucker um"
    ],
    0,
    "Polyphenols require thermal kinetic energy (>80°C) to leach out. Cold extraction yields pure crystal clarity, sweetness, and zero bitterness.",
    "Gerbstoffe benötigen Hitze, um in Lösung zu gehen. Im kalten Wasser diffundieren nur die aromatischen und süßen Komponenten."
)
"""

print("Writing tea questions...")
"""
The above data block will be saved and executed.
"""
