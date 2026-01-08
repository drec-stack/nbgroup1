// home.js - ИСПРАВЛЕННЫЙ С ВИСЯЩИМ ТЕКСТОМ
console.log('🏠 home.js loaded - VISIBLE BACKGROUND WITH FLOATING TEXT');

// ===== ГЛОБАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ =====
function initializeHomePage() {
    console.log('📄 INITIALIZING HOME PAGE WITH VISIBLE BACKGROUND AND FLOATING TEXT');
    
    // 1. ГАРАНТИРУЕМ КЛАСС ДЛЯ ГЛАВНОЙ СТРАНИЦЫ
    document.body.classList.add('home-page');
    document.documentElement.classList.add('home-page');
    
    // 2. ЭКСТРЕННЫЙ CSS ФИКС - ВИСЯЩИЙ ТЕКСТ БЕЗ ФОНА
    const emergencyCSS = `
        /* ЭКСТРЕННЫЙ ФИКС: ВСЕ ФОНЫ ВИДНЫ */
        body.home-page {
            background: transparent !important;
            background-color: transparent !important;
            background-image: none !important;
        }
        
        /* АКТИВИРУЕМ ФОНОВЫЕ СЛОИ */
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
        
        /* ВСЕ 4 СЛОЯ ВИДНЫ */
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
        
        /* ТЕМНОЕ НАЛОЖЕНИЕ ДЛЯ ЧИТАЕМОСТИ */
        .bg-layer::before {
            content: '' !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: rgba(0, 0, 0, 0.4) !important;
            z-index: 5 !important;
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
        
        /* ФИКС ДЛЯ СТЕКЛЯННЫХ КАРТОЧЕК (остальные элементы) */
        .speck-feature-column,
        .stat-card,
        .speck-marquee-wrapper,
        .cta-content-improved {
            background: rgba(0, 0, 0, 0.5) !important;
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
    `;
    
    // ВСТАВЛЯЕМ ЭКСТРЕННЫЙ CSS
    const style = document.createElement('style');
    style.textContent = emergencyCSS;
    document.head.appendChild(style);
    
    console.log('✅ Emergency CSS injected for floating text');
    
    // 3. ПРИНУДИТЕЛЬНАЯ АКТИВАЦИЯ ФОНОВЫХ СЛОЕВ
    setTimeout(() => {
        const bgLayers = document.querySelectorAll('.bg-layer');
        const bgContainer = document.querySelector('.bg-layers-container');
        
        console.log(`🎨 Found ${bgLayers.length} background layers`);
        
        if (bgLayers.length > 0) {
            // Активируем ВСЕ слои
            bgLayers.forEach((layer, index) => {
                layer.style.opacity = '1';
                layer.style.display = 'block';
                layer.style.visibility = 'visible';
                layer.classList.add('active');
                console.log(`✅ Background layer ${index + 1} activated`);
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
        });
        
        console.log('✅ Floating text effect applied - no backgrounds');
    }, 100);
    
    // Функция создания фоновых слоев
    function createBackgroundLayers() {
        console.log('🔄 Creating background layers dynamically...');
        
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
            
            // Добавляем темное наложение
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.4);
                z-index: 1;
            `;
            layer.appendChild(overlay);
            
            container.appendChild(layer);
        });
        
        document.body.insertBefore(container, document.body.firstChild);
        console.log('✅ Background layers created dynamically');
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
    
    // 5. ДОПОЛНИТЕЛЬНЫЙ ФИКС ДЛЯ ТЕКСТА
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
    }, 300);
    
    console.log('✅ Basic functions initialized');
}

// ===== ЗАПУСК ПРИ ЗАГРУЗКЕ =====
console.log('🚀 Starting home page initialization with floating text...');

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeHomePage);
} else {
    initializeHomePage();
}

// ГЛОБАЛЬНЫЙ ФИКС ДЛЯ ВСЕХ СТРАНИЦ
window.addEventListener('load', () => {
    console.log('🌍 Page fully loaded, applying final fixes for floating text...');
    
    // ДОПОЛНИТЕЛЬНАЯ ПРОВЕРКА ФОНА И ТЕКСТА
    setTimeout(() => {
        const bgContainer = document.querySelector('.bg-layers-container');
        const bgLayers = document.querySelectorAll('.bg-layer');
        
        if (bgContainer && bgLayers.length > 0) {
            // Гарантируем видимость
            bgContainer.style.display = 'block';
            bgContainer.style.opacity = '1';
            
            bgLayers.forEach(layer => {
                layer.style.opacity = '1';
                layer.style.display = 'block';
            });
            
            console.log('✅ Final background check passed');
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
        
        console.log('✅ Final text transparency check passed');
    }, 500);
});

// ГЛОБАЛЬНАЯ ФУНКЦИЯ ДЛЯ ПЕРЕЗАПУСКА ФОНА
window.reinitializeHomeBackground = function() {
    console.log('🔄 Reinitializing home background with floating text...');
    initializeHomePage();
};

console.log('✅ home.js loaded - will create floating text effect');
