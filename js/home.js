// home.js - Главная страница с поддержкой видеофона
console.log('🏠 HomePage инициализирован (с видеофоном)');

(function() {
    'use strict';
    
    class HomePage {
        constructor() {
            this.isReducedMotion = window.matchMedia ? 
                window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
            
            this.videoBackground = null;
            this.isVideoPlaying = false;
            
            console.log('🏠 HomePage инициализирован');
            
            this.init();
        }

        init() {
            this.initVideoBackground();
            this.initBasicAnimations();
            this.initStatsCounter();
            this.initClickableStats();
            this.initCTAClickable();
            this.initSpeckVerticalBlocksModern();
            this.initEnhancedSpeckBlocks();
            this.initSpeckBlocksAnimations();
            this.initSpeckMarquee();
            
            // Отключаем логику скролла хедера для главной страницы
            this.disableHeaderScrollLogic();
            
            console.log('✅ HomePage инициализирован полностью');
        }

        // ===== ИНИЦИАЛИЗАЦИЯ ВИДЕОФОНА =====
        initVideoBackground() {
            console.log('🎬 Инициализация видеофона...');
            
            const video = document.getElementById('heroVideo');
            if (!video) {
                console.warn('⚠️ Видеофон не найден, используем фолбэк');
                this.showFallbackBackground();
                return;
            }
            
            this.videoBackground = video;
            
            // Проверяем, поддерживает ли браузер автоматическое воспроизведение
            this.setupVideoPlayback(video);
            
            // Проверка загрузки видео
            video.addEventListener('loadeddata', () => {
                console.log('✅ Видеофон загружен успешно');
                this.isVideoPlaying = !video.paused;
            });
            
            video.addEventListener('error', (e) => {
                console.error('❌ Ошибка загрузки видео:', e);
                this.showFallbackBackground();
            });
            
            // Добавляем класс при успешной загрузке
            video.addEventListener('canplaythrough', () => {
                document.body.classList.add('video-loaded');
            });
        }

        setupVideoPlayback(video) {
            // Попытка автоматического воспроизведения
            const playPromise = video.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('✅ Видеофон воспроизводится автоматически');
                    this.isVideoPlaying = true;
                }).catch(error => {
                    console.log('⚠️ Автозапуск видео предотвращен браузером:', error.name);
                    
                    // Показываем кнопку для ручного запуска
                    this.showVideoPlayButton();
                    
                    // Пытаемся запустить при взаимодействии пользователя
                    this.setupUserInteractionVideoStart();
                });
            }
        }

        showVideoPlayButton() {
            // Создаем кнопку для запуска видео
            const playButton = document.createElement('button');
            playButton.className = 'video-play-button';
            playButton.innerHTML = '<i class="fas fa-play"></i> Включить видеофон';
            playButton.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 12px 24px;
                background: rgba(0, 102, 255, 0.9);
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                z-index: 1000;
                font-family: inherit;
                font-weight: 600;
                backdrop-filter: blur(10px);
                display: flex;
                align-items: center;
                gap: 10px;
                transition: all 0.3s ease;
            `;
            
            playButton.addEventListener('click', () => {
                this.videoBackground.play().then(() => {
                    playButton.style.display = 'none';
                    this.isVideoPlaying = true;
                }).catch(e => {
                    console.error('❌ Не удалось запустить видео:', e);
                });
            });
            
            document.body.appendChild(playButton);
            
            // Скрываем кнопку через 10 секунд если видео не нужно
            setTimeout(() => {
                if (playButton.parentNode && this.isVideoPlaying === false) {
                    playButton.style.opacity = '0.5';
                }
            }, 10000);
        }

        setupUserInteractionVideoStart() {
            const startVideoOnInteraction = () => {
                if (this.videoBackground && this.videoBackground.paused) {
                    this.videoBackground.play().then(() => {
                        console.log('✅ Видео запущено после взаимодействия пользователя');
                        this.isVideoPlaying = true;
                        
                        // Удаляем все обработчики
                        document.removeEventListener('click', startVideoOnInteraction);
                        document.removeEventListener('scroll', startVideoOnInteraction);
                        document.removeEventListener('touchstart', startVideoOnInteraction);
                    }).catch(e => {
                        console.error('❌ Не удалось запустить видео:', e);
                    });
                }
            };
            
            // Добавляем обработчики для различных взаимодействий
            document.addEventListener('click', startVideoOnInteraction, { once: true });
            document.addEventListener('scroll', startVideoOnInteraction, { once: true });
            document.addEventListener('touchstart', startVideoOnInteraction, { once: true });
        }

        showFallbackBackground() {
            console.log('🖼️ Используем фолбэк фон');
            document.body.classList.add('no-video');
            
            const videoContainer = document.querySelector('.video-background-container');
            if (videoContainer) {
                videoContainer.style.backgroundImage = 'url(assets/images/parallax/bg-1.jpg)';
                videoContainer.style.backgroundSize = 'cover';
                videoContainer.style.backgroundPosition = 'center';
                videoContainer.style.backgroundColor = '#0a0a0a';
            }
        }

        // ===== SPECK MARQUEE INITIALIZATION =====
        initSpeckMarquee() {
            console.log('🎯 Инициализация Speck бегущей строки...');
            
            const speckMarqueeTrack = document.getElementById('speckMarqueeTrack');
            if (!speckMarqueeTrack) {
                console.warn('❌ Speck marquee track не найден');
                return;
            }

            // Проверяем, работает ли CSS анимация
            setTimeout(() => {
                const style = window.getComputedStyle(speckMarqueeTrack);
                
                // Если анимация не работает (пользователь отключил или браузер не поддерживает)
                if (style.animationName === 'none' || this.isReducedMotion) {
                    console.log('🚀 Запуск JS fallback для Speck бегущей строки');
                    this.runSpeckMarqueeJS(speckMarqueeTrack);
                } else {
                    console.log('✅ Speck бегущая строка работает через CSS');
                    // Добавляем обработчики для паузы при наведении
                    this.addSpeckMarqueeHoverHandlers(speckMarqueeTrack);
                }
            }, 100);

            // Проверка через 2 секунды на всякий случай
            setTimeout(() => {
                const track = document.querySelector('.speck-marquee-track');
                if (track) {
                    const rect = track.getBoundingClientRect();
                    const isMoving = rect.left !== 0; // Простая проверка движения
                    
                    if (!isMoving && !track.classList.contains('js-fallback-active')) {
                        console.log('⚠️ Бегущая строка не двигается, запускаем JS fallback');
                        this.runSpeckMarqueeJS(speckMarqueeTrack);
                    }
                }
            }, 2000);
        }

        // ===== JS FALLBACK FOR SPECK MARQUEE =====
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

            // Добавляем маркер активации JS fallback
            track.classList.add('js-fallback-active');
            
            // Останавливаем CSS анимацию
            track.style.animation = 'none';
            track.style.webkitAnimation = 'none';
            
            // Увеличиваем ширину для плавного перехода
            const originalContent = content.innerHTML;
            content.innerHTML = originalContent + originalContent + originalContent;
            
            let position = 0;
            const speed = -1.2; // Скорость прокрутки
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
                    
                    // Сбрасываем позицию, когда прокрутили 1/3 контента
                    const contentWidth = content.scrollWidth / 3;
                    if (position <= -contentWidth) {
                        position = 0;
                    }
                    
                    // Применяем трансформацию
                    track.style.transform = `translateX(${position}px)`;
                    track.style.webkitTransform = `translateX(${position}px)`;
                    
                    lastTime = currentTime - (deltaTime % interval);
                }
                
                animationId = requestAnimationFrame(animate);
            };

            // Запускаем анимацию
            animationId = requestAnimationFrame(animate);
            
            // Добавляем обработчики для паузы
            this.addSpeckMarqueeHoverHandlers(track, () => isPaused = true, () => isPaused = false);
            
            // Сохраняем ID анимации для очистки
            track._marqueeAnimationId = animationId;
            
            console.log('✅ Speck бегущая строка запущена через JS');
        }

        // ===== HOVER HANDLERS FOR MARQUEE =====
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

            // Обработчики для всей секции
            const section = track.closest('.speck-marquee-section');
            if (section) {
                section.addEventListener('mouseenter', pauseMarquee);
                section.addEventListener('mouseleave', resumeMarquee);
                section.addEventListener('touchstart', pauseMarquee);
                section.addEventListener('touchend', resumeMarquee);
            }

            // Обработчики для самого трека
            track.addEventListener('mouseenter', pauseMarquee);
            track.addEventListener('mouseleave', resumeMarquee);
            track.addEventListener('touchstart', pauseMarquee);
            track.addEventListener('touchend', resumeMarquee);
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
    
    // Экспорт функций
    window.initHomePage = initHomePage;
    
    // Автоматическая инициализация
    initHomePage();
    
    console.log('✅ home.js загружен и готов к работе');
})();
