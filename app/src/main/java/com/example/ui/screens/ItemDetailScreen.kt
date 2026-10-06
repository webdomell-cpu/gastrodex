package com.example.ui.screens

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Coffee
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.EditNote
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.FavoriteBorder
import androidx.compose.material.icons.filled.HelpOutline
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Inventory2
import androidx.compose.material.icons.filled.LocalDrink
import androidx.compose.material.icons.filled.Public
import androidx.compose.material.icons.filled.Restaurant
import androidx.compose.material.icons.filled.Science
import androidx.compose.material.icons.filled.Share
import androidx.compose.material.icons.filled.WarningAmber
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Divider
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import coil.compose.AsyncImage
import coil.compose.SubcomposeAsyncImage
import com.example.model.AlcoholProductionType
import com.example.model.CoffeeLayers
import com.example.model.GastroCategory
import com.example.model.GastroItem
import com.example.model.Language
import com.example.ui.GastroViewModel
import com.example.ui.components.GastroThemedPlaceholder
import com.example.ui.components.getCategoryIcon

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun ItemDetailScreen(
    item: GastroItem,
    viewModel: GastroViewModel,
    onBack: () -> Unit,
    modifier: Modifier = Modifier
) {
    BackHandler { onBack() }

    val language by viewModel.language.collectAsStateWithLifecycle()
    val context = androidx.compose.ui.platform.LocalContext.current
    val scrollState = rememberScrollState()

    var notesText by remember(item.id, item.userNotes) { mutableStateOf(item.userNotes) }
    var isEditingNotes by remember { mutableStateOf(false) }

    Column(
        modifier = modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .testTag("item_detail_screen")
    ) {
        // Hero Image Header
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(280.dp)
        ) {
            if (item.imageUrl.isNotBlank()) {
                SubcomposeAsyncImage(
                    model = item.imageUrl,
                    contentDescription = item.localizedName(language),
                    contentScale = ContentScale.Crop,
                    modifier = Modifier.fillMaxSize(),
                    loading = {
                        GastroThemedPlaceholder(
                            item = item,
                            language = language,
                            modifier = Modifier.fillMaxSize(),
                            isLargeHero = true
                        )
                    },
                    error = {
                        GastroThemedPlaceholder(
                            item = item,
                            language = language,
                            modifier = Modifier.fillMaxSize(),
                            isLargeHero = true
                        )
                    }
                )

                // Gradient scrim
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(
                            Brush.verticalGradient(
                                colors = listOf(
                                    Color.Black.copy(alpha = 0.7f),
                                    Color.Transparent,
                                    Color.Black.copy(alpha = 0.9f)
                                )
                            )
                        )
                )
            } else {
                GastroThemedPlaceholder(
                    item = item,
                    language = language,
                    modifier = Modifier.fillMaxSize(),
                    isLargeHero = true
                )
            }

            // Top action buttons (Back, Share, Favorite, Delete if custom)
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                IconButton(
                    onClick = onBack,
                    modifier = Modifier
                        .size(40.dp)
                        .background(Color.Black.copy(alpha = 0.5f), CircleShape)
                        .testTag("detail_back_button")
                ) {
                    Icon(
                        imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                        contentDescription = "Back",
                        tint = Color.White
                    )
                }

                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    // Share entry button
                    IconButton(
                        onClick = { viewModel.shareSingleItem(item, context) },
                        modifier = Modifier
                            .size(40.dp)
                            .background(Color.Black.copy(alpha = 0.5f), CircleShape)
                            .testTag("detail_share_button")
                    ) {
                        Icon(
                            imageVector = Icons.Default.Share,
                            contentDescription = "Share",
                            tint = Color.White
                        )
                    }

                    // Favorite button
                    IconButton(
                        onClick = { viewModel.toggleFavorite(item) },
                        modifier = Modifier
                            .size(40.dp)
                            .background(Color.Black.copy(alpha = 0.5f), CircleShape)
                            .testTag("detail_favorite_toggle")
                    ) {
                        Icon(
                            imageVector = if (item.isFavorite) Icons.Default.Favorite else Icons.Default.FavoriteBorder,
                            contentDescription = "Toggle Favorite",
                            tint = if (item.isFavorite) Color(0xFFE53935) else Color.White
                        )
                    }

                    // Custom item deletion
                    if (item.isCustom) {
                        IconButton(
                            onClick = {
                                viewModel.deleteCustomItem(item.id)
                                onBack()
                            },
                            modifier = Modifier
                                .size(40.dp)
                                .background(Color(0xFFB71C1C), CircleShape)
                                .testTag("detail_delete_custom")
                        ) {
                            Icon(
                                imageVector = Icons.Default.Delete,
                                contentDescription = "Delete Custom Item",
                                tint = Color.White
                            )
                        }
                    }
                }
            }

            // Title & Badges on bottom of Hero Image
            Column(
                modifier = Modifier
                    .align(Alignment.BottomStart)
                    .padding(16.dp)
            ) {
                // Category & Origin Row
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Surface(
                        shape = RoundedCornerShape(8.dp),
                        color = MaterialTheme.colorScheme.primary
                    ) {
                        Text(
                            text = if (language == Language.DE) item.category.titleDe else item.category.titleEn,
                            style = MaterialTheme.typography.labelSmall,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.onPrimary,
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                        )
                    }

                    Surface(
                        shape = RoundedCornerShape(8.dp),
                        color = if (item.isImport) Color(0xFFD4922A) else Color(0xFF4F772D)
                    ) {
                        Text(
                            text = if (item.isImport)
                                (if (language == Language.DE) "🌍 IMPORTPRODUKT" else "🌍 IMPORTED")
                            else
                                (if (language == Language.DE) "🌱 REGIONAL / HEIMISCH" else "🌱 REGIONAL / NATIVE"),
                            style = MaterialTheme.typography.labelSmall,
                            fontWeight = FontWeight.Bold,
                            color = Color.White,
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                        )
                    }
                }

                Spacer(modifier = Modifier.height(6.dp))

                Text(
                    text = item.localizedName(language),
                    style = MaterialTheme.typography.headlineMedium,
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )

                Text(
                    text = item.localizedSubtitle(language),
                    style = MaterialTheme.typography.bodyMedium,
                    color = Color.White.copy(alpha = 0.9f)
                )
            }
        }

        // Main Body Content
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Quick Info Attributes Grid (Dynamic: spirits/wine show ABV & Process; food/tea/coffee/produce show relevant culinary attributes)
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    val isBeverageWithAlcohol = item.category == GastroCategory.SPIRITS || item.category == GastroCategory.WINE || item.abv.contains("%")
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceEvenly
                    ) {
                        if (isBeverageWithAlcohol) {
                            InfoAttributeItem(
                                label = if (language == Language.DE) "Alkoholgehalt" else "Alcohol by Vol",
                                value = item.abv,
                                icon = Icons.Default.LocalDrink
                            )
                            InfoAttributeItem(
                                label = if (language == Language.DE) "Verfahren" else "Process Type",
                                value = if (language == Language.DE) item.alcoholProcess.titleDe else item.alcoholProcess.titleEn,
                                icon = Icons.Default.Science
                            )
                        } else {
                            // Non-alcoholic / Culinary Food category
                            InfoAttributeItem(
                                label = if (language == Language.DE) "Charakter" else "Character",
                                value = if (item.isImport) (if (language == Language.DE) "International" else "Import") else (if (language == Language.DE) "Klassiker" else "Classic"),
                                icon = Icons.Default.Info
                            )
                            InfoAttributeItem(
                                label = if (language == Language.DE) "Kategorie" else "Category",
                                value = if (language == Language.DE) item.category.titleDe else item.category.titleEn,
                                icon = Icons.Default.Restaurant
                            )
                        }
                        InfoAttributeItem(
                            label = if (language == Language.DE) "Herkunft" else "Origin",
                            value = item.origin,
                            icon = Icons.Default.Public
                        )
                    }
                }
            }

            // Interactive Coffee Layers Visualizer (if coffee item)
            if (item.coffeeLayers != null) {
                CoffeeDrinkLayerCard(layers = item.coffeeLayers, language = language)
            }

            // GUEST FAQ CARD (Customer questions & how staff explains - High Contrast & Warm Card)
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.surface
                ),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                border = androidx.compose.foundation.BorderStroke(1.5.dp, MaterialTheme.colorScheme.primary.copy(alpha = 0.6f))
            ) {
                Column(modifier = Modifier.padding(18.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Surface(
                            shape = CircleShape,
                            color = MaterialTheme.colorScheme.primaryContainer,
                            modifier = Modifier.size(36.dp)
                        ) {
                            Box(contentAlignment = Alignment.Center) {
                                Icon(
                                    imageVector = Icons.Default.HelpOutline,
                                    contentDescription = null,
                                    tint = MaterialTheme.colorScheme.primary,
                                    modifier = Modifier.size(20.dp)
                                )
                            }
                        }
                        Spacer(modifier = Modifier.width(12.dp))
                        Text(
                            text = if (language == Language.DE)
                                "Gastfragen souverän beantworten"
                            else
                                "How to Explain to a Guest",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.onSurface
                        )
                    }

                    Spacer(modifier = Modifier.height(12.dp))
                    Text(
                        text = item.localizedFaq(language),
                        style = MaterialTheme.typography.bodyMedium,
                        lineHeight = 23.sp,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                }
            }

            // SCIENTIFIC & PRODUCTION BREAKDOWN (Sugar conversion, Distillation vs Brewing, CO2 dissolution, etc.)
            DetailSectionCard(
                title = if (language == Language.DE) "Wissenschaft & Herstellung" else "Science & Production Breakdown",
                icon = Icons.Default.Science,
                content = item.localizedScience(language)
            )

            // RAW MATERIAL & BOTANICALS
            DetailSectionCard(
                title = if (language == Language.DE) "Rohstoffe & Botanicals" else "Raw Materials & Ingredients",
                icon = Icons.Default.AutoAwesome,
                content = item.localizedRawMaterial(language)
            )

            // SENSORY & TASTE PROFILE
            DetailSectionCard(
                title = if (language == Language.DE) "Sensorik & Geschmacksprofil" else "Aroma & Tasting Notes",
                icon = Icons.Default.Restaurant,
                content = item.localizedTaste(language)
            )

            // CULINARY USE & SERVING SUGGESTIONS
            DetailSectionCard(
                title = if (language == Language.DE) "Servierempfehlung & Gastronomie-Einsatz" else "Service & Culinary Applications",
                icon = Icons.Default.LocalDrink,
                content = item.localizedCulinary(language)
            )

            // ALLERGENS ALERT (High contrast, clearly legible light container with clear red border)
            if (item.allergens.isNotEmpty() && !item.allergens.contains("None")) {
                Card(
                    shape = RoundedCornerShape(14.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                    elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                    border = androidx.compose.foundation.BorderStroke(1.5.dp, Color(0xFFC0392B))
                ) {
                    Row(
                        modifier = Modifier.padding(16.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Surface(
                            shape = CircleShape,
                            color = Color(0xFFFFEBEE),
                            modifier = Modifier.size(38.dp)
                        ) {
                            Box(contentAlignment = Alignment.Center) {
                                Icon(
                                    imageVector = Icons.Default.WarningAmber,
                                    contentDescription = "Allergens",
                                    tint = Color(0xFFC0392B),
                                    modifier = Modifier.size(22.dp)
                                )
                            }
                        }
                        Spacer(modifier = Modifier.width(14.dp))
                        Column {
                            Text(
                                text = if (language == Language.DE) "Allergen- & Inhaltsstoffhinweis (EU)" else "Allergen Advisory",
                                style = MaterialTheme.typography.labelLarge,
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFFC0392B)
                            )
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(
                                text = item.allergens.joinToString(", "),
                                style = MaterialTheme.typography.bodyMedium,
                                fontWeight = FontWeight.SemiBold,
                                color = MaterialTheme.colorScheme.onSurface
                            )
                        }
                    }
                }
            }

            // TAGS
            if (item.tags.isNotEmpty()) {
                FlowRow(
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    item.tags.forEach { tag ->
                        Surface(
                            shape = RoundedCornerShape(8.dp),
                            color = MaterialTheme.colorScheme.surfaceVariant,
                            border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.3f))
                        ) {
                            Text(
                                text = "#$tag",
                                style = MaterialTheme.typography.labelSmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                            )
                        }
                    }
                }
            }

            // STAFF / BAR NOTES (PERSISTENT IN ROOM DB)
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                imageVector = Icons.Default.EditNote,
                                contentDescription = null,
                                tint = MaterialTheme.colorScheme.primary,
                                modifier = Modifier.size(20.dp)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = if (language == Language.DE) "Eigene Bar- / Team-Notizen" else "Staff & Inventory Notes",
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold,
                                color = MaterialTheme.colorScheme.onSurface
                            )
                        }

                        if (!isEditingNotes) {
                            Button(
                                onClick = { isEditingNotes = true },
                                colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primaryContainer),
                                contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 12.dp, vertical = 4.dp)
                            ) {
                                Text(
                                    text = if (language == Language.DE) "Bearbeiten" else "Edit",
                                    style = MaterialTheme.typography.labelSmall,
                                    color = MaterialTheme.colorScheme.onPrimaryContainer
                                )
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    if (isEditingNotes) {
                        OutlinedTextField(
                            value = notesText,
                            onValueChange = { notesText = it },
                            placeholder = {
                                Text(
                                    text = if (language == Language.DE)
                                        "Z.B. Lieferant, Regalplatz, Verkaufspreis 14,50€, Verkostungseindrücke..."
                                    else
                                        "E.g. Supplier, shelf location, price $14.50, tasting notes..."
                                )
                            },
                            modifier = Modifier.fillMaxWidth(),
                            minLines = 3
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        Row(horizontalArrangement = Arrangement.End, modifier = Modifier.fillMaxWidth()) {
                            Button(
                                onClick = {
                                    viewModel.saveNotes(item, notesText)
                                    isEditingNotes = false
                                },
                                colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary)
                            ) {
                                Text(
                                    text = if (language == Language.DE) "Speichern" else "Save Notes",
                                    color = MaterialTheme.colorScheme.onPrimary
                                )
                            }
                        }
                    } else {
                        if (notesText.isNotBlank()) {
                            Text(
                                text = notesText,
                                style = MaterialTheme.typography.bodyMedium,
                                color = MaterialTheme.colorScheme.onSurface
                            )
                        } else {
                            Text(
                                text = if (language == Language.DE)
                                    "Noch keine Notizen hinterlegt. Klicke auf 'Bearbeiten', um interne Bar-Notizen, Lieferanten oder Hausrezepte hinzuzufügen."
                                else
                                    "No internal notes saved yet. Click 'Edit' to record bar location, supplier, or house recipes.",
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(32.dp))
        }
    }
}

@Composable
fun InfoAttributeItem(
    label: String,
    value: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier.width(100.dp)
    ) {
        Icon(
            imageVector = icon,
            contentDescription = null,
            tint = MaterialTheme.colorScheme.primary,
            modifier = Modifier.size(20.dp)
        )
        Spacer(modifier = Modifier.height(4.dp))
        Text(
            text = label,
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            maxLines = 1
        )
        Spacer(modifier = Modifier.height(2.dp))
        Text(
            text = value,
            style = MaterialTheme.typography.bodySmall,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onSurface,
            maxLines = 2
        )
    }
}

@Composable
fun DetailSectionCard(
    title: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    content: String
) {
    Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.primary,
                    modifier = Modifier.size(20.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurface
                )
            }
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = content,
                style = MaterialTheme.typography.bodyMedium,
                lineHeight = 22.sp,
                color = MaterialTheme.colorScheme.onSurface
            )
        }
    }
}

@Composable
fun CoffeeDrinkLayerCard(
    layers: CoffeeLayers,
    language: Language
) {
    Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
        border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.primary.copy(alpha = 0.3f)),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = Icons.Default.Coffee,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.primary,
                    modifier = Modifier.size(20.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = if (language == Language.DE) "Flüssigkeitsschichten & Barista-Aufbau" else "Liquid Layers & Barista Ratio",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurface
                )
            }

            Spacer(modifier = Modifier.height(12.dp))

            // Visual Cup Simulation
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(120.dp)
                    .clip(RoundedCornerShape(8.dp))
                    .background(Color(0xFF221C18))
                    .border(2.dp, Color(0xFF5E493A), RoundedCornerShape(8.dp))
            ) {
                Column(modifier = Modifier.fillMaxSize()) {
                    // Top: Milk foam
                    if (layers.milkFoamPercent > 0f) {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .weight(layers.milkFoamPercent)
                                .background(Color(0xFFFFF6E5)),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                text = "${(layers.milkFoamPercent * 100).toInt()}% " +
                                        (if (language == Language.DE) "Milchschaum" else "Milk Foam"),
                                style = MaterialTheme.typography.labelSmall,
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFF332014)
                            )
                        }
                    }

                    // Middle: Espresso or Steamed Milk depending on drink
                    if (layers.espressoPercent > 0f) {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .weight(layers.espressoPercent)
                                .background(Color(0xFF4A2C11)),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                text = "${(layers.espressoPercent * 100).toInt()}% Espresso",
                                style = MaterialTheme.typography.labelSmall,
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFFFFD28E)
                            )
                        }
                    }

                    // Steamed milk layer
                    if (layers.steamedMilkPercent > 0f) {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .weight(layers.steamedMilkPercent)
                                .background(Color(0xFFE5D2BA)),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                text = "${(layers.steamedMilkPercent * 100).toInt()}% " +
                                        (if (language == Language.DE) "Warme Milch" else "Steamed Milk"),
                                style = MaterialTheme.typography.labelSmall,
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFF3B2519)
                            )
                        }
                    }

                    // Water layer (if Americano / Lungo)
                    if (layers.waterPercent > 0f) {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .weight(layers.waterPercent)
                                .background(Color(0xFF81D4FA)),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                text = "${(layers.waterPercent * 100).toInt()}% " +
                                        (if (language == Language.DE) "Heißwasser" else "Hot Water"),
                                style = MaterialTheme.typography.labelSmall,
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFF01579B)
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(10.dp))
            Text(
                text = if (language == Language.DE) layers.descriptionDe else layers.descriptionEn,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}
