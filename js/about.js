// ============================================================================
// about.js - COMPLETE FILE WITH ABSOLUTE HEADER FIX
// Version: 2.0.0
// Description: Complete initialization for about page with guaranteed header fix
// ============================================================================

console.log('🚀 about.js loaded - COMPLETE REWRITE WITH ABSOLUTE HEADER FIX');

// ============================================================================
// MAIN INITIALIZATION FUNCTION
// ============================================================================

function initAbout() {
    console.log('🎯 Initializing about page with absolute header control...');
    
    // STEP 1: INJECT CRITICAL CSS IMMEDIATELY
    injectCriticalCSS();
    
    // STEP 2: ABSOLUTE HEADER FIX (FIRST PRIORITY)
    applyAbsoluteHeaderFix();
    
    // STEP 3: CONTENT ADJUSTMENT
    adjustContentForHeader();
    
    // STEP 4: SETUP ALL PAGE FUNCTIONALITIES
    setupPageFunctionalities();
    
    // STEP 5: SETUP MONITORING AND BACKUP SYSTEMS
    setupMonitoringSystems();
    
    console.log('✅ About page fully initialized with absolute control');
}

// ============================================================================
// ABSOLUTE HEADER FIX - 100% GUARANTEED
// ============================================================================

function applyAbsoluteHeaderFix() {
    console.log('🔧 Applying ABSOLUTE header fix...');
    
    // Function to apply the fix with multiple attempts
    const applyFix = (attempt = 1, maxAttempts = 5) => {
        console.log(`🔄 Header fix attempt ${attempt}/${maxAttempts}`);
        
        const headerContainer = document.getElementById('header-container');
        
        // Check if container exists
        if (!headerContainer) {
            console.warn(`⚠️ Header container not found (attempt ${attempt})`);
            if (attempt < maxAttempts) {
                setTimeout(() => applyFix(attempt + 1, maxAttempts), 300 * attempt);
            } else {
                console.error('❌ Header container not found after all attempts');
            }
            return false;
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
                    if (element && (element.offsetWidth > 0 || element.tagName)) {
                        console.log(`✅ Found header with selector: ${selector}`);
                        return element;
                    }
                } catch (e) {
                    // Skip invalid selectors
                }
            }
            
            // If nothing found, check children directly
            if (headerContainer.children.length > 0) {
                for (let i = 0; i < headerContainer.children.length; i++) {
                    const child = headerContainer.children[i];
                    if (child.tagName && child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE') {
                        console.log(`✅ Using child ${i} as header: ${child.tagName}`);
                        return child;
                    }
                }
            }
            
            return null;
        };
        
        // STEP C: Apply absolute fix to header element
        const headerElement = findHeaderElement();
        
        if (!headerElement) {
            console.warn(`⚠️ No header element found inside container (attempt ${attempt})`);
            if (attempt < maxAttempts) {
                setTimeout(() => applyFix(attempt + 1, maxAttempts), 500);
            }
            return false;
        }
        
        console.log('🎯 Applying absolute fix to header element:', headerElement.tagName);
        
        // REMOVE ANY POTENTIAL INTERFERING STYLES
        headerElement.removeAttribute('style');
        
        // Remove problematic classes
        const problematicClasses = ['header-hidden', 'hidden', 'scrolled', 'header-scrolled'];
        problematicClasses.forEach(className => {
            if (headerElement.classList.contains(className)) {
                headerElement.classList.remove(className);
            }
        });
        
        // Add our fixing class
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
                animation: none !important;
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
                animation: none !important;
            `;
        }
        
        // Set flag to prevent re-fixing
        headerElement.setAttribute('data-header-fixed', 'true');
        headerElement.setAttribute('data-fixed-by', 'about-js-absolute-fix');
        headerElement.setAttribute('data-fixed-timestamp', Date.now());
        
        console.log('✅ Absolute header fix applied successfully');
        
        // Dispatch event that header is fixed
        window.dispatchEvent(new CustomEvent('headerFixed', {
            detail: { element: headerElement, timestamp: Date.now() }
        }));
        
        return true;
    };
    
    // Apply fix immediately
    const success = applyFix(1, 5);
    
    // Return the result
    return success;
}

// ============================================================================
// CONTENT ADJUSTMENT FUNCTIONS
// ============================================================================

function adjustContentForHeader() {
    const adjustPadding = () => {
        const headerElement = document.querySelector('[data-header-fixed="true"]') ||
                             document.querySelector('.header-about-fixed') ||
                             document.querySelector('#header-container .main-header') ||
                             document.querySelector('#header-container header') ||
                             document.querySelector('#header-container > *');
        
        const heroSection = document.querySelector('.about-hero');
        
        if (!headerElement || !heroSection) {
            console.log('⚠️ Elements not found for padding adjustment');
            return;
        }
        
        const headerHeight = headerElement.offsetHeight;
        const isMobile = window.innerWidth <= 768;
        
        // Calculate appropriate padding
        let paddingTop;
        if (isMobile) {
            paddingTop = Math.max(headerHeight + 40, 120); // Minimum 120px on mobile
        } else {
            paddingTop = Math.max(headerHeight + 60, 160); // Minimum 160px on desktop
        }
        
        // Apply padding
        heroSection.style.paddingTop = `${paddingTop}px`;
        heroSection.style.transition = 'padding-top 0.3s ease';
        
        console.log(`📏 Header height: ${headerHeight}px, content padding: ${paddingTop}px`);
    };
    
    // Adjust immediately and after delays
    setTimeout(adjustPadding, 100);
    setTimeout(adjustPadding, 500);
    setTimeout(adjustPadding, 1000);
    
    // Listen for header fixed event
    window.addEventListener('headerFixed', adjustPadding);
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
    
    if (!ctaButton) {
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
// MONITORING AND BACKUP SYSTEMS
// ============================================================================

function setupMonitoringSystems() {
    console.log('🔍 Setting up monitoring systems...');
    
    // 1. Window resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            console.log('🔄 Window resized, reapplying fixes...');
            applyAbsoluteHeaderFix();
            adjustContentForHeader();
            setupMobileOptimizations();
        }, 250);
    });
    
    // 2. Mutation observer for DOM changes
    const domObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                // Check if header was modified
                const headerModified = Array.from(mutation.addedNodes).some(node => 
                    node.nodeType === 1 && 
                    (node.id === 'header-container' || 
                     node.classList?.contains('main-header') ||
                     node.tagName === 'HEADER')
                );
                
                if (headerModified) {
                    console.log('🔄 DOM changed (header related), reapplying fix...');
                    setTimeout(() => {
                        applyAbsoluteHeaderFix();
                        adjustContentForHeader();
                    }, 100);
                }
            }
        });
    });
    
    // Start observing the entire document
    domObserver.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    });
    
    // 3. Backup interval check for header position
    const headerCheckInterval = setInterval(() => {
        const header = document.querySelector('[data-header-fixed="true"]');
        if (header) {
            const computedStyle = window.getComputedStyle(header);
            const currentPosition = computedStyle.position;
            const currentTop = computedStyle.top;
            const expectedTop = window.innerWidth > 768 ? '20px' : '0px';
            
            if (currentPosition !== 'fixed' || currentTop !== expectedTop) {
                console.warn('🛡️ Backup check: Header position incorrect, fixing...');
                applyAbsoluteHeaderFix();
            }
        } else {
            // No fixed header found, try to fix
            console.warn('🛡️ Backup check: No fixed header found, applying fix...');
            applyAbsoluteHeaderFix();
        }
    }, 10000); // Check every 10 seconds
    
    // 4. Page visibility monitoring
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            console.log('👁️ Page visible, verifying header...');
            setTimeout(() => {
                applyAbsoluteHeaderFix();
            }, 500);
        }
    });
    
    // 5. Cleanup function for intervals
    window.addEventListener('beforeunload', () => {
        clearInterval(headerCheckInterval);
        domObserver.disconnect();
    });
    
    console.log('✅ Monitoring systems activated');
}

// ============================================================================
// CRITICAL CSS INJECTION
// ============================================================================

function injectCriticalCSS() {
    if (document.getElementById('about-critical-css')) {
        console.log('🎨 Critical CSS already injected');
        return;
    }
    
    const style = document.createElement('style');
    style.id = 'about-critical-css';
    style.textContent = `
        /* CRITICAL HEADER FIX CSS - INJECTED BY about.js */
        
        /* Header container */
        body.about-page #header-container {
            position: relative !important;
            width: 100% !important;
            height: 90px !important;
            margin: 0 !important;
            padding: 0 !important;
            display: block !important;
            z-index: 1000 !important;
            box-sizing: border-box !important;
        }
        
        /* Header elements */
        body.about-page #header-container .main-header,
        body.about-page #header-container header,
        body.about-page #header-container .header,
        body.about-page #header-container [class*="header"] {
            position: fixed !important;
            top: 20px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            z-index: 1000 !important;
            width: calc(100% - 40px) !important;
            max-width: 1200px !important;
            margin: 0 auto !important;
            box-sizing: border-box !important;
            background: rgba(10, 12, 18, 0.95) !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
            border: 1px solid rgba(255, 255, 255, 0.12) !important;
            border-radius: 20px !important;
            box-shadow: 
                0 10px 40px rgba(0, 0, 0, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
            opacity: 1 !important;
            visibility: visible !important;
            pointer-events: all !important;
        }
        
        /* Mobile header */
        @media (max-width: 768px) {
            body.about-page #header-container {
                height: 70px !important;
            }
            
            body.about-page #header-container .main-header,
            body.about-page #header-container header,
            body.about-page #header-container .header,
            body.about-page #header-container [class*="header"] {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                transform: none !important;
                width: 100% !important;
                max-width: 100% !important;
                border-radius: 0 !important;
                border: none !important;
                border-bottom: 1px solid rgba(255, 255, 255, 0.12) !important;
                padding: 15px 20px !important;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3) !important;
                background: rgba(10, 12, 18, 0.98) !important;
            }
        }
        
        /* Animation classes */
        .header-about-fixed {
            will-change: transform;
            backface-visibility: hidden;
        }
        
        .pulse {
            animation: pulse 1s ease;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .language-changing {
            animation: fadeIn 0.5s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0.8; }
            to { opacity: 1; }
        }
        
        /* Prevent FOUC (Flash of Unstyled Content) */
        .reveal-left,
        .reveal-right {
            opacity: 0;
        }
        
        .reveal-left.revealed,
        .reveal-right.revealed {
            opacity: 1;
        }
        
        /* Image fallback */
        .image-fallback {
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #0066ff, #00aaff);
            color: white;
            font-weight: bold;
            font-size: 24px;
        }
        
        /* Mobile body class */
        body.is-mobile *:hover {
            transform: none !important;
        }
    `;
    
    document.head.appendChild(style);
    console.log('✅ Critical CSS injected');
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
    
    // Backup initialization after 1 second
    setTimeout(() => {
        if (typeof initAbout === 'function') {
            console.log('🔄 Running backup initialization...');
            initAbout();
        }
    }, 1000);
    
    // Final backup after 3 seconds
    setTimeout(() => {
        const header = document.querySelector('[data-header-fixed="true"]');
        if (!header || window.getComputedStyle(header).position !== 'fixed') {
            console.log('🛡️ Final backup: Applying header fix...');
            if (typeof applyAbsoluteHeaderFix === 'function') {
                applyAbsoluteHeaderFix();
            }
        }
    }, 3000);
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
        // Try to recover by reapplying header fix
        if (typeof applyAbsoluteHeaderFix === 'function') {
            setTimeout(applyAbsoluteHeaderFix, 100);
        }
    }
});

// Export functions for global access
window.initAbout = initAbout;
window.applyAbsoluteHeaderFix = applyAbsoluteHeaderFix;
window.adjustContentForHeader = adjustContentForHeader;
window.setupSpeckAnimations = setupSpeckAnimations;
window.setupStoryStats = setupStoryStats;
window.setupTeamInteractions = setupTeamInteractions;

// Global image fallback function
window.handleTeamPhotoError = function(img, initials) {
    console.warn('🖼️ Global fallback for team photo:', initials);
    createImageFallback(img, initials);
};

console.log('✅ about.js fully loaded and ready for execution');
