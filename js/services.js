// Services page specific JavaScript
function initServices() {
    setupServiceNavigation();
    setupServiceAnimations();
    setupProcessInteractions();
    setupBrandbookLink();
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
        
        // If no section is active, make first one active
        if (!current && navItems.length > 0) {
            navItems[0].classList.add('active');
        }
    });
    
    // Smooth scroll for nav items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = item.getAttribute('href');
            
            // Handle brandbook page link
            if (targetId === '#brandbook') {
                window.location.href = 'brandbook.html';
                return;
            }
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active state
                navItems.forEach(navItem => navItem.classList.remove('active'));
                item.classList.add('active');
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
    
    // Animate new service sections
    const newServices = document.querySelectorAll('#brand, #brandbook');
    if (newServices.length > 0 && window.NBAnimations) {
        window.NBAnimations.staggerAnimation(newServices, 200);
    }
}

function setupProcessInteractions() {
    const processPhases = document.querySelectorAll('.process-phase');
    
    processPhases.forEach(phase => {
        phase.addEventListener('mouseenter', () => {
            const number = phase.querySelector('.phase-number');
            if (number) {
                number.style.transform = 'scale(1.2)';
                number.style.background = 'var(--accent-gradient)';
                number.style.color = 'white';
            }
        });
        
        phase.addEventListener('mouseleave', () => {
            const number = phase.querySelector('.phase-number');
            if (number) {
                number.style.transform = 'scale(1)';
                number.style.background = 'transparent';
                number.style.color = 'var(--accent)';
            }
        });
        
        // Click to navigate to corresponding service
        phase.addEventListener('click', () => {
            const phaseText = phase.querySelector('h3').textContent.toLowerCase();
            let targetSection = '';
            
            switch(phaseText) {
                case 'discover':
                    targetSection = 'strategy';
                    break;
                case 'design':
                    targetSection = 'design';
                    break;
                case 'develop':
                    targetSection = 'engineering';
                    break;
                case 'deliver':
                    targetSection = 'production';
                    break;
            }
            
            if (targetSection) {
                const targetElement = document.getElementById(targetSection);
                if (targetElement) {
                    const headerHeight = document.querySelector('.main-header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update navigation
                    const navItems = document.querySelectorAll('.nav-item');
                    navItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('href') === `#${targetSection}`) {
                            item.classList.add('active');
                        }
                    });
                }
            }
        });
    });
}

function setupBrandbookLink() {
    const brandbookLink = document.querySelector('a[href="#brandbook"]');
    if (brandbookLink) {
        brandbookLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'brandbook.html';
        });
    }
    
    // Add click handler for brandbook CTA button
    const brandbookCta = document.querySelector('.service-cta .btn');
    if (brandbookCta) {
        brandbookCta.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'brandbook.html';
        });
    }
}

// Enhanced service section animations
function animateServiceSections() {
    const serviceSections = document.querySelectorAll('.service-detail');
    
    serviceSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.2}s`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(section);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initServices();
    animateServiceSections();
});

// Export for global access
window.initServices = initServices;
