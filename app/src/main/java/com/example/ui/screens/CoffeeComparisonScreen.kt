package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CompareArrows
import androidx.compose.material.icons.filled.Fireplace
import androidx.compose.material.icons.filled.LocalCafe
import androidx.compose.material.icons.filled.Science
import androidx.compose.material.icons.filled.Terrain
import androidx.compose.material.icons.filled.WbSunny
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.data.CuratedGastroData
import com.example.model.CoffeeLayers
import com.example.model.GastroCategory
import com.example.model.GastroItem
import com.example.model.Language
import com.example.ui.GastroViewModel

@Composable
fun CoffeeComparisonScreen(
    viewModel: GastroViewModel,
    modifier: Modifier = Modifier
) {
    val language by viewModel.language.collectAsStateWithLifecycle()
    var selectedSubTab by remember { mutableIntStateOf(0) } // 0: Drink Comparison, 1: Arabica vs Robusta, 2: Roasting & Processing

    val allCoffeeItems = remember {
        CuratedGastroData.items.filter { it.category == GastroCategory.COFFEE }
    }
    val layeredDrinks = remember {
        allCoffeeItems.filter { it.coffeeLayers != null }
    }

    var leftDrink by remember { mutableStateOf(layeredDrinks.find { it.id == "coffee_cappuccino" } ?: layeredDrinks.first()) }
    var rightDrink by remember { mutableStateOf(layeredDrinks.find { it.id == "coffee_latte_macchiato" } ?: layeredDrinks[1]) }

    Column(modifier = modifier.fillMaxSize()) {
        TabRow(
            selectedTabIndex = selectedSubTab,
            containerColor = MaterialTheme.colorScheme.surface
        ) {
            Tab(
                selected = selectedSubTab == 0,
                onClick = { selectedSubTab = 0 },
                text = {
                    Text(
                        text = if (language == Language.DE) "Getränke-Vergleich" else "Drink Comparison",
                        style = MaterialTheme.typography.labelMedium,
                        fontWeight = if (selectedSubTab == 0) FontWeight.Bold else FontWeight.Normal
                    )
                }
            )
            Tab(
                selected = selectedSubTab == 1,
                onClick = { selectedSubTab = 1 },
                text = {
                    Text(
                        text = if (language == Language.DE) "Arabica vs Robusta" else "Arabica vs Robusta",
                        style = MaterialTheme.typography.labelMedium,
                        fontWeight = if (selectedSubTab == 1) FontWeight.Bold else FontWeight.Normal
                    )
                }
            )
            Tab(
                selected = selectedSubTab == 2,
                onClick = { selectedSubTab = 2 },
                text = {
                    Text(
                        text = if (language == Language.DE) "Röstung & Aufbereitung" else "Roast & Processing",
                        style = MaterialTheme.typography.labelMedium,
                        fontWeight = if (selectedSubTab == 2) FontWeight.Bold else FontWeight.Normal
                    )
                }
            )
        }

        when (selectedSubTab) {
            0 -> DrinkComparisonTab(
                drinks = layeredDrinks,
                leftDrink = leftDrink,
                rightDrink = rightDrink,
                language = language,
                onSelectLeft = { leftDrink = it },
                onSelectRight = { rightDrink = it }
            )
            1 -> ArabicaVsRobustaTab(language = language)
            2 -> RoastingAndProcessingTab(language = language)
        }
    }
}

@Composable
fun DrinkComparisonTab(
    drinks: List<GastroItem>,
    leftDrink: GastroItem,
    rightDrink: GastroItem,
    language: Language,
    onSelectLeft: (GastroItem) -> Unit,
    onSelectRight: (GastroItem) -> Unit
) {
    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Selector Header
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            DrinkSelectorDropdown(
                label = if (language == Language.DE) "Getränk 1" else "Drink 1",
                current = leftDrink,
                options = drinks,
                language = language,
                onSelect = onSelectLeft,
                modifier = Modifier.weight(1f)
            )

            Icon(
                imageVector = Icons.Default.CompareArrows,
                contentDescription = "Compare",
                tint = MaterialTheme.colorScheme.primary,
                modifier = Modifier
                    .padding(horizontal = 8.dp)
                    .size(28.dp)
            )

            DrinkSelectorDropdown(
                label = if (language == Language.DE) "Getränk 2" else "Drink 2",
                current = rightDrink,
                options = drinks,
                language = language,
                onSelect = onSelectRight,
                modifier = Modifier.weight(1f)
            )
        }

        // Side-by-side Visual Cups Card
        Card(
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = if (language == Language.DE) "Optischer Schichten- & Mengenvergleich" else "Visual Cup & Layer Breakdown",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurface
                )
                Spacer(modifier = Modifier.height(16.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    Column(
                        modifier = Modifier.weight(1f),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(
                            text = leftDrink.localizedName(language),
                            style = MaterialTheme.typography.titleSmall,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.primary
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        leftDrink.coffeeLayers?.let {
                            CupVisualizer(layers = it, language = language)
                        }
                    }

                    Column(
                        modifier = Modifier.weight(1f),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(
                            text = rightDrink.localizedName(language),
                            style = MaterialTheme.typography.titleSmall,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.primary
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        rightDrink.coffeeLayers?.let {
                            CupVisualizer(layers = it, language = language)
                        }
                    }
                }
            }
        }

        // Direct Comparison Table
        Card(
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = if (language == Language.DE) "Wichtige Unterschiede für Service & Gast" else "Key Distinctions for Staff & Guests",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurface
                )
                Spacer(modifier = Modifier.height(12.dp))

                ComparisonTableRow(
                    label = if (language == Language.DE) "Tassen- / Glasform" else "Cup / Glassware",
                    leftVal = getGlassware(leftDrink.id, language),
                    rightVal = getGlassware(rightDrink.id, language)
                )
                HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f), modifier = Modifier.padding(vertical = 8.dp))

                ComparisonTableRow(
                    label = if (language == Language.DE) "Milchschaum-Textur" else "Foam Texture",
                    leftVal = getFoamText(leftDrink.id, language),
                    rightVal = getFoamText(rightDrink.id, language)
                )
                HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f), modifier = Modifier.padding(vertical = 8.dp))

                ComparisonTableRow(
                    label = if (language == Language.DE) "Typischer Gastwunsch" else "Guest Expectation",
                    leftVal = leftDrink.localizedFaq(language).take(120) + "...",
                    rightVal = rightDrink.localizedFaq(language).take(120) + "..."
                )
            }
        }

        Spacer(modifier = Modifier.height(80.dp))
    }
}

@Composable
fun CupVisualizer(layers: CoffeeLayers, language: Language) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(160.dp)
            .clip(RoundedCornerShape(8.dp))
            .background(Color(0xFF1E1713))
            .border(2.dp, Color(0xFF634A38), RoundedCornerShape(8.dp))
    ) {
        Column(modifier = Modifier.fillMaxSize()) {
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
                                (if (language == Language.DE) "Schaum" else "Foam"),
                        style = MaterialTheme.typography.labelSmall,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF332014)
                    )
                }
            }
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
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFFFFD28E)
                    )
                }
            }
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
                                (if (language == Language.DE) "Milch" else "Milk"),
                        style = MaterialTheme.typography.labelSmall,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF3B2519)
                    )
                }
            }
        }
    }
}

@Composable
fun ComparisonTableRow(label: String, leftVal: String, rightVal: String) {
    Column {
        Text(
            text = label,
            style = MaterialTheme.typography.labelMedium,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Spacer(modifier = Modifier.height(4.dp))
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Text(
                text = leftVal,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurface,
                modifier = Modifier.weight(1f)
            )
            Text(
                text = rightVal,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurface,
                modifier = Modifier.weight(1f)
            )
        }
    }
}

@Composable
fun DrinkSelectorDropdown(
    label: String,
    current: GastroItem,
    options: List<GastroItem>,
    language: Language,
    onSelect: (GastroItem) -> Unit,
    modifier: Modifier = Modifier
) {
    var expanded by remember { mutableStateOf(false) }

    Box(modifier = modifier) {
        Surface(
            onClick = { expanded = true },
            shape = RoundedCornerShape(12.dp),
            color = MaterialTheme.colorScheme.surface,
            border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.5f)),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp)) {
                Text(
                    text = label,
                    style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Text(
                    text = current.localizedName(language),
                    style = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.primary,
                    maxLines = 1
                )
            }
        }

        DropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false }
        ) {
            options.forEach { drink ->
                DropdownMenuItem(
                    text = { Text(drink.localizedName(language)) },
                    onClick = {
                        onSelect(drink)
                        expanded = false
                    }
                )
            }
        }
    }
}

@Composable
fun ArabicaVsRobustaTab(language: Language) {
    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Card(
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.Terrain,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.primary,
                        modifier = Modifier.size(24.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = if (language == Language.DE) "Botanischer & Sensorischer Vergleich" else "Botanical & Chemical Comparison",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                }
                Spacer(modifier = Modifier.height(12.dp))

                MatrixRow("Kriterium / Metric", "Coffea Arabica", "Coffea Robusta (Canephora)", isHeader = true)
                MatrixRow(
                    if (language == Language.DE) "Anbauhöhe" else "Altitude",
                    "900 - 2.200 m (Hochland)",
                    "0 - 900 m (Tiefland)"
                )
                MatrixRow(
                    if (language == Language.DE) "Chromosomensatz" else "Genetics",
                    "44 Chromosomen (selbstbestäubend)",
                    "22 Chromosomen (fremdbestäubend)"
                )
                MatrixRow(
                    if (language == Language.DE) "Koffeingehalt" else "Caffeine",
                    "1,2% - 1,5%",
                    "2,2% - 2,7% (ca. doppelt so viel!)"
                )
                MatrixRow(
                    if (language == Language.DE) "Zuckergehalt (Saccharose)" else "Sugar Content",
                    "6% - 9% (süß & fruchtig)",
                    "3% - 5% (herber)"
                )
                MatrixRow(
                    if (language == Language.DE) "Fette / Lipide" else "Lipids / Oils",
                    "15% - 17% (eleganter Körper)",
                    "10% - 12% (bildet mehr Crema)"
                )
                MatrixRow(
                    if (language == Language.DE) "Geschmacksprofil" else "Flavor Notes",
                    if (language == Language.DE) "Fruchtig, floral, feine Säure, Schokolade" else "Fruity, floral, nuanced acidity, cocoa",
                    if (language == Language.DE) "Erdig, holzig, nussig, dunkle Bitterschokolade" else "Earthy, woody, nutty, heavy dark chocolate"
                )
                MatrixRow(
                    label = if (language == Language.DE) "Crema-Eigenschaft" else "Crema Behavior",
                    col1 = if (language == Language.DE) "Feinporig, haselnussbraun, dünner" else "Fine, hazelnut-brown, delicate",
                    col2 = if (language == Language.DE) "Voluminös, dick, extrem standfest" else "Voluminous, dense, long-lasting",
                    isLast = true
                )
            }
        }

        // Barista Service Tips for Guests
        Card(
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.35f)),
            border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.primary.copy(alpha = 0.5f))
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = if (language == Language.DE) "Barista-Tipp für Gäste" else "Barista Advice for Guests",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.primary
                )
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = if (language == Language.DE)
                        "Wenn ein Gast nach 'wenig Bitterkeit und fruchtigem Aroma' fragt -> Empfehle 100% Arabica.\n" +
                        "Wenn ein Gast einen 'kräftigen Wachmacher mit dicker Crema wie in Süditalien' wünscht -> Empfehle einen Espresso-Blend mit 20-30% hochwertigem Robusta-Anteil!"
                    else
                        "If a guest asks for 'low bitterness and fruity berry aroma' -> Recommend 100% Single Origin Arabica.\n" +
                        "If a guest desires an 'intense wake-up kick with thick crema like in Naples' -> Recommend an espresso blend with 20-30% high-grade Robusta!",
                    style = MaterialTheme.typography.bodyMedium,
                    lineHeight = 22.sp,
                    color = MaterialTheme.colorScheme.onSurface
                )
            }
        }

        Spacer(modifier = Modifier.height(80.dp))
    }
}

@Composable
fun MatrixRow(label: String, col1: String, col2: String, isHeader: Boolean = false, isLast: Boolean = false) {
    Column {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 4.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Text(
                text = label,
                style = if (isHeader) MaterialTheme.typography.labelSmall else MaterialTheme.typography.bodySmall,
                fontWeight = if (isHeader) FontWeight.Bold else FontWeight.Medium,
                color = if (isHeader) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.weight(1f)
            )
            Text(
                text = col1,
                style = if (isHeader) MaterialTheme.typography.labelSmall else MaterialTheme.typography.bodySmall,
                fontWeight = if (isHeader) FontWeight.Bold else FontWeight.Normal,
                color = MaterialTheme.colorScheme.onSurface,
                modifier = Modifier.weight(1f)
            )
            Text(
                text = col2,
                style = if (isHeader) MaterialTheme.typography.labelSmall else MaterialTheme.typography.bodySmall,
                fontWeight = if (isHeader) FontWeight.Bold else FontWeight.Normal,
                color = MaterialTheme.colorScheme.onSurface,
                modifier = Modifier.weight(1f)
            )
        }
        if (!isLast) {
            HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.15f), modifier = Modifier.padding(vertical = 4.dp))
        }
    }
}

@Composable
fun RoastingAndProcessingTab(language: Language) {
    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // PROCESSING METHODS
        Card(
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.WbSunny,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.primary,
                        modifier = Modifier.size(24.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = if (language == Language.DE) "Aufbereitungsmethoden im Ursprung" else "Origin Processing Methods",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                }
                Spacer(modifier = Modifier.height(12.dp))

                ProcessingItem(
                    title = if (language == Language.DE) "1. Washed / Wet Process (Nassaufbereitung)" else "1. Washed / Wet Process",
                    desc = if (language == Language.DE)
                        "Fruchtfleisch wird maschinell entpulpt, Reste in Wassertanks fermentiert und gewaschen. Ergebnis: Extrem klares Geschmacksprofil, strahlende Zitrussäure, eleganter Körper."
                    else
                        "Pulp is removed by depulpers, remaining mucilage fermented in water tanks and washed clean. Result: Pristine cup clarity, bright lively acidity, light elegant body."
                )

                HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f), modifier = Modifier.padding(vertical = 8.dp))

                ProcessingItem(
                    title = if (language == Language.DE) "2. Natural / Dry Process (Trockenaufbereitung)" else "2. Natural / Dry Process",
                    desc = if (language == Language.DE)
                        "Ganze Kaffeekirschen trocknen wochenlang in der Sonne auf Hochbetten. Zucker aus dem Fruchtfleisch wandert in die Bohne. Ergebnis: Bombe an Frucht (Erdbeere, Heidelbeere), sirupartiger Körper, schokoladige Süße."
                    else
                        "Whole coffee cherries are dried on raised beds under the sun for weeks. Sugars from pulp migrate into the seed. Result: Explosive ripe berry notes (blueberry, strawberry), heavy syrupy body, dessert sweetness."
                )

                HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f), modifier = Modifier.padding(vertical = 8.dp))

                ProcessingItem(
                    title = if (language == Language.DE) "3. Honey / Pulped Natural" else "3. Honey / Pulped Natural",
                    desc = if (language == Language.DE)
                        "Schale wird entfernt, die klebrige Fruchtschicht (Mucilage) bleibt beim Trocknen an der Bohne. Perfekte Balance aus Süße und Spritzigkeit."
                    else
                        "Skin is removed while the sticky sugary mucilage stays attached during drying. Perfect hybrid of natural sweetness and washed acidity."
                )
            }
        }

        // ROASTING PROFILES
        Card(
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.Fireplace,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.primary,
                        modifier = Modifier.size(24.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = if (language == Language.DE) "Röstgrade & Geschmacksentwicklung" else "Roast Profiles & Chemistry",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                }
                Spacer(modifier = Modifier.height(12.dp))

                ProcessingItem(
                    title = if (language == Language.DE) "Helle Röstung (Light Roast / Cinnamon)" else "Light Roast (Cinnamon / New England)",
                    desc = if (language == Language.DE)
                        "Stoppt kurz nach dem First Crack (~195-205°C). Erhält das ursprüngliche Terroir der Bohne, hohe Fruchtsäure, blumige Aromen. Ideal für Pour-Over Handfilter."
                    else
                        "Ended right after First Crack (~195-205°C). Preserves original terroir, delicate fruit acids, floral notes. Ideal for specialty filter brew."
                )

                HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f), modifier = Modifier.padding(vertical = 8.dp))

                ProcessingItem(
                    title = if (language == Language.DE) "Mittlere Röstung (Medium Roast / City)" else "Medium Roast (City / Full City)",
                    desc = if (language == Language.DE)
                        "Maillard-Reaktion und Karamellisierung im Gleichgewicht. Ausgewogene Säure, Aromen von Karamell, Haselnuss und Vollmilchschokolade. Universell beliebt."
                    else
                        "Optimal equilibrium between acidity and Maillard caramelization. Sweet notes of caramel, roasted hazelnut, and milk chocolate."
                )

                HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f), modifier = Modifier.padding(vertical = 8.dp))

                ProcessingItem(
                    title = if (language == Language.DE) "Dunkle Röstung (Dark Roast / French / Italian)" else "Dark Roast (French / Italian)",
                    desc = if (language == Language.DE)
                        "Bis zum Second Crack geröstet (~225-230°C). Ätherische Kaffeeöle treten an die Oberfläche. Kaum Säure, intensive Bitterschokolade, Rauch- und Röstnoten. Klassiker für Cappuccino."
                    else
                        "Pushed to Second Crack (~225-230°C). Lipids surface as shiny sheen. Low acidity, heavy body, smoky bittersweet dark chocolate. Traditional base for milk drinks."
                )
            }
        }

        Spacer(modifier = Modifier.height(80.dp))
    }
}

@Composable
fun ProcessingItem(title: String, desc: String) {
    Column {
        Text(
            text = title,
            style = MaterialTheme.typography.titleSmall,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.primary
        )
        Spacer(modifier = Modifier.height(4.dp))
        Text(
            text = desc,
            style = MaterialTheme.typography.bodySmall,
            lineHeight = 20.sp,
            color = MaterialTheme.colorScheme.onSurface
        )
    }
}

fun getGlassware(drinkId: String, language: Language): String {
    return when (drinkId) {
        "coffee_espresso" -> if (language == Language.DE) "Vorgewärmte Espressotasse (60-80ml Keramik)" else "Pre-warmed ceramic demitasse (60-80ml)"
        "coffee_cappuccino" -> if (language == Language.DE) "Bauchige Keramiktasse (150-180ml)" else "Wide-rimmed ceramic cup (150-180ml)"
        "coffee_latte_macchiato" -> if (language == Language.DE) "Hohes hitzefestes Klarglas (250-300ml)" else "Tall heatproof glass tumbler (250-300ml)"
        "coffee_flat_white" -> if (language == Language.DE) "Tulpenförmige Tasse (160ml)" else "Ceramic tulip cup (160ml)"
        "coffee_espresso_macchiato" -> if (language == Language.DE) "Espressotasse oder Gibraltar-Glas" else "Demitasse or Gibraltar glass"
        "coffee_ristretto_lungo" -> if (language == Language.DE) "Espressotasse (Lungo: mittlere Tasse)" else "Demitasse (Lungo: medium cup)"
        else -> if (language == Language.DE) "Spezialitätenglas" else "Specialty glass"
    }
}

fun getFoamText(drinkId: String, language: Language): String {
    return when (drinkId) {
        "coffee_cappuccino" -> if (language == Language.DE) "Dicke, samtige Schaumhaube (~1/3 der Tasse)" else "Dense velvety foam head (~1/3 of cup)"
        "coffee_latte_macchiato" -> if (language == Language.DE) "Feste Schaumkrone (~2-3cm obenauf)" else "Stiff foam head (~2-3cm on top)"
        "coffee_flat_white" -> if (language == Language.DE) "Mikroschaum komplett eingegossen, flüssig" else "Seamless microfoam integrated, no stiff foam"
        "coffee_espresso_macchiato" -> if (language == Language.DE) "Ein kleiner Löffel feiner Schaumtupfer" else "Single dollop of foam marking the crema"
        "coffee_espresso" -> if (language == Language.DE) "Nur natürliche Crema (keine Milch)" else "Pure natural coffee crema only"
        else -> if (language == Language.DE) "Getränkespezifisch" else "Drink specific"
    }
}
