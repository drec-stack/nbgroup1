console.log('🚀 Animations.js loaded - MULTIPLE FAQ OPENING SUPPORT');

// Safe DOM access utility
const safeDOM = {
    query: (selector, context = document) => {
        try {
            const element = context.querySelector(selector);
            return element ? element : null;
        } catch (error) {
            console.error('❌ Error querying selector:', selector, error);
            return null;
        }
    },
    
    queryAll: (selector, context = document) => {
        try {
            const elements = context.querySelectorAll(selector);
            return elements.length > 0 ? Array.from(elements) : [];
        } catch (error) {
            console.error('❌ Error querying all selectors:', selector, error);
            return [];
        }
    },
    
    addClass: (element, className) => {
        if (element && element.classList) {
            try {
                element.classList.add(className);
                return true;
            } catch (error) {
                console.error('❌ Error adding class:', className, error);
                return false;
            }
        }
        return false;
    },
    
    removeClass: (element, className) => {
        if (element && element.classList) {
            try {
                element.classList.remove(className);
                return true;
            } catch (error) {
                console.error('❌ Error removing class:', className, error);
                return false;
            }
        }
        return false;
    }
};

class NBAnimations {
    constructor() {
        this.init();
    }

    init() {
        try {
            console.log('🎬 IMMEDIATE INITIALIZATION - All content loads immediately...');
            
            // НЕМЕДЛЕННАЯ ЗАГРУЗКА ВСЕГО КОНТЕНТА (без ожидания скролла)
            this.immediateLoadAllContent();
            
            // Настройка анимаций
            this.setupCounterAnimation();
            this.setupSpeckBlockAnimationsImmediate();
            this.setupSpeckColumnHover();
            this.setupSpeckGlowEffects();
            this.setupHeroImageAnimationImmediate();
            this.setupProjectsAnimationsImmediate();
            this.setupServicesAnimationsImmediate();
            this.setupJournalsAnimationsImmediate();
            this.setupFAQAccordionMultiple(); // ИСПРАВЛЕННЫЙ FAQ АККОРДЕОН с поддержкой множественного открытия
            
            console.log('✅ All content IMMEDIATELY loaded (no scroll delay)');
        } catch (error) {
            console.error('❌ Error in animations init:', error);
        }
    }

    // ===== НЕМЕДЛЕННАЯ ЗАГРУЗКА ВСЕГО КОНТЕНТА =====
    immediateLoadAllContent() {
        console.log('⚡ Loading ALL content immediately...');
        
        try {
            // 1. Немедленно показываем ВСЕ элементы которые должны быть видны
            const allElements = safeDOM.queryAll(
                '.reveal-element, .text-reveal, .title-reveal, .card-reveal, .counter, .stat-number, .title-animate, .glass-effect, .fade-in, .fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right, .animated-element, .scroll-reveal'
            );
            
            allElements.forEach(el => {
                if (el) {
                    // Немедленно добавляем классы для показа
                    safeDOM.addClass(el, 'revealed');
                    safeDOM.addClass(el, 'visible');
                    safeDOM.addClass(el, 'animated');
                    
                    // Немедленно устанавливаем финальные стили
                    if (el.style) {
                        el.style.opacity = '1';
                        el.style.transform = 'translate(0, 0) scale(1)';
                        el.style.animationPlayState = 'running';
                    }
                }
            });
            
            console.log(`✅ Immediately revealed ${allElements.length} elements`);
            
            // 2. Немедленно активируем все секции
            const allSections = safeDOM.queryAll('section');
            allSections.forEach(section => {
                if (section) {
                    safeDOM.addClass(section, 'animated');
                    safeDOM.addClass(section, 'visible');
                }
            });
            
            // 3. Немедленно показываем все текстовые блоки
            const textBlocks = safeDOM.queryAll(
                '.hero-content, .expertise-vertical-block, .project-card, .service-item, .journal-item, .faq-item, .stat-card, .cta-content'
            );
            
            textBlocks.forEach(block => {
                if (block) {
                    // Немедленно убираем прозрачность
                    if (block.style) {
                        block.style.opacity = '1';
                        block.style.visibility = 'visible';
                    }
                    
                    // Немедленно показываем все дочерние текстовые элементы
                    const textElements = block.querySelectorAll(
                        'h1, h2, h3, h4, p, span, li, .title, .subtitle, .description'
                    );
                    
                    textElements.forEach(textEl => {
                        if (textEl && textEl.style) {
                            textEl.style.opacity = '1';
                            textEl.style.transform = 'translate(0, 0)';
                        }
                    });
                }
            });
            
        } catch (error) {
            console.error('❌ Error in immediate content loading:', error);
        }
    }

    // ===== FAQ АККОРДЕОН - ИСПРАВЛЕННЫЙ ДЛЯ МНОЖЕСТВЕННОГО ОТКРЫТИЯ =====
    setupFAQAccordionMultiple() {
        console.log('🎯 Setting up FAQ accordion with MULTIPLE OPENING support...');
        
        try {
            const faqItems = safeDOM.queryAll('.faq-item');
            
            if (faqItems.length === 0) {
                console.warn('❌ No FAQ items found');
                return;
            }
            
            console.log(`✅ Found ${faqItems.length} FAQ items (MULTIPLE CAN BE OPENED)`);
            
            // 1. Изначально ВСЕ ответы должны быть СКРЫТЫ
            faqItems.forEach((item, index) => {
                if (item) {
                    const question = item.querySelector('.faq-question');
                    const answer = item.querySelector('.faq-answer');
                    const icon = question?.querySelector('i');
                    
                    // Устанавливаем атрибуты доступности
                    if (question) {
                        question.id = `faq-question-${index}`;
                        question.setAttribute('aria-expanded', 'false');
                        question.setAttribute('aria-controls', `faq-answer-${index}`);
                        question.setAttribute('tabindex', '0');
                    }
                    
                    if (answer) {
                        answer.id = `faq-answer-${index}`;
                        answer.setAttribute('aria-labelledby', `faq-question-${index}`);
                        answer.setAttribute('role', 'region');
                        answer.setAttribute('aria-hidden', 'true');
                        
                        // Гарантируем что ответ скрыт изначально
                        if (answer.style) {
                            answer.style.display = 'none';
                            answer.style.maxHeight = '0';
                            answer.style.opacity = '0';
                            answer.style.overflow = 'hidden';
                            answer.style.paddingTop = '0';
                            answer.style.paddingBottom = '0';
                            answer.style.marginTop = '0';
                            answer.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                        }
                    }
                    
                    // Иконка должна быть плюсом
                    if (icon && icon.style) {
                        icon.style.transform = 'rotate(0deg)';
                        icon.style.color = 'rgba(255, 255, 255, 0.7)';
                        icon.style.background = 'rgba(255, 255, 255, 0.1)';
                        icon.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                    }
                }
            });
            
            // 2. Добавляем обработчики кликов с поддержкой множественного открытия
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                
                if (question) {
                    // Удаляем старые обработчики если есть
                    question.removeEventListener('click', this.handleFAQClick);
                    question.removeEventListener('keydown', this.handleFAQKeydown);
                    
                    // Добавляем новые с поддержкой множественного открытия
                    question.addEventListener('click', (e) => this.toggleFAQItemMultiple(item, e));
                    question.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            this.toggleFAQItemMultiple(item, e);
                        }
                    });
                }
            });
            
            console.log('✅ FAQ accordion setup complete - MULTIPLE FAQ can be opened simultaneously');
            
        } catch (error) {
            console.error('❌ Error setting up FAQ accordion:', error);
        }
    }
    
    // Функция переключения FAQ элемента с поддержкой множественного открытия
    toggleFAQItemMultiple(item, event) {
        try {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = question?.querySelector('i');
            const isCurrentlyActive = item.classList.contains('active');
            
            console.log(`📋 FAQ toggle (MULTIPLE): ${isCurrentlyActive ? 'closing' : 'opening'} item`);
            
            // ВАЖНО: НЕ ЗАКРЫВАЕМ другие FAQ - только переключаем текущий
            if (isCurrentlyActive) {
                this.closeFAQItem(item);
            } else {
                this.openFAQItem(item);
            }
            
        } catch (error) {
            console.error('❌ Error toggling FAQ item:', error);
        }
    }
    
    // Открыть FAQ элемент
    openFAQItem(item) {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question?.querySelector('i');
        
        // Добавляем активный класс
        safeDOM.addClass(item, 'active');
        
        // Обновляем атрибуты доступности
        if (question) {
            question.setAttribute('aria-expanded', 'true');
        }
        
        if (answer) {
            answer.setAttribute('aria-hidden', 'false');
            
            // Показываем ответ с анимацией
            if (answer.style) {
                answer.style.display = 'block';
                setTimeout(() => {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    answer.style.opacity = '1';
                    answer.style.paddingTop = '15px';
                    answer.style.paddingBottom = '30px';
                    answer.style.marginTop = '15px';
                }, 10);
            }
        }
        
        // Анимируем иконку (плюс → крестик)
        if (icon && icon.style) {
            icon.style.transform = 'rotate(45deg)';
            icon.style.color = '#66b5ff';
            icon.style.background = 'rgba(102, 181, 255, 0.2)';
        }
    }
    
    // Закрыть FAQ элемент
    closeFAQItem(item) {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question?.querySelector('i');
        
        // Убираем активный класс
        safeDOM.removeClass(item, 'active');
        
        // Обновляем атрибуты доступности
        if (question) {
            question.setAttribute('aria-expanded', 'false');
        }
        
        if (answer) {
            answer.setAttribute('aria-hidden', 'true');
            
            // Скрываем ответ с анимацией
            if (answer.style) {
                answer.style.maxHeight = '0';
                answer.style.opacity = '0';
                answer.style.paddingTop = '0';
                answer.style.paddingBottom = '0';
                answer.style.marginTop = '0';
                
                // После анимации скрываем полностью
                setTimeout(() => {
                    answer.style.display = 'none';
                }, 500);
            }
        }
        
        // Анимируем иконку (крестик → плюс)
        if (icon && icon.style) {
            icon.style.transform = 'rotate(0deg)';
            icon.style.color = 'rgba(255, 255, 255, 0.7)';
            icon.style.background = 'rgba(255, 255, 255, 0.1)';
        }
    }
    
    // Метод для тестирования множественного открытия FAQ
    testMultipleFAQ() {
        console.log('🧪 Testing multiple FAQ opening...');
        const faqItems = safeDOM.queryAll('.faq-item');
        
        // Открываем первые 3 FAQ одновременно
        for (let i = 0; i < 3 && i < faqItems.length; i++) {
            this.openFAQItem(faqItems[i]);
        }
        
        console.log(`✅ First ${Math.min(3, faqItems.length)} FAQ items opened simultaneously`);
    }

    // ===== ОСТАЛЬНЫЕ ФУНКЦИИ (без изменений) =====
    setupCounterAnimation() {
        const counters = safeDOM.queryAll('.counter, .stat-number');
        
        counters.forEach(counter => {
            if (counter) {
                this.animateCounterImmediate(counter);
            }
        });
    }

    animateCounterImmediate(element) {
        if (!element) {
            console.error('❌ animateCounterImmediate: element is null');
            return;
        }
        
        try {
            const text = element.textContent || '';
            const target = parseInt(element.getAttribute('data-target')) || parseInt(text) || 0;
            if (target <= 0) return;
            
            // Немедленно показываем финальное значение
            element.textContent = target.toLocaleString();
            safeDOM.addClass(element, 'counter-animate');
            
        } catch (error) {
            console.error('❌ Error animating counter immediately:', error);
        }
    }

    setupSpeckBlockAnimationsImmediate() {
        try {
            const speckBlocks = safeDOM.queryAll('.speck-vertical-block');
            
            speckBlocks.forEach((block, index) => {
                if (!block) return;
                
                // Немедленно активируем блок
                safeDOM.addClass(block, 'visible');
                
                // Немедленно показываем все элементы внутри блока
                const number = block.querySelector('.speck-block-number');
                const title = block.querySelector('.speck-block-title');
                const subtitle = block.querySelector('.speck-block-subtitle');
                const items = block.querySelectorAll('.speck-feature-item');
                const rightBlock = block.querySelector('.speck-block-right');
                
                // Немедленно анимируем все с минимальной задержкой для красоты
                setTimeout(() => {
                    if (number) {
                        safeDOM.addClass(number, 'animate-in');
                        if (number.style) {
                            number.style.opacity = '1';
                            number.style.transform = 'scale(1)';
                        }
                    }
                    
                    if (title) {
                        safeDOM.addClass(title, 'animate-in');
                        if (title.style) {
                            title.style.opacity = '1';
                            title.style.transform = 'translateX(0)';
                        }
                    }
                    
                    if (subtitle) {
                        safeDOM.addClass(subtitle, 'animate-in');
                        if (subtitle.style) {
                            subtitle.style.opacity = '1';
                            subtitle.style.transform = 'translateX(0)';
                        }
                    }
                    
                    items.forEach((item, itemIndex) => {
                        setTimeout(() => {
                            safeDOM.addClass(item, 'animate-in');
                            if (item.style) {
                                item.style.opacity = '1';
                                item.style.transform = 'translateX(0)';
                            }
                        }, itemIndex * 50);
                    });
                    
                    if (rightBlock) {
                        safeDOM.addClass(rightBlock, 'animate-border');
                    }
                    
                }, index * 100);
            });
            
            console.log(`⚡ Immediately loaded ${speckBlocks.length} speck blocks`);
        } catch (error) {
            console.error('❌ Error in immediate speck block animations:', error);
        }
    }

    setupSpeckColumnHover() {
        try {
            const columns = safeDOM.queryAll('.speck-feature-column');
            
            columns.forEach(column => {
                if (!column) return;
                
                column.addEventListener('mouseenter', () => {
                    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                        safeDOM.addClass(column, 'hover-animate');
                        
                        const icons = column.querySelectorAll('.speck-feature-icon');
                        icons.forEach(icon => {
                            if (icon) safeDOM.addClass(icon, 'animate-pulse');
                        });
                        
                        const title = column.querySelector('.speck-column-title');
                        if (title) safeDOM.addClass(title, 'animate-in');
                    }
                });
                
                column.addEventListener('mouseleave', () => {
                    safeDOM.removeClass(column, 'hover-animate');
                    
                    const icons = column.querySelectorAll('.speck-feature-icon');
                    icons.forEach(icon => {
                        if (icon) safeDOM.removeClass(icon, 'animate-pulse');
                    });
                    
                    const title = column.querySelector('.speck-column-title');
                    if (title) safeDOM.removeClass(title, 'animate-in');
                });
            });
        } catch (error) {
            console.error('❌ Error in speck column hover:', error);
        }
    }

    setupSpeckGlowEffects() {
        try {
            const blocks = safeDOM.queryAll('.speck-vertical-block');
            blocks.forEach(block => {
                if (!block) return;
                
                block.addEventListener('mouseenter', () => {
                    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                        safeDOM.addClass(block, 'glow-animate');
                        
                        const number = block.querySelector('.speck-block-number');
                        if (number && number.style) {
                            number.style.animation = 'speckNumberPulse 2s infinite';
                        }
                    }
                });
                
                block.addEventListener('mouseleave', () => {
                    safeDOM.removeClass(block, 'glow-animate');
                    
                    const number = block.querySelector('.speck-block-number');
                    if (number && number.style) {
                        number.style.animation = '';
                    }
                });
            });
        } catch (error) {
            console.error('❌ Error in speck glow effects:', error);
        }
    }

    setupHeroImageAnimationImmediate() {
        try {
            const heroImage = safeDOM.query('.hero-image');
            if (heroImage) {
                safeDOM.addClass(heroImage, 'revealed');
                
                const img = heroImage.querySelector('img');
                if (img && img.style) {
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                }
                
                heroImage.addEventListener('mouseenter', () => {
                    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                        safeDOM.addClass(heroImage, 'pulse-glow');
                    }
                });
                
                heroImage.addEventListener('mouseleave', () => {
                    safeDOM.removeClass(heroImage, 'pulse-glow');
                });
                
                console.log('✅ Hero image immediately visible');
            }
        } catch (error) {
            console.error('❌ Error in immediate hero image animation:', error);
        }
    }

    setupProjectsAnimationsImmediate() {
        try {
            const projectCards = safeDOM.queryAll('.project-card');
            
            projectCards.forEach((card, index) => {
                if (card) {
                    safeDOM.addClass(card, 'revealed');
                    
                    setTimeout(() => {
                        const image = card.querySelector('.project-image img');
                        const content = card.querySelector('.project-content');
                        
                        if (image && image.style) {
                            image.style.transform = 'scale(1)';
                        }
                        
                        if (content && content.style) {
                            content.style.opacity = '1';
                            content.style.transform = 'translateY(0)';
                        }
                    }, index * 50);
                    
                    card.addEventListener('mouseenter', () => {
                        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                            const image = card.querySelector('.project-image img');
                            if (image && image.style) {
                                image.style.transform = 'scale(1.05)';
                            }
                        }
                    });
                    
                    card.addEventListener('mouseleave', () => {
                        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                            const image = card.querySelector('.project-image img');
                            if (image && image.style) {
                                image.style.transform = 'scale(1)';
                            }
                        }
                    });
                }
            });
            
            console.log(`⚡ Immediately loaded ${projectCards.length} project cards`);
        } catch (error) {
            console.error('❌ Error in immediate projects animations:', error);
        }
    }

    setupServicesAnimationsImmediate() {
        try {
            const serviceItems = safeDOM.queryAll('.service-item');
            
            serviceItems.forEach((item, index) => {
                if (item) {
                    safeDOM.addClass(item, 'revealed');
                    
                    setTimeout(() => {
                        const icon = item.querySelector('.service-icon');
                        const title = item.querySelector('.service-title');
                        
                        if (icon && icon.style) {
                            icon.style.opacity = '1';
                            icon.style.transform = 'scale(1) rotate(0deg)';
                        }
                        
                        if (title && title.style) {
                            title.style.opacity = '1';
                            title.style.transform = 'translateY(0)';
                        }
                    }, index * 30);
                    
                    item.addEventListener('mouseenter', () => {
                        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                            safeDOM.addClass(item, 'hover-animate');
                        }
                    });
                    
                    item.addEventListener('mouseleave', () => {
                        safeDOM.removeClass(item, 'hover-animate');
                    });
                }
            });
            
            console.log(`⚡ Immediately loaded ${serviceItems.length} service items`);
        } catch (error) {
            console.error('❌ Error in immediate services animations:', error);
        }
    }

    setupJournalsAnimationsImmediate() {
        try {
            const journalItems = safeDOM.queryAll('.journal-item');
            
            journalItems.forEach((item, index) => {
                if (item) {
                    safeDOM.addClass(item, 'revealed');
                    
                    setTimeout(() => {
                        const date = item.querySelector('.journal-date');
                        const title = item.querySelector('.journal-title');
                        const link = item.querySelector('.journal-link');
                        
                        if (date && date.style) {
                            date.style.opacity = '1';
                            date.style.transform = 'translateX(0)';
                        }
                        
                        if (title && title.style) {
                            title.style.opacity = '1';
                            title.style.transform = 'translateX(0)';
                        }
                        
                        if (link && link.style) {
                            link.style.opacity = '1';
                            link.style.transform = 'translateX(0)';
                        }
                    }, index * 40);
                    
                    item.addEventListener('mouseenter', () => {
                        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                            safeDOM.addClass(item, 'hover-animate');
                        }
                    });
                    
                    item.addEventListener('mouseleave', () => {
                        safeDOM.removeClass(item, 'hover-animate');
                    });
                }
            });
            
            console.log(`⚡ Immediately loaded ${journalItems.length} journal items`);
        } catch (error) {
            console.error('❌ Error in immediate journals animations:', error);
        }
    }
}

// Initialize animations IMMEDIATELY
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('⚡ DOMContentLoaded - Starting IMMEDIATE content loading...');
        
        window.NBAnimations = new NBAnimations();
        
        safeDOM.addClass(document.body, 'speck-animations-loaded');
        safeDOM.addClass(document.body, 'speck-animations-ready');
        safeDOM.addClass(document.body, 'all-content-loaded');
        
        setTimeout(() => {
            const speckBlocks = safeDOM.queryAll('.speck-vertical-block');
            speckBlocks.forEach((block, index) => {
                setTimeout(() => {
                    if (block && block.style) {
                        block.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
                        block.style.opacity = '1';
                        block.style.transform = 'translateY(0)';
                    }
                }, index * 50);
            });
            
            const projectCards = safeDOM.queryAll('.project-card');
            projectCards.forEach((card, index) => {
                setTimeout(() => {
                    if (card && card.style) {
                        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }
                }, index * 30);
            });
            
            const serviceItems = safeDOM.queryAll('.service-item');
            serviceItems.forEach((item, index) => {
                setTimeout(() => {
                    if (item && item.style) {
                        item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }
                }, index * 20);
            });
            
            const expertiseBlocks = safeDOM.queryAll('.expertise-vertical-block');
            expertiseBlocks.forEach((block, index) => {
                setTimeout(() => {
                    if (block && block.style) {
                        block.style.opacity = '1';
                        block.style.transform = 'translateX(0)';
                    }
                    
                    const number = block.querySelector('.expertise-number');
                    const title = block.querySelector('.expertise-title');
                    const description = block.querySelector('.expertise-description');
                    const features = block.querySelectorAll('.expertise-features li');
                    
                    if (number && number.style) {
                        setTimeout(() => {
                            number.style.transform = 'scale(1)';
                            number.style.opacity = '1';
                        }, 200);
                    }
                    
                    if (title && title.style) {
                        setTimeout(() => {
                            title.style.opacity = '1';
                            title.style.transform = 'translateX(0)';
                        }, 300);
                    }
                    
                    if (description && description.style) {
                        setTimeout(() => {
                            description.style.opacity = '1';
                            description.style.transform = 'translateX(0)';
                        }, 400);
                    }
                    
                    features.forEach((feature, featIndex) => {
                        setTimeout(() => {
                            if (feature && feature.style) {
                                feature.style.opacity = '1';
                                feature.style.transform = 'translateX(0)';
                            }
                        }, 500 + (featIndex * 50));
                    });
                }, index * 100);
            });
            
            console.log('⚡ All content IMMEDIATELY loaded and visible');
        }, 100);
        
    } catch (error) {
        console.error('❌ Error in DOMContentLoaded for animations:', error);
    }
});

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    try {
        safeDOM.addClass(document.body, 'reduced-motion');
        
        const style = document.createElement('style');
        style.textContent = `
            .speck-vertical-block,
            .speck-feature-column,
            .speck-feature-item,
            .speck-block-number,
            .speck-block-title,
            .speck-block-subtitle,
            .hero-image,
            .project-card,
            .service-item,
            .journal-item,
            .faq-item,
            .expertise-vertical-block,
            .expertise-number,
            .expertise-title,
            .expertise-description {
                animation: none !important;
                transition: none !important;
                opacity: 1 !important;
                transform: none !important;
                max-height: none !important;
            }
            
            .faq-item .faq-answer {
                max-height: 500px !important;
                opacity: 1 !important;
                display: none !important;
            }
            
            .faq-item.active .faq-answer {
                display: block !important;
            }
            
            .faq-question i {
                transform: rotate(0deg) !important;
            }
            
            .faq-item.active .faq-question i {
                transform: rotate(45deg) !important;
            }
            
            body.all-content-loaded * {
                opacity: 1 !important;
                visibility: visible !important;
                transform: none !important;
            }
        `;
        document.head.appendChild(style);
    } catch (error) {
        console.error('❌ Error setting up reduced motion:', error);
    }
}

// ===== ГЛОБАЛЬНЫЕ ФУНКЦИИ ДЛЯ УПРАВЛЕНИЯ FAQ =====

// Функция для открытия всех FAQ одновременно
window.openAllFAQ = function() {
    const faqItems = safeDOM.queryAll('.faq-item');
    faqItems.forEach(item => {
        if (window.NBAnimations) {
            window.NBAnimations.openFAQItem(item);
        }
    });
    console.log(`✅ ${faqItems.length} FAQ items opened simultaneously`);
};

// Функция для закрытия всех FAQ
window.closeAllFAQ = function() {
    const faqItems = safeDOM.queryAll('.faq-item');
    faqItems.forEach(item => {
        if (window.NBAnimations) {
            window.NBAnimations.closeFAQItem(item);
        }
    });
    console.log(`✅ ${faqItems.length} FAQ items closed`);
};

// Функция для открытия определенного FAQ
window.openFAQItem = function(index) {
    const faqItems = safeDOM.queryAll('.faq-item');
    if (faqItems[index]) {
        if (window.NBAnimations) {
            window.NBAnimations.openFAQItem(faqItems[index]);
        }
    }
};

// Функция для закрытия определенного FAQ
window.closeFAQItem = function(index) {
    const faqItems = safeDOM.queryAll('.faq-item');
    if (faqItems[index]) {
        if (window.NBAnimations) {
            window.NBAnimations.closeFAQItem(faqItems[index]);
        }
    }
};

// Функция для переключения определенного FAQ (клик по кнопке)
window.toggleFAQItem = function(index) {
    const faqItems = safeDOM.queryAll('.faq-item');
    if (faqItems[index]) {
        const questionBtn = faqItems[index].querySelector('.faq-question');
        if (questionBtn) {
            questionBtn.click();
        }
    }
};

// Функция для тестирования множественного открытия FAQ
window.testMultipleFAQ = function() {
    if (window.NBAnimations) {
        window.NBAnimations.testMultipleFAQ();
    }
};

// Функция для тестирования FAQ
window.testFAQ = function() {
    const faqItems = safeDOM.queryAll('.faq-item');
    console.log(`📋 FAQ Test: Found ${faqItems.length} items`);
    faqItems.forEach((item, index) => {
        const isActive = item.classList.contains('active');
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question?.querySelector('i');
        
        console.log(`Item ${index}:`, {
            active: isActive,
            ariaExpanded: question?.getAttribute('aria-expanded'),
            answerDisplay: answer?.style.display,
            answerHeight: answer?.scrollHeight,
            iconTransform: icon?.style.transform
        });
    });
};

console.log('✅ animations.js loaded - MULTIPLE FAQ OPENING SUPPORT ENABLED!');
