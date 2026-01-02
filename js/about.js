// about.js - COMPLETE REWRITE WITH ABSOLUTE HEADER FIX
console.log('🚀 about.js loaded - COMPLETE REWRITE WITH ABSOLUTE HEADER FIX');

// MAIN INITIALIZATION FUNCTION
function initAbout() {
    console.log('🎯 Initializing about page with absolute header control...');
    
    // STEP 1: ABSOLUTE HEADER FIX (FIRST PRIORITY)
    applyAbsoluteHeaderFix();
    
    // STEP 2: CONTENT ADJUSTMENT
    adjustContentForHeader();
    
    // STEP 3: ADDITIONAL FUNCTIONALITIES
    setupPageFunctionalities();
    
    // STEP 4: MONITORING AND BACKUP
    setupMonitoringSystems();
    
    console.log('✅ About page fully initialized with absolute control');
}

// ABSOLUTE HEADER FIX - 100% GUARANTEED
function applyAbsoluteHeaderFix() {
    console.log('🔧 Applying ABSOLUTE header fix...');
    
    // Function to apply the fix with multiple attempts
    const applyFix = (attempt = 1) => {
        const headerContainer = document.getElementById('header-container');
        
        // Check if container exists
        if (!headerContainer) {
            console.warn(`⚠️ Header container not found (attempt ${attempt})`);
            if (attempt < 5) {
                setTimeout(() => applyFix(attempt + 1), 300 * attempt);
            }
            return;
        }
        
        console.log(`✅ Header container found on attempt ${attempt}`);
        
        // STEP A: Force container styles
        headerContainer.style.cssText = `
            position: relative !important;
            width: 100% !important;
            height: 90px !important;
            margin: 0 !important;
            padding: 0 !important;
            display: block !important;
            overflow: visible !important;
            z-index: 1000 !important;
            box-sizing: border-box !important;
        `;
        
        // STEP B: Find ANY header element inside container
        const findHeaderElement = () => {
            const possibleSelectors = [
                '.main-header',
                'header',
                '.header',
                '[class*="header"]',
                '[class*="Header"]',
                'nav',
                '.navbar',
                '.navigation',
                'div:first-child',
                'nav:first-child',
                'header:first-child',
                '*:first-child'
            ];
            
            for (const selector of possibleSelectors) {
                try {
                    const element = headerContainer.querySelector(selector);
                    if (element && element.offsetWidth > 0) {
                        console.log(`✅ Found header with selector: ${selector}`);
                        return element;
                    }
                } catch (e) {
                    // Skip invalid selectors
                }
            }
            
            // If nothing found, check children directly
            if (headerContainer.children.length > 0) {
                const firstChild = headerContainer.children[0];
                console.log(`✅ Using first child as header: ${firstChild.tagName}`);
                return firstChild;
            }
            
            return null;
        };
        
        // STEP C: Apply absolute fix to header element
        const headerElement = findHeaderElement();
        
        if (!headerElement) {
            console.warn(`⚠️ No header element found inside container (attempt ${attempt})`);
            if (attempt < 5) {
                setTimeout(() => applyFix(attempt + 1), 500);
            }
            return;
        }
        
        console.log('🎯 Applying absolute fix to header element:', headerElement.tagName);
        
        // REMOVE ANY POTENTIAL INTERFERING STYLES
        headerElement.removeAttribute('style');
        headerElement.classList.remove('header-hidden');
        headerElement.classList.remove('hidden');
        headerElement.classList.add('header-about-fixed');
        
        // APPLY ABSOLUTE STYLES BASED ON SCREEN SIZE
        if (window.innerWidth > 768) {
            // DESKTOP STYLES
            headerElement.style.cssText = `
                /* POSITIONING */
                position: fixed !important;
                top: 20px !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
                z-index: 1000 !important;
                
                /* SIZING */
                width: calc(100% - 40px) !important;
                max-width: 1200px !important;
                margin: 0 auto !important;
                box-sizing: border-box !important;
                
                /* VISUALS */
                background: rgba(10, 12, 18, 0.95) !important;
                backdrop-filter: blur(20px) !important;
                -webkit-backdrop-filter: blur(20px) !important;
                border: 1px solid rgba(255, 255, 255, 0.12) !important;
                border-radius: 20px !important;
                box-shadow: 
                    0 10px 40px rgba(0, 0, 0, 0.4),
                    inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
                
                /* VISIBILITY */
                opacity: 1 !important;
                visibility: visible !important;
                pointer-events: all !important;
                display: block !important;
                
                /* TRANSITIONS */
                transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
                
                /* RESET ANY INTERFERENCE */
                bottom: auto !important;
                right: auto !important;
                margin-top: 0 !important;
                margin-bottom: 0 !important;
                float: none !important;
                clear: none !important;
            `;
        } else {
            // MOBILE STYLES
            headerElement.style.cssText = `
                /* POSITIONING */
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                transform: none !important;
                z-index: 1000 !important;
                
                /* SIZING */
                width: 100% !important;
                max-width: 100% !important;
                border-radius: 0 !important;
                box-sizing: border-box !important;
                
                /* VISUALS */
                border: none !important;
                border-bottom: 1px solid rgba(255, 255, 255, 0.12) !important;
                padding: 15px 20px !important;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3) !important;
                background: rgba(10, 12, 18, 0.98) !important;
                backdrop-filter: blur(20px) !important;
                -webkit-backdrop-filter: blur(20px) !important;
                
                /* VISIBILITY */
                opacity: 1 !important;
                visibility: visible !important;
                pointer-events: all !important;
                display: block !important;
                
                /* RESET ANY INTERFERENCE */
                bottom: auto !important;
                right: auto !important;
                margin: 0 !important;
                float: none !important;
                clear: none !important;
            `;
        }
        
        // Set flag to prevent re-fixing
        headerElement.setAttribute('data-header-fixed', 'true');
        headerElement.setAttribute('data-fixed-by', 'about-js-absolute-fix');
        
        console.log('✅ Absolute header fix applied successfully');
        
        // Return success
        return true;
    };
    
    // Apply fix immediately and with multiple backup attempts
    applyFix(1);
    
    // Backup attempts
    setTimeout(() => applyFix(2), 500);
    setTimeout(() => applyFix(3), 1500);
    setTimeout(() => applyFix(4), 3000);
}

// ADJUST CONTENT PADDING FOR HEADER
function adjustContentForHeader() {
    const adjustPadding = () => {
        const headerElement = document.querySelector('[data-header-fixed="true"]') ||
                             document.querySelector('.header-about-fixed') ||
                             document.querySelector('#header-container .main-header') ||
                             document.querySelector('#header-container header');
        
        const heroSection = document.querySelector('.about-hero');
        
        if (!headerElement || !heroSection) {
            console.log('⚠️ Elements not found for padding adjustment');
            return;
        }
        
        const headerHeight = headerElement.offsetHeight;
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            heroSection.style.paddingTop = `${headerHeight + 40}px`;
        } else {
            heroSection.style.paddingTop = `${headerHeight + 60}px`;
        }
        
        console.log(`📏 Header height: ${headerHeight}px, padding adjusted`);
    };
    
    // Adjust immediately and after a delay
    setTimeout(adjustPadding, 100);
    setTimeout(adjustPadding, 1000);
}

// SETUP ALL PAGE FUNCTIONALITIES
function setupPageFunctionalities() {
    console.log('⚙️ Setting up page functionalities...');
    
    // 1. Team Interactions
    setupTeamInteractions();
    
    // 2. Story Statistics
    setupStoryStats();
    
    // 3. Speck Animations
    setupSpeckAnimations();
    
    // 4. Mobile Optimizations
    setupMobileOptimizations();
    
    // 5. Image Loading
    setupImageLoading();
    
    // 6. CTA Animations
    setupCTAAnimations();
    
    // 7. Scroll Animations
    setupScrollAnimations();
    
    // 8. Language Integration
    setupLanguageIntegration();
    
    console.log('✅ All page functionalities initialized');
}

// TEAM INTERACTIONS
function setupTeamInteractions() {
    const teamMembers = document.querySelectorAll('.team-member');
    const isMobile = window.innerWidth <= 768;
    
    console.log(`👥 Found ${teamMembers.length} team members`);
    
    teamMembers.forEach((member, index) => {
        if (!isMobile) {
            member.addEventListener('mouseenter', () => {
                member.style.transform = 'translateY(-10px)';
                member.style.transition = 'all 0.3s ease';
            });
            
            member.addEventListener('mouseleave', () => {
                member.style.transform = 'translateY(0)';
            });
        }
    });
}

// STORY STATISTICS ANIMATION
function setupStoryStats() {
    const storyStats = document.querySelectorAll('.story-stat');
    
    if (storyStats.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                storyStats.forEach((stat, index) => {
                    setTimeout(() => {
                        stat.style.opacity = '1';
                        stat.style.transform = 'translateY(0)';
                    }, index * 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const storySection = document.querySelector('.our-story');
    if (storySection) {
        storyStats.forEach(stat => {
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(20px)';
            stat.style.transition = 'all 0.6s ease';
        });
        observer.observe(storySection);
    }
}

// SPECK DESIGN ANIMATIONS
function setupSpeckAnimations() {
    const speckCards = document.querySelectorAll('.speck-service-card');
    const isMobile = window.innerWidth <= 768;
    
    if (speckCards.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = isMobile ? index * 100 : index * 150;
                
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: isMobile ? 0.1 : 0.2,
        rootMargin: '0px 0px -30px 0px'
    });
    
    speckCards.forEach((card) => {
        card.style.opacity = '1';
        observer.observe(card);
    });
}

// MOBILE OPTIMIZATIONS
function setupMobileOptimizations() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Prevent zoom on double tap
        document.addEventListener('touchend', function(event) {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        }, { passive: false });
        
        // Improve touch feedback
        const touchElements = document.querySelectorAll('.btn, .speck-service-card, .team-member');
        touchElements.forEach(el => {
            el.addEventListener('touchstart', function() {
                this.style.opacity = '0.8';
            });
            
            el.addEventListener('touchend', function() {
                this.style.opacity = '1';
            });
        });
    }
}

// IMAGE LOADING OPTIMIZATION
function setupImageLoading() {
    const images = document.querySelectorAll('.member-photo img');
    
    images.forEach(img => {
        img.loading = 'lazy';
        img.decoding = 'async';
        
        img.onload = function() {
            this.style.opacity = '1';
        };
        
        img.onerror = function() {
            const initials = this.alt.match(/\b([A-Z])/g)?.join('') || 'NB';
            if (window.handleTeamPhotoError) {
                window.handleTeamPhotoError(this, initials);
            }
        };
    });
}

// CTA BUTTON ANIMATIONS
function setupCTAAnimations() {
    const ctaButton = document.querySelector('.about-cta .btn');
    
    if (!ctaButton) return;
    
    const arrowIcon = ctaButton.querySelector('.fa-arrow-right');
    
    ctaButton.addEventListener('mouseenter', function() {
        if (arrowIcon) {
            arrowIcon.style.transform = 'translateX(8px)';
        }
    });
    
    ctaButton.addEventListener('mouseleave', function() {
        if (arrowIcon) {
            arrowIcon.style.transform = 'translateX(0)';
        }
    });
}

// SCROLL ANIMATIONS
function setupScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const isMobile = window.innerWidth <= 768;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { 
        threshold: isMobile ? 0.1 : 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// LANGUAGE INTEGRATION
function setupLanguageIntegration() {
    window.addEventListener('languageChanged', function(event) {
        console.log('🌐 Language changed:', event.detail.lang);
        
        setTimeout(() => {
            if (typeof window.setupSpeckAnimations === 'function') {
                window.setupSpeckAnimations();
            }
        }, 300);
    });
}

// MONITORING AND BACKUP SYSTEMS
function setupMonitoringSystems() {
    console.log('🔍 Setting up monitoring systems...');
    
    // 1. Resize handler for header
    window.addEventListener('resize', () => {
        console.log('🔄 Window resized, reapplying header fix...');
        applyAbsoluteHeaderFix();
        adjustContentForHeader();
    });
    
    // 2. Mutation observer for DOM changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                console.log('🔄 DOM changed, checking header...');
                setTimeout(() => {
                    const header = document.querySelector('[data-header-fixed="true"]');
                    if (!header || window.getComputedStyle(header).position !== 'fixed') {
                        console.log('⚠️ Header lost fixed position, reapplying...');
                        applyAbsoluteHeaderFix();
                    }
                }, 100);
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // 3. Backup interval check
    setInterval(() => {
        const header = document.querySelector('[data-header-fixed="true"]');
        if (header) {
            const style = window.getComputedStyle(header);
            if (style.position !== 'fixed') {
                console.log('🛡️ Backup check: Header position incorrect, fixing...');
                applyAbsoluteHeaderFix();
            }
        }
    }, 10000); // Check every 10 seconds
    
    console.log('✅ Monitoring systems activated');
}

// INJECT CRITICAL CSS FOR HEADER FIX
function injectCriticalCSS() {
    if (!document.getElementById('about-critical-css')) {
        const style = document.createElement('style');
        style.id = 'about-critical-css';
        style.textContent = `
            /* CRITICAL HEADER FIX CSS */
            body.about-page #header-container {
                position: relative !important;
                width: 100% !important;
                height: 90px !important;
                margin: 0 !important;
                padding: 0 !important;
                display: block !important;
                z-index: 1000 !important;
            }
            
            body.about-page #header-container .main-header,
            body.about-page #header-container header,
            body.about-page #header-container .header {
                position: fixed !important;
                top: 20px !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
                z-index: 1000 !important;
                width: calc(100% - 40px) !important;
                max-width: 1200px !important;
                margin: 0 auto !important;
            }
            
            @media (max-width: 768px) {
                body.about-page #header-container .main-header,
                body.about-page #header-container header,
                body.about-page #header-container .header {
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    transform: none !important;
                    width: 100% !important;
                    max-width: 100% !important;
                }
            }
            
            /* PREVENT FLICKERING */
            .header-about-fixed {
                will-change: transform;
            }
        `;
        document.head.appendChild(style);
        console.log('✅ Critical CSS injected');
    }
}

// INITIALIZE ON DOM LOAD
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM fully loaded, starting about page initialization...');
    
    // Inject critical CSS immediately
    injectCriticalCSS();
    
    // Initial initialization
    setTimeout(() => {
        if (typeof initAbout === 'function') {
            initAbout();
        }
    }, 100);
    
    // Backup initialization
    setTimeout(() => {
        if (typeof initAbout === 'function') {
            initAbout();
        }
    }, 1000);
});

// FALLBACK FOR EARLY LOAD
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    setTimeout(() => {
        if (typeof initAbout === 'function') {
            initAbout();
        }
    }, 50);
}

// EXPORT FUNCTIONS FOR GLOBAL ACCESS
window.initAbout = initAbout;
window.applyAbsoluteHeaderFix = applyAbsoluteHeaderFix;
window.adjustContentForHeader = adjustContentForHeader;

console.log('✅ about.js fully loaded and ready for execution');
