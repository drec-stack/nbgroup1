// home.js - ПОЛНАЯ ВЕРСИЯ С ИНТЕГРАЦИЕЙ ФОНОВОЙ СИСТЕМЫ

console.log('🎬 home.js loaded - ENHANCED VERSION WITH BACKGROUND SYSTEM INTEGRATION');

// ===== ENHANCED HOMEPAGE CLASS =====
class EnhancedHomePage {
    constructor() {
        this.isReducedMotion = window.matchMedia ? 
            window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
        
        console.log('🏠 EnhancedHomePage initialized');
        
        // Инициализация всех компонентов
        this.initializeComponents();
        
        // Интеграция с системой фонов
        this.setupBackgroundSystemIntegration();
    }

    // ИНИЦИАЛИЗАЦИЯ ВСЕХ КОМПОНЕНТОВ
    initializeComponents() {
        console.log('🚀 Initializing components...');
        
        try {
            this.initializeBasicAnimations();
            this.initializeStatsCounter();
            this.initializeSpeckVerticalBlocks();
            this.initializeSpeckMarquee();
            this.initializeScrollProgress();
            this.initializeClickableStats();
            this.initializeCTAClickable();
            this.initializeSectionBackgrounds();
            
            // Оптимизация производительности
            this.optimizePerformance();
            
            console.log('✅ All components initialized');
        } catch (error) {
            console.error('❌ Error during component initialization:', error);
        }
    }

    // ИНТЕГРАЦИЯ С СИСТЕМОЙ ФОНОВ
    setupBackgroundSystemIntegration() {
        console.log('🎨 Setting up background system integration...');
        
        // Ждем инициализации системы фонов
        this.waitForBackgroundSystem().then(() => {
            console.log('✅ Background system integration ready');
            
            // Настраиваем слушатели событий
            this.setupBackgroundEventListeners();
            
            // Настраиваем интерактивность секций
            this.setupSectionBackgroundInteractions();
            
            // Запускаем эффекты для текущего фона
            this.applyEffectsForCurrentBackground();
        }).catch(error => {
            console.warn('⚠️ Background system not available:', error);
        });
    }
    
    waitForBackgroundSystem() {
        return new Promise((resolve, reject) => {
            let attempts = 0;
            const maxAttempts = 50;
            
            const checkSystem = () => {
                attempts++;
                
                if (typeof window.backgroundSystem !== 'undefined' && 
                    window.backgroundSystem.getInstance() !== null) {
                    resolve();
                } else if (attempts >= maxAttempts) {
                    reject(new Error('Background system timeout'));
                } else {
                    setTimeout(checkSystem, 100);
                }
            };
            
            checkSystem();
        });
    }
    
    setupBackgroundEventListeners() {
        // Слушаем события смены фона
        document.addEventListener('backgroundChanged', (event) => {
            this.onBackgroundChange(event.detail);
        });
        
        // Слушаем клики на секциях для переключения фона
        document.addEventListener('click', (e) => {
            const section = e.target.closest('[data-bg-index]');
            if (section && window.backgroundSystem) {
                const bgIndex = parseInt(section.getAttribute('data-bg-index'));
                const currentBg = window.backgroundSystem.getInstance()?.currentIndex;
                
                if (bgIndex !== currentBg) {
                    window.backgroundSystem.switchTo(bgIndex);
                    
                    // Плавная прокрутка к секции
                    section.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }
    
    onBackgroundChange(detail) {
        const { index, total, timestamp } = detail;
        console.log(`🎨 Background changed to ${index + 1}/${total} at ${timestamp}`);
        
        // Добавляем эффекты при смене фона
        this.addBackgroundChangeEffects(index);
        
        // Обновляем активную секцию
        this.updateActiveSection(index);
        
        // Адаптируем контент под фон
        this.adaptContentToBackground(index);
    }
    
    addBackgroundChangeEffects(bgIndex) {
        // Добавляем различные эффекты в зависимости от фона
        switch(bgIndex) {
            case 0: // Hero background
                this.addHeroBackgroundEffects();
                break;
            case 1: // Marquee background
                this.addMarqueeBackgroundEffects();
                break;
            case 2: // Stats background
                this.addStatsBackgroundEffects();
                break;
            case 3: // CTA background
                this.addCTABackgroundEffects();
                break;
        }
    }
    
    addHeroBackgroundEffects() {
        // Эффекты для первого фона
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.classList.add('highlight-section');
            setTimeout(() => {
                heroSection.classList.remove('highlight-section');
            }, 2000);
        }
        
        // Плавное появление элементов
        this.animateSectionElements('.hero', 'fade-in-up');
    }
    
    addMarqueeBackgroundEffects() {
        // Эффекты для второго фона
        const marqueeSection = document.querySelector('.speck-marquee-section');
        if (marqueeSection) {
            marqueeSection.classList.add('highlight-section');
            setTimeout(() => {
                marqueeSection.classList.remove('highlight-section');
            }, 2000);
        }
        
        // Ускорение/замедление маркера
        this.controlMarqueeSpeed(1.5);
        setTimeout(() => this.controlMarqueeSpeed(1), 1500);
    }
    
    addStatsBackgroundEffects() {
        // Эффекты для третьего фона
        const statsSection = document.querySelector('.stats-improved');
        if (statsSection) {
            statsSection.classList.add('highlight-section');
            setTimeout(() => {
                statsSection.classList.remove('highlight-section');
            }, 2000);
        }
        
        // Анимация счетчиков
        this.animateStatsCounters();
    }
    
    addCTABackgroundEffects() {
        // Эффекты для четвертого фона
        const ctaSection = document.querySelector('.cta-improved');
        if (ctaSection) {
            ctaSection.classList.add('highlight-section');
            setTimeout(() => {
                ctaSection.classList.remove('highlight-section');
            }, 2000);
        }
        
        // Пульсация кнопки CTA
        this.pulseCTAButton();
    }
    
    controlMarqueeSpeed(speedMultiplier) {
        const marqueeTrack = document.getElementById('speckMarqueeTrack');
        if (marqueeTrack) {
            const currentSpeed = parseFloat(
                window.getComputedStyle(marqueeTrack).animationDuration
            ) || 40;
            
            marqueeTrack.style.animationDuration = `${currentSpeed / speedMultiplier}s`;
        }
    }
    
    animateStatsCounters() {
        const statNumbers = document.querySelectorAll('.stat-number-improved:not(.animated)');
        statNumbers.forEach((stat, index) => {
            setTimeout(() => {
                if (!stat.classList.contains('animated')) {
                    const target = parseInt(stat.getAttribute('data-target')) || 0;
                    if (target > 0) {
                        this.animateNumber(stat, target);
                        stat.classList.add('animated');
                    }
                }
            }, index * 200);
        });
    }
    
    pulseCTAButton() {
        const ctaButton = document.querySelector('.btn-glow');
        if (ctaButton) {
            ctaButton.classList.add('pulse-animation');
            setTimeout(() => {
                ctaButton.classList.remove('pulse-animation');
            }, 3000);
        }
    }
    
    updateActiveSection(bgIndex) {
        // Убираем активность у всех секций
        document.querySelectorAll('[data-bg-index]').forEach(section => {
            section.classList.remove('active-section');
        });
        
        // Добавляем активность текущей секции
        const activeSection = document.querySelector(`[data-bg-index="${bgIndex}"]`);
        if (activeSection) {
            activeSection.classList.add('active-section');
        }
    }
    
    adaptContentToBackground(bgIndex) {
        // Адаптируем стили контента под текущий фон
        const contentElements = document.querySelectorAll('.content-on-background');
        
        contentElements.forEach(element => {
            element.classList.remove('on-bg-0', 'on-bg-1', 'on-bg-2', 'on-bg-3');
            element.classList.add(`on-bg-${bgIndex}`);
        });
    }
    
    animateSectionElements(sectionSelector, animationClass) {
        const section = document.querySelector(sectionSelector);
        if (!section) return;
        
        const elements = section.querySelectorAll('.animated-element, h1, h2, h3, p, .btn');
        elements.forEach((el, index) => {
            el.classList.remove('fade-in-up', 'fade-in-down', 'fade-in-left', 'fade-in-right', 'scale-in');
            
            setTimeout(() => {
                el.classList.add(animationClass);
                el.style.animationDelay = `${index * 0.1}s`;
            }, 50);
        });
    }
    
    applyEffectsForCurrentBackground() {
        const bgManager = window.backgroundSystem?.getInstance();
        if (bgManager) {
            const currentBg = bgManager.currentIndex;
            this.addBackgroundChangeEffects(currentBg);
            this.updateActiveSection(currentBg);
        }
    }

    // СПЕЦИАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ СЕКЦИЙ ДЛЯ ФОНОВ
    initializeSectionBackgrounds() {
        console.log('🎨 Initializing section backgrounds...');
        
        // Добавляем классы для каждой секции
        document.querySelectorAll('[data-bg-index]').forEach(section => {
            const bgIndex = section.getAttribute('data-bg-index');
            section.classList.add(`section-bg-${bgIndex}`);
        });
    }

    setupSectionBackgroundInteractions() {
        // Настраиваем отслеживание видимости секций для авто-переключения
        if ('IntersectionObserver' in window) {
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const bgIndex = entry.target.getAttribute('data-bg-index');
                        if (bgIndex !== null && window.backgroundSystem) {
                            const currentBg = window.backgroundSystem.getInstance()?.currentIndex;
                            const targetBg = parseInt(bgIndex);
                            
                            if (targetBg !== currentBg && !this.isAnimatingBackground) {
                                this.isAnimatingBackground = true;
                                
                                window.backgroundSystem.switchTo(targetBg);
                                
                                setTimeout(() => {
                                    this.isAnimatingBackground = false;
                                }, 1000);
                            }
                        }
                    }
                });
            }, {
                threshold: 0.3,
                rootMargin: '0px 0px -100px 0px'
            });
            
            document.querySelectorAll('[data-bg-index]').forEach(section => {
                sectionObserver.observe(section);
            });
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

        setTimeout(() => {
            const track = document.querySelector('.speck-marquee-track');
            if (track && !track.classList.contains('js-fallback-active')) {
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

        animationId = requestAnimationFrame(animate);
        
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
        
        this.animateNumber = (element, target) => {
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
            
            if (window.requestAnimationFrame && !this.isReducedMotion) {
                requestAnimationFrame(updateNumber);
            } else {
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
                        this.animateNumber(stat, target);
                        stat.classList.add('animated');
                    }
                }
            });
        };
        
        const throttledCheck = this.throttle(checkVisibility, 100);
        window.addEventListener('scroll', throttledCheck, { passive: true });
        window.addEventListener('resize', throttledCheck, { passive: true });
        
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
                    
                    const animatedElements = section.querySelectorAll('.animated-element');
                    animatedElements.forEach((el, index) => {
                        setTimeout(() => {
                            el.classList.add('fade-in-up');
                        }, index * 100);
                    });
                }
            });
        };
        
        const throttledCheck = this.throttle(checkSections, 100);
        window.addEventListener('scroll', throttledCheck, { passive: true });
        window.addEventListener('resize', throttledCheck, { passive: true });
        
        setTimeout(checkSections, 300);
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
            
            if (progress < 25) {
                progressBar.style.background = 'linear-gradient(90deg, #0066ff, #3399ff)';
            } else if (progress < 50) {
                progressBar.style.background = 'linear-gradient(90deg, #3399ff, #00ccff)';
            } else if (progress < 75) {
                progressBar.style.background = 'linear-gradient(90deg, #00ccff, #0099ff)';
            } else {
                progressBar.style.background = 'linear-gradient(90deg, #0099ff, #0066ff)';
            }
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
        
        if (this.isLowPerformanceDevice()) {
            console.log('📱 Low performance device detected, simplifying animations');
            this.simplifyAnimations();
        }
        
        if (this.isReducedMotion) {
            console.log('♿ Reduced motion preference detected, disabling animations');
            this.disableNonEssentialAnimations();
        }
        
        this.setupLazyLoading();
    }
    
    isLowPerformanceDevice() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const memory = navigator.deviceMemory || 4;
        const cores = navigator.hardwareConcurrency || 4;
        
        return isMobile && (memory < 4 || cores < 4);
    }
    
    simplifyAnimations() {
        const animatedElements = document.querySelectorAll('.speck-vertical-block, .content-section, .animated-element');
        animatedElements.forEach(el => {
            el.style.transition = 'none';
            el.classList.add('visible');
            el.classList.remove('fade-in-up', 'fade-in-down', 'fade-in-left', 'fade-in-right', 'scale-in');
        });
    }
    
    disableNonEssentialAnimations() {
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
    }
    
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[data-src]');
            
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        }
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
    
    get currentBackground() {
        const bgManager = window.backgroundSystem?.getInstance();
        return bgManager ? bgManager.currentIndex : 0;
    }
    
    switchBackground(index) {
        if (window.backgroundSystem) {
            window.backgroundSystem.switchTo(index);
        }
    }
    
    getBackgroundInfo() {
        const bgManager = window.backgroundSystem?.getInstance();
        if (bgManager) {
            return {
                current: bgManager.currentIndex,
                total: bgManager.layers.length,
                isAnimating: bgManager.isAnimating
            };
        }
        return null;
    }
}

// ===== ГЛОБАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ =====
function initializeEnhancedHomePage() {
    if (!document.body || !document.body.classList.contains('home-page')) {
        console.log('⚠️ Not home page, enhanced home.js will not initialize');
        return;
    }
    
    console.log('📄 INITIALIZING ENHANCED HOME PAGE');
    
    function startEnhancedHomePage() {
        console.log('🎬 Creating EnhancedHomePage instance...');
        try {
            window.enhancedHomePage = new EnhancedHomePage();
            console.log('🎉 Enhanced home page successfully initialized with background system!');
            
            document.body.classList.add('enhanced-homepage-initialized');
            
            window.HomePage = EnhancedHomePage;
            
        } catch (error) {
            console.error('❌ Error during EnhancedHomePage initialization:', error);
            
            try {
                const BasicHomePage = class {
                    constructor() {
                        this.initializeBasicAnimations();
                        this.initializeStatsCounter();
                        this.initializeScrollProgress();
                    }
                    
                    initializeBasicAnimations() {
                        document.querySelectorAll('.content-section').forEach(section => {
                            section.classList.add('animated');
                        });
                    }
                    
                    initializeStatsCounter() {
                        document.querySelectorAll('.stat-number-improved').forEach(stat => {
                            const target = parseInt(stat.getAttribute('data-target')) || 0;
                            stat.textContent = target;
                        });
                    }
                    
                    initializeScrollProgress() {
                        const bar = document.querySelector('.scroll-progress-bar');
                        if (bar) bar.style.width = '0%';
                    }
                };
                
                window.homePage = new BasicHomePage();
                console.log('🔄 Fallback to basic homepage initialized');
            } catch (fallbackError) {
                console.error('❌ Fallback also failed:', fallbackError);
            }
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startEnhancedHomePage);
    } else {
        startEnhancedHomePage();
    }
}

console.log('🚀 Starting enhanced home page initialization...');
initializeEnhancedHomePage();

if (typeof window !== 'undefined') {
    window.EnhancedHomePage = EnhancedHomePage;
}

window.backgroundControls = {
    next: () => window.backgroundSystem?.nextBackground?.(),
    prev: () => window.backgroundSystem?.prevBackground?.(),
    switchTo: (index) => window.backgroundSystem?.switchTo?.(index),
    getCurrent: () => window.backgroundSystem?.getInstance()?.currentIndex,
    getTotal: () => window.backgroundSystem?.getInstance()?.layers?.length
};

window.addEventListener('error', function(e) {
    if (e.message && e.message.includes('HomePage') || 
        e.filename && e.filename.includes('home.js')) {
        console.error('🚨 Critical error in home.js:', e);
    }
});

console.log('✅ Enhanced home.js fully loaded with background system integration');
