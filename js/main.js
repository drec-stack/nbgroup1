// Main JavaScript file - Common functionality across all pages

class DaehaaApp {
    constructor() {
        this.isReducedMotion = window.matchMedia ? 
            window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupCurrentPage();
        this.setupLanguageSupport();
        this.setupAnimations();
        this.setupMobileOptimizations();
        this.setupFormHandling();
        this.setupLazyLoading();
        this.setupPerformanceOptimizations();
        this.setupHeaderSupport();
        this.setupFooterSupport();
        this.setupGlassHeaderEffects();
        this.setupClickableElements();
        this.setupNavigationTracking();
        
        // Принудительная инициализация подвала при загрузке
        this.initializeExistingFooter();
        
        console.log('🚀 Daehaa application initialized');
    }

    setupGlassHeaderEffects() {
        const header = document.querySelector('.main-header');
        if (!header) return;

        // Add glass animation on load
        setTimeout(() => {
            header.classList.add('header-glass-enter');
            
            // Remove animation class after it completes
            setTimeout(() => {
                header.classList.remove('header-glass-enter');
            }, 600);
        }, 100);

        // Add hover effect for glass morphism
        header.addEventListener('mouseenter', () => {
            if (!this.isReducedMotion) {
                header.classList.add('glass-morph');
            }
        });

        header.addEventListener('mouseleave', () => {
            header.classList.remove('glass-morph');
        });

        // Smooth scroll behavior for home page
        const isHomePage = document.body.classList.contains('home-page');
        if (isHomePage) {
            let lastScroll = 0;
            const scrollThreshold = 50;
            
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                const opacity = Math.max(0, Math.min(1, 1 - (currentScroll - scrollThreshold) / 100));
                
                header.style.opacity = opacity.toString();
                
                if (currentScroll > 150 && currentScroll > lastScroll) {
                    header.classList.add('header-glass-exit');
                } else if (currentScroll < lastScroll || currentScroll <= scrollThreshold) {
                    header.classList.remove('header-glass-exit');
                    header.classList.add('header-glass-enter');
                }
                
                lastScroll = currentScroll;
            }, { passive: true });
        }
    }

    setupClickableElements() {
        console.log('🖱️ Setting up clickable elements...');
        
        // 1. Добавляем класс всем ссылкам для улучшения обратной связи
        document.querySelectorAll('a:not(.btn)').forEach(link => {
            if (!link.classList.contains('clickable-element')) {
                link.classList.add('clickable-element');
            }
        });
        
        // 2. Инициализируем все кликабельные элементы
        document.querySelectorAll('[role="link"], .clickable-element').forEach(element => {
            this.setupClickFeedback(element);
        });
        
        // 3. Настройка плавных переходов между страницами
        this.setupPageTransitions();
        
        // 4. Инициализация кликабельных карточек услуг на главной
        if (document.body.classList.contains('home-page')) {
            this.setupHomeClickableCards();
        }
    }

    setupClickFeedback(element) {
        // Проверяем, является ли элемент действительно кликабельным
        if (!element.hasAttribute('href') && !element.hasAttribute('onclick')) {
            return;
        }
        
        // Добавляем keyboard navigation
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
        
        // Добавляем атрибуты доступности
        if (!element.hasAttribute('role')) {
            element.setAttribute('role', 'link');
        }
        
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
        
        // Добавляем aria-label если его нет
        this.enhanceAccessibility(element);
        
        // Ripple эффект при клике (только для элементов без запрета)
        if (!element.classList.contains('no-ripple')) {
            element.addEventListener('click', (e) => {
                this.createRippleEffect(element, e);
            });
        }
    }

    createRippleEffect(element, event) {
        // Создаем ripple эффект
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
            pointer-events: none;
            z-index: 1;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        // Удаляем ripple после анимации
        setTimeout(() => {
            if (ripple.parentNode === element) {
                element.removeChild(ripple);
            }
        }, 600);
    }

    enhanceAccessibility(element) {
        if (!element.hasAttribute('aria-label') && element.hasAttribute('href')) {
            const href = element.getAttribute('href');
            let label = '';
            
            if (href === 'index.html' || href === '/' || href === '' || href === '#') {
                label = 'Перейти на главную страницу';
            } else if (href.includes('services.html')) {
                if (href.includes('#')) {
                    const section = href.split('#')[1];
                    label = `Перейти к разделу ${section} на странице услуг`;
                } else {
                    label = 'Перейти на страницу услуг';
                }
            } else if (href.includes('portfolio.html')) {
                label = 'Перейти в портфолио';
            } else if (href.includes('about.html')) {
                label = 'Перейти на страницу о нас';
            } else if (href.includes('contacts.html')) {
                label = 'Перейти на страницу контактов';
            } else if (href.includes('brandbook.html')) {
                label = 'Перейти в брендбук';
            } else if (href.startsWith('#')) {
                label = 'Прокрутить к разделу на этой странице';
            } else if (href.startsWith('http')) {
                label = 'Перейти по внешней ссылке';
            } else {
                label = 'Перейти по ссылке';
            }
            
            element.setAttribute('aria-label', label);
        }
    }

    setupPageTransitions() {
        // Создаем overlay для transition между страницами
        let transitionOverlay = document.querySelector('.page-transition');
        
        if (!transitionOverlay) {
            transitionOverlay = document.createElement('div');
            transitionOverlay.className = 'page-transition';
            document.body.appendChild(transitionOverlay);
        }
        
        // Обработка кликов на внутренние ссылки
        document.querySelectorAll('a[href^="/"], a[href^="."]').forEach(link => {
            if (link.href && !link.href.includes('#') && !link.target) {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    
                    // Исключаем внешние ссылки и якоря
                    if (href.startsWith('http') && !href.includes(window.location.hostname)) {
                        return;
                    }
                    
                    if (href.includes('#')) {
                        return;
                    }
                    
                    e.preventDefault();
                    
                    // Показываем overlay
                    transitionOverlay.classList.add('active');
                    
                    // Переходим через 300ms
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                });
            }
        });
    }

    setupHomeClickableCards() {
        // Специальная обработка для карточек услуг на главной
        const serviceCards = document.querySelectorAll('.speck-service-card-enhanced.clickable-service-card');
        
        serviceCards.forEach(card => {
            // Добавляем улучшенную анимацию при hover
            card.addEventListener('mouseenter', () => {
                if (!this.isReducedMotion) {
                    card.style.transform = 'translateY(-15px)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (!this.isReducedMotion) {
                    card.style.transform = '';
                }
            });
            
            // Анимация при клике
            card.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Анимация нажатия
                card.style.transform = 'translateY(-10px) scale(0.98)';
                
                // Восстанавливаем через 300ms
                setTimeout(() => {
                    card.style.transform = '';
                }, 300);
                
                // Переход через 350ms
                setTimeout(() => {
                    const href = card.getAttribute('href');
                    if (href) {
                        window.location.href = href;
                    }
                }, 350);
            });
            
            // Keyboard support
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });
    }

    setupNavigationTracking() {
        // Отслеживание кликов по навигации для аналитики
        document.querySelectorAll('a[href]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                console.log(`🔗 Navigation: ${href}`);
                
                // Можно добавить Google Analytics здесь
                // if (typeof gtag === 'function') {
                //     gtag('event', 'navigation_click', {
                //         'event_category': 'engagement',
                //         'event_label': href
                //     });
                // }
            });
        });
    }

    initializeExistingFooter() {
        // Немедленная инициализация подвала если он уже есть в DOM
        const existingFooter = document.querySelector('.main-footer');
        if (existingFooter && typeof window.initFooter === 'function') {
            console.log('🦶 Found existing footer, initializing...');
            window.initFooter();
        }
    }

    setupFooterSupport() {
        console.log('🦶 Setting up footer support...');
        
        // Автоматическая инициализация подвала при его загрузке
        if ('MutationObserver' in window) {
            const footerObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) {
                            // Проверяем сам элемент или его детей
                            if (node.classList && node.classList.contains('.main-footer')) {
                                console.log('🦶 Footer added to DOM, initializing...');
                                this.initializeFooter(node);
                            } else if (node.querySelector) {
                                const footer = node.querySelector('.main-footer');
                                if (footer) {
                                    console.log('🦶 Footer found in added node, initializing...');
                                    this.initializeFooter(footer);
                                }
                            }
                        }
                    });
                });
            });

            footerObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
        }

        // Также проверяем при полной загрузке DOM
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                const footer = document.querySelector('.main-footer');
                if (footer && typeof window.initFooter === 'function') {
                    console.log('🦶 DOM loaded, initializing footer...');
                    window.initFooter();
                }
            }, 500);
        });
    }

    initializeFooter(footerElement) {
        if (typeof window.initFooter === 'function') {
            setTimeout(() => {
                window.initFooter();
            }, 100);
        }
    }

    setupHeaderSupport() {
        // Для главной страницы - специальная логика скрытия/показа
        const isHomePage = document.body.classList.contains('home-page');
        if (isHomePage) {
            console.log('🏠 Home page - enabling glass header hide on scroll');
            this.setupHomeHeaderAnimation();
            return;
        }
        
        // Для остальных страниц используем базовую логику
        if (document.querySelector('.main-header')) {
            this.setupBasicHeaderAnimation();
        }
    }

    setupHomeHeaderAnimation() {
        const header = document.querySelector('.main-header');
        if (!header) return;

        const scrollThreshold = 50;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= scrollThreshold) {
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
                header.classList.remove('header-hidden', 'header-glass-exit');
                header.classList.add('header-glass-enter');
            } else {
                const opacity = Math.max(0, Math.min(1, 1 - (currentScroll - scrollThreshold) / 100));
                header.style.opacity = opacity.toString();
                
                if (opacity <= 0.1) {
                    header.classList.add('header-hidden');
                    header.classList.add('header-glass-exit');
                    header.classList.remove('header-glass-enter');
                } else {
                    header.classList.remove('header-hidden');
                }
            }
        }, { passive: true });

        if (window.pageYOffset > scrollThreshold) {
            const opacity = Math.max(0, Math.min(1, 1 - (window.pageYOffset - scrollThreshold) / 100));
            header.style.opacity = opacity.toString();
            
            if (opacity <= 0.1) {
                header.classList.add('header-hidden');
                header.classList.add('header-glass-exit');
                header.classList.remove('header-glass-enter');
            }
        }
    }

    setupBasicHeaderAnimation() {
        const header = document.querySelector('.main-header');
        if (!header) return;

        let lastScroll = 0;
        const scrollThreshold = 100;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.style.transform = 'translateY(0px)';
                header.classList.remove('header-hidden', 'header-scrolled');
                return;
            }
            
            if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
                header.classList.remove('header-hidden');
                header.classList.add('header-scrolled');
            } else if (currentScroll < lastScroll) {
                header.classList.remove('header-hidden');
                header.classList.remove('header-scrolled');
            }
            
            lastScroll = currentScroll;
        }, { passive: true });
    }

    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        const mobileOverlay = document.querySelector('.mobile-menu-overlay');
        const body = document.body;

        if (mobileToggle && mainNav) {
            const toggleMenu = () => {
                const isActive = mainNav.classList.contains('active');
                
                mobileToggle.classList.toggle('active');
                mainNav.classList.toggle('active');
                if (mobileOverlay) mobileOverlay.classList.toggle('active');
                body.style.overflow = isActive ? '' : 'hidden';
                
                if (!isActive) {
                    document.documentElement.style.overflow = 'hidden';
                } else {
                    document.documentElement.style.overflow = '';
                }
            };

            mobileToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleMenu();
            });

            const navLinks = mainNav.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    if (mobileOverlay) mobileOverlay.classList.remove('active');
                    body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                });
            });

            if (mobileOverlay) {
                mobileOverlay.addEventListener('click', () => {
                    mobileToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    mobileOverlay.classList.remove('active');
                    body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                });
            }

            document.addEventListener('click', (e) => {
                if (!mainNav.contains(e.target) && !mobileToggle.contains(e.target) && mainNav.classList.contains('active')) {
                    mobileToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    if (mobileOverlay) mobileOverlay.classList.remove('active');
                    body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                }
            });

            window.addEventListener('orientationchange', () => {
                setTimeout(() => {
                    mobileToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    if (mobileOverlay) mobileOverlay.classList.remove('active');
                    body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                }, 300);
            });

            window.addEventListener('resize', () => {
                if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
                    mobileToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    if (mobileOverlay) mobileOverlay.classList.remove('active');
                    body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                }
            });
        }
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                // Обработка ссылок на services.html#section
                const href = this.getAttribute('href');
                
                // Если ссылка ведет на другую страницу с якорем
                if (href.includes('.html#')) {
                    const [page, section] = href.split('#');
                    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                    const targetPage = page.split('/').pop();
                    
                    // Если мы уже на нужной странице
                    if (currentPage === targetPage || (currentPage === '' && targetPage === 'index.html')) {
                        e.preventDefault();
                        
                        // Скроллим к секции на текущей странице
                        setTimeout(() => {
                            const targetElement = document.querySelector(`#${section}`);
                            if (targetElement) {
                                const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
                                let additionalOffset = 20;
                                
                                // Для страницы услуг учитываем навигацию
                                if (currentPage === 'services.html' || currentPage === 'services') {
                                    const servicesNav = document.querySelector('.services-nav');
                                    if (servicesNav) {
                                        additionalOffset += servicesNav.offsetHeight;
                                    }
                                }
                                
                                const targetPosition = targetElement.offsetTop - headerHeight - additionalOffset;
                                
                                window.scrollTo({
                                    top: targetPosition,
                                    behavior: 'smooth'
                                });
                                
                                // Подсветка секции
                                targetElement.classList.add('highlighted');
                                setTimeout(() => {
                                    targetElement.classList.remove('highlighted');
                                }, 2000);
                                
                                // Обновляем URL
                                history.pushState(null, null, `#${section}`);
                            }
                        }, 100);
                    }
                    // Если это переход на другую страницу, позволить браузеру обработать
                    return;
                }
                
                // Обработка обычных якорей на текущей странице
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
                    let additionalOffset = 20;
                    
                    // Для страницы услуг учитываем навигацию
                    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                    if (currentPage === 'services.html' || currentPage === 'services') {
                        const servicesNav = document.querySelector('.services-nav');
                        if (servicesNav) {
                            additionalOffset += servicesNav.offsetHeight;
                        }
                    }
                    
                    const targetPosition = targetElement.offsetTop - headerHeight - additionalOffset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Подсветка секции
                    targetElement.classList.add('highlighted');
                    setTimeout(() => {
                        targetElement.classList.remove('highlighted');
                    }, 2000);
                    
                    history.pushState(null, null, targetId);
                }
            });
        });
    }

    setupCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    setupLanguageSupport() {
        window.addEventListener('languageChanged', (e) => {
            console.log('Language changed to:', e.detail.lang);
            this.setupCurrentPage();
            this.updateLanguageSwitcherUI(e.detail.lang);
        });

        this.setupLanguageSwitcherUI();
    }

    setupLanguageSwitcherUI() {
        // ТОЛЬКО обновление UI, переключение языка делает i18n.js
        const currentLang = localStorage.getItem('preferredLang') || 'ru';
        this.updateLanguageSwitcherUI(currentLang);
    }

    updateLanguageSwitcherUI(lang) {
        const langBtns = document.querySelectorAll('.lang-btn');
        const switcher = document.querySelector('.language-switcher');
        
        langBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        if (switcher) {
            switcher.setAttribute('data-current-lang', lang);
        }
    }

    setupAnimations() {
        this.setupScrollAnimations();
        this.setupParallax();
        this.setupCounters();
    }

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right');
        
        if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const delay = entry.target.getAttribute('data-delay') || 0;
                        
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0) translateX(0)';
                            entry.target.classList.add('animated');
                        }, parseInt(delay));
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animatedElements.forEach(el => {
                if (el.classList.contains('fade-in')) {
                    el.style.opacity = '0';
                } else if (el.classList.contains('slide-up')) {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(30px)';
                } else if (el.classList.contains('slide-left')) {
                    el.style.opacity = '0';
                    el.style.transform = 'translateX(-30px)';
                } else if (el.classList.contains('slide-right')) {
                    el.style.opacity = '0';
                    el.style.transform = 'translateX(30px)';
                }
                
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        }
    }

    setupParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length > 0) {
            const handleParallax = () => {
                const scrolled = window.pageYOffset;
                
                parallaxElements.forEach(el => {
                    const parallaxSpeed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
                    const yPos = -(scrolled * parallaxSpeed);
                    el.style.transform = `translateY(${yPos}px)`;
                });
            };

            window.addEventListener('scroll', handleParallax, { passive: true });
        }
    }

    setupCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        if (counters.length > 0 && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            counters.forEach(counter => observer.observe(counter));
        }
    }

    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
                counter.classList.add('counter-animate');
            }
            counter.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    setupMobileOptimizations() {
        document.addEventListener('touchstart', function() {}, {passive: true});
        
        if ('connection' in navigator && navigator.connection.saveData === true) {
            document.documentElement.classList.add('save-data');
        }
        
        if ('connection' in navigator && navigator.connection.effectiveType.includes('2g')) {
            document.documentElement.classList.add('slow-connection');
        }

        this.optimizeForMobile();
    }

    optimizeForMobile() {
        if (this.isLowPerformanceDevice()) {
            document.documentElement.classList.add('reduced-animations');
        }

        this.enhanceTouchInteractions();
    }

    isLowPerformanceDevice() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const memory = navigator.deviceMemory || 4;
        const cores = navigator.hardwareConcurrency || 4;
        
        return isMobile && (memory < 4 || cores < 4);
    }

    enhanceTouchInteractions() {
        document.addEventListener('touchstart', function() {}, {passive: true});
        
        document.addEventListener('touchmove', function(e) {
            if (e.target.tagName.match(/button|a|input|select|textarea/i)) {
                e.preventDefault();
            }
        }, {passive: false});
    }

    setupFormHandling() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            this.setupForm(form.id);
        });
    }

    setupForm(formId, successCallback) {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                if (!this.validateForm(form)) {
                    return;
                }
                
                const formData = new FormData(form);
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (window.i18n ? window.i18n.getTranslation('contact.form.sending') : 'Sending...');
                submitBtn.disabled = true;
                
                try {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                    this.showNotification(
                        window.i18n ? window.i18n.getTranslation('contact.form.success') : 'Message sent successfully! We\'ll get back to you soon.', 
                        'success'
                    );
                    
                    form.reset();
                    
                    this.resetFormValidation(form);
                    
                    if (successCallback) successCallback();
                    
                } catch (error) {
                    this.showNotification(
                        window.i18n ? window.i18n.getTranslation('contact.form.error') : 'Error sending message. Please try again.', 
                        'error'
                    );
                } finally {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            });
            
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => {
                    if (input.parentElement.classList.contains('invalid')) {
                        this.validateField(input);
                    }
                });
            });
        }
    }

    validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const formGroup = field.parentElement;
        
        formGroup.classList.remove('valid', 'invalid');
        
        if (field.hasAttribute('required') && !value) {
            formGroup.classList.add('invalid');
            return false;
        }
        
        if (!value) return true;
        
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(value)) {
                formGroup.classList.add('valid');
                return true;
            } else {
                formGroup.classList.add('invalid');
                return false;
            }
        }
        
        if (field.type === 'tel') {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
            if (phoneRegex.test(value) && value.replace(/\D/g, '').length >= 10) {
                formGroup.classList.add('valid');
                return true;
            } else {
                formGroup.classList.add('invalid');
                return false;
            }
        }
        
        if (field.hasAttribute('required') && value) {
            formGroup.classList.add('valid');
            return true;
        }
        
        return true;
    }

    resetFormValidation(form) {
        const formGroups = form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('valid', 'invalid', 'focused');
        });
    }

    showNotification(message, type = 'info') {
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        });

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close" aria-label="Close notification">&times;</button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[data-src]');
            
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    setupPerformanceOptimizations() {
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        this.optimizeScrollPerformance();

        this.preloadCriticalResources();
    }

    handleResize() {
        if (window.innerWidth > 768) {
            const mobileMenu = document.querySelector('.main-nav');
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }

    optimizeScrollPerformance() {
        document.addEventListener('scroll', () => {}, { passive: true });
        
        this.throttleScrollAnimations();
    }

    throttleScrollAnimations() {
        let ticking = false;
        
        const updateOnScroll = () => {
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        }, { passive: true });
    }

    preloadCriticalResources() {
        const criticalResources = [];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            document.head.appendChild(link);
        });
    }

    loadComponent(containerId, componentPath) {
        return fetch(componentPath)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(html => {
                document.getElementById(containerId).innerHTML = html;
                this.init();
            })
            .catch(error => {
                console.error('Error loading component:', error);
            });
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            this.handleError(e.error);
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.handleError(e.reason);
        });
    }

    handleError(error) {
        console.error('Application error:', error);
    }
}

// ===== GLASS HEADER FUNCTIONS =====

// Функция для инициализации стеклянного хедера
function initGlassHeader() {
    console.log('🔵 Initializing glass header...');
    
    const header = document.querySelector('.main-header');
    if (!header) {
        console.warn('⚠️ No glass header found');
        return;
    }
    
    const isHomePage = document.body.classList.contains('home-page');
    const isInternalPage = document.body.classList.contains('internal-page');
    
    if (isHomePage) {
        // Логика для главной страницы
        initHomeGlassHeader(header);
    } else if (isInternalPage) {
        // Логика для внутренних страниц (services.html, about.html и т.д.)
        initInternalGlassHeader(header);
    } else {
        // Базовая логика для других страниц
        initDefaultGlassHeader(header);
    }
    
    // Добавляем анимацию появления
    setTimeout(() => {
        header.classList.add('header-glass-enter');
        
        // Убираем класс после завершения анимации
        setTimeout(() => {
            header.classList.remove('header-glass-enter');
        }, 600);
    }, 100);
    
    // Эффект морфинга при наведении
    header.addEventListener('mouseenter', () => {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            header.classList.add('glass-morph');
        }
    });
    
    header.addEventListener('mouseleave', () => {
        header.classList.remove('glass-morph');
    });
    
    console.log('✅ Glass header initialized');
}

// Логика для главной страницы
function initHomeGlassHeader(header) {
    console.log('🏠 Home page glass header logic');
    
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
}

// Логика для внутренних страниц
function initInternalGlassHeader(header) {
    console.log('📄 Internal page glass header logic');
    
    let lastScrollY = window.scrollY;
    const scrollThreshold = 100;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY <= 0) {
            header.style.transform = 'translateY(0px)';
            header.classList.remove('header-hidden', 'header-scrolled');
            return;
        }
        
        if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
            // Scrolling down - show minimized header
            header.classList.remove('header-hidden');
            header.classList.add('header-scrolled');
        } else if (currentScrollY < lastScrollY) {
            // Scrolling up - show normal header
            header.classList.remove('header-hidden');
            header.classList.remove('header-scrolled');
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Применяем начальное состояние
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
}

// Базовая логика для других страниц
function initDefaultGlassHeader(header) {
    console.log('📄 Default glass header logic');
    
    let lastScrollY = window.scrollY;
    const scrollThreshold = 50;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY <= scrollThreshold) {
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
            header.classList.remove('header-hidden');
        } else if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
            // Scrolling down - hide header
            header.classList.add('header-hidden');
        } else if (currentScrollY < lastScrollY) {
            // Scrolling up - show header
            header.classList.remove('header-hidden');
        }
        
        lastScrollY = currentScrollY;
    }
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
}

// Функция для обновления активного состояния навигации
function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Global footer initialization function
window.initFooter = function() {
    console.log('🦶 Footer component initialized');
    
    // Check if footer exists and initialize its functionality
    const footer = document.querySelector('.main-footer');
    if (footer) {
        console.log('🦶 Found footer element, setting up functionality...');
        
        // Setup Intersection Observer for footer animations
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            const footerSections = footer.querySelectorAll('.footer-section');
            footerSections.forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(section);
            });
        }
        
        console.log('🦶 Footer functionality initialized successfully');
    } else {
        console.warn('🦶 No footer element found for initialization');
    }
};

// Enhanced component loading with auto-initialization
window.loadComponentWithInit = function(url, containerId, fallbackHtml = '', initFunctionName = null) {
    return fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${url}: ${response.status}`);
            return response.text();
        })
        .then(html => {
            document.getElementById(containerId).innerHTML = html;
            
            // Auto-initialize footer if it's a footer component
            if (containerId === 'footer-container' && typeof window.initFooter === 'function') {
                setTimeout(window.initFooter, 50);
            }
            
            // Call specific init function if provided
            if (initFunctionName && typeof window[initFunctionName] === 'function') {
                setTimeout(window[initFunctionName], 100);
            }
            
            return true;
        })
        .catch(error => {
            console.error('Component loading error:', error);
            if (fallbackHtml) {
                document.getElementById(containerId).innerHTML = fallbackHtml;
            }
            return false;
        });
};

// ===== SPECK BLOCKS ANIMATION INITIALIZATION =====
function initSpeckBlocksAnimations() {
    console.log('✨ Инициализация анимаций Speck блоков...');
    
    // Добавляем класс для активации анимаций после загрузки
    setTimeout(() => {
        document.body.classList.add('speck-animations-loaded');
    }, 1000);
    
    // Настраиваем индексы для стрелок
    const featureItems = document.querySelectorAll('.speck-feature-item');
    featureItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });
    
    // Observer для анимаций при скролле
    if ('IntersectionObserver' in window) {
        const columnObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-animated');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        const columns = document.querySelectorAll('.speck-feature-column');
        columns.forEach(column => {
            columnObserver.observe(column);
        });
    }
    
    // Анимация появления колонок
    setTimeout(() => {
        const columns = document.querySelectorAll('.speck-feature-column');
        columns.forEach((column, index) => {
            setTimeout(() => {
                column.style.animationPlayState = 'running';
            }, index * 100);
        });
    }, 500);
    
    console.log('✅ Анимации Speck блоков инициализированы');
}

// ===== SPECK BLOCKS ENHANCED INTERACTIVITY =====
function initEnhancedSpeckBlocks() {
    console.log('🎨 Инициализация улучшенных Speck блоков...');
    
    const speckBlocks = document.querySelectorAll('.speck-vertical-block');
    if (!speckBlocks.length) return;
    
    // Инициализируем каждую колонку
    const featureColumns = document.querySelectorAll('.speck-feature-column');
    featureColumns.forEach(column => {
        if (!column.classList.contains('clickable-column')) {
            column.classList.add('clickable-column');
        }
        
        // Добавляем атрибуты доступности
        if (!column.hasAttribute('tabindex')) {
            column.setAttribute('tabindex', '0');
        }
        
        if (!column.hasAttribute('role')) {
            column.setAttribute('role', 'button');
        }
        
        // Добавляем aria-label
        const columnTitle = column.querySelector('.speck-column-title');
        if (columnTitle && !column.hasAttribute('aria-label')) {
            const blockTitle = column.closest('.speck-vertical-block')?.querySelector('.speck-block-title')?.textContent || 'Секция';
            column.setAttribute('aria-label', `Перейти к ${columnTitle.textContent} в разделе ${blockTitle}`);
        }
        
        // Обработчики событий
        column.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Анимация клика
            this.classList.add('column-clicked');
            setTimeout(() => {
                this.classList.remove('column-clicked');
            }, 300);
            
            // Определяем целевой раздел
            const block = this.closest('.speck-vertical-block');
            const blockIndex = block ? block.getAttribute('data-block-index') : '0';
            const blockTitles = ['strategy', 'design', 'engineering', 'manufacturing'];
            const blockTitle = blockTitles[parseInt(blockIndex)] || 'services';
            
            // Переход через 350ms
            setTimeout(() => {
                window.location.href = `services.html#${blockTitle}`;
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
            const block = this.closest('.speck-vertical-block');
            if (block) {
                block.classList.add('block-hovered');
            }
        });
        
        column.addEventListener('mouseleave', function() {
            const block = this.closest('.speck-vertical-block');
            if (block) {
                block.classList.remove('block-hovered');
            }
        });
        
        // Фокус для доступности
        column.addEventListener('focus', function() {
            this.classList.add('column-focused');
            const block = this.closest('.speck-vertical-block');
            if (block) {
                block.classList.add('block-hovered');
            }
        });
        
        column.addEventListener('blur', function() {
            this.classList.remove('column-focused');
            const block = this.closest('.speck-vertical-block');
            if (block) {
                block.classList.remove('block-hovered');
            }
        });
    });
    
    console.log(`✅ Инициализировано ${speckBlocks.length} блоков с ${featureColumns.length} колонками`);
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    window.DaehaaApp = new DaehaaApp();
    console.log('🚀 Daehaa application initialized');
    
    // Инициализируем анимации Speck блоков если они есть на странице
    if (document.querySelector('.speck-vertical-section')) {
        initSpeckBlocksAnimations();
        initEnhancedSpeckBlocks();
    }
});

// Global header initialization
window.initHeader = function() {
    if (window.DaehaaApp) {
        window.DaehaaApp.setupMobileMenu();
        window.DaehaaApp.setupCurrentPage();
        window.DaehaaApp.setupLanguageSupport();
    }
};

// Автоматическая инициализация стеклянного хедера при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем наличие хедера и инициализируем
    const checkHeaderInterval = setInterval(() => {
        const header = document.querySelector('.main-header');
        if (header) {
            clearInterval(checkHeaderInterval);
            initGlassHeader();
            updateActiveNav();
        }
    }, 100);
    
    // Также проверяем через 2 секунды на всякий случай
    setTimeout(() => {
        const header = document.querySelector('.main-header');
        if (header && !header.classList.contains('header-initialized')) {
            initGlassHeader();
            updateActiveNav();
            header.classList.add('header-initialized');
        }
    }, 2000);
});

// Экспортируем функции для глобального использования
window.initGlassHeader = initGlassHeader;
window.updateActiveNav = updateActiveNav;
window.initSpeckBlocksAnimations = initSpeckBlocksAnimations;
window.initEnhancedSpeckBlocks = initEnhancedSpeckBlocks;

// Экспортируем класс DaehaaApp для использования в других модулях
window.DaehaaApp = DaehaaApp;

// Module exports
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DaehaaApp;
                                    }
