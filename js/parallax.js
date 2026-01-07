// parallax.js - СОВЕРШЕННО НОВАЯ СИСТЕМА СМЕНЫ ФОНОВ ПРИ СКРОЛЛЕ

console.log('🎨 parallax.js loaded - ENHANCED BACKGROUND SWITCHING SYSTEM');

(function() {
    'use strict';
    
    // ===== УСОВЕРШЕНСТВОВАННЫЙ МЕНЕДЖЕР ФОНОВ =====
    class EnhancedBackgroundManager {
        constructor() {
            // Основные элементы
            this.layers = document.querySelectorAll('.parallax-layer');
            this.sections = document.querySelectorAll('[data-bg-index]');
            this.currentIndex = 0;
            
            // Состояние
            this.isAnimating = false;
            this.lastScrollY = 0;
            this.scrollThreshold = 50;
            this.isMobile = this.checkIfMobile();
            this.isReducedMotion = this.checkReducedMotion();
            
            // Производительность
            this.rafId = null;
            this.lastScrollUpdate = 0;
            this.scrollUpdateDelay = 16; // ~60fps
            
            console.log(`🖼️ Found ${this.layers.length} background layers`);
            
            // Инициализация
            this.init();
        }
        
        // ===== МЕТОДЫ ИНИЦИАЛИЗАЦИИ =====
        
        checkIfMobile() {
            const width = window.innerWidth;
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
            
            return width <= 768 || mobileRegex.test(userAgent);
        }
        
        checkReducedMotion() {
            return window.matchMedia ? 
                window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
        }
        
        init() {
            console.log('🚀 Initializing enhanced background system...');
            
            if (!this.layers.length) {
                console.warn('⚠️ No background layers found');
                return;
            }
            
            // 1. Гарантируем видимость первого слоя
            this.guaranteeFirstLayer();
            
            // 2. Предзагружаем все изображения
            this.preloadAllImages();
            
            // 3. Создаем индикаторы
            this.createBackgroundIndicators();
            
            // 4. Настраиваем обработку скролла
            this.setupScrollHandler();
            
            // 5. Настраиваем отслеживание секций
            this.setupSectionTracking();
            
            // 6. Настраиваем интерактивность
            this.setupInteractivity();
            
            // 7. Помечаем что система инициализирована
            document.body.classList.add('background-system-initialized');
            
            console.log(`✅ Background system ready with ${this.layers.length} layers`);
        }
        
        guaranteeFirstLayer() {
            const firstLayer = this.layers[0];
            if (firstLayer) {
                firstLayer.classList.add('active');
                firstLayer.style.opacity = '1';
                firstLayer.style.zIndex = '1';
                console.log('✅ First background layer activated');
            }
        }
        
        preloadAllImages() {
            console.log('🖼️ Preloading background images...');
            
            const imageUrls = [];
            this.layers.forEach(layer => {
                const bgImage = layer.style.backgroundImage;
                if (bgImage) {
                    const url = bgImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1');
                    imageUrls.push(url);
                }
            });
            
            let loadedCount = 0;
            const totalImages = imageUrls.length;
            
            imageUrls.forEach(url => {
                const img = new Image();
                img.src = url;
                img.onload = () => {
                    loadedCount++;
                    console.log(`✅ Loaded: ${loadedCount}/${totalImages}`);
                    
                    if (loadedCount === totalImages) {
                        console.log('🎉 All background images loaded!');
                        document.body.classList.add('background-images-loaded');
                        
                        // Улучшаем качество после загрузки
                        this.enhanceImageQuality();
                    }
                };
                img.onerror = (e) => {
                    console.warn(`⚠️ Failed to load: ${url}`, e);
                    loadedCount++;
                };
            });
        }
        
        enhanceImageQuality() {
            // После загрузки всех изображений можно применять улучшения
            this.layers.forEach(layer => {
                if (!layer.classList.contains('enhanced')) {
                    layer.style.imageRendering = 'auto';
                    layer.style.backfaceVisibility = 'hidden';
                    layer.classList.add('enhanced');
                }
            });
        }
        
        createBackgroundIndicators() {
            // Удаляем старые индикаторы если есть
            const oldIndicator = document.querySelector('.background-indicator');
            if (oldIndicator) oldIndicator.remove();
            
            // Создаем контейнер
            const indicator = document.createElement('div');
            indicator.className = 'background-indicator';
            indicator.setAttribute('aria-label', 'Background selection');
            
            // Создаем точки для каждого фона
            for (let i = 0; i < this.layers.length; i++) {
                const dot = document.createElement('div');
                dot.className = `indicator-dot ${i === this.currentIndex ? 'active' : ''}`;
                dot.setAttribute('data-index', i);
                dot.setAttribute('role', 'button');
                dot.setAttribute('tabindex', '0');
                dot.setAttribute('aria-label', `Switch to background ${i + 1}`);
                
                // Добавляем всплывающую подсказку
                const tooltip = document.createElement('div');
                tooltip.className = 'indicator-tooltip';
                tooltip.textContent = `Background ${i + 1}`;
                dot.appendChild(tooltip);
                
                indicator.appendChild(dot);
            }
            
            document.body.appendChild(indicator);
            console.log('🎯 Background indicators created');
        }
        
        // ===== ОБРАБОТКА СКРОЛЛА =====
        
        setupScrollHandler() {
            if (this.isReducedMotion) {
                console.log('♿ Reduced motion enabled, using simple scroll handler');
                this.setupSimpleScroll();
                return;
            }
            
            let ticking = false;
            const self = this;
            
            const updateScroll = () => {
                const currentTime = Date.now();
                
                // Ограничиваем частоту обновлений
                if (currentTime - this.lastScrollUpdate < this.scrollUpdateDelay) {
                    ticking = false;
                    return;
                }
                
                const scrollY = window.pageYOffset || 
                              document.documentElement.scrollTop || 
                              document.body.scrollTop || 0;
                
                // Вычисляем направление и скорость скролла
                const scrollDelta = scrollY - this.lastScrollY;
                const scrollSpeed = Math.abs(scrollDelta);
                this.lastScrollY = scrollY;
                
                // Обновляем прогресс-бар
                this.updateScrollProgress(scrollY);
                
                // Определяем фон на основе позиции скролла
                const newIndex = this.calculateBackgroundFromScroll(scrollY);
                
                // Переключаем фон если нужно
                if (newIndex !== this.currentIndex && !this.isAnimating) {
                    // Учитываем скорость скролла для плавности
                    const transitionDuration = Math.max(800, Math.min(1500, 1500 - scrollSpeed * 5));
                    this.switchToBackground(newIndex, transitionDuration);
                }
                
                // Обновляем параллакс-эффект
                this.updateParallaxEffect(scrollY);
                
                this.lastScrollUpdate = currentTime;
                ticking = false;
            };
            
            const onScroll = () => {
                if (!ticking) {
                    self.rafId = requestAnimationFrame(updateScroll);
                    ticking = true;
                }
            };
            
            // Оптимизированный слушатель
            window.addEventListener('scroll', onScroll, { passive: true });
            
            // Обработка ресайза
            window.addEventListener('resize', () => {
                this.isMobile = this.checkIfMobile();
                this.lastScrollY = window.pageYOffset || 
                                 document.documentElement.scrollTop || 
                                 document.body.scrollTop || 0;
                this.updateScrollProgress(this.lastScrollY);
            }, { passive: true });
            
            // Очистка при размонтировании
            window.addEventListener('beforeunload', () => {
                if (this.rafId) {
                    cancelAnimationFrame(this.rafId);
                }
            });
            
            console.log('📜 Scroll handler initialized');
        }
        
        setupSimpleScroll() {
            // Простая версия для reduced motion
            const self = this;
            
            const onScroll = () => {
                const scrollY = window.pageYOffset || 
                              document.documentElement.scrollTop || 
                              document.body.scrollTop || 0;
                
                const newIndex = this.calculateBackgroundFromScroll(scrollY);
                if (newIndex !== this.currentIndex && !this.isAnimating) {
                    this.switchToBackground(newIndex, 300);
                }
                
                this.updateScrollProgress(scrollY);
            };
            
            window.addEventListener('scroll', onScroll, { passive: true });
        }
        
        calculateBackgroundFromScroll(scrollY) {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            
            // Безопасная проверка на ноль
            if (documentHeight <= 0) return 0;
            
            const scrollPercent = (scrollY / documentHeight) * 100;
            const layersCount = this.layers.length;
            
            // Распределяем проценты равномерно между фонами
            const percentPerLayer = 100 / layersCount;
            
            for (let i = 0; i < layersCount; i++) {
                if (scrollPercent < (i + 1) * percentPerLayer) {
                    return i;
                }
            }
            
            // Если что-то пошло не так, возвращаем последний
            return layersCount - 1;
        }
        
        updateScrollProgress(scrollY) {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            
            if (documentHeight <= 0) return;
            
            const progress = (scrollY / documentHeight) * 100;
            const progressBar = document.querySelector('.scroll-progress-bar');
            
            if (progressBar) {
                progressBar.style.width = Math.min(Math.max(progress, 0), 100) + '%';
            }
        }
        
        updateParallaxEffect(scrollY) {
            if (this.isReducedMotion || this.isMobile) return;
            
            const parallaxFactor = 0.1;
            const parallaxOffset = scrollY * parallaxFactor;
            
            this.layers.forEach((layer, index) => {
                if (layer.classList.contains('active')) {
                    const intensity = 0.5 + (index * 0.1);
                    const yOffset = parallaxOffset * intensity;
                    layer.style.transform = `scale(1.05) translateY(${yOffset}px)`;
                }
            });
        }
        
        // ===== ОТСЛЕЖИВАНИЕ СЕКЦИЙ =====
        
        setupSectionTracking() {
            if (!this.sections.length || !('IntersectionObserver' in window)) {
                console.log('⚠️ Section tracking not available');
                return;
            }
            
            console.log(`🎯 Setting up section tracking for ${this.sections.length} sections`);
            
            const observerOptions = {
                root: null,
                rootMargin: this.isMobile ? '0px 0px -20% 0px' : '0px 0px -30% 0px',
                threshold: 0.1
            };
            
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const bgIndex = parseInt(entry.target.getAttribute('data-bg-index')) || 0;
                        
                        if (bgIndex !== this.currentIndex && !this.isAnimating) {
                            console.log(`🎯 Section in view: switching to background ${bgIndex + 1}`);
                            this.switchToBackground(bgIndex);
                            
                            // Прокручиваем немного чтобы показать эффект
                            if (!this.isMobile) {
                                entry.target.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                });
                            }
                        }
                    }
                });
            }, observerOptions);
            
            // Наблюдаем за всеми секциями
            this.sections.forEach(section => {
                sectionObserver.observe(section);
            });
        }
        
        // ===== ПЕРЕКЛЮЧЕНИЕ ФОНОВ =====
        
        switchToBackground(targetIndex, duration = 1200) {
            if (this.isAnimating || 
                targetIndex === this.currentIndex || 
                targetIndex >= this.layers.length) {
                return;
            }
            
            this.isAnimating = true;
            const previousIndex = this.currentIndex;
            this.currentIndex = targetIndex;
            
            console.log(`🔄 Switching background: ${previousIndex + 1} → ${targetIndex + 1}`);
            
            // Находим слои
            const oldLayer = this.layers[previousIndex];
            const newLayer = this.layers[targetIndex];
            
            if (!newLayer) {
                console.warn(`⚠️ Background ${targetIndex} not found`);
                this.isAnimating = false;
                return;
            }
            
            // Плавный переход
            if (oldLayer) {
                // Пометим старый слой как уходящий
                oldLayer.classList.add('exiting');
                oldLayer.classList.remove('active');
                
                // Задержка перед полным скрытием
                setTimeout(() => {
                    oldLayer.classList.remove('exiting');
                    oldLayer.style.zIndex = '0';
                    oldLayer.style.opacity = '0';
                }, duration * 0.3);
            }
            
            // Подготовим новый слой
            newLayer.style.zIndex = '1';
            newLayer.classList.add('active');
            
            // Плавное появление с задержкой
            setTimeout(() => {
                newLayer.style.opacity = '1';
                
                // Обновляем индикаторы
                this.updateIndicators();
                
                // Генерируем событие для других скриптов
                this.dispatchBackgroundChangeEvent(targetIndex);
                
                // Сбрасываем флаг анимации
                setTimeout(() => {
                    this.isAnimating = false;
                    console.log(`✅ Background switched to ${targetIndex + 1}`);
                }, duration * 0.2);
            }, duration * 0.1);
        }
        
        updateIndicators() {
            const indicators = document.querySelectorAll('.indicator-dot');
            indicators.forEach((indicator, index) => {
                const isActive = index === this.currentIndex;
                indicator.classList.toggle('active', isActive);
                indicator.setAttribute('aria-pressed', isActive);
                indicator.setAttribute('aria-label', 
                    isActive ? 
                    `Current background ${index + 1}` : 
                    `Switch to background ${index + 1}`
                );
            });
        }
        
        dispatchBackgroundChangeEvent(index) {
            const event = new CustomEvent('backgroundChanged', {
                detail: {
                    index: index,
                    total: this.layers.length,
                    timestamp: Date.now()
                },
                bubbles: true
            });
            document.dispatchEvent(event);
        }
        
        // ===== ИНТЕРАКТИВНОСТЬ =====
        
        setupInteractivity() {
            // Клики по индикаторам
            document.addEventListener('click', (e) => {
                const indicator = e.target.closest('.indicator-dot');
                if (indicator) {
                    e.preventDefault();
                    const index = parseInt(indicator.getAttribute('data-index'));
                    if (!isNaN(index) && index !== this.currentIndex) {
                        this.switchToBackground(index);
                        
                        // Находим соответствующую секцию и прокручиваем к ней
                        const targetSection = document.querySelector(`[data-bg-index="${index}"]`);
                        if (targetSection) {
                            targetSection.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }
                }
            });
            
            // Клавиатурная навигация
            document.addEventListener('keydown', (e) => {
                if (e.target.closest('.background-indicator')) {
                    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                        e.preventDefault();
                        const prevIndex = (this.currentIndex - 1 + this.layers.length) % this.layers.length;
                        this.switchToBackground(prevIndex);
                    } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                        e.preventDefault();
                        const nextIndex = (this.currentIndex + 1) % this.layers.length;
                        this.switchToBackground(nextIndex);
                    } else if (e.key === 'Home') {
                        e.preventDefault();
                        this.switchToBackground(0);
                    } else if (e.key === 'End') {
                        e.preventDefault();
                        this.switchToBackground(this.layers.length - 1);
                    }
                }
            });
            
            // Swipe жесты для мобильных
            if (this.isMobile) {
                this.setupSwipeGestures();
            }
        }
        
        setupSwipeGestures() {
            let touchStartX = 0;
            let touchStartY = 0;
            
            document.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }, { passive: true });
            
            document.addEventListener('touchend', (e) => {
                if (!touchStartX || !touchStartY) return;
                
                const touchEndX = e.changedTouches[0].clientX;
                const touchEndY = e.changedTouches[0].clientY;
                
                const diffX = touchStartX - touchEndX;
                const diffY = touchStartY - touchEndY;
                
                // Если это горизонтальный свайп (X > Y)
                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                    if (diffX > 0) {
                        // Свайп влево - следующий фон
                        const nextIndex = (this.currentIndex + 1) % this.layers.length;
                        this.switchToBackground(nextIndex);
                    } else {
                        // Свайп вправо - предыдущий фон
                        const prevIndex = (this.currentIndex - 1 + this.layers.length) % this.layers.length;
                        this.switchToBackground(prevIndex);
                    }
                }
                
                touchStartX = 0;
                touchStartY = 0;
            }, { passive: true });
        }
        
        // ===== ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ =====
        
        getCurrentBackground() {
            return this.currentIndex + 1;
        }
        
        getTotalBackgrounds() {
            return this.layers.length;
        }
        
        goToNextBackground() {
            const nextIndex = (this.currentIndex + 1) % this.layers.length;
            this.switchToBackground(nextIndex);
            return nextIndex;
        }
        
        goToPreviousBackground() {
            const prevIndex = (this.currentIndex - 1 + this.layers.length) % this.layers.length;
            this.switchToBackground(prevIndex);
            return prevIndex;
        }
        
        // ===== ОЧИСТКА =====
        
        destroy() {
            if (this.rafId) {
                cancelAnimationFrame(this.rafId);
            }
            
            // Удаляем индикаторы
            const indicator = document.querySelector('.background-indicator');
            if (indicator) indicator.remove();
            
            // Удаляем обработчики
            window.removeEventListener('scroll', this.handleScroll);
            window.removeEventListener('resize', this.handleResize);
            
            console.log('🧹 Background system destroyed');
        }
    }
    
    // ===== ГЛОБАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ =====
    
    let backgroundManager = null;
    
    function initializeBackgroundSystem() {
        console.log('🎨 Starting enhanced background system...');
        
        // Проверяем есть ли фоновые слои
        const hasBackgroundLayers = document.querySelectorAll('.parallax-layer').length > 0;
        
        if (!hasBackgroundLayers) {
            console.log('⚠️ No background layers found on this page');
            return;
        }
        
        try {
            // Инициализируем систему
            backgroundManager = new EnhancedBackgroundManager();
            
            // Экспортируем для глобального доступа
            window.BackgroundManager = backgroundManager;
            
            console.log('✅ Enhanced background system initialized successfully');
            
        } catch (error) {
            console.error('❌ Failed to initialize background system:', error);
            
            // Fallback: показываем только первый фон
            const firstLayer = document.querySelector('.parallax-layer');
            if (firstLayer) {
                firstLayer.style.opacity = '1';
                firstLayer.classList.add('active');
            }
        }
    }
    
    // ===== ГАРАНТИРОВАННЫЙ ЗАПУСК =====
    
    // Ждем готовности DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeBackgroundSystem);
    } else {
        initializeBackgroundSystem();
    }
    
    // Аварийное восстановление через 5 секунд
    window.addEventListener('load', () => {
        setTimeout(() => {
            const activeLayer = document.querySelector('.parallax-layer.active');
            if (!activeLayer || window.getComputedStyle(activeLayer).opacity < 0.1) {
                console.warn('🚨 Emergency background fix applied');
                
                // Принудительно показываем первый слой
                const layers = document.querySelectorAll('.parallax-layer');
                layers.forEach((layer, index) => {
                    layer.style.opacity = index === 0 ? '1' : '0';
                    layer.classList.toggle('active', index === 0);
                    layer.style.zIndex = index === 0 ? '1' : '0';
                });
                
                document.body.classList.add('emergency-background-fix');
            }
        }, 5000);
    });
    
    // ===== ГЛОБАЛЬНЫЙ API =====
    
    window.backgroundSystem = {
        initialize: initializeBackgroundSystem,
        getInstance: () => backgroundManager,
        nextBackground: () => backgroundManager?.goToNextBackground(),
        prevBackground: () => backgroundManager?.goToPreviousBackground(),
        switchTo: (index) => backgroundManager?.switchToBackground(index),
        destroy: () => backgroundManager?.destroy()
    };
    
    console.log('✅ Enhanced background system loaded and ready');
})();
