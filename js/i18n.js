// i18n.js - Fixed timing and dynamic content handling
console.log('🚀 i18n.js loaded');

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLang') || 'ru';
        this.translations = {};
        this.isInitialized = false;
        this.isSwitching = false;
        console.log('🌍 i18n initialized with language:', this.currentLang);
    }

    async init() {
        try {
            console.log('🔄 Starting i18n initialization...');
            
            // Load translations
            await this.loadTranslations(this.currentLang);
            
            // Wait a bit for dynamic content to load
            await this.waitForDynamicContent();
            
            // Apply translations
            this.applyTranslations();
            
            // Setup language switcher
            this.setupLanguageSwitcher();
            
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
            // Retry after delay
            setTimeout(() => this.init(), 1000);
        }
    }

    async waitForDynamicContent() {
        return new Promise(resolve => {
            const checkInterval = setInterval(() => {
                // Check if header and footer are loaded
                const headerLoaded = document.getElementById('header-container')?.innerHTML?.length > 100;
                const footerLoaded = document.getElementById('footer-container')?.innerHTML?.length > 100;
                const heroSection = document.querySelector('.hero');
                
                if ((headerLoaded && footerLoaded) || heroSection) {
                    clearInterval(checkInterval);
                    console.log('✅ Dynamic content detected');
                    resolve();
                }
            }, 100);
            
            // Timeout after 5 seconds
            setTimeout(() => {
                clearInterval(checkInterval);
                console.log('⚠️ Timeout waiting for dynamic content');
                resolve();
            }, 5000);
        });
    }

    async loadTranslations(lang) {
        try {
            console.log(`📥 Loading translations for: ${lang}`);
            const response = await fetch(`lang/${lang}.json`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            this.translations = await response.json();
            document.documentElement.lang = lang;
            
            console.log(`✅ ${lang}.json loaded, keys:`, Object.keys(this.translations).length);
            
            // Cache in localStorage
            try {
                localStorage.setItem(`translations_${lang}`, JSON.stringify(this.translations));
                localStorage.setItem('preferredLang', lang);
            } catch (e) {
                console.warn('⚠️ Could not cache translations:', e);
            }
            
        } catch (error) {
            console.error(`❌ Error loading ${lang}.json:`, error);
            await this.handleTranslationError(lang);
        }
    }

    async handleTranslationError(lang) {
        // Try to load from cache
        try {
            const cached = localStorage.getItem(`translations_${lang}`);
            if (cached) {
                console.log(`📂 Loading ${lang} from cache...`);
                this.translations = JSON.parse(cached);
                return;
            }
        } catch (cacheError) {
            console.warn('⚠️ Cache load failed:', cacheError);
        }
        
        // Fallback to Russian if different language
        if (lang !== 'ru') {
            console.log('🔄 Falling back to Russian');
            await this.loadTranslations('ru');
            this.currentLang = 'ru';
        } else {
            // Last resort
            console.warn('⚠️ Using empty translations');
            this.translations = { 
                nav: { home: 'Home', services: 'Services' },
                home: { hero: { titleLine1: 'NB GROUP TECH' } }
            };
        }
    }

    applyTranslations() {
        if (!this.translations || Object.keys(this.translations).length === 0) {
            console.warn('⚠️ No translations available');
            return 0;
        }

        console.log('🔄 Applying translations...');
        let translatedCount = 0;

        // Translate all elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getNestedTranslation(key);
            
            if (translation) {
                this.updateElement(element, translation);
                translatedCount++;
            } else {
                console.warn('⚠️ Missing translation for key:', key);
            }
        });

        // Update page title
        this.updatePageTitle();

        console.log(`✅ Applied ${translatedCount} translations`);
        return translatedCount;
    }

    getNestedTranslation(key) {
        if (!key || !this.translations) return null;
        
        try {
            return key.split('.').reduce((obj, k) => obj?.[k], this.translations);
        } catch (error) {
            console.error('Error getting translation for key:', key, error);
            return null;
        }
    }

    updateElement(element, translation) {
        const tag = element.tagName;
        
        if (tag === 'INPUT' || tag === 'TEXTAREA') {
            element.placeholder = translation;
        } else if (tag === 'IMG') {
            element.alt = translation;
        } else {
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
        } else {
            // Fallback to home.title
            const titleTranslation = this.getNestedTranslation('home.title');
            if (titleTranslation) {
                document.title = titleTranslation;
            }
        }
    }

    setupLanguageSwitcher() {
        console.log('🔧 Setting up language switcher...');
        
        // Event delegation for language buttons
        document.addEventListener('click', (e) => {
            const langBtn = e.target.closest('.lang-btn');
            if (langBtn) {
                e.preventDefault();
                const lang = langBtn.getAttribute('data-lang');
                if (lang && lang !== this.currentLang) {
                    this.switchLanguage(lang);
                }
            }
        });

        this.updateLanguageSwitcher();
    }

    setupMutationObserver() {
        // Observe for dynamically added content
        const observer = new MutationObserver((mutations) => {
            let needsTranslation = false;
            
            for (const mutation of mutations) {
                if (mutation.type === 'childList') {
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType === 1) {
                            if (node.hasAttribute('data-i18n') || 
                                node.querySelector('[data-i18n]')) {
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
                setTimeout(() => this.applyTranslations(), 100);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    async switchLanguage(lang) {
        if (this.isSwitching || lang === this.currentLang) {
            console.log('ℹ️ Already switching or same language');
            return;
        }
        
        this.isSwitching = true;
        console.log(`🎬 Switching language to: ${lang}`);
        
        try {
            // 1. Update UI
            this.updateLanguageSwitcherUI(lang);
            
            // 2. Fade out content
            await this.fadeOut();
            
            // 3. Load new language
            await this.loadTranslations(lang);
            this.currentLang = lang;
            
            // 4. Apply new translations
            this.applyTranslations();
            
            // 5. Fade in content
            await this.fadeIn();
            
            console.log(`✅ Language switched to: ${lang}`);
            
            // Notify other components
            window.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { lang: this.currentLang }
            }));
            
        } catch (error) {
            console.error('❌ Language switch failed:', error);
        } finally {
            this.isSwitching = false;
        }
    }

    updateLanguageSwitcherUI(lang) {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            const btnLang = btn.getAttribute('data-lang');
            btn.classList.toggle('active', btnLang === lang);
        });
    }

    updateLanguageSwitcher() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            const btnLang = btn.getAttribute('data-lang');
            btn.classList.toggle('active', btnLang === this.currentLang);
        });
    }

    async fadeOut() {
        return new Promise(resolve => {
            const main = document.querySelector('main') || document.body;
            if (main) {
                main.style.transition = 'opacity 0.2s ease';
                main.style.opacity = '0.7';
            }
            setTimeout(resolve, 200);
        });
    }

    async fadeIn() {
        return new Promise(resolve => {
            const main = document.querySelector('main') || document.body;
            if (main) {
                main.style.opacity = '1';
            }
            setTimeout(resolve, 200);
        });
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

// Wait for everything to be ready before initializing
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM fully loaded, starting i18n...');
    
    // Wait a bit more for dynamic components
    setTimeout(() => {
        window.i18n.init();
    }, 300);
});

// Also initialize if DOM is already loaded
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    console.log('⚡ DOM already ready, starting i18n...');
    setTimeout(() => {
        window.i18n.init();
    }, 300);
}

// Debug helper
window.debugI18n = function() {
    console.group('🌍 i18n Debug Info');
    console.log('Initialized:', window.i18n.isInitialized);
    console.log('Current language:', window.i18n.currentLang);
    console.log('Translations loaded:', Object.keys(window.i18n.translations).length > 0);
    console.log('Elements with data-i18n:', document.querySelectorAll('[data-i18n]').length);
    
    // Check hero section
    const heroTitle = document.querySelector('.hero h1 [data-i18n]');
    if (heroTitle) {
        const key = heroTitle.getAttribute('data-i18n');
        const translation = window.i18n.getTranslation(key);
        console.log('Hero title check:', key, '=>', translation);
    }
    
    console.groupEnd();
};
