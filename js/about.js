// ============================================================================
// about.js - WORKING VERSION WITH SVG PLACEHOLDERS
// ============================================================================

console.log('🚀 about.js loaded - WORKING VERSION');

// Safe DOM operations wrapper
const safe = {
    get: (selector) => {
        try {
            const element = document.querySelector(selector);
            return element || null;
        } catch (error) {
            console.error(`❌ Error getting element: ${selector}`, error);
            return null;
        }
    },
    
    getAll: (selector) => {
        try {
            const elements = document.querySelectorAll(selector);
            return elements.length > 0 ? Array.from(elements) : [];
        } catch (error) {
            console.error(`❌ Error getting elements: ${selector}`, error);
            return [];
        }
    },
    
    addClass: (element, className) => {
        if (element && element.classList) {
            try {
                element.classList.add(className);
                return true;
            } catch (error) {
                console.error(`❌ Error adding class ${className} to element`, error);
                return false;
            }
        }
        return false;
    },
    
    removeClass: (element, className) => {
        if (element && element.classList) {
            try {
                element.classList.remove(className);
                return true;
            } catch (error) {
                console.error(`❌ Error removing class ${className} from element`, error);
                return false;
            }
        }
        return false;
    },
    
    on: (element, event, handler) => {
        if (element && typeof handler === 'function') {
            try {
                element.addEventListener(event, handler);
                return true;
            } catch (error) {
                console.error(`❌ Error adding ${event} listener to element`, error);
                return false;
            }
        }
        return false;
    },
    
    setStyle: (element, styles) => {
        if (element && element.style) {
            try {
                Object.assign(element.style, styles);
                return true;
            } catch (error) {
                console.error('❌ Error setting styles on element', error);
                return false;
            }
        }
        return false;
    }
};

// ============================================================================
// TEAM PHOTOS ANIMATIONS (USING SVG PLACEHOLDERS)
// ============================================================================

function animateTeamPhotos() {
    console.log('🎭 Animating team photos...');
    
    const teamMembers = safe.getAll('.team-member');
    const memberPhotos = safe.getAll('.member-photo svg');
    
    console.log(`👥 Found ${teamMembers.length} team members`);
    console.log(`🖼️ Found ${memberPhotos.length} SVG photos`);
    
    if (teamMembers.length === 0) return;
    
    // Animate each member with delay
    teamMembers.forEach((member, index) => {
        if (!member) return;
        
        setTimeout(() => {
            // Add animation class
            safe.addClass(member, 'animated');
            
            // Animate SVG photo
            const photo = member.querySelector('.member-photo svg');
            if (photo) {
                safe.setStyle(photo, {
                    opacity: '1',
                    transform: 'scale(1)',
                    transition: 'all 0.6s ease'
                });
                
                // Animate the gradient
                animateSVGGradient(photo, index);
            }
            
            console.log(`✨ Animated team member ${index + 1}`);
        }, index * 200);
    });
}

function animateSVGGradient(svgElement, index) {
    if (!svgElement) return;
    
    try {
        // Get circle element
        const circle = svgElement.querySelector('circle');
        if (!circle) return;
        
        // Pulsing animation
        let scale = 1;
        const direction = 1;
        
        const pulse = () => {
            if (!svgElement) return;
            
            scale += 0.002 * direction;
            if (scale > 1.02) direction = -1;
            if (scale < 0.98) direction = 1;
            
            safe.setStyle(svgElement, {
                transform: `scale(${scale})`,
                transition: 'transform 2s ease-in-out'
            });
            
            setTimeout(pulse, 50);
        };
        
        // Start pulsing after delay
        setTimeout(() => {
            pulse();
        }, 1000 + (index * 500));
        
    } catch (error) {
        console.error('❌ Error animating SVG gradient:', error);
    }
}

// ============================================================================
// HEADER SETUP FOR ABOUT PAGE
// ============================================================================

function setupHeaderForAboutPage() {
    console.log('🔧 Setting up header for about page...');
    
    const header = safe.get('.main-header');
    if (!header) {
        console.warn('⚠️ Header not found');
        return;
    }
    
    try {
        // Add about-page class to body
        safe.addClass(document.body, 'about-page');
        
        // Ensure header is visible
        safe.removeClass(header, 'header-hidden');
        safe.setStyle(header, {
            opacity: '1',
            visibility: 'visible',
            pointerEvents: 'auto'
        });
        
        console.log('✅ Header setup complete for about page');
    } catch (error) {
        console.error('❌ Error setting up header:', error);
    }
}

// ============================================================================
// MAIN INITIALIZATION FUNCTION
// ============================================================================

function initAbout() {
    console.log('🎯 Initializing about page...');
    
    try {
        // 1. Setup header
        setupHeaderForAboutPage();
        
        // 2. Animate team photos (SVG placeholders)
        animateTeamPhotos();
        
        // 3. Setup page functionalities
        setupPageFunctionalities();
        
        // 4. Start content animations
        startContentAnimations();
        
        console.log('✅ About page fully initialized');
    } catch (error) {
        console.error('❌ Error in initAbout:', error);
    }
}

// ============================================================================
// PAGE FUNCTIONALITIES SETUP
// ============================================================================

function setupPageFunctionalities() {
    console.log('⚙️ Setting up page functionalities...');
    
    try {
        // 1. Team member interactions
        setupTeamMemberInteractions();
        
        // 2. Story statistics animation
        setupStoryStats();
        
        // 3. Service cards animation
        setupServiceCards();
        
        // 4. CTA button effects
        setupCTAEffects();
        
        // 5. Scroll animations
        setupScrollAnimations();
        
        console.log('✅ All page functionalities initialized');
    } catch (error) {
        console.error('❌ Error setting up page functionalities:', error);
    }
}

// ============================================================================
// TEAM MEMBER INTERACTIONS
// ============================================================================

function setupTeamMemberInteractions() {
    const teamMembers = safe.getAll('.team-member');
    const isMobile = window.innerWidth <= 768;
    
    console.log(`👥 Setting up interactions for ${teamMembers.length} team members`);
    
    teamMembers.forEach((member, index) => {
        if (!member) return;
        
        // Desktop hover effects
        if (!isMobile) {
            safe.on(member, 'mouseenter', function() {
                safe.setStyle(this, {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 20px 40px rgba(0, 102, 255, 0.3)',
                    transition: 'all 0.3s ease'
                });
                
                // Animate SVG photo
                const svg = this.querySelector('.member-photo svg');
                if (svg) {
                    safe.setStyle(svg, {
                        transform: 'scale(1.1) rotate(5deg)',
                        transition: 'all 0.4s ease'
                    });
                }
                
                // Animate social icons
                const socialIcons = this.querySelectorAll('.member-social a');
                socialIcons.forEach((icon, i) => {
                    setTimeout(() => {
                        safe.setStyle(icon, {
                            transform: 'translateY(-5px)',
                            transition: 'transform 0.3s ease'
                        });
                    }, i * 100);
                });
            });
            
            safe.on(member, 'mouseleave', function() {
                safe.setStyle(this, {
                    transform: 'translateY(0)',
                    boxShadow: 'none'
                });
                
                // Reset SVG photo
                const svg = this.querySelector('.member-photo svg');
                if (svg) {
                    safe.setStyle(svg, {
                        transform: 'scale(1) rotate(0deg)'
                    });
                }
                
                // Reset social icons
                const socialIcons = this.querySelectorAll('.member-social a');
                socialIcons.forEach(icon => {
                    safe.setStyle(icon, { transform: 'translateY(0)' });
                });
            });
        }
        
        // Mobile touch effects
        if (isMobile) {
            safe.on(member, 'touchstart', function(e) {
                e.preventDefault();
                safe.setStyle(this, {
                    transform: 'scale(0.98)',
                    opacity: '0.9'
                });
            });
            
            safe.on(member, 'touchend', function() {
                safe.setStyle(this, {
                    transform: 'scale(1)',
                    opacity: '1'
                });
            });
        }
    });
}

// ============================================================================
// STORY STATISTICS ANIMATION
// ============================================================================

function setupStoryStats() {
    const storyStats = safe.getAll('.story-stat');
    
    if (storyStats.length === 0) {
        console.log('📊 No story stats found');
        return;
    }
    
    console.log(`📊 Found ${storyStats.length} story stats`);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('🎯 Story stats visible, animating...');
                
                storyStats.forEach((stat, index) => {
                    if (!stat) return;
                    
                    setTimeout(() => {
                        safe.setStyle(stat, {
                            opacity: '1',
                            transform: 'translateY(0)',
                            transition: 'all 0.6s ease'
                        });
                        
                        // Animate counter
                        const numberElement = stat.querySelector('.stat-number');
                        if (numberElement && !numberElement.hasAttribute('data-animated')) {
                            animateCounter(numberElement);
                            numberElement.setAttribute('data-animated', 'true');
                        }
                    }, index * 200);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const storySection = safe.get('.our-story');
    if (storySection) {
        observer.observe(storySection);
    }
}

function animateCounter(element) {
    if (!element) return;
    
    try {
        const text = element.textContent || '';
        const finalValue = parseInt(text.replace('+', '')) || 0;
        
        if (finalValue <= 0) return;
        
        const duration = 1500;
        const steps = 60;
        const increment = finalValue / steps;
        let currentValue = 0;
        let step = 0;
        
        const animateStep = () => {
            if (step >= steps) {
                element.textContent = text;
                // Celebration effect
                safe.setStyle(element, { transform: 'scale(1.1)' });
                setTimeout(() => {
                    safe.setStyle(element, { transform: 'scale(1)' });
                }, 200);
                return;
            }
            
            currentValue += increment;
            element.textContent = Math.floor(currentValue) + (text.includes('+') ? '+' : '');
            step++;
            
            requestAnimationFrame(animateStep);
        };
        
        requestAnimationFrame(animateStep);
    } catch (error) {
        console.error('❌ Error animating counter:', error);
    }
}

// ============================================================================
// SERVICE CARDS ANIMATIONS
// ============================================================================

function setupServiceCards() {
    const serviceCards = safe.getAll('.speck-service-card');
    const isMobile = window.innerWidth <= 768;
    
    if (serviceCards.length === 0) {
        console.log('💎 No service cards found');
        return;
    }
    
    console.log(`💎 Found ${serviceCards.length} service cards`);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = isMobile ? index * 100 : index * 150;
                
                setTimeout(() => {
                    safe.addClass(entry.target, 'revealed');
                    
                    // Animate icon
                    const icon = entry.target.querySelector('.speck-card-icon');
                    if (icon) {
                        safe.setStyle(icon, {
                            transform: 'scale(1) rotate(0deg)',
                            transition: 'all 0.6s ease'
                        });
                    }
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: isMobile ? 0.1 : 0.2 });
    
    serviceCards.forEach((card, index) => {
        if (!card) return;
        
        card.setAttribute('data-service-card', index + 1);
        
        if (card.classList.contains('reveal-left') || card.classList.contains('reveal-right')) {
            safe.setStyle(card, { opacity: '0' });
        }
        
        observer.observe(card);
    });
}

// ============================================================================
// CTA EFFECTS
// ============================================================================

function setupCTAEffects() {
    const ctaButton = safe.get('.about-cta .btn');
    
    if (!ctaButton) {
        console.log('📣 No CTA button found');
        return;
    }
    
    console.log('📣 Setting up CTA button effects');
    
    try {
        const arrowIcon = ctaButton.querySelector('.fa-arrow-right');
        
        // Hover animations
        safe.on(ctaButton, 'mouseenter', function() {
            safe.setStyle(this, {
                transform: 'translateY(-5px)',
                boxShadow: '0 20px 40px rgba(0, 102, 255, 0.5)'
            });
            
            if (arrowIcon) {
                safe.setStyle(arrowIcon, { transform: 'translateX(8px)' });
            }
        });
        
        safe.on(ctaButton, 'mouseleave', function() {
            safe.setStyle(this, {
                transform: 'translateY(0)',
                boxShadow: ''
            });
            
            if (arrowIcon) {
                safe.setStyle(arrowIcon, { transform: 'translateX(0)' });
            }
        });
        
        // Click effects
        safe.on(ctaButton, 'mousedown', function() {
            safe.setStyle(this, { transform: 'scale(0.95)' });
        });
        
        safe.on(ctaButton, 'mouseup', function() {
            safe.setStyle(this, { transform: 'translateY(-5px)' });
        });
        
        // Pulsing animation
        setInterval(() => {
            if (document.visibilityState === 'visible') {
                safe.addClass(ctaButton, 'pulse');
                setTimeout(() => {
                    safe.removeClass(ctaButton, 'pulse');
                }, 1000);
            }
        }, 10000);
        
        console.log('✅ CTA button effects set up');
    } catch (error) {
        console.error('❌ Error setting up CTA effects:', error);
    }
}

// ============================================================================
// SCROLL ANIMATIONS
// ============================================================================

function setupScrollAnimations() {
    const sections = safe.getAll('section');
    const isMobile = window.innerWidth <= 768;
    
    if (sections.length === 0) return;
    
    console.log(`📜 Setting up scroll animations for ${sections.length} sections`);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                safe.addClass(entry.target, 'animated');
            }
        });
    }, { 
        threshold: isMobile ? 0.1 : 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        if (section) observer.observe(section);
    });
}

// ============================================================================
// CONTENT ANIMATIONS
// ============================================================================

function startContentAnimations() {
    console.log('🎭 Starting content animations...');
    
    try {
        // Animate mission features
        setTimeout(() => {
            const missionFeatures = safe.getAll('.mission-feature');
            missionFeatures.forEach((feature, index) => {
                setTimeout(() => {
                    safe.setStyle(feature, {
                        opacity: '1',
                        transform: 'translateY(0)'
                    });
                }, index * 150);
            });
        }, 500);
        
        // Animate visual elements
        setTimeout(() => {
            const visualElements = safe.getAll('.mission-visual i, .image-placeholder i');
            visualElements.forEach((el, index) => {
                setTimeout(() => {
                    safe.setStyle(el, {
                        opacity: '1',
                        transform: 'scale(1)'
                    });
                }, index * 300);
            });
        }, 800);
        
        console.log('✅ Content animations started');
    } catch (error) {
        console.error('❌ Error starting content animations:', error);
    }
}

// ============================================================================
// MOBILE OPTIMIZATIONS
// ============================================================================

function setupMobileOptimizations() {
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) return;
    
    console.log('📱 Setting up mobile optimizations...');
    
    try {
        // Add mobile class to body
        safe.addClass(document.body, 'is-mobile');
        
        // Improve touch targets
        const touchElements = safe.getAll('.btn, .team-member, .speck-service-card');
        touchElements.forEach(el => {
            if (!el) return;
            
            safe.setStyle(el, {
                minHeight: '44px',
                minWidth: '44px'
            });
        });
        
        console.log('✅ Mobile optimizations applied');
    } catch (error) {
        console.error('❌ Error setting up mobile optimizations:', error);
    }
}

// ============================================================================
// INITIALIZATION AND EVENT HANDLERS
// ============================================================================

// DOM Ready initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 About page DOM loaded');
    
    try {
        setTimeout(() => {
            initAbout();
            setupMobileOptimizations();
        }, 100);
    } catch (error) {
        console.error('❌ Error in DOMContentLoaded:', error);
    }
});

// Export for global access
window.initAbout = initAbout;
window.animateTeamPhotos = animateTeamPhotos;

console.log('✅ about.js fully loaded');
