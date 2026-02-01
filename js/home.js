console.log('🏠 home.js loaded - NORMAL BACKGROUNDS - NO ZOOM');

// ===== СИСТЕМА СМЕНЫ ФОНОВЫХ ИЗОБРАЖЕНИЙ БЕЗ ПРИБЛИЖЕНИЯ =====
class BackgroundSwitcher {
    constructor() {
        this.bgLayers = document.querySelectorAll('.parallax-bg-layer');
        this.sections = document.querySelectorAll('section[data-bg-section]');
        this.currentBgIndex = 0;
        this.lastScrollY = window.scrollY;
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        this.init();
    }
    
    init() {
        console.log(`🎨 BackgroundSwitcher: Found ${this.bgLayers.length} layers`);
        
        if (this.bgLayers.length === 0) {
            console.error('❌ No background layers found');
            return;
        }
        
        // Гарантируем правильный масштаб с самого начала
        this.fixAllBackgroundScale();
        
        // Preload всех изображений
        this.preloadImages();
        
        // Настройка обработчиков событий
        this.setupEventListeners();
        
        // Инициализация начального состояния
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
            
            // ГАРАНТИРУЕМ НОРМАЛЬНЫЙ МАСШТАБ - НИКАКИХ ПРИБЛИЖЕНИЙ!
            layer.style.transform = 'translate3d(0, 0, 0) scale(1) !important';
            layer.style.backgroundSize = 'cover !important';
        });
        
        // Фикс для мобильных устройств
        if (this.isMobile) {
            this.optimizeForMobile();
        }
        
        console.log('✅ BackgroundSwitcher initialized with NORMAL scale');
    }
    
    fixAllBackgroundScale() {
        // КРИТИЧНО: Убираем все трансформации которые могли приближать фон
        this.bgLayers.forEach(layer => {
            layer.style.transform = 'translate3d(0, 0, 0) scale(1) !important';
            layer.style.backgroundSize = 'cover !important';
            layer.style.backgroundPosition = 'center center !important';
            
            // Убираем все приближения и устанавливаем COVER для полного заполнения
            layer.style.backgroundSize = 'cover';
            
            // Для всех экранов используем cover
            if (window.innerWidth > 1400) {
                layer.style.backgroundSize = 'cover !important';
            }
            
            if (window.innerHeight < 800) {
                layer.style.backgroundSize = 'cover !important';
            }
        });
        
        console.log('✅ Fixed background scale for all layers (COVER mode only)');
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
                    
                    // После загрузки гарантируем правильный масштаб
                    if (index === this.currentBgIndex) {
                        layer.style.opacity = '1';
                        layer.style.transform = 'scale(1) !important';
                        layer.style.backgroundSize = 'cover !important';
                    }
                };
                img.onerror = () => {
                    console.warn(`⚠️ Failed to preload background image ${index + 1}`);
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
            this.fixAllBackgroundScale();
            console.log('🔄 Resize handled - backgrounds scale fixed (COVER)');
        }, { passive: true });
        
        // Обработчик для touch устройств
        if ('ontouchstart' in window) {
            document.addEventListener('touchmove', () => {
                this.handleScroll();
            }, { passive: true });
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
        this.lastScrollY = currentScrollY;
        
        this.updateBackgroundOnScroll();
    }
    
    updateBackgroundOnScroll() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const triggerPoint = scrollY + (windowHeight * 0.4);
        
        // Находим текущую активную секцию
        let activeSectionIndex = -1;
        let minDistance = Infinity;
        
        for (let i = 0; i < this.sections.length; i++) {
            const section = this.sections[i];
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionCenter = sectionTop + (section.offsetHeight / 2);
            
            const distance = Math.abs(triggerPoint - sectionCenter);
            
            if (distance < minDistance && triggerPoint >= sectionTop - 100 && triggerPoint <= sectionBottom + 100) {
                minDistance = distance;
                activeSectionIndex = i;
            }
        }
        
        // Если не нашли точное соответствие, берем секцию по скроллу
        if (activeSectionIndex === -1) {
            const scrollPercent = scrollY / (document.documentElement.scrollHeight - windowHeight);
            
            if (scrollPercent < 0.25) activeSectionIndex = 0;
            else if (scrollPercent < 0.5) activeSectionIndex = 2;
            else if (scrollPercent < 0.75) activeSectionIndex = 4;
            else activeSectionIndex = 5;
        }
        
        // Ограничиваем индекс секции
        activeSectionIndex = Math.max(0, Math.min(activeSectionIndex, this.sections.length - 1));
        
        // Получаем соответствующий фон
        let targetBgIndex = 0;
        if (activeSectionIndex <= 1) targetBgIndex = 0;
        else if (activeSectionIndex <= 3) targetBgIndex = 1;
        else if (activeSectionIndex === 4) targetBgIndex = 2;
        else targetBgIndex = 3;
        
        // Переключаем фон если индекс изменился
        if (targetBgIndex !== this.currentBgIndex) {
            console.log(`🔄 Scroll: ${Math.round(scrollY)}px, Switching: BG${this.currentBgIndex + 1} → BG${targetBgIndex + 1}`);
            this.switchToBackground(targetBgIndex);
        }
    }
    
    switchToBackground(index) {
        if (index < 0 || index >= this.bgLayers.length || index === this.currentBgIndex) {
            return;
        }
        
        console.log(`🖼️ Switching background: ${this.currentBgIndex + 1} → ${index + 1}`);
        
        const currentLayer = this.bgLayers[this.currentBgIndex];
        const nextLayer = this.bgLayers[index];
        
        if (!currentLayer || !nextLayer) {
            console.error('❌ Background layers not found');
            return;
        }
        
        // ГАРАНТИРУЕМ НОРМАЛЬНЫЙ МАСШТАБ
        currentLayer.style.transform = 'scale(1) !important';
        currentLayer.style.backgroundSize = 'cover !important';
        nextLayer.style.transform = 'scale(1) !important';
        nextLayer.style.backgroundSize = 'cover !important';
        
        // Плавное переключение
        currentLayer.style.opacity = '0';
        currentLayer.classList.remove('active');
        currentLayer.style.zIndex = '-1001';
        
        setTimeout(() => {
            nextLayer.style.opacity = '1';
            nextLayer.classList.add('active');
            nextLayer.style.zIndex = '-1000';
            
            nextLayer.style.display = 'block';
            nextLayer.style.visibility = 'visible';
            
            this.currentBgIndex = index;
            
            console.log(`✅ Switched to background ${index + 1} with normal scale`);
        }, 300);
    }
    
    ensureBackgroundVisible() {
        // Убедимся что текущий фон виден с правильным масштабом
        const currentLayer = this.bgLayers[this.currentBgIndex];
        if (currentLayer) {
            currentLayer.style.opacity = '1';
            currentLayer.style.zIndex = '-1000';
            currentLayer.style.transform = 'scale(1) !important';
            currentLayer.style.backgroundSize = 'cover !important';
            currentLayer.style.display = 'block';
            currentLayer.style.visibility = 'visible';
        }
        
        // Убедимся что другие фоны скрыты
        this.bgLayers.forEach((layer, index) => {
            if (index !== this.currentBgIndex) {
                layer.style.opacity = '0';
                layer.style.zIndex = '-1001';
                layer.style.transform = 'scale(1) !important';
                layer.style.backgroundSize = 'cover !important';
            }
        });
        
        console.log('✅ Ensured background visibility with NORMAL scale (COVER)');
    }
    
    optimizeForMobile() {
        console.log('📱 Optimizing background switcher for mobile');
        
        this.bgLayers.forEach(layer => {
            layer.style.transition = 'opacity 0.5s ease';
            layer.style.backgroundAttachment = 'scroll';
            layer.style.transform = 'scale(1) !important';
            layer.style.backgroundSize = 'cover !important';
        });
    }
    
    // Публичные методы
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
}

// ===== ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ СТРАНИЦЫ =====
function initializeHomePage() {
    console.log('📄 INITIALIZING HOME PAGE WITH NORMAL BACKGROUNDS - NO ZOOM');
    
    // 1. Инициализация системы смены фона
    try {
        window.backgroundSwitcher = new BackgroundSwitcher();
        console.log('✅ Background switcher initialized with NO ZOOM');
    } catch (error) {
        console.error('❌ Failed to initialize background switcher:', error);
        // Аварийное восстановление
        const bgLayers = document.querySelectorAll('.parallax-bg-layer');
        if (bgLayers.length > 0) {
            bgLayers[0].style.opacity = '1';
            bgLayers[0].style.zIndex = '-1000';
            bgLayers[0].style.transform = 'scale(1) !important';
            bgLayers[0].style.backgroundSize = 'cover !important';
            
            for (let i = 1; i < bgLayers.length; i++) {
                bgLayers[i].style.opacity = '0';
                bgLayers[i].style.zIndex = '-1001';
                bgLayers[i].style.backgroundSize = 'cover !important';
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
        console.log('🎯 Normal background switching (NO ZOOM):');
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
    
    // Фоновые слои - ГАРАНТИРУЕМ НОРМАЛЬНЫЙ МАСШТАБ
    const bgLayers = document.querySelectorAll('.parallax-bg-layer');
    const activeBg = window.backgroundSwitcher?.getCurrentBackground() || 0;
    bgLayers.forEach((layer, index) => {
        if (index === activeBg) {
            layer.style.opacity = '1';
            layer.style.zIndex = '-1000';
            layer.style.backgroundSize = 'cover !important';
        } else {
            layer.style.opacity = '0';
            layer.style.zIndex = '-1001';
            layer.style.backgroundSize = 'cover !important';
        }
        layer.style.transform = 'scale(1) !important';
    });
    
    console.log(`✅ Made ${animatedElements.length + sections.length + bgLayers.length} elements visible with NO ZOOM`);
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
            block.style.opacity = '1';
            block.style.transform = 'translateX(0)';
            block.style.visibility = 'visible';
            
            block.classList.add('visible');
        }
    });
    
    console.log('✅ Vertical expertise blocks initialized');
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
        
        card.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease';
    });
    
    console.log(`✅ Card hover effects initialized for ${projectCards.length} cards`);
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
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            
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

// Функция для принудительного исправления масштаба фона
window.fixBackgroundScale = function() {
    console.log('🔧 Manually fixing background scale to COVER...');
    
    const bgLayers = document.querySelectorAll('.parallax-bg-layer');
    if (bgLayers.length === 0) return false;
    
    bgLayers.forEach(layer => {
        layer.style.transform = 'scale(1) !important';
        layer.style.backgroundSize = 'cover !important';
        layer.style.backgroundPosition = 'center center !important';
    });
    
    console.log(`✅ Fixed scale for ${bgLayers.length} background layers (COVER ONLY)`);
    return true;
};

// Экспорт функций
window.homePage = {
    initialize: initializeHomePage,
    switchBackground,
    nextBackground,
    prevBackground,
    getCurrentBackground,
    fixBackgroundScale
};

// Автоматическое исправление масштаба через 2 секунды после загрузки
window.addEventListener('load', () => {
    setTimeout(() => {
        if (window.fixBackgroundScale) {
            window.fixBackgroundScale();
        }
    }, 2000);
});

console.log('✅ home.js fully loaded - NORMAL BACKGROUND SCALE ENABLED (COVER ONLY)');
