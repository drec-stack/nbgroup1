console.log('🚀 main.js loaded - FULL WORKING VERSION');

// ===== ГЛОБАЛЬНЫЙ ОБЪЕКТ ПРИЛОЖЕНИЯ =====
window.NBGroupApp = {
    // Состояние приложения
    state: {
        isMobile: window.innerWidth <= 900,
        currentPage: '',
        language: localStorage.getItem('preferredLang') || 'ru',
        menuOpen: false,
        scrollY: 0
    },
    
    // Инициализация
    init() {
        console.log('🎬 Initializing NB Group App...');
        
        this.detectCurrentPage();
        this.setupBurgerMenu();
        this.setupSmoothScroll();
        this.setupActiveNav();
        this.setupLanguageSwitcher();
        this.setupScrollEffects();
        this.setupForms();
        this.setupLazyLoading();
        this.setupGlobalEvents();
        
        console.log('✅ NB Group App initialized');
        console.log('📱 Mobile:', this.state.isMobile);
        console.log('📄 Page:', this.state.currentPage);
        console.log('🌐 Language:', this.state.language);
    },
    
    // Определение текущей страницы
    detectCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        this.state.currentPage = page;
        
        // Добавляем класс для страницы
        const pageClass = page.replace('.html', '') + '-page';
        if (pageClass !== '-page') {
            document.body.classList.add(pageClass);
        }
    },
    
    // ===== БУРГЕР МЕНЮ =====
    setupBurgerMenu() {
        console.log('🍔 Setting up burger menu...');
        
        // Ждем загрузки компонентов
        if (!document.querySelector('.burger-btn')) {
            console.log('⚠️ Burger button not found yet, waiting for components...');
            setTimeout(() => this.setupBurgerMenu(), 500);
            return;
        }
        
        const burgerBtn = document.querySelector('.burger-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (!burgerBtn || !mobileMenu) {
            console.error('❌ Burger menu elements not found');
            return;
        }
        
        console.log('✅ Burger menu elements found');
        
        // Обработчик клика на бургер
        burgerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleMobileMenu();
        });
        
        // Закрытие при клике на ссылки в меню
        const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-lang-btn, .mobile-header-btn');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(() => {
                    if (this.state.menuOpen) {
                        this.closeMobileMenu();
                    }
                }, 300);
            });
        });
        
        // Закрытие при клике вне меню
        document.addEventListener('click', (e) => {
            if (this.state.menuOpen && 
                !mobileMenu.contains(e.target) && 
                !burgerBtn.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
        
        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.state.menuOpen) {
                this.closeMobileMenu();
            }
        });
        
        // Предотвращение скролла при открытом меню
        mobileMenu.addEventListener('touchmove', (e) => {
            if (this.state.menuOpen) {
                e.preventDefault();
            }
        }, { passive: false });
        
        console.log('✅ Burger menu setup complete');
    },
    
    toggleMobileMenu() {
        const burgerBtn = document.querySelector('.burger-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (this.state.menuOpen) {
            // Закрыть меню
            burgerBtn.classList.remove('active');
            burgerBtn.setAttribute('aria-expanded', 'false');
            burgerBtn.setAttribute('aria-label', 'Открыть меню');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
            this.state.menuOpen = false;
            console.log('➖ Mobile menu closed');
        } else {
            // Открыть меню
            burgerBtn.classList.add('active');
            burgerBtn.setAttribute('aria-expanded', 'true');
            burgerBtn.setAttribute('aria-label', 'Закрыть меню');
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
            this.state.menuOpen = true;
            console.log('➕ Mobile menu opened');
        }
    },
    
    openMobileMenu() {
        if (!this.state.menuOpen) {
            this.toggleMobileMenu();
        }
    },
    
    closeMobileMenu() {
        if (this.state.menuOpen) {
            this.toggleMobileMenu();
        }
    },
    
    // ===== ПЛАВНАЯ ПРОКРУТКА =====
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
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
                    
                    // Закрываем мобильное меню если открыто
                    if (window.NBGroupApp.state.menuOpen) {
                        window.NBGroupApp.closeMobileMenu();
                    }
                }
            });
        });
    },
    
    // ===== АКТИВНАЯ НАВИГАЦИЯ =====
    setupActiveNav() {
        const currentPage = this.state.currentPage;
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.remove('active');
            
            if (href === currentPage || 
                (currentPage === '' && href === 'index.html') ||
                (currentPage === '/' && href === 'index.html') ||
                (currentPage === 'index.html' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
        
        console.log(`✅ Active nav setup for page: ${currentPage}`);
    },
    
    // ===== ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКА =====
    setupLanguageSwitcher() {
        const langBtns = document.querySelectorAll('.lang-btn, .mobile-lang-btn');
        
        if (langBtns.length === 0) return;
        
        // Устанавливаем текущий язык
        this.updateLanguageUI(this.state.language);
        
        // Обработчики для кнопок языка
        langBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const lang = btn.getAttribute('data-lang');
                if (lang === this.state.language) return;
                
                this.switchLanguage(lang);
            });
        });
    },
    
    updateLanguageUI(lang) {
        const langBtns = document.querySelectorAll('.lang-btn, .mobile-lang-btn');
        const switchers = document.querySelectorAll('.language-switcher, .mobile-language-switcher');
        
        langBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        switchers.forEach(switcher => {
            switcher.setAttribute('data-current-lang', lang);
        });
        
        // Сохраняем в localStorage
        localStorage.setItem('preferredLang', lang);
        this.state.language = lang;
        
        console.log(`🌐 Language switched to: ${lang}`);
    },
    
    switchLanguage(lang) {
        // Если есть i18n система, используем ее
        if (window.i18n && typeof window.i18n.switchLanguage === 'function') {
            window.i18n.switchLanguage(lang);
        } else {
            this.updateLanguageUI(lang);
            // Можно добавить перезагрузку страницы или AJAX загрузку контента
            // location.reload();
        }
        
        // Закрываем меню если открыто
        if (this.state.menuOpen) {
            this.closeMobileMenu();
        }
    },
    
    // ===== ЭФФЕКТЫ ПРИ СКРОЛЛЕ =====
    setupScrollEffects() {
        const header = document.querySelector('.main-header');
        const scrollProgress = document.querySelector('.scroll-progress-bar');
        
        if (!header) return;
        
        window.addEventListener('scroll', () => {
            this.state.scrollY = window.pageYOffset;
            
            // Эффект для хедера
            if (this.state.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Прогресс скролла
            if (scrollProgress) {
                const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (this.state.scrollY / windowHeight) * 100;
                scrollProgress.style.width = scrolled + '%';
            }
        });
    },
    
    // ===== ФОРМЫ =====
    setupForms() {
        const forms = document.querySelectorAll('form[data-form]');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
            
            // Валидация в реальном времени
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
            });
        });
    },
    
    validateField(field) {
        const value = field.value.trim();
        const parent = field.closest('.form-group');
        
        if (!parent) return true;
        
        parent.classList.remove('error', 'success');
        
        if (field.hasAttribute('required') && !value) {
            parent.classList.add('error');
            return false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                parent.classList.add('error');
                return false;
            }
        }
        
        if (value) {
            parent.classList.add('success');
        }
        
        return true;
    },
    
    async handleFormSubmit(form) {
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : '';
        
        // Валидация всех полей
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            this.showNotification('Пожалуйста, заполните все обязательные поля', 'error');
            return;
        }
        
        // Блокируем кнопку
        if (submitBtn) {
            submitBtn.innerHTML = '<span class="loading-spinner"></span> Отправка...';
            submitBtn.disabled = true;
        }
        
        try {
            // Имитация отправки (замените на реальный запрос)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            this.showNotification('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
            form.reset();
            
            // Сбрасываем валидацию
            const formGroups = form.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.classList.remove('error', 'success');
            });
            
        } catch (error) {
            this.showNotification('Ошибка отправки. Пожалуйста, попробуйте еще раз.', 'error');
            console.error('Form submit error:', error);
        } finally {
            // Разблокируем кнопку
            if (submitBtn) {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }
    },
    
    showNotification(message, type = 'info') {
        // Удаляем старые уведомления
        const oldNotifications = document.querySelectorAll('.app-notification');
        oldNotifications.forEach(n => n.remove());
        
        // Создаем новое уведомление
        const notification = document.createElement('div');
        notification.className = `app-notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close" aria-label="Закрыть">×</button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 16px 24px;
            border-radius: 10px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            max-width: 400px;
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.2);
        `;
        
        document.body.appendChild(notification);
        
        // Анимация появления
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });
        
        // Кнопка закрытия
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 400);
        });
        
        // Автоматическое закрытие
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 400);
            }
        }, 5000);
    },
    
    // ===== ЛЕНИВАЯ ЗАГРУЗКА =====
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[data-src]');
            
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        
                        // Убираем атрибут после загрузки
                        img.onload = () => {
                            img.removeAttribute('data-src');
                            img.classList.add('loaded');
                        };
                        
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    },
    
    // ===== ГЛОБАЛЬНЫЕ СОБЫТИЯ =====
    setupGlobalEvents() {
        // Ресайз окна
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.state.isMobile = window.innerWidth <= 900;
                console.log(`🔄 Window resized: ${window.innerWidth}px (${this.state.isMobile ? 'mobile' : 'desktop'})`);
            }, 250);
        });
        
        // Событие загрузки компонентов
        window.addEventListener('componentsLoaded', () => {
            console.log('🔄 Re-initializing after components load');
            setTimeout(() => {
                this.setupBurgerMenu();
                this.setupActiveNav();
                this.setupLanguageSwitcher();
            }, 300);
        });
        
        // Обработка касаний для мобильных
        if ('ontouchstart' in window) {
            document.addEventListener('touchstart', () => {}, { passive: true });
        }
    }
};

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

// ===== ГЛОБАЛЬНЫЕ ФУНКЦИИ =====
window.openMobileMenu = () => window.NBGroupApp?.openMobileMenu();
window.closeMobileMenu = () => window.NBGroupApp?.closeMobileMenu();
window.toggleMobileMenu = () => window.NBGroupApp?.toggleMobileMenu();
window.switchLanguage = (lang) => window.NBGroupApp?.switchLanguage(lang);
window.showNotification = (msg, type) => window.NBGroupApp?.showNotification(msg, type);

// ===== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ =====
(function initializeApp() {
    console.log('🚀 Starting app initialization...');
    
    // Ждем загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('📄 DOM fully loaded');
            setTimeout(() => {
                window.NBGroupApp.init();
            }, 100);
        });
    } else {
        console.log('📄 DOM already loaded');
        setTimeout(() => {
            window.NBGroupApp.init();
        }, 100);
    }
    
    // Запуск после загрузки компонентов
    window.initAfterComponents = function() {
        console.log('🔄 Initializing after components load');
        if (window.NBGroupApp && typeof window.NBGroupApp.init === 'function') {
            window.NBGroupApp.init();
        }
    };
})();

// ===== ТЕСТОВЫЕ ФУНКЦИИ ДЛЯ РАЗРАБОТКИ =====
if (window.location.hostname.includes('localhost') || 
    window.location.hostname.includes('127.0.0.1') || 
    window.location.hostname.includes('github.io')) {
    
    window.debugApp = function() {
        console.log('🔍 App Debug Info:');
        console.log('------------------');
        console.log('State:', window.NBGroupApp?.state);
        console.log('Burger button:', document.querySelector('.burger-btn'));
        console.log('Mobile menu:', document.querySelector('.mobile-menu'));
        console.log('Menu open:', window.NBGroupApp?.state.menuOpen);
        console.log('Components loaded:', document.body.classList.contains('components-loaded'));
        console.log('Current page:', window.NBGroupApp?.state.currentPage);
        console.log('Language:', window.NBGroupApp?.state.language);
    };
    
    window.testBurger = function() {
        console.log('🧪 Testing burger menu...');
        const burgerBtn = document.querySelector('.burger-btn');
        if (burgerBtn) {
            burgerBtn.click();
            setTimeout(() => {
                console.log('Menu is now:', window.NBGroupApp?.state.menuOpen ? 'OPEN' : 'CLOSED');
            }, 500);
        } else {
            console.log('❌ Burger button not found');
        }
    };
    
    window.testNotification = function() {
        window.showNotification('Это тестовое уведомление!', 'success');
    };
}

// ===== ФИНАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ =====
window.addEventListener('load', () => {
    console.log('🎯 Page fully loaded');
    
    // Добавляем класс загрузки
    document.body.classList.add('page-loaded');
    
    // Финальная проверка бургер-меню
    setTimeout(() => {
        if (!document.querySelector('.burger-btn') && window.NBGroupApp) {
            console.log('⚠️ Burger button still not found, retrying...');
            window.NBGroupApp.setupBurgerMenu();
        }
    }, 2000);
    
    // Отправляем аналитику
    console.log('📊 Page load complete at:', new Date().toLocaleTimeString());
});

console.log('✅ main.js loaded successfully');
