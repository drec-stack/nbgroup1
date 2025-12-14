// contacts.js - Инициализация страницы контактов с хедером
console.log('🚀 Contact page with header initialized');

// Инициализация страницы контактов
function initContact() {
    console.log('🎯 Initializing contact page with header...');
    
    setupContactForm();
    setupContactInteractions();
    setupMapInteraction();
    setupFAQAccordion();
    setupContactCards();
    setupHeaderPadding();
    
    console.log('✅ Contact page initialized successfully');
}

// Настройка отступов для хедера
function setupHeaderPadding() {
    const header = document.querySelector('.main-header');
    const contactHero = document.querySelector('.contact-hero');
    
    if (header && contactHero) {
        const updatePadding = () => {
            const headerHeight = header.offsetHeight;
            contactHero.style.paddingTop = (headerHeight + 100) + 'px';
        };
        
        updatePadding();
        window.addEventListener('resize', updatePadding);
        window.addEventListener('load', updatePadding);
    }
}

// Настройка контактной формы
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const isMobile = window.innerWidth <= 768;
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm(this)) {
                if (isMobile) {
                    shakeForm(this);
                }
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Показ состояния загрузки
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + 
                (window.i18n ? window.i18n.t('contact.form.sending') : 'Sending...');
            submitBtn.disabled = true;
            
            // Симуляция отправки
            setTimeout(() => {
                // Уведомление об успехе
                if (window.NBApp && window.NBApp.showNotification) {
                    window.NBApp.showNotification(
                        window.i18n ? window.i18n.t('contact.form.success') : 
                        'Message sent successfully! We\'ll get back to you within 24 hours.', 
                        'success'
                    );
                } else {
                    showNotification(
                        window.i18n ? window.i18n.t('contact.form.success') : 
                        'Message sent successfully! We\'ll get back to you within 24 hours.',
                        'success'
                    );
                }
                
                // Сброс формы
                this.reset();
                resetFormValidation(this);
                
                // Сброс состояния кнопки
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Анимация успеха
                celebrateSubmission();
            }, 2000);
        });
    }
    
    // Улучшенная валидация в реальном времени
    const formInputs = contactForm?.querySelectorAll('input, select, textarea');
    if (formInputs) {
        formInputs.forEach(input => {
            // Оптимизация для мобильных
            if (isMobile) {
                input.addEventListener('focus', () => {
                    input.parentElement.classList.add('focused');
                    // Прокрутка к полю ввода на мобильных
                    setTimeout(() => {
                        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 300);
                });
            } else {
                input.addEventListener('focus', () => {
                    input.parentElement.classList.add('focused');
                });
            }
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
                validateField(input);
            });
            
            input.addEventListener('input', () => {
                validateField(input);
            });
        });
    }
}

// Валидация формы
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const formGroup = field.parentElement;
    
    formGroup.classList.remove('valid', 'invalid');
    
    if (field.hasAttribute('required') && !value) {
        formGroup.classList.add('invalid');
        return false;
    }
    
    if (!value) return true;
    
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) {
            formGroup.classList.add('valid');
            return true;
        } else {
            formGroup.classList.add('invalid');
            return false;
        }
    }
    
    if (field.type === 'tel') {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
        if (phoneRegex.test(value) && value.replace(/\D/g, '').length >= 10) {
            formGroup.classList.add('valid');
            return true;
        } else {
            formGroup.classList.add('invalid');
            return false;
        }
    }
    
    if (field.hasAttribute('required') && value) {
        formGroup.classList.add('valid');
        return true;
    }
    
    return true;
}

function resetFormValidation(form) {
    const formGroups = form.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('valid', 'invalid', 'focused');
    });
}

// Анимация ошибки для мобильных
function shakeForm(form) {
    form.style.transform = 'translateX(10px)';
    setTimeout(() => {
        form.style.transform = 'translateX(-10px)';
        setTimeout(() => {
            form.style.transform = 'translateX(0)';
        }, 100);
    }, 100);
}

// Настройка контактных карточек
function setupContactCards() {
    const contactCards = document.querySelectorAll('.contact-card');
    const isMobile = window.innerWidth <= 768;
    
    contactCards.forEach(card => {
        if (!isMobile) {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.card-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.card-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0)';
                }
            });
        }
        
        // Клик для мобильных
        if (isMobile) {
            card.addEventListener('click', function() {
                const link = this.querySelector('.card-link');
                if (link && (link.getAttribute('href').startsWith('tel:') || 
                             link.getAttribute('href').startsWith('mailto:'))) {
                    return;
                }
                
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        }
    });
}

// Настройка взаимодействий
function setupContactInteractions() {
    const socialCards = document.querySelectorAll('.social-card');
    const isMobile = window.innerWidth <= 768;
    
    socialCards.forEach(card => {
        if (!isMobile) {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.social-icon');
                const arrow = card.querySelector('.social-arrow');
                
                if (icon) icon.style.transform = 'scale(1.1) rotate(5deg)';
                if (arrow) arrow.style.transform = 'translateX(5px)';
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.social-icon');
                const arrow = card.querySelector('.social-arrow');
                
                if (icon) icon.style.transform = 'scale(1) rotate(0)';
                if (arrow) arrow.style.transform = 'translateX(0)';
            });
        }
        
        // Touch feedback для мобильных
        if (isMobile) {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        }
    });
}

// Настройка карты
function setupMapInteraction() {
    const mapBtn = document.getElementById('openMapBtn');
    const copyBtn = document.getElementById('copyAddressBtn');
    const isMobile = window.innerWidth <= 768;
    
    if (mapBtn) {
        mapBtn.addEventListener('click', () => {
            if (isMobile) {
                window.open('https://maps.google.com/?q=Moscow+City+Tower+45+Presnenskaya+Naberezhnaya+123+Moscow+Russia+123112', '_blank');
            } else {
                window.open('https://www.google.com/maps/place/Moscow+City', '_blank');
            }
        });
    }
    
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const address = 'Moscow City, Tower 45, Presnenskaya Naberezhnaya, 123, Moscow, Russia 123112';
            
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(address).then(() => {
                    showNotification(
                        window.i18n ? window.i18n.t('contact.map.copied') : 'Address copied to clipboard!',
                        'success'
                    );
                });
            } else {
                // Fallback для старых браузеров
                const textArea = document.createElement('textarea');
                textArea.value = address;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                showNotification(
                    window.i18n ? window.i18n.t('contact.map.copied') : 'Address copied to clipboard!',
                    'success'
                );
            }
        });
    }
}

// Настройка FAQ аккордеона
function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    const isMobile = window.innerWidth <= 768;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Закрываем все items
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                    const answer = faq.querySelector('.faq-answer');
                    if (answer) {
                        answer.style.maxHeight = '0';
                    }
                });
                
                // Открываем clicked item если не активен
                if (!isActive) {
                    item.classList.add('active');
                    const answer = item.querySelector('.faq-answer');
                    if (answer) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        
                        // На мобильных скроллим к открытому вопросу
                        if (isMobile) {
                            setTimeout(() => {
                                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            }, 300);
                        }
                    }
                }
            });
        }
    });
}

// Анимация успешной отправки
function celebrateSubmission() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.style.transform = 'scale(0.98)';
        setTimeout(() => {
            form.style.transform = 'scale(1)';
        }, 150);
    }
}

// Функция показа уведомлений
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        max-width: 350px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 12px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 5000);
}

// Мобильные оптимизации
function setupMobileOptimizations() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Оптимизация ввода для мобильных
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                document.documentElement.style.scrollPaddingBottom = '300px';
            });
            
            input.addEventListener('blur', function() {
                document.documentElement.style.scrollPaddingBottom = '0';
            });
        });
        
        // Предотвращение zoom при фокусе
        document.addEventListener('touchstart', function() {}, { passive: true });
    }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 Contact page DOM loaded');
    
    // Даем время на загрузку хедера
    setTimeout(() => {
        if (typeof initContact === 'function') {
            initContact();
        }
    }, 300);
});

// Реинициализация при изменении размера окна
window.addEventListener('resize', () => {
    setTimeout(() => {
        if (typeof initContact === 'function') {
            initContact();
        }
    }, 250);
});

// Экспорт функции для глобального использования
window.initContact = initContact;

// Инициализация если DOM уже загружен
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    setTimeout(() => {
        if (typeof initContact === 'function') {
            initContact();
        }
    }, 200);
}

console.log('✅ contacts.js loaded successfully');
