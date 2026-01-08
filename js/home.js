// home.js - ИСПРАВЛЕННЫЙ С ВИСЯЩИМ ТЕКСТОМ И НОВЫМИ БЛОКАМИ SPECK DESIGN
console.log('🏠 home.js loaded - VISIBLE BACKGROUND WITH FLOATING TEXT AND SPECK DESIGN BLOCKS');

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
    console.log('📄 INITIALIZING HOME PAGE WITH SPECK DESIGN BLOCKS');
    
    // 1. ГАРАНТИРУЕМ КЛАСС ДЛЯ ГЛАВНОЙ СТРАНИЦЫ
    document.body.classList.add('home-page');
    document.documentElement.classList.add('home-page');
    
    // 2. ЭКСТРЕННЫЙ CSS ФИКС - ВИСЯЩИЙ ТЕКСТ БЕЗ ФОНА И ЧЕРНОГО OVERLAY ДЛЯ ВСЕХ БЛОКОВ
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
        
        /* ВИСЯЩИЙ ТЕКСТ - БЕЗ ФОНА ВО ВСЕХ БЛОКАХ */
        .hero-content > div:not(.hero-actions),
        .projects-grid,
        .services-grid,
        .journals-list,
        .faq-list {
            background: transparent !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
        }
        
        .hero-description,
        .project-card,
        .service-item,
        .journal-item,
        .faq-item {
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
        
        /* УЛУЧШАЕМ ВИДИМОСТЬ ТЕКСТА ВО ВСЕХ БЛОКАХ */
        .hero h1,
        .hero-subtitle,
        .hero-description p,
        .speck-block-title,
        .speck-block-subtitle,
        .speck-column-title,
        .speck-feature-item,
        .section-title,
        .section-subtitle,
        .project-title,
        .project-description,
        .service-item h3,
        .journal-title,
        .journal-date,
        .faq-question,
        .faq-answer p {
            text-shadow: 
                0 4px 35px rgba(0, 0, 0, 0.95),
                0 3px 30px rgba(0, 0, 0, 0.9),
                0 2px 25px rgba(0, 0, 0, 0.85) !important;
            color: rgba(255, 255, 255, 0.98) !important;
            position: relative;
            z-index: 20;
        }
        
        /* УБРАТЬ ФОН С ВСЕХ СЕКЦИЙ И БЛОКОВ */
        section, .section, .hero, .content-section,
        .speck-vertical-block, .speck-block-left, .speck-block-right,
        .speck-feature-column, .speck-feature-item,
        .projects-section, .project-card,
        .services-section, .service-item,
        .journals-section, .journal-item,
        .faq-section, .faq-item {
            background: transparent !important;
            background-color: transparent !important;
        }
        
        /* ФИКС ДЛЯ ВИСЯЩЕГО ТЕКСТА ВО ВСЕХ БЛОКАХ */
        .speck-feature-column,
        .project-card,
        .service-item,
        .journal-item,
        .faq-item {
            background: transparent !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
        }
        
        /* СТЕКЛЯННЫЙ ЭФФЕКТ ТОЛЬКО ДЛЯ КНОПОК И СТАТИСТИКИ */
        .hero-actions .btn,
        .floating-button,
        .stat-card,
        .journals-actions .btn {
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
    
    console.log('✅ Emergency CSS injected - NO black overlay for all blocks');
    
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
        
        // 4. Убираем все фоны с текстовых блоков ВО ВСЕХ БЛОКАХ
        const textContainers = document.querySelectorAll('.text-backdrop-enhanced, .hero-description, .floating-content, .project-content, .service-item, .journal-item, .faq-item');
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
        
        // 5. ФИКС ДЛЯ ВИСЯЩЕГО ТЕКСТА ВО ВСЕХ SPECK БЛОКАХ
        const speckBlocks = document.querySelectorAll('.speck-vertical-block');
        speckBlocks.forEach((block, blockIndex) => {
            const speckColumns = block.querySelectorAll('.speck-feature-column');
            const speckItems = block.querySelectorAll('.speck-feature-item');
            const speckRightBlock = block.querySelector('.speck-block-right');
            const speckLeftBlock = block.querySelector('.speck-block-left');
            
            // Убираем фон с колонок
            speckColumns.forEach(col => {
                if (col && col.style) {
                    col.style.backgroundColor = 'transparent';
                    col.style.background = 'transparent';
                    col.style.backdropFilter = 'none';
                    col.style.webkitBackdropFilter = 'none';
                    col.style.border = 'none';
                    col.style.boxShadow = 'none';
                    col.style.padding = '0';
                    col.style.margin = '0';
                }
            });
            
            // Убираем фон с элементов списка
            speckItems.forEach(item => {
                if (item && item.style) {
                    item.style.backgroundColor = 'transparent';
                    item.style.background = 'transparent';
                    item.style.padding = '0';
                    item.style.margin = '0 0 30px 0';
                }
            });
            
            // Убираем фон с правого блока
            if (speckRightBlock && speckRightBlock.style) {
                speckRightBlock.style.backgroundColor = 'transparent';
                speckRightBlock.style.background = 'transparent';
                speckRightBlock.style.backdropFilter = 'none';
                speckRightBlock.style.webkitBackdropFilter = 'none';
                speckRightBlock.style.border = 'none';
                speckRightBlock.style.boxShadow = 'none';
                speckRightBlock.style.padding = '40px 0';
                speckRightBlock.style.borderLeft = 'none';
            }
            
            // Убираем фон с левого блока
            if (speckLeftBlock && speckLeftBlock.style) {
                speckLeftBlock.style.backgroundColor = 'transparent';
                speckLeftBlock.style.background = 'transparent';
                speckLeftBlock.style.backdropFilter = 'none';
                speckLeftBlock.style.webkitBackdropFilter = 'none';
                speckLeftBlock.style.border = 'none';
                speckLeftBlock.style.boxShadow = 'none';
            }
            
            console.log(`✅ Speck block ${blockIndex + 1} floating text applied`);
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
        
        // ФИКС ДЛЯ НОВЫХ SPECK БЛОКОВ
        const projectCards = document.querySelectorAll('.project-card');
        const serviceItems = document.querySelectorAll('.service-item');
        const journalItems = document.querySelectorAll('.journal-item');
        const faqItems = document.querySelectorAll('.faq-item');
        
        projectCards.forEach(card => {
            if (card && card.style) {
                card.style.backgroundColor = 'transparent';
                card.style.backdropFilter = 'none';
                card.style.webkitBackdropFilter = 'none';
                card.style.border = 'none';
                card.style.boxShadow = 'none';
            }
        });
        
        serviceItems.forEach(item => {
            if (item && item.style) {
                item.style.backgroundColor = 'transparent';
                item.style.backdropFilter = 'none';
                item.style.webkitBackdropFilter = 'none';
                item.style.border = 'none';
                item.style.boxShadow = 'none';
            }
        });
        
        journalItems.forEach(item => {
            if (item && item.style) {
                item.style.backgroundColor = 'transparent';
                item.style.backdropFilter = 'none';
                item.style.webkitBackdropFilter = 'none';
                item.style.border = 'none';
                item.style.boxShadow = 'none';
            }
        });
        
        faqItems.forEach(item => {
            if (item && item.style) {
                item.style.backgroundColor = 'transparent';
                item.style.backdropFilter = 'none';
                item.style.webkitBackdropFilter = 'none';
                item.style.border = 'none';
                item.style.boxShadow = 'none';
            }
        });
        
        console.log('✅ All black overlays removed - floating text effect applied to ALL blocks');
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
    
    // 6. ЗАПУСКАЕМ БАЗОВЫЕ ФУНКЦИИ
    initializeBasicFunctions();
}

function initializeBasicFunctions() {
    console.log('🔄 Initializing basic functions for ALL blocks...');
    
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
    
    // 3. АНИМАЦИЯ ДЛЯ HERO IMAGE
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.opacity = '0';
        setTimeout(() => {
            heroImage.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'perspective(1000px) rotateX(1deg) translateY(0)';
        }, 450);
        
        // Hover эффект
        heroImage.addEventListener('mouseenter', function() {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.style.transform = 'perspective(1000px) rotateX(0deg) translateY(-10px)';
            }
        });
        
        heroImage.addEventListener('mouseleave', function() {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.style.transform = 'perspective(1000px) rotateX(1deg) translateY(0)';
            }
        });
    }
    
    // 4. ПРОГРЕСС БАР СКРОЛЛА
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
    
    // 5. ИНИЦИАЛИЗАЦИЯ FAQ (АККОРДЕОН)
    initializeFAQ();
    
    // 6. ДОПОЛНИТЕЛЬНЫЙ ФИКС ДЛЯ ТЕКСТА И OVERLAY ВО ВСЕХ БЛОКАХ
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
        
        // ФИКС ДЛЯ ВСЕХ SPECK БЛОКОВ
        const speckBlocks = document.querySelectorAll('.speck-vertical-block');
        speckBlocks.forEach((block, blockIndex) => {
            const speckElements = block.querySelectorAll('.speck-feature-column, .speck-feature-item, .speck-block-right, .speck-block-left');
            speckElements.forEach(el => {
                if (el && el.style) {
                    el.style.backgroundColor = 'transparent';
                    el.style.background = 'transparent';
                    el.style.backdropFilter = 'none';
                    el.style.webkitBackdropFilter = 'none';
                    el.style.border = 'none';
                    el.style.boxShadow = 'none';
                }
            });
            console.log(`✅ Final fix for speck block ${blockIndex + 1} applied`);
        });
        
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
    
    console.log('✅ Basic functions initialized for ALL blocks');
}

// ===== ИНИЦИАЛИЗАЦИЯ FAQ АККОРДЕОНА =====
function initializeFAQ() {
    console.log('❓ Initializing FAQ accordion...');
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Закрываем все открытые элементы
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = '0';
                        }
                    }
                });
                
                // Переключаем текущий элемент
                item.classList.toggle('active');
                
                const answer = item.querySelector('.faq-answer');
                if (answer) {
                    if (item.classList.contains('active')) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    } else {
                        answer.style.maxHeight = '0';
                    }
                }
            });
        }
    });
    
    // Автоматически открываем первый вопрос
    if (faqItems.length > 0) {
        setTimeout(() => {
            faqItems[0].classList.add('active');
            const firstAnswer = faqItems[0].querySelector('.faq-answer');
            if (firstAnswer) {
                firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
            }
        }, 1000);
    }
    
    console.log(`✅ FAQ initialized with ${faqItems.length} items`);
}

// ===== ЗАПУСК ПРИ ЗАГРУЗКЕ =====
console.log('🚀 Starting home page initialization with SPECK DESIGN blocks...');

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
    console.log('🌍 Page fully loaded, applying final fixes for SPECK DESIGN blocks...');
    
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
        
        // ФИНАЛЬНЫЙ ФИКС ДЛЯ ВСЕХ БЛОКОВ SPECK DESIGN
        const projectCards = document.querySelectorAll('.project-card');
        const serviceItems = document.querySelectorAll('.service-item');
        const journalItems = document.querySelectorAll('.journal-item');
        const faqItems = document.querySelectorAll('.faq-item');
        
        projectCards.forEach(card => {
            if (card && card.style) {
                card.style.backgroundColor = 'transparent';
                card.style.background = 'transparent';
                card.style.backdropFilter = 'none';
                card.style.webkitBackdropFilter = 'none';
                card.style.border = 'none';
                card.style.boxShadow = 'none';
            }
        });
        
        serviceItems.forEach(item => {
            if (item && item.style) {
                item.style.backgroundColor = 'transparent';
                item.style.background = 'transparent';
                item.style.backdropFilter = 'none';
                item.style.webkitBackdropFilter = 'none';
                item.style.border = 'none';
                item.style.boxShadow = 'none';
            }
        });
        
        journalItems.forEach(item => {
            if (item && item.style) {
                item.style.backgroundColor = 'transparent';
                item.style.background = 'transparent';
                item.style.backdropFilter = 'none';
                item.style.webkitBackdropFilter = 'none';
                item.style.border = 'none';
                item.style.boxShadow = 'none';
            }
        });
        
        faqItems.forEach(item => {
            if (item && item.style) {
                item.style.backgroundColor = 'transparent';
                item.style.background = 'transparent';
                item.style.backdropFilter = 'none';
                item.style.webkitBackdropFilter = 'none';
                item.style.border = 'none';
                item.style.boxShadow = 'none';
            }
        });
        
        // ФИНАЛЬНЫЙ ФИКС ДЛЯ ВСЕГО ТЕКСТА
        const textBlocks = document.querySelectorAll('.hero-content > div, .hero-description, .floating-title, .floating-subtitle, .project-content, .service-item h3, .journal-title, .faq-question');
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
        
        console.log('✅ Final black overlay removal complete for ALL SPECK DESIGN blocks');
    }, 500);
});

// ГЛОБАЛЬНАЯ ФУНКЦИЯ ДЛЯ ПЕРЕЗАПУСКА ФОНА
window.reinitializeHomeBackground = function() {
    console.log('🔄 Reinitializing home background with SPECK DESIGN blocks...');
    initializeHomePage();
};

// ФУНКЦИЯ ДЛЯ ПЕРЕКЛЮЧЕНИЯ FAQ
window.toggleFAQ = function(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    const item = faqItems[index];
    
    if (item) {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.click();
        }
    }
};

console.log('✅ home.js loaded - SPECK DESIGN blocks ready!');
