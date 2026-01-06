console.log('🔧 components.js loaded - simplified version (HTML only)');

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
            }
        };
        
        this.loadedComponents = new Set();
        this.initialized = false;
        this.loadAttempts = 0;
        this.maxAttempts = 3;
        this.isLoading = false;
        this.loadingPromise = null;
        this.initialLoadCompleted = false;
        
        console.log('✅ components.js ready - will load HTML only, no initialization');
    }
    
    /**
     * Загружает все компоненты (ТОЛЬКО HTML)
     * Возвращает Promise для синхронизации
     */
    async loadAll() {
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
                
                this.initialized = true;
                this.initialLoadCompleted = true;
                console.log('✅ Все компоненты загружены (без повторной инициализации)');
                
                // Устанавливаем класс loaded для body
                document.body.classList.add('components-loaded');
                
                // Отправляем событие о завершении загрузки
                window.dispatchEvent(new CustomEvent('componentsLoaded', {
                    detail: { components: Array.from(this.loadedComponents) }
                }));
                
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
                console.warn(`⚠️ Контейнер ${component.containerId} не найден`);
                allFound = false;
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
            let container = document.getElementById(component.containerId);
            
            if (!container) {
                console.log(`➕ Создаю контейнер ${component.containerId}`);
                container = document.createElement('div');
                container.id = component.containerId;
                container.className = 'component-container';
                
                // Добавляем в правильное место в DOM
                if (componentName === 'header') {
                    document.body.insertBefore(container, document.body.firstChild);
                } else if (componentName === 'footer') {
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
        
        console.log(`📥 Загрузка ${component.name} (HTML only)...`);
        
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
                console.log(`✅ ${component.name} загружен (HTML inserted)`);
                
                // Маркируем контейнер как загруженный
                container.classList.add('component-loaded');
                container.setAttribute('data-component', componentName);
                container.setAttribute('data-loaded-at', timestamp);
                
                // Отправляем событие о загрузке компонента
                window.dispatchEvent(new CustomEvent('componentLoaded', {
                    detail: { 
                        name: componentName,
                        containerId: component.containerId,
                        timestamp: timestamp
                    }
                }));
                
            } else {
                throw new Error(`Контейнер ${component.containerId} не найден после проверки`);
            }
            
        } catch (error) {
            console.error(`❌ Ошибка загрузки ${componentName}:`, error);
            
            // Если это хедер, критическая ошибка
            if (componentName === 'header') {
                throw new Error(`CRITICAL: Не удалось загрузить header: ${error.message}`);
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
                    const header = container.querySelector('.main-header');
                    console.log(`    - Найден .main-header: ${!!header}`);
                    if (header) {
                        console.log(`    - Позиция: ${header.style.position || 'not set'}`);
                        console.log(`    - Top: ${header.style.top || 'not set'}`);
                        console.log(`    - Left: ${header.style.left || 'not set'}`);
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

// Глобальный экземпляр загрузчика
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

// Автоматическая загрузка компонентов при готовности DOM
(function initComponentsOnDOMReady() {
    // Проверяем, готов ли DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('📄 DOM loaded - loading components (HTML only)...');
            
            // Небольшая задержка для гарантии что DOM полностью готов
            setTimeout(() => {
                window.componentLoader.loadAll().catch(error => {
                    console.error('❌ Не удалось загрузить компоненты:', error);
                });
            }, 100);
        });
    } else {
        // DOM уже готов
        console.log('📄 DOM already loaded - loading components...');
        setTimeout(() => {
            window.componentLoader.loadAll().catch(error => {
                console.error('❌ Не удалось загрузить компоненты:', error);
            });
        }, 100);
    }
})();

// Также пробуем загрузить когда страница полностью загружена
window.addEventListener('load', function() {
    console.log('🌐 Page fully loaded - checking components...');
    
    // Проверяем, все ли компоненты загружены
    const status = window.componentLoader.getStatus();
    if (!status.initialized || !status.loadedComponents.includes('header') || !status.loadedComponents.includes('footer')) {
        console.log('⚠️ Компоненты не были загружены при DOM ready, пытаемся сейчас...');
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
                window.componentLoader.reload().catch(err => {
                    console.error('❌ Не удалось перезагрузить компоненты:', err);
                });
            }, 2000);
        }
    }
});

// Экспорт для модулей
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ComponentLoader,
        initComponents: window.initComponents,
        reloadComponents: window.reloadComponents,
        reloadComponent: window.reloadComponent,
        isComponentLoaded: window.isComponentLoaded,
        getComponentsStatus: window.getComponentsStatus
    };
}
