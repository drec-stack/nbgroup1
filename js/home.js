// home.js - ПОЛНЫЙ ФАЙЛ С РАБОЧИМ ВИДЕОФОНОМ
console.log('🎬 home.js загружен - ГАРАНТИРОВАННО РАБОЧИЙ ВИДЕОФОН');

(function() {
    'use strict';
    
    class HomePage {
        constructor() {
            this.isReducedMotion = window.matchMedia ? 
                window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
            
            console.log('🏠 HomePage инициализирован');
            
            // СНАЧАЛА видео - САМОЕ ВАЖНОЕ
            this.initVideoBackground();
            
            // Потом остальное
            this.init();
        }

        // ===== ВИДЕОФОН (ГЛАВНОЕ) =====
        initVideoBackground() {
            console.log('🎬 ИНИЦИАЛИЗАЦИЯ ВИДЕОФОНА...');
            
            // 1. НАЙДЕМ ВИДЕО В ДОМ
            this.video = document.querySelector('.video-bg');
            this.videoContainer = document.querySelector('.video-bg-container');
            
            if (!this.video) {
                console.error('❌ ОШИБКА: Видео .video-bg не найдено в DOM!');
                console.log('🔍 Ищем все video элементы:', document.querySelectorAll('video'));
                
                // Попробуем найти любое видео
                const allVideos = document.querySelectorAll('video');
                if (allVideos.length > 0) {
                    this.video = allVideos[0];
                    this.video.classList.add('video-bg');
                    console.log('✅ Нашли видео, добавили класс:', this.video);
                } else {
                    this.showVideoFallback();
                    return;
                }
            }
            
            if (!this.videoContainer) {
                console.warn('⚠️ Контейнер .video-bg-container не найден');
                this.videoContainer = this.video.parentElement;
                if (this.videoContainer) {
                    this.videoContainer.classList.add('video-bg-container');
                    console.log('✅ Используем родительский контейнер:', this.videoContainer);
                }
            }
            
            console.log('✅ Видео найдено:', this.video);
            console.log('✅ Контейнер:', this.videoContainer);
            console.log('✅ Источник:', this.video.querySelector('source')?.src || this.video.src);
            
            // 2. УСТАНОВИМ КРИТИЧЕСКИЕ АТРИБУТЫ
            this.setupVideoAttributes();
            
            // 3. ПРИНУДИТЕЛЬНО ПОКАЖЕМ ВИДЕО
            this.forceShowVideo();
            
            // 4. НАСТРОИМ ОБРАБОТЧИКИ
            this.setupVideoEventHandlers();
            
            // 5. ЗАПУСТИМ ВИДЕО
            this.startVideoPlayback();
            
            console.log('✅ Видеофон инициализирован');
        }
        
        setupVideoAttributes() {
            console.log('⚙️ Устанавливаем атрибуты видео...');
            
            // КРИТИЧЕСКИ ВАЖНЫЕ АТРИБУТЫ
            this.video.setAttribute('playsinline', '');
            this.video.setAttribute('webkit-playsinline', '');
            this.video.setAttribute('muted', '');
            this.video.setAttribute('loop', '');
            this.video.setAttribute('autoplay', '');
            this.video.setAttribute('preload', 'auto');
            
            // Убедимся что есть источник
            if (!this.video.querySelector('source') && !this.video.src) {
                console.log('➕ Добавляем source элемент...');
                const source = document.createElement('source');
                source.src = 'assets/videos/hero-bg.mp4';
                source.type = 'video/mp4';
                this.video.appendChild(source);
            }
            
            // СТИЛИ ДЛЯ ГАРАНТИИ
            this.video.style.cssText = `
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                object-fit: cover !important;
                object-position: center !important;
                z-index: -1 !important;
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                filter: brightness(0.7) !important;
                pointer-events: none !important;
            `;
        }
        
        forceShowVideo() {
            console.log('👁️ Принудительно показываем видео...');
            
            // Гарантируем что контейнер правильно стилизован
            if (this.videoContainer) {
                this.videoContainer.style.cssText = `
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    width: 100vw !important;
                    height: 100vh !important;
                    z-index: -1 !important;
                    overflow: hidden !important;
                    pointer-events: none !important;
                `;
            }
            
            // Добавим оверлей для читаемости текста
            let overlay = document.querySelector('.video-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'video-overlay';
                overlay.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        to bottom,
                        rgba(10, 10, 10, 0.3) 0%,
                        rgba(10, 10, 10, 0.5) 100%
                    );
                    z-index: 0;
                `;
                
                if (this.videoContainer) {
                    this.videoContainer.appendChild(overlay);
                } else {
                    this.video.parentNode.insertBefore(overlay, this.video);
                }
            }
            
            // Принудительно загрузим видео
            this.video.load();
        }
        
        setupVideoEventHandlers() {
            console.log('🎮 Настраиваем обработчики видео...');
            
            // Когда видео загружено
            this.video.addEventListener('loadeddata', () => {
                console.log('📹 Видео загружено, размер:', 
                    this.video.videoWidth + 'x' + this.video.videoHeight);
                this.video.classList.add('loaded');
            });
            
            // Когда видео играет
            this.video.addEventListener('playing', () => {
                console.log('▶️ Видео воспроизводится');
                this.hidePlayButton();
            });
            
            // Ошибка видео
            this.video.addEventListener('error', (e) => {
                console.error('❌ ОШИБКА ВИДЕО:');
                console.error('- Код:', this.video.error?.code);
                console.error('- Сообщение:', this.video.error?.message);
                console.error('- Событие:', e);
                
                this.showVideoFallback();
            });
            
            // Когда видео может играть без остановок
            this.video.addEventListener('canplaythrough', () => {
                console.log('✅ Видео готово к бесперебойному воспроизведению');
            });
        }
        
        startVideoPlayback() {
            console.log('🚀 Запускаем воспроизведение видео...');
            
            // Попробуем запустить сразу
            const playPromise = this.video.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log('✅ Видео успешно запущено автоматически');
                        this.video.style.opacity = '1';
                    })
                    .catch(error => {
                        console.log('⚠️ Автоплей заблокирован:', error.name);
                        
                        // Покажем кнопку воспроизведения
                        this.showPlayButton();
                        
                        // На мобильных ждем взаимодействия
                        if (this.isMobileDevice()) {
                            this.enableMobileInteraction();
                        }
                    });
            }
            
            // Проверим через 3 секунды
            setTimeout(() => {
                if (this.video.paused) {
                    console.log('⏸️ Видео все еще приостановлено через 3 секунды');
                    this.showPlayButton();
                }
            }, 3000);
        }
        
        showPlayButton() {
            let playButton = document.querySelector('.video-play-button');
            
            if (!playButton) {
                console.log('➕ Создаем кнопку воспроизведения...');
                playButton = document.createElement('button');
                playButton.className = 'video-play-button';
                playButton.innerHTML = '<i class="fas fa-play"></i>';
                playButton.setAttribute('aria-label', 'Воспроизвести видеофон');
                playButton.setAttribute('title', 'Нажмите для воспроизведения видео');
                
                playButton.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 70px;
                    height: 70px;
                    background: rgba(0, 102, 255, 0.85);
                    border-radius: 50%;
                    border: none;
                    color: white;
                    font-size: 28px;
                    cursor: pointer;
                    z-index: 100;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                    backdrop-filter: blur(10px);
                `;
                
                playButton.addEventListener('mouseenter', () => {
                    playButton.style.transform = 'translate(-50%, -50%) scale(1.1)';
                    playButton.style.background = 'rgba(0, 102, 255, 1)';
                });
                
                playButton.addEventListener('mouseleave', () => {
                    playButton.style.transform = 'translate(-50%, -50%) scale(1)';
                    playButton.style.background = 'rgba(0, 102, 255, 0.85)';
                });
                
                playButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('🖱️ Клик по кнопке воспроизведения');
                    
                    this.video.play()
                        .then(() => {
                            console.log('✅ Видео запущено по клику');
                            playButton.style.opacity = '0';
                            setTimeout(() => {
                                playButton.style.display = 'none';
                            }, 300);
                        })
                        .catch(error => {
                            console.error('❌ Не удалось запустить видео:', error);
                            this.showVideoFallback();
                        });
                });
                
                // Добавляем в контейнер или body
                if (this.videoContainer) {
                    this.videoContainer.appendChild(playButton);
                } else {
                    document.body.appendChild(playButton);
                }
            }
            
            playButton.style.display = 'flex';
            playButton.style.opacity = '1';
            
            // Анимация пульсации
            playButton.style.animation = 'pulse 2s infinite';
        }
        
        hidePlayButton() {
            const playButton = document.querySelector('.video-play-button');
            if (playButton) {
                playButton.style.opacity = '0';
                setTimeout(() => {
                    playButton.style.display = 'none';
                }, 300);
            }
        }
        
        enableMobileInteraction() {
            const handleInteraction = () => {
                console.log('📱 Пользователь взаимодействовал со страницей');
                
                this.video.play()
                    .then(() => {
                        console.log('✅ Видео запущено после взаимодействия');
                        this.hidePlayButton();
                    })
                    .catch(e => {
                        console.log('❌ Не удалось запустить видео:', e);
                    });
                
                // Удаляем обработчики после первого взаимодействия
                document.removeEventListener('touchstart', handleInteraction);
                document.removeEventListener('click', handleInteraction);
            };
            
            document.addEventListener('touchstart', handleInteraction, { once: true });
            document.addEventListener('click', handleInteraction, { once: true });
        }
        
        showVideoFallback() {
            console.log('🖼️ Активируем фолбэк (статичное изображение)');
            
            // Скрываем видео
            this.video.style.display = 'none';
            
            // Устанавливаем фоновое изображение
            if (this.videoContainer) {
                this.videoContainer.style.backgroundImage = 'url("assets/images/parallax/bg-1.jpg")';
                this.videoContainer.style.backgroundSize = 'cover';
                this.videoContainer.style.backgroundPosition = 'center';
                this.videoContainer.style.backgroundColor = '#0a0a0a';
            }
            
            // Скрываем кнопку воспроизведения
            this.hidePlayButton();
            
            // Активируем параллакс-фон как фолбэк
            const parallaxBg = document.getElementById('parallax-bg-1');
            if (parallaxBg) {
                parallaxBg.classList.add('active');
                parallaxBg.style.opacity = '1';
            }
        }
        
        isMobileDevice() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }

        // ===== ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ =====
        init() {
            console.log('🚀 Инициализация остальных компонентов...');
            
            this.initBasicAnimations();
            this.initStatsCounter();
            this.initParallaxBackgrounds();
            this.initClickableStats();
            this.initCTAClickable();
            this.initSpeckVerticalBlocksModern();
            this.initEnhancedSpeckBlocks();
            this.initSpeckBlocksAnimations();
            this.initSpeckMarquee();
            
            console.log('✅ Все компоненты инициализированы');
            
            // Добавляем глобальную функцию для отладки
            this.addDebugFunction();
        }
        
        addDebugFunction() {
            window.debugVideo = () => {
                console.log('🔍 === ОТЛАДКА ВИДЕОФОНА ===');
                
                const video = document.querySelector('.video-bg');
                if (!video) {
                    console.error('❌ Видео не найдено в DOM');
                    console.log('🔍 Ищем все видео элементы:', document.querySelectorAll('video'));
                    return;
                }
                
                console.log('📋 ИНФОРМАЦИЯ О ВИДЕО:');
                console.log('- Элемент:', video);
                console.log('- Тег:', video.tagName);
                console.log('- Классы:', video.className);
                console.log('- ID:', video.id);
                
                console.log('🎨 СТИЛИ:');
                const styles = window.getComputedStyle(video);
                console.log('- display:', styles.display);
                console.log('- visibility:', styles.visibility);
                console.log('- opacity:', styles.opacity);
                console.log('- position:', styles.position);
                console.log('- zIndex:', styles.zIndex);
                console.log('- width:', styles.width);
                console.log('- height:', styles.height);
                
                console.log('📹 СВОЙСТВА ВИДЕО:');
                console.log('- currentSrc:', video.currentSrc);
                console.log('- src:', video.src);
                console.log('- readyState:', video.readyState);
                console.log('- error:', video.error);
                console.log('- error код:', video.error?.code);
                console.log('- error сообщение:', video.error?.message);
                console.log('- paused:', video.paused);
                console.log('- muted:', video.muted);
                console.log('- loop:', video.loop);
                console.log('- autoplay:', video.autoplay);
                console.log('- videoWidth:', video.videoWidth);
                console.log('- videoHeight:', video.videoHeight);
                
                console.log('🔗 ИСТОЧНИКИ:');
                const sources = video.querySelectorAll('source');
                sources.forEach((source, i) => {
                    console.log(`  Source ${i + 1}:`, {
                        src: source.src,
                        type: source.type
                    });
                });
                
                console.log('👁️ ВИДИМОСТЬ:');
                const rect = video.getBoundingClientRect();
                console.log('- Bounding rect:', rect);
                console.log('- Видимый:', rect.width > 0 && rect.height > 0);
                
                console.log('🔄 Пробуем запустить видео...');
                video.play()
                    .then(() => console.log('✅ Видео успешно запущено'))
                    .catch(e => console.log('❌ Ошибка запуска:', e.message));
            };
            
            console.log('🐛 debugVideo() доступна в консоли браузера');
        }

        // ===== SPECK MARQUEE =====
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
                    console.log('🚀 Запуск JS fallback для Speck бегущей строки');
                    this.runSpeckMarqueeJS(speckMarqueeTrack);
                } else {
                    console.log('✅ Speck бегущая строка работает через CSS');
                    this.addSpeckMarqueeHoverHandlers(speckMarqueeTrack);
                }
            }, 100);

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
            
            console.log('✅ Инициализировано ' + speckBlocks.length + ' вертикальных блоков');
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
    }

    // ===== ГЛОБАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ =====
    function initHomePage() {
        if (!document.body || !document.body.classList.contains('home-page')) {
            return;
        }
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                console.log('📄 DOM загружен, создаем HomePage');
                window.homePage = new HomePage();
            });
        } else {
            console.log('📄 DOM уже загружен, создаем HomePage');
            window.homePage = new HomePage();
        }
    }
    
    // Автоматическая инициализация
    initHomePage();
    
    console.log('✅ home.js полностью загружен и готов к работе');
    
    // Глобальная функция отладки
    window.debugVideo = function() {
        console.log('🔍 === ОТЛАДКА ВИДЕО (глобальная функция) ===');
        
        const video = document.querySelector('.video-bg');
        if (!video) {
            console.error('❌ Видео .video-bg не найдено!');
            return;
        }
        
        console.log('🎬 Видео элемент:', video);
        console.log('📁 Текущий источник:', video.currentSrc || video.src);
        console.log('⚠️ Ошибка:', video.error);
        console.log('⏸️ Приостановлено:', video.paused);
        
        // Пробуем запустить
        video.play().then(() => {
            console.log('✅ Видео запущено успешно');
        }).catch(e => {
            console.log('❌ Ошибка запуска:', e.message);
        });
    };
    
})();
