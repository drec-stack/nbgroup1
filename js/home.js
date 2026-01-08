// home.js - ИСПРАВЛЕННЫЙ С ВИСЯЩИМ ТЕКСТОМ И БЕЗ ЧЕРНОГО OVERLAY
console.log('🏠 home.js loaded - VISIBLE BACKGROUND WITH FLOATING TEXT, NO BLACK OVERLAY');

// ===== ЭКСТРЕННЫЙ ФИКС - ПРОВЕРКА ДОСТУПНОСТИ DOM =====
(function immediateFix() {
    'use strict';
    
    function safeImmediateFix() {
        if (!document.body) {
            console.log('⚠️ document.body not ready, retrying...');
            setTimeout(safeImmediateFix, 50);
            return;
        }
        
        console.log('🚨 IMMEDIATE FIX: Removing black background on load');
        
        document.body.style.backgroundColor = 'transparent';
        document.documentElement.style.backgroundColor = 'transparent';
        
        const bgLayers = document.querySelectorAll('.bg-layer');
        bgLayers.forEach(layer => {
            if (layer && layer.style) {
                if (layer.style.opacity && parseFloat(layer.style.opacity) < 1) {
                    layer.style.opacity = '1';
                }
                
                if (layer.style.filter && layer.style.filter.includes('brightness')) {
                    layer.style.filter = 'none';
                }
            }
        });
        
        // ФИКС ДЛЯ ВИСЯЩЕЙ СЕКЦИИ
        const floatingContent = document.querySelector('.floating-content');
        if (floatingContent && floatingContent.style) {
            floatingContent.style.backgroundColor = 'transparent';
            floatingContent.style.backdropFilter = 'none';
            floatingContent.style.webkitBackdropFilter = 'none';
            floatingContent.style.border = 'none';
            floatingContent.style.boxShadow = 'none';
        }
        
        console.log('✅ Immediate black background fix applied');
    }
    
    safeImmediateFix();
})();

// ===== ГЛОБАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ =====
function initializeHomePage() {
    console.log('📄 INITIALIZING HOME PAGE WITH VISIBLE BACKGROUND - NO BLACK OVERLAY');
    
    // 1. ГАРАНТИРУЕМ КЛАСС ДЛЯ ГЛАВНОЙ СТРАНИЦЫ
    document.body.classList.add('home-page');
    document.documentElement.classList.add('home-page');
    
    // 2. ЭКСТРЕННЫЙ CSS ФИКС - ВИСЯЩИЙ ТЕКСТ БЕЗ ФОНА И ЧЕРНОГО OVERLAY
    const emergencyCSS = `
        /* ЭКСТРЕННЫЙ ФИКС: УДАЛИТЬ ВСЕ ЧЕРНЫЕ ФОНЫ И OVERLAY */
        body.home-page {
            background: transparent !important;
            background-color: transparent !important;
            background-image: none !important;
        }
        
        /* УДАЛИТЬ ТЕМНОЕ НАЛОЖЕНИЕ С ФОНОВЫХ СЛОЕВ */
        .bg-layer::before,
        .bg-layer::after {
            display: none !important;
            background: transparent !important;
            opacity: 0 !important;
            content: none !important;
        }
        
        /* АКТИВИРУЕМ ФОНОВЫЕ СЛОИ БЕЗ OVERLAY */
        .bg-layers-container {
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
            z-index: 1 !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100vh !important;
            pointer-events: none;
        }
        
        .bg-layer {
            display: block !important;
            opacity: 1 !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background-size: cover !important;
            background-position: center !important;
            visibility: visible !important;
        }
        
        /* ВСЕ 4 СЛОЯ ВИДНЫ БЕЗ OVERLAY */
        .bg-layer:nth-child(1) {
            z-index: 4;
            background-image: url('assets/images/parallax/bg-1.jpg') !important;
        }
        
        .bg-layer:nth-child(2) {
            z-index: 3;
            background-image: url('assets/images/parallax/bg-2.jpg') !important;
        }
        
        .bg-layer:nth-child(3) {
            z-index: 2;
            background-image: url('assets/images/parallax/bg-3.jpg') !important;
        }
        
        .bg-layer:nth-child(4) {
            z-index: 1;
            background-image: url('assets/images/parallax/bg-4.jpg') !important;
        }
        
        /* ВИСЯЩИЙ ТЕКСТ - БЕЗ ФОНА */
        .hero-content > div:not(.hero-actions) {
            background: transparent !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
        }
        
        .hero-description {
            background: transparent !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
        }
        
        /* ВИСЯЩАЯ СЕКЦИЯ "Готовы начать ваш проект?" - БЕЗ ФОНА */
        .floating-content {
            background: transparent !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
        }
        
        .floating-title,
        .floating-subtitle {
            text-shadow: 
                0 4px 35px rgba(0, 0, 0, 0.95),
                0 3px 30px rgba(0, 0, 0, 0.9),
                0 2px 25px rgba(0, 0, 0, 0.85) !important;
            color: rgba(255, 255, 255, 0.98) !important;
            position: relative;
            z-index: 20;
        }
        
        /* УЛУЧШАЕМ ВИДИМОСТЬ ТЕКСТА */
        .hero h1,
        .hero-subtitle,
        .hero-description p {
            text-shadow: 
                0 4px 35px rgba(0, 0, 0, 0.95),
                0 3px 30px rgba(0, 0, 0, 0.9),
                0 2px 25px rgba(0, 0, 0, 0.85) !important;
            color: rgba(255, 255, 255, 0.98) !important;
            position: relative;
            z-index: 20;
        }
        
        /* УБРАТЬ ФОН С ВСЕХ СЕКЦИЙ */
        section, .section, .hero, .content-section {
            background: transparent !important;
            background-color: transparent !important;
        }
        
        /* ФИКС ДЛЯ СТЕКЛЯННЫХ КАРТОЧЕК (остальные элементы) */
        .speck-feature-column,
        .stat-card {
            background: rgba(25, 25, 25, 0.8) !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
            border: 1px solid rgba(255, 255, 255, 0.15) !important;
        }
        
        /* СТЕКЛЯННЫЙ ЭФФЕКТ ТОЛЬКО ДЛЯ КНОПОК */
        .hero-actions .btn,
        .floating-button {
            background: rgba(0, 102, 255, 0.25) !important;
            backdrop-filter: blur(15px) !important;
            -webkit-backdrop-filter: blur(15px) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
        }
        
        /* УДАЛИТЬ ВСЕ ДОПОЛНИТЕЛЬНЫЕ OVERLAY */
        [class*="overlay"],
        [class*="dark-bg"],
        [class*="black-bg"] {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
        }
    `;
    
    // ВСТАВЛЯЕМ ЭКСТРЕННЫЙ CSS
    const style = document.createElement('style');
    style.textContent = emergencyCSS;
    document.head.appendChild(style);
    
    console.log('✅ Emergency CSS injected - NO black overlay');
    
    // 3. ПРИНУДИТЕЛЬНАЯ АКТИВАЦИЯ ФОНОВЫХ СЛОЕВ БЕЗ OVERLAY
    setTimeout(() => {
        const bgLayers = document.querySelectorAll('.bg-layer');
        const bgContainer = document.querySelector('.bg-layers-container');
        
        console.log(`🎨 Found ${bgLayers.length} background layers - activating WITHOUT overlay`);
        
        if (bgLayers.length > 0) {
            bgLayers.forEach((layer, index) => {
                if (layer && layer.style) {
                    layer.style.opacity = '1';
                    layer.style.display = 'block';
                    layer.style.visibility = 'visible';
                    layer.classList.add('active');
                    
                    if (layer.style.background && layer.style.background.includes('rgba(0,0,0')) {
                        layer.style.background = layer.style.background.replace(/rgba\(0,\s*0,\s*0,\s*[0-9.]+\),?\s*/g, '');
                    }
                    
                    console.log(`✅ Background layer ${index + 1} activated WITHOUT overlay`);
                }
            });
            
            if (bgContainer && bgContainer.style) {
                bgContainer.style.display = 'block';
                bgContainer.style.opacity = '1';
                bgContainer.style.visibility = 'visible';
                console.log('✅ Background container activated');
            }
        } else {
            console.error('❌ No background layers found!');
            createBackgroundLayers();
        }
        
        // 4. Убираем все фоны с текстовых блоков
        const textContainers = document.querySelectorAll('.text-backdrop-enhanced, .hero-description, .floating-content');
        textContainers.forEach(container => {
            if (container && container.style) {
                container.style.backgroundColor = 'transparent';
                container.style.backdropFilter = 'none';
                container.style.webkitBackdropFilter = 'none';
                container.style.border = 'none';
                container.style.boxShadow = 'none';
                container.style.padding = '0';
                container.style.margin = '0 auto';
            }
        });
        
        // Убираем фон со всех секций
        const sections = document.querySelectorAll('section, .hero, .content-section');
        sections.forEach(section => {
            if (section && section.style) {
                section.style.backgroundColor = 'transparent';
                section.style.background = 'transparent';
            }
        });
        
        // СПЕЦИАЛЬНЫЙ ФИКС ДЛЯ ВИСЯЩЕЙ СЕКЦИИ
        const floatingSection = document.querySelector('.floating-section');
        if (floatingSection && floatingSection.style) {
            floatingSection.style.backgroundColor = 'transparent';
            floatingSection.style.background = 'transparent';
        }
        
        console.log('✅ All black overlays removed - floating text effect applied');
    }, 100);
    
    function createBackgroundLayers() {
        console.log('🔄 Creating background layers dynamically WITHOUT overlays...');
        
        const container = document.createElement('div');
        container.className = 'bg-layers-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            z-index: 1;
            opacity: 1;
            display: block;
            pointer-events: none;
        `;
        
        const images = [
            'assets/images/parallax/bg-1.jpg',
            'assets/images/parallax/bg-2.jpg',
            'assets/images/parallax/bg-3.jpg',
            'assets/images/parallax/bg-4.jpg'
        ];
        
        images.forEach((src, index) => {
            const layer = document.createElement('div');
            layer.className = 'bg-layer active';
            layer.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: url('${src}');
                background-size: cover;
                background-position: center;
                opacity: 1;
                display: block;
                z-index: ${4 - index};
            `;
            
            container.appendChild(layer);
        });
        
        if (document.body) {
            document.body.insertBefore(container, document.body.firstChild);
            console.log('✅ Background layers created WITHOUT overlays');
        }
    }
    
    // 5. ЗАПУСКАЕМ БАЗОВЫЕ ФУНКЦИИ
    initializeBasicFunctions();
}

function initializeBasicFunctions() {
    console.log('🔄 Initializing basic functions...');
    
    // 1. ИНИЦИАЛИЗАЦИЯ СТАТИСТИКИ
    const statNumbers = document.querySelectorAll('.stat-number-improved');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target')) || 0;
        if (target > 0) {
            stat.textContent = target;
        }
    });
    
    // 2. АНИМАЦИИ ДЛЯ БЛОКОВ
    const animatedBlocks = document.querySelectorAll('.speck-vertical-block');
    animatedBlocks.forEach((block, index) => {
        setTimeout(() => {
            block.classList.add('visible');
        }, index * 200);
    });
    
    // 3. ПРОГРЕСС БАР СКРОЛЛА
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar && progressBar.style) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = `${scrollPercent}%`;
        });
        
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${scrollPercent}%`;
    }
    
    // 4. ДОПОЛНИТЕЛЬНЫЙ ФИКС ДЛЯ ТЕКСТА И OVERLAY
    setTimeout(() => {
        // Убираем любые возможные фоны
        const heroText = document.querySelector('.hero-content > div');
        if (heroText && heroText.style) {
            heroText.style.backgroundColor = 'transparent';
            heroText.style.background = 'transparent';
            heroText.style.backdropFilter = 'none';
            heroText.style.webkitBackdropFilter = 'none';
            heroText.style.border = 'none';
            heroText.style.boxShadow = 'none';
        }
        
        // ФИКС ДЛЯ ВИСЯЩЕЙ СЕКЦИИ
        const floatingContent = document.querySelector('.floating-content');
        if (floatingContent && floatingContent.style) {
            floatingContent.style.backgroundColor = 'transparent';
            floatingContent.style.background = 'transparent';
            floatingContent.style.backdropFilter = 'none';
            floatingContent.style.webkitBackdropFilter = 'none';
            floatingContent.style.border = 'none';
            floatingContent.style.boxShadow = 'none';
            floatingContent.style.padding = '0';
        }
        
        // Убираем все overlay элементы
        const overlayElements = document.querySelectorAll('[class*="overlay"], [class*="dark-bg"], [class*="black"]');
        overlayElements.forEach(el => {
            if (el && el.style) {
                el.style.display = 'none';
                el.style.opacity = '0';
                el.style.visibility = 'hidden';
            }
        });
        
        // Убираем черный фон с body и html
        if (document.body && document.body.style) {
            document.body.style.backgroundColor = 'transparent';
        }
        if (document.documentElement && document.documentElement.style) {
            document.documentElement.style.backgroundColor = 'transparent';
        }
        
    }, 300);
    
    console.log('✅ Basic functions initialized');
}

// ===== ЗАПУСК ПРИ ЗАГРУЗКЕ =====
console.log('🚀 Starting home page initialization WITHOUT black overlay...');

function safeInitialize() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeHomePage);
    } else if (document.body) {
        initializeHomePage();
    } else {
        console.log('⚠️ Waiting for document.body to be ready...');
        setTimeout(safeInitialize, 50);
    }
}

safeInitialize();

// ГЛОБАЛЬНЫЙ ФИКС ДЛЯ ВСЕХ СТРАНИЦ
window.addEventListener('load', () => {
    console.log('🌍 Page fully loaded, applying final fixes WITHOUT black overlay...');
    
    setTimeout(() => {
        const bgContainer = document.querySelector('.bg-layers-container');
        const bgLayers = document.querySelectorAll('.bg-layer');
        
        if (bgContainer && bgLayers.length > 0) {
            if (bgContainer.style) {
                bgContainer.style.display = 'block';
                bgContainer.style.opacity = '1';
            }
            
            bgLayers.forEach(layer => {
                if (layer && layer.style) {
                    layer.style.opacity = '1';
                    layer.style.display = 'block';
                    
                    if (layer.style.background && layer.style.background.includes('rgba(0,0,0')) {
                        layer.style.background = layer.style.background.replace(/rgba\(0,\s*0,\s*0,\s*[0-9.]+\),?\s*/g, '');
                    }
                }
            });
            
            console.log('✅ Final background check passed - NO overlay');
        }
        
        // ФИНАЛЬНЫЙ ФИКС ДЛЯ ВИСЯЩЕЙ СЕКЦИИ
        const floatingContent = document.querySelector('.floating-content');
        if (floatingContent && floatingContent.style) {
            floatingContent.style.backgroundColor = 'transparent';
            floatingContent.style.background = 'transparent';
            floatingContent.style.backdropFilter = 'none';
            floatingContent.style.webkitBackdropFilter = 'none';
            floatingContent.style.border = 'none';
            floatingContent.style.boxShadow = 'none';
            floatingContent.style.padding = '0';
        }
        
        // ФИНАЛЬНЫЙ ФИКС ДЛЯ ВСЕГО ТЕКСТА
        const textBlocks = document.querySelectorAll('.hero-content > div, .hero-description, .floating-title, .floating-subtitle');
        textBlocks.forEach(block => {
            if (block && block.style) {
                block.style.backgroundColor = 'transparent';
                block.style.background = 'transparent';
                block.style.backdropFilter = 'none';
                block.style.webkitBackdropFilter = 'none';
                block.style.border = 'none';
                block.style.boxShadow = 'none';
                block.style.padding = '0';
            }
        });
        
        // УДАЛЯЕМ ВСЕ ОСТАТКИ ЧЕРНОГО ФОНА
        if (document.body && document.body.style) {
            document.body.style.background = 'transparent';
            document.body.style.backgroundColor = 'transparent';
        }
        if (document.documentElement && document.documentElement.style) {
            document.documentElement.style.background = 'transparent';
            document.documentElement.style.backgroundColor = 'transparent';
        }
        
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            if (el && el.style) {
                if (el.style.background && el.style.background.includes('#0a0a0a')) {
                    el.style.background = 'transparent';
                }
                if (el.style.backgroundColor && el.style.backgroundColor.includes('#0a0a0a')) {
                    el.style.backgroundColor = 'transparent';
                }
            }
        });
        
        console.log('✅ Final black overlay removal complete');
    }, 500);
});

// ГЛОБАЛЬНАЯ ФУНКЦИЯ ДЛЯ ПЕРЕЗАПУСКА ФОНА
window.reinitializeHomeBackground = function() {
    console.log('🔄 Reinitializing home background WITHOUT black overlay...');
    initializeHomePage();
};

console.log('✅ home.js loaded - will create floating text effect WITHOUT black overlay');
