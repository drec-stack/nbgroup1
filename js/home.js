console.log('🏠 home.js loaded - COMPLETE SPECK DESIGN VERSION');

// ===== ЭКСТРЕННЫЙ ФИКС ФОНА =====
(function immediateFix() {
    'use strict';
    
    function safeImmediateFix() {
        if (!document.body) {
            console.log('⚠️ document.body not ready, retrying...');
            setTimeout(safeImmediateFix, 50);
            return;
        }
        
        console.log('🚨 IMMEDIATE FIX: Removing black background');
        
        document.body.style.backgroundColor = 'transparent';
        document.documentElement.style.backgroundColor = 'transparent';
        
        const bgLayers = document.querySelectorAll('.bg-layer');
        bgLayers.forEach(layer => {
            if (layer && layer.style) {
                layer.style.opacity = '1';
                layer.style.display = 'block';
                layer.style.visibility = 'visible';
            }
        });
        
        console.log('✅ Immediate background fix applied');
    }
    
    safeImmediateFix();
})();

// ===== ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ =====
function initializeHomePage() {
    console.log('📄 INITIALIZING HOME PAGE WITH SPECK DESIGN');
    
    // 1. ГАРАНТИРУЕМ КЛАСС ДЛЯ ГЛАВНОЙ СТРАНИЦЫ
    document.body.classList.add('home-page');
    document.documentElement.classList.add('home-page');
    
    // 2. ЭКСТРЕННЫЙ CSS ФИКС ДЛЯ ВИСЯЩЕГО ТЕКСТА
    const emergencyCSS = `
        /* ЭКСТРЕННЫЙ ФИКС: ВИСЯЩИЙ ТЕКСТ БЕЗ ФОНА */
        body.home-page {
            background: transparent !important;
            background-color: transparent !important;
        }
        
        .bg-layers-container {
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
            z-index: 1 !important;
        }
        
        .bg-layer {
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
        }
        
        /* ВСЕ БЛОКИ SPECK DESIGN БЕЗ ФОНА */
        .speck-vertical-block, .speck-block-left, .speck-block-right,
        .speck-feature-column, .project-card, .service-item,
        .journal-item, .faq-item, .stat-card, .cta-content {
            background: transparent !important;
            backdrop-filter: none !important;
            border: none !important;
            box-shadow: none !important;
        }
        
        /* УСИЛЕНИЕ ТЕНИ ДЛЯ ТЕКСТА */
        .speck-block-title, .speck-block-subtitle, .speck-column-title,
        .speck-feature-item, .project-title, .project-description,
        .service-title, .service-description, .journal-title,
        .faq-question, .faq-answer p, .cta-title, .cta-subtitle,
        .stat-number, .stat-label, .section-title, .section-subtitle {
            text-shadow: 
                0 3px 30px rgba(0, 0, 0, 0.95),
                0 2px 25px rgba(0, 0, 0, 0.9) !important;
            position: relative;
            z-index: 20;
        }
        
        /* УДАЛИТЬ ВСЕ OVERLAY */
        [class*="overlay"], [class*="dark-bg"], [class*="black-bg"] {
            display: none !important;
            opacity: 0 !important;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = emergencyCSS;
    document.head.appendChild(style);
    
    console.log('✅ Emergency CSS injected');
    
    // 3. ПРИНУДИТЕЛЬНАЯ АКТИВАЦИЯ ФОНА
    setTimeout(() => {
        const bgLayers = document.querySelectorAll('.bg-layer');
        const bgContainer = document.querySelector('.bg-layers-container');
        
        console.log(`🎨 Found ${bgLayers.length} background layers`);
        
        if (bgLayers.length > 0) {
            bgLayers.forEach(layer => {
                if (layer && layer.style) {
                    layer.style.opacity = '1';
                    layer.style.display = 'block';
                    layer.style.visibility = 'visible';
                }
            });
            
            if (bgContainer && bgContainer.style) {
                bgContainer.style.display = 'block';
                bgContainer.style.opacity = '1';
                bgContainer.style.visibility = 'visible';
            }
        }
        
        // Убираем фоны со всех элементов
        document.body.style.backgroundColor = 'transparent';
        document.querySelectorAll('section').forEach(section => {
            if (section && section.style) {
                section.style.backgroundColor = 'transparent';
            }
        });
        
        console.log('✅ Background activated and all overlays removed');
    }, 100);
    
    // 4. ЗАПУСКАЕМ ВСЕ ФУНКЦИИ
    initializeSpeckBlocks();
    initializeStatsCounter();
    initializeFAQ();
    initializeScrollAnimations();
    initializeScrollProgress();
    
    console.log('✅ Home page fully initialized');
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
                    // Запускаем анимацию
                    entry.target.style.animationPlayState = 'running';
                } else {
                    // Если анимация не определена в CSS, запускаем её через JS
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
    
    // Инициализация начального значения
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${scrollPercent}%`;
    
    console.log('✅ Scroll progress bar initialized');
}

// ===== HOVER ЭФФЕКТЫ ДЛЯ КАРТОЧЕК =====
function initializeCardHoverEffects() {
    // Projects hover
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
    
    // Services hover
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
    
    console.log(`✅ Card hover effects initialized (${projectCards.length} projects, ${serviceItems.length} services)`);
}

// ===== ЗАПУСК ПРИ ЗАГРУЗКЕ =====
function safeInitialize() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                initializeHomePage();
                initializeCardHoverEffects();
            }, 500);
        });
    } else if (document.body) {
        setTimeout(() => {
            initializeHomePage();
            initializeCardHoverEffects();
        }, 500);
    } else {
        console.log('⚠️ Waiting for document.body to be ready...');
        setTimeout(safeInitialize, 50);
    }
}

safeInitialize();

// ===== ГЛОБАЛЬНЫЕ ФУНКЦИИ ДЛЯ ОТЛАДКИ =====
window.reinitializeHomePage = function() {
    console.log('🔄 Reinitializing home page...');
    initializeHomePage();
    initializeCardHoverEffects();
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

window.resetAnimations = function() {
    const animatedElements = document.querySelectorAll('.speck-vertical-block, .fade-in-down, .fade-in-up');
    animatedElements.forEach(el => {
        el.classList.remove('visible');
        el.style.opacity = '0';
        el.style.transform = '';
        el.style.animationPlayState = 'paused';
    });
    
    setTimeout(initializeHomePage, 100);
};

// ===== ОБРАБОТКА ОШИБОК =====
window.addEventListener('error', function(event) {
    if (event.filename && event.filename.includes('home.js')) {
        console.error('❌ Error in home.js:', event.message, event.error);
        event.preventDefault();
    }
});

console.log('✅ home.js fully loaded and ready!');
