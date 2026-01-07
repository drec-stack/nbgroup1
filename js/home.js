// home.js - ИСПРАВЛЕННЫЙ С ФИКСОМ ДЛЯ ГЛАВНОЙ СТРАНИЦЫ
console.log('🏠 home.js loaded - FORCING HOME PAGE INIT');

// ===== ГЛОБАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ =====
function initializeHomePage() {
    console.log('📄 FORCE INITIALIZING HOME PAGE WITH BACKGROUND');
    
    // ПРИНУДИТЕЛЬНО ДОБАВЛЯЕМ КЛАСС ДЛЯ ГЛАВНОЙ СТРАНИЦЫ
    document.body.classList.add('home-page');
    document.documentElement.classList.add('home-page');
    
    // ЭКСТРЕННЫЙ CSS ФИКС - УБИРАЕМ БЕЛЫЙ ФОН
    const emergencyCSS = `
        /* ЭКСТРЕННЫЙ ФИКС: УБИРАЕМ БЕЛЫЙ ФОН */
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
        }
        
        .bg-layer {
            display: block !important;
            opacity: 0 !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background-size: cover !important;
            background-position: center !important;
            transition: opacity 1s ease !important;
        }
        
        .bg-layer.active {
            opacity: 1 !important;
            z-index: 2 !important;
        }
        
        /* ЧЕРНЫЙ НАЛОЖЕНИЕ ДЛЯ ЧИТАЕМОСТИ */
        .bg-layer::before {
            content: '' !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: rgba(0, 0, 0, 0.4) !important;
            z-index: 1 !important;
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
        
        /* УБИРАЕМ ВСЕ ДРУГИЕ ФОНЫ */
        body.home-page * {
            background-color: transparent !important;
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
        }
    `;
    
    // ВСТАВЛЯЕМ ЭКСТРЕННЫЙ CSS
    const style = document.createElement('style');
    style.textContent = emergencyCSS;
    document.head.appendChild(style);
    
    console.log('✅ Emergency CSS injected');
    
    // АКТИВИРУЕМ ПЕРВЫЙ ФОНОВЫЙ СЛОЙ
    setTimeout(() => {
        const bgLayers = document.querySelectorAll('.bg-layer');
        console.log(`🎨 Found ${bgLayers.length} background layers`);
        
        if (bgLayers.length > 0) {
            // Активируем только первый слой
            bgLayers[0].classList.add('active');
            console.log('✅ First background layer activated');
            
            // Показываем контейнер
            const container = document.querySelector('.bg-layers-container');
            if (container) {
                container.classList.add('loaded');
                container.style.opacity = '1';
                console.log('✅ Background container activated');
            }
        } else {
            console.error('❌ No background layers found!');
            // Создаем фоновые слои динамически если их нет
            createBackgroundLayers();
        }
    }, 100);
    
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
        `;
        
        const images = [
            'assets/images/parallax/bg-1.jpg',
            'assets/images/parallax/bg-2.jpg',
            'assets/images/parallax/bg-3.jpg',
            'assets/images/parallax/bg-4.jpg'
        ];
        
        images.forEach((src, index) => {
            const layer = document.createElement('div');
            layer.className = 'bg-layer';
            if (index === 0) layer.classList.add('active');
            layer.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: url('${src}');
                background-size: cover;
                background-position: center;
                opacity: ${index === 0 ? '1' : '0'};
                transition: opacity 1s ease;
            `;
            container.appendChild(layer);
        });
        
        document.body.insertBefore(container, document.body.firstChild);
        console.log('✅ Background layers created dynamically');
    }
    
    // ЗАПУСКАЕМ БАЗОВЫЕ ФУНКЦИИ
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
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = `${scrollPercent}%`;
        });
    }
    
    console.log('✅ Basic functions initialized');
}

// ===== ЗАПУСК ПРИ ЗАГРУЗКЕ =====
console.log('🚀 Starting FORCED home page initialization...');

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeHomePage);
} else {
    initializeHomePage();
}

// ГЛОБАЛЬНЫЙ ФИКС ДЛЯ ВСЕХ СТРАНИЦ
window.addEventListener('load', () => {
    console.log('🌍 Page fully loaded, applying final fixes...');
    
    // УБЕДИТЕСЬ ЧТО ФОН УБРАН
    document.body.style.backgroundColor = 'transparent';
    document.body.style.backgroundImage = 'none';
    
    // УБЕДИТЕСЬ ЧТО КЛАСС ЕСТЬ
    if (!document.body.classList.contains('home-page')) {
        document.body.classList.add('home-page');
    }
});

console.log('✅ FORCED home.js loaded - will force home page background');
