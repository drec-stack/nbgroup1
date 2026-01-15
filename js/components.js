console.log('🔧 components.js loaded - with mobile menu support');

class ComponentLoader {
    constructor() {
        this.components = {
            'header': {
                url: 'components/header.html',
                containerId: 'header-container',
                name: 'Header'
            },
            'footer': {
                url: 'components/footer.html',
                containerId: 'footer-container',
                name: 'Footer'
            },
            'mobile-menu': {
                url: 'components/mobile-menu.html',
                containerId: 'mobile-menu-container',
                name: 'Mobile Menu'
            }
        };
        
        this.loadedComponents = new Set();
        this.initialized = false;
        this.loadAttempts = 0;
        this.maxAttempts = 3;
        this.isLoading = false;
        this.loadingPromise = null;
        this.initialLoadCompleted = false;
        
        console.log('✅ components.js ready - will load header, footer and mobile menu');
        
        // Автоматически запускаем загрузку при создании
        this.autoStart();
    }
    
    /**
     * Автоматический запуск загрузки
     */
    autoStart() {
        // Если DOM уже готов, сразу начинаем загрузку
        if (document.readyState !== 'loading') {
            console.log('📄 DOM already ready, starting component load...');
            setTimeout(() => {
                this.loadAll().catch(error => {
                    console.error('❌ Failed to auto-load components:', error);
                });
            }, 100);
        } else {
            // Ждем DOM
            document.addEventListener('DOMContentLoaded', () => {
                console.log('📄 DOM ready, starting component load...');
                setTimeout(() => {
                    this.loadAll().catch(error => {
                        console.error('❌ Failed to load components:', error);
                    });
                }, 100);
            });
        }
    }
    
    /**
     * Загружает все компоненты
     * Возвращает Promise для синхронизации
     */
    async loadAll() {
        // Проверяем что DOM доступен
        if (!document || !document.documentElement) {
            console.warn('⚠️ DOM not available yet, waiting...');
            return new Promise(resolve => {
                setTimeout(() => this.loadAll().then(resolve), 100);
            });
        }
        
        // Если уже загружаем, возвращаем существующий промис
        if (this.isLoading && this.loadingPromise) {
            console.log('⚠️ Компоненты уже загружаются, возвращаем существующий промис');
            return this.loadingPromise;
        }
        
        // Если уже инициализированы
        if (this.initialized && this.initialLoadCompleted) {
            console.log('✅ Компоненты уже загружены и инициализированы');
            return Promise.resolve();
        }
        
        this.isLoading = true;
        this.loadAttempts++;
        
        console.log(`🔧 Попытка загрузки компонентов ${this.loadAttempts}/${this.maxAttempts}...`);
        
        // Создаем новый промис
        this.loadingPromise = new Promise(async (resolve, reject) => {
            try {
                // Создаем контейнер для мобильного меню если его нет
                this.createMobileMenuContainer();
                
                // Проверяем наличие контейнеров
                const hasContainers = this.checkContainers();
                if (!hasContainers) {
                    console.warn('⚠️ Контейнеры компонентов не найдены');
                    
                    // Если это последняя попытка и нет контейнеров, создаем их
                    if (this.loadAttempts >= this.maxAttempts) {
                        this.createContainers();
                        // После создания контейнеров пробуем снова
                        setTimeout(() => {
                            this.loadAll().then(resolve).catch(reject);
                        }, 100);
                        return;
                    }
                    
                    // Повторная попытка через 500мс
                    setTimeout(() => {
                        this.isLoading = false;
                        this.loadingPromise = null;
                        this.loadAll().then(resolve).catch(reject);
                    }, 500);
                    return;
                }
                
                // Загружаем компоненты последовательно
                await this.loadComponent('header');
                await this.loadComponent('footer');
                await this.loadComponent('mobile-menu');
                
                this.initialized = true;
                this.initialLoadCompleted = true;
                console.log('✅ Все компоненты загружены');
                
                // Устанавливаем класс loaded для body
                if (document.body) {
                    document.body.classList.add('components-loaded');
                }
                
                // После загрузки компонентов проверяем мобильное меню
                setTimeout(() => {
                    this.checkMobileMenuFunctionality();
                }, 500);
                
                // Отправляем событие о завершении загрузки
                if (window) {
                    // Основное событие
                    window.dispatchEvent(new CustomEvent('componentsLoaded', {
                        detail: { components: Array.from(this.loadedComponents) }
                    }));
                    
                    // СИЛЬНОЕ событие для синхронизации
                    const strongEvent = new CustomEvent('componentsFullyLoaded', {
                        detail: { 
                            components: Array.from(this.loadedComponents),
                            timestamp: Date.now()
                        }
                    });
                    window.dispatchEvent(strongEvent);
                    console.log('📢 componentsFullyLoaded event dispatched');
                }
                
                // Только для отладки - проверяем состояние
                this.debugComponents();
                
                resolve();
                
            } catch (error) {
                console.error('❌ Ошибка загрузки компонентов:', error);
                
                // Повторная попытка если не превышен лимит
                if (this.loadAttempts < this.maxAttempts) {
                    console.log(`🔄 Повторная попытка через 1 секунду...`);
                    setTimeout(() => {
                        this.isLoading = false;
                        this.loadingPromise = null;
                        this.loadAll().then(resolve).catch(reject);
                    }, 1000);
                } else {
                    console.error('❌ Превышено максимальное количество попыток загрузки');
                    this.isLoading = false;
                    this.loadingPromise = null;
                    reject(error);
                }
            } finally {
                this.isLoading = false;
            }
        });
        
        return this.loadingPromise;
    }
    
    /**
     * Проверяет функциональность мобильного меню после загрузки
     */
    checkMobileMenuFunctionality() {
        console.log('🔍 Проверка функциональности мобильного меню...');
        
        const burgerBtn = document.getElementById('burger-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (!burgerBtn) {
            console.error('❌ Бургер-кнопка не найдена');
            return;
        }
        
        if (!mobileMenu) {
            console.error('❌ Мобильное меню не найдено');
            return;
        }
        
        console.log('✅ Элементы найдены:', {
            burgerBtn: burgerBtn ? '✓' : '✗',
            mobileMenu: mobileMenu ? '✓' : '✗'
        });
        
        // Убедимся что меню видимо
        mobileMenu.style.display = 'flex';
        
        // Добавляем обработчик если его нет
        if (!burgerBtn._componentHandler) {
            burgerBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('🍔 Компонентный обработчик бургер-кнопки сработал!');
                
                const mobileMenu = document.getElementById('mobile-menu');
                if (!mobileMenu) {
                    console.error('❌ Mobile menu not found when clicking burger');
                    return;
                }
                
                const isOpen = mobileMenu.classList.contains('active');
                console.log('📱 Состояние меню:', isOpen ? 'OPEN' : 'CLOSED');
                
                if (isOpen) {
                    // Закрыть меню
                    this.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    this.setAttribute('aria-expanded', 'false');
                    this.setAttribute('aria-label', 'Открыть меню');
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                } else {
                    // Открыть меню
                    this.classList.add('active');
                    mobileMenu.classList.add('active');
                    this.setAttribute('aria-expanded', 'true');
                    this.setAttribute('aria-label', 'Закрыть меню');
                    document.body.style.overflow = 'hidden';
                    document.documentElement.style.overflow = 'hidden';
                }
            });
            
            burgerBtn._componentHandler = true;
            console.log('✅ Добавлен компонентный обработчик клика на бургер-кнопку');
        }
        
        // Выводим подробную информацию
        console.log('📱 Детальная информация о мобильном меню:', {
            isMenuVisible: mobileMenu.style.display !== 'none',
            isMenuActive: mobileMenu.classList.contains('active'),
            burgerBtnHasHandler: burgerBtn._componentHandler || burgerBtn._mobileMenuHandler || burgerBtn._hasClickHandler,
            burgerBtnPosition: burgerBtn.style.order || 'default',
            burgerBtnAriaExpanded: burgerBtn.getAttribute('aria-expanded'),
            documentBodyOverflow: document.body.style.overflow
        });
        
        // Добавляем закрытие при клике на ссылки в меню
        const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-lang-btn, .mobile-header-btn');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(() => {
                    if (burgerBtn && mobileMenu.classList.contains('active')) {
                        burgerBtn.classList.remove('active');
                        mobileMenu.classList.remove('active');
                        burgerBtn.setAttribute('aria-expanded', 'false');
                        burgerBtn.setAttribute('aria-label', 'Открыть меню');
                        document.body.style.overflow = '';
                        document.documentElement.style.overflow = '';
                    }
                }, 300);
            });
        });
        
        // Добавляем закрытие при клике вне меню
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !burgerBtn.contains(e.target)) {
                burgerBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                burgerBtn.setAttribute('aria-expanded', 'false');
                burgerBtn.setAttribute('aria-label', 'Открыть меню');
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            }
        });
        
        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                burgerBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                burgerBtn.setAttribute('aria-expanded', 'false');
                burgerBtn.setAttribute('aria-label', 'Открыть меню');
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            }
        });
    }
    
    /**
     * Создает контейнер для мобильного меню
     */
    createMobileMenuContainer() {
        let container = document.getElementById('mobile-menu-container');
        
        if (!container) {
            console.log('➕ Создаю контейнер для мобильного меню');
            container = document.createElement('div');
            container.id = 'mobile-menu-container';
            container.className = 'mobile-menu-container';
            
            // Добавляем в конец body
            if (document.body) {
                document.body.appendChild(container);
            }
            
            console.log('✅ Контейнер mobile-menu-container создан');
        }
    }
    
    /**
     * Проверяет наличие контейнеров
     */
    checkContainers() {
        let allFound = true;
        
        for (const componentName in this.components) {
            const component = this.components[componentName];
            const container = document.getElementById(component.containerId);
            
            if (container) {
                // Проверяем, не загружен ли уже компонент
                if (container.classList.contains('component-loaded')) {
                    console.log(`✅ Контейнер ${component.containerId} уже загружен`);
                    this.loadedComponents.add(componentName);
                } else {
                    console.log(`📦 Контейнер ${component.containerId} найден`);
                }
            } else {
                // Для мобильного меню создаем контейнер, не считаем ошибкой
                if (componentName === 'mobile-menu') {
                    this.createMobileMenuContainer();
                } else {
                    console.warn(`⚠️ Контейнер ${component.containerId} не найден`);
                    allFound = false;
                }
            }
        }
        
        return allFound;
    }
    
    /**
     * Создает контейнеры если они не существуют
     */
    createContainers() {
        console.log('🛠️ Создание недостающих контейнеров...');
        
        for (const componentName in this.components) {
            const component = this.components[componentName];
            
            // Для мобильного меню создаем отдельно
            if (componentName === 'mobile-menu') {
                this.createMobileMenuContainer();
                continue;
            }
            
            let container = document.getElementById(component.containerId);
            
            if (!container) {
                console.log(`➕ Создаю контейнер ${component.containerId}`);
                container = document.createElement('div');
                container.id = component.containerId;
                container.className = 'component-container';
                
                // Проверяем что document.body существует
                if (!document.body) {
                    console.error('❌ document.body not available for container creation');
                    continue;
                }
                
                // Добавляем в правильное место в DOM
                if (componentName === 'header') {
                    // Вставляем header сразу после body
                    const firstChild = document.body.firstChild;
                    if (firstChild) {
                        document.body.insertBefore(container, firstChild);
                    } else {
                        document.body.appendChild(container);
                    }
                } else if (componentName === 'footer') {
                    // Вставляем footer перед закрывающим тегом body
                    document.body.appendChild(container);
                }
                
                console.log(`✅ Контейнер ${component.containerId} создан`);
            }
        }
    }
    
    /**
     * Загружает конкретный компонент
     */
    async loadComponent(componentName) {
        // Проверяем, не загружен ли уже компонент
        if (this.loadedComponents.has(componentName)) {
            console.log(`✅ Компонент ${componentName} уже загружен, пропускаем`);
            return;
        }
        
        const component = this.components[componentName];
        if (!component) {
            throw new Error(`Компонент ${componentName} не найден`);
        }
        
        console.log(`📥 Загрузка ${component.name}...`);
        
        try {
            // Добавляем timestamp для избежания кэширования проблем
            const timestamp = Date.now();
            const url = `${component.url}?v=${timestamp}`;
            
            const response = await fetch(url, {
                cache: 'no-cache',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const html = await response.text();
            
            // Проверяем, что HTML не пустой
            if (!html || html.trim().length === 0) {
                throw new Error(`Получен пустой HTML для ${component.name}`);
            }
            
            // Вставляем HTML в контейнер
            const container = document.getElementById(component.containerId);
            if (container) {
                // Проверяем, не был ли контейнер уже заполнен
                if (container.children.length > 0 && container.classList.contains('component-loaded')) {
                    console.log(`⚠️ Контейнер ${component.containerId} уже содержит контент, пропускаем`);
                    this.loadedComponents.add(componentName);
                    return;
                }
                
                // Очищаем контейнер перед вставкой
                container.innerHTML = '';
                
                // Используем insertAdjacentHTML для сохранения событий
                container.insertAdjacentHTML('beforeend', html);
                
                this.loadedComponents.add(componentName);
                console.log(`✅ ${component.name} загружен`);
                
                // Маркируем контейнер как загруженный
                container.classList.add('component-loaded');
                container.setAttribute('data-component', componentName);
                container.setAttribute('data-loaded-at', timestamp);
                
                // Для мобильного меню - дополнительная проверка
                if (componentName === 'mobile-menu') {
                    console.log('📱 Мобильное меню загружено, проверяем элементы...');
                    setTimeout(() => {
                        const menu = document.getElementById('mobile-menu');
                        const burger = document.getElementById('burger-btn');
                        if (menu && burger) {
                            console.log('✅ Элементы мобильного меню найдены после загрузки');
                            menu.style.display = 'flex';
                        }
                    }, 100);
                }
                
                // Отправляем событие о загрузке компонента
                if (window) {
                    window.dispatchEvent(new CustomEvent('componentLoaded', {
                        detail: { 
                            name: componentName,
                            containerId: component.containerId,
                            timestamp: timestamp
                        }
                    }));
                }
                
            } else {
                throw new Error(`Контейнер ${component.containerId} не найден после проверки`);
            }
            
        } catch (error) {
            console.error(`❌ Ошибка загрузки ${componentName}:`, error);
            
            // Если это хедер или мобильное меню, критическая ошибка
            if (componentName === 'header' || componentName === 'mobile-menu') {
                throw new Error(`CRITICAL: Не удалось загрузить ${componentName}: ${error.message}`);
            }
            
            throw error;
        }
    }
    
    /**
     * Отладочная информация о компонентах
     */
    debugComponents() {
        if (!console || typeof console.log !== 'function') return;
        
        console.log('🔍 Отладочная информация о компонентах:');
        
        for (const componentName in this.components) {
            const component = this.components[componentName];
            const container = document.getElementById(component.containerId);
            
            if (container) {
                console.log(`  ${component.name}:`);
                console.log(`    - Контейнер: ${container.id}`);
                console.log(`    - Дочерние элементы: ${container.children.length}`);
                console.log(`    - Классы: ${container.className}`);
                console.log(`    - Загружен: ${this.loadedComponents.has(componentName)}`);
                
                // Проверяем наличие ключевых элементов
                if (componentName === 'header') {
                    const header = container.querySelector('.main-header') || 
                                  container.querySelector('header') ||
                                  container.querySelector('[data-header]') ||
                                  container.querySelector('nav');
                    const burger = container.querySelector('.burger-btn') || 
                                  container.querySelector('#burger-btn');
                    console.log(`    - Найден header: ${!!header}`);
                    console.log(`    - Найден burger-btn: ${!!burger}`);
                }
                
                if (componentName === 'mobile-menu') {
                    const mobileMenu = container.querySelector('.mobile-menu') || 
                                      container.querySelector('#mobile-menu');
                    console.log(`    - Найден mobile-menu: ${!!mobileMenu}`);
                    if (mobileMenu) {
                        console.log(`    - Классы mobile-menu: ${mobileMenu.className}`);
                        console.log(`    - Стиль display: ${mobileMenu.style.display}`);
                    }
                }
            } else {
                console.log(`  ${component.name}: Контейнер не найден!`);
            }
        }
    }
    
    /**
     * Проверяет загружен ли конкретный компонент
     */
    isComponentLoaded(componentName) {
        return this.loadedComponents.has(componentName);
    }
    
    /**
     * Получает контейнер компонента
     */
    getComponentContainer(componentName) {
        const component = this.components[componentName];
        return component ? document.getElementById(component.containerId) : null;
    }
    
    /**
     * Перезагружает компоненты
     */
    async reload() {
        console.log('🔄 Перезагрузка компонентов...');
        
        // Сбрасываем все флаги
        this.loadedComponents.clear();
        this.initialized = false;
        this.initialLoadCompleted = false;
        this.loadAttempts = 0;
        this.loadingPromise = null;
        
        // Удаляем классы с контейнеров
        for (const componentName in this.components) {
            const component = this.components[componentName];
            const container = document.getElementById(component.containerId);
            if (container) {
                container.classList.remove('component-loaded');
                container.removeAttribute('data-loaded-at');
            }
        }
        
        // Загружаем заново
        return this.loadAll();
    }
    
    /**
     * Перезагружает конкретный компонент
     */
    async reloadComponent(componentName) {
        console.log(`🔄 Перезагрузка компонента ${componentName}...`);
        
        const component = this.components[componentName];
        if (!component) {
            throw new Error(`Компонент ${componentName} не найден`);
        }
        
        // Удаляем из загруженных
        this.loadedComponents.delete(componentName);
        
        // Очищаем контейнер
        const container = document.getElementById(component.containerId);
        if (container) {
            container.classList.remove('component-loaded');
            container.removeAttribute('data-loaded-at');
            container.innerHTML = '';
        }
        
        // Загружаем заново
        await this.loadComponent(componentName);
    }
    
    /**
     * Получает статус всех компонентов
     */
    getStatus() {
        return {
            initialized: this.initialized,
            loading: this.isLoading,
            loadedComponents: Array.from(this.loadedComponents),
            loadAttempts: this.loadAttempts,
            maxAttempts: this.maxAttempts
        };
    }
}

// Создаем глобальный экземпляр только если window доступен
if (typeof window !== 'undefined') {
    window.componentLoader = new ComponentLoader();
    
    // Глобальная функция для ручной инициализации
    window.initComponents = function() {
        console.log('🔄 Ручная инициализация компонентов...');
        return window.componentLoader.loadAll();
    };
    
    // Глобальная функция для перезагрузки компонентов
    window.reloadComponents = function() {
        return window.componentLoader.reload();
    };
    
    // Глобальная функция для перезагрузки конкретного компонента
    window.reloadComponent = function(componentName) {
        return window.componentLoader.reloadComponent(componentName);
    };
    
    // Глобальная функция для проверки загрузки компонента
    window.isComponentLoaded = function(componentName) {
        return window.componentLoader.isComponentLoaded(componentName);
    };
    
    // Глобальная функция для получения статуса
    window.getComponentsStatus = function() {
        return window.componentLoader.getStatus();
    };
    
    // Функция для ожидания загрузки компонентов
    window.waitForComponents = function() {
        return new Promise((resolve) => {
            if (window.componentLoader && window.componentLoader.initialized) {
                resolve();
            } else {
                const check = () => {
                    if (window.componentLoader && window.componentLoader.initialized) {
                        resolve();
                    } else {
                        setTimeout(check, 100);
                    }
                };
                check();
            }
        });
    };
}

// Автоматическая загрузка компонентов при готовности DOM
(function initComponentsOnDOMReady() {
    // Проверяем что window и document доступны
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        console.warn('⚠️ window or document not available, skipping component loader');
        return;
    }
    
    console.log('🔧 Component loader ready - auto-start enabled');
})();

// Также пробуем загрузить когда страница полностью загружена
if (typeof window !== 'undefined') {
    window.addEventListener('load', function() {
        console.log('🌐 Page fully loaded - checking components...');
        
        if (!window.componentLoader) {
            console.warn('⚠️ componentLoader not available');
            return;
        }
        
        // Проверяем, все ли компоненты загружены
        const status = window.componentLoader.getStatus();
        if (!status.initialized || 
            !status.loadedComponents.includes('header') || 
            !status.loadedComponents.includes('footer') ||
            !status.loadedComponents.includes('mobile-menu')) {
            console.log('⚠️ Компоненты не были загружены, пытаемся сейчас...');
            setTimeout(() => {
                window.componentLoader.loadAll().catch(error => {
                    console.error('❌ Не удалось загрузить компоненты:', error);
                });
            }, 500);
        } else {
            console.log('✅ Все компоненты уже загружены');
        }
    });
    
    // Обработка ошибок загрузки
    window.addEventListener('error', function(e) {
        if (e.target && (e.target.tagName === 'LINK' || e.target.tagName === 'SCRIPT')) {
            const src = e.target.src || e.target.href;
            if (src && src.includes('components/')) {
                console.error('❌ Ошибка загрузки компонента:', src);
                // Пробуем перезагрузить
                setTimeout(() => {
                    if (window.componentLoader) {
                        window.componentLoader.reload().catch(err => {
                            console.error('❌ Не удалось перезагрузить компоненты:', err);
                        });
                    }
                }, 2000);
            }
        }
    });
}

// Экспорт для модулей
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ComponentLoader,
        initComponents: typeof window !== 'undefined' ? window.initComponents : null,
        reloadComponents: typeof window !== 'undefined' ? window.reloadComponents : null,
        reloadComponent: typeof window !== 'undefined' ? window.reloadComponent : null,
        isComponentLoaded: typeof window !== 'undefined' ? window.isComponentLoaded : null,
        getComponentsStatus: typeof window !== 'undefined' ? window.getComponentsStatus : null
    };
}

console.log('✅ components.js fully loaded and ready');
