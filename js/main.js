console.log('🚀 main.js loaded - UNIVERSAL HEADER MANAGEMENT');

// ===== ГЛОБАЛЬНЫЙ ОБЪЕКТ ПРИЛОЖЕНИЯ =====
window.NBGroupApp = {
    // Состояние приложения
    state: {
        isMobile: window.innerWidth <= 900,
        currentPage: '',
        language: localStorage.getItem('preferredLang') || 'ru',
        menuOpen: false,
        headerHidden: false,
        lastScrollTop: 0,
        scrollDirection: 'none',
        isIndexPage: false,
        componentsLoaded: false
    },
    
    // Инициализация
    init() {
        console.log('🎬 Initializing NB Group Tech Application...');
        
        this.detectCurrentPage();
        this.setupGlobalConfig();
        this.setupEventListeners();
        this.setupBurgerMenu();
        this.setupLanguageSwitcher();
        this.setupSmoothScroll();
        this.setupActiveNav();
        this.setupHeaderManagement();
        this.setupScrollEffects();
        this.setupForms();
        this.setupLazyLoading();
        this.setupNotifications();
        
        console.log('✅ NB Group Tech Application initialized');
    },
    
    // Определение текущей страницы
    detectCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        this.state.currentPage = page;
        
        // Определяем главная ли это страница
        this.state.isIndexPage = page === 'index.html' || 
                                page === '' || 
                                page === '/' ||
                                document.body.classList.contains('home-page') ||
                                document.body.classList.contains('index-page');
        
        console.log(`📄 Current page: ${page}, isIndexPage: ${this.state.isIndexPage}`);
        
        // Добавляем класс страницы
        const pageClass = page.replace('.html', '') + '-page';
        if (pageClass !== '-page' && pageClass !== 'brandbook-page') {
            document.body.classList.add(pageClass);
        }
    },
    
    // Глобальная конфигурация
    setupGlobalConfig() {
        // Устанавливаем атрибуты для тестирования
        if (window.location.hostname.includes('localhost') || 
            window.location.hostname.includes('127.0.0.1') ||
            window.location.hostname.includes('github.io')) {
            console.log('🌍 Environment detected:', window.location.hostname);
        }
        
        // Добавляем CSS переменные для лучшего контроля
        document.documentElement.style.setProperty('--header-height', '80px');
        document.documentElement.style.setProperty('--mobile-header-height', '60px');
    },
    
    // Настройка обработчиков событий
    setupEventListeners() {
        // Ресайз окна
        window.addEventListener('resize', () => {
            this.state.isMobile = window.innerWidth <= 900;
            this.handleResize();
        });
        
        // Событие загрузки компонентов
        window.addEventListener('componentsLoaded', () => {
            console.log('📦 Components loaded event received');
            this.state.componentsLoaded = true;
            this.setupHeaderManagement();
            this.setupBurgerMenu();
            this.setupLanguageSwitcher();
        });
        
        // Обработка ошибок
        window.addEventListener('error', (e) => {
            console.error('❌ Global error:', e.error);
        });
        
        // Предотвращение контекстного меню на элементах управления
        document.addEventListener('contextmenu', (e) => {
            if (e.target.closest('.burger-btn') || e.target.closest('.language-switcher')) {
                e.preventDefault();
            }
        });
    },
    
    // Управление хедером (КРИТИЧЕСКИЙ ФИКС ДЛЯ ВСЕХ СТРАНИЦ)
    setupHeaderManagement() {
        console.log('🎯 Setting up unified header management...');
        
        const header = document.getElementById('main-header');
        if (!header) {
            console.warn('❌ Header element not found');
            setTimeout(() => this.setupHeaderManagement(), 500);
            return;
        }
        
        console.log('✅ Header found, applying universal fix...');
        
        // ФИКС: Гарантируем, что хедер виден и имеет правильные стили на всех страницах
        header.classList.remove('header-hidden');
        header.classList.add('header-visible');
        
        // Применяем CSS для унификации хедера на всех страницах
        this.applyUniversalHeaderStyles();
        
        // На главной странице включаем скрытие при скролле
        if (this.state.isIndexPage) {
            console.log('📄 Index page detected - enabling scroll hide behavior');
            this.setupHeaderScrollBehavior(header);
        } else {
            console.log('📄 Non-index page detected - disabling scroll hide');
            // На других страницах отключаем скрытие хедера
            this.disableHeaderScrollHiding(header);
        }
        
        // Добавляем обработчики для элементов хедера
        this.setupHeaderInteractions(header);
        
        console.log('✅ Header management setup complete');
    },
    
    // Применение универсальных стилей хедера
    applyUniversalHeaderStyles() {
        const styleId = 'universal-header-fix';
        let existingStyle = document.getElementById(styleId);
        
        if (existingStyle) {
            existingStyle.remove();
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        
        style.textContent = `
            /* ===== УНИВЕРСАЛЬНЫЙ ФИКС ДЛЯ ХЕДЕРА НА ВСЕХ СТРАНИЦАХ ===== */
            
            /* БАЗОВЫЕ СТИЛИ ДЛЯ ВСЕХ СТРАНИЦ */
            .main-header {
                position: fixed !important;
                top: 20px !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
                width: calc(100% - 40px) !important;
                max-width: 1400px !important;
                margin: 0 auto !important;
                padding: 15px 0 !important;
                border-radius: 20px !important;
                z-index: 1000 !important;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
                will-change: transform, opacity, backdrop-filter !important;
                pointer-events: auto !important;
                animation: none !important;
            }
            
            /* ПРОЗРАЧНЫЙ СТИЛЬ КАК НА ГЛАВНОЙ */
            .main-header {
                background: rgba(255, 255, 255, 0.08) !important;
                backdrop-filter: blur(40px) saturate(200%) !important;
                -webkit-backdrop-filter: blur(40px) saturate(200%) !important;
                border: 1px solid rgba(255, 255, 255, 0.15) !important;
                box-shadow: 
                    0 15px 50px rgba(0, 0, 0, 0.35),
                    inset 0 1px 0 rgba(255, 255, 255, 0.12) !important;
            }
            
            /* ЭФФЕКТ ПРИ СКРОЛЛЕ */
            .main-header.scrolled {
                background: rgba(255, 255, 255, 0.12) !important;
                backdrop-filter: blur(45px) saturate(200%) !important;
                -webkit-backdrop-filter: blur(45px) saturate(200%) !important;
                box-shadow: 
                    0 20px 60px rgba(0, 0, 0, 0.45),
                    inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
                border: 1px solid rgba(255, 255, 255, 0.18) !important;
                padding: 10px 0 !important;
            }
            
            /* ГАРАНТИРУЕМ ЧТО ХЕДЕР ВСЕГДА ВИДЕН */
            .main-header.header-visible {
                transform: translateX(-50%) translateY(0) !important;
                opacity: 1 !important;
                pointer-events: auto !important;
            }
            
            .main-header.header-hidden {
                transform: translateX(-50%) translateY(0) !important;
                opacity: 1 !important;
                pointer-events: auto !important;
            }
            
            /* МОБИЛЬНАЯ ВЕРСИЯ */
            @media (max-width: 900px) {
                .main-header {
                    position: fixed !important;
                    left: 0 !important;
                    transform: none !important;
                    width: 100% !important;
                    max-width: 100% !important;
                    border-radius: 0 !important;
                    top: 0 !important;
                    margin: 0 !important;
                    background: rgba(10, 10, 20, 0.98) !important;
                    backdrop-filter: blur(35px) !important;
                    -webkit-backdrop-filter: blur(35px) !important;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.15) !important;
                    box-shadow: 
                        0 8px 32px rgba(0, 0, 0, 0.4),
                        inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
                    padding: 12px 0 !important;
                }
                
                .main-header.scrolled {
                    background: rgba(10, 10, 20, 0.98) !important;
                    backdrop-filter: blur(40px) !important;
                    -webkit-backdrop-filter: blur(40px) !important;
                    padding: 10px 0 !important;
                }
                
                .main-header.header-visible {
                    transform: translateY(0) !important;
                }
                
                .main-header.header-hidden {
                    transform: translateY(0) !important;
                }
            }
            
            /* ФИКС ДЛЯ ПЕРЕКЛЮЧАТЕЛЯ ЯЗЫКА */
            .language-switcher.desktop-only {
                min-width: 120px !important;
            }
            
            .language-switcher.desktop-only .lang-btn {
                padding: 0 20px !important;
                gap: 8px !important;
            }
            
            .lang-text {
                display: inline-block !important;
                opacity: 1 !important;
                visibility: visible !important;
                font-weight: 700;
                font-size: 14px;
                color: rgba(255, 255, 255, 0.85);
            }
            
            .lang-btn.active .lang-text {
                color: white !important;
            }
            
            /* ДЛЯ МОБИЛЬНОГО ПЕРЕКЛЮЧАТЕЛЯ */
            @media (max-width: 768px) {
                .language-switcher.mobile-only-flags .lang-text {
                    display: none !important;
                }
            }
            
            /* ФИКС ДЛЯ ЛОГОТИПА */
            .logo {
                pointer-events: auto !important;
                cursor: pointer !important;
            }
            
            .logo-mark, .logo-text {
                pointer-events: auto !important;
            }
            
            /* ФИКС ДЛЯ КНОПКИ "НАЧАТЬ ПРОЕКТ" */
            .start-project-btn {
                pointer-events: auto !important;
                cursor: pointer !important;
            }
        `;
        
        document.head.appendChild(style);
        console.log('✅ Universal header styles applied');
    },
    
    // Настройка скрытия хедера при скролле (только для главной)
    setupHeaderScrollBehavior(header) {
        console.log('📜 Setting up scroll behavior for index page');
        
        const scrollThreshold = 50;
        let ticking = false;
        
        const updateHeaderState = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollingDown = scrollTop > this.state.lastScrollTop;
            
            // Обновляем направление скролла
            this.state.scrollDirection = scrollingDown ? 'down' : 'up';
            
            // Показываем хедер если прокрутили до верха
            if (scrollTop <= header.offsetHeight) {
                if (this.state.headerHidden) {
                    this.showHeader();
                }
            }
            // Прячем при скролле вниз
            else if (scrollingDown && scrollTop > header.offsetHeight + scrollThreshold) {
                if (!this.state.headerHidden) {
                    this.hideHeader();
                }
            }
            // Показываем при скролле вверх
            else if (!scrollingDown && scrollTop > header.offsetHeight) {
                if (this.state.headerHidden) {
                    this.showHeader();
                }
            }
            
            // Обновляем scrolled класс для стилей
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
                requestAnimationFrame(updateHeaderState);
            }
        };
        
        // Функции управления хедером
        this.showHeader = () => {
            if (this.state.headerHidden) {
                header.classList.remove('header-hidden');
                header.classList.add('header-visible');
                this.state.headerHidden = false;
                console.log('⬆️ Header shown');
            }
        };
        
        this.hideHeader = () => {
            if (!this.state.headerHidden) {
                header.classList.add('header-hidden');
                header.classList.remove('header-visible');
                this.state.headerHidden = true;
                console.log('⬇️ Header hidden');
            }
        };
        
        this.toggleHeader = () => {
            if (this.state.headerHidden) {
                this.showHeader();
            } else {
                this.hideHeader();
            }
        };
        
        // Экспортируем функции глобально
        window.showHeader = this.showHeader;
        window.hideHeader = this.hideHeader;
        window.toggleHeader = this.toggleHeader;
        
        // Настраиваем обработчик скролла
        window.addEventListener('scroll', onScroll, { passive: true });
        
        // Инициализация начального состояния
        this.state.lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        updateHeaderState();
        
        console.log('✅ Header scroll behavior initialized for index page');
    },
    
    // Отключение скрытия хедера при скролле (для других страниц)
    disableHeaderScrollHiding(header) {
        console.log('📜 Disabling header scroll hiding for non-index pages');
        
        // Убираем классы скрытия
        header.classList.remove('header-hidden');
        header.classList.add('header-visible');
        this.state.headerHidden = false;
        
        // Настраиваем только класс scrolled при скролле
        const updateScrolledClass = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        
        window.addEventListener('scroll', updateScrolledClass, { passive: true });
        updateScrolledClass(); // Инициализация
        
        console.log('✅ Header scroll hiding disabled');
    },
    
    // Настройка взаимодействий с хедером
    setupHeaderInteractions(header) {
        // Показываем хедер при клике на элементы
        const headerElements = header.querySelectorAll('a, button, .nav-link, .lang-btn, .logo, .start-project-btn');
        headerElements.forEach(el => {
            el.addEventListener('click', () => {
                if (this.state.headerHidden) {
                    this.showHeader();
                }
            });
            
            el.addEventListener('focus', () => {
                if (this.state.headerHidden) {
                    this.showHeader();
                }
            });
            
            // Гарантируем кликабельность
            el.style.pointerEvents = 'auto';
            el.style.cursor = 'pointer';
        });
        
        // Показываем хедер при наведении (только для десктопа)
        if (!this.state.isMobile) {
            header.addEventListener('mouseenter', () => {
                if (this.state.headerHidden) {
                    this.showHeader();
                }
            });
        }
    },
    
    // Обработка ресайза
    handleResize() {
        console.log(`🔄 Window resized: ${window.innerWidth}px, isMobile: ${this.state.isMobile}`);
        
        // Обновляем хедер при ресайзе
        const header = document.getElementById('main-header');
        if (header) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop <= header.offsetHeight && this.state.headerHidden) {
                this.showHeader();
            }
        }
        
        // Закрываем мобильное меню при переходе на десктоп
        if (!this.state.isMobile && this.state.menuOpen) {
            this.closeMobileMenu();
        }
    },
    
    // ===== БУРГЕР МЕНЮ =====
    setupBurgerMenu() {
        console.log('🍔 Setting up burger menu...');
        
        const setup = () => {
            const burgerBtn = document.querySelector('.burger-btn');
            const mobileMenu = document.querySelector('.mobile-menu');
            
            if (!burgerBtn || !mobileMenu) {
                console.log('⚠️ Burger menu elements not found, retrying...');
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
                    this.closeMobileMenu();
                } else {
                    this.openMobileMenu();
                }
            });
            
            // Закрытие при клике на ссылки
            const mobileLinks = mobileMenu.querySelectorAll('a, button');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    setTimeout(() => {
                        this.closeMobileMenu();
                    }, 300);
                });
            });
            
            // Закрытие при клике вне меню
            document.addEventListener('click', (e) => {
                if (this.state.menuOpen && 
                    !mobileMenu.contains(e.target) && 
                    !newBurgerBtn.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
            
            // Закрытие при нажатии ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.state.menuOpen) {
                    this.closeMobileMenu();
                }
            });
            
            console.log('✅ Burger menu setup complete');
        };
        
        setup();
    },
    
    // ===== ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКА =====
    setupLanguageSwitcher() {
        console.log('🌍 Setting up language switcher...');
        
        const setup = () => {
            const langBtns = document.querySelectorAll('.lang-btn');
            
            if (langBtns.length === 0) {
                console.log('⚠️ Language buttons not found, retrying...');
                setTimeout(setup, 500);
                return;
            }
            
            console.log(`✅ Found ${langBtns.length} language buttons`);
            
            const currentLang = localStorage.getItem('preferredLang') || 'ru';
            this.updateAllLanguageSwitchers(currentLang);
            
            langBtns.forEach(btn => {
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);
                
                newBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const lang = newBtn.getAttribute('data-lang');
                    if (lang === this.state.language) return;
                    
                    console.log(`🌍 Switching language to: ${lang}`);
                    this.switchLanguage(lang);
                    
                    // Показываем хедер при смене языка
                    if (this.state.headerHidden) {
                        this.showHeader();
                    }
                });
            });
            
            console.log('✅ Language switcher setup complete');
        };
        
        setup();
    },
    
    updateAllLanguageSwitchers(lang) {
        // Обновляем все переключатели языка на странице
        const desktopSwitchers = document.querySelectorAll('.language-switcher');
        desktopSwitchers.forEach(switcher => {
            switcher.setAttribute('data-current-lang', lang);
        });
        
        const mobileHeaderSwitchers = document.querySelectorAll('.mobile-only-flags');
        mobileHeaderSwitchers.forEach(switcher => {
            switcher.setAttribute('data-current-lang', lang);
        });
        
        const allLangBtns = document.querySelectorAll('.lang-btn');
        allLangBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        this.state.language = lang;
        localStorage.setItem('preferredLang', lang);
        
        console.log(`✅ Language updated to: ${lang}`);
    },
    
    switchLanguage(lang) {
        this.updateAllLanguageSwitchers(lang);
        
        // Если есть система i18n, используем ее
        if (window.i18n) {
            if (typeof window.i18n.smoothSwitchLanguage === 'function') {
                window.i18n.smoothSwitchLanguage(lang);
            } else if (typeof window.i18n.switchLanguage === 'function') {
                window.i18n.switchLanguage(lang);
            }
        }
        
        // Закрываем меню если оно открыто
        if (this.state.menuOpen) {
            setTimeout(() => {
                this.closeMobileMenu();
            }, 300);
        }
    },
    
    // ===== ПЛАВНАЯ ПРОКРУТКА =====
    setupSmoothScroll() {
        console.log('🔄 Setting up smooth scroll...');
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const targetId = href.startsWith('#') ? href : '#' + href.split('#')[1];
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Показываем хедер если он скрыт
                    if (this.state.headerHidden) {
                        this.showHeader();
                    }
                    
                    // Ждем пока хедер появится
                    setTimeout(() => {
                        const header = document.querySelector('.main-header');
                        const headerHeight = header ? header.offsetHeight : 0;
                        const targetPosition = targetElement.offsetTop - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });

                        // Обновляем URL без перезагрузки
                        history.pushState(null, null, targetId);
                        
                        // Закрываем мобильное меню если открыто
                        if (this.state.menuOpen) {
                            setTimeout(() => {
                                this.closeMobileMenu();
                            }, 300);
                        }
                    }, 100);
                }
            }.bind(this));
        });
        
        console.log('✅ Smooth scroll setup complete');
    },
    
    // ===== АКТИВНАЯ НАВИГАЦИЯ =====
    setupActiveNav() {
        console.log('📍 Setting up active navigation...');
        
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
        
        console.log('✅ Active navigation setup complete');
    },
    
    // ===== ЭФФЕКТЫ ПРИ СКРОЛЛЕ =====
    setupScrollEffects() {
        console.log('📊 Setting up scroll effects...');
        
        const header = document.querySelector('.main-header');
        const scrollProgress = document.querySelector('.scroll-progress-bar');
        
        if (!header) return;
        
        const updateScroll = () => {
            const scrollY = window.pageYOffset;
            
            // Прогресс бар
            if (scrollProgress) {
                const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (scrollY / windowHeight) * 100;
                scrollProgress.style.width = scrolled + '%';
            }
        };
        
        window.addEventListener('scroll', updateScroll);
        updateScroll(); // Инициализация
        
        console.log('✅ Scroll effects setup complete');
    },
    
    // ===== ФОРМЫ =====
    setupForms() {
        console.log('📝 Setting up forms...');
        
        const forms = document.querySelectorAll('form[data-form]');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        });
        
        console.log('✅ Forms setup complete');
    },
    
    async handleFormSubmit(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : '';
        
        if (submitBtn) {
            submitBtn.innerHTML = 'Отправка...';
            submitBtn.disabled = true;
        }
        
        try {
            // Имитация отправки формы
            await new Promise(resolve => setTimeout(resolve, 2000));
            this.showNotification('Сообщение отправлено успешно!', 'success');
            form.reset();
        } catch (error) {
            this.showNotification('Ошибка отправки сообщения', 'error');
        } finally {
            if (submitBtn) {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }
    },
    
    // ===== ЛЕНИВАЯ ЗАГРУЗКА =====
    setupLazyLoading() {
        console.log('🖼️ Setting up lazy loading...');
        
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[data-src]');
            
            if (lazyImages.length === 0) {
                console.log('⚠️ No lazy images found');
                return;
            }
            
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
                        console.log(`🖼️ Lazy loaded: ${img.src}`);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
            console.log(`✅ Lazy loading setup for ${lazyImages.length} images`);
        } else {
            console.log('⚠️ IntersectionObserver not supported, skipping lazy loading');
        }
    },
    
    // ===== УВЕДОМЛЕНИЯ =====
    setupNotifications() {
        console.log('🔔 Setting up notifications...');
        
        // Добавляем CSS для уведомлений если его нет
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .app-notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    padding: 16px 24px;
                    border-radius: 10px;
                    z-index: 10000;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                    animation: notificationSlideIn 0.3s ease;
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    max-width: 400px;
                }
                
                .notification-success {
                    background: rgba(76, 175, 80, 0.15);
                    border-color: rgba(76, 175, 80, 0.3);
                    color: #4CAF50;
                }
                
                .notification-error {
                    background: rgba(244, 67, 54, 0.15);
                    border-color: rgba(244, 67, 54, 0.3);
                    color: #F44336;
                }
                
                .notification-info {
                    background: rgba(33, 150, 243, 0.15);
                    border-color: rgba(33, 150, 243, 0.3);
                    color: #2196F3;
                }
                
                @keyframes notificationSlideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes notificationSlideOut {
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
        
        console.log('✅ Notifications setup complete');
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
        
        document.body.appendChild(notification);
        
        // Автоматическое скрытие
        setTimeout(() => {
            notification.style.animation = 'notificationSlideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },
    
    // ===== УТИЛИТЫ =====
    openMobileMenu() {
        const menu = document.querySelector('.mobile-menu');
        const burger = document.querySelector('.burger-btn');
        if (menu && burger) {
            // Показываем хедер если он скрыт
            if (this.state.headerHidden) {
                this.showHeader();
            }
            
            menu.classList.add('active');
            burger.classList.add('active');
            burger.setAttribute('aria-expanded', 'true');
            burger.setAttribute('aria-label', 'Закрыть меню');
            document.body.style.overflow = 'hidden';
            this.state.menuOpen = true;
            
            console.log('🍔 Mobile menu opened');
        }
    },
    
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
            
            console.log('🍔 Mobile menu closed');
        }
    },
    
    // Глобальные утилиты для отладки
    debugHeader() {
        const header = document.getElementById('main-header');
        if (!header) {
            console.log('❌ Header not found');
            return;
        }
        
        console.log('🔍 Header debug info:');
        console.log('- Classes:', header.className);
        console.log('- Is hidden:', this.state.headerHidden);
        console.log('- Scroll position:', this.state.lastScrollTop);
        console.log('- Is mobile:', this.state.isMobile);
        console.log('- Is index page:', this.state.isIndexPage);
        console.log('- Bounding rect:', header.getBoundingClientRect());
    }
};

// ===== ГЛОБАЛЬНЫЕ ФУНКЦИИ ДЛЯ СОВМЕСТИМОСТИ =====
window.openMobileMenu = () => window.NBGroupApp.openMobileMenu?.();
window.closeMobileMenu = () => window.NBGroupApp.closeMobileMenu?.();
window.showHeader = () => window.NBGroupApp.showHeader?.();
window.hideHeader = () => window.NBGroupApp.hideHeader?.();
window.toggleHeader = () => window.NBGroupApp.toggleHeader?.();
window.debugHeader = () => window.NBGroupApp.debugHeader?.();

// ===== ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ =====
(function initializeApp() {
    console.log('🚀 Starting application initialization...');
    
    function initApp() {
        // Проверяем загружены ли компоненты
        if (document.body.classList.contains('components-loaded')) {
            console.log('✅ Components already loaded, initializing app');
            setTimeout(() => window.NBGroupApp.init(), 100);
        } else {
            // Ждем загрузки компонентов
            const waitForComponents = () => {
                if (document.body.classList.contains('components-loaded')) {
                    console.log('✅ Components loaded, initializing app');
                    setTimeout(() => window.NBGroupApp.init(), 100);
                } else {
                    window.addEventListener('componentsLoaded', () => {
                        console.log('✅ Components loaded via event, initializing app');
                        setTimeout(() => window.NBGroupApp.init(), 100);
                    }, { once: true });
                    
                    // Таймаут на всякий случай
                    setTimeout(() => {
                        if (!document.body.classList.contains('components-loaded')) {
                            console.log('⚠️ Components timeout, initializing app anyway');
                            window.NBGroupApp.init();
                        }
                    }, 5000);
                }
            };
            
            waitForComponents();
        }
    }
    
    // Ждем готовности DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
})();

// ===== ФИНАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ ПРИ ПОЛНОЙ ЗАГРУЗКЕ СТРАНИЦЫ =====
window.addEventListener('load', () => {
    console.log('🎯 Page fully loaded');
    document.body.classList.add('page-loaded');
    
    // Финальная настройка
    setTimeout(() => {
        // Обновляем активную навигацию
        window.NBGroupApp.setupActiveNav();
        
        // Обновляем переключатель языка
        const currentLang = localStorage.getItem('preferredLang') || 'ru';
        window.NBGroupApp.updateAllLanguageSwitchers(currentLang);
        
        // Добавляем CSS для активных состояний
        if (!document.querySelector('#active-states-css')) {
            const style = document.createElement('style');
            style.id = 'active-states-css';
            style.textContent = `
                /* Активные состояния */
                .nav-link.active,
                .mobile-nav-link.active {
                    position: relative;
                }
                
                .lang-btn.active,
                .mobile-lang-btn.active {
                    position: relative;
                }
                
                /* Оптимизация для touch устройств */
                @media (hover: none) and (pointer: coarse) {
                    .main-header {
                        transition: transform 0.3s ease !important;
                    }
                    
                    .nav-link:hover,
                    .lang-btn:hover {
                        transform: none !important;
                    }
                }
                
                /* Гарантируем видимость хедера */
                .main-header {
                    visibility: visible !important;
                    opacity: 1 !important;
                }
            `;
            document.head.appendChild(style);
        }
        
        console.log('✅ Final initialization complete');
    }, 500);
});

// ===== ТЕСТОВЫЕ И УТИЛИТНЫЕ ФУНКЦИИ =====
if (window.location.hostname.includes('github.io') || 
    window.location.hostname.includes('localhost') || 
    window.location.hostname.includes('127.0.0.1')) {
    
    window.testHeader = function() {
        console.log('🧪 Testing header...');
        window.NBGroupApp.debugHeader();
    };
    
    window.testLanguage = function() {
        console.log('🧪 Testing language switcher...');
        console.log('- Current language:', window.NBGroupApp.state.language);
        console.log('- Preferred language:', localStorage.getItem('preferredLang'));
    };
    
    window.reloadApp = function() {
        console.log('🔄 Reloading app...');
        location.reload();
    };
    
    window.checkComponents = function() {
        console.log('🔍 Checking components...');
        const containers = ['header-container', 'footer-container', 'mobile-menu-container'];
        containers.forEach(id => {
            const el = document.getElementById(id);
            console.log(`${id}: ${el ? 'FOUND' : 'MISSING'}`);
            if (el) {
                console.log(`  - Content length: ${el.innerHTML.length} chars`);
                console.log(`  - Has content: ${el.innerHTML.trim() !== ''}`);
            }
        });
    };
}

console.log('✅ main.js loaded successfully - UNIVERSAL HEADER MANAGEMENT ACTIVE');
