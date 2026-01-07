// parallax.js - ОПТИМИЗИРОВАН ДЛЯ МАКСИМАЛЬНОГО КАЧЕСТВА ИЗОБРАЖЕНИЙ И КРОССБРАУЗЕРНОСТИ
console.log('🎯 parallax.js loaded - CROSS-BROWSER OPTIMIZED (4 backgrounds)');

// Проверяем возможности браузера перед загрузкой
(function() {
    'use strict';
    
    // Проверяем поддержку необходимых функций
    var supports = {
        cssTransforms: 'transform' in document.documentElement.style || 
                      'webkitTransform' in document.documentElement.style ||
                      'msTransform' in document.documentElement.style,
        
        cssTransitions: 'transition' in document.documentElement.style || 
                       'webkitTransition' in document.documentElement.style,
        
        requestAnimationFrame: 'requestAnimationFrame' in window || 
                              'webkitRequestAnimationFrame' in window || 
                              'mozRequestAnimationFrame' in window || 
                              'msRequestAnimationFrame' in window,
        
        classList: 'classList' in document.documentElement,
        
        querySelectorAll: 'querySelectorAll' in document
    };
    
    console.log('Browser capabilities:', supports);
    
    // Если браузер не поддерживает базовые функции, отключаем параллакс
    if (!supports.querySelectorAll || !supports.classList) {
        console.log('🚫 Browser lacks basic capabilities, disabling parallax');
        document.documentElement.classList.add('no-parallax', 'no-css-transforms');
        return;
    }
    
    // Если нет поддержки трансформаций, отключаем параллакс
    if (!supports.cssTransforms) {
        console.log('🚫 No CSS transforms support, disabling parallax');
        document.documentElement.classList.add('no-css-transforms', 'no-parallax');
        return;
    }
})();

class ScrollBackgroundChanger {
    constructor() {
        // Проверяем еще раз на случай если класс был добавлен ранее
        if (document.documentElement.classList.contains('no-parallax') || 
            document.documentElement.classList.contains('no-css-transforms')) {
            console.log('⚠️ Parallax disabled by browser capabilities');
            this.setupFallback();
            return;
        }
        
        this.backgrounds = document.querySelectorAll('.parallax-bg');
        this.sections = document.querySelectorAll('.content-section');
        this.progressBar = document.querySelector('.scroll-progress-bar');
        
        this.currentBgIndex = 0;
        this.isAnimating = false;
        this.isMobile = this.checkIsMobile();
        this.lastScrollY = this.getScrollY();
        this.scrollThreshold = 100;
        
        // Кэширование вычислений
        this.windowHeight = window.innerHeight || document.documentElement.clientHeight;
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
    
    // ПРЕЗАГРУЗКА ИЗОБРАЖЕНИЙ
    preloadImages() {
        console.log('🖼️ Preloading background images...');
        
        const imageUrls = [
            'assets/images/parallax/bg-1.jpg',
            'assets/images/parallax/bg-2.jpg',
            'assets/images/parallax/bg-3.jpg',
            'assets/images/parallax/bg-4.jpg'
        ];
        
        let loadedCount = 0;
        const totalImages = imageUrls.length;
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                loadedCount++;
                console.log(`✅ Loaded: ${url} (${loadedCount}/${totalImages})`);
                
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
    
    // ОПТИМИЗАЦИИ КАЧЕСТВА
    applyQualityOptimizations() {
        console.log('🎨 Applying quality optimizations...');
        
        if (!this.backgrounds.length) return;
        
        for (var i = 0; i < this.backgrounds.length; i++) {
            var bg = this.backgrounds[i];
            if (!bg || !bg.style) continue;
            
            // Гарантируем настройки CSS для качества
            bg.style.backgroundSize = 'cover';
            bg.style.backgroundPosition = 'center center';
            bg.style.backgroundRepeat = 'no-repeat';
            
            // Мобильная оптимизация
            if (this.isMobile) {
                bg.style.backgroundAttachment = 'scroll';
            }
            
            // Убираем все фильтры
            bg.style.filter = 'none';
            bg.style.webkitFilter = 'none';
            
            console.log(`✅ Optimized background #${i + 1}`);
        }
    }
    
    // ДОПОЛНИТЕЛЬНЫЕ ОПТИМИЗАЦИИ
    applyPostLoadOptimizations() {
        console.log('⚡ Applying post-load optimizations...');
        
        // Принудительный reflow
        if (this.backgrounds[0] && this.backgrounds[0].offsetHeight) {
            void this.backgrounds[0].offsetHeight;
        }
        
        // Установка активного фона
        this.setBackground(0);
    }
    
    // FALLBACK ДЛЯ СТАРЫХ БРАУЗЕРОВ
    setupFallback() {
        console.log('🔄 Setting up fallback for non-supporting browsers');
        
        // Показываем только первый фон
        var backgrounds = document.querySelectorAll('.parallax-bg');
        for (var i = 0; i < backgrounds.length; i++) {
            if (i === 0) {
                backgrounds[i].style.display = 'block';
                backgrounds[i].style.opacity = '1';
            } else {
                backgrounds[i].style.display = 'none';
            }
        }
        
        // Статичный фон для героя
        var heroBg = document.querySelector('.hero-background-image');
        if (heroBg) {
            heroBg.style.backgroundAttachment = 'scroll';
        }
    }
    
    checkIsMobile() {
        var width = window.innerWidth || document.documentElement.clientWidth;
        var isTouch = 'ontouchstart' in window || 
                     ('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0) ||
                     ('msMaxTouchPoints' in navigator && navigator.msMaxTouchPoints > 0);
        
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        var mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        
        return width <= 768 || (mobileRegex.test(userAgent) && isTouch);
    }
    
    // КРОССБРАУЗЕРНЫЙ ПОЛУЧЕНИЕ SCROLL Y
    getScrollY() {
        return window.pageYOffset || 
               document.documentElement.scrollTop || 
               document.body.scrollTop || 
               0;
    }
    
    init() {
        console.log('🚀 Initializing background changer...');
        
        if (!this.backgrounds.length) {
            console.warn('⚠️ No background elements found');
            this.setupFallback();
            return;
        }
        
        // Проверяем reduced motion
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            console.log('♿ Reduced motion enabled, simplifying animations');
            document.documentElement.classList.add('no-parallax');
            this.setupFallback();
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
        
        // Обработка ресайза
        this.setupResizeHandler();
        
        console.log(`✅ Background changer ready with ${this.backgrounds.length} backgrounds`);
    }
    
    setupMobileScroll() {
        console.log('📱 Setting up mobile-optimized scroll...');
        
        this.setBackground(0);
        
        // Упрощенная логика для мобильных
        var self = this;
        var throttledScroll = this.throttle(function() {
            self.handleMobileScroll();
        }, 100);
        
        // Кроссбраузерное добавление слушателя
        if (window.addEventListener) {
            window.addEventListener('scroll', throttledScroll, { passive: true });
        } else if (window.attachEvent) {
            window.attachEvent('onscroll', throttledScroll);
        }
        
        // Обработчик изменения ориентации
        window.addEventListener('orientationchange', function() {
            setTimeout(function() {
                self.handleResize();
            }, 300);
        });
    }
    
    setupDesktopScroll() {
        console.log('💻 Setting up desktop-optimized scroll...');
        
        this.setBackground(0);
        
        var self = this;
        var throttledScroll = this.throttle(function() {
            self.handleDesktopScroll();
        }, 16);
        
        if (window.addEventListener) {
            window.addEventListener('scroll', throttledScroll, { passive: true });
        } else if (window.attachEvent) {
            window.attachEvent('onscroll', throttledScroll);
        }
        
        // IntersectionObserver с fallback
        this.setupIntersectionObserver();
    }
    
    handleMobileScroll() {
        if (this.isAnimating) return;
        
        var scrollY = this.getScrollY();
        var windowHeight = this.windowHeight;
        
        // Простая логика для 4 фонов
        var newBgIndex = 0;
        
        if (scrollY < windowHeight * 0.5) {
            newBgIndex = 0;
        } else if (scrollY >= windowHeight * 0.5 && scrollY < windowHeight * 1.3) {
            newBgIndex = 1;
        } else if (scrollY >= windowHeight * 1.3 && scrollY < windowHeight * 2.3) {
            newBgIndex = 2;
        } else if (scrollY >= windowHeight * 2.3) {
            newBgIndex = 3;
        }
        
        if (newBgIndex !== this.currentBgIndex && newBgIndex < this.backgrounds.length) {
            this.setBackground(newBgIndex);
        }
        
        this.lastScrollY = scrollY;
    }
    
    handleDesktopScroll() {
        if (this.isAnimating) return;
        
        var scrollY = this.getScrollY();
        var windowHeight = this.windowHeight;
        
        var newBgIndex = 0;
        
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
        // Проверяем поддержку IntersectionObserver
        if (!('IntersectionObserver' in window) ||
            !('IntersectionObserverEntry' in window) ||
            !('intersectionRatio' in window.IntersectionObserverEntry.prototype)) {
            console.log('⚠️ IntersectionObserver not supported, using scroll-based detection');
            return;
        }
        
        var observer = new IntersectionObserver(function(entries) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    var section = entries[i].target;
                    var bgIndex = parseInt(section.getAttribute('data-bg-index')) || 0;
                    this.setBackground(bgIndex);
                }
            }
        }.bind(this), {
            threshold: 0.4,
            rootMargin: '-100px 0px -100px 0px'
        });
        
        for (var i = 0; i < this.sections.length; i++) {
            observer.observe(this.sections[i]);
        }
    }
    
    setupProgressBar() {
        if (!this.progressBar) {
            console.log('⚠️ Progress bar element not found');
            return;
        }
        
        var self = this;
        var updateProgress = function() {
            var windowHeight = self.windowHeight;
            var documentHeight = self.documentHeight - windowHeight;
            var scrollTop = self.getScrollY();
            var progress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
            
            self.progressBar.style.width = Math.min(progress, 100) + '%';
        };
        
        var throttledUpdate = this.throttle(updateProgress, 16);
        
        if (window.addEventListener) {
            window.addEventListener('scroll', throttledUpdate, { passive: true });
            window.addEventListener('resize', throttledUpdate, { passive: true });
        } else if (window.attachEvent) {
            window.attachEvent('onscroll', throttledUpdate);
            window.attachEvent('onresize', throttledUpdate);
        }
        
        updateProgress();
    }
    
    setBackground(index) {
        if (this.isAnimating || index === this.currentBgIndex || index >= this.backgrounds.length) {
            return;
        }
        
        this.isAnimating = true;
        this.currentBgIndex = index;
        
        console.log(`🎨 Changing to background #${index + 1}`);
        
        // Убираем active класс со всех фонов
        for (var i = 0; i < this.backgrounds.length; i++) {
            if (this.backgrounds[i].classList) {
                this.backgrounds[i].classList.remove('active');
            } else {
                // Fallback для старых IE
                this.backgrounds[i].className = this.backgrounds[i].className.replace(/\bactive\b/g, '');
            }
        }
        
        // Добавляем active класс к текущему фону
        var targetBg = this.backgrounds[index];
        if (targetBg) {
            if (targetBg.classList) {
                targetBg.classList.add('active');
            } else {
                targetBg.className += ' active';
            }
            
            // Принудительный reflow для плавного перехода
            if (targetBg.offsetHeight) {
                void targetBg.offsetHeight;
            }
        }
        
        // Сбрасываем флаг анимации
        var self = this;
        var animationTime = this.isMobile ? 400 : 800;
        setTimeout(function() {
            self.isAnimating = false;
        }, animationTime);
    }
    
    handleResize() {
        console.log('🔄 Handling resize/orientation change...');
        
        // Обновляем кэшированные значения
        this.windowHeight = window.innerHeight || document.documentElement.clientHeight;
        this.documentHeight = document.documentElement.scrollHeight;
        this.isMobile = this.checkIsMobile();
        
        // Применяем оптимизации снова
        this.applyQualityOptimizations();
    }
    
    setupResizeHandler() {
        var self = this;
        var resizeTimeout;
        
        function handleResize() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                self.handleResize();
            }, 250);
        }
        
        if (window.addEventListener) {
            window.addEventListener('resize', handleResize);
        } else if (window.attachEvent) {
            window.attachEvent('onresize', handleResize);
        }
    }
    
    // ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ ДЛЯ THROTTLE
    throttle(func, limit) {
        var inThrottle;
        return function() {
            var args = arguments;
            var context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(function() {
                    inThrottle = false;
                }, limit);
            }
        };
    }
    
    // ОЧИСТКА
    destroy() {
        console.log('🧹 Background changer destroyed');
    }
}

// ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ DOM
function initializeParallax() {
    // Проверяем, есть ли параллакс элементы на странице
    var parallaxBackgrounds = document.querySelectorAll('.parallax-bg');
    
    if (!parallaxBackgrounds.length) {
        console.log('⚠️ No parallax backgrounds found on this page');
        return;
    }
    
    // Проверяем, не отключен ли параллакс
    if (document.documentElement.classList.contains('no-parallax') ||
        document.documentElement.classList.contains('no-css-transforms')) {
        console.log('⚠️ Parallax disabled, showing static background');
        
        // Показываем только первый фон
        for (var i = 0; i < parallaxBackgrounds.length; i++) {
            if (i === 0) {
                parallaxBackgrounds[i].style.display = 'block';
                parallaxBackgrounds[i].style.opacity = '1';
                if (parallaxBackgrounds[i].classList) {
                    parallaxBackgrounds[i].classList.add('active');
                } else {
                    parallaxBackgrounds[i].className += ' active';
                }
            } else {
                parallaxBackgrounds[i].style.display = 'none';
            }
        }
        return;
    }
    
    // Инициализируем параллакс систему
    try {
        window.parallaxInstance = new ScrollBackgroundChanger();
        console.log(`✅ Parallax system initialized with ${parallaxBackgrounds.length} backgrounds`);
    } catch (error) {
        console.error('❌ Error initializing parallax system:', error);
        
        // Fallback: показываем только первый фон
        for (var i = 0; i < parallaxBackgrounds.length; i++) {
            if (i === 0) {
                parallaxBackgrounds[i].style.display = 'block';
                parallaxBackgrounds[i].style.opacity = '1';
                if (parallaxBackgrounds[i].classList) {
                    parallaxBackgrounds[i].classList.add('active');
                } else {
                    parallaxBackgrounds[i].className += ' active';
                }
            } else {
                parallaxBackgrounds[i].style.display = 'none';
            }
        }
    }
}

// Ждем загрузки DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeParallax);
} else {
    initializeParallax();
}

// Глобальный экспорт
if (typeof window !== 'undefined') {
    window.ScrollBackgroundChanger = ScrollBackgroundChanger;
}

// Автоматическая обработка ошибок
window.addEventListener('error', function(e) {
    if (e.message && e.message.includes('parallax')) {
        console.error('🚨 Critical parallax error:', e);
        
        // Безопасный fallback
        var backgrounds = document.querySelectorAll('.parallax-bg');
        if (backgrounds.length > 0) {
            backgrounds[0].style.display = 'block';
            backgrounds[0].style.opacity = '1';
            if (backgrounds[0].classList) {
                backgrounds[0].classList.add('active');
            }
        }
    }
});

console.log('✅ parallax.js loaded and ready');
