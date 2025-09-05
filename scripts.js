// Constants
const API_KEY = '07bf5d50456b5181632845cd6b13ad91';
const START_YEAR = 2023;

// DOM Elements
const elements = {
    mobileMenu: document.getElementById('mobile-menu'),
    mobileMenuButton: document.getElementById('mobile-menu-button'),
    seeMoreButton: document.getElementById('see-more'),
    footerText: document.getElementById('footer-text')
};

// FAQ Functionality
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isVisible = answer.style.display === 'block';
            
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.style.display = 'none';
            });
            
            answer.style.display = isVisible ? 'none' : 'block';
        });
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    elements.mobileMenuButton?.addEventListener('click', () => {
        elements.mobileMenu?.classList.toggle('hidden');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!elements.mobileMenu?.contains(e.target) && 
            !elements.mobileMenuButton?.contains(e.target)) {
            elements.mobileMenu?.classList.add('hidden');
        }
    });
}

// See More Functionality
function initSeeMore() {
    elements.seeMoreButton?.addEventListener('click', () => {
        const hiddenItems = document.querySelectorAll('.text-center.hidden');
        hiddenItems.forEach(item => item.classList.toggle('hidden'));
        
        elements.seeMoreButton.textContent = 
            elements.seeMoreButton.textContent === 'See More' ? 'See Less' : 'See More';
    });
}

// Navigation Highlighting
function highlightCurrentPage() {
    const currentPage = location.pathname.split('/').pop();
    
    // Mobile menu
    document.querySelectorAll('#mobile-menu .mobile-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.remove('text-blue-700');
            link.classList.add('bg-blue-700', 'text-white', 'rounded-lg');
        }
    });
    
    // Desktop menu
    document.querySelectorAll('ul li a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.remove('bg-blue-700', 'text-white');
            link.classList.add('bg-white', 'text-blue-700', 'border', 'border-blue-700');
        }
    });
}

// Footer Year
function updateFooterYear() {
    const currentYear = new Date().getFullYear();
    elements.footerText.innerHTML = 
        `&copy; ${START_YEAR} - ${currentYear} TechGuard IT Solutions. All Rights Reserved.`;
}

// Animation (if canvas exists)
function initAnimation() {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles?.forEach(particle => {
            particle.update();
            particle.draw();
        });
        drawConnections?.();
        requestAnimationFrame(animate);
    };
    animate();
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initFAQ();
    initMobileMenu();
    initSeeMore();
    initAnimation();
    highlightCurrentPage();
    updateFooterYear();
  
});
