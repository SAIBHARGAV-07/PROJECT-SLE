// Get username from localStorage
let currentUser = localStorage.getItem('username') || 'Learner';

// Update welcome text
document.addEventListener('DOMContentLoaded', function() {
    const welcomeText = document.getElementById('welcomeText');
    if (welcomeText) {
        welcomeText.textContent = `Welcome back, ${currentUser}! 👋`;
    }
    loadLeaderboard();
    loadDarkMode();
});

// LEADERBOARD DATA
let users = JSON.parse(localStorage.getItem("leaderboardUsers")) || [
    { name: "Bhargav", points: 180 },
    { name: "Aarav", points: 120 },
    { name: "Sneha", points: 150 },
    { name: "Rohit", points: 90 },
    { name: "Priya", points: 140 },
    { name: "Vikram", points: 110 },
    { name: "Ananya", points: 165 }
];

function loadLeaderboard() {
    users.sort((a, b) => b.points - a.points);
    const body = document.getElementById("leaderboardBody");
    if (!body) return;
    
    body.innerHTML = "";
    users.forEach((u, i) => {
        const badge = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '⭐';
        body.innerHTML += `
            <tr>
                <td><strong>${i + 1}</strong></td>
                <td>${u.name}</td>
                <td><strong>${u.points}</strong></td>
                <td>${i < 3 ? 'Level ' + (i + 1) : 'Level ' + (Math.floor(Math.random() * 5) + 3)}</td>
                <td>${badge}</td>
            </tr>
        `;
    });
}

// TAB SWITCHING
function switchTab(tab, event) {
    if (event) {
        event.preventDefault();
    }
    
    // Hide all sections
    document.querySelectorAll('.tab-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    const sectionID = tab + '-section';
    const section = document.getElementById(sectionID);
    if (section) {
        section.classList.add('active');
    }
    
    // Add active class to clicked nav item
    if (event) {
        event.target.closest('.nav-item').classList.add('active');
    }
}

// DARK MODE TOGGLE
function toggleDark() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('darkMode', isDark);
    updateDarkToggleButton();
}

function loadDarkMode() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark');
    }
    updateDarkToggleButton();
}

function updateDarkToggleButton() {
    const btn = document.querySelector('.dark-toggle');
    if (btn) {
        if (document.body.classList.contains('dark')) {
            btn.textContent = '☀️';
            btn.title = 'Switch to Bright Mode';
        } else {
            btn.textContent = '🌙';
            btn.title = 'Switch to Dark Mode';
        }
    }
}

// PROFILE DROPDOWN
function toggleProfile() {
    const dropdown = document.getElementById('profileDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const profileMenu = document.querySelector('.profile-menu');
    if (profileMenu && !profileMenu.contains(event.target)) {
        const dropdown = document.getElementById('profileDropdown');
        if (dropdown) {
            dropdown.classList.remove('show');
        }
    }
});

// LEADERBOARD FILTERS
function filterLeaderboard(period, event) {
    if (event) {
        event.preventDefault();
    }
    
    // Update active button
    document.querySelectorAll('#leaderboard-section .filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (event) {
        event.target.classList.add('active');
    }
    
    // Reload leaderboard (in real app, would fetch based on period)
    console.log('Filtering leaderboard by:', period);
    loadLeaderboard();
}

// LESSONS FILTERS
function filterLessons(type, event) {
    if (event) {
        event.preventDefault();
    }
    
    // Update active button
    document.querySelectorAll('#lessons-section .filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (event) {
        event.target.classList.add('active');
    }
    
    console.log('Filtering lessons by:', type);
}

// PROJECTS FILTERS
function filterProjects(type, event) {
    if (event) {
        event.preventDefault();
    }
    
    // Update active button
    document.querySelectorAll('#projects-section .filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (event) {
        event.target.classList.add('active');
    }
    
    console.log('Filtering projects by:', type);
}

// ACHIEVEMENTS FILTERS
function filterAchievements(type, event) {
    if (event) {
        event.preventDefault();
    }
    
    // Update active button
    document.querySelectorAll('#achievements-section .filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (event) {
        event.target.classList.add('active');
    }
    
    console.log('Filtering achievements by:', type);
}

// LESSON ACTIONS
function viewLesson(lessonId) {
    console.log('Opening lesson:', lessonId);
    alert(`Opening lesson: ${lessonId}\n\nContent placeholder - will be updated with real content`);
}

function reviewLesson(lessonId) {
    console.log('Reviewing lesson:', lessonId);
    alert(`Reviewing lesson: ${lessonId}\n\nContent placeholder - will be updated with real content`);
}

// PROJECT ACTIONS
function joinProject(projectId) {
    console.log('Joining project:', projectId);
    alert(`Joining project: ${projectId}\n\nContent placeholder - will be updated with real content`);
}

function viewProjectResults(projectId) {
    console.log('Viewing project results:', projectId);
    alert(`Project results for: ${projectId}\n\nContent placeholder - will be updated with real content`);
}

// NAVIGATION FUNCTIONS
function goTo(page) {
    window.location.href = page;
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        window.location.href = 'index.html';
    }
}

function editProfile() {
    alert('Edit Profile feature\n\nContent placeholder - will be updated with real content');
    toggleProfile();
}

function settings() {
    alert('Settings feature\n\nContent placeholder - will be updated with real content');
    toggleProfile();
}

