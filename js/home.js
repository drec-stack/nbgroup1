// home.js - Simplified Home Page Functionality

(function() {
    'use strict';
    
    class HomePage {
        constructor() {
            this.isReducedMotion = window.matchMedia ? 
                window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
            
            console.log('🏠 HomePage инициализирован (упрощенная версия)');
            
            this.init();
        }

        init() {
            this.initBasicAnimations();
            this.initStatsCounter();
            this.initParallaxBackgrounds();
            this.initMarqueeAnimations();
            this.initClickableStats();
            this.initCTAClickable();
            this.initSpeckVerticalBlocksModern();
            this.initEnhancedSpeckBlocks();
            this.initSpeckBlocksAnimations();
            
            // Отключаем логику скролла хедера для главной страницы
            this.disableHeaderScrollLogic();
        }

        disableHeaderScrollLogic() {
            console.log('🚫 Отключаем логику скролла хедера на главной странице');
            
            const header = document.querySelector('.main-header');
            if (!header) return;
            
            // Убираем все классы скрытия
            header.classList.remove('header-hidden', 'header-minimized', 'header-scrolled');
            
            // Фиксируем позицию как на странице услуг
            header.style.opacity = '1';
            header.style.transform = 'translateX(-50%) translateY(0)';
            header.style.pointerEvents = 'auto';
            
            // Убираем все сложные transitions
            header.style.transition = 'background-color 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease';
            
            // Мобильная версия
            if (window.innerWidth <= 768) {
                header.style.left = '0';
                header.style.transform = 'none';
                header.style.width = '100%';
                header.style.maxWidth = '100%';
                header.style.borderRadius = '0';
                header.style.top = '0';
                header.style.margin = '0';
            }
            
            // Убираем обработчики событий если они есть
            const originalSetupHeaderScrollLogic = window.setupHeaderScrollLogic;
            if (originalSetupHeaderScrollLogic) {
                window.setupHeaderScrollLogic = function() {
                    console.log('⚠️ Header scroll logic disabled for home page');
                    return;
                };
            }
        }

        // ===== SPECK VERTICAL BLOCKS (Modern) =====
        initSpeckVerticalBlocksModern() {
            console.log('🎨 Инициализация вертикальных блоков...');
            
            const speckBlocks = document.querySelectorAll('.speck-vertical-block');
            
            if (!speckBlocks.length) {
                console.log('⚠️ Вертикальные блоки не найдены');
                return;
            }
            
            // Используем Intersection Observer если поддерживается
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
                // Fallback для старых браузеров
                setTimeout(() => {
                    speckBlocks.forEach((block, index) => {
                        setTimeout(() => {
                            block.classList.add('visible');
                        }, index * 200);
                    });
                }, 500);
            }
            
            this.initFeatureItemsInteractivity();
            console.log('✅ Инициализировано ' + speckBlocks.length + ' вертикальных блоков');
        }

        // ===== ИНТЕРАКТИВНОСТЬ ДЛЯ ЭЛЕМЕНТОВ СПИСКА =====
        initFeatureItemsInteractivity() {
            const featureItems = document.querySelectorAll('.speck-feature-item');
            
            if (!featureItems.length) return;
            
            featureItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    item.classList.add('active');
                    setTimeout(() => {
                        item.classList.remove('active');
                    }, 150);
                    
                    const block = item.closest('.speck-vertical-block');
                    if (block) {
                        const blockIndex = block.getAttribute('data-block-index');
                        const blockTitles = ['strategy', 'design', 'engineering', 'manufacturing'];
                        
                        if (blockTitles[blockIndex]) {
                            setTimeout(() => {
                                window.location.href = 'services.html#' + blockTitles[blockIndex];
                            }, 200);
                        }
                    }
                });
                
                if (!item.hasAttribute('tabindex')) {
                    item.setAttribute('tabindex', '0');
                }
                
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.keyCode === 13) {
                        e.preventDefault();
                        item.click();
                    }
                });
            });
        }

        // ===== ENHANCED SPECK BLOCKS INTERACTIVITY =====
        initEnhancedSpeckBlocks() {
            console.log('🎨 Инициализация улучшенных Speck блоков...');
            
            const featureColumns = document.querySelectorAll('.speck-feature-column');
            
            featureColumns.forEach(column => {
                column.classList.add('clickable-column');
                
                if (!column.hasAttribute('tabindex')) {
                    column.setAttribute('tabindex', '0');
                }
                
                if (!column.hasAttribute('role')) {
                    column.setAttribute('role', 'button');
                }
                
                const columnTitle = column.querySelector('.speck-column-title');
                if (columnTitle && !column.hasAttribute('aria-label')) {
                    const block = column.closest('.speck-vertical-block');
                    const blockTitle = block?.querySelector('.speck-block-title')?.textContent || 'Секция';
                    column.setAttribute('aria-label', 'Перейти к ' + columnTitle.textContent + ' в разделе ' + blockTitle);
                }
                
                column.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    column.classList.add('column-clicked');
                    setTimeout(() => {
                        column.classList.remove('column-clicked');
                    }, 300);
                    
                    const block = column.closest('.speck-vertical-block');
                    const blockIndex = block ? block.getAttribute('data-block-index') : '0';
                    const blockTitles = ['strategy', 'design', 'engineering', 'manufacturing'];
                    const blockTitle = blockTitles[parseInt(blockIndex)] || 'services';
                    
                    console.log('🔗 Навигация: Блок ' + blockIndex + ' (' + blockTitle + ')');
                    
                    setTimeout(() => {
                        window.location.href = 'services.html#' + blockTitle;
                    }, 350);
                });
                
                column.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ' || e.keyCode === 13 || e.keyCode === 32) {
                        e.preventDefault();
                        column.click();
                    }
                });
            });
            
            console.log('✅ Инициализировано ' + featureColumns.length + ' колонок');
        }

        // ===== SPECK BLOCKS ANIMATIONS =====
        initSpeckBlocksAnimations() {
            console.log('✨ Инициализация анимаций Speck блоков...');
            
            setTimeout(() => {
                document.body.classList.add('speck-animations-loaded');
            }, 1000);
            
            const featureItems = document.querySelectorAll('.speck-feature-item');
            featureItems.forEach((item, i) => {
                item.style.setProperty('--item-index', i);
            });
            
            if (window.IntersectionObserver) {
                const columnObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('scroll-animated');
                        }
                    });
                }, {
                    threshold: 0.2,
                    rootMargin: '0px 0px -50px 0px'
                });
                
                const columns = document.querySelectorAll('.speck-feature-column');
                columns.forEach(col => columnObserver.observe(col));
            }
            
            setTimeout(() => {
                const columns = document.querySelectorAll('.speck-feature-column');
                columns.forEach((col, i) => {
                    setTimeout(() => {
                        col.style.animationPlayState = 'running';
                    }, i * 100);
                });
            }, 500);
            
            console.log('✅ Анимации Speck блоков инициализированы');
        }

        // ===== STATS COUNTER =====
        initStatsCounter() {
            const statNumbers = document.querySelectorAll('.stat-number-improved');
            
            if (!statNumbers.length) return;
            
            const hasNoCSS = document.documentElement.classList.contains('no-csstransforms');
            if (hasNoCSS) {
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target')) || 0;
                    stat.textContent = target;
                    stat.classList.add('animated');
                });
                return;
            }
            
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
            
            window.addEventListener('scroll', checkVisibility);
            window.addEventListener('resize', checkVisibility);
            checkVisibility();
        }

        // ===== CLICKABLE STATS CARDS =====
        initClickableStats() {
            const statCards = document.querySelectorAll('.stat-card.clickable-stat-card');
            
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

        // ===== CLICKABLE CTA SECTION =====
        initCTAClickable() {
            const ctaSection = document.querySelector('.cta-improved.clickable-cta');
            if (!ctaSection) return;
            
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

        // ===== БАЗОВЫЕ АНИМАЦИИ =====
        initBasicAnimations() {
            const sections = document.querySelectorAll('.content-section');
            
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
        initParallaxBackgrounds() {
            const contentSections = document.querySelectorAll('.content-section[data-bg-index]');
            
            if (!contentSections.length) return;
            
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

        // ===== MARQUEE ANIMATIONS =====
        initMarqueeAnimations() {
            const marqueeTracks = document.querySelectorAll('.marquee-track');
            
            if (!marqueeTracks.length) return;

            setTimeout(() => {
                let isWorking = false;
                
                for (const track of marqueeTracks) {
                    const style = track.currentStyle || window.getComputedStyle(track);
                    const transform = style.transform || style.webkitTransform || style.mozTransform;
                    
                    if (transform && transform !== 'none' && 
                        transform !== 'matrix(1, 0, 0, 1, 0, 0)' &&
                        transform !== 'matrix(1, 0, 0, 1, 0, 0, 0)') {
                        isWorking = true;
                        break;
                    }
                }
                
                if (!isWorking) {
                    console.log('🎯 Бегущая строка не работает через CSS, запускаем JS fallback...');
                    this.initMarqueeJSFallback();
                } else {
                    console.log('✅ Бегущая строка работает через CSS');
                }
            }, 1000);
        }

        initMarqueeJSFallback() {
            console.log('🚀 Запуск JavaScript fallback для бегущей строки...');
            
            const marqueeTracks = document.querySelectorAll('.marquee-track');
            
            marqueeTracks.forEach((track, index) => {
                const isReverse = index === 1;
                
                track.style.animation = 'none';
                track.style.webkitAnimation = 'none';
                track.style.mozAnimation = 'none';
                track.style.oAnimation = 'none';
                
                let position = 0;
                const speed = isReverse ? 2 : -2;
                const contentWidth = track.scrollWidth / 3;
                let animationId = null;
                let isPaused = false;
                
                const animate = () => {
                    if (isPaused) {
                        animationId = window.requestAnimationFrame ? 
                            requestAnimationFrame(animate) : 
                            setTimeout(animate, 16);
                        return;
                    }
                    
                    position += speed;
                    
                    if (position <= -contentWidth) {
                        position = 0;
                    } else if (position >= 0) {
                        position = -contentWidth;
                    }
                    
                    if ('transform' in track.style || 
                        'webkitTransform' in track.style ||
                        'mozTransform' in track.style) {
                        track.style.transform = 'translateX(' + position + 'px)';
                        track.style.webkitTransform = 'translateX(' + position + 'px)';
                        track.style.mozTransform = 'translateX(' + position + 'px)';
                    } else {
                        track.style.position = 'relative';
                        track.style.left = position + 'px';
                    }
                    
                    animationId = window.requestAnimationFrame ? 
                        requestAnimationFrame(animate) : 
                        setTimeout(animate, 16);
                };
                
                animate();
                
                track.addEventListener('mouseenter', () => {
                    isPaused = true;
                });
                
                track.addEventListener('mouseleave', () => {
                    isPaused = false;
                });
                
                track._animationId = animationId;
                
                console.log('✅ Трек ' + (index + 1) + ' запущен через JS fallback');
            });
        }
    }

    // ===== GLOBAL INITIALIZATION =====
    function initHomePage() {
        if (!document.body || !document.body.classList.contains('home-page')) {
            return;
        }
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                window.homePage = new HomePage();
            });
        } else {
            window.homePage = new HomePage();
        }
    }
    
    // Проверка работы бегущей строки
    function checkMarqueeWorking() {
        setTimeout(() => {
            const tracks = document.querySelectorAll('.marquee-track');
            let isWorking = false;
            
            for (const track of tracks) {
                const style = track.currentStyle || window.getComputedStyle(track);
                const transform = style.transform || style.webkitTransform || style.mozTransform;
                
                if (transform && transform !== 'none' && 
                    transform !== 'matrix(1, 0, 0, 1, 0, 0)' &&
                    transform !== 'matrix(1, 0, 0, 1, 0, 0, 0)') {
                    isWorking = true;
                    break;
                }
            }
            
            if (!isWorking && window.homePage) {
                console.warn('⚠️ Бегущая строка не работает, запускаем fallback...');
                window.homePage.initMarqueeAnimations();
            }
        }, 2000);
    }
    
    // Экспорт функций
    window.initHomePage = initHomePage;
    window.checkMarqueeWorking = checkMarqueeWorking;
    
    // Автоматическая инициализация
    initHomePage();
    
    window.addEventListener('load', checkMarqueeWorking);
    
    // Резервный запуск через 5 секунд
    setTimeout(checkMarqueeWorking, 5000);
    
    console.log('✅ home.js загружен и готов к работе');
})();
