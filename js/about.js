console.log('🚀 about.js loaded - UPDATED VERSION with LANGUAGE SWITCHER FIX');

// Переопределение анимаций для гарантии видимости блоков
(function fixSpeckDesignBlocks() {
    console.log('🔧 Applying emergency fix for Speck Design blocks');
    
    const forceShowBlocks = function() {
        const speckSection = document.querySelector('.speck-design-section');
        const speckCards = document.querySelectorAll('.speck-service-card');
        const speckGrid = document.querySelector('.speck-services-grid');
        
        if (speckSection) {
            // Принудительно показываем секцию
            speckSection.style.cssText = `
                opacity: 1 !important;
                visibility: visible !important;
                display: block !important;
                position: relative !important;
                z-index: 100 !important;
            `;
            
            // Принудительно показываем контейнер
            const container = speckSection.querySelector('.container');
            if (container) {
                container.style.cssText = `
                    opacity: 1 !important;
                    visibility: visible !important;
                    display: block !important;
                `;
            }
            
            // Принудительно показываем заголовки
            const title = speckSection.querySelector('.speck-title');
            const subtitle = speckSection.querySelector('.speck-subtitle');
            if (title) title.style.opacity = '1';
            if (subtitle) subtitle.style.opacity = '1';
            
            console.log('✅ Speck Design section forced visible');
        }
        
        if (speckCards.length > 0) {
            let fixedCards = 0;
            speckCards.forEach(function(card, index) {
                // Проверяем видимость карточки
                const rect = card.getBoundingClientRect();
                const isVisible = rect.width > 0 && rect.height > 0 && 
                                 getComputedStyle(card).display !== 'none' &&
                                 getComputedStyle(card).visibility !== 'hidden' &&
                                 getComputedStyle(card).opacity !== '0';
                
                if (!isVisible) {
                    // Принудительно показываем скрытую карточку
                    card.style.cssText = `
                        opacity: 1 !important;
                        visibility: visible !important;
                        display: block !important;
                        transform: translateY(0) !important;
                        position: relative !important;
                        z-index: ${10 + index} !important;
                        animation: none !important;
                    `;
                    fixedCards++;
                    console.log(`✅ Card ${index + 1} forced visible`);
                }
            });
            
            if (fixedCards > 0) {
                console.log(`✅ ${fixedCards} hidden cards fixed`);
            }
        }
        
        if (speckGrid) {
            speckGrid.style.cssText = `
                opacity: 1 !important;
                visibility: visible !important;
                display: grid !important;
            `;
        }
    };
    
    // Применяем фикс несколько раз для надежности
    document.addEventListener('DOMContentLoaded', function() {
        console.log('📄 DOM loaded, applying block fixes...');
        
        // Первый фикс
        setTimeout(forceShowBlocks, 300);
        
        // Второй фикс после полной загрузки
        setTimeout(forceShowBlocks, 1000);
        
        // Третий фикс для гарантии
        setTimeout(forceShowBlocks, 2000);
    });
    
    // Фикс при полной загрузке страницы
    window.addEventListener('load', function() {
        console.log('🔄 Page fully loaded, final block fix...');
        setTimeout(forceShowBlocks, 500);
    });
    
    // Фикс при изменении размера окна
    window.addEventListener('resize', function() {
        setTimeout(forceShowBlocks, 200);
    });
})();

class AboutPage {
    constructor() {
        this.isInitialized = false;
        console.log('🎯 About page initializing (clean version)');
        this.init();
    }

    init() {
        // Ждем загрузки DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                console.log('📄 About page DOM loaded');
                this.initializeAboutPage();
            });
        } else {
            console.log('📄 DOM already loaded, starting about page...');
            this.initializeAboutPage();
        }
    }

    initializeAboutPage() {
        if (this.isInitialized) {
            console.log('⚠️ About page already initialized');
            return;
        }
        
        try {
            console.log('🎯 Initializing clean about page...');
            
            // Удаляем все темные оверлеи из DOM
            this.removeDarkOverlays();
            
            // Настройка хедера
            this.setupHeaderForAboutPage();
            
            // Инициализация фото команды
            this.initializeTeamPhotos();
            
            // Гарантируем видимость блоков "Что мы делаем"
            this.guaranteeSpeckDesignVisibility();
            
            // ФИКС: Гарантируем правильную работу переключателя языка
            this.fixLanguageSwitcher();
            
            // Настройка функционала страницы
            this.setupPageFunctionalities();
            
            // Настройка анимаций
            this.setupContentAnimations();
            
            this.isInitialized = true;
            console.log('✅ About page initialized successfully (clean version)');
            
            // Финалная проверка
            setTimeout(() => {
                this.finalCheck();
            }, 1500);
            
        } catch (error) {
            console.error('❌ About page initialization failed:', error);
        }
    }

    removeDarkOverlays() {
        console.log('🗑️ Removing dark overlays...');
        
        // Удаляем все темные псевдоэлементы через стили
        const style = document.createElement('style');
        style.textContent = `
            /* Убрать все темные фоны и оверлеи */
            .about-hero::before,
            .about-mission::before,
            .about-cta::before,
            .mission-visual::before,
            .mission-visual::after,
            .speck-design-section::before,
            .mission-text::before,
            .speck-service-card::before,
            .speck-service-card::after,
            .team-member::before,
            .team-member::after {
                display: none !important;
                background: none !important;
                opacity: 0 !important;
            }
            
            /* Прозрачные фоны для секций */
            .about-hero,
            .about-mission,
            .our-story,
            .speck-design-section,
            .our-team,
            .about-cta {
                background: transparent !important;
                background-image: none !important;
            }
            
            /* Светлые карточки */
            .mission-text,
            .mission-feature,
            .speck-service-card,
            .team-member {
                background: rgba(255, 255, 255, 0.08) !important;
                backdrop-filter: blur(15px) saturate(180%) !important;
                -webkit-backdrop-filter: blur(15px) saturate(180%) !important;
                border: 1px solid rgba(255, 255, 255, 0.12) !important;
            }
            
            /* Гарантия видимости блоков */
            .speck-design-section {
                opacity: 1 !important;
                visibility: visible !important;
            }
            
            .speck-service-card {
                opacity: 1 !important;
                visibility: visible !important;
                transform: none !important;
            }
            
            .reveal-left,
            .reveal-right {
                opacity: 1 !important;
                transform: translateX(0) !important;
            }
        `;
        document.head.appendChild(style);
        
        console.log('✅ Dark overlays removed');
    }

    setupHeaderForAboutPage() {
        const header = document.querySelector('.main-header');
        if (header) {
            console.log('✅ Header configured for about page');
        }
    }

    initializeTeamPhotos() {
        const teamPhotos = document.querySelectorAll('.team-member img');
        console.log(`📸 Found ${teamPhotos.length} team photos`);
        
        teamPhotos.forEach((photo, index) => {
            if (!photo.complete) {
                photo.addEventListener('load', () => {
                    console.log(`✅ Photo ${index + 1} loaded`);
                });
                
                photo.addEventListener('error', () => {
                    console.warn(`⚠️ Photo ${index + 1} failed to load`);
                });
            }
        });
    }

    guaranteeSpeckDesignVisibility() {
        console.log('🔍 Ensuring Speck Design blocks are visible...');
        
        const checkAndFix = () => {
            const speckSection = document.querySelector('.speck-design-section');
            const speckCards = document.querySelectorAll('.speck-service-card');
            
            if (speckSection) {
                // Гарантируем видимость секции
                speckSection.style.opacity = '1';
                speckSection.style.visibility = 'visible';
                
                // Гарантируем видимость всех карточек
                speckCards.forEach((card, index) => {
                    card.style.opacity = '1';
                    card.style.visibility = 'visible';
                    card.style.transform = 'translateY(0)';
                    card.style.display = 'block';
                    
                    // Убираем любые анимации, которые могут скрывать
                    card.style.animation = 'none';
                    
                    // Гарантируем z-index
                    card.style.zIndex = '10';
                    card.style.position = 'relative';
                });
                
                console.log(`✅ ${speckCards.length} Speck Design cards guaranteed visible`);
                return true;
            }
            return false;
        };
        
        // Проверяем несколько раз
        setTimeout(checkAndFix, 100);
        setTimeout(checkAndFix, 500);
        setTimeout(checkAndFix, 1000);
        setTimeout(checkAndFix, 2000);
    }

    // ФИКС ДЛЯ ПЕРЕКЛЮЧАТЕЛЯ ЯЗЫКА
    fixLanguageSwitcher() {
        console.log('🔧 Fixing language switcher for about page...');
        
        const fix = () => {
            const langSwitchers = document.querySelectorAll('.language-switcher');
            const langTexts = document.querySelectorAll('.lang-text');
            const langFlags = document.querySelectorAll('.lang-flag');
            const langBtns = document.querySelectorAll('.lang-btn');
            
            langSwitchers.forEach(switcher => {
                switcher.style.display = 'flex';
                switcher.style.visibility = 'visible';
                switcher.style.opacity = '1';
                switcher.style.position = 'relative';
                switcher.style.zIndex = '100';
                switcher.style.pointerEvents = 'auto';
            });
            
            langTexts.forEach(text => {
                text.style.display = 'inline-block';
                text.style.visibility = 'visible';
                text.style.opacity = '1';
                text.style.color = 'rgba(255, 255, 255, 0.85)';
                text.style.fontWeight = '700';
                text.style.fontSize = '14px';
            });
            
            langFlags.forEach(flag => {
                flag.style.display = 'inline-block';
                flag.style.visibility = 'visible';
                flag.style.opacity = '1';
                flag.style.fontSize = '18px';
            });
            
            langBtns.forEach(btn => {
                btn.style.display = 'flex';
                btn.style.visibility = 'visible';
                btn.style.opacity = '1';
                btn.style.alignItems = 'center';
                btn.style.justifyContent = 'center';
                btn.style.gap = '8px';
                btn.style.cursor = 'pointer';
                btn.style.pointerEvents = 'auto';
                btn.style.position = 'relative';
                btn.style.zIndex = '2';
            });
            
            // Гарантируем что переключатель языка виден и работает
            const desktopSwitcher = document.querySelector('.language-switcher.desktop-only');
            if (desktopSwitcher) {
                desktopSwitcher.style.minWidth = '120px';
                desktopSwitcher.style.background = 'rgba(255, 255, 255, 0.08)';
                desktopSwitcher.style.border = '1px solid rgba(255, 255, 255, 0.15)';
                desktopSwitcher.style.borderRadius = '20px';
                desktopSwitcher.style.padding = '4px';
                desktopSwitcher.style.backdropFilter = 'blur(25px)';
                desktopSwitcher.style.webkitBackdropFilter = 'blur(25px)';
            }
            
            console.log('✅ Language switcher fixed');
        };
        
        // Применяем фикс несколько раз
        setTimeout(fix, 100);
        setTimeout(fix, 500);
        setTimeout(fix, 1000);
    }

    setupPageFunctionalities() {
        console.log('⚙️ Setting up page functionalities...');
        
        // Статистика
        const storyStats = document.querySelectorAll('.story-stat');
        storyStats.forEach((stat, index) => {
            setTimeout(() => {
                stat.style.opacity = '1';
            }, index * 100);
        });
        
        // Карточки услуг уже гарантированно видны
        const serviceCards = document.querySelectorAll('.speck-service-card');
        console.log(`💎 ${serviceCards.length} service cards ready`);
    }

    setupContentAnimations() {
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    finalCheck() {
        console.log('🔍 Final check...');
        
        const checks = [
            { selector: '.speck-design-section', name: 'Speck Design section' },
            { selector: '.speck-service-card', name: 'Speck Design cards' },
            { selector: '.team-member', name: 'Team members' },
            { selector: '.language-switcher.desktop-only', name: 'Language switcher' },
            { selector: '.lang-text', name: 'Language text' }
        ];
        
        let allGood = true;
        checks.forEach(check => {
            const elements = document.querySelectorAll(check.selector);
            if (elements.length > 0) {
                // Проверяем видимость первого элемента
                const firstEl = elements[0];
                const rect = firstEl.getBoundingClientRect();
                const isVisible = rect.width > 0 && rect.height > 0;
                
                if (isVisible) {
                    console.log(`✅ ${check.name}: ${elements.length} visible`);
                } else {
                    console.warn(`⚠️ ${check.name}: found but not visible`);
                    allGood = false;
                }
            } else {
                console.warn(`⚠️ ${check.name}: none found`);
                allGood = false;
            }
        });
        
        if (allGood) {
            console.log('✅ All checks passed! About page is fully functional');
        } else {
            console.warn('⚠️ Some checks failed, attempting emergency fixes...');
            this.emergencyFix();
        }
    }

    emergencyFix() {
        console.log('🚨 Applying emergency fixes...');
        
        // Экстренный фикс для Speck Design
        const style = document.createElement('style');
        style.textContent = `
            /* ЭКСТРЕННЫЙ ФИКС: Гарантировать видимость всего */
            .speck-design-section,
            .speck-services-grid,
            .speck-service-card {
                opacity: 1 !important;
                visibility: visible !important;
                display: block !important;
                transform: none !important;
                animation: none !important;
                position: relative !important;
                z-index: 1000 !important;
            }
            
            /* ЭКСТРЕННЫЙ ФИКС ДЛЯ ПЕРЕКЛЮЧАТЕЛЯ ЯЗЫКА */
            .language-switcher,
            .lang-btn,
            .lang-text,
            .lang-flag {
                opacity: 1 !important;
                visibility: visible !important;
                display: flex !important;
                position: relative !important;
                z-index: 1000 !important;
                pointer-events: auto !important;
            }
            
            .language-switcher.desktop-only {
                min-width: 120px !important;
                background: rgba(255, 255, 255, 0.08) !important;
                border: 1px solid rgba(255, 255, 255, 0.15) !important;
                backdrop-filter: blur(25px) !important;
                -webkit-backdrop-filter: blur(25px) !important;
                border-radius: 20px !important;
                padding: 4px !important;
            }
            
            .lang-text {
                display: inline-block !important;
                color: rgba(255, 255, 255, 0.85) !important;
                font-weight: 700 !important;
                font-size: 14px !important;
            }
            
            /* Убрать любые скрывающие эффекты */
            [style*="opacity: 0"],
            [style*="visibility: hidden"],
            [style*="display: none"] {
                opacity: 1 !important;
                visibility: visible !important;
                display: block !important;
            }
        `;
        document.head.appendChild(style);
        
        console.log('✅ Emergency fixes applied');
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 About page DOM loaded, starting initialization...');
    window.aboutPageInstance = new AboutPage();
});

// Экспорт для глобального использования
window.initAbout = function() {
    if (window.aboutPageInstance) {
        window.aboutPageInstance.initializeAboutPage();
    } else {
        window.aboutPageInstance = new AboutPage();
    }
};

console.log('✅ about.js fully loaded with FIXES for language switcher and dark overlays');
