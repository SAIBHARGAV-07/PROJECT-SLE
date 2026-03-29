# 🌱 Sustainable Living Education (SLE) Platform

Welcome to the **Sustainable Living Education Platform**—an interactive and comprehensive learning hub dedicated to teaching and promoting sustainable practices. This platform offers courses, resources, and community features to help individuals and organizations adopt an eco-friendly lifestyle.

![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-success?style=for-the-badge&logo=vercel)

**Live Deployment:** [https://project-sle.vercel.app](https://project-sle.vercel.app)

---

## 🎯 Features

- **User & Administrator Portals:** Dedicated secure registration, login, and dashboard interfaces for both everyday learners and educators.
- **Interactive Course Player:** Immersive learning experience covering essential topics in sustainability within categorized lessons.
- **Progress Tracking:** Personal user dashboards allowing learners to track completed lessons, monitor their eco-score, and unlock badges.
- **Admin Management Tools:** In-depth dashboards for administrators or educators to create, manage, and distribute custom educational content.
- **Dark/Bright Mode:** Fully customizable UI theme toggles to suit user reading preferences.
- **Responsive Design:** Clean, dynamic, and mobile-friendly layout ensuring broad accessibility across devices.

## 📚 Course Categories

The platform provides a wide array of learning materials structured around core environmental topics:
- ⚡ **Energy Conservation:** Renewable resources and carbon footprint reduction methodologies.
- ♻️ **Waste Reduction:** Recycling strategies and circular economy principles.
- 💧 **Water Conservation:** Water-saving techniques and preservation awareness.
- 🌿 **Eco-Friendly Lifestyle:** Daily habit transformation guides.
- 🌍 **Climate Awareness:** Understanding the global impacts of climate change.
- 📚 **Educational Resources:** Access to articles, global real-world case studies, and statistical data.

## 🛠️ Tech Stack

This project was built entirely using core frontend web technologies. There are no heavy external frameworks, resulting in a fast, lightweight, and easily deployable codebase.

- **HTML5:** Semantic architecture for improved accessibility.
- **CSS3:** Custom styles, responsive flexbox/grid layouts, animations, and theming.
- **Vanilla JavaScript (ES6+):** Dynamic client-side routing, DOM manipulation, form validation, and mock database operations (localStorage/SessionStorage).

## 📁 Project Structure

```
project-sle/
│
├── index.html                   # Main Landing Page
├── login.html                   # General Login Options
├── register.html                # General Registration Options
├── project.html                 # About/Extra Pages
├── progress.html                # User Progress Summary
├── lesson.html                  # Core Lesson Content View
│
├── User Views
│   ├── user-dashboard.html      # Individual Learner Dashboard
│   ├── user-login.html          # Learner Login Page
│   └── user-register.html       # Learner Signup Page
│
├── Admin Views
│   ├── admin-dashboard.html     # Educator Management Home
│   ├── admin-lessons.html       # Lesson Creator/Manager 
│   ├── admin-login.html         # Admin Authentication
│   └── admin-register.html      # Admin Account Creation
│
├── css/                         # Stylesheets
│   ├── index.css                # Global styles & Landing UI
│   ├── admin-*.css              # Admin-specific styles
│   └── user-*.css               # Learner-oriented styles
│
└── js/                          # JavaScript Logic
    ├── index.js                 # General/Shared Logic
    ├── captcha.js               # Bot Validation
    ├── fake-data.js             # Mock Application Data
    ├── lesson-player.js         # Interactive Course Playback Logic
    ├── location.js              # Geographic / Location Data API
    ├── modal.js                 # Reusable UI overlays
    ├── validation.js            # Input form checks
    ├── admin-*.js               # Administrator workflow scripts
    └── user-*.js                # Learner workflow scripts
```

## 🚀 Getting Started Locally

To run this platform on your local machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/project-sle.git
   ```

2. **Navigate to the setup directory:**
   ```bash
   cd project-sle
   ```

3. **Open the platform:**
   Simply open `index.html` in your default web browser (e.g., Chrome, Firefox, Edge). 
   
   *Optional but recommended: Run a local development server for a better experience, particularly for handling external resource loads properly.*
   - If using **VS Code**, you can install and use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
   - Using **Python** (if installed): `python -m http.server 8000` or `python3 -m http.server 8000`
---

*Made with 🌱 to build a better future, one choice at a time.*
