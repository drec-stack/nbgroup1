// services.js - Complete fixed version for Services page with HEADER FIX
console.log('🎯 Services.js loaded - With COMPLETE header stabilization fix');

// Main initialization function
function initServices() {
    console.log('🎯 Initializing services page with STABLE header...');
    
    // CRITICAL: Apply complete header fix FIRST
    applyCompleteHeaderStabilization();
    
    // Set body class
    document.body.classList.add('services-page');
    
    // Initialize other functionality
    setupServiceAnimations();
    setupProcessInteractions();
    animateServiceSections();
    setupServicesNavigation();
    
    console.log('✅ Services page initialized with stable header');
}

// COMPLETE HEADER STABILIZATION - FIXES ALL MOVEMENT ISSUES
function applyCompleteHeaderStabilization() {
    console.log('🔧 Applying COMPLETE header stabilization...');
    
    const header = document.querySelector('.main-header');
    if (!header) {
        console.warn('⚠️ Header not found');
        return;
    }
    
    // MARK: This is a Services page - add specific class
    document.body.classList.add('services-page');
    
    // 1. REMOVE ALL ANIMATIONS AND TRANSITIONS
    header.style.transition = 'none !important';
    header.style.webkitTransition = 'none !important';
    header.style.transitionProperty = 'none !important';
    header.style.animation = 'none !important';
    header.style.webkitAnimation = 'none !important';
    header.style.transitionDuration = '0s !important';
    header.style.transitionDelay = '0s !important';
    
    // 2. Apply correct position IMMEDIATELY
    const enforceHeaderPosition = () => {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Mobile - fixed at top
            header.style.position = 'fixed';
            header.style.top = '0';
            header.style.left = '0';
            header.style.right = '0';
            header.style.width = '100%';
            header.style.maxWidth = '100%';
            header.style.margin = '0';
            header.style.transform = 'translateY(0) !important';
            header.style.borderRadius = '0';
            header.style.zIndex = '1000';
        } else {
            // Desktop - centered
            header.style.position = 'fixed';
            header.style.top = '20px';
            header.style.left = '50%';
            header.style.right = 'auto';
            header.style.width = 'calc(100% - 40px)';
            header.style.maxWidth = '1400px';
            header.style.margin = '0 auto';
            header.style.transform = 'translateX(-50%) !important';
            header.style.borderRadius = '20px';
            header.style.zIndex = '1000';
        }
        
        // Ensure visibility
        header.style.opacity = '1';
        header.style.pointerEvents = 'auto';
        header.style.visibility = 'visible';
        
        // Remove problematic classes
        header.classList.remove('header-hidden');
        header.classList.add('scrolled'); // Always show as scrolled
        
        console.log('📐 Header position enforced for:', isMobile ? 'mobile' : 'desktop');
    };
    
    // 3. Apply position immediately
    enforceHeaderPosition();
    
    // 4. PREVENT ALL SHIFTING - disable transitions on all header children
    const disableChildTransitions = () => {
        const allElements = header.querySelectorAll('*');
        allElements.forEach(element => {
            element.style.transition = 'none';
            element.style.transform = 'none';
            element.style.transitionProperty = 'none';
        });
        
        // Re-enforce position
        enforceHeaderPosition();
    };
    
    // 5. INTERCEPT ALL HOVER EVENTS - prevent any movement
    const preventHoverShifts = (e) => {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        
        // Force position immediately
        enforceHeaderPosition();
        disableChildTransitions();
        
        // Cancel any pending animations
        cancelAnimationFrame(window.headerFixFrame);
    };
    
    // 6. Add event listeners for ALL possible interaction events
    const interactionEvents = [
        'mouseenter', 'mouseleave', 'mouseover', 'mouseout',
        'mousemove', 'mousewheel', 'wheel', 'scroll',
        'touchstart', 'touchend', 'touchmove',
        'pointerenter', 'pointerleave', 'pointermove'
    ];
    
    interactionEvents.forEach(eventType => {
        header.addEventListener(eventType, preventHoverShifts, { passive: false });
        
        // Also for document to catch any bubbling events
        document.addEventListener(eventType, (e) => {
            if (e.target.closest('.main-header')) {
                preventHoverShifts(e);
            }
        }, { passive: false });
    });
    
    // 7. Services navigation fix
    const servicesNav = document.querySelector('.services-nav');
    if (servicesNav) {
        interactionEvents.forEach(eventType => {
            servicesNav.addEventListener(eventType, preventHoverShifts, { passive: false });
        });
    }
    
    // 8. Handle window resize
    window.addEventListener('resize', () => {
        setTimeout(enforceHeaderPosition, 10);
        setTimeout(disableChildTransitions, 20);
    }, { passive: true });
    
    // 9. Handle scroll - just add scrolled class
    window.addEventListener('scroll', () => {
        header.classList.add('scrolled');
        enforceHeaderPosition();
    }, { passive: true });
    
    // 10. Mutation observer to catch any style changes
    if ('MutationObserver' in window) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && 
                    (mutation.attributeName === 'style' || 
                     mutation.attributeName === 'class')) {
                    enforceHeaderPosition();
                    disableChildTransitions();
                }
            });
        });
        
        observer.observe(header, {
            attributes: true,
            attributeFilter: ['style', 'class', 'transform']
        });
        
        // Also observe all children
        const headerChildren = header.querySelectorAll('*');
        headerChildren.forEach(child => {
            observer.observe(child, {
                attributes: true,
                attributeFilter: ['style', 'class', 'transform']
            });
        });
    }
    
    // 11. Periodic reinforcement
    const reinforcementInterval = setInterval(() => {
        enforceHeaderPosition();
        disableChildTransitions();
    }, 1000);
    
    // Store interval ID for cleanup
    window.headerReinforcementInterval = reinforcementInterval;
    
    // 12. Delayed fixes
    setTimeout(enforceHeaderPosition, 50);
    setTimeout(disableChildTransitions, 100);
    setTimeout(enforceHeaderPosition, 500);
    setTimeout(enforceHeaderPosition, 1000);
    
    console.log('✅ COMPLETE header stabilization applied');
    
    // Return cleanup function
    return () => {
        clearInterval(reinforcementInterval);
        interactionEvents.forEach(eventType => {
            header.removeEventListener(eventType, preventHoverShifts);
        });
    };
}

// Services navigation setup
function setupServicesNavigation() {
    const servicesNav = document.querySelector('.services-nav');
    if (!servicesNav) return;
    
    const navItems = servicesNav.querySelectorAll('.nav-item');
    const serviceSections = document.querySelectorAll('.service-detail');
    
    // Highlight active section on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    
    serviceSections.forEach(section => observer.observe(section));
    
    // Smooth scroll to sections
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const header = document.querySelector('.main-header');
                const headerHeight = header ? header.offsetHeight : 0;
                const navHeight = servicesNav.offsetHeight;
                const offset = headerHeight + navHeight + 20;
                
                window.scrollTo({
                    top: targetSection.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Service animations
function setupServiceAnimations() {
    const serviceFeatures = document.querySelectorAll('.feature');
    const serviceStats = document.querySelectorAll('.stat');
    const isMobile = window.innerWidth <= 768;
    
    if (serviceFeatures.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: isMobile ? 0.1 : 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        serviceFeatures.forEach(feature => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateY(20px)';
            feature.style.transition = 'all 0.6s ease 150ms';
            observer.observe(feature);
        });
    }
    
    if (!isMobile) {
        serviceStats.forEach(stat => {
            stat.addEventListener('mouseenter', () => {
                stat.style.transform = 'scale(1.05)';
                stat.style.transition = 'transform 0.3s ease';
            });
            
            stat.addEventListener('mouseleave', () => {
                stat.style.transform = 'scale(1)';
            });
        });
    }
}

// Process interactions
function setupProcessInteractions() {
    const processPhases = document.querySelectorAll('.process-phase');
    const isMobile = window.innerWidth <= 768;
    
    processPhases.forEach(phase => {
        if (!isMobile) {
            phase.addEventListener('mouseenter', () => {
                const number = phase.querySelector('.phase-number');
                if (number) {
                    number.style.transform = 'scale(1.1)';
                    number.style.transition = 'transform 0.3s ease';
                }
            });
            
            phase.addEventListener('mouseleave', () => {
                const number = phase.querySelector('.phase-number');
                if (number) {
                    number.style.transform = 'scale(1)';
                }
            });
        }
        
        phase.addEventListener('click', () => {
            const phaseText = phase.querySelector('h3').textContent.toLowerCase();
            let targetSection = '';
            
            if (phaseText.includes('discover') || phaseText.includes('исследование')) {
                targetSection = 'strategy';
            } else if (phaseText.includes('design') || phaseText.includes('дизайн')) {
                targetSection = 'design';
            } else if (phaseText.includes('develop') || phaseText.includes('разработка')) {
                targetSection = 'engineering';
            } else if (phaseText.includes('deliver') || phaseText.includes('реализация')) {
                targetSection = 'production';
            }
            
            if (targetSection) {
                const targetElement = document.getElementById(targetSection);
                if (targetElement) {
                    const header = document.querySelector('.main-header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const additionalOffset = isMobile ? 20 : 40;
                    const targetPosition = targetElement.offsetTop - headerHeight - additionalOffset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Animate service sections
function animateServiceSections() {
    const serviceSections = document.querySelectorAll('.service-detail');
    const isMobile = window.innerWidth <= 768;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = index * 200;
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: isMobile ? 0.1 : 0.2,
        rootMargin: isMobile ? '0px 0px -30px 0px' : '0px 0px -50px 0px'
    });

    serviceSections.forEach((section) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(section);
    });
}

// ===== AUTO-INITIALIZATION =====

// Primary initialization
function initializeServicesPage() {
    console.log('🚀 Starting Services page initialization...');
    
    // CRITICAL: Apply header fix BEFORE anything else
    const cleanupHeaderFix = applyCompleteHeaderStabilization();
    
    // Set body class for CSS targeting
    document.body.classList.add('services-page');
    
    // Initialize other components
    initServices();
    
    // Store cleanup function
    window.cleanupServicesPage = () => {
        if (cleanupHeaderFix) cleanupHeaderFix();
        if (window.headerReinforcementInterval) {
            clearInterval(window.headerReinforcementInterval);
        }
        document.body.classList.remove('services-page');
    };
    
    console.log('✅ Services page fully initialized');
}

// DOM ready initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('📄 DOM loaded, initializing Services page...');
        setTimeout(initializeServicesPage, 100);
    });
} else {
    console.log('📄 DOM already loaded, initializing Services page...');
    setTimeout(initializeServicesPage, 100);
}

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (window.cleanupServicesPage) {
        window.cleanupServicesPage();
    }
});

// Export functions for global use
window.initServices = initServices;
window.applyCompleteHeaderStabilization = applyCompleteHeaderStabilization;
window.initializeServicesPage = initializeServicesPage;

console.log('✅ services.js loaded with COMPLETE header stabilization');
