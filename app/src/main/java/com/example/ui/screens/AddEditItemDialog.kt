package com.example.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Checkbox
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.model.AlcoholProductionType
import com.example.model.GastroCategory
import com.example.model.GastroItem
import com.example.model.Language
import java.util.UUID

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AddEditItemDialog(
    language: Language,
    onDismiss: () -> Unit,
    onSave: (GastroItem) -> Unit
) {
    var nameEn by remember { mutableStateOf("") }
    var nameDe by remember { mutableStateOf("") }
    var subtitleEn by remember { mutableStateOf("") }
    var subtitleDe by remember { mutableStateOf("") }
    var category by remember { mutableStateOf<GastroCategory>(GastroCategory.SPIRITS) }
    var origin by remember { mutableStateOf("") }
    var isImport by remember { mutableStateOf(false) }
    var process by remember { mutableStateOf(AlcoholProductionType.DISTILLATION) }
    var rawMaterial by remember { mutableStateOf("") }
    var abv by remember { mutableStateOf("40% ABV") }
    var imageUrl by remember { mutableStateOf("https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800") }
    var tasteProfile by remember { mutableStateOf("") }
    var culinaryServing by remember { mutableStateOf("") }
    var scienceExplained by remember { mutableStateOf("") }
    var guestFaq by remember { mutableStateOf("") }
    var allergensText by remember { mutableStateOf("") }
    var inStock by remember { mutableStateOf(true) }

    var categoryExpanded by remember { mutableStateOf(false) }
    var processExpanded by remember { mutableStateOf(false) }

    val scrollState = rememberScrollState()

    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text(
                text = if (language == Language.DE) "Eigenen Bar- / Kücheneintrag anlegen" else "Add Custom Beverage / Item",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold
            )
        },
        text = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .verticalScroll(scrollState),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                // Name DE / EN
                OutlinedTextField(
                    value = nameDe,
                    onValueChange = { nameDe = it },
                    label = { Text(if (language == Language.DE) "Name (z.B. Haus-Gin 'Black Forest')" else "Name (German / Local)") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth().testTag("add_input_name_de")
                )

                OutlinedTextField(
                    value = nameEn,
                    onValueChange = { nameEn = it },
                    label = { Text(if (language == Language.DE) "Name auf Englisch" else "Name (English)") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth().testTag("add_input_name_en")
                )

                // Category selector
                ExposedDropdownMenuBox(
                    expanded = categoryExpanded,
                    onExpandedChange = { categoryExpanded = it }
                ) {
                    OutlinedTextField(
                        value = if (language == Language.DE) category.titleDe else category.titleEn,
                        onValueChange = {},
                        readOnly = true,
                        label = { Text(if (language == Language.DE) "Kategorie" else "Category") },
                        trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = categoryExpanded) },
                        modifier = Modifier.menuAnchor().fillMaxWidth()
                    )
                    ExposedDropdownMenu(
                        expanded = categoryExpanded,
                        onDismissRequest = { categoryExpanded = false }
                    ) {
                        GastroCategory.entries.filter { it != GastroCategory.ALL }.forEach { cat ->
                            DropdownMenuItem(
                                text = { Text(if (language == Language.DE) cat.titleDe else cat.titleEn) },
                                onClick = {
                                    category = cat
                                    categoryExpanded = false
                                }
                            )
                        }
                    }
                }

                // Subtitle
                OutlinedTextField(
                    value = subtitleDe,
                    onValueChange = { subtitleDe = it },
                    label = { Text(if (language == Language.DE) "Kurzbeschreibung (z.B. 12 Jahre im Portweinfass)" else "Subtitle / Brief desc") },
                    modifier = Modifier.fillMaxWidth()
                )

                // Origin
                OutlinedTextField(
                    value = origin,
                    onValueChange = { origin = it },
                    label = { Text(if (language == Language.DE) "Herkunft (Region / Land)" else "Origin (Region / Country)") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth()
                )

                // Process selector
                ExposedDropdownMenuBox(
                    expanded = processExpanded,
                    onExpandedChange = { processExpanded = it }
                ) {
                    OutlinedTextField(
                        value = if (language == Language.DE) process.titleDe else process.titleEn,
                        onValueChange = {},
                        readOnly = true,
                        label = { Text(if (language == Language.DE) "Herstellungsverfahren" else "Production Process") },
                        trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = processExpanded) },
                        modifier = Modifier.menuAnchor().fillMaxWidth()
                    )
                    ExposedDropdownMenu(
                        expanded = processExpanded,
                        onDismissRequest = { processExpanded = false }
                    ) {
                        AlcoholProductionType.entries.forEach { p ->
                            DropdownMenuItem(
                                text = { Text(if (language == Language.DE) p.titleDe else p.titleEn) },
                                onClick = {
                                    process = p
                                    processExpanded = false
                                }
                            )
                        }
                    }
                }

                // ABV & Raw material
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    OutlinedTextField(
                        value = abv,
                        onValueChange = { abv = it },
                        label = { Text("ABV / Vol.%") },
                        singleLine = true,
                        modifier = Modifier.weight(1f)
                    )
                    OutlinedTextField(
                        value = rawMaterial,
                        onValueChange = { rawMaterial = it },
                        label = { Text(if (language == Language.DE) "Rohstoff/Pflanze" else "Base plant") },
                        singleLine = true,
                        modifier = Modifier.weight(1.5f)
                    )
                }

                // Taste notes
                OutlinedTextField(
                    value = tasteProfile,
                    onValueChange = { tasteProfile = it },
                    label = { Text(if (language == Language.DE) "Geschmacksprofil / Sensorik" else "Tasting notes & sensoric") },
                    modifier = Modifier.fillMaxWidth()
                )

                // Servierempfehlung
                OutlinedTextField(
                    value = culinaryServing,
                    onValueChange = { culinaryServing = it },
                    label = { Text(if (language == Language.DE) "Servierempfehlung & Speisenbegleitung" else "Serving & culinary pairing") },
                    modifier = Modifier.fillMaxWidth()
                )

                // Wissenschaft & Herstellung
                OutlinedTextField(
                    value = scienceExplained,
                    onValueChange = { scienceExplained = it },
                    label = { Text(if (language == Language.DE) "Wissenschaft & Herstellungs-Erklärung" else "Science & production breakdown") },
                    modifier = Modifier.fillMaxWidth()
                )

                // Guest FAQ
                OutlinedTextField(
                    value = guestFaq,
                    onValueChange = { guestFaq = it },
                    label = { Text(if (language == Language.DE) "Gastfragen souverän beantworten / FAQ" else "How staff explains to guests / FAQ") },
                    modifier = Modifier.fillMaxWidth()
                )

                // Allergens
                OutlinedTextField(
                    value = allergensText,
                    onValueChange = { allergensText = it },
                    label = { Text(if (language == Language.DE) "Allergene (z.B. Gluten, Laktose)" else "Allergens (comma separated)") },
                    modifier = Modifier.fillMaxWidth()
                )

                // Image URL
                OutlinedTextField(
                    value = imageUrl,
                    onValueChange = { imageUrl = it },
                    label = { Text(if (language == Language.DE) "Bild-URL (Foto)" else "Image URL") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth()
                )

                // Checkboxes
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Checkbox(checked = isImport, onCheckedChange = { isImport = it })
                    Text(
                        text = if (language == Language.DE) "Ist ein Importprodukt (nicht regional)" else "Is an imported product (not regional)",
                        style = MaterialTheme.typography.bodySmall
                    )
                }

                Row(verticalAlignment = Alignment.CenterVertically) {
                    Checkbox(checked = inStock, onCheckedChange = { inStock = it })
                    Text(
                        text = if (language == Language.DE) "Sofort als 'Auf Lager' markieren" else "Mark as 'In Stock' immediately",
                        style = MaterialTheme.typography.bodySmall
                    )
                }
            }
        },
        confirmButton = {
            Button(
                onClick = {
                    val finalNameEn = nameEn.ifBlank { nameDe.ifBlank { "House Selection" } }
                    val finalNameDe = nameDe.ifBlank { finalNameEn }
                    val allergensList = allergensText.split(",").map { it.trim() }.filter { it.isNotBlank() }
                    val newItem = GastroItem(
                        id = "custom_" + UUID.randomUUID().toString().take(8),
                        category = category,
                        nameEn = finalNameEn,
                        nameDe = finalNameDe,
                        subtitleEn = subtitleEn.ifBlank { subtitleDe.ifBlank { "Custom house product" } },
                        subtitleDe = subtitleDe.ifBlank { subtitleEn.ifBlank { "Eigener Haus-Eintrag" } },
                        imageUrl = imageUrl.ifBlank { "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800" },
                        origin = origin.ifBlank { if (language == Language.DE) "Eigenabfüllung" else "House Selection" },
                        isImport = isImport,
                        alcoholProcess = process,
                        rawMaterialEn = rawMaterial.ifBlank { "House ingredients" },
                        rawMaterialDe = rawMaterial.ifBlank { "Hauseigene Zutaten" },
                        abv = abv,
                        tasteProfileEn = tasteProfile.ifBlank { "Custom tasting profile" },
                        tasteProfileDe = tasteProfile.ifBlank { "Eigenes Geschmacksprofil" },
                        scienceExplainedEn = scienceExplained.ifBlank { "House preparation according to traditional gastronomy standards." },
                        scienceExplainedDe = scienceExplained.ifBlank { "Hauseigene Zubereitung nach traditionellen Gastronomiemethoden." },
                        culinaryServingEn = culinaryServing.ifBlank { "Serve according to house recipe." },
                        culinaryServingDe = culinaryServing.ifBlank { "Nach Hausrezeptur im passenden Glas servieren." },
                        guestFaqEn = guestFaq.ifBlank { "Our exclusive house specialty, curated for your experience." },
                        guestFaqDe = guestFaq.ifBlank { "Unsere exklusive Hausspezialität, speziell für unsere Gäste ausgewählt." },
                        allergens = allergensList,
                        tags = listOf("Custom", "HouseSpecial", category.titleEn),
                        inStock = inStock,
                        isCustom = true
                    )
                    onSave(newItem)
                },
                colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary),
                modifier = Modifier.testTag("save_custom_item_btn")
            ) {
                Text(if (language == Language.DE) "Speichern" else "Save Item")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text(if (language == Language.DE) "Abbrechen" else "Cancel")
            }
        }
    )
}
