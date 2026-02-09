console.log('📦 Component loader initialized');

const ComponentLoader = {
    // Конфигурация
    config: {
        basePath: window.location.hostname.includes('github.io') ? 
                 (window.location.pathname.includes('/nbgroup1/') ? '/nbgroup1/' : '/') : 
                 './',
        components: [
            { id: 'header-container', file: 'components/header.html' },
            { id: 'footer-container', file: 'components/footer.html' },
            { id: 'mobile-menu-container', file: 'components/mobile-menu.html' }
        ],
        timeout: 5000
    },
    
    // Инициализация
    init() {
        console.log('🚀 Starting component loading...');
        
        // Ждем готовности DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.loadComponents());
        } else {
            this.loadComponents();
        }
    },
    
    // Загрузка всех компонентов
    async loadComponents() {
        console.log(`📦 Loading ${this.config.components.length} components`);
        
        const promises = this.config.components.map(component => 
            this.loadComponent(component)
        );
        
        try {
            await Promise.all(promises);
            console.log('✅ All components loaded successfully');
            this.markAsLoaded();
        } catch (error) {
            console.error('❌ Error loading components:', error);
            this.createFallbacks();
            this.markAsLoaded();
        }
    },
    
    // Загрузка одного компонента
    async loadComponent(component) {
        const container = document.getElementById(component.id);
        if (!container) {
            console.warn(`⚠️ Container #${component.id} not found`);
            return;
        }
        
        // Если контейнер уже имеет содержимое, пропускаем
        if (container.innerHTML.trim() !== '') {
            console.log(`⏭️ Skipping ${component.id} (already has content)`);
            return;
        }
        
        try {
            const response = await fetch(this.config.basePath + component.file);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const html = await response.text();
            container.innerHTML = html;
            
            // Выполняем скрипты в компоненте
            this.executeScripts(container);
            
            console.log(`✅ Loaded ${component.id}`);
        } catch (error) {
            console.error(`❌ Failed to load ${component.id}:`, error);
            throw error;
        }
    },
    
    // Выполнение скриптов в компоненте
    executeScripts(container) {
        const scripts = container.querySelectorAll('script');
        scripts.forEach(oldScript => {
            const newScript = document.createElement('script');
            
            // Копируем все атрибуты
            Array.from(oldScript.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value);
            });
            
            // Копируем содержимое
            if (oldScript.innerHTML) {
                newScript.textContent = oldScript.innerHTML;
            }
            
            // Заменяем старый скрипт
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    },
    
    // Создание заглушек
    createFallbacks() {
        console.log('🛠️ Creating fallback components...');
        
        this.config.components.forEach(component => {
            const container = document.getElementById(component.id);
            if (!container || container.innerHTML.trim() !== '') return;
            
            switch(component.id) {
                case 'header-container':
                    container.innerHTML = this.createHeaderFallback();
                    break;
                case 'footer-container':
                    container.innerHTML = this.createFooterFallback();
                    break;
                case 'mobile-menu-container':
                    container.innerHTML = this.createMobileMenuFallback();
                    break;
            }
        });
    },
    
    // Заглушка для хедера
    createHeaderFallback() {
        return `
            <header class="main-header" id="main-header" style="
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                width: calc(100% - 40px);
                max-width: 1400px;
                padding: 15px 0;
                background: rgba(255, 255, 255, 0.08);
                backdrop-filter: blur(40px);
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 20px;
                z-index: 1000;
                box-shadow: 0 15px 50px rgba(0,0,0,0.35);
            ">
                <div class="header-container">
                    <div class="header-inner" style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 0 20px;
                    ">
                        <a href="index.html" class="logo" style="
                            display: flex;
                            align-items: center;
                            gap: 10px;
                            text-decoration: none;
                        ">
                            <div class="logo-mark" style="
                                width: 40px;
                                height: 40px;
                                background: white;
                                border-radius: 10px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-weight: bold;
                                color: black;
                            ">NB</div>
                            <span class="logo-text" style="
                                color: white;
                                font-weight: bold;
                                font-size: 18px;
                            ">NB Group Tech</span>
                        </a>
                        <div class="header-right-mobile" style="
                            display: flex;
                            align-items: center;
                            gap: 10px;
                        ">
                            <button class="burger-btn" aria-label="Меню" style="
                                width: 40px;
                                height: 40px;
                                background: rgba(255,255,255,0.1);
                                border: 1px solid rgba(255,255,255,0.2);
                                border-radius: 8px;
                                color: white;
                            ">
                                ☰
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        `;
    },
    
    // Заглушка для футера
    createFooterFallback() {
        return `
            <footer class="main-footer" style="
                background: rgba(10, 10, 20, 0.8);
                padding: 40px 0;
                margin-top: 80px;
            ">
                <div class="container">
                    <div style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        color: rgba(255, 255, 255, 0.6);
                        font-size: 14px;
                    ">
                        <div>© ${new Date().getFullYear()} NB Group Tech</div>
                        <div>Все права защищены</div>
                    </div>
                </div>
            </footer>
        `;
    },
    
    // Заглушка для мобильного меню
    createMobileMenuFallback() {
        return `
            <div class="mobile-menu" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background: rgba(10, 10, 20, 0.98);
                z-index: 99999;
                padding: 100px 20px;
                display: none;
            ">
                <nav style="
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                ">
                    <a href="index.html" style="
                        color: white;
                        text-decoration: none;
                        font-size: 24px;
                        padding: 15px;
                    ">Главная</a>
                    <a href="services.html" style="
                        color: white;
                        text-decoration: none;
                        font-size: 24px;
                        padding: 15px;
                    ">Услуги</a>
                    <a href="portfolio.html" style="
                        color: white;
                        text-decoration: none;
                        font-size: 24px;
                        padding: 15px;
                    ">Портфолио</a>
                    <a href="about.html" style="
                        color: white;
                        text-decoration: none;
                        font-size: 24px;
                        padding: 15px;
                    ">О нас</a>
                    <a href="contacts.html" style="
                        color: white;
                        text-decoration: none;
                        font-size: 24px;
                        padding: 15px;
                    ">Контакты</a>
                </nav>
            </div>
        `;
    },
    
    // Отметка как загруженного
    markAsLoaded() {
        document.body.classList.add('components-loaded');
        
        // Отправляем событие
        const event = new CustomEvent('componentsLoaded', {
            detail: { timestamp: Date.now() }
        });
        window.dispatchEvent(event);
        
        console.log('✅ Components marked as loaded');
    }
};

// Инициализация загрузчика
ComponentLoader.init();

// Экспорт для глобального доступа
window.ComponentLoader = ComponentLoader;
