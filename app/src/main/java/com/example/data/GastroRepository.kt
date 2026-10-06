package com.example.data

import com.example.data.local.GastroDao
import com.example.data.local.GastroUserItemEntity
import com.example.model.AlcoholProductionType
import com.example.model.GastroCategory
import com.example.model.GastroItem
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

class GastroRepository(private val gastroDao: GastroDao) {

    val allItems: Flow<List<GastroItem>> = gastroDao.getAllUserEntities().map { userEntities ->
        val entityMap = userEntities.associateBy { it.id }

        // Merge curated items with user overrides (isFavorite, inStock, stockQuantity, notes, custom imageUrl)
        val mergedCurated = CuratedGastroData.items.map { curated ->
            val override = entityMap[curated.id]
            if (override != null) {
                curated.copy(
                    imageUrl = override.imageUrl.ifBlank { curated.imageUrl },
                    isFavorite = override.isFavorite,
                    inStock = override.inStock,
                    stockQuantity = override.stockQuantity,
                    storageLocation = override.storageLocation,
                    minThreshold = override.minThreshold,
                    supplier = override.supplier,
                    costPrice = override.costPrice,
                    userNotes = override.userNotes
                )
            } else {
                curated
            }
        }

        // Include purely custom user-created items
        val customItems = userEntities.filter { it.isCustom }.map { entity ->
            val cat = GastroCategory.entries.find { it.id == entity.categoryId } ?: GastroCategory.SPIRITS
            val process = try {
                AlcoholProductionType.valueOf(entity.alcoholProcess)
            } catch (e: Exception) {
                AlcoholProductionType.NONE
            }
            GastroItem(
                id = entity.id,
                category = cat,
                nameEn = entity.nameEn,
                nameDe = entity.nameDe.ifBlank { entity.nameEn },
                subtitleEn = entity.subtitleEn,
                subtitleDe = entity.subtitleDe.ifBlank { entity.subtitleEn },
                imageUrl = entity.imageUrl.ifBlank {
                    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=80"
                },
                origin = entity.origin,
                isImport = entity.isImport,
                alcoholProcess = process,
                rawMaterialEn = entity.rawMaterialEn,
                rawMaterialDe = entity.rawMaterialDe.ifBlank { entity.rawMaterialEn },
                abv = entity.abv,
                tasteProfileEn = entity.tasteProfileEn,
                tasteProfileDe = entity.tasteProfileDe.ifBlank { entity.tasteProfileEn },
                scienceExplainedEn = entity.scienceExplainedEn,
                scienceExplainedDe = entity.scienceExplainedDe.ifBlank { entity.scienceExplainedEn },
                culinaryServingEn = entity.culinaryServingEn,
                culinaryServingDe = entity.culinaryServingDe.ifBlank { entity.culinaryServingEn },
                guestFaqEn = entity.guestFaqEn,
                guestFaqDe = entity.guestFaqDe.ifBlank { entity.guestFaqEn },
                allergens = entity.allergens.split(",").map { it.trim() }.filter { it.isNotBlank() },
                tags = entity.tags.split(",").map { it.trim() }.filter { it.isNotBlank() },
                isFavorite = entity.isFavorite,
                inStock = entity.inStock,
                stockQuantity = entity.stockQuantity,
                storageLocation = entity.storageLocation,
                minThreshold = entity.minThreshold,
                supplier = entity.supplier,
                costPrice = entity.costPrice,
                userNotes = entity.userNotes,
                isCustom = true
            )
        }

        mergedCurated + customItems
    }

    suspend fun toggleFavorite(item: GastroItem) {
        val existing = gastroDao.getEntityById(item.id)
        if (existing != null) {
            gastroDao.updateFavorite(item.id, !existing.isFavorite)
        } else {
            val entity = itemToEntity(item.copy(isFavorite = !item.isFavorite))
            gastroDao.upsertEntity(entity)
        }
    }

    suspend fun toggleInStock(item: GastroItem) {
        val existing = gastroDao.getEntityById(item.id)
        if (existing != null) {
            gastroDao.updateInStock(item.id, !existing.inStock)
        } else {
            val entity = itemToEntity(item.copy(inStock = !item.inStock))
            gastroDao.upsertEntity(entity)
        }
    }

    suspend fun updateStockQuantity(item: GastroItem, quantity: Int) {
        val existing = gastroDao.getEntityById(item.id)
        val inStock = quantity > 0
        if (existing != null) {
            gastroDao.updateStockQuantity(item.id, quantity, inStock)
        } else {
            val entity = itemToEntity(item.copy(stockQuantity = quantity, inStock = inStock))
            gastroDao.upsertEntity(entity)
        }
    }

    suspend fun saveNotes(itemId: String, notes: String, fallbackItem: GastroItem) {
        val existing = gastroDao.getEntityById(itemId)
        if (existing != null) {
            gastroDao.updateUserNotes(itemId, notes)
        } else {
            val entity = itemToEntity(fallbackItem.copy(userNotes = notes))
            gastroDao.upsertEntity(entity)
        }
    }

    suspend fun updateItem(item: GastroItem) {
        val entity = itemToEntity(item)
        gastroDao.upsertEntity(entity)
    }

    suspend fun addCustomItem(item: GastroItem) {
        val entity = itemToEntity(item.copy(isCustom = true))
        gastroDao.upsertEntity(entity)
    }

    suspend fun deleteCustomItem(id: String) {
        gastroDao.deleteEntityById(id)
    }

    suspend fun getCustomItems(): List<GastroItem> {
        val entities = gastroDao.getCustomUserEntitiesList()
        return entities.map { entity ->
            val cat = GastroCategory.entries.find { it.id == entity.categoryId } ?: GastroCategory.SPIRITS
            val process = try {
                AlcoholProductionType.valueOf(entity.alcoholProcess)
            } catch (e: Exception) {
                AlcoholProductionType.NONE
            }
            GastroItem(
                id = entity.id,
                category = cat,
                nameEn = entity.nameEn,
                nameDe = entity.nameDe.ifBlank { entity.nameEn },
                subtitleEn = entity.subtitleEn,
                subtitleDe = entity.subtitleDe.ifBlank { entity.subtitleEn },
                imageUrl = entity.imageUrl.ifBlank {
                    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=80"
                },
                origin = entity.origin,
                isImport = entity.isImport,
                alcoholProcess = process,
                rawMaterialEn = entity.rawMaterialEn,
                rawMaterialDe = entity.rawMaterialDe.ifBlank { entity.rawMaterialEn },
                abv = entity.abv,
                tasteProfileEn = entity.tasteProfileEn,
                tasteProfileDe = entity.tasteProfileDe.ifBlank { entity.tasteProfileEn },
                scienceExplainedEn = entity.scienceExplainedEn,
                scienceExplainedDe = entity.scienceExplainedDe.ifBlank { entity.scienceExplainedEn },
                culinaryServingEn = entity.culinaryServingEn,
                culinaryServingDe = entity.culinaryServingDe.ifBlank { entity.culinaryServingEn },
                guestFaqEn = entity.guestFaqEn,
                guestFaqDe = entity.guestFaqDe.ifBlank { entity.guestFaqEn },
                allergens = entity.allergens.split(",").map { it.trim() }.filter { it.isNotBlank() },
                tags = entity.tags.split(",").map { it.trim() }.filter { it.isNotBlank() },
                isFavorite = entity.isFavorite,
                inStock = entity.inStock,
                stockQuantity = entity.stockQuantity,
                storageLocation = entity.storageLocation,
                minThreshold = entity.minThreshold,
                supplier = entity.supplier,
                costPrice = entity.costPrice,
                userNotes = entity.userNotes,
                isCustom = true
            )
        }
    }

    suspend fun importCustomItems(items: List<GastroItem>) {
        val entities = items.map { itemToEntity(it.copy(isCustom = true)) }
        gastroDao.upsertEntities(entities)
    }

    private fun itemToEntity(item: GastroItem): GastroUserItemEntity {
        return GastroUserItemEntity(
            id = item.id,
            categoryId = item.category.id,
            nameEn = item.nameEn,
            nameDe = item.nameDe,
            subtitleEn = item.subtitleEn,
            subtitleDe = item.subtitleDe,
            imageUrl = item.imageUrl,
            origin = item.origin,
            isImport = item.isImport,
            alcoholProcess = item.alcoholProcess.name,
            rawMaterialEn = item.rawMaterialEn,
            rawMaterialDe = item.rawMaterialDe,
            abv = item.abv,
            tasteProfileEn = item.tasteProfileEn,
            tasteProfileDe = item.tasteProfileDe,
            scienceExplainedEn = item.scienceExplainedEn,
            scienceExplainedDe = item.scienceExplainedDe,
            culinaryServingEn = item.culinaryServingEn,
            culinaryServingDe = item.culinaryServingDe,
            guestFaqEn = item.guestFaqEn,
            guestFaqDe = item.guestFaqDe,
            allergens = item.allergens.joinToString(", "),
            tags = item.tags.joinToString(", "),
            isFavorite = item.isFavorite,
            inStock = item.inStock,
            stockQuantity = item.stockQuantity,
            storageLocation = item.storageLocation,
            minThreshold = item.minThreshold,
            supplier = item.supplier,
            costPrice = item.costPrice,
            userNotes = item.userNotes,
            isCustom = item.isCustom
        )
    }
}
