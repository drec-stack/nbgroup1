// ============================================================================
// about.js - CLEAN VERSION WITHOUT HEADER FIXES
// Header management is now ONLY in header.html component
// ============================================================================

console.log('🚀 about.js loaded - CLEAN VERSION');

// ============================================================================
// MAIN INITIALIZATION FUNCTION
// ============================================================================

function initAbout() {
    console.log('🎯 Initializing about page content...');
    
    // Setup all page functionalities (header is handled by header.html)
    setupPageFunctionalities();
    
    // Setup mobile optimizations
    setupMobileOptimizations();
    
    // Start content animations
    startContentAnimations();
    
    console.log('✅ About page content initialized');
}

// ============================================================================
// PAGE FUNCTIONALITIES SETUP
// ============================================================================

function setupPageFunctionalities() {
    console.log('⚙️ Setting up page functionalities...');
    
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
}

// ============================================================================
// TEAM INTERACTIONS
// ============================================================================

function setupTeamInteractions() {
    const teamMembers = document.querySelectorAll('.team-member');
    const isMobile = window.innerWidth <= 768;
    
    console.log(`👥 Found ${teamMembers.length} team members`);
    
    teamMembers.forEach((member, index) => {
        // Add data attribute for identification
        member.setAttribute('data-team-member', index + 1);
        
        // Desktop hover effects
        if (!isMobile) {
            member.addEventListener('mouseenter', () => {
                member.style.transform = 'translateY(-10px) scale(1.02)';
                member.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
                member.style.boxShadow = '0 20px 40px rgba(0, 102, 255, 0.3)';
                
                // Animate member photo
                const photo = member.querySelector('.member-photo');
                if (photo) {
                    photo.style.transform = 'scale(1.05)';
                    photo.style.transition = 'transform 0.3s ease';
                }
            });
            
            member.addEventListener('mouseleave', () => {
                member.style.transform = 'translateY(0) scale(1)';
                member.style.boxShadow = '';
                
                // Reset member photo
                const photo = member.querySelector('.member-photo');
                if (photo) {
                    photo.style.transform = 'scale(1)';
                }
            });
        }
        
        // Mobile touch effects
        if (isMobile) {
            member.addEventListener('touchstart', function(e) {
                e.preventDefault();
                this.style.transform = 'scale(0.98)';
                this.style.opacity = '0.95';
                this.style.transition = 'all 0.2s ease';
            });
            
            member.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
                this.style.opacity = '1';
            });
            
            member.addEventListener('touchcancel', function() {
                this.style.transform = 'scale(1)';
                this.style.opacity = '1';
            });
        }
    });
}

// ============================================================================
// STORY STATISTICS ANIMATION
// ============================================================================

function setupStoryStats() {
    const storyStats = document.querySelectorAll('.story-stat');
    
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
                    setTimeout(() => {
                        // Animate container
                        stat.style.opacity = '1';
                        stat.style.transform = 'translateY(0)';
                        stat.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                        
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
    
    const storySection = document.querySelector('.our-story');
    if (storySection) {
        // Set initial state
        storyStats.forEach(stat => {
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(30px)';
        });
        
        // Start observing
        observer.observe(storySection);
        
        // Fallback: animate after 2 seconds if not triggered
        setTimeout(() => {
            if (storyStats[0] && storyStats[0].style.opacity === '0') {
                console.log('🔄 Fallback: Triggering story stats animation');
                storyStats.forEach((stat, index) => {
                    setTimeout(() => {
                        stat.style.opacity = '1';
                        stat.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        }, 2000);
    }
}

function animateCounter(element) {
    const text = element.textContent;
    const finalValue = parseInt(text.replace('+', '')) || 0;
    
    if (finalValue <= 0) return;
    
    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const increment = finalValue / steps;
    let currentValue = 0;
    let step = 0;
    
    const animateStep = () => {
        if (step >= steps) {
            element.textContent = text;
            // Add celebration effect
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                element.style.transition = 'transform 0.3s ease';
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
}

// ============================================================================
// SPECK DESIGN ANIMATIONS
// ============================================================================

function setupSpeckAnimations() {
    const speckCards = document.querySelectorAll('.speck-service-card');
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
                    entry.target.classList.add('revealed');
                    
                    // Animate icon
                    const icon = entry.target.querySelector('.speck-card-icon');
                    if (icon) {
                        icon.style.transform = 'scale(1) rotate(0deg)';
                        icon.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    }
                    
                    console.log(`✨ Revealed card ${index + 1}`);
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
        card.setAttribute('data-speck-card', index + 1);
        
        // Set initial state based on animation class
        if (card.classList.contains('reveal-left') || card.classList.contains('reveal-right')) {
            card.style.opacity = '0';
        }
        
        observer.observe(card);
    });
    
    // Fallback: reveal all after 3 seconds
    setTimeout(() => {
        speckCards.forEach((card, index) => {
            if (!card.classList.contains('revealed')) {
                card.classList.add('revealed');
                card.style.opacity = '1';
                card.style.transform = 'none';
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
    const touchElements = document.querySelectorAll('.btn, .speck-service-card, .team-member, .mission-feature, .story-stat');
    
    touchElements.forEach(el => {
        // Increase touch target size for buttons
        if (el.classList.contains('btn')) {
            el.style.minHeight = '44px';
            el.style.minWidth = '44px';
        }
        
        // Add touch feedback
        el.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.opacity = '0.9';
            this.style.transition = 'all 0.1s ease';
        });
        
        el.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
            this.style.opacity = '1';
        });
        
        el.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
            this.style.opacity = '1';
        });
    });
    
    // Optimize scrolling performance
    document.body.style.webkitOverflowScrolling = 'touch';
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Disable hover effects on mobile
    document.body.classList.add('is-mobile');
    
    console.log('✅ Mobile optimizations applied');
}

// ============================================================================
// IMAGE LOADING OPTIMIZATION
// ============================================================================

function setupImageLoading() {
    const images = document.querySelectorAll('.member-photo img');
    
    if (images.length === 0) {
        console.log('🖼️ No team images found');
        return;
    }
    
    console.log(`🖼️ Found ${images.length} team images`);
    
    images.forEach((img, index) => {
        // Set loading attributes
        img.loading = 'lazy';
        img.decoding = 'async';
        img.setAttribute('data-image-index', index + 1);
        
        // Set initial state
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        // Handle successful load
        img.onload = function() {
            this.style.opacity = '1';
            console.log(`✅ Image loaded: ${this.src || this.alt}`);
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
            if (img.complete && img.naturalHeight === 0) {
                img.dispatchEvent(new Event('error'));
            }
        }, 2000);
    });
    
    console.log('✅ Image loading optimized');
}

function createImageFallback(imgElement, initials) {
    const parent = imgElement.parentElement;
    if (!parent) return;
    
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
    parent.classList.add('image-fallback');
    
    console.log(`🔄 Created SVG fallback for ${initials}`);
}

// ============================================================================
// CTA BUTTON ANIMATIONS
// ============================================================================

function setupCTAAnimations() {
    const ctaButton = document.querySelector('.about-cta .btn');
    
    if (!cttaButton) {
        console.log('📣 No CTA button found');
        return;
    }
    
    console.log('📣 Setting up CTA button animations');
    
    const arrowIcon = ctaButton.querySelector('.fa-arrow-right');
    
    // Hover animations
    ctaButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
        this.style.boxShadow = '0 25px 60px rgba(0, 102, 255, 0.5)';
        this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        if (arrowIcon) {
            arrowIcon.style.transform = 'translateX(8px)';
            arrowIcon.style.transition = 'transform 0.3s ease';
        }
    });
    
    ctaButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '';
        
        if (arrowIcon) {
            arrowIcon.style.transform = 'translateX(0)';
        }
    });
    
    // Click/touch animations
    ctaButton.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    ctaButton.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    // Pulsing animation every 10 seconds
    let pulseInterval;
    
    const startPulseAnimation = () => {
        pulseInterval = setInterval(() => {
            if (document.visibilityState === 'visible') {
                ctaButton.classList.add('pulse');
                setTimeout(() => {
                    ctaButton.classList.remove('pulse');
                }, 1000);
            }
        }, 10000);
    };
    
    const stopPulseAnimation = () => {
        if (pulseInterval) {
            clearInterval(pulseInterval);
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
}

// ============================================================================
// SCROLL ANIMATIONS
// ============================================================================

function setupScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const isMobile = window.innerWidth <= 768;
    
    if (sections.length === 0) {
        console.log('📜 No sections found for scroll animations');
        return;
    }
    
    console.log(`📜 Found ${sections.length} sections for scroll animations`);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add delay for children animations
                const animatedChildren = entry.target.querySelectorAll('.reveal-left, .reveal-right');
                animatedChildren.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('revealed');
                    }, index * 100);
                });
            }
        });
    }, { 
        threshold: isMobile ? 0.1 : 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    console.log('✅ Scroll animations set up');
}

// ============================================================================
// LANGUAGE INTEGRATION
// ============================================================================

function setupLanguageIntegration() {
    console.log('🌐 Setting up language integration...');
    
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
}

function updateLanguageSpecificUI(lang) {
    // Update any language-specific UI elements
    const elements = document.querySelectorAll('[data-i18n]');
    console.log(`🔄 Updating ${elements.length} language-specific elements`);
    
    // Add visual feedback for language change
    document.body.classList.add('language-changing');
    setTimeout(() => {
        document.body.classList.remove('language-changing');
    }, 500);
}

function updateLanguageSwitcherUI() {
    const langSwitcher = document.querySelector('.language-switcher');
    if (!langSwitcher) return;
    
    // Get current language from localStorage or default to 'ru'
    const currentLang = localStorage.getItem('preferredLang') || 'ru';
    langSwitcher.setAttribute('data-current-lang', currentLang);
    
    // Update active buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        }
    });
}

// ============================================================================
// CONTENT ANIMATIONS
// ============================================================================

function startContentAnimations() {
    console.log('🎭 Starting content animations...');
    
    // Initialize Intersection Observers for animations
    setupAllObservers();
    
    // Start any delayed animations
    setTimeout(() => {
        // Trigger any manual animations
        const elements = document.querySelectorAll('[data-animate-on-load]');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animated');
            }, index * 200);
        });
    }, 500);
    
    console.log('✅ Content animations started');
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
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            setupAnimationObserver(selector, elements);
        }
    });
}

function setupAnimationObserver(selector, elements) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

// ============================================================================
// INITIALIZATION AND EVENT HANDLERS
// ============================================================================

// DOM Ready initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM fully loaded, starting about page initialization...');
    
    // Initial initialization with delay
    setTimeout(() => {
        if (typeof initAbout === 'function') {
            initAbout();
        } else {
            console.error('❌ initAbout function not found');
        }
    }, 100);
});

// Fallback for early load
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    setTimeout(() => {
        console.log('⚡ Early load detected, initializing...');
        if (typeof initAbout === 'function') {
            initAbout();
        }
    }, 50);
}

// Global error handler for about page
window.addEventListener('error', function(event) {
    if (event.filename && event.filename.includes('about.js')) {
        console.error('❌ Error in about.js:', event.message, event.error);
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
