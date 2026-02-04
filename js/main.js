console.log('🚀 main.js loaded - FULLY INTEGRATED WITH HEADER SCROLL FOR ALL PAGES');

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
        scrollDirection: 'none'
    },
    
    // Инициализация
    init() {
        console.log('🎬 Initializing NB Group Tech App...');
        
        this.detectCurrentPage();
        this.setupBurgerMenu();
        this.setupSmoothScroll();
        this.setupActiveNav();
        this.setupLanguageSwitcher();
        this.setupScrollEffects();
        this.setupForms();
        this.setupLazyLoading();
        this.setupGlobalEvents();
        this.setupHeaderScroll();
        this.fixButtonsOnAllPages(); // Добавляем исправление кнопок
        
        console.log('✅ NB Group Tech App initialized');
    },
    
    // Определение текущей страницы
    detectCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        this.state.currentPage = page;
        
        const pageClass = page.replace('.html', '') + '-page';
        if (pageClass !== '-page') {
            if (pageClass !== 'brandbook-page') {
                document.body.classList.add(pageClass);
            }
        }
    },
    
    // ===== СКРЫТИЕ ХЕДЕРА ПРИ СКРОЛЛЕ ДЛЯ ВСЕХ СТРАНИЦ =====
    setupHeaderScroll() {
        console.log('🎯 Setting up header scroll behavior for all pages...');
        
        const header = document.querySelector('.main-header');
        if (!header) {
            console.warn('❌ Header not found for scroll behavior');
            return;
        }
        
        const headerHeight = header.offsetHeight;
        const scrollThreshold = 50;
        let ticking = false;
        
        // Определяем, главная ли это страница
        const isHomePage = this.state.currentPage.includes('index') || 
                          this.state.currentPage === '' ||
                          this.state.currentPage === '/';
        
        // Для всех страниц кроме главной устанавливаем темный фон
        if (!isHomePage) {
            console.log('🌙 Setting dark header for non-home page');
            header.style.background = 'rgba(10, 10, 20, 0.98)';
            header.style.backdropFilter = 'blur(35px)';
            header.classList.add('scrolled');
        }
        
        // Функция обновления состояния хедера
        const updateHeaderState = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollingDown = scrollTop > this.state.lastScrollTop;
            
            // Обновляем направление скролла
            this.state.scrollDirection = scrollingDown ? 'down' : 'up';
            
            // Показываем хедер если прокрутили до верха
            if (scrollTop <= headerHeight) {
                if (this.state.headerHidden) {
                    this.showHeader();
                }
            }
            // Прячем при скролле вниз
            else if (scrollingDown && scrollTop > headerHeight + scrollThreshold) {
                if (!this.state.headerHidden) {
                    this.hideHeader();
                }
            }
            // Показываем при скролле вверх
            else if (!scrollingDown && scrollTop > headerHeight) {
                if (this.state.headerHidden) {
                    this.showHeader();
                }
            }
            
            this.state.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            ticking = false;
        };
        
        // Оптимизированный обработчик скролла
        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(updateHeaderState);
            }
        };
        
        // Функции управления хедером
        this.showHeader = () => {
            header.classList.remove('header-hidden');
            header.classList.add('header-visible');
            this.state.headerHidden = false;
            console.log('⬆️ Header shown');
        };
        
        this.hideHeader = () => {
            header.classList.add('header-hidden');
            header.classList.remove('header-visible');
            this.state.headerHidden = true;
            console.log('⬇️ Header hidden');
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
        
        // Показываем хедер при клике
        header.addEventListener('click', (e) => {
            if (this.state.headerHidden && e.target.closest('.main-header')) {
                this.showHeader();
            }
        });
        
        // Показываем хедер при клике на элементы навигации
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
        });
        
        // Показываем хедер при наведении на верхнюю часть экрана (только для десктопа)
        if (!this.state.isMobile) {
            const hoverZone = document.createElement('div');
            hoverZone.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 80px;
                z-index: 998;
                pointer-events: ${this.state.headerHidden ? 'auto' : 'none'};
                background: transparent;
                transition: pointer-events 0.3s ease;
            `;
            hoverZone.id = 'header-hover-zone';
            
            hoverZone.addEventListener('mouseenter', () => {
                if (this.state.headerHidden) {
                    this.showHeader();
                    hoverZone.style.pointerEvents = 'none';
                }
            });
            
            document.body.appendChild(hoverZone);
            
            // Обновляем hover zone при изменении состояния хедера
            const observer = new MutationObserver(() => {
                hoverZone.style.pointerEvents = this.state.headerHidden ? 'auto' : 'none';
            });
            observer.observe(header, { attributes: true, attributeFilter: ['class'] });
        }
        
        // Настраиваем обработчик скролла
        window.addEventListener('scroll', onScroll, { passive: true });
        
        // Инициализация начального состояния
        this.state.lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        updateHeaderState();
        
        console.log('✅ Header scroll behavior initialized for all pages');
    },
    
    // ===== ИСПРАВЛЕНИЕ КНОПОК НА ВСЕХ СТРАНИЦАХ =====
    fixButtonsOnAllPages() {
        console.log('🔧 Fixing buttons on all pages...');
        
        // Определяем, главная ли это страница
        const isHomePage = this.state.currentPage.includes('index') || 
                          this.state.currentPage === '' ||
                          this.state.currentPage === '/';
        
        // Если не главная страница, исправляем фон хедера
        if (!isHomePage) {
            const header = document.querySelector('.main-header');
            if (header) {
                header.style.background = 'rgba(10, 10, 20, 0.98)';
                header.style.backdropFilter = 'blur(35px)';
                header.classList.add('scrolled');
            }
        }
        
        // Исправляем все основные кнопки на странице
        setTimeout(() => {
            // Находим все кнопки кроме тех, что уже стилизованы
            const buttonsToFix = document.querySelectorAll(`
                button:not(.burger-btn):not(.lang-btn):not(.nav-link):not(.start-project-btn),
                a[class*="btn"]:not(.nav-link):not(.start-project-btn),
                .btn:not(.nav-link):not(.start-project-btn),
                .cta-btn, .hero-btn, .contact-btn, .submit-btn
            `);
            
            console.log(`🎯 Found ${buttonsToFix.length} buttons to fix`);
            
            buttonsToFix.forEach((btn, index) => {
                if (btn.closest('.main-header') || btn.closest('.mobile-menu')) {
                    return; // Пропускаем кнопки в хедере и мобильном меню
                }
                
                // Добавляем класс для стилизации
                btn.classList.add('fixed-btn-primary');
                
                // Устанавливаем базовые стили
                this.applyButtonStyles(btn);
                
                // Добавляем hover эффекты
                btn.addEventListener('mouseenter', this.handleButtonHover);
                btn.addEventListener('mouseleave', this.handleButtonLeave);
                btn.addEventListener('mousedown', this.handleButtonPress);
                btn.addEventListener('mouseup', this.handleButtonRelease);
                
                // Добавляем эффект свечения
                this.addButtonGlow(btn);
            });
            
            // Исправляем ссылки в виде кнопок
            const linkButtons = document.querySelectorAll('a[href*=".html"]:not(.nav-link):not(.logo)');
            linkButtons.forEach(link => {
                if (link.textContent.includes('Начать') || 
                    link.textContent.includes('Связаться') ||
                    link.textContent.includes('Заказать') ||
                    link.textContent.includes('Подробнее')) {
                    
                    link.classList.add('fixed-btn-primary');
                    this.applyButtonStyles(link);
                    
                    link.addEventListener('mouseenter', this.handleButtonHover);
                    link.addEventListener('mouseleave', this.handleButtonLeave);
                    this.addButtonGlow(link);
                }
            });
            
            console.log(`✅ Fixed ${buttonsToFix.length} buttons on page`);
        }, 500);
    },
    
    // Применяем стили к кнопке
    applyButtonStyles(btn) {
        const existingStyles = window.getComputedStyle(btn);
        
        // Только если у кнопки нет нормальных стилей
        if (existingStyles.backgroundColor === 'rgba(0, 0, 0, 0)' || 
            existingStyles.backgroundColor === 'transparent') {
            
            btn.style.cssText += `
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 14px 32px;
                background: linear-gradient(135deg, rgba(0, 102, 255, 0.2), rgba(102, 181, 255, 0.1));
                color: white;
                font-weight: 600;
                font-size: 16px;
                text-decoration: none;
                border: 1px solid rgba(255, 255, 255, 0.25);
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                gap: 12px;
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05);
                position: relative;
                overflow: hidden;
                isolation: isolate;
                text-align: center;
                min-width: 160px;
                min-height: 52px;
            `;
            
            // Добавляем эффект свечения
            const glow = document.createElement('div');
            glow.className = 'btn-glow';
            glow.style.cssText = `
                position: absolute;
                top: -10px;
                left: -10px;
                right: -10px;
                bottom: -10px;
                background: radial-gradient(circle at center, rgba(0, 102, 255, 0.3) 0%, transparent 70%);
                filter: blur(15px);
                opacity: 0;
                transition: opacity 0.4s ease;
                pointer-events: none;
                z-index: -1;
                border-radius: inherit;
            `;
            btn.appendChild(glow);
        }
    },
    
    // Обработчики hover эффектов
    handleButtonHover(e) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        
        const btn = e.target;
        const glow = btn.querySelector('.btn-glow');
        
        btn.style.transform = 'translateY(-3px) scale(1.05)';
        btn.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 30px rgba(0, 102, 255, 0.2)';
        btn.style.background = 'linear-gradient(135deg, rgba(0, 102, 255, 0.3), rgba(102, 181, 255, 0.2))';
        btn.style.borderColor = 'rgba(255, 255, 255, 0.35)';
        
        if (glow) {
            glow.style.opacity = '0.6';
        }
        
        // Анимация иконки если есть
        const icon = btn.querySelector('i');
        if (icon) {
            icon.style.transform = 'translateX(4px)';
        }
    },
    
    handleButtonLeave(e) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        
        const btn = e.target;
        const glow = btn.querySelector('.btn-glow');
        
        btn.style.transform = '';
        btn.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05)';
        btn.style.background = 'linear-gradient(135deg, rgba(0, 102, 255, 0.2), rgba(102, 181, 255, 0.1))';
        btn.style.borderColor = 'rgba(255, 255, 255, 0.25)';
        
        if (glow) {
            glow.style.opacity = '0';
        }
        
        // Возвращаем иконку
        const icon = btn.querySelector('i');
        if (icon) {
            icon.style.transform = '';
        }
    },
    
    handleButtonPress(e) {
        const btn = e.target;
        btn.style.transform = 'translateY(-1px) scale(0.98)';
        btn.style.transition = 'transform 0.1s ease';
    },
    
    handleButtonRelease(e) {
        const btn = e.target;
        btn.style.transform = 'translateY(-3px) scale(1.05)';
        btn.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    },
    
    addButtonGlow(btn) {
        // Добавляем анимацию свечения
        setInterval(() => {
            if (btn.matches(':hover') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                const pulse = document.createElement('div');
                pulse.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    background: radial-gradient(circle, rgba(0, 102, 255, 0.4) 0%, transparent 70%);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    animation: btnPulse 1s ease-out;
                    pointer-events: none;
                    z-index: -1;
                `;
                
                // Добавляем CSS для анимации если еще нет
                if (!document.querySelector('#btn-pulse-animation')) {
                    const style = document.createElement('style');
                    style.id = 'btn-pulse-animation';
                    style.textContent = `
                        @keyframes btnPulse {
                            0% { width: 0; height: 0; opacity: 1; }
                            100% { width: 200px; height: 200px; opacity: 0; }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                btn.appendChild(pulse);
                setTimeout(() => {
                    if (pulse.parentNode === btn) {
                        btn.removeChild(pulse);
                    }
                }, 1000);
            }
        }, 3000);
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
        
        window.addEventListener('componentsLoaded', () => {
            console.log('🔄 Re-setting up burger menu after components');
            setTimeout(setup, 300);
        });
    },
    
    // ===== ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКА =====
    setupLanguageSwitcher() {
        console.log('🌍 Setting up language switcher...');
        
        const setup = () => {
            const langBtns = document.querySelectorAll('.lang-btn, .mobile-lang-btn');
            
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
        
        window.addEventListener('componentsLoaded', () => {
            setTimeout(setup, 300);
        });
    },
    
    updateAllLanguageSwitchers(lang) {
        const desktopSwitchers = document.querySelectorAll('.language-switcher');
        desktopSwitchers.forEach(switcher => {
            switcher.setAttribute('data-current-lang', lang);
        });
        
        const mobileHeaderSwitchers = document.querySelectorAll('.mobile-only-flags');
        mobileHeaderSwitchers.forEach(switcher => {
            switcher.setAttribute('data-current-lang', lang);
        });
        
        const mobileMenuSwitchers = document.querySelectorAll('.mobile-language-switcher');
        mobileMenuSwitchers.forEach(switcher => {
            switcher.setAttribute('data-current-lang', lang);
        });
        
        const allLangBtns = document.querySelectorAll('.lang-btn, .mobile-lang-btn');
        allLangBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        this.state.language = lang;
        localStorage.setItem('preferredLang', lang);
    },
    
    switchLanguage(lang) {
        this.updateAllLanguageSwitchers(lang);
        
        if (window.i18n) {
            if (typeof window.i18n.smoothSwitchLanguage === 'function') {
                window.i18n.smoothSwitchLanguage(lang);
            } else if (typeof window.i18n.switchLanguage === 'function') {
                window.i18n.switchLanguage(lang);
            }
        }
        
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
            
            // Не изменяем scrolled класс на главной странице - он уже управляется через CSS
            const isHomePage = this.state.currentPage.includes('index') || 
                              this.state.currentPage === '' ||
                              this.state.currentPage === '/';
            
            if (!isHomePage && scrollY > 100) {
                header.classList.add('scrolled');
            } else if (!isHomePage && scrollY <= 100) {
                header.classList.remove('scrolled');
            }
            
            if (scrollProgress) {
                const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (scrollY / windowHeight) * 100;
                scrollProgress.style.width = scrolled + '%';
            }
        };
        
        window.addEventListener('scroll', updateScroll);
        updateScroll();
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
            
            // Удаляем hover zone на мобильных
            const hoverZone = document.getElementById('header-hover-zone');
            if (hoverZone && this.state.isMobile) {
                hoverZone.remove();
            }
            
            if (!this.state.isMobile && this.state.menuOpen) {
                this.closeMobileMenu();
            }
            
            // Обновляем высоту хедера при ресайзе
            const header = document.querySelector('.main-header');
            if (header && this.state.headerHidden && window.pageYOffset <= header.offsetHeight) {
                this.showHeader();
            }
        });
        
        window.addEventListener('componentsLoaded', () => {
            setTimeout(() => {
                this.setupBurgerMenu();
                this.setupActiveNav();
                this.setupLanguageSwitcher();
                this.setupSmoothScroll();
                this.setupScrollEffects();
                this.setupHeaderScroll();
                this.fixButtonsOnAllPages();
            }, 300);
        });
        
        // Обработка ошибок
        window.addEventListener('error', (e) => {
            console.error('❌ Global error:', e.error);
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

// ===== CSS ДЛЯ ИСПРАВЛЕННЫХ КНОПОК =====
(function addFixedButtonsStyles() {
    if (!document.querySelector('#fixed-buttons-styles')) {
        const style = document.createElement('style');
        style.id = 'fixed-buttons-styles';
        style.textContent = `
            /* Стили для исправленных кнопок на всех страницах */
            .fixed-btn-primary {
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                padding: 14px 32px !important;
                background: linear-gradient(135deg, rgba(0, 102, 255, 0.2), rgba(102, 181, 255, 0.1)) !important;
                color: white !important;
                font-weight: 600 !important;
                font-size: 16px !important;
                text-decoration: none !important;
                border: 1px solid rgba(255, 255, 255, 0.25) !important;
                border-radius: 12px !important;
                cursor: pointer !important;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
                gap: 12px !important;
                backdrop-filter: blur(20px) !important;
                -webkit-backdrop-filter: blur(20px) !important;
                box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05) !important;
                position: relative !important;
                overflow: hidden !important;
                isolation: isolate !important;
                text-align: center !important;
                min-width: 160px !important;
                min-height: 52px !important;
            }
            
            /* Hover эффекты для исправленных кнопок */
            .fixed-btn-primary:hover {
                background: linear-gradient(135deg, rgba(0, 102, 255, 0.3), rgba(102, 181, 255, 0.2)) !important;
                transform: translateY(-3px) scale(1.05) !important;
                box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 30px rgba(0, 102, 255, 0.2) !important;
                border-color: rgba(255, 255, 255, 0.35) !important;
            }
            
            /* Анимация иконки в кнопке */
            .fixed-btn-primary i {
                transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
            }
            
            .fixed-btn-primary:hover i {
                transform: translateX(4px) !important;
            }
            
            /* Эффект свечения для кнопок */
            .btn-glow {
                position: absolute;
                top: -10px;
                left: -10px;
                right: -10px;
                bottom: -10px;
                background: radial-gradient(circle at center, rgba(0, 102, 255, 0.3) 0%, transparent 70%);
                filter: blur(15px);
                opacity: 0;
                transition: opacity 0.4s ease;
                pointer-events: none;
                z-index: -1;
                border-radius: inherit;
            }
            
            .fixed-btn-primary:hover .btn-glow {
                opacity: 0.6;
            }
            
            /* Стиль для хедера на всех страницах кроме главной */
            body:not(.index-page) .main-header,
            .about-page .main-header,
            .services-page .main-header,
            .portfolio-page .main-header,
            .contacts-page .main-header,
            .brandbook-page .main-header {
                background: rgba(10, 10, 20, 0.98) !important;
                backdrop-filter: blur(35px) !important;
                border-bottom: 1px solid rgba(255, 255, 255, 0.15) !important;
            }
            
            /* Для главной страницы оставляем оригинальный стиль */
            .index-page .main-header {
                background: rgba(255, 255, 255, 0.05) !important;
                backdrop-filter: blur(30px) saturate(180%) !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
            }
            
            /* Анимация пульсации для кнопок */
            @keyframes btnPulse {
                0% { width: 0; height: 0; opacity: 1; }
                100% { width: 200px; height: 200px; opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
})();

// ===== ФИНАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ =====
window.addEventListener('load', () => {
    console.log('🎯 Page fully loaded');
    document.body.classList.add('page-loaded');
    
    setTimeout(() => {
        window.NBGroupApp.setupActiveNav();
        
        const currentLang = localStorage.getItem('preferredLang') || 'ru';
        window.NBGroupApp.updateAllLanguageSwitchers(currentLang);
        
        // Применяем исправления кнопок после полной загрузки
        setTimeout(() => {
            window.NBGroupApp.fixButtonsOnAllPages();
        }, 1000);
        
    }, 500);
});

// ===== ТЕСТОВЫЕ ФУНКЦИИ =====
if (window.location.hostname.includes('github.io') || window.location.hostname.includes('localhost')) {
    window.testHeaderScroll = function() {
        console.log('🧪 Testing header scroll...');
        console.log('- Header hidden:', window.NBGroupApp.state.headerHidden);
        console.log('- Scroll direction:', window.NBGroupApp.state.scrollDirection);
        console.log('- Last scroll position:', window.NBGroupApp.state.lastScrollTop);
        console.log('- Current page:', window.NBGroupApp.state.currentPage);
        
        const header = document.querySelector('.main-header');
        if (header) {
            console.log('- Header classes:', header.className);
            console.log('- Header background:', window.getComputedStyle(header).background);
        }
    };
    
    window.testButtons = function() {
        console.log('🔍 Testing buttons...');
        const fixedButtons = document.querySelectorAll('.fixed-btn-primary');
        console.log(`- Found ${fixedButtons.length} fixed buttons`);
        
        fixedButtons.forEach((btn, i) => {
            console.log(`  ${i + 1}. "${btn.textContent.trim()}" - classes: ${btn.className}`);
        });
    };
    
    window.forceShowHeader = function() {
        console.log('🔼 Forcing header show');
        window.NBGroupApp.showHeader();
    };
    
    window.forceHideHeader = function() {
        console.log('🔽 Forcing header hide');
        window.NBGroupApp.hideHeader();
    };
    
    window.fixAllButtonsNow = function() {
        console.log('🔧 Manually fixing all buttons');
        window.NBGroupApp.fixButtonsOnAllPages();
    };
}

console.log('✅ main.js loaded successfully - HEADER AND BUTTONS FIXES APPLIED');
