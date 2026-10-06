package com.example.ui.screens

import android.widget.Toast
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material.icons.filled.EditNote
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Public
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.AssistChip
import androidx.compose.material3.AssistChipDefaults
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.model.GastroCategory
import com.example.model.GastroItem
import com.example.model.Language
import com.example.ui.GastroViewModel
import com.example.ui.components.CategoryFilterRow
import com.example.ui.components.GastroAdBanner
import com.example.ui.components.GastroItemCard

@Composable
fun CatalogScreen(
    viewModel: GastroViewModel,
    onOpenAddDialog: () -> Unit,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    val language by viewModel.language.collectAsStateWithLifecycle()
    val selectedCategory by viewModel.selectedCategory.collectAsStateWithLifecycle()
    val searchQuery by viewModel.searchQuery.collectAsStateWithLifecycle()
    val onlyFavorites by viewModel.filterOnlyFavorites.collectAsStateWithLifecycle()
    val onlyCustom by viewModel.filterOnlyCustom.collectAsStateWithLifecycle()
    val importType by viewModel.filterImportType.collectAsStateWithLifecycle()
    val items by viewModel.filteredItems.collectAsStateWithLifecycle()
    val isPro by viewModel.isProUser.collectAsStateWithLifecycle()
    val customCount by viewModel.customItemsCount.collectAsStateWithLifecycle()

    Box(modifier = modifier.fillMaxSize()) {
        Column(modifier = Modifier.fillMaxSize()) {
            // Compact Search Input
            OutlinedTextField(
                value = searchQuery,
                onValueChange = { viewModel.setSearchQuery(it) },
                placeholder = {
                    Text(
                        text = if (language == Language.DE)
                            "Einträge durchsuchen (z.B. Sencha, Bourbon, Gruyère)..."
                        else
                            "Search entries (e.g. Sencha, Bourbon, Gruyère)...",
                        style = MaterialTheme.typography.bodySmall
                    )
                },
                leadingIcon = {
                    Icon(
                        imageVector = Icons.Default.Search,
                        contentDescription = "Search",
                        tint = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.size(18.dp)
                    )
                },
                trailingIcon = {
                    if (searchQuery.isNotEmpty()) {
                        IconButton(
                            onClick = { viewModel.setSearchQuery("") },
                            modifier = Modifier.size(32.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Default.Clear,
                                contentDescription = "Clear",
                                tint = MaterialTheme.colorScheme.onSurfaceVariant,
                                modifier = Modifier.size(16.dp)
                            )
                        }
                    }
                },
                singleLine = true,
                textStyle = MaterialTheme.typography.bodySmall,
                shape = RoundedCornerShape(10.dp),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 4.dp)
                    .height(48.dp)
                    .testTag("catalog_search_bar")
            )

            // Category Chips Row
            CategoryFilterRow(
                categories = GastroCategory.entries,
                selectedCategory = selectedCategory,
                language = language,
                onSelectCategory = { viewModel.selectCategory(it) },
                modifier = Modifier.padding(horizontal = 16.dp, vertical = 2.dp)
            )

            // Quick Toggle Filters (Favorites, Custom Cards, Origin)
            Row(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 4.dp)
            ) {
                // Favorite filter chip
                AssistChip(
                    onClick = { viewModel.toggleOnlyFavorites() },
                    label = {
                        Text(
                            text = if (language == Language.DE) "Favoriten" else "Favorites",
                            style = MaterialTheme.typography.labelSmall
                        )
                    },
                    leadingIcon = {
                        if (onlyFavorites) {
                            Icon(
                                imageVector = Icons.Default.Favorite,
                                contentDescription = null,
                                tint = Color(0xFFE53935),
                                modifier = Modifier.size(14.dp)
                            )
                        }
                    },
                    colors = AssistChipDefaults.assistChipColors(
                        containerColor = if (onlyFavorites) Color(0xFFE53935).copy(alpha = 0.15f) else MaterialTheme.colorScheme.surface
                    ),
                    border = AssistChipDefaults.assistChipBorder(
                        enabled = true,
                        borderColor = if (onlyFavorites) Color(0xFFE53935) else MaterialTheme.colorScheme.outline.copy(alpha = 0.4f)
                    ),
                    modifier = Modifier.testTag("filter_favorites_chip")
                )

                // Custom User Items filter chip
                AssistChip(
                    onClick = { viewModel.toggleFilterOnlyCustom() },
                    label = {
                        Text(
                            text = if (language == Language.DE) "Eigene Karten ($customCount)" else "My Cards ($customCount)",
                            style = MaterialTheme.typography.labelSmall
                        )
                    },
                    leadingIcon = {
                        Icon(
                            imageVector = Icons.Default.EditNote,
                            contentDescription = null,
                            tint = if (onlyCustom) Color(0xFFD48B38) else MaterialTheme.colorScheme.onSurfaceVariant,
                            modifier = Modifier.size(14.dp)
                        )
                    },
                    colors = AssistChipDefaults.assistChipColors(
                        containerColor = if (onlyCustom) Color(0xFFD48B38).copy(alpha = 0.2f) else MaterialTheme.colorScheme.surface
                    ),
                    border = AssistChipDefaults.assistChipBorder(
                        enabled = true,
                        borderColor = if (onlyCustom) Color(0xFFD48B38) else MaterialTheme.colorScheme.outline.copy(alpha = 0.4f)
                    ),
                    modifier = Modifier.testTag("filter_custom_chip")
                )

                // Import / Origin filter
                AssistChip(
                    onClick = {
                        val next = when (importType) {
                            null -> true
                            true -> false
                            false -> null
                        }
                        viewModel.setImportFilter(next)
                    },
                    label = {
                        Text(
                            text = when (importType) {
                                null -> if (language == Language.DE) "Herkunft: Alle" else "Origin: All"
                                true -> if (language == Language.DE) "Nur Import" else "Imports Only"
                                false -> if (language == Language.DE) "Nur Regional" else "Regional Only"
                            },
                            style = MaterialTheme.typography.labelSmall
                        )
                    },
                    leadingIcon = {
                        Icon(
                            imageVector = Icons.Default.Public,
                            contentDescription = null,
                            modifier = Modifier.size(14.dp)
                        )
                    },
                    colors = AssistChipDefaults.assistChipColors(
                        containerColor = if (importType != null) MaterialTheme.colorScheme.secondaryContainer else MaterialTheme.colorScheme.surface
                    ),
                    modifier = Modifier.testTag("filter_origin_chip")
                )
            }

            // Results count label
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 2.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = if (language == Language.DE)
                        "${items.size} Einträge im GastroDex"
                    else
                        "${items.size} GastroDex entries",
                    style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }

            // Optional non-intrusive Ad Banner (for Free tier)
            GastroAdBanner(
                isPro = isPro,
                language = language,
                onRemoveAds = {
                    viewModel.showProfileScreen.value = true
                }
            )

            // Items List
            if (items.isEmpty()) {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(32.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text(
                            text = if (language == Language.DE) "Keine Einträge gefunden" else "No matching items found",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.onSurface
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = if (language == Language.DE)
                                "Versuche die Filter zurückzusetzen oder einen anderen Suchbegriff."
                            else
                                "Try resetting active filters or changing your search query.",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            } else {
                LazyColumn(
                    contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = 8.dp, bottom = 96.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp),
                    modifier = Modifier
                        .fillMaxSize()
                        .testTag("items_list")
                ) {
                    items(items, key = { it.id }) { item ->
                        GastroItemCard(
                            item = item,
                            language = language,
                            onClick = { viewModel.selectItem(item) },
                            onToggleFavorite = { viewModel.toggleFavorite(item) }
                        )
                    }
                }
            }
        }

        // FAB to add Custom House item (with Freemium slot limit check)
        FloatingActionButton(
            onClick = {
                if (!isPro && customCount >= 3) {
                    Toast.makeText(
                        context,
                        if (language == Language.DE)
                            "Free-Limit erreicht (max. 3 eigene Karten). Für unbegrenzte Karten aktiviere Gastro PRO im Profil!"
                        else
                            "Free limit reached (max 3 custom cards). Activate PRO in profile for unlimited cards!",
                        Toast.LENGTH_LONG
                    ).show()
                    viewModel.showProfileScreen.value = true
                } else {
                    onOpenAddDialog()
                }
            },
            containerColor = MaterialTheme.colorScheme.primary,
            contentColor = MaterialTheme.colorScheme.onPrimary,
            modifier = Modifier
                .align(Alignment.BottomEnd)
                .padding(20.dp)
                .testTag("add_custom_item_fab")
        ) {
            Icon(
                imageVector = Icons.Default.Add,
                contentDescription = if (language == Language.DE) "Eigenen Eintrag anlegen" else "Add Custom Item"
            )
        }
    }
}
