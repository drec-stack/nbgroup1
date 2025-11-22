// Internationalization (i18n) module
class I18n {
    constructor() {
        this.currentLang = this.getSavedLanguage() || 'ru';
        this.translations = {};
        this.init();
    }

    async init() {
        await this.loadTranslations(this.currentLang);
        this.applyTranslations();
        this.setupLanguageSwitcher();
    }

    getSavedLanguage() {
        return localStorage.getItem('preferred-language');
    }

    saveLanguage(lang) {
        localStorage.setItem('preferred-language', lang);
    }

    async loadTranslations(lang) {
        try {
            const response = await fetch(`lang/${lang}.json`);
            if (!response.ok) {
                throw new Error('Translation file not found');
            }
            this.translations = await response.json();
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback to Russian if translation file fails to load
            if (lang !== 'ru') {
                console.log('Falling back to Russian...');
                await this.loadTranslations('ru');
            } else {
                // If Russian also fails, use empty object
                this.translations = {};
            }
        }
    }

    async changeLanguage(lang) {
        if (lang === this.currentLang) return;
        
        console.log('Changing language to:', lang);
        this.currentLang = lang;
        await this.loadTranslations(lang);
        this.applyTranslations();
        this.updateLanguageSwitcher();
        this.saveLanguage(lang);
        
        // Dispatch custom event for other components to react
        window.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: lang } 
        }));
    }

    applyTranslations() {
        // Translate all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        
        console.log('Applying translations to', elements.length, 'elements');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else if (element.tagName === 'SELECT') {
                    // For select options
                    const options = element.querySelectorAll('option[data-i18n]');
                    options.forEach(option => {
                        const optionKey = option.getAttribute('data-i18n');
                        const optionTranslation = this.getTranslation(optionKey);
                        if (optionTranslation) {
                            option.textContent = optionTranslation;
                        }
                    });
                } else {
                    element.textContent = translation;
                }
            } else {
                console.warn('Translation not found for key:', key);
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;
        
        console.log('Translations applied successfully');
    }

    getTranslation(key) {
        if (!key) return null;
        
        try {
            return key.split('.').reduce((obj, keyPart) => {
                return obj ? obj[keyPart] : undefined;
            }, this.translations);
        } catch (error) {
            console.warn('Error getting translation for key:', key, error);
            return null;
        }
    }

    setupLanguageSwitcher() {
        const langButtons = document.querySelectorAll('.lang-btn');
        
        langButtons.forEach(btn => {
            // Remove existing event listeners
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = newBtn.getAttribute('data-lang');
                console.log('Language button clicked:', lang);
                this.changeLanguage(lang);
            });
        });

        this.updateLanguageSwitcher();
    }

    updateLanguageSwitcher() {
        const langButtons = document.querySelectorAll('.lang-btn');
        
        langButtons.forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            if (lang === this.currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Method to get translation for dynamic content
    t(key) {
        return this.getTranslation(key) || key;
    }
}

// Initialize i18n when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18n();
});