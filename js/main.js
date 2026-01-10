console.log('🚀 main.js loaded with NO HIDDEN BUTTONS fix');

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
        
        // Определяем тип страницы ДО инициализации
        this.isServicesPage = document.body.classList.contains('services-page') || 
                              window.location.pathname.includes('services.html');
        this.isAboutPage = document.body.classList.contains('about-page') || 
                           window.location.pathname.includes('about.html');
        
        this.isHomePage = !this.isServicesPage && !this.isAboutPage && 
                          (window.location.pathname.endsWith('index.html') || 
                           window.location.pathname === '/' || 
                           window.location.pathname === '');
        
        console.log(`📄 Page type detected: ${this.isServicesPage ? 'Services' : this.isAboutPage ? 'About' : this.isHomePage ? 'Home' : 'Internal'}`);
        
        // Ждем загрузки компонентов перед инициализацией
        this.waitForComponents().then(() => {
            this.init();
        }).catch(() => {
            console.warn('⚠️ Component wait timeout, initializing anyway');
            this.init();
        });
    }

    async waitForComponents() {
        return new Promise((resolve) => {
            // Если компоненты уже загружены
            if (document.querySelector('#header-container.component-loaded')) {
                console.log('✅ Components already loaded');
                resolve();
                return;
            }
            
            // Ждем событие загрузки компонентов
            const onComponentsLoaded = () => {
                console.log('✅ Components loaded, proceeding with app init');
                resolve();
                window.removeEventListener('componentsLoaded', onComponentsLoaded);
                window.removeEventListener('componentsFullyLoaded', onComponentsLoaded);
            };
            
            window.addEventListener('componentsLoaded', onComponentsLoaded);
            window.addEventListener('componentsFullyLoaded', onComponentsLoaded);
            
            // Таймаут на случай если событие не придет
            setTimeout(() => {
                console.log('⏰ Components wait timeout');
                resolve();
            }, 2000);
        });
    }

    init() {
        console.log('🚀 Daehaa App initializing with NO HIDDEN BUTTONS...');
        
        // СНАЧАЛА УДАЛЯЕМ ВСЕ СКРЫТЫЕ ЭЛЕМЕНТЫ
        this.removeAllHiddenElements();
        
        // Базовые функции которые работают на всех страницах
        this.setupSmoothScroll();
        this.setupCurrentPage();
        this.setupLanguageSupport();
        this.setupMobileOptimizations();
        this.setupFormHandling();
        this.setupLazyLoading();
        this.setupClickableElements();
        this.setupNavigationTracking();
        
        // Настройка хедера (с учетом типа страницы) - с задержкой
        setTimeout(() => {
            this.setupHeaderSupport();
        }, 300);
        
        // Футер
        this.setupFooterSupport();
        this.initializeExistingFooter();
        
        console.log('✅ Daehaa application initialized (NO HIDDEN BUTTONS)');
    }

    removeAllHiddenElements() {
        console.log('🗑️ Removing all hidden elements...');
        
        // Удаляем все элементы бургер-меню
        const hiddenSelectors = [
            '.mobile-menu-toggle',
            '.menu-toggle',
            '.burger-menu',
            '.hamburger',
            '.menu-btn',
            '.nav-toggle',
            '.mobile-menu-overlay',
            '.menu-overlay',
            '.mobile-menu',
            '.menu-container'
        ];
        
        // ДОБАВЛЯЕМ НОВЫЕ СЕЛЕКТОРЫ ДЛЯ FLOATING-СЕКЦИИ
        hiddenSelectors.push(
            '.floating-section a:not(.floating-button)',
            '.floating-section button:not(.floating-button)',
            '.floating-section [href]:not(.floating-button)',
            '.floating-section [role="button"]:not(.floating-button)'
        );
        
        hiddenSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (el.parentNode) {
                    console.log(`🗑️ Removing: ${selector}`);
                    el.style.display = 'none';
                    el.style.visibility = 'hidden';
                    el.style.opacity = '0';
                    el.style.pointerEvents = 'none';
                }
            });
        });
        
        // Добавляем класс к body для CSS контроля
        document.body.classList.add('no-hidden-buttons');
        
        // Удаляем все обработчики событий для этих элементов
        document.removeEventListener('click', this.handleMobileMenuClick);
        document.removeEventListener('keydown', this.handleMobileMenuEscape);
        
        // ДОПОЛНИТЕЛЬНАЯ ПРОВЕРКА ДЛЯ FLOATING-СЕКЦИИ
        setTimeout(() => {
            const floatingSection = document.querySelector('.floating-section');
            if (floatingSection) {
                console.log('🔍 Checking Floating section for hidden elements...');
                
                // Находим все элементы внутри секции кроме кнопки
                const allElements = floatingSection.querySelectorAll('*');
                allElements.forEach(el => {
                    // Пропускаем саму кнопку и её дочерние элементы
                    if (el.classList.contains('floating-button') || el.closest('.floating-button')) {
                        return;
                    }
                    
                    // Удаляем все интерактивные элементы кроме кнопки
                    if (
                        (el.tagName === 'A' && !el.classList.contains('floating-button')) ||
                        (el.tagName === 'BUTTON' && !el.classList.contains('floating-button')) ||
                        el.getAttribute('href') && !el.classList.contains('floating-button') ||
                        el.getAttribute('onclick') ||
                        el.getAttribute('role') === 'button' && !el.classList.contains('floating-button')
                    ) {
                        el.style.display = 'none';
                        el.style.visibility = 'hidden';
                        el.style.opacity = '0';
                        el.style.pointerEvents = 'none';
                        console.log(`🗑️ Removed hidden interactive element: ${el.tagName}${el.className ? '.' + el.className : ''}`);
                    }
                });
                
                console.log('✅ Floating section cleaned');
            }
        }, 100);
        
        console.log('✅ All hidden elements removed');
    }

    setupHeaderSupport() {
        console.log('🔧 Setting up SIMPLE header support (no hidden buttons)...');
        
        // Попытка найти хедер с несколькими попытками
        this.findAndSetupHeader(0);
    }

    findAndSetupHeader(attempt) {
        const maxAttempts = 5;
        
        // Пытаемся найти хедер с несколькими селекторами
        const headerSelectors = [
            '.main-header', 
            'header[class*="header"]', 
            'header', 
            '#main-header',
            '[data-header]',
            'nav.main-nav',
            '.header',
            'nav'
        ];
        
        let header = null;
        let foundWithSelector = '';
        
        for (const selector of headerSelectors) {
            header = document.querySelector(selector);
            if (header) {
                foundWithSelector = selector;
                break;
            }
        }
        
        // Если не нашли напрямую, ищем в контейнере компонента
        if (!header) {
            const headerContainer = document.getElementById('header-container');
            if (headerContainer) {
                // Проверяем наличие компонента внутри контейнера
                header = headerContainer.querySelector('.main-header') || 
                        headerContainer.querySelector('header') ||
                        headerContainer.querySelector('#main-header') ||
                        headerContainer.querySelector('[data-header]') ||
                        headerContainer.querySelector('nav');
                
                if (header) {
                    foundWithSelector = 'container search';
                }
            }
        }
        
        if (header) {
            console.log(`✅ Found header with: ${foundWithSelector}`);
            this.setupSimpleHeader(header);
            console.log('✅ Header setup complete');
        } else {
            attempt++;
            console.warn(`⚠️ Header not found (attempt ${attempt}/${maxAttempts})`);
            
            if (attempt < maxAttempts) {
                // Проверяем, загружен ли компонент хедера
                const headerContainer = document.getElementById('header-container');
                if (headerContainer && !headerContainer.classList.contains('component-loaded')) {
                    console.log(`⏳ Header component not loaded yet, retrying in 500ms...`);
                    setTimeout(() => this.findAndSetupHeader(attempt), 500);
                } else {
                    console.log('📦 Header container found but empty, creating fallback...');
                    this.createFallbackHeader();
                }
            } else {
                console.error('❌ Header not found after maximum attempts');
                this.createFallbackHeader();
            }
        }
    }

    createFallbackHeader() {
        console.log('🛠️ Creating fallback header...');
        
        const headerContainer = document.getElementById('header-container');
        if (!headerContainer) {
            console.error('❌ header-container not found for fallback');
            return;
        }
        
        const fallbackHTML = `
            <header class="main-header" data-header="fallback">
                <nav class="main-nav">
                    <div class="nav-logo">
                        <a href="index.html" class="logo-link">
                            <img src="images/logo.jpg" alt="NBGroup" class="logo">
                        </a>
                    </div>
                    <div class="nav-menu">
                        <a href="index.html" class="nav-link active">Home</a>
                        <a href="services.html" class="nav-link">Services</a>
                        <a href="portfolio.html" class="nav-link">Portfolio</a>
                        <a href="about.html" class="nav-link">About</a>
                        <a href="contacts.html" class="nav-link">Contacts</a>
                    </div>
                    <div class="nav-actions">
                        <div class="language-switcher">
                            <button class="lang-btn" data-lang="ru">RU</button>
                            <button class="lang-btn" data-lang="en">EN</button>
                        </div>
                    </div>
                </nav>
            </header>
        `;
        
        headerContainer.innerHTML = fallbackHTML;
        headerContainer.classList.add('component-loaded');
        console.log('✅ Fallback header created');
        
        // Настраиваем запасной header
        const header = headerContainer.querySelector('.main-header');
        if (header) {
            this.setupSimpleHeader(header);
        }
    }

    setupSimpleHeader(header) {
        // Устанавливаем классы для body
        if (this.isHomePage) {
            document.body.classList.add('home-page');
        } else {
            document.body.classList.add('internal-page');
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            document.body.classList.add(`${currentPage.replace('.html', '')}-page`);
        }
        
        // Убираем все сложные анимации
        header.style.animation = 'none';
        header.style.transition = 'background-color 0.3s ease, box-shadow 0.3s ease';
        
        // Убираем классы скрытия
        header.classList.remove('header-hidden');
        header.style.opacity = '1';
        header.style.visibility = 'visible';
        header.style.pointerEvents = 'auto';
        
        // Простой скролл-эффект
        const handleScroll = () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // начальное состояние
        
        // Обработчик ресайза
        window.addEventListener('resize', () => {
            // Гарантируем правильную позицию
            if (window.innerWidth > 768) {
                header.style.left = '50%';
                header.style.transform = 'translateX(-50%)';
            } else {
                header.style.left = '0';
                header.style.transform = 'translateY(0)';
            }
        });
        
        // Инициализация навигации
        this.setupCurrentPage();
        
        // Инициализация переключателя языка
        this.setupLanguageSwitcherUI();
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
        
        // ИСПРАВЛЕНИЕ: НЕ добавляем aria-label для навигационных ссылок
        this.enhanceAccessibility(element);
    }

    enhanceAccessibility(element) {
        // ИСПРАВЛЕНИЕ: Не добавляем aria-label для навигационных ссылок в хедере
        if (element.closest('.main-nav')) {
            return; // Пропускаем навигационные ссылки
        }
        
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

    setupNavigationTracking() {
        document.querySelectorAll('a[href]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                console.log(`🔗 Navigation: ${href}`);
            });
        });
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

    initializeExistingFooter() {
        const existingFooter = document.querySelector('.main-footer');
        if (existingFooter && typeof window.initFooter === 'function') {
            console.log('🦶 Found existing footer, initializing...');
            window.initFooter();
        }
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

// ===== ГЛОБАЛЬНЫЕ ФУНКЦИИ =====

// Global header initialization
window.initHeader = function() {
    if (window.DaehaaApp) {
        window.DaehaaApp.setupCurrentPage();
        window.DaehaaApp.setupLanguageSupport();
    }
};

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
            const container = document.getElementById(containerId);
            if (!container) {
                console.error(`Container ${containerId} not found`);
                return false;
            }
            
            container.innerHTML = html;
            
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
                const container = document.getElementById(containerId);
                if (container) {
                    container.innerHTML = fallbackHtml;
                }
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

// Глобальная функция для проверки готовности приложения
window.waitForAppReady = function() {
    return new Promise((resolve) => {
        if (window.DaehaaApp) {
            resolve();
        } else {
            const checkInterval = setInterval(() => {
                if (window.DaehaaApp) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 100);
        }
    });
};

// Глобальная синхронизация загрузки
window.syncAppLoad = function() {
    return new Promise(async (resolve) => {
        // Ждем загрузки компонентов
        if (window.componentLoader) {
            await window.componentLoader.loadAll().catch(() => {
                console.warn('⚠️ Components failed to load');
            });
        }
        
        // Ждем DOM
        if (document.readyState === 'loading') {
            await new Promise(resolve => {
                document.addEventListener('DOMContentLoaded', resolve);
            });
        }
        
        // Создаем приложение
        if (!window.DaehaaApp) {
            window.DaehaaApp = new DaehaaApp();
        }
        
        resolve();
    });
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

// Инициализация с правильной последовательностью
(function initializeAppWithCorrectSequence() {
    console.log('🔄 Initializing app with correct sequence...');
    
    // Ждем DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                if (!window.DaehaaApp) {
                    window.DaehaaApp = new DaehaaApp();
                    console.log('✅ DaehaaApp initialized after DOM and components');
                }
            }, 300);
        });
    } else {
        // DOM уже готов
        setTimeout(() => {
            if (!window.DaehaaApp) {
                window.DaehaaApp = new DaehaaApp();
                console.log('✅ DaehaaApp initialized (DOM already ready)');
            }
        }, 300);
    }
})();

// Export functions for global use
window.updateActiveNav = updateActiveNav;

// Module exports
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DaehaaApp: window.DaehaaApp,
        updateActiveNav
    };
}

console.log('✅ main.js loaded with NO HIDDEN BUTTONS - ready!');
