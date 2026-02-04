console.log('🔧 components.js loaded - SIMPLIFIED VERSION');

class ComponentLoader {
    constructor() {
        console.log('📦 Creating ComponentLoader instance...');
        
        // Базовая директория
        this.basePath = this.determineBasePath();
        
        // Компоненты для загрузки
        this.components = [
            { id: 'header-container', file: this.basePath + 'components/header.html' },
            { id: 'footer-container', file: this.basePath + 'components/footer.html' },
            { id: 'mobile-menu-container', file: this.basePath + 'components/mobile-menu.html' }
        ];
        
        this.loadedCount = 0;
        this.totalComponents = this.components.length;
        
        console.log(`📦 Will load ${this.totalComponents} components from "${this.basePath}"`);
        this.init();
    }
    
    determineBasePath() {
        const path = window.location.pathname;
        console.log('📍 Current path:', path);
        
        // GitHub Pages
        if (path.includes('/nbgroup1/')) {
            return './';
        }
        
        // Локальная разработка
        const isRoot = path === '/' || path.endsWith('/') || path.includes('index.html');
        return isRoot ? '' : './';
    }
    
    init() {
        console.log('📦 Initializing ComponentLoader...');
        
        // Создаем контейнеры если их нет
        this.createContainers();
        
        // Проверяем не загружены ли уже компоненты
        if (this.areComponentsLoaded()) {
            console.log('⚠️ Components already loaded');
            this.markAsLoaded();
            return;
        }
        
        // Загружаем компоненты
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.loadAllComponents();
            });
        } else {
            this.loadAllComponents();
        }
    }
    
    createContainers() {
        ['header-container', 'footer-container', 'mobile-menu-container'].forEach(id => {
            if (!document.getElementById(id)) {
                const container = document.createElement('div');
                container.id = id;
                document.body.appendChild(container);
                console.log(`✅ Created container: #${id}`);
            }
        });
    }
    
    areComponentsLoaded() {
        const header = document.getElementById('header-container');
        return header && header.innerHTML.trim() !== '';
    }
    
    loadAllComponents() {
        console.log('📦 Loading all components...');
        
        this.components.forEach(component => {
            this.loadComponent(component);
        });
        
        // Таймаут на случай ошибок
        setTimeout(() => {
            if (this.loadedCount < this.totalComponents) {
                console.warn(`⚠️ Some components failed: ${this.loadedCount}/${this.totalComponents}`);
                this.createFallbacks();
            }
        }, 5000);
    }
    
    loadComponent(component) {
        const container = document.getElementById(component.id);
        if (!container || container.innerHTML.trim() !== '') {
            this.loadedCount++;
            this.checkAllLoaded();
            return;
        }
        
        console.log(`📄 Loading ${component.file}`);
        
        fetch(component.file)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.text();
            })
            .then(html => {
                if (!html.trim()) throw new Error('Empty response');
                
                container.innerHTML = html;
                this.executeScripts(container);
                this.loadedCount++;
                this.checkAllLoaded();
                console.log(`✅ Loaded ${component.file}`);
            })
            .catch(error => {
                console.error(`❌ Failed to load ${component.file}:`, error.message);
                this.createFallback(component);
                this.loadedCount++;
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
                newScript.textContent = oldScript.innerHTML;
            }
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    }
    
    createFallback(component) {
        const container = document.getElementById(component.id);
        if (!container) return;
        
        const getPath = (page) => {
            if (window.location.hostname.includes('github.io')) {
                return `/nbgroup1/${page}`;
            }
            return `./${page}`;
        };
        
        switch(component.id) {
            case 'header-container':
                container.innerHTML = `
                    <header class="main-header header-visible" id="main-header">
                        <div class="header-container">
                            <div class="header-inner">
                                <a href="${getPath('index.html')}" class="logo">
                                    <div class="logo-mark">NB</div>
                                    <span class="logo-text">NB Group</span>
                                </a>
                                <div class="header-right-mobile">
                                    <button class="burger-btn" aria-label="Меню">
                                        <span></span><span></span><span></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </header>
                `;
                break;
                
            case 'footer-container':
                container.innerHTML = `
                    <footer class="main-footer">
                        <div class="container">
                            <p>&copy; ${new Date().getFullYear()} NB Group</p>
                        </div>
                    </footer>
                `;
                break;
        }
    }
    
    createFallbacks() {
        this.components.forEach(component => {
            if (!document.getElementById(component.id)?.innerHTML.trim()) {
                this.createFallback(component);
            }
        });
    }
    
    checkAllLoaded() {
        if (this.loadedCount === this.totalComponents) {
            console.log(`✅ All ${this.totalComponents} components loaded`);
            this.markAsLoaded();
        }
    }
    
    markAsLoaded() {
        document.body.classList.add('components-loaded');
        
        // Отправляем события
        window.dispatchEvent(new CustomEvent('componentsLoaded'));
        window.dispatchEvent(new CustomEvent('componentsFullyLoaded'));
        
        console.log('🎉 Components marked as loaded');
    }
}

// Инициализация
(function() {
    console.log('🚀 Starting component loader...');
    
    // Глобальные утилиты
    window.checkComponents = function() {
        const containers = ['header-container', 'footer-container', 'mobile-menu-container'];
        containers.forEach(id => {
            const el = document.getElementById(id);
            console.log(`${id}: ${el ? 'FOUND' : 'MISSING'} - Content: ${el?.innerHTML?.length || 0} chars`);
        });
    };
    
    window.reloadComponents = function() {
        document.body.classList.remove('components-loaded');
        ['header-container', 'footer-container', 'mobile-menu-container'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.innerHTML = '';
        });
        new ComponentLoader();
    };
    
    // Основная инициализация
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new ComponentLoader();
        });
    } else {
        new ComponentLoader();
    }
})();

// Фикс для GitHub Pages
if (window.location.hostname.includes('github.io')) {
    console.log('🌐 GitHub Pages detected');
    
    // Применяем фиксы после загрузки
    window.addEventListener('componentsLoaded', () => {
        setTimeout(() => {
            const header = document.getElementById('main-header');
            if (header) {
                header.classList.add('header-visible');
                header.classList.remove('header-hidden');
            }
        }, 100);
    });
}

console.log('✅ components.js loaded successfully');
