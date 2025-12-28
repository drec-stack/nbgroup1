// components.js - УПРОЩЕННАЯ ВЕРСИЯ
// ТОЛЬКО загрузка HTML, без повторной инициализации
console.log('🔧 components.js loaded - simplified version');

/**
 * Компонентная система загрузки для NB Group
 * ТОЛЬКО загрузка HTML, без инициализации
 */
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
    }
    
    /**
     * Загружает все компоненты (ТОЛЬКО HTML)
     */
    async loadAll() {
        if (this.initialized) {
            console.log('✅ Компоненты уже загружены');
            return;
        }
        
        console.log('🔧 Загрузка компонентов (HTML only)...');
        
        try {
            // Проверяем наличие контейнеров
            const hasContainers = this.checkContainers();
            if (!hasContainers) {
                console.warn('⚠️ Контейнеры компонентов не найдены');
                return;
            }
            
            // Загружаем header и footer
            await this.loadComponent('header');
            await this.loadComponent('footer');
            
            this.initialized = true;
            console.log('✅ Компоненты загружены (без инициализации)');
            
        } catch (error) {
            console.error('❌ Ошибка загрузки компонентов:', error);
            // НЕ загружаем фолбэк - пусть страница работает без хедера
        }
    }
    
    /**
     * Проверяет наличие контейнеров
     */
    checkContainers() {
        for (const componentName in this.components) {
            const component = this.components[componentName];
            const container = document.getElementById(component.containerId);
            
            if (container) {
                console.log(`📦 Контейнер ${component.containerId} найден`);
            } else {
                console.warn(`⚠️ Контейнер ${component.containerId} не найден`);
                return false;
            }
        }
        
        return true;
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
            const response = await fetch(component.url);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const html = await response.text();
            
            // Вставляем HTML в контейнер
            const container = document.getElementById(component.containerId);
            if (container) {
                container.innerHTML = html;
                this.loadedComponents.add(componentName);
                console.log(`✅ ${component.name} загружен (HTML inserted)`);
            } else {
                throw new Error(`Контейнер ${component.containerId} не найден`);
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
        await this.loadAll();
    }
}

// Глобальная функция для ручной инициализации
window.initComponents = function() {
    const loader = new ComponentLoader();
    return loader.loadAll();
};

// Глобальная функция для перезагрузки компонентов
window.reloadComponents = function() {
    if (window.componentLoaderInstance) {
        return window.componentLoaderInstance.reload();
    }
    return window.initComponents();
};

// Автоматическая загрузка компонентов
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM loaded - loading components (HTML only)...');
    
    // Создаем и сохраняем экземпляр загрузчика
    window.componentLoaderInstance = new ComponentLoader();
    window.componentLoaderInstance.loadAll();
});

// Экспорт для модулей
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComponentLoader;
}
