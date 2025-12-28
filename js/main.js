// Main JavaScript file - Common functionality across all pages
// Optimized for transparent glass header with FIXES for Services/About pages

class DaehaaApp {
    constructor() {
        this.isReducedMotion = window.matchMedia ? 
            window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
        this.headerState = {
            isHidden: false,
            lastScrollY: 0,
            scrollThreshold: 50,
            isMobile: false,
            ticking: false
        };
        this.init();
    }

    init() {
        console.log('🚀 Daehaa App initializing with transparent glass header...');
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupCurrentPage();
        this.setupLanguageSupport();
        this.setupAnimations();
        this.setupMobileOptimizations();
        this.setupFormHandling();
        this.setupLazyLoading();
        this.setupPerformanceOptimizations();
        this.setupHeaderSupport(); // Optimized header logic with FIXES
        this.setupFooterSupport();
        this.setupGlassHeaderEffects();
        this.setupClickableElements();
        this.setupNavigationTracking();
        
        this.initializeExistingFooter();
        
        console.log('✅ Daehaa application initialized');
    }

    setupHeaderSupport() {
        console.log('🔧 Setting up optimized transparent header support with FIXES...');
        
        const header = document.querySelector('.main-header');
        if (!header) {
            console.warn('⚠️ No header found');
            return;
        }
        
        // ===== КРИТИЧЕСКИЙ ФИКС: НЕ ВМЕШИВАЕМСЯ В SERVICES/ABOUT СТРАНИЦЫ =====
        const isServicesPage = document.body.classList.contains('services-page');
        const isAboutPage = document.body.classList.contains('about-page');
        
        if (isServicesPage || isAboutPage) {
            console.log('📄 Services/About page detected - SKIPPING main.js header animations');
            
            // Минимальная настройка - только позиция
            header.style.transition = 'background-color 0.3s ease, box-shadow 0.3s ease';
            header.classList.remove('header-hidden');
            
            if (window.innerWidth > 768) {
                header.style.left = '50%';
                header.style.transform = 'translateX(-50%)';
                header.style.top = '20px';
                header.style.width = 'calc(100% - 40px)';
                header.style.maxWidth = '1400px';
                header.style.margin = '0 auto';
            } else {
                header.style.left = '0';
                header.style.transform = 'translateY(0)';
                header.style.top = '0';
                header.style.width = '100%';
                header.style.maxWidth = '100%';
                header.style.margin = '0';
                header.style.borderRadius = '0';
            }
            
            // Добавляем scrolled класс
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            }
            
            // Без обработчиков скролла
            console.log('✅ Services/About header setup complete (static)');
            return;
        }
        
        // Для остальных страниц - оригинальная логика
        
        // Установка начальных классов для body
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        if (currentPage === 'index.html' || currentPage === '' || currentPage === '/') {
            document.body.classList.add('home-page');
        } else {
            document.body.classList.add('internal-page');
            document.body.classList.add(`${currentPage.replace('.html', '')}-page`);
        }
        
        // Оптимизация производительности хедера
        this.optimizeHeaderPerformance(header);
        
        // Настройка видимости бургер-меню
        this.setupMobileMenuVisibility();
        
        // Устанавливаем начальное состояние
        this.headerState.isMobile = window.innerWidth <= 768;
        this.headerState.lastScrollY = window.scrollY;
        
        // Проверяем тип страницы и настраиваем соответствующую анимацию
        const isHomePage = document.body.classList.contains('home-page');
        
        if (isHomePage) {
            console.log('🏠 Home page - setting up optimized animation');
            this.setupOptimizedHomeHeader(header);
        } else {
            console.log('📄 Internal page - setting up basic animation');
            this.setupOptimizedInternalHeader(header);
        }
    }

    optimizeHeaderPerformance(header) {
        // Применяем оптимизации производительности
        header.style.willChange = 'transform, opacity';
        header.style.backfaceVisibility = 'hidden';
        header.style.contain = 'layout style paint';
        
        header.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    setupMobileMenuVisibility() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (!mobileToggle) return;
        
        // Скрываем бургер-меню на десктопе
        if (window.innerWidth > 768) {
            mobileToggle.style.display = 'none';
            mobileToggle.style.visibility = 'hidden';
            mobileToggle.style.opacity = '0';
            mobileToggle.style.width = '0';
            mobileToggle.style.height = '0';
            mobileToggle.style.pointerEvents = 'none';
        } else {
            mobileToggle.style.display = 'flex';
            mobileToggle.style.visibility = 'visible';
            mobileToggle.style.opacity = '1';
            mobileToggle.style.width = '32px';
            mobileToggle.style.height = '32px';
            mobileToggle.style.pointerEvents = 'auto';
        }
    }

    setupOptimizedHomeHeader(header) {
        const self = this;
        
        function handleScroll() {
            const currentScrollY = window.scrollY;
            
            // Для мобильных - никогда не скрываем
            if (self.headerState.isMobile) {
                header.classList.remove('header-hidden');
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
                self.headerState.lastScrollY = currentScrollY;
                return;
            }
            
            // Десктопная логика
            if (currentScrollY <= self.headerState.scrollThreshold) {
                // Вверху страницы - всегда показываем
                if (self.headerState.isHidden) {
                    header.classList.remove('header-hidden');
                    header.style.opacity = '1';
                    header.style.transform = 'translateX(-50%) translateY(0)';
                    self.headerState.isHidden = false;
                }
            } else if (currentScrollY > self.headerState.lastScrollY && 
                       currentScrollY > self.headerState.scrollThreshold) {
                // Прокрутка вниз - скрываем
                if (!self.headerState.isHidden) {
                    header.classList.add('header-hidden');
                    self.headerState.isHidden = true;
                }
            } else if (currentScrollY < self.headerState.lastScrollY) {
                // Прокрутка вверх - показываем
                if (self.headerState.isHidden) {
                    header.classList.remove('header-hidden');
                    header.style.opacity = '1';
                    header.style.transform = 'translateX(-50%) translateY(0)';
                    self.headerState.isHidden = false;
                }
            }
            
            // Добавляем класс scrolled при прокрутке
            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            self.headerState.lastScrollY = currentScrollY;
        }
        
        // Начальное состояние
        handleScroll();
        
        // Оптимизированный обработчик скролла
        const optimizedScrollHandler = () => {
            if (!self.headerState.ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    self.headerState.ticking = false;
                });
                self.headerState.ticking = true;
            }
        };
        
        window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
        
        // Обработчик наведения - оптимизированный
        header.addEventListener('mouseenter', (e) => {
            e.stopPropagation();
            if (self.headerState.isHidden) {
                header.classList.remove('header-hidden');
                header.style.opacity = '1';
                header.style.transform = 'translateX(-50%) translateY(0)';
                self.headerState.isHidden = false;
            }
        });
        
        // Обработчик изменения размера окна
        window.addEventListener('resize', () => {
            self.headerState.isMobile = window.innerWidth <= 768;
            
            // Управляем видимостью бургер-меню
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            if (mobileToggle) {
                if (self.headerState.isMobile) {
                    // На мобильных показываем
                    mobileToggle.style.display = 'flex';
                    mobileToggle.style.visibility = 'visible';
                    mobileToggle.style.opacity = '1';
                    mobileToggle.style.width = '32px';
                    mobileToggle.style.height = '32px';
                    mobileToggle.style.pointerEvents = 'auto';
                } else {
                    // На десктопе скрываем
                    mobileToggle.style.display = 'none';
                    mobileToggle.style.visibility = 'hidden';
                    mobileToggle.style.opacity = '0';
                    mobileToggle.style.width = '0';
                    mobileToggle.style.height = '0';
                    mobileToggle.style.pointerEvents = 'none';
                }
            }
            
            // Сбрасываем состояние на десктопе
            if (!self.headerState.isMobile && self.headerState.isHidden) {
                header.classList.remove('header-hidden');
                header.style.opacity = '1';
                header.style.transform = 'translateX(-50%) translateY(0)';
                self.headerState.isHidden = false;
            }
            
            // Обновляем позицию хедера
            if (window.innerWidth > 768) {
                header.style.left = '50%';
                header.style.transform = 'translateX(-50%) translateY(0)';
            } else {
                header.style.left = '0';
                header.style.transform = 'translateY(0)';
            }
        });
        
        console.log('✅ Home header animation setup complete');
    }

    setupOptimizedInternalHeader(header) {
        const self = this;
        
        function handleScroll() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY <= 0) {
                header.style.transform = window.innerWidth > 768 ? 'translateX(-50%) translateY(0)' : 'translateY(0)';
                header.classList.remove('header-hidden', 'header-scrolled');
                if (self.headerState.isHidden) {
                    header.style.opacity = '1';
                    self.headerState.isHidden = false;
                }
                return;
            }
            
            // Добавляем класс scrolled при прокрутке
            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            if (currentScrollY > self.headerState.lastScrollY && 
                currentScrollY > self.headerState.scrollThreshold) {
                // Прокрутка вниз - показываем уменьшенный хедер
                if (!self.headerState.isHidden) {
                    header.classList.add('header-scrolled');
                }
            } else if (currentScrollY < self.headerState.lastScrollY) {
                // Прокрутка вверх - показываем нормальный хедер
                header.classList.remove('header-scrolled');
                if (self.headerState.isHidden) {
                    header.classList.remove('header-hidden');
                    header.style.opacity = '1';
                    header.style.transform = window.innerWidth > 768 ? 'translateX(-50%) translateY(0)' : 'translateY(0)';
                    self.headerState.isHidden = false;
                }
            }
            
            self.headerState.lastScrollY = currentScrollY;
        }
        
        // Начальное состояние
        handleScroll();
        
        // Оптимизированный обработчик скролла
        const optimizedScrollHandler = () => {
            if (!self.headerState.ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    self.headerState.ticking = false;
                });
                self.headerState.ticking = true;
            }
        };
        
        window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    }

    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        const mobileOverlay = document.querySelector('.mobile-menu-overlay');
        const body = document.body;

        if (mobileToggle && mainNav) {
            // Сначала скрываем бургер на десктопе
            if (window.innerWidth > 768) {
                mobileToggle.style.display = 'none';
                mobileToggle.style.visibility = 'hidden';
                mobileToggle.style.opacity = '0';
                mobileToggle.style.width = '0';
                mobileToggle.style.height = '0';
                mobileToggle.style.pointerEvents = 'none';
            }
            
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
                e.preventDefault();
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

            // Закрытие по клику снаружи
            document.addEventListener('click', (e) => {
                if (!mainNav.contains(e.target) && 
                    !mobileToggle.contains(e.target) && 
                    mainNav.classList.contains('active')) {
                    mobileToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    if (mobileOverlay) mobileOverlay.classList.remove('active');
                    body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                }
            });

            // Закрытие по Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && mainNav.classList.contains('active')) {
                    mobileToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    if (mobileOverlay) mobileOverlay.classList.remove('active');
                    body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                }
            });

            // Закрытие при изменении размера
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
                    mobileToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    if (mobileOverlay) mobileOverlay.classList.remove('active');
                    body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                }
                
                // Управление видимостью бургер-меню
                if (window.innerWidth > 768) {
                    mobileToggle.style.display = 'none';
                    mobileToggle.style.visibility = 'hidden';
                    mobileToggle.style.opacity = '0';
                    mobileToggle.style.width = '0';
                    mobileToggle.style.height = '0';
                    mobileToggle.style.pointerEvents = 'none';
                } else {
                    mobileToggle.style.display = 'flex';
                    mobileToggle.style.visibility = 'visible';
                    mobileToggle.style.opacity = '1';
                    mobileToggle.style.width = '32px';
                    mobileToggle.style.height = '32px';
                    mobileToggle.style.pointerEvents = 'auto';
                }
            });

            console.log('✅ Mobile menu setup complete');
        } else {
            console.warn('⚠️ Mobile menu elements not found');
        }
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                
                // Обработка ссылок на другие страницы с якорями
                if (href.includes('.html#')) {
                    const [page, section] = href.split('#');
                    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                    const targetPage = page.split('/').pop();
                    
                    // Если мы уже на целевой странице
                    if (currentPage === targetPage || (currentPage === '' && targetPage === 'index.html')) {
                        e.preventDefault();
                        
                        setTimeout(() => {
                            const targetElement = document.querySelector(`#${section}`);
                            if (targetElement) {
                                const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
                                let additionalOffset = 20;
                                
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
                                
                                // Подсвечиваем раздел
                                targetElement.classList.add('highlighted');
                                setTimeout(() => {
                                    targetElement.classList.remove('highlighted');
                                }, 2000);
                                
                                // Обновляем URL
                                history.pushState(null, null, `#${section}`);
                            }
                        }, 100);
                    }
                    return;
                }
                
                // Обработка обычных якорей
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
                    let additionalOffset = 20;
                    
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

                    // Подсвечиваем раздел
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
            
            // Скрываем бургер-меню на десктопе
            if (mobileToggle) {
                mobileToggle.style.display = 'none';
                mobileToggle.style.visibility = 'hidden';
                mobileToggle.style.opacity = '0';
                mobileToggle.style.width = '0';
                mobileToggle.style.height = '0';
            }
        }
    }

    optimizeScrollPerformance() {
        document.addEventListener('scroll', () => {}, {passive: true});
        
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
        
        if ('MutationObserver' in window) {
            const footerObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) {
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

        // Проверяем, не Services/About ли это страница
        const isServicesPage = document.body.classList.contains('services-page');
        const isAboutPage = document.body.classList.contains('about-page');
        
        // Не применяем анимации для Services/About страниц
        if (isServicesPage || isAboutPage) {
            console.log('ℹ️ Services/About page - skipping glass header effects');
            return;
        }

        setTimeout(() => {
            header.classList.add('header-glass-enter');
            
            setTimeout(() => {
                header.classList.remove('header-glass-enter');
            }, 600);
        }, 100);

        header.addEventListener('mouseenter', () => {
            if (!this.isReducedMotion) {
                header.classList.add('glass-morph');
            }
        });

        header.addEventListener('mouseleave', () => {
            header.classList.remove('glass-morph');
        });
    }

    setupClickableElements() {
        console.log('🖱️ Setting up clickable elements...');
        
        document.querySelectorAll('a:not(.btn)').forEach(link => {
            if (!link.classList.contains('clickable-element')) {
                link.classList.add('clickable-element');
            }
        });
        
        document.querySelectorAll('[role="link"], .clickable-element').forEach(element => {
            this.setupClickFeedback(element);
        });
        
        this.setupPageTransitions();
        
        if (document.body.classList.contains('home-page')) {
            this.setupHomeClickableCards();
        }
    }

    setupClickFeedback(element) {
        if (!element.hasAttribute('href') && !element.hasAttribute('onclick')) {
            return;
        }
        
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
        
        if (!element.hasAttribute('role')) {
            element.setAttribute('role', 'link');
        }
        
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
        
        this.enhanceAccessibility(element);
        
        if (!element.classList.contains('no-ripple')) {
            element.addEventListener('click', (e) => {
                this.createRippleEffect(element, e);
            });
        }
    }

    createRippleEffect(element, event) {
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
        let transitionOverlay = document.querySelector('.page-transition');
        
        if (!transitionOverlay) {
            transitionOverlay = document.createElement('div');
            transitionOverlay.className = 'page-transition';
            document.body.appendChild(transitionOverlay);
        }
        
        document.querySelectorAll('a[href^="/"], a[href^="."]').forEach(link => {
            if (link.href && !link.href.includes('#') && !link.target) {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    
                    if (href.startsWith('http') && !href.includes(window.location.hostname)) {
                        return;
                    }
                    
                    if (href.includes('#')) {
                        return;
                    }
                    
                    e.preventDefault();
                    
                    transitionOverlay.classList.add('active');
                    
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                });
            }
        });
    }

    setupHomeClickableCards() {
        const serviceCards = document.querySelectorAll('.speck-service-card-enhanced.clickable-service-card');
        
        serviceCards.forEach(card => {
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
            
            card.addEventListener('click', (e) => {
                e.preventDefault();
                
                card.style.transform = 'translateY(-10px) scale(0.98)';
                
                setTimeout(() => {
                    card.style.transform = '';
                }, 300);
                
                setTimeout(() => {
                    const href = card.getAttribute('href');
                    if (href) {
                        window.location.href = href;
                    }
                }, 350);
            });
            
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });
    }

    setupNavigationTracking() {
        document.querySelectorAll('a[href]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                console.log(`🔗 Navigation: ${href}`);
            });
        });
    }

    initializeExistingFooter() {
        const existingFooter = document.querySelector('.main-footer');
        if (existingFooter && typeof window.initFooter === 'function') {
            console.log('🦶 Found existing footer, initializing...');
            window.initFooter();
        }
    }
}

// Optimized glass header initialization
function initOptimizedGlassHeader() {
    console.log('🔵 Initializing optimized glass header...');
    
    const header = document.querySelector('.main-header');
    if (!header) {
        console.warn('⚠️ No glass header found');
        return;
    }
    
    const isServicesPage = document.body.classList.contains('services-page');
    const isAboutPage = document.body.classList.contains('about-page');
    
    // ВАЖНЫЙ ФИКС: Для Services/About страниц применяем минимальную настройку
    if (isServicesPage || isAboutPage) {
        console.log('ℹ️ Services/About page - applying minimal header setup');
        
        // Отключаем анимации
        header.style.transition = 'background-color 0.3s ease, box-shadow 0.3s ease';
        header.classList.remove('header-hidden');
        
        // Устанавливаем правильную позицию
        if (window.innerWidth > 768) {
            header.style.left = '50%';
            header.style.transform = 'translateX(-50%)';
            header.style.top = '20px';
        } else {
            header.style.left = '0';
            header.style.transform = 'translateY(0)';
            header.style.top = '0';
        }
        
        console.log('✅ Services/About header setup complete');
        return;
    }
    
    // Для остальных страниц применяем обычную логику
    header.style.willChange = 'opacity';
    header.style.backfaceVisibility = 'hidden';
    
    // Добавляем анимацию входа
    setTimeout(() => {
        header.classList.add('header-glass-enter');
        
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
    
    console.log('✅ Optimized glass header initialized');
}

// Update active navigation
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

// Global footer initialization
window.initFooter = function() {
    console.log('🦶 Footer component initialized');
    
    const footer = document.querySelector('.main-footer');
    if (footer) {
        console.log('🦶 Found footer element, setting up functionality...');
        
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

// Enhanced component loading
window.loadComponentWithInit = function(url, containerId, fallbackHtml = '', initFunctionName = null) {
    return fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${url}: ${response.status}`);
            return response.text();
        })
        .then(html => {
            document.getElementById(containerId).innerHTML = html;
            
            if (containerId === 'footer-container' && typeof window.initFooter === 'function') {
                setTimeout(window.initFooter, 50);
            }
            
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

// Utility functions
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

window.generateId = function(prefix = 'id') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

window.formatNumber = function(num, options = {}) {
    const defaults = {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        useGrouping: true
    };
    
    return new Intl.NumberFormat('ru-RU', { ...defaults, ...options }).format(num);
};

window.formatDate = function(date, options = {}) {
    const defaults = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    
    const d = date instanceof Date ? date : new Date(date);
    return new Intl.DateTimeFormat('ru-RU', { ...defaults, ...options }).format(d);
};

window.copyToClipboard = async function(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
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

window.getUrlParams = function() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    
    for (const [key, value] of params.entries()) {
        result[key] = value;
    }
    
    return result;
};

window.setUrlParam = function(key, value) {
    const url = new URL(window.location);
    
    if (value === null || value === undefined) {
        url.searchParams.delete(key);
    } else {
        url.searchParams.set(key, value);
    }
    
    window.history.replaceState({}, '', url.toString());
};

// Lazy initialization helper
function lazyInit(selector, callback, options = {}) {
    const {
        rootMargin = '0px 0px 100px 0px',
        threshold = 0.1,
        once = true
    } = options;
    
    if (!('IntersectionObserver' in window)) {
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

// Export all functions
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
    lazyInit: lazyInit
};

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Global error caught:', e.error);
    
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
    console.log('🚀 Daehaa application initialized with transparent glass header and FIXES for Services/About pages');
});

// Global header initialization
window.initHeader = function() {
    if (window.DaehaaApp) {
        window.DaehaaApp.setupMobileMenu();
        window.DaehaaApp.setupCurrentPage();
        window.DaehaaApp.setupLanguageSupport();
    }
};

// Automatic optimized glass header initialization with FIXES for Services/About
document.addEventListener('DOMContentLoaded', function() {
    const checkHeaderInterval = setInterval(() => {
        const header = document.querySelector('.main-header');
        if (header) {
            clearInterval(checkHeaderInterval);
            initOptimizedGlassHeader();
            updateActiveNav();
        }
    }, 100);
    
    setTimeout(() => {
        const header = document.querySelector('.main-header');
        if (header && !header.classList.contains('header-initialized')) {
            initOptimizedGlassHeader();
            updateActiveNav();
            header.classList.add('header-initialized');
        }
    }, 2000);
});

// Export functions for global use
window.initOptimizedGlassHeader = initOptimizedGlassHeader;
window.updateActiveNav = updateActiveNav;

// Module exports
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DaehaaApp: window.DaehaaApp,
        initOptimizedGlassHeader,
        updateActiveNav
    };
}

console.log('✅ main.js loaded with transparent glass header support and FIXES for Services/About pages');
