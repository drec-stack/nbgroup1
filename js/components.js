console.log('🔧 components.js loaded - SIMPLE MOBILE MENU SUPPORT');

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
        
        console.log('✅ components.js ready');
        
        // Автоматически запускаем загрузку
        this.autoStart();
    }
    
    /**
     * Автоматический запуск загрузки
     */
    autoStart() {
        if (document.readyState !== 'loading') {
            console.log('📄 DOM already ready, starting component load...');
            setTimeout(() => {
                this.loadAll().catch(error => {
                    console.error('❌ Failed to auto-load components:', error);
                });
            }, 100);
        } else {
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
     */
    async loadAll() {
        if (!document || !document.documentElement) {
            console.warn('⚠️ DOM not available yet, waiting...');
            return new Promise(resolve => {
                setTimeout(() => this.loadAll().then(resolve), 100);
            });
        }
        
        this.loadAttempts++;
        console.log(`🔧 Попытка загрузки компонентов ${this.loadAttempts}/${this.maxAttempts}...`);
        
        try {
            // Создаем контейнер для мобильного меню если его нет
            this.createMobileMenuContainer();
            
            // Загружаем компоненты последовательно
            await this.loadComponent('header');
            await this.loadComponent('footer');
            await this.loadComponent('mobile-menu');
            
            this.initialized = true;
            console.log('✅ Все компоненты загружены');
            
            // Устанавливаем класс loaded для body
            if (document.body) {
                document.body.classList.add('components-loaded');
            }
            
            // После загрузки компонентов настраиваем мобильное меню
            setTimeout(() => {
                this.setupMobileMenu();
            }, 300);
            
            // Отправляем событие о завершении загрузки
            if (window) {
                window.dispatchEvent(new CustomEvent('componentsLoaded', {
                    detail: { components: Array.from(this.loadedComponents) }
                }));
                
                // Сильное событие для синхронизации
                const strongEvent = new CustomEvent('componentsFullyLoaded', {
                    detail: { 
                        components: Array.from(this.loadedComponents),
                        timestamp: Date.now()
                    }
                });
                window.dispatchEvent(strongEvent);
                console.log('📢 componentsFullyLoaded event dispatched');
            }
            
            return true;
            
        } catch (error) {
            console.error('❌ Ошибка загрузки компонентов:', error);
            
            if (this.loadAttempts < this.maxAttempts) {
                console.log(`🔄 Повторная попытка через 1 секунду...`);
                setTimeout(() => {
                    this.loadAll().catch(err => {
                        console.error('❌ Не удалось загрузить компоненты:', err);
                    });
                }, 1000);
            } else {
                console.error('❌ Превышено максимальное количество попыток загрузки');
                throw error;
            }
        }
    }
    
    /**
     * Настройка мобильного меню
     */
    setupMobileMenu() {
        console.log('📱 Настройка мобильного меню после загрузки компонентов');
        
        const burgerBtn = document.getElementById('burger-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (!burgerBtn) {
            console.error('❌ Бургер-кнопка не найдена');
            this.createSimpleBurgerButton();
            return;
        }
        
        if (!mobileMenu) {
            console.error('❌ Мобильное меню не найдено');
            return;
        }
        
        console.log('✅ Элементы мобильного меню найдены');
        
        // Гарантируем правильное отображение меню
        mobileMenu.style.display = 'flex';
        mobileMenu.style.opacity = '0';
        mobileMenu.style.visibility = 'hidden';
        mobileMenu.style.transform = 'translateX(100%)';
        
        // ПРОСТОЙ обработчик
        burgerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🍔 Компонентный обработчик: Бургер нажат!');
            
            const menu = document.getElementById('mobile-menu');
            if (!menu) return;
            
            const isOpen = menu.classList.contains('active');
            
            if (isOpen) {
                // Закрыть меню
                menu.classList.remove('active');
                this.classList.remove('active');
                this.setAttribute('aria-expanded', 'false');
                this.setAttribute('aria-label', 'Открыть меню');
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            } else {
                // Открыть меню
                menu.classList.add('active');
                this.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
                this.setAttribute('aria-label', 'Закрыть меню');
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
            }
        });
        
        console.log('✅ Компонентный обработчик добавлен');
    }
    
    /**
     * Создает простую бургер-кнопку если её нет
     */
    createSimpleBurgerButton() {
        console.log('➕ Создаю простую бургер-кнопку...');
        
        // Ищем контейнер
        let container = document.querySelector('.header-right-mobile') || 
                       document.querySelector('.header-container') ||
                       document.getElementById('header-container');
        
        if (!container) {
            console.error('❌ Контейнер для бургер-кнопки не найден');
            return;
        }
        
        // Создаем кнопку
        const burgerBtn = document.createElement('button');
        burgerBtn.id = 'burger-btn';
        burgerBtn.className = 'burger-btn';
        burgerBtn.setAttribute('aria-label', 'Открыть меню');
        burgerBtn.setAttribute('aria-expanded', 'false');
        
        // Простая HTML структура
        burgerBtn.innerHTML = `
            <span style="display: block; width: 20px; height: 2px; background: white; margin: 4px auto;"></span>
            <span style="display: block; width: 20px; height: 2px; background: white; margin: 4px auto;"></span>
            <span style="display: block; width: 20px; height: 2px; background: white; margin: 4px auto;"></span>
        `;
        
        // Простые стили
        burgerBtn.style.cssText = `
            display: block;
            width: 44px;
            height: 44px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            cursor: pointer;
            position: relative;
            z-index: 1002;
            margin-left: 10px;
        `;
        
        container.appendChild(burgerBtn);
        console.log('✅ Простая бургер-кнопка создана');
        
        // Сразу настраиваем обработчик
        setTimeout(() => {
            this.setupMobileMenu();
        }, 100);
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
            
            if (document.body) {
                document.body.appendChild(container);
            }
            
            console.log('✅ Контейнер mobile-menu-container создан');
        }
    }
    
    /**
     * Загружает конкретный компонент
     */
    async loadComponent(componentName) {
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
            
            if (!html || html.trim().length === 0) {
                throw new Error(`Получен пустой HTML для ${component.name}`);
            }
            
            const container = document.getElementById(component.containerId);
            if (container) {
                if (container.children.length > 0 && container.classList.contains('component-loaded')) {
                    console.log(`⚠️ Контейнер ${component.containerId} уже содержит контент, пропускаем`);
                    this.loadedComponents.add(componentName);
                    return;
                }
                
                container.innerHTML = '';
                container.insertAdjacentHTML('beforeend', html);
                
                this.loadedComponents.add(componentName);
                console.log(`✅ ${component.name} загружен`);
                
                container.classList.add('component-loaded');
                container.setAttribute('data-component', componentName);
                container.setAttribute('data-loaded-at', timestamp);
                
                if (componentName === 'mobile-menu') {
                    console.log('📱 Мобильное меню загружено');
                }
                
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
            throw error;
        }
    }
    
    /**
     * Перезагружает компоненты
     */
    async reload() {
        console.log('🔄 Перезагрузка компонентов...');
        
        this.loadedComponents.clear();
        this.initialized = false;
        this.loadAttempts = 0;
        
        for (const componentName in this.components) {
            const component = this.components[componentName];
            const container = document.getElementById(component.containerId);
            if (container) {
                container.classList.remove('component-loaded');
                container.removeAttribute('data-loaded-at');
            }
        }
        
        return this.loadAll();
    }
}

// Создаем глобальный экземпляр
if (typeof window !== 'undefined') {
    window.componentLoader = new ComponentLoader();
    
    window.initComponents = function() {
        console.log('🔄 Ручная инициализация компонентов...');
        return window.componentLoader.loadAll();
    };
    
    window.reloadComponents = function() {
        return window.componentLoader.reload();
    };
    
    window.setupMobileMenu = function() {
        if (window.componentLoader) {
            window.componentLoader.setupMobileMenu();
        }
    };
}

console.log('✅ components.js полностью загружен');
