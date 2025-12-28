/**
 * components.js - УПРОЩЕННАЯ ВЕРСИЯ
 * ТОЛЬКО загрузка HTML компонентов, без инициализации
 * Решает проблему двойной инициализации хедера
 */

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
    }
    
    /**
     * Загружает все компоненты (ТОЛЬКО HTML)
     */
    async loadAll() {
        if (this.initialized) {
            console.log('✅ Компоненты уже загружены');
            return;
        }
        
        this.loadAttempts++;
        console.log(`🔧 Попытка загрузки компонентов ${this.loadAttempts}/${this.maxAttempts}...`);
        
        try {
            // Проверяем наличие контейнеров
            const hasContainers = this.checkContainers();
            if (!hasContainers) {
                console.warn('⚠️ Контейнеры компонентов не найдены');
                
                // Если это последняя попытка и нет контейнеров, создаем их
                if (this.loadAttempts >= this.maxAttempts) {
                    this.createContainers();
                    return this.loadAll(); // Повторная попытка
                }
                
                setTimeout(() => this.loadAll(), 500);
                return;
            }
            
            // Загружаем компоненты последовательно
            await this.loadComponent('header');
            await this.loadComponent('footer');
            
            this.initialized = true;
            console.log('✅ Все компоненты загружены (без повторной инициализации)');
            
            // Устанавливаем класс loaded для body
            document.body.classList.add('components-loaded');
            
            // Только для отладки - проверяем состояние
            this.debugComponents();
            
        } catch (error) {
            console.error('❌ Ошибка загрузки компонентов:', error);
            
            // Повторная попытка если не превышен лимит
            if (this.loadAttempts < this.maxAttempts) {
                console.log(`🔄 Повторная попытка через 1 секунду...`);
                setTimeout(() => this.loadAll(), 1000);
            } else {
                console.error('❌ Превышено максимальное количество попыток загрузки');
                // НЕ загружаем фолбэк - пусть страница работает без компонентов
            }
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
                console.log(`📦 Контейнер ${component.containerId} найден`);
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
                
                // Добавляем в правильное место в DOM
                if (componentName === 'header') {
                    document.body.insertBefore(container, document.body.firstChild);
                } else if (componentName === 'footer') {
                    document.body.appendChild(container);
                }
            }
        }
    }
    
    /**
     * Загружает конкретный компонент
     */
    async loadComponent(componentName) {
        if (this.loadedComponents.has(componentName)) {
            console.log(`✅ Компонент ${componentName} уже загружен`);
            return;
        }
        
        const component = this.components[componentName];
        if (!component) {
            throw new Error(`Компонент ${componentName} не найден`);
        }
        
        console.log(`📥 Загрузка ${component.name} (HTML only)...`);
        
        try {
            // Добавляем timestamp для избежания кэширования проблем
            const url = `${component.url}?v=${Date.now()}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const html = await response.text();
            
            // Вставляем HTML в контейнер
            const container = document.getElementById(component.containerId);
            if (container) {
                // Очищаем контейнер перед вставкой
                container.innerHTML = '';
                
                // Используем insertAdjacentHTML для сохранения событий
                container.insertAdjacentHTML('beforeend', html);
                
                this.loadedComponents.add(componentName);
                console.log(`✅ ${component.name} загружен (HTML inserted)`);
                
                // Маркируем контейнер как загруженный
                container.classList.add('component-loaded');
                container.setAttribute('data-component', componentName);
                
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
        this.loadedComponents.clear();
        this.initialized = false;
        this.loadAttempts = 0;
        await this.loadAll();
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
        
        this.loadedComponents.delete(componentName);
        await this.loadComponent(componentName);
    }
}

// Глобальный экземпляр загрузчика
window.componentLoader = null;

// Глобальная функция для ручной инициализации
window.initComponents = function() {
    console.log('🔄 Ручная инициализация компонентов...');
    
    if (!window.componentLoader) {
        window.componentLoader = new ComponentLoader();
    }
    
    return window.componentLoader.loadAll();
};

// Глобальная функция для перезагрузки компонентов
window.reloadComponents = function() {
    if (window.componentLoader) {
        return window.componentLoader.reload();
    }
    return window.initComponents();
};

// Глобальная функция для перезагрузки конкретного компонента
window.reloadComponent = function(componentName) {
    if (window.componentLoader) {
        return window.componentLoader.reloadComponent(componentName);
    }
    console.warn('⚠️ ComponentLoader не инициализирован');
    return Promise.reject('ComponentLoader not initialized');
};

// Глобальная функция для проверки загрузки компонента
window.isComponentLoaded = function(componentName) {
    if (window.componentLoader) {
        return window.componentLoader.isComponentLoaded(componentName);
    }
    return false;
};

// Автоматическая загрузка компонентов при готовности DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM loaded - loading components (HTML only)...');
    
    // Проверяем, не инициализирован ли уже загрузчик
    if (!window.componentLoader) {
        window.componentLoader = new ComponentLoader();
    }
    
    // Небольшая задержка для гарантии что DOM полностью готов
    setTimeout(() => {
        window.componentLoader.loadAll();
    }, 100);
});

// Также пробуем загрузить когда страница полностью загружена
window.addEventListener('load', function() {
    console.log('🌐 Page fully loaded - checking components...');
    
    // Проверяем, все ли компоненты загружены
    if (window.componentLoader && !window.componentLoader.initialized) {
        console.log('⚠️ Компоненты не были загружены при DOM ready, пытаемся сейчас...');
        setTimeout(() => {
            window.componentLoader.loadAll();
        }, 500);
    }
});

// Экспорт для модулей
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ComponentLoader,
        initComponents: window.initComponents,
        reloadComponents: window.reloadComponents,
        reloadComponent: window.reloadComponent,
        isComponentLoaded: window.isComponentLoaded
    };
}

console.log('✅ components.js ready - will load HTML only, no initialization');
