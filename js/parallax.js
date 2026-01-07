// parallax.js - ПОЛНОСТЬЮ РАБОЧАЯ ВЕРСИЯ С ПЕРЕКЛЮЧЕНИЕМ ПРИ СКРОЛЛЕ

console.log('🎯 parallax.js loaded - SCROLL-BASED BACKGROUND SWITCHING');

(function() {
    'use strict';
    
    // ===== PARALLAX SCROLL MANAGER =====
    class ParallaxScrollManager {
        constructor() {
            this.layers = document.querySelectorAll('.parallax-layer');
            this.container = document.getElementById('parallax-container');
            this.sections = document.querySelectorAll('[data-bg-index]');
            this.currentIndex = 0;
            this.isAnimating = false;
            this.lastScrollY = 0;
            this.scrollThreshold = 100; // Минимальная разница скролла для переключения
            this.isMobile = this.checkIsMobile();
            this.isReducedMotion = window.matchMedia ? 
                window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
            
            console.log(`🖼️ Found ${this.layers.length} parallax layers`);
            console.log(`📱 Device: ${this.isMobile ? 'Mobile' : 'Desktop'}`);
            console.log(`♿ Reduced motion: ${this.isReducedMotion ? 'Yes' : 'No'}`);
            
            // Гарантируем что система работает
            this.guaranteeVisibility();
            
            // Инициализация
            this.init();
        }
        
        checkIsMobile() {
            var width = window.innerWidth || document.documentElement.clientWidth;
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;
            var mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
            
            return width <= 768 || mobileRegex.test(userAgent);
        }
        
        // ГАРАНТИЯ ВИДИМОСТИ
        guaranteeVisibility() {
            console.log('🔧 Guaranteeing parallax visibility...');
            
            // 1. Гарантируем что контейнер виден
            if (this.container) {
                this.container.style.display = 'block';
                this.container.style.opacity = '1';
                this.container.style.visibility = 'visible';
                console.log('✅ Parallax container guaranteed');
            }
            
            // 2. Гарантируем что первый слой активен
            if (this.layers.length > 0) {
                const firstLayer = this.layers[0];
                firstLayer.classList.add('active');
                firstLayer.style.opacity = '1';
                firstLayer.style.zIndex = '1';
                console.log('✅ First parallax layer activated');
            }
            
            // 3. Предзагрузка всех изображений
            this.preloadImages();
            
            console.log('✅ Parallax visibility guaranteed');
        }
        
        // ПРЕДЗАГРУЗКА ИЗОБРАЖЕНИЙ
        preloadImages() {
            console.log('🖼️ Preloading parallax images...');
            
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
                        console.log('🎉 All parallax images loaded successfully!');
                        document.body.classList.add('parallax-images-loaded');
                    }
                };
                img.onerror = (e) => {
                    console.warn(`⚠️ Failed to load: ${url}`, e);
                    loadedCount++;
                    
                    // Пробуем альтернативный путь
                    const altUrl = url.replace('assets/', './assets/');
                    console.log(`🔄 Trying alternative path: ${altUrl}`);
                    
                    const altImg = new Image();
                    altImg.src = altUrl;
                };
            });
        }
        
        // ИНИЦИАЛИЗАЦИЯ
        init() {
            console.log('🚀 Initializing parallax scroll manager...');
            
            if (!this.layers.length) {
                console.warn('⚠️ No parallax layers found');
                return;
            }
            
            // Если reduced motion - упрощаем анимации
            if (this.isReducedMotion) {
                console.log('♿ Reduced motion enabled, simplifying animations');
                this.simplifyAnimations();
            }
            
            // Настраиваем обработку скролла
            this.setupScrollHandler();
            
            // Инициализируем отслеживание секций
            this.setupSectionTracking();
            
            // Помечаем body что параллакс инициализирован
            document.body.classList.add('parallax-initialized');
            
            console.log(`✅ Parallax scroll manager ready with ${this.layers.length} layers`);
        }
        
        // УПРОЩЕНИЕ АНИМАЦИЙ ДЛЯ REDUCED MOTION
        simplifyAnimations() {
            this.layers.forEach(layer => {
                layer.style.transition = 'opacity 0.3s ease';
                layer.style.transform = 'none';
            });
        }
        
        // НАСТРОЙКА ОБРАБОТКИ СКРОЛЛА
        setupScrollHandler() {
            let ticking = false;
            const self = this;
            
            function update() {
                const scrollY = window.pageYOffset || 
                              document.documentElement.scrollTop || 
                              document.body.scrollTop || 0;
                
                // Вычисляем разницу скролла
                const scrollDelta = Math.abs(scrollY - self.lastScrollY);
                
                // Обновляем только если достаточно прокрутили
                if (scrollDelta > self.scrollThreshold || scrollY < 100) {
                    self.lastScrollY = scrollY;
                    
                    // Определяем индекс фона на основе скролла
                    const newIndex = self.calculateBackgroundIndex(scrollY);
                    
                    // Переключаем фон если нужно
                    if (newIndex !== self.currentIndex && !self.isAnimating) {
                        self.switchToLayer(newIndex);
                    }
                }
                
                ticking = false;
            }
            
            function onScroll() {
                if (!ticking) {
                    requestAnimationFrame(update);
                    ticking = true;
                }
            }
            
            // Оптимизированный слушатель скролла
            window.addEventListener('scroll', onScroll, { passive: true });
            
            // Обработка ресайза
            window.addEventListener('resize', function() {
                self.isMobile = self.checkIsMobile();
                self.lastScrollY = window.pageYOffset || 
                                 document.documentElement.scrollTop || 
                                 document.body.scrollTop || 0;
            }, { passive: true });
        }
        
        // ВЫЧИСЛЕНИЕ ИНДЕКСА ФОНА НА ОСНОВЕ СКРОЛЛА
        calculateBackgroundIndex(scrollY) {
            const windowHeight = window.innerHeight || 
                               document.documentElement.clientHeight || 
                               document.body.clientHeight;
            
            // Как на speckdesign.com - переключение на основе позиции скролла
            // Настройте эти значения под вашу страницу
            
            // Позиции переключения (в пикселях от верха)
            const switchPoints = [
                0,                          // 0% - начало страницы
                windowHeight * 0.8,         // 80% высоты окна
                windowHeight * 1.8,         // 180% высоты окна  
                windowHeight * 2.8,         // 280% высоты окна
                windowHeight * 10           // Конец (для возврата)
            ];
            
            // Определяем текущий индекс
            if (scrollY < switchPoints[1]) {
                return 0; // Первый фон
            } else if (scrollY >= switchPoints[1] && scrollY < switchPoints[2]) {
                return 1; // Второй фон
            } else if (scrollY >= switchPoints[2] && scrollY < switchPoints[3]) {
                return 2; // Третий фон
            } else if (scrollY >= switchPoints[3] && scrollY < switchPoints[4]) {
                return 3; // Четвертый фон
            } else {
                return 0; // Возвращаемся к первому
            }
        }
        
        // ОТСЛЕЖИВАНИЕ СЕКЦИЙ ДЛЯ ТОЧНОГО ПЕРЕКЛЮЧЕНИЯ
        setupSectionTracking() {
            if (!this.sections.length) {
                console.log('⚠️ No sections with data-bg-index found');
                return;
            }
            
            console.log(`🎯 Found ${this.sections.length} sections for tracking`);
            
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: this.isMobile ? 0.1 : 0.3
            };
            
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const bgIndex = parseInt(entry.target.getAttribute('data-bg-index')) || 0;
                        
                        if (bgIndex !== this.currentIndex && !this.isAnimating) {
                            console.log(`🎯 Section entered view: switching to background ${bgIndex + 1}`);
                            this.switchToLayer(bgIndex);
                        }
                    }
                });
            }, observerOptions);
            
            // Наблюдаем за всеми секциями
            this.sections.forEach(section => {
                sectionObserver.observe(section);
            });
        }
        
        // ПЕРЕКЛЮЧЕНИЕ НА ОПРЕДЕЛЕННЫЙ СЛОЙ
        switchToLayer(index) {
            if (this.isAnimating || index === this.currentIndex || index >= this.layers.length) {
                return;
            }
            
            this.isAnimating = true;
            const oldIndex = this.currentIndex;
            this.currentIndex = index;
            
            console.log(`🎨 Switching from background ${oldIndex + 1} to ${index + 1}`);
            
            // Находим старый и новый слои
            const oldLayer = this.layers[oldIndex];
            const newLayer = this.layers[index];
            
            if (!newLayer) {
                console.warn(`⚠️ Layer ${index} not found`);
                this.isAnimating = false;
                return;
            }
            
            // Убираем активный класс со старого слоя
            if (oldLayer) {
                oldLayer.classList.remove('active');
                oldLayer.style.zIndex = '0';
                
                // Плавно скрываем старый слой
                setTimeout(() => {
                    oldLayer.style.opacity = '0';
                }, 50);
            }
            
            // Добавляем активный класс к новому слою
            newLayer.classList.add('active');
            newLayer.style.zIndex = '1';
            
            // Плавно показываем новый слой
            setTimeout(() => {
                newLayer.style.opacity = '1';
            }, 100);
            
            // Сбрасываем флаг анимации
            const self = this;
            setTimeout(function() {
                self.isAnimating = false;
                console.log(`✅ Background switched to ${index + 1}`);
            }, this.isReducedMotion ? 300 : 1200);
        }
        
        // РУЧНОЕ ПЕРЕКЛЮЧЕНИЕ (для отладки)
        goToLayer(index) {
            this.switchToLayer(index);
        }
        
        nextLayer() {
            const nextIndex = (this.currentIndex + 1) % this.layers.length;
            this.switchToLayer(nextIndex);
        }
        
        prevLayer() {
            const prevIndex = (this.currentIndex - 1 + this.layers.length) % this.layers.length;
            this.switchToLayer(prevIndex);
        }
    }
    
    // ===== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ =====
    function initializeParallaxSystem() {
        console.log('🏁 Starting parallax system initialization...');
        
        // Проверяем, есть ли параллакс элементы на странице
        const parallaxLayers = document.querySelectorAll('.parallax-layer');
        
        if (!parallaxLayers.length) {
            console.log('⚠️ No parallax layers found on this page');
            return;
        }
        
        console.log(`🎯 Found ${parallaxLayers.length} parallax layers`);
        
        // ГАРАНТИЯ: Показываем первый слой сразу (даже до JS)
        const firstLayer = document.querySelector('.parallax-layer');
        if (firstLayer) {
            // Устанавливаем стили напрямую
            firstLayer.style.backgroundImage = "url('assets/images/parallax/bg-1.jpg')";
            firstLayer.style.backgroundSize = 'cover';
            firstLayer.style.backgroundPosition = 'center center';
            firstLayer.style.backgroundRepeat = 'no-repeat';
            firstLayer.style.opacity = '1';
            firstLayer.style.zIndex = '1';
            firstLayer.classList.add('active');
            
            console.log('✅ First layer guaranteed visible');
        }
        
        // Гарантируем видимость контейнера
        const container = document.getElementById('parallax-container');
        if (container) {
            container.style.display = 'block';
            container.style.opacity = '1';
            container.style.visibility = 'visible';
        }
        
        // Инициализируем параллакс систему
        try {
            window.parallaxManager = new ParallaxScrollManager();
            console.log(`✅ Parallax system initialized with ${parallaxLayers.length} layers`);
        } catch (error) {
            console.error('❌ Error initializing parallax system:', error);
            
            // Fallback: показываем только первый слой
            if (firstLayer) {
                firstLayer.style.opacity = '1';
                firstLayer.style.zIndex = '1';
                firstLayer.classList.add('active');
            }
            
            // Добавляем класс для отладки
            document.body.classList.add('parallax-failed');
        }
    }
    
    // ===== ГАРАНТИРОВАННЫЙ ЗАПУСК =====
    
    // Ждем загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeParallaxSystem);
    } else {
        initializeParallaxSystem();
    }
    
    // АВТОМАТИЧЕСКИЙ FALLBACK - проверяем через 3 секунды
    window.addEventListener('load', function() {
        console.log('🌅 Page fully loaded, checking parallax...');
        
        setTimeout(function() {
            const firstLayer = document.querySelector('.parallax-layer');
            if (firstLayer) {
                const computedStyle = window.getComputedStyle(firstLayer);
                const isVisible = computedStyle.opacity === '1' || computedStyle.opacity === '1.0';
                
                if (!isVisible) {
                    console.log('🚨 EMERGENCY: Parallax layer not visible after 3 seconds!');
                    
                    // Применяем nuclear fix
                    firstLayer.style.cssText = `
                        background-image: url('assets/images/parallax/bg-1.jpg') !important;
                        background-size: cover !important;
                        background-position: center center !important;
                        background-repeat: no-repeat !important;
                        opacity: 1 !important;
                        z-index: 1 !important;
                        position: absolute !important;
                        top: 0 !important;
                        left: 0 !important;
                        width: 100% !important;
                        height: 100% !important;
                        display: block !important;
                        visibility: visible !important;
                    `;
                    
                    firstLayer.classList.add('active');
                    
                    // Гарантируем что контейнер виден
                    const container = document.getElementById('parallax-container');
                    if (container) {
                        container.style.cssText = `
                            display: block !important;
                            opacity: 1 !important;
                            visibility: visible !important;
                            position: fixed !important;
                            top: 0 !important;
                            left: 0 !important;
                            width: 100% !important;
                            height: 100% !important;
                            z-index: -100 !important;
                        `;
                    }
                    
                    document.body.classList.add('parallax-failed', 'emergency-fix-applied');
                } else {
                    console.log('✅ Parallax is visible, everything is OK');
                    document.body.classList.add('parallax-ok');
                }
            }
        }, 3000);
    });
    
    // ===== ГЛОБАЛЬНЫЙ ЭКСПОРТ =====
    if (typeof window !== 'undefined') {
        window.ParallaxScrollManager = ParallaxScrollManager;
    }
    
    console.log('✅ parallax.js loaded and ready for scroll-based switching');
})();
