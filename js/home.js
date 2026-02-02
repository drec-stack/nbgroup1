console.log('🏠 home.js loaded - BACKGROUND SWITCHING SYSTEM FIXED - FINAL VERSION');

// ===== СИСТЕМА СМЕНЫ ФОНОВЫХ ИЗОБРАЖЕНИЙ ПРИ СКРОЛЛЕ - ИСПРАВЛЕННАЯ =====
class BackgroundSwitcher {
    constructor() {
        this.bgLayers = document.querySelectorAll('.parallax-bg-layer');
        this.sections = document.querySelectorAll('section[data-bg-section]');
        this.currentBgIndex = 0;
        this.lastScrollY = window.scrollY;
        this.isScrollingDown = true;
        this.scrollTimeout = null;
        this.sectionMap = new Map();
        this.currentSectionIndex = 0;
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        this.init();
    }
    
    init() {
        console.log(`🎨 BackgroundSwitcher: Found ${this.bgLayers.length} layers, ${this.sections.length} sections`);
        
        if (this.bgLayers.length === 0) {
            console.error('❌ No background layers found');
            return;
        }
        
        // Создаем карту соответствия секций и фонов
        this.createSectionMap();
        
        // Preload всех изображений
        this.preloadImages();
        
        // Настройка обработчиков событий
        this.setupEventListeners();
        
        // Инициализация начального состояния - ТОЛЬКО ПЕРВЫЙ ФОН АКТИВЕН
        this.bgLayers.forEach((layer, index) => {
            if (index === 0) {
                layer.classList.add('active');
                this.currentBgIndex = 0;
                layer.style.opacity = '1';
                layer.style.zIndex = '-1000';
            } else {
                layer.classList.remove('active');
                layer.style.opacity = '0';
                layer.style.zIndex = '-1001';
            }
            
            // Убираем трансформацию для предотвращения уезжания фона
            layer.style.transform = 'translate3d(0, 0, 0)';
        });
        
        // Фикс для мобильных устройств
        if (this.isMobile) {
            this.optimizeForMobile();
        }
        
        console.log('✅ BackgroundSwitcher initialized');
        console.log('📊 Section-BG Mapping:', Array.from(this.sectionMap.entries()));
        console.log('📱 Device:', this.isMobile ? 'Mobile' : 'Desktop');
    }
    
    createSectionMap() {
        console.log('🔍 Creating section map...');
        
        // Жестко задаем соответствие секций фонам
        const sectionTypes = [
            'hero',      // BG1 (0)
            'expertise', // BG1 (0)
            'projects',  // BG2 (1)
            'stats',     // BG2 (1)
            'services',  // BG3 (2)
            'journals',  // BG4 (3)
            'faq',       // BG4 (3)
            'cta'        // BG4 (3)
        ];
        
        this.sections.forEach((section, index) => {
            const sectionType = section.getAttribute('data-bg-section');
            let bgIndex = 0; // По умолчанию
            
            if (sectionType) {
                // Определяем индекс фона на основе типа секции
                switch(sectionType) {
                    case 'hero':
                    case 'expertise':
                        bgIndex = 0; // BG1
                        break;
                    case 'projects':
                    case 'stats':
                        bgIndex = 1; // BG2
                        break;
                    case 'services':
                        bgIndex = 2; // BG3
                        break;
                    case 'journals':
                    case 'faq':
                    case 'cta':
                        bgIndex = 3; // BG4
                        break;
                    default:
                        bgIndex = 0; // По умолчанию BG1
                }
            } else {
                // Если атрибут отсутствует, используем порядковый номер
                if (index <= 1) bgIndex = 0;      // Первые 2 секции → BG1
                else if (index <= 3) bgIndex = 1; // Следующие 2 секции → BG2
                else if (index === 4) bgIndex = 2; // Services → BG3
                else bgIndex = 3;                 // Остальные → BG4
            }
            
            this.sectionMap.set(index, bgIndex);
            console.log(`  Section ${index + 1} (${sectionType || 'no type'}) → BG${bgIndex + 1}`);
        });
    }
    
    preloadImages() {
        this.bgLayers.forEach((layer, index) => {
            const bgImage = layer.style.backgroundImage;
            const urlMatch = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            
            if (urlMatch) {
                const img = new Image();
                img.onload = () => {
                    console.log(`✅ Preloaded background image ${index + 1}`);
                    layer.classList.add('loaded');
                    
                    // После загрузки убедимся что opacity правильная
                    if (index === this.currentBgIndex) {
                        layer.style.opacity = '1';
                    }
                };
                img.onerror = () => {
                    console.warn(`⚠️ Failed to preload background image ${index + 1}`);
                    // Все равно показываем элемент
                    layer.style.opacity = '1';
                };
                img.src = urlMatch[1];
            } else {
                console.warn(`⚠️ No background image found for layer ${index + 1}`);
                layer.style.opacity = '1';
            }
        });
    }
    
    setupEventListeners() {
        // Обработчик скролла с троттлингом
        let isScrolling = false;
        window.addEventListener('scroll', () => {
            if (isScrolling) return;
            
            isScrolling = true;
            requestAnimationFrame(() => {
                this.handleScroll();
                isScrolling = false;
            });
        }, { passive: true });
        
        // Обработчик ресайза
        window.addEventListener('resize', () => {
            this.handleResize();
        }, { passive: true });
        
        // Обработчик для touch устройств
        if ('ontouchstart' in window) {
            document.addEventListener('touchmove', () => this.handleScroll(), { passive: true });
        }
        
        // Обработчик для загрузки
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.ensureBackgroundVisible();
            }, 500);
        });
    }
    
    handleScroll() {
        const currentScrollY = window.scrollY;
        this.isScrollingDown = currentScrollY > this.lastScrollY;
        this.lastScrollY = currentScrollY;
        
        this.updateBackgroundOnScroll();
        
        // НЕ используем параллакс-эффект - он вызывает проблемы с фоном
        // this.updateParallaxEffect();
    }
    
    handleResize() {
        // Убираем любые трансформации при ресайзе
        this.bgLayers.forEach(layer => {
            layer.style.transform = 'translate3d(0, 0, 0)';
        });
        
        console.log('🔄 Resize handled - backgrounds reset');
    }
    
    updateBackgroundOnScroll() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const triggerPoint = scrollY + (windowHeight * 0.4); // 40% от верха окна
        
        // Находим текущую активную секцию
        let activeSectionIndex = -1;
        let minDistance = Infinity;
        
        for (let i = 0; i < this.sections.length; i++) {
            const section = this.sections[i];
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionCenter = sectionTop + (section.offsetHeight / 2);
            
            // Рассчитываем расстояние от центра экрана до центра секции
            const distance = Math.abs(triggerPoint - sectionCenter);
            
            if (distance < minDistance && triggerPoint >= sectionTop - 100 && triggerPoint <= sectionBottom + 100) {
                minDistance = distance;
                activeSectionIndex = i;
            }
        }
        
        // Если не нашли точное соответствие, берем секцию по скроллу
        if (activeSectionIndex === -1) {
            // Простое определение по скроллу (резервный метод)
            const scrollPercent = scrollY / (document.documentElement.scrollHeight - windowHeight);
            
            if (scrollPercent < 0.25) activeSectionIndex = 0;      // Первые 25% скролла
            else if (scrollPercent < 0.5) activeSectionIndex = 2;   // 25-50% скролла
            else if (scrollPercent < 0.75) activeSectionIndex = 4;  // 50-75% скролла
            else activeSectionIndex = 5;                           // Последние 25% скролла
        }
        
        // Ограничиваем индекс секции
        activeSectionIndex = Math.max(0, Math.min(activeSectionIndex, this.sections.length - 1));
        
        // Получаем соответствующий фон
        const targetBgIndex = this.sectionMap.get(activeSectionIndex) || 0;
        
        // Переключаем фон если индекс изменился
        if (targetBgIndex !== this.currentBgIndex) {
            console.log(`🔄 Scroll: ${Math.round(scrollY)}px, Section: ${activeSectionIndex + 1}, Switching: BG${this.currentBgIndex + 1} → BG${targetBgIndex + 1}`);
            this.switchToBackground(targetBgIndex);
        }
    }
    
    switchToBackground(index) {
        if (index < 0 || index >= this.bgLayers.length || index === this.currentBgIndex) {
            return;
        }
        
        console.log(`🖼️ Switching background: ${this.currentBgIndex + 1} → ${index + 1}`);
        
        // Получаем слои
        const currentLayer = this.bgLayers[this.currentBgIndex];
        const nextLayer = this.bgLayers[index];
        
        if (!currentLayer || !nextLayer) {
            console.error('❌ Background layers not found');
            return;
        }
        
        // Убираем параллакс эффект - ВОТ ЭТО ГЛАВНОЕ ИСПРАВЛЕНИЕ
        currentLayer.style.transform = 'translate3d(0, 0, 0)';
        nextLayer.style.transform = 'translate3d(0, 0, 0)';
        
        // Плавное переключение
        currentLayer.style.opacity = '0';
        currentLayer.classList.remove('active');
        currentLayer.style.zIndex = '-1001';
        
        setTimeout(() => {
            nextLayer.style.opacity = '1';
            nextLayer.classList.add('active');
            nextLayer.style.zIndex = '-1000';
            
            // Убедимся что слой виден
            nextLayer.style.display = 'block';
            nextLayer.style.visibility = 'visible';
            
            this.currentBgIndex = index;
            
            console.log(`✅ Switched to background ${index + 1}`);
        }, 300);
    }
    
    ensureBackgroundVisible() {
        // Убедимся что текущий фон виден
        const currentLayer = this.bgLayers[this.currentBgIndex];
        if (currentLayer) {
            currentLayer.style.opacity = '1';
            currentLayer.style.zIndex = '-1000';
            currentLayer.style.transform = 'translate3d(0, 0, 0)';
            currentLayer.style.display = 'block';
            currentLayer.style.visibility = 'visible';
        }
        
        // Убедимся что другие фоны скрыты
        this.bgLayers.forEach((layer, index) => {
            if (index !== this.currentBgIndex) {
                layer.style.opacity = '0';
                layer.style.zIndex = '-1001';
                layer.style.transform = 'translate3d(0, 0, 0)';
            }
        });
        
        console.log('✅ Ensured background visibility');
    }
    
    optimizeForMobile() {
        console.log('📱 Optimizing background switcher for mobile');
        
        // Для мобильных упрощаем переключение
        this.bgLayers.forEach(layer => {
            layer.style.transition = 'opacity 0.5s ease';
            layer.style.backgroundAttachment = 'scroll';
            layer.style.transform = 'none';
        });
    }
    
    // Публичные методы для ручного управления (если нужно)
    nextBackground() {
        const nextIndex = (this.currentBgIndex + 1) % this.bgLayers.length;
        this.switchToBackground(nextIndex);
        return nextIndex;
    }
    
    prevBackground() {
        const prevIndex = (this.currentBgIndex - 1 + this.bgLayers.length) % this.bgLayers.length;
        this.switchToBackground(prevIndex);
        return prevIndex;
    }
    
    getCurrentBackground() {
        return this.currentBgIndex;
    }
    
    getCurrentSection() {
        return this.currentSectionIndex;
    }
}

// ===== ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ СТРАНИЦЫ =====
function initializeHomePage() {
    console.log('📄 INITIALIZING HOME PAGE WITH FIXED BACKGROUND SWITCHING - FINAL');
    
    // 1. Инициализация системы смены фона
    try {
        window.backgroundSwitcher = new BackgroundSwitcher();
        console.log('✅ Background switcher initialized');
    } catch (error) {
        console.error('❌ Failed to initialize background switcher:', error);
        // Аварийное восстановление
        const bgLayers = document.querySelectorAll('.parallax-bg-layer');
        if (bgLayers.length > 0) {
            bgLayers[0].style.opacity = '1';
            bgLayers[0].style.zIndex = '-1000';
            bgLayers[0].style.transform = 'translate3d(0, 0, 0)';
            
            for (let i = 1; i < bgLayers.length; i++) {
                bgLayers[i].style.opacity = '0';
                bgLayers[i].style.zIndex = '-1001';
            }
        }
    }
    
    // 2. Гарантируем класс для главной страницы
    document.body.classList.add('home-page');
    document.documentElement.classList.add('home-page');
    
    // 3. Инициализация всех компонентов
    setTimeout(() => {
        initializeVerticalExpertiseBlocks();
        initializeStatsCounter();
        initializeScrollAnimations();
        initializeScrollProgress();
        initializeCardHoverEffects();
        initializeServicesInteraction();
        
        console.log('✅ Home page fully initialized');
        console.log('🎯 Fixed background switching logic:');
        console.log('   • Hero & Expertise → BG1');
        console.log('   • Projects & Stats → BG2');
        console.log('   • Services → BG3');
        console.log('   • Journals, FAQ, CTA → BG4');
        
        // Финальная проверка
        ensureAllContentVisible();
    }, 500);
}

// ===== ФИНАЛЬНАЯ ПРОВЕРКА ВИДИМОСТИ =====
function ensureAllContentVisible() {
    console.log('👁️ Ensuring all content is visible...');
    
    // Все анимированные элементы
    const animatedElements = document.querySelectorAll('.fade-in-down, .fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translate(0, 0)';
    });
    
    // Все секции
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '1';
        section.style.visibility = 'visible';
    });
    
    // Фоновые слои
    const bgLayers = document.querySelectorAll('.parallax-bg-layer');
    const activeBg = window.backgroundSwitcher?.getCurrentBackground() || 0;
    bgLayers.forEach((layer, index) => {
        if (index === activeBg) {
            layer.style.opacity = '1';
            layer.style.zIndex = '-1000';
        } else {
            layer.style.opacity = '0';
            layer.style.zIndex = '-1001';
        }
        layer.style.transform = 'translate3d(0, 0, 0)';
    });
    
    console.log(`✅ Made ${animatedElements.length + sections.length + bgLayers.length} elements visible`);
}

// ===== ИНИЦИАЛИЗАЦИЯ EXPERTISE БЛОКОВ =====
function initializeVerticalExpertiseBlocks() {
    const expertiseBlocks = document.querySelectorAll('.expertise-vertical-block');
    
    if (expertiseBlocks.length === 0) {
        console.log('⚠️ No vertical expertise blocks found');
        return;
    }
    
    console.log(`🎯 Initializing ${expertiseBlocks.length} expertise blocks`);
    
    expertiseBlocks.forEach((block, index) => {
        if (block && block.style) {
            // Немедленно показываем блок
            block.style.opacity = '1';
            block.style.transform = 'translateX(0)';
            block.style.visibility = 'visible';
            
            // Добавляем класс visible для анимаций
            block.classList.add('visible');
            
            // Анимация внутренних элементов
            setTimeout(() => {
                const number = block.querySelector('.expertise-number');
                const title = block.querySelector('.expertise-title');
                const description = block.querySelector('.expertise-description');
                const features = block.querySelectorAll('.expertise-features li');
                
                if (number && number.style) {
                    number.style.transform = 'scale(1)';
                    number.style.opacity = '1';
                }
                
                if (title && title.style) {
                    title.style.opacity = '1';
                    title.style.transform = 'translateX(0)';
                }
                
                if (description && description.style) {
                    description.style.opacity = '1';
                    description.style.transform = 'translateX(0)';
                }
                
                features.forEach((feature, featIndex) => {
                    setTimeout(() => {
                        if (feature && feature.style) {
                            feature.style.opacity = '1';
                            feature.style.transform = 'translateX(0)';
                        }
                    }, featIndex * 50);
                });
            }, index * 100);
        }
    });
    
    console.log('✅ Vertical expertise blocks initialized');
}

// ===== ИНИЦИАЛИЗАЦИЯ ВЗАИМОДЕЙСТВИЯ С УСЛУГАМИ =====
function initializeServicesInteraction() {
    const serviceItems = document.querySelectorAll('.speck-service-item');
    
    if (serviceItems.length === 0) {
        console.log('⚠️ No service items found');
        return;
    }
    
    console.log(`🎯 Initializing ${serviceItems.length} service items`);
    
    serviceItems.forEach((item, index) => {
        if (item && item.style) {
            // Немедленно показываем элемент
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            
            // Эффект при наведении
            item.addEventListener('mouseenter', function() {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    const arrow = this.querySelector('.service-arrow');
                    if (arrow) {
                        arrow.style.opacity = '1';
                        arrow.style.transform = 'translateX(5px)';
                    }
                }
            });
            
            item.addEventListener('mouseleave', function() {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    const arrow = this.querySelector('.service-arrow');
                    if (arrow) {
                        arrow.style.opacity = '0.7';
                        arrow.style.transform = 'translateX(0)';
                    }
                }
            });
        }
    });
    
    console.log('✅ Service interactions initialized');
}

// ===== ИНИЦИАЛИЗАЦИЯ СТАТИСТИКИ =====
function initializeStatsCounter() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length === 0) {
        console.log('⚠️ No stat counters found');
        return;
    }
    
    console.log(`🎯 Initializing ${counters.length} stat counters`);
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count')) || 0;
        if (target > 0) {
            // Немедленно показываем финальное значение
            counter.textContent = target;
            counter.classList.add('counter-animate');
        }
    });
    
    console.log('✅ Stat counters initialized');
}

// ===== SCROLL АНИМАЦИИ =====
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-down, .fade-in-up, .fade-in-left, .fade-in-right');
    
    console.log(`🎯 Found ${animatedElements.length} animated elements`);
    
    // Показываем все анимированные элементы
    animatedElements.forEach(el => {
        if (el && el.style) {
            el.style.opacity = '1';
            el.style.transform = 'translate(0, 0)';
        }
    });
    
    // Настраиваем IntersectionObserver для новых элементов
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translate(0, 0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
}

// ===== SCROLL PROGRESS BAR =====
function initializeScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    
    if (!progressBar) {
        console.log('⚠️ Scroll progress bar not found');
        return;
    }
    
    const updateProgress = () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        
        if (progressBar.style) {
            progressBar.style.width = `${scrollPercent}%`;
        }
    };
    
    window.addEventListener('scroll', updateProgress, { passive: true });
    
    // Инициализация
    updateProgress();
    progressBar.style.transition = 'width 0.3s ease';
    
    console.log('✅ Scroll progress bar initialized');
}

// ===== HOVER ЭФФЕКТЫ ДЛЯ КАРТОЧЕК =====
function initializeCardHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        if (!card) return;
        
        card.addEventListener('mouseenter', function() {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.style.transform = 'translateY(-15px) scale(1.02)';
                this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.35)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.25)';
            }
        });
        
        // Добавляем transition для плавности
        card.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease';
    });
    
    console.log(`✅ Card hover effects initialized for ${projectCards.length} cards`);
}

// ===== ЗАПУСК ПРИ ЗАГРУЗКЕ =====
function safeInitialize() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                initializeHomePage();
            }, 100);
        });
    } else {
        setTimeout(() => {
            initializeHomePage();
        }, 100);
    }
}

// Запускаем инициализацию
safeInitialize();

// ===== ГЛОБАЛЬНЫЕ ФУНКЦИИ ДЛЯ УПРАВЛЕНИЯ =====
window.switchBackground = function(index) {
    if (window.backgroundSwitcher) {
        window.backgroundSwitcher.switchToBackground(index);
        return true;
    }
    return false;
};

window.nextBackground = function() {
    if (window.backgroundSwitcher) {
        return window.backgroundSwitcher.nextBackground();
    }
    return -1;
};

window.prevBackground = function() {
    if (window.backgroundSwitcher) {
        return window.backgroundSwitcher.prevBackground();
    }
    return -1;
};

window.getCurrentBackground = function() {
    if (window.backgroundSwitcher) {
        return window.backgroundSwitcher.getCurrentBackground();
    }
    return 0;
};

window.reinitializeBackground = function() {
    console.log('🔄 Reinitializing background switching...');
    if (window.backgroundSwitcher) {
        window.backgroundSwitcher = new BackgroundSwitcher();
    }
    return true;
};

// Функция для принудительного исправления фона
window.fixBackground = function() {
    console.log('🔧 Manually fixing background...');
    
    const bgLayers = document.querySelectorAll('.parallax-bg-layer');
    if (bgLayers.length === 0) return false;
    
    // Найти активный слой
    let activeIndex = 0;
    bgLayers.forEach((layer, index) => {
        if (layer.classList.contains('active')) {
            activeIndex = index;
        }
    });
    
    // Исправить все слои
    bgLayers.forEach((layer, index) => {
        layer.style.transform = 'translate3d(0, 0, 0)';
        layer.style.backgroundAttachment = 'scroll';
        
        if (index === activeIndex) {
            layer.style.opacity = '1';
            layer.style.zIndex = '-1000';
            layer.style.display = 'block';
            layer.style.visibility = 'visible';
        } else {
            layer.style.opacity = '0';
            layer.style.zIndex = '-1001';
        }
    });
    
    console.log(`✅ Fixed background layer ${activeIndex + 1}`);
    return true;
};

// Экспорт функций
window.homePage = {
    initialize: initializeHomePage,
    reinitialize: () => {
        initializeHomePage();
    },
    switchBackground,
    nextBackground,
    prevBackground,
    getCurrentBackground,
    fixBackground
};

// Автоматическое исправление через 2 секунды после загрузки
window.addEventListener('load', () => {
    setTimeout(() => {
        if (window.fixBackground) {
            window.fixBackground();
        }
    }, 2000);
});

console.log('✅ home.js fully loaded - BACKGROUND SWITCHING FIXED AND READY');
