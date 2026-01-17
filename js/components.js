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
            
            this.setupMobileMenu();
        }, 500);
    }

    setupMobileMenu() {
        const burgerBtn = document.querySelector('.burger-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (!burgerBtn || !mobileMenu) {
            return;
        }
        
        // Убедимся что меню скрыто по умолчанию
        mobileMenu.style.display = 'flex';
        mobileMenu.style.visibility = 'hidden';
        mobileMenu.style.opacity = '0';
        mobileMenu.style.transform = 'translateX(100%)';
        
        // Удаляем старые обработчики (если есть)
        const newBurgerBtn = burgerBtn.cloneNode(true);
        burgerBtn.parentNode.replaceChild(newBurgerBtn, burgerBtn);
        
        // Обработчик клика на бургер
        newBurgerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
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
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !newBurgerBtn.contains(e.target)) {
                newBurgerBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileMenu.style.transform = 'translateX(100%)';
                mobileMenu.style.opacity = '0';
                mobileMenu.style.visibility = 'hidden';
                document.body.style.overflow = '';
            }
        });
        
        // Закрытие меню по клавише Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                newBurgerBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileMenu.style.transform = 'translateX(100%)';
                mobileMenu.style.opacity = '0';
                mobileMenu.style.visibility = 'hidden';
                document.body.style.overflow = '';
            }
        });
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
