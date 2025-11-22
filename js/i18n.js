// i18n.js - Enhanced with force apply
console.log('🚀 i18n.js loaded');

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLang') || 'ru';
        this.translations = {};
        this.isInitialized = false;
        console.log('🌍 i18n initialized with language:', this.currentLang);
    }

    async init() {
        await this.loadTranslations(this.currentLang);
        this.applyTranslations(true); // Force apply
        this.setupLanguageSwitcher();
        this.isInitialized = true;
        
        // Re-apply translations after a short delay to catch dynamic content
        setTimeout(() => this.applyTranslations(true), 500);
    }

    async loadTranslations(lang) {
        try {
            console.log('📥 Loading translations for:', lang);
            const response = await fetch(`lang/${lang}.json`);
            if (!response.ok) throw new Error('Failed to load translations');
            
            this.translations = await response.json();
            document.documentElement.lang = lang;
            console.log('✅ Translations loaded successfully');
            
        } catch (error) {
            console.error('❌ Error loading translations:', error);
        }
    }

    applyTranslations(force = false) {
        console.log('🔄 Applying translations...', force ? '(FORCE)' : '');
        const elements = document.querySelectorAll('[data-i18n]');
        
        console.log(`Found ${elements.length} translatable elements`);
        
        elements.forEach((element, index) => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    if (force || element.placeholder !== translation) {
                        element.placeholder = translation;
                    }
                } else {
                    if (force || element.textContent !== translation) {
                        element.textContent = translation;
                    }
                }
            } else {
                console.warn('Missing translation for:', key);
            }
        });

        // Force update page title
        this.updatePageTitle();
        
        // Update any dynamic content that might be added by page scripts
        this.updateDynamicContent();
        
        console.log('✅ Translations applied to', elements.length, 'elements');
    }

    getTranslation(key) {
        if (!key) return null;
        const keys = key.split('.');
        let result = this.translations;
        
        for (const k of keys) {
            if (!result) break;
            result = result[k];
        }
        return result;
    }

    updatePageTitle() {
        const titleElement = document.querySelector('title');
        if (titleElement) {
            const titleKey = titleElement.getAttribute('data-i18n');
            if (titleKey) {
                const titleTranslation = this.getTranslation(titleKey);
                if (titleTranslation) {
                    document.title = titleTranslation;
                }
            } else {
                // Fallback: try to translate common title patterns
                const currentTitle = document.title;
                if (currentTitle.includes('Home') || currentTitle.includes('Главная')) {
                    document.title = this.getTranslation('nav.home') || currentTitle;
                } else if (currentTitle.includes('Contact') || currentTitle.includes('Контакты')) {
                    document.title = this.getTranslation('nav.contact') || currentTitle;
                }
            }
        }
    }

    updateDynamicContent() {
        // Update any dynamically added content
        const dynamicSelectors = [
            '.hero-title', '.hero-subtitle', '.section-title', '.section-subtitle',
            '.btn-text', '.card-title', '.card-description'
        ];
        
        dynamicSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                if (!element.hasAttribute('data-i18n')) {
                    const text = element.textContent.trim();
                    // Try to find matching translation
                    Object.keys(this.translations).forEach(category => {
                        if (typeof this.translations[category] === 'object') {
                            Object.keys(this.translations[category]).forEach(key => {
                                if (this.translations[category][key] === text) {
                                    element.setAttribute('data-i18n', `${category}.${key}`);
                                }
                            });
                        }
                    });
                }
            });
        });
    }

    setupLanguageSwitcher() {
        console.log('🔧 Setting up language switcher...');
        
        // Remove all existing event listeners
        const buttons = document.querySelectorAll('[data-lang]');
        buttons.forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
        });

        // Add new event listeners
        document.querySelectorAll('[data-lang]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const lang = btn.getAttribute('data-lang');
                console.log('🔄 Language switch clicked:', lang);
                this.switchLanguage(lang);
            });
        });

        this.updateLanguageSwitcher();
    }

    async switchLanguage(lang) {
        if (lang === this.currentLang) return;
        
        console.log('🔄 Switching to language:', lang);
        this.currentLang = lang;
        localStorage.setItem('preferredLang', lang);
        
        await this.loadTranslations(lang);
        this.applyTranslations(true); // Force apply
        this.updateLanguageSwitcher();
        
        // Force re-apply after components load
        setTimeout(() => this.applyTranslations(true), 300);
        
        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { lang: lang }
        }));
    }

    updateLanguageSwitcher() {
        document.querySelectorAll('[data-lang]').forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            const isActive = lang === this.currentLang;
            
            btn.classList.toggle('active', isActive);
            btn.style.opacity = isActive ? '1' : '0.6';
            btn.style.fontWeight = isActive ? 'bold' : 'normal';
        });
    }
}

// Create and initialize i18n
const i18n = new I18n();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏠 DOM loaded, initializing i18n...');
    i18n.init();
});

// Also initialize if DOM is already ready
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    console.log('⚡ DOM already ready, initializing i18n...');
    setTimeout(() => i18n.init(), 100);
}

// Make globally available
window.i18n = i18n;
