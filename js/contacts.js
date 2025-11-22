// Contact page specific JavaScript
function initContact() {
    setupContactForm();
    setupContactInteractions();
    setupMapInteraction();
    setupFAQAccordion();
    setupContactCards();
}

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (window.i18n ? window.i18n.t('contact.form.sending') : 'Sending...');
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                if (window.NBApp) {
                    window.NBApp.showNotification(
                        window.i18n ? window.i18n.t('contact.form.success') : 'Message sent successfully! We\'ll get back to you within 24 hours.', 
                        'success'
                    );
                }
                
                // Reset form
                contactForm.reset();
                
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Add celebration effect
                celebrateSubmission();
            }, 2000);
        });
    }
    
    // Enhanced form validation
    const formInputs = contactForm?.querySelectorAll('input, select, textarea');
    if (formInputs) {
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
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

function validateField(field) {
    const value = field.value.trim();
    const formGroup = field.parentElement;
    
    // Clear previous validation states
    formGroup.classList.remove('valid', 'invalid');
    
    if (!value && field.hasAttribute('required')) {
        formGroup.classList.add('invalid');
        return;
    }
    
    if (!value) return;
    
    // Email validation
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) {
            formGroup.classList.add('valid');
        } else {
            formGroup.classList.add('invalid');
        }
        return;
    }
    
    // Phone validation
    if (field.type === 'tel') {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
        if (phoneRegex.test(value)) {
            formGroup.classList.add('valid');
        } else {
            formGroup.classList.add('invalid');
        }
        return;
    }
    
    // Required field validation
    if (field.hasAttribute('required') && value) {
        formGroup.classList.add('valid');
    }
}

function setupContactCards() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
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
    });
}

function setupContactInteractions() {
    const socialCards = document.querySelectorAll('.social-card');
    
    socialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.social-icon');
            const arrow = card.querySelector('.social-arrow');
            
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
            if (arrow) {
                arrow.style.transform = 'translateX(5px)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.social-icon');
            const arrow = card.querySelector('.social-arrow');
            
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
            if (arrow) {
                arrow.style.transform = 'translateX(0)';
            }
        });
    });
}

function setupMapInteraction() {
    const mapBtn = document.getElementById('openMapBtn');
    const copyBtn = document.getElementById('copyAddressBtn');
    
    if (mapBtn) {
        mapBtn.addEventListener('click', () => {
            window.open('https://maps.google.com/?q=Moscow+City+Tower+45+Presnenskaya+Naberezhnaya+123+Moscow+Russia+123112', '_blank');
        });
    }
    
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const address = 'Moscow City, Tower 45, Presnenskaya Naberezhnaya, 123, Moscow, Russia 123112';
            navigator.clipboard.writeText(address).then(() => {
                if (window.NBApp) {
                    window.NBApp.showNotification(
                        window.i18n ? window.i18n.t('contact.map.copied') : 'Address copied to clipboard!',
                        'success'
                    );
                }
            });
        });
    }
}

function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all items
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                    const answer = faq.querySelector('.faq-answer');
                    if (answer) {
                        answer.style.maxHeight = '0';
                    }
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    const answer = item.querySelector('.faq-answer');
                    if (answer) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    }
                }
            });
        }
    });
}

function celebrateSubmission() {
    // Add a subtle celebration effect
    const form = document.getElementById('contactForm');
    if (form) {
        form.style.transform = 'scale(0.98)';
        setTimeout(() => {
            form.style.transform = 'scale(1)';
        }, 150);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initContact();
});

// Export for global access
window.initContact = initContact;
