console.log('🚀 NB Group Tech Application initializing...');

const NBGroupApp = {
    // Состояние приложения
    state: {
        isMobile: window.innerWidth <= 900,
        currentPage: '',
        language: localStorage.getItem('preferredLang') || 'ru',
        componentsLoaded: false,
        pageInitialized: false,
        scrollDirection: 'down',
        lastScrollY: 0
    },
    
    // Конфигурация
    config: {
        breakpoints: {
            mobile: 900,
            tablet: 1200
        },
        scrollThreshold: 100,
        animationDuration: 300
    },
    
    // Инициализация приложения
    async init() {
        console.log('🎬 Initializing NB Group Tech Application...');
        
        try {
            // Определяем текущую страницу
            this.detectCurrentPage();
            
            // Устанавливаем базовые конфигурации
            this.setupBaseConfig();
            
            // Ждем загрузки компонентов (header, footer, mobile-menu)
            await this.waitForComponents();
            
            // Инициализируем функционал страницы
            this.initializePage();
            
            // Настраиваем глобальные обработчики
            this.setupGlobalHandlers();
            
            // Запускаем анимации и эффекты
            this.startAnimations();
            
            console.log('✅ Application initialized successfully');
            console.log(`📊 Current page: ${this.state.currentPage}, Language: ${this.state.language}`);
            
        } catch (error) {
            console.error('❌ Application initialization failed:', error);
            this.showError('Failed to initialize application');
        }
    },
    
    // Определение текущей страницы
    detectCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        
        // Убираем .html и любые параметры
        const pageName = page.replace('.html', '').split('?')[0];
        this.state.currentPage = pageName || 'index';
        
        console.log(`📍 Current page detected: ${this.state.currentPage}`);
        
        // Добавляем класс body для стилизации
        const bodyClass = `${this.state.currentPage}-page`;
        if (this.state.currentPage !== 'index') {
            document.body.classList.add(bodyClass);
        }
        
        // Добавляем класс для главной страницы
        if (this.state.currentPage === 'index' || this.state.currentPage === '') {
            document.body.classList.add('home-page');
        }
    },
    
    // Базовая конфигурация
    setupBaseConfig() {
        // Устанавливаем атрибут lang
        document.documentElement.lang = this.state.language;
        
        // Добавляем CSS переменные
        document.documentElement.style.setProperty('--header-height', '80px');
        document.documentElement.style.setProperty('--mobile-header-height', '60px');
        document.documentElement.style.setProperty('--animation-duration', `${this.config.animationDuration}ms`);
        
        // Отключаем контекстное меню для некоторых элементов
        document.addEventListener('contextmenu', (e) => {
            if (e.target.closest('.no-context-menu')) {
                e.preventDefault();
            }
        });
    },
    
    // Ожидание загрузки компонентов
    async waitForComponents() {
        console.log('⏳ Waiting for components to load...');
        
        return new Promise((resolve) => {
            // Если компоненты уже загружены
            if (document.body.classList.contains('components-loaded')) {
                console.log('✅ Components already loaded');
                this.state.componentsLoaded = true;
                resolve();
                return;
            }
            
            // Ждем события componentsLoaded
            const onComponentsLoaded = () => {
                console.log('✅ Components loaded via event');
                this.state.componentsLoaded = true;
                window.removeEventListener('componentsLoaded', onComponentsLoaded);
                resolve();
            };
            
            window.addEventListener('componentsLoaded', onComponentsLoaded);
            
            // Таймаут на случай если событие не пришло
            setTimeout(() => {
                if (!this.state.componentsLoaded) {
                    console.warn('⚠️ Components loading timeout, proceeding anyway');
                    this.state.componentsLoaded = true;
                    resolve();
                }
            }, 5000);
        });
    },
    
    // Инициализация страницы
    initializePage() {
        if (this.state.pageInitialized) {
            console.warn('⚠️ Page already initialized');
            return;
        }
        
        console.log('📄 Initializing page-specific features...');
        
        // Настраиваем поведение прокрутки
        this.setupScrollBehavior();
        
        // Инициализируем формы
        this.setupForms();
        
        // Инициализируем модальные окна
        this.setupModals();
        
        // Инициализируем табы и аккордеоны
        this.setupTabsAndAccordions();
        
        // Инициализируем галереи
        this.setupGalleries();
        
        // Инициализируем счетчики
        this.setupCounters();
        
        // Инициализируем параллакс эффекты
        this.setupParallax();
        
        // Настраиваем отступы для контента
        this.setupContentPadding();
        
        this.state.pageInitialized = true;
        console.log('✅ Page initialization complete');
    },
    
    // Настройка глобальных обработчиков
    setupGlobalHandlers() {
        console.log('🔧 Setting up global event handlers...');
        
        // Ресайз окна
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Событие загрузки страницы
        window.addEventListener('load', this.handlePageLoad.bind(this));
        
        // Обработка ошибок
        window.addEventListener('error', this.handleError.bind(this));
        
        // Обработка кликов вне элементов
        document.addEventListener('click', this.handleOutsideClick.bind(this));
        
        // Обработка клавиатуры
        document.addEventListener('keydown', this.handleKeydown.bind(this));
        
        console.log('✅ Global handlers setup complete');
    },
    
    // ===== ОБРАБОТЧИКИ СОБЫТИЙ =====
    
    // Ресайз окна
    handleResize() {
        const newIsMobile = window.innerWidth <= this.config.breakpoints.mobile;
        
        if (newIsMobile !== this.state.isMobile) {
            console.log(`📱 Viewport changed: ${this.state.isMobile ? 'Desktop' : 'Mobile'} → ${newIsMobile ? 'Mobile' : 'Desktop'}`);
            this.state.isMobile = newIsMobile;
            
            // Обновляем отступы для контента
            this.setupContentPadding();
            
            // Закрываем мобильное меню при переходе на десктоп
            if (!newIsMobile) {
                this.closeMobileMenu();
            }
            
            // Обновляем переменные CSS
            document.documentElement.style.setProperty('--viewport-width', `${window.innerWidth}px`);
        }
    },
    
    // Загрузка страницы
    handlePageLoad() {
        console.log('📄 Page fully loaded');
        document.body.classList.add('page-loaded');
        
        // Добавляем анимацию появления
        setTimeout(() => {
            document.body.classList.add('page-visible');
        }, 100);
        
        // Инициализируем ленивую загрузку изображений
        this.setupLazyLoading();
        
        // Запускаем анимации при загрузке
        this.startLoadAnimations();
    },
    
    // Обработка ошибок
    handleError(event) {
        console.error('❌ Application error:', event.error);
        
        // Показываем пользователю дружелюбное сообщение
        if (!event.error.message.includes('ResizeObserver')) { // Игнорируем частые ошибки
            this.showError('Something went wrong. Please refresh the page.');
        }
    },
    
    // Клик вне элементов
    handleOutsideClick(event) {
        // Закрытие мобильного меню при клике вне
        const mobileMenu = document.querySelector('.mobile-menu.active');
        const burgerBtn = document.querySelector('.burger-btn');
        
        if (mobileMenu && burgerBtn && 
            !mobileMenu.contains(event.target) && 
            !burgerBtn.contains(event.target)) {
            this.closeMobileMenu();
        }
        
        // Закрытие выпадающих меню
        const dropdowns = document.querySelectorAll('.dropdown.active');
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove('active');
            }
        });
    },
    
    // Обработка клавиатуры
    handleKeydown(event) {
        // Закрытие мобильного меню на Escape
        if (event.key === 'Escape') {
            this.closeMobileMenu();
            
            // Закрытие модальных окон
            const modals = document.querySelectorAll('.modal.active');
            modals.forEach(modal => {
                this.closeModal(modal);
            });
        }
        
        // Навигация по табам с клавиатуры
        if (event.key === 'Tab' && document.activeElement.classList.contains('tab-button')) {
            this.handleTabNavigation(event);
        }
    },
    
    // ===== ФУНКЦИОНАЛ ПРОКРУТКИ =====
    
    // Настройка поведения прокрутки
    setupScrollBehavior() {
        console.log('📜 Setting up scroll behavior...');
        
        let ticking = false;
        const header = document.getElementById('main-header');
        
        const updateScrollState = () => {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            
            // Определяем направление скролла
            if (scrollY > this.state.lastScrollY) {
                this.state.scrollDirection = 'down';
            } else {
                this.state.scrollDirection = 'up';
            }
            
            this.state.lastScrollY = scrollY <= 0 ? 0 : scrollY;
            
            // Добавляем классы для анимаций при скролле
            if (scrollY > this.config.scrollThreshold) {
                document.body.classList.add('scrolled');
            } else {
                document.body.classList.remove('scrolled');
            }
            
            // Обновляем индикатор прокрутки
            this.updateScrollProgress();
            
            // Запускаем анимации появления элементов
            this.triggerScrollAnimations();
            
            ticking = false;
        };
        
        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(updateScrollState);
            }
        };
        
        window.addEventListener('scroll', onScroll, { passive: true });
        
        // Инициализируем начальное состояние
        updateScrollState();
        
        console.log('✅ Scroll behavior setup complete');
    },
    
    // Обновление индикатора прокрутки
    updateScrollProgress() {
        const scrollProgress = document.querySelector('.scroll-progress');
        if (!scrollProgress) return;
        
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        scrollProgress.style.width = scrolled + '%';
    },
    
    // Анимации при скролле
    triggerScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animated');
            }
        });
    },
    
    // ===== ФОРМЫ =====
    
    // Настройка форм
    setupForms() {
        const forms = document.querySelectorAll('form:not(.no-js)');
        
        forms.forEach(form => {
            // Валидация на лету
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateInput(input));
                input.addEventListener('input', () => this.validateInput(input));
            });
            
            // Обработка отправки
            form.addEventListener('submit', (e) => this.handleFormSubmit(e, form));
        });
        
        console.log(`✅ ${forms.length} forms initialized`);
    },
    
    // Валидация поля
    validateInput(input) {
        const value = input.value.trim();
        const errorElement = input.nextElementSibling?.classList.contains('error-message') 
            ? input.nextElementSibling 
            : null;
        
        // Удаляем старые сообщения об ошибке
        if (errorElement) {
            errorElement.remove();
        }
        
        // Проверка на обязательное поле
        if (input.hasAttribute('required') && !value) {
            this.showInputError(input, 'This field is required');
            return false;
        }
        
        // Проверка email
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showInputError(input, 'Please enter a valid email');
                return false;
            }
        }
        
        // Проверка телефона
        if (input.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                this.showInputError(input, 'Please enter a valid phone number');
                return false;
            }
        }
        
        // Если все ок
        input.classList.remove('invalid');
        input.classList.add('valid');
        return true;
    },
    
    // Показать ошибку для поля
    showInputError(input, message) {
        input.classList.add('invalid');
        input.classList.remove('valid');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ff3366;
            font-size: 12px;
            margin-top: 4px;
            display: block;
        `;
        
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    },
    
    // Обработка отправки формы
    async handleFormSubmit(event, form) {
        event.preventDefault();
        console.log('📝 Form submission started');
        
        // Валидируем все поля
        let isValid = true;
        const requiredInputs = form.querySelectorAll('input[required], textarea[required]');
        
        requiredInputs.forEach(input => {
            if (!this.validateInput(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            this.showNotification('Please fill all required fields correctly', 'error');
            return;
        }
        
        // Показываем состояние загрузки
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton?.innerHTML;
        
        if (submitButton) {
            submitButton.innerHTML = `
                <span class="loading-spinner"></span>
                Sending...
            `;
            submitButton.disabled = true;
        }
        
        try {
            // Собираем данные формы
            const formData = new FormData(form);
            const formObject = {};
            
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }
            
            console.log('📤 Form data:', formObject);
            
            // Имитация отправки на сервер
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Показываем успешное сообщение
            this.showNotification('Message sent successfully! We\'ll contact you soon.', 'success');
            
            // Сбрасываем форму
            form.reset();
            
            // Убираем классы валидации
            form.querySelectorAll('.valid, .invalid').forEach(el => {
                el.classList.remove('valid', 'invalid');
            });
            
            // Убираем сообщения об ошибках
            form.querySelectorAll('.error-message').forEach(el => el.remove());
            
            console.log('✅ Form submitted successfully');
            
        } catch (error) {
            console.error('❌ Form submission error:', error);
            this.showNotification('Failed to send message. Please try again.', 'error');
            
        } finally {
            // Восстанавливаем кнопку
            if (submitButton) {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        }
    },
    
    // ===== МОДАЛЬНЫЕ ОКНА =====
    
    // Настройка модальных окон
    setupModals() {
        const modalTriggers = document.querySelectorAll('[data-modal]');
        const modalClosers = document.querySelectorAll('.modal-close, [data-close-modal]');
        
        // Открытие модальных окон
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = trigger.getAttribute('data-modal');
                this.openModal(modalId);
            });
        });
        
        // Закрытие модальных окон
        modalClosers.forEach(closer => {
            closer.addEventListener('click', (e) => {
                e.preventDefault();
                const modal = closer.closest('.modal');
                if (modal) {
                    this.closeModal(modal);
                }
            });
        });
        
        // Закрытие по клику на фон
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target);
            }
        });
        
        console.log(`✅ ${modalTriggers.length} modal triggers initialized`);
    },
    
    // Открыть модальное окно
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) {
            console.error(`❌ Modal #${modalId} not found`);
            return;
        }
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Фокус на первый инпут
        const firstInput = modal.querySelector('input, textarea, button');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
        
        console.log(`✅ Modal #${modalId} opened`);
    },
    
    // Закрыть модальное окно
    closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Возвращаем фокус на триггер
        const trigger = document.querySelector(`[data-modal="${modal.id}"]`);
        if (trigger) {
            setTimeout(() => trigger.focus(), 100);
        }
        
        console.log(`✅ Modal #${modal.id} closed`);
    },
    
    // ===== ТАБЫ И АККОРДЕОНЫ =====
    
    setupTabsAndAccordions() {
        // Табы
        const tabContainers = document.querySelectorAll('.tabs');
        tabContainers.forEach(container => {
            const tabButtons = container.querySelectorAll('.tab-button');
            const tabPanes = container.querySelectorAll('.tab-pane');
            
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const tabId = button.getAttribute('data-tab');
                    
                    // Деактивируем все кнопки и панели
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabPanes.forEach(pane => pane.classList.remove('active'));
                    
                    // Активируем выбранные
                    button.classList.add('active');
                    const activePane = container.querySelector(`#${tabId}`);
                    if (activePane) {
                        activePane.classList.add('active');
                    }
                });
            });
        });
        
        // Аккордеоны
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const accordion = header.parentElement;
                const isActive = accordion.classList.contains('active');
                
                // Закрываем все другие аккордеоны в той же группе
                if (accordion.dataset.accordionGroup) {
                    const group = accordion.dataset.accordionGroup;
                    const siblings = document.querySelectorAll(`[data-accordion-group="${group}"]`);
                    siblings.forEach(sib => {
                        if (sib !== accordion) {
                            sib.classList.remove('active');
                        }
                    });
                }
                
                // Переключаем текущий
                accordion.classList.toggle('active', !isActive);
            });
        });
        
        console.log(`✅ Tabs and accordions initialized`);
    },
    
    // Навигация по табам с клавиатуры
    handleTabNavigation(event) {
        const currentTab = event.target;
        const tabContainer = currentTab.closest('.tabs');
        const allTabs = Array.from(tabContainer.querySelectorAll('.tab-button'));
        const currentIndex = allTabs.indexOf(currentTab);
        
        let nextIndex;
        
        if (event.shiftKey && event.key === 'Tab') {
            // Shift + Tab - предыдущий таб
            nextIndex = currentIndex > 0 ? currentIndex - 1 : allTabs.length - 1;
        } else if (event.key === 'Tab') {
            // Tab - следующий таб
            nextIndex = currentIndex < allTabs.length - 1 ? currentIndex + 1 : 0;
        }
        
        if (nextIndex !== undefined) {
            event.preventDefault();
            allTabs[nextIndex].focus();
            allTabs[nextIndex].click();
        }
    },
    
    // ===== ГАЛЕРЕИ =====
    
    setupGalleries() {
        const galleries = document.querySelectorAll('.gallery');
        
        galleries.forEach(gallery => {
            const images = gallery.querySelectorAll('img');
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <button class="lightbox-close">&times;</button>
                <button class="lightbox-prev">&larr;</button>
                <button class="lightbox-next">&rarr;</button>
                <div class="lightbox-content"></div>
            `;
            document.body.appendChild(lightbox);
            
            images.forEach((img, index) => {
                img.style.cursor = 'pointer';
                img.addEventListener('click', () => this.openLightbox(images, index));
            });
            
            // Закрытие лайтбокса
            lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            // Навигация
            lightbox.querySelector('.lightbox-prev').addEventListener('click', (e) => {
                e.stopPropagation();
                this.navigateLightbox(-1);
            });
            
            lightbox.querySelector('.lightbox-next').addEventListener('click', (e) => {
                e.stopPropagation();
                this.navigateLightbox(1);
            });
            
            // Закрытие по клику на фон
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            
            // Навигация клавиатурой
            document.addEventListener('keydown', (e) => {
                if (lightbox.classList.contains('active')) {
                    if (e.key === 'Escape') {
                        lightbox.classList.remove('active');
                        document.body.style.overflow = '';
                    } else if (e.key === 'ArrowLeft') {
                        this.navigateLightbox(-1);
                    } else if (e.key === 'ArrowRight') {
                        this.navigateLightbox(1);
                    }
                }
            });
        });
        
        console.log(`✅ ${galleries.length} galleries initialized`);
    },
    
    // Открыть лайтбокс
    openLightbox(images, startIndex) {
        const lightbox = document.querySelector('.lightbox');
        const content = lightbox.querySelector('.lightbox-content');
        
        // Сохраняем текущий индекс
        lightbox.dataset.currentIndex = startIndex;
        lightbox.dataset.imagesCount = images.length;
        
        // Показываем изображение
        this.showLightboxImage(images[startIndex].src, images[startIndex].alt);
        
        // Показываем лайтбокс
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    
    // Показать изображение в лайтбоксе
    showLightboxImage(src, alt) {
        const lightbox = document.querySelector('.lightbox');
        const content = lightbox.querySelector('.lightbox-content');
        
        content.innerHTML = `
            <img src="${src}" alt="${alt || 'Gallery image'}" loading="lazy">
            ${alt ? `<div class="lightbox-caption">${alt}</div>` : ''}
        `;
    },
    
    // Навигация по лайтбоксу
    navigateLightbox(direction) {
        const lightbox = document.querySelector('.lightbox');
        if (!lightbox.classList.contains('active')) return;
        
        const currentIndex = parseInt(lightbox.dataset.currentIndex);
        const imagesCount = parseInt(lightbox.dataset.imagesCount);
        
        let newIndex = currentIndex + direction;
        
        // Циклическая навигация
        if (newIndex < 0) newIndex = imagesCount - 1;
        if (newIndex >= imagesCount) newIndex = 0;
        
        const images = document.querySelectorAll('.gallery img');
        if (images[newIndex]) {
            lightbox.dataset.currentIndex = newIndex;
            this.showLightboxImage(images[newIndex].src, images[newIndex].alt);
        }
    },
    
    // ===== СЧЕТЧИКИ =====
    
    setupCounters() {
        const counters = document.querySelectorAll('.counter');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.target);
                    const duration = parseInt(counter.dataset.duration) || 2000;
                    const increment = target / (duration / 16); // 60fps
                    
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current).toLocaleString();
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target.toLocaleString();
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => observer.observe(counter));
        
        console.log(`✅ ${counters.length} counters initialized`);
    },
    
    // ===== ПАРАЛЛАКС =====
    
    setupParallax() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        if (parallaxElements.length === 0) return;
        
        const updateParallax = () => {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.speed) || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        };
        
        window.addEventListener('scroll', updateParallax, { passive: true });
        updateParallax(); // Инициализация
        
        console.log(`✅ ${parallaxElements.length} parallax elements initialized`);
    },
    
    // ===== ЛЕНИВАЯ ЗАГРУЗКА =====
    
    setupLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if (lazyImages.length === 0) return;
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        
                        if (img.dataset.srcset) {
                            img.srcset = img.dataset.srcset;
                        }
                        
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
            
            console.log(`✅ ${lazyImages.length} images set up for lazy loading`);
        } else {
            // Fallback для старых браузеров
            console.log('⚠️ IntersectionObserver not supported, loading all images');
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                }
            });
        }
    },
    
    // ===== АНИМАЦИИ =====
    
    // Запуск анимаций
    startAnimations() {
        console.log('🎬 Starting animations...');
        
        // Анимация появления элементов
        this.startAppearAnimations();
        
        // Анимация ховеров
        this.setupHoverEffects();
        
        // Анимация загрузки
        this.startLoadAnimations();
    },
    
    // Анимации появления
    startAppearAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .scale-in');
        
        animatedElements.forEach((element, index) => {
            // Задержка для последовательного появления
            element.style.animationDelay = `${index * 0.1}s`;
            element.classList.add('animate');
        });
    },
    
    // Эффекты при наведении
    setupHoverEffects() {
        const hoverElements = document.querySelectorAll('.hover-effect');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                element.classList.remove('hover');
            });
        });
    },
    
    // Анимации при загрузке
    startLoadAnimations() {
        // Анимация загрузки для секций
        const sections = document.querySelectorAll('.section');
        
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('loaded');
            }, index * 200);
        });
        
        // Анимация для карточек
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('loaded');
            }, index * 100 + 500);
        });
    },
    
    // ===== УТИЛИТЫ =====
    
    // Настройка отступов для контента
    setupContentPadding() {
        const header = document.getElementById('main-header');
        if (!header) return;
        
        const headerHeight = header.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
        
        // Добавляем отступ для основного контента
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.style.paddingTop = `${headerHeight + 20}px`;
        }
    },
    
    // Закрыть мобильное меню
    closeMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const burgerBtn = document.querySelector('.burger-btn');
        
        if (mobileMenu && burgerBtn) {
            mobileMenu.classList.remove('active');
            burgerBtn.classList.remove('active');
            burgerBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    },
    
    // Показать уведомление
    showNotification(message, type = 'info') {
        // Создаем контейнер для уведомлений если его нет
        let container = document.getElementById('notifications-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'notifications-container';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 10px;
                max-width: 400px;
            `;
            document.body.appendChild(container);
        }
        
        // Создаем уведомление
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">${message}</div>
            <button class="notification-close">&times;</button>
        `;
        
        // Стили для уведомления
        notification.style.cssText = `
            background: ${type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 
                         type === 'error' ? 'rgba(244, 67, 54, 0.9)' : 
                         'rgba(33, 150, 243, 0.9)'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            backdrop-filter: blur(10px);
            display: flex;
            justify-content: space-between;
            align-items: center;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        `;
        
        // Кнопка закрытия
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            margin-left: 15px;
            line-height: 1;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Добавляем уведомление
        container.appendChild(notification);
        
        // Автоматическое закрытие
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
        
        // Анимации
        const style = document.createElement('style');
        if (!document.querySelector('#notification-animations')) {
            style.id = 'notification-animations';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOutRight {
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
    },
    
    // Показать ошибку
    showError(message) {
        this.showNotification(message, 'error');
    },
    
    // Показать успех
    showSuccess(message) {
        this.showNotification(message, 'success');
    },
    
    // ===== ГЛОБАЛЬНЫЕ ФУНКЦИИ ДЛЯ ДЕВЕЛОПЕРОВ =====
    
    // Отладка
    debug() {
        console.log('🔍 Application debug info:');
        console.log('- State:', this.state);
        console.log('- Config:', this.config);
        console.log('- Current page:', this.state.currentPage);
        console.log('- Is mobile:', this.state.isMobile);
        console.log('- Components loaded:', this.state.componentsLoaded);
        console.log('- Page initialized:', this.state.pageInitialized);
        
        // Проверка хедера
        const header = document.getElementById('main-header');
        if (header) {
            console.log('- Header found:', true);
            console.log('- Header height:', header.offsetHeight);
            console.log('- Header classes:', header.className);
        } else {
            console.log('- Header found:', false);
        }
    },
    
    // Перезагрузка приложения
    reload() {
        console.log('🔄 Reloading application...');
        location.reload();
    },
    
    // Проверка компонентов
    checkComponents() {
        const components = ['header-container', 'footer-container', 'mobile-menu-container'];
        components.forEach(id => {
            const el = document.getElementById(id);
            console.log(`${id}: ${el ? '✅ Found' : '❌ Missing'}`);
            if (el) {
                console.log(`  Content length: ${el.innerHTML.length} chars`);
            }
        });
    }
};

// ===== ГЛОБАЛЬНЫЙ ЭКСПОРТ =====
window.NBGroupApp = NBGroupApp;

// ===== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ =====
(function initializeApplication() {
    console.log('🚀 Starting NB Group Tech Application...');
    
    // Ждем готовности DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('📄 DOM loaded, initializing app');
            NBGroupApp.init();
        });
    } else {
        console.log('📄 DOM already loaded, initializing app');
        NBGroupApp.init();
    }
    
    // Обработка полной загрузки страницы
    window.addEventListener('load', () => {
        console.log('✅ Page fully loaded');
        document.body.classList.add('fully-loaded');
    });
    
    // Глобальные функции для отладки
    if (window.location.hostname.includes('localhost') || 
        window.location.hostname.includes('127.0.0.1') ||
        window.location.hostname.includes('github.io')) {
        
        window.debugApp = () => NBGroupApp.debug();
        window.reloadApp = () => NBGroupApp.reload();
        window.checkComps = () => NBGroupApp.checkComponents();
        
        console.log('🔧 Debug functions available: debugApp(), reloadApp(), checkComps()');
    }
})();

// ===== ОБРАБОТКА ОШИБОК ГЛОБАЛЬНО =====
window.addEventListener('unhandledrejection', event => {
    console.error('❌ Unhandled promise rejection:', event.reason);
    NBGroupApp.showError('An unexpected error occurred');
});

// ===== ФИНАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ =====
console.log('✅ Main application script loaded successfully');
