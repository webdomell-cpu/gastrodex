package com.example.ui.screens

import androidx.compose.foundation.background
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
import androidx.compose.material.icons.filled.LocalBar
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
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import coil.compose.SubcomposeAsyncImage
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
                        text = if (isDe) "Cocktails & Bar-Technik Master Guide" else "Cocktails, Bar Technique & Highballs",
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onPrimaryContainer
                    )
                }
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = if (isDe)
                        "Klassische Bar-Rezepte, Highball-Balance, Eis-Thermodynamik, Rühr- und Schütteltechnik mit fotorealistischen Impressionen für Bartender und Servicekräfte."
                    else
                        "Classic bar recipes, highball balance, ice thermodynamics, stirring & shaking craft with photo inspiration for bartenders and floor staff.",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onPrimaryContainer
                )
            }
        }

        // Section 1: Classic Cocktails with Photos
        Card(
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
                Text(
                    text = if (isDe) "🍹 1. Zeitlose Bar-Klassiker & Rezepturen" else "🍹 1. Timeless Bar Classics & Recipes",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.primary
                )

                // Negroni
                CocktailPhotoRecipeCard(
                    name = "Negroni (IBA Official)",
                    tag = if (isDe) "Gerührt (Stirred)" else "Stirred",
                    imageUrl = "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
                    ingredients = if (isDe) "3 cl Dry Gin, 3 cl Campari (Bitter), 3 cl Vermouth Rosso (Süß)" else "3 cl Dry Gin, 3 cl Campari (Bitter), 3 cl Sweet Red Vermouth",
                    method = if (isDe) "Im Rührglas auf massivem Eis 30 Sekunden kalt rühren, bis das Glas beschlägt. In einen Tumbler mit frischem Eisblock abseihen, mit Orangenzeste abspritzen und garnieren." else "Stir with large ice in a mixing glass for 30s until chilled. Strain into rocks glass over a fresh clear ice block; express orange peel.",
                    isDe = isDe
                )

                // Gin & Tonic
                CocktailPhotoRecipeCard(
                    name = "Gin & Tonic (Highball Standard)",
                    tag = if (isDe) "Gäste-Glas (Built)" else "Built in Glass",
                    imageUrl = "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=80",
                    ingredients = if (isDe) "5 cl Premium Dry Gin, 150–200 ml Tonic Water (gekühlt)" else "5 cl Premium Dry Gin, 150–200 ml Tonic Water (chilled)",
                    method = if (isDe) "Ballonglas oder Highball komplett mit großen Eiswürfeln füllen. Gin eingießen, eiskaltes Tonic vorsichtig über den Barlöffel einfließen lassen (Kohlensäureschutz), einmal sanft anheben. Garnitur: Zitruszeste oder Gurkenscheibe." else "Fill balloon or highball glass with solid ice. Pour gin, gently pour cold tonic water over barspoon to preserve bubbles, lift once. Garnish: Citrus twist or cucumber slice.",
                    isDe = isDe
                )

                // Espresso Martini
                CocktailPhotoRecipeCard(
                    name = "Espresso Martini",
                    tag = if (isDe) "Kräftig geschüttelt" else "Hard Shake",
                    imageUrl = "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&auto=format&fit=crop&q=80",
                    ingredients = if (isDe) "4 cl Vodka, 2 cl Kaffeelikör (Kahlúa), 3 cl frischer Espresso, 1 cl Zuckersirup" else "4 cl Vodka, 2 cl Coffee Liqueur (Kahlúa), 3 cl Fresh Espresso, 1 cl Simple Syrup",
                    method = if (isDe) "Sehr kräftig mit Eis im Shaker schütteln (Hard Shake), um das Kaffeefett zu einer dichten, samtigen Schaumkrone zu emulgieren. Fein in eine vorgekühlte Coupette seihen. Mit 3 Kaffeebohnen garnieren." else "Shake intensely with ice (Hard Shake) to emulsify coffee oils into a thick velvet crema. Fine-strain into chilled coupe. Garnish with 3 coffee beans.",
                    isDe = isDe
                )

                // Moscow Mule
                CocktailPhotoRecipeCard(
                    name = "Moscow Mule",
                    tag = if (isDe) "Kupferbecher" else "Copper Mug",
                    imageUrl = "https://images.unsplash.com/photo-1556881286-fc6915169721?w=800&auto=format&fit=crop&q=80",
                    ingredients = if (isDe) "5 cl Vodka, 2 cl frischer Limettensaft, 150 ml Spicy Ginger Beer" else "5 cl Vodka, 2 cl Fresh Lime Juice, 150 ml Spicy Ginger Beer",
                    method = if (isDe) "Im Kupferbecher auf reichlich Crushed Ice oder Eiswürfeln bauen. Vodka und Limettensaft hinzugeben, mit Ginger Beer auffüllen. Mit Gurkenscheibe und Minzzweig servieren." else "Build in traditional copper mug over ice. Add vodka and lime juice, top with ginger beer. Garnish with cucumber wheel and fresh mint sprig.",
                    isDe = isDe
                )

                // Old Fashioned
                CocktailPhotoRecipeCard(
                    name = "Old Fashioned",
                    tag = if (isDe) "Im Gästeglas gerührt" else "Built & Stirred",
                    imageUrl = "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=800&auto=format&fit=crop&q=80",
                    ingredients = if (isDe) "6 cl Bourbon oder Rye Whiskey, 1 Zuckerwürfel, 2-3 Dashes Angostura Bitters, Spritzer Soda" else "6 cl Bourbon or Rye Whiskey, 1 sugar cube, 2-3 dashes Angostura bitters, dash of soda water",
                    method = if (isDe) "Zuckerwürfel mit Angostura und Spritzer Soda im Tumbler mit Stößel auflösen. Großen Eisblock und Whiskey hinzugeben, 30 Sekunden rühren. Mit Orangenzeste abspritzen." else "Muddle sugar cube with bitters and soda splash in rocks glass until dissolved. Add large ice cube and whiskey, stir gently for 30s. Express orange peel.",
                    isDe = isDe
                )
            }
        }

        // Section 2: Bar Technique & Ice Thermodynamics
        Card(
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = if (isDe) "🧊 2. Eis-Thermodynamik & Bartender-Handwerk" else "🧊 2. Ice Thermodynamics & Bartending Craft",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.primary
                )
                Spacer(modifier = Modifier.height(12.dp))

                // Ice Photo
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(180.dp)
                        .clip(RoundedCornerShape(12.dp))
                ) {
                    SubcomposeAsyncImage(
                        model = "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=800&auto=format&fit=crop&q=80",
                        contentDescription = "Clear Ice",
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.fillMaxSize(),
                        loading = { Box(modifier = Modifier.fillMaxSize().background(MaterialTheme.colorScheme.surfaceVariant)) },
                        error = { Box(modifier = Modifier.fillMaxSize().background(MaterialTheme.colorScheme.surfaceVariant)) }
                    )
                }
                Spacer(modifier = Modifier.height(10.dp))
                Text(
                    text = if (isDe)
                        "• Klare Eisblöcke (Clear Ice): Durch gerichtete Einfrierung entstehen kristallklare Eisblöcke ohne Luftblasen und Kalk. Sie schmelzen bis zu 3x langsamer als hohle Maschineneiswürfel und halten Drinks eiskalt ohne Verwässerung.\n" +
                        "• Glas-Vorkühlung: Gläser vor dem Einschenken im Tiefkühler kühlen oder mit Eiswürfeln vorrühren. Verhindert Temperaturschocks und stabilisiert die Kohlensäure."
                    else
                        "• Directionally Frozen Clear Ice: Directionally frozen clear ice has zero trapped air or minerals. It melts up to 3x slower than hollow machine ice, chilling without dilution.\n" +
                        "• Glass Pre-Chilling: Keep glassware in freezer or stir with ice before pouring. Prevents temperature shock and preserves sparkling carbonation.",
                    style = MaterialTheme.typography.bodySmall,
                    lineHeight = 20.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )

                Spacer(modifier = Modifier.height(14.dp))

                // Stirring Photo
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(180.dp)
                        .clip(RoundedCornerShape(12.dp))
                ) {
                    SubcomposeAsyncImage(
                        model = "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&auto=format&fit=crop&q=80",
                        contentDescription = "Bartender Stirring",
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.fillMaxSize(),
                        loading = { Box(modifier = Modifier.fillMaxSize().background(MaterialTheme.colorScheme.surfaceVariant)) },
                        error = { Box(modifier = Modifier.fillMaxSize().background(MaterialTheme.colorScheme.surfaceVariant)) }
                    )
                }
                Spacer(modifier = Modifier.height(10.dp))
                Text(
                    text = if (isDe) "🥄 Rühren (Stir) vs. Schütteln (Shake)" else "🥄 Stirring vs. Shaking Technique",
                    style = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.primary
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = if (isDe)
                        "• Rühren (Stir): Für reine Spirituosen-Mischungen ohne Zitrussäfte oder Eier (z.B. Negroni, Manhattan, Martini). Erhält die kristallklare, seidenweiche Textur ohne Trübung.\n" +
                        "• Schütteln (Shake): Für Drinks mit Zitrussäften, Eiweiß, Sahne oder Pürees (z.B. Sour, Daiquiri, Espresso Martini). Erzeugt Mikrobelüftung und eine dichte Schaumkrone."
                    else
                        "• Stirring: For spirit-only cocktails without citrus or cream (Negroni, Manhattan, Dry Martini). Preserves diamond clarity and unctuous viscosity.\n" +
                        "• Shaking: For drinks with citrus juices, egg whites, cream, or syrups (Sour, Daiquiri, Espresso Martini). Aerates and creates velvety microfoam.",
                    style = MaterialTheme.typography.bodySmall,
                    lineHeight = 20.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }

        Spacer(modifier = Modifier.height(80.dp))
    }
}

@Composable
private fun CocktailPhotoRecipeCard(
    name: String,
    tag: String,
    imageUrl: String,
    ingredients: String,
    method: String,
    isDe: Boolean
) {
    Card(
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(160.dp)
            ) {
                SubcomposeAsyncImage(
                    model = imageUrl,
                    contentDescription = name,
                    contentScale = ContentScale.Crop,
                    modifier = Modifier.fillMaxSize(),
                    loading = {
                        Box(
                            modifier = Modifier
                                .fillMaxSize()
                                .background(MaterialTheme.colorScheme.surfaceVariant)
                        )
                    },
                    error = {
                        Box(
                            modifier = Modifier
                                .fillMaxSize()
                                .background(MaterialTheme.colorScheme.surfaceVariant)
                        )
                    }
                )
                Surface(
                    shape = RoundedCornerShape(topStart = 0.dp, bottomStart = 8.dp),
                    color = MaterialTheme.colorScheme.surface.copy(alpha = 0.9f),
                    modifier = Modifier.align(Alignment.TopEnd)
                ) {
                    Text(
                        text = tag,
                        style = MaterialTheme.typography.labelSmall,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.primary,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                    )
                }
            }

            Column(modifier = Modifier.padding(14.dp)) {
                Text(
                    text = name,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurface
                )
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = "${if (isDe) "Zutaten:" else "Ingredients:"} $ingredients",
                    style = MaterialTheme.typography.bodySmall,
                    fontWeight = FontWeight.SemiBold,
                    color = MaterialTheme.colorScheme.primary
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = "${if (isDe) "Zubereitung:" else "Method:"} $method",
                    style = MaterialTheme.typography.bodySmall,
                    lineHeight = 18.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}
