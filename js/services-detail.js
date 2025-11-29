// Service detail page functionality
document.addEventListener('DOMContentLoaded', function() {
    initServicePageAnimations();
    initServiceInteractions();
    initServiceParallax();
    initProcessStepsAnimation();
});

function initServicePageAnimations() {
    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Анимируем элементы features
    const featureElements = document.querySelectorAll('.service-feature');
    featureElements.forEach((el, index) => {
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Анимируем info cards
    const infoCards = document.querySelectorAll('.service-info-card');
    infoCards.forEach((el, index) => {
        el.style.transition = `opacity 0.6s ease ${index * 0.1 + 0.3}s, transform 0.6s ease ${index * 0.1 + 0.3}s`;
        observer.observe(el);
    });

    // Анимация для hero секции
    const heroContent = document.querySelector('.service-hero-content');
    const heroVisual = document.querySelector('.service-hero-visual');
    
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateX(-50px)';
        heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateX(0)';
        }, 300);
    }
    
    if (heroVisual) {
        heroVisual.style.opacity = '0';
        heroVisual.style.transform = 'translateX(50px)';
        heroVisual.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroVisual.style.opacity = '1';
            heroVisual.style.transform = 'translateX(0)';
        }, 500);
    }
}

function initServiceInteractions() {
    // Добавляем интерактивность для карточек фич
    const serviceFeatures = document.querySelectorAll('.service-feature');
    
    serviceFeatures.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            if (this.classList.contains('animated')) {
                this.style.transform = 'translateY(-5px)';
            }
        });
        
        feature.addEventListener('mouseleave', function() {
            if (this.classList.contains('animated')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // Интерактивность для info cards
    const infoCards = document.querySelectorAll('.service-info-card');
    
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (this.classList.contains('animated')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('animated')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // Интерактивность для process steps
    const processSteps = document.querySelectorAll('.process-step');
    
    processSteps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function initServiceParallax() {
    // Простой параллакс эффект для hero секции
    const heroSection = document.querySelector('.service-hero');
    if (!heroSection) return;

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const heroContent = document.querySelector('.service-hero-content');
        const heroVisual = document.querySelector('.service-hero-visual');
        
        if (heroContent && heroVisual) {
            const contentRate = rate * 0.3;
            const visualRate = rate * 0.5;
            
            heroContent.style.transform = `translateY(${contentRate}px)`;
            heroVisual.style.transform = `translateY(${visualRate}px)`;
        }
    });
}

function initProcessStepsAnimation() {
    // Анимация для шагов процесса
    const processSteps = document.querySelectorAll('.process-step');
    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                processObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    processSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        processObserver.observe(step);
    });
}

// Добавляем плавный скролл для навигации
function smoothScrollToTarget(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }
}

// Export functions for global access
window.initServicePageAnimations = initServicePageAnimations;
window.initServiceInteractions = initServiceInteractions;
window.initServiceParallax = initServiceParallax;
window.initProcessStepsAnimation = initProcessStepsAnimation;
window.smoothScrollToTarget = smoothScrollToTarget;

console.log('✅ Service detail page scripts loaded successfully');