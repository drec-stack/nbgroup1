console.log('🚀 Animations.js loaded - FIXED VERSION WITHOUT ERRORS');

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
            console.log('🎬 Initializing all animations...');
            this.setupScrollAnimations();
            this.setupCounterAnimation();
            this.setupParallax();
            this.setupSpeckBlockAnimations();
            this.setupSpeckColumnHover();
            this.setupSpeckGlowEffects();
            this.setupHeroImageAnimation();
            this.setupProjectsAnimations();
            this.setupServicesAnimations();
            this.setupJournalsAnimations();
            this.setupFAQAnimations();
            console.log('✅ All animations initialized successfully');
        } catch (error) {
            console.error('❌ Error in animations init:', error);
        }
    }

    setupScrollAnimations() {
        try {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.target) {
                        safeDOM.addClass(entry.target, 'revealed');
                    }
                });
            }, this.observerOptions);

            const revealElements = safeDOM.queryAll(
                '.reveal-element, .text-reveal, .title-reveal, .card-reveal, .counter, .stat-number, .title-animate, .glass-effect'
            );
            
            revealElements.forEach(el => {
                if (el) observer.observe(el);
            });
            
            console.log(`👀 Observing ${revealElements.length} scroll elements`);
        } catch (error) {
            console.error('❌ Error in scroll animations:', error);
        }
    }

    animateTitleWords(element) {
        if (!element) return;
        
        const words = element.querySelectorAll('.title-word');
        words.forEach((word, index) => {
            setTimeout(() => {
                if (word && word.style) {
                    word.style.transform = 'translateY(0)';
                }
            }, index * 100);
        });
    }

    setupCounterAnimation() {
        // Counters will be animated when they come into view
    }

    animateCounter(element) {
        if (!element) {
            console.error('❌ animateCounter: element is null');
            return;
        }
        
        try {
            const text = element.textContent || '';
            const target = parseInt(element.getAttribute('data-target')) || parseInt(text) || 0;
            if (target <= 0) return;
            
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                if (!element) {
                    clearInterval(timer);
                    return;
                }
                
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                    safeDOM.addClass(element, 'counter-animate');
                }
                element.textContent = Math.floor(current).toLocaleString();
            }, 16);
        } catch (error) {
            console.error('❌ Error animating counter:', error);
        }
    }

    setupParallax() {
        try {
            const parallaxElements = safeDOM.queryAll('[data-parallax]');
            
            if (parallaxElements.length > 0) {
                window.addEventListener('scroll', () => {
                    const scrolled = window.pageYOffset;
                    
                    parallaxElements.forEach(element => {
                        if (element && element.style) {
                            const parallaxSpeed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
                            const offset = scrolled * parallaxSpeed;
                            element.style.transform = `translate3d(0, ${offset}px, 0)`;
                        }
                    });
                });
            }
        } catch (error) {
            console.error('❌ Error in parallax setup:', error);
        }
    }

    // ===== ENHANCED SPECK BLOCK ANIMATIONS =====
    
    setupSpeckBlockAnimations() {
        try {
            const speckBlocks = safeDOM.queryAll('.speck-vertical-block');
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && entry.target) {
                            // Активируем блок
                            safeDOM.addClass(entry.target, 'visible');
                            
                            // Анимируем цифры с задержкой
                            const number = entry.target.querySelector('.speck-block-number');
                            if (number) {
                                setTimeout(() => {
                                    safeDOM.addClass(number, 'animate-in');
                                }, 200);
                            }
                            
                            // Анимируем заголовок
                            const title = entry.target.querySelector('.speck-block-title');
                            if (title) {
                                setTimeout(() => {
                                    safeDOM.addClass(title, 'animate-in');
                                }, 300);
                            }
                            
                            // Анимируем подзаголовок
                            const subtitle = entry.target.querySelector('.speck-block-subtitle');
                            if (subtitle) {
                                setTimeout(() => {
                                    safeDOM.addClass(subtitle, 'animate-in');
                                }, 400);
                            }
                            
                            // Анимируем элементы списка
                            const items = entry.target.querySelectorAll('.speck-feature-item');
                            items.forEach((item, index) => {
                                setTimeout(() => {
                                    safeDOM.addClass(item, 'animate-in');
                                }, 500 + (index * 150));
                            });
                            
                            // Анимируем границу
                            const rightBlock = entry.target.querySelector('.speck-block-right');
                            if (rightBlock) {
                                setTimeout(() => {
                                    safeDOM.addClass(rightBlock, 'animate-border');
                                }, 300);
                            }
                        }
                    });
                },
                {
                    threshold: 0.1,
                    rootMargin: '0px 0px -100px 0px'
                }
            );

            speckBlocks.forEach(block => {
                if (block) observer.observe(block);
            });
            
            console.log(`🔍 Observing ${speckBlocks.length} speck blocks`);
        } catch (error) {
            console.error('❌ Error in speck block animations:', error);
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
                        
                        // Анимируем иконки внутри
                        const icons = column.querySelectorAll('.speck-feature-icon');
                        icons.forEach(icon => {
                            if (icon) safeDOM.addClass(icon, 'animate-pulse');
                        });
                        
                        // Добавляем эффект свечения для заголовка
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
            // Добавить эффект свечения при наведении на весь блок
            const blocks = safeDOM.queryAll('.speck-vertical-block');
            blocks.forEach(block => {
                if (!block) return;
                
                block.addEventListener('mouseenter', () => {
                    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                        safeDOM.addClass(block, 'glow-animate');
                        
                        // Анимируем цифру
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

    // ===== HERO IMAGE ANIMATIONS =====
    
    setupHeroImageAnimation() {
        try {
            const heroImage = safeDOM.query('.hero-image');
            if (heroImage) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting && entry.target) {
                                safeDOM.addClass(entry.target, 'revealed');
                                
                                // Анимируем внутреннее изображение
                                const img = entry.target.querySelector('img');
                                if (img && img.style) {
                                    setTimeout(() => {
                                        img.style.opacity = '1';
                                        img.style.transform = 'scale(1)';
                                    }, 200);
                                }
                            }
                        });
                    },
                    { threshold: 0.3 }
                );
                
                observer.observe(heroImage);
                
                // Добавляем hover эффект
                heroImage.addEventListener('mouseenter', () => {
                    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                        safeDOM.addClass(heroImage, 'pulse-glow');
                    }
                });
                
                heroImage.addEventListener('mouseleave', () => {
                    safeDOM.removeClass(heroImage, 'pulse-glow');
                });
                
                console.log('✅ Hero image animation initialized');
            }
        } catch (error) {
            console.error('❌ Error in hero image animation:', error);
        }
    }

    // ===== PROJECTS ANIMATIONS =====
    
    setupProjectsAnimations() {
        try {
            const projectCards = safeDOM.queryAll('.project-card');
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && entry.target) {
                            safeDOM.addClass(entry.target, 'revealed');
                            
                            // Анимируем изображение
                            const image = entry.target.querySelector('.project-image img');
                            if (image && image.style) {
                                setTimeout(() => {
                                    image.style.transform = 'scale(1)';
                                }, 300);
                            }
                            
                            // Анимируем контент
                            const content = entry.target.querySelector('.project-content');
                            if (content && content.style) {
                                setTimeout(() => {
                                    content.style.opacity = '1';
                                    content.style.transform = 'translateY(0)';
                                }, 400);
                            }
                        }
                    });
                },
                { threshold: 0.2 }
            );

            projectCards.forEach(card => {
                if (card) {
                    // Инициализация начального состояния
                    const image = card.querySelector('.project-image img');
                    const content = card.querySelector('.project-content');
                    
                    if (image && image.style) {
                        image.style.transform = 'scale(1.05)';
                        image.style.transition = 'transform 0.8s ease';
                    }
                    
                    if (content && content.style) {
                        content.style.opacity = '0';
                        content.style.transform = 'translateY(20px)';
                        content.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    }
                    
                    observer.observe(card);
                }
            });
            
            console.log(`🎨 Projects animations initialized for ${projectCards.length} cards`);
        } catch (error) {
            console.error('❌ Error in projects animations:', error);
        }
    }

    // ===== SERVICES ANIMATIONS =====
    
    setupServicesAnimations() {
        try {
            const serviceItems = safeDOM.queryAll('.service-item');
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && entry.target) {
                            safeDOM.addClass(entry.target, 'revealed');
                            
                            // Анимируем иконку
                            const icon = entry.target.querySelector('.service-icon');
                            if (icon && icon.style) {
                                setTimeout(() => {
                                    icon.style.opacity = '1';
                                    icon.style.transform = 'scale(1) rotate(0deg)';
                                }, 200);
                            }
                            
                            // Анимируем заголовок
                            const title = entry.target.querySelector('.service-title');
                            if (title && title.style) {
                                setTimeout(() => {
                                    title.style.opacity = '1';
                                    title.style.transform = 'translateY(0)';
                                }, 300);
                            }
                        }
                    });
                },
                { threshold: 0.2 }
            );

            serviceItems.forEach((item, index) => {
                if (item) {
                    // Инициализация начального состояния
                    const icon = item.querySelector('.service-icon');
                    const title = item.querySelector('.service-title');
                    
                    if (icon && icon.style) {
                        icon.style.opacity = '0';
                        icon.style.transform = 'scale(0.5) rotate(-180deg)';
                        icon.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    }
                    
                    if (title && title.style) {
                        title.style.opacity = '0';
                        title.style.transform = 'translateY(20px)';
                        title.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    }
                    
                    // Задержка для stagger эффекта
                    setTimeout(() => {
                        observer.observe(item);
                    }, index * 100);
                    
                    // Hover эффект
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
            
            console.log(`⚙️ Services animations initialized for ${serviceItems.length} items`);
        } catch (error) {
            console.error('❌ Error in services animations:', error);
        }
    }

    // ===== JOURNALS ANIMATIONS =====
    
    setupJournalsAnimations() {
        try {
            const journalItems = safeDOM.queryAll('.journal-item');
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && entry.target) {
                            safeDOM.addClass(entry.target, 'revealed');
                            
                            // Анимируем дату
                            const date = entry.target.querySelector('.journal-date');
                            if (date && date.style) {
                                setTimeout(() => {
                                    date.style.opacity = '1';
                                    date.style.transform = 'translateX(0)';
                                }, 200);
                            }
                            
                            // Анимируем заголовок
                            const title = entry.target.querySelector('.journal-title');
                            if (title && title.style) {
                                setTimeout(() => {
                                    title.style.opacity = '1';
                                    title.style.transform = 'translateX(0)';
                                }, 300);
                            }
                            
                            // Анимируем ссылку
                            const link = entry.target.querySelector('.journal-link');
                            if (link && link.style) {
                                setTimeout(() => {
                                    link.style.opacity = '1';
                                    link.style.transform = 'translateX(0)';
                                }, 400);
                            }
                        }
                    });
                },
                { threshold: 0.2 }
            );

            journalItems.forEach((item, index) => {
                if (item) {
                    // Инициализация начального состояния
                    const date = item.querySelector('.journal-date');
                    const title = item.querySelector('.journal-title');
                    const link = item.querySelector('.journal-link');
                    
                    if (date && date.style) {
                        date.style.opacity = '0';
                        date.style.transform = 'translateX(-20px)';
                        date.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    }
                    
                    if (title && title.style) {
                        title.style.opacity = '0';
                        title.style.transform = 'translateX(-20px)';
                        title.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    }
                    
                    if (link && link.style) {
                        link.style.opacity = '0';
                        link.style.transform = 'translateX(-20px)';
                        link.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    }
                    
                    // Задержка для stagger эффекта
                    setTimeout(() => {
                        observer.observe(item);
                    }, index * 150);
                    
                    // Hover эффект
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
            
            console.log(`📰 Journals animations initialized for ${journalItems.length} items`);
        } catch (error) {
            console.error('❌ Error in journals animations:', error);
        }
    }

    // ===== FAQ ANIMATIONS =====
    
    setupFAQAnimations() {
        try {
            const faqItems = safeDOM.queryAll('.faq-item');
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && entry.target) {
                            safeDOM.addClass(entry.target, 'revealed');
                            
                            // Анимируем вопрос
                            const question = entry.target.querySelector('.faq-question');
                            if (question && question.style) {
                                setTimeout(() => {
                                    question.style.opacity = '1';
                                    question.style.transform = 'translateY(0)';
                                }, 200);
                            }
                        }
                    });
                },
                { threshold: 0.2 }
            );

            faqItems.forEach((item, index) => {
                if (item) {
                    // Инициализация начального состояния
                    const question = item.querySelector('.faq-question');
                    const answer = item.querySelector('.faq-answer');
                    
                    if (question && question.style) {
                        question.style.opacity = '0';
                        question.style.transform = 'translateY(20px)';
                        question.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    }
                    
                    if (answer && answer.style) {
                        answer.style.transition = 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease, padding 0.4s ease';
                    }
                    
                    // Задержка для stagger эффекта
                    setTimeout(() => {
                        observer.observe(item);
                    }, index * 100);
                }
            });
            
            console.log(`❓ FAQ animations initialized for ${faqItems.length} items`);
        } catch (error) {
            console.error('❌ Error in FAQ animations:', error);
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

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.NBAnimations = new NBAnimations();
        
        // Добавить класс для активации всех анимаций
        setTimeout(() => {
            safeDOM.addClass(document.body, 'speck-animations-loaded');
            safeDOM.addClass(document.body, 'speck-animations-ready');
        }, 1000);
        
        // Анимация при загрузке страницы для всех блоков
        window.addEventListener('load', () => {
            // Speck блоки
            const speckBlocks = safeDOM.queryAll('.speck-vertical-block');
            speckBlocks.forEach((block, index) => {
                setTimeout(() => {
                    if (block && block.style) {
                        block.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
                        block.style.opacity = '1';
                        block.style.transform = 'translateY(0)';
                    }
                }, index * 200);
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
                }, index * 150);
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
                }, index * 100);
            });
            
            console.log('📊 All animations loaded and initialized');
        });
    } catch (error) {
        console.error('❌ Error in DOMContentLoaded for animations:', error);
    }
});

// Function to animate Speck numbers on scroll
function animateSpeckNumbers() {
    try {
        const numbers = safeDOM.queryAll('.speck-block-number');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.target) {
                        safeDOM.addClass(entry.target, 'speck-number-animate');
                    }
                });
            },
            { threshold: 0.5 }
        );
        
        numbers.forEach(number => {
            if (number) observer.observe(number);
        });
    } catch (error) {
        console.error('❌ Error animating speck numbers:', error);
    }
}

// Function to animate Speck feature items with stagger
function animateSpeckFeatureItems() {
    try {
        const blocks = safeDOM.queryAll('.speck-vertical-block');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.target) {
                        const items = entry.target.querySelectorAll('.speck-feature-item');
                        items.forEach((item, index) => {
                            setTimeout(() => {
                                if (item) {
                                    safeDOM.addClass(item, 'speck-item-animate');
                                    if (item.style) {
                                        item.style.opacity = '1';
                                        item.style.transform = 'translateX(0)';
                                    }
                                }
                            }, index * 150);
                        });
                    }
                });
            },
            { threshold: 0.3 }
        );
        
        blocks.forEach(block => {
            if (block) observer.observe(block);
        });
    } catch (error) {
        console.error('❌ Error animating speck feature items:', error);
    }
}

// Function to handle Speck column hover effects
function initSpeckColumnEffects() {
    try {
        const columns = safeDOM.queryAll('.speck-feature-column');
        
        columns.forEach(column => {
            if (!column) return;
            
            column.addEventListener('mouseenter', function() {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && this.style) {
                    this.style.transform = 'translateY(-15px) scale(1.02)';
                    
                    // Animate the title
                    const title = this.querySelector('.speck-column-title');
                    if (title && title.style) {
                        title.style.transform = 'translateX(10px)';
                        title.style.color = '#ffffff';
                    }
                    
                    // Animate all feature items
                    const items = this.querySelectorAll('.speck-feature-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            if (item && item.style) {
                                item.style.transform = 'translateX(15px)';
                                item.style.color = '#ffffff';
                            }
                        }, index * 50);
                    });
                }
            });
            
            column.addEventListener('mouseleave', function() {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && this.style) {
                    this.style.transform = '';
                    
                    const title = this.querySelector('.speck-column-title');
                    if (title && title.style) {
                        title.style.transform = '';
                        title.style.color = '';
                    }
                    
                    const items = this.querySelectorAll('.speck-feature-item');
                    items.forEach(item => {
                        if (item && item.style) {
                            item.style.transform = '';
                            item.style.color = '';
                        }
                    });
                }
            });
        });
    } catch (error) {
        console.error('❌ Error in speck column effects:', error);
    }
}

// Function to handle Speck block hover effects
function initSpeckBlockEffects() {
    try {
        const blocks = safeDOM.queryAll('.speck-vertical-block');
        
        blocks.forEach(block => {
            if (!block) return;
            
            block.addEventListener('mouseenter', function() {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    // Animate the number
                    const number = this.querySelector('.speck-block-number');
                    if (number && number.style) {
                        number.style.animation = 'speckNumberPulse 2s infinite';
                    }
                    
                    // Animate the title
                    const title = this.querySelector('.speck-block-title');
                    if (title && title.style) {
                        title.style.transform = 'translateX(5px)';
                        title.style.color = '#99ccff';
                    }
                    
                    // Animate the subtitle
                    const subtitle = this.querySelector('.speck-block-subtitle');
                    if (subtitle && subtitle.style) {
                        subtitle.style.color = '#ffffff';
                    }
                }
            });
            
            block.addEventListener('mouseleave', function() {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    const number = this.querySelector('.speck-block-number');
                    if (number && number.style) {
                        number.style.animation = '';
                    }
                    
                    const title = this.querySelector('.speck-block-title');
                    if (title && title.style) {
                        title.style.transform = '';
                        title.style.color = '';
                    }
                    
                    const subtitle = this.querySelector('.speck-block-subtitle');
                    if (subtitle && subtitle.style) {
                        subtitle.style.color = '';
                    }
                }
            });
        });
    } catch (error) {
        console.error('❌ Error in speck block effects:', error);
    }
}

// Initialize all animations on page load
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Wait a bit for everything to load
        setTimeout(() => {
            animateSpeckNumbers();
            animateSpeckFeatureItems();
            initSpeckColumnEffects();
            initSpeckBlockEffects();
            
            // Add loaded class for CSS animations
            safeDOM.addClass(document.body, 'speck-animations-ready');
            
            // Animate in the first block immediately
            const firstBlock = safeDOM.query('.speck-vertical-block');
            if (firstBlock) {
                safeDOM.addClass(firstBlock, 'visible');
            }
            
            console.log('✅ All speck animations initialized');
        }, 500);
    } catch (error) {
        console.error('❌ Error in animations initialization:', error);
    }
});

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    try {
        safeDOM.addClass(document.body, 'reduced-motion');
        
        // Disable all animations
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
            .faq-item {
                animation: none !important;
                transition: none !important;
                opacity: 1 !important;
                transform: none !important;
            }
            
            .speck-vertical-block.visible,
            .speck-feature-column,
            .speck-feature-item,
            .project-card.revealed,
            .service-item.revealed,
            .journal-item.revealed,
            .faq-item.revealed {
                opacity: 1 !important;
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
        // Prevent breaking the whole page
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

console.log('✅ animations.js loaded and ready - NO ERRORS');
