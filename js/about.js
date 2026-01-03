// ============================================================================
// about.js - CLEAN VERSION WITHOUT HEADER FIXES
// Header management is now ONLY in header.html component
// ============================================================================

console.log('🚀 about.js loaded - CLEAN VERSION');

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
// MAIN INITIALIZATION FUNCTION
// ============================================================================

function initAbout() {
    console.log('🎯 Initializing about page content...');
    
    try {
        // Setup all page functionalities (header is handled by header.html)
        setupPageFunctionalities();
        
        // Setup mobile optimizations
        setupMobileOptimizations();
        
        // Start content animations
        startContentAnimations();
        
        console.log('✅ About page content initialized');
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
        // 1. Team Interactions
        setupTeamInteractions();
        
        // 2. Story Statistics
        setupStoryStats();
        
        // 3. Speck Animations
        setupSpeckAnimations();
        
        // 4. Image Loading
        setupImageLoading();
        
        // 5. CTA Animations
        setupCTAAnimations();
        
        // 6. Scroll Animations
        setupScrollAnimations();
        
        // 7. Language Integration
        setupLanguageIntegration();
        
        console.log('✅ All page functionalities initialized');
    } catch (error) {
        console.error('❌ Error setting up page functionalities:', error);
    }
}

// ============================================================================
// TEAM INTERACTIONS
// ============================================================================

function setupTeamInteractions() {
    const teamMembers = safe.getAll('.team-member');
    const isMobile = window.innerWidth <= 768;
    
    console.log(`👥 Found ${teamMembers.length} team members`);
    
    teamMembers.forEach((member, index) => {
        if (!member) return;
        
        // Add data attribute for identification
        try {
            member.setAttribute('data-team-member', index + 1);
        } catch (error) {
            console.error('❌ Error setting attribute on team member:', error);
        }
        
        // Desktop hover effects
        if (!isMobile) {
            safe.on(member, 'mouseenter', () => {
                safe.setStyle(member, {
                    transform: 'translateY(-10px) scale(1.02)',
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    boxShadow: '0 20px 40px rgba(0, 102, 255, 0.3)'
                });
                
                // Animate member photo
                const photo = member.querySelector('.member-photo');
                if (photo) {
                    safe.setStyle(photo, {
                        transform: 'scale(1.05)',
                        transition: 'transform 0.3s ease'
                    });
                }
            });
            
            safe.on(member, 'mouseleave', () => {
                safe.setStyle(member, {
                    transform: 'translateY(0) scale(1)',
                    boxShadow: ''
                });
                
                // Reset member photo
                const photo = member.querySelector('.member-photo');
                if (photo) {
                    safe.setStyle(photo, { transform: 'scale(1)' });
                }
            });
        }
        
        // Mobile touch effects
        if (isMobile) {
            safe.on(member, 'touchstart', function(e) {
                try {
                    e.preventDefault();
                    safe.setStyle(this, {
                        transform: 'scale(0.98)',
                        opacity: '0.95',
                        transition: 'all 0.2s ease'
                    });
                } catch (error) {
                    console.error('❌ Error in touchstart:', error);
                }
            });
            
            safe.on(member, 'touchend', function() {
                safe.setStyle(this, {
                    transform: 'scale(1)',
                    opacity: '1'
                });
            });
            
            safe.on(member, 'touchcancel', function() {
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
                console.log('🎯 Story stats section visible, animating...');
                
                storyStats.forEach((stat, index) => {
                    if (!stat) return;
                    
                    setTimeout(() => {
                        // Animate container
                        safe.setStyle(stat, {
                            opacity: '1',
                            transform: 'translateY(0)',
                            transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        });
                        
                        // Animate counter if not already animated
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
    }, { 
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    const storySection = safe.get('.our-story');
    if (storySection) {
        // Set initial state
        storyStats.forEach(stat => {
            if (stat) {
                safe.setStyle(stat, {
                    opacity: '0',
                    transform: 'translateY(30px)'
                });
            }
        });
        
        // Start observing
        observer.observe(storySection);
        
        // Fallback: animate after 2 seconds if not triggered
        setTimeout(() => {
            if (storyStats[0] && storyStats[0].style.opacity === '0') {
                console.log('🔄 Fallback: Triggering story stats animation');
                storyStats.forEach((stat, index) => {
                    if (!stat) return;
                    
                    setTimeout(() => {
                        safe.setStyle(stat, {
                            opacity: '1',
                            transform: 'translateY(0)'
                        });
                    }, index * 200);
                });
            }
        }, 2000);
    }
}

function animateCounter(element) {
    // Проверка на существование элемента
    if (!element) {
        console.error('❌ animateCounter: element is null or undefined');
        return;
    }
    
    try {
        const text = element.textContent || '';
        const finalValue = parseInt(text.replace('+', '')) || 0;
        
        if (finalValue <= 0) return;
        
        const duration = 1500; // 1.5 seconds
        const steps = 60;
        const increment = finalValue / steps;
        let currentValue = 0;
        let step = 0;
        
        const animateStep = () => {
            // Проверка на существование элемента в каждом кадре
            if (!element) {
                console.error('❌ animateCounter: element was removed during animation');
                return;
            }
            
            if (step >= steps) {
                element.textContent = text;
                // Add celebration effect
                safe.setStyle(element, { transform: 'scale(1.1)' });
                setTimeout(() => {
                    if (element) {
                        safe.setStyle(element, { 
                            transform: 'scale(1)',
                            transition: 'transform 0.3s ease'
                        });
                    }
                }, 200);
                return;
            }
            
            currentValue += increment;
            element.textContent = Math.floor(currentValue) + (text.includes('+') ? '+' : '');
            step++;
            
            requestAnimationFrame(animateStep);
        };
        
        // Start animation
        requestAnimationFrame(animateStep);
    } catch (error) {
        console.error('❌ Error animating counter:', error);
    }
}

// ============================================================================
// SPECK DESIGN ANIMATIONS
// ============================================================================

function setupSpeckAnimations() {
    const speckCards = safe.getAll('.speck-service-card');
    const isMobile = window.innerWidth <= 768;
    
    if (speckCards.length === 0) {
        console.log('💎 No Speck design cards found');
        return;
    }
    
    console.log(`💎 Found ${speckCards.length} Speck design cards`);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = isMobile ? index * 100 : index * 150;
                
                setTimeout(() => {
                    if (entry.target) {
                        safe.addClass(entry.target, 'revealed');
                        
                        // Animate icon
                        const icon = entry.target.querySelector('.speck-card-icon');
                        if (icon) {
                            safe.setStyle(icon, {
                                transform: 'scale(1) rotate(0deg)',
                                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                            });
                        }
                        
                        console.log(`✨ Revealed card ${index + 1}`);
                    }
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: isMobile ? 0.1 : 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Set initial state and start observing
    speckCards.forEach((card, index) => {
        if (!card) return;
        
        try {
            card.setAttribute('data-speck-card', index + 1);
            
            // Set initial state based on animation class
            if (card.classList.contains('reveal-left') || card.classList.contains('reveal-right')) {
                safe.setStyle(card, { opacity: '0' });
            }
            
            observer.observe(card);
        } catch (error) {
            console.error('❌ Error setting up speck card:', error);
        }
    });
    
    // Fallback: reveal all after 3 seconds
    setTimeout(() => {
        speckCards.forEach((card, index) => {
            if (card && !card.classList.contains('revealed')) {
                safe.addClass(card, 'revealed');
                safe.setStyle(card, {
                    opacity: '1',
                    transform: 'none'
                });
            }
        });
    }, 3000);
}

// ============================================================================
// MOBILE OPTIMIZATIONS
// ============================================================================

function setupMobileOptimizations() {
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) return;
    
    console.log('📱 Setting up mobile optimizations...');
    
    try {
        // Prevent zoom on double tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, { passive: false });
        
        // Improve touch feedback for interactive elements
        const touchElements = safe.getAll('.btn, .speck-service-card, .team-member, .mission-feature, .story-stat');
        
        touchElements.forEach(el => {
            if (!el) return;
            
            // Increase touch target size for buttons
            if (el.classList.contains('btn')) {
                safe.setStyle(el, {
                    minHeight: '44px',
                    minWidth: '44px'
                });
            }
            
            // Add touch feedback
            safe.on(el, 'touchstart', function() {
                safe.setStyle(this, {
                    transform: 'scale(0.98)',
                    opacity: '0.9',
                    transition: 'all 0.1s ease'
                });
            });
            
            safe.on(el, 'touchend', function() {
                safe.setStyle(this, {
                    transform: 'scale(1)',
                    opacity: '1'
                });
            });
            
            safe.on(el, 'touchcancel', function() {
                safe.setStyle(this, {
                    transform: 'scale(1)',
                    opacity: '1'
                });
            });
        });
        
        // Optimize scrolling performance
        document.body.style.webkitOverflowScrolling = 'touch';
        document.documentElement.style.scrollBehavior = 'auto';
        
        // Disable hover effects on mobile
        safe.addClass(document.body, 'is-mobile');
        
        console.log('✅ Mobile optimizations applied');
    } catch (error) {
        console.error('❌ Error setting up mobile optimizations:', error);
    }
}

// ============================================================================
// IMAGE LOADING OPTIMIZATION
// ============================================================================

function setupImageLoading() {
    const images = safe.getAll('.member-photo img');
    
    if (images.length === 0) {
        console.log('🖼️ No team images found');
        return;
    }
    
    console.log(`🖼️ Found ${images.length} team images`);
    
    images.forEach((img, index) => {
        if (!img) return;
        
        try {
            // Set loading attributes
            img.loading = 'lazy';
            img.decoding = 'async';
            img.setAttribute('data-image-index', index + 1);
            
            // Set initial state
            safe.setStyle(img, {
                opacity: '0',
                transition: 'opacity 0.5s ease'
            });
            
            // Handle successful load
            img.onload = function() {
                if (this) {
                    safe.setStyle(this, { opacity: '1' });
                    console.log(`✅ Image loaded: ${this.src || this.alt}`);
                }
            };
            
            // Handle error
            img.onerror = function() {
                console.warn(`❌ Failed to load image: ${this.src || this.alt}`);
                
                // Extract initials from alt text
                const alt = this.alt || '';
                const initials = alt.match(/\b([A-Z])/g)?.join('') || 'NB';
                
                // Use global fallback function if available
                if (typeof window.handleTeamPhotoError === 'function') {
                    window.handleTeamPhotoError(this, initials);
                } else {
                    // Local fallback
                    createImageFallback(this, initials);
                }
            };
            
            // Force load if not loaded after 2 seconds
            setTimeout(() => {
                if (img && img.complete && img.naturalHeight === 0) {
                    img.dispatchEvent(new Event('error'));
                }
            }, 2000);
        } catch (error) {
            console.error('❌ Error setting up image loading:', error);
        }
    });
    
    console.log('✅ Image loading optimized');
}

function createImageFallback(imgElement, initials) {
    if (!imgElement || !imgElement.parentElement) return;
    
    try {
        const parent = imgElement.parentElement;
        
        // Create SVG fallback
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 200 200');
        svg.setAttribute('width', '200');
        svg.setAttribute('height', '200');
        svg.style.borderRadius = '50%';
        svg.style.background = 'linear-gradient(135deg, #0066ff, #00aaff)';
        
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', '50%');
        text.setAttribute('y', '50%');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dy', '0.35em');
        text.setAttribute('fill', 'white');
        text.setAttribute('font-size', '70');
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('font-family', 'Arial, sans-serif');
        text.textContent = initials;
        
        svg.appendChild(text);
        
        // Replace image with SVG
        parent.innerHTML = '';
        parent.appendChild(svg);
        safe.addClass(parent, 'image-fallback');
        
        console.log(`🔄 Created SVG fallback for ${initials}`);
    } catch (error) {
        console.error('❌ Error creating image fallback:', error);
    }
}

// ============================================================================
// CTA BUTTON ANIMATIONS
// ============================================================================

function setupCTAAnimations() {
    const ctaButton = safe.get('.about-cta .btn');
    
    if (!ctaButton) {
        console.log('📣 No CTA button found');
        return;
    }
    
    console.log('📣 Setting up CTA button animations');
    
    try {
        const arrowIcon = ctaButton.querySelector('.fa-arrow-right');
        
        // Hover animations
        safe.on(ctaButton, 'mouseenter', function() {
            safe.setStyle(this, {
                transform: 'translateY(-5px) scale(1.05)',
                boxShadow: '0 25px 60px rgba(0, 102, 255, 0.5)',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
            });
            
            if (arrowIcon) {
                safe.setStyle(arrowIcon, {
                    transform: 'translateX(8px)',
                    transition: 'transform 0.3s ease'
                });
            }
        });
        
        safe.on(ctaButton, 'mouseleave', function() {
            safe.setStyle(this, {
                transform: 'translateY(0) scale(1)',
                boxShadow: ''
            });
            
            if (arrowIcon) {
                safe.setStyle(arrowIcon, { transform: 'translateX(0)' });
            }
        });
        
        // Click/touch animations
        safe.on(ctaButton, 'mousedown', function() {
            safe.setStyle(this, { transform: 'scale(0.95)' });
        });
        
        safe.on(ctaButton, 'mouseup', function() {
            safe.setStyle(this, { transform: 'translateY(-5px) scale(1.05)' });
        });
        
        // Pulsing animation every 10 seconds
        let pulseInterval;
        
        const startPulseAnimation = () => {
            pulseInterval = setInterval(() => {
                if (document.visibilityState === 'visible') {
                    safe.addClass(ctaButton, 'pulse');
                    setTimeout(() => {
                        safe.removeClass(ctaButton, 'pulse');
                    }, 1000);
                }
            }, 10000);
        };
        
        const stopPulseAnimation = () => {
            if (pulseInterval) {
                clearInterval(pulseInterval);
                pulseInterval = null;
            }
        };
        
        // Start pulse animation when page is visible
        if (document.visibilityState === 'visible') {
            startPulseAnimation();
        }
        
        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                startPulseAnimation();
            } else {
                stopPulseAnimation();
            }
        });
        
        console.log('✅ CTA button animations set up');
    } catch (error) {
        console.error('❌ Error setting up CTA animations:', error);
    }
}

// ============================================================================
// SCROLL ANIMATIONS
// ============================================================================

function setupScrollAnimations() {
    const sections = safe.getAll('section');
    const isMobile = window.innerWidth <= 768;
    
    if (sections.length === 0) {
        console.log('📜 No sections found for scroll animations');
        return;
    }
    
    console.log(`📜 Found ${sections.length} sections for scroll animations`);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                safe.addClass(entry.target, 'animated');
                
                // Add delay for children animations
                const animatedChildren = entry.target.querySelectorAll('.reveal-left, .reveal-right');
                animatedChildren.forEach((child, index) => {
                    setTimeout(() => {
                        if (child) safe.addClass(child, 'revealed');
                    }, index * 100);
                });
            }
        });
    }, { 
        threshold: isMobile ? 0.1 : 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        if (section) observer.observe(section);
    });
    
    console.log('✅ Scroll animations set up');
}

// ============================================================================
// LANGUAGE INTEGRATION
// ============================================================================

function setupLanguageIntegration() {
    console.log('🌐 Setting up language integration...');
    
    try {
        // Listen for language change events
        window.addEventListener('languageChanged', function(event) {
            console.log('🔄 Language changed to:', event.detail.lang);
            
            // Re-initialize animations after language change
            setTimeout(() => {
                if (typeof window.setupSpeckAnimations === 'function') {
                    window.setupSpeckAnimations();
                }
                
                if (typeof window.setupStoryStats === 'function') {
                    window.setupStoryStats();
                }
                
                // Update UI elements if needed
                updateLanguageSpecificUI(event.detail.lang);
            }, 300);
        });
        
        // Initialize language switcher UI
        updateLanguageSwitcherUI();
        
        console.log('✅ Language integration set up');
    } catch (error) {
        console.error('❌ Error setting up language integration:', error);
    }
}

function updateLanguageSpecificUI(lang) {
    // Update any language-specific UI elements
    const elements = safe.getAll('[data-i18n]');
    console.log(`🔄 Updating ${elements.length} language-specific elements`);
    
    // Add visual feedback for language change
    safe.addClass(document.body, 'language-changing');
    setTimeout(() => {
        safe.removeClass(document.body, 'language-changing');
    }, 500);
}

function updateLanguageSwitcherUI() {
    const langSwitcher = safe.get('.language-switcher');
    if (!langSwitcher) return;
    
    try {
        // Get current language from localStorage or default to 'ru'
        const currentLang = localStorage.getItem('preferredLang') || 'ru';
        langSwitcher.setAttribute('data-current-lang', currentLang);
        
        // Update active buttons
        const langButtons = safe.getAll('.lang-btn');
        langButtons.forEach(btn => {
            if (!btn) return;
            safe.removeClass(btn, 'active');
            if (btn.getAttribute('data-lang') === currentLang) {
                safe.addClass(btn, 'active');
            }
        });
    } catch (error) {
        console.error('❌ Error updating language switcher UI:', error);
    }
}

// ============================================================================
// CONTENT ANIMATIONS
// ============================================================================

function startContentAnimations() {
    console.log('🎭 Starting content animations...');
    
    try {
        // Initialize Intersection Observers for animations
        setupAllObservers();
        
        // Start any delayed animations
        setTimeout(() => {
            // Trigger any manual animations
            const elements = safe.getAll('[data-animate-on-load]');
            elements.forEach((el, index) => {
                setTimeout(() => {
                    if (el) safe.addClass(el, 'animated');
                }, index * 200);
            });
        }, 500);
        
        console.log('✅ Content animations started');
    } catch (error) {
        console.error('❌ Error starting content animations:', error);
    }
}

function setupAllObservers() {
    // Setup observers for different animation types
    const animationSelectors = [
        '.reveal-left',
        '.reveal-right',
        '.story-stat',
        '.mission-feature',
        '.speck-service-card'
    ];
    
    animationSelectors.forEach(selector => {
        const elements = safe.getAll(selector);
        if (elements.length > 0) {
            setupAnimationObserver(selector, elements);
        }
    });
}

function setupAnimationObserver(selector, elements) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target) {
                safe.addClass(entry.target, 'animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        if (el) observer.observe(el);
    });
}

// ============================================================================
// INITIALIZATION AND EVENT HANDLERS
// ============================================================================

// DOM Ready initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM fully loaded, starting about page initialization...');
    
    try {
        // Initial initialization with delay
        setTimeout(() => {
            if (typeof initAbout === 'function') {
                initAbout();
            } else {
                console.error('❌ initAbout function not found');
            }
        }, 100);
    } catch (error) {
        console.error('❌ Error in DOMContentLoaded for about page:', error);
    }
});

// Fallback for early load
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    setTimeout(() => {
        console.log('⚡ Early load detected, initializing...');
        try {
            if (typeof initAbout === 'function') {
                initAbout();
            }
        } catch (error) {
            console.error('❌ Error in early load initialization:', error);
        }
    }, 50);
}

// Global error handler for about page
window.addEventListener('error', function(event) {
    if (event.filename && event.filename.includes('about.js')) {
        console.error('❌ Global error in about.js:', event.message, event.error);
        event.preventDefault();
    }
});

// Export functions for global access
window.initAbout = initAbout;
window.setupSpeckAnimations = setupSpeckAnimations;
window.setupStoryStats = setupStoryStats;
window.setupTeamInteractions = setupTeamInteractions;
window.createImageFallback = createImageFallback;

// Global image fallback function
window.handleTeamPhotoError = function(img, initials) {
    console.warn('🖼️ Global fallback for team photo:', initials);
    createImageFallback(img, initials);
};

console.log('✅ about.js fully loaded and ready for execution');
