// parallax.js - ОПТИМИЗИРОВАН ДЛЯ МАКСИМАЛЬНОГО КАЧЕСТВА ИЗОБРАЖЕНИЙ
console.log('🎯 parallax.js loaded - OPTIMIZED FOR IMAGE QUALITY (4 backgrounds)');

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
        
        // Кэширование вычислений
        this.windowHeight = window.innerHeight;
        this.documentHeight = document.documentElement.scrollHeight;
        
        console.log(`📱 Device: ${this.isMobile ? 'Mobile' : 'Desktop'}`);
        console.log(`🖼️ Found ${this.backgrounds.length} background images`);
        
        // Предзагрузка изображений для предотвращения размытия
        this.preloadImages();
        
        // Применение оптимизаций
        this.applyQualityOptimizations();
        
        // Инициализация
        this.init();
    }
    
    // ПРЕДЗАГРУЗКА ИЗОБРАЖЕНИЙ ДЛЯ МАКСИМАЛЬНОГО КАЧЕСТВА
    preloadImages() {
        console.log('🖼️ Preloading background images for optimal quality...');
        
        const imageUrls = [
            '../assets/images/parallax/bg-1.jpg',
            '../assets/images/parallax/bg-2.jpg',
            '../assets/images/parallax/bg-3.jpg',
            '../assets/images/parallax/bg-4.jpg'
        ];
        
        let loadedCount = 0;
        const totalImages = imageUrls.length;
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                loadedCount++;
                console.log(`✅ Loaded: ${url} (${loadedCount}/${totalImages})`);
                
                // Когда все изображения загружены, применяем дополнительные оптимизации
                if (loadedCount === totalImages) {
                    console.log('🎉 All background images loaded successfully!');
                    this.applyPostLoadOptimizations();
                }
            };
            img.onerror = (e) => {
                console.warn(`⚠️ Failed to load: ${url}`, e);
                loadedCount++;
            };
        });
    }
    
    // ПРИМЕНЕНИЕ ОПТИМИЗАЦИЙ КАЧЕСТВА
    applyQualityOptimizations() {
        console.log('🎨 Applying quality optimizations to background images...');
        
        this.backgrounds.forEach((bg, index) => {
            // Гарантируем настройки CSS для качества
            bg.style.imageRendering = '-webkit-optimize-contrast';
            bg.style.imageRendering = 'crisp-edges';
            bg.style.webkitFontSmoothing = 'antialiased';
            bg.style.mozOsxFontSmoothing = 'grayscale';
            bg.style.backfaceVisibility = 'hidden';
            bg.style.transform = 'translateZ(0)';
            bg.style.willChange = 'opacity';
            
            // Убираем все фильтры, которые могут ухудшить качество
            bg.style.filter = 'none';
            bg.style.webkitFilter = 'none';
            
            // Оптимальные настройки фона
            bg.style.backgroundSize = 'cover';
            bg.style.backgroundPosition = 'center center';
            bg.style.backgroundRepeat = 'no-repeat';
            bg.style.backgroundAttachment = 'scroll';
            
            console.log(`✅ Optimized background #${index + 1}`);
        });
        
        // Мобильная оптимизация
        if (this.isMobile) {
            this.applyMobileOptimizations();
        }
    }
    
    // ДОПОЛНИТЕЛЬНЫЕ ОПТИМИЗАЦИИ ПОСЛЕ ЗАГРУЗКИ
    applyPostLoadOptimizations() {
        console.log('⚡ Applying post-load optimizations...');
        
        // Принудительный reflow для фиксации рендеринга
        this.backgrounds.forEach(bg => {
            void bg.offsetHeight; // Trigger reflow
        });
        
        // Установка активного фона
        this.setBackground(0);
    }
    
    // ОПТИМИЗАЦИИ ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ
    applyMobileOptimizations() {
        console.log('📱 Applying mobile-specific optimizations...');
        
        this.backgrounds.forEach(bg => {
            // На мобильных используем scroll вместо fixed
            bg.style.backgroundAttachment = 'scroll';
            bg.style.backgroundPosition = 'center center';
            bg.style.backgroundSize = 'cover';
            
            // Упрощаем переходы для производительности
            bg.style.transition = 'opacity 0.4s ease';
            
            // Убираем сложные CSS свойства
            bg.style.willChange = 'auto';
            bg.style.transform = 'none';
        });
        
        // Фикс для iOS
        this.applyIOSFixes();
    }
    
    // ФИКСЫ ДЛЯ iOS
    applyIOSFixes() {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (isIOS) {
            console.log('🍎 Applying iOS-specific fixes...');
            
            this.backgrounds.forEach(bg => {
                // iOS хаки для фиксации фона
                bg.style.webkitTransform = 'translate3d(0,0,0)';
                bg.style.transform = 'translate3d(0,0,0)';
                bg.style.webkitBackfaceVisibility = 'hidden';
                
                // Предотвращение масштабирования
                bg.style.maxWidth = '100%';
                bg.style.height = 'auto';
            });
        }
    }
    
    checkIsMobile() {
        const width = window.innerWidth;
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        
        return width <= 768 || (mobileRegex.test(userAgent) && isTouch);
    }
    
    init() {
        console.log('🚀 Initializing background changer with quality optimizations...');
        
        if (this.backgrounds.length === 0) {
            console.warn('⚠️ No background elements found');
            return;
        }
        
        // Настраиваем обработку скролла
        if (this.isMobile) {
            this.setupMobileScroll();
        } else {
            this.setupDesktopScroll();
        }
        
        // Прогресс бар
        this.setupProgressBar();
        
        // Оптимизации производительности
        this.setupPerformanceOptimizations();
        
        // Обработка ресайза
        this.setupResizeHandler();
        
        console.log(`✅ Background changer ready with ${this.backgrounds.length} optimized backgrounds`);
    }
    
    setupMobileScroll() {
        console.log('📱 Setting up mobile-optimized scroll...');
        
        // Упрощенная логика для мобильных
        this.setBackground(0);
        
        // Оптимизированный скролл для мобильных
        this.throttledScroll = this.throttle(this.handleMobileScroll.bind(this), 100);
        window.addEventListener('scroll', this.throttledScroll, { passive: true });
        
        // Обработчик изменения ориентации
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleResize();
            }, 300);
        });
    }
    
    setupDesktopScroll() {
        console.log('💻 Setting up desktop-optimized scroll...');
        
        this.setBackground(0);
        this.throttledScroll = this.throttle(this.handleDesktopScroll.bind(this), 16);
        window.addEventListener('scroll', this.throttledScroll, { passive: true });
        this.setupIntersectionObserver();
    }
    
    handleMobileScroll() {
        if (this.isAnimating) return;
        
        const scrollY = window.scrollY;
        const windowHeight = this.windowHeight;
        
        // Простая логика для 4 фонов
        let newBgIndex = 0;
        
        if (scrollY < windowHeight * 0.5) {
            newBgIndex = 0;
        } else if (scrollY >= windowHeight * 0.5 && scrollY < windowHeight * 1.3) {
            newBgIndex = 1;
        } else if (scrollY >= windowHeight * 1.3 && scrollY < windowHeight * 2.3) {
            newBgIndex = 2;
        } else if (scrollY >= windowHeight * 2.3) {
            newBgIndex = 3;
        }
        
        // Меняем фон только если индекс изменился
        if (newBgIndex !== this.currentBgIndex && newBgIndex < this.backgrounds.length) {
            this.setBackground(newBgIndex);
        }
        
        this.lastScrollY = scrollY;
    }
    
    handleDesktopScroll() {
        if (this.isAnimating) return;
        
        const scrollY = window.scrollY;
        const windowHeight = this.windowHeight;
        
        // Логика для 4 фонов на десктопе
        let newBgIndex = 0;
        
        if (scrollY < windowHeight * 0.5) {
            newBgIndex = 0;
        } else if (scrollY >= windowHeight * 0.5 && scrollY < windowHeight * 1.2) {
            newBgIndex = 1;
        } else if (scrollY >= windowHeight * 1.2 && scrollY < windowHeight * 2.0) {
            newBgIndex = 2;
        } else if (scrollY >= windowHeight * 2.0 && scrollY < windowHeight * 3.0) {
            newBgIndex = 3;
        } else {
            newBgIndex = 0;
        }
        
        if (newBgIndex !== this.currentBgIndex && newBgIndex < this.backgrounds.length) {
            this.setBackground(newBgIndex);
        }
    }
    
    setupIntersectionObserver() {
        if (!('IntersectionObserver' in window)) {
            console.warn('⚠️ IntersectionObserver not supported');
            return;
        }
        
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
        if (!this.progressBar) {
            console.log('⚠️ Progress bar element not found');
            return;
        }
        
        const updateProgress = () => {
            const windowHeight = this.windowHeight;
            const documentHeight = this.documentHeight - windowHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const progress = (scrollTop / documentHeight) * 100;
            
            this.progressBar.style.width = Math.min(progress, 100) + '%';
        };
        
        window.addEventListener('scroll', this.throttle(updateProgress, 16), { passive: true });
        updateProgress();
    }
    
    setupPerformanceOptimizations() {
        // Проверяем низкопроизводительное устройство
        if (this.isLowPerformanceDevice()) {
            console.log('📱 Low performance device detected, applying simplifications');
            this.simplifyForLowPerformance();
        }
        
        // Проверяем reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            console.log('♿ Reduced motion enabled, simplifying animations');
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
        // Оставляем только первый фон и упрощаем
        this.backgrounds.forEach((bg, index) => {
            if (index > 0) {
                bg.style.display = 'none';
            } else {
                bg.style.transition = 'none';
                bg.style.animation = 'none';
            }
        });
        
        // Упрощаем скролл
        if (this.throttledScroll) {
            window.removeEventListener('scroll', this.throttledScroll);
            this.throttledScroll = this.throttle(this.handleMobileScroll.bind(this), 200);
            window.addEventListener('scroll', this.throttledScroll, { passive: true });
        }
    }
    
    disableAnimations() {
        this.backgrounds.forEach(bg => {
            bg.style.transition = 'none';
            bg.style.animation = 'none';
        });
    }
    
    setBackground(index) {
        if (this.isAnimating || index === this.currentBgIndex || index >= this.backgrounds.length) {
            return;
        }
        
        this.isAnimating = true;
        this.currentBgIndex = index;
        
        console.log(`🎨 Changing to background #${index + 1}`);
        
        // Убираем active класс со всех фонов
        this.backgrounds.forEach(bg => {
            bg.classList.remove('active');
        });
        
        // Добавляем active класс к текущему фону
        const targetBg = this.backgrounds[index];
        if (targetBg) {
            targetBg.classList.add('active');
            
            // Принудительный reflow для плавного перехода
            void targetBg.offsetHeight;
        }
        
        // Сбрасываем флаг анимации
        const animationTime = this.isMobile ? 400 : 800;
        setTimeout(() => {
            this.isAnimating = false;
        }, animationTime);
    }
    
    handleResize() {
        console.log('🔄 Handling resize/orientation change...');
        
        // Обновляем кэшированные значения
        this.windowHeight = window.innerHeight;
        this.documentHeight = document.documentElement.scrollHeight;
        this.isMobile = this.checkIsMobile();
        
        // Применяем оптимизации снова
        this.applyQualityOptimizations();
        
        // Перезапускаем логику
        if (this.throttledScroll) {
            window.removeEventListener('scroll', this.throttledScroll);
        }
        
        if (this.isMobile) {
            this.setupMobileScroll();
        } else {
            this.setupDesktopScroll();
        }
    }
    
    setupResizeHandler() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
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
    
    // Очистка
    destroy() {
        if (this.throttledScroll) {
            window.removeEventListener('scroll', this.throttledScroll);
        }
        
        this.backgrounds.forEach(bg => {
            bg.classList.remove('active');
        });
        
        console.log('🧹 Background changer destroyed');
    }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    const parallaxBackgrounds = document.querySelectorAll('.parallax-bg');
    
    if (parallaxBackgrounds.length > 0) {
        try {
            window.parallaxInstance = new ScrollBackgroundChanger();
            console.log(`✅ Parallax system initialized with ${parallaxBackgrounds.length} optimized backgrounds`);
        } catch (error) {
            console.error('❌ Error initializing parallax system:', error);
            
            // Fallback: показываем только первый фон
            parallaxBackgrounds.forEach((bg, index) => {
                if (index === 0) {
                    bg.classList.add('active');
                    bg.style.display = 'block';
                } else {
                    bg.style.display = 'none';
                }
            });
        }
    } else {
        console.log('⚠️ No parallax backgrounds found on this page');
    }
});

// Глобальный экспорт
window.ScrollBackgroundChanger = ScrollBackgroundChanger;

// Автоматическая обработка ошибок
window.addEventListener('error', function(e) {
    if (e.message && e.message.includes('parallax')) {
        console.error('🚨 Critical parallax error:', e);
        
        // Безопасный fallback
        const backgrounds = document.querySelectorAll('.parallax-bg');
        if (backgrounds.length > 0) {
            backgrounds[0].classList.add('active');
        }
    }
});

console.log('✅ parallax.js loaded and ready');
