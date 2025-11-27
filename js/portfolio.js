// portfolio.js - МОБИЛЬНАЯ ОПТИМИЗАЦИЯ
console.log('🎯 portfolio.js loaded - MOBILE OPTIMIZED');

function initPortfolio() {
    console.log('🎯 Initializing portfolio page with mobile optimizations...');
    
    setupPortfolioFilter();
    setupProjectInteractions();
    setupTestimonialCarousel();
    setupMobileOptimizations();
    
    console.log('✅ Portfolio page optimized for mobile');
}

// ОПТИМИЗИРОВАННЫЙ ФИЛЬТР ДЛЯ МОБИЛЬНЫХ
function setupPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const isMobile = window.innerWidth <= 768;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Обновление активной кнопки
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Фильтрация элементов с анимацией
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
            
            // На мобильных скроллим к результатам после фильтрации
            if (isMobile) {
                setTimeout(() => {
                    const firstVisible = document.querySelector('.portfolio-item:not(.hidden)');
                    if (firstVisible) {
                        const headerHeight = document.querySelector('.main-header').offsetHeight;
                        const targetPosition = firstVisible.offsetTop - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 400);
            }
        });
    });
}

// ОПТИМИЗИРОВАННЫЕ ВЗАИМОДЕЙСТВИЯ С ПРОЕКТАМИ
function setupProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    const isMobile = window.innerWidth <= 768;
    
    projectCards.forEach(card => {
        if (!isMobile) {
            // Hover эффекты только для десктопов
            card.addEventListener('mouseenter', () => {
                const image = card.querySelector('.project-image');
                if (image) {
                    image.style.transform = 'scale(1.03)';
                    image.style.transition = 'transform 0.3s ease';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const image = card.querySelector('.project-image');
                if (image) {
                    image.style.transform = 'scale(1)';
                }
            });
        }
        
        // Клик для всех устройств
        const caseStudyLink = card.querySelector('.project-link');
        if (caseStudyLink) {
            caseStudyLink.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Визуальный feedback
                caseStudyLink.style.transform = 'translateX(5px)';
                setTimeout(() => {
                    caseStudyLink.style.transform = 'translateX(0)';
                }, 200);
                
                // В реальном проекте здесь была бы навигация к кейсу
                console.log('Opening case study...');
                
                // На мобильных показываем уведомление
                if (isMobile && window.NBApp) {
                    window.NBApp.showNotification('Case study would open here', 'info');
                }
            });
        }
    });
}

// ОПТИМИЗИРОВАННАЯ КАРУСЕЛЬ ОТЗЫВОВ
function setupTestimonialCarousel() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const isMobile = window.innerWidth <= 768;
    
    if (testimonialCards.length > 1) {
        let currentTestimonial = 0;
        
        // Автопрокрутка с разной скоростью для мобильных
        const intervalTime = isMobile ? 6000 : 5000;
        
        const rotateTestimonials = () => {
            testimonialCards[currentTestimonial].classList.remove('active');
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            testimonialCards[currentTestimonial].classList.add('active');
        };
        
        const carouselInterval = setInterval(rotateTestimonials, intervalTime);
        
        // Пауза при взаимодействии
        testimonialCards.forEach(card => {
            card.addEventListener('touchstart', () => {
                clearInterval(carouselInterval);
            });
            
            card.addEventListener('touchend', () => {
                setTimeout(() => {
                    carouselInterval = setInterval(rotateTestimonials, intervalTime);
                }, 5000);
            });
        });
        
        // Swipe для мобильных
        if (isMobile) {
            setupTestimonialSwipe(testimonialCards, carouselInterval);
        }
    }
}

// SWIPE ДЛЯ МОБИЛЬНЫХ
function setupTestimonialSwipe(testimonialCards, carouselInterval) {
    let touchStartX = 0;
    let touchEndX = 0;
    let currentIndex = 0;
    
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
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            testimonialCards[currentIndex].classList.remove('active');
            
            if (swipeDistance > 0) {
                // Swipe вправо - предыдущий
                currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
            } else {
                // Swipe влево - следующий
                currentIndex = (currentIndex + 1) % testimonialCards.length;
            }
            
            testimonialCards[currentIndex].classList.add('active');
        }
    }
}

// ДОПОЛНИТЕЛЬНЫЕ МОБИЛЬНЫЕ ОПТИМИЗАЦИИ
function setupMobileOptimizations() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Touch optimization для карточек проектов
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.99)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Оптимизация скролла фильтров
        const filterNav = document.querySelector('.filter-nav');
        if (filterNav) {
            filterNav.style.webkitOverflowScrolling = 'touch';
        }
    }
}

// ИНИЦИАЛИЗАЦИЯ
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initPortfolio();
    }, 100);
});

window.addEventListener('resize', () => {
    setTimeout(() => {
        if (typeof initPortfolio === 'function') initPortfolio();
    }, 250);
});

if (document.readyState === 'interactive' || document.readyState === 'complete') {
    setTimeout(() => {
        if (typeof initPortfolio === 'function') initPortfolio();
    }, 200);
}

window.initPortfolio = initPortfolio;
