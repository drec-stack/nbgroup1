console.log('🔧 components.js loaded - SIMPLIFIED FIXED VERSION');

class ComponentLoader {
    constructor() {
        console.log('📦 ComponentLoader initialized');
        this.componentsToLoad = [
            { id: 'header-container', file: 'header.html' },
            { id: 'footer-container', file: 'footer.html' },
            { id: 'mobile-menu-container', file: 'mobile-menu.html' }
        ];
        this.loadedComponents = 0;
        this.totalComponents = this.componentsToLoad.length;
        
        console.log(`📊 Will load ${this.totalComponents} components`);
        
        this.init();
    }

    init() {
        console.log('🎯 Starting component loading...');
        
        if (document.readyState === 'loading') {
            console.log('⏳ DOM loading, waiting...');
            document.addEventListener('DOMContentLoaded', () => {
                console.log('✅ DOM ready, loading components...');
                this.loadComponents();
            });
        } else {
            console.log('✅ DOM already ready, starting component load...');
            this.loadComponents();
        }
    }

    loadComponents() {
        console.log(`📥 Loading ${this.totalComponents} components...`);
        
        this.componentsToLoad.forEach(component => {
            this.loadComponent(component);
        });
        
        // Устанавливаем таймаут для завершения загрузки
        setTimeout(() => {
            if (this.loadedComponents < this.totalComponents) {
                console.warn(`⚠️ Some components failed to load (${this.loadedComponents}/${this.totalComponents})`);
                this.finalizeLoading();
            }
        }, 5000);
    }

    loadComponent(component) {
        const container = document.getElementById(component.id);
        
        if (!container) {
            console.warn(`⚠️ Container not found: #${component.id}`);
            this.loadedComponents++;
            this.checkAllLoaded();
            return;
        }
        
        const componentPath = `components/${component.file}`;
        console.log(`📥 Loading ${component.file} into #${component.id} from: ${componentPath}`);
        
        fetch(componentPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText} for ${component.file}`);
                }
                return response.text();
            })
            .then(html => {
                // Вставляем HTML
                container.innerHTML = html;
                console.log(`✅ ${component.file} загружен в #${component.id}`);
                
                // Выполняем скрипты внутри компонента
                this.executeScripts(container);
                
                this.loadedComponents++;
                console.log(`📊 Progress: ${this.loadedComponents}/${this.totalComponents}`);
                
                // Проверяем, все ли компоненты загружены
                this.checkAllLoaded();
            })
            .catch(error => {
                console.error(`❌ Failed to load ${component.file}:`, error.message);
                
                // Показываем запасной контент
                if (component.id === 'header-container') {
                    container.innerHTML = this.getFallbackHeader();
                    console.log('📱 Using fallback header');
                }
                
                this.loadedComponents++;
                this.checkAllLoaded();
            });
    }

    executeScripts(container) {
        const scripts = container.querySelectorAll('script');
        if (scripts.length > 0) {
            console.log(`📜 Found ${scripts.length} script(s) in component`);
        }
        
        scripts.forEach(oldScript => {
            const newScript = document.createElement('script');
            
            // Копируем атрибуты
            Array.from(oldScript.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value);
            });
            
            // Копируем содержимое
            if (oldScript.innerHTML) {
                newScript.innerHTML = oldScript.innerHTML;
            }
            
            // Заменяем старый скрипт новым
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    }

    checkAllLoaded() {
        if (this.loadedComponents === this.totalComponents) {
            console.log('🎉 All components loaded successfully!');
            this.finalizeLoading();
        }
    }

    finalizeLoading() {
        console.log('🏁 Finalizing component loading...');
        
        // Даем время скриптам выполниться
        setTimeout(() => {
            // Отправляем событие о завершении загрузки компонентов
            const event = new CustomEvent('componentsFullyLoaded', {
                detail: {
                    loaded: this.loadedComponents,
                    total: this.totalComponents,
                    timestamp: Date.now()
                }
            });
            window.dispatchEvent(event);
            
            console.log('✅ components.js полностью загружен и инициализирован');
            
            // Инициализируем мобильное меню (простая версия)
            this.setupSimpleMobileMenu();
        }, 500);
    }

    setupSimpleMobileMenu() {
        console.log('📱 Setting up mobile menu...');
        
        const burgerBtn = document.querySelector('.burger-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (!burgerBtn || !mobileMenu) {
            console.log('🖥️ Desktop mode or elements not found');
            return;
        }
        
        console.log('✅ Mobile menu elements found');
        
        // Убедимся что меню скрыто по умолчанию
        mobileMenu.style.display = 'flex';
        mobileMenu.style.visibility = 'hidden';
        mobileMenu.style.opacity = '0';
        mobileMenu.style.transform = 'translateX(100%)';
        
        // Удаляем старые обработчики (если есть)
        const newBurgerBtn = burgerBtn.cloneNode(true);
        burgerBtn.parentNode.replaceChild(newBurgerBtn, burgerBtn);
        
        // Простой обработчик клика
        newBurgerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🍔 Burger clicked');
            
            const mobileMenu = document.querySelector('.mobile-menu');
            if (!mobileMenu) return;
            
            const isOpen = mobileMenu.classList.contains('active');
            
            if (isOpen) {
                // Закрыть меню
                this.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileMenu.style.transform = 'translateX(100%)';
                mobileMenu.style.opacity = '0';
                mobileMenu.style.visibility = 'hidden';
                document.body.style.overflow = '';
            } else {
                // Открыть меню
                this.classList.add('active');
                mobileMenu.classList.add('active');
                mobileMenu.style.transform = 'translateX(0)';
                mobileMenu.style.opacity = '1';
                mobileMenu.style.visibility = 'visible';
                document.body.style.overflow = 'hidden';
            }
        });
        
        // Закрытие меню при клике на ссылки
        const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-lang-btn, .mobile-header-btn');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(() => {
                    if (newBurgerBtn && mobileMenu.classList.contains('active')) {
                        newBurgerBtn.classList.remove('active');
                        mobileMenu.classList.remove('active');
                        mobileMenu.style.transform = 'translateX(100%)';
                        mobileMenu.style.opacity = '0';
                        mobileMenu.style.visibility = 'hidden';
                        document.body.style.overflow = '';
                    }
                }, 100);
            });
        });
        
        console.log('✅ Mobile menu setup complete');
    }

    getFallbackHeader() {
        return `
            <header class="main-header" id="main-header">
                <div class="header-container">
                    <div class="header-inner">
                        <a href="index.html" class="logo" aria-label="На главную">
                            <div class="logo-mark" aria-hidden="true">NB</div>
                            <span class="logo-text">NB Group</span>
                        </a>
                        <div class="header-right-mobile">
                            <button class="burger-btn" id="burger-btn" aria-label="Открыть меню" aria-expanded="false">
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }
}

// Инициализация загрузчика компонентов
(function initComponentLoader() {
    console.log('🔧 Initializing Component Loader...');
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.ComponentLoader = new ComponentLoader();
        });
    } else {
        window.ComponentLoader = new ComponentLoader();
    }
})();

console.log('✅ components.js загружен и готов');
