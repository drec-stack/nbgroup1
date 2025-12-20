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
        this.setupHeaderSupport(); // ← Важно! Вызываем настройку хедера
        this.setupFooterSupport();
        this.setupGlassHeaderEffects();
        this.setupClickableElements();
        this.setupNavigationTracking();
        
        // Принудительная инициализация подвала при загрузке
        this.initializeExistingFooter();
        
        console.log('🚀 Daehaa application initialized');
    }

    setupHeaderSupport() {
        console.log('🔧 Setting up header support...');
        
        // Проверяем на какой странице мы находимся
        const isHomePage = document.body.classList.contains('home-page');
        const isServicesPage = document.body.classList.contains('services-page');
        const isInternalPage = document.body.classList.contains('internal-page') || 
                               isServicesPage || 
                               document.body.classList.contains('about-page') ||
                               document.body.classList.contains('portfolio-page') ||
                               document.body.classList.contains('brandbook-page') ||
                               document.body.classList.contains('contacts-page');
        
        const header = document.querySelector('.main-header');
        if (!header) {
            console.warn('⚠️ No header found');
            return;
        }
        
        // Для страницы услуг - НЕ скрываем хедер
        if (isServicesPage) {
            console.log('📄 Services page detected - disabling header hide');
            this.disableHeaderHiding(header);
            return;
        }
        
        // Для главной страницы - специальная логика
        if (isHomePage) {
            console.log('🏠 Home page - enabling glass header hide on scroll');
            this.setupHomeHeaderAnimation(header);
            return;
        }
        
        // Для остальных внутренних страниц - базовая логика
        if (isInternalPage) {
            console.log('📄 Internal page - enabling basic header animation');
            this.setupBasicHeaderAnimation(header);
            return;
        }
        
        // По умолчанию - базовая логика
        console.log('📄 Default page - enabling basic header animation');
        this.setupBasicHeaderAnimation(header);
    }

    disableHeaderHiding(header) {
        // Убираем класс hidden если он есть
        header.classList.remove('header-hidden');
        
        // Гарантируем видимость
        header.style.transform = 'translateY(0)';
        header.style.opacity = '1';
        
        // Отключаем transition для скрытия/показа
        header.style.transition = 'background-color 0.3s ease, box-shadow 0.3s ease';
        
        // Убираем обработчики скролла для скрытия
        // (они будут добавлены в setupBasicHeaderAnimation, но с условием isServicesPage)
        console.log('✅ Header hiding disabled for services page');
    }

    setupHomeHeaderAnimation(header) {
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

    setupBasicHeaderAnimation(header) {
        console.log('📄 Basic header animation logic');
        
        const isServicesPage = document.body.classList.contains('services-page');
        
        // Для страницы услуг - ничего не делаем
        if (isServicesPage) {
            console.log('📄 Services page - skipping basic header animation');
            return;
        }
        
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
                // Scrolling down - hide header
                header.classList.add('header-hidden');
                header.classList.add('header-scrolled');
            } else if (currentScrollY < lastScrollY) {
                // Scrolling up - show header
                header.classList.remove('header-hidden');
                header.classList.remove('header-scrolled');
            }
            
            lastScrollY = currentScrollY;
        }
        
        // Применяем начальное состояние
        handleScroll();
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        console.log('✅ Basic header animation enabled');
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

// ===== ADVANCED ANIMATIONS AND EFFECTS =====

function initAdvancedAnimations() {
    console.log('🎬 Инициализация продвинутых анимаций...');
    
    // Параллакс для фоновых элементов
    const parallaxElements = document.querySelectorAll('.parallax-layer');
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, { passive: true });
    }
    
    // Анимация появления элементов при скролле
    const scrollAnimateElements = document.querySelectorAll('.scroll-animate');
    if (scrollAnimateElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Анимация с задержкой для дочерних элементов
                    const childElements = entry.target.querySelectorAll('.animate-child');
                    childElements.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animated');
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.2 });
        
        scrollAnimateElements.forEach(el => observer.observe(el));
    }
    
    // Анимация волны (wave effect)
    const waveElements = document.querySelectorAll('.wave-effect');
    waveElements.forEach(wave => {
        wave.addEventListener('mouseenter', (e) => {
            const rect = wave.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'wave-ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            wave.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode === wave) {
                    wave.removeChild(ripple);
                }
            }, 600);
        });
    });
    
    console.log('✅ Продвинутые анимации инициализированы');
}

// ===== DYNAMIC BACKGROUND EFFECTS =====

function initDynamicBackgrounds() {
    console.log('🌈 Инициализация динамических фонов...');
    
    // Градиентные анимации
    const gradientElements = document.querySelectorAll('.gradient-animate');
    gradientElements.forEach(element => {
        if (!element.hasAttribute('data-gradient-original')) {
            element.setAttribute('data-gradient-original', 
                getComputedStyle(element).backgroundImage);
        }
        
        element.addEventListener('mouseenter', () => {
            if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
                element.style.backgroundImage = `
                    radial-gradient(circle at 30% 20%, 
                    rgba(var(--primary-rgb), 0.2) 0%,
                    transparent 50%),
                    ${element.getAttribute('data-gradient-original')}
                `;
            }
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.backgroundImage = 
                element.getAttribute('data-gradient-original');
        });
    });
    
    // Динамические тени
    const shadowElements = document.querySelectorAll('.dynamic-shadow');
    shadowElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            element.style.setProperty('--shadow-x', `${x}%`);
            element.style.setProperty('--shadow-y', `${y}%`);
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.removeProperty('--shadow-x');
            element.style.removeProperty('--shadow-y');
        });
    });
    
    console.log('✅ Динамические фоны инициализированы');
}

// ===== REAL-TIME UI UPDATES =====

function initRealTimeUI() {
    console.log('🔄 Инициализация real-time UI обновлений...');
    
    // Обновление времени в реальном времени
    const timeElements = document.querySelectorAll('.real-time');
    if (timeElements.length > 0) {
        function updateTimes() {
            const now = new Date();
            timeElements.forEach(element => {
                if (element.classList.contains('time-local')) {
                    element.textContent = now.toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                } else if (element.classList.contains('date-local')) {
                    element.textContent = now.toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    });
                }
            });
        }
        
        updateTimes();
        setInterval(updateTimes, 60000); // Обновлять каждую минуту
    }
    
    // Счетчики в реальном времени
    const liveCounters = document.querySelectorAll('.live-counter');
    liveCounters.forEach(counter => {
        const target = parseInt(counter.dataset.target) || 100;
        const duration = parseInt(counter.dataset.duration) || 2000;
        const start = Date.now();
        
        function updateCounter() {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // Кубическое замедление
            
            const value = Math.floor(easeProgress * target);
            counter.textContent = value.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
                counter.classList.add('completed');
            }
        }
        
        // Запускаем при появлении в viewport
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        } else {
            updateCounter();
        }
    });
    
    console.log('✅ Real-time UI обновления инициализированы');
}

// ===== ADVANCED TOUCH INTERACTIONS =====

function initAdvancedTouch() {
    console.log('👆 Инициализация продвинутых touch-интеракций...');
    
    // Swipe detection для мобильных устройств
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Определяем направление свайпа
        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Горизонтальный свайп
            if (diffX > 50) {
                // Свайп влево
                document.dispatchEvent(new CustomEvent('swipeLeft'));
            } else if (diffX < -50) {
                // Свайп вправо
                document.dispatchEvent(new CustomEvent('swipeRight'));
            }
        } else {
            // Вертикальный свайп
            if (diffY > 50) {
                // Свайп вверх
                document.dispatchEvent(new CustomEvent('swipeUp'));
            } else if (diffY < -50) {
                // Свайп вниз
                document.dispatchEvent(new CustomEvent('swipeDown'));
            }
        }
        
        touchStartX = 0;
        touchStartY = 0;
    }, { passive: true });
    
    // Обработчики свайпов
    document.addEventListener('swipeLeft', () => {
        console.log('👈 Swipe left detected');
        // Можно использовать для навигации вперед
    });
    
    document.addEventListener('swipeRight', () => {
        console.log('👉 Swipe right detected');
        // Можно использовать для навигации назад
        if (window.history.length > 1) {
            window.history.back();
        }
    });
    
    // Long press detection
    const pressableElements = document.querySelectorAll('.long-press');
    pressableElements.forEach(element => {
        let pressTimer;
        
        element.addEventListener('touchstart', (e) => {
            pressTimer = setTimeout(() => {
                element.dispatchEvent(new CustomEvent('longpress', {
                    bubbles: true,
                    detail: { x: e.touches[0].clientX, y: e.touches[0].clientY }
                }));
            }, 500);
        }, { passive: true });
        
        element.addEventListener('touchend', () => {
            clearTimeout(pressTimer);
        });
        
        element.addEventListener('touchmove', () => {
            clearTimeout(pressTimer);
        }, { passive: true });
        
        element.addEventListener('longpress', (e) => {
            console.log('⏱️ Long press detected', e.detail);
            element.classList.add('long-pressed');
            
            setTimeout(() => {
                element.classList.remove('long-pressed');
            }, 300);
        });
    });
    
    console.log('✅ Продвинутые touch-интеракции инициализированы');
}

// ===== PERFORMANCE MONITORING =====

function initPerformanceMonitoring() {
    console.log('📊 Инициализация мониторинга производительности...');
    
    // Мониторинг FPS
    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 60;
    
    function monitorFPS() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime >= lastTime + 1000) {
            fps = frameCount;
            frameCount = 0;
            lastTime = currentTime;
            
            // Логируем низкий FPS
            if (fps < 30) {
                console.warn(`⚠️ Low FPS detected: ${fps}`);
                
                // Автоматически уменьшаем анимации при низком FPS
                if (!document.documentElement.classList.contains('reduced-animations')) {
                    document.documentElement.classList.add('reduced-animations');
                    console.log('🎬 Automatically reducing animations due to low FPS');
                }
            } else if (fps >= 50 && document.documentElement.classList.contains('reduced-animations')) {
                // Восстанавливаем анимации если FPS улучшился
                document.documentElement.classList.remove('reduced-animations');
            }
        }
        
        requestAnimationFrame(monitorFPS);
    }
    
    // Запускаем мониторинг только если включен debug режим
    if (window.location.search.includes('debug=performance') || 
        localStorage.getItem('performanceMonitoring') === 'true') {
        monitorFPS();
        
        // Мониторинг использования памяти
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                console.log('💾 Memory usage:', {
                    usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1024 / 1024) + 'MB',
                    totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1024 / 1024) + 'MB',
                    jsHeapSizeLimit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024) + 'MB'
                });
            }, 10000);
        }
    }
    
    // Мониторинг загрузки ресурсов
    window.addEventListener('load', () => {
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        const domReadyTime = timing.domComplete - timing.domLoading;
        
        console.log('📈 Performance metrics:', {
            pageLoadTime: Math.round(loadTime) + 'ms',
            domReadyTime: Math.round(domReadyTime) + 'ms',
            totalResources: performance.getEntriesByType('resource').length
        });
        
        // Сохраняем метрики для аналитики
        if (loadTime > 3000) {
            console.warn('🐌 Page load time is high:', loadTime + 'ms');
        }
    });
    
    // Мониторинг изменения размера окна
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            console.log('📱 Window resized to:', {
                width: window.innerWidth,
                height: window.innerHeight,
                devicePixelRatio: window.devicePixelRatio
            });
        }, 250);
    });
    
    console.log('✅ Мониторинг производительности инициализирован');
}

// ===== ACCESSIBILITY ENHANCEMENTS =====

function initAccessibilityEnhancements() {
    console.log('♿ Инициализация улучшений доступности...');
    
    // Keyboard navigation improvements
    document.addEventListener('keydown', (e) => {
        // Skip navigation (переход к основному контенту)
        if (e.key === 'Tab' && e.shiftKey && e.keyCode === 9) {
            const skipLink = document.querySelector('.skip-to-content');
            if (skipLink && document.activeElement === skipLink) {
                e.preventDefault();
                const mainContent = document.querySelector('main');
                if (mainContent) {
                    mainContent.setAttribute('tabindex', '-1');
                    mainContent.focus();
                }
            }
        }
        
        // Escape key closes modals and dropdowns
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal.open, .dropdown.open');
            openModals.forEach(modal => {
                modal.classList.remove('open');
                modal.dispatchEvent(new Event('close'));
            });
            
            // Закрываем мобильное меню
            const mobileMenu = document.querySelector('.main-nav.active');
            if (mobileMenu) {
                const toggle = document.querySelector('.mobile-menu-toggle');
                if (toggle) toggle.click();
            }
        }
        
        // Space bar для кнопок и ссылок
        if (e.key === ' ' && !e.target.matches('input, textarea, [contenteditable]')) {
            const activeElement = document.activeElement;
            if (activeElement.matches('button, a, [role="button"]')) {
                e.preventDefault();
                activeElement.click();
            }
        }
    });
    
    // Focus traps для модальных окон
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        modal.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;
            
            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        });
    });
    
    // Автоматическое объявление изменений для скринридеров
    const liveRegions = document.createElement('div');
    liveRegions.id = 'live-regions';
    liveRegions.setAttribute('aria-live', 'polite');
    liveRegions.setAttribute('aria-atomic', 'true');
    liveRegions.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    `;
    document.body.appendChild(liveRegions);
    
    window.announceToScreenReader = function(message, priority = 'polite') {
        const region = document.getElementById('live-regions');
        if (region) {
            region.setAttribute('aria-live', priority);
            region.textContent = message;
            
            // Очищаем через 1 секунду
            setTimeout(() => {
                region.textContent = '';
            }, 1000);
        }
    };
    
    // Динамическое обновление заголовков страниц
    const updatePageTitle = (newTitle) => {
        document.title = newTitle;
        announceToScreenReader(`Заголовок страницы изменен на: ${newTitle}`);
    };
    
    window.updatePageTitle = updatePageTitle;
    
    // High contrast mode detection
    const contrastMediaQuery = window.matchMedia('(prefers-contrast: high)');
    const updateContrastMode = (e) => {
        if (e.matches) {
            document.documentElement.classList.add('high-contrast');
            console.log('🎨 High contrast mode enabled');
        } else {
            document.documentElement.classList.remove('high-contrast');
        }
    };
    
    updateContrastMode(contrastMediaQuery);
    contrastMediaQuery.addEventListener('change', updateContrastMode);
    
    // Reduce motion detection
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = (e) => {
        if (e.matches) {
            document.documentElement.classList.add('reduced-motion');
            console.log('🎬 Reduced motion preference detected');
        } else {
            document.documentElement.classList.remove('reduced-motion');
        }
    };
    
    updateMotionPreference(motionMediaQuery);
    motionMediaQuery.addEventListener('change', updateMotionPreference);
    
    console.log('✅ Улучшения доступности инициализированы');
}

// ===== NETWORK STATUS MONITORING =====

function initNetworkStatus() {
    console.log('📡 Инициализация мониторинга сети...');
    
    // Проверка онлайн/офлайн статуса
    function updateOnlineStatus() {
        if (navigator.onLine) {
            document.documentElement.classList.remove('offline');
            document.documentElement.classList.add('online');
            
            // Показываем уведомление о восстановлении соединения
            if (window.DaehaaApp && window.DaehaaApp.showNotification) {
                window.DaehaaApp.showNotification(
                    'Соединение восстановлено',
                    'success'
                );
            }
        } else {
            document.documentElement.classList.remove('online');
            document.documentElement.classList.add('offline');
            
            // Показываем предупреждение о потере соединения
            if (window.DaehaaApp && window.DaehaaApp.showNotification) {
                window.DaehaaApp.showNotification(
                    'Отсутствует интернет-соединение. Некоторые функции могут быть недоступны.',
                    'warning'
                );
            }
        }
    }
    
    // Слушаем события изменения статуса сети
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    // Устанавливаем начальный статус
    updateOnlineStatus();
    
    // Мониторинг скорости соединения
    if ('connection' in navigator) {
        const connection = navigator.connection;
        
        function updateConnectionInfo() {
            const info = {
                effectiveType: connection.effectiveType,
                downlink: connection.downlink + ' Mbps',
                rtt: connection.rtt + ' ms',
                saveData: connection.saveData ? 'enabled' : 'disabled'
            };
            
            console.log('📶 Connection info:', info);
            
            // Адаптируем качество контента в зависимости от скорости
            if (connection.effectiveType.includes('2g') || connection.downlink < 1) {
                document.documentElement.classList.add('slow-connection');
                document.documentElement.classList.remove('fast-connection');
            } else if (connection.downlink > 5) {
                document.documentElement.classList.add('fast-connection');
                document.documentElement.classList.remove('slow-connection');
            }
        }
        
        if (connection.addEventListener) {
            connection.addEventListener('change', updateConnectionInfo);
        }
        updateConnectionInfo();
    }
    
    // Retry failed requests
    window.retryWithBackoff = async function(fn, maxRetries = 3) {
        for (let i = 0; i < maxRetries; i++) {
            try {
                return await fn();
            } catch (error) {
                if (i === maxRetries - 1) throw error;
                
                // Exponential backoff
                const delay = Math.pow(2, i) * 1000;
                console.log(`Retry ${i + 1}/${maxRetries} after ${delay}ms`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    };
    
    // Очередь запросов при офлайн режиме
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
        // Используем Background Sync API
        navigator.serviceWorker.ready.then(registration => {
            window.syncQueue = {
                add: async (tag, data) => {
                    await registration.sync.register(tag);
                    // Сохраняем данные в IndexedDB для последующей синхронизации
                    if (window.queueStore) {
                        await window.queueStore.add(data);
                    }
                }
            };
        });
    }
    
    console.log('✅ Мониторинг сети инициализирован');
}

// ===== LAZY INITIALIZATION HELPER =====

function lazyInit(selector, callback, options = {}) {
    const {
        rootMargin = '0px 0px 100px 0px',
        threshold = 0.1,
        once = true
    } = options;
    
    if (!('IntersectionObserver' in window)) {
        // Fallback: инициализируем все сразу
        document.querySelectorAll(selector).forEach(callback);
        return;
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target);
                if (once) {
                    observer.unobserve(entry.target);
                }
            }
        });
    }, { rootMargin, threshold });
    
    document.querySelectorAll(selector).forEach(el => observer.observe(el));
}

// ===== UTILITY FUNCTIONS =====

// Дебаунс функция
window.debounce = function(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(context, args);
    };
};

// Троттлинг функция
window.throttle = function(func, limit) {
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
};

// Генератор уникальных ID
window.generateId = function(prefix = 'id') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Форматирование чисел
window.formatNumber = function(num, options = {}) {
    const defaults = {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        useGrouping: true
    };
    
    return new Intl.NumberFormat('ru-RU', { ...defaults, ...options }).format(num);
};

// Форматирование даты
window.formatDate = function(date, options = {}) {
    const defaults = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    
    const d = date instanceof Date ? date : new Date(date);
    return new Intl.DateTimeFormat('ru-RU', { ...defaults, ...options }).format(d);
};

// Копирование в буфер обмена
window.copyToClipboard = async function(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            // Fallback для старых браузеров
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        }
    } catch (err) {
        console.error('Failed to copy:', err);
        return false;
    }
};

// Проверка видимости элемента
window.isElementVisible = function(element) {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= windowHeight &&
        rect.right <= windowWidth
    );
};

// Получение параметров URL
window.getUrlParams = function() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    
    for (const [key, value] of params.entries()) {
        result[key] = value;
    }
    
    return result;
};

// Установка параметров URL
window.setUrlParam = function(key, value) {
    const url = new URL(window.location);
    
    if (value === null || value === undefined) {
        url.searchParams.delete(key);
    } else {
        url.searchParams.set(key, value);
    }
    
    window.history.replaceState({}, '', url.toString());
};

// ===== EXPORT ALL FUNCTIONS =====

window.DaehaaApp = window.DaehaaApp || {};
window.DaehaaApp.utils = {
    debounce: window.debounce,
    throttle: window.throttle,
    generateId: window.generateId,
    formatNumber: window.formatNumber,
    formatDate: window.formatDate,
    copyToClipboard: window.copyToClipboard,
    isElementVisible: window.isElementVisible,
    getUrlParams: window.getUrlParams,
    setUrlParam: window.setUrlParam,
    lazyInit: lazyInit,
    announceToScreenReader: window.announceToScreenReader,
    updatePageTitle: window.updatePageTitle,
    retryWithBackoff: window.retryWithBackoff
};

// Инициализация всех расширенных функций
window.DaehaaApp.initExtendedFeatures = function() {
    initAdvancedAnimations();
    initDynamicBackgrounds();
    initRealTimeUI();
    initAccessibilityEnhancements();
    initNetworkStatus();
    
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        initAdvancedTouch();
    }
    
    console.log('🚀 Все расширенные функции DaehaaApp инициализированы');
};

// ===== GLOBAL ERROR HANDLER =====

window.addEventListener('error', function(e) {
    console.error('Global error caught:', e.error);
    
    // Отправка ошибок на сервер (если нужно)
    if (window.location.hostname !== 'localhost') {
        const errorData = {
            message: e.error?.message || e.message,
            stack: e.error?.stack,
            url: window.location.href,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
        
        // Можно отправить через Beacon API
        if (navigator.sendBeacon) {
            const blob = new Blob([JSON.stringify(errorData)], { type: 'application/json' });
            navigator.sendBeacon('/api/log-error', blob);
        }
    }
    
    // Показываем пользователю friendly сообщение
    if (window.DaehaaApp && window.DaehaaApp.showNotification) {
        window.DaehaaApp.showNotification(
            'Произошла ошибка. Пожалуйста, обновите страницу или попробуйте позже.',
            'error'
        );
    }
    
    return false;
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    
    // Аналогичная обработка для промисов
    if (window.DaehaaApp && window.DaehaaApp.showNotification) {
        window.DaehaaApp.showNotification(
            'Произошла ошибка при выполнении операции.',
            'error'
        );
    }
});

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

// Автоматическая инициализация всех расширенных функций
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Инициализируем все модули с задержками для предотвращения блокировки
        setTimeout(() => {
            if (window.DaehaaApp.initExtendedFeatures) {
                window.DaehaaApp.initExtendedFeatures();
            }
            
            // Lazy initialization для тяжелых компонентов
            setTimeout(() => {
                // Инициализируем компоненты при их появлении в viewport
                lazyInit('.lazy-component', (element) => {
                    console.log('Lazy loading component:', element);
                    element.classList.add('loaded');
                });
                
                // Lazy load images with better priority
                lazyInit('img[data-src]', (img) => {
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                }, { rootMargin: '200px 0px' });
            }, 500);
        }, 100);
    });
} else {
    setTimeout(() => {
        if (window.DaehaaApp.initExtendedFeatures) {
            window.DaehaaApp.initExtendedFeatures();
        }
    }, 100);
}

// Экспортируем функции для глобального использования
window.initGlassHeader = initGlassHeader;
window.updateActiveNav = updateActiveNav;
window.initSpeckBlocksAnimations = initSpeckBlocksAnimations;
window.initEnhancedSpeckBlocks = initEnhancedSpeckBlocks;
window.initAdvancedAnimations = initAdvancedAnimations;
window.initDynamicBackgrounds = initDynamicBackgrounds;
window.initRealTimeUI = initRealTimeUI;
window.initAdvancedTouch = initAdvancedTouch;
window.initPerformanceMonitoring = initPerformanceMonitoring;
window.initAccessibilityEnhancements = initAccessibilityEnhancements;
window.initNetworkStatus = initNetworkStatus;
window.lazyInit = lazyInit;

// Экспортируем класс DaehaaApp для использования в других модулях
window.DaehaaApp = DaehaaApp;

// Module exports
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DaehaaApp: window.DaehaaApp,
        initGlassHeader,
        updateActiveNav,
        initSpeckBlocksAnimations,
        initEnhancedSpeckBlocks,
        initAdvancedAnimations,
        initDynamicBackgrounds,
        initRealTimeUI,
        initAdvancedTouch,
        initPerformanceMonitoring,
        initAccessibilityEnhancements,
        initNetworkStatus,
        lazyInit
    };
}
