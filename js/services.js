// Services page specific JavaScript
function initServices() {
    setupServiceNavigation();
    setupServiceAnimations();
    setupProcessInteractions();
}

function setupServiceNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const serviceSections = document.querySelectorAll('.service-detail');
    
    // Update active nav item on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 200;
        
        serviceSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Smooth scroll for nav items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = item.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function setupServiceAnimations() {
    // Stagger animation for service features
    const serviceFeatures = document.querySelectorAll('.feature');
    if (serviceFeatures.length > 0 && window.NBAnimations) {
        window.NBAnimations.staggerAnimation(serviceFeatures, 150);
    }
    
    // Animate stats when they come into view
    const serviceStats = document.querySelectorAll('.stat');
    serviceStats.forEach(stat => {
        stat.addEventListener('mouseenter', () => {
            stat.style.transform = 'scale(1.05)';
        });
        
        stat.addEventListener('mouseleave', () => {
            stat.style.transform = 'scale(1)';
        });
    });
}

function setupProcessInteractions() {
    const processPhases = document.querySelectorAll('.process-phase');
    
    processPhases.forEach(phase => {
        phase.addEventListener('mouseenter', () => {
            const number = phase.querySelector('.phase-number');
            if (number) {
                number.style.transform = 'scale(1.2)';
            }
        });
        
        phase.addEventListener('mouseleave', () => {
            const number = phase.querySelector('.phase-number');
            if (number) {
                number.style.transform = 'scale(1)';
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initServices();
});

// Export for global access
window.initServices = initServices;
