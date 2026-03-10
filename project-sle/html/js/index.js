// Centralized frontend JS for index.html
(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function updateDarkToggleButton() {
        const btn = document.getElementById('dark-toggle');
        if (!btn) return;
        const isDark = document.body.classList.contains('dark');
        btn.setAttribute('aria-pressed', String(isDark));
        btn.textContent = isDark ? '☀️ Bright Mode' : '🌙 Dark Mode';
    }

    function applyDarkMode(isDark) {
        document.body.classList.toggle('dark', !!isDark);
        try { localStorage.setItem('darkMode', !!isDark); } catch (e) { /* ignore */ }
        updateDarkToggleButton();
    }

    function initDarkMode() {
        let saved = null;
        try { saved = localStorage.getItem('darkMode'); } catch (e) { saved = null; }
        let isDark;
        if (saved === 'true') isDark = true;
        else if (saved === 'false') isDark = false;
        else isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyDarkMode(isDark);
    }

    function toggleDarkMode() {
        applyDarkMode(!document.body.classList.contains('dark'));
    }

    // FAQ accordion
    function toggleFAQ(button) {
        const faqItem = button.closest('.faq-item');
        if (!faqItem) return;
        const isActive = faqItem.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
        if (!isActive) faqItem.classList.add('active');
    }

    // Counters animation (skipped when user prefers reduced motion)
    function animateCounters() {
        if (prefersReducedMotion) return;
        const statNumbers = document.querySelectorAll('.stat-number');
        if (!('IntersectionObserver' in window)) {
            statNumbers.forEach(el => el.textContent = el.dataset.count || '0');
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    const target = parseInt(entry.target.dataset.count, 10) || 0;
                    const duration = 1200;
                    const frameRate = 50;
                    const steps = Math.max(1, Math.floor(duration / frameRate));
                    const increment = target / steps;
                    let current = 0;
                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            entry.target.textContent = target.toLocaleString();
                            clearInterval(counter);
                        } else {
                            entry.target.textContent = Math.floor(current).toLocaleString();
                        }
                    }, frameRate);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    // Smooth scroll for anchor links, focus target for accessibility
    function attachSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (!href || href === '#') return;
                const target = document.querySelector(href);
                if (!target) return;
                e.preventDefault();
                target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
                target.focus({ preventScroll: true });
            });
        });
    }

    // Attach event listeners
    function initEventHandlers() {
        const darkBtn = document.getElementById('dark-toggle');
        if (darkBtn) darkBtn.addEventListener('click', toggleDarkMode);

        document.querySelectorAll('.faq-question').forEach(btn => btn.addEventListener('click', () => toggleFAQ(btn)));
    }

    // Initialize on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function () {
        initDarkMode();
        initEventHandlers();
        animateCounters();
        attachSmoothScroll();
    });

})();
