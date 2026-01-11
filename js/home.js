console.log('🏠 home.js loaded - FIXED VERSION WITH WORKING FAQ ACCORDION');

// ===== ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ =====
function initializeHomePage() {
    console.log('📄 INITIALIZING HOME PAGE - IMMEDIATE CONTENT LOAD');
    
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
    
    // 3. НЕМЕДЛЕННАЯ ЗАГРУЗКА ВСЕГО КОНТЕНТА ПРИ ЗАХОДЕ НА САЙТ
    setTimeout(() => {
        // Немедленно показываем весь текст
        const allContentElements = document.querySelectorAll(
            '.hero-content, .expertise-vertical-content, .project-content, .service-content, .journal-content, .faq-item, .stat-card, .cta-content'
        );
        
        allContentElements.forEach((el, index) => {
            setTimeout(() => {
                if (el && el.style) {
                    el.style.opacity = '1';
                    el.style.visibility = 'visible';
                    el.style.transform = 'translate(0, 0)';
                    
                    // Немедленно показываем все дочерние текстовые элементы
                    const textChildren = el.querySelectorAll('h1, h2, h3, h4, p, span, li');
                    textChildren.forEach(textEl => {
                        if (textEl && textEl.style) {
                            textEl.style.opacity = '1';
                            textEl.style.transform = 'translate(0, 0)';
                        }
                    });
                }
            }, index * 50);
        });
        
        console.log(`⚡ Immediately loaded ${allContentElements.length} content sections`);
    }, 100);
    
    // 4. Запускаем единую систему параллакса
    initializeSingleParallaxSystem();
    
    // 5. Запускаем все остальные функции с немедленной загрузкой
    setTimeout(() => {
        initializeVerticalExpertiseBlocksImmediate(); // Немедленная загрузка
        initializeStatsCounterImmediate(); // Немедленная загрузка
        setupUniversalFAQAccordion(); // Инициализация FAQ аккордеона
        initializeScrollAnimationsImmediate(); // Немедленная загрузка
        initializeScrollProgress();
        initializeCardHoverEffects();
        initializeServicesInteraction();
        
        console.log('✅ Home page fully initialized with IMMEDIATE content loading');
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

// ===== НЕМЕДЛЕННАЯ ЗАГРУЗКА EXPERTISE БЛОКОВ =====
function initializeVerticalExpertiseBlocksImmediate() {
    const expertiseBlocks = document.querySelectorAll('.expertise-vertical-block');
    
    if (expertiseBlocks.length === 0) {
        console.log('⚠️ No vertical expertise blocks found');
        return;
    }
    
    console.log(`⚡ Immediately loading ${expertiseBlocks.length} expertise blocks`);
    
    expertiseBlocks.forEach((block, index) => {
        if (block && block.style) {
            // НЕМЕДЛЕННО показываем блок
            block.style.opacity = '1';
            block.style.transform = 'translateX(0)';
            
            // Немедленно показываем внутренние элементы
            const number = block.querySelector('.expertise-number');
            const title = block.querySelector('.expertise-title');
            const description = block.querySelector('.expertise-description');
            const features = block.querySelectorAll('.expertise-features li');
            
            setTimeout(() => {
                if (number && number.style) {
                    number.style.transform = 'scale(1)';
                    number.style.opacity = '1';
                }
            }, 200);
            
            setTimeout(() => {
                if (title && title.style) {
                    title.style.opacity = '1';
                    title.style.transform = 'translateX(0)';
                }
            }, 300);
            
            setTimeout(() => {
                if (description && description.style) {
                    description.style.opacity = '1';
                    description.style.transform = 'translateX(0)';
                }
            }, 400);
            
            features.forEach((feature, featIndex) => {
                setTimeout(() => {
                    if (feature && feature.style) {
                        feature.style.opacity = '1';
                        feature.style.transform = 'translateX(0)';
                    }
                }, 500 + (featIndex * 50));
            });
        }
    });
    
    // Анимация заголовков секции
    const expertiseTitle = document.querySelector('.expertise-main-title');
    const expertiseSubtitle = document.querySelector('.expertise-subtitle');
    
    if (expertiseTitle) {
        expertiseTitle.style.opacity = '1';
        expertiseTitle.style.transform = 'translateY(0)';
        expertiseTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
    
    if (expertiseSubtitle) {
        expertiseSubtitle.style.opacity = '1';
        expertiseSubtitle.style.transform = 'translateY(0)';
        expertiseSubtitle.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';
    }
    
    console.log('✅ Vertical expertise blocks immediately visible');
}

// ===== ИНИЦИАЛИЗАЦИЯ ВЗАИМОДЕЙСТВИЯ С УСЛУГАМИ =====
function initializeServicesInteraction() {
    const serviceItems = document.querySelectorAll('.speck-service-item');
    
    if (serviceItems.length === 0) {
        console.log('⚠️ No service items found');
        return;
    }
    
    console.log(`✅ Found ${serviceItems.length} service items`);
    
    // Немедленно показываем все услуги
    serviceItems.forEach((item, index) => {
        if (item && item.style) {
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
    
    // Немедленно показываем заголовок и интро
    const serviceTitle = document.querySelector('.speck-section-title');
    const serviceIntro = document.querySelector('.speck-services-intro');
    
    if (serviceTitle) {
        serviceTitle.style.opacity = '1';
        serviceTitle.style.transform = 'translateY(0)';
    }
    
    if (serviceIntro) {
        serviceIntro.style.opacity = '1';
        serviceIntro.style.transform = 'translateY(0)';
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

// ===== НЕМЕДЛЕННАЯ СТАТИСТИКА СЧЁТЧИК =====
function initializeStatsCounterImmediate() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length === 0) {
        console.log('⚠️ No stat counters found');
        return;
    }
    
    console.log(`⚡ Immediately animating ${counters.length} counters`);
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count')) || 0;
        if (target > 0) {
            // Немедленно показываем финальное значение
            counter.textContent = target;
            counter.classList.add('counter-animate');
        }
    });
}

// ===== УНИВЕРСАЛЬНЫЙ FAQ АККОРДЕОН =====
function setupUniversalFAQAccordion() {
    console.log('🎯 Setting up universal FAQ accordion');
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) {
        console.warn('No FAQ items found');
        return;
    }
    
    // Инициализируем каждый элемент
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question?.querySelector('i');
        
        if (!question || !answer) return;
        
        // 1. Устанавливаем начальное состояние (скрытые ответы)
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        answer.style.overflow = 'hidden';
        answer.style.paddingTop = '0';
        answer.style.paddingBottom = '0';
        answer.style.marginTop = '0';
        
        // 2. Добавляем accessibility атрибуты
        question.id = `faq-question-${index}`;
        answer.id = `faq-answer-${index}`;
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('aria-controls', answer.id);
        answer.setAttribute('aria-labelledby', question.id);
        answer.setAttribute('role', 'region');
        
        // 3. Обработчик клика
        const handleClick = () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            
            // Переключаем состояние
            const newExpandedState = !isExpanded;
            question.setAttribute('aria-expanded', newExpandedState);
            item.classList.toggle('active');
            
            // Анимация ответа
            if (newExpandedState) {
                // Открываем
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
                answer.style.paddingTop = '15px';
                answer.style.paddingBottom = '30px';
                answer.style.marginTop = '15px';
                
                // Анимация иконки (плюс → крестик)
                if (icon) {
                    icon.style.transform = 'rotate(45deg)';
                    icon.style.color = '#66b5ff';
                    icon.style.background = 'rgba(102, 181, 255, 0.2)';
                }
            } else {
                // Закрываем
                answer.style.maxHeight = '0';
                answer.style.opacity = '0';
                answer.style.paddingTop = '0';
                answer.style.paddingBottom = '0';
                answer.style.marginTop = '0';
                
                // Анимация иконки (крестик → плюс)
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                    icon.style.color = 'rgba(255, 255, 255, 0.7)';
                    icon.style.background = 'rgba(255, 255, 255, 0.1)';
                }
            }
        };
        
        // 4. Удаляем старые обработчики и добавляем новые
        question.removeEventListener('click', handleClick);
        question.addEventListener('click', handleClick);
        
        // 5. Поддержка клавиатуры
        question.removeEventListener('keydown', handleKeydown);
        question.addEventListener('keydown', function handleKeydown(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
            }
        });
        
        // 6. Устанавливаем курсор
        question.style.cursor = 'pointer';
        
        // 7. Немедленно показываем вопрос
        question.style.opacity = '1';
        question.style.transform = 'translateY(0)';
    });
    
    console.log(`✅ FAQ accordion setup complete for ${faqItems.length} items (multiple can be open)`);
}

// ===== НЕМЕДЛЕННЫЕ SCROLL АНИМАЦИИ =====
function initializeScrollAnimationsImmediate() {
    const animatedElements = document.querySelectorAll('.fade-in-down, .fade-in-up, .fade-in-left, .fade-in-right');
    
    console.log(`⚡ Immediately showing ${animatedElements.length} animated elements`);
    
    animatedElements.forEach(el => {
        if (el) {
            // Немедленно показываем элемент
            el.style.opacity = '1';
            el.style.transform = 'translate(0, 0)';
            el.style.animationPlayState = 'running';
        }
    });
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

// Для отладки FAQ
window.testFAQ = function() {
    console.log('Testing FAQ...');
    const faqItems = document.querySelectorAll('.faq-item');
    console.log(`Found ${faqItems.length} FAQ items`);
    faqItems.forEach((item, index) => {
        console.log(`Item ${index}:`, {
            hasActive: item.classList.contains('active'),
            answerHeight: item.querySelector('.faq-answer')?.scrollHeight
        });
    });
};

// Функция для принудительной немедленной загрузки всего контента
window.loadAllContentImmediately = function() {
    console.log('⚡ Forcing immediate content load...');
    
    const allTextElements = document.querySelectorAll(
        'h1, h2, h3, h4, h5, h6, p, span, li, .title, .subtitle, .description, .text, [data-i18n]'
    );
    
    allTextElements.forEach(el => {
        if (el && el.style) {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
            el.style.transform = 'translate(0, 0)';
        }
    });
    
    document.body.classList.add('all-content-loaded');
    
    console.log(`✅ Immediately loaded ${allTextElements.length} text elements`);
};

// Функция для открытия всех FAQ вопросов (для тестирования)
window.openAllFAQ = function() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        if (question && answer && icon) {
            question.setAttribute('aria-expanded', 'true');
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.opacity = '1';
            answer.style.paddingTop = '15px';
            answer.style.paddingBottom = '30px';
            answer.style.marginTop = '15px';
            icon.style.transform = 'rotate(45deg)';
            icon.style.color = '#66b5ff';
            icon.style.background = 'rgba(102, 181, 255, 0.2)';
        }
    });
    console.log('✅ All FAQ items opened');
};

// Функция для закрытия всех FAQ вопросов
window.closeAllFAQ = function() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        if (question && answer && icon) {
            question.setAttribute('aria-expanded', 'false');
            item.classList.remove('active');
            answer.style.maxHeight = '0';
            answer.style.opacity = '0';
            answer.style.paddingTop = '0';
            answer.style.paddingBottom = '0';
            answer.style.marginTop = '0';
            icon.style.transform = 'rotate(0deg)';
            icon.style.color = 'rgba(255, 255, 255, 0.7)';
            icon.style.background = 'rgba(255, 255, 255, 0.1)';
        }
    });
    console.log('✅ All FAQ items closed');
};

console.log('✅ home.js fully loaded with WORKING FAQ ACCORDION!');
