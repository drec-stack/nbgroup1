// portfolio.js - ENHANCED VERSION WITH SMOOTH ANIMATIONS
console.log('🎯 portfolio.js loaded - ENHANCED DESIGN');

function initPortfolio() {
    console.log('🎯 Initializing portfolio page with enhanced animations...');
    
    setupPortfolioFilter();
    setupProjectInteractions();
    setupTestimonialCarousel();
    setupMobileOptimizations();
    setupScrollAnimations();
    setupHoverEffects();
    
    console.log('✅ Portfolio page enhanced with animations');
}

// ENHANCED FILTER WITH SMOOTH ANIMATIONS
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
            this.style.transform = 'scale(1.05)';
            
            const filter = this.getAttribute('data-filter');
            
            // Animate filter items
            portfolioItems.forEach((item, index) => {
                const itemCategory = item.getAttribute('data-category');
                const shouldShow = filter === 'all' || itemCategory === filter;
                
                if (shouldShow) {
                    // Show animation
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                        item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    }, index * 100);
                } else {
                    // Hide animation
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px) scale(0.95)';
                    item.style.transition = 'all 0.4s ease';
                    setTimeout(() => {
                        item.classList.add('hidden');
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
        });
    });
}

// ENHANCED PROJECT INTERACTIONS
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
                
                // Simulate loading and navigation
                console.log('Opening detailed case study...');
                
                // Show notification on mobile
                if (isMobile && window.DaehaaApp) {
                    window.DaehaaApp.showNotification('Loading case study...', 'info');
                }
            });
        }
        
        // Touch feedback for mobile
        if (isMobile) {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
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
        
        // Function to show testimonial
        const showTestimonial = (index) => {
            testimonialCards.forEach((card, i) => {
                card.style.opacity = i === index ? '1' : '0.4';
                card.style.transform = i === index ? 'translateY(0)' : 'translateY(20px)';
                card.style.transition = 'all 0.6s ease';
            });
            currentTestimonial = index;
        };
        
        // Auto rotation
        const rotateTestimonials = () => {
            const nextIndex = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(nextIndex);
        };
        
        const intervalTime = isMobile ? 8000 : 6000;
        let carouselInterval = setInterval(rotateTestimonials, intervalTime);
        
        // Pause on hover/touch
        testimonialCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                clearInterval(carouselInterval);
            });
            
            card.addEventListener('mouseleave', () => {
                carouselInterval = setInterval(rotateTestimonials, intervalTime);
            });
            
            card.addEventListener('touchstart', () => {
                clearInterval(carouselInterval);
            });
            
            card.addEventListener('touchend', () => {
                setTimeout(() => {
                    carouselInterval = setInterval(rotateTestimonials, intervalTime);
                }, 5000);
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
                card.style.opacity = i === currentIndex ? '1' : '0.4';
                card.style.transform = i === currentIndex ? 'translateY(0)' : 'translateY(20px)';
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
                        entry.target.style.transform = 'translateY(0)';
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
            el.style.transform = 'translateY(30px)';
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
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            const icon = card.querySelector('.highlight-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
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
            });
            
            btn.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Optimize scroll for filters
        const filterNav = document.querySelector('.filter-nav');
        if (filterNav) {
            filterNav.style.webkitOverflowScrolling = 'touch';
        }
        
        // Reduce animations for performance
        if (window.DaehaaApp && window.DaehaaApp.isLowPerformanceDevice()) {
            document.documentElement.classList.add('reduced-animations');
        }
    }
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
