console.log('🚀 main.js loaded - WITH FIX FOR OTHER PAGES');

window.NBGroupApp = {
    state: {
        isMobile: window.innerWidth <= 900,
        currentPage: '',
        language: localStorage.getItem('preferredLang') || 'ru',
        menuOpen: false,
        headerHidden: false,
        lastScrollTop: 0
    },
    
    init() {
        console.log('🎬 Initializing app...');
        
        this.detectPage();
        this.setupHeaderBehavior();
        this.setupBurgerMenu();
        this.setupLanguage();
        this.setupScroll();
        this.setupActiveNav();
        
        console.log('✅ App initialized');
    },
    
    detectPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        this.state.currentPage = page;
        
        const pageClass = page.replace('.html', '') + '-page';
        if (pageClass !== '-page' && pageClass !== 'brandbook-page') {
            document.body.classList.add(pageClass);
        }
    },
    
    // КРИТИЧЕСКИЙ ФИКС: Настройка поведения хедера для всех страниц
    setupHeaderBehavior() {
        console.log('🎯 Setting up header behavior...');
        
        const header = document.getElementById('main-header');
        if (!header) {
            console.warn('❌ Header not found');
            return;
        }
        
        // На страницах кроме главной отключаем скрытие хедера
        const isIndexPage = document.body.classList.contains('index-page') || 
                           document.body.classList.contains('home-page') ||
                           this.state.currentPage === 'index.html' ||
                           this.state.currentPage === '' ||
                           this.state.currentPage === '/';
        
        console.log('📄 Is index page?', isIndexPage);
        
        // ФИКС: Для всех страниц кроме главной применяем стили как на главной
        if (!isIndexPage) {
            console.log('🎨 Applying index-like styles to header');
            
            // Добавляем CSS для страниц кроме главной
            const styleId = 'non-index-header-fix';
            if (!document.getElementById(styleId)) {
                const style = document.createElement('style');
                style.id = styleId;
                style.textContent = `
                    /* ПРОЗРАЧНЫЙ ХЕДЕР ДЛЯ ВСЕХ СТРАНИЦ КРОМЕ ГЛАВНОЙ */
                    body:not(.home-page):not(.index-page) .main-header {
                        background: rgba(255, 255, 255, 0.08) !important;
                        backdrop-filter: blur(30px) saturate(180%) !important;
                        -webkit-backdrop-filter: blur(30px) saturate(180%) !important;
                        box-shadow: 
                            0 8px 32px rgba(0, 0, 0, 0.3),
                            inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
                        border: 1px solid rgba(255, 255, 255, 0.15) !important;
                        position: fixed !important;
                        top: 20px !important;
                        left: 50% !important;
                        transform: translateX(-50%) !important;
                        width: calc(100% - 40px) !important;
                        max-width: 1400px !important;
                        padding: 15px 0 !important;
                        border-radius: 20px !important;
                        z-index: 1000 !important;
                    }
                    
                    body:not(.home-page):not(.index-page) .main-header.scrolled {
                        background: rgba(255, 255, 255, 0.12) !important;
                        backdrop-filter: blur(35px) saturate(200%) !important;
                        -webkit-backdrop-filter: blur(35px) saturate(200%) !important;
                        box-shadow: 
                            0 12px 40px rgba(0, 0, 0, 0.4),
                            inset 0 1px 0 rgba(255, 255, 255, 0.12) !important;
                    }
                    
                    /* Для мобильных */
                    @media (max-width: 900px) {
                        body:not(.home-page):not(.index-page) .main-header {
                            background: rgba(255, 255, 255, 0.08) !important;
                            backdrop-filter: blur(30px) !important;
                            -webkit-backdrop-filter: blur(30px) !important;
                            border-bottom: 1px solid rgba(255, 255, 255, 0.15) !important;
                            top: 0 !important;
                            left: 0 !important;
                            transform: none !important;
                            width: 100% !important;
                            border-radius: 0 !important;
                            padding: 12px 0 !important;
                        }
                        
                        body:not(.home-page):not(.index-page) .main-header.scrolled {
                            background: rgba(255, 255, 255, 0.12) !important;
                            backdrop-filter: blur(35px) !important;
                            -webkit-backdrop-filter: blur(35px) !important;
                        }
                    }
                `;
                document.head.appendChild(style);
                console.log('✅ Applied header fix for non-index pages');
            }
            
            // Отключаем скрытие хдера на этих страницах
            header.classList.remove('header-hidden');
            header.classList.add('header-visible');
            
            // Удаляем обработчик скрытия хедера
            const scrollHandler = () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            };
            
            window.addEventListener('scroll', scrollHandler);
            scrollHandler(); // Инициализация
            
            console.log('📄 Header hide disabled for non-index pages');
            return; // Прекращаем дальнейшую настройку скрытия
        }
        
        // На главной странице оставляем скрытие хедера при скролле
        const scrollThreshold = 50;
        let ticking = false;
        
        const updateHeader = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollingDown = scrollTop > this.state.lastScrollTop;
            
            if (scrollTop <= header.offsetHeight) {
                this.showHeader();
            } else if (scrollingDown && scrollTop > header.offsetHeight + scrollThreshold) {
                this.hideHeader();
            } else if (!scrollingDown && scrollTop > header.offsetHeight) {
                this.showHeader();
            }
            
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            this.state.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            ticking = false;
        };
        
        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(updateHeader);
            }
        };
        
        this.showHeader = () => {
            if (this.state.headerHidden) {
                header.classList.remove('header-hidden');
                header.classList.add('header-visible');
                this.state.headerHidden = false;
            }
        };
        
        this.hideHeader = () => {
            if (!this.state.headerHidden) {
                header.classList.add('header-hidden');
                header.classList.remove('header-visible');
                this.state.headerHidden = true;
            }
        };
        
        window.addEventListener('scroll', onScroll, { passive: true });
        this.state.lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        updateHeader();
    },
    
    setupBurgerMenu() {
        const setup = () => {
            const burger = document.querySelector('.burger-btn');
            const menu = document.querySelector('.mobile-menu');
            
            if (!burger || !menu) {
                setTimeout(setup, 500);
                return;
            }
            
            burger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                if (menu.classList.contains('active')) {
                    this.closeMenu();
                } else {
                    this.openMenu();
                }
            });
            
            // Закрытие при клике на ссылки
            menu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMenu();
                });
            });
        };
        
        setup();
    },
    
    setupLanguage() {
        const setup = () => {
            const langBtns = document.querySelectorAll('.lang-btn');
            if (!langBtns.length) {
                setTimeout(setup, 500);
                return;
            }
            
            const currentLang = localStorage.getItem('preferredLang') || 'ru';
            this.updateLanguage(currentLang);
            
            langBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const lang = btn.getAttribute('data-lang');
                    if (lang !== this.state.language) {
                        this.switchLanguage(lang);
                    }
                });
            });
        };
        
        setup();
    },
    
    updateLanguage(lang) {
        this.state.language = lang;
        localStorage.setItem('preferredLang', lang);
        
        const switchers = document.querySelectorAll('.language-switcher');
        switchers.forEach(el => el.setAttribute('data-current-lang', lang));
        
        const allBtns = document.querySelectorAll('.lang-btn');
        allBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
    },
    
    switchLanguage(lang) {
        this.updateLanguage(lang);
        
        if (window.i18n) {
            if (typeof window.i18n.smoothSwitchLanguage === 'function') {
                window.i18n.smoothSwitchLanguage(lang);
            } else if (typeof window.i18n.switchLanguage === 'function') {
                window.i18n.switchLanguage(lang);
            }
        }
        
        this.closeMenu();
    },
    
    setupScroll() {
        // Плавная прокрутка
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const targetId = href.startsWith('#') ? href : '#' + href.split('#')[1];
                const target = document.querySelector(targetId);
                
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Прогресс скролла
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (progressBar) {
            window.addEventListener('scroll', () => {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                progressBar.style.width = scrolled + '%';
            });
        }
    },
    
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
    
    openMenu() {
        const menu = document.querySelector('.mobile-menu');
        const burger = document.querySelector('.burger-btn');
        if (menu && burger) {
            menu.classList.add('active');
            burger.classList.add('active');
            burger.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
            this.state.menuOpen = true;
        }
    },
    
    closeMenu() {
        const menu = document.querySelector('.mobile-menu');
        const burger = document.querySelector('.burger-btn');
        if (menu && burger) {
            menu.classList.remove('active');
            burger.classList.remove('active');
            burger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            this.state.menuOpen = false;
        }
    }
};

// Инициализация приложения
(function() {
    console.log('🚀 Starting app...');
    
    function init() {
        // Ждем загрузки компонентов
        if (document.body.classList.contains('components-loaded')) {
            window.NBGroupApp.init();
        } else {
            window.addEventListener('componentsLoaded', () => {
                setTimeout(() => window.NBGroupApp.init(), 100);
            });
            
            setTimeout(() => {
                if (!document.body.classList.contains('components-loaded')) {
                    window.NBGroupApp.init();
                }
            }, 3000);
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

// Глобальные функции для удобства
window.showHeader = () => window.NBGroupApp.showHeader?.();
window.hideHeader = () => window.NBGroupApp.hideHeader?.();
window.openMenu = () => window.NBGroupApp.openMenu?.();
window.closeMenu = () => window.NBGroupApp.closeMenu?.();

console.log('✅ main.js loaded successfully');
