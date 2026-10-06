package com.example.ui.theme

import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext

// Warm Hospitality Light Color Scheme (GastroDex Primary Theme)
private val GastroDexLightColorScheme = lightColorScheme(
    primary = TerracottaPrimary,
    onPrimary = TerracottaOnPrimary,
    primaryContainer = TerracottaContainer,
    onPrimaryContainer = TerracottaOnContainer,

    secondary = SageGreenSecondary,
    onSecondary = SageGreenOnSecondary,
    secondaryContainer = SageGreenContainer,
    onSecondaryContainer = SageGreenOnContainer,

    tertiary = SafranAccent,
    onTertiary = TerracottaOnPrimary,
    tertiaryContainer = SafranContainer,
    onTertiaryContainer = SafranOnContainer,

    background = WarmSandBackground,
    onBackground = DeepAnthraciteText,

    surface = PureCardWhite,
    onSurface = DeepAnthraciteText,

    surfaceVariant = WarmSandSurfaceVariant,
    onSurfaceVariant = WarmSlateText,

    outline = SoftWarmOutline,
    outlineVariant = SoftWarmOutline
)

// Dark fallback scheme tuned with warm terracotta & sage green accents
private val GastroDexDarkColorScheme = darkColorScheme(
    primary = TerracottaPrimary,
    onPrimary = TerracottaOnPrimary,
    primaryContainer = TerracottaOnContainer,
    onPrimaryContainer = TerracottaContainer,

    secondary = SageGreenSecondary,
    onSecondary = SageGreenOnSecondary,
    secondaryContainer = SageGreenOnContainer,
    onSecondaryContainer = SageGreenContainer,

    tertiary = SafranAccent,
    onTertiary = TerracottaOnPrimary,

    background = Color(0xFF161412),
    onBackground = Color(0xFFF0ECE8),

    surface = Color(0xFF1E1B18),
    onSurface = Color(0xFFF0ECE8),

    surfaceVariant = Color(0xFF2B2622),
    onSurfaceVariant = Color(0xFFD4CDC5),

    outline = Color(0xFF4C433C)
)

@Composable
fun MyApplicationTheme(
    darkTheme: Boolean = false, // Default to Warm Hospitality Light Mode as requested
    dynamicColor: Boolean = false, // Keep handcrafted GastroDex brand identity
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) GastroDexDarkColorScheme else GastroDexLightColorScheme

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
