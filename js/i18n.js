// i18n.js - Fixed version with working language switching
console.log('🚀 i18n.js loaded - FIXED VERSION');

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLang') || 'ru';
        this.translations = {};
        this.isInitialized = false;
        this.isSwitching = false;
        console.log('🌍 i18n initialized with language:', this.currentLang);
        
        // Fallback translations in case file fails
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
            
            // Load translations first
            await this.loadTranslations(this.currentLang);
            
            // Apply translations immediately (don't wait for dynamic content)
            this.applyTranslations();
            
            // Setup language switcher with direct event handling
            this.setupGlobalLanguageSwitcher();
            
            // Setup mutation observer for dynamic content
            this.setupMutationObserver();
            
            this.isInitialized = true;
            console.log('✅ i18n fully initialized');
            
            // Dispatch ready event
            window.dispatchEvent(new CustomEvent('i18nReady', {
                detail: { lang: this.currentLang }
            }));
            
        } catch (error) {
            console.error('❌ i18n initialization failed:', error);
            // Use fallback translations
            this.translations = this.fallbackTranslations;
            this.applyTranslations();
        }
    }

    setupGlobalLanguageSwitcher() {
        console.log('🎯 Setting up global language switcher...');
        
        // Глобальный обработчик для ВСЕХ кнопок языка, включая динамически загруженные
        document.addEventListener('click', (e) => {
            const langBtn = e.target.closest('.lang-btn');
            if (langBtn) {
                e.preventDefault();
                e.stopPropagation();
                
                const lang = langBtn.getAttribute('data-lang');
                console.log(`🎯 Language button clicked: ${lang}`);
                
                if (lang && lang !== this.currentLang) {
                    this.handleLanguageSwitch(lang);
                }
            }
        });
        
        // Обновить UI переключателя
        this.updateLanguageSwitcherUI();
    }

    async loadTranslations(lang) {
        try {
            console.log(`📥 Loading translations for: ${lang}`);
            
            // Try to load from server
            const response = await fetch(`lang/${lang}.json`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const rawText = await response.text();
            
            // Validate JSON structure
            if (!this.isValidJson(rawText)) {
                console.warn('⚠️ JSON validation failed, using cached version');
                await this.loadFromCache(lang);
                return;
            }
            
            this.translations = JSON.parse(rawText);
            document.documentElement.lang = lang;
            
            console.log(`✅ ${lang}.json loaded successfully`);
            console.log(`   Total keys:`, Object.keys(this.translations).length);
            
            // Cache in localStorage
            try {
                localStorage.setItem(`translations_${lang}`, rawText);
                localStorage.setItem('preferredLang', lang);
                console.log(`💾 Translations cached`);
            } catch (e) {
                console.warn('⚠️ Could not cache translations');
            }
            
        } catch (error) {
            console.error(`❌ Error loading ${lang}.json:`, error);
            await this.loadFromCache(lang);
        }
    }

    isValidJson(text) {
        if (!text || text.length < 10) {
            console.error('❌ JSON is too short');
            return false;
        }
        
        try {
            JSON.parse(text);
            return true;
        } catch (e) {
            console.error('❌ JSON parse error:', e.message);
            return false;
        }
    }

    async loadFromCache(lang) {
        console.log(`📂 Trying to load ${lang} from cache...`);
        
        try {
            const cached = localStorage.getItem(`translations_${lang}`);
            if (cached) {
                if (this.isValidJson(cached)) {
                    this.translations = JSON.parse(cached);
                    console.log(`✅ Loaded ${lang} from cache`);
                    return true;
                } else {
                    console.warn('⚠️ Cached translations are invalid, clearing cache');
                    localStorage.removeItem(`translations_${lang}`);
                }
            }
            
            // If no cache or invalid, try other language
            if (lang !== 'ru') {
                console.log('🔄 Falling back to Russian');
                const ruCached = localStorage.getItem('translations_ru');
                if (ruCached && this.isValidJson(ruCached)) {
                    this.translations = JSON.parse(ruCached);
                    this.currentLang = 'ru';
                    return true;
                }
            }
            
            // Last resort: use fallback
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
            console.warn('⚠️ No translations available, using fallback');
            this.translations = this.fallbackTranslations;
        }

        console.log('🔄 Applying translations...');
        let translatedCount = 0;

        // Translate all elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            if (this.translateElement(element)) {
                translatedCount++;
            }
        });

        // Update page title
        this.updatePageTitle();

        console.log(`✅ Applied ${translatedCount} translations`);
        return translatedCount;
    }

    translateElement(element) {
        const key = element.getAttribute('data-i18n');
        const translation = this.getNestedTranslation(key);
        
        if (translation) {
            this.updateElement(element, translation);
            return true;
        } else {
            // Не выводим warning для servicesPreview.* ключей
            if (!key.startsWith('servicesPreview.')) {
                console.warn('⚠️ Missing translation for key:', key);
            }
            return false;
        }
    }

    getNestedTranslation(key) {
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
        
        switch(tag) {
            case 'input':
            case 'textarea':
                if (element.type !== 'submit' && element.type !== 'button') {
                    element.placeholder = translation;
                }
                break;
            case 'img':
                element.alt = translation;
                break;
            case 'title':
                element.textContent = translation;
                break;
            default:
                element.textContent = translation;
        }
    }

    updatePageTitle() {
        const titleElement = document.querySelector('title[data-i18n]');
        if (titleElement) {
            const titleKey = titleElement.getAttribute('data-i18n');
            const titleTranslation = this.getNestedTranslation(titleKey);
            if (titleTranslation) {
                document.title = titleTranslation;
            }
        }
    }

    updateLanguageSwitcherUI() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            const btnLang = btn.getAttribute('data-lang');
            btn.classList.toggle('active', btnLang === this.currentLang);
        });
    }

    setupMutationObserver() {
        const observer = new MutationObserver((mutations) => {
            let needsTranslation = false;
            
            for (const mutation of mutations) {
                if (mutation.type === 'childList') {
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType === 1) {
                            if (node.hasAttribute('data-i18n') || 
                                (node.querySelector && node.querySelector('[data-i18n]'))) {
                                needsTranslation = true;
                                break;
                            }
                        }
                    }
                }
                if (needsTranslation) break;
            }
            
            if (needsTranslation) {
                console.log('👀 New content detected, applying translations...');
                setTimeout(() => this.applyTranslations(), 50);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    async handleLanguageSwitch(lang) {
        if (this.isSwitching || lang === this.currentLang) {
            console.log('ℹ️ Already switching or same language');
            return;
        }
        
        this.isSwitching = true;
        console.log(`🎬 Switching language to: ${lang}`);
        
        try {
            // Add loading animation
            document.body.classList.add('language-changing');
            
            // Load new language
            await this.loadTranslations(lang);
            this.currentLang = lang;
            
            // Update switcher UI
            this.updateLanguageSwitcherUI();
            
            // Apply translations
            this.applyTranslations();
            
            console.log(`✅ Language switched to: ${lang}`);
            
            // Remove loading animation
            setTimeout(() => {
                document.body.classList.remove('language-changing');
            }, 300);
            
            // Notify other components
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

    // Public methods
    getCurrentLang() {
        return this.currentLang;
    }

    getTranslation(key) {
        return this.getNestedTranslation(key);
    }

    refresh() {
        console.log('🔄 Refreshing translations...');
        return this.applyTranslations();
    }
}

// Create global instance
window.i18n = new I18n();

// Initialize immediately
(function() {
    console.log('🚀 i18n auto-initializing...');
    
    function initialize() {
        window.i18n.init();
        
        // Also apply translations to any newly loaded content
        setTimeout(() => {
            window.i18n.refresh();
        }, 1000);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();

// Debug helper
window.debugI18n = function() {
    console.group('🌍 i18n Debug Info');
    console.log('Initialized:', window.i18n.isInitialized);
    console.log('Current language:', window.i18n.currentLang);
    console.log('Translations loaded:', Object.keys(window.i18n.translations).length);
    console.log('Elements with data-i18n:', document.querySelectorAll('[data-i18n]').length);
    
    // Check hero section
    const heroElements = document.querySelectorAll('.hero [data-i18n]');
    console.log('Hero section elements:', heroElements.length);
    heroElements.forEach((el, i) => {
        const key = el.getAttribute('data-i18n');
        const text = el.textContent.substring(0, 40);
        console.log(`  ${i+1}. ${key}: "${text}..."`);
    });
    
    console.groupEnd();
};

// Global function for language switching
window.changeLanguage = function(lang) {
    if (window.i18n && window.i18n.handleLanguageSwitch) {
        window.i18n.handleLanguageSwitch(lang);
    } else {
        console.error('❌ i18n not available');
    }
};
