console.log('🏠 home.js loaded - FIXED VERSION WITH EXPERTISE SECTION');

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
        initializeExpertiseBlocks(); // Добавляем инициализацию блоков Expertise
        initializeStatsCounter();
        initializeFAQ();
        initializeScrollAnimations();
        initializeScrollProgress();
        initializeCardHoverEffects();
        initializeServicesInteraction(); // Инициализация интерактивности услуг
        
        console.log('✅ Home page fully initialized with Expertise section');
    }, 300);
}

// ===== ЕДИНАЯ СИСТЕМА ПАРАЛЛАКСА =====
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
                if (bgLayers[index].style) {
                    bgLayers[index].style.opacity = '';
                }
            }
            
            if (loadedImages === imagePaths.length) {
                console.log('✅ All background images loaded successfully');
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
    
    return true;
}

// ===== ИНИЦИАЛИЗАЦИЯ EXPERTISE БЛОКОВ =====
function initializeExpertiseBlocks() {
    const expertiseBlocks = document.querySelectorAll('.expertise-block');
    
    if (expertiseBlocks.length === 0) {
        console.log('⚠️ No expertise blocks found');
        return;
    }
    
    console.log(`✅ Found ${expertiseBlocks.length} expertise blocks`);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.style) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    expertiseBlocks.forEach(block => {
        if (block) {
            block.style.opacity = '0';
            block.style.transform = 'translateY(50px) scale(0.95)';
            observer.observe(block);
            
            // Hover эффекты
            block.addEventListener('mouseenter', function() {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    const number = this.querySelector('.expertise-number');
                    if (number && number.style) {
                        number.style.animation = 'expertiseNumberGlow 2s ease-in-out infinite';
                    }
                    
                    const features = this.querySelectorAll('.expertise-features li');
                    features.forEach(feature => {
                        if (feature.style) {
                            feature.style.transition = 'color 0.3s ease';
                        }
                    });
                }
            });
            
            block.addEventListener('mouseleave', function() {
                const number = this.querySelector('.expertise-number');
                if (number && number.style) {
                    number.style.animation = '';
                }
            });
        }
    });
    
    // Также наблюдаем за заголовком и подзаголовком секции
    const expertiseTitle = document.querySelector('.expertise-section .section-title');
    const expertiseSubtitle = document.querySelector('.expertise-section .section-subtitle');
    
    if (expertiseTitle) {
        expertiseTitle.style.opacity = '0';
        expertiseTitle.style.transform = 'translateY(-20px)';
        expertiseTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            if (expertiseTitle.style) {
                expertiseTitle.style.opacity = '1';
                expertiseTitle.style.transform = 'translateY(0)';
            }
        }, 300);
    }
    
    if (expertiseSubtitle) {
        expertiseSubtitle.style.opacity = '0';
        expertiseSubtitle.style.transform = 'translateY(20px)';
        expertiseSubtitle.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';
        
        setTimeout(() => {
            if (expertiseSubtitle.style) {
                expertiseSubtitle.style.opacity = '1';
                expertiseSubtitle.style.transform = 'translateY(0)';
            }
        }, 500);
    }
    
    console.log('✅ Expertise blocks animation initialized');
}

// ===== ИНИЦИАЛИЗАЦИЯ ВЗАИМОДЕЙСТВИЯ С УСЛУГАМИ =====
function initializeServicesInteraction() {
    const serviceItems = document.querySelectorAll('.speck-service-item');
    
    if (serviceItems.length === 0) {
        console.log('⚠️ No service items found');
        return;
    }
    
    console.log(`✅ Found ${serviceItems.length} service items`);
    
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
    
    // Применяем анимацию к каждой услуге
    serviceItems.forEach((item, index) => {
        if (item && item.style) {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            item.style.transitionDelay = `${0.3 + (index * 0.05)}s`;
            
            observer.observe(item);
            
            // Эффект при наведении
            item.addEventListener('mouseenter', function() {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    const arrow = this.querySelector('.service-arrow');
                    if (arrow) {
                        arrow.style.opacity = '1';
                        arrow.style.transform = 'translateX(5px)';
                    }
                }
            });
            
            item.addEventListener('mouseleave', function() {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    const arrow = this.querySelector('.service-arrow');
                    if (arrow) {
                        arrow.style.opacity = '0.7';
                        arrow.style.transform = 'translateX(0)';
                    }
                }
            });
            
            // Клик для прокрутки к деталям
            item.addEventListener('click', function(e) {
                // Предотвращаем клик, если кликнули на стрелку
                if (e.target.classList.contains('service-arrow')) return;
                
                const serviceId = this.getAttribute('data-service-id');
                console.log(`Service clicked: ${serviceId}`);
                scrollToServiceDetails(serviceId);
            });
        }
    });
    
    // Наблюдатель для заголовка и интро
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                headerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Анимируем заголовок и интро
    const serviceTitle = document.querySelector('.speck-section-title');
    const serviceIntro = document.querySelector('.speck-services-intro');
    
    if (serviceTitle) {
        serviceTitle.style.opacity = '0';
        serviceTitle.style.transform = 'translateY(-20px)';
        serviceTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        headerObserver.observe(serviceTitle);
    }
    
    if (serviceIntro) {
        serviceIntro.style.opacity = '0';
        serviceIntro.style.transform = 'translateY(20px)';
        serviceIntro.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';
        headerObserver.observe(serviceIntro);
    }
}

// ===== ПРОКРУТКА К ДЕТАЛЯМ УСЛУГИ =====
function scrollToServiceDetails(serviceId) {
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
    if (!service) return;
    
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

window.reinitializeParallax = function() {
    console.log('🔄 Reinitializing parallax...');
    initializeSingleParallaxSystem();
};

window.showServiceDetails = function(serviceId) {
    scrollToServiceDetails(serviceId);
};

console.log('✅ home.js fully loaded with Expertise section implementation!');
