package com.example.data.local

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase

@Database(entities = [GastroUserItemEntity::class], version = 1, exportSchema = false)
abstract class GastroDatabase : RoomDatabase() {
    abstract fun gastroDao(): GastroDao

    companion object {
        @Volatile
        private var INSTANCE: GastroDatabase? = null

        fun getDatabase(context: Context): GastroDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    GastroDatabase::class.java,
                    "gastro_codex.db"
                ).build()
                INSTANCE = instance
                instance
            }
        }
    }
}
