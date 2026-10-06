package com.example.ui.screens

import android.content.Context
import android.content.Intent
import androidx.compose.animation.AnimatedVisibility
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
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.EmojiEvents
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Quiz
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Send
import androidx.compose.material.icons.filled.Share
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.model.Language
import com.example.model.StaffQuizResult
import com.example.ui.GastroViewModel
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

@Composable
fun StaffQuizScreen(
    viewModel: GastroViewModel,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    val language by viewModel.language.collectAsStateWithLifecycle()
    val quizState by viewModel.quizState.collectAsStateWithLifecycle()
    val quizCategory by viewModel.quizCategory.collectAsStateWithLifecycle()
    val targetCount by viewModel.quizTargetCount.collectAsStateWithLifecycle()
    val questions by viewModel.activeSessionQuestions.collectAsStateWithLifecycle()

    var staffName by remember { mutableStateOf("") }
    val resultsLog = remember { mutableStateListOf<StaffQuizResult>() }
    var showConfigurator by remember { mutableStateOf(false) }

    val scrollState = rememberScrollState()

    Column(
        modifier = modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp)
            .testTag("staff_quiz_screen"),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Quiz Header & Buttons
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = if (language == Language.DE) "Team-Quiz & Multiple-Choice" else "Staff Trainer & Multiple Choice",
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.primary
                )
                Text(
                    text = if (language == Language.DE)
                        "${questions.size} Fragen • ${if (quizCategory == com.example.model.GastroCategory.ALL) "Mix aus allen Bereichen" else quizCategory.titleDe}"
                    else
                        "${questions.size} Questions • ${if (quizCategory == com.example.model.GastroCategory.ALL) "Mix from all categories" else quizCategory.titleEn}",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }

            Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                // Configurator Toggle Button
                Button(
                    onClick = { showConfigurator = !showConfigurator },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = if (showConfigurator) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.secondaryContainer
                    ),
                    contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 10.dp, vertical = 4.dp),
                    modifier = Modifier.testTag("quiz_config_toggle_btn")
                ) {
                    Icon(
                        imageVector = Icons.Default.Quiz,
                        contentDescription = "Config",
                        tint = if (showConfigurator) MaterialTheme.colorScheme.onPrimary else MaterialTheme.colorScheme.onSecondaryContainer,
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        text = if (language == Language.DE) "Filter & Anzahl" else "Filter & Count",
                        style = MaterialTheme.typography.labelSmall,
                        color = if (showConfigurator) MaterialTheme.colorScheme.onPrimary else MaterialTheme.colorScheme.onSecondaryContainer
                    )
                }

                // Share Challenge Button
                OutlinedButton(
                    onClick = {
                        shareQuizChallenge(context, language)
                    },
                    contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 8.dp, vertical = 4.dp),
                    modifier = Modifier.testTag("share_challenge_btn")
                ) {
                    Icon(imageVector = Icons.Default.Share, contentDescription = "Share", modifier = Modifier.size(16.dp))
                }
            }
        }

        // Quiz Configurator Panel (Category Selector & Question Count)
        AnimatedVisibility(visible = showConfigurator || questions.isEmpty()) {
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                modifier = Modifier.fillMaxWidth().testTag("quiz_configurator_card")
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Text(
                        text = if (language == Language.DE) "🎯 Quiz-Einstellungen" else "🎯 Quiz Settings",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.primary
                    )

                    // Category Selection
                    Text(
                        text = if (language == Language.DE) "1. Kategorie wählen:" else "1. Choose Category:",
                        style = MaterialTheme.typography.labelMedium,
                        fontWeight = FontWeight.Bold
                    )

                    androidx.compose.foundation.lazy.LazyRow(
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        items(com.example.model.GastroCategory.values().size) { idx ->
                            val cat = com.example.model.GastroCategory.values()[idx]
                            val isSelected = (cat == quizCategory)
                            Surface(
                                onClick = {
                                    viewModel.configureAndStartQuiz(cat, targetCount)
                                },
                                shape = RoundedCornerShape(20.dp),
                                color = if (isSelected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.surface,
                                border = androidx.compose.foundation.BorderStroke(
                                    1.dp,
                                    if (isSelected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outline.copy(alpha = 0.3f)
                                )
                            ) {
                                Text(
                                    text = if (cat == com.example.model.GastroCategory.ALL)
                                        (if (language == Language.DE) "✨ Mix alle Kategorien" else "✨ Mix all categories")
                                    else
                                        (if (language == Language.DE) cat.titleDe else cat.titleEn),
                                    style = MaterialTheme.typography.labelSmall,
                                    fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
                                    color = if (isSelected) MaterialTheme.colorScheme.onPrimary else MaterialTheme.colorScheme.onSurface,
                                    modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp)
                                )
                            }
                        }
                    }

                    // Question Count Selection (5, 10, 15, Alle)
                    Text(
                        text = if (language == Language.DE) "2. Anzahl der Fragen:" else "2. Question Count:",
                        style = MaterialTheme.typography.labelMedium,
                        fontWeight = FontWeight.Bold
                    )

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        listOf(5, 10, 15, 25).forEach { countOption ->
                            val isSelected = (targetCount == countOption)
                            Surface(
                                onClick = {
                                    viewModel.configureAndStartQuiz(quizCategory, countOption)
                                },
                                shape = RoundedCornerShape(12.dp),
                                color = if (isSelected) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surface,
                                border = androidx.compose.foundation.BorderStroke(
                                    1.dp,
                                    if (isSelected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outline.copy(alpha = 0.3f)
                                ),
                                modifier = Modifier.weight(1f)
                            ) {
                                Box(
                                    modifier = Modifier.padding(vertical = 10.dp),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Text(
                                        text = if (countOption == 25) (if (language == Language.DE) "Alle" else "All") else "$countOption",
                                        style = MaterialTheme.typography.bodyMedium,
                                        fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
                                        color = if (isSelected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onSurface
                                    )
                                }
                            }
                        }
                    }

                    // Start/Regenerate button
                    Button(
                        onClick = {
                            viewModel.configureAndStartQuiz(quizCategory, targetCount)
                            showConfigurator = false
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary),
                        modifier = Modifier.fillMaxWidth().testTag("start_quiz_with_settings_btn")
                    ) {
                        Icon(imageVector = Icons.Default.Refresh, contentDescription = null, modifier = Modifier.size(18.dp))
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = if (language == Language.DE)
                                "Quiz jetzt starten (${if (quizCategory == com.example.model.GastroCategory.ALL) "Mix" else quizCategory.titleDe})"
                            else
                                "Start Quiz Now (${if (quizCategory == com.example.model.GastroCategory.ALL) "Mix" else quizCategory.titleEn})",
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }
        }

        if (quizState.isCompleted) {
            // COMPLETED SUMMARY & REPORTING
            val scorePercent = ((quizState.score.toFloat() / questions.size) * 100).toInt()

            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(
                    modifier = Modifier.padding(20.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Icon(
                        imageVector = Icons.Default.EmojiEvents,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.primary,
                        modifier = Modifier.size(60.dp)
                    )
                    Spacer(modifier = Modifier.height(10.dp))
                    Text(
                        text = if (language == Language.DE) "Prüfung abgeschlossen!" else "Training Completed!",
                        style = MaterialTheme.typography.headlineSmall,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Text(
                        text = "$scorePercent% " + (if (language == Language.DE) "Erfolgsquote" else "Score rate"),
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        color = if (scorePercent >= 75) MaterialTheme.colorScheme.secondary else Color(0xFFC62828)
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = if (language == Language.DE)
                            "${quizState.score} von ${questions.size} Fragen richtig beantwortet"
                        else
                            "${quizState.score} of ${questions.size} questions answered correctly",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )

                    Spacer(modifier = Modifier.height(16.dp))

                    // Staff Name Input for Certificate & Report
                    OutlinedTextField(
                        value = staffName,
                        onValueChange = { staffName = it },
                        label = { Text(if (language == Language.DE) "Dein Name (für den Quizmaster-Bericht)" else "Your Name (for report)") },
                        leadingIcon = { Icon(Icons.Default.Person, contentDescription = null) },
                        singleLine = true,
                        modifier = Modifier.fillMaxWidth().testTag("quiz_staff_name_input")
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    // Send result to Quizmaster / Barchef via WhatsApp or Email
                    Button(
                        onClick = {
                            val finalName = staffName.ifBlank { if (language == Language.DE) "Service-Mitarbeiter" else "Staff Member" }
                            val dateStr = SimpleDateFormat("dd.MM.yyyy HH:mm", Locale.getDefault()).format(Date())
                            resultsLog.add(
                                StaffQuizResult(
                                    id = System.currentTimeMillis().toString(),
                                    staffName = finalName,
                                    score = quizState.score,
                                    totalQuestions = questions.size,
                                    percentage = scorePercent,
                                    dateString = dateStr
                                )
                            )
                            sendQuizResultReport(context, finalName, quizState.score, questions.size, scorePercent, language)
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary),
                        modifier = Modifier.fillMaxWidth().testTag("send_result_to_quizmaster_btn")
                    ) {
                        Icon(imageVector = Icons.Default.Send, contentDescription = null, modifier = Modifier.size(18.dp))
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = if (language == Language.DE)
                                "Ergebnis an Quizmaster / Chef senden"
                            else
                                "Send Report to Quizmaster / Bar Manager",
                            fontWeight = FontWeight.Bold
                        )
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    // Restart Quiz button
                    OutlinedButton(
                        onClick = { viewModel.resetQuiz() },
                        modifier = Modifier.fillMaxWidth().testTag("quiz_reset_button")
                    ) {
                        Icon(imageVector = Icons.Default.Refresh, contentDescription = null, modifier = Modifier.size(18.dp))
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(if (language == Language.DE) "Quiz erneut starten" else "Restart Quiz")
                    }
                }
            }

            // Results Log
            if (resultsLog.isNotEmpty()) {
                Card(
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text(
                            text = if (language == Language.DE) "Team-Ergebnisprotokoll (Quizmaster-Ansicht)" else "Team Submissions Log",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.onSurface
                        )
                        Spacer(modifier = Modifier.height(10.dp))
                        resultsLog.forEach { result ->
                            Row(
                                modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Column {
                                    Text(result.staffName, fontWeight = FontWeight.Bold, style = MaterialTheme.typography.bodyMedium)
                                    Text(result.dateString, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                }
                                Surface(
                                    shape = RoundedCornerShape(8.dp),
                                    color = if (result.percentage >= 75) MaterialTheme.colorScheme.secondary.copy(alpha = 0.15f) else Color(0xFFC62828).copy(alpha = 0.15f)
                                ) {
                                    Text(
                                        text = "${result.score}/${result.totalQuestions} (${result.percentage}%)",
                                        fontWeight = FontWeight.Bold,
                                        style = MaterialTheme.typography.labelSmall,
                                        color = if (result.percentage >= 75) MaterialTheme.colorScheme.secondary else Color(0xFFC62828),
                                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                                    )
                                }
                            }
                            HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.15f), modifier = Modifier.padding(vertical = 4.dp))
                        }
                    }
                }
            }
        } else {
            // ACTIVE QUESTION
            val currentQ = questions.getOrNull(quizState.currentQuestionIndex)
            if (currentQ != null) {
                // Progress Bar
                Column {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(
                            text = if (language == Language.DE)
                                "Frage ${quizState.currentQuestionIndex + 1} von ${questions.size}"
                            else
                                "Question ${quizState.currentQuestionIndex + 1} of ${questions.size}",
                            style = MaterialTheme.typography.labelSmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        Text(
                            text = "${quizState.currentQuestionIndex + 1}/${questions.size}",
                            style = MaterialTheme.typography.labelSmall,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.secondary
                        )
                    }
                    Spacer(modifier = Modifier.height(6.dp))
                    LinearProgressIndicator(
                        progress = { (quizState.currentQuestionIndex.toFloat() + 1) / questions.size },
                        modifier = Modifier.fillMaxWidth(),
                        color = MaterialTheme.colorScheme.secondary,
                        trackColor = MaterialTheme.colorScheme.secondary.copy(alpha = 0.2f)
                    )
                }

                // Question Card
                Card(
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                    border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.5f)),
                    elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(18.dp)) {
                        Text(
                            text = currentQ.localizedQuestion(language),
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold,
                            lineHeight = 24.sp,
                            color = MaterialTheme.colorScheme.onSurface
                        )
                    }
                }

                // Options list
                Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    val options = currentQ.localizedOptions(language)
                    options.forEachIndexed { index, optionText ->
                        val isSelected = (quizState.selectedOptionIndex == index)
                        val isCorrect = (index == currentQ.correctIndex)
                        val isRevealed = quizState.isAnswerRevealed

                        val backgroundColor = when {
                            !isRevealed && isSelected -> MaterialTheme.colorScheme.secondary
                            isRevealed && isCorrect -> MaterialTheme.colorScheme.secondary
                            isRevealed && isSelected && !isCorrect -> Color(0xFFC62828).copy(alpha = 0.15f)
                            else -> MaterialTheme.colorScheme.surface
                        }

                        val textColor = when {
                            !isRevealed && isSelected -> Color.White
                            isRevealed && isCorrect -> Color.White
                            else -> MaterialTheme.colorScheme.onSurface
                        }

                        val borderColor = when {
                            isRevealed && isCorrect -> MaterialTheme.colorScheme.secondary
                            isRevealed && isSelected && !isCorrect -> Color(0xFFC62828)
                            !isRevealed && isSelected -> MaterialTheme.colorScheme.secondary
                            else -> MaterialTheme.colorScheme.outline.copy(alpha = 0.4f)
                        }

                        Surface(
                            onClick = { viewModel.answerQuizQuestion(index) },
                            shape = RoundedCornerShape(12.dp),
                            color = backgroundColor,
                            border = androidx.compose.foundation.BorderStroke(1.5.dp, borderColor),
                            modifier = Modifier
                                .fillMaxWidth()
                                .testTag("quiz_option_$index")
                        ) {
                            Row(
                                modifier = Modifier.padding(14.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Box(
                                    modifier = Modifier
                                        .size(28.dp)
                                        .background(
                                            if (isRevealed && isCorrect) Color.White.copy(alpha = 0.25f)
                                            else if (isRevealed && isSelected && !isCorrect) Color(0xFFC62828)
                                            else if (!isRevealed && isSelected) Color.White.copy(alpha = 0.25f)
                                            else MaterialTheme.colorScheme.surfaceVariant,
                                            CircleShape
                                        ),
                                    contentAlignment = Alignment.Center
                                ) {
                                    if (isRevealed && isCorrect) {
                                        Icon(
                                            imageVector = Icons.Default.CheckCircle,
                                            contentDescription = null,
                                            tint = Color.White,
                                            modifier = Modifier.size(18.dp)
                                        )
                                    } else if (isRevealed && isSelected && !isCorrect) {
                                        Icon(
                                            imageVector = Icons.Default.Close,
                                            contentDescription = null,
                                            tint = Color.White,
                                            modifier = Modifier.size(18.dp)
                                        )
                                    } else {
                                        Text(
                                            text = ('A' + index).toString(),
                                            fontWeight = FontWeight.Bold,
                                            style = MaterialTheme.typography.labelMedium,
                                            color = if (!isRevealed && isSelected) Color.White else MaterialTheme.colorScheme.onSurfaceVariant
                                        )
                                    }
                                }

                                Spacer(modifier = Modifier.width(12.dp))
                                Text(
                                    text = optionText,
                                    style = MaterialTheme.typography.bodyMedium,
                                    fontWeight = if (isSelected || (isRevealed && isCorrect)) FontWeight.Bold else FontWeight.Normal,
                                    color = textColor,
                                    modifier = Modifier.weight(1f)
                                )
                            }
                        }
                    }
                }

                // Explanation & Next Button
                AnimatedVisibility(visible = quizState.isAnswerRevealed) {
                    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                        val isAnswerCorrect = (quizState.selectedOptionIndex == currentQ.correctIndex)
                        Card(
                            shape = RoundedCornerShape(14.dp),
                            colors = CardDefaults.cardColors(
                                containerColor = if (isAnswerCorrect)
                                    MaterialTheme.colorScheme.secondary.copy(alpha = 0.12f)
                                else
                                    Color(0xFFC62828).copy(alpha = 0.12f)
                            ),
                            border = androidx.compose.foundation.BorderStroke(
                                1.dp,
                                if (isAnswerCorrect) MaterialTheme.colorScheme.secondary else Color(0xFFC62828)
                            )
                        ) {
                            Row(
                                modifier = Modifier.padding(14.dp),
                                verticalAlignment = Alignment.Top
                            ) {
                                Icon(
                                    imageVector = Icons.Default.Info,
                                    contentDescription = null,
                                    tint = if (isAnswerCorrect) MaterialTheme.colorScheme.secondary else Color(0xFFC62828),
                                    modifier = Modifier.size(20.dp)
                                )
                                Spacer(modifier = Modifier.width(10.dp))
                                Text(
                                    text = currentQ.localizedExplanation(language),
                                    style = MaterialTheme.typography.bodySmall,
                                    lineHeight = 20.sp,
                                    color = MaterialTheme.colorScheme.onSurface
                                )
                            }
                        }

                        Button(
                            onClick = { viewModel.nextQuizQuestion() },
                            colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary),
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(48.dp)
                                .testTag("quiz_next_button")
                        ) {
                            Text(
                                text = if (quizState.currentQuestionIndex + 1 < questions.size)
                                    (if (language == Language.DE) "Nächste Frage ➜" else "Next Question ➜")
                                else
                                    (if (language == Language.DE) "Ergebnis anzeigen" else "View Results"),
                                fontWeight = FontWeight.Bold,
                                color = MaterialTheme.colorScheme.onPrimary
                            )
                        }
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(80.dp))
    }
}

fun shareQuizChallenge(context: Context, language: Language) {
    val message = if (language == Language.DE) {
        "🍸 GastroCodex Team-Challenge!\n\n" +
        "Bist du fit für die Bar & Restaurant-Gäste? Teste dein Fachwissen zu Single Malt, Bourbon, Champagner vs. Asti, Ouzo Louche-Effekt und Kaffeeschichten!\n\n" +
        "Schaffst du mehr als 80% im GastroCodex Quiz? Mach jetzt den Test!"
    } else {
        "🍸 GastroCodex Hospitality Challenge!\n\n" +
        "Are you ready for your bar & dining guests? Test your knowledge on Scotch, Bourbon, Champagne vs. Asti, Ouzo effect, and coffee layers!\n\n" +
        "Can you score over 80% on the GastroCodex Quiz? Take the challenge now!"
    }

    val intent = Intent(Intent.ACTION_SEND).apply {
        type = "text/plain"
        putExtra(Intent.EXTRA_SUBJECT, if (language == Language.DE) "GastroCodex Schulungs-Challenge" else "GastroCodex Hospitality Challenge")
        putExtra(Intent.EXTRA_TEXT, message)
    }
    context.startActivity(Intent.createChooser(intent, if (language == Language.DE) "Challenge teilen via" else "Share Challenge via"))
}

fun sendQuizResultReport(context: Context, staffName: String, score: Int, total: Int, percent: Int, language: Language) {
    val reportText = if (language == Language.DE) {
        "📋 GastroCodex Prüfungsergebnis für den Quizmaster / Barchef:\n\n" +
        "Mitarbeiter: $staffName\n" +
        "Ergebnis: $score von $total Fragen richtig ($percent%)\n" +
        "Status: ${if (percent >= 75) "✅ BESTANDEN" else "⚠️ WEITERE SCHULUNG EMPFOHLEN"}\n" +
        "Prüfungsbereiche: Spirituosen, Weine & Schaumweine, Kaffeekunde, Warenkunde (Obst/Gemüse)\n\n" +
        "— Gesendet via GastroCodex Gastronomie-Lern-App"
    } else {
        "📋 GastroCodex Hospitality Quiz Report for Quizmaster / Bar Manager:\n\n" +
        "Staff Member: $staffName\n" +
        "Score: $score of $total correct ($percent%)\n" +
        "Status: ${if (percent >= 75) "✅ PASSED" else "⚠️ FURTHER TRAINING RECOMMENDED"}\n" +
        "Topics: Spirits, Wines & Sparkling, Coffee Science, Culinary Produce\n\n" +
        "— Sent via GastroCodex Hospitality Learning App"
    }

    val intent = Intent(Intent.ACTION_SEND).apply {
        type = "text/plain"
        putExtra(Intent.EXTRA_SUBJECT, "GastroCodex Quiz-Ergebnis: $staffName ($percent%)")
        putExtra(Intent.EXTRA_TEXT, reportText)
    }
    context.startActivity(Intent.createChooser(intent, if (language == Language.DE) "Ergebnis senden via WhatsApp / E-Mail" else "Send Result via WhatsApp / Email"))
}
