console.log('🚀 main.js loaded - FULLY INTEGRATED WITH HEADER SCROLL');

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
        this.setupHeaderScrollForAllPages(); // ИЗМЕНЕНО: новая функция для всех страниц
        this.fixButtonsOnAllPages(); // ИЗМЕНЕНО: исправляем кнопки на всех страницах
        
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
    
    // ===== УЛУЧШЕННОЕ СКРЫТИЕ ХЕДЕРА ДЛЯ ВСЕХ СТРАНИЦ =====
    setupHeaderScrollForAllPages() {
        console.log('🎯 Setting up enhanced header scroll behavior for ALL pages...');
        
        const header = document.getElementById('main-header');
        if (!header) {
            console.warn('❌ Header not found for scroll behavior');
            return;
        }
        
        // Определяем главная ли это страница
        const isHomePage = this.state.currentPage === 'index.html' || 
                          this.state.currentPage === '' ||
                          window.location.pathname.includes('index');
        
        console.log(`📄 Current page: ${this.state.currentPage}, Is home page: ${isHomePage}`);
        
        // Для ВСЕХ страниц кроме главной - устанавливаем темный фон
        if (!isHomePage) {
            console.log('🌙 Setting dark header for non-home page');
            header.style.background = 'rgba(10, 10, 20, 0.98)';
            header.style.backdropFilter = 'blur(35px)';
            header.style.border = '1px solid rgba(255, 255, 255, 0.15)';
            header.classList.add('scrolled');
            
            // Также добавляем класс для CSS
            header.classList.add('non-home-header');
        }
        
        // Настройка скрытия/показа хедера для ВСЕХ страниц
        let lastScrollTop = 0;
        let isHidden = false;
        let hideTimeout = null;
        let showTimeout = null;
        const scrollThreshold = 100;
        
        // Показываем хедер
        const showHeader = () => {
            if (hideTimeout) {
                clearTimeout(hideTimeout);
                hideTimeout = null;
            }
            
            if (!isHidden) return;
            
            header.classList.remove('header-hidden');
            header.classList.add('header-visible');
            header.style.pointerEvents = 'auto';
            isHidden = false;
            
            console.log('⬆️ Header shown (all pages)');
        };
        
        // Скрываем хедер
        const hideHeader = () => {
            if (showTimeout) {
                clearTimeout(showTimeout);
                showTimeout = null;
            }
            
            if (isHidden) return;
            
            header.classList.remove('header-visible');
            header.classList.add('header-hidden');
            header.style.pointerEvents = 'none';
            isHidden = true;
            
            console.log('⬇️ Header hidden (all pages)');
        };
        
        // Обработчик скролла
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollingDown = scrollTop > lastScrollTop;
            const atTop = scrollTop <= 50;
            
            // Всегда показываем хедер вверху страницы
            if (atTop) {
                if (isHidden) {
                    showHeader();
                }
                lastScrollTop = scrollTop;
                return;
            }
            
            // Обновляем scrolled класс
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Интеллектуальное скрытие/показ
            if (scrollingDown && scrollTop > scrollThreshold) {
                if (!isHidden && !hideTimeout) {
                    hideTimeout = setTimeout(() => {
                        hideHeader();
                    }, 200);
                }
            } else if (!scrollingDown && scrollTop > scrollThreshold) {
                if (isHidden && !showTimeout) {
                    showTimeout = setTimeout(() => {
                        showHeader();
                    }, 100);
                }
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        };
        
        // Показываем хедер при наведении в верхнюю часть
        const setupHoverZone = () => {
            const hoverZone = document.createElement('div');
            hoverZone.id = 'header-hover-zone-all-pages';
            hoverZone.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 50px;
                z-index: 998;
                pointer-events: ${isHidden ? 'auto' : 'none'};
                opacity: 0;
                transition: pointer-events 0.3s ease;
                background: transparent;
            `;
            
            hoverZone.addEventListener('mouseenter', () => {
                if (isHidden) {
                    showHeader();
                    hoverZone.style.pointerEvents = 'none';
                }
            });
            
            document.body.appendChild(hoverZone);
            
            // Обновляем hover zone при изменении состояния
            const updateHoverZone = () => {
                hoverZone.style.pointerEvents = isHidden ? 'auto' : 'none';
            };
            
            const observer = new MutationObserver(updateHoverZone);
            observer.observe(header, { attributes: true, attributeFilter: ['class'] });
        };
        
        // Инициализация
        const initHeaderScroll = () => {
            window.addEventListener('scroll', handleScroll, { passive: true });
            
            // Настраиваем hover для показа (только на десктопе)
            if (window.innerWidth > 900) {
                setupHoverZone();
            }
            
            // Обработка ресайза
            window.addEventListener('resize', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop <= 50 && isHidden) {
                    showHeader();
                }
                
                // Обновляем hover zone
                const hoverZone = document.getElementById('header-hover-zone-all-pages');
                if (hoverZone) {
                    if (window.innerWidth <= 900) {
                        hoverZone.remove();
                    } else if (isHidden) {
                        hoverZone.style.pointerEvents = 'auto';
                    }
                }
            });
            
            // Устанавливаем начальное состояние
            handleScroll();
            
            // Экспортируем функции глобально
            window.showHeaderAllPages = showHeader;
            window.hideHeaderAllPages = hideHeader;
            window.toggleHeaderAllPages = () => {
                if (isHidden) showHeader();
                else hideHeader();
            };
            
            this.state.headerHidden = isHidden;
            
            console.log('✅ Enhanced header scroll initialized for ALL pages');
        };
        
        // Запускаем
        setTimeout(initHeaderScroll, 100);
    },
    
    // ===== ИСПРАВЛЕНИЕ КНОПОК НА ВСЕХ СТРАНИЦАХ =====
    fixButtonsOnAllPages() {
        console.log('🔧 Fixing buttons on all pages...');
        
        // Ждем полной загрузки страницы
        setTimeout(() => {
            // Находим все кнопки которые выглядят неправильно
            const allButtons = document.querySelectorAll(`
                button:not(.burger-btn):not(.lang-btn):not(.start-project-btn):not(.nav-link),
                a.btn:not(.nav-link):not(.start-project-btn),
                .btn:not(.nav-link):not(.start-project-btn),
                input[type="submit"],
                input[type="button"]
            `);
            
            console.log(`🔍 Found ${allButtons.length} buttons to fix`);
            
            allButtons.forEach((btn, index) => {
                if (!btn || btn.classList.contains('btn-fixed')) return;
                
                // Добавляем класс для отслеживания
                btn.classList.add('btn-fixed');
                
                // Применяем стили как у кнопки "Начать проект"
                this.applyProjectButtonStyles(btn);
                
                // Добавляем анимации
                this.addButtonAnimations(btn);
            });
            
            // Также исправляем кнопки в хедере если они есть
            const headerButtons = document.querySelectorAll('.main-header button:not(.burger-btn):not(.lang-btn)');
            headerButtons.forEach(btn => {
                if (!btn.classList.contains('btn-fixed')) {
                    btn.classList.add('btn-fixed');
                    this.applyProjectButtonStyles(btn);
                }
            });
            
            console.log('✅ All buttons fixed with project button styles');
        }, 500);
    },
    
    applyProjectButtonStyles(button) {
        // Сохраняем оригинальные стили если нужно
        const originalClasses = button.className;
        
        // Добавляем базовые классы
        button.classList.add('btn-primary', 'project-button-style');
        
        // Применяем CSS свойства как у кнопки "Начать проект"
        const styles = {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px 28px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08))',
            color: 'white',
            fontWeight: '700',
            fontSize: '14px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            gap: '10px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 6px 25px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            isolation: 'isolate',
            willChange: 'transform, background, box-shadow',
            textDecoration: 'none',
            minHeight: '44px'
        };
        
        // Применяем стили
        Object.assign(button.style, styles);
        
        // Создаем элемент для эффекта сияния
        const shimmer = document.createElement('span');
        shimmer.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.7s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1;
            pointer-events: none;
        `;
        
        button.appendChild(shimmer);
        
        // Добавляем обработчики для эффекта сияния
        button.addEventListener('mouseenter', () => {
            shimmer.style.left = '100%';
        });
        
        button.addEventListener('mouseleave', () => {
            shimmer.style.left = '-100%';
        });
        
        // Сохраняем ссылку на shimmer для cleanup
        button._shimmerElement = shimmer;
    },
    
    addButtonAnimations(button) {
        // Hover эффект
        button.addEventListener('mouseenter', () => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            
            button.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.12))';
            button.style.transform = 'translateY(-3px) scale(1.05)';
            button.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 30px rgba(0, 102, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
            button.style.borderColor = 'rgba(255, 255, 255, 0.25)';
        });
        
        button.addEventListener('mouseleave', () => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            
            button.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08))';
            button.style.transform = '';
            button.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
            button.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        });
        
        // Клик эффект
        button.addEventListener('mousedown', () => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            
            button.style.transform = 'translateY(-1px) scale(1.02)';
        });
        
        button.addEventListener('mouseup', () => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            
            button.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        // Анимация для иконок внутри кнопки
        const icon = button.querySelector('i');
        if (icon) {
            button.addEventListener('mouseenter', () => {
                icon.style.transform = 'translateX(4px) rotate(5deg)';
            });
            
            button.addEventListener('mouseleave', () => {
                icon.style.transform = '';
            });
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
                        window.showHeaderAllPages?.();
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
                        window.showHeaderAllPages?.();
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
            
            if (!this.state.isMobile && this.state.menuOpen) {
                this.closeMobileMenu();
            }
            
            // Обновляем высоту хедера при ресайзе
            const header = document.querySelector('.main-header');
            if (header && this.state.headerHidden && window.pageYOffset <= header.offsetHeight) {
                window.showHeaderAllPages?.();
            }
        });
        
        window.addEventListener('componentsLoaded', () => {
            setTimeout(() => {
                this.setupBurgerMenu();
                this.setupActiveNav();
                this.setupLanguageSwitcher();
                this.setupSmoothScroll();
                this.setupScrollEffects();
                this.setupHeaderScrollForAllPages();
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
                window.showHeaderAllPages?.();
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

// ===== CSS ДЛЯ КНОПОК НА ВСЕХ СТРАНИЦАХ =====
(function addButtonStyles() {
    if (!document.querySelector('#all-pages-button-styles')) {
        const style = document.createElement('style');
        style.id = 'all-pages-button-styles';
        style.textContent = `
            /* ===== ОБЩИЕ СТИЛИ ДЛЯ ВСЕХ СТРАНИЦ ===== */
            
            /* Темный фон для хедера на всех страницах кроме главной */
            body:not(.index-page) .main-header {
                background: rgba(10, 10, 20, 0.98) !important;
                backdrop-filter: blur(35px) !important;
                border: 1px solid rgba(255, 255, 255, 0.15) !important;
            }
            
            /* Кнопки на всех страницах */
            .btn-primary,
            .project-button-style {
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                padding: 12px 28px !important;
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08)) !important;
                color: white !important;
                font-weight: 700 !important;
                font-size: 14px !important;
                border: 1px solid rgba(255, 255, 255, 0.2) !important;
                border-radius: 12px !important;
                cursor: pointer !important;
                transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
                gap: 10px !important;
                backdrop-filter: blur(20px) !important;
                -webkit-backdrop-filter: blur(20px) !important;
                box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
                position: relative !important;
                overflow: hidden !important;
                isolation: isolate !important;
                will-change: transform, background, box-shadow !important;
                text-decoration: none !important;
                min-height: 44px !important;
            }
            
            .btn-primary:hover,
            .project-button-style:hover {
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.12)) !important;
                color: white !important;
                transform: translateY(-3px) scale(1.05) !important;
                box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 30px rgba(0, 102, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
                border-color: rgba(255, 255, 255, 0.25) !important;
            }
            
            /* Эффект сияния */
            .btn-primary::before,
            .project-button-style::before {
                content: '' !important;
                position: absolute !important;
                top: 0 !important;
                left: -100% !important;
                width: 100% !important;
                height: 100% !important;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent) !important;
                transition: left 0.7s cubic-bezier(0.4, 0, 0.2, 1) !important;
                z-index: 1 !important;
                pointer-events: none !important;
            }
            
            .btn-primary:hover::before,
            .project-button-style:hover::before {
                left: 100% !important;
            }
            
            /* Иконки в кнопках */
            .btn-primary i,
            .project-button-style i {
                transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
            }
            
            .btn-primary:hover i,
            .project-button-style:hover i {
                transform: translateX(4px) rotate(5deg) !important;
            }
            
            /* Мобильная адаптация */
            @media (max-width: 768px) {
                .btn-primary,
                .project-button-style {
                    padding: 14px 24px !important;
                    min-height: 48px !important;
                }
            }
            
            /* Для страниц кроме главной */
            .about-page .btn-primary,
            .services-page .btn-primary,
            .portfolio-page .btn-primary,
            .contacts-page .btn-primary,
            .brandbook-page .btn-primary {
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08)) !important;
                border: 1px solid rgba(255, 255, 255, 0.2) !important;
                box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
            }
            
            /* Специальные стили для формы на странице контактов */
            .contacts-page input[type="submit"],
            .contacts-page button[type="submit"] {
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08)) !important;
                border: 1px solid rgba(255, 255, 255, 0.2) !important;
                box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
                color: white !important;
                font-weight: 700 !important;
                padding: 14px 32px !important;
                border-radius: 12px !important;
                backdrop-filter: blur(20px) !important;
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
        
        // Принудительно применяем стили кнопок если скрипт не успел
        setTimeout(() => {
            if (window.NBGroupApp && window.NBGroupApp.fixButtonsOnAllPages) {
                window.NBGroupApp.fixButtonsOnAllPages();
            }
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
        
        const header = document.querySelector('.main-header');
        if (header) {
            console.log('- Header classes:', header.className);
            console.log('- Is non-home page header:', header.classList.contains('non-home-header'));
        }
    };
    
    window.forceShowHeader = function() {
        console.log('🔼 Forcing header show');
        window.showHeaderAllPages?.();
    };
    
    window.forceHideHeader = function() {
        console.log('🔽 Forcing header hide');
        window.hideHeaderAllPages?.();
    };
    
    window.testButtons = function() {
        console.log('🧪 Testing buttons...');
        const buttons = document.querySelectorAll('.btn-primary, .project-button-style, button:not(.burger-btn):not(.lang-btn)');
        console.log(`Found ${buttons.length} buttons:`);
        buttons.forEach((btn, i) => {
            console.log(`  ${i + 1}. ${btn.textContent.trim()} - Classes: ${btn.className}`);
        });
    };
}

console.log('✅ main.js loaded successfully - ENHANCED FOR ALL PAGES');
