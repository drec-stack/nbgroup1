// Animations controller - ENHANCED FOR SPECK BLOCKS
console.log('🚀 Animations.js loaded with safety wrapper');

// Безопасный wrapper для всех функций
const safeWrapper = (fn) => {
    return (...args) => {
        try {
            return fn(...args);
        } catch (error) {
            console.warn('⚠️ Animation error caught:', error.message);
            return null;
        }
    };
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
        this.setupScrollAnimations();
        this.setupCounterAnimation();
        this.setupParallax();
        this.setupGlassAnimations();
        this.setupSpeckBlockAnimations();
        this.setupSpeckColumnHover();
        this.setupSpeckGlowEffects();
    }

    setupGlassAnimations() {
        // Защита: ждем загрузки DOM для Services/About страниц
        if (document.body.classList.contains('services-page') || 
            document.body.classList.contains('about-page')) {
            console.log('ℹ️ Services/About page - skipping glass animations');
            return;
        }
        
        // Добавляем небольшую задержку для гарантии загрузки хедера
        setTimeout(() => {
            const header = document.querySelector('.main-header');
            if (!header) {
                console.warn('⚠️ Header not found for glass animations');
                return;
            }
            
            // Add animation on load
            header.style.animation = 'headerGlassEnter 0.6s ease forwards';
            
            // Remove animation after it completes
            setTimeout(() => {
                header.style.animation = '';
            }, 600);
            
            // Add hover animation
            header.addEventListener('mouseenter', () => {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    header.classList.add('glass-morph');
                }
            });
            
            header.addEventListener('mouseleave', () => {
                header.classList.remove('glass-morph');
            });
        }, 300);
        
        // Setup glass animations for other elements
        const glassElements = document.querySelectorAll('.glass-effect');
        glassElements.forEach(element => {
            element.classList.add('glass-fade-in');
            
            element.addEventListener('mouseenter', () => {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    element.style.transform = 'translateY(-5px)';
                }
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = '';
            });
        });
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
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
                        entry.target.classList.add('glass-fade-in');
                    }
                }
            });
        }, this.observerOptions);

        // Observe all reveal elements
        const revealElements = document.querySelectorAll(
            '.reveal-element, .text-reveal, .title-reveal, .card-reveal, .counter, .stat-number, .title-animate, .glass-effect'
        );
        
        revealElements.forEach(el => {
            observer.observe(el);
        });
    }

    animateTitleWords(element) {
        const words = element.querySelectorAll('.title-word');
        words.forEach((word, index) => {
            setTimeout(() => {
                word.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    setupCounterAnimation() {
        // Counters will be animated when they come into view
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target')) || parseInt(element.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
                element.classList.add('counter-animate');
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    setupParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length > 0) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                
                parallaxElements.forEach(element => {
                    const parallaxSpeed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
                    const offset = scrolled * parallaxSpeed;
                    element.style.transform = `translate3d(0, ${offset}px, 0)`;
                });
            });
        }
    }

    // ===== ENHANCED SPECK BLOCK ANIMATIONS =====
    
    setupSpeckBlockAnimations() {
        const speckBlocks = document.querySelectorAll('.speck-vertical-block');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Активируем блок
                        entry.target.classList.add('visible');
                        
                        // Анимируем цифры с задержкой
                        const number = entry.target.querySelector('.speck-block-number');
                        if (number) {
                            setTimeout(() => {
                                number.classList.add('animate-in');
                            }, 200);
                        }
                        
                        // Анимируем заголовок
                        const title = entry.target.querySelector('.speck-block-title');
                        if (title) {
                            setTimeout(() => {
                                title.classList.add('animate-in');
                            }, 300);
                        }
                        
                        // Анимируем подзаголовок
                        const subtitle = entry.target.querySelector('.speck-block-subtitle');
                        if (subtitle) {
                            setTimeout(() => {
                                subtitle.classList.add('animate-in');
                                subtitle.classList.add('animate-underline');
                            }, 400);
                        }
                        
                        // Анимируем элементы списка
                        const items = entry.target.querySelectorAll('.speck-feature-item');
                        items.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('animate-in');
                            }, 500 + (index * 150));
                        });
                        
                        // Анимируем границу
                        const rightBlock = entry.target.querySelector('.speck-block-right');
                        if (rightBlock) {
                            setTimeout(() => {
                                rightBlock.classList.add('animate-border');
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
            observer.observe(block);
        });
    }

    setupSpeckColumnHover() {
        const columns = document.querySelectorAll('.speck-feature-column');
        
        columns.forEach(column => {
            column.addEventListener('mouseenter', () => {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    column.classList.add('hover-animate');
                    
                    // Анимируем иконки внутри
                    const icons = column.querySelectorAll('.speck-feature-icon');
                    icons.forEach(icon => {
                        icon.classList.add('animate-pulse');
                    });
                    
                    // Добавляем эффект свечения для заголовка
                    const title = column.querySelector('.speck-column-title');
                    if (title) {
                        title.classList.add('animate-in');
                    }
                }
            });
            
            column.addEventListener('mouseleave', () => {
                column.classList.remove('hover-animate');
                
                const icons = column.querySelectorAll('.speck-feature-icon');
                icons.forEach(icon => {
                    icon.classList.remove('animate-pulse');
                });
                
                const title = column.querySelector('.speck-column-title');
                if (title) {
                    title.classList.remove('animate-in');
                }
            });
        });
    }

    setupSpeckGlowEffects() {
        // Добавить эффект свечения при наведении на весь блок
        const blocks = document.querySelectorAll('.speck-vertical-block');
        blocks.forEach(block => {
            block.addEventListener('mouseenter', () => {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    block.classList.add('glow-animate');
                    
                    // Анимируем цифру
                    const number = block.querySelector('.speck-block-number');
                    if (number) {
                        number.style.animation = 'speckNumberPulse 2s infinite';
                    }
                    
                    // Анимируем линию под цифрой
                    const numberLine = block.querySelector('.speck-block-number');
                    if (numberLine) {
                        setTimeout(() => {
                            numberLine.style.setProperty('--line-width', '150px');
                        }, 100);
                    }
                }
            });
            
            block.addEventListener('mouseleave', () => {
                block.classList.remove('glow-animate');
                
                const number = block.querySelector('.speck-block-number');
                if (number) {
                    number.style.animation = '';
                }
                
                const numberLine = block.querySelector('.speck-block-number');
                if (numberLine) {
                    numberLine.style.setProperty('--line-width', '80px');
                }
            });
        });
    }

    // Анимация при клике на Speck колонки
    setupSpeckColumnClick() {
        const columns = document.querySelectorAll('.speck-feature-column.clickable-column');
        
        columns.forEach(column => {
            column.addEventListener('click', (e) => {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    column.classList.add('column-clicked');
                    
                    // Удаляем класс после анимации
                    setTimeout(() => {
                        column.classList.remove('column-clicked');
                    }, 300);
                    
                    // Показываем эффект нажатия на весь блок
                    const block = column.closest('.speck-vertical-block');
                    if (block) {
                        block.classList.add('block-clicked');
                        setTimeout(() => {
                            block.classList.remove('block-clicked');
                        }, 500);
                    }
                }
            });
        });
    }

    // Анимация при скролле Speck элементов
    setupSpeckScrollAnimations() {
        const featureItems = document.querySelectorAll('.speck-feature-item');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('scroll-animated');
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        featureItems.forEach(item => {
            observer.observe(item);
        });
    }

    // Utility for staggered animations
    staggerAnimation(elements, delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('revealed');
            }, index * delay);
        });
    }

    // Initialize all Speck animations
    initSpeckAnimations() {
        this.setupSpeckBlockAnimations();
        this.setupSpeckColumnHover();
        this.setupSpeckGlowEffects();
        this.setupSpeckColumnClick();
        this.setupSpeckScrollAnimations();
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем, не страница ли это Services или About
    if (document.body.classList.contains('services-page') || 
        document.body.classList.contains('about-page')) {
        console.log('ℹ️ Services/About page - skipping NBAnimations initialization');
        return;
    }
    
    window.NBAnimations = new NBAnimations();
    
    // Добавить класс для активации анимаций Speck
    setTimeout(() => {
        document.body.classList.add('speck-animations-loaded');
        
        // Инициализировать анимации Speck блоков
        if (window.NBAnimations && window.NBAnimations.initSpeckAnimations) {
            window.NBAnimations.initSpeckAnimations();
        }
    }, 1000);
    
    // Анимация при загрузке страницы для Speck блоков
    window.addEventListener('load', () => {
        const speckBlocks = document.querySelectorAll('.speck-vertical-block');
        speckBlocks.forEach((block, index) => {
            setTimeout(() => {
                block.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
                block.style.opacity = '1';
                block.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });
});

// ===== SPEECK SPECIFIC ANIMATION FUNCTIONS =====

// Function to animate Speck numbers on scroll
function animateSpeckNumbers() {
    const numbers = document.querySelectorAll('.speck-block-number');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('speck-number-animate');
                    
                    // Add glow effect
                    setTimeout(() => {
                        entry.target.style.textShadow = 
                            '0 0 20px rgba(0, 102, 255, 0.6), 0 0 40px rgba(0, 102, 255, 0.3)';
                    }, 100);
                }
            });
        },
        { threshold: 0.5 }
    );
    
    numbers.forEach(number => observer.observe(number));
}

// Function to animate Speck feature items with stagger
function animateSpeckFeatureItems() {
    const blocks = document.querySelectorAll('.speck-vertical-block');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.speck-feature-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('speck-item-animate');
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, index * 150);
                    });
                }
            });
        },
        { threshold: 0.3 }
    );
    
    blocks.forEach(block => observer.observe(block));
}

// Function to handle Speck column hover effects
function initSpeckColumnEffects() {
    const columns = document.querySelectorAll('.speck-feature-column');
    
    columns.forEach(column => {
        column.addEventListener('mouseenter', function() {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.style.transform = 'translateY(-15px) scale(1.02)';
                this.style.boxShadow = 
                    '0 30px 60px rgba(0, 0, 0, 0.4), 0 15px 30px rgba(0, 102, 255, 0.2)';
                
                // Animate the title
                const title = this.querySelector('.speck-column-title');
                if (title) {
                    title.style.transform = 'translateX(10px)';
                    title.style.color = '#ffffff';
                }
                
                // Animate all feature items
                const items = this.querySelectorAll('.speck-feature-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.transform = 'translateX(15px)';
                        item.style.color = '#ffffff';
                    }, index * 50);
                });
            }
        });
        
        column.addEventListener('mouseleave', function() {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.style.transform = '';
                this.style.boxShadow = '';
                
                const title = this.querySelector('.speck-column-title');
                if (title) {
                    title.style.transform = '';
                    title.style.color = '';
                }
                
                const items = this.querySelectorAll('.speck-feature-item');
                items.forEach(item => {
                    item.style.transform = '';
                    item.style.color = '';
                });
            }
        });
    });
}

// Function to handle Speck block hover effects
function initSpeckBlockEffects() {
    const blocks = document.querySelectorAll('.speck-vertical-block');
    
    blocks.forEach(block => {
        block.addEventListener('mouseenter', function() {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                // Animate the number
                const number = this.querySelector('.speck-block-number');
                if (number) {
                    number.style.animation = 'speckNumberPulse 2s infinite';
                }
                
                // Animate the title
                const title = this.querySelector('.speck-block-title');
                if (title) {
                    title.style.transform = 'translateX(5px)';
                    title.style.color = '#99ccff';
                }
                
                // Animate the subtitle
                const subtitle = this.querySelector('.speck-block-subtitle');
                if (subtitle) {
                    subtitle.style.color = '#ffffff';
                }
                
                // Add glow effect to the whole block
                this.style.boxShadow = '0 0 40px rgba(0, 102, 255, 0.1)';
            }
        });
        
        block.addEventListener('mouseleave', function() {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                const number = this.querySelector('.speck-block-number');
                if (number) {
                    number.style.animation = '';
                }
                
                const title = this.querySelector('.speck-block-title');
                if (title) {
                    title.style.transform = '';
                    title.style.color = '';
                }
                
                const subtitle = this.querySelector('.speck-block-subtitle');
                if (subtitle) {
                    subtitle.style.color = '';
                }
                
                this.style.boxShadow = '';
            }
        });
    });
}

// Initialize all Speck animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, не страница ли это Services или About
    if (document.body.classList.contains('services-page') || 
        document.body.classList.contains('about-page')) {
        console.log('ℹ️ Services/About page - skipping Speck animations');
        return;
    }
    
    // Wait a bit for everything to load
    setTimeout(() => {
        animateSpeckNumbers();
        animateSpeckFeatureItems();
        initSpeckColumnEffects();
        initSpeckBlockEffects();
        
        // Add loaded class for CSS animations
        document.body.classList.add('speck-animations-ready');
        
        // Animate in the first block immediately
        const firstBlock = document.querySelector('.speck-vertical-block');
        if (firstBlock) {
            firstBlock.classList.add('visible');
            firstBlock.classList.add('full-reveal');
        }
    }, 500);
});

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduced-motion');
    
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
}
