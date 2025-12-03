// i18n.js - Enhanced with better error handling and debugging
console.log('🚀 i18n.js loaded - ENHANCED VERSION');

class I18n {
    constructor() {
        this.currentLang = this.detectLanguage();
        this.translations = {};
        this.isInitialized = false;
        this.isAnimating = false;
        this.fallbackLang = 'ru';
        console.log('🌍 i18n initialized with language:', this.currentLang);
    }

    detectLanguage() {
        // 1. Check localStorage
        const savedLang = localStorage.getItem('preferredLang');
        if (savedLang && ['ru', 'en'].includes(savedLang)) return savedLang;
        
        // 2. Check browser language
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('ru')) return 'ru';
        if (browserLang.startsWith('en')) return 'en';
        
        // 3. Default to Russian
        return 'ru';
    }

    async init() {
        try {
            console.log('🔄 Starting i18n initialization...');
            
            // Load translations
            await this.loadTranslations(this.currentLang);
            
            // Apply translations with retry for dynamic content
            let appliedCount = this.applyTranslations();
            
            // Retry for dynamically loaded content
            if (appliedCount === 0) {
                console.log('🔄 No translations applied, retrying...');
                setTimeout(() => this.applyTranslations(), 500);
            }
            
            this.setupLanguageSwitcher();
            this.setupObservers();
            this.isInitialized = true;
            
            // Notify other components
            window.dispatchEvent(new CustomEvent('i18nReady', {
                detail: { 
                    lang: this.currentLang,
                    translations: this.translations 
                }
            }));
            
            console.log('✅ i18n fully initialized');
            
        } catch (error) {
            console.error('❌ i18n initialization failed:', error);
            this.showErrorNotification();
        }
    }

    async loadTranslations(lang) {
        try {
            console.log(`📥 Loading translations for: ${lang}`);
            
            // Try to load from network first
            const response = await fetch(`lang/${lang}.json`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            this.translations = await response.json();
            document.documentElement.lang = lang;
            document.documentElement.setAttribute('data-lang', lang);
            
            console.log(`✅ ${lang}.json loaded successfully`);
            
            // Cache in localStorage
            try {
                localStorage.setItem(`translations_${lang}`, JSON.stringify(this.translations));
                localStorage.setItem('translations_version', '1.0');
            } catch (e) {
                console.warn('⚠️ Could not cache translations:', e);
            }
            
        } catch (error) {
            console.error(`❌ Error loading ${lang}.json:`, error);
            await this.handleTranslationError(lang, error);
        }
    }

    async handleTranslationError(lang, error) {
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
        if (lang !== this.fallbackLang) {
            console.log(`🔄 Falling back to ${this.fallbackLang}`);
            await this.loadTranslations(this.fallbackLang);
            this.currentLang = this.fallbackLang;
        } else {
            // Last resort - empty translations
            console.warn('⚠️ Using empty translations');
            this.translations = this.createFallbackTranslations();
        }
    }

    createFallbackTranslations() {
        // Basic fallback translations to prevent complete UI breakdown
        return {
            nav: {
                home: 'Home',
                services: 'Services',
                portfolio: 'Portfolio',
                about: 'About',
                contact: 'Contact'
            }
        };
    }

    applyTranslations() {
        if (!this.translations || Object.keys(this.translations).length === 0) {
            console.warn('⚠️ No translations available');
            return 0;
        }

        console.log('🔄 Applying translations...');
        let translatedCount = 0;
        let missingKeys = [];

        // Translate elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getNestedTranslation(key);
            
            if (translation) {
                try {
                    this.updateElement(element, translation);
                    translatedCount++;
                } catch (e) {
                    console.warn('⚠️ Error updating element:', key, e);
                }
            } else if (key) {
                missingKeys.push(key);
            }
        });

        // Update attributes with data-i18n-attr
        document.querySelectorAll('[data-i18n-attr]').forEach(element => {
            const config = element.getAttribute('data-i18n-attr');
            const [key, attr] = config.split(':');
            const translation = this.getNestedTranslation(key);
            
            if (translation && attr) {
                element.setAttribute(attr, translation);
                translatedCount++;
            }
        });

        // Update page title and metadata
        this.updatePageMetadata();

        // Log missing keys only in development
        if (missingKeys.length > 0 && window.location.hostname === 'localhost') {
            console.warn('⚠️ Missing translations:', [...new Set(missingKeys)].slice(0, 10));
        }

        console.log(`✅ Applied ${translatedCount} translations`);
        return translatedCount;
    }

    updateElement(element, translation) {
        const tag = element.tagName;
        
        if (tag === 'INPUT' || tag === 'TEXTAREA') {
            const placeholder = element.getAttribute('data-i18n-placeholder');
            if (placeholder === 'true' || !element.getAttribute('placeholder')) {
                element.placeholder = translation;
            } else {
                element.value = translation;
            }
        } else if (tag === 'IMG') {
            element.alt = translation;
        } else if (tag === 'META') {
            element.content = translation;
        } else {
            // Check if we should preserve HTML
            const preserveHtml = element.getAttribute('data-i18n-html') === 'true';
            if (preserveHtml && this.safeHtml(translation)) {
                element.innerHTML = translation;
            } else {
                element.textContent = translation;
            }
        }
    }

    safeHtml(html) {
        // Basic HTML sanitization
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.innerHTML === html;
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

    updatePageMetadata() {
        // Update page title
        const titleElement = document.querySelector('title[data-i18n]');
        if (titleElement) {
            const titleKey = titleElement.getAttribute('data-i18n');
            const titleTranslation = this.getNestedTranslation(titleKey);
            if (titleTranslation) {
                document.title = titleTranslation;
            }
        }

        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"][data-i18n]');
        if (metaDesc) {
            const descKey = metaDesc.getAttribute('data-i18n');
            const descTranslation = this.getNestedTranslation(descKey);
            if (descTranslation) {
                metaDesc.content = descTranslation;
            }
        }
    }

    setupLanguageSwitcher() {
        console.log('🔧 Setting up language switcher...');
        
        // Use event delegation for better performance
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

    setupObservers() {
        // Observe DOM changes for dynamically added content
        const observer = new MutationObserver((mutations) => {
            let shouldTranslate = false;
            
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1 && (
                            node.hasAttribute('data-i18n') || 
                            node.querySelector('[data-i18n]')
                        )) {
                            shouldTranslate = true;
                        }
                    });
                }
            });
            
            if (shouldTranslate) {
                setTimeout(() => this.applyTranslations(), 50);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    async switchLanguage(lang) {
        if (this.isAnimating || lang === this.currentLang) return;
        
        this.isAnimating = true;
        console.log('🎬 Switching language to:', lang);
        
        try {
            // 1. Update UI immediately
            this.updateLanguageSwitcherUI(lang);
            
            // 2. Fade out
            await this.fadeOut();
            
            // 3. Load and apply new language
            await this.loadTranslations(lang);
            this.currentLang = lang;
            localStorage.setItem('preferredLang', lang);
            
            this.applyTranslations();
            
            // 4. Fade in
            await this.fadeIn();
            
            console.log(`✅ Language switched to: ${lang}`);
            
            // Dispatch event for other components
            window.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { 
                    lang,
                    previousLang: this.currentLang 
                }
            }));
            
        } catch (error) {
            console.error('❌ Language switch failed:', error);
        } finally {
            this.isAnimating = false;
        }
    }

    updateLanguageSwitcherUI(lang) {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
        
        // Animate active button
        const activeBtn = document.querySelector(`.lang-btn[data-lang="${lang}"]`);
        if (activeBtn) {
            activeBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                activeBtn.style.transform = '';
            }, 200);
        }
    }

    updateLanguageSwitcher() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', 
                btn.getAttribute('data-lang') === this.currentLang
            );
        });
    }

    async fadeOut() {
        return new Promise(resolve => {
            const main = document.querySelector('main') || document.body;
            if (main) {
                main.style.opacity = '0.5';
                main.style.transition = 'opacity 0.2s ease';
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

    showErrorNotification() {
        // Could show a subtle notification to user
        if (window.console && console.error) {
            console.error('i18n system failed to initialize');
        }
    }

    // Public API
    getCurrentLang() {
        return this.currentLang;
    }

    getTranslation(key) {
        return this.getNestedTranslation(key);
    }

    reload() {
        return this.loadTranslations(this.currentLang).then(() => {
            this.applyTranslations();
        });
    }
}

// Create and initialize i18n
window.i18n = new I18n();

// Initialize when DOM is ready
function initializeI18n() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => window.i18n.init(), 100);
        });
    } else {
        setTimeout(() => window.i18n.init(), 100);
    }
}

initializeI18n();

// Debug utilities
if (window.location.hostname === 'localhost') {
    window.debugI18n = function() {
        console.group('🌍 i18n Debug Info');
        console.log('Current lang:', window.i18n.currentLang);
        console.log('Translations:', Object.keys(window.i18n.translations));
        console.log('Elements with data-i18n:', 
            document.querySelectorAll('[data-i18n]').length);
        console.groupEnd();
    };
    
    // Auto-debug on errors
    window.addEventListener('error', (e) => {
        if (e.message.includes('i18n') || e.filename.includes('i18n')) {
            window.debugI18n();
        }
    });
}
