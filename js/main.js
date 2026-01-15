console.log('🚀 main.js loaded - SIMPLE MOBILE MENU FIX');

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
        
        // Автоматически запускаем инициализацию
        this.init();
    }

    init() {
        console.log('🚀 Daehaa App initializing...');
        
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
        
        // ПРИНУДИТЕЛЬНАЯ инициализация мобильного меню
        this.forceMobileMenuInit();
        
        console.log('✅ Daehaa application initialized');
    }

    // ПРИНУДИТЕЛЬНАЯ инициализация мобильного меню
    forceMobileMenuInit() {
        console.log('🔧 ПРИНУДИТЕЛЬНАЯ инициализация мобильного меню');
        
        // Проверяем сразу
        this.checkAndFixMobileMenu();
        
        // Проверяем через 500ms
        setTimeout(() => {
            this.checkAndFixMobileMenu();
        }, 500);
        
        // Проверяем через 2000ms
        setTimeout(() => {
            this.checkAndFixMobileMenu();
        }, 2000);
        
        // Проверяем при полной загрузке страницы
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.checkAndFixMobileMenu();
            }, 100);
        });
    }

    // Проверка и фикс мобильного меню
    checkAndFixMobileMenu() {
        console.log('📱 Проверка мобильного меню...');
        
        const burgerBtn = document.getElementById('burger-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (!burgerBtn) {
            console.error('❌ Бургер-кнопка не найдена!');
            this.createEmergencyBurgerButton();
            return;
        }
        
        if (!mobileMenu) {
            console.error('❌ Мобильное меню не найдено!');
            return;
        }
        
        console.log('✅ Элементы найдены');
        
        // Убедимся что меню правильно отображается
        mobileMenu.style.display = 'flex';
        mobileMenu.style.opacity = '0';
        mobileMenu.style.visibility = 'hidden';
        mobileMenu.style.transform = 'translateX(100%)';
        
        // Если уже есть обработчик, не добавляем новый
        if (burgerBtn._simpleClickHandler) {
            console.log('✅ Обработчик уже есть');
            return;
        }
        
        // ПРОСТЕЙШИЙ обработчик
        burgerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🍔 Бургер нажат!');
            
            const menu = document.getElementById('mobile-menu');
            if (!menu) return;
            
            const isOpen = menu.classList.contains('active');
            
            if (isOpen) {
                // Закрыть меню
                menu.classList.remove('active');
                this.classList.remove('active');
                this.setAttribute('aria-expanded', 'false');
                this.setAttribute('aria-label', 'Открыть меню');
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            } else {
                // Открыть меню
                menu.classList.add('active');
                this.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
                this.setAttribute('aria-label', 'Закрыть меню');
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
            }
        });
        
        burgerBtn._simpleClickHandler = true;
        console.log('✅ Простой обработчик добавлен');
    }

    // Создание экстренной бургер-кнопки
    createEmergencyBurgerButton() {
        console.log('⚠️ Создание экстренной бургер-кнопки...');
        
        // Ищем контейнер для бургера
        let burgerContainer = document.querySelector('.header-right-mobile') || 
                             document.querySelector('.burger-container');
        
        if (!burgerContainer) {
            console.error('❌ Контейнер для бургера не найден');
            return;
        }
        
        // Создаем бургер-кнопку
        const burgerBtn = document.createElement('button');
        burgerBtn.id = 'burger-btn';
        burgerBtn.className = 'burger-btn';
        burgerBtn.setAttribute('aria-label', 'Открыть меню');
        burgerBtn.setAttribute('aria-expanded', 'false');
        
        burgerBtn.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        // Добавляем стили
        burgerBtn.style.cssText = `
            display: block;
            width: 44px;
            height: 44px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            cursor: pointer;
            position: relative;
            z-index: 1002;
        `;
        
        // Создаем линии бургера
        const spans = burgerBtn.querySelectorAll('span');
        spans.forEach(span => {
            span.style.cssText = `
                display: block;
                position: absolute;
                width: 20px;
                height: 2px;
                background: white;
                border-radius: 2px;
                transition: all 0.3s ease;
                left: 50%;
                transform: translateX(-50%);
            `;
        });
        
        spans[0].style.top = '15px';
        spans[1].style.top = '50%';
        spans[1].style.transform = 'translate(-50%, -50%)';
        spans[2].style.bottom = '15px';
        
        burgerContainer.appendChild(burgerBtn);
        console.log('✅ Экстренная бургер-кнопка создана');
        
        // Сразу добавляем обработчик
        setTimeout(() => {
            this.checkAndFixMobileMenu();
        }, 100);
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
        });
    }

    setupResponsiveLanguageSwitcher() {
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
            });
        };
        
        updateLanguageSwitcherText();
        
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

// Инициализация приложения сразу
(function initializeApp() {
    console.log('🔄 Инициализация приложения...');
    
    if (!window.DaehaaApp) {
        window.DaehaaApp = new DaehaaApp();
        console.log('✅ DaehaaApp инициализирован');
    }
})();

// Глобальная функция для мобильного меню
window.forceMobileMenu = function() {
    console.log('🔧 Принудительный запуск мобильного меню');
    
    if (window.DaehaaApp && window.DaehaaApp.checkAndFixMobileMenu) {
        window.DaehaaApp.checkAndFixMobileMenu();
        return true;
    }
    
    console.error('❌ DaehaaApp не найден');
    return false;
};

// Запускаем проверку мобильного меню при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM загружен - проверяем мобильное меню');
    
    // Первая проверка
    setTimeout(() => {
        if (window.forceMobileMenu) {
            window.forceMobileMenu();
        }
    }, 500);
    
    // Вторая проверка через 2 секунды
    setTimeout(() => {
        if (window.forceMobileMenu) {
            window.forceMobileMenu();
        }
    }, 2000);
});

// При полной загрузке страницы
window.addEventListener('load', function() {
    console.log('🌐 Страница полностью загружена - финальная проверка');
    
    setTimeout(() => {
        if (window.forceMobileMenu) {
            window.forceMobileMenu();
        }
    }, 1000);
});

console.log('✅ main.js загружен с фиксами для мобильного меню');
