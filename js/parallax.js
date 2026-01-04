// parallax.js - SPEK DESIGN STYLE - ПОЛНАЯ ВЕРСИЯ
console.log('🎯 parallax.js loaded - SPEK DESIGN STYLE');

class ScrollBackgroundChanger {
    constructor() {
        this.backgrounds = document.querySelectorAll('.parallax-bg');
        this.sections = document.querySelectorAll('.content-section, section[class*="section"]');
        this.progressBar = document.querySelector('.scroll-progress-bar');
        
        this.currentBgIndex = 0;
        this.isAnimating = false;
        this.isMobile = this.checkIsMobile();
        this.lastScrollY = window.scrollY;
        
        // Настройки для плавной смены
        this.scrollThreshold = 50;
        this.sectionBgMap = new Map();
        this.currentSection = null;
        
        this.fixMobileIssues();
        this.initSectionMapping();
        this.init();
    }
    
    checkIsMobile() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    initSectionMapping() {
        console.log('🗺️ Initializing section-background mapping...');
        
        // Получаем все основные секции на странице
        const allSections = [
            document.querySelector('.parallax-hero') || document.querySelector('.hero'),
            document.querySelector('.speck-vertical-section'),
            document.querySelector('.speck-marquee-section'),
            document.querySelector('.stats-improved'),
            document.querySelector('.cta-improved')
        ].filter(section => section !== null);
        
        // Назначаем каждой секции свой фон по порядку
        allSections.forEach((section, index) => {
            const bgIndex = index % this.backgrounds.length;
            this.sectionBgMap.set(section, bgIndex);
            section.dataset.bgIndex = bgIndex;
            
            console.log(`📌 Section ${index + 1} (${section.className}) → Background ${bgIndex}`);
        });
        
        // Если секций больше, чем фонов - используем циклическое распределение
        const additionalSections = Array.from(document.querySelectorAll('section')).filter(section => 
            !allSections.includes(section) && 
            section.offsetHeight > 100 && // Игнорируем маленькие секции
            !section.classList.contains('parallax-hero')
        );
        
        additionalSections.forEach((section, index) => {
            const bgIndex = (allSections.length + index) % this.backgrounds.length;
            this.sectionBgMap.set(section, bgIndex);
            section.dataset.bgIndex = bgIndex;
            
            console.log(`📌 Additional section (${section.className}) → Background ${bgIndex}`);
        });
    }
    
    fixMobileIssues() {
        if (this.isMobile) {
            console.log('📱 Mobile device detected, applying fixes...');
            
            // Базовые фиксы для мобильных
            document.documentElement.style.overflowX = 'hidden';
            document.body.style.overflowX = 'hidden';
            
            // Оптимизация фонов для мобильных
            this.backgrounds.forEach(bg => {
                bg.style.backgroundAttachment = 'scroll';
                bg.style.backgroundPosition = 'center center';
                bg.style.backgroundSize = 'cover';
                bg.style.transform = 'none';
                bg.style.willChange = 'auto';
            });
        }
    }
    
    init() {
        console.log('🎯 Initializing Speck Design style background system...');
        
        if (this.backgrounds.length === 0) {
            console.warn('⚠️ No parallax backgrounds found');
            return;
        }
        
        // Устанавливаем начальный фон
        this.setBackground(0);
        
        // Настраиваем основной наблюдатель
        this.setupIntersectionObserver();
        
        // Настраиваем прогресс бар
        this.setupProgressBar();
        
        // Резервный обработчик для браузеров без IntersectionObserver
        this.throttledScroll = this.throttle(this.handleScroll.bind(this), 100);
        window.addEventListener('scroll', this.throttledScroll, { passive: true });
        
        console.log(`✅ Background system ready: ${this.backgrounds.length} backgrounds for ${this.sectionBgMap.size} sections`);
    }
    
    setupIntersectionObserver() {
        if (!('IntersectionObserver' in window)) {
            console.warn('⚠️ IntersectionObserver not supported, using scroll-based detection');
            return;
        }
        
        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -30% 0px', // Секция активна когда 40% в области просмотра
            threshold: 0.4
        };
        
        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isAnimating) {
                    const section = entry.target;
                    const bgIndex = this.sectionBgMap.get(section);
                    
                    if (bgIndex !== undefined && bgIndex !== this.currentBgIndex) {
                        // Находим индекс для логирования
                        let sectionName = 'Unknown';
                        this.sectionBgMap.forEach((index, sec) => {
                            if (sec === section) {
                                sectionName = sec.className || 'section';
                            }
                        });
                        
                        console.log(`🎨 "${sectionName}" entered view → Background ${bgIndex}`);
                        this.currentSection = section;
                        this.setBackground(bgIndex);
                    }
                }
            });
        }, observerOptions);
        
        // Наблюдаем за всеми секциями в карте
        this.sectionBgMap.forEach((bgIndex, section) => {
            this.intersectionObserver.observe(section);
            console.log(`👁️ Observing section: ${section.className || 'unnamed-section'}`);
        });
    }
    
    handleScroll() {
        if (this.isAnimating || this.isMobile) return;
        
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const scrollDirection = scrollY > this.lastScrollY ? 'down' : 'up';
        
        // Используем IntersectionObserver если доступен, иначе определяем секцию по скроллу
        if (!this.intersectionObserver) {
            this.detectCurrentSection(scrollY, windowHeight);
        }
        
        this.lastScrollY = scrollY;
    }
    
    detectCurrentSection(scrollY, windowHeight) {
        let closestSection = null;
        let minDistance = Infinity;
        let closestBgIndex = 0;
        
        this.sectionBgMap.forEach((bgIndex, section) => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + scrollY;
            const sectionCenter = sectionTop + rect.height / 2;
            const distanceFromCenter = Math.abs((scrollY + windowHeight / 2) - sectionCenter);
            
            if (distanceFromCenter < minDistance) {
                minDistance = distanceFromCenter;
                closestSection = section;
                closestBgIndex = bgIndex;
            }
        });
        
        if (closestSection && closestBgIndex !== this.currentBgIndex) {
            console.log(`🎨 Scroll detected: "${closestSection.className}" → Background ${closestBgIndex}`);
            this.setBackground(closestBgIndex);
        }
    }
    
    setBackground(index) {
        if (this.isAnimating || index === this.currentBgIndex || !this.backgrounds[index]) return;
        
        this.isAnimating = true;
        const previousIndex = this.currentBgIndex;
        this.currentBgIndex = index;
        
        console.log(`🔄 Transition: Background ${previousIndex} → ${index}`);
        
        // Плавное исчезновение текущего фона
        if (this.backgrounds[previousIndex]) {
            this.backgrounds[previousIndex].style.transition = 'opacity 0.8s ease';
            this.backgrounds[previousIndex].style.opacity = '0';
        }
        
        // Плавное появление нового фона
        setTimeout(() => {
            this.backgrounds.forEach(bg => {
                bg.classList.remove('active');
            });
            
            const newBg = this.backgrounds[index];
            newBg.classList.add('active');
            newBg.style.opacity = '0';
            newBg.style.transition = 'opacity 1s ease';
            
            // Запускаем анимацию появления
            requestAnimationFrame(() => {
                newBg.style.opacity = '1';
            });
            
            // Сбрасываем флаг анимации
            setTimeout(() => {
                this.isAnimating = false;
                newBg.style.transition = '';
                if (this.backgrounds[previousIndex]) {
                    this.backgrounds[previousIndex].style.transition = '';
                }
            }, 1000);
        }, this.isMobile ? 300 : 500);
    }
    
    setupProgressBar() {
        if (!this.progressBar) return;
        
        const updateProgress = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const progress = (scrollTop / documentHeight) * 100;
            
            this.progressBar.style.width = `${Math.min(progress, 100)}%`;
            this.progressBar.style.transition = 'width 0.1s ease';
        };
        
        window.addEventListener('scroll', this.throttle(updateProgress, 100), { passive: true });
    }
    
    throttle(func, limit) {
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
    
    handleResize() {
        this.isMobile = this.checkIsMobile();
        this.fixMobileIssues();
        
        // Переинициализация при значительном изменении размера
        if (window.parallaxInstance) {
            setTimeout(() => {
                if (this.intersectionObserver) {
                    this.intersectionObserver.disconnect();
                }
                this.initSectionMapping();
                this.setupIntersectionObserver();
            }, 300);
        }
    }
    
    destroy() {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
        window.removeEventListener('scroll', this.throttledScroll);
        this.backgrounds.forEach(bg => {
            bg.classList.remove('active');
            bg.style.opacity = '';
            bg.style.transition = '';
        });
        this.backgrounds[0]?.classList.add('active');
    }
}

// Инициализация при полной загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded, initializing Speck Design parallax...');
    
    // Даем время на загрузку всех компонентов
    setTimeout(() => {
        const parallaxBackgrounds = document.querySelectorAll('.parallax-bg');
        
        if (parallaxBackgrounds.length > 0) {
            try {
                window.parallaxInstance = new ScrollBackgroundChanger();
                console.log('✅ Speck Design parallax system initialized successfully');
                
                // Проверка инициализации
                setTimeout(() => {
                    const activeBg = document.querySelector('.parallax-bg.active');
                    console.log(`🔍 Active background check: ${activeBg ? 'OK' : 'NO ACTIVE BACKGROUND!'}`);
                }, 500);
            } catch (error) {
                console.error('❌ Error initializing parallax:', error);
                // Fallback: показываем только первый фон
                parallaxBackgrounds.forEach((bg, index) => {
                    if (index === 0) bg.classList.add('active');
                    else bg.style.display = 'none';
                });
            }
        } else {
            console.warn('⚠️ No .parallax-bg elements found on page');
        }
    }, 300);
});

// Обработчик изменения размера окна
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.parallaxInstance) {
            console.log('🔄 Window resized, updating parallax system...');
            window.parallaxInstance.handleResize();
        }
    }, 250);
});

// Экспорт для глобального доступа
window.ScrollBackgroundChanger = ScrollBackgroundChanger;
