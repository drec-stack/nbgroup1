console.log('🏠 home.js loaded - FIXED PARALLAX VERSION WITH SPECK SERVICES (NO ERRORS)');

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
        initializeSpeckServices(); // Инициализация Speck услуг
        
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

// ===== SPECK SERVICES АНИМАЦИИ И ВЗАИМОДЕЙСТВИЕ =====
function initializeSpeckServices() {
    const serviceCards = document.querySelectorAll('.speck-service-card');
    
    if (serviceCards.length === 0) {
        console.log('⚠️ No Speck service cards found');
        return;
    }
    
    // Наблюдатель для анимации появления
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Применяем анимацию к каждой карточке
    serviceCards.forEach((card, index) => {
        if (card && card.style) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease';
            card.style.transitionDelay = `${0.3 + (index * 0.05)}s`;
            
            observer.observe(card);
            
            // Эффект при наведении
            card.addEventListener('mouseenter', function() {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    this.style.transform = 'translateY(-10px)';
                    const icon = this.querySelector('.speck-card-icon');
                    if (icon) {
                        icon.style.transform = 'translateX(5px)';
                    }
                }
            });
            
            card.addEventListener('mouseleave', function() {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    this.style.transform = 'translateY(0)';
                    const icon = this.querySelector('.speck-card-icon');
                    if (icon) {
                        icon.style.transform = 'translateX(0)';
                    }
                }
            });
            
            // Клик для подробной информации
            card.addEventListener('click', function() {
                const serviceId = this.getAttribute('data-service-id');
                console.log(`Service clicked: ${serviceId}`);
                // Здесь можно добавить логику для показа подробной информации
                // Например, открыть модальное окно с деталями услуги
                showServiceDetails(serviceId);
            });
        }
    });
    
    console.log(`✅ Speck services initialized with ${serviceCards.length} cards`);
}

// ===== ПОКАЗАТЬ ДЕТАЛИ УСЛУГИ =====
function showServiceDetails(serviceId) {
    const serviceDetails = {
        'consulting': {
            title: 'Product design consulting',
            description: 'Our teams balance electrical and mechanical engineering with human needs. The result is human-centric designs. We emphasize both design intuition and technical prowess throughout product development consulting.',
            features: [
                'Human-centric design approach',
                'Balance of engineering and human needs',
                'Design intuition and technical prowess',
                'End-to-end product development consulting'
            ]
        },
        'uiux': {
            title: 'UI/UX design',
            description: 'Speck stands out in this arena as a leading UX design firm. Our primary focus? User experience and UX UI design. Our goal is clear: Enhance the digital experience.',
            features: [
                'Leading UX design expertise',
                'User experience optimization',
                'Digital experience enhancement',
                'UI/UX design implementation'
            ]
        },
        'engineering': {
            title: 'Product engineering',
            description: 'Speck Design is a globally awarded and top-ranked product engineering and industrial design firm. They provide comprehensive and unique product engineering solutions.',
            features: [
                'Global award-winning engineering',
                'Comprehensive product solutions',
                'Industrial design expertise',
                'End-to-end engineering support'
            ]
        },
        'npi': {
            title: 'NPI and product fulfillment support',
            description: 'Speck Design offers robust product fulfillment services. Our manufacturing engineering department transitions designs into production, ensuring high-quality, low-cost, seamless delivery.',
            features: [
                'Robust product fulfillment',
                'Manufacturing engineering',
                'High-quality production',
                'Seamless delivery process'
            ]
        },
        'research': {
            title: 'User research and insights',
            description: 'We are a top user experience research company. Our team of experts ensures that products meet customer needs and connect with future customers.',
            features: [
                'User experience research',
                'Customer insights analysis',
                'Market needs assessment',
                'Future customer connection'
            ]
        },
        'brand': {
            title: 'Brand design',
            description: 'We are a renowned graphic design and brand design agency. We specialize in creating brand designs that captivate and resonate with your target audience.',
            features: [
                'Renowned brand design agency',
                'Target audience resonance',
                'Captivating brand identity',
                'Graphic design expertise'
            ]
        },
        'strategy': {
            title: 'Research and strategy',
            description: 'As one of the top product design engineering firms, Speck Design recognizes the importance of research-driven design. Our commitment to research ensures our designs look impressive, deliver optimal performance, and meet market requirements.',
            features: [
                'Research-driven design approach',
                'Market requirements analysis',
                'Optimal performance delivery',
                'Strategic design planning'
            ]
        },
        'innovation': {
            title: 'Innovation strategy',
            description: 'At Speck Design, we don\'t just make products. We create market revolutions as a new product development company. Our approach is simple but effective. We take your ground-breaking ideas and run them through a process of validation and refinement.',
            features: [
                'Market revolution creation',
                'Ground-breaking idea validation',
                'Innovation refinement process',
                'New product development'
            ]
        }
    };
    
    const service = serviceDetails[serviceId];
    if (!service) return;
    
    console.log(`📋 Showing details for: ${service.title}`);
    
    // Создаем модальное окно для деталей услуги
    const modalHtml = `
        <div class="service-modal-overlay">
            <div class="service-modal">
                <div class="service-modal-header">
                    <h3>${service.title}</h3>
                    <button class="service-modal-close">&times;</button>
                </div>
                <div class="service-modal-content">
                    <p>${service.description}</p>
                    <div class="service-features">
                        <h4>Key Features:</h4>
                        <ul>
                            ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                <div class="service-modal-footer">
                    <a href="contacts.html" class="btn btn-primary">Contact Us About This Service</a>
                </div>
            </div>
        </div>
    `;
    
    // Добавляем модальное окно на страницу
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHtml;
    document.body.appendChild(modalContainer);
    
    // Добавляем стили для модального окна
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .service-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        }
        
        .service-modal {
            background: rgba(20, 30, 48, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 12px;
            padding: 40px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            animation: slideUp 0.4s ease;
            position: relative;
            z-index: 10000;
        }
        
        .service-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 25px;
        }
        
        .service-modal-header h3 {
            font-size: 1.8rem;
            color: white;
            margin: 0;
            flex: 1;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }
        
        .service-modal-close {
            background: transparent;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            padding: 0;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            margin-left: 20px;
        }
        
        .service-modal-close:hover {
            color: #0066ff;
            transform: rotate(90deg);
        }
        
        .service-modal-content {
            margin-bottom: 30px;
        }
        
        .service-modal-content p {
            font-size: 1.1rem;
            line-height: 1.7;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 25px;
        }
        
        .service-features h4 {
            font-size: 1.3rem;
            color: white;
            margin-bottom: 15px;
        }
        
        .service-features ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .service-features li {
            padding: 8px 0;
            color: rgba(255, 255, 255, 0.85);
            position: relative;
            padding-left: 25px;
        }
        
        .service-features li:before {
            content: "→";
            position: absolute;
            left: 0;
            color: #0066ff;
            font-weight: bold;
        }
        
        .service-modal-footer {
            text-align: center;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @media (max-width: 768px) {
            .service-modal {
                padding: 25px;
                width: 95%;
            }
            
            .service-modal-header h3 {
                font-size: 1.5rem;
            }
        }
    `;
    
    document.head.appendChild(modalStyles);
    
    // Обработчики событий для модального окна
    const closeBtn = modalContainer.querySelector('.service-modal-close');
    const overlay = modalContainer.querySelector('.service-modal-overlay');
    
    function closeModal() {
        modalContainer.style.animation = 'fadeOut 0.3s ease';
        modalContainer.style.opacity = '0';
        setTimeout(() => {
            if (modalContainer.parentNode) {
                modalContainer.parentNode.removeChild(modalContainer);
            }
            if (modalStyles.parentNode) {
                modalStyles.parentNode.removeChild(modalStyles);
            }
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', function handleEscape(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    });
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

window.showServiceDetails = showServiceDetails;

// УТИЛИТА ДЛЯ ПРОВЕРКИ
window.checkParallaxSystem = function() {
    const bgLayers = document.querySelectorAll('.bg-layer');
    console.log(`🔍 Parallax system check:`);
    console.log(`   - Found ${bgLayers.length} layers`);
    console.log(`   - Scroll position: ${window.scrollY}`);
    console.log(`   - All layers loaded: ${Array.from(bgLayers).every(layer => layer.classList.contains('loaded'))}`);
};

console.log('✅ home.js fully loaded with Speck services system!');
