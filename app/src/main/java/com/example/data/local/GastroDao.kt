package com.example.data.local

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import kotlinx.coroutines.flow.Flow

@Dao
interface GastroDao {
    @Query("SELECT * FROM gastro_user_items ORDER BY updatedAt DESC")
    fun getAllUserEntities(): Flow<List<GastroUserItemEntity>>

    @Query("SELECT * FROM gastro_user_items WHERE id = :id LIMIT 1")
    suspend fun getEntityById(id: String): GastroUserItemEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun upsertEntity(entity: GastroUserItemEntity)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun upsertEntities(entities: List<GastroUserItemEntity>)

    @Query("SELECT * FROM gastro_user_items WHERE isCustom = 1")
    suspend fun getCustomUserEntitiesList(): List<GastroUserItemEntity>

    @Query("DELETE FROM gastro_user_items WHERE id = :id")
    suspend fun deleteEntityById(id: String)

    @Query("UPDATE gastro_user_items SET isFavorite = :isFavorite, updatedAt = :timestamp WHERE id = :id")
    suspend fun updateFavorite(id: String, isFavorite: Boolean, timestamp: Long = System.currentTimeMillis())

    @Query("UPDATE gastro_user_items SET inStock = :inStock, updatedAt = :timestamp WHERE id = :id")
    suspend fun updateInStock(id: String, inStock: Boolean, timestamp: Long = System.currentTimeMillis())

    @Query("UPDATE gastro_user_items SET stockQuantity = :quantity, inStock = :inStock, updatedAt = :timestamp WHERE id = :id")
    suspend fun updateStockQuantity(id: String, quantity: Int, inStock: Boolean = quantity > 0, timestamp: Long = System.currentTimeMillis())

    @Query("UPDATE gastro_user_items SET userNotes = :notes, updatedAt = :timestamp WHERE id = :id")
    suspend fun updateUserNotes(id: String, notes: String, timestamp: Long = System.currentTimeMillis())
}
