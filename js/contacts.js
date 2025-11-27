// contacts.js - МОБИЛЬНАЯ ОПТИМИЗАЦИЯ
console.log('🎯 contacts.js loaded - MOBILE OPTIMIZED');

function initContact() {
    console.log('🎯 Initializing contact page with mobile optimizations...');
    
    setupContactForm();
    setupContactInteractions();
    setupMapInteraction();
    setupFAQAccordion();
    setupContactCards();
    setupMobileOptimizations();
    
    console.log('✅ Contact page optimized for mobile');
}

// ОПТИМИЗИРОВАННАЯ ФОРМА ДЛЯ МОБИЛЬНЫХ
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const isMobile = window.innerWidth <= 768;
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm(this)) {
                // Визуальный feedback при ошибке
                if (isMobile) {
                    shakeForm(this);
                }
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Показ состояния загрузки
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (window.i18n ? window.i18n.t('contact.form.sending') : 'Sending...');
            submitBtn.disabled = true;
            
            // Симуляция отправки
            setTimeout(() => {
                if (window.NBApp) {
                    window.NBApp.showNotification(
                        window.i18n ? window.i18n.t('contact.form.success') : 'Message sent successfully! We\'ll get back to you within 24 hours.', 
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

// ВАЛИДАЦИЯ ФОРМЫ
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

// АНИМАЦИЯ ОШИБКИ ДЛЯ МОБИЛЬНЫХ
function shakeForm(form) {
    form.style.transform = 'translateX(10px)';
    setTimeout(() => {
        form.style.transform = 'translateX(-10px)';
        setTimeout(() => {
            form.style.transform = 'translateX(0)';
        }, 100);
    }, 100);
}

// ОПТИМИЗИРОВАННЫЕ КОНТАКТНЫЕ КАРТОЧКИ
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
                if (link && link.getAttribute('href').startsWith('tel:') || link.getAttribute('href').startsWith('mailto:')) {
                    // Прямое действие для телефона/email
                    return;
                }
                
                // Визуальный feedback
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        }
    });
}

// ОПТИМИЗИРОВАННЫЕ СОЦИАЛЬНЫЕ КАРТОЧКИ
function setupContactInteractions() {
    const socialCards = document.querySelectorAll('.social-card');
    const isMobile = window.innerWidth <= 768;
    
    socialCards.forEach(card => {
        if (!isMobile) {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.social-icon');
                const arrow = card.querySelector('.social-arrow');
                
                if (icon) icon.style.transform = 'scale(1.1)';
                if (arrow) arrow.style.transform = 'translateX(5px)';
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.social-icon');
                const arrow = card.querySelector('.social-arrow');
                
                if (icon) icon.style.transform = 'scale(1)';
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

// ОПТИМИЗИРОВАННОЕ ВЗАИМОДЕЙСТВИЕ С КАРТОЙ
function setupMapInteraction() {
    const mapBtn = document.getElementById('openMapBtn');
    const copyBtn = document.getElementById('copyAddressBtn');
    const isMobile = window.innerWidth <= 768;
    
    if (mapBtn) {
        mapBtn.addEventListener('click', () => {
            // Разные действия для мобильных и десктопов
            if (isMobile) {
                // На мобильных открываем в нативном приложении карт
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
                    if (window.NBApp) {
                        window.NBApp.showNotification(
                            window.i18n ? window.i18n.t('contact.map.copied') : 'Address copied to clipboard!',
                            'success'
                        );
                    }
                });
            } else {
                // Fallback для старых браузеров
                const textArea = document.createElement('textarea');
                textArea.value = address;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                if (window.NBApp) {
                    window.NBApp.showNotification(
                        window.i18n ? window.i18n.t('contact.map.copied') : 'Address copied to clipboard!',
                        'success'
                    );
                }
            }
        });
    }
}

// ОПТИМИЗИРОВАННЫЙ FAQ АККОРДЕОН
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

// ДОПОЛНИТЕЛЬНЫЕ МОБИЛЬНЫЕ ОПТИМИЗАЦИИ
function setupMobileOptimizations() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Оптимизация ввода для мобильных
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                // Увеличиваем отступ снизу для клавиатуры
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

// АНИМАЦИЯ УСПЕШНОЙ ОТПРАВКИ
function celebrateSubmission() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.style.transform = 'scale(0.98)';
        setTimeout(() => {
            form.style.transform = 'scale(1)';
        }, 150);
    }
}

// ИНИЦИАЛИЗАЦИЯ
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initContact();
    }, 100);
});

window.addEventListener('resize', () => {
    setTimeout(() => {
        if (typeof initContact === 'function') initContact();
    }, 250);
});

if (document.readyState === 'interactive' || document.readyState === 'complete') {
    setTimeout(() => {
        if (typeof initContact === 'function') initContact();
    }, 200);
}

window.initContact = initContact;
