package com.example.model

enum class Language(val code: String, val displayName: String, val flag: String) {
    EN("en", "English", "🇬🇧"),
    DE("de", "Deutsch", "🇩🇪")
}

enum class GastroCategory(
    val id: String,
    val titleEn: String,
    val titleDe: String,
    val iconName: String,
    val colorHex: Long
) {
    ALL("all", "All Entries", "Alle Einträge", "Restaurant", 0xFFC98822),
    SPIRITS("spirits", "Spirits & Distillates", "Spirituosen & Destillate", "Liquor", 0xFF9E2A2B),
    WINE("wine", "Wine & Champagne", "Wein & Schaumweine", "WineBar", 0xFF722F37),
    TEA("tea", "Tea & Infusions", "Teekunde & Aufgüsse", "EmojiFoodBeverage", 0xFF2D6A4F),
    COFFEE("coffee", "Coffee Specialties", "Kaffeespezialitäten", "Coffee", 0xFF6F4E37),
    PASTA_RICE("pasta_rice", "Pasta & Rice Varieties", "Pasta & Reisvariationen", "DinnerDining", 0xFFD4A373),
    SAUCES_CONDIMENTS("sauces_condiments", "Sauces, Dressings & Mustard", "Saucen, Dressings & Senf", "SoupKitchen", 0xFFBC6C25),
    SOFT_DRINKS("soft_drinks", "Soft Drinks & Mixers", "Erfrischung & Mixer", "LocalBar", 0xFF3D5A80),
    DAIRY("dairy", "Dairy & Milk Science", "Milch & Molkerei", "EggAlt", 0xFF2B7A78),
    CHEESE("cheese", "Cheese & DOP / g.U.", "Käsekunde & g.U.", "BakeryDining", 0xFFD48B38),
    EGGS("eggs", "Egg Dishes & Science", "Eierspeisen & Eierkunde", "Egg", 0xFFE5A93C),
    FRUITS("fruits", "Fruits & Berries", "Früchte & Beeren", "Spa", 0xFFE07A5F),
    VEGETABLES("vegetables", "Vegetables & Mushrooms", "Gemüse & Speisepilze", "Yard", 0xFF588157),
    NUTS_SEEDS("nuts", "Nuts & Seeds", "Nüsse & Saaten", "Grain", 0xFFB08968),
    SPICES_HERBS("spices_herbs", "Spices & Herbs", "Gewürze & Kräuter", "Spa", 0xFFD97706),
    FISH_SEAFOOD("fish_seafood", "Fish & Seafood", "Fisch & Meeresfrüchte", "SetMeal", 0xFF0077B6),
    OLIVES("olives", "Olives", "Oliven", "Eco", 0xFF4A7C59),
    OILS_VINEGARS("oils_vinegars", "Oils & Vinegars", "Öle & Essig", "Opacity", 0xFFE06D53),
    CHARCUTERIE_DELI("charcuterie", "Charcuterie & Cold Cuts", "Deli & Aufschnitt", "DinnerDining", 0xFF8D5B4C),
    MEAT_CUTS("meat_cuts", "Steaks & Meat Cuts", "Fleischstücke & Cuts", "Restaurant", 0xFFA83232),
    BREAD_BAKERY("bread_bakery", "Breads & Rolls", "Brote & Brötchen", "BakeryDining", 0xFFDDA15E),
    FINGERFOOD_SNACKS("fingerfood", "Fingerfood, Bites & Snacks", "Fingerfood & Snacks", "BreakfastDining", 0xFF457B9D)
}

enum class AlcoholProductionType(val titleEn: String, val titleDe: String) {
    DISTILLATION("Distillation", "Destillation"),
    FERMENTATION("Fermentation", "Fermentation"),
    BREWING("Brewing & Mashing", "Brauen & Maischen"),
    FORTIFIED("Fortified Wine", "Aufgespritet"),
    NONE("Non-Alcoholic", "Alkoholfrei")
}

data class CoffeeLayers(
    val espressoPercent: Float,
    val steamedMilkPercent: Float,
    val milkFoamPercent: Float,
    val waterPercent: Float = 0f,
    val descriptionEn: String,
    val descriptionDe: String
)

data class GastroItem(
    val id: String,
    val category: GastroCategory,
    val nameEn: String,
    val nameDe: String,
    val subtitleEn: String,
    val subtitleDe: String,
    val imageUrl: String,
    val origin: String,
    val isImport: Boolean, // e.g. imported to Central Europe vs native/regional
    val alcoholProcess: AlcoholProductionType = AlcoholProductionType.NONE,
    val rawMaterialEn: String = "",
    val rawMaterialDe: String = "",
    val abv: String,
    val tasteProfileEn: String,
    val tasteProfileDe: String,
    val scienceExplainedEn: String,
    val scienceExplainedDe: String,
    val culinaryServingEn: String,
    val culinaryServingDe: String,
    val guestFaqEn: String,
    val guestFaqDe: String,
    val allergens: List<String>,
    val tags: List<String>,
    val coffeeLayers: CoffeeLayers? = null,
    val isFavorite: Boolean = false,
    val inStock: Boolean = false,
    val stockQuantity: Int = 0,
    val storageLocation: String = "",
    val minThreshold: Int = 2,
    val supplier: String = "",
    val costPrice: String = "",
    val userNotes: String = "",
    val isCustom: Boolean = false,
    val pairings: List<String> = emptyList(),
    val culinaryUsageDe: String = "",
    val culinaryUsageEn: String = "",
    val milkType: String = "",
    val cheeseTexture: String = "",
    val brewRatio: String = "",
    val extractionTime: String = "",
    val smokePoint: String = "",
    val acidityLevel: String = "",
    val cookingTime: String = "",
    val cutLocation: String = "",
    val doneness: String = ""
) {
    fun localizedName(lang: Language): String = if (lang == Language.DE) nameDe else nameEn
    fun localizedSubtitle(lang: Language): String = if (lang == Language.DE) subtitleDe else subtitleEn
    fun localizedRawMaterial(lang: Language): String = if (lang == Language.DE) rawMaterialDe else rawMaterialEn
    fun localizedTaste(lang: Language): String = if (lang == Language.DE) tasteProfileDe else tasteProfileEn
    fun localizedScience(lang: Language): String = if (lang == Language.DE) scienceExplainedDe else scienceExplainedEn
    fun localizedCulinary(lang: Language): String = if (lang == Language.DE) culinaryServingDe else culinaryServingEn
    fun localizedFaq(lang: Language): String = if (lang == Language.DE) guestFaqDe else guestFaqEn
}

data class QuizQuestion(
    val id: String,
    val category: GastroCategory,
    val questionEn: String,
    val questionDe: String,
    val optionsEn: List<String>,
    val optionsDe: List<String>,
    val correctIndex: Int,
    val explanationEn: String,
    val explanationDe: String
) {
    fun localizedQuestion(lang: Language): String = if (lang == Language.DE) questionDe else questionEn
    fun localizedOptions(lang: Language): List<String> = if (lang == Language.DE) optionsDe else optionsEn
    fun localizedExplanation(lang: Language): String = if (lang == Language.DE) explanationDe else explanationEn
}

data class StaffQuizResult(
    val id: String,
    val staffName: String,
    val score: Int,
    val totalQuestions: Int,
    val percentage: Int,
    val dateString: String
)

enum class GastroRole(
    val titleDe: String,
    val titleEn: String,
    val descriptionDe: String,
    val descriptionEn: String,
    val recommendedCategories: List<GastroCategory>
) {
    SERVICE(
        titleDe = "Service & Restaurantfach",
        titleEn = "Service & Front of House",
        descriptionDe = "Gästeberatung, Speisenbegleitung, Eierspeisen, Käse & Softdrinks",
        descriptionEn = "Guest communication, food pairing, egg dishes, cheese & soft drinks",
        recommendedCategories = listOf(GastroCategory.CHEESE, GastroCategory.EGGS, GastroCategory.DAIRY, GastroCategory.SOFT_DRINKS)
    ),
    SOMMELIER(
        titleDe = "Sommelier / Weinberater",
        titleEn = "Sommelier & Wine Specialist",
        descriptionDe = "Champagner vs. Sekt, Terroir, Jahrgänge & Sensorik",
        descriptionEn = "Champagne vs. sparkling, terroir, vintages & tasting notes",
        recommendedCategories = listOf(GastroCategory.WINE, GastroCategory.CHEESE)
    ),
    BARTENDER(
        titleDe = "Barchef / Bartender",
        titleEn = "Head Bartender / Mixologist",
        descriptionDe = "Spirituosen, Destillate, Cocktail-Wissenschaft & Mixer",
        descriptionEn = "Spirits, distillates, cocktail chemistry & craft mixers",
        recommendedCategories = listOf(GastroCategory.SPIRITS, GastroCategory.SOFT_DRINKS, GastroCategory.COFFEE)
    ),
    BARISTA(
        titleDe = "Barista / Kaffee-Spezialist",
        titleEn = "Barista & Coffee Specialist",
        descriptionDe = "Extraktion, Milchschaum-Wissenschaft, Röstung & Varietäten",
        descriptionEn = "Extraction physics, milk foam microfoam, roasting & varieties",
        recommendedCategories = listOf(GastroCategory.COFFEE, GastroCategory.DAIRY)
    ),
    CHEF(
        titleDe = "Koch / Küchenmeister / Azubi",
        titleEn = "Chef / Culinary Apprentice",
        descriptionDe = "Warenkunde, Trüffel, Pilze, Eier-Garmethoden & Rohstoffe",
        descriptionEn = "Ingredient science, truffles, mushrooms, egg coagulation & produce",
        recommendedCategories = listOf(GastroCategory.VEGETABLES, GastroCategory.FRUITS, GastroCategory.EGGS, GastroCategory.DAIRY)
    ),
    MANAGER(
        titleDe = "Gastronom / Betriebsleiter",
        titleEn = "Restaurant Manager / Operator",
        descriptionDe = "Gesamter Betrieb, Mitarbeiterschulung & Qualitätsmanagement",
        descriptionEn = "Full operational overview, staff training & quality benchmarks",
        recommendedCategories = listOf(GastroCategory.ALL)
    )
}

data class UserProfile(
    val email: String = "gastronom@googlemail.com",
    val displayName: String = "Florian Gastronom",
    val photoUrl: String = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    val isConnected: Boolean = true,
    val role: GastroRole = GastroRole.SERVICE,
    val isPro: Boolean = false,
    val totalQuizzesTaken: Int = 12,
    val totalCorrectAnswers: Int = 104,
    val totalQuestionsAnswered: Int = 120,
    val customItemsCount: Int = 0,
    val lastSyncTimestamp: Long = System.currentTimeMillis() - 3600000L * 4
) {
    val quizAccuracyPercent: Int
        get() = if (totalQuestionsAnswered > 0) (totalCorrectAnswers * 100) / totalQuestionsAnswered else 0
}

data class CloudBackupPayload(
    val version: Int = 2,
    val exportDate: String,
    val userEmail: String,
    val deviceName: String,
    val items: List<GastroItem>
)

