console.log('🏠 home.js loaded - BACKGROUND SWITCHING SYSTEM');

// ===== СИСТЕМА СМЕНЫ ФОНОВЫХ ИЗОБРАЖЕНИЙ ПРИ СКРОЛЛЕ =====
class BackgroundSwitcher {
    constructor() {
        this.bgLayers = document.querySelectorAll('.parallax-bg-layer');
        this.bgDots = document.querySelectorAll('.bg-scroll-dot');
        this.sections = document.querySelectorAll('section[data-bg-section]');
        this.currentBgIndex = 0;
        this.lastScrollY = window.scrollY;
        this.scrollThreshold = 100;
        this.isScrolling = false;
        this.scrollTimeout = null;
        
        this.init();
    }
    
    init() {
        console.log(`🎨 BackgroundSwitcher: Found ${this.bgLayers.length} layers, ${this.sections.length} sections`);
        
        if (this.bgLayers.length === 0) {
            console.error('❌ No background layers found');
            return;
        }
        
        // Preload всех изображений
        this.preloadImages();
        
        // Инициализация индикаторов
        this.initIndicators();
        
        // Настройка обработчиков событий
        this.setupEventListeners();
        
        // Инициализация начального состояния
        this.updateBackgroundOnScroll();
        
        console.log('✅ BackgroundSwitcher initialized');
    }
    
    preloadImages() {
        this.bgLayers.forEach((layer, index) => {
            const bgImage = layer.style.backgroundImage;
            const urlMatch = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            
            if (urlMatch) {
                const img = new Image();
                img.onload = () => {
                    console.log(`✅ Preloaded background image ${index + 1}`);
                    layer.classList.add('loaded');
                };
                img.onerror = () => {
                    console.warn(`⚠️ Failed to preload background image ${index + 1}`);
                };
                img.src = urlMatch[1];
            }
        });
    }
    
    initIndicators() {
        this.bgDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.switchToBackground(index);
                this.scrollToSection(index);
            });
        });
    }
    
    setupEventListeners() {
        // Обработчик скролла с троттлингом
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        
        // Обработчик ресайза
        window.addEventListener('resize', () => this.handleResize(), { passive: true });
        
        // Обработчик для touch устройств
        if ('ontouchstart' in window) {
            document.addEventListener('touchmove', () => this.handleScroll(), { passive: true });
        }
    }
    
    handleScroll() {
        if (this.scrollTimeout) return;
        
        this.scrollTimeout = setTimeout(() => {
            this.updateBackgroundOnScroll();
            this.updateParallaxEffect();
            this.scrollTimeout = null;
        }, 16); // ~60fps
    }
    
    handleResize() {
        // Обновляем позиции секций при ресайзе
        this.sectionPositions = this.calculateSectionPositions();
    }
    
    calculateSectionPositions() {
        const positions = [];
        this.sections.forEach(section => {
            positions.push({
                top: section.offsetTop,
                bottom: section.offsetTop + section.offsetHeight,
                height: section.offsetHeight
            });
        });
        return positions;
    }
    
    updateBackgroundOnScroll() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Определяем текущий индекс фона на основе позиции скролла
        let newBgIndex = 0;
        
        if (this.sections.length > 0) {
            // Рассчитываем на основе видимой области
            const visibleCenter = scrollY + (windowHeight / 2);
            
            // Находим активную секцию
            let activeSectionIndex = 0;
            for (let i = 0; i < this.sections.length; i++) {
                const section = this.sections[i];
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (visibleCenter >= sectionTop && visibleCenter <= sectionBottom) {
                    activeSectionIndex = i;
                    break;
                }
            }
            
            // Маппинг секций на фоны (1 секция = 1 фон)
            newBgIndex = Math.min(activeSectionIndex, this.bgLayers.length - 1);
        } else {
            // Альтернативная логика если нет секций с data-bg-section
            const totalHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollPercentage = totalHeight > 0 ? scrollY / totalHeight : 0;
            newBgIndex = Math.floor(scrollPercentage * this.bgLayers.length);
            newBgIndex = Math.min(newBgIndex, this.bgLayers.length - 1);
        }
        
        // Переключаем фон если индекс изменился
        if (newBgIndex !== this.currentBgIndex) {
            this.switchToBackground(newBgIndex);
        }
    }
    
    updateParallaxEffect() {
        const scrollY = window.scrollY;
        
        // Параллакс эффект только для активного слоя
        const activeLayer = this.bgLayers[this.currentBgIndex];
        if (activeLayer) {
            const speed = 0.05;
            const yPos = scrollY * speed;
            activeLayer.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
    }
    
    switchToBackground(index) {
        if (index < 0 || index >= this.bgLayers.length || index === this.currentBgIndex) {
            return;
        }
        
        console.log(`🖼️ Switching background to index: ${index + 1}`);
        
        // Скрываем все слои
        this.bgLayers.forEach(layer => {
            layer.classList.remove('active');
        });
        
        // Показываем выбранный слой
        this.bgLayers[index].classList.add('active');
        
        // Обновляем индикаторы
        this.bgDots.forEach((dot, dotIndex) => {
            if (dotIndex === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        this.currentBgIndex = index;
    }
    
    scrollToSection(bgIndex) {
        // Находим соответствующую секцию для этого фона
        const targetIndex = Math.min(bgIndex, this.sections.length - 1);
        const targetSection = this.sections[targetIndex];
        
        if (targetSection) {
            const header = document.querySelector('.main-header');
            const headerHeight = header ? header.offsetHeight : 0;
            const offset = 20;
            
            const targetPosition = targetSection.offsetTop - headerHeight - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Публичные методы для ручного управления
    nextBackground() {
        const nextIndex = (this.currentBgIndex + 1) % this.bgLayers.length;
        this.switchToBackground(nextIndex);
        return nextIndex;
    }
    
    prevBackground() {
        const prevIndex = (this.currentBgIndex - 1 + this.bgLayers.length) % this.bgLayers.length;
        this.switchToBackground(prevIndex);
        return prevIndex;
    }
    
    getCurrentBackground() {
        return this.currentBgIndex;
    }
}

// ===== ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ СТРАНИЦЫ =====
function initializeHomePage() {
    console.log('📄 INITIALIZING HOME PAGE');
    
    // 1. Инициализация системы смены фона
    window.backgroundSwitcher = new BackgroundSwitcher();
    
    // 2. Гарантируем класс для главной страницы
    document.body.classList.add('home-page');
    document.documentElement.classList.add('home-page');
    
    // 3. НЕМЕДЛЕННАЯ ЗАГРУЗКА ВСЕГО КОНТЕНТА
    setTimeout(() => {
        loadAllContentImmediately();
    }, 100);
    
    // 4. Инициализация всех компонентов
    setTimeout(() => {
        initializeVerticalExpertiseBlocks();
        initializeStatsCounter();
        initializeScrollAnimations();
        initializeScrollProgress();
        initializeCardHoverEffects();
        initializeServicesInteraction();
        
        console.log('✅ Home page fully initialized');
    }, 300);
}

// ===== НЕМЕДЛЕННАЯ ЗАГРУЗКА ВСЕГО КОНТЕНТА =====
function loadAllContentImmediately() {
    console.log('⚡ Loading all content immediately...');
    
    // Показываем все анимированные элементы
    const animatedElements = document.querySelectorAll('.fade-in-down, .fade-in-up, .fade-in-left, .fade-in-right, .animated-element');
    animatedElements.forEach(el => {
        if (el && el.style) {
            el.style.opacity = '1';
            el.style.transform = 'translate(0, 0)';
            el.style.animationPlayState = 'running';
        }
    });
    
    // Показываем все секции
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section && section.style) {
            section.style.opacity = '1';
            section.style.visibility = 'visible';
        }
    });
    
    // Показываем все текстовые элементы
    const textElements = document.querySelectorAll(
        'h1, h2, h3, h4, h5, h6, p, span, li, .title, .subtitle, .description, .text, [data-i18n]'
    );
    
    textElements.forEach(el => {
        if (el && el.style) {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
            el.style.transform = 'translate(0, 0)';
        }
    });
    
    console.log(`⚡ Immediately loaded ${animatedElements.length} animated elements, ${sections.length} sections, ${textElements.length} text elements`);
}

// ===== ИНИЦИАЛИЗАЦИЯ EXPERTISE БЛОКОВ =====
function initializeVerticalExpertiseBlocks() {
    const expertiseBlocks = document.querySelectorAll('.expertise-vertical-block');
    
    if (expertiseBlocks.length === 0) {
        console.log('⚠️ No vertical expertise blocks found');
        return;
    }
    
    console.log(`🎯 Initializing ${expertiseBlocks.length} expertise blocks`);
    
    expertiseBlocks.forEach((block, index) => {
        if (block && block.style) {
            // Немедленно показываем блок
            block.style.opacity = '1';
            block.style.transform = 'translateX(0)';
            
            // Добавляем класс visible для анимаций
            block.classList.add('visible');
            
            // Анимация внутренних элементов
            setTimeout(() => {
                const number = block.querySelector('.expertise-number');
                const title = block.querySelector('.expertise-title');
                const description = block.querySelector('.expertise-description');
                const features = block.querySelectorAll('.expertise-features li');
                
                if (number && number.style) {
                    number.style.transform = 'scale(1)';
                    number.style.opacity = '1';
                }
                
                if (title && title.style) {
                    title.style.opacity = '1';
                    title.style.transform = 'translateX(0)';
                }
                
                if (description && description.style) {
                    description.style.opacity = '1';
                    description.style.transform = 'translateX(0)';
                }
                
                features.forEach((feature, featIndex) => {
                    setTimeout(() => {
                        if (feature && feature.style) {
                            feature.style.opacity = '1';
                            feature.style.transform = 'translateX(0)';
                        }
                    }, featIndex * 50);
                });
            }, index * 100);
            
            // Эффект при наведении
            block.addEventListener('mouseenter', function() {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    this.style.transform = 'translateX(-10px)';
                }
            });
            
            block.addEventListener('mouseleave', function() {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    this.style.transform = 'translateX(0)';
                }
            });
        }
    });
    
    console.log('✅ Vertical expertise blocks initialized');
}

// ===== ИНИЦИАЛИЗАЦИЯ ВЗАИМОДЕЙСТВИЯ С УСЛУГАМИ =====
function initializeServicesInteraction() {
    const serviceItems = document.querySelectorAll('.speck-service-item');
    
    if (serviceItems.length === 0) {
        console.log('⚠️ No service items found');
        return;
    }
    
    console.log(`🎯 Initializing ${serviceItems.length} service items`);
    
    serviceItems.forEach((item, index) => {
        if (item && item.style) {
            // Немедленно показываем элемент
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            
            // Эффект при наведении
            item.addEventListener('mouseenter', function() {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    const arrow = this.querySelector('.service-arrow');
                    if (arrow) {
                        arrow.style.opacity = '1';
                        arrow.style.transform = 'translateX(5px)';
                    }
                    
                    this.style.transform = 'translateY(-5px)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    const arrow = this.querySelector('.service-arrow');
                    if (arrow) {
                        arrow.style.opacity = '0.7';
                        arrow.style.transform = 'translateX(0)';
                    }
                    
                    this.style.transform = 'translateY(0)';
                }
            });
            
            // Клик для показа деталей
            item.addEventListener('click', function(e) {
                // Предотвращаем клик, если кликнули на стрелку
                if (e.target.classList.contains('service-arrow')) return;
                
                const serviceId = this.getAttribute('data-service-id');
                console.log(`Service clicked: ${serviceId}`);
                showServiceDetails(serviceId);
            });
        }
    });
    
    console.log('✅ Service interactions initialized');
}

// ===== ПОКАЗ ДЕТАЛЕЙ УСЛУГИ =====
function showServiceDetails(serviceId) {
    const serviceDetails = {
        'consulting': {
            title: 'Product design consulting',
            features: [
                'Human-centric design approach',
                'Balance of engineering and human needs',
                'Design intuition and technical prowess',
                'Years of hands-on experience across multiple sectors',
                'Modern and cutting-edge techniques',
                'Injection molding, surface finishes, and 3D printing expertise',
                'Holistic approach with UX/UI and industrial design collaboration'
            ]
        },
        'uiux': {
            title: 'UI/UX design',
            features: [
                'Leading UX design firm expertise',
                'User experience and UX/UI design focus',
                'Digital experience enhancement',
                'Deep user research and target audience understanding',
                'Mobile app development, web design, and digital strategies',
                'Engaging tech interactions bridging physical and digital worlds',
                'Structured method with UX research and usability tests'
            ]
        },
        'engineering': {
            title: 'Product engineering',
            features: [
                'Globally awarded and top-ranked firm',
                'Comprehensive product engineering solutions',
                'Process optimization, transformation, and simplification',
                'Collaboration from concept to final product development',
                'User-focused design maps addressing customer pain points',
                'Expert engineering guidance throughout projects'
            ]
        },
        'npi': {
            title: 'NPI and product fulfillment support',
            features: [
                'Robust product fulfillment services',
                'Manufacturing engineering for production transition',
                'High-quality, low-cost, seamless delivery',
                'Injection molding, laser cutting, and CNC milling management',
                'Supply chain management and manufacturer support',
                'Contract manufacturing and product fulfillment',
                'Lead time management for brand focus'
            ]
        },
        'research': {
            title: 'User research and insights',
            features: [
                'Top user experience research company',
                'Expert team ensuring product-customer connection',
                'User interface research and testing',
                'User experience and market research',
                'Quantitative and qualitative research methods',
                'Research, assessments, studies, and surveys',
                'Human-centered solutions discovery',
                'Emotional driver analysis for great user experiences'
            ]
        },
        'brand': {
            title: 'Brand design',
            features: [
                'Renowned graphic and brand design agency',
                'Brand identity creation for marketplace distinction',
                'Target audience captivating and resonance',
                'Tailored strategies for trust, reliability, and excellence',
                'Business spirit embodiment and quality story',
                'Award-winning memorable brand identity creation',
                'Competitive world brand differentiation'
            ]
        },
        'strategy': {
            title: 'Research and strategy',
            features: [
                'Research-driven design importance',
                'Experienced strategists and researchers',
                'Comprehensive target market, trend, and competition studies',
                'Design strategies aligned with business goals',
                'Impressive designs with optimal performance',
                'Market requirement fulfillment',
                'Trend anticipation and user resonance'
            ]
        },
        'innovation': {
            title: 'Innovation strategy',
            features: [
                'Market revolution creation',
                'Strategic innovation and market landscape understanding',
                'Ground-breaking idea validation and refinement',
                'Robust design team for practical, market-ready products',
                'User need service and market boundary redefinition',
                'Industry revolution and market reshaping',
                'User-centered design future definition'
            ]
        }
    };
    
    const service = serviceDetails[serviceId];
    if (!service) {
        console.error(`Service ${serviceId} not found`);
        return;
    }
    
    console.log(`📋 Showing modal for: ${service.title}`);
    
    // Создаем модальное окно
    const modalHtml = `
        <div class="service-details-modal">
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${service.title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="service-features">
                        <h4>Key Expertise & Capabilities:</h4>
                        <ul>
                            ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="contacts.html" class="btn btn-primary">Discuss This Service</a>
                    <button class="btn btn-secondary modal-close-btn">Close</button>
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
        .service-details-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: modalFadeIn 0.3s ease;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            position: relative;
            background: rgba(20, 30, 48, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 12px;
            padding: 40px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            animation: modalSlideUp 0.4s ease;
            z-index: 10000;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 25px;
        }
        
        .modal-header h3 {
            font-size: 1.8rem;
            color: white;
            margin: 0;
            flex: 1;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }
        
        .modal-close {
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
        
        .modal-close:hover {
            color: #0066ff;
            transform: rotate(90deg);
        }
        
        .modal-body {
            margin-bottom: 30px;
        }
        
        .service-features h4 {
            font-size: 1.3rem;
            color: white;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .service-features ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .service-features li {
            padding: 12px 0;
            color: rgba(255, 255, 255, 0.9);
            position: relative;
            padding-left: 30px;
            line-height: 1.6;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .service-features li:before {
            content: "→";
            position: absolute;
            left: 0;
            color: #0066ff;
            font-weight: bold;
            font-size: 1.2rem;
        }
        
        .service-features li:last-child {
            border-bottom: none;
        }
        
        .modal-footer {
            display: flex;
            gap: 15px;
            justify-content: flex-end;
        }
        
        .modal-close-btn {
            background: rgba(255, 255, 255, 0.08) !important;
        }
        
        @keyframes modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes modalSlideUp {
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
            .modal-content {
                padding: 25px;
                width: 95%;
            }
            
            .modal-header h3 {
                font-size: 1.5rem;
            }
            
            .modal-footer {
                flex-direction: column;
            }
            
            .modal-footer .btn {
                width: 100%;
            }
        }
    `;
    
    document.head.appendChild(modalStyles);
    
    // Обработчики событий для модального окна
    function closeModal() {
        modalContainer.style.animation = 'modalFadeOut 0.3s ease';
        modalContainer.style.opacity = '0';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes modalFadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            if (modalContainer.parentNode) {
                modalContainer.parentNode.removeChild(modalContainer);
            }
            if (modalStyles.parentNode) {
                modalStyles.parentNode.removeChild(modalStyles);
            }
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }, 300);
    }
    
    // Закрытие по клику на overlay, кнопку закрытия или Escape
    const closeBtn = modalContainer.querySelector('.modal-close');
    const closeBtn2 = modalContainer.querySelector('.modal-close-btn');
    const overlay = modalContainer.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', closeModal);
    closeBtn2.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // Закрытие по Escape
    document.addEventListener('keydown', function handleEscape(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    });
}

// ===== ИНИЦИАЛИЗАЦИЯ СТАТИСТИКИ =====
function initializeStatsCounter() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length === 0) {
        console.log('⚠️ No stat counters found');
        return;
    }
    
    console.log(`🎯 Initializing ${counters.length} stat counters`);
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count')) || 0;
        if (target > 0) {
            // Немедленно показываем финальное значение
            counter.textContent = target;
            counter.classList.add('counter-animate');
        }
    });
    
    console.log('✅ Stat counters initialized');
}

// ===== SCROLL АНИМАЦИИ =====
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-down, .fade-in-up, .fade-in-left, .fade-in-right');
    
    console.log(`🎯 Found ${animatedElements.length} animated elements`);
    
    // Уже показаны в loadAllContentImmediately()
    
    // Настраиваем IntersectionObserver для новых элементов
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translate(0, 0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
}

// ===== SCROLL PROGRESS BAR =====
function initializeScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    
    if (!progressBar) {
        console.log('⚠️ Scroll progress bar not found');
        return;
    }
    
    const updateProgress = () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        
        if (progressBar.style) {
            progressBar.style.width = `${scrollPercent}%`;
        }
    };
    
    window.addEventListener('scroll', updateProgress, { passive: true });
    
    // Инициализация
    updateProgress();
    progressBar.style.transition = 'width 0.3s ease';
    
    console.log('✅ Scroll progress bar initialized');
}

// ===== HOVER ЭФФЕКТЫ ДЛЯ КАРТОЧЕК =====
function initializeCardHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        if (!card) return;
        
        card.addEventListener('mouseenter', function() {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.style.transform = 'translateY(-15px) scale(1.02)';
                this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.35)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.25)';
            }
        });
        
        // Добавляем transition для плавности
        card.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease';
    });
    
    console.log(`✅ Card hover effects initialized for ${projectCards.length} cards`);
}

// ===== УПРАВЛЕНИЕ FAQ (для совместимости) =====
function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) {
        console.log('⚠️ No FAQ items found');
        return;
    }
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Закрываем все FAQ
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                    const faqAnswer = faq.querySelector('.faq-answer');
                    if (faqAnswer) {
                        faqAnswer.style.display = 'none';
                        faqAnswer.style.maxHeight = '0';
                        faqAnswer.style.opacity = '0';
                    }
                });
                
                // Открываем текущий если был закрыт
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.display = 'block';
                    setTimeout(() => {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        answer.style.opacity = '1';
                    }, 10);
                }
            });
        }
    });
    
    console.log(`✅ FAQ accordion setup for ${faqItems.length} items`);
}

// ===== ЗАПУСК ПРИ ЗАГРУЗКЕ =====
function safeInitialize() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                initializeHomePage();
                setupFAQAccordion();
            }, 100);
        });
    } else {
        setTimeout(() => {
            initializeHomePage();
            setupFAQAccordion();
        }, 100);
    }
}

// Запускаем инициализацию
safeInitialize();

// ===== ГЛОБАЛЬНЫЕ ФУНКЦИИ ДЛЯ УПРАВЛЕНИЯ =====
window.switchBackground = function(index) {
    if (window.backgroundSwitcher) {
        window.backgroundSwitcher.switchToBackground(index);
        return true;
    }
    return false;
};

window.nextBackground = function() {
    if (window.backgroundSwitcher) {
        return window.backgroundSwitcher.nextBackground();
    }
    return -1;
};

window.prevBackground = function() {
    if (window.backgroundSwitcher) {
        return window.backgroundSwitcher.prevBackground();
    }
    return -1;
};

window.getCurrentBackground = function() {
    if (window.backgroundSwitcher) {
        return window.backgroundSwitcher.getCurrentBackground();
    }
    return 0;
};

window.reinitializeBackground = function() {
    console.log('🔄 Reinitializing background switching...');
    if (window.backgroundSwitcher) {
        window.backgroundSwitcher = new BackgroundSwitcher();
    }
    return true;
};

window.showServiceDetails = function(serviceId) {
    showServiceDetails(serviceId);
};

// Экспорт функций
window.homePage = {
    initialize: initializeHomePage,
    reinitialize: () => {
        initializeHomePage();
        setupFAQAccordion();
    },
    switchBackground,
    nextBackground,
    prevBackground,
    getCurrentBackground,
    showServiceDetails
};

console.log('✅ home.js fully loaded - READY WITH BACKGROUND SWITCHING');
