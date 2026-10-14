import json
import re

with open('master_quiz_dataset.json', 'r', encoding='utf-8') as f:
    questions = json.load(f)

for q in questions:
    q_id = q['id']
    new_idx = sum(ord(c) for c in q_id) % 4
    
    # Options En
    opts_en = q['optionsEn']
    if len(opts_en) == 4:
        correct_en = opts_en[0]
        wrongs_en = opts_en[1:]
        new_opts_en = list(wrongs_en)
        new_opts_en.insert(new_idx, correct_en)
        q['optionsEn'] = new_opts_en
        q['optEn'] = new_opts_en

    # Options De
    opts_de = q['optionsDe']
    if len(opts_de) == 4:
        correct_de = opts_de[0]
        wrongs_de = opts_de[1:]
        new_opts_de = list(wrongs_de)
        new_opts_de.insert(new_idx, correct_de)
        q['optionsDe'] = new_opts_de
        q['optDe'] = new_opts_de

    q['correctIndex'] = new_idx
    q['correct'] = new_idx

with open('master_quiz_dataset.json', 'w', encoding='utf-8') as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)

# Write pwa/quiz_data.js
quiz_js = '// GastroDex Bilingual Master Quiz Questions\nconst MASTER_QUIZ = ' + json.dumps(questions, indent=2, ensure_ascii=False) + ';\n'
with open('pwa/quiz_data.js', 'w', encoding='utf-8') as f:
    f.write(quiz_js)

with open('app/src/main/assets/pwa/quiz_data.js', 'w', encoding='utf-8') as f:
    f.write(quiz_js)

# Now update CuratedGastroData.kt
with open('app/src/main/java/com/example/data/CuratedGastroData.kt', 'r', encoding='utf-8') as f:
    kotlin_text = f.read()

# Build a map of id -> new_idx and new options
q_map = {q['id']: q for q in questions}

# We can replace each QuizQuestion block in CuratedGastroData.kt
def replace_qq(match):
    block = match.group(0)
    # Extract id
    m_id = re.search(r'id\s*=\s*"([^"]+)"', block)
    if not m_id:
        return block
    qid = m_id.group(1)
    if qid not in q_map:
        return block
    q = q_map[qid]
    
    # Format optionsEn
    opts_en_str = ', '.join([f'"{o}"' for o in q['optionsEn']])
    opts_de_str = ', '.join([f'"{o}"' for o in q['optionsDe']])
    
    # Replace optionsEn, optionsDe, correctIndex in block
    block = re.sub(r'optionsEn\s*=\s*listOf\([^)]+\)', f'optionsEn = listOf({opts_en_str})', block)
    block = re.sub(r'optionsDe\s*=\s*listOf\([^)]+\)', f'optionsDe = listOf({opts_de_str})', block)
    block = re.sub(r'correctIndex\s*=\s*[0-9]+', f'correctIndex = {q[\"correctIndex\"]}', block)
    return block

kotlin_text = re.sub(r'QuizQuestion\([\s\S]*?\n\s*\)', replace_qq, kotlin_text)

with open('app/src/main/java/com/example/data/CuratedGastroData.kt', 'w', encoding='utf-8') as f:
    f.write(kotlin_text)

print('Successfully redistributed correct answers across A, B, C, D for all quiz questions!')
