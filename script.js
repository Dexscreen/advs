// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        lastScrollY = window.scrollY;
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.animate-fade-in-up').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Onboarding Form Functions
function showInvestorForm() {
    document.getElementById('investorForm').style.display = 'block';
    document.getElementById('advisorForm').style.display = 'none';
    document.querySelector('.path-selection').style.display = 'none';
    
    // Scroll to form
    document.getElementById('investorForm').scrollIntoView({
        behavior: 'smooth'
    });
}

function showAdvisorForm() {
    document.getElementById('advisorForm').style.display = 'block';
    document.getElementById('investorForm').style.display = 'none';
    document.querySelector('.path-selection').style.display = 'none';
    
    // Scroll to form
    document.getElementById('advisorForm').scrollIntoView({
        behavior: 'smooth'
    });
}

// Multi-step form functionality
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('.multi-step-form');
    
    forms.forEach(form => {
        const steps = form.querySelectorAll('.form-step');
        const nextButtons = form.querySelectorAll('.next-step');
        const prevButtons = form.querySelectorAll('.prev-step');
        let currentStep = 0;

        function showStep(stepIndex) {
            steps.forEach((step, index) => {
                step.classList.toggle('active', index === stepIndex);
            });
        }

        nextButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (validateCurrentStep(form, currentStep)) {
                    currentStep++;
                    if (currentStep < steps.length) {
                        showStep(currentStep);
                    }
                }
            });
        });

        prevButtons.forEach(button => {
            button.addEventListener('click', function() {
                currentStep--;
                if (currentStep >= 0) {
                    showStep(currentStep);
                }
            });
        });

        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateCurrentStep(form, currentStep)) {
                submitForm(form);
            }
        });
    });
});

function validateCurrentStep(form, stepIndex) {
    const currentStep = form.querySelectorAll('.form-step')[stepIndex];
    const requiredFields = currentStep.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = 'var(--error-color)';
            isValid = false;
        } else {
            field.style.borderColor = 'var(--gray-300)';
        }
    });

    // Special validation for checkboxes in step 2
    if (stepIndex === 1) {
        const checkboxes = currentStep.querySelectorAll('input[type="checkbox"]:checked');
        if (checkboxes.length === 0) {
            alert('Please select at least one financial goal.');
            isValid = false;
        }
    }

    return isValid;
}

function submitForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Collect multiple checkbox values
    const goals = formData.getAll('goals');
    const specializations = formData.getAll('specializations');
    const credentials = formData.getAll('credentials');
    
    if (goals.length > 0) data.goals = goals;
    if (specializations.length > 0) data.specializations = specializations;
    if (credentials.length > 0) data.credentials = credentials;

    // Show success message
    showSuccessMessage(form);
    
    // Here you would typically send the data to your server
    console.log('Form submitted:', data);
}

function showSuccessMessage(form) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="background: var(--success-color); color: white; padding: 2rem; border-radius: var(--border-radius-lg); text-align: center; margin-top: 2rem;">
            <h3>Thank You!</h3>
            <p>Your information has been submitted successfully. We'll be in touch within 24 hours.</p>
        </div>
    `;
    
    form.style.display = 'none';
    form.parentNode.appendChild(successMessage);
}

// Tab functionality for digital investments
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

// Crypto ticker animation
document.addEventListener('DOMContentLoaded', function() {
    const tickerItems = document.querySelectorAll('.ticker-item');
    
    if (tickerItems.length > 0) {
        setInterval(() => {
            tickerItems.forEach(item => {
                const priceElement = item.querySelector('.crypto-price');
                const changeElement = item.querySelector('.crypto-change');
                
                if (priceElement && changeElement) {
                    // Simulate price changes
                    const currentPrice = parseFloat(priceElement.textContent.replace('$', '').replace(',', ''));
                    const change = (Math.random() - 0.5) * 0.02; // ±1% change
                    const newPrice = currentPrice * (1 + change);
                    const changePercent = (change * 100).toFixed(1);
                    
                    priceElement.textContent = `$${newPrice.toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    })}`;
                    
                    changeElement.textContent = `${change >= 0 ? '+' : ''}${changePercent}%`;
                    changeElement.className = `crypto-change ${change >= 0 ? 'positive' : 'negative'}`;
                }
            });
        }, 5000); // Update every 5 seconds
    }
});

// Newsletter subscription
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Show success message
                const successDiv = document.createElement('div');
                successDiv.innerHTML = '<p style="color: var(--success-color); font-weight: 600; margin-top: 1rem;">Thank you for subscribing!</p>';
                this.appendChild(successDiv);
                
                // Reset form
                this.querySelector('input[type="email"]').value = '';
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successDiv.remove();
                }, 3000);
            }
        });
    });
});

// Contact form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'var(--error-color)';
                    isValid = false;
                } else {
                    field.style.borderColor = 'var(--gray-300)';
                }
            });
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.innerHTML = `
                    <div style="background: var(--success-color); color: white; padding: 2rem; border-radius: var(--border-radius-lg); text-align: center; margin-top: 2rem;">
                        <h3>Message Sent!</h3>
                        <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
                    </div>
                `;
                
                this.style.display = 'none';
                this.parentNode.appendChild(successMessage);
            }
        });
    }
});

// Live chat function
function openChat() {
    alert('Live chat feature would be integrated here with your preferred chat service (e.g., Intercom, Zendesk, etc.)');
}

// Performance optimization: Lazy load images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Add loading states for forms
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Enhanced form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Add real-time validation
document.addEventListener('DOMContentLoaded', function() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = 'var(--error-color)';
                showFieldError(this, 'Please enter a valid email address');
            } else {
                this.style.borderColor = 'var(--gray-300)';
                hideFieldError(this);
            }
        });
    });
    
    phoneInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validatePhone(this.value)) {
                this.style.borderColor = 'var(--error-color)';
                showFieldError(this, 'Please enter a valid phone number');
            } else {
                this.style.borderColor = 'var(--gray-300)';
                hideFieldError(this);
            }
        });
    });
});

function showFieldError(field, message) {
    hideFieldError(field); // Remove existing error
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = 'var(--error-color)';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function hideFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}