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
        fetch: 'fetch' in window,
        XMLHttpRequest: 'XMLHttpRequest' in window
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
            
            // Проверяем, нужно ли использовать упрощенный режим
            var hasNoCSS = document.documentElement.classList.contains('no-csstransforms') ||
                          document.documentElement.classList.contains('no-cssgradients');
            
            this.useModernFeatures = supports.intersectionObserver && 
                                    supports.classList && 
                                    supports.addEventListener &&
                                    !hasNoCSS;
            
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
            
            // Инициализируем улучшенные Speck блоки
            this.initEnhancedSpeckBlocks();
            
            // Инициализируем анимации Speck блоков
            this.initSpeckBlocksAnimations();
            
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
            var self = this;
            setTimeout(function() {
                for (var i = 0; i < speckBlocks.length; i++) {
                    (function(index) {
                        setTimeout(function() {
                            speckBlocks[index].classList.add('visible');
                        }, index * 200);
                    })(i);
                }
            }, 500);
            
            // Простая анимация при скролле для старых браузеров
            var checkScroll = function() {
                var windowHeight = window.innerHeight || 
                                 document.documentElement.clientHeight || 
                                 document.body.clientHeight;
                
                for (var i = 0; i < speckBlocks.length; i++) {
                    var block = speckBlocks[i];
                    var rect = block.getBoundingClientRect();
                    
                    var isVisible = (
                        rect.top <= windowHeight * 0.8 &&
                        rect.bottom >= 0
                    );
                    
                    if (isVisible && !block.classList.contains('visible')) {
                        block.classList.add('visible');
                    }
                }
            };
            
            // Используем старый синтаксис для совместимости
            if (window.addEventListener) {
                window.addEventListener('scroll', checkScroll, false);
                window.addEventListener('resize', checkScroll, false);
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
            
            for (var i = 0; i < featureItems.length; i++) {
                (function(item) {
                    // Добавляем обработчик клика
                    if (item.addEventListener) {
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
                    }
                })(featureItems[i]);
            }
        }

        // ===== ENHANCED SPECK BLOCKS INTERACTIVITY =====
        initEnhancedSpeckBlocks() {
            console.log('🎨 Инициализация улучшенных Speck блоков...');
            
            var speckBlocks = document.querySelectorAll('.speck-vertical-block');
            
            if (!speckBlocks.length) {
                console.warn('⚠️ Speck блоки не найдены');
                return;
            }
            
            // Добавляем класс clickable-column для интерактивности
            var featureColumns = document.querySelectorAll('.speck-feature-column');
            for (var i = 0; i < featureColumns.length; i++) {
                featureColumns[i].classList.add('clickable-column');
                
                // Добавляем tabindex для доступности
                if (!featureColumns[i].hasAttribute('tabindex')) {
                    featureColumns[i].setAttribute('tabindex', '0');
                }
                
                // Добавляем role для семантики
                if (!featureColumns[i].hasAttribute('role')) {
                    featureColumns[i].setAttribute('role', 'button');
                }
                
                // Добавляем aria-label
                var columnTitle = featureColumns[i].querySelector('.speck-column-title');
                if (columnTitle && !featureColumns[i].hasAttribute('aria-label')) {
                    var blockTitle = featureColumns[i].closest('.speck-vertical-block')?.querySelector('.speck-block-title')?.textContent || 'Секция';
                    featureColumns[i].setAttribute('aria-label', 'Перейти к ' + columnTitle.textContent + ' в разделе ' + blockTitle);
                }
            }
            
            // Обработчики событий для блоков
            for (var i = 0; i < speckBlocks.length; i++) {
                var block = speckBlocks[i];
                
                // Hover эффект для всего блока
                if (block.addEventListener) {
                    block.addEventListener('mouseenter', (function(b) {
                        return function() {
                            if (!this.isReducedMotion && supports.classList) {
                                b.classList.add('block-hovered');
                            }
                        };
                    })(block));
                    
                    block.addEventListener('mouseleave', (function(b) {
                        return function() {
                            if (supports.classList) {
                                b.classList.remove('block-hovered');
                            }
                        };
                    })(block));
                }
            }
            
            // Обработчики для колонок
            for (var i = 0; i < featureColumns.length; i++) {
                (function(column) {
                    // Клик по колонке
                    if (column.addEventListener) {
                        column.addEventListener('click', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            // Анимация клика
                            if (supports.classList) {
                                column.classList.add('column-clicked');
                                setTimeout(function() {
                                    column.classList.remove('column-clicked');
                                }, 300);
                            }
                            
                            // Определяем блок и колонку
                            var block = column.closest('.speck-vertical-block');
                            var blockIndex = block ? block.getAttribute('data-block-index') : '0';
                            var columnTitle = column.querySelector('.speck-column-title')?.textContent || '';
                            
                            // Блоки и их соответствия
                            var blockTitles = ['strategy', 'design', 'engineering', 'manufacturing'];
                            var blockTitle = blockTitles[parseInt(blockIndex)] || 'services';
                            
                            // Логирование для отладки
                            console.log('🔗 Навигация: Блок ' + blockIndex + ' (' + blockTitle + '), Колонка: ' + columnTitle);
                            
                            // Переход с задержкой для анимации
                            setTimeout(function() {
                                window.location.href = 'services.html#' + blockTitle;
                            }, 350);
                        });
                        
                        // Поддержка клавиатуры
                        column.addEventListener('keydown', function(e) {
                            if (e.key === 'Enter' || e.key === ' ' || e.keyCode === 13 || e.keyCode === 32) {
                                e.preventDefault();
                                this.click();
                            }
                        });
                        
                        // Hover эффекты
                        column.addEventListener('mouseenter', function() {
                            if (!this.isReducedMotion && supports.classList) {
                                var block = this.closest('.speck-vertical-block');
                                if (block) {
                                    block.classList.add('block-hovered');
                                }
                            }
                        });
                        
                        column.addEventListener('mouseleave', function() {
                            if (supports.classList) {
                                var block = this.closest('.speck-vertical-block');
                                if (block) {
                                    block.classList.remove('block-hovered');
                                }
                            }
                        });
                        
                        // Фокус для доступности
                        column.addEventListener('focus', function() {
                            if (supports.classList) {
                                this.classList.add('column-focused');
                                var block = this.closest('.speck-vertical-block');
                                if (block) {
                                    block.classList.add('block-hovered');
                                }
                            }
                        });
                        
                        column.addEventListener('blur', function() {
                            if (supports.classList) {
                                this.classList.remove('column-focused');
                                var block = this.closest('.speck-vertical-block');
                                if (block) {
                                    block.classList.remove('block-hovered');
                                }
                            }
                        });
                    }
                })(featureColumns[i]);
            }
            
            console.log('✅ Инициализировано ' + speckBlocks.length + ' блоков с ' + featureColumns.length + ' колонками');
        }

        // ===== SPECK BLOCKS ANIMATIONS =====
        initSpeckBlocksAnimations() {
            console.log('✨ Инициализация анимаций Speck блоков...');
            
            // Добавляем класс для активации анимаций после загрузки
            setTimeout(() => {
                document.body.classList.add('speck-animations-loaded');
            }, 1000);
            
            // Настраиваем индексы для стрелок
            var featureItems = document.querySelectorAll('.speck-feature-item');
            for (var i = 0; i < featureItems.length; i++) {
                featureItems[i].style.setProperty('--item-index', i);
            }
            
            // Observer для анимаций при скролле
            if (supports.intersectionObserver) {
                var columnObserver = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('scroll-animated');
                        }
                    });
                }, {
                    threshold: 0.2,
                    rootMargin: '0px 0px -50px 0px'
                });
                
                var columns = document.querySelectorAll('.speck-feature-column');
                for (var i = 0; i < columns.length; i++) {
                    columnObserver.observe(columns[i]);
                }
            }
            
            // Анимация появления колонок
            setTimeout(function() {
                var columns = document.querySelectorAll('.speck-feature-column');
                for (var i = 0; i < columns.length; i++) {
                    (function(index) {
                        setTimeout(function() {
                            columns[index].style.animationPlayState = 'running';
                        }, index * 100);
                    })(i);
                }
            }, 500);
            
            console.log('✅ Анимации Speck блоков инициализированы');
        }

        // ===== ENHANCED SPECK ANIMATIONS =====
        initEnhancedSpeckAnimations() {
            console.log('🚀 Инициализация улучшенных анимаций Speck блоков...');
            
            const speckBlocks = document.querySelectorAll('.speck-vertical-block');
            
            if (!window.IntersectionObserver) {
                // Fallback для браузеров без IntersectionObserver
                setTimeout(() => {
                    speckBlocks.forEach((block, index) {
                        setTimeout(() => {
                            block.classList.add('visible', 'full-reveal');
                            
                            // Анимация элементов внутри блока
                            const number = block.querySelector('.speck-block-number');
                            const title = block.querySelector('.speck-block-title');
                            const subtitle = block.querySelector('.speck-block-subtitle');
                            const featureItems = block.querySelectorAll('.speck-feature-item');
                            
                            if (number) number.classList.add('animate-in');
                            setTimeout(() => {
                                if (title) title.classList.add('animate-in');
                            }, 200);
                            setTimeout(() => {
                                if (subtitle) subtitle.classList.add('animate-in', 'animate-underline');
                            }, 400);
                            
                            featureItems.forEach((item, itemIndex) {
                                setTimeout(() => {
                                    item.classList.add('animate-in');
                                }, 600 + itemIndex * 100);
                            });
                            
                            const columns = block.querySelectorAll('.speck-feature-column');
                            columns.forEach((col, colIndex) {
                                setTimeout(() => {
                                    col.classList.add('stagger-animate');
                                }, colIndex * 200);
                            });
                        }, index * 300);
                    });
                }, 800);
                return;
            }
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible', 'full-reveal');
                            entry.target.classList.add('scroll-animated');
                            
                            // Анимация элементов внутри блока
                            const number = entry.target.querySelector('.speck-block-number');
                            const title = entry.target.querySelector('.speck-block-title');
                            const subtitle = entry.target.querySelector('.speck-block-subtitle');
                            const featureItems = entry.target.querySelectorAll('.speck-feature-item');
                            const blockRight = entry.target.querySelector('.speck-block-right');
                            
                            if (number) {
                                setTimeout(() => {
                                    number.classList.add('animate-in');
                                }, 200);
                            }
                            
                            if (title) {
                                setTimeout(() => {
                                    title.classList.add('animate-in');
                                }, 400);
                            }
                            
                            if (subtitle) {
                                setTimeout(() => {
                                    subtitle.classList.add('animate-in', 'animate-underline');
                                }, 600);
                            }
                            
                            if (blockRight) {
                                setTimeout(() => {
                                    blockRight.classList.add('animate-border');
                                }, 800);
                            }
                            
                            featureItems.forEach((item, itemIndex) {
                                setTimeout(() => {
                                    item.classList.add('animate-in');
                                }, 1000 + itemIndex * 100);
                            });
                            
                            // Анимация колонок
                            const columns = entry.target.querySelectorAll('.speck-feature-column');
                            columns.forEach((col, colIndex) {
                                setTimeout(() => {
                                    col.classList.add('stagger-animate');
                                    col.style.animationDelay = `${colIndex * 0.2}s`;
                                }, 1200 + colIndex * 100);
                            });
                            
                            // Добавляем glow эффект
                            setTimeout(() => {
                                entry.target.classList.add('glow-animate');
                            }, 1500);
                            
                        }, index * 400);
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -150px 0px'
            });

            speckBlocks.forEach(block => observer.observe(block));
            
            // Добавляем hover анимации для иконок
            const featureIcons = document.querySelectorAll('.speck-feature-icon');
            featureIcons.forEach(icon => {
                if (icon.addEventListener) {
                    icon.addEventListener('mouseenter', () => {
                        if (!this.isReducedMotion) {
                            icon.classList.add('animate-pulse');
                        }
                    });
                    
                    icon.addEventListener('mouseleave', () => {
                        icon.classList.remove('animate-pulse');
                    });
                }
            });
            
            // Добавляем hover анимации для колонок
            const columns = document.querySelectorAll('.speck-feature-column');
            columns.forEach(col => {
                if (col.addEventListener) {
                    col.addEventListener('mouseenter', () => {
                        if (!this.isReducedMotion && supports.classList) {
                            col.classList.add('hover-animate');
                        }
                    });
                    
                    col.addEventListener('mouseleave', () => {
                        col.classList.remove('hover-animate');
                    });
                }
            });
            
            console.log('🚀 Улучшенные анимации Speck блоков инициализированы для ' + speckBlocks.length + ' блоков');
        }

        // ===== STATS COUNTER =====
        initStatsCounter() {
            var statNumbers = document.querySelectorAll('.stat-number-improved');
            
            if (!statNumbers.length) return;
            
            // Проверяем, если старый браузер - показываем сразу финальные значения
            var hasNoCSS = document.documentElement.classList.contains('no-csstransforms');
            if (hasNoCSS) {
                for (var i = 0; i < statNumbers.length; i++) {
                    var stat = statNumbers[i];
                    var target = parseInt(stat.getAttribute('data-target')) || 0;
                    stat.textContent = target;
                    stat.classList.add('animated');
                }
                return;
            }
            
            // Простая проверка видимости для старых браузеров
            var checkVisibility = function() {
                var windowHeight = window.innerHeight || 
                                 document.documentElement.clientHeight || 
                                 document.body.clientHeight;
                
                for (var i = 0; i < statNumbers.length; i++) {
                    var stat = statNumbers[i];
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
                }
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
                    // Fallback для очень старых браузеров
                    var interval = setInterval(function() {
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
            
            for (var i = 0; i < statCards.length; i++) {
                var card = statCards[i];
                
                // Добавляем tabindex для доступности
                if (!card.hasAttribute('tabindex')) {
                    card.setAttribute('tabindex', '0');
                }
                
                // Обработчик нажатия клавиши Enter
                if (card.addEventListener) {
                    card.addEventListener('keydown', function(e) {
                        if (e.key === 'Enter' || e.keyCode === 13) {
                            e.preventDefault();
                            if (this.href) {
                                window.location.href = this.href;
                            }
                        }
                    });
                }
            }
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
            if (ctaSection.addEventListener) {
                ctaSection.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.keyCode === 13) {
                        e.preventDefault();
                        if (this.href) {
                            window.location.href = this.href;
                        }
                    }
                });
            }
        }

        // ===== БАЗОВЫЕ АНИМАЦИИ =====
        initBasicAnimations() {
            // Простая анимация для всех секций
            var sections = document.querySelectorAll('.content-section');
            
            var checkSections = function() {
                var windowHeight = window.innerHeight || 
                                 document.documentElement.clientHeight || 
                                 document.body.clientHeight;
                
                for (var i = 0; i < sections.length; i++) {
                    var section = sections[i];
                    var rect = section.getBoundingClientRect();
                    
                    var isVisible = (
                        rect.top <= windowHeight * 0.8 &&
                        rect.bottom >= 0
                    );
                    
                    if (isVisible && !section.classList.contains('animated')) {
                        section.classList.add('animated');
                    }
                }
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
                var windowHeight = window.innerHeight || 
                                 document.documentElement.clientHeight || 
                                 document.body.clientHeight;
                var activeIndex = 0;
                
                for (var i = 0; i < contentSections.length; i++) {
                    var section = contentSections[i];
                    var rect = section.getBoundingClientRect();
                    var isVisible = (
                        rect.top <= windowHeight * 0.5 &&
                        rect.bottom >= windowHeight * 0.5
                    );
                    
                    if (isVisible) {
                        activeIndex = parseInt(section.getAttribute('data-bg-index')) || 0;
                        break;
                    }
                }
                
                // Переключаем фон
                var backgrounds = document.querySelectorAll('.parallax-bg');
                for (var i = 0; i < backgrounds.length; i++) {
                    backgrounds[i].classList.remove('active');
                }
                
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
                for (var i = 0; i < marqueeTracks.length; i++) {
                    var track = marqueeTracks[i];
                    var style = track.currentStyle || window.getComputedStyle(track);
                    var transform = style.transform || style.webkitTransform || style.mozTransform;
                    
                    if (transform && transform !== 'none' && 
                        transform !== 'matrix(1, 0, 0, 1, 0, 0)' &&
                        transform !== 'matrix(1, 0, 0, 1, 0, 0, 0)') {
                        isWorking = true;
                        break;
                    }
                }
                
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
                
                for (var i = 0; i < marqueeTracks.length; i++) {
                    (function(index) {
                        var track = marqueeTracks[index];
                        var isReverse = index === 1;
                        
                        // Убираем CSS анимации если они есть
                        track.style.animation = 'none';
                        track.style.webkitAnimation = 'none';
                        track.style.mozAnimation = 'none';
                        track.style.oAnimation = 'none';
                        
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
                            
                            // Используем transform если доступен
                            if ('transform' in track.style || 
                                'webkitTransform' in track.style ||
                                'mozTransform' in track.style) {
                                track.style.transform = 'translateX(' + position + 'px)';
                                track.style.webkitTransform = 'translateX(' + position + 'px)';
                                track.style.mozTransform = 'translateX(' + position + 'px)';
                            } else {
                                // Fallback для очень старых браузеров
                                track.style.position = 'relative';
                                track.style.left = position + 'px';
                            }
                            
                            if (supports.requestAnimationFrame) {
                                animationId = requestAnimationFrame(animate);
                            } else {
                                animationId = setTimeout(animate, 16);
                            }
                        }
                        
                        // Запускаем анимацию
                        animate();
                        
                        // Пауза при наведении
                        if (track.addEventListener) {
                            track.addEventListener('mouseenter', function() {
                                isPaused = true;
                            });
                            
                            track.addEventListener('mouseleave', function() {
                                isPaused = false;
                            });
                        } else if (track.attachEvent) {
                            track.attachEvent('onmouseenter', function() {
                                isPaused = true;
                            });
                            
                            track.attachEvent('onmouseleave', function() {
                                isPaused = false;
                            });
                        }
                        
                        // Сохраняем ID для очистки
                        track._animationId = animationId;
                        
                        console.log('✅ Трек ' + (index + 1) + ' запущен через JS fallback');
                    })(i);
                }
            }
        }
    }

    // ===== ENHANCED SPECK ANIMATIONS CLASS =====
    class EnhancedSpeckAnimations {
        constructor() {
            this.init();
        }

        init() {
            this.setupEnhancedSpeckAnimations();
            this.setupStaggeredColumnAnimations();
            this.setupSpeckHoverAnimations();
        }

        setupEnhancedSpeckAnimations() {
            const speckBlocks = document.querySelectorAll('.speck-vertical-block');
            
            if (!window.IntersectionObserver) {
                // Fallback для браузеров без IntersectionObserver
                setTimeout(() => {
                    speckBlocks.forEach((block, index) {
                        setTimeout(() => {
                            block.classList.add('full-reveal');
                            
                            // Анимация элементов внутри блока
                            this.animateSpeckBlockElements(block, index);
                        }, index * 300);
                    });
                }, 800);
                return;
            }
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('full-reveal');
                            
                            // Анимация элементов внутри блока
                            this.animateSpeckBlockElements(entry.target, index);
                            
                        }, index * 400);
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -150px 0px'
            });

            speckBlocks.forEach(block => observer.observe(block));
        }

        animateSpeckBlockElements(block, blockIndex) {
            // Анимация номера блока
            const number = block.querySelector('.speck-block-number');
            if (number) {
                setTimeout(() => {
                    number.classList.add('animate-in');
                }, 200);
            }
            
            // Анимация заголовка блока
            const title = block.querySelector('.speck-block-title');
            if (title) {
                setTimeout(() => {
                    title.classList.add('animate-in');
                }, 400);
            }
            
            // Анимация подзаголовка блока
            const subtitle = block.querySelector('.speck-block-subtitle');
            if (subtitle) {
                setTimeout(() => {
                    subtitle.classList.add('animate-in', 'animate-underline');
                }, 600);
            }
            
            // Анимация правой границы
            const blockRight = block.querySelector('.speck-block-right');
            if (blockRight) {
                setTimeout(() => {
                    blockRight.classList.add('animate-border');
                }, 800);
            }
            
            // Анимация элементов списка
            const featureItems = block.querySelectorAll('.speck-feature-item');
            featureItems.forEach((item, itemIndex) {
                setTimeout(() => {
                    item.classList.add('animate-in');
                }, 1000 + itemIndex * 100);
            });
            
            // Анимация колонок
            const columns = block.querySelectorAll('.speck-feature-column');
            columns.forEach((col, colIndex) {
                setTimeout(() => {
                    col.classList.add('stagger-animate');
                    col.style.animationDelay = `${colIndex * 0.2}s`;
                }, 1200 + colIndex * 100);
            });
            
            // Добавляем glow эффект
            setTimeout(() => {
                block.classList.add('glow-animate');
            }, 1500);
        }

        setupStaggeredColumnAnimations() {
            // Инициализация анимации для всех колонок при загрузке
            const columns = document.querySelectorAll('.speck-feature-column');
            
            columns.forEach((column, index) {
                column.style.animationDelay = `${index * 0.1 + 0.3}s`;
            });
            
            // Добавляем класс для активации анимаций после загрузки
            setTimeout(() => {
                document.body.classList.add('speck-animations-loaded');
            }, 1000);
        }

        setupSpeckHoverAnimations() {
            // Добавляем hover анимации для иконок
            const featureIcons = document.querySelectorAll('.speck-feature-icon');
            featureIcons.forEach(icon => {
                icon.addEventListener('mouseenter', () => {
                    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                        icon.classList.add('animate-pulse');
                    }
                });
                
                icon.addEventListener('mouseleave', () => {
                    icon.classList.remove('animate-pulse');
                });
            });
            
            // Добавляем hover анимации для колонок
            const columns = document.querySelectorAll('.speck-feature-column');
            columns.forEach(col => {
                col.addEventListener('mouseenter', () => {
                    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                        col.classList.add('hover-animate');
                    }
                });
                
                col.addEventListener('mouseleave', () => {
                    col.classList.remove('hover-animate');
                });
            });
        }
    }

    // ===== GLOBAL INITIALIZATION =====
    // Инициализация при загрузке DOM
    function initHomePage() {
        // Проверяем, на главной ли мы странице
        if (!document.body || !document.body.classList.contains('home-page')) {
            return;
        }
        
        // Ждем полной загрузки DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                window.homePage = new HomePage();
                
                // Инициализируем улучшенные анимации Speck блоков
                if (document.querySelector('.speck-vertical-section')) {
                    window.enhancedSpeckAnimations = new EnhancedSpeckAnimations();
                }
            });
        } else {
            window.homePage = new HomePage();
            
            // Инициализируем улучшенные анимации Speck блоков
            if (document.querySelector('.speck-vertical-section')) {
                window.enhancedSpeckAnimations = new EnhancedSpeckAnimations();
            }
        }
    }
    
    // Проверка работы бегущей строки
    function checkMarqueeWorking() {
        setTimeout(function() {
            var tracks = document.querySelectorAll('.marquee-track');
            var isWorking = false;
            
            for (var i = 0; i < tracks.length; i++) {
                var track = tracks[i];
                var style = track.currentStyle || window.getComputedStyle(track);
                var transform = style.transform || style.webkitTransform || style.mozTransform;
                
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
                        var scrollY = window.pageYOffset || 
                                     document.documentElement.scrollTop || 
                                     document.body.scrollTop || 
                                     0;
                        if (isHidden && scrollY > hideThreshold) {
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
                    if (window.homePage) {
                        initHomeHeader();
                    }
                }, 500);
            });
        }
    }
    
    console.log('✅ home.js загружен и готов к работе');
    
    // ===== HEADER INITIALIZATION FOR CONTACTS PAGE =====
    function initContactsPageHeader() {
        console.log('📞 Initializing header for contacts page...');
        
        const header = document.querySelector('.main-header');
        if (!header) {
            console.warn('⚠️ No header found on contacts page');
            return;
        }
        
        // Проверяем, что мы на странице контактов
        if (!document.body.classList.contains('contact-page')) {
            return;
        }
        
        // Добавляем анимацию появления
        setTimeout(() => {
            header.classList.add('header-glass-enter');
            
            setTimeout(() => {
                header.classList.remove('header-glass-enter');
            }, 600);
        }, 100);
        
        // Логика скролла как на главной странице
        let lastScrollY = window.scrollY;
        const scrollThreshold = 50;
        
        function handleScroll() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY <= scrollThreshold) {
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
                header.classList.remove('header-hidden', 'header-glass-exit');
                header.classList.add('header-glass-enter');
            } else {
                const opacity = Math.max(0, Math.min(1, 1 - (currentScrollY - scrollThreshold) / 100));
                header.style.opacity = opacity.toString();
                
                if (opacity <= 0.1) {
                    header.classList.add('header-hidden');
                    header.classList.add('header-glass-exit');
                    header.classList.remove('header-glass-enter');
                } else {
                    header.classList.remove('header-hidden');
                }
            }
            
            lastScrollY = currentScrollY;
        }
        
        // Применяем начальное состояние
        handleScroll();
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Показываем хедер при наведении
        header.addEventListener('mouseenter', () => {
            if (header.classList.contains('header-hidden')) {
                header.classList.remove('header-hidden', 'header-glass-exit');
                header.classList.add('header-glass-enter');
                header.style.opacity = '1';
            }
        });
        
        // Скрываем через 2 секунды если мы все еще скроллим вниз
        header.addEventListener('mouseleave', () => {
            if (window.scrollY > 150) {
                setTimeout(() => {
                    if (window.scrollY > 150 && !header.matches(':hover')) {
                        header.classList.add('header-hidden');
                        header.classList.add('header-glass-exit');
                        header.classList.remove('header-glass-enter');
                    }
                }, 2000);
            }
        });
        
        console.log('✅ Contacts page header initialized');
    }
    
    // Автоматически инициализировать хедер для страницы контактов
    document.addEventListener('DOMContentLoaded', function() {
        if (document.body.classList.contains('contact-page')) {
            setTimeout(() => {
                initContactsPageHeader();
            }, 500);
        }
    });
    
    // Экспорт функции для использования в contacts.html
    window.initContactsPageHeader = initContactsPageHeader;
})();
