// parallax.js - МОБИЛЬНАЯ ОПТИМИЗАЦИЯ (ПОЛНАЯ ВЕРСИЯ)
console.log('🎯 parallax.js loaded - MOBILE OPTIMIZED');

class ScrollBackgroundChanger {
    constructor() {
        this.backgrounds = document.querySelectorAll('.parallax-bg');
        this.sections = document.querySelectorAll('.content-section');
        this.progressBar = document.querySelector('.scroll-progress-bar');
        
        this.currentBgIndex = 0;
        this.isAnimating = false;
        this.isMobile = window.innerWidth <= 768;
        this.lastScrollY = window.scrollY;
        this.scrollThreshold = 100;
        
        this.init();
    }
    
    init() {
        console.log('🎯 Initializing mobile-optimized background changes...');
        
        if (this.backgrounds.length === 0) return;
        
        // Упрощенная логика для мобильных
        if (this.isMobile) {
            this.setupMobileBackgrounds();
        } else {
            this.setupDesktopBackgrounds();
        }
        
        this.setupProgressBar();
        this.setupPerformanceOptimizations();
        console.log('✅ Background changer optimized for mobile');
    }
    
    setupMobileBackgrounds() {
        // На мобильных используем упрощенную логику смены фонов
        this.setBackground(0);
        
        // Оптимизированный скролл для мобильных
        this.throttledScroll = this.throttle(this.handleMobileScroll.bind(this), 50);
        window.addEventListener('scroll', this.throttledScroll, { passive: true });
    }
    
    setupDesktopBackgrounds() {
        // Полная функциональность для десктопов
        this.setBackground(0);
        this.throttledScroll = this.throttle(this.handleScroll.bind(this), 16);
        window.addEventListener('scroll', this.throttledScroll, { passive: true });
        this.setupIntersectionObserver();
    }
    
    handleMobileScroll() {
        if (this.isAnimating) return;
        
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const scrollDirection = scrollY > this.lastScrollY ? 'down' : 'up';
        
        // Определяем новый индекс фона на основе позиции скролла
        let newBgIndex = 0;
        
        if (scrollY > windowHeight * 0.3 && scrollY <= windowHeight * 1.5) {
            newBgIndex = 1; // Clients section
        } else if (scrollY > windowHeight * 1.5 && scrollY <= windowHeight * 2.5) {
            newBgIndex = 0; // Services section
        } else if (scrollY > windowHeight * 2.5) {
            newBgIndex = 1; // Stats & CTA sections
        }
        
        // Меняем фон только если индекс изменился
        if (newBgIndex !== this.currentBgIndex) {
            this.setBackground(newBgIndex);
        }
        
        this.lastScrollY = scrollY;
    }
    
    handleScroll() {
        if (this.isAnimating) return;
        
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Полная логика для десктопов
        let newBgIndex = 0;
        
        if (scrollY < windowHeight * 0.5) {
            newBgIndex = 0;
        } else if (scrollY >= windowHeight * 0.5 && scrollY < windowHeight * 1.5) {
            newBgIndex = 1;
        } else if (scrollY >= windowHeight * 1.5 && scrollY < windowHeight * 2.5) {
            newBgIndex = 0;
        } else if (scrollY >= windowHeight * 2.5 && scrollY < windowHeight * 3.5) {
            newBgIndex = 1;
        } else {
            newBgIndex = 0;
        }
        
        if (newBgIndex !== this.currentBgIndex && newBgIndex < this.backgrounds.length) {
            this.setBackground(newBgIndex);
        }
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target;
                    const bgIndex = parseInt(section.getAttribute('data-bg-index')) || 0;
                    
                    this.setBackground(bgIndex);
                }
            });
        }, {
            threshold: 0.4,
            rootMargin: '-100px 0px -100px 0px'
        });
        
        this.sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    setupProgressBar() {
        if (!this.progressBar) return;
        
        const updateProgress = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const progress = (scrollTop / documentHeight) * 100;
            
            this.progressBar.style.width = Math.min(progress, 100) + '%';
        };
        
        window.addEventListener('scroll', this.throttle(updateProgress, 16), { passive: true });
    }
    
    setupPerformanceOptimizations() {
        // Отключаем сложные анимации на слабых устройствах
        if (this.isLowPerformanceDevice()) {
            console.log('📱 Low performance device detected, simplifying parallax');
            this.simplifyForLowPerformance();
        }
        
        // Оптимизация для reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            console.log('♿ Reduced motion enabled, disabling parallax animations');
            this.disableAnimations();
        }
    }
    
    isLowPerformanceDevice() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const memory = navigator.deviceMemory || 4;
        const cores = navigator.hardwareConcurrency || 4;
        
        return isMobile && (memory < 4 || cores < 4);
    }
    
    simplifyForLowPerformance() {
        // Оставляем только первый фон
        this.backgrounds.forEach((bg, index) => {
            if (index > 0) {
                bg.style.display = 'none';
            }
        });
    }
    
    disableAnimations() {
        this.backgrounds.forEach(bg => {
            bg.style.transition = 'none';
        });
    }
    
    setBackground(index) {
        if (this.isAnimating || index === this.currentBgIndex) return;
        
        this.isAnimating = true;
        this.currentBgIndex = index;
        
        console.log(`🎨 Changing background to index: ${index}`);
        
        // Убираем active класс со всех фонов
        this.backgrounds.forEach(bg => {
            bg.classList.remove('active');
        });
        
        // Добавляем active класс к текущему фону
        if (this.backgrounds[index]) {
            this.backgrounds[index].classList.add('active');
        }
        
        // Сбрасываем флаг анимации
        setTimeout(() => {
            this.isAnimating = false;
        }, this.isMobile ? 800 : 1200);
    }
    
    // Вспомогательная функция для throttle
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Очистка при уничтожении
    destroy() {
        window.removeEventListener('scroll', this.throttledScroll);
        this.backgrounds.forEach(bg => {
            bg.classList.remove('active');
        });
    }
}

// Инициализация с проверкой поддержки
document.addEventListener('DOMContentLoaded', function() {
    const parallaxBackgrounds = document.querySelectorAll('.parallax-bg');
    
    if (parallaxBackgrounds.length > 0) {
        try {
            new ScrollBackgroundChanger();
        } catch (error) {
            console.error('❌ Error initializing parallax:', error);
            // Fallback: показываем только первый фон
            parallaxBackgrounds.forEach((bg, index) => {
                if (index === 0) bg.classList.add('active');
                else bg.style.display = 'none';
            });
        }
    }
});

// Обработчик изменения размера окна
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const currentInstance = window.parallaxInstance;
        if (currentInstance) {
            currentInstance.destroy();
        }
        window.parallaxInstance = new ScrollBackgroundChanger();
    }, 250);
});

// Экспорт для глобального доступа
window.ScrollBackgroundChanger = ScrollBackgroundChanger;
