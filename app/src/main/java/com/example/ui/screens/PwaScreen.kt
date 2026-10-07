package com.example.ui.screens

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.view.ViewGroup
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.compose.BackHandler
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
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Build
import androidx.compose.material.icons.filled.Language
import androidx.compose.material.icons.filled.Public
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Share
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilledTonalButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import com.example.model.Language

@Composable
fun PwaInfoDialog(
    language: Language,
    onDismiss: () -> Unit,
    onOpenInAppWebView: (url: String) -> Unit
) {
    val context = LocalContext.current
    val isDe = (language == Language.DE)

    AlertDialog(
        onDismissRequest = onDismiss,
        icon = {
            Icon(
                imageVector = Icons.Default.Public,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.primary,
                modifier = Modifier.size(36.dp)
            )
        },
        title = {
            Text(
                text = if (isDe) "🌐 Web & CMS-Zentrale" else "🌐 Web & CMS Hub",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )
        },
        text = {
            Column(
                modifier = Modifier.fillMaxWidth(),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                Text(
                    text = if (isDe)
                        "GastroDex steht dir als native Android-App, als Progressive Web App (PWA) für jedes Endgerät und als Web-Admin CMS zur Verfügung. Über das CMS kannst du neue Artikel anlegen, bearbeiten und synchronisieren!"
                    else
                        "GastroDex is available as a native Android app, a cross-platform Progressive Web App (PWA), and a Web Admin CMS to create, edit, and sync catalog items!",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )

                Card(
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
                ) {
                    Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                        Text(
                            text = if (isDe) "✨ Web-Funktionen:" else "✨ Web Features:",
                            style = MaterialTheme.typography.labelMedium,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.primary
                        )
                        val highlightsText = if (isDe) {
                            "• PWA App: Vollständiges Lexikon & 10-Fragen-Quiz im Browser\n• Web Admin CMS: Neue Artikel hinzufügen, Daten als JSON exportieren & bearbeiten\n• Offline-Fähigkeit durch Service Worker"
                        } else {
                            "• PWA App: Full encyclopedia & 10-question quiz in browser\n• Web Admin CMS: Add new items, export JSON & edit catalog\n• Offline ready with Service Worker"
                        }
                        Text(
                            text = highlightsText,
                            style = MaterialTheme.typography.bodySmall
                        )
                    }
                }
            }
        },
        confirmButton = {
            Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                Button(
                    onClick = { onOpenInAppWebView("file:///android_asset/pwa/index.html") },
                    colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary),
                    modifier = Modifier.fillMaxWidth().testTag("open_pwa_webview_btn")
                ) {
                    Icon(Icons.Default.Language, contentDescription = null, modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(if (isDe) "📱 PWA App öffnen" else "Open PWA App")
                }
                FilledTonalButton(
                    onClick = { onOpenInAppWebView("file:///android_asset/pwa/admin.html") },
                    modifier = Modifier.fillMaxWidth().testTag("open_admin_webview_btn")
                ) {
                    Icon(Icons.Default.Build, contentDescription = null, modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(if (isDe) "🛠️ Web Admin (CMS) öffnen" else "Open Web Admin (CMS)")
                }
            }
        },
        dismissButton = {
            Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                OutlinedButton(
                    onClick = {
                        sharePwaInstructions(context, isDe)
                    }
                ) {
                    Icon(Icons.Default.Share, contentDescription = null, modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(if (isDe) "Teilen" else "Share")
                }
                TextButton(onClick = onDismiss) {
                    Text(if (isDe) "Schließen" else "Close")
                }
            }
        }
    )
}

@OptIn(ExperimentalMaterial3Api::class)
@SuppressLint("SetJavaScriptEnabled")
@Composable
fun PwaWebViewScreen(
    language: Language,
    initialUrl: String = "file:///android_asset/pwa/index.html",
    onBack: () -> Unit
) {
    var webViewInstance by remember { mutableStateOf<WebView?>(null) }
    var currentUrl by remember { mutableStateOf(initialUrl) }
    val isAdmin = currentUrl.contains("admin.html")

    BackHandler {
        if (webViewInstance?.canGoBack() == true) {
            webViewInstance?.goBack()
        } else {
            onBack()
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(
                            text = if (isAdmin) "GastroDex Web Admin CMS" else "GastroDex Web / PWA",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.primary
                        )
                        Text(
                            text = if (language == Language.DE)
                                (if (isAdmin) "Datenbankverwaltung & Artikel-Editor" else "In-App PWA Vorschau")
                            else
                                (if (isAdmin) "Database & Item Manager" else "In-App PWA Preview"),
                            style = MaterialTheme.typography.labelSmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(
                            imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = "Back"
                        )
                    }
                },
                actions = {
                    // Quick toggle between App and Admin
                    if (!isAdmin) {
                        TextButton(onClick = {
                            currentUrl = "file:///android_asset/pwa/admin.html"
                            webViewInstance?.loadUrl(currentUrl)
                        }) {
                            Text("🛠️ CMS")
                        }
                    } else {
                        TextButton(onClick = {
                            currentUrl = "file:///android_asset/pwa/index.html"
                            webViewInstance?.loadUrl(currentUrl)
                        }) {
                            Text("📱 App")
                        }
                    }

                    // Reload button
                    IconButton(onClick = { webViewInstance?.reload() }) {
                        Icon(
                            imageVector = Icons.Default.Refresh,
                            contentDescription = "Reload",
                            tint = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.surface
                )
            )
        }
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            AndroidView(
                factory = { context ->
                    WebView(context).apply {
                        layoutParams = ViewGroup.LayoutParams(
                            ViewGroup.LayoutParams.MATCH_PARENT,
                            ViewGroup.LayoutParams.MATCH_PARENT
                        )
                        settings.javaScriptEnabled = true
                        settings.domStorageEnabled = true
                        settings.allowFileAccess = true
                        settings.allowContentAccess = true
                        webViewClient = object : WebViewClient() {
                            override fun onPageFinished(view: WebView?, url: String?) {
                                super.onPageFinished(view, url)
                                if (url != null) {
                                    currentUrl = url
                                }
                            }
                        }
                        webChromeClient = WebChromeClient()
                        loadUrl(initialUrl)
                        webViewInstance = this
                    }
                },
                update = { webView ->
                    webViewInstance = webView
                },
                modifier = Modifier.fillMaxSize()
            )
        }
    }
}

fun sharePwaInstructions(context: Context, isDe: Boolean) {
    val text = if (isDe) {
        "🌐 GastroDex - Gastronomie & Hotellerie Progressive Web App (PWA)\n\n" +
        "Greife von jedem Gerät (Laptop, PC, iPhone, iPad, Android) geräteunabhängig auf das Lexikon, den Wein-Guide und das 10-Fragen-Quiz zu!\n\n" +
        "Öffne die Web-App im Browser und tippe auf 'Zum Startbildschirm hinzufügen', um sie als native App zu installieren."
    } else {
        "🌐 GastroDex - Hospitality Progressive Web App (PWA)\n\n" +
        "Access the Gastronomy encyclopedia, wine guide, and 10-question multiple-choice staff quiz from any device (PC, Mac, iPhone, iPad, Android)!\n\n" +
        "Open in browser and tap 'Add to Home Screen' to install."
    }

    val intent = Intent(Intent.ACTION_SEND).apply {
        type = "text/plain"
        putExtra(Intent.EXTRA_SUBJECT, "GastroDex PWA Web Version")
        putExtra(Intent.EXTRA_TEXT, text)
    }
    context.startActivity(Intent.createChooser(intent, if (isDe) "PWA-Info teilen via" else "Share PWA Info via"))
}
