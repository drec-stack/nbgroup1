// i18n.js - Enhanced with better error handling and debugging
console.log('🚀 i18n.js loaded - DEBUG VERSION');

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLang') || 'ru';
        this.translations = {};
        this.isInitialized = false;
        this.isAnimating = false;
        console.log('🌍 i18n initialized with language:', this.currentLang);
    }

    async init() {
        try {
            console.log('🔄 Starting i18n initialization...');
            await this.loadTranslations(this.currentLang);
            this.applyTranslations();
            this.setupSmoothLanguageSwitcher();
            this.isInitialized = true;
            
            // Re-apply translations after short delay for dynamic content
            setTimeout(() => {
                console.log('⏱️ Re-applying translations for dynamic content...');
                this.applyTranslations();
            }, 500);
            
            console.log('✅ i18n fully initialized');
            
            // Dispatch event that i18n is ready
            window.dispatchEvent(new CustomEvent('i18nReady', {
                detail: { lang: this.currentLang }
            }));
            
        } catch (error) {
            console.error('❌ i18n initialization failed:', error);
            // Try to recover
            setTimeout(() => this.init(), 1000);
        }
    }

    async loadTranslations(lang) {
        try {
            console.log(`📥 Loading translations for: ${lang}`);
            const response = await fetch(`lang/${lang}.json`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status} loading ${lang}.json`);
            }
            
            this.translations = await response.json();
            document.documentElement.lang = lang;
            console.log(`✅ ${lang}.json loaded successfully, keys:`, Object.keys(this.translations).length);
            
        } catch (error) {
            console.error(`❌ Error loading ${lang}.json:`, error);
            
            // Fallback to Russian if loading fails
            if (lang !== 'ru') {
                console.log('🔄 Falling back to Russian');
                await this.loadTranslations('ru');
            } else {
                // If Russian also fails, create empty translations
                console.warn('⚠️ No translations loaded, using empty object');
                this.translations = {};
            }
        }
    }

    applyTranslations() {
        console.log('🔄 Applying translations...');
        let translatedCount = 0;
        let missingCount = 0;

        // Translate elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getNestedTranslation(key);
            
            if (translation) {
                try {
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        if (element.placeholder !== translation) {
                            element.placeholder = translation;
                            translatedCount++;
                        }
                    } else {
                        if (element.textContent !== translation) {
                            element.textContent = translation;
                            translatedCount++;
                        }
                    }
                } catch (e) {
                    console.warn('⚠️ Error updating element for key:', key, e);
                }
            } else if (key) {
                console.warn('⚠️ Missing translation for key:', key);
                missingCount++;
            }
        });

        // Translate alt attributes
        document.querySelectorAll('[data-i18n-alt]').forEach(element => {
            const key = element.getAttribute('data-i18n-alt');
            const translation = this.getNestedTranslation(key);
            if (translation && element.alt !== translation) {
                element.alt = translation;
                translatedCount++;
            }
        });

        // Translate title attributes
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const translation = this.getNestedTranslation(key);
            if (translation && element.title !== translation) {
                element.title = translation;
                translatedCount++;
            }
        });

        // Update page title
        this.updatePageTitle();

        console.log(`✅ Applied ${translatedCount} translations, ${missingCount} missing`);
        
        // Log some translations for debugging
        if (translatedCount === 0) {
            console.warn('⚠️ No translations were applied. Possible issues:');
            console.warn('1. No elements with data-i18n attribute');
            console.warn('2. Translation files not loaded');
            console.warn('3. Keys in data-i18n don\'t match translation files');
        }
    }

    getNestedTranslation(key) {
        if (!key) return null;
        
        try {
            const keys = key.split('.');
            let result = this.translations;
            
            for (const k of keys) {
                if (result && typeof result === 'object' && k in result) {
                    result = result[k];
                } else {
                    console.warn(`⚠️ Translation path "${key}" broken at "${k}"`);
                    return null;
                }
            }
            
            if (typeof result === 'string') {
                return result;
            } else if (typeof result === 'number') {
                return result.toString();
            } else {
                console.warn(`⚠️ Translation for "${key}" is not a string:`, typeof result);
                return null;
            }
        } catch (error) {
            console.error('❌ Error getting translation for key:', key, error);
            return null;
        }
    }

    updatePageTitle() {
        const titleElement = document.querySelector('title');
        if (titleElement) {
            const titleKey = titleElement.getAttribute('data-i18n');
            if (titleKey) {
                const titleTranslation = this.getNestedTranslation(titleKey);
                if (titleTranslation) {
                    document.title = titleTranslation;
                }
            } else {
                // Try to get title from home.title
                const titleTranslation = this.getNestedTranslation('home.title');
                if (titleTranslation) {
                    document.title = titleTranslation;
                }
            }
        }
    }

    setupSmoothLanguageSwitcher() {
        console.log('🔧 Setting up language switcher...');
        
        const switcher = document.querySelector('.language-switcher');
        const buttons = document.querySelectorAll('.lang-btn');

        // Remove existing listeners to prevent duplicates
        buttons.forEach(btn => {
            btn.replaceWith(btn.cloneNode(true));
        });

        // Add new event listeners
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const lang = btn.getAttribute('data-lang');
                console.log('🎯 Language button clicked:', lang);
                
                if (lang !== this.currentLang && !this.isAnimating) {
                    this.smoothSwitchLanguage(lang);
                } else {
                    console.log('ℹ️ Already selected or animating');
                }
            });
        });

        this.updateSmoothSwitcher();
    }

    async smoothSwitchLanguage(lang) {
        if (this.isAnimating) {
            console.log('⏳ Already animating, skipping...');
            return;
        }
        
        this.isAnimating = true;
        console.log('🎬 Starting smooth language switch to:', lang);
        
        try {
            // 1. Animate switcher
            this.animateSwitcher(lang);
            
            // 2. Fade out content
            await this.fadeOutContent();
            
            // 3. Load new language
            await this.loadTranslations(lang);
            this.currentLang = lang;
            localStorage.setItem('preferredLang', lang);
            
            // 4. Apply new translations
            this.applyTranslations();
            
            // 5. Fade in new content
            await this.fadeInContent();
            
            console.log('✅ Language switched successfully to:', lang);
            
        } catch (error) {
            console.error('❌ Error switching language:', error);
        } finally {
            this.isAnimating = false;
            
            // Notify other components
            window.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { lang }
            }));
        }
    }

    animateSwitcher(lang) {
        const switcher = document.querySelector('.language-switcher');
        const buttons = document.querySelectorAll('.lang-btn');
        
        // Update active states
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        // Update switcher data attribute
        if (switcher) {
            switcher.setAttribute('data-current-lang', lang);
        }
        
        // Add click animation
        const activeBtn = document.querySelector(`.lang-btn[data-lang="${lang}"]`);
        if (activeBtn) {
            activeBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                activeBtn.style.transform = 'scale(1)';
            }, 150);
        }
    }

    async fadeOutContent() {
        return new Promise((resolve) => {
            const mainContent = document.querySelector('main') || document.body;
            if (mainContent) {
                mainContent.classList.add('language-changing');
            }
            
            setTimeout(() => {
                resolve();
            }, 200);
        });
    }

    async fadeInContent() {
        return new Promise((resolve) => {
            const mainContent = document.querySelector('main') || document.body;
            if (mainContent) {
                mainContent.classList.remove('language-changing');
                mainContent.classList.add('language-changed');
            }
            
            setTimeout(() => {
                if (mainContent) {
                    mainContent.classList.remove('language-changed');
                }
                resolve();
            }, 300);
        });
    }

    updateSmoothSwitcher() {
        const switcher = document.querySelector('.language-switcher');
        const buttons = document.querySelectorAll('.lang-btn');
        
        if (switcher) {
            switcher.setAttribute('data-current-lang', this.currentLang);
        }
        
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === this.currentLang) {
                btn.classList.add('active');
            }
        });
    }

    // Public method to get current language
    getCurrentLang() {
        return this.currentLang;
    }

    // Public method to manually trigger translation
    forceTranslate() {
        console.log('🔧 Force translating...');
        this.applyTranslations();
    }

    // Backward compatibility
    async switchLanguage(lang) {
        return this.smoothSwitchLanguage(lang);
    }

    changeLanguage(lang) {
        return this.smoothSwitchLanguage(lang);
    }
}

// Create global i18n instance
window.i18n = new I18n();

// Initialize based on document state
function initializeI18n() {
    console.log('🏠 Initializing i18n...');
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('📄 DOM loaded, starting i18n...');
            setTimeout(() => window.i18n.init(), 100);
        });
    } else {
        console.log('⚡ DOM already ready, starting i18n...');
        setTimeout(() => window.i18n.init(), 100);
    }
}

// Start initialization
initializeI18n();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = I18n;
}

// Debug helper
window.debugI18n = function() {
    console.log('=== i18n DEBUG ===');
    console.log('Current lang:', window.i18n.currentLang);
    console.log('Translations loaded:', Object.keys(window.i18n.translations).length);
    console.log('Elements with data-i18n:', document.querySelectorAll('[data-i18n]').length);
    console.log('Elements with data-i18n-alt:', document.querySelectorAll('[data-i18n-alt]').length);
    console.log('Elements with data-i18n-title:', document.querySelectorAll('[data-i18n-title]').length);
    console.log('Page title:', document.title);
    console.log('HTML lang attribute:', document.documentElement.lang);
    console.log('==================');
};
