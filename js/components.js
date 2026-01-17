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
        this.componentsToLoad.forEach(component => {
            this.loadComponent(component);
        });
        
        // Таймаут для завершения загрузки
        setTimeout(() => {
            if (this.loadedComponents < this.totalComponents) {
                this.finalizeLoading();
            }
        }, 5000);
    }

    loadComponent(component) {
        const container = document.getElementById(component.id);
        
        if (!container) {
            this.loadedComponents++;
            this.checkAllLoaded();
            return;
        }
        
        const componentPath = `components/${component.file}`;
        
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
            })
            .catch(error => {
                console.error(`Failed to load ${component.file}:`, error.message);
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
        setTimeout(() => {
            const event = new CustomEvent('componentsFullyLoaded', {
                detail: {
                    loaded: this.loadedComponents,
                    total: this.totalComponents,
                    timestamp: Date.now()
                }
            });
            window.dispatchEvent(event);
            
            console.log('✅ Все компоненты загружены');
        }, 500);
    }
}

// ===== УНИВЕРСАЛЬНЫЙ МЕНЕДЖЕР БУРГЕР-МЕНЮ (работает на всех страницах) =====
class BurgerMenuManager {
    constructor() {
        this.burgerBtn = null;
        this.mobileMenu = null;
        this.isInitialized = false;
        this.init();
    }

    init() {
        console.log('🍔 Initializing Burger Menu Manager...');
        
        // Ждем загрузки компонентов
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupMenu();
            });
        } else {
            this.setupMenu();
        }
        
        // Также ждем загрузки компонентов через events
        window.addEventListener('componentsFullyLoaded', () => {
            this.setupMenu();
        });
    }

    setupMenu() {
        // Если уже инициализирован, пропускаем
        if (this.isInitialized) return;
        
        this.burgerBtn = document.querySelector('.burger-btn');
        this.mobileMenu = document.querySelector('.mobile-menu');
        
        if (!this.burgerBtn || !this.mobileMenu) {
            console.log('🍔 Burger menu elements not found yet, waiting...');
            setTimeout(() => this.setupMenu(), 500);
            return;
        }
        
        console.log('✅ Burger menu elements found:', {
            burgerBtn: this.burgerBtn,
            mobileMenu: this.mobileMenu
        });
        
        this.setupEventListeners();
        this.isInitialized = true;
        console.log('✅ Burger Menu Manager initialized on page:', window.location.pathname);
        
        // Глобальная функция для тестирования
        window.testBurgerMenu = () => this.toggleMenu();
    }

    setupEventListeners() {
        // Удаляем старые обработчики
        const newBurgerBtn = this.burgerBtn.cloneNode(true);
        if (this.burgerBtn.parentNode) {
            this.burgerBtn.parentNode.replaceChild(newBurgerBtn, this.burgerBtn);
        }
        this.burgerBtn = newBurgerBtn;
        
        // Основной обработчик клика
        this.burgerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleMenu();
        });
        
        // Закрытие при клике на ссылки в меню
        const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-lang-btn, .mobile-header-btn');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(() => {
                    if (this.mobileMenu.classList.contains('active')) {
                        this.closeMenu();
                    }
                }, 300);
            });
        });
        
        // Закрытие при клике вне меню
        document.addEventListener('click', (e) => {
            if (this.mobileMenu.classList.contains('active') && 
                !this.mobileMenu.contains(e.target) && 
                !this.burgerBtn.contains(e.target)) {
                this.closeMenu();
            }
        });
        
        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenu.classList.contains('active')) {
                this.closeMenu();
            }
        });
        
        // Адаптация для сенсорных устройств
        this.burgerBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
        }, { passive: false });
    }

    toggleMenu() {
        if (this.mobileMenu.classList.contains('active')) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        console.log('➕ Opening mobile menu');
        this.burgerBtn.classList.add('active');
        this.mobileMenu.classList.add('active');
        this.burgerBtn.setAttribute('aria-expanded', 'true');
        this.burgerBtn.setAttribute('aria-label', 'Закрыть меню');
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
    }

    closeMenu() {
        console.log('➖ Closing mobile menu');
        this.burgerBtn.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        this.burgerBtn.setAttribute('aria-expanded', 'false');
        this.burgerBtn.setAttribute('aria-label', 'Открыть меню');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }
}

// Инициализация загрузчика компонентов
(function initComponentLoader() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.ComponentLoader = new ComponentLoader();
            // Инициализируем универсальный менеджер бургер-меню
            window.burgerMenuManager = new BurgerMenuManager();
        });
    } else {
        window.ComponentLoader = new ComponentLoader();
        window.burgerMenuManager = new BurgerMenuManager();
    }
})();
