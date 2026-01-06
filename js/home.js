// home.js - ПОЛНАЯ ВЕРСИЯ ДЛЯ ГЛАВНОЙ СТРАНИЦЫ NB GROUP TECH
// Версия: 4.0.1 | СТАТИЧНЫЙ ФОН (без видео)

console.log('🎬 home.js загружен - СТАТИЧНЫЙ ФОН');

(function() {
    'use strict';
    
    class HomePage {
        constructor() {
            this.isReducedMotion = window.matchMedia ? 
                window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
            
            console.log('🏠 HomePage инициализирован (статичный фон)');
            
            // Инициализация статичного фона
            this.initializeHeroBackground();
            
            // Инициализация остальных компонентов
            this.initialize();
        }

        // ===== СТАТИЧНЫЙ ФОН ГЕРОЯ =====
        initializeHeroBackground() {
            console.log('🎨 Инициализация статичного фона героя');
            
            const heroContainer = document.getElementById('hero-background-container');
            if (heroContainer) {
                // Принудительно устанавливаем видимость
                heroContainer.style.display = 'block';
                heroContainer.style.visibility = 'visible';
                heroContainer.style.opacity = '1';
                heroContainer.style.position = 'fixed';
                heroContainer.style.top = '0';
                heroContainer.style.left = '0';
                heroContainer.style.width = '100%';
                heroContainer.style.height = '100%';
                heroContainer.style.zIndex = '-100';
                heroContainer.style.pointerEvents = 'none';
                
                // Отключаем анимацию если пользователь предпочитает reduced motion
                if (this.isReducedMotion) {
                    const heroImage = heroContainer.querySelector('.hero-background-image');
                    if (heroImage) {
                        heroImage.style.animation = 'none';
                    }
                }
                
                console.log('✅ Статичный фон героя инициализирован');
            } else {
                console.warn('⚠️ Контейнер статичного фона не найден');
            }
        }

        // ===== ИНИЦИАЛИЗАЦИЯ ОСТАЛЬНЫХ КОМПОНЕНТОВ =====
        initialize() {
            console.log('🚀 Инициализация остальных компонентов...');
            
            this.initializeBasicAnimations();
            this.initializeStatsCounter();
            this.initializeSpeckVerticalBlocks();
            this.initializeSpeckMarquee();
            this.initializeScrollProgress();
            this.initializeParallaxBackgrounds();
            this.initializeClickableStats();
            this.initializeCTAClickable();
            
            console.log('✅ Все компоненты инициализированы');
        }

        // ===== SPECK VERTICAL BLOCKS =====
        initializeSpeckVerticalBlocks() {
            const speckBlocks = document.querySelectorAll('.speck-vertical-block');
            
            if (!speckBlocks.length) {
                console.log('⚠️ Вертикальные блоки не найдены');
                return;
            }
            
            console.log('🎨 Инициализация ' + speckBlocks.length + ' вертикальных блоков');
            
            if (window.IntersectionObserver) {
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
                setTimeout(() => {
                    speckBlocks.forEach((block, index) => {
                        setTimeout(() => {
                            block.classList.add('visible');
                        }, index * 200);
                    });
                }, 500);
            }
        }

        // ===== SPECK MARQUEE =====
        initializeSpeckMarquee() {
            const speckMarqueeTrack = document.getElementById('speckMarqueeTrack');
            if (!speckMarqueeTrack) {
                console.warn('❌ Speck marquee track не найден');
                return;
            }

            console.log('🎯 Инициализация Speck бегущей строки');

            // Проверяем работает ли CSS анимация
            setTimeout(() => {
                const style = window.getComputedStyle(speckMarqueeTrack);
                
                if (style.animationName === 'none' || this.isReducedMotion) {
                    console.log('🚀 Запуск JS fallback для Speck бегущей строки');
                    this.runSpeckMarqueeJS(speckMarqueeTrack);
                } else {
                    console.log('✅ Speck бегущая строка работает через CSS');
                    this.addSpeckMarqueeHoverHandlers(speckMarqueeTrack);
                }
            }, 100);

            // Проверка через 2 секунды
            setTimeout(() => {
                const track = document.querySelector('.speck-marquee-track');
                if (track) {
                    const rect = track.getBoundingClientRect();
                    const isMoving = rect.left !== 0;
                    
                    if (!isMoving && !track.classList.contains('js-fallback-active')) {
                        console.log('⚠️ Бегущая строка не двигается, запускаем JS fallback');
                        this.runSpeckMarqueeJS(speckMarqueeTrack);
                    }
                }
            }, 2000);
        }

        runSpeckMarqueeJS(track) {
            if (track.classList.contains('js-fallback-active')) {
                console.log('⚠️ JS fallback уже активен');
                return;
            }

            const content = track.querySelector('.speck-marquee-content');
            if (!content) {
                console.error('❌ Speck marquee content не найден');
                return;
            }

            console.log('🔄 Запуск JS бегущей строки...');

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

            const animate = (currentTime) => {
                if (!lastTime) lastTime = currentTime;
                const deltaTime = currentTime - lastTime;

                if (deltaTime > interval && !isPaused) {
                    position += speed;
                    
                    const contentWidth = content.scrollWidth / 3;
                    if (position <= -contentWidth) {
                        position = 0;
                    }
                    
                    track.style.transform = `translateX(${position}px)`;
                    track.style.webkitTransform = `translateX(${position}px)`;
                    
                    lastTime = currentTime - (deltaTime % interval);
                }
                
                animationId = requestAnimationFrame(animate);
            };

            animationId = requestAnimationFrame(animate);
            
            this.addSpeckMarqueeHoverHandlers(track, () => isPaused = true, () => isPaused = false);
            
            track._marqueeAnimationId = animationId;
            
            console.log('✅ Speck бегущая строка запущена через JS');
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
                section.addEventListener('touchstart', pauseMarquee);
                section.addEventListener('touchend', resumeMarquee);
            }

            track.addEventListener('mouseenter', pauseMarquee);
            track.addEventListener('mouseleave', resumeMarquee);
            track.addEventListener('touchstart', pauseMarquee);
            track.addEventListener('touchend', resumeMarquee);
        }

        // ===== STATS COUNTER =====
        initializeStatsCounter() {
            const statNumbers = document.querySelectorAll('.stat-number-improved');
            
            if (!statNumbers.length) {
                console.log('⚠️ Статистические числа не найдены');
                return;
            }
            
            console.log('📊 Инициализация счетчика статистики: ' + statNumbers.length + ' элементов');
            
            const animateNumber = (element, target) => {
                let current = 0;
                const duration = 2000;
                const startTime = Date.now ? Date.now() : new Date().getTime();
                
                const updateNumber = () => {
                    const elapsed = (Date.now ? Date.now() : new Date().getTime()) - startTime;
                    const progress = Math.min(elapsed / duration, 1);
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
                
                if (window.requestAnimationFrame) {
                    requestAnimationFrame(updateNumber);
                } else {
                    const interval = setInterval(() => {
                        current += Math.ceil(target / 50);
                        if (current >= target) {
                            current = target;
                            clearInterval(interval);
                            element.classList.add('counter-animate');
                        }
                        element.textContent = current;
                    }, 40);
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
            
            window.addEventListener('scroll', checkVisibility);
            window.addEventListener('resize', checkVisibility);
            checkVisibility();
        }

        // ===== БАЗОВЫЕ АНИМАЦИИ =====
        initializeBasicAnimations() {
            const sections = document.querySelectorAll('.content-section');
            
            if (!sections.length) {
                console.log('⚠️ Секции контента не найдены');
                return;
            }
            
            console.log('🎭 Инициализация базовых анимаций: ' + sections.length + ' секций');
            
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
            
            window.addEventListener('scroll', checkSections);
            window.addEventListener('resize', checkSections);
            checkSections();
        }

        // ===== PARALLAX BACKGROUNDS =====
        initializeParallaxBackgrounds() {
            const contentSections = document.querySelectorAll('.content-section[data-bg-index]');
            
            if (!contentSections.length) {
                console.log('⚠️ Секции с parallax фоном не найдены');
                return;
            }
            
            console.log('🌄 Инициализация parallax фонов: ' + contentSections.length + ' секций');
            
            const checkBackgrounds = () => {
                const windowHeight = window.innerHeight || 
                                   document.documentElement.clientHeight || 
                                   document.body.clientHeight;
                let activeIndex = 0;
                
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
                
                const backgrounds = document.querySelectorAll('.parallax-bg');
                backgrounds.forEach(bg => bg.classList.remove('active'));
                
                const targetBg = document.getElementById('parallax-bg-' + (parseInt(activeIndex) + 1));
                if (targetBg) {
                    targetBg.classList.add('active');
                }
            };
            
            window.addEventListener('scroll', checkBackgrounds);
            window.addEventListener('resize', checkBackgrounds);
            checkBackgrounds();
        }

        // ===== SCROLL PROGRESS =====
        initializeScrollProgress() {
            const progressBar = document.querySelector('.scroll-progress-bar');
            if (!progressBar) {
                console.log('⚠️ Прогресс-бар скролла не найден');
                return;
            }
            
            console.log('📏 Инициализация прогресс-бара скролла');
            
            const updateProgress = () => {
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight - windowHeight;
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const progress = (scrollTop / documentHeight) * 100;
                
                progressBar.style.width = Math.min(progress, 100) + '%';
            };
            
            window.addEventListener('scroll', updateProgress);
            updateProgress();
        }

        // ===== CLICKABLE ELEMENTS =====
        initializeClickableStats() {
            const statCards = document.querySelectorAll('.stat-card.clickable-stat-card');
            
            if (!statCards.length) {
                console.log('⚠️ Кликабельные карточки статистики не найдены');
                return;
            }
            
            console.log('🖱️ Инициализация кликабельных элементов: ' + statCards.length + ' карточек');
            
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
                console.log('⚠️ Кликабельная CTA секция не найдена');
                return;
            }
            
            console.log('📞 Инициализация кликабельной CTA секции');
            
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
    }

    // ===== ГЛОБАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ =====
    function initializeHomePage() {
        // Проверяем, что мы на главной странице
        if (!document.body || !document.body.classList.contains('home-page')) {
            console.log('⚠️ Это не главная страница, home.js не будет инициализирован');
            return;
        }
        
        console.log('📄 ИНИЦИАЛИЗАЦИЯ ГЛАВНОЙ СТРАНИЦЫ NB GROUP TECH (статичный фон)');
        console.log('🔧 Состояние загрузки DOM:', document.readyState);
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                console.log('✅ DOM полностью загружен');
                console.log('🎬 Создание экземпляра HomePage...');
                try {
                    window.homePage = new HomePage();
                    console.log('🎉 Главная страница успешно инициализирована (статичный фон)!');
                } catch (error) {
                    console.error('❌ Ошибка при инициализации HomePage:', error);
                }
            });
        } else {
            console.log('✅ DOM уже загружен');
            console.log('🎬 Создание экземпляра HomePage...');
            try {
                window.homePage = new HomePage();
                console.log('🎉 Главная страница успешно инициализирована (статичный фон)!');
            } catch (error) {
                console.error('❌ Ошибка при инициализации HomePage:', error);
            }
        }
    }
    
    // Автоматическая инициализация при загрузке скрипта
    console.log('🚀 Запуск инициализации главной страницы...');
    initializeHomePage();
    
    // Экспортируем класс для глобального доступа
    if (typeof window !== 'undefined') {
        window.HomePage = HomePage;
    }
    
    console.log('✅ home.js полностью загружен и готов к работе (статичный фон)');
    
})();
