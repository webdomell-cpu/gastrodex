package com.example.ui.screens

import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Image
import androidx.compose.material.icons.filled.Remove
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import com.example.model.GastroItem
import com.example.model.Language

@Composable
fun EditItemDialog(
    item: GastroItem,
    language: Language,
    onDismiss: () -> Unit,
    onSave: (GastroItem) -> Unit
) {
    var imageUrl by remember { mutableStateOf(item.imageUrl) }
    var tasteProfile by remember { mutableStateOf(item.tasteProfileDe.ifBlank { item.tasteProfileEn }) }
    var culinaryServing by remember { mutableStateOf(item.culinaryServingDe.ifBlank { item.culinaryServingEn }) }
    var scienceExplained by remember { mutableStateOf(item.scienceExplainedDe.ifBlank { item.scienceExplainedEn }) }
    var guestFaq by remember { mutableStateOf(item.guestFaqDe.ifBlank { item.guestFaqEn }) }
    var allergensText by remember { mutableStateOf(item.allergens.joinToString(", ")) }
    var stockQuantity by remember { mutableIntStateOf(item.stockQuantity) }
    var storageLocation by remember { mutableStateOf(item.storageLocation) }
    var minThreshold by remember { mutableIntStateOf(item.minThreshold) }
    var supplier by remember { mutableStateOf(item.supplier) }
    var costPrice by remember { mutableStateOf(item.costPrice) }
    var userNotes by remember { mutableStateOf(item.userNotes) }

    val scrollState = rememberScrollState()

    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text(
                text = if (language == Language.DE)
                    "Eintrag bearbeiten & Lager pflegen"
                else
                    "Edit Item & Stock Management",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold
            )
        },
        text = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .verticalScroll(scrollState),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                // Item Header Preview
                Text(
                    text = item.localizedName(language),
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.primary
                )

                // Photo Preview & Photo URL replacement
                Card(
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
                ) {
                    Column(modifier = Modifier.padding(10.dp)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(imageVector = Icons.Default.Image, contentDescription = null, tint = MaterialTheme.colorScheme.primary)
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = if (language == Language.DE) "Foto tauschen / Bild-URL" else "Change Photo / Image URL",
                                style = MaterialTheme.typography.labelMedium,
                                fontWeight = FontWeight.Bold
                            )
                        }
                        Spacer(modifier = Modifier.height(8.dp))

                        // Live preview
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(120.dp)
                                .clip(RoundedCornerShape(8.dp))
                                .border(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.3f), RoundedCornerShape(8.dp))
                        ) {
                            AsyncImage(
                                model = imageUrl,
                                contentDescription = "Preview",
                                contentScale = ContentScale.Crop,
                                modifier = Modifier.fillMaxWidth()
                            )
                        }

                        Spacer(modifier = Modifier.height(8.dp))

                        OutlinedTextField(
                            value = imageUrl,
                            onValueChange = { imageUrl = it },
                            label = { Text(if (language == Language.DE) "Bild-URL (z.B. Unsplash oder Web-Link)" else "Photo URL") },
                            singleLine = true,
                            modifier = Modifier.fillMaxWidth().testTag("edit_image_url_input")
                        )
                    }
                }

                // LAGERBESTAND & STÜCKZAHL PFLEGEN
                Card(
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
                ) {
                    Column(modifier = Modifier.padding(10.dp)) {
                        Text(
                            text = if (language == Language.DE) "Lagerbestand & Zählung" else "Stock Quantity & Counter",
                            style = MaterialTheme.typography.labelMedium,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.height(8.dp))

                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = if (language == Language.DE) "Aktueller Bestand (Flaschen / Packungen):" else "Current Stock Count:",
                                style = MaterialTheme.typography.bodySmall,
                                modifier = Modifier.weight(1f)
                            )

                            Row(verticalAlignment = Alignment.CenterVertically) {
                                IconButton(
                                    onClick = { if (stockQuantity > 0) stockQuantity-- },
                                    modifier = Modifier.size(36.dp)
                                ) {
                                    Icon(imageVector = Icons.Default.Remove, contentDescription = "Minus")
                                }

                                Surface(
                                    shape = RoundedCornerShape(6.dp),
                                    color = MaterialTheme.colorScheme.primaryContainer,
                                    modifier = Modifier.padding(horizontal = 6.dp)
                                ) {
                                    Text(
                                        text = stockQuantity.toString(),
                                        fontWeight = FontWeight.Bold,
                                        style = MaterialTheme.typography.titleMedium,
                                        modifier = Modifier.padding(horizontal = 12.dp, vertical = 4.dp)
                                    )
                                }

                                IconButton(
                                    onClick = { stockQuantity++ },
                                    modifier = Modifier.size(36.dp)
                                ) {
                                    Icon(imageVector = Icons.Default.Add, contentDescription = "Plus")
                                }
                            }
                        }

                        Spacer(modifier = Modifier.height(8.dp))

                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            OutlinedTextField(
                                value = storageLocation,
                                onValueChange = { storageLocation = it },
                                label = { Text(if (language == Language.DE) "Lagerort (z.B. Bar-Regal B)" else "Storage Location") },
                                singleLine = true,
                                modifier = Modifier.weight(1.2f)
                            )

                            OutlinedTextField(
                                value = costPrice,
                                onValueChange = { costPrice = it },
                                label = { Text(if (language == Language.DE) "EK / Preis" else "Cost") },
                                singleLine = true,
                                modifier = Modifier.weight(0.8f)
                            )
                        }

                        Spacer(modifier = Modifier.height(8.dp))

                        OutlinedTextField(
                            value = supplier,
                            onValueChange = { supplier = it },
                            label = { Text(if (language == Language.DE) "Lieferant / Bezugsquelle" else "Supplier") },
                            singleLine = true,
                            modifier = Modifier.fillMaxWidth()
                        )
                    }
                }

                // Gastronomische Fachdaten & Wissen
                Card(
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
                ) {
                    Column(modifier = Modifier.padding(10.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        Text(
                            text = if (language == Language.DE) "Gastronomische Inhalte & Sensorik" else "Culinary & Tasting Information",
                            style = MaterialTheme.typography.labelMedium,
                            fontWeight = FontWeight.Bold
                        )

                        OutlinedTextField(
                            value = tasteProfile,
                            onValueChange = { tasteProfile = it },
                            label = { Text(if (language == Language.DE) "Sensorik & Geschmacksprofil" else "Tasting Notes") },
                            modifier = Modifier.fillMaxWidth()
                        )

                        OutlinedTextField(
                            value = culinaryServing,
                            onValueChange = { culinaryServing = it },
                            label = { Text(if (language == Language.DE) "Servierempfehlung & Speisenbegleitung" else "Service & Pairing") },
                            modifier = Modifier.fillMaxWidth()
                        )

                        OutlinedTextField(
                            value = scienceExplained,
                            onValueChange = { scienceExplained = it },
                            label = { Text(if (language == Language.DE) "Wissenschaft & Herstellung" else "Science & Production") },
                            modifier = Modifier.fillMaxWidth()
                        )

                        OutlinedTextField(
                            value = guestFaq,
                            onValueChange = { guestFaq = it },
                            label = { Text(if (language == Language.DE) "Gastfragen souverän beantworten" else "Guest FAQ") },
                            modifier = Modifier.fillMaxWidth()
                        )

                        OutlinedTextField(
                            value = allergensText,
                            onValueChange = { allergensText = it },
                            label = { Text(if (language == Language.DE) "Allergene (z.B. Gluten, Laktose)" else "Allergens") },
                            modifier = Modifier.fillMaxWidth()
                        )
                    }
                }

                // Interne Notizen
                OutlinedTextField(
                    value = userNotes,
                    onValueChange = { userNotes = it },
                    label = { Text(if (language == Language.DE) "Team- & Servicenotizen" else "Staff Notes") },
                    minLines = 2,
                    modifier = Modifier.fillMaxWidth()
                )
            }
        },
        confirmButton = {
            Button(
                onClick = {
                    val allgList = allergensText.split(",").map { it.trim() }.filter { it.isNotBlank() }
                    val updated = item.copy(
                        imageUrl = imageUrl.ifBlank { item.imageUrl },
                        tasteProfileDe = if (language == Language.DE) tasteProfile else item.tasteProfileDe,
                        tasteProfileEn = if (language == Language.EN) tasteProfile else item.tasteProfileEn,
                        culinaryServingDe = if (language == Language.DE) culinaryServing else item.culinaryServingDe,
                        culinaryServingEn = if (language == Language.EN) culinaryServing else item.culinaryServingEn,
                        scienceExplainedDe = if (language == Language.DE) scienceExplained else item.scienceExplainedDe,
                        scienceExplainedEn = if (language == Language.EN) scienceExplained else item.scienceExplainedEn,
                        guestFaqDe = if (language == Language.DE) guestFaq else item.guestFaqDe,
                        guestFaqEn = if (language == Language.EN) guestFaq else item.guestFaqEn,
                        allergens = allgList,
                        inStock = stockQuantity > 0,
                        stockQuantity = stockQuantity,
                        storageLocation = storageLocation,
                        minThreshold = minThreshold,
                        supplier = supplier,
                        costPrice = costPrice,
                        userNotes = userNotes
                    )
                    onSave(updated)
                },
                colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary),
                modifier = Modifier.testTag("save_edit_item_btn")
            ) {
                Text(if (language == Language.DE) "Änderungen speichern" else "Save Changes")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text(if (language == Language.DE) "Abbrechen" else "Cancel")
            }
        }
    )
}
