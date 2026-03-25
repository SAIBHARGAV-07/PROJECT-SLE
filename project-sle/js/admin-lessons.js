// Admin Lessons CRUD using localStorage
let currentQuizzes = [];

document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.getElementById('save-lesson');
    const clearBtn = document.getElementById('clear-form');
    const addQuizBtn = document.getElementById('add-quiz');

    saveBtn.addEventListener('click', saveLesson);
    clearBtn.addEventListener('click', clearForm);
    if (addQuizBtn) addQuizBtn.addEventListener('click', addQuiz);

    renderLessons();
});

function getLessons() {
    return JSON.parse(localStorage.getItem('lessons') || '[]');
}

function saveLessons(list) {
    localStorage.setItem('lessons', JSON.stringify(list));
}

function saveLesson() {
    const idEl = document.getElementById('lesson-id');
    const title = document.getElementById('lesson-title').value.trim();
    const category = document.getElementById('lesson-category').value.trim();
    const summary = document.getElementById('lesson-summary').value.trim();
    const content = document.getElementById('lesson-content').value.trim();
    const published = document.getElementById('lesson-published').checked;

    if (!title) {
        alert('Please provide a title.');
        return;
    }

    const lessons = getLessons();
    if (idEl.value) {
        // update
        const id = idEl.value;
        const idx = lessons.findIndex(l => l.id === id);
        if (idx > -1) {
            lessons[idx] = { id, title, category, summary, content, published, quizzes: currentQuizzes, updated: Date.now() };
        }
    } else {
        const id = 'les-' + Date.now();
        lessons.unshift({ id, title, category, summary, content, published, quizzes: currentQuizzes, created: Date.now() });
    }

    saveLessons(lessons);
    clearForm();
    renderLessons();
}

function clearForm() {
    document.getElementById('lesson-id').value = '';
    document.getElementById('lesson-title').value = '';
    document.getElementById('lesson-category').value = '';
    document.getElementById('lesson-summary').value = '';
    document.getElementById('lesson-content').value = '';
    document.getElementById('lesson-published').checked = false;
    // clear quiz inputs and list
    currentQuizzes = [];
    const quizList = document.getElementById('quiz-list');
    if (quizList) quizList.innerHTML = 'No quizzes added.';
    const qInputs = ['quiz-question','quiz-options','quiz-answer'];
    qInputs.forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
}

function renderLessons() {
    const container = document.getElementById('lessons-container');
    const lessons = getLessons();
    if (!lessons.length) {
        container.innerHTML = '<p>No lessons yet. Create your first lesson.</p>';
        return;
    }

    container.innerHTML = '';
    lessons.forEach(l => {
        const card = document.createElement('div');
        card.className = 'lesson-card';
        card.innerHTML = `
            <h3>${escapeHtml(l.title)}</h3>
            <p class="muted">${escapeHtml(l.category || '')} • ${l.published ? 'Published' : 'Draft'}</p>
            <p>${escapeHtml(l.summary || '')}</p>
            <p class="muted">Quizzes: ${ (l.quizzes && l.quizzes.length) || 0 }</p>
            <div class="card-actions">
                <button onclick="editLesson('${l.id}')">Edit</button>
                <button onclick="deleteLesson('${l.id}')">Delete</button>
                <button onclick="openLesson('${l.id}')">Open</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function editLesson(id) {
    const lessons = getLessons();
    const l = lessons.find(x => x.id === id);
    if (!l) return alert('Lesson not found');
    document.getElementById('lesson-id').value = l.id;
    document.getElementById('lesson-title').value = l.title;
    document.getElementById('lesson-category').value = l.category || '';
    document.getElementById('lesson-summary').value = l.summary || '';
    document.getElementById('lesson-content').value = l.content || '';
    document.getElementById('lesson-published').checked = !!l.published;
    // load quizzes into form state
    currentQuizzes = l.quizzes ? JSON.parse(JSON.stringify(l.quizzes)) : [];
    renderQuizList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteLesson(id) {
    if (!confirm('Delete this lesson?')) return;
    const lessons = getLessons().filter(l => l.id !== id);
    saveLessons(lessons);
    renderLessons();
}

function openLesson(id) {
    // build absolute URL relative to current document to avoid server 404s
    const url = new URL('lesson.html', location.href);
    url.searchParams.set('id', id);
    window.location.href = url.href;
}

// Quiz helper functions
function addQuiz(e) {
    e && e.preventDefault && e.preventDefault();
    const q = document.getElementById('quiz-question').value.trim();
    const optsRaw = document.getElementById('quiz-options').value.trim();
    const ans = parseInt(document.getElementById('quiz-answer').value, 10);
    if (!q || !optsRaw) return alert('Provide question and options');
    const opts = optsRaw.split('|').map(s=>s.trim()).filter(Boolean);
    if (!opts.length) return alert('Provide at least one option');
    const quiz = { id: 'quiz-' + Date.now(), question: q, options: opts, answerIndex: isNaN(ans)?0:ans };
    currentQuizzes.push(quiz);
    renderQuizList();
    // clear inputs
    document.getElementById('quiz-question').value='';
    document.getElementById('quiz-options').value='';
    document.getElementById('quiz-answer').value='';
}

function renderQuizList(){
    const el = document.getElementById('quiz-list');
    if(!el) return;
    if(!currentQuizzes.length){ el.innerHTML = 'No quizzes added.'; return; }
    el.innerHTML = '';
    currentQuizzes.forEach((q, i)=>{
        const div = document.createElement('div');
        div.style.padding='8px'; div.style.border='1px solid #eee'; div.style.marginBottom='8px'; div.style.borderRadius='6px';
        div.innerHTML = `<strong>${escapeHtml(q.question)}</strong><div style="font-size:13px;color:#444;margin-top:6px">Options: ${q.options.map(o=>escapeHtml(o)).join(' | ')}</div><div style="margin-top:6px"><button onclick="removeQuiz('${q.id}')">Remove</button></div>`;
        el.appendChild(div);
    });
}

function removeQuiz(id){ currentQuizzes = currentQuizzes.filter(q=>q.id!==id); renderQuizList(); }

function escapeHtml(s) {
    if (!s) return '';
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
