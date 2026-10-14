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
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.DesignServices
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Restaurant
import androidx.compose.material.icons.filled.RoomService
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Surface
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import coil.compose.SubcomposeAsyncImage
import com.example.data.CuratedServiceData
import com.example.model.GastroItem
import com.example.model.Language
import com.example.ui.GastroViewModel
import com.example.ui.components.GastroThemedPlaceholder

@Composable
fun ServiceCultureScreen(
    viewModel: GastroViewModel,
    modifier: Modifier = Modifier
) {
    val language by viewModel.language.collectAsStateWithLifecycle()
    val isDe = (language == Language.DE)
    val scrollState = rememberScrollState()
    var selectedSchemaTab by remember { mutableIntStateOf(0) } // 0: Gala, 1: A la carte, 2: Breakfast

    Column(
        modifier = modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp)
            .testTag("service_culture_screen"),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Hero Card
        Surface(
            shape = RoundedCornerShape(16.dp),
            color = MaterialTheme.colorScheme.tertiaryContainer.copy(alpha = 0.7f),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.RoomService,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.tertiary,
                        modifier = Modifier.size(28.dp)
                    )
                    Spacer(modifier = Modifier.width(10.dp))
                    Text(
                        text = if (isDe) "Service, Eindecken & Tischkultur" else "Service, Table Setting & Etiquette",
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onTertiaryContainer
                    )
                }
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = if (isDe)
                        "Professionelle Tisch-Eindeckung, Couvert-Architektur, Gläser-Hierarchie, Serviettenfalttechniken und Servierregeln mit fotorealistischen Vorlagen."
                    else
                        "Professional table setting blueprints, cover architecture, glassware hierarchy, napkin folding craft, and service etiquette with photo inspiration.",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onTertiaryContainer
                )
            }
        }

        // 1. Interactive Table Setting Blueprint (Schema-Vorlagen)
        Card(
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = if (isDe) "📐 1. Eindeck-Schemata & Couvert-Architektur" else "📐 1. Table Setting Blueprints & Covers",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.primary
                )
                Spacer(modifier = Modifier.height(8.dp))

                TabRow(
                    selectedTabIndex = selectedSchemaTab,
                    containerColor = MaterialTheme.colorScheme.surface,
                    modifier = Modifier.clip(RoundedCornerShape(8.dp))
                ) {
                    Tab(
                        selected = selectedSchemaTab == 0,
                        onClick = { selectedSchemaTab = 0 },
                        text = { Text(if (isDe) "Gala (5-Gänge)" else "Gala Dinner", fontSize = 12.sp, fontWeight = FontWeight.Bold) }
                    )
                    Tab(
                        selected = selectedSchemaTab == 1,
                        onClick = { selectedSchemaTab = 1 },
                        text = { Text(if (isDe) "À-la-carte" else "À la carte", fontSize = 12.sp, fontWeight = FontWeight.Bold) }
                    )
                    Tab(
                        selected = selectedSchemaTab == 2,
                        onClick = { selectedSchemaTab = 2 },
                        text = { Text(if (isDe) "Frühstück" else "Breakfast", fontSize = 12.sp, fontWeight = FontWeight.Bold) }
                    )
                }

                Spacer(modifier = Modifier.height(14.dp))

                // Visual Representation Box
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(12.dp))
                        .background(Color(0xFF1E1713))
                        .border(1.5.dp, Color(0xFF634A38), RoundedCornerShape(12.dp))
                        .padding(14.dp)
                ) {
                    when (selectedSchemaTab) {
                        0 -> GalaCoverVisualizer(isDe)
                        1 -> AlacarteCoverVisualizer(isDe)
                        2 -> BreakfastCoverVisualizer(isDe)
                    }
                }

                Spacer(modifier = Modifier.height(12.dp))
                Text(
                    text = if (isDe)
                        "• Genormter Tischabstand: Genau 1 bis 2 cm (zwei Daumenbreiten) von der Kante für Teller und Besteckstiele.\n" +
                        "• Besteck-Reihenfolge: Von außen nach innen zum Teller hin gangweise arbeiten.\n" +
                        "• Richtglas-Prinzip: Wasserglas steht senkrecht über der Spitze des Fleischmessers; Weinkelche reihen sich im 45°-Winkel schräg rechts darunter an."
                    else
                        "• Margin: Strictly 1 to 2 cm (two thumbs) from the table edge for plates and handles.\n" +
                        "• Course sequence: Work from outermost cutlery inwards toward the plate.\n" +
                        "• Anchor glass: Water goblet stands precisely above the dinner knife tip; wine stems slope down diagonally at 45 degrees.",
                    style = MaterialTheme.typography.bodySmall,
                    lineHeight = 20.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }

        // 2. Photo Reference Gallery
        Card(
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = if (isDe) "📸 2. Fotogalerie & Praxis-Vorlagen" else "📸 2. Photo Reference Library & Standards",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.primary
                )
                Spacer(modifier = Modifier.height(12.dp))

                ServicePhotoCard(
                    title = if (isDe) "Festliche Gala-Tafel & Couvert-Architektur" else "Gala Dinner Banquet & Setting Architecture",
                    subtitle = if (isDe) "Makellose Symmetrie, gebügelte Tischwäsche mit 25-30 cm Überhang, glänzendes Tafelsilber und zentrierte Stoffservietten." else "Pristine symmetry, ironed linen tablecloth with 25-30 cm drop, polished silverware and centered napkins.",
                    imageUrl = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80"
                )

                Spacer(modifier = Modifier.height(12.dp))

                ServicePhotoCard(
                    title = if (isDe) "Kristallgläser-Hierarchie & Anordnung" else "Crystal Glassware Hierarchy & Stem Alignment",
                    subtitle = if (isDe) "Wasserglas über der Messerspitze, gefolgt von Rotweinkelch, Weißweinkelch und Dessert-/Sektkelch im 45°-Winkel." else "Water goblet at knife tip, followed by red wine bowl, white wine stem, and dessert flute at 45 degrees.",
                    imageUrl = "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&auto=format&fit=crop&q=80"
                )

                Spacer(modifier = Modifier.height(12.dp))

                ServicePhotoCard(
                    title = if (isDe) "Serviettenfaltkunst & Hygiene-Schutz" else "Napkin Folding Art & Sanitary Protection",
                    subtitle = if (isDe) "Bischofsmütze, Tafelspitz und Bestecktasche. Wichtig: Mundberührungsflächen beim Falten niemals mit bloßen Händen berühren!" else "Bishop's Hat, Fan, and Cutlery Pouch. Critical: Never touch mouth-contact areas during folding!",
                    imageUrl = "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&auto=format&fit=crop&q=80"
                )

                Spacer(modifier = Modifier.height(12.dp))

                ServicePhotoCard(
                    title = if (isDe) "Präsentations- und Einsetz-Etikette" else "Presentation & Serving Etiquette",
                    subtitle = if (isDe) "Speisen und Getränke grundsätzlich von der rechten Seite des Gastes einsetzen. Leere Teller von links abräumen." else "Serve food and beverages strictly from the guest's right side. Clear empty courses from the left.",
                    imageUrl = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80"
                )
            }
        }

        // 3. Database Service Items
        Card(
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = if (isDe) "📖 3. Fachartikel: Service & Tischkultur" else "📖 3. Reference Entries: Service & Table Culture",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.primary
                )
                Spacer(modifier = Modifier.height(12.dp))

                CuratedServiceData.items.forEach { item ->
                    ServiceItemEntryCard(item = item, language = language, onOpenDetail = {
                        viewModel.selectItem(item)
                    })
                    Spacer(modifier = Modifier.height(10.dp))
                }
            }
        }

        Spacer(modifier = Modifier.height(80.dp))
    }
}

@Composable
fun GalaCoverVisualizer(isDe: Boolean) {
    Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.fillMaxWidth()) {
        Text(
            text = if (isDe) "5-GÄNGE GALA COUVERT" else "5-COURSE GALA DINNER COVER",
            color = Color(0xFFFFD28E),
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold
        )
        Spacer(modifier = Modifier.height(12.dp))

        // Glassware and Dessert cutlery top area
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.Bottom
        ) {
            // Top Left: Bread Plate
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Surface(
                    shape = CircleShape,
                    color = Color(0xFF382D22),
                    border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFC98822)),
                    modifier = Modifier.size(46.dp)
                ) {
                    Box(contentAlignment = Alignment.Center) {
                        Text(if (isDe) "Brot" else "Bread", color = Color.White, fontSize = 9.sp, fontWeight = FontWeight.Bold)
                    }
                }
                Text(if (isDe) "+ Butter" else "+ Butter", color = Color(0xFFA09080), fontSize = 8.sp)
            }

            // Top Center: Dessert Cutlery
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text(if (isDe) "➔ Dessertlöffel (Griff rechts)" else "➔ Dessert Spoon (handle right)", color = Color(0xFFFFD28E), fontSize = 8.5.sp)
                Box(modifier = Modifier.width(90.dp).height(4.dp).background(Color(0xFFCFD8DC), RoundedCornerShape(2.dp)))
                Spacer(modifier = Modifier.height(4.dp))
                Box(modifier = Modifier.width(90.dp).height(4.dp).background(Color(0xFFCFD8DC), RoundedCornerShape(2.dp)))
                Text(if (isDe) "⬅ Dessertgabel (Griff links)" else "⬅ Dessert Fork (handle left)", color = Color(0xFFA09080), fontSize = 8.5.sp)
            }

            // Top Right: Glassware hierarchy
            Column(horizontalAlignment = Alignment.End) {
                Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                    Surface(shape = CircleShape, color = Color(0xFF219EBC).copy(alpha = 0.3f), border = androidx.compose.foundation.BorderStroke(1.5.dp, Color(0xFF219EBC)), modifier = Modifier.size(26.dp)) {
                        Box(contentAlignment = Alignment.Center) { Text("H₂O", color = Color(0xFF81D4FA), fontSize = 8.sp, fontWeight = FontWeight.Bold) }
                    }
                    Surface(shape = CircleShape, color = Color(0xFF9E2A2B).copy(alpha = 0.3f), border = androidx.compose.foundation.BorderStroke(1.5.dp, Color(0xFFE07A5F)), modifier = Modifier.size(24.dp)) {
                        Box(contentAlignment = Alignment.Center) { Text("Rot", color = Color(0xFFFFCDD2), fontSize = 8.sp) }
                    }
                    Surface(shape = CircleShape, color = Color(0xFFFFB703).copy(alpha = 0.3f), border = androidx.compose.foundation.BorderStroke(1.5.dp, Color(0xFFFFB703)), modifier = Modifier.size(22.dp)) {
                        Box(contentAlignment = Alignment.Center) { Text("Weiß", color = Color(0xFFFFE082), fontSize = 7.sp) }
                    }
                }
                Text(if (isDe) "Richtglas über Messerspitze" else "Anchor over knife tip", color = Color(0xFF81D4FA), fontSize = 8.sp, fontWeight = FontWeight.SemiBold)
            }
        }

        Spacer(modifier = Modifier.height(14.dp))

        // Center Area: Forks, Plate, Knives
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly,
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Left Forks
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text(if (isDe) "Vorspeise | Fisch | Menü" else "Salad | Fish | Dinner", color = Color(0xFFA09080), fontSize = 8.5.sp)
                Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    Box(modifier = Modifier.width(6.dp).height(65.dp).background(Color(0xFFCFD8DC), RoundedCornerShape(2.dp)))
                    Box(modifier = Modifier.width(6.dp).height(70.dp).background(Color(0xFFCFD8DC), RoundedCornerShape(2.dp)))
                    Box(modifier = Modifier.width(7.dp).height(75.dp).background(Color(0xFFECEFF1), RoundedCornerShape(2.dp)))
                }
                Text(if (isDe) "Gabeln (links)" else "Forks (left)", color = Color(0xFFFFD28E), fontSize = 9.sp, fontWeight = FontWeight.Bold)
            }

            // Center Plate
            Surface(
                shape = CircleShape,
                color = Color(0xFF2D241C),
                border = androidx.compose.foundation.BorderStroke(2.5.dp, Color(0xFFC98822)),
                modifier = Modifier.size(95.dp)
            ) {
                Box(contentAlignment = Alignment.Center) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Surface(shape = RoundedCornerShape(4.dp), color = Color(0xFFECEFF1), modifier = Modifier.size(36.dp, 16.dp)) {
                            Box(contentAlignment = Alignment.Center) {
                                Text(if (isDe) "Serviette" else "Napkin", color = Color(0xFF1E1713), fontSize = 7.5.sp, fontWeight = FontWeight.Bold)
                            }
                        }
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(if (isDe) "Platzteller" else "Charger", color = Color.White, fontSize = 9.sp, fontWeight = FontWeight.Bold)
                    }
                }
            }

            // Right Knives & Spoon
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text(if (isDe) "Menü | Fisch | Suppe" else "Dinner | Fish | Soup", color = Color(0xFFA09080), fontSize = 8.5.sp)
                Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    Box(modifier = Modifier.width(7.dp).height(75.dp).background(Color(0xFFECEFF1), RoundedCornerShape(2.dp)))
                    Box(modifier = Modifier.width(6.dp).height(70.dp).background(Color(0xFFCFD8DC), RoundedCornerShape(2.dp)))
                    Box(modifier = Modifier.width(7.dp).height(65.dp).background(Color(0xFFCFD8DC), RoundedCornerShape(2.dp)))
                }
                Text(if (isDe) "Messer/Löffel (rechts)" else "Knives/Spoon (right)", color = Color(0xFFFFD28E), fontSize = 9.sp, fontWeight = FontWeight.Bold)
            }
        }

        Spacer(modifier = Modifier.height(10.dp))
        // Bottom Table Edge line
        Box(modifier = Modifier.fillMaxWidth().height(2.dp).background(Color(0xFFC98822)))
        Text(if (isDe) "Tischkante: Genormte 1-2 cm Abstand" else "Table Edge: Standard 1-2 cm distance", color = Color(0xFFFFD28E), fontSize = 9.5.sp, fontWeight = FontWeight.Bold)
    }
}

@Composable
fun AlacarteCoverVisualizer(isDe: Boolean) {
    Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.fillMaxWidth()) {
        Text(
            text = if (isDe) "KLASSISCHES À-LA-CARTE GECK" else "STANDARD À LA CARTE DINNER COVER",
            color = Color(0xFFFFD28E),
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold
        )
        Spacer(modifier = Modifier.height(14.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceAround,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Box(modifier = Modifier.width(8.dp).height(80.dp).background(Color(0xFFECEFF1), RoundedCornerShape(2.dp)))
                Text(if (isDe) "Menügabel" else "Dinner Fork", color = Color(0xFFFFD28E), fontSize = 9.sp, fontWeight = FontWeight.Bold)
            }

            Surface(
                shape = CircleShape,
                color = Color(0xFF2D241C),
                border = androidx.compose.foundation.BorderStroke(2.5.dp, Color(0xFFC98822)),
                modifier = Modifier.size(90.dp)
            ) {
                Box(contentAlignment = Alignment.Center) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Surface(shape = RoundedCornerShape(4.dp), color = Color(0xFFECEFF1), modifier = Modifier.size(34.dp, 16.dp)) {
                            Box(contentAlignment = Alignment.Center) { Text(if (isDe) "Serviette" else "Napkin", color = Color(0xFF1E1713), fontSize = 7.5.sp, fontWeight = FontWeight.Bold) }
                        }
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(if (isDe) "Speiseteller" else "Dinner Plate", color = Color.White, fontSize = 9.sp, fontWeight = FontWeight.Bold)
                    }
                }
            }

            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Box(modifier = Modifier.width(8.dp).height(80.dp).background(Color(0xFFECEFF1), RoundedCornerShape(2.dp)))
                Text(if (isDe) "Menümesser" else "Dinner Knife", color = Color(0xFFFFD28E), fontSize = 9.sp, fontWeight = FontWeight.Bold)
            }
        }

        Spacer(modifier = Modifier.height(10.dp))
        Box(modifier = Modifier.fillMaxWidth().height(2.dp).background(Color(0xFFC98822)))
        Text(if (isDe) "Wasserglas rechts oben über Messerspitze" else "Water glass top right above knife tip", color = Color(0xFF81D4FA), fontSize = 9.sp)
    }
}

@Composable
fun BreakfastCoverVisualizer(isDe: Boolean) {
    Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.fillMaxWidth()) {
        Text(
            text = if (isDe) "FRÜHSTÜCKS- & BRUNCH-GEDECK" else "BREAKFAST & BRUNCH COVER",
            color = Color(0xFFFFD28E),
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold
        )
        Spacer(modifier = Modifier.height(14.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceAround,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Box(modifier = Modifier.width(7.dp).height(70.dp).background(Color(0xFFECEFF1), RoundedCornerShape(2.dp)))
                Text(if (isDe) "Gabel" else "Fork", color = Color(0xFFFFD28E), fontSize = 9.sp, fontWeight = FontWeight.Bold)
            }

            Surface(
                shape = CircleShape,
                color = Color(0xFF2D241C),
                border = androidx.compose.foundation.BorderStroke(2.dp, Color(0xFFC98822)),
                modifier = Modifier.size(80.dp)
            ) {
                Box(contentAlignment = Alignment.Center) {
                    Text(if (isDe) "Frühstücksteller" else "Breakfast Plate", color = Color.White, fontSize = 8.5.sp, fontWeight = FontWeight.Bold)
                }
            }

            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Box(modifier = Modifier.width(7.dp).height(70.dp).background(Color(0xFFECEFF1), RoundedCornerShape(2.dp)))
                Text(if (isDe) "Messer" else "Knife", color = Color(0xFFFFD28E), fontSize = 9.sp, fontWeight = FontWeight.Bold)
            }

            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Surface(
                    shape = CircleShape,
                    color = Color(0xFF4E342E),
                    border = androidx.compose.foundation.BorderStroke(1.5.dp, Color(0xFFC98822)),
                    modifier = Modifier.size(46.dp)
                ) {
                    Box(contentAlignment = Alignment.Center) {
                        Text("☕", fontSize = 16.sp)
                    }
                }
                Text(if (isDe) "Kaffeetasse" else "Coffee Cup", color = Color(0xFFFFD28E), fontSize = 8.5.sp, fontWeight = FontWeight.Bold)
            }
        }

        Spacer(modifier = Modifier.height(10.dp))
        Box(modifier = Modifier.fillMaxWidth().height(2.dp).background(Color(0xFFC98822)))
        Text(if (isDe) "Kaffeelöffel auf Untertasse rechts abgelegt" else "Teaspoon rested on saucer to the right", color = Color(0xFFA09080), fontSize = 9.sp)
    }
}

@Composable
fun ServicePhotoCard(
    title: String,
    subtitle: String,
    imageUrl: String
) {
    Card(
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column {
            SubcomposeAsyncImage(
                model = imageUrl,
                contentDescription = title,
                contentScale = ContentScale.Crop,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(180.dp)
            )
            Column(modifier = Modifier.padding(12.dp)) {
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.primary
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = subtitle,
                    style = MaterialTheme.typography.bodySmall,
                    lineHeight = 18.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}

@Composable
fun ServiceItemEntryCard(
    item: GastroItem,
    language: Language,
    onOpenDetail: () -> Unit
) {
    Card(
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier.padding(10.dp),
            verticalAlignment = Alignment.Top,
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            SubcomposeAsyncImage(
                model = item.imageUrl,
                contentDescription = item.localizedName(language),
                contentScale = ContentScale.Crop,
                modifier = Modifier
                    .size(75.dp)
                    .clip(RoundedCornerShape(8.dp))
            )
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = item.localizedName(language),
                    style = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurface
                )
                Text(
                    text = item.localizedSubtitle(language),
                    style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.primary,
                    fontWeight = FontWeight.SemiBold
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = item.localizedScience(language).ifBlank { item.localizedCulinary(language) },
                    style = MaterialTheme.typography.bodySmall,
                    maxLines = 2,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Spacer(modifier = Modifier.height(6.dp))
                Button(
                    onClick = onOpenDetail,
                    contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 10.dp, vertical = 2.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primaryContainer),
                    modifier = Modifier.height(30.dp)
                ) {
                    Icon(imageVector = Icons.Default.Visibility, contentDescription = null, modifier = Modifier.size(14.dp), tint = MaterialTheme.colorScheme.onPrimaryContainer)
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(if (language == Language.DE) "Im Detail ansehen" else "View Details", fontSize = 11.sp, color = MaterialTheme.colorScheme.onPrimaryContainer)
                }
            }
        }
    }
}
