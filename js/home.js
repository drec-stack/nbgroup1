// home.js - Complete Home Page Functionality with Full Browser Support

(function() {
    'use strict';
    
    // Проверяем поддержку современных функций
    var supports = {
        intersectionObserver: 'IntersectionObserver' in window,
        classList: 'classList' in document.documentElement,
        forEach: 'forEach' in NodeList.prototype,
        addEventListener: 'addEventListener' in window,
        requestAnimationFrame: 'requestAnimationFrame' in window,
        fetch: 'fetch' in window
    };
    
    class HomePage {
        constructor() {
            this.isReducedMotion = window.matchMedia ? 
                window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
            this.header = null;
            this.isHeaderHidden = false;
            this.lastScrollTop = 0;
            this.scrollThreshold = 100;
            this.showThreshold = 10;
            
            // Проверяем, можно ли использовать современные функции
            this.useModernFeatures = supports.intersectionObserver && 
                                    supports.classList && 
                                    supports.addEventListener;
            
            // Initialize everything
            this.init();
        }

        init() {
            // Всегда инициализируем базовые функции
            this.initBasicAnimations();
            this.initStatsCounter();
            this.initParallaxBackgrounds();
            this.initMarqueeAnimations();
            this.initClickableStats();
            this.initCTAClickable();
            
            // Инициализируем вертикальные блоки в зависимости от поддержки браузера
            if (this.useModernFeatures) {
                this.initSpeckVerticalBlocksModern();
            } else {
                this.initSpeckVerticalBlocksLegacy();
            }
            
            console.log('🏠 HomePage инициализирован (режим: ' + 
                       (this.useModernFeatures ? 'modern' : 'legacy') + ')');
        }

        // ===== SPECK VERTICAL BLOCKS (Modern) =====
        initSpeckVerticalBlocksModern() {
            console.log('🎨 Инициализация вертикальных блоков (modern)...');
            
            var speckBlocks = document.querySelectorAll('.speck-vertical-block');
            
            if (!speckBlocks.length) {
                console.log('⚠️ Вертикальные блоки не найдены');
                return;
            }
            
            // Используем Intersection Observer если поддерживается
            var blockObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry, index) {
                    if (entry.isIntersecting) {
                        // Активируем блок с задержкой (staggered animation)
                        setTimeout(function() {
                            entry.target.classList.add('visible');
                        }, index * 200);
                        
                        blockObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            // Наблюдаем за всеми блоками
            speckBlocks.forEach(function(block) {
                blockObserver.observe(block);
            });
            
            this.initFeatureItemsInteractivity();
            
            console.log('✅ Инициализировано ' + speckBlocks.length + ' вертикальных блоков');
        }

        // ===== SPECK VERTICAL BLOCKS (Legacy для старых браузеров) =====
        initSpeckVerticalBlocksLegacy() {
            console.log('🎨 Инициализация вертикальных блоков (legacy для старых браузеров)...');
            
            var speckBlocks = document.querySelectorAll('.speck-vertical-block');
            
            if (!speckBlocks.length) return;
            
            // Показываем все блоки сразу для старых браузеров
            setTimeout(function() {
                speckBlocks.forEach(function(block, index) {
                    setTimeout(function() {
                        block.classList.add('visible');
                    }, index * 200);
                });
            }, 500);
            
            // Простая анимация при скролле для старых браузеров
            var checkScroll = function() {
                var windowHeight = window.innerHeight;
                
                speckBlocks.forEach(function(block) {
                    var rect = block.getBoundingClientRect();
                    var isVisible = (
                        rect.top <= windowHeight * 0.8 &&
                        rect.bottom >= 0
                    );
                    
                    if (isVisible && !block.classList.contains('visible')) {
                        block.classList.add('visible');
                    }
                });
            };
            
            // Используем старый синтаксис для совместимости
            if (window.addEventListener) {
                window.addEventListener('scroll', checkScroll);
                window.addEventListener('resize', checkScroll);
            } else if (window.attachEvent) {
                window.attachEvent('onscroll', checkScroll);
                window.attachEvent('onresize', checkScroll);
            }
            
            checkScroll(); // Проверить сразу
            
            this.initFeatureItemsInteractivity();
            
            console.log('✅ Инициализировано ' + speckBlocks.length + ' вертикальных блоков (legacy)');
        }

        // ===== ИНТЕРАКТИВНОСТЬ ДЛЯ ЭЛЕМЕНТОВ СПИСКА =====
        initFeatureItemsInteractivity() {
            var featureItems = document.querySelectorAll('.speck-feature-item');
            
            if (!featureItems.length) return;
            
            featureItems.forEach(function(item) {
                // Добавляем обработчик клика
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Анимация нажатия
                    if (supports.classList) {
                        item.classList.add('active');
                        setTimeout(function() {
                            item.classList.remove('active');
                        }, 150);
                    }
                    
                    // Переход на соответствующую страницу
                    var block = item.closest('.speck-vertical-block');
                    if (block) {
                        var blockIndex = block.getAttribute('data-block-index');
                        var blockTitles = ['strategy', 'design', 'engineering', 'manufacturing'];
                        
                        if (blockTitles[blockIndex]) {
                            setTimeout(function() {
                                window.location.href = 'services.html#' + blockTitles[blockIndex];
                            }, 200);
                        }
                    }
                });
                
                // Добавляем tabindex для доступности
                if (!item.hasAttribute('tabindex')) {
                    item.setAttribute('tabindex', '0');
                }
                
                // Обработчик нажатия клавиши Enter
                item.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.keyCode === 13) {
                        e.preventDefault();
                        this.click();
                    }
                });
            });
        }

        // ===== STATS COUNTER =====
        initStatsCounter() {
            var statNumbers = document.querySelectorAll('.stat-number-improved');
            
            if (!statNumbers.length) return;
            
            // Простая проверка видимости для старых браузеров
            var checkVisibility = function() {
                var windowHeight = window.innerHeight;
                
                statNumbers.forEach(function(stat) {
                    var rect = stat.getBoundingClientRect();
                    var isVisible = (
                        rect.top <= windowHeight * 0.8 &&
                        rect.bottom >= 0
                    );
                    
                    if (isVisible && !stat.classList.contains('animated')) {
                        var target = parseInt(stat.getAttribute('data-target')) || 0;
                        
                        if (target > 0) {
                            animateNumber(stat, target);
                            stat.classList.add('animated');
                        }
                    }
                });
            };
            
            // Функция анимации числа
            var animateNumber = function(element, target) {
                var current = 0;
                var duration = 2000;
                var startTime = Date.now ? Date.now() : new Date().getTime();
                
                var updateNumber = function() {
                    var elapsed = (Date.now ? Date.now() : new Date().getTime()) - startTime;
                    var progress = Math.min(elapsed / duration, 1);
                    var easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    current = Math.floor(easeOutQuart * target);
                    
                    element.textContent = current.toLocaleString ? 
                        current.toLocaleString() : 
                        current.toString();
                    
                    if (progress < 1) {
                        if (supports.requestAnimationFrame) {
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
                
                if (supports.requestAnimationFrame) {
                    requestAnimationFrame(updateNumber);
                } else {
                    updateNumber();
                }
            };
            
            // Запускаем проверку
            if (supports.addEventListener) {
                window.addEventListener('scroll', checkVisibility);
                window.addEventListener('resize', checkVisibility);
            } else if (window.attachEvent) {
                window.attachEvent('onscroll', checkVisibility);
                window.attachEvent('onresize', checkVisibility);
            }
            
            checkVisibility(); // Проверить сразу
        }

        // ===== CLICKABLE STATS CARDS =====
        initClickableStats() {
            var statCards = document.querySelectorAll('.stat-card.clickable-stat-card');
            
            statCards.forEach(function(card) {
                // Добавляем tabindex для доступности
                if (!card.hasAttribute('tabindex')) {
                    card.setAttribute('tabindex', '0');
                }
                
                // Обработчик нажатия клавиши Enter
                card.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.keyCode === 13) {
                        e.preventDefault();
                        window.location.href = this.href;
                    }
                });
            });
        }

        // ===== CLICKABLE CTA SECTION =====
        initCTAClickable() {
            var ctaSection = document.querySelector('.cta-improved.clickable-cta');
            if (!ctaSection) return;
            
            // Добавляем tabindex для доступности
            if (!ctaSection.hasAttribute('tabindex')) {
                ctaSection.setAttribute('tabindex', '0');
            }
            
            // Обработчик нажатия клавиши Enter
            ctaSection.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.keyCode === 13) {
                    e.preventDefault();
                    window.location.href = this.href;
                }
            });
        }

        // ===== БАЗОВЫЕ АНИМАЦИИ =====
        initBasicAnimations() {
            // Простая анимация для всех секций
            var sections = document.querySelectorAll('.content-section');
            
            var checkSections = function() {
                var windowHeight = window.innerHeight;
                
                sections.forEach(function(section) {
                    var rect = section.getBoundingClientRect();
                    var isVisible = (
                        rect.top <= windowHeight * 0.8 &&
                        rect.bottom >= 0
                    );
                    
                    if (isVisible && !section.classList.contains('animated')) {
                        section.classList.add('animated');
                    }
                });
            };
            
            if (supports.addEventListener) {
                window.addEventListener('scroll', checkSections);
                window.addEventListener('resize', checkSections);
            }
            
            checkSections(); // Проверить сразу
        }

        // ===== PARALLAX BACKGROUNDS =====
        initParallaxBackgrounds() {
            var contentSections = document.querySelectorAll('.content-section[data-bg-index]');
            
            if (!contentSections.length) return;
            
            var checkBackgrounds = function() {
                var windowHeight = window.innerHeight;
                var activeIndex = 0;
                
                contentSections.forEach(function(section, index) {
                    var rect = section.getBoundingClientRect();
                    var isVisible = (
                        rect.top <= windowHeight * 0.5 &&
                        rect.bottom >= windowHeight * 0.5
                    );
                    
                    if (isVisible) {
                        activeIndex = parseInt(section.getAttribute('data-bg-index')) || 0;
                    }
                });
                
                // Переключаем фон
                var backgrounds = document.querySelectorAll('.parallax-bg');
                backgrounds.forEach(function(bg) {
                    bg.classList.remove('active');
                });
                
                var targetBg = document.getElementById('parallax-bg-' + (parseInt(activeIndex) + 1));
                if (targetBg) {
                    targetBg.classList.add('active');
                }
            };
            
            if (supports.addEventListener) {
                window.addEventListener('scroll', checkBackgrounds);
                window.addEventListener('resize', checkBackgrounds);
            }
            
            checkBackgrounds(); // Проверить сразу
        }

        // ===== MARQUEE ANIMATIONS =====
        initMarqueeAnimations() {
            var marqueeTracks = document.querySelectorAll('.marquee-track');
            
            if (!marqueeTracks.length) return;

            // Простая проверка через 1 секунду
            setTimeout(function() {
                var isWorking = false;
                
                // Проверяем, работает ли CSS анимация
                marqueeTracks.forEach(function(track) {
                    var transform = track.style.transform || 
                                   track.currentStyle && track.currentStyle.transform ||
                                   getComputedStyle(track).transform;
                    
                    if (transform && transform !== 'none' && transform !== 'matrix(1, 0, 0, 1, 0, 0)') {
                        isWorking = true;
                    }
                });
                
                if (!isWorking) {
                    console.log('🎯 Бегущая строка не работает через CSS, запускаем JS fallback...');
                    initMarqueeJSFallback();
                } else {
                    console.log('✅ Бегущая строка работает через CSS');
                }
            }, 1000);
            
            // JavaScript fallback для старых браузеров
            function initMarqueeJSFallback() {
                console.log('🚀 Запуск JavaScript fallback для бегущей строки...');
                
                marqueeTracks.forEach(function(track, index) {
                    var isReverse = index === 1;
                    
                    // Убираем CSS анимации если они есть
                    track.style.animation = 'none';
                    track.style.webkitAnimation = 'none';
                    
                    var position = 0;
                    var speed = isReverse ? 2 : -2;
                    var contentWidth = track.scrollWidth / 3;
                    var animationId = null;
                    var isPaused = false;
                    
                    function animate() {
                        if (isPaused) {
                            if (supports.requestAnimationFrame) {
                                animationId = requestAnimationFrame(animate);
                            } else {
                                animationId = setTimeout(animate, 16);
                            }
                            return;
                        }
                        
                        position += speed;
                        
                        if (position <= -contentWidth) {
                            position = 0;
                        } else if (position >= 0) {
                            position = -contentWidth;
                        }
                        
                        track.style.transform = 'translateX(' + position + 'px)';
                        track.style.webkitTransform = 'translateX(' + position + 'px)';
                        
                        if (supports.requestAnimationFrame) {
                            animationId = requestAnimationFrame(animate);
                        } else {
                            animationId = setTimeout(animate, 16);
                        }
                    }
                    
                    // Запускаем анимацию
                    animate();
                    
                    // Пауза при наведении
                    track.addEventListener('mouseenter', function() {
                        isPaused = true;
                    });
                    
                    track.addEventListener('mouseleave', function() {
                        isPaused = false;
                    });
                    
                    // Сохраняем ID для очистки
                    track._animationId = animationId;
                    
                    console.log('✅ Трек ' + (index + 1) + ' запущен через JS fallback');
                });
            }
        }
    }

    // ===== GLOBAL INITIALIZATION =====
    // Инициализация при загрузке DOM
    function initHomePage() {
        // Ждем полной загрузки DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                window.homePage = new HomePage();
            });
        } else {
            window.homePage = new HomePage();
        }
    }
    
    // Проверка работы бегущей строки
    function checkMarqueeWorking() {
        setTimeout(function() {
            var tracks = document.querySelectorAll('.marquee-track');
            var isWorking = false;
            
            tracks.forEach(function(track) {
                var transform = track.style.transform || 
                               track.currentStyle && track.currentStyle.transform ||
                               getComputedStyle(track).transform;
                
                if (transform && transform !== 'none' && transform !== 'matrix(1, 0, 0, 1, 0, 0)') {
                    isWorking = true;
                }
            });
            
            if (!isWorking && window.homePage) {
                console.warn('⚠️ Бегущая строка не работает, запускаем fallback...');
                // Можно вызвать fallback функцию здесь
            }
        }, 2000);
    }
    
    // Экспорт функций для глобального доступа
    window.initHomePage = initHomePage;
    window.checkMarqueeWorking = checkMarqueeWorking;
    
    // Автоматическая инициализация
    initHomePage();
    
    // Проверяем после полной загрузки
    if (window.addEventListener) {
        window.addEventListener('load', checkMarqueeWorking);
    }
    
    // Резервный запуск через 5 секунд
    setTimeout(checkMarqueeWorking, 5000);
    
    // ===== ИНИЦИАЛИЗАЦИЯ ХЕДЕРА ДЛЯ ГЛАВНОЙ СТРАНИЦЫ =====
    function initHomeHeader() {
        var header = document.querySelector('.main-header');
        if (!header) {
            setTimeout(initHomeHeader, 100);
            return;
        }

        var isHidden = false;
        var hideThreshold = 100;

        function handleScroll() {
            var scrollY = window.pageYOffset || 
                         document.documentElement.scrollTop || 
                         document.body.scrollTop || 
                         0;
            
            if (scrollY > hideThreshold && !isHidden) {
                header.classList.add('header-hidden');
                isHidden = true;
            } else if (scrollY <= hideThreshold && isHidden) {
                header.classList.remove('header-hidden');
                isHidden = false;
            }
        }

        if (window.addEventListener) {
            handleScroll();
            window.addEventListener('scroll', handleScroll, false);
        }

        if (header.addEventListener) {
            header.addEventListener('mouseenter', function() {
                if (isHidden) {
                    header.classList.remove('header-hidden');
                    setTimeout(function() {
                        if (isHidden && (window.pageYOffset || 
                                        document.documentElement.scrollTop || 
                                        document.body.scrollTop || 
                                        0) > hideThreshold) {
                            header.classList.add('header-hidden');
                        }
                    }, 2000);
                }
            });
        }
    }
    
    window.initHomeHeader = initHomeHeader;
    
    // Автоматическая инициализация при загрузке
    if (document.body && document.body.classList.contains('home-page')) {
        if (window.addEventListener) {
            window.addEventListener('load', function() {
                setTimeout(function() {
                    if (window.homePage && window.homePage.initSpeckVerticalBlocksModern) {
                        window.homePage.initSpeckVerticalBlocksModern();
                    }
                    initHomeHeader();
                }, 500);
            });
        }
    }
    
    console.log('✅ home.js загружен и готов к работе');
})();
