/**
 * Компонентная система загрузки для NB Group
 * Загружает header и footer на все страницы
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
     * Загружает все компоненты
     */
    async loadAll() {
        if (this.initialized) {
            console.log('✅ Компоненты уже загружены');
            return;
        }
        
        console.log('🔧 Загрузка компонентов...');
        
        try {
            // Проверяем наличие контейнеров
            const hasContainers = this.checkContainers();
            if (!hasContainers) {
                console.warn('⚠️ Контейнеры компонентов не найдены');
                return;
            }
            
            // Загружаем header и footer параллельно
            const promises = [
                this.loadComponent('header'),
                this.loadComponent('footer')
            ];
            
            await Promise.all(promises);
            
            this.initialized = true;
            console.log('✅ Все компоненты загружены');
            
            // Инициализируем компоненты
            this.initializeComponents();
            
            // Применяем переводы
            this.applyTranslations();
            
        } catch (error) {
            console.error('❌ Ошибка загрузки компонентов:', error);
            this.loadFallbackComponents();
        }
    }
    
    /**
     * Проверяет наличие контейнеров
     */
    checkContainers() {
        let found = false;
        
        for (const componentName in this.components) {
            const component = this.components[componentName];
            const container = document.getElementById(component.containerId);
            
            if (container) {
                found = true;
                console.log(`📦 Контейнер ${component.containerId} найден`);
            } else {
                console.warn(`⚠️ Контейнер ${component.containerId} не найден`);
            }
        }
        
        return found;
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
        
        console.log(`📥 Загрузка ${component.name}...`);
        
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
                console.log(`✅ ${component.name} загружен`);
            } else {
                throw new Error(`Контейнер ${component.containerId} не найден`);
            }
            
        } catch (error) {
            console.error(`❌ Ошибка загрузки ${componentName}:`, error);
            throw error;
        }
    }
    
    /**
     * Инициализирует загруженные компоненты
     */
    initializeComponents() {
        console.log('🚀 Инициализация компонентов...');
        
        // Инициализируем header
        if (this.loadedComponents.has('header')) {
            this.initHeader();
        }
        
        // Инициализируем footer
        if (this.loadedComponents.has('footer')) {
            this.initFooter();
        }
    }
    
    /**
     * Инициализация header компонента
     */
    initHeader() {
        console.log('🚀 Инициализация хедера...');
        
        // Даем время на загрузку стилей
        setTimeout(() => {
            // Используем универсальную функцию инициализации
            if (typeof window.initUniversalHeader === 'function') {
                window.initUniversalHeader();
            } else {
                // Альтернативная инициализация если функция не найдена
                if (typeof setupMobileMenu === 'function') setupMobileMenu();
                if (typeof setActiveNavLink === 'function') setActiveNavLink();
                if (typeof setupLanguageSwitcher === 'function') setupLanguageSwitcher();
                
                console.log('✅ Хедер инициализирован (альтернативный метод)');
            }
        }, 100);
    }
    
    /**
     * Инициализация footer компонента
     */
    initFooter() {
        console.log('🦶 Инициализация футера...');
        
        setTimeout(() => {
            if (typeof window.initFooter === 'function') {
                window.initFooter();
            } else {
                console.log('⚠️ Функция initFooter не найдена');
            }
        }, 150);
    }
    
    /**
     * Применяет переводы к компонентам
     */
    applyTranslations() {
        if (window.i18n && typeof window.i18n.refresh === 'function') {
            setTimeout(() => {
                console.log('🌐 Применение переводов к компонентам...');
                window.i18n.refresh();
            }, 300);
        }
    }
    
    /**
     * Загружает фолбэк компоненты при ошибке
     */
    loadFallbackComponents() {
        console.log('🔄 Загрузка фолбэк компонентов...');
        
        // Фолбэк header
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            headerContainer.innerHTML = this.getFallbackHeader();
        }
        
        // Фолбэк footer
        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) {
            footerContainer.innerHTML = this.getFallbackFooter();
        }
        
        setTimeout(() => {
            this.initFallbackComponents();
        }, 100);
    }
    
    /**
     * Фолбэк header
     */
    getFallbackHeader() {
        return `
            <header class="main-header" style="position: fixed; top: 0; left: 0; right: 0; background: rgba(15, 20, 35, 0.95); padding: 15px 0; z-index: 1000; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                <div class="container">
                    <div class="header-inner" style="display: flex; justify-content: space-between; align-items: center;">
                        <a href="index.html" class="logo" style="display: flex; align-items: center; text-decoration: none; color: white;">
                            <div class="logo-mark" style="background: #0066ff; color: white; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 8px; font-weight: bold; font-size: 18px; margin-right: 10px;">NB</div>
                            <span class="logo-text" style="font-size: 18px; font-weight: bold;">NBGROUP.TECH</span>
                        </a>
                        <nav class="main-nav" style="display: flex; gap: 30px;">
                            <a href="index.html" class="nav-link active" style="color: white; text-decoration: none; font-weight: 500;">Главная</a>
                            <a href="about.html" class="nav-link" style="color: rgba(255, 255, 255, 0.8); text-decoration: none; font-weight: 500;">О нас</a>
                            <a href="services.html" class="nav-link" style="color: rgba(255, 255, 255, 0.8); text-decoration: none; font-weight: 500;">Услуги</a>
                            <a href="portfolio.html" class="nav-link" style="color: rgba(255, 255, 255, 0.8); text-decoration: none; font-weight: 500;">Портфолио</a>
                            <a href="brandbook.html" class="nav-link" style="color: rgba(255, 255, 255, 0.8); text-decoration: none; font-weight: 500;">Брендбук</a>
                            <a href="contacts.html" class="nav-link" style="color: rgba(255, 255, 255, 0.8); text-decoration: none; font-weight: 500;">Контакты</a>
                        </nav>
                        <div class="header-actions" style="display: flex; align-items: center; gap: 15px;">
                            <div class="language-switcher" style="display: flex; gap: 5px;">
                                <button class="lang-btn" data-lang="ru" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: white; padding: 5px 10px; border-radius: 4px; cursor: pointer;">RU</button>
                                <button class="lang-btn" data-lang="en" style="background: transparent; border: 1px solid rgba(255, 255, 255, 0.2); color: rgba(255, 255, 255, 0.7); padding: 5px 10px; border-radius: 4px; cursor: pointer;">EN</button>
                            </div>
                            <a href="contacts.html" class="btn btn-small btn-primary" style="background: #0066ff; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: 500;">Начать проект</a>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }
    
    /**
     * Фолбэк footer
     */
    getFallbackFooter() {
        return `
            <footer class="main-footer" style="background: rgba(10, 15, 30, 0.95); padding: 40px 0; margin-top: 100px;">
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-bottom" style="text-align: center;">
                            <div class="copyright" style="color: rgba(255, 255, 255, 0.6); font-size: 14px;">
                                © 2024 NBGROUP.TECH Все права защищены.
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
    
    /**
     * Инициализация фолбэк компонентов
     */
    initFallbackComponents() {
        // Простая инициализация для фолбэка
        const header = document.querySelector('.main-header');
        if (header) {
            header.style.opacity = '1';
        }
        
        console.log('✅ Фолбэк компоненты загружены');
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

// Создаем глобальный экземпляр загрузчика
window.ComponentLoader = ComponentLoader;

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

// Автоматическая инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM загружен, инициализация компонентов...');
    
    // Создаем и сохраняем экземпляр загрузчика
    window.componentLoaderInstance = new ComponentLoader();
    window.componentLoaderInstance.loadAll();
});

// Экспорт для модулей
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComponentLoader;
}
