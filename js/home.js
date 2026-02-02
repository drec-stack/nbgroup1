console.log('🏠 home.js loaded - NORMAL BACKGROUNDS - NO ZOOM - CONTAIN MODE');

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
        
        // Гарантируем правильный масштаб с самого начала - CONTAIN вместо COVER
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
            
            // ГАРАНТИРУЕМ НОРМАЛЬНЫЙ МАСШТАБ - CONTAIN вместо COVER
            layer.style.transform = 'translate3d(0, 0, 0) scale(1) !important';
            layer.style.backgroundSize = 'contain !important';
        });
        
        // Фикс для мобильных устройств
        if (this.isMobile) {
            this.optimizeForMobile();
        }
        
        console.log('✅ BackgroundSwitcher initialized with CONTAIN scale (normal size)');
    }
    
    fixAllBackgroundScale() {
        // КРИТИЧНО: Устанавливаем CONTAIN для нормального размера без обрезки
        this.bgLayers.forEach(layer => {
            // Убираем все трансформации
            layer.style.transform = 'translate3d(0, 0, 0) scale(1) !important';
            
            // ИСПРАВЛЕНО: CONTAIN вместо COVER для нормального размера
            layer.style.backgroundSize = 'contain !important';
            layer.style.backgroundPosition = 'center center !important';
            layer.style.backgroundRepeat = 'no-repeat !important';
            
            // Для всех экранов используем contain
            if (window.innerWidth > 1400) {
                layer.style.backgroundSize = 'contain !important';
            }
            
            if (window.innerHeight < 800) {
                layer.style.backgroundSize = 'contain !important';
            }
        });
        
        console.log('✅ Fixed background scale for all layers (CONTAIN mode for normal size)');
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
                        layer.style.backgroundSize = 'contain !important';
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
            console.log('🔄 Resize handled - backgrounds scale fixed (CONTAIN)');
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
        
        // ГАРАНТИРУЕМ НОРМАЛЬНЫЙ МАСШТАБ - CONTAIN
        currentLayer.style.transform = 'scale(1) !important';
        currentLayer.style.backgroundSize = 'contain !important';
        nextLayer.style.transform = 'scale(1) !important';
        nextLayer.style.backgroundSize = 'contain !important';
        
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
            
            console.log(`✅ Switched to background ${index + 1} with CONTAIN scale`);
        }, 300);
    }
    
    ensureBackgroundVisible() {
        // Убедимся что текущий фон виден с правильным масштабом
        const currentLayer = this.bgLayers[this.currentBgIndex];
        if (currentLayer) {
            currentLayer.style.opacity = '1';
            currentLayer.style.zIndex = '-1000';
            currentLayer.style.transform = 'scale(1) !important';
            currentLayer.style.backgroundSize = 'contain !important';
            currentLayer.style.display = 'block';
            currentLayer.style.visibility = 'visible';
        }
        
        // Убедимся что другие фоны скрыты
        this.bgLayers.forEach((layer, index) => {
            if (index !== this.currentBgIndex) {
                layer.style.opacity = '0';
                layer.style.zIndex = '-1001';
                layer.style.transform = 'scale(1) !important';
                layer.style.backgroundSize = 'contain !important';
            }
        });
        
        console.log('✅ Ensured background visibility with NORMAL scale (CONTAIN)');
    }
    
    optimizeForMobile() {
        console.log('📱 Optimizing background switcher for mobile');
        
        this.bgLayers.forEach(layer => {
            layer.style.transition = 'opacity 0.5s ease';
            layer.style.backgroundAttachment = 'scroll';
            layer.style.transform = 'scale(1) !important';
            layer.style.backgroundSize = 'contain !important';
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
    
    // Анимация счетчиков при появлении в viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count')) || 0;
                
                if (target > 0) {
                    animateCounter(counter, target);
                    observer.unobserve(counter);
                }
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
    
    console.log('✅ Stat counters initialized with intersection observer');
}

// Анимация счетчика
function animateCounter(element, target) {
    const duration = 2000; // 2 секунды
    const stepTime = 20; // обновление каждые 20мс
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
            element.classList.add('counter-animate');
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ===== SCROLL АНИМАЦИИ =====
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-down, .fade-in-up, .fade-in-left, .fade-in-right');
    
    console.log(`🎯 Found ${animatedElements.length} animated elements`);
    
    // Инициализируем их все видимыми для начала
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

// ===== FAQ АККОРДЕОН =====
function initializeFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) {
        console.log('⚠️ No FAQ items found');
        return;
    }
    
    console.log(`🎯 Initializing ${faqItems.length} FAQ accordion items`);
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) return;
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Закрываем все другие открытые элементы FAQ
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0';
                        otherAnswer.style.opacity = '0';
                        otherAnswer.style.padding = '0 30px';
                    }
                    
                    if (otherQuestion) {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                    }
                }
            });
            
            // Переключаем текущий элемент
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
                answer.style.padding = '0 30px 30px 30px';
                question.setAttribute('aria-expanded', 'true');
            } else {
                item.classList.remove('active');
                answer.style.maxHeight = '0';
                answer.style.opacity = '0';
                answer.style.padding = '0 30px';
                question.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Открываем первый FAQ по умолчанию
        if (item === faqItems[0]) {
            setTimeout(() => {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
                answer.style.padding = '0 30px 30px 30px';
                question.setAttribute('aria-expanded', 'true');
            }, 1000);
        }
    });
    
    console.log('✅ FAQ accordion initialized');
}

// ===== ПЛАВНАЯ ПРОКРУТКА =====
function initializeSmoothScroll() {
    // Плавная прокрутка для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('header')?.offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    console.log('✅ Smooth scroll initialized');
}

// ===== КНОПКИ ПРИЗЫВА К ДЕЙСТВИЮ =====
function initializeCtaButtons() {
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Добавляем анимацию клика
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            }
        });
        
        // Улучшаем доступность
        button.setAttribute('role', 'button');
        button.setAttribute('tabindex', '0');
        
        // Поддержка клавиатуры
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    console.log(`✅ CTA buttons initialized for ${ctaButtons.length} buttons`);
}

// ===== ОПТИМИЗАЦИЯ ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ =====
function optimizeForMobile() {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return;
    }
    
    console.log('📱 Optimizing for mobile devices');
    
    // Улучшаем области касания
    const touchElements = document.querySelectorAll('.btn, .faq-question, .journal-link, .burger-btn');
    touchElements.forEach(el => {
        el.style.minHeight = '44px';
        el.style.minWidth = '44px';
        el.style.touchAction = 'manipulation';
    });
    
    // Улучшаем производительность скролла
    document.body.style.webkitOverflowScrolling = 'touch';
    
    // Предотвращаем масштабирование при двойном тапе
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    console.log('✅ Mobile optimization complete');
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
    
    // Фоновые слои - ГАРАНТИРУЕМ НОРМАЛЬНЫЙ МАСШТАБ (CONTAIN)
    const bgLayers = document.querySelectorAll('.parallax-bg-layer');
    const activeBg = window.backgroundSwitcher?.getCurrentBackground() || 0;
    bgLayers.forEach((layer, index) => {
        if (index === activeBg) {
            layer.style.opacity = '1';
            layer.style.zIndex = '-1000';
            layer.style.backgroundSize = 'contain !important';
        } else {
            layer.style.opacity = '0';
            layer.style.zIndex = '-1001';
            layer.style.backgroundSize = 'contain !important';
        }
        layer.style.transform = 'scale(1) !important';
    });
    
    console.log(`✅ Made ${animatedElements.length + sections.length + bgLayers.length} elements visible with CONTAIN scale`);
}

// ===== ОБРАБОТЧИК ОШИБОК =====
function initializeErrorHandling() {
    // Обработка ошибок загрузки изображений
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`⚠️ Failed to load image: ${this.src}`);
            this.style.opacity = '0.5';
            this.style.filter = 'grayscale(1)';
            
            // Пытаемся показать placeholder если есть
            if (!this.hasAttribute('data-error-handled')) {
                this.setAttribute('data-error-handled', 'true');
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiMxRTE5MkIiLz4KICA8cGF0aCBkPSJNMTUwIDE1MEgyNTBNMjAwIDEwMFYyMDAiIHN0cm9rZT0iIzMzNjZDQyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+';
            }
        });
    });
    
    console.log('✅ Error handling initialized');
}

// ===== ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ СТРАНИЦЫ =====
function initializeHomePage() {
    console.log('📄 INITIALIZING HOME PAGE WITH NORMAL BACKGROUNDS - CONTAIN MODE');
    
    try {
        // 1. Инициализация системы смены фона
        window.backgroundSwitcher = new BackgroundSwitcher();
        console.log('✅ Background switcher initialized with CONTAIN (normal photos)');
        
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
            initializeFaqAccordion();
            initializeSmoothScroll();
            initializeCtaButtons();
            initializeErrorHandling();
            optimizeForMobile();
            
            console.log('✅ Home page fully initialized');
            console.log('🎯 Normal background switching (CONTAIN mode):');
            console.log('   • Photos will show at NORMAL size, not zoomed');
            console.log('   • No cropping or excessive zoom');
            console.log('   • Hero & Expertise → BG1');
            console.log('   • Projects & Stats → BG2');
            console.log('   • Services → BG3');
            console.log('   • Journals, FAQ, CTA → BG4');
            
            // Финальная проверка
            ensureAllContentVisible();
        }, 500);
        
    } catch (error) {
        console.error('❌ Failed to initialize home page:', error);
        
        // Аварийное восстановление
        const bgLayers = document.querySelectorAll('.parallax-bg-layer');
        if (bgLayers.length > 0) {
            bgLayers[0].style.opacity = '1';
            bgLayers[0].style.zIndex = '-1000';
            bgLayers[0].style.transform = 'scale(1) !important';
            bgLayers[0].style.backgroundSize = 'contain !important';
            
            for (let i = 1; i < bgLayers.length; i++) {
                bgLayers[i].style.opacity = '0';
                bgLayers[i].style.zIndex = '-1001';
                bgLayers[i].style.backgroundSize = 'contain !important';
            }
        }
        
        // Показываем хотя бы контент
        document.querySelectorAll('.fade-in-down, .fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translate(0, 0)';
        });
    }
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
    console.log('🔧 Manually fixing background scale to CONTAIN (normal size)...');
    
    const bgLayers = document.querySelectorAll('.parallax-bg-layer');
    if (bgLayers.length === 0) return false;
    
    bgLayers.forEach(layer => {
        layer.style.transform = 'scale(1) !important';
        layer.style.backgroundSize = 'contain !important';
        layer.style.backgroundPosition = 'center center !important';
        layer.style.backgroundRepeat = 'no-repeat !important';
    });
    
    console.log(`✅ Fixed scale for ${bgLayers.length} background layers (CONTAIN - normal size)`);
    return true;
};

// Функция для принудительного обновления всей страницы
window.refreshHomePage = function() {
    console.log('🔄 Refreshing home page...');
    
    if (window.backgroundSwitcher) {
        window.backgroundSwitcher.ensureBackgroundVisible();
    }
    
    ensureAllContentVisible();
    
    // Переинициализируем счетчики
    initializeStatsCounter();
    
    console.log('✅ Home page refreshed');
};

// Функция для открытия/закрытия FAQ
window.toggleFaq = function(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    if (index >= 0 && index < faqItems.length) {
        faqItems[index].querySelector('.faq-question')?.click();
    }
};

// Экспорт функций
window.homePage = {
    initialize: initializeHomePage,
    switchBackground,
    nextBackground,
    prevBackground,
    getCurrentBackground,
    fixBackgroundScale,
    refresh: refreshHomePage,
    toggleFaq
};

// Автоматическое исправление масштаба через 2 секунды после загрузки
window.addEventListener('load', () => {
    setTimeout(() => {
        if (window.fixBackgroundScale) {
            window.fixBackgroundScale();
        }
    }, 2000);
});

// Обработчик для ресайза окна с debounce
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.backgroundSwitcher) {
            window.backgroundSwitcher.fixAllBackgroundScale();
        }
    }, 250);
});

// Экспортируем для использования в других файлах
export { 
    BackgroundSwitcher, 
    initializeHomePage,
    switchBackground,
    nextBackground,
    prevBackground,
    getCurrentBackground,
    fixBackgroundScale
};

console.log('✅ home.js fully loaded - CONTAIN BACKGROUND SCALE ENABLED (NORMAL PHOTOS)');
