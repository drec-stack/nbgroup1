console.log('🔧 components.js loaded - COMPLETE FIXED VERSION');

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
        this.retryCount = 0;
        this.maxRetries = 3;
        
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
        }, 8000);
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
                
                // Показываем запасной контент для важных компонентов
                if (component.id === 'header-container') {
                    container.innerHTML = this.getFallbackHeader();
                    console.log('📱 Using fallback header');
                } else if (component.id === 'footer-container') {
                    container.innerHTML = this.getFallbackFooter();
                    console.log('🦶 Using fallback footer');
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
            // Настройка мобильного меню
            this.setupMobileMenu();
            
            // Отправляем событие о завершении загрузки компонентов
            const event = new CustomEvent('componentsFullyLoaded', {
                detail: {
                    loaded: this.loadedComponents,
                    total: this.totalComponents,
                    timestamp: Date.now()
                }
            });
            window.dispatchEvent(event);
            
            // Запускаем дополнительную проверку мобильного меню
            if (window.DaehaaApp && typeof window.DaehaaApp.checkAndFixMobileMenu === 'function') {
                setTimeout(() => {
                    window.DaehaaApp.checkAndFixMobileMenu();
                }, 300);
            }
            
            console.log('✅ components.js полностью загружен и инициализирован');
        }, 500);
    }

    setupMobileMenu() {
        console.log('📱 Настройка мобильного меню после загрузки компонентов');
        
        const burgerBtn = document.querySelector('.burger-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (!burgerBtn) {
            console.warn('⚠️ Бургер-кнопка не найдена');
            return;
        }
        
        if (!mobileMenu) {
            console.warn('⚠️ Мобильное меню не найдено');
            return;
        }
        
        console.log('✅ Элементы мобильного меню найдены');
        
        // Убедимся что меню правильно инициализировано
        mobileMenu.style.display = 'flex';
        mobileMenu.style.opacity = '0';
        mobileMenu.style.visibility = 'hidden';
        mobileMenu.style.transform = 'translateX(100%)';
        
        // Если обработчик еще не установлен
        if (!burgerBtn._componentHandler) {
            burgerBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('🍔 Component handler: Burger clicked');
                
                const isOpen = mobileMenu.classList.contains('active');
                
                if (isOpen) {
                    // Закрыть меню
                    this.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    this.setAttribute('aria-expanded', 'false');
                    this.setAttribute('aria-label', 'Открыть меню');
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                } else {
                    // Открыть меню
                    this.classList.add('active');
                    mobileMenu.classList.add('active');
                    this.setAttribute('aria-expanded', 'true');
                    this.setAttribute('aria-label', 'Закрыть меню');
                    document.body.style.overflow = 'hidden';
                    document.documentElement.style.overflow = 'hidden';
                }
            });
            
            burgerBtn._componentHandler = true;
            console.log('✅ Компонентный обработчик добавлен');
        }
        
        // Добавляем закрытие при клике на ссылки в меню
        const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-lang-btn, .mobile-header-btn');
        mobileLinks.forEach(link => {
            if (!link._closeMenuHandler) {
                link.addEventListener('click', () => {
                    setTimeout(() => {
                        if (burgerBtn && mobileMenu.classList.contains('active')) {
                            burgerBtn.classList.remove('active');
                            mobileMenu.classList.remove('active');
                            burgerBtn.setAttribute('aria-expanded', 'false');
                            burgerBtn.setAttribute('aria-label', 'Открыть меню');
                            document.body.style.overflow = '';
                            document.documentElement.style.overflow = '';
                        }
                    }, 300);
                });
                link._closeMenuHandler = true;
            }
        });
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
                            <div class="language-switcher mobile-only-flags" data-current-lang="ru">
                                <div class="lang-slider"></div>
                                <button class="lang-btn" data-lang="ru">
                                    <span class="lang-flag">🇷🇺</span>
                                </button>
                                <button class="lang-btn" data-lang="en">
                                    <span class="lang-flag">🇬🇧</span>
                                </button>
                            </div>
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

    getFallbackFooter() {
        return `
            <footer class="main-footer">
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-section">
                            <div class="footer-logo">
                                <div class="logo-mark">NB</div>
                                <div class="logo-text">NB Group</div>
                            </div>
                            <p class="footer-description">Промышленный дизайн и инжиниринг</p>
                            <div class="social-links">
                                <a href="#" class="social-link telegram" aria-label="Telegram">
                                    <i class="fab fa-telegram"></i>
                                </a>
                                <a href="#" class="social-link whatsapp" aria-label="WhatsApp">
                                    <i class="fab fa-whatsapp"></i>
                                </a>
                                <a href="#" class="social-link instagram" aria-label="Instagram">
                                    <i class="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <div class="copyright">
                            © 2024 NB Group. Все права защищены.
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

// Инициализация загрузчика компонентов
(function initComponentLoader() {
    console.log('🔧 Initializing Component Loader...');
    
    // Ждем загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.ComponentLoader = new ComponentLoader();
        });
    } else {
        window.ComponentLoader = new ComponentLoader();
    }
})();

// Глобальные утилиты для компонентов
window.refreshComponents = function() {
    console.log('🔄 Refreshing components...');
    if (window.ComponentLoader) {
        window.ComponentLoader.loadedComponents = 0;
        window.ComponentLoader.loadComponents();
    }
};

window.checkComponentsStatus = function() {
    if (window.ComponentLoader) {
        return {
            loaded: window.ComponentLoader.loadedComponents,
            total: window.ComponentLoader.totalComponents,
            allLoaded: window.ComponentLoader.loadedComponents === window.ComponentLoader.totalComponents
        };
    }
    return null;
};

console.log('✅ components.js загружен и готов');
