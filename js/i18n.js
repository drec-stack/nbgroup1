// i18n.js - Fully working internationalization with language switching
console.log('🚀 i18n.js loaded');

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLang') || 'ru';
        this.translations = {};
        this.isInitialized = false;
        this.isSwitching = false;
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
                "subtitle": "Промышленная дизайн-студия полного цикла",
                "hero": {
                    "titleLine1": "NB GROUP TECH",
                    "titleLine2": "продукты, которые",
                    "titleLine3": "определяют рынки",
                    "description": "Промышленная дизайн-студия полного цикла. Создаём продукты, которые сочетают эстетику, инженерную точность и производимую реализацию. Работаем системно: дизайн → инженерия → прототип → производство → упаковка → бренд-система. Наш подход основан на прозрачности, точности и ответственности за результат.",
                    "ourServices": "Наши Услуги",
                    "viewWork": "Смотреть Работы"
                },
                "clients": {
                    "label": "ДОВЕРЯЮТ ЛИДЕРЫ ОТРАСЛИ"
                },
                "stats": {
                    "projects": "Проектов завершено",
                    "years": "Лет опыта",
                    "satisfaction": "Довольных клиентов",
                    "awards": "Наград"
                },
                "cta": {
                    "title": "Готовы начать проект?",
                    "description": "Давайте обсудим, как мы можем воплотить ваше видение продукта в жизнь",
                    "button": "Связаться с нами"
                }
            }
        };
    }

    async init() {
        if (this.isInitialized) return;
        
        try {
            console.log('🔄 Starting i18n initialization...');
            
            // Load translations
            await this.loadTranslations(this.currentLang);
            
            // Apply translations immediately
            this.applyTranslations();
            
            // Setup language switcher
            this.setupLanguageSwitcher();
            
            // Setup mutation observer
            this.setupMutationObserver();
            
            this.isInitialized = true;
            console.log('✅ i18n fully initialized');
            
            window.dispatchEvent(new CustomEvent('i18nReady', {
                detail: { lang: this.currentLang }
            }));
            
        } catch (error) {
            console.error('❌ i18n initialization failed:', error);
            this.translations = this.fallbackTranslations;
            this.applyTranslations();
        }
    }

    async loadTranslations(lang) {
        try {
            console.log(`📥 Loading translations for: ${lang}`);
            
            const response = await fetch(`lang/${lang}.json`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const text = await response.text();
            
            if (!this.isValidJson(text)) {
                throw new Error('Invalid JSON');
            }
            
            this.translations = JSON.parse(text);
            document.documentElement.lang = lang;
            
            console.log(`✅ ${lang}.json loaded, keys:`, Object.keys(this.translations).length);
            
            // Cache
            localStorage.setItem(`translations_${lang}`, text);
            localStorage.setItem('preferredLang', lang);
            
        } catch (error) {
            console.error(`❌ Error loading ${lang}.json:`, error);
            await this.loadFromCache(lang);
        }
    }

    isValidJson(text) {
        if (!text || text.length < 10) return false;
        
        try {
            JSON.parse(text);
            return true;
        } catch (e) {
            return false;
        }
    }

    async loadFromCache(lang) {
        console.log(`📂 Trying to load ${lang} from cache...`);
        
        try {
            const cached = localStorage.getItem(`translations_${lang}`);
            if (cached && this.isValidJson(cached)) {
                this.translations = JSON.parse(cached);
                console.log(`✅ Loaded ${lang} from cache`);
                return true;
            }
            
            if (lang !== 'ru') {
                console.log('🔄 Falling back to Russian');
                return await this.loadFromCache('ru');
            }
            
            console.log('🔄 Using fallback translations');
            this.translations = this.fallbackTranslations;
            return false;
            
        } catch (error) {
            console.error('❌ Cache load failed:', error);
            this.translations = this.fallbackTranslations;
            return false;
        }
    }

    applyTranslations() {
        if (!this.translations || Object.keys(this.translations).length === 0) {
            console.log('⚠️ No translations, using fallback');
            this.translations = this.fallbackTranslations;
        }

        console.log('🔄 Applying translations...');
        let translatedCount = 0;

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            
            if (translation) {
                this.updateElement(element, translation);
                translatedCount++;
            } else {
                console.warn(`❌ No translation found for key: ${key}`);
            }
        });

        this.updatePageTitle();
        console.log(`✅ Applied ${translatedCount} translations`);
        
        return translatedCount;
    }

    getTranslation(key) {
        if (!key || !this.translations) {
            console.log(`⚠️ Missing key or translations: ${key}`);
            return null;
        }
        
        const keys = key.split('.');
        let result = this.translations;
        
        for (const k of keys) {
            if (result && typeof result === 'object' && k in result) {
                result = result[k];
            } else {
                console.log(`⚠️ Translation path not found: ${key} (failed at: ${k})`);
                return null;
            }
        }
        
        return typeof result === 'string' ? result : null;
    }

    updateElement(element, translation) {
        const tag = element.tagName.toLowerCase();
        
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
            // Сохраняем HTML внутри элементов
            const hasHTML = element.innerHTML && element.innerHTML.includes('<');
            if (hasHTML) {
                // Находим первый текстовый узел и заменяем его
                const childNodes = Array.from(element.childNodes);
                let found = false;
                
                for (const node of childNodes) {
                    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                        node.textContent = translation;
                        found = true;
                        break;
                    }
                }
                
                if (!found) {
                    element.innerHTML = translation;
                }
            } else {
                element.textContent = translation;
            }
        }
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
        const langBtn = e.target.closest('.lang-btn');
        if (langBtn) {
            e.preventDefault();
            e.stopPropagation();
            
            const lang = langBtn.getAttribute('data-lang');
            if (lang && lang !== this.currentLang) {
                console.log(`🎯 Language button clicked: ${lang}`);
                this.switchLanguage(lang);
            }
        }
    }

    updateLanguageSwitcherUI() {
        console.log('🔄 Updating language switcher UI...');
        
        document.querySelectorAll('.lang-btn').forEach(btn => {
            const btnLang = btn.getAttribute('data-lang');
            const isActive = btnLang === this.currentLang;
            
            btn.classList.toggle('active', isActive);
            
            // Обновляем текст и иконку
            const langText = btn.querySelector('.lang-text');
            const langFlag = btn.querySelector('.lang-flag');
            
            if (langText) {
                langText.textContent = btnLang.toUpperCase();
            }
            
            if (langFlag) {
                langFlag.textContent = btnLang === 'ru' ? '🇷🇺' : '🇺🇸';
            }
            
            // Обновляем родительский switcher
            const switcher = btn.closest('.language-switcher');
            if (switcher) {
                switcher.setAttribute('data-current-lang', this.currentLang);
                
                // Анимируем ползунок
                const slider = switcher.querySelector('.lang-slider');
                if (slider) {
                    slider.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    slider.style.transform = this.currentLang === 'en' ? 'translateX(100%)' : 'translateX(0)';
                }
            }
        });
        
        console.log('✅ Language switcher UI updated');
        
        // Отправляем событие для синхронизации всех компонентов
        window.dispatchEvent(new CustomEvent('languageSwitcherUpdated', {
            detail: { lang: this.currentLang }
        }));
    }

    setupMutationObserver() {
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'childList') {
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType === 1) {
                            if (node.hasAttribute('data-i18n') || 
                                (node.querySelector && node.querySelector('[data-i18n]'))) {
                                console.log('👀 New content detected');
                                setTimeout(() => this.applyTranslations(), 50);
                                return;
                            }
                        }
                    }
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
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
            
            // Update UI immediately
            this.updateLanguageSwitcherUI();
            
            // Apply translations with animation
            this.applyTranslations();
            
            // Анимация смены языка
            document.querySelectorAll('[data-i18n]').forEach(el => {
                el.style.animation = 'fadeInLanguage 0.5s ease';
            });
            
            console.log(`✅ Language switched to: ${lang}`);
            
            // Remove loading state
            setTimeout(() => {
                document.body.classList.remove('language-changing');
                document.querySelectorAll('[data-i18n]').forEach(el => {
                    el.style.animation = '';
                });
            }, 500);
            
            // Notify
            window.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { lang: this.currentLang }
            }));
            
        } catch (error) {
            console.error('❌ Language switch failed:', error);
            document.body.classList.remove('language-changing');
        } finally {
            this.isSwitching = false;
        }
    }

    // Плавная смена языка (публичный метод)
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
            this.switchLanguage(lang);
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
        return count;
    }

    reinitForDynamicContent() {
        console.log('🔄 Re-initializing i18n for dynamic content...');
        this.setupLanguageSwitcher();
        this.refresh();
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
        window.i18n.switchLanguage(lang);
    }
};

window.reinitI18n = function() {
    if (window.i18n) {
        window.i18n.reinitForDynamicContent();
    }
};

// Добавляем CSS для анимаций
const style = document.createElement('style');
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
`;
document.head.appendChild(style);

// Debug
window.debugI18n = function() {
    console.group('🌍 i18n Debug');
    console.log('Current language:', window.i18n.getCurrentLang());
    console.log('Translations:', Object.keys(window.i18n.translations).length);
    console.log('Language buttons:', document.querySelectorAll('.lang-btn').length);
    
    // Test a few keys
    const testKeys = ['nav.home', 'home.hero.titleLine1', 'home.subtitle', 'nav.brand'];
    testKeys.forEach(key => {
        const translation = window.i18n.getTranslation(key);
        console.log(`${key}:`, translation || '❌ Missing');
    });
    
    console.groupEnd();
};

// Автоматический дебаг при ошибках
window.addEventListener('error', function(e) {
    if (e.message.includes('i18n') || e.filename.includes('i18n.js')) {
        console.error('❌ i18n Error:', e.message);
        window.debugI18n();
    }
});
