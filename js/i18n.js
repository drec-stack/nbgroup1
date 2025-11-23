// i18n.js - Enhanced with smooth animations
console.log('🚀 i18n.js loaded - SMOOTH VERSION');

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
            await this.loadTranslations(this.currentLang);
            this.applyTranslations();
            this.setupSmoothLanguageSwitcher();
            this.isInitialized = true;
            
            // Re-apply translations after short delay for dynamic content
            setTimeout(() => this.applyTranslations(), 100);
            
            console.log('✅ i18n fully initialized');
        } catch (error) {
            console.error('❌ i18n initialization failed:', error);
        }
    }

    async loadTranslations(lang) {
        try {
            console.log('📥 Loading translations for:', lang);
            const response = await fetch(`lang/${lang}.json`);
            if (!response.ok) throw new Error(`HTTP ${response.status} loading ${lang}.json`);
            
            this.translations = await response.json();
            document.documentElement.lang = lang;
            console.log('✅ Translations loaded successfully');
            
        } catch (error) {
            console.error('❌ Error loading translations:', error);
            // Fallback to Russian if loading fails
            if (lang !== 'ru') {
                console.log('🔄 Falling back to Russian');
                await this.loadTranslations('ru');
            }
        }
    }

    applyTranslations() {
        console.log('🔄 Applying translations...');
        let translatedCount = 0;

        // Translate elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getNestedTranslation(key);
            
            if (translation) {
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
            } else if (key) {
                console.warn('⚠️ Missing translation for key:', key);
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

        console.log(`✅ Applied ${translatedCount} translations`);
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
                    return null;
                }
            }
            return typeof result === 'string' ? result : null;
        } catch (error) {
            console.error('Error getting translation for key:', key, error);
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
            }
        }
    }

    setupSmoothLanguageSwitcher() {
        console.log('🔧 Setting up smooth language switcher...');
        
        const switcher = document.querySelector('.language-switcher');
        const buttons = document.querySelectorAll('.lang-btn');

        // Remove existing listeners
        buttons.forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
        });

        // Add new event listeners
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const lang = btn.getAttribute('data-lang');
                if (lang !== this.currentLang && !this.isAnimating) {
                    this.smoothSwitchLanguage(lang);
                }
            });
        });

        this.updateSmoothSwitcher();
    }

    async smoothSwitchLanguage(lang) {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        console.log('🎬 Smooth language switch to:', lang);
        
        // 1. Анимация переключателя
        this.animateSwitcher(lang);
        
        // 2. Плавное исчезновение контента
        await this.fadeOutContent();
        
        // 3. Смена языка
        await this.loadTranslations(lang);
        this.currentLang = lang;
        localStorage.setItem('preferredLang', lang);
        this.applyTranslations();
        
        // 4. Плавное появление нового контента
        await this.fadeInContent();
        
        this.isAnimating = false;
        
        // Notify other components
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { lang }
        }));
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
        
        // Update slider position
        switcher.setAttribute('data-current-lang', lang);
        
        // Add click animation
        const activeBtn = document.querySelector(`.lang-btn[data-lang="${lang}"]`);
        activeBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            activeBtn.style.transform = 'scale(1)';
        }, 150);
    }

    async fadeOutContent() {
        return new Promise((resolve) => {
            const mainContent = document.querySelector('main') || document.body;
            mainContent.classList.add('language-changing');
            
            setTimeout(() => {
                resolve();
            }, 200);
        });
    }

    async fadeInContent() {
        return new Promise((resolve) => {
            const mainContent = document.querySelector('main') || document.body;
            mainContent.classList.remove('language-changing');
            mainContent.classList.add('language-changed');
            
            setTimeout(() => {
                mainContent.classList.remove('language-changed');
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
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🏠 DOM loaded, initializing i18n...');
        window.i18n.init();
    });
} else {
    console.log('⚡ DOM already ready, initializing i18n...');
    setTimeout(() => window.i18n.init(), 100);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = I18n;
}
