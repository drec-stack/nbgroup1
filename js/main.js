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
        this.setupBurgerMenu(); // ТОЛЬКО ОДИН ИСТОЧНИК УПРАВЛЕНИЯ
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
            document.body.classList.add(pageClass);
        }
    },
    
    // ===== БУРГЕР МЕНЮ - ПРОСТОЙ И РАБОЧИЙ =====
    setupBurgerMenu() {
        console.log('🍔 Setting up SIMPLE burger menu...');
        
        // Функция настройки
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
            
            // Простой обработчик клика
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
                (currentPage === '/' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    },
    
    // ===== ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКА =====
    setupLanguageSwitcher() {
        const langBtns = document.querySelectorAll('.lang-btn, .mobile-lang-btn');
        
        if (langBtns.length === 0) return;
        
        // Устанавливаем текущий язык
        const currentLang = localStorage.getItem('preferredLang') || 'ru';
        this.updateLanguageUI(currentLang);
        
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
        
        localStorage.setItem('preferredLang', lang);
        this.state.language = lang;
    },
    
    switchLanguage(lang) {
        if (window.i18n && typeof window.i18n.switchLanguage === 'function') {
            window.i18n.switchLanguage(lang);
        } else {
            this.updateLanguageUI(lang);
        }
    },
    
    // ===== ЭФФЕКТЫ ПРИ СКРОЛЛЕ =====
    setupScrollEffects() {
        const header = document.querySelector('.main-header');
        const scrollProgress = document.querySelector('.scroll-progress-bar');
        
        if (!header) return;
        
        window.addEventListener('scroll', () => {
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
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.remove(), 3000);
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
                        img.removeAttribute('data-src');
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
        });
        
        window.addEventListener('componentsLoaded', () => {
            setTimeout(() => {
                this.setupBurgerMenu();
                this.setupActiveNav();
                this.setupLanguageSwitcher();
            }, 300);
        });
    }
};

// ===== ГЛОБАЛЬНЫЕ ФУНКЦИИ =====
window.openMobileMenu = () => {
    const menu = document.querySelector('.mobile-menu');
    const burger = document.querySelector('.burger-btn');
    if (menu && burger) {
        menu.classList.add('active');
        burger.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

window.closeMobileMenu = () => {
    const menu = document.querySelector('.mobile-menu');
    const burger = document.querySelector('.burger-btn');
    if (menu && burger) {
        menu.classList.remove('active');
        burger.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// ===== ИНИЦИАЛИЗАЦИЯ =====
(function initializeApp() {
    console.log('🚀 Starting app initialization...');
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => window.NBGroupApp.init(), 100);
        });
    } else {
        setTimeout(() => window.NBGroupApp.init(), 100);
    }
})();

// ===== ТЕСТОВЫЕ ФУНКЦИИ =====
if (window.location.hostname.includes('github.io')) {
    window.testBurger = function() {
        console.log('🧪 Testing burger menu...');
        const burgerBtn = document.querySelector('.burger-btn');
        if (burgerBtn) {
            burgerBtn.click();
        }
    };
}

// ===== ФИНАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ =====
window.addEventListener('load', () => {
    console.log('🎯 Page fully loaded');
    document.body.classList.add('page-loaded');
});

console.log('✅ main.js loaded successfully');
