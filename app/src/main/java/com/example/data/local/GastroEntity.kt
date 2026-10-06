package com.example.data.local

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "gastro_user_items")
data class GastroUserItemEntity(
    @PrimaryKey val id: String,
    val categoryId: String,
    val nameEn: String,
    val nameDe: String,
    val subtitleEn: String,
    val subtitleDe: String,
    val imageUrl: String,
    val origin: String,
    val isImport: Boolean,
    val alcoholProcess: String,
    val rawMaterialEn: String,
    val rawMaterialDe: String,
    val abv: String,
    val tasteProfileEn: String,
    val tasteProfileDe: String,
    val scienceExplainedEn: String,
    val scienceExplainedDe: String,
    val culinaryServingEn: String,
    val culinaryServingDe: String,
    val guestFaqEn: String,
    val guestFaqDe: String,
    val allergens: String, // comma-separated
    val tags: String, // comma-separated
    val isFavorite: Boolean = false,
    val inStock: Boolean = false,
    val stockQuantity: Int = 0,
    val storageLocation: String = "",
    val minThreshold: Int = 2,
    val supplier: String = "",
    val costPrice: String = "",
    val userNotes: String = "",
    val isCustom: Boolean = false,
    val updatedAt: Long = System.currentTimeMillis()
)
