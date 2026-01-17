console.log('🔧 components.js loaded');

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
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.loadComponents();
            });
        } else {
            this.loadComponents();
        }
    }

    loadComponents() {
        console.log('📦 Loading components...');
        
        this.componentsToLoad.forEach(component => {
            this.loadComponent(component);
        });
        
        // Финальная проверка через 5 секунд
        setTimeout(() => {
            if (this.loadedComponents < this.totalComponents) {
                console.log('⚠️ Some components failed to load');
                this.finalizeLoading();
            }
        }, 5000);
    }

    loadComponent(component) {
        const container = document.getElementById(component.id);
        
        if (!container) {
            console.log(`⚠️ Container ${component.id} not found`);
            this.loadedComponents++;
            this.checkAllLoaded();
            return;
        }
        
        const componentPath = `components/${component.file}`;
        
        console.log(`📄 Loading ${component.file}...`);
        
        fetch(componentPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;
                this.executeScripts(container);
                this.loadedComponents++;
                this.checkAllLoaded();
                console.log(`✅ ${component.file} loaded`);
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
            
            Array.from(oldScript.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value);
            });
            
            if (oldScript.innerHTML) {
                newScript.innerHTML = oldScript.innerHTML;
            }
            
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    }

    checkAllLoaded() {
        if (this.loadedComponents === this.totalComponents) {
            this.finalizeLoading();
        }
    }

    finalizeLoading() {
        console.log('✅ All components loaded');
        
        // Отправляем событие о завершении загрузки
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent('componentsLoaded', {
                detail: {
                    loaded: this.loadedComponents,
                    total: this.totalComponents,
                    timestamp: Date.now()
                }
            }));
            
            console.log('🎉 Components fully loaded and ready');
        }, 100);
    }
}

// Инициализация загрузчика компонентов
(function initComponentLoader() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.ComponentLoader = new ComponentLoader();
        });
    } else {
        window.ComponentLoader = new ComponentLoader();
    }
})();
