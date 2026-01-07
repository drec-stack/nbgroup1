// home.js - БАЗОВАЯ ВЕРСИЯ БЕЗ ПАРАЛЛАКС-СИСТЕМЫ

console.log('🏠 home.js loaded - BASIC VERSION WITHOUT BACKGROUND SYSTEM');

// ===== БАЗОВЫЙ КЛАСС ДЛЯ ГЛАВНОЙ СТРАНИЦЫ =====
class BasicHomePage {
    constructor() {
        this.isReducedMotion = window.matchMedia ? 
            window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
        
        console.log('🏠 BasicHomePage initialized');
        
        // Инициализация всех компонентов
        this.initializeComponents();
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
}

// ===== ГЛОБАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ =====
function initializeHomePage() {
    if (!document.body || !document.body.classList.contains('home-page')) {
        console.log('⚠️ Not home page, home.js will not initialize');
        return;
    }
    
    console.log('📄 INITIALIZING HOME PAGE');
    
    function startHomePage() {
        console.log('🎬 Creating BasicHomePage instance...');
        try {
            window.homePage = new BasicHomePage();
            console.log('🎉 Home page successfully initialized!');
            
            document.body.classList.add('homepage-initialized');
            
        } catch (error) {
            console.error('❌ Error during HomePage initialization:', error);
            
            try {
                // Простейший fallback
                document.querySelectorAll('.stat-number-improved').forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target')) || 0;
                    stat.textContent = target;
                });
                
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

console.log('🚀 Starting home page initialization...');
initializeHomePage();

if (typeof window !== 'undefined') {
    window.HomePage = BasicHomePage;
}

window.addEventListener('error', function(e) {
    if (e.message && e.message.includes('HomePage') || 
        e.filename && e.filename.includes('home.js')) {
        console.error('🚨 Critical error in home.js:', e);
    }
});

console.log('✅ home.js fully loaded');
