console.log('🎯 portfolio.js loaded - CALYANS & PACKAGING PORTFOLIO');

function initPortfolio() {
    console.log('🎯 Initializing portfolio page with new categories...');
    
    setupPortfolioHeaderBehavior(); // ← Добавлено
    setupPortfolioFilter();
    setupProjectInteractions();
    setupTestimonialCarousel();
    setupMobileOptimizations();
    setupScrollAnimations();
    setupHoverEffects();
    
    console.log('✅ Portfolio page initialized with new hookah/accessories/packaging projects');
}

// NEW FUNCTION: Header behavior for portfolio page
function setupPortfolioHeaderBehavior() {
    const header = document.querySelector('.main-header');
    if (!header) {
        console.log('⚠️ Header not found, retrying...');
        setTimeout(setupPortfolioHeaderBehavior, 100);
        return;
    }
    
    console.log('🏗️ Setting up portfolio header behavior');
    
    // Для внутренних страниц (portfolio) используем базовую логику скролла
    const isHomePage = window.location.pathname.includes('index.html') || 
                      window.location.pathname === '/' || 
                      window.location.pathname.endsWith('/');
    
    if (isHomePage) return; // Главная страница обрабатывается отдельно
    
    let lastScrollY = window.scrollY;
    const scrollThreshold = 100;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY <= 0) {
            header.classList.remove('header-hidden', 'header-scrolled');
            header.style.opacity = '1';
            return;
        }
        
        if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
            // Scrolling down - show minimized header
            header.classList.remove('header-hidden');
            header.classList.add('header-scrolled');
            header.style.opacity = '1';
        } else if (currentScrollY < lastScrollY) {
            // Scrolling up - show normal header
            header.classList.remove('header-hidden');
            header.classList.remove('header-scrolled');
            header.style.opacity = '1';
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Применяем начальное состояние
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Показывать хедер при наведении (если скрыт)
    header.addEventListener('mouseenter', () => {
        if (header.classList.contains('header-hidden')) {
            header.classList.remove('header-hidden');
            header.style.opacity = '1';
        }
    });
    
    console.log('✅ Portfolio header behavior setup complete');
}

// UPDATED FILTER FOR NEW CATEGORIES
function setupPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const isMobile = window.innerWidth <= 768;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button with animation
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.style.transform = 'scale(1)';
            });
            this.classList.add('active');
            
            // Add active animation
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
            
            const filter = this.getAttribute('data-filter');
            
            // Animate filter items
            portfolioItems.forEach((item, index) => {
                const itemCategory = item.getAttribute('data-category');
                const shouldShow = filter === 'all' || itemCategory === filter;
                
                if (shouldShow) {
                    // Show animation
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                    
                    // Stagger animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                        item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    }, index * 100);
                } else {
                    // Hide animation
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px) scale(0.95)';
                    item.style.transition = 'all 0.4s ease';
                    setTimeout(() => {
                        item.classList.add('hidden');
                        item.style.display = 'none';
                    }, 400);
                }
            });
            
            // Scroll to first visible item on mobile
            if (isMobile && filter !== 'all') {
                setTimeout(() => {
                    const firstVisible = document.querySelector('.portfolio-item:not(.hidden)');
                    if (firstVisible) {
                        const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
                        const targetPosition = firstVisible.offsetTop - headerHeight - 50;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 600);
            }
            
            // Update URL hash for bookmarking
            history.pushState(null, null, `#${filter}`);
            
            // Send analytics event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'portfolio_filter', {
                    'event_category': 'engagement',
                    'event_label': filter
                });
            }
        });
    });
    
    // Initialize from URL hash
    const hash = window.location.hash.substring(1);
    if (hash && ['all', 'hookahs', 'accessories', 'packaging'].includes(hash)) {
        const btn = document.querySelector(`.filter-btn[data-filter="${hash}"]`);
        if (btn) {
            setTimeout(() => btn.click(), 100);
        }
    }
}

// ENHANCED PROJECT INTERACTIONS FOR HOOKAH PRODUCTS
function setupProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    const isMobile = window.innerWidth <= 768;
    
    projectCards.forEach(card => {
        // Enhanced hover effects for desktop
        if (!isMobile) {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.01)';
                card.style.boxShadow = '0 30px 60px rgba(0, 102, 255, 0.2)';
                
                // Animate project icon
                const icon = card.querySelector('.project-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(10deg)';
                }
                
                // Animate badge
                const badge = card.querySelector('.project-badge');
                if (badge) {
                    badge.style.transform = 'translateY(0) scale(1.05)';
                }
                
                // Animate category
                const category = card.querySelector('.project-category');
                if (category) {
                    category.style.transform = 'translateY(-2px)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '';
                
                const icon = card.querySelector('.project-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0)';
                }
                
                const badge = card.querySelector('.project-badge');
                if (badge) {
                    badge.style.transform = 'translateY(0)';
                }
                
                const category = card.querySelector('.project-category');
                if (category) {
                    category.style.transform = 'translateY(0)';
                }
            });
        }
        
        // Click handling for all devices
        const caseStudyLink = card.querySelector('.project-link');
        if (caseStudyLink) {
            caseStudyLink.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Ripple effect
                createRippleEffect(caseStudyLink, e);
                
                // Visual feedback
                caseStudyLink.style.transform = 'translateX(10px) scale(1.05)';
                setTimeout(() => {
                    caseStudyLink.style.transform = 'translateX(0) scale(1)';
                }, 300);
                
                // Get project title for analytics
                const projectTitle = card.querySelector('.project-title').textContent;
                console.log(`Opening case study: ${projectTitle}`);
                
                // Show notification on mobile
                if (isMobile) {
                    showMobileNotification(`Загружаем кейс: ${projectTitle}`);
                }
            });
        }
        
        // Touch feedback for mobile
        if (isMobile) {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.1s ease';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
                this.style.transition = 'transform 0.3s ease';
            });
        }
    });
}

// RIPPLE EFFECT FUNCTION
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        width: ${size}px;
        height: ${size}px;
        top: ${y}px;
        left: ${x}px;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode === element) {
            element.removeChild(ripple);
        }
    }, 600);
}

// TESTIMONIAL CAROUSEL WITH AUTO-ROTATION
function setupTestimonialCarousel() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const isMobile = window.innerWidth <= 768;
    
    if (testimonialCards.length > 1) {
        let currentTestimonial = 0;
        let carouselInterval;
        
        // Function to show testimonial
        const showTestimonial = (index) => {
            testimonialCards.forEach((card, i) => {
                if (i === index) {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    card.style.zIndex = '2';
                } else {
                    card.style.opacity = '0.5';
                    card.style.transform = 'translateY(20px)';
                    card.style.zIndex = '1';
                }
                card.style.transition = 'all 0.6s ease';
            });
            currentTestimonial = index;
        };
        
        // Auto rotation
        const startCarousel = () => {
            const intervalTime = isMobile ? 8000 : 6000;
            carouselInterval = setInterval(() => {
                const nextIndex = (currentTestimonial + 1) % testimonialCards.length;
                showTestimonial(nextIndex);
            }, intervalTime);
        };
        
        // Start carousel
        startCarousel();
        
        // Pause on hover/touch
        testimonialCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                clearInterval(carouselInterval);
            });
            
            card.addEventListener('mouseleave', () => {
                startCarousel();
            });
            
            card.addEventListener('touchstart', () => {
                clearInterval(carouselInterval);
            });
            
            card.addEventListener('touchend', () => {
                setTimeout(startCarousel, 5000);
            });
        });
        
        // Initialize
        showTestimonial(0);
        
        // Touch swipe for mobile
        if (isMobile) {
            setupTestimonialSwipe(testimonialCards, carouselInterval);
        }
    }
}

// SWIPE FOR MOBILE TESTIMONIALS
function setupTestimonialSwipe(testimonialCards, carouselInterval) {
    let touchStartX = 0;
    let touchEndX = 0;
    let currentIndex = 0;
    const swipeThreshold = 50;
    
    const container = document.querySelector('.testimonials-grid');
    if (!container) return;
    
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(carouselInterval);
    }, { passive: true });
    
    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe right - previous
                currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
            } else {
                // Swipe left - next
                currentIndex = (currentIndex + 1) % testimonialCards.length;
            }
            
            // Animate the change
            testimonialCards.forEach((card, i) => {
                if (i === currentIndex) {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    card.style.opacity = '0.5';
                    card.style.transform = 'translateY(20px)';
                }
                card.style.transition = 'all 0.6s ease';
            });
        }
    }
}

// SCROLL ANIMATIONS
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.portfolio-item, .highlight-card, .testimonial-card');
    
    if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                        entry.target.classList.add('animated');
                    }, parseInt(delay));
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px) scale(0.95)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });
    }
}

// HOVER EFFECTS FOR DESKTOP
function setupHoverEffects() {
    if (window.innerWidth <= 768) return;
    
    const highlightCards = document.querySelectorAll('.highlight-card');
    
    highlightCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            const icon = card.querySelector('.highlight-icon');
            if (icon) {
                icon.style.transform = 'scale(1.15) rotate(5deg)';
            }
            
            const value = card.querySelector('.highlight-value');
            if (value) {
                value.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            const icon = card.querySelector('.highlight-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
            
            const value = card.querySelector('.highlight-value');
            if (value) {
                value.style.transform = 'scale(1)';
            }
        });
    });
}

// MOBILE OPTIMIZATIONS
function setupMobileOptimizations() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Optimize touch interactions
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
                this.style.transition = 'transform 0.1s ease';
            });
            
            btn.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
                this.style.transition = 'transform 0.3s ease';
            });
        });
        
        // Optimize scroll for filters
        const filterNav = document.querySelector('.filter-nav');
        if (filterNav) {
            filterNav.style.webkitOverflowScrolling = 'touch';
            filterNav.style.scrollBehavior = 'smooth';
        }
        
        // Reduce animations for performance
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.classList.add('reduced-animations');
        }
        
        // Handle orientation change
        let previousOrientation = window.orientation;
        window.addEventListener('orientationchange', () => {
            if (window.orientation !== previousOrientation) {
                setTimeout(() => {
                    if (typeof initPortfolio === 'function') {
                        initPortfolio();
                    }
                }, 300);
                previousOrientation = window.orientation;
            }
        });
    }
}

// MOBILE NOTIFICATION FUNCTION
function showMobileNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        background: rgba(0, 102, 255, 0.95);
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-weight: 600;
        z-index: 9999;
        transition: transform 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 10px 30px rgba(0, 102, 255, 0.3);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    // Hide and remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(-100px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// RESIZE HANDLER
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (typeof initPortfolio === 'function') {
            initPortfolio();
        }
    }, 250);
});

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initPortfolio();
    }, 100);
});

if (document.readyState === 'interactive' || document.readyState === 'complete') {
    setTimeout(() => {
        if (typeof initPortfolio === 'function') initPortfolio();
    }, 200);
}

// Export function
window.initPortfolio = initPortfolio;

// Add CSS for ripple animation if not already present
if (!document.querySelector('#ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
        @keyframes ripple-animation {
            0% {
                transform: scale(0);
                opacity: 0.5;
            }
            100% {
                transform: scale(20);
                opacity: 0;
            }
        }
        
        .reduced-animations * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}
