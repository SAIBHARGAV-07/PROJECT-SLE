// Lesson player: steps, navigation, quizzes, progress, badges
(function(){
    function getLessons(){return JSON.parse(localStorage.getItem('lessons')||'[]');}
    function getProgress(){ return JSON.parse(localStorage.getItem('progress')||'{}'); }
    function saveProgress(p){ localStorage.setItem('progress', JSON.stringify(p)); }
    function isCompleted(id){ const p=getProgress(); return !!p[id]; }
    function setCompleted(id,val){ const p=getProgress(); if(val) p[id]=true; else delete p[id]; saveProgress(p); updateProgressUI(); }

    function getQuizResults(){ return JSON.parse(localStorage.getItem('quizResults')||'{}'); }
    function saveQuizResults(obj){ localStorage.setItem('quizResults', JSON.stringify(obj)); }

    function getBadges(){ return JSON.parse(localStorage.getItem('badges')||'[]'); }
    function saveBadges(b){ localStorage.setItem('badges', JSON.stringify(b)); }
    function awardBadge(b){ const badges = getBadges(); if(!badges.includes(b)){ badges.push(b); saveBadges(badges); alert('Badge unlocked: '+b); } }

    function escapeHtml(s){ if(!s) return ''; return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

    function renderList(){
        const container = document.getElementById('lessons-placeholder');
        const lessons = getLessons().filter(l=>l.published);
        if(!lessons.length){ container.innerHTML = '<p>No published lessons yet.</p>'; return; }
        container.innerHTML='';
        lessons.forEach(l=>{
            const div = document.createElement('div'); div.className='lesson-item';
            div.innerHTML = `<h2>${escapeHtml(l.title)}</h2><div class="meta">${escapeHtml(l.category||'')} • ${new Date(l.created||l.updated||Date.now()).toLocaleDateString()}</div><p>${escapeHtml(l.summary||'')}</p><p><a href="#" data-id="${l.id}" class="open-lesson">Open lesson →</a></p>`;
            container.appendChild(div);
        });
        // attach handlers
        document.querySelectorAll('.open-lesson').forEach(a=>a.addEventListener('click', function(e){ e.preventDefault(); openLesson(this.dataset.id); }));
    }

    function splitSteps(content){ return content.split('<!-- STEP -->').map(s=>s.trim()).filter(Boolean); }

    function renderSteps(lesson){
        const steps = splitSteps(lesson.content||'<p>(No content)</p>');
        const container = document.getElementById('lesson-render');
        container.innerHTML='';
        const stepWrapper = document.createElement('div'); stepWrapper.className='step-wrapper';
        const stepContent = document.createElement('div'); stepContent.className='step-content';
        const stepNav = document.createElement('div'); stepNav.className='step-nav';
        stepWrapper.appendChild(stepContent); stepWrapper.appendChild(stepNav);
        container.appendChild(stepWrapper);

        let idx = 0;
        function show(i){ idx = i; stepContent.innerHTML = steps[i]; stepNav.innerHTML = `<button id="prev-step" ${i===0?'disabled':''}>◀ Prev</button> <span>Step ${i+1}/${steps.length}</span> <button id="next-step" ${i===steps.length-1?'disabled':''}>Next ▶</button>`;
            document.getElementById('prev-step').onclick = ()=>{ if(idx>0) show(idx-1); };
            document.getElementById('next-step').onclick = ()=>{ if(idx<steps.length-1) show(idx+1); };
        }
        show(0);
    }

    function renderQuizzes(lesson){
        const container = document.getElementById('lesson-render');
        if(!(lesson.quizzes && lesson.quizzes.length)) return;
        const qSection = document.createElement('div'); qSection.className='quiz-section';
        qSection.innerHTML = '<h3>Quizzes</h3>';
        lesson.quizzes.forEach((q, idx)=>{
            const qDiv = document.createElement('div'); qDiv.className='quiz-item';
            qDiv.innerHTML = `<p><strong>${escapeHtml(q.question)}</strong></p>`;
            const ol = document.createElement('ol'); ol.style.listStyle='none';
            q.options.forEach((opt,i)=>{
                const li = document.createElement('li');
                const btn = document.createElement('button'); btn.textContent = opt; btn.style.display='block'; btn.style.margin='6px 0';
                btn.onclick = ()=>{ handleAnswer(lesson.id, q.id, i, q.answerIndex, lesson); };
                li.appendChild(btn); ol.appendChild(li);
            });
            qDiv.appendChild(ol);
            qSection.appendChild(qDiv);
        });
        container.appendChild(qSection);
    }

    function handleAnswer(lessonId, quizId, picked, correct, lesson){
        const results = getQuizResults(); results[lessonId] = results[lessonId] || {};
        results[lessonId][quizId] = { picked, correct, date: Date.now() };
        saveQuizResults(results);
        // compute score
        const lessonQuizzes = (lesson.quizzes||[]);
        let correctCount = 0;
        lessonQuizzes.forEach(q=>{ const r = results[lessonId] && results[lessonId][q.id]; if(r && r.picked===q.answerIndex) correctCount++; });
        const score = lessonQuizzes.length? (correctCount/lessonQuizzes.length):0;
        if(score >= 0.7){ // pass
            awardBadge('lesson-'+lessonId);
            setCompleted(lessonId,true);
        }
        alert(`You answered ${picked+1}. Current score: ${Math.round(score*100)}%`);
    }

    // Reuse progress UI function
    function updateProgressUI(){
        const lessons = getLessons().filter(l=>l.published);
        const p = getProgress();
        const done = lessons.filter(l=>p[l.id]).length;
        let el = document.getElementById('progress-indicator');
        if(!el){ el = document.createElement('div'); el.id='progress-indicator'; el.style.maxWidth='900px'; el.style.margin='12px auto'; el.style.padding='0 20px'; document.body.insertBefore(el, document.querySelector('main')) }
        el.innerHTML = `<strong>Progress:</strong> ${done}/${lessons.length} lessons completed`;
    }

    function openLesson(id){
        const lessons = getLessons(); const l = lessons.find(x=>x.id===id); if(!l) return alert('Lesson not found');
        document.getElementById('lesson-list').style.display='none'; document.getElementById('lesson-content').style.display='block';
        document.getElementById('lesson-render').innerHTML = `<h2>${l.title}</h2><div class="meta">${l.category||''}</div>`;
        // steps
        renderSteps(l);
        // quizzes appended after steps
        renderQuizzes(l);
        // mark button state and handler
        const btn = document.getElementById('mark-complete'); if(btn){ btn.textContent = isCompleted(id)?'Mark Incomplete':'Mark Complete'; btn.onclick = function(){ const now = !isCompleted(id); setCompleted(id, now); btn.textContent = now?'Mark Incomplete':'Mark Complete'; }; }
        window.scrollTo(0,0);
    }

    function showList(){ document.getElementById('lesson-content').style.display='none'; document.getElementById('lesson-list').style.display='block'; }

    // initialization
    document.addEventListener('DOMContentLoaded', ()=>{
        const params = new URLSearchParams(location.search); const id = params.get('id');
        renderList(); updateProgressUI();
        if(id) openLesson(id);
        // expose showList to global for back-link
        window.showList = showList; window.openLesson = openLesson; window.updateProgressUI = updateProgressUI; window.setCompleted = setCompleted;
    });

})();
