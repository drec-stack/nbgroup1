// home.js - Complete Home Page Functionality

class HomePage {
    constructor() {
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.header = null;
        this.isHeaderHidden = false;
        this.lastScrollTop = 0;
        this.scrollThreshold = 100;
        this.showThreshold = 10;
        
        // Initialize everything
        this.init();
    }

    init() {
        this.initSpeckVerticalBlocks();
        this.initScrollAnimations();
        this.initStatsCounter();
        this.initParallaxBackgrounds();
        this.initMarqueeAnimations();
        this.initClickableStats();
        this.initCTAClickable();
        
        console.log('🏠 HomePage инициализирован');
    }

    // ===== SPECK VERTICAL BLOCKS INITIALIZATION =====
    initSpeckVerticalBlocks() {
        console.log('🎨 Инициализация вертикальных блоков Speck Design...');
        
        const speckBlocks = document.querySelectorAll('.speck-vertical-block');
        
        if (!speckBlocks.length) {
            console.log('⚠️ Вертикальные блоки Speck не найдены');
            return;
        }
        
        // Инициализируем Intersection Observer для блоков
        const blockObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Активируем блок с задержкой (staggered animation)
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 200);
                    
                    blockObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Наблюдаем за всеми блоками
        speckBlocks.forEach(block => {
            blockObserver.observe(block);
        });
        
        // Enhanced hover effects для элементов списка
        const featureItems = document.querySelectorAll('.speck-feature-item');
        featureItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                if (!this.isReducedMotion) {
                    const icon = item.querySelector('.speck-feature-icon');
                    if (icon) {
                        icon.style.transform = 'translateX(5px)';
                        icon.style.color = '#3399ff';
                    }
                }
            });
            
            item.addEventListener('mouseleave', () => {
                if (!this.isReducedMotion) {
                    const icon = item.querySelector('.speck-feature-icon');
                    if (icon) {
                        icon.style.transform = '';
                        icon.style.color = '';
                    }
                }
            });
            
            // Клик по элементам списка
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Pulse animation
                item.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    item.style.transform = '';
                }, 150);
                
                // Можно добавить логику перехода на конкретную страницу
                // Например, если это элемент из блока Strategy, то вести на services.html#strategy
                const blockIndex = item.closest('.speck-vertical-block').getAttribute('data-block-index');
                const blockTitles = ['strategy', 'design', 'engineering', 'manufacturing'];
                
                if (blockTitles[blockIndex]) {
                    setTimeout(() => {
                        window.location.href = `services.html#${blockTitles[blockIndex]}`;
                    }, 200);
                }
            });
        });
        
        console.log(`✅ Инициализировано ${speckBlocks.length} вертикальных блоков`);
    }

    // ===== STATS COUNTER =====
    initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number-improved');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target;
                    const target = parseInt(statNumber.getAttribute('data-target')) || 0;
                    
                    if (target > 0) {
                        this.animateNumber(statNumber, target);
                        observer.unobserve(statNumber);
                    }
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    animateNumber(element, target) {
        let current = 0;
        const duration = 2000;
        const startTime = Date.now();
        
        const updateNumber = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            current = Math.floor(easeOutQuart * target);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target.toLocaleString();
                element.classList.add('counter-animate');
            }
        };
        requestAnimationFrame(updateNumber);
    }

    // ===== CLICKABLE STATS CARDS =====
    initClickableStats() {
        const statCards = document.querySelectorAll('.stat-card.clickable-stat-card');
        
        statCards.forEach(card => {
            // Enhanced hover effects
            card.addEventListener('mouseenter', () => {
                if (!this.isReducedMotion) {
                    card.style.transform = 'translateY(-10px)';
                    const icon = card.querySelector('.stat-icon');
                    if (icon) {
                        icon.style.transform = 'scale(1.1)';
                        icon.style.color = '#3399ff';
                    }
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (!this.isReducedMotion) {
                    card.style.transform = '';
                    const icon = card.querySelector('.stat-icon');
                    if (icon) {
                        icon.style.transform = '';
                        icon.style.color = '';
                    }
                }
            });
            
            // Touch/click effect
            card.addEventListener('click', (e) => {
                if (!this.isReducedMotion) {
                    card.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        card.style.transform = '';
                    }, 150);
                }
            });
        });
    }

    // ===== CLICKABLE CTA SECTION =====
    initCTAClickable() {
        const ctaSection = document.querySelector('.cta-improved.clickable-cta');
        if (!ctaSection) return;
        
        // Enhanced hover effects
        ctaSection.addEventListener('mouseenter', () => {
            if (!this.isReducedMotion) {
                ctaSection.style.transform = 'translateY(-5px)';
                const button = ctaSection.querySelector('.btn-glow');
                if (button) {
                    button.style.boxShadow = '0 12px 35px rgba(0, 102, 255, 0.4)';
                    button.style.transform = 'translateY(-3px)';
                }
            }
        });
        
        ctaSection.addEventListener('mouseleave', () => {
            if (!this.isReducedMotion) {
                ctaSection.style.transform = '';
                const button = ctaSection.querySelector('.btn-glow');
                if (button) {
                    button.style.boxShadow = '';
                    button.style.transform = '';
                }
            }
        });
    }

    // ===== SCROLL ANIMATIONS =====
    initScrollAnimations() {
        const elementsToAnimate = document.querySelectorAll('.reveal-element, .slide-up');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed', 'animate-in');
                }
            });
        }, { threshold: 0.1 });

        elementsToAnimate.forEach(el => observer.observe(el));
    }

    // ===== PARALLAX BACKGROUNDS =====
    initParallaxBackgrounds() {
        const contentSections = document.querySelectorAll('.content-section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bgIndex = entry.target.getAttribute('data-bg-index');
                    this.switchBackground(bgIndex);
                }
            });
        }, { threshold: 0.3 });

        contentSections.forEach(section => observer.observe(section));
    }

    switchBackground(bgIndex) {
        const backgrounds = document.querySelectorAll('.parallax-bg');
        backgrounds.forEach(bg => bg.classList.remove('active'));
        
        const targetBg = document.getElementById(`parallax-bg-${parseInt(bgIndex) + 1}`);
        if (targetBg) {
            targetBg.classList.add('active');
        }
    }

    // ===== MARQUEE ANIMATIONS =====
    initMarqueeAnimations() {
        const marqueeTracks = document.querySelectorAll('.marquee-track');
        
        if (!marqueeTracks.length) return;

        // Проверяем, есть ли уже анимация через CSS
        setTimeout(() => {
            const isWorking = Array.from(marqueeTracks).some(track => {
                const transform = window.getComputedStyle(track).transform;
                return transform !== 'none' && transform !== 'matrix(1, 0, 0, 1, 0, 0)';
            });
            
            if (!isWorking) {
                console.log('🎯 Бегущая строка не работает через CSS, запускаем JS...');
                this.initMarqueeJS();
            } else {
                console.log('✅ Бегущая строка работает через CSS');
            }
        }, 1000);
    }

    // JavaScript анимация как fallback
    initMarqueeJS() {
        console.log('🚀 Запуск JavaScript бегущей строки...');
        
        const tracks = document.querySelectorAll('.marquee-track');
        
        tracks.forEach((track, index) => {
            const isReverse = index === 1;
            
            // Убираем CSS анимации
            track.style.animation = 'none';
            
            let position = 0;
            const speed = isReverse ? 2 : -2;
            const contentWidth = track.scrollWidth / 3;
            let animationId = null;
            let isPaused = false;
            
            function animate() {
                if (isPaused) {
                    animationId = requestAnimationFrame(animate);
                    return;
                }
                
                position += speed;
                
                if (position <= -contentWidth) {
                    position = 0;
                } else if (position >= 0) {
                    position = -contentWidth;
                }
                
                track.style.transform = `translateX(${position}px)`;
                animationId = requestAnimationFrame(animate);
            }
            
            // Запускаем анимацию
            animate();
            
            // Пауза при наведении
            track.addEventListener('mouseenter', () => {
                isPaused = true;
            });
            
            track.addEventListener('mouseleave', () => {
                isPaused = false;
            });
            
            // Сохраняем ID для очистки
            track._animationId = animationId;
            
            console.log(`✅ Трек ${index + 1} запущен через JS`);
        });
    }

    // Cleanup
    destroy() {
        const tracks = document.querySelectorAll('.marquee-track');
        tracks.forEach(track => {
            if (track._animationId) {
                cancelAnimationFrame(track._animationId);
            }
        });
    }
}

// ===== GLOBAL INITIALIZATION =====
// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.homePage = new HomePage();
});

// Проверка работы бегущей строки
function checkMarqueeWorking() {
    setTimeout(() => {
        const tracks = document.querySelectorAll('.marquee-track');
        let isWorking = false;
        
        tracks.forEach(track => {
            const transform = window.getComputedStyle(track).transform;
            if (transform !== 'none' && transform !== 'matrix(1, 0, 0, 1, 0, 0)') {
                isWorking = true;
            }
        });
        
        if (!isWorking && window.homePage) {
            console.warn('⚠️ Бегущая строка не работает, принудительный запуск...');
            window.homePage.initMarqueeJS();
        }
    }, 2000);
}

// Проверяем после полной загрузки
window.addEventListener('load', checkMarqueeWorking);

// Резервный запуск через 5 секунд
setTimeout(checkMarqueeWorking, 5000);

// ===== UTILITY FUNCTIONS =====
// Simple header hide function for quick integration
window.initSimpleHeaderHide = function() {
    const header = document.querySelector('.main-header');
    if (!header || !document.body.classList.contains('home-page')) return;
    
    let lastScroll = 0;
    const hideHeight = 100;
    let isHidden = false;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 50) {
            // Вверху страницы - показываем
            header.style.transform = 'translateY(0)';
            header.style.opacity = '1';
            header.style.pointerEvents = 'auto';
            header.style.transition = 'transform 0.4s ease, opacity 0.3s ease';
            isHidden = false;
        } 
        else if (currentScroll > lastScroll && currentScroll > hideHeight && !isHidden) {
            // Скроллим вниз - скрываем
            header.style.transform = 'translateY(-100%)';
            header.style.opacity = '0';
            header.style.pointerEvents = 'none';
            header.style.transition = 'transform 0.5s ease, opacity 0.4s ease';
            isHidden = true;
        } 
        else if (currentScroll < lastScroll && isHidden) {
            // Скроллим вверх - показываем
            header.style.transform = 'translateY(0)';
            header.style.opacity = '1';
            header.style.pointerEvents = 'auto';
            header.style.transition = 'transform 0.4s ease, opacity 0.3s ease';
            isHidden = false;
        }
        
        lastScroll = currentScroll;
    });
    
    // Показываем при наведении
    header.addEventListener('mouseenter', () => {
        if (isHidden) {
            header.style.transform = 'translateY(0)';
            header.style.opacity = '1';
            header.style.pointerEvents = 'auto';
            isHidden = false;
        }
    });
};

// Export для глобального доступа
window.initHomePage = function() {
    if (!window.homePage) {
        window.homePage = new HomePage();
    }
};

// Инициализация хедера для главной страницы
function initHomeHeader() {
    const header = document.querySelector('.main-header');
    if (!header) {
        setTimeout(initHomeHeader, 100);
        return;
    }

    let isHidden = false;
    const hideThreshold = 100;

    function handleScroll() {
        const scrollY = window.pageYOffset;
        
        if (scrollY > hideThreshold && !isHidden) {
            header.classList.add('header-hidden');
            isHidden = true;
        } else if (scrollY <= hideThreshold && isHidden) {
            header.classList.remove('header-hidden');
            isHidden = false;
        }
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    header.addEventListener('mouseenter', function() {
        if (isHidden) {
            header.classList.remove('header-hidden');
            setTimeout(function() {
                if (isHidden && window.pageYOffset > hideThreshold) {
                    header.classList.add('header-hidden');
                }
            }, 2000);
        }
    });
}

// Автоматическая инициализация при загрузке
if (document.body.classList.contains('home-page')) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (window.homePage) {
                window.homePage.initSpeckVerticalBlocks();
            }
        }, 500);
    });
    }
