// home.js - ПОЛНЫЙ ФАЙЛ ДЛЯ ВИДЕОФОНА И АНИМАЦИЙ
console.log('🎬 home.js загружен - ПОЛНАЯ ВЕРСИЯ');

(function() {
    'use strict';
    
    class HomePage {
        constructor() {
            this.isReducedMotion = window.matchMedia ? 
                window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
            
            console.log('🏠 HomePage инициализирован');
            
            // КРИТИЧЕСКИ ВАЖНО: сначала видео
            this.initVideoBackground();
            
            // Затем остальное
            this.init();
        }

        // ===== ВИДЕОФОН (ГЛАВНОЕ) =====
        initVideoBackground() {
            console.log('🎬 ИНИЦИАЛИЗАЦИЯ ВИДЕОФОНА...');
            
            // 1. Находим элементы
            this.video = document.querySelector('.video-bg');
            this.videoContainer = document.querySelector('.video-bg-container');
            this.playButton = document.getElementById('video-play-button');
            
            if (!this.video) {
                console.error('❌ Видео .video-bg не найдено в DOM!');
                this.showVideoFallback();
                return;
            }
            
            console.log('✅ Видео найдено:', this.video);
            console.log('✅ Источник:', this.video.querySelector('source')?.src || this.video.src);
            
            // 2. Устанавливаем критические атрибуты
            this.setupVideoAttributes();
            
            // 3. Гарантируем видимость
            this.ensureVideoVisibility();
            
            // 4. Настраиваем обработчики
            this.setupVideoEventHandlers();
            
            // 5. Запускаем воспроизведение
            this.startVideoPlayback();
            
            console.log('✅ Видеофон инициализирован');
        }
        
        setupVideoAttributes() {
            // Критически важные атрибуты
            this.video.setAttribute('playsinline', '');
            this.video.setAttribute('webkit-playsinline', '');
            this.video.setAttribute('muted', '');
            this.video.setAttribute('loop', '');
            this.video.setAttribute('autoplay', '');
            this.video.setAttribute('preload', 'auto');
            
            // Убеждаемся что есть источник
            if (!this.video.querySelector('source') && !this.video.src) {
                console.log('➕ Добавляем source элемент...');
                const source = document.createElement('source');
                source.src = 'assets/videos/hero-bg.mp4';
                source.type = 'video/mp4';
                this.video.appendChild(source);
            }
        }
        
        ensureVideoVisibility() {
            // Принудительно устанавливаем видимость
            this.video.style.display = 'block';
            this.video.style.visibility = 'visible';
            this.video.style.opacity = '1';
            this.video.style.position = 'fixed';
            this.video.style.top = '0';
            this.video.style.left = '0';
            this.video.style.width = '100vw';
            this.video.style.height = '100vh';
            this.video.style.zIndex = '-1';
            this.video.style.objectFit = 'cover';
            
            if (this.videoContainer) {
                this.videoContainer.style.display = 'block';
                this.videoContainer.style.visibility = 'visible';
                this.videoContainer.style.opacity = '1';
            }
            
            // Принудительно загружаем видео
            this.video.load();
        }
        
        setupVideoEventHandlers() {
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
            
            setTimeout(() => {
                // Попробуем запустить сразу
                const playPromise = this.video.play();
                
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            console.log('✅ Видео успешно запущено автоматически');
                            this.video.style.opacity = '1';
                            this.hidePlayButton();
                        })
                        .catch(error => {
                            console.log('⚠️ Автоплей заблокирован:', error.name);
                            
                            // Показываем кнопку воспроизведения для мобильных
                            if (this.isMobileDevice()) {
                                this.showPlayButton();
                                this.enableMobileInteraction();
                            }
                        });
                }
                
                // Проверим через 3 секунды
                setTimeout(() => {
                    if (this.video.paused) {
                        console.log('⏸️ Видео все еще приостановлено через 3 секунды');
                        if (this.isMobileDevice()) {
                            this.showPlayButton();
                        }
                    }
                }, 3000);
            }, 200);
        }
        
        showPlayButton() {
            if (!this.playButton) return;
            
            this.playButton.classList.add('show');
            this.playButton.style.display = 'flex';
            
            this.playButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🖱️ Клик по кнопке воспроизведения');
                
                this.video.play()
                    .then(() => {
                        console.log('✅ Видео запущено по клику');
                        this.hidePlayButton();
                    })
                    .catch(error => {
                        console.error('❌ Не удалось запустить видео:', error);
                        this.showVideoFallback();
                    });
            });
        }
        
        hidePlayButton() {
            if (this.playButton) {
                this.playButton.classList.remove('show');
                this.playButton.style.display = 'none';
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
            const fallback = document.querySelector('.video-fallback');
            if (fallback) {
                fallback.style.display = 'block';
            }
            
            // Скрываем кнопку воспроизведения
            this.hidePlayButton();
            
            // Добавляем класс для CSS
            document.body.classList.add('no-video');
        }
        
        isMobileDevice() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }

        // ===== ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ =====
        init() {
            console.log('🚀 Инициализация остальных компонентов...');
            
            this.initBasicAnimations();
            this.initStatsCounter();
            this.initSpeckVerticalBlocks();
            this.initSpeckMarquee();
            this.initScrollProgress();
            this.initParallaxBackgrounds();
            this.initClickableStats();
            this.initCTAClickable();
            
            console.log('✅ Все компоненты инициализированы');
        }

        // ===== SPECK VERTICAL BLOCKS =====
        initSpeckVerticalBlocks() {
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

        // ===== SPECK MARQUEE =====
        initSpeckMarquee() {
            console.log('🎯 Инициализация Speck бегущей строки...');
            
            const speckMarqueeTrack = document.getElementById('speckMarqueeTrack');
            if (!speckMarqueeTrack) {
                console.warn('❌ Speck marquee track не найден');
                return;
            }

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
        initStatsCounter() {
            const statNumbers = document.querySelectorAll('.stat-number-improved');
            
            if (!statNumbers.length) return;
            
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

        // ===== SCROLL PROGRESS =====
        initScrollProgress() {
            const progressBar = document.querySelector('.scroll-progress-bar');
            if (!progressBar) return;
            
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
    
})();
