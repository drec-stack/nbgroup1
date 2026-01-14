// i18n.js - Fully working internationalization with language switching
// НАДЕЖНАЯ ВЕРСИЯ с защитой от ошибок и дублирования

console.log('🚀 i18n.js loaded');

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLang') || 'ru';
        this.translations = {};
        this.isInitialized = false;
        this.isSwitching = false;
        this.appliedElements = new WeakSet(); // Для отслеживания уже обработанных элементов
        this.translationCache = new Map(); // Кэш переводов для производительности
        this.debugMode = false; // Режим отладки
        
        console.log('🌍 i18n initialized with language:', this.currentLang);
        
        // Save the click handler reference for removal
        this.handleLanguageClick = this.handleLanguageClick.bind(this);
        
        // Fallback translations
        this.fallbackTranslations = {
            "nav": {
                "home": "Главная",
                "services": "Услуги",
                "portfolio": "Портфолио",
                "about": "О нас",
                "contact": "Контакты",
                "brandbook": "Брендбук",
                "startProject": "Начать проект",
                "brand": "NB Group"
            },
            "home": {
                "title": "NBGROUP.TECH | Industrial Design & Manufacturing",
                "subtitle": "Промышленная дизайн-студия полного цикла"
            },
            "brandbook": {
                "filters": {
                    "all": "Все",
                    "web": "Веб",
                    "mobile": "Мобильные"
                },
                "categories": {
                    "web": "Веб-приложения",
                    "mobile": "Мобильные приложения"
                },
                "elements": {
                    "colors": "Цвета",
                    "typography": "Типографика"
                },
                "case1": {
                    "title": "Кейс 1",
                    "description": "Описание кейса 1",
                    "typography": "Типографика для кейса 1"
                },
                "case2": {
                    "title": "Кейс 2",
                    "description": "Описание кейса 2",
                    "typography": "Типографика для кейса 2"
                },
                "case3": {
                    "title": "Кейс 3",
                    "description": "Описание кейса 3",
                    "typography": "Типографика для кейса 3"
                }
            }
        };
        
        // Добавляем CSS для анимаций
        this.addAnimationStyles();
    }

    async init() {
        if (this.isInitialized) {
            if (this.debugMode) console.log('⚠️ i18n уже инициализирован');
            return;
        }
        
        try {
            console.log('🔄 Starting i18n initialization...');
            
            // Load translations
            await this.loadTranslations(this.currentLang);
            
            // Apply translations immediately
            const count = this.applyTranslations();
            
            // Setup language switcher
            this.setupLanguageSwitcher();
            
            // Setup mutation observer
            this.setupMutationObserver();
            
            // Setup responsive language switcher
            this.setupResponsiveLanguageSwitcher();
            
            // Apply compact switcher styles
            this.applyCompactSwitcherStyles();
            
            this.isInitialized = true;
            console.log(`✅ i18n fully initialized (applied ${count} translations)`);
            
            // Отправляем событие о готовности
            window.dispatchEvent(new CustomEvent('i18nReady', {
                detail: { 
                    lang: this.currentLang,
                    translationCount: count
                }
            }));
            
            // Автоматическое обновление при загрузке компонентов
            this.setupComponentsIntegration();
            
        } catch (error) {
            console.error('❌ i18n initialization failed:', error);
            // Используем фолбэк переводы
            this.translations = this.fallbackTranslations;
            this.applyTranslations();
            this.isInitialized = true;
        }
    }

    async loadTranslations(lang) {
        try {
            console.log(`📥 Loading translations for: ${lang}`);
            
            // Проверяем кэш
            const cacheKey = `translations_${lang}`;
            const cached = localStorage.getItem(cacheKey);
            
            if (cached && this.isValidJson(cached)) {
                const parsed = JSON.parse(cached);
                const cacheTime = localStorage.getItem(`${cacheKey}_time`);
                const cacheAge = cacheTime ? Date.now() - parseInt(cacheTime) : Infinity;
                
                // Используем кэш если он младше 1 часа
                if (cacheAge < 3600000) {
                    this.translations = parsed;
                    document.documentElement.lang = lang;
                    console.log(`✅ Loaded ${lang} from cache (${Math.round(cacheAge/1000)}s old)`);
                    return;
                }
            }
            
            // Загружаем с сервера
            const response = await fetch(`lang/${lang}.json?v=${Date.now()}`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const text = await response.text();
            
            if (!text || !this.isValidJson(text)) {
                throw new Error('Invalid or empty JSON');
            }
            
            this.translations = JSON.parse(text);
            document.documentElement.lang = lang;
            
            const keyCount = this.countKeys(this.translations);
            console.log(`✅ ${lang}.json loaded, keys: ${keyCount}`);
            
            // Сохраняем в кэш
            try {
                localStorage.setItem(cacheKey, text);
                localStorage.setItem(`${cacheKey}_time`, Date.now().toString());
                console.log(`💾 Cached translations for ${lang}`);
            } catch (e) {
                console.warn('⚠️ Could not cache translations:', e.message);
            }
            
            // Очищаем кэш переводов
            this.translationCache.clear();
            
        } catch (error) {
            console.error(`❌ Error loading ${lang}.json:`, error);
            
            // Пробуем загрузить из кэша даже старый
            const cached = localStorage.getItem(`translations_${lang}`);
            if (cached && this.isValidJson(cached)) {
                this.translations = JSON.parse(cached);
                console.log(`✅ Loaded ${lang} from fallback cache`);
                return;
            }
            
            // Пробуем другой язык
            if (lang !== 'ru') {
                console.log('🔄 Falling back to Russian');
                return await this.loadTranslations('ru');
            }
            
            // Используем фолбэк
            console.log('🔄 Using fallback translations');
            this.translations = this.fallbackTranslations;
        }
    }

    isValidJson(text) {
        if (!text || text.trim().length < 2) return false;
        
        try {
            JSON.parse(text);
            return true;
        } catch (e) {
            if (this.debugMode) console.log('❌ Invalid JSON:', e.message);
            return false;
        }
    }

    countKeys(obj) {
        let count = 0;
        const countRecursive = (currentObj) => {
            for (const key in currentObj) {
                count++;
                if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
                    countRecursive(currentObj[key]);
                }
            }
        };
        countRecursive(obj);
        return count;
    }

    applyTranslations() {
        // Очищаем кэш примененных элементов при смене языка
        if (this.isSwitching) {
            this.appliedElements = new WeakSet();
        }

        if (!this.translations || Object.keys(this.translations).length === 0) {
            if (this.debugMode) console.log('⚠️ No translations, using fallback');
            this.translations = this.fallbackTranslations;
        }

        console.log('🔄 Applying translations...');
        let translatedCount = 0;
        let errorCount = 0;

        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            // Пропускаем если элемент уже обработан
            if (this.appliedElements.has(element)) {
                return;
            }
            
            const key = element.getAttribute('data-i18n');
            if (!key) {
                if (this.debugMode) console.warn('⚠️ Element has empty data-i18n attribute');
                return;
            }
            
            const translation = this.getTranslation(key);
            
            if (translation !== null && translation !== undefined) {
                try {
                    this.updateElement(element, translation);
                    this.appliedElements.add(element);
                    translatedCount++;
                } catch (e) {
                    errorCount++;
                    if (this.debugMode) console.error(`❌ Error updating element for key "${key}":`, e);
                }
            } else {
                // Только логируем если в режиме отладки
                if (this.debugMode) {
                    console.warn(`⚠️ No translation found for key: ${key}`);
                }
                errorCount++;
            }
        });

        this.updatePageTitle();
        
        if (errorCount > 0 && this.debugMode) {
            console.warn(`⚠️ Failed to translate ${errorCount} elements`);
        }
        
        console.log(`✅ Applied ${translatedCount} translations (${errorCount} errors)`);
        
        // Отправляем событие о применении переводов
        window.dispatchEvent(new CustomEvent('translationsApplied', {
            detail: { 
                count: translatedCount,
                errors: errorCount,
                lang: this.currentLang
            }
        }));
        
        return translatedCount;
    }

    getTranslation(key) {
        if (!key) {
            return null;
        }
        
        // Проверяем кэш
        const cacheKey = `${this.currentLang}:${key}`;
        if (this.translationCache.has(cacheKey)) {
            return this.translationCache.get(cacheKey);
        }
        
        const keys = key.split('.');
        let result = this.translations;
        
        for (const k of keys) {
            if (result && typeof result === 'object' && k in result) {
                result = result[k];
            } else {
                // Пробуем фолбэк переводы
                let fallbackResult = this.fallbackTranslations;
                for (const fk of keys) {
                    if (fallbackResult && typeof fallbackResult === 'object' && fk in fallbackResult) {
                        fallbackResult = fallbackResult[fk];
                    } else {
                        fallbackResult = null;
                        break;
                    }
                }
                
                // Кэшируем результат (даже если null)
                this.translationCache.set(cacheKey, fallbackResult);
                return fallbackResult;
            }
        }
        
        const finalResult = typeof result === 'string' ? result : null;
        this.translationCache.set(cacheKey, finalResult);
        return finalResult;
    }

    updateElement(element, translation) {
        const tag = element.tagName.toLowerCase();
        
        // Сохраняем оригинальное содержимое если еще не сохранено
        if (!element.hasAttribute('data-i18n-original')) {
            if (tag === 'input' || tag === 'textarea') {
                element.setAttribute('data-i18n-original', element.placeholder || element.value || '');
            } else {
                element.setAttribute('data-i18n-original', element.innerHTML);
            }
        }
        
        if (tag === 'input' || tag === 'textarea') {
            if (element.type !== 'submit' && element.type !== 'button') {
                element.placeholder = translation;
            } else {
                element.value = translation;
            }
        } else if (tag === 'img') {
            element.alt = translation;
        } else if (tag === 'title') {
            element.textContent = translation;
        } else {
            // Проверяем, есть ли HTML внутри элемента
            const originalHTML = element.getAttribute('data-i18n-original');
            const hasHTML = originalHTML && originalHTML.includes('<');
            
            if (hasHTML) {
                // Заменяем только текстовые узлы, сохраняя HTML структуру
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = originalHTML;
                
                const textNodes = [];
                const walker = document.createTreeWalker(
                    tempDiv,
                    NodeFilter.SHOW_TEXT,
                    null,
                    false
                );
                
                let node;
                while (node = walker.nextNode()) {
                    if (node.textContent.trim()) {
                        textNodes.push(node);
                    }
                }
                
                // Если нашли текстовые узлы, заменяем первый
                if (textNodes.length > 0) {
                    textNodes[0].textContent = translation;
                    element.innerHTML = tempDiv.innerHTML;
                } else {
                    // Иначе заменяем весь HTML
                    element.innerHTML = translation;
                }
            } else {
                element.textContent = translation;
            }
        }
        
        // Добавляем класс для анимации
        element.classList.add('translation-updated');
        setTimeout(() => {
            element.classList.remove('translation-updated');
        }, 300);
    }

    updatePageTitle() {
        const titleElement = document.querySelector('title[data-i18n]');
        if (titleElement) {
            const titleKey = titleElement.getAttribute('data-i18n');
            const titleTranslation = this.getTranslation(titleKey);
            if (titleTranslation) {
                document.title = titleTranslation;
                titleElement.textContent = titleTranslation;
            }
        }
    }

    setupLanguageSwitcher() {
        console.log('🔧 Setting up language switcher...');
        
        // Remove any existing handlers
        document.removeEventListener('click', this.handleLanguageClick);
        
        // Add new handler
        document.addEventListener('click', this.handleLanguageClick);
        
        // Update UI
        this.updateLanguageSwitcherUI();
    }

    handleLanguageClick(e) {
        const langBtn = e.target.closest('.lang-btn, .mobile-lang-btn');
        if (langBtn) {
            e.preventDefault();
            e.stopPropagation();
            
            const lang = langBtn.getAttribute('data-lang');
            if (lang && lang !== this.currentLang) {
                console.log(`🎯 Language button clicked: ${lang}`);
                this.smoothSwitchLanguage(lang);
            }
        }
    }

    updateLanguageSwitcherUI() {
        console.log('🔄 Updating language switcher UI...');
        
        document.querySelectorAll('.lang-btn, .mobile-lang-btn').forEach(btn => {
            const btnLang = btn.getAttribute('data-lang');
            const isActive = btnLang === this.currentLang;
            
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
            
            // Обновляем текст
            const langText = btn.querySelector('.lang-text');
            if (langText) {
                langText.textContent = btnLang.toUpperCase();
                langText.style.fontSize = '14px'; // Компактный размер
            }
            
            // Обновляем флаги
            const langFlag = btn.querySelector('.lang-flag');
            if (langFlag) {
                langFlag.textContent = btnLang === 'ru' ? '🇷🇺' : '🇬🇧';
                langFlag.style.fontSize = '18px'; // Компактный размер
            }
            
            // Обновляем родительский switcher
            const switcher = btn.closest('.language-switcher, .mobile-language-switcher');
            if (switcher) {
                switcher.setAttribute('data-current-lang', this.currentLang);
                
                // Применяем компактные размеры
                switcher.style.minWidth = '100px';
                switcher.style.height = '40px';
                switcher.style.padding = '3px';
                
                // Анимируем ползунок
                const slider = switcher.querySelector('.lang-slider, .mobile-lang-slider-menu');
                if (slider) {
                    slider.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    slider.style.transform = this.currentLang === 'en' ? 'translateX(100%)' : 'translateX(0)';
                    slider.style.top = '3px';
                    slider.style.left = '3px';
                    slider.style.width = 'calc(50% - 3px)';
                    slider.style.height = 'calc(100% - 6px)';
                }
                
                // Обновляем размеры кнопок внутри
                const switcherButtons = switcher.querySelectorAll('.lang-btn, .mobile-lang-btn');
                switcherButtons.forEach(button => {
                    button.style.fontSize = '14px';
                    button.style.height = '34px';
                    button.style.padding = '0 16px';
                });
            }
        });
        
        console.log('✅ Language switcher UI updated (compact version)');
        
        // Отправляем событие для синхронизации всех компонентов
        window.dispatchEvent(new CustomEvent('languageSwitcherUpdated', {
            detail: { lang: this.currentLang }
        }));
    }

    applyCompactSwitcherStyles() {
        // Применяем компактные стили ко всем переключателям языка
        document.querySelectorAll('.language-switcher, .mobile-language-switcher').forEach(switcher => {
            switcher.style.minWidth = '100px';
            switcher.style.height = '40px';
            switcher.style.padding = '3px';
            switcher.style.borderRadius = '20px';
            
            const slider = switcher.querySelector('.lang-slider, .mobile-lang-slider-menu');
            if (slider) {
                slider.style.top = '3px';
                slider.style.left = '3px';
                slider.style.width = 'calc(50% - 3px)';
                slider.style.height = 'calc(100% - 6px)';
                slider.style.borderRadius = '17px';
            }
            
            const buttons = switcher.querySelectorAll('.lang-btn, .mobile-lang-btn');
            buttons.forEach(btn => {
                btn.style.fontSize = '14px';
                btn.style.height = '34px';
                btn.style.padding = '0 16px';
                btn.style.borderRadius = '17px';
            });
            
            const flags = switcher.querySelectorAll('.lang-flag');
            flags.forEach(flag => {
                flag.style.fontSize = '18px';
            });
            
            const texts = switcher.querySelectorAll('.lang-text');
            texts.forEach(text => {
                text.style.fontSize = '14px';
            });
        });
        
        // Специальные стили для мобильных версий
        document.querySelectorAll('.language-switcher.mobile-only-flags').forEach(switcher => {
            switcher.style.minWidth = '85px';
            switcher.style.height = '36px';
            
            const flags = switcher.querySelectorAll('.lang-flag');
            flags.forEach(flag => {
                flag.style.fontSize = '18px';
            });
        });
    }

    setupResponsiveLanguageSwitcher() {
        // Функция для обновления отображения текста в переключателе языка
        const updateLanguageSwitcherText = () => {
            const isMobile = window.innerWidth <= 768;
            const languageSwitchers = document.querySelectorAll('.language-switcher.mobile-only-flags');
            
            languageSwitchers.forEach(switcher => {
                const textElements = switcher.querySelectorAll('.lang-text');
                textElements.forEach(textElement => {
                    if (isMobile) {
                        textElement.style.display = 'none';
                    } else {
                        textElement.style.display = 'inline-block';
                    }
                });
                
                // Обновляем размеры для мобильной версии
                if (isMobile) {
                    switcher.style.minWidth = '85px';
                    switcher.style.height = '36px';
                    
                    const flags = switcher.querySelectorAll('.lang-flag');
                    flags.forEach(flag => {
                        flag.style.fontSize = '18px';
                    });
                    
                    const buttons = switcher.querySelectorAll('.lang-btn');
                    buttons.forEach(btn => {
                        btn.style.padding = '0 12px';
                    });
                } else {
                    switcher.style.minWidth = '100px';
                    switcher.style.height = '40px';
                }
            });
        };
        
        // Инициализация при загрузке
        updateLanguageSwitcherText();
        
        // Обновление при изменении размера окна
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateLanguageSwitcherText();
            }, 250);
        });
        
        console.log('✅ Responsive language switcher initialized (compact)');
    }

    setupMutationObserver() {
        const observer = new MutationObserver((mutations) => {
            let shouldUpdate = false;
            
            for (const mutation of mutations) {
                if (mutation.type === 'childList') {
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType === 1) {
                            if (node.hasAttribute('data-i18n') || 
                                (node.querySelector && node.querySelector('[data-i18n]'))) {
                                shouldUpdate = true;
                                break;
                            }
                        }
                    }
                }
                
                if (shouldUpdate) break;
            }
            
            if (shouldUpdate) {
                console.log('👀 New content detected, updating translations...');
                // Используем debounce чтобы избежать множественных обновлений
                clearTimeout(this.updateTimeout);
                this.updateTimeout = setTimeout(() => {
                    this.applyTranslations();
                    this.applyCompactSwitcherStyles();
                }, 50);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        this.mutationObserver = observer;
    }

    setupComponentsIntegration() {
        // Слушаем события загрузки компонентов
        window.addEventListener('componentLoaded', (event) => {
            console.log(`🔄 Component loaded: ${event.detail.name}, updating translations...`);
            setTimeout(() => {
                this.applyTranslations();
                this.updateLanguageSwitcherUI();
                this.applyCompactSwitcherStyles();
            }, 100);
        });
        
        window.addEventListener('componentsLoaded', () => {
            console.log('🔄 All components loaded, updating translations...');
            setTimeout(() => {
                this.applyTranslations();
                this.updateLanguageSwitcherUI();
                this.applyCompactSwitcherStyles();
            }, 200);
        });
    }

    async switchLanguage(lang) {
        if (this.isSwitching || lang === this.currentLang) {
            console.log(`⚠️ Language switch skipped: ${lang} (already ${this.currentLang})`);
            return;
        }
        
        this.isSwitching = true;
        console.log(`🎬 Switching language to: ${lang}`);
        
        try {
            // Add loading state
            document.body.classList.add('language-changing');
            
            // Load new translations
            await this.loadTranslations(lang);
            this.currentLang = lang;
            
            // Save preference
            try {
                localStorage.setItem('preferredLang', lang);
            } catch (e) {
                console.warn('⚠️ Could not save language preference:', e.message);
            }
            
            // Update UI immediately with compact styles
            this.updateLanguageSwitcherUI();
            this.applyCompactSwitcherStyles();
            
            // Apply translations with animation
            const count = this.applyTranslations();
            
            console.log(`✅ Language switched to: ${lang} (${count} translations, compact UI)`);
            
            // Remove loading state
            setTimeout(() => {
                document.body.classList.remove('language-changing');
            }, 500);
            
            // Notify
            window.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { 
                    lang: this.currentLang,
                    translationCount: count
                }
            }));
            
        } catch (error) {
            console.error('❌ Language switch failed:', error);
            document.body.classList.remove('language-changing');
            throw error;
        } finally {
            this.isSwitching = false;
        }
    }

    smoothSwitchLanguage(lang) {
        if (lang === this.currentLang) return;
        
        console.log(`🎭 Smooth switching to: ${lang}`);
        
        // Предварительная анимация
        document.querySelectorAll('[data-i18n]').forEach(el => {
            el.style.opacity = '0.7';
            el.style.transition = 'opacity 0.3s ease';
        });
        
        // Смена языка с задержкой
        setTimeout(() => {
            this.switchLanguage(lang).catch(error => {
                console.error('❌ Smooth switch failed:', error);
                // Возвращаем opacity
                document.querySelectorAll('[data-i18n]').forEach(el => {
                    el.style.opacity = '1';
                });
            });
        }, 300);
    }

    // Public API
    getCurrentLang() {
        return this.currentLang;
    }

    refresh() {
        console.log('🔄 Refreshing translations...');
        const count = this.applyTranslations();
        this.updateLanguageSwitcherUI();
        this.applyCompactSwitcherStyles();
        return count;
    }

    reinitForDynamicContent() {
        console.log('🔄 Re-initializing i18n for dynamic content...');
        this.setupLanguageSwitcher();
        this.setupResponsiveLanguageSwitcher();
        this.applyCompactSwitcherStyles();
        return this.refresh();
    }
    
    setDebugMode(enabled) {
        this.debugMode = enabled;
        console.log(`🔧 Debug mode ${enabled ? 'enabled' : 'disabled'}`);
    }
    
    addAnimationStyles() {
        // Проверяем, не добавлены ли уже стили
        if (document.getElementById('i18n-animation-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'i18n-animation-styles';
        style.textContent = `
            @keyframes fadeInLanguage {
                from {
                    opacity: 0.7;
                    transform: translateY(5px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .language-changing [data-i18n] {
                opacity: 0.7;
                transition: opacity 0.3s ease;
            }
            
            .translation-updated {
                animation: fadeInLanguage 0.5s ease;
            }
            
            /* Компактный переключатель языка - финальные стили */
            .language-switcher.compact,
            .mobile-language-switcher.compact {
                min-width: 100px !important;
                height: 40px !important;
                padding: 3px !important;
                border-radius: 20px !important;
            }
            
            .language-switcher.compact .lang-slider,
            .mobile-language-switcher.compact .mobile-lang-slider-menu {
                top: 3px !important;
                left: 3px !important;
                width: calc(50% - 3px) !important;
                height: calc(100% - 6px) !important;
                border-radius: 17px !important;
            }
            
            .language-switcher.compact .lang-btn,
            .mobile-language-switcher.compact .mobile-lang-btn {
                font-size: 14px !important;
                height: 34px !important;
                padding: 0 16px !important;
                border-radius: 17px !important;
            }
            
            .language-switcher.compact .lang-text,
            .mobile-language-switcher.compact .lang-text {
                font-size: 14px !important;
            }
            
            .language-switcher.compact .lang-flag,
            .mobile-language-switcher.compact .lang-flag {
                font-size: 18px !important;
            }
        `;
        document.head.appendChild(style);
        
        // Добавляем классы ко всем существующим переключателям
        setTimeout(() => {
            document.querySelectorAll('.language-switcher, .mobile-language-switcher').forEach(switcher => {
                switcher.classList.add('compact');
            });
        }, 100);
    }
}

// Create and initialize
window.i18n = new I18n();

// Initialize
(function initI18n() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('📄 DOM loaded, initializing i18n...');
            setTimeout(() => window.i18n.init(), 100);
        });
    } else {
        console.log('📄 DOM already loaded, initializing i18n...');
        setTimeout(() => window.i18n.init(), 100);
    }
})();

// Global helper functions
window.changeLanguage = function(lang) {
    if (window.i18n) {
        return window.i18n.switchLanguage(lang);
    }
    return Promise.reject('i18n not initialized');
};

window.reinitI18n = function() {
    if (window.i18n) {
        return window.i18n.reinitForDynamicContent();
    }
    return 0;
};

window.getCurrentLanguage = function() {
    return window.i18n ? window.i18n.getCurrentLang() : 'ru';
};

// Debug helper
window.debugI18n = function() {
    console.group('🌍 i18n Debug');
    if (window.i18n) {
        console.log('Current language:', window.i18n.getCurrentLang());
        console.log('Initialized:', window.i18n.isInitialized);
        console.log('Translations loaded:', Object.keys(window.i18n.translations).length);
        console.log('Cache size:', window.i18n.translationCache.size);
        
        // Test keys
        const testKeys = ['nav.home', 'brandbook.filters.all', 'brandbook.case1.title', 'brandbook.categories.web'];
        testKeys.forEach(key => {
            const translation = window.i18n.getTranslation(key);
            console.log(`${key}:`, translation || '❌ Missing');
        });
    } else {
        console.log('❌ i18n not initialized');
    }
    console.groupEnd();
};

// Автоматическое обновление при ошибках
window.addEventListener('error', function(e) {
    if (e.message && e.message.includes('i18n')) {
        console.error('❌ i18n Error detected:', e.message);
        if (window.i18n && window.i18n.debugMode) {
            window.debugI18n();
        }
    }
});

// Экспорт для модулей
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        I18n,
        changeLanguage: window.changeLanguage,
        reinitI18n: window.reinitI18n,
        getCurrentLanguage: window.getCurrentLanguage,
        debugI18n: window.debugI18n
    };
}
