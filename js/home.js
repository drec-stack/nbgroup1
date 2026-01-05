// home.js - Главная страница с РАБОЧИМ видеофоном

(function() {
    'use strict';
    
    class HomePage {
        constructor() {
            this.isReducedMotion = window.matchMedia ? 
                window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
            
            console.log('🏠 HomePage инициализирован');
            
            this.init();
        }

        init() {
            console.log('🚀 Начинаем инициализацию...');
            
            // ПЕРВЫМ ДЕЛОМ - видеофон
            this.initVideoBackground();
            
            // Затем остальные компоненты
            this.initBasicAnimations();
            this.initStatsCounter();
            this.initParallaxBackgrounds();
            this.initClickableStats();
            this.initCTAClickable();
            this.initSpeckVerticalBlocksModern();
            this.initEnhancedSpeckBlocks();
            this.initSpeckBlocksAnimations();
            this.initSpeckMarquee();
            
            // Отключаем логику скролла хедера
            this.disableHeaderScrollLogic();
            
            console.log('✅ Все компоненты инициализированы');
        }

        // ===== VIDEO BACKGROUND (ГЛАВНЫЙ ФИКС) =====
        initVideoBackground() {
            console.log('🎬 Инициализация видеофона...');
            
            const video = document.querySelector('.video-bg');
            const playButton = document.querySelector('.video-play-button');
            
            if (!video) {
                console.error('❌ Видео не найдено в DOM');
                this.showVideoFallback();
                return;
            }
            
            console.log('✅ Видео найдено:', video);
            
            // Проверяем, поддерживает ли браузер видео
            const canPlayMP4 = video.canPlayType && video.canPlayType('video/mp4');
            if (!canPlayMP4) {
                console.warn('⚠️ Браузер не поддерживает MP4 видео');
                this.showVideoFallback();
                return;
            }
            
            // Если пользователь предпочитает уменьшенную анимацию
            if (this.isReducedMotion) {
                console.log('⚠️ Пользователь предпочитает reduced motion');
                this.showVideoFallback();
                return;
            }
            
            // Устанавливаем атрибуты для корректной работы
            this.setupVideoAttributes(video);
            
            // Настраиваем обработчики событий
            this.setupVideoEventHandlers(video, playButton);
            
            // Пытаемся запустить видео
            this.startVideoPlayback(video, playButton);
            
            // Проверяем видео через 3 секунды
            setTimeout(() => {
                this.checkVideoStatus(video, playButton);
            }, 3000);
            
            console.log('✅ Видеофон настроен');
        }
        
        setupVideoAttributes(video) {
            // Критические атрибуты для работы видео
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            video.setAttribute('muted', '');
            video.setAttribute('loop', '');
            video.setAttribute('preload', 'auto');
            
            // Для мобильных устройств
            if (this.isMobileDevice()) {
                video.setAttribute('autoplay', '');
                video.setAttribute('poster', 'assets/images/parallax/bg-1.jpg');
            }
            
            // Принудительно показываем видео
            video.style.display = 'block';
            video.style.visibility = 'visible';
            video.style.opacity = '1';
            video.style.zIndex = '1';
        }
        
        setupVideoEventHandlers(video, playButton) {
            // Событие когда видео загружено
            video.addEventListener('loadeddata', () => {
                console.log('📹 Видео загружено');
                video.classList.add('loaded');
            });
            
            // Событие когда видео начинает воспроизводиться
            video.addEventListener('playing', () => {
                console.log('▶️ Видео воспроизводится');
                if (playButton) {
                    playButton.style.display = 'none';
                }
                // Принудительно показываем видео
                video.style.opacity = '1';
            });
            
            // Событие ошибки
            video.addEventListener('error', (e) => {
                console.error('❌ Ошибка видео:', e);
                console.error('Код ошибки:', video.error ? video.error.code : 'unknown');
                
                // Показываем фолбэк
                this.showVideoFallback();
                
                // Скрываем кнопку воспроизведения
                if (playButton) {
                    playButton.style.display = 'none';
                }
            });
            
            // Событие когда видео приостановлено
            video.addEventListener('pause', () => {
                console.log('⏸️ Видео приостановлено');
            });
            
            // Событие когда видео завершило загрузку
            video.addEventListener('canplaythrough', () => {
                console.log('✅ Видео полностью загружено');
            });
            
            // Обработчик для кнопки воспроизведения
            if (playButton) {
                playButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('🖱️ Нажата кнопка воспроизведения');
                    
                    video.play()
                        .then(() => {
                            console.log('✅ Видео запущено по клику');
                            playButton.style.display = 'none';
                        })
                        .catch(error => {
                            console.error('❌ Не удалось запустить видео:', error);
                            this.showVideoFallback();
                        });
                });
            }
        }
        
        startVideoPlayback(video, playButton) {
            console.log('🚀 Пытаемся запустить видео...');
            
            // Пытаемся запустить воспроизведение
            const playPromise = video.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log('✅ Видео успешно запущено автоматически');
                        if (playButton) {
                            playButton.style.display = 'none';
                        }
                    })
                    .catch(error => {
                        console.log('⚠️ Автоплей заблокирован:', error.name);
                        
                        // Показываем кнопку воспроизведения
                        if (playButton) {
                            playButton.style.display = 'flex';
                            playButton.classList.add('show');
                            
                            // На мобильных пытаемся запустить после жеста пользователя
                            if (this.isMobileDevice()) {
                                this.enableMobileVideoInteraction(video, playButton);
                            }
                        }
                    });
            }
        }
        
        checkVideoStatus(video, playButton) {
            if (video.paused) {
                console.log('⏸️ Видео все еще приостановлено');
                
                // Показываем кнопку воспроизведения
                if (playButton) {
                    playButton.style.display = 'flex';
                    playButton.classList.add('show');
                }
                
                // Проверяем, есть ли ошибка
                if (video.error) {
                    console.error('❌ Ошибка видео:', video.error);
                    this.showVideoFallback();
                }
            } else {
                console.log('✅ Видео воспроизводится нормально');
            }
        }
        
        enableMobileVideoInteraction(video, playButton) {
            const handleUserInteraction = () => {
                console.log('📱 Пользователь взаимодействовал со страницей');
                
                video.play()
                    .then(() => {
                        console.log('✅ Видео запущено после взаимодействия');
                        if (playButton) {
                            playButton.style.display = 'none';
                        }
                    })
                    .catch(e => {
                        console.log('❌ Не удалось запустить видео:', e);
                    });
                
                // Удаляем обработчики
                document.removeEventListener('touchstart', handleUserInteraction);
                document.removeEventListener('click', handleUserInteraction);
            };
            
            // Добавляем обработчики
            document.addEventListener('touchstart', handleUserInteraction, { once: true });
            document.addEventListener('click', handleUserInteraction, { once: true });
        }
        
        showVideoFallback() {
            console.log('🖼️ Показываем фолбэк изображение');
            
            const video = document.querySelector('.video-bg');
            const videoContainer = document.querySelector('.video-bg-container');
            const playButton = document.querySelector('.video-play-button');
            
            // Скрываем видео
            if (video) {
                video.style.display = 'none';
            }
            
            // Скрываем кнопку
            if (playButton) {
                playButton.style.display = 'none';
            }
            
            // Устанавливаем фоновое изображение
            if (videoContainer) {
                videoContainer.style.backgroundImage = 'url(assets/images/parallax/bg-1.jpg)';
                videoContainer.style.backgroundSize = 'cover';
                videoContainer.style.backgroundPosition = 'center';
                videoContainer.style.backgroundColor = '#0a0a0a';
            }
            
            // Добавляем класс для CSS
            document.body.classList.add('no-video');
        }
        
        isMobileDevice() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }

        // ===== SPECK MARQUEE INITIALIZATION =====
        initSpeckMarquee() {
            console.log('🎯 Инициализация Speck бегущей строки...');
            
            const speckMarqueeTrack = document.getElementById('speckMarqueeTrack');
            if (!speckMarqueeTrack) {
                console.warn('❌ Speck marquee track не найден');
                return;
            }

            setTimeout(() => {
                const style = window.getComputedStyle(speckMarqueeTrack);
                
                if (style.animationName === 'none' || this.isReducedMotion) {
                    console.log('🚀 Запуск JS fallback');
                    this.runSpeckMarqueeJS(speckMarqueeTrack);
                } else {
                    console.log('✅ Бегущая строка работает через CSS');
                    this.addSpeckMarqueeHoverHandlers(speckMarqueeTrack);
                }
            }, 100);

            setTimeout(() => {
                const track = document.querySelector('.speck-marquee-track');
                if (track) {
                    const rect = track.getBoundingClientRect();
                    const isMoving = rect.left !== 0;
                    
                    if (!isMoving && !track.classList.contains('js-fallback-active')) {
                        console.log('⚠️ Бегущая строка не двигается');
                        this.runSpeckMarqueeJS(speckMarqueeTrack);
                    }
                }
            }, 2000);
        }

        runSpeckMarqueeJS(track) {
            if (track.classList.contains('js-fallback-active')) return;

            const content = track.querySelector('.speck-marquee-content');
            if (!content) return;

            console.log('🔄 Запуск JS бегущей строки');

            track.classList.add('js-fallback-active');
            track.style.animation = 'none';
            
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
            
            console.log('✅ JS бегущая строка запущена');
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

        disableHeaderScrollLogic() {
            console.log('🚫 Отключаем логику скролла хедера');
            
            const header = document.querySelector('.main-header');
            if (!header) return;
            
            header.classList.remove('header-hidden', 'header-minimized', 'header-scrolled');
            
            header.style.opacity = '1';
            header.style.transform = 'translateX(-50%) translateY(0)';
            header.style.pointerEvents = 'auto';
            header.style.transition = 'background-color 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease';
            
            if (window.innerWidth <= 768) {
                header.style.left = '0';
                header.style.transform = 'none';
                header.style.width = '100%';
                header.style.maxWidth = '100%';
                header.style.borderRadius = '0';
                header.style.top = '0';
                header.style.margin = '0';
            }
        }

        // ===== SPECK VERTICAL BLOCKS =====
        initSpeckVerticalBlocksModern() {
            console.log('🎨 Инициализация вертикальных блоков...');
            
            const speckBlocks = document.querySelectorAll('.speck-vertical-block');
            
            if (!speckBlocks.length) {
                console.log('⚠️ Вертикальные блоки не найдены');
                return;
            }
            
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
            
            this.initFeatureItemsInteractivity();
            console.log('✅ Инициализировано ' + speckBlocks.length + ' блоков');
        }

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
            
            console.log('✅ Анимации инициализированы');
        }

        initStatsCounter() {
            const statNumbers = document.querySelectorAll('.stat-number-improved');
            
            if (!statNumbers.length) return;
            
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
    }

    // ===== GLOBAL INITIALIZATION =====
    function initHomePage() {
        if (!document.body || !document.body.classList.contains('home-page')) {
            return;
        }
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                console.log('📄 DOM загружен, инициализируем HomePage');
                window.homePage = new HomePage();
            });
        } else {
            console.log('📄 DOM уже загружен, инициализируем HomePage');
            window.homePage = new HomePage();
        }
    }
    
    // Автоматическая инициализация
    initHomePage();
    
    // Отладка
    window.debugVideo = function() {
        const video = document.querySelector('.video-bg');
        if (!video) {
            console.error('❌ Видео не найдено');
            return;
        }
        
        console.log('🔍 Отладка видео:');
        console.log('- display:', video.style.display);
        console.log('- visibility:', video.style.visibility);
        console.log('- opacity:', video.style.opacity);
        console.log('- zIndex:', video.style.zIndex);
        console.log('- currentSrc:', video.currentSrc);
        console.log('- error:', video.error);
        console.log('- paused:', video.paused);
        console.log('- readyState:', video.readyState);
        
        // Добавляем класс для визуальной отладки
        document.body.classList.add('debug-video');
    };
    
    console.log('✅ home.js загружен');
})();
