package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
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
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.LocalDrink
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.filled.WineBar
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.model.Language
import com.example.ui.GastroViewModel

@Composable
fun WineGuideScreen(
    viewModel: GastroViewModel,
    modifier: Modifier = Modifier
) {
    val language by viewModel.language.collectAsStateWithLifecycle()
    val scrollState = rememberScrollState()

    Column(
        modifier = modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp)
            .testTag("wine_guide_screen"),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Hero Card
        Surface(
            shape = RoundedCornerShape(16.dp),
            color = MaterialTheme.colorScheme.secondaryContainer,
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.WineBar,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.onSecondaryContainer,
                        modifier = Modifier.size(28.dp)
                    )
                    Spacer(modifier = Modifier.width(10.dp))
                    Text(
                        text = if (language == Language.DE) "Wein- & Sommelier-Kompass" else "Wine & Sommelier Master Guide",
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onSecondaryContainer
                    )
                }
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = if (language == Language.DE)
                        "Von Rebsorten über Kelterverfahren (Weiß, Rot, Rosé) bis zu den großen Schaumwein-Unterschieden (Champagner, Sekt, Asti)."
                    else
                        "From noble grape varieties to vinification methods (White, Red, Rosé) and sparkling wine styles (Champagne, Sekt, Asti).",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSecondaryContainer
                )
            }
        }

        // 1. SCHAUMWEIN-DREIKLANG: CHAMPAGNER VS. SEKT VS. ASTI
        WineConceptCard(
            title = if (language == Language.DE) "1. Schaumweine: Champagner vs. Deutscher Sekt vs. Asti Spumante" else "1. Sparkling Wines: Champagne vs. Sekt vs. Asti",
            icon = Icons.Default.AutoAwesome
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                WineComparisonItem(
                    name = if (language == Language.DE) "Champagner (AOC Frankreich)" else "Champagne (AOC France)",
                    details = if (language == Language.DE)
                        "• Rebsorten: Chardonnay, Pinot Noir, Pinot Meunier.\n" +
                        "• Methode: Traditionelle Flaschengärung (Méthode Traditionnelle / Champenoise).\n" +
                        "• Gärung: Zweite Gärung erfolgt in jeder einzelnen Flasche. Mindestens 15 Monate Reife auf der Hefe (Autolyse setzt Mannoproteine frei).\n" +
                        "• Profil: Feinste zarte Perlage (5-6 bar), Noten von warmer Brioche, Hefegebäck und grünem Apfel."
                    else
                        "• Grapes: Chardonnay, Pinot Noir, Pinot Meunier.\n" +
                        "• Method: Traditional In-Bottle Secondary Fermentation.\n" +
                        "• Lees Aging: Minimum 15 months on dead yeast cells (autolysis yields brioche/toasted notes).\n" +
                        "• Profile: Persistent micro-bubbles (5-6 bar), chalk minerality, toasted brioche."
                )

                HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f))

                WineComparisonItem(
                    name = if (language == Language.DE) "Deutscher Sekt & Winzersekt" else "German Sekt & Winzersekt",
                    details = if (language == Language.DE)
                        "• Rebsorten: Häufig Riesling, Weißburgunder oder Spätburgunder.\n" +
                        "• Methode: Standard-Sekt im Drucktank (Charmat) oder Winzersekt in klassischer Flaschengärung (mind. 9 Monate Hefelager).\n" +
                        "• Profil: Lebendige Fruchtsäure, rassig, spritzig, mineralisch frisch."
                    else
                        "• Grapes: Prominently Riesling, Pinot Blanc, or Pinot Noir.\n" +
                        "• Method: Tank or Traditional Bottle Fermentation (Winzersekt min 9 months lees).\n" +
                        "• Profile: Racy natural acidity, crisp stone fruit, vibrant minerality."
                )

                HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f))

                WineComparisonItem(
                    name = if (language == Language.DE) "Asti Spumante DOCG (Piemont, Italien)" else "Asti Spumante DOCG (Piedmont, Italy)",
                    details = if (language == Language.DE)
                        "• Rebsorte: 100% Moscato Bianco (Gelber Muskateller).\n" +
                        "• Methode: Metodo Martinotti (Autoklaven-Drucktank).\n" +
                        "• Das Geheimnis: Die Gärung wird frühzeitig bei ca. 7% bis 9% Vol. durch Kälteschock gestoppt! So bleibt der natürliche Traubenzucker der aromatischen Muskattraube erhalten.\n" +
                        "• Profil: Herrlich süß, blumig, weißer Weinbergpfirsich, Salbei, niedriger Alkohol – der perfekte Dessertbegleiter!"
                    else
                        "• Grape: 100% Moscato Bianco.\n" +
                        "• Method: Martinotti / Charmat pressurized autoclave.\n" +
                        "• The Secret: Fermentation is chilled and arrested at 7-9% ABV, leaving high natural grape sugars unfermented!\n" +
                        "• Profile: Naturally sweet, floral peach, orange blossom, low alcohol."
                )
            }
        }

        // 2. KELTERUNG: WEISSWEIN VS ROTWEIN VS ROSÉ
        WineConceptCard(
            title = if (language == Language.DE) "2. Vinifikation: Woher kommt die Farbe im Wein?" else "2. Vinification: Where Does Wine Color Come From?",
            icon = Icons.Default.LocalDrink
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                Text(
                    text = if (language == Language.DE)
                        "Grundsatz für den Service: Das Fruchtfleisch und der Saft fast aller Weintrauben (auch roter!) ist von Natur aus klar und weiß. Die rote Farbe (Anthocyane) sitzt fast ausschließlich in den Beerenhäuten!"
                    else
                        "Essential Sommelier Rule: The pulp and juice of almost all wine grapes (including red grapes!) is clear and white. Color pigments (anthocyanins) reside exclusively in the skins!",
                    style = MaterialTheme.typography.bodyMedium,
                    fontWeight = FontWeight.SemiBold,
                    color = MaterialTheme.colorScheme.primary
                )

                WineVinificationType(
                    title = if (language == Language.DE) "Weißwein (Direkte Pressung)" else "White Wine (Direct Pressing)",
                    desc = if (language == Language.DE)
                        "Weiße Trauben werden sofort nach der Lerne entrappt und sanft gepresst. Nur der reine Most (ohne Schalen) kommt in den Gärtank. Ergebnis: Klares, helles Farbbild und keine bitteren Tannine."
                    else
                        "Grapes are crushed and immediately pressed off their skins. Only clear juice is fermented without skin contact, yielding no astringent tannins."
                )

                WineVinificationType(
                    title = if (language == Language.DE) "Rotwein (Maischegärung)" else "Red Wine (Maceration on Skins)",
                    desc = if (language == Language.DE)
                        "Rote Trauben werden gequetscht und gären gemeinsam mit ihren Schalen und Kernen (Maische). Durch Alkohol und Wärme lösen sich die roten Farbpigmente und herbe Gerbstoffe (Tannine) aus der Haut."
                    else
                        "Crushed red grapes ferment together with their skins and seeds. Alcohol and warmth dissolve the red pigments and structured grape tannins."
                )

                WineVinificationType(
                    title = if (language == Language.DE) "Roséwein (Kurze Maischestandzeit)" else "Rosé Wine (Short Skin Contact)",
                    desc = if (language == Language.DE)
                        "Wird aus ROTEN Trauben gekeltert! Der Saft bleibt nur für 2 bis 12 Stunden mit den roten Schalen in Kontakt (Maischestandzeit), bis er zart lachsrosa gefärbt ist, und wird dann schnell abgepresst. Das simple Mischen von Weiß- und Rotwein ist in der EU für Qualitäts-Stillwein gesetzlich verboten!"
                    else
                        "Made from RED grapes! Clear juice macerates with skins for merely 2 to 12 hours until a delicate pale salmon pink, then pressed off. Blending finished white and red wine is illegal in the EU for still quality wines!"
                )
            }
        }

        // 3. GROSSE REBSORTEN IM ÜBERBLICK
        WineConceptCard(
            title = if (language == Language.DE) "3. Rebsorten-Kompass & Aromen" else "3. Noble Grape Varieties & Terroir",
            icon = Icons.Default.Star
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                GrapeItem(
                    grape = "Riesling (Weiß)",
                    profile = if (language == Language.DE) "Mosel, Rheingau | Rassige Weinsäure, Schiefermineralik, Pfirsich, im Alter edle Petrolnote (TDN). Aus Riesling-Trauben gekeltert." else "Mosel, Rheingau | Crisp acidity, slate minerality, white peach, aged TDN petrol note."
                )
                GrapeItem(
                    grape = "Sauvignon Blanc (Weiß)",
                    profile = if (language == Language.DE) "Loire, Neuseeland | Grasig-frische Pyrazine, Stachelbeere, Grapefruit, Holunderblüte." else "Loire, Marlborough | Cut grass pyrazines, gooseberry, vibrant grapefruit zest."
                )
                GrapeItem(
                    grape = "Chardonnay (Weiß)",
                    profile = if (language == Language.DE) "Burgund, Chablis | Buttriger Schmelz (Diacetyl durch BSA/Milchsäuregärung), Haselnuss, Barrique-Vanille." else "Burgundy, Chablis | Creamy butter (malolactic diacetyl), toasted brioche, hazelnut oak."
                )
                GrapeItem(
                    grape = "Spätburgunder / Pinot Noir (Rot)",
                    profile = if (language == Language.DE) "Baden, Burgund | Dünnschalig, helles Rubinrot, Sauerkirsche, Himbeere, feines samtiges Tannin, Waldboden." else "Baden, Burgundy | Thin-skinned, pale ruby, sour cherry, forest floor, silky tannins."
                )
                GrapeItem(
                    grape = "Cabernet Sauvignon (Rot)",
                    profile = if (language == Language.DE) "Bordeaux, Napa | Dicke Beerenhaut, kräftige Gerbstoffe (Tannine), Cassis (Schwarze Johannisbeere), Zedernholz." else "Bordeaux, Napa | Thick skins, heavy structured tannins, cassis blackcurrant, cedar wood."
                )
            }
        }

        Spacer(modifier = Modifier.height(80.dp))
    }
}

@Composable
fun WineConceptCard(
    title: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    content: @Composable () -> Unit
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
                    modifier = Modifier.size(22.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurface
                )
            }
            Spacer(modifier = Modifier.height(12.dp))
            content()
        }
    }
}

@Composable
fun WineComparisonItem(name: String, details: String) {
    Column {
        Text(
            text = name,
            style = MaterialTheme.typography.titleSmall,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.primary
        )
        Spacer(modifier = Modifier.height(4.dp))
        Text(
            text = details,
            style = MaterialTheme.typography.bodySmall,
            lineHeight = 20.sp,
            color = MaterialTheme.colorScheme.onSurface
        )
    }
}

@Composable
fun WineVinificationType(title: String, desc: String) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(MaterialTheme.colorScheme.surface, RoundedCornerShape(8.dp))
            .border(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.2f), RoundedCornerShape(8.dp))
            .padding(10.dp)
    ) {
        Text(
            text = title,
            style = MaterialTheme.typography.labelMedium,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.secondary
        )
        Spacer(modifier = Modifier.height(3.dp))
        Text(
            text = desc,
            style = MaterialTheme.typography.bodySmall,
            lineHeight = 18.sp,
            color = MaterialTheme.colorScheme.onSurface
        )
    }
}

@Composable
fun GrapeItem(grape: String, profile: String) {
    Column(modifier = Modifier.padding(vertical = 4.dp)) {
        Text(
            text = grape,
            style = MaterialTheme.typography.labelMedium,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.primary
        )
        Text(
            text = profile,
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
