// home.js - ИСПРАВЛЕННЫЙ С ВИСЯЩИМ ТЕКСТОМ И БЕЗ ЧЕРНОГО OVERLAY
console.log('🏠 home.js loaded - VISIBLE BACKGROUND WITH FLOATING TEXT, NO BLACK OVERLAY');

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
        .stat-card,
        .speck-marquee-wrapper,
        .cta-content-improved {
            background: rgba(255, 255, 255, 0.1) !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
            border: 1px solid rgba(255, 255, 255, 0.15) !important;
        }
        
        /* СТЕКЛЯННЫЙ ЭФФЕКТ ТОЛЬКО ДЛЯ КНОПОК */
        .hero-actions .btn {
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
            // Активируем ВСЕ слои БЕЗ темного overlay
            bgLayers.forEach((layer, index) => {
                layer.style.opacity = '1';
                layer.style.display = 'block';
                layer.style.visibility = 'visible';
                layer.classList.add('active');
                
                // Убираем любой inline overlay из background
                if (layer.style.background && layer.style.background.includes('rgba(0,0,0')) {
                    layer.style.background = layer.style.background.replace(/rgba\(0,\s*0,\s*0,\s*[0-9.]+\),?\s*/g, '');
                }
                
                console.log(`✅ Background layer ${index + 1} activated WITHOUT overlay`);
            });
            
            // Показываем контейнер
            if (bgContainer) {
                bgContainer.style.display = 'block';
                bgContainer.style.opacity = '1';
                bgContainer.style.visibility = 'visible';
                console.log('✅ Background container activated');
            }
        } else {
            console.error('❌ No background layers found!');
            // Создаем фоновые слои динамически если их нет
            createBackgroundLayers();
        }
        
        // 4. Убираем все фоны с текстовых блоков
        const textContainers = document.querySelectorAll('.text-backdrop-enhanced, .hero-description');
        textContainers.forEach(container => {
            container.style.backgroundColor = 'transparent';
            container.style.backdropFilter = 'none';
            container.style.webkitBackdropFilter = 'none';
            container.style.border = 'none';
            container.style.boxShadow = 'none';
            container.style.padding = '0';
            container.style.margin = '0 auto';
        });
        
        // Убираем фон со всех секций
        const sections = document.querySelectorAll('section, .hero, .content-section');
        sections.forEach(section => {
            section.style.backgroundColor = 'transparent';
            section.style.background = 'transparent';
        });
        
        console.log('✅ All black overlays removed - floating text effect applied');
    }, 100);
    
    // Функция создания фоновых слоев БЕЗ overlay
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
            
            // НЕ добавляем темное наложение - оставляем чистые изображения
            container.appendChild(layer);
        });
        
        document.body.insertBefore(container, document.body.firstChild);
        console.log('✅ Background layers created WITHOUT overlays');
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
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = `${scrollPercent}%`;
        });
        
        // Инициализируем начальное состояние
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${scrollPercent}%`;
    }
    
    // 4. НАСТРОЙКА БЕГУЩЕЙ СТРОКИ
    const marqueeTrack = document.querySelector('.speck-marquee-track');
    if (marqueeTrack) {
        // Гарантируем что анимация работает
        marqueeTrack.style.animationPlayState = 'running';
        
        // Обработчик паузы при наведении
        marqueeTrack.addEventListener('mouseenter', () => {
            marqueeTrack.style.animationPlayState = 'paused';
        });
        
        marqueeTrack.addEventListener('mouseleave', () => {
            marqueeTrack.style.animationPlayState = 'running';
        });
    }
    
    // 5. ДОПОЛНИТЕЛЬНЫЙ ФИКС ДЛЯ ТЕКСТА И OVERLAY
    setTimeout(() => {
        // Убираем любые возможные фоны
        const heroText = document.querySelector('.hero-content > div');
        if (heroText) {
            heroText.style.backgroundColor = 'transparent';
            heroText.style.background = 'transparent';
            heroText.style.backdropFilter = 'none';
            heroText.style.webkitBackdropFilter = 'none';
            heroText.style.border = 'none';
            heroText.style.boxShadow = 'none';
        }
        
        // Убираем все overlay элементы
        const overlayElements = document.querySelectorAll('[class*="overlay"], [class*="dark-bg"], [class*="black"]');
        overlayElements.forEach(el => {
            el.style.display = 'none';
            el.style.opacity = '0';
            el.style.visibility = 'hidden';
        });
        
        // Убираем черный фон с body и html
        document.body.style.backgroundColor = 'transparent';
        document.documentElement.style.backgroundColor = 'transparent';
        
    }, 300);
    
    console.log('✅ Basic functions initialized');
}

// ===== ЗАПУСК ПРИ ЗАГРУЗКЕ =====
console.log('🚀 Starting home page initialization WITHOUT black overlay...');

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeHomePage);
} else {
    initializeHomePage();
}

// ГЛОБАЛЬНЫЙ ФИКС ДЛЯ ВСЕХ СТРАНИЦ
window.addEventListener('load', () => {
    console.log('🌍 Page fully loaded, applying final fixes WITHOUT black overlay...');
    
    // ДОПОЛНИТЕЛЬНАЯ ПРОВЕРКА ФОНА И ТЕКСТА
    setTimeout(() => {
        const bgContainer = document.querySelector('.bg-layers-container');
        const bgLayers = document.querySelectorAll('.bg-layer');
        
        if (bgContainer && bgLayers.length > 0) {
            // Гарантируем видимость БЕЗ overlay
            bgContainer.style.display = 'block';
            bgContainer.style.opacity = '1';
            
            bgLayers.forEach(layer => {
                layer.style.opacity = '1';
                layer.style.display = 'block';
                
                // Финалная проверка - убираем остатки overlay
                if (layer.style.background && layer.style.background.includes('rgba(0,0,0')) {
                    layer.style.background = layer.style.background.replace(/rgba\(0,\s*0,\s*0,\s*[0-9.]+\),?\s*/g, '');
                }
            });
            
            console.log('✅ Final background check passed - NO overlay');
        }
        
        // ФИНАЛЬНЫЙ ФИКС ДЛЯ ТЕКСТА
        const textBlocks = document.querySelectorAll('.hero-content > div, .hero-description');
        textBlocks.forEach(block => {
            if (block) {
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
        document.body.style.background = 'transparent';
        document.body.style.backgroundColor = 'transparent';
        document.documentElement.style.background = 'transparent';
        document.documentElement.style.backgroundColor = 'transparent';
        
        // Удаляем элементы с черным фоном
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

// ЭКСТРЕННЫЙ ФИКС ДЛЯ НЕМЕДЛЕННОГО УДАЛЕНИЯ ЧЕРНОГО OVERLAY
(function immediateFix() {
    'use strict';
    
    console.log('🚨 IMMEDIATE FIX: Removing black background on load');
    
    // Немедленно убираем черный фон
    document.body.style.backgroundColor = 'transparent';
    document.documentElement.style.backgroundColor = 'transparent';
    
    // Убираем overlay с фоновых слоев если они уже есть
    const bgLayers = document.querySelectorAll('.bg-layer');
    bgLayers.forEach(layer => {
        if (layer && layer.style) {
            // Убираем opacity overlay
            if (layer.style.opacity && parseFloat(layer.style.opacity) < 1) {
                layer.style.opacity = '1';
            }
            
            // Убираем фильтры
            if (layer.style.filter && layer.style.filter.includes('brightness')) {
                layer.style.filter = 'none';
            }
        }
    });
    
    console.log('✅ Immediate black background fix applied');
})();

console.log('✅ home.js loaded - will create floating text effect WITHOUT black overlay');
