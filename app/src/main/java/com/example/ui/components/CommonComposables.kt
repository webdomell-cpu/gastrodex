package com.example.ui.components

import androidx.compose.animation.animateColorAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.BakeryDining
import androidx.compose.material.icons.filled.BreakfastDining
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Coffee
import androidx.compose.material.icons.filled.DinnerDining
import androidx.compose.material.icons.filled.Eco
import androidx.compose.material.icons.filled.Egg
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.EmojiFoodBeverage
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.FavoriteBorder
import androidx.compose.material.icons.filled.Grain
import androidx.compose.material.icons.filled.Inventory2
import androidx.compose.material.icons.filled.Language
import androidx.compose.material.icons.filled.Liquor
import androidx.compose.material.icons.filled.LocalBar
import androidx.compose.material.icons.filled.Opacity
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Public
import androidx.compose.material.icons.filled.Restaurant
import androidx.compose.material.icons.filled.SetMeal
import androidx.compose.material.icons.filled.SoupKitchen
import androidx.compose.material.icons.filled.Spa
import androidx.compose.material.icons.filled.WineBar
import androidx.compose.material.icons.filled.Yard
import androidx.compose.material3.Badge
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import coil.compose.SubcomposeAsyncImage
import com.example.model.AlcoholProductionType
import com.example.model.CoffeeLayers
import com.example.model.GastroCategory
import com.example.model.GastroItem
import com.example.model.Language

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GastroTopAppBar(
    currentLanguage: Language,
    onToggleLanguage: () -> Unit,
    onOpenProfile: () -> Unit,
    modifier: Modifier = Modifier
) {
    TopAppBar(
        title = {
            Row(verticalAlignment = Alignment.CenterVertically) {
                androidx.compose.foundation.Image(
                    painter = androidx.compose.ui.res.painterResource(com.example.R.drawable.ic_gastrodex_logo),
                    contentDescription = "GastroDex Logo",
                    modifier = Modifier.size(36.dp)
                )
                Spacer(modifier = Modifier.width(10.dp))
                Column {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            text = "GastroDex",
                            style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.primary
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Surface(
                            shape = RoundedCornerShape(4.dp),
                            color = MaterialTheme.colorScheme.secondary.copy(alpha = 0.15f),
                            modifier = Modifier.padding(top = 2.dp)
                        ) {
                            Text(
                                text = "EDU",
                                style = MaterialTheme.typography.labelSmall,
                                fontWeight = FontWeight.Bold,
                                color = MaterialTheme.colorScheme.secondary,
                                modifier = Modifier.padding(horizontal = 5.dp, vertical = 1.dp)
                            )
                        }
                    }
                    Text(
                        text = if (currentLanguage == Language.DE)
                            "Das Gastronomie Quiz & Lexikon"
                        else
                            "The Gastronomy Quiz & Encyclopedia",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis
                    )
                }
            }
        },
        actions = {
            // Google Profile & Cloud Sync button
            IconButton(
                onClick = onOpenProfile,
                modifier = Modifier.testTag("top_bar_profile_btn")
            ) {
                Icon(
                    imageVector = Icons.Default.Person,
                    contentDescription = if (currentLanguage == Language.DE) "Mein Profil & Google Cloud" else "Profile & Google Cloud",
                    tint = MaterialTheme.colorScheme.primary
                )
            }

            // Language selector button
            Surface(
                onClick = onToggleLanguage,
                shape = RoundedCornerShape(20.dp),
                color = MaterialTheme.colorScheme.surfaceVariant,
                border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.4f)),
                modifier = Modifier
                    .padding(end = 12.dp)
                    .testTag("language_toggle_button")
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
                ) {
                    Text(text = currentLanguage.flag, fontSize = 16.sp)
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        text = currentLanguage.code.uppercase(),
                        style = MaterialTheme.typography.labelMedium,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        },
        colors = TopAppBarDefaults.topAppBarColors(
            containerColor = MaterialTheme.colorScheme.background
        ),
        modifier = modifier
    )
}

@Composable
fun CategoryFilterRow(
    categories: List<GastroCategory>,
    selectedCategory: GastroCategory,
    language: Language,
    onSelectCategory: (GastroCategory) -> Unit,
    modifier: Modifier = Modifier
) {
    LazyRow(
        horizontalArrangement = Arrangement.spacedBy(10.dp),
        contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 4.dp, vertical = 6.dp),
        modifier = modifier.fillMaxWidth()
    ) {
        items(categories) { category ->
            val isSelected = category == selectedCategory
            val icon = getCategoryIcon(category)
            val title = if (language == Language.DE) category.titleDe else category.titleEn

            FilterChip(
                selected = isSelected,
                onClick = { onSelectCategory(category) },
                label = {
                    Text(
                        text = title,
                        style = MaterialTheme.typography.titleSmall,
                        fontWeight = if (isSelected) FontWeight.ExtraBold else FontWeight.SemiBold,
                        modifier = Modifier.padding(vertical = 4.dp)
                    )
                },
                leadingIcon = {
                    Icon(
                        imageVector = icon,
                        contentDescription = title,
                        modifier = Modifier.size(20.dp)
                    )
                },
                colors = FilterChipDefaults.filterChipColors(
                    selectedContainerColor = MaterialTheme.colorScheme.primaryContainer,
                    selectedLabelColor = MaterialTheme.colorScheme.onPrimaryContainer,
                    selectedLeadingIconColor = MaterialTheme.colorScheme.primary,
                    containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.6f)
                ),
                shape = RoundedCornerShape(14.dp),
                border = FilterChipDefaults.filterChipBorder(
                    enabled = true,
                    selected = isSelected,
                    borderColor = MaterialTheme.colorScheme.outline.copy(alpha = 0.35f),
                    selectedBorderColor = MaterialTheme.colorScheme.primary,
                    borderWidth = if (isSelected) 2.dp else 1.dp
                ),
                modifier = Modifier
                    .height(44.dp)
                    .testTag("filter_chip_${category.id}")
            )
        }
    }
}

@Composable
fun GastroThemedPlaceholder(
    item: GastroItem,
    language: Language,
    modifier: Modifier = Modifier,
    isLargeHero: Boolean = false
) {
    Box(
        modifier = modifier
            .background(
                Brush.linearGradient(
                    colors = listOf(
                        MaterialTheme.colorScheme.surfaceVariant,
                        MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.55f),
                        MaterialTheme.colorScheme.surfaceVariant
                    )
                )
            ),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
            modifier = Modifier.padding(12.dp)
        ) {
            Surface(
                shape = CircleShape,
                color = MaterialTheme.colorScheme.surface,
                shadowElevation = 2.dp,
                border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.35f)),
                modifier = Modifier.size(if (isLargeHero) 68.dp else 44.dp)
            ) {
                Box(contentAlignment = Alignment.Center) {
                    Icon(
                        imageVector = getCategoryIcon(item.category),
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.primary,
                        modifier = Modifier.size(if (isLargeHero) 34.dp else 22.dp)
                    )
                }
            }
            Spacer(modifier = Modifier.height(6.dp))
            Text(
                text = item.localizedName(language),
                style = if (isLargeHero) MaterialTheme.typography.titleMedium else MaterialTheme.typography.labelMedium,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onSurface,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )
            Text(
                text = "GastroDex • " + (if (language == Language.DE) item.category.titleDe else item.category.titleEn),
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.primary,
                fontSize = if (isLargeHero) 11.sp else 9.sp,
                fontWeight = FontWeight.SemiBold
            )
        }
    }
}

@Composable
fun GastroItemCard(
    item: GastroItem,
    language: Language,
    onClick: () -> Unit,
    onToggleFavorite: () -> Unit,
    modifier: Modifier = Modifier
) {
    Card(
        onClick = onClick,
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface
        ),
        border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.5f)),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
        modifier = modifier
            .fillMaxWidth()
            .testTag("item_card_${item.id}")
    ) {
        Column {
            // Image with Category Overlay & Badges
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(140.dp)
            ) {
                if (item.imageUrl.isNotBlank()) {
                    SubcomposeAsyncImage(
                        model = item.imageUrl,
                        contentDescription = item.localizedName(language),
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.matchParentSize(),
                        loading = {
                            GastroThemedPlaceholder(
                                item = item,
                                language = language,
                                modifier = Modifier.matchParentSize(),
                                isLargeHero = false
                            )
                        },
                        error = {
                            GastroThemedPlaceholder(
                                item = item,
                                language = language,
                                modifier = Modifier.matchParentSize(),
                                isLargeHero = false
                            )
                        }
                    )

                    // Dark gradient scrim for badge legibility
                    Box(
                        modifier = Modifier
                            .matchParentSize()
                            .background(
                                Brush.verticalGradient(
                                    colors = listOf(Color.Black.copy(alpha = 0.5f), Color.Transparent, Color.Black.copy(alpha = 0.75f))
                                )
                            )
                    )
                } else {
                    GastroThemedPlaceholder(
                        item = item,
                        language = language,
                        modifier = Modifier.matchParentSize(),
                        isLargeHero = false
                    )
                }

                // Top badges: Category & Origin
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(8.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Surface(
                        shape = RoundedCornerShape(8.dp),
                        color = MaterialTheme.colorScheme.surface.copy(alpha = 0.85f)
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 3.dp)
                        ) {
                            Icon(
                                imageVector = getCategoryIcon(item.category),
                                contentDescription = null,
                                tint = MaterialTheme.colorScheme.primary,
                                modifier = Modifier.size(12.dp)
                            )
                            Spacer(modifier = Modifier.width(4.dp))
                            Text(
                                text = if (language == Language.DE) item.category.titleDe else item.category.titleEn,
                                style = MaterialTheme.typography.labelSmall,
                                fontWeight = FontWeight.Bold,
                                color = MaterialTheme.colorScheme.onSurface
                            )
                        }
                    }

                    // Favorite button
                    IconButton(
                        onClick = onToggleFavorite,
                        modifier = Modifier
                            .size(32.dp)
                            .background(Color.Black.copy(alpha = 0.45f), CircleShape)
                            .testTag("fav_btn_${item.id}")
                    ) {
                        Icon(
                            imageVector = if (item.isFavorite) Icons.Default.Favorite else Icons.Default.FavoriteBorder,
                            contentDescription = "Favorite",
                            tint = if (item.isFavorite) Color(0xFFE53935) else Color.White,
                            modifier = Modifier.size(18.dp)
                        )
                    }
                }

                // Bottom row over image: Origin & Custom indicator
                Row(
                    modifier = Modifier
                        .align(Alignment.BottomStart)
                        .fillMaxWidth()
                        .padding(horizontal = 8.dp, vertical = 6.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.Public,
                            contentDescription = null,
                            tint = Color.White.copy(alpha = 0.8f),
                            modifier = Modifier.size(12.dp)
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                        Text(
                            text = item.origin,
                            style = MaterialTheme.typography.labelSmall,
                            color = Color.White,
                            maxLines = 1,
                            overflow = TextOverflow.Ellipsis
                        )
                    }

                    // Import vs Local or Custom badge
                    if (item.isCustom) {
                        Surface(
                            shape = RoundedCornerShape(4.dp),
                            color = MaterialTheme.colorScheme.primary
                        ) {
                            Text(
                                text = if (language == Language.DE) "EIGENER EINTRAG" else "CUSTOM",
                                style = MaterialTheme.typography.labelSmall,
                                fontSize = 9.sp,
                                fontWeight = FontWeight.Bold,
                                color = MaterialTheme.colorScheme.onPrimary,
                                modifier = Modifier.padding(horizontal = 4.dp, vertical = 1.dp)
                            )
                        }
                    } else {
                        Surface(
                            shape = RoundedCornerShape(4.dp),
                            color = if (item.isImport) MaterialTheme.colorScheme.tertiary else MaterialTheme.colorScheme.secondary
                        ) {
                            Text(
                                text = if (item.isImport) (if (language == Language.DE) "IMPORT" else "IMPORTED")
                                else (if (language == Language.DE) "REGIONAL" else "NATIVE/REGIONAL"),
                                style = MaterialTheme.typography.labelSmall,
                                fontSize = 9.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color.White,
                                modifier = Modifier.padding(horizontal = 4.dp, vertical = 1.dp)
                            )
                        }
                    }
                }
            }

            // Text Info & Details
            Column(modifier = Modifier.padding(12.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = item.localizedName(language),
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onSurface,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis,
                        modifier = Modifier.weight(1f)
                    )

                    if (item.abv.isNotBlank() && item.abv != "0.0% ABV") {
                        Surface(
                            shape = RoundedCornerShape(6.dp),
                            color = MaterialTheme.colorScheme.primaryContainer,
                            modifier = Modifier.padding(start = 6.dp)
                        ) {
                            Text(
                                text = item.abv,
                                style = MaterialTheme.typography.labelSmall,
                                fontWeight = FontWeight.Bold,
                                color = MaterialTheme.colorScheme.onPrimaryContainer,
                                modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                            )
                        }
                    }
                }

                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = item.localizedSubtitle(language),
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis
                )

                // If coffee has layers, show mini visual layer bar
                if (item.coffeeLayers != null) {
                    Spacer(modifier = Modifier.height(8.dp))
                    CoffeeLayersMiniBar(layers = item.coffeeLayers)
                }

                Spacer(modifier = Modifier.height(10.dp))

                // Footer row with Process & Tag / Custom Indicator
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    // Process tag
                    if (item.alcoholProcess != AlcoholProductionType.NONE) {
                        Surface(
                            shape = RoundedCornerShape(6.dp),
                            color = MaterialTheme.colorScheme.surface,
                            border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.3f))
                        ) {
                            Text(
                                text = if (language == Language.DE) item.alcoholProcess.titleDe else item.alcoholProcess.titleEn,
                                style = MaterialTheme.typography.labelSmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                                modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                            )
                        }
                    } else {
                        Surface(
                            shape = RoundedCornerShape(6.dp),
                            color = MaterialTheme.colorScheme.surface,
                            border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.3f))
                        ) {
                            Text(
                                text = if (language == Language.DE) "Alkoholfrei" else "Non-Alcoholic",
                                style = MaterialTheme.typography.labelSmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                                modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                            )
                        }
                    }

                    // Right pill: note indicator or first tag
                    if (item.userNotes.isNotBlank()) {
                        Surface(
                            shape = RoundedCornerShape(12.dp),
                            color = MaterialTheme.colorScheme.secondaryContainer.copy(alpha = 0.6f)
                        ) {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                            ) {
                                Icon(
                                    imageVector = Icons.Default.Edit,
                                    contentDescription = null,
                                    tint = MaterialTheme.colorScheme.primary,
                                    modifier = Modifier.size(14.dp)
                                )
                                Spacer(modifier = Modifier.width(4.dp))
                                Text(
                                    text = if (language == Language.DE) "Notiz" else "Note",
                                    style = MaterialTheme.typography.labelSmall,
                                    color = MaterialTheme.colorScheme.onSecondaryContainer
                                )
                            }
                        }
                    } else if (item.tags.isNotEmpty()) {
                        Text(
                            text = "#${item.tags.first()}",
                            style = MaterialTheme.typography.labelSmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.7f)
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun GastroAdBanner(
    isPro: Boolean,
    language: Language,
    onRemoveAds: () -> Unit,
    modifier: Modifier = Modifier
) {
    if (isPro) return

    Surface(
        shape = RoundedCornerShape(10.dp),
        color = MaterialTheme.colorScheme.surfaceVariant,
        border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.25f)),
        modifier = modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 4.dp)
    ) {
        Row(
            modifier = Modifier
                .padding(horizontal = 10.dp, vertical = 6.dp)
                .fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.weight(1f)) {
                Surface(
                    shape = RoundedCornerShape(4.dp),
                    color = MaterialTheme.colorScheme.primary.copy(alpha = 0.2f),
                    modifier = Modifier.padding(end = 8.dp)
                ) {
                    Text(
                        text = "AD",
                        style = MaterialTheme.typography.labelSmall,
                        fontSize = 9.sp,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.primary,
                        modifier = Modifier.padding(horizontal = 4.dp, vertical = 1.dp)
                    )
                }
                Text(
                    text = if (language == Language.DE)
                        "Metro Gastro-Deals: 20% auf Barista-Siebträger"
                    else
                        "Metro Gastro Deals: 20% off espresso machines",
                    style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
            }

            Surface(
                onClick = onRemoveAds,
                shape = RoundedCornerShape(12.dp),
                color = MaterialTheme.colorScheme.primaryContainer
            ) {
                Text(
                    text = if (language == Language.DE) "Werbung aus" else "Ad-Free",
                    style = MaterialTheme.typography.labelSmall,
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onPrimaryContainer,
                    modifier = Modifier.padding(horizontal = 6.dp, vertical = 3.dp)
                )
            }
        }
    }
}

@Composable
fun CoffeeLayersMiniBar(layers: CoffeeLayers, modifier: Modifier = Modifier) {
    Column(modifier = modifier.fillMaxWidth()) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .height(8.dp)
                .clip(RoundedCornerShape(4.dp))
        ) {
            if (layers.milkFoamPercent > 0f) {
                Box(
                    modifier = Modifier
                        .weight(layers.milkFoamPercent)
                        .height(8.dp)
                        .background(Color(0xFFFFF6E6))
                )
            }
            if (layers.espressoPercent > 0f) {
                Box(
                    modifier = Modifier
                        .weight(layers.espressoPercent)
                        .height(8.dp)
                        .background(Color(0xFF4A2C11))
                )
            }
            if (layers.steamedMilkPercent > 0f) {
                Box(
                    modifier = Modifier
                        .weight(layers.steamedMilkPercent)
                        .height(8.dp)
                        .background(Color(0xFFEAD8C0))
                )
            }
            if (layers.waterPercent > 0f) {
                Box(
                    modifier = Modifier
                        .weight(layers.waterPercent)
                        .height(8.dp)
                        .background(Color(0xFF81D4FA))
                )
            }
        }
    }
}

fun getCategoryIcon(category: GastroCategory): ImageVector {
    return when (category) {
        GastroCategory.ALL -> Icons.Default.Restaurant
        GastroCategory.SPIRITS -> Icons.Default.Liquor
        GastroCategory.WINE -> Icons.Default.WineBar
        GastroCategory.TEA -> Icons.Default.EmojiFoodBeverage
        GastroCategory.COFFEE -> Icons.Default.Coffee
        GastroCategory.PASTA_RICE -> Icons.Default.DinnerDining
        GastroCategory.SAUCES_CONDIMENTS -> Icons.Default.SoupKitchen
        GastroCategory.SOFT_DRINKS -> Icons.Default.LocalBar
        GastroCategory.DAIRY -> Icons.Default.BreakfastDining
        GastroCategory.CHEESE -> Icons.Default.BakeryDining
        GastroCategory.EGGS -> Icons.Default.Egg
        GastroCategory.FRUITS -> Icons.Default.Spa
        GastroCategory.VEGETABLES -> Icons.Default.Yard
        GastroCategory.NUTS_SEEDS -> Icons.Default.Grain
        GastroCategory.SPICES_HERBS -> Icons.Default.Spa
        GastroCategory.FISH_SEAFOOD -> Icons.Default.SetMeal
        GastroCategory.OLIVES -> Icons.Default.Eco
        GastroCategory.OILS_VINEGARS -> Icons.Default.Opacity
        GastroCategory.CHARCUTERIE_DELI -> Icons.Default.DinnerDining
        GastroCategory.MEAT_CUTS -> Icons.Default.Restaurant
        GastroCategory.BREAD_BAKERY -> Icons.Default.BakeryDining
        GastroCategory.FINGERFOOD_SNACKS -> Icons.Default.BreakfastDining
    }
}
