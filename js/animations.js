console.log('🚀 Animations.js loaded - ENHANCED ANIMATIONS');

// Безопасные методы для работы с DOM
class SafeDOM {
    static querySelector(selector) {
        try {
            return document.querySelector(selector);
        } catch (error) {
            console.warn(`⚠️ Invalid selector: ${selector}`, error);
            return null;
        }
    }
    
    static querySelectorAll(selector) {
        try {
            return document.querySelectorAll(selector);
        } catch (error) {
            console.warn(`⚠️ Invalid selector: ${selector}`, error);
            return [];
        }
    }
    
    static addClass(element, className) {
        if (element && element.classList) {
            element.classList.add(className);
        }
    }
    
    static removeClass(element, className) {
        if (element && element.classList) {
            element.classList.remove(className);
        }
    }
    
    static toggleClass(element, className) {
        if (element && element.classList) {
            element.classList.toggle(className);
        }
    }
}

// ===== FAQ МЕНЕДЖЕР =====
class FAQManager {
    constructor() {
        this.faqItems = [];
        this.init();
    }
    
    init() {
        console.log('🎯 Initializing FAQ Manager...');
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.initializeFAQ(), 100);
            });
        } else {
            setTimeout(() => this.initializeFAQ(), 100);
        }
    }
    
    initializeFAQ() {
        this.faqItems = SafeDOM.querySelectorAll('.faq-item');
        
        if (this.faqItems.length === 0) {
            console.warn('❌ No FAQ items found');
            return;
        }
        
        console.log(`✅ Found ${this.faqItems.length} FAQ items`);
        
        // Инициализируем состояние FAQ
        this.initializeFAQState();
        
        // Настраиваем обработчики кликов
        this.setupEventListeners();
        
        // Добавляем глобальные функции
        this.setupGlobalFunctions();
        
        console.log('✅ FAQ Manager initialized successfully');
    }
    
    initializeFAQState() {
        this.faqItems.forEach((item, index) => {
            if (!item) return;
            
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = question ? question.querySelector('i') : null;
            
            // Устанавливаем уникальные ID для доступности
            if (question) {
                question.id = `faq-question-${index}`;
                question.setAttribute('aria-expanded', 'false');
                question.setAttribute('aria-controls', `faq-answer-${index}`);
                question.setAttribute('tabindex', '0');
                question.setAttribute('role', 'button');
            }
            
            if (answer) {
                answer.id = `faq-answer-${index}`;
                answer.setAttribute('aria-labelledby', `faq-question-${index}`);
                answer.setAttribute('role', 'region');
                answer.setAttribute('aria-hidden', 'true');
                
                // Гарантируем что ответ изначально скрыт
                answer.style.display = 'none';
                answer.style.maxHeight = '0';
                answer.style.opacity = '0';
                answer.style.overflow = 'hidden';
                answer.style.paddingTop = '0';
                answer.style.paddingBottom = '0';
                answer.style.marginTop = '0';
                answer.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            }
            
            // Настраиваем иконку (плюс)
            if (icon) {
                icon.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            }
            
            // Убираем активный класс если он есть
            SafeDOM.removeClass(item, 'active');
        });
    }
    
    setupEventListeners() {
        this.faqItems.forEach((item) => {
            if (!item) return;
            
            const question = item.querySelector('.faq-question');
            
            if (question) {
                // Удаляем старые обработчики
                const newQuestion = question.cloneNode(true);
                if (question.parentNode) {
                    question.parentNode.replaceChild(newQuestion, question);
                }
                
                // Добавляем новые обработчики
                newQuestion.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggleFAQ(item);
                });
                
                // Поддержка клавиатуры
                newQuestion.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                        e.preventDefault();
                        this.toggleFAQ(item);
                    }
                });
                
                // Оптимизация для мобильных
                newQuestion.addEventListener('touchstart', () => {
                    SafeDOM.addClass(item, 'touch-active');
                }, { passive: true });
                
                newQuestion.addEventListener('touchend', () => {
                    setTimeout(() => {
                        SafeDOM.removeClass(item, 'touch-active');
                    }, 150);
                });
                
                newQuestion.addEventListener('touchcancel', () => {
                    SafeDOM.removeClass(item, 'touch-active');
                });
            }
        });
    }
    
    toggleFAQ(item) {
        if (!item) return;
        
        const isActive = item.classList.contains('active');
        const question = item.querySelector('.faq-question');
        console.log(`📖 FAQ toggle: ${isActive ? 'Closing' : 'Opening'}`, question?.textContent?.trim());
        
        if (isActive) {
            this.closeFAQ(item);
        } else {
            // Закрываем все другие FAQ перед открытием нового
            this.closeAllFAQ();
            this.openFAQ(item);
        }
    }
    
    openFAQ(item) {
        if (!item) return;
        
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question ? question.querySelector('i') : null;
        
        // Активируем элемент
        SafeDOM.addClass(item, 'active');
        
        // Обновляем атрибуты доступности
        if (question) {
            question.setAttribute('aria-expanded', 'true');
        }
        
        if (answer) {
            answer.setAttribute('aria-hidden', 'false');
            
            // Анимируем открытие
            answer.style.display = 'block';
            
            // Используем requestAnimationFrame для плавной анимации
            requestAnimationFrame(() => {
                const fullHeight = answer.scrollHeight;
                answer.style.maxHeight = fullHeight + 'px';
                answer.style.opacity = '1';
                answer.style.paddingTop = '15px';
                answer.style.paddingBottom = '30px';
                answer.style.marginTop = '15px';
            });
        }
        
        // Анимируем иконку (плюс → крестик)
        if (icon) {
            icon.style.transform = 'rotate(45deg)';
            icon.style.color = '#66b5ff';
        }
    }
    
    closeFAQ(item) {
        if (!item) return;
        
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question ? question.querySelector('i') : null;
        
        // Деактивируем элемент
        SafeDOM.removeClass(item, 'active');
        
        // Обновляем атрибуты доступности
        if (question) {
            question.setAttribute('aria-expanded', 'false');
        }
        
        if (answer) {
            answer.setAttribute('aria-hidden', 'true');
            
            // Анимируем закрытие
            answer.style.maxHeight = '0';
            answer.style.opacity = '0';
            answer.style.paddingTop = '0';
            answer.style.paddingBottom = '0';
            answer.style.marginTop = '0';
            
            // После анимации скрываем полностью
            setTimeout(() => {
                answer.style.display = 'none';
            }, 500);
        }
        
        // Анимируем иконку (крестик → плюс)
        if (icon) {
            icon.style.transform = 'rotate(0deg)';
            icon.style.color = 'rgba(255, 255, 255, 0.7)';
        }
    }
    
    closeAllFAQ() {
        this.faqItems.forEach(item => {
            if (item && item.classList.contains('active')) {
                this.closeFAQ(item);
            }
        });
    }
    
    openAllFAQ() {
        this.faqItems.forEach(item => {
            if (item) this.openFAQ(item);
        });
    }
    
    setupGlobalFunctions() {
        // Глобальные функции для управления FAQ
        window.openAllFAQ = () => {
            this.openAllFAQ();
            console.log(`✅ All FAQ items opened`);
        };
        
        window.closeAllFAQ = () => {
            this.closeAllFAQ();
            console.log(`✅ All FAQ items closed`);
        };
        
        window.openFAQ = (index) => {
            if (this.faqItems[index]) {
                this.openFAQ(this.faqItems[index]);
            }
        };
        
        window.closeFAQ = (index) => {
            if (this.faqItems[index]) {
                this.closeFAQ(this.faqItems[index]);
            }
        };
        
        window.toggleFAQ = (index) => {
            if (this.faqItems[index]) {
                this.toggleFAQ(this.faqItems[index]);
            }
        };
        
        // Функция для тестирования
        window.testFAQ = () => {
            console.log(`📋 FAQ Test: ${this.faqItems.length} items found`);
            this.faqItems.forEach((item, index) => {
                if (!item) return;
                const isActive = item.classList.contains('active');
                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');
                console.log(`Item ${index}: ${isActive ? 'Active' : 'Inactive'} - "${question?.textContent?.trim()}"`);
            });
        };
    }
}

// ===== МЕНЕДЖЕР ОСНОВНЫХ АНИМАЦИЙ (БЕЗ ХЕДЕРА) =====
class AnimationsManager {
    constructor() {
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.init();
    }
    
    init() {
        console.log('🎬 Initializing Animations Manager (without header)...');
        
        try {
            // Инициализируем все анимации КРОМЕ хедера
            this.initializeAllAnimations();
            
            // Настраиваем обработчики событий
            this.setupEventListeners();
            
            // Оптимизация для мобильных
            if (this.isMobile) {
                this.optimizeForMobile();
            }
            
            console.log('✅ Animations Manager initialized (header management disabled)');
        } catch (error) {
            console.error('❌ Error in Animations Manager:', error);
        }
    }
    
    initializeAllAnimations() {
        // Немедленная загрузка всего контента
        this.immediateLoadAllContent();
        
        // Анимации счетчиков
        this.initializeCounters();
        
        // Анимации при скролле (без хедера)
        this.initializeScrollAnimations();
        
        // Эффекты при наведении
        this.initializeHoverEffects();
    }
    
    immediateLoadAllContent() {
        console.log('⚡ Loading all content immediately...');
        
        try {
            // Все анимированные элементы
            const animatedElements = SafeDOM.querySelectorAll(
                '.fade-in, .fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right, .scale-in'
            );
            
            animatedElements.forEach(el => {
                if (!el) return;
                el.style.opacity = '1';
                el.style.transform = 'translate(0, 0) scale(1)';
                el.style.animationPlayState = 'running';
            });
            
            // Все секции
            const sections = SafeDOM.querySelectorAll('section');
            sections.forEach(section => {
                if (section) SafeDOM.addClass(section, 'loaded');
            });
            
            // Карточки
            const cards = SafeDOM.querySelectorAll('.project-card, .service-item, .journal-item, .stat-card');
            cards.forEach(card => {
                if (!card) return;
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
            
            // Блоки экспертизы
            const expertiseBlocks = SafeDOM.querySelectorAll('.expertise-vertical-block');
            expertiseBlocks.forEach((block, index) => {
                if (!block) return;
                setTimeout(() => {
                    block.style.opacity = '1';
                    block.style.transform = 'translateX(0)';
                }, index * 100);
            });
            
            console.log(`✅ Immediately loaded ${animatedElements.length + cards.length + expertiseBlocks.length} elements`);
            
        } catch (error) {
            console.error('❌ Error in immediate content loading:', error);
        }
    }
    
    initializeCounters() {
        const counters = SafeDOM.querySelectorAll('.stat-number');
        
        if (counters.length === 0) return;
        
        counters.forEach(counter => {
            if (!counter) return;
            const target = parseInt(counter.getAttribute('data-count')) || 0;
            if (target > 0) {
                // Плавный счетчик
                this.animateCounter(counter, target);
            } else {
                // Просто показываем значение
                counter.textContent = target;
            }
        });
        
        console.log(`✅ Initialized ${counters.length} counters`);
    }
    
    animateCounter(element, target) {
        if (!element) return;
        
        let current = 0;
        const increment = target / 50; // 50 кадров анимации
        const duration = 1500; // 1.5 секунды
        
        const updateCounter = () => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                SafeDOM.addClass(element, 'animated');
                return;
            }
            
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        };
        
        // Запускаем с небольшой задержкой
        setTimeout(updateCounter, 300);
    }
    
    initializeScrollAnimations() {
        if (!('IntersectionObserver' in window)) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    SafeDOM.addClass(entry.target, 'in-view');
                    
                    // Специальная обработка для разных элементов
                    if (entry.target.classList.contains('expertise-vertical-block')) {
                        this.animateExpertiseBlock(entry.target);
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        // Наблюдаем за всеми анимируемыми элементами (КРОМЕ хедера)
        const elements = SafeDOM.querySelectorAll(
            '.expertise-vertical-block, .project-card, .service-item, .journal-item, .faq-item, .stat-card'
        );
        
        elements.forEach(el => {
            if (el) observer.observe(el);
        });
        
        console.log(`✅ Scroll animations initialized for ${elements.length} elements (header excluded)`);
    }
    
    animateExpertiseBlock(block) {
        if (!block) return;
        
        const number = block.querySelector('.expertise-number');
        const title = block.querySelector('.expertise-title');
        const description = block.querySelector('.expertise-description');
        const features = block.querySelectorAll('.expertise-features li');
        
        if (number) {
            number.style.transform = 'scale(1)';
            number.style.opacity = '1';
        }
        
        if (title) {
            title.style.opacity = '1';
            title.style.transform = 'translateX(0)';
        }
        
        if (description) {
            description.style.opacity = '1';
            description.style.transform = 'translateX(0)';
        }
        
        features.forEach((feature, index) => {
            if (!feature) return;
            setTimeout(() => {
                feature.style.opacity = '1';
                feature.style.transform = 'translateX(0)';
            }, index * 50);
        });
    }
    
    initializeHoverEffects() {
        // Карточки проектов
        const projectCards = SafeDOM.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            if (!card) return;
            
            card.addEventListener('mouseenter', () => {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
            });
        });
        
        // Элементы услуг
        const serviceItems = SafeDOM.querySelectorAll('.service-item');
        serviceItems.forEach(item => {
            if (!item) return;
            
            item.addEventListener('mouseenter', () => {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                item.style.transform = 'translateY(-5px)';
            });
            
            item.addEventListener('mouseleave', () => {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                item.style.transform = 'translateY(0)';
            });
        });
        
        console.log(`✅ Hover effects initialized for ${projectCards.length} cards and ${serviceItems.length} services`);
    }
    
    setupEventListeners() {
        // Ресайз окна
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
        
        // Обработка касаний для мобильных
        if (this.isMobile) {
            document.addEventListener('touchstart', () => {}, { passive: true });
        }
    }
    
    handleResize() {
        // Обновляем высоту открытых FAQ
        const openFAQs = SafeDOM.querySelectorAll('.faq-item.active');
        openFAQs.forEach(item => {
            if (!item) return;
            const answer = item.querySelector('.faq-answer');
            if (answer && answer.style.display === 'block') {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    }
    
    optimizeForMobile() {
        console.log('📱 Optimizing for mobile devices');
        
        // Добавляем класс для мобильных стилей
        SafeDOM.addClass(document.body, 'mobile-view');
        
        // Упрощаем анимации
        if (window.matchMedia('(max-width: 768px)').matches) {
            const style = document.createElement('style');
            style.textContent = `
                /* Упрощенные анимации для мобильных */
                .project-card,
                .service-item,
                .expertise-vertical-block,
                .faq-item,
                .journal-item {
                    transition: transform 0.2s ease !important;
                }
                
                .project-card:hover,
                .service-item:hover,
                .expertise-vertical-block:hover,
                .faq-item:hover {
                    transform: none !important;
                }
                
                .btn:hover {
                    transform: translateY(-1px) !important;
                }
                
                /* Улучшенная обработка касаний */
                .faq-question {
                    -webkit-tap-highlight-color: rgba(255, 255, 255, 0.1);
                    touch-action: manipulation;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Улучшаем FAQ для мобильных
        this.optimizeFAQForMobile();
    }
    
    optimizeFAQForMobile() {
        const faqItems = SafeDOM.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            if (!item) return;
            const question = item.querySelector('.faq-question');
            if (question) {
                question.style.cursor = 'pointer';
                question.style.webkitTapHighlightColor = 'rgba(255, 255, 255, 0.1)';
            }
        });
        
        console.log(`✅ Optimized ${faqItems.length} FAQ items for mobile`);
    }
}

// ===== ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ (БЕЗ ХЕДЕР АНИМАЦИЙ) =====
function initializeAll() {
    console.log('🚀 Starting animations initialization (NO HEADER MANAGEMENT)...');
    
    try {
        // Инициализируем FAQ менеджер
        window.faqManager = new FAQManager();
        
        // Инициализируем основной менеджер анимаций (без хедера)
        window.animationsManager = new AnimationsManager();
        
        // Добавляем глобальный класс
        SafeDOM.addClass(document.body, 'animations-loaded');
        SafeDOM.addClass(document.body, 'all-content-loaded');
        
        // Финальная проверка
        setTimeout(() => {
            console.log('✅ All animations initialized successfully');
            console.log('🎯 FAQ System: READY');
            console.log('🎯 Main Animations System: READY');
            console.log('🎯 Header Management: DISABLED (handled by main.js)');
        }, 500);
        
    } catch (error) {
        console.error('❌ Fatal error during initialization:', error);
    }
}

// ===== ОБРАБОТЧИКИ ЗАГРУЗКИ =====

// Обработка предпочтений reduced-motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    SafeDOM.addClass(document.body, 'reduced-motion');
    
    const style = document.createElement('style');
    style.textContent = `
        .reduced-motion *,
        .reduced-motion *::before,
        .reduced-motion *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        .reduced-motion .fade-in-down,
        .reduced-motion .fade-in-up,
        .reduced-motion .fade-in-left,
        .reduced-motion .fade-in-right {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
        }
        
        .reduced-motion .faq-answer {
            transition: none !important;
        }
        
        .reduced-motion .faq-item .faq-answer {
            max-height: 0 !important;
            opacity: 0 !important;
            padding: 0 !important;
        }
        
        .reduced-motion .faq-item.active .faq-answer {
            max-height: 500px !important;
            opacity: 1 !important;
            padding: 15px 30px 30px 30px !important;
        }
        
        .reduced-motion .faq-question i {
            transform: rotate(0deg) !important;
        }
        
        .reduced-motion .faq-item.active .faq-question i {
            transform: rotate(45deg) !important;
        }
    `;
    document.head.appendChild(style);
}

// Запускаем инициализацию
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            initializeAll();
        }, 100);
    });
} else {
    setTimeout(() => {
        initializeAll();
    }, 100);
}

// ===== ГЛОБАЛЬНЫЕ ФУНКЦИИ ДЛЯ ДЕБАГГИНГА =====
window.debugAnimations = function() {
    console.log('🔍 Debug Information (Animations):');
    console.log('-------------------');
    console.log('FAQ Items:', SafeDOM.querySelectorAll('.faq-item').length);
    console.log('Active FAQ Items:', SafeDOM.querySelectorAll('.faq-item.active').length);
    console.log('Animations Manager:', window.animationsManager ? '✅ Loaded' : '❌ Not loaded');
    console.log('FAQ Manager:', window.faqManager ? '✅ Loaded' : '❌ Not loaded');
    console.log('Body Classes:', document.body.className);
    console.log('Reduced Motion:', window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    
    // Информация о хедере
    const header = document.getElementById('main-header');
    if (header) {
        console.log('Header Scroll Manager:', 'main.js (animations.js disabled header management)');
    }
};

window.resetAnimations = function() {
    console.log('🔄 Resetting animations...');
    
    // Сбрасываем FAQ
    const faqItems = SafeDOM.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        if (!item) return;
        SafeDOM.removeClass(item, 'active');
        const answer = item.querySelector('.faq-answer');
        if (answer) {
            answer.style.display = 'none';
            answer.style.maxHeight = '0';
            answer.style.opacity = '0';
            answer.style.paddingTop = '0';
            answer.style.paddingBottom = '0';
            answer.style.marginTop = '0';
        }
        
        const icon = item.querySelector('.faq-question i');
        if (icon) {
            icon.style.transform = 'rotate(0deg)';
        }
    });
    
    console.log('✅ Animations reset complete');
};

// Экспорт для глобального использования
window.Animations = {
    init: initializeAll,
    debug: window.debugAnimations,
    reset: window.resetAnimations,
    openAllFAQ: () => window.openAllFAQ?.(),
    closeAllFAQ: () => window.closeAllFAQ?.(),
    testFAQ: () => window.testFAQ?.(),
};

console.log('✅ animations.js loaded - HEADER MANAGEMENT DISABLED');
