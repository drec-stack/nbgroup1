console.log('🚀 main.js loaded - CLEAN VERSION WITH MOBILE MENU SUPPORT');

class DaehaaApp {
    constructor() {
        console.log('🏗️ DaehaaApp constructor called');
        
        this.isReducedMotion = window.matchMedia ? 
            window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
        
        this.isServicesPage = document.body && document.body.classList.contains('services-page') || 
                              window.location.pathname.includes('services.html');
        this.isAboutPage = document.body && document.body.classList.contains('about-page') || 
                           window.location.pathname.includes('about.html');
        this.isHomePage = !this.isServicesPage && !this.isAboutPage && 
                          (window.location.pathname.endsWith('index.html') || 
                           window.location.pathname === '/' || 
                           window.location.pathname === '');
        
        console.log(`📄 Page type: ${this.isServicesPage ? 'Services' : this.isAboutPage ? 'About' : this.isHomePage ? 'Home' : 'Other'}`);
        
        // Инициализируем после загрузки DOM
        if (document.readyState === 'loading') {
            console.log('⏳ DOM loading, waiting...');
            document.addEventListener('DOMContentLoaded', () => {
                console.log('✅ DOM loaded, calling init()');
                this.init();
            });
        } else {
            console.log('✅ DOM already loaded, calling init()');
            this.init();
        }
    }

    init() {
        console.log('🚀 Daehaa App initializing...');
        
        // Проверяем мобильное меню
        this.checkAndFixMobileMenu();
        
        // Базовые функции
        this.setupSmoothScroll();
        this.setupCurrentPage();
        this.setupLanguageSupport();
        this.setupMobileOptimizations();
        this.setupFormHandling();
        this.setupLazyLoading();
        this.setupClickableElements();
        
        // Настройка хедера
        this.setupHeaderSupport();
        
        // Футер
        this.setupFooterSupport();
        
        console.log('✅ Daehaa application initialized');
    }

    // Проверка и фикс мобильного меню
    checkAndFixMobileMenu() {
        console.log('📱 Checking mobile menu functionality...');
        
        const burgerBtn = document.getElementById('burger-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (!burgerBtn) {
            console.log('🖥️ No burger button found (desktop mode)');
            return;
        }
        
        console.log('✅ Burger button found:', burgerBtn);
        
        if (!mobileMenu) {
            console.error('❌ Mobile menu not found!');
            return;
        }
        
        console.log('✅ Mobile menu found:', mobileMenu);
        
        // Убедимся что меню правильно инициализировано
        mobileMenu.style.display = 'flex';
        
        // Проверяем обработчик клика
        const hasClickHandler = burgerBtn.onclick || burgerBtn._hasClickHandler;
        
        if (!hasClickHandler) {
            console.log('⚠️ No click handler found on burger button, adding one...');
            
            burgerBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('🍔 Burger button clicked!');
                
                const menu = document.getElementById('mobile-menu');
                if (!menu) {
                    console.error('❌ Mobile menu not found when clicking burger');
                    return;
                }
                
                const isOpen = menu.classList.contains('active');
                console.log('📱 Mobile menu state:', isOpen ? 'OPEN' : 'CLOSED');
                
                if (isOpen) {
                    // Закрыть меню
                    burgerBtn.classList.remove('active');
                    menu.classList.remove('active');
                    burgerBtn.setAttribute('aria-expanded', 'false');
                    burgerBtn.setAttribute('aria-label', 'Открыть меню');
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                } else {
                    // Открыть меню
                    burgerBtn.classList.add('active');
                    menu.classList.add('active');
                    burgerBtn.setAttribute('aria-expanded', 'true');
                    burgerBtn.setAttribute('aria-label', 'Закрыть меню');
                    document.body.style.overflow = 'hidden';
                    document.documentElement.style.overflow = 'hidden';
                }
            });
            
            burgerBtn._hasClickHandler = true;
            console.log('✅ Added click handler to burger button');
        } else {
            console.log('✅ Burger button already has click handler');
        }
        
        // Добавляем закрытие при клике на ссылки в меню
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(() => {
                    if (burgerBtn && mobileMenu.classList.contains('active')) {
                        burgerBtn.classList.remove('active');
                        mobileMenu.classList.remove('active');
                        burgerBtn.setAttribute('aria-expanded', 'false');
                        burgerBtn.setAttribute('aria-label', 'Открыть меню');
                        document.body.style.overflow = '';
                        document.documentElement.style.overflow = '';
                    }
                }, 300);
            });
        });
    }

    // Безопасные методы для работы с DOM
    safeQuerySelector(selector) {
        try {
            return document.querySelector(selector);
        } catch (error) {
            console.warn(`⚠️ Invalid selector: ${selector}`, error);
            return null;
        }
    }

    safeQuerySelectorAll(selector) {
        try {
            return document.querySelectorAll(selector);
        } catch (error) {
            console.warn(`⚠️ Invalid selector: ${selector}`, error);
            return [];
        }
    }

    setupHeaderSupport() {
        console.log('🔧 Setting up header support...');
        
        // Устанавливаем классы для body
        if (this.isHomePage) {
            document.body.classList.add('home-page');
        } else {
            document.body.classList.add('internal-page');
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            document.body.classList.add(`${currentPage.replace('.html', '')}-page`);
        }
        
        // Простой скролл-эффект для хедера
        const header = this.safeQuerySelector('.main-header');
        if (header) {
            const handleScroll = () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            };
            
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll(); // начальное состояние
        }
        
        // Инициализация навигации
        this.setupCurrentPage();
        
        // Инициализация переключателя языка
        this.setupLanguageSwitcherUI();
        
        // Настройка адаптивного переключателя языка
        this.setupResponsiveLanguageSwitcher();
    }

    setupSmoothScroll() {
        this.safeQuerySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                
                if (href === '#') return;
                
                e.preventDefault();
                
                const targetId = href.startsWith('#') ? href : '#' + href.split('#')[1];
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const header = document.querySelector('.main-header');
                    const headerHeight = header ? header.offsetHeight : 0;
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
        const navLinks = this.safeQuerySelectorAll('.nav-link, .mobile-nav-link');
        
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
        const langBtns = this.safeQuerySelectorAll('.lang-btn, .mobile-lang-btn');
        const switchers = this.safeQuerySelectorAll('.language-switcher, .mobile-language-switcher');
        
        langBtns.forEach(btn => {
            if (!btn) return;
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        switchers.forEach(switcher => {
            if (!switcher) return;
            switcher.setAttribute('data-current-lang', lang);
            
            // Анимируем ползунок
            const slider = switcher.querySelector('.lang-slider, .mobile-lang-slider-menu');
            if (slider) {
                slider.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                slider.style.transform = lang === 'en' ? 'translateX(100%)' : 'translateX(0)';
            }
        });
        
        // Обновляем размеры для компактной версии
        this.updateCompactLanguageSwitcher(lang);
    }

    updateCompactLanguageSwitcher(lang) {
        // Убедимся что размеры остаются компактными
        const languageSwitchers = this.safeQuerySelectorAll('.language-switcher');
        languageSwitchers.forEach(switcher => {
            if (!switcher) return;
            switcher.style.minWidth = '100px';
            switcher.style.height = '40px';
            
            const flags = switcher.querySelectorAll('.lang-flag');
            flags.forEach(flag => {
                if (flag) flag.style.fontSize = '18px';
            });
            
            const texts = switcher.querySelectorAll('.lang-text');
            texts.forEach(text => {
                if (text) text.style.fontSize = '14px';
            });
        });
    }

    setupResponsiveLanguageSwitcher() {
        // Функция для обновления отображения текста в переключателе языка
        const updateLanguageSwitcherText = () => {
            const isMobile = window.innerWidth <= 768;
            const languageSwitchers = this.safeQuerySelectorAll('.language-switcher.mobile-only-flags');
            
            languageSwitchers.forEach(switcher => {
                if (!switcher) return;
                const textElements = switcher.querySelectorAll('.lang-text');
                textElements.forEach(textElement => {
                    if (textElement) {
                        if (isMobile) {
                            textElement.style.display = 'none';
                        } else {
                            textElement.style.display = 'inline-block';
                        }
                    }
                });
                
                // Обновляем размеры для мобильной версии
                if (isMobile) {
                    switcher.style.minWidth = '85px';
                    switcher.style.height = '36px';
                    
                    const flags = switcher.querySelectorAll('.lang-flag');
                    flags.forEach(flag => {
                        if (flag) flag.style.fontSize = '18px';
                    });
                }
            });
        };
        
        // Инициализация при загрузке
        updateLanguageSwitcherText();
        
        // Обновление при изменении размера окна
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateLanguageSwitcherText();
            }, 250);
        });
        
        console.log('✅ Responsive language switcher initialized');
    }

    setupMobileOptimizations() {
        document.addEventListener('touchstart', function() {}, {passive: true});
        
        // Оптимизация для медленных соединений
        if ('connection' in navigator && navigator.connection.saveData === true) {
            document.documentElement.classList.add('save-data');
        }
        
        if ('connection' in navigator && navigator.connection.effectiveType.includes('2g')) {
            document.documentElement.classList.add('slow-connection');
        }
    }

    setupFormHandling() {
        const forms = this.safeQuerySelectorAll('form');
        forms.forEach(form => {
            if (form) this.setupForm(form.id);
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
                const originalText = submitBtn ? submitBtn.innerHTML : '';
                
                if (submitBtn) {
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
                    submitBtn.disabled = true;
                }
                
                try {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                    this.showNotification('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
                    
                    form.reset();
                    
                    this.resetFormValidation(form);
                    
                    if (successCallback) successCallback();
                    
                } catch (error) {
                    this.showNotification('Ошибка отправки. Пожалуйста, попробуйте еще раз.', 'error');
                } finally {
                    if (submitBtn) {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }
                }
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
        
        if (formGroup) {
            formGroup.classList.remove('valid', 'invalid');
            
            if (field.hasAttribute('required') && !value) {
                formGroup.classList.add('invalid');
                return false;
            }
            
            if (field.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(value)) {
                    formGroup.classList.add('valid');
                    return true;
                } else {
                    formGroup.classList.add('invalid');
                    return false;
                }
            }
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
        const existingNotifications = this.safeQuerySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            if (notification && notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        });

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close" aria-label="Закрыть">&times;</button>
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
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            });
        }
        
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
            const lazyImages = this.safeQuerySelectorAll('img[data-src]');
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

    setupClickableElements() {
        this.safeQuerySelectorAll('a:not(.btn)').forEach(link => {
            if (link && !link.classList.contains('clickable-element')) {
                link.classList.add('clickable-element');
            }
        });
    }

    setupFooterSupport() {
        console.log('🦶 Setting up footer support...');
        
        if ('MutationObserver' in window) {
            const footerObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1 && node.classList && node.classList.contains('main-footer')) {
                            this.initializeFooter(node);
                        }
                    });
                });
            });

            footerObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    initializeFooter(footerElement) {
        if (typeof window.initFooter === 'function') {
            setTimeout(() => {
                window.initFooter();
            }, 100);
        }
    }
}

// Инициализация приложения
(function initializeApp() {
    console.log('🔄 Initializing app...');
    
    if (!window.DaehaaApp) {
        window.DaehaaApp = new DaehaaApp();
        console.log('✅ DaehaaApp initialized');
    }
})();

// Глобальные утилиты
window.debounce = function(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
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

// Глобальные функции для управления переключателем языка
window.updateLanguageSwitcher = function(lang) {
    if (window.DaehaaApp) {
        window.DaehaaApp.updateLanguageSwitcherUI(lang);
    }
};

window.getCurrentLanguage = function() {
    return localStorage.getItem('preferredLang') || 'ru';
};

window.toggleLanguage = function() {
    const currentLang = localStorage.getItem('preferredLang') || 'ru';
    const newLang = currentLang === 'ru' ? 'en' : 'ru';
    
    if (window.i18n && window.i18n.switchLanguage) {
        window.i18n.switchLanguage(newLang);
    } else {
        // Fallback if i18n is not available
        localStorage.setItem('preferredLang', newLang);
        window.updateLanguageSwitcher(newLang);
        location.reload();
    }
};

// Компактный переключатель языка - глобальная функция
window.updateCompactLanguageSwitcher = function() {
    const languageSwitchers = document.querySelectorAll('.language-switcher');
    languageSwitchers.forEach(switcher => {
        if (!switcher) return;
        switcher.style.minWidth = '100px';
        switcher.style.height = '40px';
        switcher.style.padding = '3px';
        
        const slider = switcher.querySelector('.lang-slider');
        if (slider) {
            slider.style.top = '3px';
            slider.style.left = '3px';
            slider.style.width = 'calc(50% - 3px)';
            slider.style.height = 'calc(100% - 6px)';
        }
        
        const buttons = switcher.querySelectorAll('.lang-btn');
        buttons.forEach(btn => {
            if (btn) {
                btn.style.fontSize = '14px';
                btn.style.height = '34px';
                btn.style.padding = '0 16px';
            }
        });
        
        const texts = switcher.querySelectorAll('.lang-text');
        texts.forEach(text => {
            if (text) text.style.fontSize = '14px';
        });
        
        const flags = switcher.querySelectorAll('.lang-flag');
        flags.forEach(flag => {
            if (flag) flag.style.fontSize = '18px';
        });
    });
};

// Функция для управления мобильным меню
window.toggleMobileMenu = function() {
    const burgerBtn = document.getElementById('burger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (burgerBtn && mobileMenu) {
        const isOpen = mobileMenu.classList.contains('active');
        
        if (isOpen) {
            mobileMenu.classList.remove('active');
            burgerBtn.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            mobileMenu.classList.add('active');
            burgerBtn.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        return true;
    }
    
    console.error('❌ Mobile menu elements not found');
    return false;
};

// Проверка мобильного меню
window.checkMobileMenu = function() {
    console.log('📱 Checking mobile menu...');
    
    const elements = {
        '#mobile-menu': document.querySelector('#mobile-menu'),
        '.mobile-menu': document.querySelector('.mobile-menu'),
        '#burger-btn': document.querySelector('#burger-btn'),
        '.burger-btn': document.querySelector('.burger-btn')
    };
    
    console.log('📱 Elements:', elements);
    
    return elements;
};

console.log('✅ main.js loaded - ready!');
