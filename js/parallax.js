// parallax.js - ИСПРАВЛЕННАЯ ВЕРСИЯ ДЛЯ 4 ФОНОВ
console.log('🎯 parallax.js loaded - FIXED VERSION (4 backgrounds)');

(function() {
    'use strict';
    
    class ScrollBackgroundChanger {
        constructor() {
            this.backgrounds = document.querySelectorAll('.parallax-bg');
            this.sections = document.querySelectorAll('.content-section[data-bg-index]');
            this.currentBgIndex = 0;
            this.isAnimating = false;
            this.isMobile = this.checkIsMobile();
            
            console.log(`🖼️ Found ${this.backgrounds.length} background images`);
            console.log(`📱 Device: ${this.isMobile ? 'Mobile' : 'Desktop'}`);
            
            // ГАРАНТИРУЕМ ЧТО ФОНЫ ВИДНЫ
            this.guaranteeBackgrounds();
            
            // Инициализация
            this.init();
        }
        
        // ГАРАНТИЯ ВИДИМОСТИ ФОНОВ
        guaranteeBackgrounds() {
            console.log('🔧 Guaranteeing background visibility...');
            
            // 1. Гарантируем что контейнер виден
            const container = document.querySelector('.parallax-bg-container');
            if (container) {
                container.style.display = 'block';
                container.style.opacity = '1';
                container.style.visibility = 'visible';
                container.style.zIndex = '-1';
            }
            
            // 2. Гарантируем что все фоны имеют правильные настройки
            this.backgrounds.forEach((bg, index) => {
                if (bg) {
                    // Устанавливаем фоновые изображения напрямую
                    const bgNumber = index + 1;
                    bg.style.backgroundImage = `url('./assets/images/parallax/bg-${bgNumber}.jpg')`;
                    bg.style.backgroundSize = 'cover';
                    bg.style.backgroundPosition = 'center center';
                    bg.style.backgroundRepeat = 'no-repeat';
                    bg.style.opacity = index === 0 ? '1' : '0';
                    bg.style.zIndex = index === 0 ? '1' : '0';
                    
                    // Добавляем активный класс к первому фону
                    if (index === 0) {
                        bg.classList.add('active');
                    }
                    
                    console.log(`✅ Background ${bgNumber} guaranteed`);
                }
            });
            
            // 3. Предзагрузка изображений
            this.preloadImages();
            
            console.log('✅ All backgrounds guaranteed to be visible');
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
                        // Помечаем body что изображения загружены
                        document.body.classList.add('backgrounds-loaded');
                    }
                };
                img.onerror = (e) => {
                    console.warn(`⚠️ Failed to load: ${url}`, e);
                    loadedCount++;
                    
                    // Если изображение не загрузилось, пробуем альтернативный путь
                    const altUrl = url.replace('assets/', './assets/');
                    console.log(`🔄 Trying alternative path: ${altUrl}`);
                    
                    const altImg = new Image();
                    altImg.src = altUrl;
                };
            });
        }
        
        checkIsMobile() {
            var width = window.innerWidth || document.documentElement.clientWidth;
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;
            var mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
            
            return width <= 768 || mobileRegex.test(userAgent);
        }
        
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
                return;
            }
            
            // Проверяем reduced motion
            if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                console.log('♿ Reduced motion enabled, simplifying animations');
                // Показываем только первый фон
                this.setBackground(0);
                return;
            }
            
            // Настраиваем обработку скролла
            this.setupScrollHandler();
            
            // Первоначальная установка
            this.setBackground(0);
            
            // Помечаем body что параллакс инициализирован
            document.body.classList.add('parallax-initialized');
            
            console.log(`✅ Background changer ready with ${this.backgrounds.length} backgrounds`);
        }
        
        setupScrollHandler() {
            var self = this;
            var lastScrollY = this.getScrollY();
            var ticking = false;
            
            function update() {
                if (self.isAnimating) return;
                
                var scrollY = self.getScrollY();
                var windowHeight = window.innerHeight || document.documentElement.clientHeight;
                
                // Определяем какой фон показывать на основе скролла
                var newBgIndex = 0;
                
                // Для 4 фонов - настройте эти значения по необходимости
                var scrollThresholds = [
                    windowHeight * 0.5,    // Переход к bg-2
                    windowHeight * 1.3,    // Переход к bg-3  
                    windowHeight * 2.3,    // Переход к bg-4
                    windowHeight * 3.5     // Возврат к bg-1
                ];
                
                if (scrollY < scrollThresholds[0]) {
                    newBgIndex = 0; // bg-1
                } else if (scrollY >= scrollThresholds[0] && scrollY < scrollThresholds[1]) {
                    newBgIndex = 1; // bg-2
                } else if (scrollY >= scrollThresholds[1] && scrollY < scrollThresholds[2]) {
                    newBgIndex = 2; // bg-3
                } else if (scrollY >= scrollThresholds[2] && scrollY < scrollThresholds[3]) {
                    newBgIndex = 3; // bg-4
                } else {
                    newBgIndex = 0; // bg-1 (вернулись в начало)
                }
                
                if (newBgIndex !== self.currentBgIndex) {
                    self.setBackground(newBgIndex);
                }
                
                lastScrollY = scrollY;
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
            }, { passive: true });
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
                this.backgrounds[i].classList.remove('active');
                this.backgrounds[i].style.zIndex = '0';
            }
            
            // Добавляем active класс к текущему фону
            var targetBg = this.backgrounds[index];
            if (targetBg) {
                targetBg.classList.add('active');
                targetBg.style.zIndex = '2';
                
                // Плавное появление
                setTimeout(() => {
                    targetBg.style.opacity = '1';
                }, 10);
            }
            
            // Плавно скрываем неактивные фоны
            for (var i = 0; i < this.backgrounds.length; i++) {
                if (i !== index) {
                    this.backgrounds[i].style.opacity = '0';
                }
            }
            
            // Сбрасываем флаг анимации
            var self = this;
            setTimeout(function() {
                self.isAnimating = false;
            }, 800);
        }
    }
    
    // ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ DOM
    function initializeParallax() {
        console.log('🏁 Starting parallax initialization...');
        
        // Проверяем, есть ли параллакс элементы на странице
        var parallaxBackgrounds = document.querySelectorAll('.parallax-bg');
        
        if (!parallaxBackgrounds.length) {
            console.log('⚠️ No parallax backgrounds found on this page');
            return;
        }
        
        console.log(`🎯 Found ${parallaxBackgrounds.length} parallax backgrounds`);
        
        // ГАРАНТИЯ: Показываем первый фон сразу (даже до JS)
        const firstBg = document.getElementById('parallax-bg-1');
        if (firstBg) {
            // Устанавливаем стили напрямую
            firstBg.style.backgroundImage = "url('./assets/images/parallax/bg-1.jpg')";
            firstBg.style.backgroundSize = 'cover';
            firstBg.style.backgroundPosition = 'center center';
            firstBg.style.backgroundRepeat = 'no-repeat';
            firstBg.style.opacity = '1';
            firstBg.style.zIndex = '1';
            firstBg.classList.add('active');
            
            console.log('✅ First background guaranteed visible');
        }
        
        // Гарантируем видимость контейнера
        const container = document.querySelector('.parallax-bg-container');
        if (container) {
            container.style.display = 'block';
            container.style.opacity = '1';
            container.style.visibility = 'visible';
        }
        
        // Инициализируем параллакс систему
        try {
            window.parallaxInstance = new ScrollBackgroundChanger();
            console.log(`✅ Parallax system initialized with ${parallaxBackgrounds.length} backgrounds`);
        } catch (error) {
            console.error('❌ Error initializing parallax system:', error);
            
            // Fallback: показываем только первый фон
            if (firstBg) {
                firstBg.style.opacity = '1';
                firstBg.style.zIndex = '1';
                firstBg.classList.add('active');
            }
            
            // Добавляем класс для отладки
            document.body.classList.add('parallax-failed');
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
    
    // АВТОМАТИЧЕСКИЙ FALLBACK - проверяем через 3 секунды
    window.addEventListener('load', function() {
        console.log('🌅 Page fully loaded, checking backgrounds...');
        
        setTimeout(function() {
            const firstBg = document.getElementById('parallax-bg-1');
            if (firstBg) {
                const computedStyle = window.getComputedStyle(firstBg);
                const isVisible = computedStyle.opacity === '1' || computedStyle.opacity === '1.0';
                
                if (!isVisible) {
                    console.log('🚨 EMERGENCY: Background not visible after 3 seconds!');
                    
                    // Применяем nuclear fix
                    firstBg.style.cssText = `
                        background-image: url('./assets/images/parallax/bg-1.jpg') !important;
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
                    
                    // Гарантируем что контейнер виден
                    const container = document.querySelector('.parallax-bg-container');
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
                            z-index: -1 !important;
                        `;
                    }
                    
                    document.body.classList.add('background-failed', 'emergency-fix-applied');
                } else {
                    console.log('✅ Backgrounds are visible, everything is OK');
                    document.body.classList.add('backgrounds-ok');
                }
            }
        }, 3000);
    });
    
    console.log('✅ parallax.js loaded and ready');
})();
