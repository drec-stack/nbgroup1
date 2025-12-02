// marquee.js - Гарантированный запуск бегущей строки
// Этот скрипт обеспечивает работу бегущей строки даже если home.js не сработал

(function() {
    'use strict';
    
    console.log('🎬 Marquee.js загружен');
    
    class MarqueeFallback {
        constructor() {
            this.animations = [];
            this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            this.init();
        }
        
        init() {
            // Ждем полной загрузки DOM
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setup());
            } else {
                this.setup();
            }
        }
        
        setup() {
            console.log('🔄 Настройка бегущей строки...');
            
            // Даем время основному скрипту запуститься
            setTimeout(() => {
                this.checkAndStartMarquee();
            }, 1500);
        }
        
        checkAndStartMarquee() {
            const marquee1 = document.getElementById('marquee1');
            const marquee2 = document.getElementById('marquee2');
            
            if (!marquee1 || !marquee2) {
                console.error('❌ Элементы бегущей строки не найдены');
                return;
            }
            
            // Проверяем, двигается ли уже бегущая строка
            const isAlreadyMoving = this.checkIfMoving(marquee1, marquee2);
            
            if (!isAlreadyMoving) {
                console.log('🚨 Основная анимация не работает, запускаем fallback...');
                this.startFallbackAnimation(marquee1, marquee2);
            } else {
                console.log('✅ Основная анимация работает');
            }
        }
        
        checkIfMoving(marquee1, marquee2) {
            // Проверяем через computed style
            const style1 = window.getComputedStyle(marquee1);
            const style2 = window.getComputedStyle(marquee2);
            
            // Проверяем разные признаки анимации
            const checks = [
                style1.transform !== 'none' && style1.transform !== 'matrix(1, 0, 0, 1, 0, 0)',
                style2.transform !== 'none' && style2.transform !== 'matrix(1, 0, 0, 1, 0, 0)',
                style1.animationName !== 'none',
                style2.animationName !== 'none',
                marquee1.style.transform && marquee1.style.transform !== '',
                marquee2.style.transform && marquee2.style.transform !== ''
            ];
            
            return checks.some(check => check === true);
        }
        
        startFallbackAnimation(marquee1, marquee2) {
            if (this.isReducedMotion) {
                this.setupStaticMarquee(marquee1, marquee2);
                return;
            }
            
            // Добавляем CSS классы для анимации
            marquee1.classList.add('marquee-animate-left');
            marquee2.classList.add('marquee-animate-right');
            
            // Принудительно запускаем анимации
            marquee1.style.animationPlayState = 'running';
            marquee2.style.animationPlayState = 'running';
            
            // Добавляем оптимизации
            this.optimizeMarquee(marquee1);
            this.optimizeMarquee(marquee2);
            
            // Добавляем паузу при наведении
            this.addHoverPause(marquee1);
            this.addHoverPause(marquee2);
            
            console.log('✅ Fallback анимация запущена');
            this.animations = [marquee1, marquee2];
            
            // Проверяем через 2 секунды
            setTimeout(() => {
                const style1 = window.getComputedStyle(marquee1);
                if (style1.animationName === 'none') {
                    console.warn('⚠️ CSS анимации не работают, пробуем JS...');
                    this.startJSAnimation(marquee1, marquee2);
                }
            }, 2000);
        }
        
        optimizeMarquee(marquee) {
            // Оптимизации для плавности
            marquee.style.willChange = 'transform';
            marquee.style.backfaceVisibility = 'hidden';
            marquee.style.transform = 'translate3d(0, 0, 0)';
        }
        
        addHoverPause(marquee) {
            const container = marquee.closest('.marquee-container');
            if (!container) return;
            
            container.addEventListener('mouseenter', () => {
                marquee.style.animationPlayState = 'paused';
            });
            
            container.addEventListener('mouseleave', () => {
                marquee.style.animationPlayState = 'running';
            });
        }
        
        setupStaticMarquee(marquee1, marquee2) {
            // Для reduced motion показываем статично
            marquee1.style.justifyContent = 'center';
            marquee2.style.justifyContent = 'center';
            
            // Скрываем дублированные треки
            const tracks1 = marquee1.querySelectorAll('.marquee-track');
            const tracks2 = marquee2.querySelectorAll('.marquee-track');
            
            if (tracks1.length > 1) tracks1[1].style.display = 'none';
            if (tracks2.length > 1) tracks2[1].style.display = 'none';
            
            console.log('♿ Reduced motion: статичная бегущая строка');
        }
        
        startJSAnimation(marquee1, marquee2) {
            // Резервная JS анимация если CSS не работает
            console.log('🔄 Запуск JS анимации...');
            
            this.animateMarqueeJS(marquee1, false); // Влево
            this.animateMarqueeJS(marquee2, true);  // Вправо
        }
        
        animateMarqueeJS(marquee, reverse) {
            const tracks = marquee.querySelectorAll('.marquee-track');
            if (!tracks.length) return;
            
            const track = tracks[0];
            const trackWidth = track.offsetWidth;
            let position = 0;
            const speed = reverse ? 1.5 : -1.5;
            let animationId = null;
            let isPaused = false;
            
            function animate() {
                if (isPaused) {
                    animationId = requestAnimationFrame(animate);
                    return;
                }
                
                position += speed;
                
                // Бесконечная прокрутка
                if (position <= -trackWidth) {
                    position = 0;
                } else if (position >= 0) {
                    position = -trackWidth;
                }
                
                marquee.style.transform = `translateX(${position}px)`;
                animationId = requestAnimationFrame(animate);
            }
            
            // Начальная позиция для обратного направления
            if (reverse) {
                position = -trackWidth / 2;
                marquee.style.transform = `translateX(${position}px)`;
            }
            
            // Запуск
            animate();
            
            // Сохраняем для управления
            marquee._jsAnimation = {
                id: animationId,
                pause: () => isPaused = true,
                resume: () => isPaused = false
            };
            
            // Пауза при наведении
            const container = marquee.closest('.marquee-container');
            if (container) {
                container.addEventListener('mouseenter', () => {
                    isPaused = true;
                });
                
                container.addEventListener('mouseleave', () => {
                    isPaused = false;
                });
            }
        }
        
        destroy() {
            // Очистка анимаций
            this.animations.forEach(marquee => {
                marquee.classList.remove('marquee-animate-left', 'marquee-animate-right');
                marquee.style.animation = '';
                marquee.style.transform = '';
                
                if (marquee._jsAnimation && marquee._jsAnimation.id) {
                    cancelAnimationFrame(marquee._jsAnimation.id);
                }
            });
        }
    }
    
    // Автоматический запуск
    if (typeof window !== 'undefined') {
        // Ждем немного перед инициализацией
        setTimeout(() => {
            window.marqueeFallback = new MarqueeFallback();
        }, 100);
    }
    
    // Глобальные функции для ручного управления
    window.startMarqueeFallback = function() {
        if (window.marqueeFallback) {
            window.marqueeFallback.checkAndStartMarquee();
        }
    };
    
    window.stopMarqueeFallback = function() {
        if (window.marqueeFallback) {
            window.marqueeFallback.destroy();
        }
    };
    
})();