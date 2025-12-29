// services.js - ULTIMATE HEADER FIX
console.log('🛡️ Services.js loaded - ULTIMATE FIX!');

// Проверяем, не инициализировался ли уже скрипт
if (window.servicesInitialized) {
    console.log('⚠️ Services.js already initialized, skipping...');
    // Останавливаем выполнение если уже инициализировался
    throw new Error('Services.js already initialized');
}
window.servicesInitialized = true;

// ===== ГЛОБАЛЬНАЯ ФУНКЦИЯ ДЛЯ БЛОКИРОВКИ =====
function injectUltimateHeaderFix() {
    console.log('🚀 Injecting ULTIMATE header fix...');
    
    // 1. Добавляем класс к body
    document.body.classList.add('services-page');
    
    // 2. Создаем стиль с максимальным приоритетом
    const style = document.createElement('style');
    style.id = 'services-ultimate-fix';
    style.textContent = `
        /* ===== АБСОЛЮТНЫЙ ФИКС - ПЕРВЫЙ ПРИОРИТЕТ ===== */
        
        /* 1. ФИКСИРУЕМ ХЕДЕР НА МЕСТЕ */
        body.services-page .main-header {
            /* ПОЗИЦИЯ - АБСОЛЮТНО ФИКСИРОВАННАЯ */
            position: fixed !important;
            top: 20px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            right: auto !important;
            width: calc(100% - 40px) !important;
            max-width: 1400px !important;
            margin: 0 auto !important;
            z-index: 1000 !important;
            
            /* ГАРАНТИИ ВИДИМОСТИ */
            opacity: 1 !important;
            visibility: visible !important;
            pointer-events: auto !important;
            
            /* ПОЛНОЕ ОТКЛЮЧЕНИЕ АНИМАЦИЙ */
            animation: none !important;
            transition: none !important;
            -webkit-transition: none !important;
            transition-property: none !important;
            transition-duration: 0s !important;
            
            /* БЛОКИРОВКА ИЗМЕНЕНИЙ */
            will-change: auto !important;
            backface-visibility: visible !important;
        }
        
        /* 2. МОБИЛЬНАЯ ВЕРСИЯ */
        @media (max-width: 768px) {
            body.services-page .main-header {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                transform: none !important;
                width: 100% !important;
                max-width: 100% !important;
                margin: 0 !important;
                border-radius: 0 !important;
            }
        }
        
        /* 3. БЛОКИРОВКА ВСЕХ СОСТОЯНИЙ */
        body.services-page .main-header:hover,
        body.services-page .main-header:active,
        body.services-page .main-header:focus,
        body.services-page .main-header.scrolled,
        body.services-page .main-header.header-hidden {
            /* ТОЧНО ТАКИЕ ЖЕ СТИЛИ */
            position: fixed !important;
            top: 20px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            right: auto !important;
            width: calc(100% - 40px) !important;
            max-width: 1400px !important;
            margin: 0 auto !important;
        }
        
        @media (max-width: 768px) {
            body.services-page .main-header:hover,
            body.services-page .main-header:active,
            body.services-page .main-header:focus,
            body.services-page .main-header.scrolled,
            body.services-page .main-header.header-hidden {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                transform: none !important;
                width: 100% !important;
                max-width: 100% !important;
                margin: 0 !important;
            }
        }
        
        /* 4. ПЕРЕОПРЕДЕЛЕНИЕ ИНЛАЙН-СТИЛЕЙ */
        body.services-page .main-header[style] {
            /* ИГНОРИРУЕМ ЛЮБЫЕ ИНЛАЙН СТИЛИ */
            left: 50% !important;
            transform: translateX(-50%) !important;
            top: 20px !important;
            position: fixed !important;
            width: calc(100% - 40px) !important;
            max-width: 1400px !important;
            margin: 0 auto !important;
            animation: none !important;
            transition: none !important;
        }
        
        @media (max-width: 768px) {
            body.services-page .main-header[style] {
                left: 0 !important;
                transform: none !important;
                top: 0 !important;
                width: 100% !important;
                max-width: 100% !important;
                margin: 0 !important;
            }
        }
        
        /* 5. БЛОКИРОВКА ДЛЯ ВСЕХ ВЛОЖЕННЫХ ЭЛЕМЕНТОВ */
        body.services-page .main-header * {
            animation: none !important;
            transition: none !important;
        }
    `;
    
    // Вставляем стиль В НАЧАЛО head для максимального приоритета
    document.head.insertBefore(style, document.head.firstChild);
    
    // 3. Применяем инлайн-стили немедленно
    setTimeout(() => {
        const header = document.querySelector('.main-header');
        if (header) {
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                header.style.cssText = `
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    transform: none !important;
                    width: 100% !important;
                    max-width: 100% !important;
                    margin: 0 !important;
                    border-radius: 0 !important;
                    z-index: 1000 !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                    pointer-events: auto !important;
                    animation: none !important;
                    transition: none !important;
                `;
            } else {
                header.style.cssText = `
                    position: fixed !important;
                    top: 20px !important;
                    left: 50% !important;
                    transform: translateX(-50%) !important;
                    right: auto !important;
                    width: calc(100% - 40px) !important;
                    max-width: 1400px !important;
                    margin: 0 auto !important;
                    border-radius: 20px !important;
                    z-index: 1000 !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                    pointer-events: auto !important;
                    animation: none !important;
                    transition: none !important;
                `;
            }
            
            // Убираем все классы, которые могут влиять на позицию
            header.classList.remove('header-hidden', 'header-glass-enter', 'glass-morph');
            
            // Добавляем scrolled класс если нужно
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            console.log('✅ Ultimate CSS fix applied to header');
        }
    }, 100);
    
    console.log('✅ Ultimate CSS fix injected');
}

// ===== БЛОКИРОВКА ВСЕХ JS ИНТЕРФЕРЕНЦИЙ =====
function blockJavaScriptInterference() {
    console.log('🔒 Blocking all JavaScript interference...');
    
    const header = document.querySelector('.main-header');
    if (!header) {
        console.warn('⚠️ Header not found for blocking interference');
        return;
    }
    
    // 1. БЛОКИРОВКА СКРОЛЛА
    const blockScrollHandler = function(e) {
        // НИКАКОЙ РЕАКЦИИ НА СКРОЛЛ
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            header.style.left = '0';
            header.style.transform = 'none';
            header.style.top = '0';
        } else {
            header.style.left = '50%';
            header.style.transform = 'translateX(-50%)';
            header.style.top = '20px';
        }
    };
    
    window.addEventListener('scroll', blockScrollHandler, { passive: false, capture: true });
    
    // 2. БЛОКИРОВКА RESIZE
    window.addEventListener('resize', function() {
        setTimeout(() => {
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                header.style.left = '0';
                header.style.transform = 'none';
                header.style.top = '0';
                header.style.width = '100%';
                header.style.maxWidth = '100%';
                header.style.borderRadius = '0';
            } else {
                header.style.left = '50%';
                header.style.transform = 'translateX(-50%)';
                header.style.top = '20px';
                header.style.width = 'calc(100% - 40px)';
                header.style.maxWidth = '1400px';
                header.style.borderRadius = '20px';
            }
        }, 10);
    }, { passive: true });
    
    // 3. БЛОКИРОВКА MUTATION OBSERVER
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.target === header) {
                    // Если кто-то пытается изменить стили
                    const isMobile = window.innerWidth <= 768;
                    
                    if (isMobile) {
                        header.style.left = '0';
                        header.style.transform = 'none';
                        header.style.top = '0';
                    } else {
                        header.style.left = '50%';
                        header.style.transform = 'translateX(-50%)';
                        header.style.top = '20px';
                    }
                }
            });
        });
        
        observer.observe(header, { 
            attributes: true, 
            attributeFilter: ['style', 'class'] 
        });
    }
    
    // 4. БЛОКИРОВКА HOVER
    ['mouseenter', 'mouseleave', 'mouseover', 'mouseout'].forEach(event => {
        header.addEventListener(event, function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            const isMobile = window.innerWidth <= 768;
            if (isMobile) {
                header.style.left = '0';
                header.style.transform = 'none';
            } else {
                header.style.left = '50%';
                header.style.transform = 'translateX(-50%)';
            }
        }, { passive: false });
    });
    
    console.log('✅ JavaScript interference blocked');
}

// ===== ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ =====
function initServicesPage() {
    console.log('🚀 Initializing Services page with ULTIMATE fix...');
    
    // 1. Внедряем CSS фикс
    injectUltimateHeaderFix();
    
    // 2. Блокируем JS интерференцию
    setTimeout(() => {
        blockJavaScriptInterference();
    }, 200);
    
    // 3. Настройка контента страницы
    setupServicesContent();
    setupNavigation();
    
    // 4. Устанавливаем проверку каждую секунду
    const checkInterval = setInterval(() => {
        const header = document.querySelector('.main-header');
        if (header) {
            const currentLeft = header.style.left;
            const currentTransform = header.style.transform;
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                if (currentLeft !== '0px' && currentLeft !== '0') {
                    console.log('🔄 Fixing mobile header position...');
                    header.style.left = '0';
                    header.style.transform = 'none';
                }
            } else {
                if (currentLeft !== '50%' || currentTransform !== 'translateX(-50%)') {
                    console.log('🔄 Fixing desktop header position...');
                    header.style.left = '50%';
                    header.style.transform = 'translateX(-50%)';
                }
            }
        }
    }, 1000);
    
    // Очищаем через 10 секунд
    setTimeout(() => {
        clearInterval(checkInterval);
        console.log('✅ Header position stabilized');
    }, 10000);
    
    console.log('✅ Services page initialized');
}

// ===== ДОПОЛНИТЕЛЬНЫЙ ФУНКЦИОНАЛ =====
function setupServicesContent() {
    const animatedElements = document.querySelectorAll('.service-detail, .feature, .process-phase');
    
    if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

function setupNavigation() {
    const navItems = document.querySelectorAll('.services-nav .nav-item');
    const sections = document.querySelectorAll('.service-detail');
    
    if (navItems.length === 0 || sections.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                const header = document.querySelector('.main-header');
                const headerHeight = header.offsetHeight;
                const navHeight = document.querySelector('.services-nav').offsetHeight;
                const offset = headerHeight + navHeight + 20;
                
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== АВТОМАТИЧЕСКИЙ ЗАПУСК =====
// Запускаем немедленно
try {
    initServicesPage();
} catch (error) {
    console.error('Initialization error:', error);
    // Пробуем еще раз через 200мс
    setTimeout(initServicesPage, 200);
}

// Дублируем при полной загрузке
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM loaded - applying additional fixes...');
    // Убеждаемся, что фикс применяется
    setTimeout(injectUltimateHeaderFix, 100);
});

console.log('✅ services.js - ULTIMATE FIX loaded!');
