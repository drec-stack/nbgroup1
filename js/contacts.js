// contacts.js - Инициализация страницы контактов с ОБЩИМ хедером

console.log('🚀 Contact page with clean header initialized');

// Основная функция инициализации страницы
function initContact() {
    console.log('🎯 Initializing contact page with clean header...');
    
    setupContactForm();
    setupContactInteractions();
    setupMapInteraction();
    setupFAQAccordion();
    setupContactCards();
    
    // Удаляем LinkedIn и Behance из страницы контактов
    removeLinkedInBehance();
    
    console.log('✅ Contact page initialized successfully (clean header)');
}

// Удаление LinkedIn и Behance элементов
function removeLinkedInBehance() {
    // Удаляем LinkedIn и Behance карточки из социальной сетки
    const linkedinCards = document.querySelectorAll('.social-card.linkedin, .social-card.behance');
    linkedinCards.forEach(card => {
        if (card.parentNode) {
            card.parentNode.removeChild(card);
        }
    });
    
    // Удаляем LinkedIn и Behance из текста если есть
    const socialDescriptions = document.querySelectorAll('.social-section p');
    socialDescriptions.forEach(desc => {
        if (desc.textContent.includes('LinkedIn') || desc.textContent.includes('Behance')) {
            desc.textContent = 'Follow us on Telegram, Instagram and WhatsApp for updates and news.';
        }
    });
    
    console.log('🗑️ Removed LinkedIn and Behance elements');
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
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
            submitBtn.disabled = true;
            
            // Симуляция отправки
            setTimeout(() => {
                // Уведомление об успехе
                showNotification('Сообщение успешно отправлено! Мы свяжемся с вами в течение 24 часов.', 'success');
                
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
        
        // Валидация в реальном времени
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });
            
            input.addEventListener('input', () => {
                validateField(input);
                clearFieldError(input);
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
            showFieldError(field);
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const formGroup = field.parentElement;
    
    // Сначала очищаем предыдущие состояния
    formGroup.classList.remove('valid', 'invalid');
    
    if (field.hasAttribute('required') && !value) {
        formGroup.classList.add('invalid');
        return false;
    }
    
    if (!value) return true;
    
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            formGroup.classList.add('invalid');
            return false;
        }
    }
    
    if (field.type === 'tel') {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
        if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
            formGroup.classList.add('invalid');
            return false;
        }
    }
    
    // Если все проверки пройдены
    formGroup.classList.add('valid');
    return true;
}

function showFieldError(field) {
    const formGroup = field.parentElement;
    formGroup.classList.add('invalid');
    
    // Анимация ошибки
    formGroup.style.animation = 'none';
    setTimeout(() => {
        formGroup.style.animation = 'shake 0.5s ease';
    }, 10);
}

function clearFieldError(field) {
    const formGroup = field.parentElement;
    if (field.value.trim()) {
        formGroup.classList.remove('invalid');
    }
}

function resetFormValidation(form) {
    const formGroups = form.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('valid', 'invalid');
        group.style.animation = '';
    });
}

// Анимация ошибки формы
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
        // Клик для мобильных
        if (isMobile) {
            card.addEventListener('click', function(e) {
                // Не применяем к кликам по ссылкам
                if (e.target.tagName === 'A' || e.target.closest('a')) {
                    return;
                }
                
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        }
    });
}

// Настройка взаимодействий
function setupContactInteractions() {
    const socialCards = document.querySelectorAll('.social-card');
    const isMobile = window.innerWidth <= 768;
    
    // Touch feedback для мобильных
    if (isMobile) {
        socialCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }
}

// Настройка карты
function setupMapInteraction() {
    const mapBtn = document.getElementById('openMapBtn');
    const copyBtn = document.getElementById('copyAddressBtn');
    
    if (mapBtn) {
        mapBtn.addEventListener('click', () => {
            const address = 'Moscow City, Tower 45, Presnenskaya Naberezhnaya, 123, Moscow, Russia 123112';
            window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
        });
    }
    
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const address = 'Moscow City, Tower 45, Presnenskaya Naberezhnaya, 123, Moscow, Russia 123112';
            
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(address).then(() => {
                    showNotification('Адрес скопирован в буфер обмена!', 'success');
                });
            } else {
                // Fallback для старых браузеров
                const textArea = document.createElement('textarea');
                textArea.value = address;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                showNotification('Адрес скопирован в буфер обмена!', 'success');
            }
        });
    }
}

// Настройка FAQ аккордеона
function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Закрываем все остальные
                faqItems.forEach(faq => {
                    if (faq !== item) {
                        faq.classList.remove('active');
                        const answer = faq.querySelector('.faq-answer');
                        if (answer) {
                            answer.style.maxHeight = '0';
                        }
                    }
                });
                
                // Открываем/закрываем текущий
                if (!isActive) {
                    item.classList.add('active');
                    const answer = item.querySelector('.faq-answer');
                    if (answer) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    }
                } else {
                    item.classList.remove('active');
                    const answer = item.querySelector('.faq-answer');
                    if (answer) {
                        answer.style.maxHeight = '0';
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
        // Анимация пульсации
        form.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            form.style.animation = '';
        }, 500);
    }
}

// Функция показа уведомлений
function showNotification(message, type = 'info') {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Стили для уведомления
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
    
    // Анимация появления
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Автоматическое скрытие через 5 секунд
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 5000);
    
    // Добавляем CSS анимацию shake если её нет
    if (!document.querySelector('#shake-animation')) {
        const style = document.createElement('style');
        style.id = 'shake-animation';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(0.98); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 Contact page DOM loaded');
    
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

console.log('✅ contacts.js loaded successfully (UPDATED VERSION with WhatsApp)');
