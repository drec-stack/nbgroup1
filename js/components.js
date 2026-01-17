console.log('🔧 components.js loaded - FULL WORKING VERSION');

class ComponentLoader {
    constructor() {
        this.componentsToLoad = [
            { id: 'header-container', file: 'header.html' },
            { id: 'footer-container', file: 'footer.html' },
            { id: 'mobile-menu-container', file: 'mobile-menu.html' }
        ];
        this.loadedComponents = 0;
        this.totalComponents = this.componentsToLoad.length;
        
        this.init();
    }

    init() {
        console.log('📦 ComponentLoader initializing...');
        
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

    loadComponents() {
        console.log('📦 Loading components...');
        
        this.componentsToLoad.forEach(component => {
            this.loadComponent(component);
        });
        
        // Финальная проверка
        setTimeout(() => {
            if (this.loadedComponents < this.totalComponents) {
                console.log(`⚠️ Some components failed to load. Loaded: ${this.loadedComponents}/${this.totalComponents}`);
                this.finalizeLoading();
            }
        }, 5000);
    }

    loadComponent(component) {
        const container = document.getElementById(component.id);
        
        if (!container) {
            console.warn(`⚠️ Container ${component.id} not found on page`);
            this.loadedComponents++;
            this.checkAllLoaded();
            return;
        }
        
        const componentPath = `components/${component.file}`;
        
        console.log(`📄 Loading ${component.file} into #${component.id}...`);
        
        fetch(componentPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status} for ${componentPath}`);
                }
                return response.text();
            })
            .then(html => {
                // Сохраняем старый HTML для отката при ошибке
                const oldHTML = container.innerHTML;
                container.innerHTML = html;
                
                try {
                    // Исполняем скрипты внутри компонента
                    this.executeScripts(container);
                    this.loadedComponents++;
                    this.checkAllLoaded();
                    console.log(`✅ ${component.file} loaded successfully`);
                } catch (scriptError) {
                    console.error(`❌ Error executing scripts in ${component.file}:`, scriptError);
                    container.innerHTML = oldHTML; // Откатываем
                    this.loadedComponents++;
                    this.checkAllLoaded();
                }
            })
            .catch(error => {
                console.error(`❌ Failed to load ${component.file}:`, error.message);
                this.loadedComponents++;
                this.checkAllLoaded();
            });
    }

    executeScripts(container) {
        const scripts = container.querySelectorAll('script');
        
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
        });
    }

    checkAllLoaded() {
        if (this.loadedComponents === this.totalComponents) {
            console.log(`✅ All ${this.totalComponents} components loaded successfully`);
            this.finalizeLoading();
        } else {
            console.log(`📊 Progress: ${this.loadedComponents}/${this.totalComponents} components loaded`);
        }
    }

    finalizeLoading() {
        console.log('🎉 Component loading finalized');
        
        // Создаем и отправляем кастомное событие
        const event = new CustomEvent('componentsLoaded', {
            detail: {
                loaded: this.loadedComponents,
                total: this.totalComponents,
                success: this.loadedComponents === this.totalComponents,
                timestamp: Date.now()
            }
        });
        
        setTimeout(() => {
            window.dispatchEvent(event);
            console.log('📢 componentsLoaded event dispatched');
            
            // Добавляем класс для CSS
            document.body.classList.add('components-loaded');
            
            // Вызываем глобальную функцию инициализации если она есть
            if (typeof window.initAfterComponents === 'function') {
                window.initAfterComponents();
            }
        }, 100);
    }
}

// Инициализация загрузчика компонентов
(function initComponents() {
    console.log('🚀 Starting component loader...');
    
    // Проверяем не загружены ли уже компоненты
    if (document.querySelector('#header-container').innerHTML.trim() !== '' ||
        document.querySelector('#mobile-menu-container').innerHTML.trim() !== '') {
        console.log('⚠️ Components already loaded in HTML, skipping loader');
        document.body.classList.add('components-loaded');
        return;
    }
    
    // Создаем индикатор загрузки
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
    `;
    document.body.appendChild(loadingIndicator);
    
    // Анимация загрузки
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 10;
        loadingIndicator.style.transform = `translateX(-${100 - progress}%)`;
        if (progress >= 90) clearInterval(progressInterval);
    }, 200);
    
    // Запускаем загрузчик
    window.ComponentLoaderInstance = new ComponentLoader();
    
    // Скрываем индикатор после загрузки
    window.addEventListener('componentsLoaded', () => {
        clearInterval(progressInterval);
        loadingIndicator.style.transform = 'translateX(0%)';
        loadingIndicator.style.opacity = '0';
        setTimeout(() => {
            loadingIndicator.remove();
        }, 500);
    });
    
    // Обработка ошибок загрузки
    setTimeout(() => {
        if (!document.body.classList.contains('components-loaded')) {
            console.warn('⚠️ Component loading taking too long, forcing completion');
            document.body.classList.add('components-loaded');
            loadingIndicator.remove();
        }
    }, 10000);
})();

// Экспортируем для глобального использования
if (typeof window !== 'undefined') {
    window.ComponentLoader = ComponentLoader;
}

// Глобальные функции для работы с компонентами
window.reloadComponent = function(componentId) {
    console.log(`🔄 Reloading component: ${componentId}`);
    const loader = window.ComponentLoaderInstance;
    if (loader) {
        const component = loader.componentsToLoad.find(c => c.id === componentId);
        if (component) {
            loader.loadedComponents--;
            loader.loadComponent(component);
        }
    }
};

window.getComponentsStatus = function() {
    const loader = window.ComponentLoaderInstance;
    return loader ? {
        loaded: loader.loadedComponents,
        total: loader.totalComponents,
        percentage: Math.round((loader.loadedComponents / loader.totalComponents) * 100)
    } : { loaded: 0, total: 0, percentage: 0 };
};

// Функция для тестирования
window.testComponents = function() {
    console.log('🔍 Testing components...');
    const containers = ['header-container', 'footer-container', 'mobile-menu-container'];
    containers.forEach(id => {
        const container = document.getElementById(id);
        console.log(`${id}: ${container ? 'Found' : 'NOT FOUND'} - Content: ${container?.innerHTML?.length || 0} chars`);
    });
};

console.log('✅ components.js loaded successfully');
