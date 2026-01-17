// portfolio.js - Fully Fixed Version with Clickability Fixes
console.log('🎯 portfolio.js loaded - CLICKABILITY FIXED');

function initPortfolio() {
    console.log('🎯 Initializing portfolio page with fixes...');
    
    // В первую очередь - фиксируем кликабельность
    applyCriticalClickabilityFixes();
    
    // Основная функциональность портфолио
    setupPortfolioFilter();
    setupProjectInteractions();
    setupTestimonialCarousel();
    setupScrollAnimations();
    setupHoverEffects();
    setupMobileOptimizations();
    
    console.log('✅ Portfolio page fully initialized');
}

// КРИТИЧЕСКИЙ ФИКС ДЛЯ КЛИКАБЕЛЬНОСТИ
function applyCriticalClickabilityFixes() {
    console.log('🔧 Applying critical clickability fixes...');
    
    // 1. Убираем все возможные блокировки
    const style = document.createElement('style');
    style.id = 'clickability-critical-fix';
    style.textContent = `
        /* Важное: восстановление кликабельности */
        body.portfolio-page {
            position: relative;
            z-index: 1;
        }
        
        /* Мобильное меню не блокирует клики когда закрыто */
        .mobile-menu:not(.active) {
            pointer-events: none !important;
        }
        
        /* Мобильное меню блокирует контент когда открыто */
        .mobile-menu.active {
            pointer-events: auto !important;
        }
        
        .mobile-menu.active ~ main,
        .mobile-menu.active ~ * {
            pointer-events: none !important;
        }
        
        /* Бургер кнопка всегда кликабельна */
        .burger-btn {
            pointer-events: auto !important;
            cursor: pointer !important;
            z-index: 10002 !important;
        }
        
        /* Элементы мобильного меню всегда кликабельны */
        .mobile-nav-link,
        .mobile-lang-btn,
        .mobile-header-btn {
            pointer-events: auto !important;
            cursor: pointer !important;
        }
        
        /* Элементы портфолио всегда кликабельны */
        .portfolio-page .filter-btn,
        .portfolio-page .project-link,
        .portfolio-page .btn,
        .portfolio-page a:not(.mobile-nav-link) {
            pointer-events: auto !important;
            cursor: pointer !important;
            position: relative;
            z-index: 100 !important;
        }
        
        /* Десктопная навигация скрыта на мобильных */
        @media (max-width: 900px) {
            .portfolio-page .main-nav {
                display: none !important;
            }
        }
        
        /* Фикс для iOS */
        @supports (-webkit-touch-callout: none) {
            .portfolio-page * {
                -webkit-tap-highlight-color: rgba(255, 255, 255, 0.1);
            }
        }
    `;
    
    // Удаляем старый стиль если есть
    const oldStyle = document.getElementById('clickability-critical-fix');
    if (oldStyle) oldStyle.remove();
    
    document.head.appendChild(style);
    
    // 2. Принудительно добавляем обработчики для бургер кнопки
    const burgerBtn = document.querySelector('.burger-btn');
    if (burgerBtn && !burgerBtn.hasAttribute('data-clickability-fixed')) {
        burgerBtn.setAttribute('data-clickability-fixed', 'true');
        
        // Убедимся что кнопка видима и кликабельна
        burgerBtn.style.cssText += `
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            pointer-events: auto !important;
            cursor: pointer !important;
            z-index: 10002 !important;
        `;
        
        console.log('✅ Burger button clickability fixed');
    }
    
    // 3. Восстанавливаем кликабельность всех элементов
    setTimeout(() => {
        const clickableElements = document.querySelectorAll(
            'a, button, .btn, .filter-btn, .project-link, .lang-btn, .start-project-btn'
        );
        
        clickableElements.forEach(el => {
            if (el && !el.classList.contains('mobile-nav-link')) {
                el.style.pointerEvents = 'auto';
                el.style.cursor = 'pointer';
            }
        });
        
        console.log(`✅ ${clickableElements.length} elements clickability restored`);
    }, 500);
    
    console.log('✅ Critical clickability fixes applied');
}

// Фиксация портфолио хедера (упрощенная версия)
function fixPortfolioHeader() {
    console.log('🔧 Fixing portfolio header...');
    
    const header = document.querySelector('.main-header');
    if (!header) return;
    
    // Простые исправления для кликабельности
    header.style.cssText = `
        pointer-events: auto;
        z-index: 1000;
        position: fixed;
    `;
    
    // Гарантируем кликабельность элементов хедера
    const clickableElements = header.querySelectorAll('a, button, .logo, .nav-link, .burger-btn, .lang-btn, .start-project-btn');
    clickableElements.forEach(el => {
        el.style.cssText = 'pointer-events: auto; cursor: pointer; position: relative;';
    });
    
    console.log('✅ Portfolio header fixed');
}

// Фильтрация проектов
function setupPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const isMobile = window.innerWidth <= 768;
    
    if (filterBtns.length === 0) return;
    
    console.log(`🎯 Setting up portfolio filter with ${filterBtns.length} buttons`);
    
    // Гарантируем кликабельность кнопок фильтра
    filterBtns.forEach(btn => {
        btn.style.pointerEvents = 'auto';
        btn.style.cursor = 'pointer';
    });
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            console.log(`🔍 Filtering by: ${filter}`);
            
            // Animate filter items
            portfolioItems.forEach((item, index) => {
                const itemCategory = item.getAttribute('data-category');
                const shouldShow = filter === 'all' || itemCategory === filter;
                
                if (shouldShow) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                    
                    // Stagger animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, index * 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                        item.style.display = 'none';
                    }, 400);
                }
            });
            
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
    
    // Гарантируем кликабельность карточек проектов
    projectCards.forEach(card => {
        card.style.pointerEvents = 'auto';
        card.style.cursor = 'default';
        
        // Enhanced hover effects for desktop
        if (!isMobile) {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.01)';
                card.style.boxShadow = '0 30px 60px rgba(0, 102, 255, 0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '';
            });
        }
        
        // Click handling for case study links
        const caseStudyLink = card.querySelector('.project-link');
        if (caseStudyLink) {
            caseStudyLink.style.pointerEvents = 'auto';
            caseStudyLink.style.cursor = 'pointer';
            
            caseStudyLink.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Get project title
                const projectTitle = card.querySelector('.project-title')?.textContent || 'Project';
                console.log(`📖 Opening case study: ${projectTitle}`);
                
                // Show notification
                alert(`Будет открыт кейс: ${projectTitle}`);
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
                } else {
                    card.style.opacity = '0.5';
                    card.style.transform = 'translateY(20px)';
                }
            });
            currentTestimonial = index;
        };
        
        // Auto rotation
        const startCarousel = () => {
            carouselInterval = setInterval(() => {
                const nextIndex = (currentTestimonial + 1) % testimonialCards.length;
                showTestimonial(nextIndex);
            }, 5000);
        };
        
        // Start carousel
        startCarousel();
        
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
                    }, 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px) scale(0.95)';
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
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
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
            });
            
            btn.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Reduce animations for performance
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.classList.add('reduced-animations');
        }
        
        // Дополнительный фикс для мобильной навигации
        setTimeout(() => {
            const burgerBtn = document.querySelector('.burger-btn');
            if (burgerBtn) {
                burgerBtn.style.display = 'block';
                burgerBtn.style.visibility = 'visible';
                burgerBtn.style.opacity = '1';
            }
        }, 1000);
    }
}

// Resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        console.log('🔄 Window resized, re-initializing portfolio...');
        applyCriticalClickabilityFixes();
        initPortfolio();
    }, 250);
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('📄 DOM Content Loaded, initializing portfolio...');
        setTimeout(() => {
            initPortfolio();
            // Вызываем фикс хедера с задержкой
            setTimeout(fixPortfolioHeader, 1000);
            
            // Дополнительная проверка через 3 секунды
            setTimeout(applyCriticalClickabilityFixes, 3000);
        }, 500);
    });
} else {
    console.log('📄 DOM already ready, initializing portfolio...');
    setTimeout(() => {
        initPortfolio();
        // Вызываем фикс хедера с задержкой
        setTimeout(fixPortfolioHeader, 1000);
        
        // Дополнительная проверка через 3 секунды
        setTimeout(applyCriticalClickabilityFixes, 3000);
    }, 500);
}

// Export functions
window.initPortfolio = initPortfolio;
window.applyCriticalClickabilityFixes = applyCriticalClickabilityFixes;

// Глобальный обработчик для событий от компонентов
window.addEventListener('componentsFullyLoaded', () => {
    console.log('🎯 Components loaded, applying portfolio fixes...');
    setTimeout(applyCriticalClickabilityFixes, 500);
});

console.log('✅ Portfolio script loaded successfully');
