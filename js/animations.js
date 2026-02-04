console.log('🚀 Animations.js loaded - ENHANCED WITH HEADER ANIMATIONS');

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

// ===== HEADER ANIMATIONS MANAGER =====
class HeaderAnimationsManager {
    constructor() {
        this.header = document.getElementById('main-header');
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.init();
    }
    
    init() {
        console.log('🎨 Initializing Header Animations Manager...');
        
        if (!this.header) {
            console.warn('❌ Header not found for animations');
            return;
        }
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.initializeHeaderAnimations(), 100);
            });
        } else {
            setTimeout(() => this.initializeHeaderAnimations(), 100);
        }
    }
    
    initializeHeaderAnimations() {
        this.setupHeaderState();
        this.setupHoverAnimations();
        this.setupActiveLinkAnimations();
        this.setupButtonAnimations();
        this.setupScrollAnimations();
        this.setupMobileAnimations();
        
        // Добавляем глобальный класс для готовности анимаций
        SafeDOM.addClass(document.body, 'header-animations-ready');
        
        console.log('✅ Header Animations Manager initialized');
    }
    
    setupHeaderState() {
        // Инициализируем начальное состояние хедера
        SafeDOM.addClass(this.header, 'header-visible');
        
        // Добавляем обработчик для показа хедера при наведении в верхнюю часть
        if (!this.isMobile && window.innerWidth > 900) {
            this.setupHeaderHoverZone();
        }
        
        console.log('✅ Header state initialized');
    }
    
    setupHeaderHoverZone() {
        const hoverZone = document.createElement('div');
        hoverZone.className = 'header-hover-zone';
        hoverZone.style.position = 'fixed';
        hoverZone.style.top = '0';
        hoverZone.style.left = '0';
        hoverZone.style.width = '100%';
        hoverZone.style.height = '50px';
        hoverZone.style.zIndex = '999';
        hoverZone.style.pointerEvents = 'none';
        hoverZone.style.opacity = '0';
        hoverZone.style.transition = 'opacity 0.3s ease';
        hoverZone.style.background = 'linear-gradient(to bottom, rgba(0,0,0,0.1), transparent)';
        
        document.body.appendChild(hoverZone);
        
        // Показываем хедер при наведении в зону
        document.addEventListener('mousemove', (e) => {
            if (this.header.classList.contains('header-hidden') && e.clientY < 50) {
                hoverZone.style.pointerEvents = 'auto';
                hoverZone.style.opacity = '0.5';
                
                // Показываем хедер
                this.showHeader();
            } else {
                hoverZone.style.opacity = '0';
                setTimeout(() => {
                    hoverZone.style.pointerEvents = 'none';
                }, 300);
            }
        });
        
        // Клик по зоне тоже показывает хедер
        hoverZone.addEventListener('click', () => {
            this.showHeader();
        });
        
        console.log('✅ Header hover zone setup');
    }
    
    setupHoverAnimations() {
        const interactiveElements = this.header.querySelectorAll(
            '.logo, .nav-link, .start-project-btn, .lang-btn, .burger-btn'
        );
        
        interactiveElements.forEach(el => {
            if (!el) return;
            
            // Добавляем плавные transition
            el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.willChange = 'transform, opacity, background-color';
            
            // Эффект нажатия
            el.addEventListener('mousedown', () => {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                el.style.transform = 'translateY(1px) scale(0.98)';
            });
            
            el.addEventListener('mouseup', () => {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                el.style.transform = '';
            });
            
            el.addEventListener('mouseleave', () => {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                el.style.transform = '';
            });
            
            // Эффект ripple для десктопа
            if (!this.isMobile) {
                el.addEventListener('mouseenter', (e) => {
                    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                    
                    // Создаем эффект волны только для кнопок
                    if (el.classList.contains('nav-link') || el.classList.contains('start-project-btn')) {
                        this.createRippleEffect(el, e);
                    }
                });
            }
        });
        
        console.log(`✅ Hover animations setup for ${interactiveElements.length} elements`);
    }
    
    createRippleEffect(element, event) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.top = `${y}px`;
        ripple.style.left = `${x}px`;
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '1';
        ripple.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease';
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        // Запускаем анимацию
        requestAnimationFrame(() => {
            ripple.style.transform = 'translate(-50%, -50%) scale(1)';
            ripple.style.opacity = '0.8';
        });
        
        // Удаляем через время
        setTimeout(() => {
            ripple.style.opacity = '0';
            setTimeout(() => {
                if (ripple.parentNode === element) {
                    element.removeChild(ripple);
                }
            }, 600);
        }, 300);
    }
    
    setupActiveLinkAnimations() {
        // Определяем активную страницу
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = this.header.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            if (!link) return;
            
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                SafeDOM.addClass(link, 'active');
                
                // Добавляем пульсацию для активной ссылки
                setInterval(() => {
                    SafeDOM.toggleClass(link, 'pulse-soft');
                }, 3000);
            }
        });
        
        console.log(`✅ Active link animations setup for ${navLinks.length} links`);
    }
    
    setupButtonAnimations() {
        const startProjectBtn = this.header.querySelector('.start-project-btn');
        const langBtns = this.header.querySelectorAll('.lang-btn');
        const burgerBtn = this.header.querySelector('.burger-btn');
        
        // Анимация для кнопки "Начать проект"
        if (startProjectBtn) {
            startProjectBtn.addEventListener('click', () => {
                // Эффект клика
                startProjectBtn.style.transform = 'translateY(1px) scale(0.95)';
                setTimeout(() => {
                    startProjectBtn.style.transform = '';
                }, 150);
            });
        }
        
        // Анимация для переключателя языка
        langBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Эффект клика
                btn.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    btn.style.transform = '';
                }, 150);
            });
        });
        
        // Анимация для бургер-кнопки
        if (burgerBtn) {
            burgerBtn.addEventListener('click', () => {
                SafeDOM.toggleClass(burgerBtn, 'active');
                
                // Эффект клика
                burgerBtn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    burgerBtn.style.transform = '';
                }, 150);
            });
        }
        
        console.log('✅ Button animations setup');
    }
    
    setupScrollAnimations() {
        let lastScroll = 0;
        let ticking = false;
        let isHeaderHidden = false;
        let hideTimeout = null;
        let showTimeout = null;
        
        const updateHeaderOnScroll = () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            const scrollingDown = currentScroll > lastScroll;
            const scrolled = currentScroll > 100;
            const atTop = currentScroll <= 50;
            
            // Обновляем scrolled класс
            if (scrolled && !this.header.classList.contains('scrolled')) {
                SafeDOM.addClass(this.header, 'scrolled');
            } else if (!scrolled && this.header.classList.contains('scrolled')) {
                SafeDOM.removeClass(this.header, 'scrolled');
            }
            
            // Всегда показываем хедер вверху
            if (atTop) {
                if (isHeaderHidden) {
                    this.showHeader();
                    isHeaderHidden = false;
                }
                lastScroll = currentScroll;
                ticking = false;
                return;
            }
            
            // Интеллектуальное скрытие/показ
            if (scrollingDown && scrolled && !isHeaderHidden) {
                if (hideTimeout) clearTimeout(hideTimeout);
                hideTimeout = setTimeout(() => {
                    this.hideHeader();
                    isHeaderHidden = true;
                }, 200);
            } else if (!scrollingDown && scrolled && isHeaderHidden) {
                if (showTimeout) clearTimeout(showTimeout);
                showTimeout = setTimeout(() => {
                    this.showHeader();
                    isHeaderHidden = false;
                }, 100);
            }
            
            lastScroll = currentScroll <= 0 ? 0 : currentScroll;
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(updateHeaderOnScroll);
            }
        }, { passive: true });
        
        // Обработка ресайза
        window.addEventListener('resize', () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            if (currentScroll <= 50 && isHeaderHidden) {
                this.showHeader();
                isHeaderHidden = false;
            }
        });
        
        console.log('✅ Scroll animations setup');
    }
    
    setupMobileAnimations() {
        if (!this.isMobile && window.innerWidth > 900) return;
        
        // Упрощенные анимации для мобильных
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 900px) {
                .main-header {
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                               opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                }
                
                .main-header * {
                    transition-duration: 0.2s !important;
                }
                
                .nav-link:hover,
                .start-project-btn:hover,
                .language-switcher:hover {
                    transform: translateY(-1px) !important;
                }
                
                /* Улучшенная обработка касаний */
                .burger-btn,
                .lang-btn,
                .nav-link {
                    -webkit-tap-highlight-color: rgba(255, 255, 255, 0.1);
                    touch-action: manipulation;
                }
            }
        `;
        document.head.appendChild(style);
        
        console.log('✅ Mobile animations optimized');
    }
    
    showHeader() {
        SafeDOM.removeClass(this.header, 'header-hidden');
        SafeDOM.addClass(this.header, 'header-visible');
        
        // Обновляем scrolled класс
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll > 100) {
            SafeDOM.addClass(this.header, 'scrolled');
        }
        
        console.log('⬆️ Header shown');
    }
    
    hideHeader() {
        SafeDOM.removeClass(this.header, 'header-visible');
        SafeDOM.addClass(this.header, 'header-hidden');
        SafeDOM.removeClass(this.header, 'scrolled');
        
        console.log('⬇️ Header hidden');
    }
    
    toggleHeader() {
        if (this.header.classList.contains('header-hidden')) {
            this.showHeader();
        } else {
            this.hideHeader();
        }
    }
    
    // Глобальные функции для управления хедером
    setupGlobalFunctions() {
        window.showHeader = () => this.showHeader();
        window.hideHeader = () => this.hideHeader();
        window.toggleHeader = () => this.toggleHeader();
        window.getHeaderState = () => ({
            isHidden: this.header.classList.contains('header-hidden'),
            isVisible: this.header.classList.contains('header-visible'),
            isScrolled: this.header.classList.contains('scrolled')
        });
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

// ===== МЕНЕДЖЕР ОСНОВНЫХ АНИМАЦИЙ =====
class AnimationsManager {
    constructor() {
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.init();
    }
    
    init() {
        console.log('🎬 Initializing Animations Manager...');
        
        try {
            // Инициализируем все анимации
            this.initializeAllAnimations();
            
            // Настраиваем обработчики событий
            this.setupEventListeners();
            
            // Оптимизация для мобильных
            if (this.isMobile) {
                this.optimizeForMobile();
            }
            
            console.log('✅ Animations Manager initialized');
        } catch (error) {
            console.error('❌ Error in Animations Manager:', error);
        }
    }
    
    initializeAllAnimations() {
        // Немедленная загрузка всего контента
        this.immediateLoadAllContent();
        
        // Анимации счетчиков
        this.initializeCounters();
        
        // Анимации при скролле
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
        
        // Наблюдаем за всеми анимируемыми элементами
        const elements = SafeDOM.querySelectorAll(
            '.expertise-vertical-block, .project-card, .service-item, .journal-item, .faq-item, .stat-card'
        );
        
        elements.forEach(el => {
            if (el) observer.observe(el);
        });
        
        console.log(`✅ Scroll animations initialized for ${elements.length} elements`);
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

// ===== ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ =====
function initializeAll() {
    console.log('🚀 Starting full initialization...');
    
    try {
        // Инициализируем менеджер анимаций хедера
        window.headerAnimationsManager = new HeaderAnimationsManager();
        
        // Инициализируем FAQ менеджер
        window.faqManager = new FAQManager();
        
        // Инициализируем основной менеджер анимаций
        window.animationsManager = new AnimationsManager();
        
        // Добавляем глобальный класс
        SafeDOM.addClass(document.body, 'animations-loaded');
        SafeDOM.addClass(document.body, 'all-content-loaded');
        
        // Настраиваем глобальные функции для хедера
        if (window.headerAnimationsManager) {
            window.headerAnimationsManager.setupGlobalFunctions();
        }
        
        // Финальная проверка
        setTimeout(() => {
            console.log('✅ All systems initialized successfully');
            console.log('🎯 Header Animations System: READY');
            console.log('🎯 FAQ System: READY');
            console.log('🎯 Main Animations System: READY');
            console.log('🎯 Page State: LOADED');
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
        
        /* Упрощенные анимации хедера */
        .reduced-motion .main-header,
        .reduced-motion .main-header * {
            animation: none !important;
            transition: none !important;
        }
        
        .reduced-motion .main-header.header-hidden {
            transform: translateY(-100%) !important;
            opacity: 0 !important;
        }
        
        .reduced-motion .main-header.header-visible {
            transform: translateY(0) !important;
            opacity: 1 !important;
        }
        
        .reduced-motion .burger-btn.active span:nth-child(1) {
            top: 50%;
            transform: translate(-50%, -50%) rotate(45deg) !important;
        }
        
        .reduced-motion .burger-btn.active span:nth-child(2) {
            opacity: 0 !important;
        }
        
        .reduced-motion .burger-btn.active span:nth-child(3) {
            bottom: 50%;
            transform: translate(-50%, 50%) rotate(-45deg) !important;
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
    console.log('🔍 Debug Information:');
    console.log('-------------------');
    console.log('Header Animations Manager:', window.headerAnimationsManager ? '✅ Loaded' : '❌ Not loaded');
    console.log('FAQ Items:', SafeDOM.querySelectorAll('.faq-item').length);
    console.log('Active FAQ Items:', SafeDOM.querySelectorAll('.faq-item.active').length);
    console.log('Animations Manager:', window.animationsManager ? '✅ Loaded' : '❌ Not loaded');
    console.log('FAQ Manager:', window.faqManager ? '✅ Loaded' : '❌ Not loaded');
    console.log('Body Classes:', document.body.className);
    console.log('Reduced Motion:', window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    
    // Информация о хедере
    const header = document.getElementById('main-header');
    if (header) {
        console.log('Header State:', {
            isHidden: header.classList.contains('header-hidden'),
            isVisible: header.classList.contains('header-visible'),
            isScrolled: header.classList.contains('scrolled')
        });
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
    
    // Сбрасываем хедер
    const header = document.getElementById('main-header');
    if (header) {
        SafeDOM.removeClass(header, 'header-hidden');
        SafeDOM.removeClass(header, 'scrolled');
        SafeDOM.addClass(header, 'header-visible');
    }
    
    // Переинициализируем
    if (window.faqManager) {
        window.faqManager.initializeFAQState();
        window.faqManager.setupEventListeners();
    }
    
    if (window.headerAnimationsManager) {
        window.headerAnimationsManager.setupHeaderState();
    }
    
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
    showHeader: () => window.showHeader?.(),
    hideHeader: () => window.hideHeader?.(),
    toggleHeader: () => window.toggleHeader?.(),
    getHeaderState: () => window.getHeaderState?.()
};

console.log('✅ animations.js loaded - COMPLETE SYSTEM READY WITH HEADER ANIMATIONS');
