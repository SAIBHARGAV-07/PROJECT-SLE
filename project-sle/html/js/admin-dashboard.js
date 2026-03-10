// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadDarkMode();
    renderProjects();
    drawCharts();
});

// DARK MODE TOGGLE
function toggleDark() {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", isDark);
    updateDarkToggleButton();
    // redraw charts so they pick up dark/light color styles
    if (typeof drawCharts === 'function') drawCharts();
}

function loadDarkMode() {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark");
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
    if (event && event.target.closest('.nav-item')) {
        event.target.closest('.nav-item').classList.add('active');
    }
}

// PROJECTS MANAGEMENT
let projects = JSON.parse(localStorage.getItem("projects")) || [];

function renderProjects() {
    const list = document.getElementById("projectList");
    if (!list) return;
    list.innerHTML = "";
    projects.forEach((p, i) => {
        list.innerHTML += `
            <li>${p}
                <button onclick=\"deleteProject(${i})\">✕</button>
            </li>`;
    });
}

function addProject() {
    const name = document.getElementById("projectName").value;
    if (!name) return alert('Please enter a project name');
    projects.push(name);
    localStorage.setItem("projects", JSON.stringify(projects));
    renderProjects();
    document.getElementById("projectName").value = "";
}

function deleteProject(i) {
    projects.splice(i, 1);
    localStorage.setItem("projects", JSON.stringify(projects));
    renderProjects();
}

// FILTER FUNCTIONS
function filterUsers(type, event) {
    if (event) event.preventDefault();
    document.querySelectorAll('#users-section .filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (event) event.target.classList.add('active');
    console.log('Filtering users by:', type);
}

function filterLessons(type, event) {
    if (event) event.preventDefault();
    document.querySelectorAll('#lessons-section .filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (event) event.target.classList.add('active');
    console.log('Filtering lessons by:', type);
}

// CHART DRAWING
// CHART DRAWING (Chart.js)
function drawCharts() {
    // Sample / fallback data
    const userLabels = ["Karnataka", "Tamil Nadu", "Maharashtra", "Telangana"];
    const userValues = [120, 95, 140, 80];

    const projectLabels = ["Recycling", "Energy", "Water"];
    const projectValues = [10, 18, 25];

    // Update KPI values if elements exist
    const totalUsers = parseInt(document.getElementById('totalUsers')?.textContent.replace(/,/g,'') || '1245');
    const activeProjects = parseInt(document.getElementById('activeProjects')?.textContent.replace(/,/g,'') || '28');
    const lessons = parseInt(document.getElementById('kpiLessons')?.textContent || '156');
    const ecoScoreEl = document.getElementById('kpiEcoScore');
    if (document.getElementById('kpiTotalUsers')) document.getElementById('kpiTotalUsers').textContent = totalUsers.toLocaleString();
    if (document.getElementById('kpiActiveProjects')) document.getElementById('kpiActiveProjects').textContent = activeProjects.toLocaleString();
    if (document.getElementById('kpiLessons')) document.getElementById('kpiLessons').textContent = lessons.toLocaleString();
    if (ecoScoreEl) ecoScoreEl.textContent = (document.querySelector('.stat-value')?.textContent || '78') + '%';

    // Destroy existing charts if present
    if (window.userChartInstance) {
        window.userChartInstance.destroy();
    }
    if (window.projectChartInstance) {
        window.projectChartInstance.destroy();
    }

    const userCanvas = document.getElementById('userChart');
    if (userCanvas) {
        const ctx = userCanvas.getContext('2d');
        const isDark = document.body.classList.contains('dark');
        const textColor = isDark ? '#e0e0e0' : '#2c3e50';
        const gridColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(44,62,80,0.06)';
        const barColors = isDark ? ['#5fd98e', '#4cae80', '#2ecc71', '#16a085'] : ['#2ecc71', '#27ae60', '#1e8449', '#16a085'];

        window.userChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: userLabels,
                datasets: [{
                    label: 'Users',
                    data: userValues,
                    backgroundColor: barColors,
                    borderRadius: 6,
                    barPercentage: 0.6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { grid: { display: false, color: gridColor }, ticks: { color: textColor } },
                    y: { beginAtZero: true, grid: { color: gridColor }, ticks: { color: textColor } }
                },
                plugins: { legend: { display: false, labels: { color: textColor } } }
            }
        });
    }

    const projectCanvas = document.getElementById('projectChart');
    if (projectCanvas) {
        const ctx2 = projectCanvas.getContext('2d');
        const isDark = document.body.classList.contains('dark');
        const textColor = isDark ? '#e0e0e0' : '#2c3e50';
        const doughColors = isDark ? ['#4cae80', '#2ecc71', '#16a085'] : ['#4cae80', '#2ecc71', '#16a085'];

        window.projectChartInstance = new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: projectLabels,
                datasets: [{
                    label: 'Projects',
                    data: projectValues,
                    backgroundColor: doughColors,
                    borderColor: isDark ? '#111' : '#fff',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { color: textColor } }
                }
            }
        });
    }
}

// PROFILE FUNCTIONS
function editProfile(event) {
    if (event) event.preventDefault();
    alert('Edit Profile Feature\n\nPlaceholder - Update will be available soon');
    toggleProfile();
}

function settings(event) {
    if (event) event.preventDefault();
    alert('Settings Feature\n\nPlaceholder - Update will be available soon');
    toggleProfile();
}

function logout(event) {
    if (event) event.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        window.location.href = "index.html";
    }
}
