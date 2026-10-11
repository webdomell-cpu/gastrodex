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
import androidx.compose.material.icons.filled.DesignServices
import androidx.compose.material.icons.filled.RestaurantMenu
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
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.model.Language
import com.example.ui.GastroViewModel

@Composable
fun ServiceCultureScreen(
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
                        imageVector = Icons.Default.DesignServices,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.tertiary,
                        modifier = Modifier.size(28.dp)
                    )
                    Spacer(modifier = Modifier.width(10.dp))
                    Text(
                        text = if (isDe) "Service & Tischkultur Master Guide" else "Service & Table Culture Guide",
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onTertiaryContainer
                    )
                }
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = if (isDe)
                        "Professionelle Tisch-Eindeckung, Besteckkunde, Serviettenfalttechniken, HACCP-Hygienestandards und Gastronomie-Etikette."
                    else
                        "Professional table settings, cutlery etiquette, napkin folding, HACCP hygiene standards and hospitality etiquette.",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onTertiaryContainer
                )
            }
        }

        ServiceSectionCard(
            title = if (isDe) "1. Professionelle Tisch-Eindeckung" else "1. Professional Table Settings",
            subtitle = if (isDe) "A-la-carte, Gala und Frühstücks-Cover" else "A la carte, Gala and Breakfast covers"
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text(
                    text = if (isDe) "• Grundregel: Der Abstand zum Tischrand beträgt genormte 1-2 cm (zwei Daumenbreiten). Besteck wird von außen nach innen zum Teller hin genutzt." else "• Rule of thumb: Cutlery is placed 1-2 cm from table edge and used from outside in.",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurface
                )
                Text(
                    text = if (isDe) "• Glas-Anordnung: Das Wasserglas steht über der Hauptmesserspitze; Weindegustationsgläser ordnen sich schräg rechts darunter an." else "• Glassware: Water goblet at tip of main knife; wine glasses aligned diagonally to the right.",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurface
                )
            }
        }

        ServiceSectionCard(
            title = if (isDe) "2. Serviettenfalttechnik & Hygiene" else "2. Napkin Folding & Hygiene",
            subtitle = if (isDe) "Saubere Faltkunst und Keimfreiheit" else "Sanitary folding and table architecture"
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text(
                    text = if (isDe) "• Hygieneregel: Stoffservietten im Profiservice nur mit frisch gewaschenen/desinfizierten Händen oder Handschuhen falten. Berührungsflächen für das Gesicht des Gastes bleiben geschützt." else "• Hygiene rule: Cloth napkins must be handled with freshly sanitized hands.",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurface
                )
                Text(
                    text = if (isDe) "• Platzierung: Zentriert auf dem Platzteller, im Wasserglas stehend oder als Bestecktasche." else "• Placement: Centered on charger plate or tucked neatly as a cutlery pouch.",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurface
                )
            }
        }

        ServiceSectionCard(
            title = if (isDe) "3. Besteck-, Gläserkunde & Vorlegeregeln" else "3. Cutlery & Serving Utensil Etiquette",
            subtitle = if (isDe) "Strikte Vermeidung von Kreuzkontamination" else "Zero cross-contamination rules"
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text(
                    text = if (isDe) "• Vorlegebesteck: Jedes Gericht hat sein eigenes Vorlegebesteck (Salatzange, Suppenschöpfer, Tortenheber). Niemals Vorlegebesteck kreuz und quer tauschen (z.B. keine Salatgabeln für Joghurt), um Allergenverschleppung auszuschließen." else "• Serving tools: Each dish requires its dedicated serving tool to prevent allergen transfer.",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurface
                )
            }
        }

        ServiceSectionCard(
            title = if (isDe) "4. Präsentations- und Service-Etikette" else "4. Service Etiquette Standards",
            subtitle = if (isDe) "Servieren von rechts, Abräumen von links" else "Serving right, clearing left"
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text(
                    text = if (isDe) "• Service-Mechanik: Speisen werden von rechts serviert und von links abgeräumt. Wein wird stets von rechts eingeschenkt, wobei das Etikett zum Gast zeigt." else "• Service mechanics: Food is served from the right and cleared from the left. Wine is poured from the right with labels facing the table.",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurface
                )
            }
        }
    }
}

@Composable
fun ServiceSectionCard(
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
                color = MaterialTheme.colorScheme.tertiary
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
