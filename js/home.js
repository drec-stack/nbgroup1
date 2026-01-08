// home.js - ИСПРАВЛЕННЫЙ С ФИКСОМ ДЛЯ ФОНА ГЛАВНОЙ СТРАНИЦЫ
console.log('🏠 home.js loaded - FORCING HOME PAGE BACKGROUND');

// ===== ГЛОБАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ =====
function initializeHomePage() {
    console.log('📄 INITIALIZING HOME PAGE WITH VISIBLE BACKGROUND');
    
    // 1. ГАРАНТИРУЕМ КЛАСС ДЛЯ ГЛАВНОЙ СТРАНИЦЫ
    document.body.classList.add('home-page');
    document.documentElement.classList.add('home-page');
    
    // 2. ЭКСТРЕННЫЙ CSS ФИКС - УБИРАЕМ БЕЛЫЙ ФОН И ПОКАЗЫВАЕМ ФОНЫ
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
        
        /* ДЕЛАЕМ СЕКЦИИ ПРОЗРАЧНЫМИ */
        .hero, 
        .content-section,
        .section {
            background: transparent !important;
            position: relative;
            z-index: 10;
        }
        
        /* УЛУЧШАЕМ ВИДИМОСТЬ ТЕКСТА */
        .hero h1,
        .hero-subtitle,
        .hero-description p,
        .section-title,
        .section-subtitle,
        .cta-text h2,
        .speck-block-title,
        .speck-block-subtitle,
        .speck-brand,
        .stat-number-improved,
        .stat-label-improved {
            text-shadow: 
                0 3px 25px rgba(0, 0, 0, 0.95),
                0 2px 20px rgba(0, 0, 0, 0.85),
                0 1px 15px rgba(0, 0, 0, 0.75) !important;
            position: relative;
            z-index: 20;
        }
        
        /* ФИКС ДЛЯ СТЕКЛЯННЫХ КАРТОЧЕК */
        .text-backdrop-enhanced,
        .speck-feature-column,
        .stat-card,
        .speck-marquee-wrapper,
        .cta-content-improved {
            background: rgba(0, 0, 0, 0.5) !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
            border: 1px solid rgba(255, 255, 255, 0.15) !important;
        }
    `;
    
    // ВСТАВЛЯЕМ ЭКСТРЕННЫЙ CSS
    const style = document.createElement('style');
    style.textContent = emergencyCSS;
    document.head.appendChild(style);
    
    console.log('✅ Emergency CSS injected');
    
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
        
        // 4. Убираем белый фон со всего
        document.body.style.backgroundColor = 'transparent';
        document.body.style.backgroundImage = 'none';
        
        // Убираем фон со всех секций
        const sections = document.querySelectorAll('section, .hero, .content-section');
        sections.forEach(section => {
            section.style.backgroundColor = 'transparent';
        });
        
        console.log('✅ White background removed from all elements');
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
    
    console.log('✅ Basic functions initialized');
}

// ===== ЗАПУСК ПРИ ЗАГРУЗКЕ =====
console.log('🚀 Starting home page initialization...');

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeHomePage);
} else {
    initializeHomePage();
}

// ГЛОБАЛЬНЫЙ ФИКС ДЛЯ ВСЕХ СТРАНИЦ
window.addEventListener('load', () => {
    console.log('🌍 Page fully loaded, applying final fixes...');
    
    // ДОПОЛНИТЕЛЬНАЯ ПРОВЕРКА ФОНА
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
    }, 500);
});

// ГЛОБАЛЬНАЯ ФУНКЦИЯ ДЛЯ ПЕРЕЗАПУСКА ФОНА
window.reinitializeHomeBackground = function() {
    console.log('🔄 Reinitializing home background...');
    initializeHomePage();
};

console.log('✅ home.js loaded - will force home page background');
