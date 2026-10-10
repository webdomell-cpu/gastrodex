package com.example.ui.screens

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
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
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.Coffee
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material.icons.filled.Quiz
import androidx.compose.material.icons.filled.Science
import androidx.compose.material.icons.filled.WineBar
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.model.GastroCategory
import com.example.model.Language
import com.example.ui.GastroViewModel
import com.example.ui.NavTab
import com.example.ui.components.GastroAdBanner
import com.example.ui.components.getCategoryIcon

@Composable
fun HomeScreen(
    viewModel: GastroViewModel,
    onNavigateToTab: (NavTab) -> Unit,
    onSelectCategoryAndOpenCatalog: (GastroCategory) -> Unit,
    modifier: Modifier = Modifier
) {
    val language by viewModel.language.collectAsStateWithLifecycle()
    val isPro by viewModel.isProUser.collectAsStateWithLifecycle()
    val isDe = (language == Language.DE)
    val allItems by viewModel.items.collectAsStateWithLifecycle()
    val categories = GastroCategory.entries

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .testTag("home_screen"),
        contentPadding = PaddingValues(bottom = 24.dp)
    ) {
        // 1. Hero Welcome Card
        item {
            Surface(
                shape = RoundedCornerShape(20.dp),
                color = MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.45f),
                border = BorderStroke(1.dp, MaterialTheme.colorScheme.primary.copy(alpha = 0.3f)),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 10.dp)
            ) {
                Column(
                    modifier = Modifier.padding(18.dp)
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = if (isDe) "Willkommen bei GastroDex" else "Welcome to GastroDex",
                                style = MaterialTheme.typography.titleLarge,
                                fontWeight = FontWeight.ExtraBold,
                                color = MaterialTheme.colorScheme.onSurface
                            )
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(
                                text = if (isDe) 
                                    "Dein interaktiver Gastro-Wissenskompass für Bar, Service & Küche (${allItems.size} Fachartikel)."
                                else 
                                    "Your interactive hospitality & culinary knowledge compass (${allItems.size} articles).",
                                style = MaterialTheme.typography.bodyMedium,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                    }
                }
            }
        }

        // 2. Big High-Impact Feature Ad Banner on HomeScreen
        item {
            GastroAdBanner(
                isPro = isPro,
                language = language,
                onRemoveAds = { viewModel.showMonetizationDialog.value = true },
                modifier = Modifier.padding(bottom = 6.dp)
            )
        }

        // 3. Main Navigation Hub (Lexikon, Wine-Guide, Coffee Lab, Process Science, Staff Trainer)
        item {
            Column(modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)) {
                Text(
                    text = if (isDe) "Wissensbereiche & Schulung" else "Knowledge Hubs & Training",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurface,
                    modifier = Modifier.padding(bottom = 10.dp)
                )

                // 2x2 Grid or Cards
                HomeNavCard(
                    title = if (isDe) "Warenkunde & Fachlexikon" else "Encyclopedia & Catalog",
                    subtitle = if (isDe) "24 Kategorien: Spirituosen, Käse, Steaks, Brote & Non-Food" else "24 Categories: Spirits, Cheese, Steaks, Bread & Service",
                    icon = Icons.Default.MenuBook,
                    badgeText = "${allItems.size} Artikel",
                    color = MaterialTheme.colorScheme.primary,
                    onClick = { onNavigateToTab(NavTab.CATALOG) },
                    testTag = "home_hub_catalog"
                )

                Spacer(modifier = Modifier.height(10.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    HomeCompactNavCard(
                        title = if (isDe) "Wein-Guide" else "Wine Guide",
                        subtitle = if (isDe) "Champagner & Terroirs" else "Champagne & Terroirs",
                        icon = Icons.Default.WineBar,
                        color = Color(0xFFC2185B),
                        onClick = { onNavigateToTab(NavTab.WINE_GUIDE) },
                        modifier = Modifier.weight(1f),
                        testTag = "home_hub_wine"
                    )

                    HomeCompactNavCard(
                        title = if (isDe) "Kaffee-Labor" else "Coffee Lab",
                        subtitle = if (isDe) "Schichten & Barista" else "Layers & Barista",
                        icon = Icons.Default.Coffee,
                        color = Color(0xFF6D4C41),
                        onClick = { onNavigateToTab(NavTab.COFFEE_LAB) },
                        modifier = Modifier.weight(1f),
                        testTag = "home_hub_coffee"
                    )
                }

                Spacer(modifier = Modifier.height(10.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    HomeCompactNavCard(
                        title = if (isDe) "Wirkungslehre" else "Process Science",
                        subtitle = if (isDe) "HACCP & Garchemie" else "HACCP & Chemistry",
                        icon = Icons.Default.Science,
                        color = Color(0xFF00897B),
                        onClick = { onNavigateToTab(NavTab.SCIENCE) },
                        modifier = Modifier.weight(1f),
                        testTag = "home_hub_science"
                    )

                    HomeCompactNavCard(
                        title = if (isDe) "Schulungs-Quiz" else "Staff Trainer",
                        subtitle = if (isDe) "Multiple-Choice Test" else "Interactive Quizzes",
                        icon = Icons.Default.Quiz,
                        color = Color(0xFFE65100),
                        onClick = { onNavigateToTab(NavTab.QUIZ) },
                        modifier = Modifier.weight(1f),
                        testTag = "home_hub_quiz"
                    )
                }
            }
        }

        // 4. Direct Category Quick Launcher
        item {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 12.dp)
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text(
                        text = if (isDe) "Direkte Kategorie-Auswahl" else "Explore Categories Directly",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Text(
                        text = if (isDe) "Alle anzeigen" else "View all",
                        style = MaterialTheme.typography.labelMedium,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.primary,
                        modifier = Modifier
                            .clickable { onNavigateToTab(NavTab.CATALOG) }
                            .padding(4.dp)
                    )
                }

                Spacer(modifier = Modifier.height(10.dp))

                // Grid of Categories (excluding ALL)
                val directCategories = categories.filter { it != GastroCategory.ALL }
                
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    for (i in directCategories.indices step 2) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            val cat1 = directCategories[i]
                            CategoryLauncherCard(
                                category = cat1,
                                language = language,
                                onClick = { onSelectCategoryAndOpenCatalog(cat1) },
                                modifier = Modifier.weight(1f)
                            )
                            if (i + 1 < directCategories.size) {
                                val cat2 = directCategories[i + 1]
                                CategoryLauncherCard(
                                    category = cat2,
                                    language = language,
                                    onClick = { onSelectCategoryAndOpenCatalog(cat2) },
                                    modifier = Modifier.weight(1f)
                                )
                            } else {
                                Spacer(modifier = Modifier.weight(1f))
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun HomeNavCard(
    title: String,
    subtitle: String,
    icon: ImageVector,
    badgeText: String,
    color: Color,
    onClick: () -> Unit,
    testTag: String
) {
    Card(
        onClick = onClick,
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.25f)),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        modifier = Modifier
            .fillMaxWidth()
            .testTag(testTag)
    ) {
        Row(
            modifier = Modifier
                .padding(16.dp)
                .fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Surface(
                shape = CircleShape,
                color = color.copy(alpha = 0.15f),
                modifier = Modifier.size(50.dp)
            ) {
                Box(contentAlignment = Alignment.Center) {
                    Icon(
                        imageVector = icon,
                        contentDescription = null,
                        tint = color,
                        modifier = Modifier.size(26.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.width(14.dp))

            Column(modifier = Modifier.weight(1f)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        text = title,
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Surface(
                        shape = RoundedCornerShape(10.dp),
                        color = MaterialTheme.colorScheme.secondaryContainer.copy(alpha = 0.7f)
                    ) {
                        Text(
                            text = badgeText,
                            style = MaterialTheme.typography.labelSmall,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.onSecondaryContainer,
                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                        )
                    }
                }
                Spacer(modifier = Modifier.height(2.dp))
                Text(
                    text = subtitle,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    lineHeight = 16.sp
                )
            }

            Icon(
                imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.outline,
                modifier = Modifier.size(20.dp)
            )
        }
    }
}

@Composable
fun HomeCompactNavCard(
    title: String,
    subtitle: String,
    icon: ImageVector,
    color: Color,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    testTag: String
) {
    Card(
        onClick = onClick,
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.25f)),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        modifier = modifier.testTag(testTag)
    ) {
        Column(
            modifier = Modifier.padding(14.dp)
        ) {
            Surface(
                shape = CircleShape,
                color = color.copy(alpha = 0.15f),
                modifier = Modifier.size(40.dp)
            ) {
                Box(contentAlignment = Alignment.Center) {
                    Icon(
                        imageVector = icon,
                        contentDescription = null,
                        tint = color,
                        modifier = Modifier.size(22.dp)
                    )
                }
            }
            Spacer(modifier = Modifier.height(10.dp))
            Text(
                text = title,
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onSurface
            )
            Spacer(modifier = Modifier.height(2.dp))
            Text(
                text = subtitle,
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                maxLines = 1
            )
        }
    }
}

@Composable
fun CategoryLauncherCard(
    category: GastroCategory,
    language: Language,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Surface(
        onClick = onClick,
        shape = RoundedCornerShape(12.dp),
        color = MaterialTheme.colorScheme.surface,
        border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.2f)),
        modifier = modifier.height(48.dp)
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.padding(horizontal = 10.dp)
        ) {
            Icon(
                imageVector = getCategoryIcon(category),
                contentDescription = null,
                tint = MaterialTheme.colorScheme.primary,
                modifier = Modifier.size(18.dp)
            )
            Spacer(modifier = Modifier.width(8.dp))
            Text(
                text = if (language == Language.DE) category.titleDe else category.titleEn,
                style = MaterialTheme.typography.labelMedium,
                fontWeight = FontWeight.SemiBold,
                color = MaterialTheme.colorScheme.onSurface,
                maxLines = 1
            )
        }
    }
}
