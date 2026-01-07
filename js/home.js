// home.js - С ФОНОВОЙ СИСТЕМОЙ ПАРАЛЛАКСА

console.log('🏠 home.js loaded - WITH BACKGROUND PARALLAX SYSTEM');

// ===== КЛАСС ГЛАВНОЙ СТРАНИЦЫ С ФОНОМ =====
class HomePageWithBackground {
    constructor() {
        this.isReducedMotion = window.matchMedia ? 
            window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
        
        this.bgLayers = null;
        this.totalLayers = 4;
        this.currentLayer = 0;
        this.isScrolling = false;
        this.scrollTimeout = null;
        
        console.log('🏠 HomePageWithBackground initialized');
        
        // Инициализация всех компонентов
        this.initializeComponents();
    }

    // ИНИЦИАЛИЗАЦИЯ ВСЕХ КОМПОНЕНТОВ
    initializeComponents() {
        console.log('🚀 Initializing components with background system...');
        
        try {
            this.initializeBackgroundSystem();
            this.initializeBasicAnimations();
            this.initializeStatsCounter();
            this.initializeSpeckVerticalBlocks();
            this.initializeSpeckMarquee();
            this.initializeScrollProgress();
            this.initializeClickableStats();
            this.initializeCTAClickable();
            
            // Оптимизация производительности
            this.optimizePerformance();
            
            console.log('✅ All components initialized');
        } catch (error) {
            console.error('❌ Error during component initialization:', error);
        }
    }

    // ФОНОВАЯ СИСТЕМА
    initializeBackgroundSystem() {
        const bgContainer = document.querySelector('.bg-layers-container');
        this.bgLayers = document.querySelectorAll('.bg-layer');
        
        if (!bgContainer || !this.bgLayers.length) {
            console.warn('⚠️ Background layers not found, falling back to basic version');
            return;
        }
        
        console.log('🎨 Initializing background system with ' + this.bgLayers.length + ' layers');
        
        // Предзагрузка изображений
        this.preloadBackgroundImages();
        
        // Активация контейнера
        setTimeout(() => {
            bgContainer.classList.add('loaded');
            console.log('✅ Background container loaded');
        }, 300);
        
        // Инициализация отслеживания скролла
        this.setupScrollTracking();
        
        // Параллакс эффект
        if (!this.isReducedMotion) {
            this.setupParallaxEffect();
        }
        
        // Связь с секциями
        this.linkSectionsToBackground();
    }
    
    preloadBackgroundImages() {
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
            img.onload = () => {
                loadedCount++;
                console.log(`🖼️ Background image loaded: ${loadedCount}/${totalImages}`);
                
                if (loadedCount === totalImages) {
                    console.log('✅ All background images loaded');
                    this.onBackgroundImagesLoaded();
                }
            };
            
            img.onerror = () => {
                console.error(`❌ Failed to load background image: ${url}`);
                loadedCount++;
                
                if (loadedCount === totalImages) {
                    this.onBackgroundImagesLoaded();
                }
            };
            
            img.src = url;
        });
    }
    
    onBackgroundImagesLoaded() {
        console.log('🎯 Background images ready, enabling transitions');
        
        // Включаем плавные переходы после загрузки
        this.bgLayers.forEach(layer => {
            layer.style.transition = 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }
    
    setupScrollTracking() {
        console.log('📊 Setting up scroll tracking for background layers');
        
        const updateBackgroundOnScroll = () => {
            if (this.isScrolling) return;
            
            const scrollPosition = window.scrollY || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            
            // Вычисляем процент прокрутки
            const scrollPercent = documentHeight > 0 ? 
                Math.min(scrollPosition / documentHeight, 1) : 0;
            
            // Определяем текущий слой на основе процента прокрутки
            const newLayer = Math.min(
                Math.floor(scrollPercent * this.totalLayers),
                this.totalLayers - 1
            );
            
            // Если слой изменился
            if (newLayer !== this.currentLayer) {
                this.switchToLayer(newLayer);
            }
            
            // Эффект параллакса для каждого слоя
            this.applyParallaxToLayers(scrollPosition);
        };
        
        // Дебаунс для оптимизации
        const throttledUpdate = this.throttle(updateBackgroundOnScroll, 16);
        
        // Слушатель скролла
        window.addEventListener('scroll', throttledUpdate, { passive: true });
        
        // Инициализация при загрузке
        setTimeout(updateBackgroundOnScroll, 100);
        
        console.log('✅ Scroll tracking initialized');
    }
    
    switchToLayer(layerIndex) {
        if (layerIndex < 0 || layerIndex >= this.totalLayers || layerIndex === this.currentLayer) {
            return;
        }
        
        console.log(`🔄 Switching to background layer ${layerIndex + 1}`);
        
        // Убираем активный класс у всех слоев
        this.bgLayers.forEach(layer => {
            layer.classList.remove('active');
        });
        
        // Добавляем активный класс новому слою
        this.bgLayers[layerIndex].classList.add('active');
        this.currentLayer = layerIndex;
        
        // Добавляем класс для анимации на body
        document.body.classList.add('bg-transitioning');
        setTimeout(() => {
            document.body.classList.remove('bg-transitioning');
        }, 1200);
    }
    
    applyParallaxToLayers(scrollPosition) {
        if (this.isReducedMotion) return;
        
        this.bgLayers.forEach((layer, index) => {
            const speed = 0.3 + (index * 0.1); // Разная скорость для разных слоев
            const yPos = -(scrollPosition * speed * 0.1);
            
            // Только для активного и предыдущего слоев для производительности
            if (index === this.currentLayer || index === this.currentLayer - 1) {
                layer.style.transform = `translateY(${yPos}px) scale(1.05)`;
            }
        });
    }
    
    setupParallaxEffect() {
        console.log('🌀 Setting up parallax effect');
        
        // Добавляем слушатель скролла для параллакса
        const updateParallax = () => {
            const scrollPosition = window.scrollY || document.documentElement.scrollTop;
            this.applyParallaxToLayers(scrollPosition);
        };
        
        const throttledParallax = this.throttle(updateParallax, 16);
        window.addEventListener('scroll', throttledParallax, { passive: true });
        
        // Инициализация
        updateParallax();
    }
    
    linkSectionsToBackground() {
        const sections = document.querySelectorAll('[data-bg-section]');
        
        if (!sections.length) {
            console.log('⚠️ No sections with data-bg-section attribute found');
            return;
        }
        
        console.log(`🔗 Linking ${sections.length} sections to background`);
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionLayer = parseInt(entry.target.getAttribute('data-bg-section'));
                    if (!isNaN(sectionLayer)) {
                        this.switchToLayer(sectionLayer);
                    }
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
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
        
        // Упрощаем фоновую систему
        if (this.bgLayers) {
            this.bgLayers.forEach(layer => {
                layer.style.transition = 'opacity 0.5s ease';
                layer.style.transform = 'none';
            });
        }
    }
    
    disableNonEssentialAnimations() {
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
        
        // Отключаем параллакс
        if (this.bgLayers) {
            this.bgLayers.forEach(layer => {
                layer.style.transform = 'none';
            });
        }
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
}

// ===== ГЛОБАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ =====
function initializeHomePage() {
    if (!document.body || !document.body.classList.contains('home-page')) {
        console.log('⚠️ Not home page, home.js will not initialize');
        return;
    }
    
    console.log('📄 INITIALIZING HOME PAGE WITH BACKGROUND SYSTEM');
    
    function startHomePage() {
        console.log('🎬 Creating HomePageWithBackground instance...');
        try {
            window.homePage = new HomePageWithBackground();
            console.log('🎉 Home page with background successfully initialized!');
            
            document.body.classList.add('homepage-initialized');
            
            // Добавляем класс для поддержки фоновой системы
            document.body.classList.add('has-background-system');
            
        } catch (error) {
            console.error('❌ Error during HomePageWithBackground initialization:', error);
            
            try {
                // Простейший fallback
                document.querySelectorAll('.stat-number-improved').forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target')) || 0;
                    stat.textContent = target;
                });
                
                // Показываем только первый фон
                const bgLayers = document.querySelectorAll('.bg-layer');
                if (bgLayers.length > 0) {
                    bgLayers[0].classList.add('active');
                }
                
                console.log('🔄 Basic fallback applied');
            } catch (fallbackError) {
                console.error('❌ Fallback also failed:', fallbackError);
            }
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startHomePage);
    } else {
        startHomePage();
    }
}

console.log('🚀 Starting home page with background initialization...');
initializeHomePage();

if (typeof window !== 'undefined') {
    window.HomePageWithBackground = HomePageWithBackground;
}

window.addEventListener('error', function(e) {
    if (e.message && e.message.includes('HomePage') || 
        e.filename && e.filename.includes('home.js')) {
        console.error('🚨 Critical error in home.js:', e);
    }
});

console.log('✅ home.js with background system fully loaded');
