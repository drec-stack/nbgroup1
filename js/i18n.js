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
                "home": "Home",
                "services": "Services",
                "portfolio": "Work",
                "about": "About",
                "contact": "Contact",
                "brandbook": "Brandbook",
                "startProject": "Start Project"
            },
            "home": {
                "title": "Innovative Product Development",
                "subtitle": "From concept to production",
                "hero": {
                    "titleLine1": "NB GROUP TECH",
                    "titleLine2": "products that",
                    "titleLine3": "define markets",
                    "description": "Full-cycle industrial design studio. We create products that combine aesthetics, engineering precision, and manufacturable implementation.",
                    "ourServices": "Our Services",
                    "viewWork": "View Work"
                },
                "clients": {
                    "label": "Trusted by industry leaders"
                },
                "stats": {
                    "projects": "Projects Delivered",
                    "years": "Years Experience",
                    "satisfaction": "Client Satisfaction",
                    "awards": "Design Awards"
                },
                "cta": {
                    "title": "Ready to start your project?",
                    "description": "Let's discuss how we can bring your product vision to life",
                    "button": "Get in Touch"
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
            }
        });

        this.updatePageTitle();
        console.log(`✅ Applied ${translatedCount} translations`);
        
        return translatedCount;
    }

    getTranslation(key) {
        if (!key || !this.translations) return null;
        
        const keys = key.split('.');
        let result = this.translations;
        
        for (const k of keys) {
            if (result && typeof result === 'object' && k in result) {
                result = result[k];
            } else {
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
            }
        } else if (tag === 'img') {
            element.alt = translation;
        } else if (tag === 'title') {
            element.textContent = translation;
        } else {
            element.textContent = translation;
        }
    }

    updatePageTitle() {
        const titleElement = document.querySelector('title[data-i18n]');
        if (titleElement) {
            const titleKey = titleElement.getAttribute('data-i18n');
            const titleTranslation = this.getTranslation(titleKey);
            if (titleTranslation) {
                document.title = titleTranslation;
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
        document.querySelectorAll('.lang-btn').forEach(btn => {
            const btnLang = btn.getAttribute('data-lang');
            btn.classList.toggle('active', btnLang === this.currentLang);
            
            // Также обновляем родительский switcher
            const switcher = btn.closest('.language-switcher');
            if (switcher) {
                switcher.setAttribute('data-current-lang', this.currentLang);
            }
        });
        
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
        if (this.isSwitching || lang === this.currentLang) return;
        
        this.isSwitching = true;
        console.log(`🎬 Switching language to: ${lang}`);
        
        try {
            // Add loading state
            document.body.classList.add('language-changing');
            
            // Load new translations
            await this.loadTranslations(lang);
            this.currentLang = lang;
            
            // Update UI
            this.updateLanguageSwitcherUI();
            
            // Apply translations
            this.applyTranslations();
            
            console.log(`✅ Language switched to: ${lang}`);
            
            // Remove loading state
            setTimeout(() => {
                document.body.classList.remove('language-changing');
            }, 300);
            
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

    // Public API
    getCurrentLang() {
        return this.currentLang;
    }

    refresh() {
        console.log('🔄 Refreshing translations...');
        return this.applyTranslations();
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
            setTimeout(() => window.i18n.init(), 100);
        });
    } else {
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

// Debug
window.debugI18n = function() {
    console.group('🌍 i18n Debug');
    console.log('Current language:', window.i18n.getCurrentLang());
    console.log('Translations:', Object.keys(window.i18n.translations).length);
    console.log('Language buttons:', document.querySelectorAll('.lang-btn').length);
    
    // Test a few keys
    const testKeys = ['nav.home', 'home.hero.titleLine1', 'home.subtitle'];
    testKeys.forEach(key => {
        const translation = window.i18n.getTranslation(key);
        console.log(`${key}:`, translation || '❌ Missing');
    });
    
    console.groupEnd();
};
