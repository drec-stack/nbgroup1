// Home page specific JavaScript
function initHome() {
    setupHeroAnimations();
    setupScrollIndicator();
    setupStatsAnimation();
}

function setupHeroAnimations() {
    // Hero title animation
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.classList.add('revealed');
        }, 500);
    }
}

function setupScrollIndicator() {
    const scrollLine = document.querySelector('.scroll-line');
    if (scrollLine) {
        // Restart animation every 4 seconds
        setInterval(() => {
            scrollLine.style.animation = 'none';
            setTimeout(() => {
                scrollLine.style.animation = 'scrollLine 2s infinite';
            }, 10);
        }, 4000);
    }
}

function setupStatsAnimation() {
    // Stats will be animated by the main animations controller
    // Additional home-specific stat handling can go here
}

// Service card interactions
function setupServiceInteractions() {
    const serviceCards = document.querySelectorAll('.service-preview-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Project card interactions
function setupProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const image = card.querySelector('.project-image');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const image = card.querySelector('.project-image');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initHome();
    setupServiceInteractions();
    setupProjectInteractions();
});

// Export for global access
window.initHome = initHome;