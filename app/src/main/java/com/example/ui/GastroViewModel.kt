package com.example.ui

import android.content.Context
import android.content.Intent
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.data.CuratedGastroData
import com.example.data.GastroRepository
import com.example.data.GastroSyncManager
import com.example.model.AlcoholProductionType
import com.example.model.GastroCategory
import com.example.model.GastroItem
import com.example.model.GastroRole
import com.example.model.Language
import com.example.model.QuizQuestion
import com.example.model.UserProfile
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import org.json.JSONArray
import org.json.JSONObject
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

enum class NavTab(val titleEn: String, val titleDe: String) {
    HOME("Home", "Übersicht"),
    CATALOG("Encyclopedia", "Lexikon"),
    WINE_GUIDE("Wine Guide", "Wein-Guide"),
    COFFEE_LAB("Coffee Lab", "Kaffee-Labor"),
    SCIENCE("Process Science", "Wirkungslehre"),
    QUIZ("Staff Trainer", "Schulungs-Quiz")
}

data class QuizSessionState(
    val currentQuestionIndex: Int = 0,
    val selectedOptionIndex: Int? = null,
    val isAnswerRevealed: Boolean = false,
    val score: Int = 0,
    val isCompleted: Boolean = false
)

class GastroViewModel(
    private val repository: GastroRepository,
    private val context: Context? = null
) : ViewModel() {

    private val prefs = context?.getSharedPreferences("gastrodex_preferences", Context.MODE_PRIVATE)

    val language = MutableStateFlow(
        prefs?.getString("pref_language", null)?.let { code ->
            Language.entries.find { it.code.equals(code, ignoreCase = true) }
        } ?: Language.DE
    )
    val currentTab = MutableStateFlow(NavTab.HOME)
    val showAdminInventory = MutableStateFlow(false)
    val showProfileScreen = MutableStateFlow(false)
    val showMonetizationDialog = MutableStateFlow(false)

    val selectedCategory = MutableStateFlow(GastroCategory.ALL)
    val searchQuery = MutableStateFlow("")
    val filterOnlyInStock = MutableStateFlow(false)
    val filterOnlyFavorites = MutableStateFlow(false)
    val filterOnlyCustom = MutableStateFlow(false)
    val filterImportType = MutableStateFlow<Boolean?>(null) // null = all, true = import, false = regional

    // User Profile, Google Sync & Monetization State
    val userProfile = MutableStateFlow(UserProfile())
    val isGoogleConnected = MutableStateFlow(true)
    val isProUser = MutableStateFlow(false)
    val isAutoSyncEnabled = MutableStateFlow(true)
    val lastCloudSyncTimestamp = MutableStateFlow(System.currentTimeMillis() - 3600000L * 3)

    // Developer Remote Database & Version Synchronization Manager
    val syncManager = GastroSyncManager(repository)
    val catalogVersionInfo = syncManager.versionInfo
    val isCheckingCatalogUpdate = syncManager.isCheckingUpdate

    val selectedItem = MutableStateFlow<GastroItem?>(null)

    // Coffee comparison state
    val coffeeCompareLeft = MutableStateFlow<GastroItem?>(null)
    val coffeeCompareRight = MutableStateFlow<GastroItem?>(null)

    // Quiz state & configuration
    val quizQuestions: List<QuizQuestion> = CuratedGastroData.quizQuestions
    val quizCategory = MutableStateFlow(GastroCategory.ALL)
    val quizTargetCount = MutableStateFlow(10)
    val activeSessionQuestions = MutableStateFlow<List<QuizQuestion>>(CuratedGastroData.quizQuestions.take(10))
    val quizState = MutableStateFlow(QuizSessionState())

    // All items from repository
    val rawItems: StateFlow<List<GastroItem>> = repository.allItems.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000),
        initialValue = CuratedGastroData.items
    )

    val customItemsCount: StateFlow<Int> = rawItems.map { list ->
        list.count { it.isCustom }
    }.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000),
        initialValue = 0
    )

    data class FilterState(
        val category: GastroCategory = GastroCategory.ALL,
        val query: String = "",
        val onlyFavorites: Boolean = false,
        val onlyCustom: Boolean = false,
        val importType: Boolean? = null,
        val lang: Language = Language.DE
    )

    private val filterStateFlow = combine(
        combine(selectedCategory, searchQuery, filterOnlyFavorites) { cat, query, fav ->
            Triple(cat, query, fav)
        },
        combine(filterOnlyCustom, filterImportType, language) { custom, importType, lang ->
            Triple(custom, importType, lang)
        }
    ) { (cat, query, fav), (custom, importType, lang) ->
        FilterState(
            category = cat,
            query = query,
            onlyFavorites = fav,
            onlyCustom = custom,
            importType = importType,
            lang = lang
        )
    }

    // Filtered items based on category, search, favorite, custom, imports
    val filteredItems: StateFlow<List<GastroItem>> = combine(
        rawItems,
        filterStateFlow
    ) { items, filter ->
        items.filter { item ->
            val matchesCategory = (filter.category == GastroCategory.ALL || item.category == filter.category)
            val matchesSearch = filter.query.isBlank() ||
                    item.localizedName(filter.lang).contains(filter.query, ignoreCase = true) ||
                    item.localizedSubtitle(filter.lang).contains(filter.query, ignoreCase = true) ||
                    item.origin.contains(filter.query, ignoreCase = true) ||
                    item.tags.any { it.contains(filter.query, ignoreCase = true) } ||
                    item.localizedRawMaterial(filter.lang).contains(filter.query, ignoreCase = true) ||
                    item.localizedTaste(filter.lang).contains(filter.query, ignoreCase = true)

            val matchesFav = !filter.onlyFavorites || item.isFavorite
            val matchesCustom = !filter.onlyCustom || item.isCustom
            val matchesImport = (filter.importType == null) || (item.isImport == filter.importType)

            matchesCategory && matchesSearch && matchesFav && matchesCustom && matchesImport
        }
    }.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000),
        initialValue = CuratedGastroData.items
    )

    init {
        // Initialize coffee comparison with Cappuccino & Latte Macchiato
        val coffeeItems = CuratedGastroData.items.filter { it.category == GastroCategory.COFFEE }
        coffeeCompareLeft.value = coffeeItems.find { it.id == "coffee_cappuccino" } ?: coffeeItems.firstOrNull()
        coffeeCompareRight.value = coffeeItems.find { it.id == "coffee_latte_macchiato" } ?: coffeeItems.getOrNull(1)

        // Automatically check remote server / Firebase CDN for catalog database updates on launch
        viewModelScope.launch {
            syncManager.checkForUpdates()
        }
    }

    fun checkForCatalogUpdate(customEndpoint: String? = null, onResult: (String) -> Unit = {}) {
        viewModelScope.launch {
            syncManager.checkForUpdates(customEndpoint)
            onResult(syncManager.versionInfo.value.lastStatusMessage)
        }
    }

    fun applyDeveloperCatalogJson(json: String, onResult: (Boolean, String) -> Unit) {
        viewModelScope.launch {
            val result = syncManager.applyCatalogJsonUpdate(json)
            if (result.isSuccess) {
                onResult(true, "${result.getOrNull()} Einträge erfolgreich in Datenbank eingespielt!")
            } else {
                onResult(false, result.exceptionOrNull()?.message ?: "Fehler beim Einspielen")
            }
        }
    }

    fun toggleLanguage() {
        val next = if (language.value == Language.EN) Language.DE else Language.EN
        setLanguage(next)
    }

    fun setLanguage(lang: Language) {
        language.value = lang
        prefs?.edit()?.putString("pref_language", lang.code)?.apply()
    }

    fun selectCategory(category: GastroCategory) {
        selectedCategory.value = category
    }

    fun setSearchQuery(query: String) {
        searchQuery.value = query
    }

    fun toggleOnlyInStock() {
        filterOnlyInStock.value = !filterOnlyInStock.value
    }

    fun toggleOnlyFavorites() {
        filterOnlyFavorites.value = !filterOnlyFavorites.value
    }

    fun toggleFilterOnlyCustom() {
        filterOnlyCustom.value = !filterOnlyCustom.value
    }

    fun setImportFilter(isImport: Boolean?) {
        filterImportType.value = isImport
    }

    fun selectItem(item: GastroItem?) {
        selectedItem.value = item
    }

    fun toggleFavorite(item: GastroItem) {
        viewModelScope.launch {
            repository.toggleFavorite(item)
            if (selectedItem.value?.id == item.id) {
                selectedItem.value = selectedItem.value?.copy(isFavorite = !item.isFavorite)
            }
        }
    }

    fun toggleInStock(item: GastroItem) {
        viewModelScope.launch {
            repository.toggleInStock(item)
            if (selectedItem.value?.id == item.id) {
                selectedItem.value = selectedItem.value?.copy(inStock = !item.inStock)
            }
        }
    }

    fun saveNotes(item: GastroItem, notes: String) {
        viewModelScope.launch {
            repository.saveNotes(item.id, notes, item)
            if (selectedItem.value?.id == item.id) {
                selectedItem.value = selectedItem.value?.copy(userNotes = notes)
            }
            if (isAutoSyncEnabled.value && isGoogleConnected.value) {
                lastCloudSyncTimestamp.value = System.currentTimeMillis()
            }
        }
    }

    fun updateItem(item: GastroItem) {
        viewModelScope.launch {
            repository.updateItem(item)
            if (selectedItem.value?.id == item.id) {
                selectedItem.value = item
            }
            if (isAutoSyncEnabled.value && isGoogleConnected.value) {
                lastCloudSyncTimestamp.value = System.currentTimeMillis()
            }
        }
    }

    fun updateStockQuantity(item: GastroItem, quantity: Int) {
        viewModelScope.launch {
            repository.updateStockQuantity(item, quantity)
            if (selectedItem.value?.id == item.id) {
                selectedItem.value = selectedItem.value?.copy(
                    stockQuantity = quantity,
                    inStock = quantity > 0
                )
            }
        }
    }

    fun addCustomItem(item: GastroItem) {
        viewModelScope.launch {
            repository.addCustomItem(item)
            if (isAutoSyncEnabled.value && isGoogleConnected.value) {
                lastCloudSyncTimestamp.value = System.currentTimeMillis()
            }
        }
    }

    fun deleteCustomItem(id: String) {
        viewModelScope.launch {
            repository.deleteCustomItem(id)
            if (selectedItem.value?.id == id) {
                selectedItem.value = null
            }
            if (isAutoSyncEnabled.value && isGoogleConnected.value) {
                lastCloudSyncTimestamp.value = System.currentTimeMillis()
            }
        }
    }

    // ==========================================
    // Profile, Google Sync & Monetization
    // ==========================================

    fun updateUserRole(role: GastroRole) {
        userProfile.value = userProfile.value.copy(role = role)
    }

    fun toggleGoogleConnection() {
        val next = !isGoogleConnected.value
        isGoogleConnected.value = next
        userProfile.value = userProfile.value.copy(isConnected = next)
        if (next) {
            lastCloudSyncTimestamp.value = System.currentTimeMillis()
        }
    }

    fun toggleProStatus() {
        val next = !isProUser.value
        isProUser.value = next
        userProfile.value = userProfile.value.copy(isPro = next)
    }

    fun toggleAutoSync() {
        isAutoSyncEnabled.value = !isAutoSyncEnabled.value
    }

    fun triggerManualSync(onSuccess: (itemCount: Int) -> Unit = {}) {
        viewModelScope.launch {
            val custom = repository.getCustomItems()
            lastCloudSyncTimestamp.value = System.currentTimeMillis()
            userProfile.value = userProfile.value.copy(
                customItemsCount = custom.size,
                lastSyncTimestamp = System.currentTimeMillis()
            )
            onSuccess(custom.size)
        }
    }

    suspend fun exportCustomItemsJson(): String {
        val customItems = repository.getCustomItems()
        val root = JSONObject()
        root.put("app", "GastroCodex")
        root.put("version", 2)
        root.put("exportedAt", SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.GERMANY).format(Date()))
        root.put("userEmail", userProfile.value.email)
        root.put("itemCount", customItems.size)

        val array = JSONArray()
        for (item in customItems) {
            val obj = JSONObject()
            obj.put("id", item.id)
            obj.put("category", item.category.id)
            obj.put("nameEn", item.nameEn)
            obj.put("nameDe", item.nameDe)
            obj.put("subtitleEn", item.subtitleEn)
            obj.put("subtitleDe", item.subtitleDe)
            obj.put("imageUrl", item.imageUrl)
            obj.put("origin", item.origin)
            obj.put("isImport", item.isImport)
            obj.put("process", item.alcoholProcess.name)
            obj.put("rawMaterialDe", item.rawMaterialDe)
            obj.put("rawMaterialEn", item.rawMaterialEn)
            obj.put("abv", item.abv)
            obj.put("tasteDe", item.tasteProfileDe)
            obj.put("tasteEn", item.tasteProfileEn)
            obj.put("scienceDe", item.scienceExplainedDe)
            obj.put("scienceEn", item.scienceExplainedEn)
            obj.put("culinaryDe", item.culinaryServingDe)
            obj.put("culinaryEn", item.culinaryServingEn)
            obj.put("faqDe", item.guestFaqDe)
            obj.put("faqEn", item.guestFaqEn)
            obj.put("allergens", JSONArray(item.allergens))
            obj.put("tags", JSONArray(item.tags))
            obj.put("userNotes", item.userNotes)
            array.put(obj)
        }
        root.put("items", array)
        return root.toString(2)
    }

    fun importCustomItemsJson(jsonStr: String, onComplete: (count: Int, error: String?) -> Unit) {
        viewModelScope.launch {
            try {
                val root = JSONObject(jsonStr)
                val array = root.optJSONArray("items") ?: JSONArray()
                val parsedItems = mutableListOf<GastroItem>()

                for (i in 0 until array.length()) {
                    val obj = array.getJSONObject(i)
                    val catId = obj.optString("category", "spirits")
                    val cat = GastroCategory.entries.find { it.id == catId } ?: GastroCategory.SPIRITS
                    val processStr = obj.optString("process", "NONE")
                    val process = try {
                        AlcoholProductionType.valueOf(processStr)
                    } catch (e: Exception) {
                        AlcoholProductionType.NONE
                    }

                    val allergensList = mutableListOf<String>()
                    val aArr = obj.optJSONArray("allergens")
                    if (aArr != null) {
                        for (k in 0 until aArr.length()) allergensList.add(aArr.getString(k))
                    }

                    val tagsList = mutableListOf<String>()
                    val tArr = obj.optJSONArray("tags")
                    if (tArr != null) {
                        for (k in 0 until tArr.length()) tagsList.add(tArr.getString(k))
                    }

                    val item = GastroItem(
                        id = obj.optString("id", "custom_${System.currentTimeMillis()}_$i"),
                        category = cat,
                        nameEn = obj.optString("nameEn", "Imported Item"),
                        nameDe = obj.optString("nameDe", "Importierter Eintrag"),
                        subtitleEn = obj.optString("subtitleEn", ""),
                        subtitleDe = obj.optString("subtitleDe", ""),
                        imageUrl = obj.optString("imageUrl", "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=80"),
                        origin = obj.optString("origin", "Eigenkreation / Gastronomie"),
                        isImport = obj.optBoolean("isImport", false),
                        alcoholProcess = process,
                        rawMaterialEn = obj.optString("rawMaterialEn", ""),
                        rawMaterialDe = obj.optString("rawMaterialDe", ""),
                        abv = obj.optString("abv", ""),
                        tasteProfileEn = obj.optString("tasteEn", ""),
                        tasteProfileDe = obj.optString("tasteDe", ""),
                        scienceExplainedEn = obj.optString("scienceEn", ""),
                        scienceExplainedDe = obj.optString("scienceDe", ""),
                        culinaryServingEn = obj.optString("culinaryEn", ""),
                        culinaryServingDe = obj.optString("culinaryDe", ""),
                        guestFaqEn = obj.optString("faqEn", ""),
                        guestFaqDe = obj.optString("faqDe", ""),
                        allergens = allergensList,
                        tags = tagsList,
                        userNotes = obj.optString("userNotes", ""),
                        isCustom = true
                    )
                    parsedItems.add(item)
                }

                if (parsedItems.isNotEmpty()) {
                    repository.importCustomItems(parsedItems)
                    lastCloudSyncTimestamp.value = System.currentTimeMillis()
                    onComplete(parsedItems.size, null)
                } else {
                    onComplete(0, "Keine gültigen Einträge im Backup gefunden.")
                }
            } catch (e: Exception) {
                onComplete(0, "Fehler beim Lesen der JSON-Daten: ${e.message}")
            }
        }
    }

    fun shareCustomItems(context: Context) {
        viewModelScope.launch {
            val json = exportCustomItemsJson()
            val custom = repository.getCustomItems()
            val textBuilder = StringBuilder()
            textBuilder.append("📖 GastroCodex - Geteilte Gastro-Karten & Hausrezepte (${custom.size} Einträge)\n\n")
            custom.take(5).forEach {
                textBuilder.append("• ${it.nameDe} (${it.category.titleDe}) - ${it.origin}\n")
                if (it.userNotes.isNotBlank()) {
                    textBuilder.append("  Notiz: ${it.userNotes}\n")
                }
            }
            if (custom.size > 5) {
                textBuilder.append("... und ${custom.size - 5} weitere Einträge.\n")
            }
            textBuilder.append("\n💾 GastroCodex Cloud/Team-Paket (JSON-Daten für Import):\n")
            textBuilder.append(json)

            val sendIntent = Intent().apply {
                action = Intent.ACTION_SEND
                putExtra(Intent.EXTRA_TEXT, textBuilder.toString())
                putExtra(Intent.EXTRA_SUBJECT, "GastroCodex - Geteilte Gastro-Karten")
                type = "text/plain"
            }
            val shareIntent = Intent.createChooser(sendIntent, "Gastro-Karten mit Team oder Google Account teilen")
            shareIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            context.startActivity(shareIntent)
        }
    }

    fun shareSingleItem(item: GastroItem, context: Context) {
        val lang = language.value
        val text = buildString {
            append("🍸 ${item.localizedName(lang)} (${if (lang == Language.DE) item.category.titleDe else item.category.titleEn})\n")
            append("📍 ${item.origin} | ${item.abv}\n\n")
            append("💡 ${item.localizedSubtitle(lang)}\n\n")
            append("🔬 Wissenschaft: ${item.localizedScience(lang)}\n\n")
            append("🍽️ Gast-Info: ${item.localizedFaq(lang)}\n\n")
            if (item.userNotes.isNotBlank()) {
                append("📝 Bar-/Team-Notiz: ${item.userNotes}\n\n")
            }
            append("Geteilt via GastroCodex App")
        }
        val sendIntent = Intent().apply {
            action = Intent.ACTION_SEND
            putExtra(Intent.EXTRA_TEXT, text)
            putExtra(Intent.EXTRA_SUBJECT, item.localizedName(lang))
            type = "text/plain"
        }
        val shareIntent = Intent.createChooser(sendIntent, "Eintrag teilen")
        shareIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        context.startActivity(shareIntent)
    }

    // Quiz actions & dynamic category filters
    fun configureAndStartQuiz(category: GastroCategory, count: Int = 10) {
        quizCategory.value = category
        quizTargetCount.value = count
        val pool = if (category == GastroCategory.ALL) {
            quizQuestions
        } else {
            quizQuestions.filter { it.category == category }.ifEmpty { quizQuestions }
        }
        activeSessionQuestions.value = pool.shuffled().take(count.coerceAtLeast(1))
        quizState.value = QuizSessionState()
    }

    fun answerQuizQuestion(optionIndex: Int) {
        val current = quizState.value
        if (current.isAnswerRevealed) return
        val questions = activeSessionQuestions.value
        val currentQ = questions.getOrNull(current.currentQuestionIndex) ?: return
        val isCorrect = (optionIndex == currentQ.correctIndex)
        val newScore = if (isCorrect) current.score + 1 else current.score
        quizState.value = current.copy(
            selectedOptionIndex = optionIndex,
            isAnswerRevealed = true,
            score = newScore
        )
    }

    fun nextQuizQuestion() {
        val current = quizState.value
        val questions = activeSessionQuestions.value
        if (current.currentQuestionIndex + 1 < questions.size) {
            quizState.value = current.copy(
                currentQuestionIndex = current.currentQuestionIndex + 1,
                selectedOptionIndex = null,
                isAnswerRevealed = false
            )
        } else {
            quizState.value = current.copy(isCompleted = true)
        }
    }

    fun resetQuiz() {
        configureAndStartQuiz(quizCategory.value, quizTargetCount.value)
    }
}

class GastroViewModelFactory(
    private val repository: GastroRepository,
    private val context: Context? = null
) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(GastroViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return GastroViewModel(repository, context) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
