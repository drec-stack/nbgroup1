// home.js - ПОЛНАЯ ВЕРСИЯ ДЛЯ SPECK DESIGN БЛОКОВ

console.log('🏠 home.js loaded - SPECK DESIGN BLOCKS INTEGRATION');

// ===== ГЛОБАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ =====
function initializeHomePage() {
    console.log('🚀 Initializing home page with Speck Design blocks...');
    
    // 1. Гарантируем класс для главной страницы
    document.body.classList.add('home-page');
    document.documentElement.classList.add('home-page');
    
    // 2. Инициализация всех блоков Speck Design
    initializeSpeckDesignBlocks();
    
    // 3. Базовая инициализация
    initializeBasicFunctions();
    
    console.log('✅ Home page initialized successfully');
}

// ===== ИНИЦИАЛИЗАЦИЯ SPECK DESIGN БЛОКОВ =====
function initializeSpeckDesignBlocks() {
    console.log('🎨 Initializing Speck Design blocks...');
    
    // 1. Добавляем класс для активации анимаций
    const speckBlocks = document.querySelectorAll('.speck-design-section');
    speckBlocks.forEach((block, index) => {
        setTimeout(() => {
            block.classList.add('speck-block-loaded');
            console.log(`✅ Speck block ${index + 1} loaded: ${block.className.split(' ')[0]}`);
        }, index * 300);
    });
    
    // 2. Инициализация компонентов
    initializeProjects();
    initializeServices();
    initializeJournals();
    initializeFAQ();
    initializeCTA();
    
    // 3. Инициализация интерактивных эффектов
    initializeHoverEffects();
    initializeScrollAnimations();
    initializeLazyLoading();
    
    console.log('✅ All Speck Design blocks initialized');
}

// ===== ПРОЕКТЫ =====
function initializeProjects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectCards.length === 0) return;
    
    console.log(`🎯 Found ${projectCards.length} project cards`);
    
    // Клик по карточке проекта
    projectCards.forEach(card => {
        // Делаем всю карточку кликабельной
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function(e) {
            // Не переходим по ссылке, если кликнули на другие кликабельные элементы
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                return;
            }
            
            // Ищем ссылку внутри карточки
            const link = this.querySelector('a');
            if (link) {
                e.preventDefault();
                window.location.href = link.href;
            }
        });
        
        // Hover эффекты
        card.addEventListener('mouseenter', function() {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
    });
}

// ===== УСЛУГИ =====
function initializeServices() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    if (serviceItems.length === 0) return;
    
    console.log(`⚙️ Found ${serviceItems.length} service items`);
    
    // Анимация при наведении на услуги
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                const icon = this.querySelector('.service-icon');
                if (icon) {
                    icon.style.transition = 'transform 0.3s ease';
                }
            }
        });
        
        // Клик по услуге (для будущего расширения)
        item.addEventListener('click', function(e) {
            // Можно добавить модальное окно с детальной информацией
            if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
                console.log('Service clicked:', this.querySelector('h3')?.textContent);
            }
        });
    });
}

// ===== ЖУРНАЛЫ =====
function initializeJournals() {
    const journalItems = document.querySelectorAll('.journal-item');
    
    if (journalItems.length === 0) return;
    
    console.log(`📰 Found ${journalItems.length} journal items`);
    
    // Клик по статье журнала
    journalItems.forEach(item => {
        // Делаем всю статью кликабельной
        item.style.cursor = 'pointer';
        
        item.addEventListener('click', function(e) {
            // Не переходим по ссылке, если кликнули на другие кликабельные элементы
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a')) {
                return;
            }
            
            // Ищем ссылку на статью
            const link = this.querySelector('.journal-link');
            if (link) {
                e.preventDefault();
                window.location.href = link.href;
            }
        });
        
        // Hover эффекты для ссылок
        const journalLinks = item.querySelectorAll('.journal-link');
        journalLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    const icon = this.querySelector('i');
                    if (icon) {
                        icon.style.transition = 'transform 0.3s ease';
                    }
                }
            });
        });
    });
}

// ===== FAQ (АККОРДЕОН) =====
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    console.log(`❓ Found ${faqItems.length} FAQ items`);
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) return;
        
        // Устанавливаем начальную высоту ответа
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s ease';
        
        // Обработчик клика по вопросу
        question.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Закрываем все другие открытые вопросы
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    closeFAQItem(otherItem);
                }
            });
            
            // Переключаем текущий вопрос
            toggleFAQItem(item);
        });
    });
    
    // Автоматически открываем первый вопрос
    setTimeout(() => {
        if (faqItems.length > 0) {
            openFAQItem(faqItems[0]);
        }
    }, 1500);
    
    // Функции управления FAQ
    function toggleFAQItem(item) {
        if (item.classList.contains('active')) {
            closeFAQItem(item);
        } else {
            openFAQItem(item);
        }
    }
    
    function openFAQItem(item) {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question?.querySelector('i');
        
        if (!answer) return;
        
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        
        if (icon) {
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
        }
        
        // Обновляем высоту через небольшой таймаут (на случай динамического контента)
        setTimeout(() => {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }, 50);
    }
    
    function closeFAQItem(item) {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question?.querySelector('i');
        
        if (!answer) return;
        
        item.classList.remove('active');
        answer.style.maxHeight = '0';
        answer.style.paddingTop = '0';
        answer.style.paddingBottom = '0';
        
        if (icon) {
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
        }
    }
    
    // Экспортируем функции для глобального использования
    window.toggleFAQ = function(index) {
        if (faqItems[index]) {
            toggleFAQItem(faqItems[index]);
        }
    };
    
    window.openFAQ = function(index) {
        if (faqItems[index]) {
            openFAQItem(faqItems[index]);
        }
    };
    
    window.closeFAQ = function(index) {
        if (faqItems[index]) {
            closeFAQItem(faqItems[index]);
        }
    };
}

// ===== CTA СЕКЦИЯ =====
function initializeCTA() {
    const ctaSection = document.querySelector('.floating-section');
    const ctaButton = document.querySelector('.floating-button');
    
    if (!ctaSection || !ctaButton) return;
    
    console.log('🎯 CTA section initialized');
    
    // Анимация при наведении на CTA кнопку
    ctaButton.addEventListener('mouseenter', function() {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transition = 'transform 0.3s ease';
            }
        }
    });
    
    // Плавный скролл к контактам при клике
    ctaButton.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            document.querySelector('#contact-section')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// ===== HOVER ЭФФЕКТЫ =====
function initializeHoverEffects() {
    console.log('🎭 Initializing hover effects...');
    
    // Проектные карточки
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.style.zIndex = '50';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.style.zIndex = '';
            }
        });
    });
    
    // Сервисные карточки
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.style.zIndex = '50';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.style.zIndex = '';
            }
        });
    });
    
    console.log('✅ Hover effects initialized');
}

// ===== SCROLL АНИМАЦИИ =====
function initializeScrollAnimations() {
    console.log('📜 Initializing scroll animations...');
    
    // Наблюдатель за элементами при скролле
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Добавляем класс для активации анимаций
                entry.target.classList.add('in-view');
                
                // Специальная обработка для проектных карточек
                if (entry.target.classList.contains('project-card')) {
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, 100);
                }
                
                // Для сервисных карточек
                if (entry.target.classList.contains('service-item')) {
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, 200);
                }
                
                // Для журнальных статей
                if (entry.target.classList.contains('journal-item')) {
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, 300);
                }
                
                // Для FAQ
                if (entry.target.classList.contains('faq-item')) {
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, 400);
                }
            }
        });
    }, observerOptions);
    
    // Наблюдаем за всеми элементами Speck Design
    const elementsToObserve = document.querySelectorAll(
        '.project-card, .service-item, .journal-item, .faq-item, .floating-image'
    );
    
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
    
    console.log(`👀 Observing ${elementsToObserve.length} elements for scroll animations`);
}

// ===== LAZY LOADING =====
function initializeLazyLoading() {
    console.log('🖼️ Initializing lazy loading...');
    
    const images = document.querySelectorAll(
        '.project-image img, .floating-image img, .hero-image img'
    );
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Добавляем класс для завершения загрузки
                img.classList.add('loaded');
                
                // Предзагрузка следующего изображения (опционально)
                preloadNextImage(img);
                
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '100px',
        threshold: 0.1
    });
    
    images.forEach(img => {
        // Добавляем эффект загрузки
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.6s ease';
            
            img.onload = function() {
                this.style.opacity = '1';
                this.classList.add('loaded');
            };
        } else {
            img.classList.add('loaded');
        }
        
        imageObserver.observe(img);
    });
    
    console.log(`🖼️ Lazy loading initialized for ${images.length} images`);
    
    // Функция предзагрузки следующего изображения
    function preloadNextImage(currentImg) {
        // Простая логика предзагрузки (можно расширить)
        const parent = currentImg.closest('.project-card, .floating-image, .hero-image');
        if (!parent) return;
        
        const nextSibling = parent.nextElementSibling;
        if (nextSibling) {
            const nextImg = nextSibling.querySelector('img');
            if (nextImg && !nextImg.classList.contains('loaded')) {
                // Создаем предзагрузчик
                const preloader = new Image();
                preloader.src = nextImg.src;
            }
        }
    }
}

// ===== БАЗОВЫЕ ФУНКЦИИ =====
function initializeBasicFunctions() {
    console.log('⚡ Initializing basic functions...');
    
    // 1. Прогресс бар скролла
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = `${scrollPercent}%`;
        });
    }
    
    // 2. Анимация статистики
    const statNumbers = document.querySelectorAll('.stat-number-improved');
    if (statNumbers.length > 0) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target')) || 0;
            if (target > 0) {
                // Простая анимация счетчика
                let current = 0;
                const increment = target / 60; // 60 кадров за 1 секунду
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current);
                }, 16);
            }
        });
    }
    
    // 3. Обработка кнопок
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Добавляем эффект клика
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    });
    
    // 4. Обработка изображений в герое
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.opacity = '0';
        setTimeout(() => {
            heroImage.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
            heroImage.style.opacity = '1';
        }, 450);
    }
    
    console.log('✅ Basic functions initialized');
}

// ===== УТИЛИТЫ =====

// Дебаунс для производительности
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Троттлинг для производительности
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== ЗАПУСК ПРИ ЗАГРУЗКЕ =====
console.log('🚀 Starting home page initialization...');

// Безопасная инициализация
function safeInitialize() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeHomePage);
    } else if (document.body) {
        // Если DOM уже загружен, запускаем сразу
        setTimeout(initializeHomePage, 100);
    } else {
        // Ждем, пока body появится
        console.log('⚠️ Waiting for document.body to be ready...');
        setTimeout(safeInitialize, 50);
    }
}

safeInitialize();

// ===== ОБРАБОТЧИКИ СОБЫТИЙ =====

// При полной загрузке страницы
window.addEventListener('load', () => {
    console.log('🌍 Page fully loaded, applying final touches...');
    
    // Добавляем финальные стили
    setTimeout(() => {
        // Убеждаемся, что все изображения загружены
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.complete && !img.classList.contains('loaded')) {
                img.classList.add('loaded');
            }
        });
        
        // Активируем все блоки
        const speckBlocks = document.querySelectorAll('.speck-design-section');
        speckBlocks.forEach(block => {
            if (!block.classList.contains('speck-block-loaded')) {
                block.classList.add('speck-block-loaded');
            }
        });
        
        console.log('✅ Final touches applied');
    }, 500);
});

// При изменении размера окна
let resizeTimeout;
window.addEventListener('resize', debounce(() => {
    console.log('🔄 Window resized, updating FAQ heights...');
    
    // Обновляем высоту открытых FAQ ответов
    const activeFaqItems = document.querySelectorAll('.faq-item.active');
    activeFaqItems.forEach(item => {
        const answer = item.querySelector('.faq-answer');
        if (answer) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
}, 250));

// ===== ГЛОБАЛЬНЫЕ ФУНКЦИИ =====

// Функция для перезагрузки всех блоков
window.reloadSpeckBlocks = function() {
    console.log('🔄 Reloading Speck Design blocks...');
    
    // Удаляем классы анимации
    const speckBlocks = document.querySelectorAll('.speck-design-section');
    speckBlocks.forEach(block => {
        block.classList.remove('speck-block-loaded', 'in-view');
    });
    
    // Переинициализация
    setTimeout(() => {
        initializeSpeckDesignBlocks();
        console.log('✅ Speck Design blocks reloaded');
    }, 300);
};

// Функция для проверки состояния
window.getSpeckBlocksStatus = function() {
    const blocks = {
        projects: document.querySelectorAll('.project-card').length,
        services: document.querySelectorAll('.service-item').length,
        journals: document.querySelectorAll('.journal-item').length,
        faq: document.querySelectorAll('.faq-item').length,
        loaded: document.querySelectorAll('.speck-block-loaded').length
    };
    
    console.log('📊 Speck Blocks Status:', blocks);
    return blocks;
};

console.log('✅ home.js ready - Speck Design blocks integration complete!');
