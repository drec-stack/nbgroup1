// home.js - ПОЛНАЯ ВЕРСИЯ ДЛЯ ГЛАВНОЙ СТРАНИЦЫ NB GROUP TECH
// Версия: 4.0.0 | РАБОЧИЙ ВИДЕОФОН

console.log('🎬 home.js загружен - РАБОЧАЯ ВЕРСИЯ 4.0');

(function() {
    'use strict';
    
    class HomePage {
        constructor() {
            this.isReducedMotion = window.matchMedia ? 
                window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
            
            console.log('🏠 HomePage инициализирован');
            console.log('📱 Пользовательский агент:', navigator.userAgent);
            
            // КРИТИЧЕСКИ ВАЖНО: сначала инициализируем видео
            this.initializeVideoBackground();
            
            // Затем остальные компоненты
            this.initialize();
        }

        // ===== ВИДЕОФОН - ПОЛНАЯ РЕАЛИЗАЦИЯ =====
        initializeVideoBackground() {
            console.log('🎬 НАЧАЛО ИНИЦИАЛИЗАЦИИ ВИДЕОФОНА');
            
            this.video = document.getElementById('video-background');
            this.videoContainer = document.getElementById('video-background-container');
            this.playButton = document.getElementById('video-play-button');
            this.muteButton = document.getElementById('video-mute-button');
            
            // Проверяем существование элементов
            if (!this.video) {
                console.error('❌ КРИТИЧЕСКАЯ ОШИБКА: Видео элемент не найден в DOM!');
                console.error('Проверьте ID элемента в HTML');
                this.activateVideoFallback();
                return;
            }
            
            console.log('✅ Видео элемент найден:', this.video);
            console.log('✅ Источник видео:', this.video.querySelector('source')?.src || this.video.src);
            
            // Шаг 1: Установка критически важных атрибутов
            this.setupVideoAttributes();
            
            // Шаг 2: Гарантия видимости видео
            this.ensureVideoVisibility();
            
            // Шаг 3: Настройка обработчиков событий
            this.setupVideoEventHandlers();
            
            // Шаг 4: Настройка элементов управления
            this.setupVideoControls();
            
            // Шаг 5: Запуск воспроизведения
            this.startVideoPlayback();
            
            console.log('✅ Видеофон инициализирован');
        }
        
        setupVideoAttributes() {
            // Критически важные атрибуты для всех браузеров
            this.video.setAttribute('playsinline', '');
            this.video.setAttribute('webkit-playsinline', '');
            this.video.setAttribute('muted', '');
            this.video.setAttribute('loop', '');
            this.video.setAttribute('autoplay', '');
            this.video.setAttribute('preload', 'auto');
            
            // Устанавливаем muted для гарантии автозапуска
            this.video.muted = true;
            this.video.loop = true;
            
            console.log('✅ Атрибуты видео установлены');
            console.log('- muted:', this.video.muted);
            console.log('- loop:', this.video.loop);
            console.log('- autoplay:', this.video.autoplay);
            console.log('- playsinline:', this.video.hasAttribute('playsinline'));
        }
        
        ensureVideoVisibility() {
            // Принудительно устанавливаем видимость видео
            this.video.style.display = 'block';
            this.video.style.visibility = 'visible';
            this.video.style.opacity = '1';
            this.video.style.position = 'fixed';
            this.video.style.top = '0';
            this.video.style.left = '0';
            this.video.style.width = '100%';
            this.video.style.height = '100%';
            this.video.style.zIndex = '-100';
            this.video.style.objectFit = 'cover';
            this.video.style.pointerEvents = 'none';
            this.video.style.userSelect = 'none';
            
            // Принудительно устанавливаем видимость контейнера
            if (this.videoContainer) {
                this.videoContainer.style.display = 'block';
                this.videoContainer.style.visibility = 'visible';
                this.videoContainer.style.opacity = '1';
            }
            
            // Принудительно загружаем видео
            this.video.load();
            
            console.log('✅ Видимость видео гарантирована');
        }
        
        setupVideoEventHandlers() {
            // Событие: видео загружено
            this.video.addEventListener('loadeddata', () => {
                console.log('📹 Видео загружено');
                console.log('- Размер:', this.video.videoWidth + 'x' + this.video.videoHeight);
                console.log('- Длительность:', this.video.duration + ' секунд');
                console.log('- Буферизировано:', this.video.buffered.length > 0);
                
                // Добавляем класс для стилизации
                this.video.classList.add('video-loaded');
            });
            
            // Событие: видео может начать воспроизведение
            this.video.addEventListener('canplay', () => {
                console.log('🎵 Видео готово к воспроизведению');
            });
            
            // Событие: видео воспроизводится
            this.video.addEventListener('playing', () => {
                console.log('▶️ Видео воспроизводится');
                this.hideVideoControls();
            });
            
            // Событие: видео приостановлено
            this.video.addEventListener('pause', () => {
                console.log('⏸️ Видео приостановлено');
                
                // Для мобильных устройств показываем кнопку воспроизведения
                if (this.isMobileDevice() && !this.video.ended) {
                    console.log('📱 Показываем кнопку воспроизведения для мобильных');
                    this.showVideoPlayButton();
                }
            });
            
            // Событие: видео закончило воспроизведение
            this.video.addEventListener('ended', () => {
                console.log('⏹️ Видео закончило воспроизведение');
                // Перезапускаем видео (зациклено)
                this.video.currentTime = 0;
                this.video.play().catch(e => console.log('Автоповтор:', e.name));
            });
            
            // Событие: ошибка видео
            this.video.addEventListener('error', (e) => {
                console.error('❌ ОШИБКА ВИДЕО:');
                console.error('- Код ошибки:', this.video.error?.code);
                console.error('- Сообщение:', this.video.error?.message);
                console.error('- Событие:', e);
                
                this.activateVideoFallback();
            });
            
            // Событие: изменение готовности видео
            this.video.addEventListener('readystatechange', () => {
                console.log('🔄 Готовность видео изменилась:', this.video.readyState);
            });
            
            console.log('✅ Обработчики событий видео установлены');
        }
        
        setupVideoControls() {
            // Кнопка воспроизведения/паузы
            if (this.playButton) {
                this.playButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log('🖱️ Клик по кнопке воспроизведения');
                    
                    if (this.video.paused || this.video.ended) {
                        this.video.play()
                            .then(() => {
                                console.log('✅ Видео запущено по клику');
                                this.hideVideoControls();
                            })
                            .catch(error => {
                                console.error('❌ Не удалось запустить видео:', error);
                                this.showVideoPlayButton();
                            });
                    } else {
                        this.video.pause();
                        this.playButton.innerHTML = '<i class="fas fa-play"></i>';
                        console.log('⏸️ Видео приостановлено по клику');
                    }
                });
            }
            
            // Кнопка звука
            if (this.muteButton) {
                this.muteButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    this.video.muted = !this.video.muted;
                    this.muteButton.innerHTML = this.video.muted ? 
                        '<i class="fas fa-volume-mute"></i>' : 
                        '<i class="fas fa-volume-up"></i>';
                    
                    console.log(this.video.muted ? '🔇 Звук выключен' : '🔊 Звук включен');
                });
            }
            
            console.log('✅ Элементы управления видео настроены');
        }
        
        startVideoPlayback() {
            console.log('🚀 ЗАПУСК ВОСПРОИЗВЕДЕНИЯ ВИДЕО...');
            
            // Даем время DOM полностью загрузиться
            setTimeout(() => {
                try {
                    console.log('🔄 Попытка автоматического запуска...');
                    const playPromise = this.video.play();
                    
                    if (playPromise !== undefined) {
                        playPromise
                            .then(() => {
                                console.log('✅ Автозапуск видео успешен');
                                this.video.style.opacity = '1';
                                this.hideVideoControls();
                                
                                // Гарантируем видимость
                                this.video.style.display = 'block';
                                this.video.style.visibility = 'visible';
                            })
                            .catch(error => {
                                console.log('⚠️ Автозапуск заблокирован:', error.name);
                                console.log('🔍 Причина:', error.message);
                                
                                // Для мобильных устройств
                                if (this.isMobileDevice()) {
                                    console.log('📱 Это мобильное устройство, настраиваем взаимодействие');
                                    this.showVideoPlayButton();
                                    this.setupMobileVideoInteraction();
                                } else {
                                    console.log('💻 Это десктоп, показываем кнопку воспроизведения');
                                    this.showVideoPlayButton();
                                }
                            });
                    }
                } catch (error) {
                    console.error('❌ Непредвиденная ошибка при запуске видео:', error);
                    this.activateVideoFallback();
                }
            }, 500); // Задержка для стабильности
            
            // Дополнительная проверка через 2 секунды
            setTimeout(() => {
                if (this.video.paused && !this.video.ended) {
                    console.log('⏸️ Видео все еще приостановлено через 2 секунды');
                    
                    if (this.isMobileDevice()) {
                        this.showVideoPlayButton();
                    } else {
                        // Пробуем запустить снова на десктопе
                        this.video.play().catch(e => {
                            console.log('Повторный запуск:', e.name);
                            this.showVideoPlayButton();
                        });
                    }
                }
            }, 2000);
            
            // Финальная гарантия видимости через 3 секунды
            setTimeout(() => {
                this.video.style.display = 'block';
                this.video.style.visibility = 'visible';
                this.video.style.opacity = '1';
                console.log('✅ Финальная гарантия видимости активирована');
            }, 3000);
        }
        
        showVideoPlayButton() {
            if (!this.playButton || !this.playButton.parentElement) return;
            
            const controlsContainer = this.playButton.parentElement;
            controlsContainer.style.display = 'flex';
            this.playButton.style.display = 'flex';
            this.playButton.classList.add('show');
            
            console.log('🔼 Кнопка воспроизведения показана');
        }
        
        hideVideoControls() {
            if (this.playButton && this.playButton.parentElement) {
                const controlsContainer = this.playButton.parentElement;
                controlsContainer.style.display = 'none';
                console.log('🔽 Элементы управления видео скрыты');
            }
        }
        
        setupMobileVideoInteraction() {
            console.log('📱 Настройка взаимодействия для мобильных устройств');
            
            const handleFirstInteraction = () => {
                console.log('👆 Пользователь взаимодействовал со страницей');
                
                this.video.play()
                    .then(() => {
                        console.log('✅ Видео запущено после взаимодействия');
                        this.hideVideoControls();
                    })
                    .catch(error => {
                        console.log('❌ Не удалось запустить видео после взаимодействия:', error.name);
                        this.showVideoPlayButton();
                    });
                
                // Удаляем обработчики после первого взаимодействия
                document.removeEventListener('click', handleFirstInteraction);
                document.removeEventListener('touchstart', handleFirstInteraction);
                document.removeEventListener('scroll', handleFirstInteraction);
                document.removeEventListener('keydown', handleFirstInteraction);
            };
            
            // Добавляем обработчики для различных типов взаимодействия
            document.addEventListener('click', handleFirstInteraction, { once: true });
            document.addEventListener('touchstart', handleFirstInteraction, { once: true });
            document.addEventListener('scroll', handleFirstInteraction, { once: true });
            document.addEventListener('keydown', handleFirstInteraction, { once: true });
            
            console.log('✅ Обработчики взаимодействия установлены');
        }
        
        activateVideoFallback() {
            console.log('🖼️ Активация резервного изображения');
            
            // Скрываем видео
            this.video.style.display = 'none';
            
            // Показываем резервное изображение
            const fallback = document.querySelector('.video-fallback');
            if (fallback) {
                fallback.style.display = 'block';
            }
            
            // Скрываем элементы управления
            this.hideVideoControls();
            
            // Добавляем класс для CSS
            document.body.classList.add('video-fallback-active');
            
            console.log('✅ Резервное изображение активировано');
        }
        
        isMobileDevice() {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            console.log('📱 Проверка устройства:', isMobile ? 'Мобильное' : 'Десктоп');
            return isMobile;
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
        
        console.log('📄 ИНИЦИАЛИЗАЦИЯ ГЛАВНОЙ СТРАНИЦЫ NB GROUP TECH');
        console.log('🔧 Состояние загрузки DOM:', document.readyState);
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                console.log('✅ DOM полностью загружен');
                console.log('🎬 Создание экземпляра HomePage...');
                try {
                    window.homePage = new HomePage();
                    console.log('🎉 Главная страница успешно инициализирована!');
                } catch (error) {
                    console.error('❌ Ошибка при инициализации HomePage:', error);
                }
            });
        } else {
            console.log('✅ DOM уже загружен');
            console.log('🎬 Создание экземпляра HomePage...');
            try {
                window.homePage = new HomePage();
                console.log('🎉 Главная страница успешно инициализирована!');
            } catch (error) {
                console.error('❌ Ошибка при инициализации HomePage:', error);
            }
        }
    }
    
    // Автоматическая инициализация при загрузке скрипта
    console.log('🚀 Запуск инициализации главной страницы...');
    initializeHomePage();
    
    // Экспортируем класс для глобального доступа (если нужно)
    if (typeof window !== 'undefined') {
        window.HomePage = HomePage;
    }
    
    console.log('✅ home.js полностью загружен и готов к работе');
    
})();
