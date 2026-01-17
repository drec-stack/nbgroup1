console.log('🚀 main.js loaded - FULLY UPDATED WITH BURGER MENU FIX');

class DaehaaApp {
    constructor() {
        this.isServicesPage = window.location.pathname.includes('services.html');
        this.isAboutPage = window.location.pathname.includes('about.html');
        this.isHomePage = !this.isServicesPage && !this.isAboutPage && 
                          (window.location.pathname.endsWith('index.html') || 
                           window.location.pathname === '/' || 
                           window.location.pathname === '');
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.init();
            });
        } else {
            this.init();
        }
    }

    init() {
        this.setupSmoothScroll();
        this.setupCurrentPage();
        this.setupLanguageSupport();
        this.setupMobileOptimizations();
        this.setupFormHandling();
        this.setupLazyLoading();
        this.setupClickableElements();
        this.setupFooterSupport();
        this.setupScrollProgress();
        this.setupScrollHeader();
        
        console.log('✅ DaehaaApp initialized');
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
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
        const langBtns = document.querySelectorAll('.lang-btn, .mobile-lang-btn');
        const switchers = document.querySelectorAll('.language-switcher, .mobile-language-switcher');
        
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
            
            const slider = switcher.querySelector('.lang-slider, .mobile-lang-slider-menu');
            if (slider) {
                slider.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                slider.style.transform = lang === 'en' ? 'translateX(100%)' : 'translateX(0)';
            }
        });
    }

    setupMobileOptimizations() {
        document.addEventListener('touchstart', function() {}, {passive: true});
        
        if ('connection' in navigator && navigator.connection.saveData === true) {
            document.documentElement.classList.add('save-data');
        }
        
        if ('connection' in navigator && navigator.connection.effectiveType.includes('2g')) {
            document.documentElement.classList.add('slow-connection');
        }
    }

    setupFormHandling() {
        const forms = document.querySelectorAll('form');
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
        const existingNotifications = document.querySelectorAll('.notification');
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

    setupClickableElements() {
        document.querySelectorAll('a:not(.btn)').forEach(link => {
            if (link && !link.classList.contains('clickable-element')) {
                link.classList.add('clickable-element');
            }
        });
    }

    setupFooterSupport() {
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

    setupScrollProgress() {
        const scrollProgress = document.querySelector('.scroll-progress-bar');
        
        if (!scrollProgress) return;
        
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            scrollProgress.style.width = scrolled + '%';
        });
    }

    setupScrollHeader() {
        const header = document.querySelector('.main-header');
        
        if (!header) return;
        
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.classList.remove('scrolled');
                return;
            }
            
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }
}

// ===== БУРГЕР МЕНЮ МЕНЕДЖЕР - ИСПРАВЛЕННЫЙ =====
class BurgerMenuManager {
    constructor() {
        console.log('🍔 BurgerMenuManager created');
        this.burgerBtn = null;
        this.mobileMenu = null;
        this.isInitialized = false;
        this.init();
    }

    init() {
        console.log('🍔 Initializing Burger Menu Manager...');
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupMenu();
            });
        } else {
            this.setupMenu();
        }
        
        window.addEventListener('componentsFullyLoaded', () => {
            this.setupMenu();
        });
    }

    setupMenu() {
        if (this.isInitialized) return;
        
        this.burgerBtn = document.querySelector('.burger-btn');
        this.mobileMenu = document.querySelector('.mobile-menu');
        
        if (!this.burgerBtn || !this.mobileMenu) {
            console.log('🍔 Burger menu elements not found, retrying...');
            setTimeout(() => this.setupMenu(), 500);
            return;
        }
        
        console.log('✅ Burger menu elements found');
        
        this.setupEventListeners();
        this.isInitialized = true;
        console.log('✅ Burger Menu Manager initialized');
    }

    setupEventListeners() {
        const newBurgerBtn = this.burgerBtn.cloneNode(true);
        if (this.burgerBtn.parentNode) {
            this.burgerBtn.parentNode.replaceChild(newBurgerBtn, this.burgerBtn);
        }
        this.burgerBtn = newBurgerBtn;
        
        this.burgerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleMenu();
        });
        
        const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-lang-btn, .mobile-header-btn');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(() => {
                    if (this.mobileMenu.classList.contains('active')) {
                        this.closeMenu();
                    }
                }, 300);
            });
        });
        
        document.addEventListener('click', (e) => {
            if (this.mobileMenu.classList.contains('active') && 
                !this.mobileMenu.contains(e.target) && 
                !this.burgerBtn.contains(e.target)) {
                this.closeMenu();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenu.classList.contains('active')) {
                this.closeMenu();
            }
        });
        
        this.burgerBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
        }, { passive: false });
    }

    toggleMenu() {
        if (this.mobileMenu.classList.contains('active')) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        console.log('➕ Opening mobile menu');
        this.burgerBtn.classList.add('active');
        this.mobileMenu.classList.add('active');
        this.burgerBtn.setAttribute('aria-expanded', 'true');
        this.burgerBtn.setAttribute('aria-label', 'Закрыть меню');
        this.burgerBtn.style.zIndex = '99998'; // НИЖЕ МЕНЮ КОГДА ОНО ОТКРЫТО
        this.mobileMenu.style.pointerEvents = 'auto';
        document.body.style.overflow = 'hidden';
        document.body.classList.add('menu-open');
        document.documentElement.style.overflow = 'hidden';
    }

    closeMenu() {
        console.log('➖ Closing mobile menu');
        this.burgerBtn.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        this.burgerBtn.setAttribute('aria-expanded', 'false');
        this.burgerBtn.setAttribute('aria-label', 'Открыть меню');
        this.burgerBtn.style.zIndex = '100000'; // ВОЗВРАЩАЕМ ВЫСОКИЙ z-index
        this.mobileMenu.style.pointerEvents = 'none';
        document.body.style.overflow = '';
        document.body.classList.remove('menu-open');
        document.documentElement.style.overflow = '';
    }
}

// ===== ГЛОБАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ =====
(function initializeApp() {
    console.log('🚀 Starting app initialization...');
    
    if (!window.DaehaaApp) {
        window.DaehaaApp = new DaehaaApp();
    }
    
    if (!window.burgerMenuManager) {
        window.burgerMenuManager = new BurgerMenuManager();
    }
    
    console.log('🚀 All systems initialized');
    
    // Финальная гарантия инициализации бургер-меню
    setTimeout(() => {
        if (window.burgerMenuManager && !window.burgerMenuManager.isInitialized) {
            console.log('🔄 Forcing burger menu initialization...');
            window.burgerMenuManager.setupMenu();
        }
    }, 1000);
})();

// ===== ГЛОБАЛЬНЫЕ УТИЛИТЫ =====
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

// ===== ГЛОБАЛЬНЫЕ ФУНКЦИИ ЯЗЫКА =====
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
        localStorage.setItem('preferredLang', newLang);
        window.updateLanguageSwitcher(newLang);
        location.reload();
    }
};

// ===== ГЛОБАЛЬНЫЕ ФУНКЦИИ ДЛЯ МОБИЛЬНОГО МЕНЮ =====
window.openMobileMenu = function() {
    if (window.burgerMenuManager) {
        window.burgerMenuManager.openMenu();
    } else {
        const mobileMenu = document.querySelector('.mobile-menu');
        const burgerBtn = document.querySelector('.burger-btn');
        if (mobileMenu && burgerBtn) {
            burgerBtn.classList.add('active');
            mobileMenu.classList.add('active');
            mobileMenu.style.pointerEvents = 'auto';
            burgerBtn.style.zIndex = '99998';
            document.body.style.overflow = 'hidden';
            document.body.classList.add('menu-open');
        }
    }
};

window.closeMobileMenu = function() {
    if (window.burgerMenuManager) {
        window.burgerMenuManager.closeMenu();
    } else {
        const mobileMenu = document.querySelector('.mobile-menu');
        const burgerBtn = document.querySelector('.burger-btn');
        if (mobileMenu && burgerBtn) {
            burgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenu.style.pointerEvents = 'none';
            burgerBtn.style.zIndex = '100000';
            document.body.style.overflow = '';
            document.body.classList.remove('menu-open');
        }
    }
};

window.toggleMobileMenu = function() {
    if (window.burgerMenuManager) {
        window.burgerMenuManager.toggleMenu();
    } else {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            window.closeMobileMenu();
        } else {
            window.openMobileMenu();
        }
    }
};

// ===== ГЛОБАЛЬНЫЕ ТЕСТОВЫЕ ФУНКЦИИ =====
if (window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' || 
    window.location.hostname.includes('github.io')) {
    
    window.testBurgerMenu = function() {
        console.log('🔍 Тест бургер-меню:');
        
        const burgerBtn = document.querySelector('.burger-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        console.log('Бургер кнопка:', burgerBtn);
        console.log('Мобильное меню:', mobileMenu);
        
        if (burgerBtn && mobileMenu) {
            console.log('✅ Элементы найдены');
            
            const isOpen = mobileMenu.classList.contains('active');
            console.log('Меню ' + (isOpen ? 'открыто' : 'закрыто'));
            
            if (window.burgerMenuManager) {
                window.burgerMenuManager.toggleMenu();
                console.log('✅ Использован BurgerMenuManager');
            } else {
                burgerBtn.click();
            }
            
            setTimeout(() => {
                const newState = mobileMenu.classList.contains('active');
                console.log('После клика меню ' + (newState ? 'открыто' : 'закрыто'));
            }, 500);
        } else {
            console.log('❌ Элементы не найдены');
            
            if (window.burgerMenuManager) {
                console.log('Менеджер:', window.burgerMenuManager);
                if (!window.burgerMenuManager.isInitialized) {
                    window.burgerMenuManager.setupMenu();
                }
            }
        }
    };
    
    window.testHeader = function() {
        console.log('🔍 Тест хедера:');
        console.log('Header:', document.querySelector('.main-header'));
        console.log('Logo:', document.querySelector('.logo'));
        console.log('Nav links:', document.querySelectorAll('.nav-link').length);
        console.log('Burger btn:', document.querySelector('.burger-btn'));
        console.log('Mobile menu:', document.querySelector('.mobile-menu'));
    };
    
    window.debugZIndex = function() {
        console.log('🔍 Debug z-index:');
        const burgerBtn = document.querySelector('.burger-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        const header = document.querySelector('.main-header');
        
        if (burgerBtn) {
            console.log('Burger btn z-index:', window.getComputedStyle(burgerBtn).zIndex);
            console.log('Burger btn actual z-index:', burgerBtn.style.zIndex);
        }
        if (mobileMenu) {
            console.log('Mobile menu z-index:', window.getComputedStyle(mobileMenu).zIndex);
            console.log('Mobile menu actual z-index:', mobileMenu.style.zIndex);
        }
        if (header) {
            console.log('Header z-index:', window.getComputedStyle(header).zIndex);
        }
    };
}

// ===== ПОСЛЕДНИЙ ШАГ - ГАРАНТИРОВАННАЯ ИНИЦИАЛИЗАЦИЯ =====
window.addEventListener('load', function() {
    console.log('🎯 Страница полностью загружена');
    
    // Гарантируем инициализацию бургер-меню
    if (window.burgerMenuManager && !window.burgerMenuManager.isInitialized) {
        setTimeout(() => {
            window.burgerMenuManager.setupMenu();
        }, 1000);
    }
    
    // Обновляем активные ссылки
    if (window.DaehaaApp) {
        window.DaehaaApp.setupCurrentPage();
    }
    
    // Добавляем класс для отладки
    document.body.classList.add('page-loaded');
});

// ===== ОБРАБОТКА СОБЫТИЙ КОМПОНЕНТОВ =====
window.addEventListener('componentsLoaded', function() {
    console.log('🎉 Компоненты загружены, переинициализируем меню');
    
    setTimeout(() => {
        if (window.burgerMenuManager) {
            window.burgerMenuManager.setupMenu();
        }
        
        if (window.DaehaaApp) {
            window.DaehaaApp.setupCurrentPage();
            window.DaehaaApp.setupLanguageSwitcherUI();
        }
    }, 300);
});

// Экспорт для глобального использования
window.Daehaa = {
    App: window.DaehaaApp,
    BurgerMenu: window.burgerMenuManager,
    utils: {
        debounce: window.debounce,
        throttle: window.throttle
    },
    functions: {
        openMobileMenu: window.openMobileMenu,
        closeMobileMenu: window.closeMobileMenu,
        toggleMobileMenu: window.toggleMobileMenu,
        getCurrentLanguage: window.getCurrentLanguage,
        toggleLanguage: window.toggleLanguage
    }
};
