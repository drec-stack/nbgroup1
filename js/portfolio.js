// portfolio.js - Full portfolio functionality with COMPATIBLE header
console.log('🎯 portfolio.js loaded - COMPATIBLE VERSION');

function initPortfolio() {
    console.log('🎯 Initializing portfolio page with compatible header...');
    
    // Основная функциональность портфолио
    setupPortfolioFilter();
    setupProjectInteractions();
    setupTestimonialCarousel();
    setupScrollAnimations();
    setupHoverEffects();
    setupMobileOptimizations();
    
    // Проверка хедера
    checkHeaderCompatibility();
    
    console.log('✅ Portfolio page fully initialized');
}

// Проверка совместимости хедера
function checkHeaderCompatibility() {
    const header = document.querySelector('.main-header');
    if (!header) {
        console.warn('⚠️ Header not found, checking again...');
        setTimeout(checkHeaderCompatibility, 500);
        return;
    }
    
    console.log('✅ Header found, checking compatibility:', {
        isFixed: header.style.position === 'fixed',
        hasGlass: window.getComputedStyle(header).backdropFilter !== 'none',
        height: header.offsetHeight
    });
    
    // Принудительно добавляем необходимые классы
    if (!document.body.classList.contains('internal-page')) {
        document.body.classList.add('internal-page');
    }
    
    // Обновляем отступы
    if (typeof window.updatePortfolioHeaderPadding === 'function') {
        window.updatePortfolioHeaderPadding();
    }
}

// Фильтрация проектов
function setupPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const isMobile = window.innerWidth <= 768;
    
    if (filterBtns.length === 0) {
        console.log('⚠️ Filter buttons not found');
        return;
    }
    
    console.log(`🎯 Setting up portfolio filter with ${filterBtns.length} buttons`);
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
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
            console.log(`🔍 Filtering by: ${filter}`);
            
            // Animate filter items
            let visibleCount = 0;
            portfolioItems.forEach((item, index) => {
                const itemCategory = item.getAttribute('data-category');
                const shouldShow = filter === 'all' || itemCategory === filter;
                
                if (shouldShow) {
                    visibleCount++;
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
            
            console.log(`👁️ Showing ${visibleCount} projects for filter: ${filter}`);
            
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

// Взаимодействия с проектами
function setupProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    const isMobile = window.innerWidth <= 768;
    
    console.log(`🎴 Setting up interactions for ${projectCards.length} project cards`);
    
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
        
        // Click handling for case study links
        const caseStudyLink = card.querySelector('.project-link');
        if (caseStudyLink) {
            caseStudyLink.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Visual feedback
                caseStudyLink.style.transform = 'translateX(10px) scale(1.05)';
                setTimeout(() => {
                    caseStudyLink.style.transform = 'translateX(0) scale(1)';
                }, 300);
                
                // Get project title
                const projectTitle = card.querySelector('.project-title')?.textContent || 'Project';
                console.log(`📖 Opening case study: ${projectTitle}`);
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

// Testimonial carousel
function setupTestimonialCarousel() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const isMobile = window.innerWidth <= 768;
    
    if (testimonialCards.length > 1) {
        console.log(`💬 Setting up testimonial carousel with ${testimonialCards.length} cards`);
        
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
    }
}

// Scroll animations
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.portfolio-item, .highlight-card, .testimonial-card');
    
    if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
        console.log(`🎬 Setting up scroll animations for ${animatedElements.length} elements`);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                        entry.target.classList.add('animated');
                    }, 100);
                    
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

// Hover effects for desktop
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

// Mobile optimizations
function setupMobileOptimizations() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        console.log('📱 Setting up mobile optimizations');
        
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
        
        // Reduce animations for performance
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.classList.add('reduced-animations');
        }
    }
}

// Resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (typeof initPortfolio === 'function') {
            initPortfolio();
        }
    }, 250);
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            if (typeof initPortfolio === 'function') initPortfolio();
        }, 300);
    });
} else {
    setTimeout(() => {
        if (typeof initPortfolio === 'function') initPortfolio();
    }, 300);
}

// Export function
window.initPortfolio = initPortfolio;

console.log('✅ Portfolio script loaded successfully');
