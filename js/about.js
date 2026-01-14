console.log('🚀 about.js loaded - REAL TEAM PHOTOS VERSION - FIXED');

// Используем SafeDOM из animations.js или создаем только если не существует
if (!window.SafeDOM) {
    window.SafeDOM = {
        querySelector(selector) {
            try {
                return document.querySelector(selector);
            } catch (error) {
                console.warn(`⚠️ Invalid selector: ${selector}`, error);
                return null;
            }
        },
        
        querySelectorAll(selector) {
            try {
                return document.querySelectorAll(selector);
            } catch (error) {
                console.warn(`⚠️ Invalid selector: ${selector}`, error);
                return [];
            }
        },
        
        addClass(element, className) {
            if (element && element.classList) {
                element.classList.add(className);
            }
        },
        
        removeClass(element, className) {
            if (element && element.classList) {
                element.classList.remove(className);
            }
        },
        
        hasClass(element, className) {
            return element && element.classList && element.classList.contains(className);
        }
    };
}

class AboutPage {
    constructor() {
        this.isInitialized = false;
        this.initializationAttempts = 0;
        this.maxAttempts = 5;
        this.checkInterval = null;
        this.init();
    }

    init() {
        console.log('🎯 About page script initializing...');
        
        // Проверяем DOM готовность
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                console.log('📄 About page DOM loaded');
                this.waitForComponentsAndInit();
            });
        } else {
            console.log('📄 DOM already loaded, starting about page...');
            this.waitForComponentsAndInit();
        }
    }

    waitForComponentsAndInit() {
        console.log('⏳ About page waiting for components...');
        
        // Проверяем, загружены ли компоненты
        const checkComponents = () => {
            const headerContainer = document.getElementById('header-container');
            const footerContainer = document.getElementById('footer-container');
            
            const isHeaderLoaded = headerContainer && 
                                  headerContainer.children.length > 0 && 
                                  (headerContainer.classList.contains('component-loaded') ||
                                   headerContainer.querySelector('.main-header'));
            
            const isFooterLoaded = footerContainer && 
                                  footerContainer.children.length > 0 && 
                                  (footerContainer.classList.contains('component-loaded') ||
                                   footerContainer.querySelector('footer'));
            
            if (isHeaderLoaded && isFooterLoaded) {
                console.log('✅ Components loaded, initializing about page...');
                clearInterval(this.checkInterval);
                this.initializeWithDelay();
                return true;
            }
            return false;
        };
        
        // Проверяем сразу
        if (checkComponents()) {
            return;
        }
        
        // Слушаем событие загрузки компонентов
        const handleComponentsLoaded = () => {
            console.log('✅ componentsFullyLoaded event received');
            clearInterval(this.checkInterval);
            this.initializeWithDelay();
        };
        
        window.addEventListener('componentsFullyLoaded', handleComponentsLoaded, { once: true });
        
        // Также проверяем периодически
        this.checkInterval = setInterval(() => {
            if (checkComponents()) {
                window.removeEventListener('componentsFullyLoaded', handleComponentsLoaded);
            }
        }, 500);
        
        // Таймаут на случай если ничего не загрузится
        setTimeout(() => {
            if (!this.isInitialized) {
                console.warn('⚠️ Components not loaded after timeout, attempting anyway...');
                clearInterval(this.checkInterval);
                window.removeEventListener('componentsFullyLoaded', handleComponentsLoaded);
                this.initializeWithDelay();
            }
        }, 8000);
    }

    initializeWithDelay() {
        setTimeout(() => {
            this.tryInitialize();
        }, 200);
    }

    tryInitialize() {
        if (this.isInitialized) {
            console.log('⚠️ About page already initialized');
            return;
        }

        if (this.initializationAttempts >= this.maxAttempts) {
            console.error('❌ Max initialization attempts reached');
            return;
        }

        this.initializationAttempts++;
        console.log(`🔄 Initialization attempt ${this.initializationAttempts}/${this.maxAttempts}`);

        try {
            this.initializeAboutPage();
            this.isInitialized = true;
            console.log('✅ About page initialized successfully');
        } catch (error) {
            console.error('❌ About page initialization failed:', error);
            
            if (this.initializationAttempts < this.maxAttempts) {
                console.log(`🔄 Retrying in 1 second...`);
                setTimeout(() => {
                    this.tryInitialize();
                }, 1000);
            }
        }
    }

    initializeAboutPage() {
        console.log('🎯 Initializing about page with real photos...');
        
        // Настройка хедера для страницы "О нас"
        this.setupHeaderForAboutPage();
        
        // Инициализация фото команды
        this.initializeTeamPhotos();
        
        // Настройка функционала страницы
        this.setupPageFunctionalities();
        
        // Настройка анимаций контента
        this.setupContentAnimations();
        
        // Настройка навигации
        this.setupPageNavigation();
        
        // Финальная проверка
        this.finalizeInitialization();
        
        console.log('✅ About page fully initialized with real photos');
    }

    setupHeaderForAboutPage() {
        console.log('🔧 Setting up header for about page...');
        
        const header = window.SafeDOM.querySelector('.main-header');
        const headerContainer = document.getElementById('header-container');
        
        if (header) {
            window.SafeDOM.addClass(header, 'about-page-header');
            console.log('✅ Header found and configured for about page');
            
            // Убеждаемся что хедер видим
            header.style.opacity = '1';
            header.style.visibility = 'visible';
        } else if (headerContainer && headerContainer.children.length > 0) {
            // Ищем хедер внутри контейнера
            const headerInContainer = headerContainer.querySelector('header, .main-header, nav');
            if (headerInContainer) {
                window.SafeDOM.addClass(headerInContainer, 'about-page-header');
                console.log('✅ Header found in container and configured');
            } else {
                console.warn('⚠️ Header not found in container');
            }
        } else {
            console.warn('⚠️ Header not found - will retry later');
            this.scheduleRetry('setupHeaderForAboutPage', this.setupHeaderForAboutPage.bind(this));
        }
    }

    initializeTeamPhotos() {
        console.log('🖼️ Initializing team photos...');
        
        const teamMembers = window.SafeDOM.querySelectorAll('.team-member, .team-card, [data-team-member]');
        const teamPhotos = window.SafeDOM.querySelectorAll('.team-photo, .member-photo, .team-img');
        
        console.log(`👥 Found ${teamMembers.length} team members`);
        console.log(`📸 Found ${teamPhotos.length} team photos`);
        
        // Обработка фото команды
        teamPhotos.forEach((photo, index) => {
            if (!photo) return;
            
            // Убедимся что фото загружено
            if (!photo.complete) {
                photo.addEventListener('load', () => {
                    console.log(`✅ Photo ${index + 1} loaded successfully`);
                    window.SafeDOM.addClass(photo, 'loaded');
                });
                
                photo.addEventListener('error', () => {
                    console.warn(`⚠️ Photo ${index + 1} failed to load`);
                    // Устанавливаем fallback изображение
                    if (photo.dataset.fallback) {
                        photo.src = photo.dataset.fallback;
                    }
                });
            } else {
                window.SafeDOM.addClass(photo, 'loaded');
                console.log(`✅ Photo ${index + 1} already loaded`);
            }
        });
        
        // Настройка карточек команды
        teamMembers.forEach((member, index) => {
            if (!member) return;
            
            // Добавляем анимацию при наведении
            member.addEventListener('mouseenter', () => {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                member.style.transform = 'translateY(-5px)';
            });
            
            member.addEventListener('mouseleave', () => {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                member.style.transform = 'translateY(0)';
            });
            
            // Добавляем интерактивность
            member.style.cursor = 'pointer';
            member.setAttribute('tabindex', '0');
            
            member.addEventListener('click', () => {
                console.log(`👤 Team member ${index + 1} clicked`);
                // Здесь можно добавить логику открытия детальной информации
            });
            
            member.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    member.click();
                }
            });
        });
    }

    setupPageFunctionalities() {
        console.log('⚙️ Setting up page functionalities...');
        
        // Статистика истории
        const storyStats = window.SafeDOM.querySelectorAll('.stat-card, .story-stat, [data-stat]');
        console.log(`📊 Found ${storyStats.length} story stats`);
        
        storyStats.forEach((stat, index) => {
            if (!stat) return;
            
            // Анимация появления
            setTimeout(() => {
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0)';
            }, index * 100);
            
            // Настройка счетчиков если есть
            const numbers = stat.querySelectorAll('.stat-number, .counter');
            numbers.forEach(number => {
                if (number && number.dataset.count) {
                    this.animateCounter(number, parseInt(number.dataset.count));
                }
            });
        });
        
        // Карточки услуг
        const serviceCards = window.SafeDOM.querySelectorAll('.service-card, .service-item, [data-service]');
        console.log(`💎 Found ${serviceCards.length} service cards`);
        
        serviceCards.forEach((card, index) => {
            if (!card) return;
            
            // Анимация появления
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
            
            // Эффект при наведении
            card.addEventListener('mouseenter', () => {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        console.log('✅ All page functionalities initialized');
    }

    animateCounter(element, target) {
        if (!element || !target) return;
        
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        
        const updateCounter = () => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                window.SafeDOM.addClass(element, 'animated');
                return;
            }
            
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        };
        
        // Запускаем с задержкой для лучшего UX
        setTimeout(updateCounter, 500);
    }

    setupContentAnimations() {
        console.log('🎭 Starting content animations...');
        
        // Все секции
        const sections = window.SafeDOM.querySelectorAll('section, .content-section');
        
        sections.forEach((section, index) => {
            if (!section) return;
            
            // Добавляем анимацию появления
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
                window.SafeDOM.addClass(section, 'animated-in');
            }, index * 200);
        });
        
        // Заголовки
        const headings = window.SafeDOM.querySelectorAll('h1, h2, h3, .section-title');
        
        headings.forEach((heading, index) => {
            if (!heading) return;
            
            setTimeout(() => {
                heading.style.opacity = '1';
                heading.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        // Параграфы
        const paragraphs = window.SafeDOM.querySelectorAll('p, .section-description');
        
        paragraphs.forEach((paragraph, index) => {
            if (!paragraph) return;
            
            setTimeout(() => {
                paragraph.style.opacity = '1';
                paragraph.style.transform = 'translateY(0)';
            }, index * 50 + 300);
        });
        
        console.log('✅ Content animations started');
    }

    setupPageNavigation() {
        console.log('📍 Setting up page navigation...');
        
        // Внутренние ссылки для плавного скролла
        const internalLinks = window.SafeDOM.querySelectorAll('a[href^="#about"], a[href^="#team"], a[href^="#story"]');
        
        internalLinks.forEach(link => {
            if (!link) return;
            
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const header = window.SafeDOM.querySelector('.main-header');
                        const headerHeight = header ? header.offsetHeight : 0;
                        
                        window.scrollTo({
                            top: targetElement.offsetTop - headerHeight - 20,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
        
        // Кнопка CTA
        const ctaButton = window.SafeDOM.querySelector('.cta-button, .btn-primary, [data-cta]');
        
        if (ctaButton) {
            console.log('📣 Setting up CTA button effects');
            
            ctaButton.addEventListener('mouseenter', () => {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                ctaButton.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            ctaButton.addEventListener('mouseleave', () => {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                ctaButton.style.transform = 'translateY(0) scale(1)';
            });
            
            // Эффект при нажатии
            ctaButton.addEventListener('mousedown', () => {
                ctaButton.style.transform = 'translateY(1px) scale(0.98)';
            });
            
            ctaButton.addEventListener('mouseup', () => {
                ctaButton.style.transform = 'translateY(0) scale(1)';
            });
            
            console.log('✅ CTA button effects set up');
        }
        
        // Настройка анимаций при скролле
        this.setupScrollAnimations();
    }

    setupScrollAnimations() {
        console.log('📜 Setting up scroll animations...');
        
        const animatedSections = window.SafeDOM.querySelectorAll('.animate-on-scroll, [data-animate]');
        console.log(`🎬 Setting up scroll animations for ${animatedSections.length} sections`);
        
        if (!('IntersectionObserver' in window)) {
            // Fallback для старых браузеров
            animatedSections.forEach(section => {
                if (section) {
                    setTimeout(() => {
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    }, 300);
                }
            });
            return;
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    window.SafeDOM.addClass(entry.target, 'in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedSections.forEach(section => {
            if (section) observer.observe(section);
        });
    }

    finalizeInitialization() {
        console.log('🎯 Finalizing about page initialization...');
        
        // Добавляем класс к body
        window.SafeDOM.addClass(document.body, 'about-page-initialized');
        
        // Отправляем событие о завершении инициализации
        window.dispatchEvent(new CustomEvent('aboutPageReady', {
            detail: { 
                timestamp: Date.now(),
                elementsInitialized: {
                    teamMembers: window.SafeDOM.querySelectorAll('.team-member, .team-card').length,
                    serviceCards: window.SafeDOM.querySelectorAll('.service-card, .service-item').length,
                    stats: window.SafeDOM.querySelectorAll('.stat-card, .story-stat').length
                }
            }
        }));
        
        // Проверяем все ли элементы загружены
        setTimeout(() => {
            this.checkAllElementsLoaded();
        }, 1000);
    }

    checkAllElementsLoaded() {
        const checkElements = [
            { selector: '.main-header', name: 'Header' },
            { selector: '.team-member, .team-card', name: 'Team members' },
            { selector: '.service-card, .service-item', name: 'Service cards' },
            { selector: '.stat-card, .story-stat', name: 'Stats' }
        ];
        
        let allLoaded = true;
        checkElements.forEach(item => {
            const elements = window.SafeDOM.querySelectorAll(item.selector);
            if (elements.length > 0) {
                console.log(`✅ ${item.name}: ${elements.length} found`);
            } else {
                console.warn(`⚠️ ${item.name}: none found`);
                allLoaded = false;
            }
        });
        
        if (allLoaded) {
            console.log('✅ All about page elements loaded successfully');
        }
    }

    scheduleRetry(taskName, taskFunction) {
        if (this.initializationAttempts < this.maxAttempts) {
            console.log(`🔄 Scheduling retry for ${taskName} in 500ms...`);
            setTimeout(() => {
                if (!this.isInitialized) {
                    taskFunction();
                }
            }, 500);
        }
    }
}

// Инициализация
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('📄 About page DOM loaded');
        window.aboutPageInstance = new AboutPage();
        
        // Дополнительный таймаут на случай проблем
        setTimeout(() => {
            if (window.aboutPageInstance && !window.aboutPageInstance.isInitialized) {
                console.warn('⚠️ About page not initialized after timeout, forcing...');
                window.aboutPageInstance.tryInitialize();
            }
        }, 10000);
    });
} else {
    console.log('📄 DOM already loaded, starting about page...');
    window.aboutPageInstance = new AboutPage();
}

// Глобальные функции для управления страницей
window.initAboutPage = function() {
    if (!window.aboutPageInstance) {
        window.aboutPageInstance = new AboutPage();
    }
    return window.aboutPageInstance;
};

window.debugAboutPage = function() {
    console.group('🔍 About Page Debug');
    if (window.aboutPageInstance) {
        console.log('Initialized:', window.aboutPageInstance.isInitialized);
        console.log('Attempts:', window.aboutPageInstance.initializationAttempts);
        console.log('Max attempts:', window.aboutPageInstance.maxAttempts);
        
        // Проверяем элементы
        const elements = {
            'Header': window.SafeDOM.querySelector('.main-header'),
            'Team members': window.SafeDOM.querySelectorAll('.team-member, .team-card').length,
            'Service cards': window.SafeDOM.querySelectorAll('.service-card, .service-item').length,
            'Stats': window.SafeDOM.querySelectorAll('.stat-card, .story-stat').length
        };
        
        Object.entries(elements).forEach(([name, element]) => {
            if (typeof element === 'number') {
                console.log(`${name}: ${element}`);
            } else {
                console.log(`${name}: ${element ? '✅ Found' : '❌ Not found'}`);
            }
        });
    } else {
        console.log('❌ About page not initialized');
    }
    console.groupEnd();
};

window.reloadAboutPage = function() {
    if (window.aboutPageInstance) {
        window.aboutPageInstance.isInitialized = false;
        window.aboutPageInstance.initializationAttempts = 0;
        window.aboutPageInstance.tryInitialize();
    } else {
        window.aboutPageInstance = new AboutPage();
    }
};

console.log('✅ about.js fully loaded - REAL TEAM PHOTOS VERSION - READY');
