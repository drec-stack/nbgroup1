// Contact page specific JavaScript
function initContact() {
    setupContactForm();
    setupContactInteractions();
    setupMapInteraction();
    setupFAQAccordion();
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
                        window.i18n ? window.i18n.t('contact.form.success') : 'Message sent successfully! We\'ll get back to you soon.', 
                        'success'
                    );
                }
                
                // Reset form
                contactForm.reset();
                
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Form validation enhancements
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
            
            // Real-time validation
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
    
    // Required field validation
    if (field.hasAttribute('required') && value) {
        formGroup.classList.add('valid');
    }
}

function setupContactInteractions() {
    const contactMethods = document.querySelectorAll('.contact-method');
    const socialLinks = document.querySelectorAll('.social-link');
    
    // Contact method interactions
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', () => {
            const icon = method.querySelector('.method-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        method.addEventListener('mouseleave', () => {
            const icon = method.querySelector('.method-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Social link interactions
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const icon = link.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateY(-2px)';
            }
        });
        
        link.addEventListener('mouseleave', () => {
            const icon = link.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateY(0)';
            }
        });
    });
}

function setupMapInteraction() {
    const mapBtn = document.getElementById('openMapBtn');
    
    if (mapBtn) {
        mapBtn.addEventListener('click', () => {
            // Open Google Maps with studio location
            window.open('https://maps.google.com/?q=123+Design+Street+Moscow+Russia+101000', '_blank');
        });
    }
}

// FAQ accordion functionality
function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h4');
        
        if (question) {
            question.style.cursor = 'pointer';
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all items
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                    const answer = faq.querySelector('p');
                    if (answer) {
                        answer.style.maxHeight = '0';
                        answer.style.opacity = '0';
                    }
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    const answer = item.querySelector('p');
                    if (answer) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        answer.style.opacity = '1';
                    }
                }
            });
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initContact();
});

// Export for global access
window.initContact = initContact;