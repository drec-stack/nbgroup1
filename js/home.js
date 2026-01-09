console.log('🏠 home.js loaded - FIXED PARALLAX VERSION (NO ERRORS)');

// ===== ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ =====
function initializeHomePage() {
    console.log('📄 INITIALIZING HOME PAGE');
    
    // 1. Гарантируем класс для главной страницы
    document.body.classList.add('home-page');
    document.documentElement.classList.add('home-page');
    
    // 2. Убираем все синие фоны сразу
    document.querySelectorAll('.btn, .btn-primary, .btn-secondary').forEach(btn => {
        if (btn && btn.style) {
            btn.style.background = 'rgba(255, 255, 255, 0.08)';
            btn.style.backdropFilter = 'blur(12px) saturate(0.9)';
            btn.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            btn.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.25)';
            btn.style.color = 'white';
        }
    });
    
    // 3. Запускаем единую систему параллакса
    initializeSingleParallaxSystem();
    
    // 4. Запускаем все остальные функции
    setTimeout(() => {
        initializeSpeckBlocks();
        initializeStatsCounter();
        initializeFAQ();
        initializeScrollAnimations();
        initializeScrollProgress();
        initializeCardHoverEffects();
        
        console.log('✅ Home page fully initialized');
    }, 300);
}

// ===== ЕДИНАЯ СИСТЕМА ПАРАЛЛАКСА (ИСПРАВЛЕННАЯ) =====
function initializeSingleParallaxSystem() {
    console.log('🎨 Initializing SINGLE parallax system...');
    
    const bgLayers = document.querySelectorAll('.bg-layer');
    if (bgLayers.length === 0) {
        console.error('❌ No background layers found!');
        return;
    }
    
    console.log(`✅ Found ${bgLayers.length} background layers`);
    
    // Удаляем все предыдущие обработчики скролла с другими именами
    window.removeEventListener('scroll', handleParallaxScroll);
    
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
            
            if (bgLayers[index]) {
                bgLayers[index].classList.add('loaded');
                // Убираем любые inline-стили, которые могут мешать
                if (bgLayers[index].style) {
                    bgLayers[index].style.opacity = '';
                }
            }
            
            if (loadedImages === imagePaths.length) {
                console.log('✅ All background images loaded successfully');
                // После загрузки всех изображений, убираем слишком темные слои
                removeDarkOverlays();
            }
        };
        img.onerror = () => {
            console.warn(`⚠️ Failed to load background image: ${path}`);
        };
        img.src = path;
    });
    
    // Оптимизированный параллакс эффект
    let rafId = null;
    let lastScrollY = window.scrollY;
    
    // ФУНКЦИЯ ДЛЯ ОБНОВЛЕНИЯ ПАРАЛЛАКСА
    function updateParallaxLayers() {
        const scrollY = window.scrollY;
        
        // Только если позиция изменилась
        if (Math.abs(scrollY - lastScrollY) > 0.5) {
            lastScrollY = scrollY;
            
            bgLayers.forEach((layer, index) => {
                if (layer && layer.style) {
                    const speed = 0.03 + (index * 0.02);
                    const yPos = scrollY * speed;
                    layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
                }
            });
        }
    }
    
    // ОБРАБОТЧИК СКРОЛЛА
    function handleParallaxScroll() {
        if (rafId) return;
        
        rafId = requestAnimationFrame(() => {
            updateParallaxLayers();
            rafId = null;
        });
    }
    
    // Добавляем единственный обработчик скролла
    window.addEventListener('scroll', handleParallaxScroll, { passive: true });
    
    // Инициализируем начальное положение
    setTimeout(() => {
        updateParallaxLayers();
    }, 100);
    
    // Убираем черные overlay
    setTimeout(removeDarkOverlays, 500);
    
    return true;
}

// ===== УДАЛЕНИЕ ТЕМНЫХ OVERLAY =====
function removeDarkOverlays() {
    console.log('🧹 Removing dark overlays...');
    
    // Убираем все возможные overlay элементы
    const overlaySelectors = [
        '.overlay',
        '.dark-layer',
        '.dark-overlay',
        '.parallax-overlay',
        '[class*="overlay"]',
        '[class*="dark"]',
        '.bg-overlay'
    ];
    
    overlaySelectors.forEach(selector => {
        const overlays = document.querySelectorAll(selector);
        overlays.forEach(overlay => {
            // Не трогаем bg-layers-container::after
            if (selector === '[class*="overlay"]' || selector === '[class*="dark"]') {
                const computedStyle = getComputedStyle(overlay);
                const bgColor = computedStyle.backgroundColor;
                
                // Если элемент слишком темный, делаем его прозрачным
                if (bgColor && (bgColor.includes('rgba(0,') || bgColor.includes('rgb(0,') || 
                    bgColor.includes('rgba(10,') || bgColor.includes('rgb(10,'))) {
                    overlay.style.opacity = '0.15';
                    overlay.style.mixBlendMode = 'multiply';
                    console.log(`✅ Fixed dark overlay: ${selector}`);
                }
            }
        });
    });
    
    // Специально обрабатываем защитный слой
    const bgContainer = document.querySelector('.bg-layers-container');
    if (bgContainer) {
        const afterStyle = getComputedStyle(bgContainer, '::after');
        const bgColor = afterStyle.backgroundColor;
        
        if (bgColor && (bgColor.includes('rgba(0,') || bgColor.includes('rgba(10,'))) {
            // Создаем стиль для уменьшения непрозрачности
            const style = document.createElement('style');
            style.textContent = `
                .bg-layers-container::after {
                    background: rgba(10, 25, 47, 0.15) !important;
                    mix-blend-mode: multiply !important;
                }
            `;
            document.head.appendChild(style);
            console.log('✅ Fixed protective layer opacity');
        }
    }
    
    // Удаляем все элементы с черным фоном
    document.querySelectorAll('*').forEach(el => {
        const style = getComputedStyle(el);
        const bgColor = style.backgroundColor;
        
        if (bgColor && (bgColor === 'rgba(0, 0, 0, 0.5)' || 
                        bgColor === 'rgba(0, 0, 0, 0.3)' ||
                        bgColor === 'rgb(0, 0, 0)')) {
            if (el !== document.body && el !== document.documentElement) {
                el.style.opacity = '0.1';
                el.style.pointerEvents = 'none';
                console.log('✅ Fixed black background element');
            }
        }
    });
}

// ===== SPECK BLOCKS АНИМАЦИИ =====
function initializeSpeckBlocks() {
    const blocks = document.querySelectorAll('.speck-vertical-block');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
                
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
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = '0';
                        }
                    }
                });
                
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

window.fixDarkOverlays = function() {
    console.log('🌙 Manually fixing dark overlays...');
    removeDarkOverlays();
};

window.reinitializeParallax = function() {
    console.log('🔄 Reinitializing parallax...');
    initializeSingleParallaxSystem();
};

// УТИЛИТА ДЛЯ ПРОВЕРКИ
window.checkParallaxSystem = function() {
    const bgLayers = document.querySelectorAll('.bg-layer');
    console.log(`🔍 Parallax system check:`);
    console.log(`   - Found ${bgLayers.length} layers`);
    console.log(`   - Scroll position: ${window.scrollY}`);
    console.log(`   - All layers loaded: ${Array.from(bgLayers).every(layer => layer.classList.contains('loaded'))}`);
};

console.log('✅ home.js fully loaded with SINGLE parallax system (NO ERRORS)!');
