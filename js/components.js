console.log('🔧 components.js loaded - UNIVERSAL FIXED VERSION FOR GITHUB PAGES');

class ComponentLoader {
    constructor() {
        console.log('📦 Creating ComponentLoader instance...');
        
        // Ждем пока DOM будет готов
        if (document.body === null) {
            console.log('⏳ Waiting for DOM to be ready...');
            setTimeout(() => new ComponentLoader(), 100);
            return;
        }
        
        // Определяем базовый путь ВСЕГДА как текущая директория
        this.basePath = this.determineBasePath();
        
        // Компоненты для загрузки с правильными путями
        this.componentsToLoad = [
            { id: 'header-container', file: this.basePath + 'components/header.html' },
            { id: 'footer-container', file: this.basePath + 'components/footer.html' },
            { id: 'mobile-menu-container', file: this.basePath + 'components/mobile-menu.html' }
        ];
        
        this.loadedComponents = 0;
        this.totalComponents = this.componentsToLoad.length;
        this.maxRetries = 3;
        this.retryCount = 0;
        
        console.log(`📦 Will load ${this.totalComponents} components from base path: "${this.basePath}"`);
        console.log(`📦 First component path: ${this.componentsToLoad[0].file}`);
        
        this.init();
    }
    
    determineBasePath() {
        const currentPath = window.location.pathname;
        console.log('📍 Current path:', currentPath);
        
        // Для GitHub Pages с папкой nbgroup1
        if (currentPath.includes('/nbgroup1/')) {
            // Всегда используем относительный путь от текущей директории
            // В папке /nbgroup1/ все файлы находятся на одном уровне
            return './';
        }
        
        // Для локальной разработки
        const isRoot = currentPath === '/' || 
                       currentPath.includes('index.html') || 
                       currentPath.endsWith('/');
        
        console.log('📍 Is root page?', isRoot);
        return isRoot ? '' : './';
    }
    
    init() {
        console.log('📦 ComponentLoader initializing...');
        
        // Проверяем наличие контейнеров и создаем их если нужно
        this.ensureContainersExist();
        
        // Проверяем, не загружены ли уже компоненты
        if (this.areComponentsAlreadyLoaded()) {
            console.log('⚠️ Components already loaded in HTML, marking as loaded');
            document.body.classList.add('components-loaded');
            this.dispatchComponentsLoaded();
            return;
        }
        
        // Если DOM еще не загружен, ждем
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
    
    ensureContainersExist() {
        if (!document.body) {
            console.error('❌ document.body is null, cannot create containers');
            return;
        }
        
        const requiredContainers = ['header-container', 'footer-container', 'mobile-menu-container'];
        
        requiredContainers.forEach(containerId => {
            let container = document.getElementById(containerId);
            
            if (!container) {
                console.warn(`⚠️ Container #${containerId} not found, creating it...`);
                container = document.createElement('div');
                container.id = containerId;
                
                // Определяем где разместить контейнер
                if (containerId === 'header-container') {
                    // Вставляем в самое начало body
                    document.body.insertBefore(container, document.body.firstChild);
                } else if (containerId === 'mobile-menu-container') {
                    // Вставляем после header-container
                    const headerContainer = document.getElementById('header-container');
                    if (headerContainer && headerContainer.nextSibling) {
                        document.body.insertBefore(container, headerContainer.nextSibling);
                    } else {
                        document.body.appendChild(container);
                    }
                } else if (containerId === 'footer-container') {
                    // Вставляем в конец body
                    document.body.appendChild(container);
                }
                
                console.log(`✅ Created missing container: #${containerId}`);
            }
        });
    }
    
    areComponentsAlreadyLoaded() {
        // Проверяем только header-container, так как он всегда должен быть
        const headerContainer = document.getElementById('header-container');
        if (!headerContainer) {
            return false;
        }
        
        // Если контейнер уже имеет содержимое
        if (headerContainer.innerHTML && headerContainer.innerHTML.trim() !== '') {
            console.log('📦 Header container already has content:', headerContainer.innerHTML.length, 'chars');
            return true;
        }
        
        return false;
    }
    
    loadComponents() {
        console.log('📦 Loading components...');
        
        // Создаем индикатор загрузки
        this.createLoadingIndicator();
        
        // Загружаем каждый компонент
        this.componentsToLoad.forEach(component => {
            this.loadComponent(component);
        });
        
        // Таймаут для случаев когда что-то пошло не так
        setTimeout(() => {
            if (this.loadedComponents < this.totalComponents) {
                console.log(`⚠️ Some components failed to load. Loaded: ${this.loadedComponents}/${this.totalComponents}`);
                
                if (this.retryCount < this.maxRetries) {
                    this.retryCount++;
                    console.log(`🔄 Retry ${this.retryCount}/${this.maxRetries}`);
                    this.retryFailedComponents();
                } else {
                    this.finalizeLoading();
                }
            }
        }, 8000);
    }
    
    loadComponent(component) {
        const container = document.getElementById(component.id);
        
        if (!container) {
            console.error(`❌ Container ${component.id} not found even after creation`);
            this.loadedComponents++;
            this.checkAllLoaded();
            return;
        }
        
        // Если контейнер уже имеет содержимое, пропускаем
        if (container.innerHTML && container.innerHTML.trim() !== '') {
            console.log(`⏭️ ${component.id} already has content, skipping`);
            this.loadedComponents++;
            this.checkAllLoaded();
            return;
        }
        
        console.log(`📄 Loading ${component.file} into #${component.id}...`);
        
        // Пробуем разные пути если основной не сработает
        const pathsToTry = [
            component.file,
            component.file.replace('./', ''),
            component.file.replace('./components/', 'components/'),
            window.location.hostname.includes('github.io') ? 
                '/nbgroup1/components/' + component.file.split('/').pop() : 
                component.file,
            'components/' + component.file.split('/').pop()  // Последняя попытка
        ];
        
        this.tryPaths(pathsToTry, 0, component, container);
    }
    
    tryPaths(paths, index, component, container) {
        if (index >= paths.length) {
            console.error(`❌ All paths failed for ${component.id}`);
            
            // Создаем простую заглушку если компонент не загрузился
            this.createFallbackContent(component, container);
            this.loadedComponents++;
            this.checkAllLoaded();
            return;
        }
        
        const currentPath = paths[index];
        console.log(`🔍 Trying path ${index + 1}/${paths.length}: ${currentPath}`);
        
        fetch(currentPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                if (!html || html.trim() === '') {
                    throw new Error('Empty response');
                }
                
                // Сохраняем старый HTML для отката при ошибке
                const oldHTML = container.innerHTML;
                container.innerHTML = html;
                
                try {
                    // Исполняем скрипты внутри компонента
                    this.executeScripts(container);
                    this.loadedComponents++;
                    this.checkAllLoaded();
                    console.log(`✅ ${component.id} loaded from ${currentPath}`);
                } catch (scriptError) {
                    console.error(`❌ Error executing scripts in ${component.id}:`, scriptError);
                    container.innerHTML = oldHTML; // Откатываем
                    this.tryPaths(paths, index + 1, component, container); // Пробуем следующий путь
                }
            })
            .catch(error => {
                console.warn(`❌ Path failed: ${currentPath}`, error.message);
                this.tryPaths(paths, index + 1, component, container);
            });
    }
    
    createFallbackContent(component, container) {
        console.log(`🛠️ Creating fallback content for ${component.id}`);
        
        // Используем абсолютные пути для GitHub Pages
        const getFullPath = (page) => {
            if (window.location.hostname.includes('github.io')) {
                return `/nbgroup1/${page}`;
            }
            return `./${page}`;
        };
        
        switch(component.id) {
            case 'header-container':
                container.innerHTML = `
                    <header class="main-header" id="main-header">
                        <div class="header-container">
                            <div class="header-inner">
                                <a href="${getFullPath('index.html')}" class="logo">
                                    <div class="logo-mark">NB</div>
                                    <span class="logo-text">NB Group</span>
                                </a>
                                <div class="header-right-mobile">
                                    <button class="burger-btn" id="burger-btn" aria-label="Открыть меню">
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
                            <p>&copy; ${new Date().getFullYear()} NB Group. Все права защищены.</p>
                        </div>
                    </footer>
                `;
                break;
                
            case 'mobile-menu-container':
                container.innerHTML = `
                    <div class="mobile-menu" id="mobile-menu">
                        <nav class="mobile-nav">
                            <a href="${getFullPath('index.html')}" class="mobile-nav-link">Главная</a>
                            <a href="${getFullPath('about.html')}" class="mobile-nav-link">О нас</a>
                            <a href="${getFullPath('services.html')}" class="mobile-nav-link">Услуги</a>
                            <a href="${getFullPath('portfolio.html')}" class="mobile-nav-link">Портфолио</a>
                            <a href="${getFullPath('contacts.html')}" class="mobile-nav-link">Контакты</a>
                        </nav>
                    </div>
                `;
                break;
        }
        
        console.log(`✅ Created fallback for ${component.id}`);
    }
    
    executeScripts(container) {
        const scripts = container.querySelectorAll('script');
        
        if (scripts.length === 0) return;
        
        console.log(`📜 Found ${scripts.length} script(s) in ${container.id}`);
        
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
    
    retryFailedComponents() {
        console.log('🔄 Retrying failed components...');
        
        // Сбрасываем счетчик загруженных и пробуем заново
        this.loadedComponents = 0;
        
        this.componentsToLoad.forEach(component => {
            const container = document.getElementById(component.id);
            if (container && (!container.innerHTML || container.innerHTML.trim() === '')) {
                console.log(`🔄 Retrying ${component.id}...`);
                this.loadComponent(component);
            } else {
                this.loadedComponents++;
            }
        });
        
        this.checkAllLoaded();
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
        this.removeLoadingIndicator();
        
        // Добавляем класс для CSS
        if (document.body) {
            document.body.classList.add('components-loaded');
        }
        
        // Отправляем несколько событий для совместимости
        this.dispatchComponentsLoaded();
        
        // Вызываем глобальную функцию инициализации если она есть
        if (typeof window.initAfterComponents === 'function') {
            console.log('🔄 Calling initAfterComponents...');
            window.initAfterComponents();
        }
    }
    
    dispatchComponentsLoaded() {
        const events = ['componentsLoaded', 'componentsFullyLoaded', 'componentsReady'];
        
        events.forEach(eventName => {
            setTimeout(() => {
                const event = new CustomEvent(eventName, {
                    detail: {
                        loaded: this.loadedComponents,
                        total: this.totalComponents,
                        success: this.loadedComponents === this.totalComponents,
                        timestamp: Date.now()
                    }
                });
                window.dispatchEvent(event);
                console.log(`📢 ${eventName} event dispatched`);
            }, 100);
        });
    }
    
    createLoadingIndicator() {
        if (!document.body) return;
        
        // Удаляем старый индикатор если есть
        this.removeLoadingIndicator();
        
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
        
        this.progressInterval = progressInterval;
        this.loadingIndicator = loadingIndicator;
    }
    
    removeLoadingIndicator() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
        
        if (this.loadingIndicator && this.loadingIndicator.parentNode) {
            this.loadingIndicator.style.transform = 'translateX(0%)';
            this.loadingIndicator.style.opacity = '0';
            setTimeout(() => {
                if (this.loadingIndicator && this.loadingIndicator.parentNode) {
                    this.loadingIndicator.parentNode.removeChild(this.loadingIndicator);
                }
            }, 500);
        }
    }
}

// Инициализация загрузчика компонентов
(function initComponents() {
    console.log('🚀 Starting component loader...');
    
    // Ждем пока DOM будет полностью загружен
    function waitForDOM() {
        return new Promise((resolve) => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve);
            } else {
                resolve();
            }
        });
    }
    
    // Глобальная функция для отладки
    window.checkComponentsStatus = function() {
        if (!document.body) {
            console.error('❌ document.body is null');
            return;
        }
        
        const containers = ['header-container', 'footer-container', 'mobile-menu-container'];
        console.log('🔍 Checking component containers:');
        
        containers.forEach(id => {
            const container = document.getElementById(id);
            console.log(`  ${id}: ${container ? 'FOUND' : 'NOT FOUND'} - Content: ${container?.innerHTML?.length || 0} chars`);
        });
    };
    
    // Глобальная функция для принудительной перезагрузки
    window.reloadComponents = function() {
        console.log('🔄 Force reloading all components...');
        if (document.body) {
            document.body.classList.remove('components-loaded');
        }
        
        // Очищаем контейнеры
        ['header-container', 'footer-container', 'mobile-menu-container'].forEach(id => {
            const container = document.getElementById(id);
            if (container) {
                container.innerHTML = '';
            }
        });
        
        // Перезапускаем загрузчик
        window.ComponentLoaderInstance = new ComponentLoader();
    };
    
    // Основная инициализация
    waitForDOM().then(() => {
        console.log('✅ DOM is ready, initializing ComponentLoader');
        
        // Проверяем не находимся ли мы на странице где уже загружены компоненты
        const headerContainer = document.getElementById('header-container');
        if (headerContainer && headerContainer.innerHTML && headerContainer.innerHTML.trim() !== '') {
            console.log('⚠️ Components already loaded in HTML, marking as loaded');
            document.body.classList.add('components-loaded');
            
            // Отправляем событие для совместимости
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent('componentsLoaded'));
            }, 100);
            return;
        }
        
        // Запускаем загрузчик
        window.ComponentLoaderInstance = new ComponentLoader();
        
        // Обработка ошибок загрузки
        setTimeout(() => {
            if (document.body && !document.body.classList.contains('components-loaded')) {
                console.warn('⚠️ Component loading taking too long, forcing completion');
                document.body.classList.add('components-loaded');
                
                // Отправляем события
                window.dispatchEvent(new CustomEvent('componentsLoaded'));
                
                // Создаем простые заглушки для отсутствующих компонентов
                const containers = ['header-container', 'footer-container', 'mobile-menu-container'];
                containers.forEach(id => {
                    const container = document.getElementById(id);
                    if (container && (!container.innerHTML || container.innerHTML.trim() === '')) {
                        console.log(`🛠️ Creating emergency content for ${id}`);
                        
                        // Простые заглушки с правильными путями
                        const getPath = (page) => window.location.hostname.includes('github.io') 
                            ? `/nbgroup1/${page}` 
                            : `./${page}`;
                            
                        if (id === 'header-container') {
                            container.innerHTML = `
                                <header style="padding: 20px; background: #0a0a0a; color: white;">
                                    <a href="${getPath('index.html')}" style="color: white; text-decoration: none; font-weight: bold;">
                                        NB Group
                                    </a>
                                </header>
                            `;
                        } else if (id === 'footer-container') {
                            container.innerHTML = `
                                <footer style="padding: 20px; background: #0a0a0a; color: white; text-align: center;">
                                    &copy; ${new Date().getFullYear()} NB Group
                                </footer>
                            `;
                        }
                    }
                });
            }
        }, 10000);
    }).catch(error => {
        console.error('❌ Error waiting for DOM:', error);
    });
})();

// Глобальные утилиты для работы с компонентами
window.waitForComponents = function() {
    return new Promise((resolve) => {
        if (document.body && document.body.classList.contains('components-loaded')) {
            resolve();
            return;
        }
        
        window.addEventListener('componentsLoaded', () => {
            resolve();
        }, { once: true });
        
        // Таймаут на всякий случай
        setTimeout(resolve, 5000);
    });
};

window.forceLoadComponents = function() {
    console.log('🔄 Forcing component load...');
    if (window.ComponentLoaderInstance) {
        window.ComponentLoaderInstance.loadComponents();
    } else {
        window.ComponentLoaderInstance = new ComponentLoader();
    }
};

// Проверка при загрузке страницы
window.addEventListener('load', () => {
    console.log('📄 Page fully loaded, checking components...');
    
    if (!document.body) {
        console.error('❌ document.body is still null on load');
        return;
    }
    
    // Проверяем наличие контейнеров
    const requiredContainers = ['header-container', 'footer-container', 'mobile-menu-container'];
    const missingContainers = requiredContainers.filter(id => !document.getElementById(id));
    
    if (missingContainers.length > 0) {
        console.warn(`⚠️ Missing containers after load: ${missingContainers.join(', ')}`);
        
        // Создаем недостающие контейнеры
        missingContainers.forEach(id => {
            const container = document.createElement('div');
            container.id = id;
            
            if (id === 'header-container') {
                document.body.insertBefore(container, document.body.firstChild);
            } else if (id === 'footer-container') {
                document.body.appendChild(container);
            } else {
                document.body.appendChild(container);
            }
            
            console.log(`✅ Created missing container: #${id}`);
        });
        
        // Пробуем загрузить компоненты еще раз
        setTimeout(() => {
            if (window.ComponentLoaderInstance) {
                window.ComponentLoaderInstance.retryFailedComponents();
            } else {
                window.ComponentLoaderInstance = new ComponentLoader();
            }
        }, 1000);
    }
});

console.log('✅ components.js loaded successfully');
