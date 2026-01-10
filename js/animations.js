console.log('🚀 Animations.js loaded - IMMEDIATE LOAD (NO SCROLL DELAY)');

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
        this.observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        this.init();
    }

    init() {
        try {
            console.log('🎬 IMMEDIATE INITIALIZATION - All content loads immediately...');
            
            // НЕМЕДЛЕННАЯ ЗАГРУЗКА ВСЕГО КОНТЕНТА (без ожидания скролла)
            this.immediateLoadAllContent();
            
            // Настройка анимаций (без привязки к скроллу)
            this.setupCounterAnimation();
            this.setupSpeckBlockAnimationsImmediate();
            this.setupSpeckColumnHover();
            this.setupSpeckGlowEffects();
            this.setupHeroImageAnimationImmediate();
            this.setupProjectsAnimationsImmediate();
            this.setupServicesAnimationsImmediate();
            this.setupJournalsAnimationsImmediate();
            this.setupFAQAnimationsImmediate();
            
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

    // ===== БЕЗ СКРОЛЛА =====
    setupScrollAnimations() {
        // ЭТОТ МЕТОД БОЛЬШЕ НЕ ИСПОЛЬЗУЕТСЯ - весь контент загружается сразу
        console.log('⚠️ Scroll animations DISABLED - content loads immediately');
    }

    animateTitleWords(element) {
        if (!element) return;
        
        const words = element.querySelectorAll('.title-word');
        words.forEach((word, index) => {
            // Немедленно анимируем без задержки
            if (word && word.style) {
                word.style.transform = 'translateY(0)';
            }
        });
    }

    setupCounterAnimation() {
        // Счетчики будут анимироваться сразу
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

    // ===== SPECK BLOCK ANIMATIONS (IMMEDIATE) =====
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
                        }, itemIndex * 50); // Минимальная задержка
                    });
                    
                    if (rightBlock) {
                        safeDOM.addClass(rightBlock, 'animate-border');
                    }
                    
                }, index * 100); // Минимальная задержка между блоками
            });
            
            console.log(`⚡ Immediately loaded ${speckBlocks.length} speck blocks`);
        } catch (error) {
            console.error('❌ Error in immediate speck block animations:', error);
        }
    }

    setupSpeckColumnHover() {
        // Оставляем hover эффекты как есть
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
        // Оставляем как есть
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

    // ===== HERO IMAGE ANIMATIONS (IMMEDIATE) =====
    setupHeroImageAnimationImmediate() {
        try {
            const heroImage = safeDOM.query('.hero-image');
            if (heroImage) {
                // Немедленно показываем
                safeDOM.addClass(heroImage, 'revealed');
                
                const img = heroImage.querySelector('img');
                if (img && img.style) {
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                }
                
                // Hover эффекты остаются
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

    // ===== PROJECTS ANIMATIONS (IMMEDIATE) =====
    setupProjectsAnimationsImmediate() {
        try {
            const projectCards = safeDOM.queryAll('.project-card');
            
            projectCards.forEach((card, index) => {
                if (card) {
                    // Немедленно показываем
                    safeDOM.addClass(card, 'revealed');
                    
                    // Минимальная задержка для красоты
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
                    
                    // Hover эффекты остаются
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

    // ===== SERVICES ANIMATIONS (IMMEDIATE) =====
    setupServicesAnimationsImmediate() {
        try {
            const serviceItems = safeDOM.queryAll('.service-item');
            
            serviceItems.forEach((item, index) => {
                if (item) {
                    // Немедленно показываем
                    safeDOM.addClass(item, 'revealed');
                    
                    // Минимальная задержка
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
                    
                    // Hover эффекты
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

    // ===== JOURNALS ANIMATIONS (IMMEDIATE) =====
    setupJournalsAnimationsImmediate() {
        try {
            const journalItems = safeDOM.queryAll('.journal-item');
            
            journalItems.forEach((item, index) => {
                if (item) {
                    // Немедленно показываем
                    safeDOM.addClass(item, 'revealed');
                    
                    // Минимальная задержка
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
                    
                    // Hover эффекты
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

    // ===== FAQ ANIMATIONS (IMMEDIATE) =====
    setupFAQAnimationsImmediate() {
        try {
            const faqItems = safeDOM.queryAll('.faq-item');
            
            // Немедленно показываем все FAQ элементы
            faqItems.forEach((item, index) => {
                if (item) {
                    safeDOM.addClass(item, 'revealed');
                    
                    // Немедленно показываем вопрос
                    const question = item.querySelector('.faq-question');
                    if (question && question.style) {
                        question.style.opacity = '1';
                        question.style.transform = 'translateY(0)';
                    }
                }
            });
            
            // FAQ аккордеон логика остается
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                
                if (question) {
                    question.addEventListener('click', () => {
                        console.log('FAQ question clicked');
                        
                        // Закрываем все другие элементы
                        faqItems.forEach(otherItem => {
                            if (otherItem !== item && otherItem.classList.contains('active')) {
                                otherItem.classList.remove('active');
                                const otherAnswer = otherItem.querySelector('.faq-answer');
                                const otherIcon = otherItem.querySelector('.faq-question i');
                                
                                if (otherAnswer && otherAnswer.style) {
                                    otherAnswer.style.maxHeight = '0';
                                }
                                if (otherIcon && otherIcon.style) {
                                    otherIcon.style.transform = 'rotate(0deg)';
                                }
                            }
                        });
                        
                        // Переключаем текущий элемент
                        const isActive = item.classList.contains('active');
                        item.classList.toggle('active');
                        
                        const answer = item.querySelector('.faq-answer');
                        const icon = item.querySelector('.faq-question i');
                        
                        if (answer && answer.style) {
                            if (isActive) {
                                answer.style.maxHeight = '0';
                            } else {
                                answer.style.maxHeight = answer.scrollHeight + 'px';
                            }
                        }
                        
                        if (icon && icon.style) {
                            if (isActive) {
                                icon.style.transform = 'rotate(0deg)';
                            } else {
                                icon.style.transform = 'rotate(45deg)';
                            }
                        }
                    });
                }
            });
            
            // Автоматически открываем первый элемент
            if (faqItems.length > 0) {
                const firstItem = faqItems[0];
                const firstAnswer = firstItem.querySelector('.faq-answer');
                const firstIcon = firstItem.querySelector('.faq-question i');
                
                setTimeout(() => {
                    firstItem.classList.add('active');
                    if (firstAnswer && firstAnswer.style) {
                        firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
                    }
                    if (firstIcon && firstIcon.style) {
                        firstIcon.style.transform = 'rotate(45deg)';
                    }
                }, 500);
            }
            
            console.log(`⚡ Immediately loaded ${faqItems.length} FAQ items`);
        } catch (error) {
            console.error('❌ Error in immediate FAQ animations:', error);
        }
    }

    // Utility for staggered animations
    staggerAnimation(elements, delay = 100) {
        try {
            elements.forEach((element, index) => {
                setTimeout(() => {
                    safeDOM.addClass(element, 'revealed');
                }, index * delay);
            });
        } catch (error) {
            console.error('❌ Error in stagger animation:', error);
        }
    }
}

// Initialize animations IMMEDIATELY
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('⚡ DOMContentLoaded - Starting IMMEDIATE content loading...');
        
        window.NBAnimations = new NBAnimations();
        
        // Немедленно добавляем классы для активации всех анимаций
        safeDOM.addClass(document.body, 'speck-animations-loaded');
        safeDOM.addClass(document.body, 'speck-animations-ready');
        safeDOM.addClass(document.body, 'all-content-loaded');
        
        // Немедленная анимация при загрузке страницы для всех блоков
        setTimeout(() => {
            // Speck блоки
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
            
            // Project карточки
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
            
            // Service элементы
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
            
            // Expertice блоки
            const expertiseBlocks = safeDOM.queryAll('.expertise-vertical-block');
            expertiseBlocks.forEach((block, index) => {
                setTimeout(() => {
                    if (block && block.style) {
                        block.style.opacity = '1';
                        block.style.transform = 'translateX(0)';
                    }
                    
                    // Немедленно показываем внутренние элементы
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
        
        // Отключаем все анимации
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
            }
            
            .faq-question i {
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

// Global error handler for animations
window.addEventListener('error', function(event) {
    if (event.filename && event.filename.includes('animations.js')) {
        console.error('❌ Global error in animations.js:', event.message, event.error);
        event.preventDefault();
    }
});

// Export functions for global use
window.toggleFAQItem = function(index) {
    const faqItems = safeDOM.queryAll('.faq-item');
    if (faqItems[index]) {
        const questionBtn = faqItems[index].querySelector('.faq-question');
        if (questionBtn) {
            questionBtn.click();
        }
    }
};

// Функция для принудительной загрузки всего контента
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

console.log('✅ animations.js loaded - IMMEDIATE CONTENT LOAD (NO SCROLL DELAY)');
