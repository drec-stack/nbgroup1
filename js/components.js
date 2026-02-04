console.log('🔧 components.js loaded - ENHANCED COMPONENT LOADER WITH UNIVERSAL HEADER FIX');

// ===== КОНФИГУРАЦИЯ =====
const CONFIG = {
    basePaths: {
        github: '/nbgroup1/',  // GitHub Pages
        local: './',           // Локальная разработка
        root: ''               // Корень сайта
    },
    components: [
        { id: 'header-container', file: 'components/header.html' },
        { id: 'footer-container', file: 'components/footer.html' },
        { id: 'mobile-menu-container', file: 'components/mobile-menu.html' }
    ],
    retryAttempts: 3,
    timeout: 8000
};

// ===== КЛАСС ЗАГРУЗЧИКА КОМПОНЕНТОВ =====
class EnhancedComponentLoader {
    constructor() {
        console.log('📦 Creating EnhancedComponentLoader instance...');
        
        this.basePath = this.determineBasePath();
        this.loadedCount = 0;
        this.totalComponents = CONFIG.components.length;
        this.retryCount = 0;
        this.componentsLoaded = false;
        this.retryQueue = [];
        this.fallbackUsed = false;
        
        console.log(`📍 Base path: "${this.basePath}"`);
        console.log(`📦 Will load ${this.totalComponents} components`);
        
        this.init();
    }
    
    // Определение базового пути
    determineBasePath() {
        const currentPath = window.location.pathname;
        const hostname = window.location.hostname;
        
        console.log('📍 Current location:', {
            path: currentPath,
            hostname: hostname,
            href: window.location.href
        });
        
        // GitHub Pages
        if (hostname.includes('github.io') && currentPath.includes('/nbgroup1/')) {
            console.log('🌐 GitHub Pages detected with /nbgroup1/ path');
            return CONFIG.basePaths.github;
        }
        
        // GitHub Pages без пути (если проект в корне)
        if (hostname.includes('github.io') && !currentPath.includes('/nbgroup1/')) {
            console.log('🌐 GitHub Pages detected (root project)');
            return CONFIG.basePaths.root;
        }
        
        // Локальная разработка
        const isRootPage = currentPath === '/' || 
                          currentPath.includes('index.html') || 
                          currentPath.endsWith('/');
        
        console.log('💻 Local development, is root page?', isRootPage);
        
        // Для внутренних страниц используем относительный путь
        if (currentPath.includes('.html') && !isRootPage) {
            console.log('📄 Internal page detected, using relative path');
            return CONFIG.basePaths.local;
        }
        
        return isRootPage ? CONFIG.basePaths.root : CONFIG.basePaths.local;
    }
    
    // Инициализация
    init() {
        console.log('📦 Initializing EnhancedComponentLoader...');
        
        // Проверяем, что DOM готов
        if (document.body === null) {
            console.log('⏳ Waiting for DOM to be ready...');
            setTimeout(() => this.init(), 100);
            return;
        }
        
        // Проверяем не загружены ли уже компоненты
        if (this.checkIfComponentsAlreadyLoaded()) {
            console.log('⚠️ Components already loaded in HTML');
            this.markAsLoaded();
            return;
        }
        
        // Создаем контейнеры если их нет
        this.ensureContainersExist();
        
        // Загружаем компоненты
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                console.log('📄 DOM loaded, starting component loading');
                this.loadComponents();
            });
        } else {
            console.log('📄 DOM already loaded, starting component loading');
            this.loadComponents();
        }
    }
    
    // Проверка уже загруженных компонентов
    checkIfComponentsAlreadyLoaded() {
        const headerContainer = document.getElementById('header-container');
        if (!headerContainer) return false;
        
        const hasContent = headerContainer.innerHTML && 
                          headerContainer.innerHTML.trim() !== '';
        
        if (hasContent) {
            console.log('📦 Header already has content, length:', headerContainer.innerHTML.length);
            
            // Проверяем другие контейнеры
            const otherContainers = ['footer-container', 'mobile-menu-container'];
            const allLoaded = otherContainers.every(id => {
                const container = document.getElementById(id);
                return container && container.innerHTML.trim() !== '';
            });
            
            return allLoaded;
        }
        
        return false;
    }
    
    // Создание контейнеров если их нет
    ensureContainersExist() {
        console.log('🔧 Ensuring all containers exist...');
        
        CONFIG.components.forEach(component => {
            let container = document.getElementById(component.id);
            
            if (!container) {
                console.warn(`⚠️ Container #${component.id} not found, creating it...`);
                container = document.createElement('div');
                container.id = component.id;
                container.className = 'component-container';
                
                // Определяем положение контейнера
                switch(component.id) {
                    case 'header-container':
                        // Вставляем в самое начало body
                        if (document.body.firstChild) {
                            document.body.insertBefore(container, document.body.firstChild);
                        } else {
                            document.body.appendChild(container);
                        }
                        break;
                        
                    case 'mobile-menu-container':
                        // Вставляем после header-container
                        const headerContainer = document.getElementById('header-container');
                        if (headerContainer && headerContainer.nextSibling) {
                            document.body.insertBefore(container, headerContainer.nextSibling);
                        } else {
                            document.body.appendChild(container);
                        }
                        break;
                        
                    case 'footer-container':
                        // Вставляем в конец body
                        document.body.appendChild(container);
                        break;
                        
                    default:
                        document.body.appendChild(container);
                }
                
                console.log(`✅ Created container: #${component.id}`);
            } else {
                console.log(`✅ Container already exists: #${component.id}`);
            }
        });
    }
    
    // Загрузка всех компонентов
    loadComponents() {
        console.log('📦 Loading all components...');
        
        // Создаем индикатор загрузки
        this.createLoadingIndicator();
        
        // Загружаем каждый компонент
        CONFIG.components.forEach(component => {
            this.loadComponentWithRetry(component);
        });
        
        // Таймаут для случаев когда что-то пошло не так
        setTimeout(() => {
            if (this.loadedCount < this.totalComponents) {
                console.warn(`⚠️ Timeout: Loaded ${this.loadedCount}/${this.totalComponents} components`);
                
                if (this.retryCount < CONFIG.retryAttempts) {
                    this.retryCount++;
                    console.log(`🔄 Retry ${this.retryCount}/${CONFIG.retryAttempts}`);
                    this.retryFailedComponents();
                } else {
                    console.warn('🚨 Max retries reached, using fallback content');
                    this.createFallbacksForMissingComponents();
                    this.finalizeLoading();
                }
            }
        }, CONFIG.timeout);
    }
    
    // Загрузка компонента с повторными попытками
    loadComponentWithRetry(component) {
        const container = document.getElementById(component.id);
        
        if (!container) {
            console.error(`❌ Container ${component.id} not found`);
            this.loadedCount++;
            this.checkAllLoaded();
            return;
        }
        
        // Если контейнер уже имеет содержимое, пропускаем
        if (container.innerHTML && container.innerHTML.trim() !== '') {
            console.log(`⏭️ ${component.id} already has content, skipping`);
            this.loadedCount++;
            this.checkAllLoaded();
            return;
        }
        
        console.log(`📄 Loading ${component.file} into #${component.id}...`);
        
        // Пробуем разные пути
        const pathsToTry = [
            this.basePath + component.file,
            component.file, // относительный путь
            './' + component.file,
            window.location.hostname.includes('github.io') ? 
                '/nbgroup1/components/' + component.file.split('/').pop() : 
                'components/' + component.file.split('/').pop()
        ];
        
        console.log('🔍 Paths to try:', pathsToTry);
        
        this.tryMultiplePaths(pathsToTry, 0, component, container);
    }
    
    // Попытка загрузки по разным путям
    tryMultiplePaths(paths, index, component, container) {
        if (index >= paths.length) {
            console.error(`❌ All paths failed for ${component.id}`);
            this.addToRetryQueue(component);
            return;
        }
        
        const currentPath = paths[index];
        console.log(`🔍 Trying path ${index + 1}/${paths.length}: ${currentPath}`);
        
        fetch(currentPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status} ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                if (!html || html.trim() === '') {
                    throw new Error('Empty response');
                }
                
                console.log(`✅ Successfully loaded ${component.id} from ${currentPath}`);
                
                // Сохраняем старый HTML для отката
                const oldHTML = container.innerHTML;
                container.innerHTML = html;
                
                try {
                    // Исполняем скрипты внутри компонента
                    this.executeScripts(container);
                    
                    // Применяем специфичные фиксы для разных компонентов
                    this.applyComponentSpecificFixes(component, container);
                    
                    this.loadedCount++;
                    this.checkAllLoaded();
                    
                } catch (scriptError) {
                    console.error(`❌ Error executing scripts in ${component.id}:`, scriptError);
                    container.innerHTML = oldHTML; // Откатываем
                    this.tryMultiplePaths(paths, index + 1, component, container); // Пробуем следующий путь
                }
            })
            .catch(error => {
                console.warn(`❌ Path failed: ${currentPath}`, error.message);
                this.tryMultiplePaths(paths, index + 1, component, container);
            });
    }
    
    // Выполнение скриптов в компоненте
    executeScripts(container) {
        const scripts = container.querySelectorAll('script');
        
        if (scripts.length === 0) return;
        
        console.log(`📜 Found ${scripts.length} script(s) in ${container.id}`);
        
        scripts.forEach(oldScript => {
            const newScript = document.createElement('script');
            
            // Копируем все атрибуты
            Array.from(oldScript.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value);
            });
            
            // Копируем содержимое скрипта
            if (oldScript.innerHTML) {
                newScript.textContent = oldScript.innerHTML;
            }
            
            // Заменяем старый скрипт новым
            oldScript.parentNode.replaceChild(newScript, oldScript);
            
            console.log(`✅ Executed script in ${container.id}`);
        });
    }
    
    // Применение специфичных фиксов для компонентов
    applyComponentSpecificFixes(component, container) {
        switch(component.id) {
            case 'header-container':
                this.applyHeaderFixes(container);
                break;
            case 'mobile-menu-container':
                this.applyMobileMenuFixes(container);
                break;
            case 'footer-container':
                this.applyFooterFixes(container);
                break;
        }
    }
    
    // Фиксы для хедера
    applyHeaderFixes(container) {
        console.log('🎨 Applying header-specific fixes...');
        
        const header = container.querySelector('.main-header');
        if (!header) return;
        
        // Гарантируем что хедер видим
        header.classList.remove('header-hidden');
        header.classList.add('header-visible');
        
        // Определяем тип страницы
        const isIndexPage = document.body.classList.contains('home-page') || 
                           document.body.classList.contains('index-page') ||
                           window.location.pathname.includes('index.html') ||
                           window.location.pathname === '/' ||
                           window.location.pathname.endsWith('/');
        
        // КРИТИЧЕСКИЙ ФИКС: Применяем универсальные стили для всех страниц
        this.applyUniversalHeaderStyles();
        
        // Добавляем обработчики для кнопки "Начать проект"
        const startProjectBtn = header.querySelector('#start-project-btn');
        if (startProjectBtn) {
            startProjectBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🚀 Start project button clicked');
                window.location.href = 'contacts.html';
            });
        }
        
        // Добавляем обработчики для навигационных ссылок
        const navLinks = header.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Закрываем мобильное меню если оно открыто
                const mobileMenu = document.querySelector('.mobile-menu');
                const burgerBtn = document.querySelector('.burger-btn');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    if (burgerBtn) burgerBtn.classList.remove('active');
                }
            });
        });
        
        console.log('✅ Header fixes applied');
    }
    
    // Применение универсальных стилей хедера
    applyUniversalHeaderStyles() {
        const styleId = 'components-header-fix';
        let existingStyle = document.getElementById(styleId);
        
        if (existingStyle) {
            existingStyle.remove();
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        
        style.textContent = `
            /* ===== УНИВЕРСАЛЬНЫЙ ФИКС ДЛЯ ХЕДЕРА ОТ COMPONENTS.JS ===== */
            
            /* ГАРАНТИРУЕМ ВИДИМОСТЬ И ПРАВИЛЬНОЕ ПОЛОЖЕНИЕ */
            .main-header {
                visibility: visible !important;
                opacity: 1 !important;
                display: block !important;
                pointer-events: auto !important;
            }
            
            /* ФИКС ДЛЯ СКРЫТИЯ/ПОКАЗА */
            .main-header.header-hidden {
                opacity: 1 !important;
                visibility: visible !important;
                transform: translateX(-50%) translateY(0) !important;
            }
            
            /* МОБИЛЬНЫЙ ФИКС */
            @media (max-width: 900px) {
                .main-header {
                    top: 0 !important;
                    left: 0 !important;
                    transform: none !important;
                    width: 100% !important;
                    border-radius: 0 !important;
                    margin: 0 !important;
                }
                
                .main-header.header-hidden {
                    transform: translateY(0) !important;
                }
            }
            
            /* ФИКС ДЛЯ КЛИКАБЕЛЬНОСТИ */
            .main-header * {
                pointer-events: auto !important;
            }
            
            .burger-btn,
            .lang-btn,
            .nav-link,
            .start-project-btn,
            .logo {
                cursor: pointer !important;
                pointer-events: auto !important;
            }
            
            /* ФИКС ДЛЯ ПЕРЕКЛЮЧАТЕЛЯ ЯЗЫКА */
            .language-switcher.desktop-only {
                min-width: 120px !important;
            }
            
            .lang-text {
                display: inline-block !important;
                opacity: 1 !important;
                visibility: visible !important;
            }
            
            /* ПРЕВЕНТИВНЫЙ ФИКС ДЛЯ ВСЕХ СТРАНИЦ */
            body {
                padding-top: 80px !important;
            }
            
            @media (max-width: 900px) {
                body {
                    padding-top: 60px !important;
                }
            }
        `;
        
        document.head.appendChild(style);
        console.log('✅ Universal header styles from components.js applied');
    }
    
    // Фиксы для мобильного меню
    applyMobileMenuFixes(container) {
        console.log('📱 Applying mobile menu fixes...');
        
        const mobileMenu = container.querySelector('.mobile-menu');
        if (!mobileMenu) return;
        
        // Гарантируем начальное состояние
        mobileMenu.classList.remove('active');
        
        // Добавляем обработчики для ссылок
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(() => {
                    mobileMenu.classList.remove('active');
                    const burgerBtn = document.querySelector('.burger-btn');
                    if (burgerBtn) burgerBtn.classList.remove('active');
                }, 300);
            });
        });
        
        console.log('✅ Mobile menu fixes applied');
    }
    
    // Фиксы для футера
    applyFooterFixes(container) {
        console.log('🦶 Applying footer fixes...');
        // Базовые фиксы для футера если нужны
    }
    
    // Добавление в очередь повторной загрузки
    addToRetryQueue(component) {
        this.retryQueue.push(component);
        this.loadedCount++;
        this.checkAllLoaded();
    }
    
    // Повторная загрузка неудачных компонентов
    retryFailedComponents() {
        if (this.retryQueue.length === 0) {
            console.log('✅ No components to retry');
            this.finalizeLoading();
            return;
        }
        
        console.log(`🔄 Retrying ${this.retryQueue.length} failed components...`);
        
        const retryQueueCopy = [...this.retryQueue];
        this.retryQueue = [];
        this.loadedCount -= retryQueueCopy.length;
        
        retryQueueCopy.forEach(component => {
            this.loadComponentWithRetry(component);
        });
    }
    
    // Создание заглушек для отсутствующих компонентов
    createFallbacksForMissingComponents() {
        if (this.fallbackUsed) return;
        
        console.log('🛠️ Creating fallback content for missing components...');
        
        CONFIG.components.forEach(component => {
            const container = document.getElementById(component.id);
            if (!container || !container.innerHTML || container.innerHTML.trim() === '') {
                console.log(`🛠️ Creating fallback for ${component.id}`);
                this.createFallbackContent(component, container);
            }
        });
        
        this.fallbackUsed = true;
    }
    
    // Создание заглушки для компонента
    createFallbackContent(component, container) {
        if (!container) return;
        
        // Используем правильные пути в зависимости от окружения
        const getFullPath = (page) => {
            if (window.location.hostname.includes('github.io')) {
                return window.location.pathname.includes('/nbgroup1/') 
                    ? '/nbgroup1/' + page 
                    : '/' + page;
            }
            return './' + page;
        };
        
        switch(component.id) {
            case 'header-container':
                container.innerHTML = `
                    <header class="main-header header-visible" id="main-header" style="
                        position: fixed;
                        top: 20px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: calc(100% - 40px);
                        max-width: 1400px;
                        padding: 15px 0;
                        background: rgba(255, 255, 255, 0.08);
                        backdrop-filter: blur(40px);
                        border: 1px solid rgba(255, 255, 255, 0.15);
                        border-radius: 20px;
                        z-index: 1000;
                        box-shadow: 0 15px 50px rgba(0,0,0,0.35);
                    ">
                        <div class="header-container">
                            <div class="header-inner" style="
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                padding: 0 20px;
                            ">
                                <a href="${getFullPath('index.html')}" class="logo" style="
                                    display: flex;
                                    align-items: center;
                                    gap: 10px;
                                    text-decoration: none;
                                    color: white;
                                ">
                                    <div class="logo-mark" style="
                                        width: 40px;
                                        height: 40px;
                                        background: white;
                                        border-radius: 10px;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        font-weight: bold;
                                        color: black;
                                    ">NB</div>
                                    <span class="logo-text" style="
                                        font-weight: bold;
                                        font-size: 18px;
                                    ">NB Group Tech</span>
                                </a>
                                <div class="header-right-mobile" style="
                                    display: flex;
                                    align-items: center;
                                    gap: 10px;
                                ">
                                    <button class="burger-btn" aria-label="Меню" style="
                                        width: 40px;
                                        height: 40px;
                                        background: rgba(255,255,255,0.1);
                                        border: 1px solid rgba(255,255,255,0.2);
                                        border-radius: 8px;
                                        color: white;
                                    ">
                                        ☰
                                    </button>
                                </div>
                            </div>
                        </div>
                    </header>
                `;
                break;
                
            case 'footer-container':
                container.innerHTML = `
                    <footer class="main-footer" style="
                        background: rgba(10, 10, 20, 0.8);
                        padding: 40px 0;
                        margin-top: 80px;
                        border-top: 1px solid rgba(255, 255, 255, 0.1);
                    ">
                        <div class="container">
                            <div style="
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                color: rgba(255, 255, 255, 0.6);
                                font-size: 14px;
                            ">
                                <div>© ${new Date().getFullYear()} NB Group Tech</div>
                                <div>Все права защищены</div>
                            </div>
                        </div>
                    </footer>
                `;
                break;
                
            case 'mobile-menu-container':
                container.innerHTML = `
                    <div class="mobile-menu" style="
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100vh;
                        background: rgba(10, 10, 20, 0.98);
                        z-index: 99999;
                        padding: 100px 20px;
                        display: none;
                    ">
                        <nav style="
                            display: flex;
                            flex-direction: column;
                            gap: 20px;
                        ">
                            <a href="${getFullPath('index.html')}" style="
                                color: white;
                                text-decoration: none;
                                font-size: 24px;
                                padding: 15px;
                                background: rgba(255,255,255,0.05);
                                border-radius: 10px;
                            ">Главная</a>
                            <a href="${getFullPath('services.html')}" style="
                                color: white;
                                text-decoration: none;
                                font-size: 24px;
                                padding: 15px;
                                background: rgba(255,255,255,0.05);
                                border-radius: 10px;
                            ">Услуги</a>
                            <a href="${getFullPath('portfolio.html')}" style="
                                color: white;
                                text-decoration: none;
                                font-size: 24px;
                                padding: 15px;
                                background: rgba(255,255,255,0.05);
                                border-radius: 10px;
                            ">Портфолио</a>
                            <a href="${getFullPath('about.html')}" style="
                                color: white;
                                text-decoration: none;
                                font-size: 24px;
                                padding: 15px;
                                background: rgba(255,255,255,0.05);
                                border-radius: 10px;
                            ">О нас</a>
                            <a href="${getFullPath('contacts.html')}" style="
                                color: white;
                                text-decoration: none;
                                font-size: 24px;
                                padding: 15px;
                                background: rgba(255,255,255,0.05);
                                border-radius: 10px;
                            ">Контакты</a>
                        </nav>
                    </div>
                `;
                break;
        }
        
        console.log(`✅ Created fallback for ${component.id}`);
    }
    
    // Проверка загрузки всех компонентов
    checkAllLoaded() {
        if (this.loadedCount === this.totalComponents) {
            console.log(`✅ All ${this.totalComponents} components loaded successfully`);
            this.finalizeLoading();
        } else {
            console.log(`📊 Progress: ${this.loadedCount}/${this.totalComponents} components loaded`);
        }
    }
    
    // Финальная инициализация
    finalizeLoading() {
        console.log('🎉 Component loading finalized');
        
        // Удаляем индикатор загрузки
        this.removeLoadingIndicator();
        
        // Отмечаем что компоненты загружены
        this.markAsLoaded();
        
        // Отправляем события
        this.dispatchComponentEvents();
        
        // Вызываем глобальные функции инициализации
        this.callGlobalInitializers();
        
        // Применяем финальные фиксы
        this.applyFinalFixes();
    }
    
    // Создание индикатора загрузки
    createLoadingIndicator() {
        if (!document.body) return;
        
        // Удаляем старый индикатор если есть
        this.removeLoadingIndicator();
        
        const loadingIndicator = document.createElement('div');
        loadingIndicator.id = 'components-loading-indicator';
        loadingIndicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #0066ff, #3399ff);
            z-index: 99999;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            pointer-events: none;
        `;
        document.body.appendChild(loadingIndicator);
        
        // Анимация загрузки
        let progress = 0;
        this.progressInterval = setInterval(() => {
            progress += 10;
            loadingIndicator.style.transform = `translateX(-${100 - progress}%)`;
            if (progress >= 90) clearInterval(this.progressInterval);
        }, 200);
        
        this.loadingIndicator = loadingIndicator;
        console.log('⏳ Loading indicator created');
    }
    
    // Удаление индикатора загрузки
    removeLoadingIndicator() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
        
        if (this.loadingIndicator && this.loadingIndicator.parentNode) {
            this.loadingIndicator.style.transform = 'translateX(0%)';
            this.loadingIndicator.style.opacity = '0';
            setTimeout(() => {
                if (this.loadingIndicator && this.loadingIndicator.parentNode) {
                    this.loadingIndicator.parentNode.removeChild(this.loadingIndicator);
                }
            }, 500);
        }
    }
    
    // Отметка как загруженного
    markAsLoaded() {
        if (document.body) {
            document.body.classList.add('components-loaded');
            this.componentsLoaded = true;
            console.log('✅ Components marked as loaded');
        }
    }
    
    // Отправка событий
    dispatchComponentEvents() {
        const events = [
            'componentsLoaded',
            'componentsFullyLoaded', 
            'componentsReady',
            'nbComponentsLoaded'
        ];
        
        events.forEach(eventName => {
            setTimeout(() => {
                const event = new CustomEvent(eventName, {
                    detail: {
                        timestamp: Date.now(),
                        loadedCount: this.loadedCount,
                        totalComponents: this.totalComponents,
                        success: this.loadedCount === this.totalComponents,
                        fallbackUsed: this.fallbackUsed
                    }
                });
                window.dispatchEvent(event);
                console.log(`📢 Event dispatched: ${eventName}`);
            }, 100);
        });
    }
    
    // Вызов глобальных инициализаторов
    callGlobalInitializers() {
        // Вызываем функции инициализации если они есть
        const initFunctions = [
            'initAfterComponents',
            'initApp',
            'NBGroupApp.init'
        ];
        
        initFunctions.forEach(funcName => {
            try {
                const func = eval(funcName);
                if (typeof func === 'function') {
                    console.log(`🔄 Calling ${funcName}...`);
                    setTimeout(func, 200);
                }
            } catch (e) {
                // Игнорируем ошибки если функция не найдена
            }
        });
        
        // Вызываем window.NBGroupApp.init если он существует
        if (window.NBGroupApp && typeof window.NBGroupApp.init === 'function') {
            console.log('🔄 Calling NBGroupApp.init...');
            setTimeout(() => window.NBGroupApp.init(), 200);
        }
    }
    
    // Применение финальных фиксов
    applyFinalFixes() {
        console.log('🔧 Applying final fixes...');
        
        // Гарантируем видимость хедера
        const header = document.getElementById('main-header');
        if (header) {
            header.classList.remove('header-hidden');
            header.classList.add('header-visible');
            header.style.visibility = 'visible';
            header.style.opacity = '1';
        }
        
        // Добавляем padding-top для body чтобы контент не перекрывался хедером
        const headerHeight = header ? header.offsetHeight : 80;
        document.body.style.paddingTop = headerHeight + 'px';
        
        console.log('✅ Final fixes applied');
    }
}

// ===== ГЛОБАЛЬНЫЕ УТИЛИТЫ =====

// Проверка статуса компонентов
window.checkComponentsStatus = function() {
    console.log('🔍 Checking component containers:');
    
    CONFIG.components.forEach(component => {
        const container = document.getElementById(component.id);
        console.log(`  ${component.id}:`);
        console.log(`    - Exists: ${!!container}`);
        if (container) {
            console.log(`    - Has content: ${container.innerHTML.trim() !== ''}`);
            console.log(`    - Content length: ${container.innerHTML.length} chars`);
            console.log(`    - Class: ${container.className}`);
        }
    });
    
    console.log(`  Body has components-loaded class: ${document.body.classList.contains('components-loaded')}`);
};

// Принудительная перезагрузка компонентов
window.reloadComponents = function() {
    console.log('🔄 Force reloading all components...');
    
    // Удаляем класс загруженности
    if (document.body) {
        document.body.classList.remove('components-loaded');
    }
    
    // Очищаем контейнеры
    CONFIG.components.forEach(component => {
        const container = document.getElementById(component.id);
        if (container) {
            container.innerHTML = '';
        }
    });
    
    // Перезапускаем загрузчик
    if (window.ComponentLoaderInstance) {
        window.ComponentLoaderInstance = null;
    }
    
    // Создаем новый экземпляр
    window.ComponentLoaderInstance = new EnhancedComponentLoader();
};

// Ожидание загрузки компонентов
window.waitForComponents = function(timeout = 10000) {
    return new Promise((resolve, reject) => {
        if (document.body && document.body.classList.contains('components-loaded')) {
            resolve();
            return;
        }
        
        const timeoutId = setTimeout(() => {
            reject(new Error('Components loading timeout'));
        }, timeout);
        
        window.addEventListener('componentsLoaded', () => {
            clearTimeout(timeoutId);
            resolve();
        }, { once: true });
    });
};

// Экстренный фикс для хедера
window.emergencyHeaderFix = function() {
    console.log('🚨 Applying emergency header fix...');
    
    const header = document.getElementById('main-header');
    if (!header) {
        console.error('❌ Header not found for emergency fix');
        return;
    }
    
    // Гарантируем видимость
    header.style.cssText = `
        position: fixed !important;
        top: 20px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        width: calc(100% - 40px) !important;
        max-width: 1400px !important;
        padding: 15px 0 !important;
        background: rgba(255, 255, 255, 0.08) !important;
        backdrop-filter: blur(40px) !important;
        border: 1px solid rgba(255, 255, 255, 0.15) !important;
        border-radius: 20px !important;
        z-index: 1000 !important;
        box-shadow: 0 15px 50px rgba(0,0,0,0.35) !important;
        visibility: visible !important;
        opacity: 1 !important;
        display: block !important;
        pointer-events: auto !important;
    `;
    
    // Для мобильных
    if (window.innerWidth <= 900) {
        header.style.cssText += `
            top: 0 !important;
            left: 0 !important;
            transform: none !important;
            width: 100% !important;
            border-radius: 0 !important;
            border-bottom: 1px solid rgba(255,255,255,0.15) !important;
        `;
    }
    
    console.log('✅ Emergency header fix applied');
};

// ===== ИНИЦИАЛИЗАЦИЯ ЗАГРУЗЧИКА КОМПОНЕНТОВ =====
(function initializeComponentLoader() {
    console.log('🚀 Starting enhanced component loader...');
    
    // Ждем готовности DOM
    function waitForDOM() {
        return new Promise((resolve) => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve);
            } else {
                resolve();
            }
        });
    }
    
    // Основная функция инициализации
    async function init() {
        try {
            await waitForDOM();
            console.log('✅ DOM is ready, initializing ComponentLoader');
            
            // Проверяем не загружены ли уже компоненты
            const headerContainer = document.getElementById('header-container');
            if (headerContainer && headerContainer.innerHTML && headerContainer.innerHTML.trim() !== '') {
                console.log('⚠️ Components already loaded in HTML, marking as loaded');
                document.body.classList.add('components-loaded');
                
                // Отправляем событие для совместимости
                setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('componentsLoaded'));
                }, 100);
                return;
            }
            
            // Запускаем загрузчик
            window.ComponentLoaderInstance = new EnhancedComponentLoader();
            
            // Экстренный таймаут
            setTimeout(() => {
                if (document.body && !document.body.classList.contains('components-loaded')) {
                    console.warn('⚠️ Component loading taking too long, forcing completion');
                    
                    // Создаем простые заглушки
                    CONFIG.components.forEach(component => {
                        const container = document.getElementById(component.id);
                        if (container && (!container.innerHTML || container.innerHTML.trim() === '')) {
                            const loader = new EnhancedComponentLoader();
                            loader.createFallbackContent(component, container);
                        }
                    });
                    
                    // Отмечаем как загруженные
                    document.body.classList.add('components-loaded');
                    window.dispatchEvent(new CustomEvent('componentsLoaded'));
                }
            }, 10000);
            
        } catch (error) {
            console.error('❌ Error initializing component loader:', error);
        }
    }
    
    // Запускаем инициализацию
    init();
    
})();

// ===== ОБРАБОТЧИКИ СОБЫТИЙ =====

// При полной загрузке страницы
window.addEventListener('load', () => {
    console.log('📄 Page fully loaded, finalizing components...');
    
    // Дополнительная проверка после загрузки страницы
    setTimeout(() => {
        if (!document.body.classList.contains('components-loaded')) {
            console.warn('⚠️ Components not marked as loaded after page load');
            document.body.classList.add('components-loaded');
            window.dispatchEvent(new CustomEvent('componentsLoaded'));
        }
        
        // Применяем экстренный фикс если хедер не виден
        const header = document.getElementById('main-header');
        if (header && (header.offsetHeight === 0 || header.style.visibility === 'hidden')) {
            console.warn('⚠️ Header appears hidden, applying emergency fix');
            window.emergencyHeaderFix();
        }
    }, 1000);
});

// Обработка ошибок
window.addEventListener('error', (e) => {
    console.error('❌ Global error in components.js:', e.error);
});

// ===== ФИНАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ =====
console.log('✅ Enhanced Component Loader initialized successfully');

// Экспортируем класс для глобального доступа
window.EnhancedComponentLoader = EnhancedComponentLoader;

// Готовность компонентов
console.log('🔧 components.js ready - UNIVERSAL HEADER FIX ENABLED');
