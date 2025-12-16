// parallax.js - МОБИЛЬНАЯ ОПТИМИЗАЦИЯ (ПОЛНАЯ ВЕРСИЯ С 4 ФОНАМИ)
console.log('🎯 parallax.js loaded - MOBILE OPTIMIZED WITH 4 BACKGROUNDS');

class ScrollBackgroundChanger {
    constructor() {
        this.backgrounds = document.querySelectorAll('.parallax-bg');
        this.sections = document.querySelectorAll('.content-section');
        this.progressBar = document.querySelector('.scroll-progress-bar');
        
        this.currentBgIndex = 0;
        this.isAnimating = false;
        this.isMobile = this.checkIsMobile();
        this.lastScrollY = window.scrollY;
        this.scrollThreshold = 100;
        
        // Фикс для мобильных
        this.fixMobileIssues();
        this.init();
    }
    
    checkIsMobile() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    fixMobileIssues() {
        if (this.isMobile) {
            console.log('📱 Mobile device detected, applying fixes...');
            
            // 1. Убираем горизонтальный скролл
            document.documentElement.style.overflowX = 'hidden';
            document.body.style.overflowX = 'hidden';
            
            // 2. Фиксируем фон
            this.backgrounds.forEach(bg => {
                bg.style.backgroundAttachment = 'scroll';
                bg.style.backgroundPosition = 'center center';
                bg.style.backgroundSize = 'cover';
                bg.style.left = '0';
                bg.style.width = '100%';
            });
            
            // 3. Добавляем fallback фон для контентных секций
            this.sections.forEach(section => {
                if (section.classList.contains('content-section')) {
                    section.style.backgroundColor = 'transparent';
                    section.style.position = 'relative';
                    section.style.zIndex = '2';
                }
            });
        }
    }
    
    init() {
        console.log('🎯 Initializing mobile-optimized background changes with 4 backgrounds...');
        
        if (this.backgrounds.length === 0) {
            console.error('❌ No parallax backgrounds found');
            return;
        }
        
        console.log(`✅ Found ${this.backgrounds.length} backgrounds`);
        
        // Упрощенная логика для мобильных
        if (this.isMobile) {
            this.setupMobileBackgrounds();
        } else {
            this.setupDesktopBackgrounds();
        }
        
        this.setupProgressBar();
        this.setupPerformanceOptimizations();
        console.log('✅ Background changer optimized for mobile with 4 backgrounds');
    }
    
    setupMobileBackgrounds() {
        // На мобильных используем упрощенную логику смены 4 фонов
        this.setBackground(0);
        
        // Оптимизированный скролл для мобильных
        this.throttledScroll = this.throttle(this.handleMobileScroll.bind(this), 50);
        window.addEventListener('scroll', this.throttledScroll, { passive: true });
        
        // Добавляем обработчик изменения ориентации
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleResize();
            }, 300);
        });
    }
    
    setupDesktopBackgrounds() {
        // Полная функциональность для десктопов с 4 фонами
        this.setBackground(0);
        this.throttledScroll = this.throttle(this.handleScroll.bind(this), 16);
        window.addEventListener('scroll', this.throttledScroll, { passive: true });
        this.setupIntersectionObserver();
    }
    
    handleMobileScroll() {
        if (this.isAnimating) return;
        
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        
        // Определяем процент скролла
        const scrollPercentage = (scrollY / documentHeight) * 100;
        
        // Логика смены 4 фонов на основе процента скролла
        let newBgIndex = 0;
        
        if (scrollPercentage < 25) {
            newBgIndex = 0; // Первый фон
        } else if (scrollPercentage >= 25 && scrollPercentage < 50) {
            newBgIndex = 1; // Второй фон
        } else if (scrollPercentage >= 50 && scrollPercentage < 75) {
            newBgIndex = 2; // Третий фон (новый 1)
        } else {
            newBgIndex = 3; // Четвертый фон (новый 2)
        }
        
        // Ограничиваем индекс количеством доступных фонов
        newBgIndex = Math.min(newBgIndex, this.backgrounds.length - 1);
        
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
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        
        // Определяем процент скролла
        const scrollPercentage = (scrollY / documentHeight) * 100;
        
        // Логика смены 4 фонов на основе процента скролла
        let newBgIndex = 0;
        
        if (scrollPercentage < 20) {
            newBgIndex = 0; // Первый фон
        } else if (scrollPercentage >= 20 && scrollPercentage < 40) {
            newBgIndex = 1; // Второй фон
        } else if (scrollPercentage >= 40 && scrollPercentage < 60) {
            newBgIndex = 2; // Третий фон (новый 1)
        } else if (scrollPercentage >= 60 && scrollPercentage < 80) {
            newBgIndex = 3; // Четвертый фон (новый 2)
        } else {
            newBgIndex = 0; // Возвращаемся к первому фону
        }
        
        // Ограничиваем индекс количеством доступных фонов
        newBgIndex = Math.min(newBgIndex, this.backgrounds.length - 1);
        
        if (newBgIndex !== this.currentBgIndex && newBgIndex < this.backgrounds.length) {
            this.setBackground(newBgIndex);
        }
    }
    
    setupIntersectionObserver() {
        // Создаем Intersection Observer для смены фонов на основе секций
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target;
                    const bgIndex = parseInt(section.getAttribute('data-bg-index')) || 0;
                    
                    // Ограничиваем индекс количеством фонов
                    const safeIndex = Math.min(bgIndex, this.backgrounds.length - 1);
                    this.setBackground(safeIndex);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-100px 0px -100px 0px'
        });
        
        // Наблюдаем за всеми секциями
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
        // Оставляем только первый и последний фон
        this.backgrounds.forEach((bg, index) => {
            if (index > 0 && index < this.backgrounds.length - 1) {
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
    
    handleResize() {
        // Обновляем определение мобильного устройства
        this.isMobile = this.checkIsMobile();
        
        // Применяем фиксы снова
        this.fixMobileIssues();
        
        // Перезапускаем логику фонов
        if (this.isMobile) {
            this.setupMobileBackgrounds();
        } else {
            this.setupDesktopBackgrounds();
        }
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
            window.parallaxInstance = new ScrollBackgroundChanger();
        } catch (error) {
            console.error('❌ Error initializing parallax:', error);
            // Fallback: показываем только первый фон
            parallaxBackgrounds.forEach((bg, index) => {
                if (index === 0) bg.classList.add('active');
                else bg.style.display = 'none';
            });
        }
    } else {
        console.warn('⚠️ No parallax backgrounds found on the page');
    }
});

// Обработчик изменения размера окна
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const currentInstance = window.parallaxInstance;
        if (currentInstance) {
            currentInstance.handleResize();
        }
    }, 250);
});

// Экспорт для глобального доступа
window.ScrollBackgroundChanger = ScrollBackgroundChanger;
