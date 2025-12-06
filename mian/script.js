// ========================================
// PATIL HUB - PROFESSIONAL PORTFOLIO
// Main JavaScript File
// ========================================

'use strict';

// ========================================
// PROJECT DATABASE
// Add your 5 mini projects here
// ========================================
const projects = [{
        id: 1,
        title: 'Notes Sharing Platform',
        category: 'Education',
        description: 'A comprehensive platform for students to share, organize, and collaborate on study notes. Features include real-time sync, PDF viewer, search functionality, and categorization by subjects.',
        icon: '📚',
        status: 'live',
        tech: ['React', 'Firebase', 'Material-UI', 'PDF.js'],
        path: './projects/notes-sharing/index.html',
        demoUrl: '#',
        githubUrl: '#'
    },
    {
        id: 2,
        title: 'Real-Time Chat Application',
        category: 'Communication',
        description: 'Modern chat application with instant messaging, group chats, file sharing, and emoji support. Built with WebSocket for real-time communication and featuring end-to-end encryption.',
        icon: '💬',
        status: 'live',
        tech: ['Node.js', 'Socket.io', 'MongoDB', 'Express'],
        path: './projects/chat-app/index.html',
        demoUrl: '#',
        githubUrl: '#'
    },
    {
        id: 3,
        title: 'Online Code Compiler',
        category: 'Development',
        description: 'Multi-language code compiler supporting Python, Java, C++, JavaScript, and more. Features include syntax highlighting, error detection, code execution with real-time output, and code sharing.',
        icon: '💻',
        status: 'live',
        tech: ['Express', 'Docker', 'CodeMirror', 'Judge0 API'],
        path: '../notes_site/index.html',
        demoUrl: '#',
        githubUrl: '#'
    },
    {
        id: 4,
        title: 'Task Management System',
        category: 'Productivity',
        description: 'Complete project and task management solution with Kanban boards, calendar view, deadline tracking, priority levels, and team collaboration features. Perfect for managing assignments and group projects.',
        icon: '✅',
        status: 'live',
        tech: ['React', 'Redux', 'Tailwind', 'LocalStorage'],
        path: './projects/task-manager/index.html',
        demoUrl: '#',
        githubUrl: '#'
    },
    {
        id: 5,
        title: 'Student Resource Hub',
        category: 'Education',
        description: 'Centralized platform for academic resources including study materials, previous year papers, video lectures, and useful links. Features smart search, bookmarking, and resource recommendations.',
        icon: '🎓',
        status: 'live',
        tech: ['Vue.js', 'Firebase', 'Algolia', 'Bootstrap'],
        path: './projects/resource-hub/index.html',
        demoUrl: '#',
        githubUrl: '#'
    }
];

// ========================================
// DOM ELEMENTS
// ========================================
const loader = document.getElementById('loader');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navItems = document.querySelectorAll('.nav-item');
const projectsGrid = document.getElementById('projectsGrid');
const contactForm = document.getElementById('contactForm');

// ========================================
// INITIALIZATION
// ========================================
function init() {
    // Hide loader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    });

    // Generate projects
    renderProjects();

    // Setup event listeners
    setupNavigation();
    setupScrollEffects();
    setupContactForm();

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });

    console.log('%c🚀 Patil Hub Initialized Successfully!', 'color: #6366f1; font-size: 18px; font-weight: bold;');
    console.log(`%c📊 Loaded ${projects.length} projects`, 'color: #06b6d4; font-weight: bold;');
}

// ========================================
// RENDER PROJECTS
// ========================================
function renderProjects() {
    if (!projectsGrid) return;

    projectsGrid.innerHTML = '';

    projects.forEach((project, index) => {
        const card = createProjectCard(project, index);
        projectsGrid.appendChild(card);
    });
}

function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.animationDelay = `${index * 0.1}s`;

    card.innerHTML = `
        <div class="project-header">
            <div class="project-icon">${project.icon}</div>
            <span class="project-status status-${project.status}">${project.status === 'live' ? 'Live' : 'Coming Soon'}</span>
        </div>
        <h3 class="project-title">${project.title}</h3>
        <div class="project-category">${project.category}</div>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">
            ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <a href="${project.path}" class="project-link">
            <span>Open Project</span>
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
        </a>
    `;
    
    return card;
}

// ========================================
// NAVIGATION
// ========================================
function setupNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking nav items
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ========================================
// SCROLL EFFECTS
// ========================================
function setupScrollEffects() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Navbar background on scroll
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav item
        updateActiveNavItem();
        
        lastScroll = currentScroll;
    });
    
    // Initial check
    updateActiveNavItem();
}

function updateActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================
function smoothScroll(e) {
    const href = this.getAttribute('href');
    
    if (!href.startsWith('#')) return;
    
    e.preventDefault();
    
    const targetId = href.substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ========================================
// CONTACT FORM
// ========================================
function setupContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name') || contactForm.querySelector('input[type="text"]').value,
            email: formData.get('email') || contactForm.querySelector('input[type="email"]').value,
            subject: formData.get('subject') || contactForm.querySelectorAll('input[type="text"]')[1]?.value,
            message: formData.get('message') || contactForm.querySelector('textarea').value
        };
        
        // Log data (In production, send to backend)
        console.log('Form Submitted:', data);
        
        // Show success message
        showNotification('Message sent successfully! We\'ll get back to you soon. 🚀', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#22c55e' : '#6366f1'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe project cards
    document.querySelectorAll('.project-card, .feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Add new project
function addProject(projectData) {
    projects.push({
        id: projects.length + 1,
        ...projectData
    });
    renderProjects();
    console.log('✅ Project added:', projectData.title);
}

// Remove project
function removeProject(projectId) {
    const index = projects.findIndex(p => p.id === projectId);
    if (index !== -1) {
        projects.splice(index, 1);
        renderProjects();
        console.log('🗑️ Project removed');
    }
}

// Get project by ID
function getProject(projectId) {
    return projects.find(p => p.id === projectId);
}

// Export functions to window for external use
window.PatilHub = {
    projects,
    addProject,
    removeProject,
    getProject,
    renderProjects
};

// ========================================
// EASTER EGG - Console Art
// ========================================
console.log(`
%c
╔═══════════════════════════════════════╗
║                                       ║
║          ⚡ PATIL HUB ⚡              ║
║                                       ║
║    Professional Student Portfolio     ║
║         Built with 💙                ║
║                                       ║
╚═══════════════════════════════════════╝
`, 'color: #6366f1; font-weight: bold; font-size: 12px;');

console.log('%cWant to add a new project?', 'color: #06b6d4; font-size: 14px; font-weight: bold;');
console.log(`%c
window.PatilHub.addProject({
    title: 'Your Project Name',
    category: 'Category',
    description: 'Description...',
    icon: '🚀',
    status: 'live',
    tech: ['Tech1', 'Tech2'],
    path: './path/to/project',
    demoUrl: '#',
    githubUrl: '#'
});
`, 'color: #22c55e; font-family: monospace;');

// ========================================
// START APPLICATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    init();
    setupIntersectionObserver();
});

// ========================================
// EXAMPLE: How to add your 6th project
// ========================================
/*
window.PatilHub.addProject({
    title: 'Quiz Generator',
    category: 'Education',
    description: 'AI-powered quiz generation from study materials with multiple choice questions and instant feedback.',
    icon: '📝',
    status: 'live',
    tech: ['Python', 'Flask', 'OpenAI', 'React'],
    path: './projects/quiz-generator/index.html',
    demoUrl: '#',
    githubUrl: '#'
});
*/