package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Coffee
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material.icons.filled.Quiz
import androidx.compose.material.icons.filled.Science
import androidx.compose.material.icons.filled.WineBar
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.data.GastroRepository
import com.example.data.local.GastroDatabase
import com.example.model.Language
import com.example.ui.GastroViewModel
import com.example.ui.GastroViewModelFactory
import com.example.ui.NavTab
import com.example.ui.components.GastroTopAppBar
import com.example.ui.screens.AddEditItemDialog
import com.example.ui.screens.CatalogScreen
import com.example.ui.screens.CoffeeComparisonScreen
import com.example.ui.screens.ItemDetailScreen
import com.example.ui.screens.ProfileCloudScreen
import com.example.ui.screens.PwaInfoDialog
import com.example.ui.screens.PwaWebViewScreen
import com.example.ui.screens.ScienceGuideScreen
import com.example.ui.screens.StaffQuizScreen
import com.example.ui.screens.WineGuideScreen
import com.example.ui.theme.MyApplicationTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MyApplicationTheme {
                val context = LocalContext.current
                val database = remember { GastroDatabase.getDatabase(context) }
                val repository = remember { GastroRepository(database.gastroDao()) }
                val viewModel: GastroViewModel = viewModel(
                    factory = remember { GastroViewModelFactory(repository, context.applicationContext) }
                )

                GastroApp(viewModel = viewModel)
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GastroApp(viewModel: GastroViewModel) {
    val language by viewModel.language.collectAsStateWithLifecycle()
    val currentTab by viewModel.currentTab.collectAsStateWithLifecycle()
    val selectedItem by viewModel.selectedItem.collectAsStateWithLifecycle()
    val showProfileScreen by viewModel.showProfileScreen.collectAsStateWithLifecycle()

    var showAddDialog by remember { mutableStateOf(false) }
    var showPwaDialog by remember { mutableStateOf(false) }
    var showPwaWebView by remember { mutableStateOf(false) }
    var pwaUrl by remember { mutableStateOf("file:///android_asset/pwa/index.html") }

    if (showAddDialog) {
        AddEditItemDialog(
            language = language,
            onDismiss = { showAddDialog = false },
            onSave = { newItem ->
                viewModel.addCustomItem(newItem)
                showAddDialog = false
            }
        )
    }

    if (showPwaDialog) {
        PwaInfoDialog(
            language = language,
            onDismiss = { showPwaDialog = false },
            onOpenInAppWebView = { targetUrl ->
                pwaUrl = targetUrl
                showPwaDialog = false
                showPwaWebView = true
            }
        )
    }

    if (showPwaWebView) {
        PwaWebViewScreen(
            language = language,
            initialUrl = pwaUrl,
            onBack = { showPwaWebView = false }
        )
    } else if (showProfileScreen) {
        // Google Account, Cloud Sync, Sharing & Monetization Screen
        ProfileCloudScreen(
            viewModel = viewModel,
            onBack = { viewModel.showProfileScreen.value = false }
        )
    } else if (selectedItem != null) {
        // Fullscreen Detail Screen
        ItemDetailScreen(
            item = selectedItem!!,
            viewModel = viewModel,
            onBack = { viewModel.selectItem(null) }
        )
    } else {
        Scaffold(
            topBar = {
                GastroTopAppBar(
                    currentLanguage = language,
                    onToggleLanguage = { viewModel.toggleLanguage() },
                    onOpenProfile = { viewModel.showProfileScreen.value = true },
                    onOpenPwaInfo = { showPwaDialog = true }
                )
            },
            bottomBar = {
                NavigationBar(
                    containerColor = MaterialTheme.colorScheme.surface,
                    tonalElevation = 6.dp,
                    modifier = Modifier.testTag("bottom_nav_bar")
                ) {
                    val tabs = listOf(
                        NavTab.CATALOG to Icons.Default.MenuBook,
                        NavTab.WINE_GUIDE to Icons.Default.WineBar,
                        NavTab.COFFEE_LAB to Icons.Default.Coffee,
                        NavTab.SCIENCE to Icons.Default.Science,
                        NavTab.QUIZ to Icons.Default.Quiz
                    )

                    tabs.forEach { (tab, icon) ->
                        val isSelected = (currentTab == tab)
                        val title = if (language == Language.DE) tab.titleDe else tab.titleEn

                        NavigationBarItem(
                            selected = isSelected,
                            onClick = { viewModel.currentTab.value = tab },
                            icon = {
                                Icon(
                                    imageVector = icon,
                                    contentDescription = title,
                                    modifier = Modifier.size(22.dp)
                                )
                            },
                            label = {
                                Text(
                                    text = title,
                                    style = MaterialTheme.typography.labelSmall,
                                    fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
                                    maxLines = 1
                                )
                            },
                            colors = NavigationBarItemDefaults.colors(
                                selectedIconColor = MaterialTheme.colorScheme.onPrimaryContainer,
                                selectedTextColor = MaterialTheme.colorScheme.primary,
                                indicatorColor = MaterialTheme.colorScheme.primaryContainer,
                                unselectedIconColor = MaterialTheme.colorScheme.onSurfaceVariant,
                                unselectedTextColor = MaterialTheme.colorScheme.onSurfaceVariant
                            ),
                            modifier = Modifier.testTag("nav_tab_${tab.name.lowercase()}")
                        )
                    }
                }
            },
            modifier = Modifier.fillMaxSize()
        ) { innerPadding ->
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding)
            ) {
                when (currentTab) {
                    NavTab.CATALOG -> CatalogScreen(
                        viewModel = viewModel,
                        onOpenAddDialog = { showAddDialog = true }
                    )
                    NavTab.WINE_GUIDE -> WineGuideScreen(
                        viewModel = viewModel
                    )
                    NavTab.COFFEE_LAB -> CoffeeComparisonScreen(
                        viewModel = viewModel
                    )
                    NavTab.SCIENCE -> ScienceGuideScreen(
                        viewModel = viewModel
                    )
                    NavTab.QUIZ -> StaffQuizScreen(
                        viewModel = viewModel
                    )
                }
            }
        }
    }
}
