/**
 * SubScribe Dashboard - Frontend Script Engine
 * Includes: Theme toggling, validation, sliders, dynamic counters, clock, alerts
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Theme Switcher (Dark/Light Mode)
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;

    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    body.className = savedTheme;

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light-theme');
        }
        
        // Trigger subtle icon animation on switch
        themeToggleBtn.style.transform = 'scale(0.85)';
        setTimeout(() => {
            themeToggleBtn.style.transform = 'none';
        }, 150);
    });

    // ==========================================
    // 2. Navigation & Scroll Indicators
    // ==========================================
    const mainNav = document.getElementById('main-nav');
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const progressBar = document.getElementById('scroll-progress-bar');

    // Mobile Hamburger Toggle
    menuToggleBtn.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('open');
        });
    });

    // Handle Active Link on scroll & Scroll Progress Bar
    window.addEventListener('scroll', () => {
        // Scroll Progress Bar
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';

        // Scrollspy for nav active state
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // accounting for sticky header
            const sectionHeight = section.offsetHeight;
            if (winScroll >= sectionTop && winScroll < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // ==========================================
    // 3. Dynamic Date & Time Widget
    // ==========================================
    const timeDisplay = document.getElementById('current-time');
    
    function updateClock() {
        const now = new Date();
        
        // Options for formatting date
        const options = { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit', 
            hour12: true 
        };
        
        const timeString = now.toLocaleTimeString('en-US', options);
        const dateString = now.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });

        timeDisplay.textContent = `${dateString} | ${timeString}`;
    }
    
    updateClock();
    setInterval(updateClock, 1000);

    // ==========================================
    // 4. Image Slider / Carousel Component
    // ==========================================
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Set auto slide interval (5 seconds)
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }

    // Arrow listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    // Dot navigation listeners
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetAutoSlide();
        });
    });

    // Start carousel
    startAutoSlide();

    // ==========================================
    // 5. Notification Panel Toggle & Mark Read
    // ==========================================
    const notiToggleBtn = document.getElementById('noti-toggle-btn');
    const notiCloseBtn = document.getElementById('noti-close-btn');
    const notiPanel = document.getElementById('noti-panel');
    const notiBadge = document.getElementById('noti-badge');

    notiToggleBtn.addEventListener('click', () => {
        notiPanel.classList.add('open');
    });

    notiCloseBtn.addEventListener('click', () => {
        notiPanel.classList.remove('open');
    });

    // Clicking outside closes the drawer
    document.addEventListener('click', (e) => {
        if (!notiPanel.contains(e.target) && !notiToggleBtn.contains(e.target)) {
            notiPanel.classList.remove('open');
        }
    });

    // Expose notifications clearing to global scope
    window.clearNotifications = () => {
        const unreadItems = document.querySelectorAll('.noti-item.warning-unread');
        unreadItems.forEach(item => {
            item.classList.remove('warning-unread');
            item.classList.add('info-read');
        });
        
        notiBadge.textContent = '0';
        notiBadge.classList.add('hide');
        
        // Update stats card for notifications
        const notificationStat = document.getElementById('stat-notifications');
        if (notificationStat) {
            animateSingleNumber(notificationStat, parseInt(notificationStat.textContent), 0, 800);
        }
    };

    // ==========================================
    // 6. Dynamic Statistics Counters
    // ==========================================
    const statTargets = {
        'stat-total': 14,
        'stat-active': 12,
        'stat-spend': 920,
        'stat-transactions': 48,
        'stat-notifications': 3,
        'stat-tasks': 5
    };

    // Smooth counting animation function
    function animateSingleNumber(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Trigger counters animation when Stats Grid enters viewport
    const statsGrid = document.querySelector('.stats-grid');
    let countersAnimated = false;

    const observerOptions = {
        root: null,
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                Object.keys(statTargets).forEach(id => {
                    const el = document.getElementById(id);
                    if (el) {
                        animateSingleNumber(el, 0, statTargets[id], 1500);
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (statsGrid) {
        observer.observe(statsGrid);
    }

    // ==========================================
    // 7. Scroll-to-Top Button
    // ==========================================
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==========================================
    // 8. Form Validation Suite
    // ==========================================
    const form = document.getElementById('registration-form');
    const formAlert = document.getElementById('form-alert-message');
    const formResetBtn = document.getElementById('form-reset-btn');

    // Fields
    const fields = {
        name: {
            el: document.getElementById('reg-name'),
            error: document.getElementById('name-error'),
            validate: (val) => val.trim().length >= 3 ? '' : 'Name must be at least 3 characters long.'
        },
        email: {
            el: document.getElementById('reg-email'),
            error: document.getElementById('email-error'),
            validate: (val) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(val) ? '' : 'Please enter a valid email address.';
            }
        },
        phone: {
            el: document.getElementById('reg-phone'),
            error: document.getElementById('phone-error'),
            validate: (val) => {
                const phoneRegex = /^[0-9]{10}$/;
                return phoneRegex.test(val) ? '' : 'Phone number must be exactly 10 digits.';
            }
        },
        password: {
            el: document.getElementById('reg-password'),
            error: document.getElementById('password-error'),
            validate: (val) => val.length >= 8 ? '' : 'Password must be at least 8 characters long.'
        },
        dob: {
            el: document.getElementById('reg-dob'),
            error: document.getElementById('dob-error'),
            validate: (val) => {
                if (!val) return 'Date of Birth is required.';
                const dobDate = new Date(val);
                const today = new Date();
                if (dobDate > today) return 'Date of Birth cannot be in the future.';
                
                // Optional 18+ check:
                let age = today.getFullYear() - dobDate.getFullYear();
                const monthDiff = today.getMonth() - dobDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
                    age--;
                }
                return age >= 18 ? '' : 'You must be at least 18 years old to join premium.';
            }
        },
        address: {
            el: document.getElementById('reg-address'),
            error: document.getElementById('address-error'),
            validate: (val) => val.trim().length >= 10 ? '' : 'Address must be at least 10 characters long.'
        }
    };

    // Generic show validation error
    function validateField(fieldKey) {
        const field = fields[fieldKey];
        const errorMessage = field.validate(field.el.value);
        const groupEl = field.el.parentElement;
        
        if (errorMessage) {
            groupEl.classList.add('invalid');
            field.error.textContent = errorMessage;
            return false;
        } else {
            groupEl.classList.remove('invalid');
            field.error.textContent = '';
            return true;
        }
    }

    // Bind real-time inputs
    Object.keys(fields).forEach(key => {
        fields[key].el.addEventListener('input', () => {
            validateField(key);
        });
    });

    // Form Submit handling
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isFormValid = true;
        
        // Validate all fields
        Object.keys(fields).forEach(key => {
            const isValid = validateField(key);
            if (!isValid) isFormValid = false;
        });

        formAlert.classList.remove('success', 'danger');
        formAlert.classList.add('hide');

        if (isFormValid) {
            // Simulated submission success
            formAlert.textContent = '🎉 Registration Successful! Welcome to SubScribe Premium.';
            formAlert.classList.remove('hide');
            formAlert.classList.add('success');
            
            // Increment Stats - Total, Active, Spend
            statTargets['stat-total']++;
            statTargets['stat-active']++;
            statTargets['stat-spend'] += 45; // Simulated premium fee
            
            // Re-animate stats elements to show new counts
            const totalEl = document.getElementById('stat-total');
            const activeEl = document.getElementById('stat-active');
            const spendEl = document.getElementById('stat-spend');
            
            if (totalEl) animateSingleNumber(totalEl, parseInt(totalEl.textContent), statTargets['stat-total'], 800);
            if (activeEl) animateSingleNumber(activeEl, parseInt(activeEl.textContent), statTargets['stat-active'], 800);
            if (spendEl) animateSingleNumber(spendEl, parseInt(spendEl.textContent), statTargets['stat-spend'], 800);

            // Reset form fields after 2 seconds
            setTimeout(() => {
                form.reset();
                formAlert.classList.add('hide');
            }, 5000);
        } else {
            formAlert.textContent = '❌ Please correct the errors in the registration form below.';
            formAlert.classList.remove('hide');
            formAlert.classList.add('danger');
        }
    });

    // Reset error styling on click
    formResetBtn.addEventListener('click', () => {
        Object.keys(fields).forEach(key => {
            fields[key].el.parentElement.classList.remove('invalid');
            fields[key].error.textContent = '';
        });
        formAlert.classList.add('hide');
    });

});

// ==========================================
// 9. Extra Interactive Triggers (Logout / Actions)
// ==========================================
function triggerLogout() {
    const confirmation = confirm("Are you sure you want to sign out of SubScribe Dashboard?");
    if (confirmation) {
        alert("You have logged out successfully. Mock redirecting to Login...");
        window.location.reload();
    }
}
