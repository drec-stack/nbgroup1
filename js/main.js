// Main JavaScript file - Common functionality across all pages

class DaehaaApp {
    constructor() {
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
        
        // Принудительная инициализация подвала при загрузке
        this.initializeExistingFooter();
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
                            if (node.classList && node.classList.contains('main-footer')) {
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
            console.log('🏠 Home page - enabling header hide on scroll');
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
                header.classList.remove('header-hidden');
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
                header.style.pointerEvents = 'auto';
            } else {
                header.classList.add('header-hidden');
                header.style.opacity = '0';
                header.style.transform = 'translateY(-100%)';
                header.style.pointerEvents = 'none';
            }
        }, { passive: true });

        if (window.pageYOffset > scrollThreshold) {
            header.classList.add('header-hidden');
            header.style.opacity = '0';
            header.style.transform = 'translateY(-100%)';
            header.style.pointerEvents = 'none';
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
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

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
            this.updateLanguageSwitcher();
        });

        this.setupLanguageSwitcher();
    }

    setupLanguageSwitcher() {
        const langButtons = document.querySelectorAll('.lang-btn');
        const switcher = document.querySelector('.language-switcher');
        
        const currentLang = localStorage.getItem('preferredLang') || 'ru';
        this.updateSwitcherState(currentLang);
        
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const lang = btn.getAttribute('data-lang');
                const currentActive = document.querySelector('.lang-btn.active');
                
                if (currentActive && currentActive.getAttribute('data-lang') === lang) {
                    return;
                }
                
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = 'scale(1)';
                }, 150);
                
                this.updateSwitcherState(lang);
                
                if (window.i18n && window.i18n.smoothSwitchLanguage) {
                    window.i18n.smoothSwitchLanguage(lang);
                } else if (window.changeLanguage) {
                    window.changeLanguage(lang);
                } else {
                    console.log('Language change requested:', lang);
                    localStorage.setItem('preferredLang', lang);
                }
            });
        });
    }

    updateSwitcherState(lang) {
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
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (window.i18n ? window.i18n.t('contact.form.sending') : 'Sending...');
                submitBtn.disabled = true;
                
                try {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                    this.showNotification(
                        window.i18n ? window.i18n.t('contact.form.success') : 'Message sent successfully! We\'ll get back to you soon.', 
                        'success'
                    );
                    
                    form.reset();
                    
                    this.resetFormValidation(form);
                    
                    if (successCallback) successCallback();
                    
                } catch (error) {
                    this.showNotification(
                        window.i18n ? window.i18n.t('contact.form.error') : 'Error sending message. Please try again.', 
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

    setupPageTransitions() {
        const mainContent = document.querySelector('main') || document.body;
        mainContent.style.opacity = '0';
        mainContent.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 100);
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

// Global footer initialization function
window.initFooter = function() {
    console.log('🦶 Footer component initialized');
    
    // Check if footer exists and initialize its functionality
    const footer = document.querySelector('.main-footer');
    if (footer) {
        console.log('🦶 Found footer element, setting up functionality...');
        
        // Re-initialize footer animations and interactions
        if (typeof setupFooterAnimations === 'function') {
            setupFooterAnimations();
        }
        if (typeof setupSocialLinks === 'function') {
            setupSocialLinks();
        }
        if (typeof setupMessengerContacts === 'function') {
            setupMessengerContacts();
        }
        
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
        
        // Setup social links hover effects
        const socialLinks = footer.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Setup messenger contacts hover effects
        const messengerContacts = footer.querySelectorAll('.messenger-contact');
        messengerContacts.forEach(contact => {
            contact.addEventListener('mouseenter', () => {
                contact.style.transform = 'translateX(5px)';
            });
            
            contact.addEventListener('mouseleave', () => {
                contact.style.transform = 'translateX(0)';
            });
        });
        
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
            
            // Auto-initialize header if it's a header component
            if (containerId === 'header-container' && typeof window.initHeader === 'function') {
                setTimeout(window.initHeader, 50);
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

document.addEventListener('DOMContentLoaded', () => {
    window.DaehaaApp = new DaehaaApp();
    
    window.DaehaaApp.setupPageTransitions();
    
    window.DaehaaApp.setupLazyLoading();
    
    window.DaehaaApp.setupErrorHandling();
    
    console.log('🚀 Daehaa application initialized');
});

window.initHeader = function() {
    if (window.DaehaaApp) {
        window.DaehaaApp.setupMobileMenu();
        window.DaehaaApp.setupCurrentPage();
        window.DaehaaApp.setupLanguageSupport();
    }
};

document.addEventListener('visibilitychange', () => {
    if (!document.hidden && window.DaehaaApp) {
        window.DaehaaApp.setupCurrentPage();
    }
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = DaehaaApp;
}
