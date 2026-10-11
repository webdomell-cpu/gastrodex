package com.example.ui.screens

import androidx.compose.foundation.layout.Arrangement
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
import androidx.compose.material.icons.filled.LocalBar
import androidx.compose.material.icons.filled.Star
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
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.model.Language
import com.example.ui.GastroViewModel

@Composable
fun CocktailsGuideScreen(
    viewModel: GastroViewModel,
    modifier: Modifier = Modifier
) {
    val language by viewModel.language.collectAsStateWithLifecycle()
    val isDe = (language == Language.DE)
    val scrollState = rememberScrollState()

    Column(
        modifier = modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp)
            .testTag("cocktails_guide_screen"),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Hero Card
        Surface(
            shape = RoundedCornerShape(16.dp),
            color = MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.7f),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.LocalBar,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.primary,
                        modifier = Modifier.size(28.dp)
                    )
                    Spacer(modifier = Modifier.width(10.dp))
                    Text(
                        text = if (isDe) "Cocktails & Longdrinks Master Guide" else "Cocktails & Longdrinks Master Guide",
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onPrimaryContainer
                    )
                }
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = if (isDe)
                        "Klassische Barkunst, Highballs, Sours, Ice-Dilution, Rühr- und Schütteltechnik für professionelle Bars."
                    else
                        "Classic barcraft, highballs, sours, ice dilution, stirring and shaking techniques for professional bars.",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onPrimaryContainer
                )
            }
        }

        // Section 1: Classic Cocktails (Negroni, Old Fashioned, Daiquiri)
        CocktailSectionCard(
            title = if (isDe) "1. Unvergessliche Bar-Klassiker & Rezepte" else "1. Timeless Bar Classics & Recipes",
            subtitle = if (isDe) "Die Goldene Formel für Negroni, Old Fashioned & Dry Martini" else "The Golden Ratio for Negroni, Old Fashioned & Dry Martini"
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                RecipeItem(
                    name = "Negroni",
                    ingredients = if (isDe) "3 cl Gin, 3 cl Campari, 3 cl Vermouth Rosso" else "3 cl Gin, 3 cl Campari, 3 cl Sweet Vermouth",
                    method = if (isDe) "Auf Eis rühren, in Tumbler mit Orangenzeste abseihen." else "Stir with ice, strain into rocks glass with orange zest."
                )
                HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
                RecipeItem(
                    name = "Old Fashioned",
                    ingredients = if (isDe) "6 cl Bourbon/Rye, 1 Würfelzucker, 2 Spritzer Angostura, Sodaspritzer" else "6 cl Bourbon/Rye, 1 sugar cube, 2 dashes Angostura, soda splash",
                    method = if (isDe) "Zucker mit Angostura im Glas lösen, Eis und Whiskey dazugeben, rühren." else "Muddle sugar and bitters, add ice and whiskey, stir gently."
                )
                HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
                RecipeItem(
                    name = "Daiquiri",
                    ingredients = if (isDe) "6 cl Weißer Rum, 3 cl Limettensaft, 2 cl Zuckersirup" else "6 cl White Rum, 3 cl Fresh Lime Juice, 2 cl Simple Syrup",
                    method = if (isDe) "Mit viel Eis kräftig shaken, in vorgekühlte Cocktailschale abseihen." else "Shake vigorously with ice, double strain into chilled coupe."
                )
            }
        }

        // Section 2: Technique (Shaken vs. Stirred, Dilution)
        CocktailSectionCard(
            title = if (isDe) "2. Barkultur: Shaken vs. Rühren (Stirring)" else "2. Barcraft: Shaken vs. Stirred",
            subtitle = if (isDe) "Wann man schüttelt und wann man rührt" else "When to shake and when to stir"
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text(
                    text = if (isDe) "• Shaken (Schütteln): Wird bei Cocktails angewendet, die Zitussaft, Eigelb, Sahne oder Fruchtpüree enthalten. Es kühlt extrem schnell herunter, belüftet das Getränk (feiner Schaum) und erzeugt die notwendige Verwässerung (ca. 20-30% Eiswasser-Aufnahme)." else "• Shaking: Used for drinks containing citrus juice, egg, cream, or syrup. Aerates the drink, chills rapidly, and provides ideal dilution.",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurface
                )
                Text(
                    text = if (isDe) "• Stirring (Rühren): Wird ausschließlich bei klaren Spirituosendrinks angewendet (z.B. Negroni, Martini, Manhattan). Es verhindert Trübung, erhält die samtige Viskosität und kühlt seidig herunter." else "• Stirring: Used exclusively for spirit-forward drinks (Negroni, Martini, Manhattan). Preserves silky viscosity and clarity without over-aerating.",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurface
                )
            }
        }
    }
}

@Composable
fun CocktailSectionCard(
    title: String,
    subtitle: String,
    content: @Composable () -> Unit
) {
    Card(
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = title,
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.primary
            )
            Spacer(modifier = Modifier.height(2.dp))
            Text(
                text = subtitle,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Spacer(modifier = Modifier.height(12.dp))
            content()
        }
    }
}

@Composable
fun RecipeItem(
    name: String,
    ingredients: String,
    method: String
) {
    Column {
        Text(
            text = name,
            style = MaterialTheme.typography.titleSmall,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onSurface
        )
        Spacer(modifier = Modifier.height(2.dp))
        Text(
            text = "Zutaten: $ingredients",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Text(
            text = "Zubereitung: $method",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurface
        )
    }
}
