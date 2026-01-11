console.log('🏠 home.js loaded - BACKGROUND SWITCHING SYSTEM WITHOUT VISUAL INDICATORS');

// ===== СИСТЕМА СМЕНЫ ФОНОВЫХ ИЗОБРАЖЕНИЙ ПРИ СКРОЛЛЕ =====
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
        
        // Инициализация начального состояния
        this.updateBackgroundOnScroll();
        
        console.log('✅ BackgroundSwitcher initialized');
        console.log('📊 Section-BG Mapping:', Array.from(this.sectionMap.entries()));
    }
    
    createSectionMap() {
        // Создаем карту соответствия: номер секции -> индекс фона
        // Согласно требованиям:
        // 1. Первое изображение не меняется до секции Projects (индекс 0)
        // 2. Второе изображение до секции Services (индекс 1)
        // 3. Третье изображение до Journals (индекс 2)
        // 4. Четвертое изображение оставшиеся секции (индекс 3)
        
        this.sections.forEach((section, index) => {
            const bgIndex = parseInt(section.getAttribute('data-bg-index')) - 1;
            this.sectionMap.set(index, Math.max(0, Math.min(bgIndex, this.bgLayers.length - 1)));
        });
        
        console.log('🔍 Section mapping created:');
        this.sections.forEach((section, i) => {
            console.log(`  Section ${i + 1} (${section.getAttribute('data-bg-section')}) → BG${this.sectionMap.get(i) + 1}`);
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
                };
                img.onerror = () => {
                    console.warn(`⚠️ Failed to preload background image ${index + 1}`);
                };
                img.src = urlMatch[1];
            }
        });
    }
    
    setupEventListeners() {
        // Обработчик скролла с троттлингом
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) return;
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
                scrollTimeout = null;
            }, 16); // ~60fps
        }, { passive: true });
        
        // Обработчик ресайза
        window.addEventListener('resize', () => {
            this.handleResize();
        }, { passive: true });
        
        // Обработчик для touch устройств
        if ('ontouchstart' in window) {
            document.addEventListener('touchmove', () => this.handleScroll(), { passive: true });
        }
    }
    
    handleScroll() {
        const currentScrollY = window.scrollY;
        this.isScrollingDown = currentScrollY > this.lastScrollY;
        this.lastScrollY = currentScrollY;
        
        this.updateBackgroundOnScroll();
        this.updateParallaxEffect();
    }
    
    handleResize() {
        // Обновляем позиции секций при ресайзе
        this.sectionPositions = this.calculateSectionPositions();
    }
    
    calculateSectionPositions() {
        const positions = [];
        this.sections.forEach(section => {
            positions.push({
                top: section.offsetTop,
                bottom: section.offsetTop + section.offsetHeight,
                height: section.offsetHeight,
                id: section.getAttribute('data-bg-section')
            });
        });
        return positions;
    }
    
    updateBackgroundOnScroll() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const triggerPoint = scrollY + (windowHeight * 0.4); // 40% от верха окна
        
        // Находим текущую активную секцию
        let foundSectionIndex = -1;
        
        // Для скролла ВНИЗ - используем верхнюю границу секции
        if (this.isScrollingDown) {
            for (let i = 0; i < this.sections.length; i++) {
                const section = this.sections[i];
                const sectionTop = section.offsetTop;
                
                if (scrollY >= sectionTop - 150) {
                    foundSectionIndex = i;
                }
            }
        } 
        // Для скролла ВВЕРХ - используем нижнюю границу секции
        else {
            for (let i = this.sections.length - 1; i >= 0; i--) {
                const section = this.sections[i];
                const sectionBottom = section.offsetTop + section.offsetHeight;
                
                if (scrollY <= sectionBottom - windowHeight + 150) {
                    foundSectionIndex = i;
                    break;
                }
            }
        }
        
        // Если нашли секцию, получаем соответствующий фон
        if (foundSectionIndex >= 0 && foundSectionIndex !== this.currentSectionIndex) {
            this.currentSectionIndex = foundSectionIndex;
            const targetBgIndex = this.sectionMap.get(foundSectionIndex) || 0;
            
            // Переключаем фон если индекс изменился
            if (targetBgIndex !== this.currentBgIndex) {
                this.switchToBackground(targetBgIndex);
            }
        }
    }
    
    updateParallaxEffect() {
        const scrollY = window.scrollY;
        
        // Параллакс эффект только для активного слоя
        const activeLayer = this.bgLayers[this.currentBgIndex];
        if (activeLayer) {
            const speed = 0.05;
            const yPos = scrollY * speed;
            activeLayer.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
    }
    
    switchToBackground(index) {
        if (index < 0 || index >= this.bgLayers.length || index === this.currentBgIndex) {
            return;
        }
        
        console.log(`🖼️ Switching background: ${this.currentBgIndex + 1} → ${index + 1}`);
        
        // Скрываем все слои
        this.bgLayers.forEach(layer => {
            layer.classList.remove('active');
        });
        
        // Показываем выбранный слой
        this.bgLayers[index].classList.add('active');
        
        this.currentBgIndex = index;
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
    console.log('📄 INITIALIZING HOME PAGE');
    
    // 1. Инициализация системы смены фона
    window.backgroundSwitcher = new BackgroundSwitcher();
    
    // 2. Гарантируем класс для главной страницы
    document.body.classList.add('home-page');
    document.documentElement.classList.add('home-page');
    
    // 3. Немедленная загрузка всего контента
    setTimeout(() => {
        loadAllContentImmediately();
    }, 100);
    
    // 4. Инициализация всех компонентов
    setTimeout(() => {
        initializeVerticalExpertiseBlocks();
        initializeStatsCounter();
        initializeScrollAnimations();
        initializeScrollProgress();
        initializeCardHoverEffects();
        initializeServicesInteraction();
        
        console.log('✅ Home page fully initialized');
        console.log('🎯 Background switching logic:');
        console.log('   • Hero & Expertise → BG1');
        console.log('   • Projects & Stats → BG2');
        console.log('   • Services → BG3');
        console.log('   • Journals, FAQ, CTA → BG4');
        console.log('   • Works both directions: scroll down/up');
    }, 300);
}

// ===== НЕМЕДЛЕННАЯ ЗАГРУЗКА ВСЕГО КОНТЕНТА =====
function loadAllContentImmediately() {
    console.log('⚡ Loading all content immediately...');
    
    // Показываем все анимированные элементы
    const animatedElements = document.querySelectorAll('.fade-in-down, .fade-in-up, .fade-in-left, .fade-in-right, .animated-element');
    animatedElements.forEach(el => {
        if (el && el.style) {
            el.style.opacity = '1';
            el.style.transform = 'translate(0, 0)';
            el.style.animationPlayState = 'running';
        }
    });
    
    // Показываем все секции
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section && section.style) {
            section.style.opacity = '1';
            section.style.visibility = 'visible';
        }
    });
    
    console.log(`⚡ Immediately loaded ${animatedElements.length} animated elements, ${sections.length} sections`);
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
    
    // Уже показаны в loadAllContentImmediately()
    
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

// ===== УПРАВЛЕНИЕ FAQ =====
function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) {
        console.log('⚠️ No FAQ items found');
        return;
    }
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Закрываем все FAQ
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                    const faqAnswer = faq.querySelector('.faq-answer');
                    if (faqAnswer) {
                        faqAnswer.style.display = 'none';
                        faqAnswer.style.maxHeight = '0';
                        faqAnswer.style.opacity = '0';
                    }
                });
                
                // Открываем текущий если был закрыт
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.display = 'block';
                    setTimeout(() => {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        answer.style.opacity = '1';
                    }, 10);
                }
            });
        }
    });
    
    console.log(`✅ FAQ accordion setup for ${faqItems.length} items`);
}

// ===== ЗАПУСК ПРИ ЗАГРУЗКЕ =====
function safeInitialize() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                initializeHomePage();
                setupFAQAccordion();
            }, 100);
        });
    } else {
        setTimeout(() => {
            initializeHomePage();
            setupFAQAccordion();
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

// Экспорт функций
window.homePage = {
    initialize: initializeHomePage,
    reinitialize: () => {
        initializeHomePage();
        setupFAQAccordion();
    },
    switchBackground,
    nextBackground,
    prevBackground,
    getCurrentBackground
};

console.log('✅ home.js fully loaded - BACKGROUND SWITCHING READY WITHOUT VISUAL INDICATORS');
