// Animations controller - SIMPLIFIED VERSION (no mobile menu animations)
console.log('🚀 Animations.js loaded - SIMPLIFIED VERSION');

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
            console.log('🎬 Initializing animations...');
            this.setupScrollAnimations();
            this.setupCounterAnimation();
            this.setupParallax();
            this.setupSpeckBlockAnimations();
            this.setupSpeckColumnHover();
            this.setupSpeckGlowEffects();
            console.log('✅ Animations initialized successfully');
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
                        
                        // Special handling for counters
                        if (entry.target.classList.contains('counter') || entry.target.classList.contains('stat-number')) {
                            this.animateCounter(entry.target);
                        }
                        
                        // Special handling for title words
                        if (entry.target.classList.contains('title-animate')) {
                            this.animateTitleWords(entry.target);
                        }
                        
                        // Special handling for glass elements
                        if (entry.target.classList.contains('glass-effect')) {
                            safeDOM.addClass(entry.target, 'glass-fade-in');
                        }
                    }
                });
            }, this.observerOptions);

            // Observe all reveal elements
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
                                    safeDOM.addClass(subtitle, 'animate-underline');
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
                        
                        // Анимируем линию под цифрой
                        const numberLine = block.querySelector('.speck-block-number');
                        if (numberLine && numberLine.style) {
                            setTimeout(() => {
                                numberLine.style.setProperty('--line-width', '150px');
                            }, 100);
                        }
                    }
                });
                
                block.addEventListener('mouseleave', () => {
                    safeDOM.removeClass(block, 'glow-animate');
                    
                    const number = block.querySelector('.speck-block-number');
                    if (number && number.style) {
                        number.style.animation = '';
                    }
                    
                    const numberLine = block.querySelector('.speck-block-number');
                    if (numberLine && numberLine.style) {
                        numberLine.style.setProperty('--line-width', '80px');
                    }
                });
            });
        } catch (error) {
            console.error('❌ Error in speck glow effects:', error);
        }
    }

    // Анимация при клике на Speck колонки
    setupSpeckColumnClick() {
        try {
            const columns = safeDOM.queryAll('.speck-feature-column.clickable-column');
            
            columns.forEach(column => {
                if (!column) return;
                
                column.addEventListener('click', (e) => {
                    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                        safeDOM.addClass(column, 'column-clicked');
                        
                        // Удаляем класс после анимации
                        setTimeout(() => {
                            safeDOM.removeClass(column, 'column-clicked');
                        }, 300);
                        
                        // Показываем эффект нажатия на весь блок
                        const block = column.closest('.speck-vertical-block');
                        if (block) {
                            safeDOM.addClass(block, 'block-clicked');
                            setTimeout(() => {
                                safeDOM.removeClass(block, 'block-clicked');
                            }, 500);
                        }
                    }
                });
            });
        } catch (error) {
            console.error('❌ Error in speck column click:', error);
        }
    }

    // Анимация при скролле Speck элементов
    setupSpeckScrollAnimations() {
        try {
            const featureItems = safeDOM.queryAll('.speck-feature-item');
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && entry.target) {
                            safeDOM.addClass(entry.target, 'scroll-animated');
                        }
                    });
                },
                {
                    threshold: 0.2,
                    rootMargin: '0px 0px -50px 0px'
                }
            );

            featureItems.forEach(item => {
                if (item) observer.observe(item);
            });
        } catch (error) {
            console.error('❌ Error in speck scroll animations:', error);
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

    // Initialize all Speck animations
    initSpeckAnimations() {
        try {
            this.setupSpeckBlockAnimations();
            this.setupSpeckColumnHover();
            this.setupSpeckGlowEffects();
            this.setupSpeckColumnClick();
            this.setupSpeckScrollAnimations();
            console.log('✅ Speck animations initialized');
        } catch (error) {
            console.error('❌ Error initializing speck animations:', error);
        }
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.NBAnimations = new NBAnimations();
        
        // Добавить класс для активации анимаций Speck
        setTimeout(() => {
            safeDOM.addClass(document.body, 'speck-animations-loaded');
            
            // Инициализировать анимации Speck блоков
            if (window.NBAnimations && window.NBAnimations.initSpeckAnimations) {
                window.NBAnimations.initSpeckAnimations();
            }
        }, 1000);
        
        // Анимация при загрузке страницы для Speck блоков
        window.addEventListener('load', () => {
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
                        
                        // Add glow effect
                        setTimeout(() => {
                            if (entry.target && entry.target.style) {
                                entry.target.style.textShadow = 
                                    '0 0 20px rgba(0, 102, 255, 0.6), 0 0 40px rgba(0, 102, 255, 0.3)';
                            }
                        }, 100);
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
                    this.style.boxShadow = 
                        '0 30px 60px rgba(0, 0, 0, 0.4), 0 15px 30px rgba(0, 102, 255, 0.2)';
                    
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
                    this.style.boxShadow = '';
                    
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
                    
                    // Add glow effect to the whole block
                    if (this.style) {
                        this.style.boxShadow = '0 0 40px rgba(0, 102, 255, 0.1)';
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
                    
                    if (this.style) {
                        this.style.boxShadow = '';
                    }
                }
            });
        });
    } catch (error) {
        console.error('❌ Error in speck block effects:', error);
    }
}

// Initialize all Speck animations on page load
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
                safeDOM.addClass(firstBlock, 'full-reveal');
            }
        }, 500);
    } catch (error) {
        console.error('❌ Error in speck animations initialization:', error);
    }
});

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    try {
        safeDOM.addClass(document.body, 'reduced-motion');
        
        // Disable all Speck animations
        const style = document.createElement('style');
        style.textContent = `
            .speck-vertical-block,
            .speck-feature-column,
            .speck-feature-item,
            .speck-block-number,
            .speck-block-title,
            .speck-block-subtitle {
                animation: none !important;
                transition: none !important;
                opacity: 1 !important;
                transform: none !important;
            }
            
            .speck-vertical-block.visible,
            .speck-feature-column,
            .speck-feature-item {
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

console.log('✅ animations.js loaded and ready');
