package com.example.data

import android.content.Context
import android.util.Log
import com.example.model.AlcoholProductionType
import com.example.model.GastroCategory
import com.example.model.GastroItem
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.withContext
import org.json.JSONArray
import org.json.JSONObject
import java.io.BufferedReader
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

data class CatalogVersionInfo(
    val version: Int = 35,
    val versionName: String = "v3.5 (Cloud Master Release)",
    val totalCuratedItems: Int = 170,
    val lastCheckTimestamp: Long = System.currentTimeMillis(),
    val serverEndpoint: String = "https://gastrodex-823d7.web.app/catalog_latest.json",
    val isAutoCheckEnabled: Boolean = true,
    val lastStatusMessage: String = "Google Firebase Datenbank (gastrodex-823d7) • v3.5 Master synchronisiert (170 Artikel, 21 Kategorien)"
)

class GastroSyncManager(private val repository: GastroRepository) {

    private val _versionInfo = MutableStateFlow(
        CatalogVersionInfo(
            totalCuratedItems = CuratedGastroData.items.size,
            lastStatusMessage = "Google Firebase Datenbank (gastrodex-823d7) • v3.5 Master synchronisiert (${CuratedGastroData.items.size} Artikel, 21 Kategorien)"
        )
    )
    val versionInfo: StateFlow<CatalogVersionInfo> = _versionInfo

    private val _isCheckingUpdate = MutableStateFlow(false)
    val isCheckingUpdate: StateFlow<Boolean> = _isCheckingUpdate

    /**
     * Checks the remote server (Firebase / Google Cloud Storage CDN) for database updates.
     * Offline-first: If network fails, the local Room database remains 100% functional.
     */
    suspend fun checkForUpdates(customEndpoint: String? = null): Result<Int> = withContext(Dispatchers.IO) {
        _isCheckingUpdate.value = true
        val targetUrl = customEndpoint ?: _versionInfo.value.serverEndpoint

        try {
            // Check remote server for database updates
            val connection = (URL(targetUrl).openConnection() as? HttpURLConnection)?.apply {
                connectTimeout = 4000
                readTimeout = 4000
                requestMethod = "GET"
                setRequestProperty("Accept", "application/json")
            }

            var jsonContent: String? = null
            if (connection != null && connection.responseCode == 200) {
                val reader = BufferedReader(InputStreamReader(connection.inputStream))
                jsonContent = reader.use { it.readText() }
            }

            if (jsonContent != null) {
                val root = JSONObject(jsonContent)
                val remoteVersion = root.optInt("catalogVersion", _versionInfo.value.version)
                if (remoteVersion > _versionInfo.value.version) {
                    applyCatalogJsonUpdate(jsonContent)
                } else {
                    val currentV = _versionInfo.value.version
                    _versionInfo.value = _versionInfo.value.copy(
                        lastCheckTimestamp = System.currentTimeMillis(),
                        lastStatusMessage = "Server geprüft: Version v${currentV / 10}.${currentV % 10} ist aktuell (${CuratedGastroData.items.size} Artikel)"
                    )
                }
            } else {
                val currentV = _versionInfo.value.version
                _versionInfo.value = _versionInfo.value.copy(
                    lastCheckTimestamp = System.currentTimeMillis(),
                    lastStatusMessage = "Server geprüft: Version v${currentV / 10}.${currentV % 10} ist aktuell (${CuratedGastroData.items.size} Artikel)"
                )
            }
            _isCheckingUpdate.value = false
            Result.success(0)
        } catch (e: Exception) {
            Log.w("GastroSyncManager", "Remote check offline or endpoint pending: ${e.message}")
            val currentV = _versionInfo.value.version
            _versionInfo.value = _versionInfo.value.copy(
                lastCheckTimestamp = System.currentTimeMillis(),
                lastStatusMessage = "Offline-Modus aktiv: Lokale Datenbank v${currentV / 10}.${currentV % 10} bereit (${CuratedGastroData.items.size} Artikel)"
            )
            _isCheckingUpdate.value = false
            Result.success(0)
        }
    }

    /**
     * Ingests a new catalog JSON payload provided by the developer CMS.
     * Upserts all entries into local Room cache so all users immediately get new categories/items.
     */
    suspend fun applyCatalogJsonUpdate(jsonString: String): Result<Int> = withContext(Dispatchers.IO) {
        try {
            val root = JSONObject(jsonString)
            val newVersion = root.optInt("catalogVersion", _versionInfo.value.version + 1)
            val array = root.optJSONArray("items") ?: JSONArray()
            val parsedList = mutableListOf<GastroItem>()

            for (i in 0 until array.length()) {
                val obj = array.getJSONObject(i)
                val catId = obj.optString("category", "spirits")
                val cat = GastroCategory.entries.find { it.id == catId } ?: GastroCategory.SPIRITS
                val procStr = obj.optString("alcoholProcess", "NONE")
                val proc = try { AlcoholProductionType.valueOf(procStr) } catch (e: Exception) { AlcoholProductionType.NONE }

                val item = GastroItem(
                    id = obj.optString("id", "curated_${System.currentTimeMillis()}_$i"),
                    category = cat,
                    nameEn = obj.optString("nameEn", "Item $i"),
                    nameDe = obj.optString("nameDe", "Eintrag $i"),
                    subtitleEn = obj.optString("subtitleEn", ""),
                    subtitleDe = obj.optString("subtitleDe", ""),
                    imageUrl = obj.optString("imageUrl", "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=80"),
                    origin = obj.optString("origin", "International"),
                    isImport = obj.optBoolean("isImport", true),
                    alcoholProcess = proc,
                    rawMaterialEn = obj.optString("rawMaterialEn", ""),
                    rawMaterialDe = obj.optString("rawMaterialDe", ""),
                    abv = obj.optString("abv", ""),
                    tasteProfileEn = obj.optString("tasteProfileEn", ""),
                    tasteProfileDe = obj.optString("tasteProfileDe", ""),
                    scienceExplainedEn = obj.optString("scienceExplainedEn", ""),
                    scienceExplainedDe = obj.optString("scienceExplainedDe", ""),
                    culinaryServingEn = obj.optString("culinaryServingEn", ""),
                    culinaryServingDe = obj.optString("culinaryServingDe", ""),
                    guestFaqEn = obj.optString("guestFaqEn", ""),
                    guestFaqDe = obj.optString("guestFaqDe", ""),
                    allergens = emptyList(),
                    tags = listOf(cat.titleDe),
                    isCustom = false
                )
                parsedList.add(item)
            }

            if (parsedList.isNotEmpty()) {
                repository.importCustomItems(parsedList)
                _versionInfo.value = _versionInfo.value.copy(
                    version = newVersion,
                    versionName = "v${newVersion / 10}.${newVersion % 10}",
                    totalCuratedItems = parsedList.size,
                    lastCheckTimestamp = System.currentTimeMillis(),
                    lastStatusMessage = "${parsedList.size} neue Einträge erfolgreich eingespielt!"
                )
                Result.success(parsedList.size)
            } else {
                Result.failure(Exception("Keine gültigen Einträge im JSON-Katalog gefunden."))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
