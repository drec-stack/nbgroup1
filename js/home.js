console.log('🏠 home.js loaded - COMPLETE SPECK DESIGN VERSION WITH BACKGROUND FIX');

// ===== ЭКСТРЕННЫЙ ФИКС ФОНА =====
(function immediateFix() {
    'use strict';
    
    function safeImmediateFix() {
        if (!document.body) {
            console.log('⚠️ document.body not ready, retrying...');
            setTimeout(safeImmediateFix, 50);
            return;
        }
        
        console.log('🚨 APPLYING EMERGENCY BACKGROUND FIX');
        
        // 1. Гарантируем прозрачность body
        document.body.style.backgroundColor = 'transparent';
        document.body.style.backgroundImage = 'none';
        document.documentElement.style.backgroundColor = 'transparent';
        
        // 2. Активируем фоновые слои
        const bgLayers = document.querySelectorAll('.bg-layer');
        const bgContainer = document.querySelector('.bg-layers-container');
        
        if (bgContainer && bgContainer.style) {
            bgContainer.style.display = 'block';
            bgContainer.style.opacity = '1';
            bgContainer.style.visibility = 'visible';
            bgContainer.style.zIndex = '-100';
            bgContainer.style.position = 'fixed';
        }
        
        bgLayers.forEach((layer, index) => {
            if (layer && layer.style) {
                layer.style.display = 'block';
                layer.style.opacity = '1';
                layer.style.visibility = 'visible';
                layer.style.zIndex = `-${100 + index}`;
                layer.style.position = 'absolute';
                layer.style.top = '0';
                layer.style.left = '0';
                layer.style.width = '100%';
                layer.style.height = '100%';
                layer.style.backgroundSize = 'cover';
                layer.style.backgroundPosition = 'center';
                layer.style.backgroundRepeat = 'no-repeat';
                
                // Устанавливаем правильные фоновые изображения
                const imagePaths = [
                    'assets/images/parallax/bg-1.jpg',
                    'assets/images/parallax/bg-2.jpg',
                    'assets/images/parallax/bg-3.jpg',
                    'assets/images/parallax/bg-4.jpg'
                ];
                
                if (index < imagePaths.length) {
                    layer.style.backgroundImage = `url('${imagePaths[index]}')`;
                }
            }
        });
        
        // 3. Убираем все фоны с секций
        document.querySelectorAll('section').forEach(section => {
            if (section && section.style) {
                section.style.backgroundColor = 'transparent';
                section.style.backgroundImage = 'none';
            }
        });
        
        // 4. Гарантируем, что все контентные блоки прозрачные
        const contentBlocks = document.querySelectorAll(
            '.speck-vertical-block, .project-card, .service-item, ' +
            '.journal-item, .faq-item, .stat-card, .cta-content, .hero-description'
        );
        
        contentBlocks.forEach(block => {
            if (block && block.style) {
                block.style.background = 'transparent';
                block.style.backgroundColor = 'transparent';
                block.style.backdropFilter = 'none';
            }
        });
        
        console.log(`✅ Emergency fix applied: ${bgLayers.length} background layers activated`);
    }
    
    // Запускаем немедленно
    safeImmediateFix();
})();

// ===== ПАРАЛЛАКС СИСТЕМА =====
function initializeParallaxBackground() {
    console.log('🎨 Initializing parallax background system...');
    
    const bgLayers = document.querySelectorAll('.bg-layer');
    if (bgLayers.length === 0) {
        console.error('❌ No background layers found!');
        return;
    }
    
    console.log(`✅ Found ${bgLayers.length} background layers`);
    
    // Проверяем загрузку изображений
    const imagePaths = [
        'assets/images/parallax/bg-1.jpg',
        'assets/images/parallax/bg-2.jpg',
        'assets/images/parallax/bg-3.jpg',
        'assets/images/parallax/bg-4.jpg'
    ];
    
    let loadedImages = 0;
    
    imagePaths.forEach((path, index) => {
        const img = new Image();
        img.onload = () => {
            loadedImages++;
            console.log(`✅ Background image loaded: ${path}`);
            
            // Добавляем класс для загруженного слоя
            if (bgLayers[index]) {
                bgLayers[index].classList.add('loaded');
            }
            
            // Если все изображения загружены, уменьшаем непрозрачность градиента
            if (loadedImages === imagePaths.length) {
                console.log('✅ All background images loaded successfully');
            }
        };
        img.onerror = () => {
            console.warn(`⚠️ Failed to load background image: ${path}`);
            // Даже если изображение не загрузилось, продолжаем
        };
        img.src = path;
    });
    
    // Параллакс эффект при скролле
    function updateParallax() {
        const scrollY = window.scrollY || window.pageYOffset;
        
        bgLayers.forEach((layer, index) => {
            if (layer && layer.style) {
                const speed = 0.05 + (index * 0.05); // Разные скорости для разных слоёв
                const yPos = scrollY * speed;
                layer.style.transform = `translateY(${yPos}px)`;
            }
        });
    }
    
    window.addEventListener('scroll', updateParallax);
    window.addEventListener('resize', updateParallax);
    
    // Инициализация начальной позиции
    setTimeout(updateParallax, 100);
    
    return true;
}

// ===== ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ =====
function initializeHomePage() {
    console.log('📄 INITIALIZING HOME PAGE WITH SPECK DESIGN');
    
    // 1. Гарантируем класс для главной страницы
    document.body.classList.add('home-page');
    document.documentElement.classList.add('home-page');
    
    // 2. Запускаем параллакс систему
    initializeParallaxBackground();
    
    // 3. Критичные инлайн-стили для гарантии
    const emergencyCSS = `
        /* КРИТИЧНЫЙ ФИКС: ГАРАНТИЯ ПРОЗРАЧНОСТИ */
        body.home-page {
            background: transparent !important;
            background-color: transparent !important;
            background-image: none !important;
        }
        
        .bg-layers-container {
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
            z-index: -100 !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
        }
        
        .bg-layer {
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
        }
        
        /* УСИЛЕННЫЕ ТЕНИ ТЕКСТА */
        .speck-block-title, .speck-block-subtitle, .speck-column-title,
        .speck-feature-item, .project-title, .project-description,
        .service-title, .service-description, .journal-title,
        .faq-question, .faq-answer p, .cta-title, .cta-subtitle,
        .stat-number, .stat-label, .section-title, .section-subtitle,
        .hero h1, .hero-subtitle, .hero-description p {
            text-shadow: 
                0 4px 35px rgba(0, 0, 0, 0.97),
                0 3px 30px rgba(0, 0, 0, 0.95),
                0 2px 25px rgba(0, 0, 0, 0.9) !important;
            position: relative;
            z-index: 30;
        }
        
        /* УДАЛЕНИЕ ВСЕХ НЕНУЖНЫХ ФОНОВ */
        section, .hero, .content-section, 
        .speck-vertical-block, .speck-block-left, .speck-block-right,
        .speck-feature-column, .project-card, .project-content,
        .service-item, .journal-item, .faq-item, .faq-answer,
        .stat-card, .cta-content, .hero-description {
            background: transparent !important;
            background-color: transparent !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            border: none !important;
            box-shadow: none !important;
        }
    `;
    
    const style = document.createElement('style');
    style.id = 'emergency-background-fix';
    style.textContent = emergencyCSS;
    document.head.appendChild(style);
    
    console.log('✅ Emergency CSS injected');
    
    // 4. Запускаем все остальные функции
    setTimeout(() => {
        initializeSpeckBlocks();
        initializeStatsCounter();
        initializeFAQ();
        initializeScrollAnimations();
        initializeScrollProgress();
        initializeCardHoverEffects();
        
        console.log('✅ Home page fully initialized with background fix');
    }, 300);
}

// ===== SPECK BLOCKS АНИМАЦИИ =====
function initializeSpeckBlocks() {
    const blocks = document.querySelectorAll('.speck-vertical-block');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
                
                // Анимируем элементы внутри с задержкой
                const number = entry.target.querySelector('.speck-block-number');
                const title = entry.target.querySelector('.speck-block-title');
                const subtitle = entry.target.querySelector('.speck-block-subtitle');
                const items = entry.target.querySelectorAll('.speck-feature-item');
                
                if (number) setTimeout(() => number.style.opacity = '1', 200);
                if (title) setTimeout(() => title.style.opacity = '1', 300);
                if (subtitle) setTimeout(() => subtitle.style.opacity = '1', 400);
                
                items.forEach((item, index) => {
                    setTimeout(() => {
                        if (item && item.style) {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }
                    }, 500 + (index * 100));
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    blocks.forEach(block => {
        if (block) {
            // Инициализация начального состояния
            const items = block.querySelectorAll('.speck-feature-item');
            items.forEach(item => {
                if (item && item.style) {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                }
            });
            
            observer.observe(block);
        }
    });
    
    console.log(`✅ Speck blocks initialized (${blocks.length} blocks)`);
}

// ===== СТАТИСТИКА СЧЁТЧИК =====
function initializeStatsCounter() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length === 0) {
        console.log('⚠️ No stat counters found');
        return;
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count')) || 0;
                    if (target > 0) {
                        animateCounter(counter, target);
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    console.log(`✅ Stats counter initialized (${counters.length} counters)`);
}

function animateCounter(element, target) {
    if (!element) return;
    
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// ===== FAQ АККОРДЕОН =====
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) {
        console.log('⚠️ No FAQ items found');
        return;
    }
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Закрываем все другие открытые вопросы
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
                const isActive = item.classList.contains('active');
                item.classList.toggle('active');
                
                const answer = item.querySelector('.faq-answer');
                if (answer) {
                    if (isActive) {
                        answer.style.maxHeight = '0';
                    } else {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    }
                }
            });
        }
    });
    
    // Автоматически открываем первый вопрос
    if (faqItems.length > 0) {
        setTimeout(() => {
            const firstItem = faqItems[0];
            const firstAnswer = firstItem.querySelector('.faq-answer');
            firstItem.classList.add('active');
            if (firstAnswer) {
                firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
            }
        }, 1000);
    }
    
    console.log(`✅ FAQ initialized with ${faqItems.length} items`);
}

// ===== SCROLL АНИМАЦИИ =====
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-down, .fade-in-up, .fade-in-left, .fade-in-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const computedStyle = getComputedStyle(entry.target);
                const animationName = computedStyle.animationName;
                
                if (animationName && animationName !== 'none') {
                    entry.target.style.animationPlayState = 'running';
                } else {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translate(0, 0)';
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        if (el) observer.observe(el);
    });
    
    console.log(`✅ Scroll animations initialized for ${animatedElements.length} elements`);
}

// ===== SCROLL PROGRESS BAR =====
function initializeScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    
    if (!progressBar) {
        console.log('⚠️ Scroll progress bar not found');
        return;
    }
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        
        if (progressBar.style) {
            progressBar.style.width = `${scrollPercent}%`;
        }
    });
    
    progressBar.style.width = '0%';
    console.log('✅ Scroll progress bar initialized');
}

// ===== HOVER ЭФФЕКТЫ ДЛЯ КАРТОЧЕК =====
function initializeCardHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.style.transform = 'translateY(-15px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.style.transform = 'translateY(-10px)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    console.log(`✅ Card hover effects initialized`);
}

// ===== ЗАПУСК ПРИ ЗАГРУЗКЕ =====
function safeInitialize() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                initializeHomePage();
            }, 100);
        });
    } else {
        setTimeout(() => {
            initializeHomePage();
        }, 100);
    }
}

// Запускаем инициализацию
safeInitialize();

// ===== ГЛОБАЛЬНЫЕ ФУНКЦИИ ДЛЯ ОТЛАДКИ =====
window.reinitializeHomePage = function() {
    console.log('🔄 Reinitializing home page...');
    initializeHomePage();
};

window.toggleFAQItem = function(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems[index]) {
        const questionBtn = faqItems[index].querySelector('.faq-question');
        if (questionBtn) {
            questionBtn.click();
        }
    }
};

window.checkBackground = function() {
    const bgLayers = document.querySelectorAll('.bg-layer');
    console.log(`Background layers: ${bgLayers.length}`);
    bgLayers.forEach((layer, index) => {
        console.log(`Layer ${index}:`, {
            display: layer.style.display,
            opacity: layer.style.opacity,
            backgroundImage: layer.style.backgroundImage,
            zIndex: layer.style.zIndex
        });
    });
};

console.log('✅ home.js fully loaded and ready with background fix!');
