console.log('🚀 main.js loaded - SIMPLIFIED WORKING VERSION');

// ===== ГЛОБАЛЬНЫЙ ОБЪЕКТ ПРИЛОЖЕНИЯ =====
window.NBGroupApp = {
    // Состояние приложения
    state: {
        isMobile: window.innerWidth <= 900,
        currentPage: '',
        language: localStorage.getItem('preferredLang') || 'ru',
        menuOpen: false
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
    },
    
    // Определение текущей страницы
    detectCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        this.state.currentPage = page;
        
        const pageClass = page.replace('.html', '') + '-page';
        if (pageClass !== '-page') {
            // Убираем brandbook-page если он есть
            if (pageClass !== 'brandbook-page') {
                document.body.classList.add(pageClass);
            }
        }
    },
    
    // ===== БУРГЕР МЕНЮ =====
    setupBurgerMenu() {
        console.log('🍔 Setting up burger menu...');
        
        const setup = () => {
            const burgerBtn = document.querySelector('.burger-btn');
            const mobileMenu = document.querySelector('.mobile-menu');
            
            if (!burgerBtn || !mobileMenu) {
                console.log('⚠️ Elements not found, retrying...');
                setTimeout(setup, 500);
                return;
            }
            
            console.log('✅ Burger menu elements found');
            
            // Удаляем старые обработчики
            const newBurgerBtn = burgerBtn.cloneNode(true);
            burgerBtn.parentNode.replaceChild(newBurgerBtn, burgerBtn);
            
            // Гарантируем начальное состояние
            mobileMenu.classList.remove('active');
            newBurgerBtn.classList.remove('active');
            newBurgerBtn.setAttribute('aria-expanded', 'false');
            
            // Обработчик клика
            newBurgerBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const isOpen = mobileMenu.classList.contains('active');
                
                if (isOpen) {
                    // Закрыть меню
                    mobileMenu.classList.remove('active');
                    newBurgerBtn.classList.remove('active');
                    newBurgerBtn.setAttribute('aria-expanded', 'false');
                    newBurgerBtn.setAttribute('aria-label', 'Открыть меню');
                    document.body.style.overflow = '';
                    this.state.menuOpen = false;
                    console.log('➖ Menu closed');
                } else {
                    // Открыть меню
                    mobileMenu.classList.add('active');
                    newBurgerBtn.classList.add('active');
                    newBurgerBtn.setAttribute('aria-expanded', 'true');
                    newBurgerBtn.setAttribute('aria-label', 'Закрыть меню');
                    document.body.style.overflow = 'hidden';
                    this.state.menuOpen = true;
                    console.log('➕ Menu opened');
                }
            });
            
            // Закрытие при клике на ссылки
            const mobileLinks = mobileMenu.querySelectorAll('a, button');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    setTimeout(() => {
                        mobileMenu.classList.remove('active');
                        newBurgerBtn.classList.remove('active');
                        newBurgerBtn.setAttribute('aria-expanded', 'false');
                        document.body.style.overflow = '';
                        this.state.menuOpen = false;
                    }, 300);
                });
            });
            
            // Закрытие при клике вне меню
            document.addEventListener('click', (e) => {
                if (this.state.menuOpen && 
                    !mobileMenu.contains(e.target) && 
                    !newBurgerBtn.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                    newBurgerBtn.classList.remove('active');
                    newBurgerBtn.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                    this.state.menuOpen = false;
                }
            });
            
            console.log('✅ Burger menu setup complete');
        };
        
        // Первый запуск
        setup();
        
        // Запуск после загрузки компонентов
        window.addEventListener('componentsLoaded', () => {
            console.log('🔄 Re-setting up burger menu after components');
            setTimeout(setup, 300);
        });
    },
    
    // ===== ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКА - ОБНОВЛЕННЫЙ =====
    setupLanguageSwitcher() {
        console.log('🌍 Setting up language switcher...');
        
        const setup = () => {
            // Выбираем ВСЕ кнопки языка на странице
            const langBtns = document.querySelectorAll('.lang-btn, .mobile-lang-btn');
            
            if (langBtns.length === 0) {
                console.log('⚠️ Language buttons not found, retrying...');
                setTimeout(setup, 500);
                return;
            }
            
            console.log(`✅ Found ${langBtns.length} language buttons`);
            
            // Устанавливаем текущий язык
            const currentLang = localStorage.getItem('preferredLang') || 'ru';
            this.updateAllLanguageSwitchers(currentLang);
            
            // Обработчики для кнопок языка
            langBtns.forEach(btn => {
                // Удаляем старые обработчики
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);
                
                // Добавляем новый обработчик
                newBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const lang = newBtn.getAttribute('data-lang');
                    if (lang === this.state.language) return;
                    
                    console.log(`🌍 Switching language to: ${lang}`);
                    this.switchLanguage(lang);
                });
            });
            
            console.log('✅ Language switcher setup complete');
        };
        
        setup();
        
        // Переустановка после загрузки компонентов
        window.addEventListener('componentsLoaded', () => {
            setTimeout(setup, 300);
        });
    },
    
    // Обновляет ВСЕ переключатели языка на странице
    updateAllLanguageSwitchers(lang) {
        // Обновляем десктопные переключатели
        const desktopSwitchers = document.querySelectorAll('.language-switcher');
        desktopSwitchers.forEach(switcher => {
            switcher.setAttribute('data-current-lang', lang);
        });
        
        // Обновляем мобильные переключатели в хедере
        const mobileHeaderSwitchers = document.querySelectorAll('.mobile-only-flags');
        mobileHeaderSwitchers.forEach(switcher => {
            switcher.setAttribute('data-current-lang', lang);
        });
        
        // Обновляем переключатели в мобильном меню
        const mobileMenuSwitchers = document.querySelectorAll('.mobile-language-switcher');
        mobileMenuSwitchers.forEach(switcher => {
            switcher.setAttribute('data-current-lang', lang);
        });
        
        // Обновляем активные кнопки
        const allLangBtns = document.querySelectorAll('.lang-btn, .mobile-lang-btn');
        allLangBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        // Обновляем состояние
        this.state.language = lang;
        localStorage.setItem('preferredLang', lang);
    },
    
    switchLanguage(lang) {
        this.updateAllLanguageSwitchers(lang);
        
        // Если есть i18n система, используем ее
        if (window.i18n) {
            if (typeof window.i18n.smoothSwitchLanguage === 'function') {
                window.i18n.smoothSwitchLanguage(lang);
            } else if (typeof window.i18n.switchLanguage === 'function') {
                window.i18n.switchLanguage(lang);
            }
        }
        
        // Закрываем мобильное меню после смены языка
        if (this.state.menuOpen) {
            setTimeout(() => {
                this.closeMobileMenu();
            }, 300);
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
                    if (this.state && this.state.menuOpen) {
                        setTimeout(() => {
                            this.closeMobileMenu();
                        }, 300);
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
                (currentPage.includes('index') && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    },
    
    // ===== ЭФФЕКТЫ ПРИ СКРОЛЛЕ =====
    setupScrollEffects() {
        const header = document.querySelector('.main-header');
        const scrollProgress = document.querySelector('.scroll-progress-bar');
        
        if (!header) return;
        
        const updateScroll = () => {
            const scrollY = window.pageYOffset;
            
            if (scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            if (scrollProgress) {
                const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (scrollY / windowHeight) * 100;
                scrollProgress.style.width = scrolled + '%';
            }
        };
        
        window.addEventListener('scroll', updateScroll);
        updateScroll(); // Инициализация
    },
    
    // ===== ФОРМЫ =====
    setupForms() {
        const forms = document.querySelectorAll('form[data-form]');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        });
    },
    
    async handleFormSubmit(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : '';
        
        if (submitBtn) {
            submitBtn.innerHTML = 'Отправка...';
            submitBtn.disabled = true;
        }
        
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            this.showNotification('Сообщение отправлено!', 'success');
            form.reset();
        } catch (error) {
            this.showNotification('Ошибка отправки', 'error');
        } finally {
            if (submitBtn) {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }
    },
    
    showNotification(message, type = 'info') {
        console.log(`📢 ${type}: ${message}`);
        
        // Удаляем старые уведомления
        document.querySelectorAll('.app-notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `app-notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 16px 24px;
            border-radius: 10px;
            z-index: 10000;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },
    
    // ===== ЛЕНИВАЯ ЗАГРУЗКА =====
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[data-src]');
            
            if (lazyImages.length === 0) return;
            
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        if (img.dataset.srcset) {
                            img.srcset = img.dataset.srcset;
                        }
                        img.removeAttribute('data-src');
                        img.removeAttribute('data-srcset');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    },
    
    // ===== ГЛОБАЛЬНЫЕ СОБЫТИЯ =====
    setupGlobalEvents() {
        window.addEventListener('resize', () => {
            this.state.isMobile = window.innerWidth <= 900;
            
            // Закрываем мобильное меню при переходе на десктоп
            if (!this.state.isMobile && this.state.menuOpen) {
                this.closeMobileMenu();
            }
        });
        
        window.addEventListener('componentsLoaded', () => {
            setTimeout(() => {
                this.setupBurgerMenu();
                this.setupActiveNav();
                this.setupLanguageSwitcher();
                this.setupSmoothScroll();
                this.setupScrollEffects();
            }, 300);
        });
        
        // Клавиша ESC для закрытия меню
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.state.menuOpen) {
                this.closeMobileMenu();
            }
        });
    },
    
    // ===== УТИЛИТЫ =====
    closeMobileMenu() {
        const menu = document.querySelector('.mobile-menu');
        const burger = document.querySelector('.burger-btn');
        if (menu && burger) {
            menu.classList.remove('active');
            burger.classList.remove('active');
            burger.setAttribute('aria-expanded', 'false');
            burger.setAttribute('aria-label', 'Открыть меню');
            document.body.style.overflow = '';
            this.state.menuOpen = false;
        }
    },
    
    openMobileMenu() {
        const menu = document.querySelector('.mobile-menu');
        const burger = document.querySelector('.burger-btn');
        if (menu && burger) {
            menu.classList.add('active');
            burger.classList.add('active');
            burger.setAttribute('aria-expanded', 'true');
            burger.setAttribute('aria-label', 'Закрыть меню');
            document.body.style.overflow = 'hidden';
            this.state.menuOpen = true;
        }
    }
};

// ===== ГЛОБАЛЬНЫЕ ФУНКЦИИ ДЛЯ СОВМЕСТИМОСТИ =====
window.openMobileMenu = () => {
    window.NBGroupApp.openMobileMenu();
};

window.closeMobileMenu = () => {
    window.NBGroupApp.closeMobileMenu();
};

// ===== ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ =====
(function initializeApp() {
    console.log('🚀 Starting app initialization...');
    
    function initApp() {
        // Ждем загрузки компонентов если они используются
        if (document.querySelector('#header-container') && 
            document.querySelector('#header-container').innerHTML === '') {
            console.log('⏳ Waiting for components to load...');
            
            const waitForComponents = () => {
                if (document.body && document.body.classList.contains('components-loaded')) {
                    console.log('✅ Components loaded, initializing app');
                    setTimeout(() => window.NBGroupApp.init(), 100);
                } else {
                    window.addEventListener('componentsLoaded', () => {
                        console.log('✅ Components loaded, initializing app');
                        setTimeout(() => window.NBGroupApp.init(), 100);
                    }, { once: true });
                    
                    // Фолбэк на случай если событие не пришло
                    setTimeout(() => {
                        if (!document.body || !document.body.classList.contains('components-loaded')) {
                            console.log('⚠️ Components timeout, initializing anyway');
                            window.NBGroupApp.init();
                        }
                    }, 3000);
                }
            };
            
            waitForComponents();
        } else {
            console.log('✅ Components already loaded or not used, initializing app');
            setTimeout(() => window.NBGroupApp.init(), 100);
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
})();

// ===== ТЕСТОВЫЕ И ОТЛАДОЧНЫЕ ФУНКЦИИ =====
if (window.location.hostname.includes('github.io')) {
    window.testBurger = function() {
        console.log('🧪 Testing burger menu...');
        const burgerBtn = document.querySelector('.burger-btn');
        if (burgerBtn) {
            burgerBtn.click();
        }
    };
    
    window.testLanguage = function(lang = 'en') {
        console.log(`🧪 Testing language switch to ${lang}...`);
        window.NBGroupApp.switchLanguage(lang);
    };
    
    window.showComponentsStatus = function() {
        console.log('🔍 Components Status:');
        console.log('- Header container:', document.querySelector('#header-container') ? 'Found' : 'Not found');
        console.log('- Mobile menu container:', document.querySelector('#mobile-menu-container') ? 'Found' : 'Not found');
        console.log('- Footer container:', document.querySelector('#footer-container') ? 'Found' : 'Not found');
        console.log('- Body class:', document.body.className);
        console.log('- Current language:', localStorage.getItem('preferredLang') || 'ru');
    };
}

// ===== CSS ДЛЯ АНИМАЦИЙ УВЕДОМЛЕНИЙ =====
(function addNotificationStyles() {
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
})();

// ===== ФИНАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ =====
window.addEventListener('load', () => {
    console.log('🎯 Page fully loaded');
    document.body.classList.add('page-loaded');
    
    // Финальная проверка и настройка
    setTimeout(() => {
        // Убеждаемся что активная навигация установлена
        window.NBGroupApp.setupActiveNav();
        
        // Убеждаемся что переключатели языка правильно отображаются
        const currentLang = localStorage.getItem('preferredLang') || 'ru';
        window.NBGroupApp.updateAllLanguageSwitchers(currentLang);
        
        // Добавляем CSS для активных состояний если нужно
        if (!document.querySelector('#active-states-css')) {
            const style = document.createElement('style');
            style.id = 'active-states-css';
            style.textContent = `
                .nav-link.active,
                .mobile-nav-link.active {
                    position: relative;
                }
                
                .lang-btn.active,
                .mobile-lang-btn.active {
                    position: relative;
                }
            `;
            document.head.appendChild(style);
        }
    }, 500);
});

// ===== ОБРАБОТКА ОШИБОК =====
window.addEventListener('error', (e) => {
    console.error('❌ Global error:', e.error);
});

console.log('✅ main.js loaded successfully');
