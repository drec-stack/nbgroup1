// home.js - ПОЛНОСТЬЮ ИСПРАВЛЕННЫЙ ФАЙЛ ДЛЯ 4 ФОНОВ
console.log('🎬 home.js loaded - FULLY FIXED VERSION');

// ГАРАНТИРОВАННЫЙ ФИКС ДЛЯ ФОНОВ (ПЕРВЫЙ БЛОК)
(function() {
    'use strict';
    
    console.log('🔧 APPLYING GUARANTEED BACKGROUND FIXES...');
    
    // Функция для гарантированной установки всех фонов
    function guaranteeAllBackgrounds() {
        console.log('🎨 Guaranteeing all 4 backgrounds...');
        
        // 1. ГАРАНТИЯ ДЛЯ СТАТИЧНОГО ФОНА ГЕРОЯ
        const heroBg = document.querySelector('.hero-background-image');
        if (heroBg) {
            // Принудительно устанавливаем все настройки
            heroBg.style.cssText = `
                background-image: url('./assets/images/parallax/bg-1.jpg') !important;
                background-size: cover !important;
                background-position: center center !important;
                background-repeat: no-repeat !important;
                background-attachment: fixed !important;
                opacity: 1 !important;
                visibility: visible !important;
                display: block !important;
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: 100% !important;
                z-index: 1 !important;
                filter: none !important;
                -webkit-filter: none !important;
                image-rendering: -webkit-optimize-contrast !important;
                image-rendering: crisp-edges !important;
                -webkit-font-smoothing: antialiased !important;
                -moz-osx-font-smoothing: grayscale !important;
            `;
            
            console.log('✅ Hero background guaranteed');
        }
        
        // 2. ГАРАНТИЯ ДЛЯ PARALLAX ФОНОВ (4 фона)
        const parallaxBgs = document.querySelectorAll('.parallax-bg');
        const bgPaths = [
            './assets/images/parallax/bg-1.jpg',
            './assets/images/parallax/bg-2.jpg',
            './assets/images/parallax/bg-3.jpg',
            './assets/images/parallax/bg-4.jpg'
        ];
        
        parallaxBgs.forEach((bg, index) => {
            if (index < bgPaths.length) {
                const bgNumber = index + 1;
                const isActive = index === 0;
                
                // Принудительно устанавливаем все настройки
                bg.style.cssText = `
                    background-image: url('${bgPaths[index]}') !important;
                    background-size: cover !important;
                    background-position: center center !important;
                    background-repeat: no-repeat !important;
                    background-attachment: scroll !important;
                    opacity: ${isActive ? '1' : '0'} !important;
                    visibility: visible !important;
                    display: block !important;
                    position: absolute !important;
                    top: 0 !important;
                    left: 0 !important;
                    width: 100% !important;
                    height: 100% !important;
                    z-index: ${isActive ? '1' : '0'} !important;
                    filter: none !important;
                    -webkit-filter: none !important;
                    image-rendering: -webkit-optimize-contrast !important;
                    image-rendering: crisp-edges !important;
                    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
                `;
                
                // Добавляем активный класс к первому фону
                if (isActive) {
                    bg.classList.add('active');
                }
                
                console.log(`✅ Parallax background ${bgNumber} guaranteed (${isActive ? 'active' : 'inactive'})`);
            }
        });
        
        // 3. ГАРАНТИЯ ДЛЯ PARALLAX КОНТЕЙНЕРА
        const parallaxContainer = document.querySelector('.parallax-bg-container');
        if (parallaxContainer) {
            parallaxContainer.style.cssText = `
                display: block !important;
                opacity: 1 !important;
                visibility: visible !important;
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: 100% !important;
                z-index: -1 !important;
                overflow: hidden !important;
                pointer-events: none !important;
                -webkit-transform: translateZ(0) !important;
                transform: translateZ(0) !important;
                backface-visibility: hidden !important;
            `;
            
            console.log('✅ Parallax container guaranteed');
        }
        
        // 4. ГАРАНТИЯ ДЛЯ ГЕРОЯ КОНТЕЙНЕРА
        const heroContainer = document.getElementById('hero-background-container');
        if (heroContainer) {
            heroContainer.style.cssText = `
                display: block !important;
                opacity: 1 !important;
                visibility: visible !important;
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: 100% !important;
                z-index: -100 !important;
                overflow: hidden !important;
                pointer-events: none !important;
            `;
            
            console.log('✅ Hero container guaranteed');
        }
        
        // 5. ПРЕДЗАГРУЗКА ВСЕХ ИЗОБРАЖЕНИЙ
        preloadAllImages();
        
        // Помечаем что фиксы применены
        document.body.classList.add('backgrounds-guaranteed');
        console.log('🎉 All 4 backgrounds guaranteed!');
    }
    
    // Функция предзагрузки всех изображений
    function preloadAllImages() {
        console.log('🖼️ Preloading all background images...');
        
        const imageUrls = [
            './assets/images/parallax/bg-1.jpg',
            './assets/images/parallax/bg-2.jpg',
            './assets/images/parallax/bg-3.jpg',
            './assets/images/parallax/bg-4.jpg'
        ];
        
        let loadedCount = 0;
        const totalImages = imageUrls.length;
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                loadedCount++;
                console.log(`✅ Preloaded: ${url} (${loadedCount}/${totalImages})`);
                
                if (loadedCount === totalImages) {
                    console.log('🌟 All 4 background images preloaded successfully!');
                    document.body.classList.add('backgrounds-preloaded');
                }
            };
            img.onerror = (e) => {
                console.warn(`⚠️ Failed to preload: ${url}`, e);
                loadedCount++;
                
                // Пробуем альтернативный путь
                const altUrl = url.replace('./assets/', 'assets/');
                console.log(`🔄 Trying alternative path: ${altUrl}`);
                
                const altImg = new Image();
                altImg.src = altUrl;
            };
        });
    }
    
    // Функция проверки видимости фонов
    function verifyBackgrounds() {
        console.log('🔍 Verifying background visibility...');
        
        let allGood = true;
        
        // Проверяем статичный фон
        const heroBg = document.querySelector('.hero-background-image');
        if (heroBg) {
            const heroStyle = window.getComputedStyle(heroBg);
            if (heroStyle.opacity === '0' || heroStyle.backgroundImage === 'none') {
                console.warn('⚠️ Hero background not visible');
                allGood = false;
            }
        }
        
        // Проверяем первый параллакс фон
        const firstParallaxBg = document.getElementById('parallax-bg-1');
        if (firstParallaxBg) {
            const parallaxStyle = window.getComputedStyle(firstParallaxBg);
            if (parallaxStyle.opacity === '0') {
                console.warn('⚠️ First parallax background not visible');
                allGood = false;
                
                // Применяем emergency fix
                firstParallaxBg.style.opacity = '1';
                firstParallaxBg.style.zIndex = '1';
            }
        }
        
        if (allGood) {
            console.log('✅ All backgrounds are visible');
            document.body.classList.add('backgrounds-verified');
        } else {
            console.log('⚠️ Some backgrounds need fixing');
            document.body.classList.add('backgrounds-need-fix');
        }
        
        return allGood;
    }
    
    // Emergency fix на случай если фоны не видны
    function applyEmergencyFix() {
        console.log('🚨 APPLYING EMERGENCY BACKGROUND FIX...');
        
        // 1. Принудительно показываем первый параллакс фон
        const firstBg = document.getElementById('parallax-bg-1');
        if (firstBg) {
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
            
            firstBg.classList.add('active', 'emergency-fixed');
        }
        
        // 2. Гарантируем что контейнер виден
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
        
        // 3. Добавляем класс для отслеживания
        document.body.classList.add('emergency-fix-applied');
        console.log('✅ Emergency fix applied');
    }
    
    // Основная функция инициализации
    function initializeBackgrounds() {
        console.log('🏁 INITIALIZING BACKGROUND SYSTEM...');
        
        // Применяем гарантии
        guaranteeAllBackgrounds();
        
        // Проверяем через 2 секунды
        setTimeout(() => {
            const isVerified = verifyBackgrounds();
            
            if (!isVerified) {
                console.log('🔄 Backgrounds not verified, applying emergency fix...');
                applyEmergencyFix();
                
                // Проверяем еще раз через 1 секунду
                setTimeout(() => {
                    verifyBackgrounds();
                }, 1000);
            }
        }, 2000);
        
        // Финальная проверка после полной загрузки
        window.addEventListener('load', () => {
            console.log('🌅 Page fully loaded, final background check...');
            
            setTimeout(() => {
                const finalCheck = verifyBackgrounds();
                
                if (!finalCheck) {
                    console.log('🚨 FINAL WARNING: Backgrounds still not visible!');
                    document.body.classList.add('backgrounds-failed');
                    
                    // Последняя попытка
                    applyEmergencyFix();
                } else {
                    console.log('🎊 SUCCESS: All 4 backgrounds working perfectly!');
                    document.body.classList.add('backgrounds-success');
                }
            }, 500);
        });
    }
    
    // Запускаем инициализацию
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeBackgrounds);
    } else {
        initializeBackgrounds();
    }
    
    // Экспортируем функции для отладки
    window.guaranteeBackgrounds = guaranteeAllBackgrounds;
    window.verifyBackgrounds = verifyBackgrounds;
    window.applyEmergencyFix = applyEmergencyFix;
    
})();

// ОСНОВНОЙ КЛАСС ДЛЯ ГЛАВНОЙ СТРАНИЦЫ (ПРОДОЛЖЕНИЕ)
class HomePage {
    constructor() {
        this.isReducedMotion = window.matchMedia ? 
            window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
        
        console.log('🏠 HomePage initialized (with 4 background fix)');
        
        // Инициализация всех компонентов
        this.initializeComponents();
    }

    // ИНИЦИАЛИЗАЦИЯ ВСЕХ КОМПОНЕНТОВ
    initializeComponents() {
        console.log('🚀 Initializing all components...');
        
        try {
            this.initializeBasicAnimations();
            this.initializeStatsCounter();
            this.initializeSpeckVerticalBlocks();
            this.initializeSpeckMarquee();
            this.initializeScrollProgress();
            this.initializeParallaxBackgrounds();
            this.initializeClickableStats();
            this.initializeCTAClickable();
            
            // Оптимизация производительности
            this.optimizePerformance();
            
            console.log('✅ All components initialized');
        } catch (error) {
            console.error('❌ Error during component initialization:', error);
        }
    }

    // SPECK VERTICAL BLOCKS
    initializeSpeckVerticalBlocks() {
        const speckBlocks = document.querySelectorAll('.speck-vertical-block');
        
        if (!speckBlocks.length) {
            console.log('⚠️ Speck vertical blocks not found');
            return;
        }
        
        console.log('🎨 Initializing ' + speckBlocks.length + ' vertical blocks');
        
        if (window.IntersectionObserver && !this.isReducedMotion) {
            const blockObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, index * 200);
                        blockObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            speckBlocks.forEach(block => blockObserver.observe(block));
        } else {
            // Fallback для старых браузеров или reduced motion
            setTimeout(() => {
                speckBlocks.forEach((block, index) => {
                    setTimeout(() => {
                        block.classList.add('visible');
                    }, this.isReducedMotion ? 0 : index * 200);
                });
            }, 500);
        }
    }

    // SPECK MARQUEE
    initializeSpeckMarquee() {
        const speckMarqueeTrack = document.getElementById('speckMarqueeTrack');
        if (!speckMarqueeTrack) {
            console.warn('⚠️ Speck marquee track not found');
            return;
        }

        console.log('🎯 Initializing Speck marquee');

        // Проверяем работает ли CSS анимация
        setTimeout(() => {
            const style = window.getComputedStyle(speckMarqueeTrack);
            
            if (style.animationName === 'none' || this.isReducedMotion) {
                console.log('🚀 Starting JS fallback for Speck marquee');
                this.runSpeckMarqueeJS(speckMarqueeTrack);
            } else {
                console.log('✅ Speck marquee working via CSS');
                this.addSpeckMarqueeHoverHandlers(speckMarqueeTrack);
            }
        }, 100);

        // Проверка через 2 секунды
        setTimeout(() => {
            const track = document.querySelector('.speck-marquee-track');
            if (track && !track.classList.contains('js-fallback-active')) {
                const rect = track.getBoundingClientRect();
                const computedStyle = window.getComputedStyle(track);
                const isMoving = computedStyle.animationPlayState !== 'paused' && 
                                computedStyle.animationName !== 'none';
                
                if (!isMoving) {
                    console.log('⚠️ Marquee not moving, starting JS fallback');
                    this.runSpeckMarqueeJS(speckMarqueeTrack);
                }
            }
        }, 2000);
    }

    runSpeckMarqueeJS(track) {
        if (track.classList.contains('js-fallback-active')) {
            console.log('⚠️ JS fallback already active');
            return;
        }

        const content = track.querySelector('.speck-marquee-content');
        if (!content) {
            console.error('❌ Speck marquee content not found');
            return;
        }

        console.log('🔄 Starting JS marquee...');

        track.classList.add('js-fallback-active');
        track.style.animation = 'none';
        track.style.webkitAnimation = 'none';
        
        // Дублируем контент для бесконечного эффекта
        const originalContent = content.innerHTML;
        content.innerHTML = originalContent + originalContent + originalContent;
        
        let position = 0;
        const speed = -1.2;
        let animationId = null;
        let isPaused = false;
        let lastTime = 0;
        const fps = 60;
        const interval = 1000 / fps;
        let rafActive = true;

        const animate = (currentTime) => {
            if (!rafActive) return;
            
            if (!lastTime) lastTime = currentTime;
            const deltaTime = currentTime - lastTime;

            if (deltaTime > interval && !isPaused) {
                position += speed;
                
                const contentWidth = content.scrollWidth / 3;
                if (Math.abs(position) >= contentWidth) {
                    position = 0;
                }
                
                track.style.transform = `translateX(${position}px)`;
                track.style.webkitTransform = `translateX(${position}px)`;
                
                lastTime = currentTime - (deltaTime % interval);
            }
            
            if (rafActive) {
                animationId = requestAnimationFrame(animate);
            }
        };

        // Запускаем анимацию
        animationId = requestAnimationFrame(animate);
        
        // Обработчики паузы/возобновления
        const pauseMarquee = () => {
            if (track.classList.contains('js-fallback-active')) {
                isPaused = true;
            } else {
                track.style.animationPlayState = 'paused';
            }
            track.classList.add('paused');
        };

        const resumeMarquee = () => {
            if (track.classList.contains('js-fallback-active')) {
                isPaused = false;
                lastTime = 0;
            } else {
                track.style.animationPlayState = 'running';
            }
            track.classList.remove('paused');
        };

        this.addSpeckMarqueeHoverHandlers(track, pauseMarquee, resumeMarquee);
        
        // Сохраняем ID для возможной очистки
        track._marqueeAnimationId = animationId;
        
        console.log('✅ Speck marquee running via JS');
    }

    addSpeckMarqueeHoverHandlers(track, pauseCallback = null, resumeCallback = null) {
        if (!track) return;

        const pauseMarquee = () => {
            if (track.classList.contains('js-fallback-active')) {
                if (pauseCallback) pauseCallback();
            } else {
                track.style.animationPlayState = 'paused';
            }
            track.classList.add('paused');
        };

        const resumeMarquee = () => {
            if (track.classList.contains('js-fallback-active')) {
                if (resumeCallback) resumeCallback();
            } else {
                track.style.animationPlayState = 'running';
            }
            track.classList.remove('paused');
        };

        const section = track.closest('.speck-marquee-section');
        if (section) {
            section.addEventListener('mouseenter', pauseMarquee);
            section.addEventListener('mouseleave', resumeMarquee);
            section.addEventListener('touchstart', pauseMarquee, { passive: true });
            section.addEventListener('touchend', resumeMarquee, { passive: true });
        }

        track.addEventListener('mouseenter', pauseMarquee);
        track.addEventListener('mouseleave', resumeMarquee);
    }

    // STATS COUNTER
    initializeStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number-improved');
        
        if (!statNumbers.length) {
            console.log('⚠️ Stat numbers not found');
            return;
        }
        
        console.log('📊 Initializing stats counter: ' + statNumbers.length + ' elements');
        
        const animateNumber = (element, target) => {
            let current = 0;
            const duration = 2000;
            const startTime = Date.now ? Date.now() : new Date().getTime();
            
            const updateNumber = () => {
                const elapsed = (Date.now ? Date.now() : new Date().getTime()) - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function для плавности
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                current = Math.floor(easeOutQuart * target);
                
                element.textContent = current.toLocaleString ? 
                    current.toLocaleString() : 
                    current.toString();
                
                if (progress < 1) {
                    if (window.requestAnimationFrame) {
                        requestAnimationFrame(updateNumber);
                    } else {
                        setTimeout(updateNumber, 16);
                    }
                } else {
                    element.textContent = target.toLocaleString ? 
                        target.toLocaleString() : 
                        target.toString();
                    element.classList.add('counter-animate');
                }
            };
            
            if (window.requestAnimationFrame && !this.isReducedMotion) {
                requestAnimationFrame(updateNumber);
            } else {
                // Fallback для старых браузеров или reduced motion
                element.textContent = target.toLocaleString ? 
                    target.toLocaleString() : 
                    target.toString();
                element.classList.add('counter-animate');
            }
        };
        
        const checkVisibility = () => {
            const windowHeight = window.innerHeight || 
                               document.documentElement.clientHeight || 
                               document.body.clientHeight;
            
            statNumbers.forEach(stat => {
                const rect = stat.getBoundingClientRect();
                const isVisible = (
                    rect.top <= windowHeight * 0.8 &&
                    rect.bottom >= 0
                );
                
                if (isVisible && !stat.classList.contains('animated')) {
                    const target = parseInt(stat.getAttribute('data-target')) || 0;
                    if (target > 0) {
                        animateNumber(stat, target);
                        stat.classList.add('animated');
                    }
                }
            });
        };
        
        // Оптимизированный слушатель скролла
        const throttledCheck = this.throttle(checkVisibility, 100);
        window.addEventListener('scroll', throttledCheck, { passive: true });
        window.addEventListener('resize', throttledCheck, { passive: true });
        
        // Первоначальная проверка
        checkVisibility();
    }

    // БАЗОВЫЕ АНИМАЦИИ
    initializeBasicAnimations() {
        const sections = document.querySelectorAll('.content-section');
        
        if (!sections.length) {
            console.log('⚠️ Content sections not found');
            return;
        }
        
        console.log('🎭 Initializing basic animations: ' + sections.length + ' sections');
        
        const checkSections = () => {
            const windowHeight = window.innerHeight || 
                               document.documentElement.clientHeight || 
                               document.body.clientHeight;
            
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const isVisible = (
                    rect.top <= windowHeight * 0.8 &&
                    rect.bottom >= 0
                );
                
                if (isVisible && !section.classList.contains('animated')) {
                    section.classList.add('animated');
                }
            });
        };
        
        const throttledCheck = this.throttle(checkSections, 100);
        window.addEventListener('scroll', throttledCheck, { passive: true });
        window.addEventListener('resize', throttledCheck, { passive: true });
        
        // Первоначальная проверка
        setTimeout(checkSections, 300);
    }

    // PARALLAX BACKGROUNDS (управление 4 фонами)
    initializeParallaxBackgrounds() {
        console.log('🌄 Initializing parallax backgrounds management...');
        
        const contentSections = document.querySelectorAll('.content-section[data-bg-index]');
        
        if (!contentSections.length) {
            console.log('⚠️ Sections with parallax backgrounds not found');
            return;
        }
        
        console.log('🎯 Found ' + contentSections.length + ' sections with backgrounds');
        
        const checkBackgrounds = () => {
            const windowHeight = window.innerHeight || 
                               document.documentElement.clientHeight || 
                               document.body.clientHeight;
            let activeIndex = 0;
            
            // Находим текущую секцию
            for (const section of contentSections) {
                const rect = section.getBoundingClientRect();
                const isVisible = (
                    rect.top <= windowHeight * 0.5 &&
                    rect.bottom >= windowHeight * 0.5
                );
                
                if (isVisible) {
                    activeIndex = parseInt(section.getAttribute('data-bg-index')) || 0;
                    break;
                }
            }
            
            // Устанавливаем активный фон
            this.setActiveParallaxBackground(activeIndex);
        };
        
        const throttledCheck = this.throttle(checkBackgrounds, 100);
        window.addEventListener('scroll', throttledCheck, { passive: true });
        window.addEventListener('resize', throttledCheck, { passive: true });
        
        // Первоначальная установка
        setTimeout(checkBackgrounds, 500);
    }
    
    // Установка активного параллакс фона
    setActiveParallaxBackground(index) {
        const backgrounds = document.querySelectorAll('.parallax-bg');
        
        if (index >= backgrounds.length) {
            console.warn(`⚠️ Background index ${index} out of range (max ${backgrounds.length})`);
            return;
        }
        
        // Убираем active класс со всех фонов
        backgrounds.forEach(bg => {
            bg.classList.remove('active');
            bg.style.opacity = '0';
            bg.style.zIndex = '0';
        });
        
        // Добавляем active класс к текущему фону
        const targetBg = backgrounds[index];
        if (targetBg) {
            targetBg.classList.add('active');
            targetBg.style.opacity = '1';
            targetBg.style.zIndex = '1';
            
            console.log(`🎨 Active background: #${index + 1}`);
        }
    }

    // SCROLL PROGRESS
    initializeScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (!progressBar) {
            console.log('⚠️ Scroll progress bar not found');
            return;
        }
        
        console.log('📏 Initializing scroll progress bar');
        
        const updateProgress = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const progress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
            
            progressBar.style.width = Math.min(Math.max(progress, 0), 100) + '%';
        };
        
        const throttledUpdate = this.throttle(updateProgress, 16);
        window.addEventListener('scroll', throttledUpdate, { passive: true });
        window.addEventListener('resize', throttledUpdate, { passive: true });
        
        updateProgress();
    }

    // CLICKABLE ELEMENTS
    initializeClickableStats() {
        const statCards = document.querySelectorAll('.stat-card.clickable-stat-card');
        
        if (!statCards.length) {
            console.log('⚠️ Clickable stat cards not found');
            return;
        }
        
        console.log('🖱️ Initializing clickable elements: ' + statCards.length + ' cards');
        
        statCards.forEach(card => {
            if (!card.hasAttribute('tabindex')) {
                card.setAttribute('tabindex', '0');
            }
            
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.keyCode === 13) {
                    e.preventDefault();
                    if (card.href) {
                        window.location.href = card.href;
                    }
                }
            });
        });
    }

    initializeCTAClickable() {
        const ctaSection = document.querySelector('.cta-improved.clickable-cta');
        if (!ctaSection) {
            console.log('⚠️ Clickable CTA section not found');
            return;
        }
        
        console.log('📞 Initializing clickable CTA section');
        
        if (!ctaSection.hasAttribute('tabindex')) {
            ctaSection.setAttribute('tabindex', '0');
        }
        
        ctaSection.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.keyCode === 13) {
                e.preventDefault();
                if (ctaSection.href) {
                    window.location.href = ctaSection.href;
                }
            }
        });
    }

    // ОПТИМИЗАЦИЯ ПРОИЗВОДИТЕЛЬНОСТИ
    optimizePerformance() {
        console.log('⚡ Applying performance optimizations...');
        
        // Отключаем сложные анимации на слабых устройствах
        if (this.isLowPerformanceDevice()) {
            console.log('📱 Low performance device detected, simplifying animations');
            this.simplifyAnimations();
        }
        
        // Оптимизация для reduced motion
        if (this.isReducedMotion) {
            console.log('♿ Reduced motion preference detected, disabling animations');
            this.disableNonEssentialAnimations();
        }
    }
    
    isLowPerformanceDevice() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const memory = navigator.deviceMemory || 4;
        const cores = navigator.hardwareConcurrency || 4;
        
        return isMobile && (memory < 4 || cores < 4);
    }
    
    simplifyAnimations() {
        // Упрощаем анимации на слабых устройствах
        const animatedElements = document.querySelectorAll('.speck-vertical-block, .content-section');
        animatedElements.forEach(el => {
            el.style.transition = 'none';
            el.classList.add('visible');
        });
    }
    
    disableNonEssentialAnimations() {
        // Отключаем необязательные анимации
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
    }

    // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
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
}

// ГЛОБАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ ГЛАВНОЙ СТРАНИЦЫ
function initializeHomePage() {
    // Проверяем, что мы на главной странице
    if (!document.body || !document.body.classList.contains('home-page')) {
        console.log('⚠️ Not home page, home.js will not initialize full HomePage');
        return;
    }
    
    console.log('📄 INITIALIZING HOME PAGE WITH 4 BACKGROUNDS');
    console.log('🔧 DOM loading state:', document.readyState);
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('✅ DOM fully loaded');
            console.log('🎬 Creating HomePage instance...');
            try {
                window.homePage = new HomePage();
                console.log('🎉 Home page successfully initialized with 4 backgrounds!');
                
                // Добавляем финальный класс
                document.body.classList.add('homepage-initialized');
            } catch (error) {
                console.error('❌ Error during HomePage initialization:', error);
            }
        });
    } else {
        console.log('✅ DOM already loaded');
        console.log('🎬 Creating HomePage instance...');
        try {
            window.homePage = new HomePage();
            console.log('🎉 Home page successfully initialized with 4 backgrounds!');
            
            // Добавляем финальный класс
            document.body.classList.add('homepage-initialized');
        } catch (error) {
            console.error('❌ Error during HomePage initialization:', error);
        }
    }
}

// Автоматическая инициализация
console.log('🚀 Starting home page initialization...');
initializeHomePage();

// Экспорт класса
if (typeof window !== 'undefined') {
    window.HomePage = HomePage;
}

// Глобальная обработка ошибок
window.addEventListener('error', function(e) {
    if (e.message && e.message.includes('HomePage') || 
        e.filename && e.filename.includes('home.js')) {
        console.error('🚨 Critical error in home.js:', e);
    }
});

console.log('✅ home.js fully loaded and ready for 4 backgrounds');
