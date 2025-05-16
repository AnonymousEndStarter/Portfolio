// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Navigation active state
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Mobile navigation toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    // Sticky header on scroll
    const header = document.querySelector('header');
    let scrollPos = window.scrollY;

    window.addEventListener('scroll', function() {
        scrollPos = window.scrollY;

        if (scrollPos > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Update active nav link on scroll
        updateActiveLink();

        // Reveal animations on scroll
        revealElements();
    });

    // Typing animation for hero section
    if (document.getElementById('job-titles')) {
        const options = {
            strings: ['Web Developer', 'Frontend Engineer', 'UI/UX Designer', 'Full Stack Developer'],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 1500,
            loop: true
        };
        
        new Typed('#job-titles', options);
    }

    // Typing animation for logo
    if (document.getElementById('logo-text')) {
        const logoOptions = {
            strings: ['Developer', 'Designer', 'Creator'],
            typeSpeed: 100,
            backSpeed: 60,
            backDelay: 2000,
            loop: true
        };
        
        new Typed('#logo-text', logoOptions);
    }

    // Function to update active navigation link based on scroll position
    function updateActiveLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }

    // Reveal elements on scroll
    function revealElements() {
        const reveals = document.querySelectorAll('.reveal-element, .reveal-left, .reveal-right');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    // Initial call for reveal elements
    revealElements();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form input animation
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.setAttribute('placeholder', ' ');
        
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message (in a real application, you would handle form submission here)
            const formData = new FormData(contactForm);
            let formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            console.log('Form submitted with values:', formValues);
            
            // Reset form after submission
            contactForm.reset();
            
            // Show success message (this would be implemented differently in a real app)
            alert('Message sent successfully! I will get back to you soon.');
        });
    }

    // Project filter functionality (can be expanded)
    const projectCards = document.querySelectorAll('.project-card');
    
    // Add animation to project cards on hover
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    });

    // Initialize any additional animations or effects
    initializeParticles();
});

// Function to initialize particles effect in background (simplified version)
function initializeParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-background';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Create particles
    const particlesArray = [];
    const numberOfParticles = 100;
    
    for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 5 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speedX = Math.random() * 1 - 0.5;
        const speedY = Math.random() * 1 - 0.5;
        const opacity = Math.random() * 0.5 + 0.1;
        
        particlesArray.push({
            x,
            y,
            size,
            speedX,
            speedY,
            opacity
        });
    }
    
    // Animation function
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            const p = particlesArray[i];
            
            ctx.fillStyle = `rgba(100, 255, 218, ${p.opacity})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Check boundaries
            if (p.x < 0 || p.x > canvas.width) {
                p.speedX = -p.speedX;
            }
            
            if (p.y < 0 || p.y > canvas.height) {
                p.speedY = -p.speedY;
            }
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    // Start animation
    animateParticles();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}