// home.js - Complete Home Page Functionality

class HomePage {
    constructor() {
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    init() {
        this.initSpeckDesignBlocks();
        this.initScrollAnimations();
        this.initStatsCounter();
        this.initParallaxBackgrounds();
        this.initMarqueeAnimations();
        this.initClickableStats();
        this.initCTAClickable();
        console.log('🏠 HomePage инициализирован');
    }

    // Speck Design Blocks Initialization
    initSpeckDesignBlocks() {
        const speckBlocks = document.querySelectorAll('.speck-service-block-full');
        
        if (!speckBlocks.length) return;

        // Scroll animation with staggered delay
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Delay based on position
                    const delay = index * 150;
                    setTimeout(() => {
                        entry.target.style.animationDelay = `${delay}ms`;
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 300);
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        speckBlocks.forEach(block => {
            // Initial state
            block.style.opacity = '0';
            block.style.transform = 'translateY(40px)';
            block.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            observer.observe(block);
            
            // Enhanced hover effects
            const arrow = block.querySelector('.speck-action-arrow');
            const listItems = block.querySelectorAll('.speck-block-list li');
            
            if (arrow) {
                block.addEventListener('mouseenter', () => {
                    if (!this.isReducedMotion) {
                        arrow.style.transform = 'translateX(8px)';
                    }
                });
                
                block.addEventListener('mouseleave', () => {
                    if (!this.isReducedMotion) {
                        arrow.style.transform = '';
                    }
                });
            }
            
            // Animate list items on hover
            block.addEventListener('mouseenter', () => {
                if (!this.isReducedMotion) {
                    listItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.transform = 'translateX(5px)';
                        }, index * 50);
                    });
                }
            });
            
            block.addEventListener('mouseleave', () => {
                if (!this.isReducedMotion) {
                    listItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.transform = '';
                        }, index * 30);
                    });
                }
            });
            
            // Add keyboard navigation
            block.setAttribute('tabindex', '0');
            block.setAttribute('role', 'link');
            
            block.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.location.href = block.getAttribute('href');
                }
            });
        });
        
        // Add hover effect for main title
        const mainTitle = document.querySelector('.speck-main-title');
        if (mainTitle) {
            mainTitle.style.transition = 'all 0.4s ease';
            mainTitle.addEventListener('mouseenter', () => {
                if (!this.isReducedMotion) {
                    mainTitle.style.background = 'linear-gradient(135deg, #ffffff 0%, #66b5ff 100%)';
                    mainTitle.style.webkitBackgroundClip = 'text';
                    mainTitle.style.backgroundClip = 'text';
                }
            });
            
            mainTitle.addEventListener('mouseleave', () => {
                if (!this.isReducedMotion) {
                    mainTitle.style.background = 'linear-gradient(135deg, #ffffff 0%, #a0a0ff 100%)';
                }
            });
        }
        
        console.log(`🎨 Initialized ${speckBlocks.length} Speck Design blocks`);
    }

    // Clickable stats cards
    initClickableStats() {
        const statCards = document.querySelectorAll('.stat-card.clickable-stat-card');
        
        statCards.forEach(card => {
            // Добавляем класс для глобальной обработки
            if (!card.classList.contains('clickable-element')) {
                card.classList.add('clickable-element');
            }
            
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
        });
    }

    // Clickable CTA section
    initCTAClickable() {
        const ctaSection = document.querySelector('.cta-improved.clickable-cta');
        if (!ctaSection) return;
        
        // Добавляем класс для глобальной обработки
        if (!ctaSection.classList.contains('clickable-element')) {
            ctaSection.classList.add('clickable-element');
        }
        
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

    // Scroll animations
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

    // Stats counters
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

    // Parallax backgrounds
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

    // Marquee animations
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

// Export для глобального доступа
window.initHomePage = function() {
    if (!window.homePage) {
        window.homePage = new HomePage();
    }
};
