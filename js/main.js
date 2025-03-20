/**
 * EduSync - College Management System
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check if user already has a preference
    const savedTheme = localStorage.getItem('eduSyncTheme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }
    
    // Toggle between light and dark mode
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            
            // Save preference to localStorage
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('eduSyncTheme', 'dark');
            } else {
                localStorage.setItem('eduSyncTheme', 'light');
            }
        });
    }
    
    // Theme toggle scroll behavior
    window.addEventListener('scroll', function() {
        if (themeToggle) {
            if (window.scrollY > 200) {
                themeToggle.classList.add('scrolled');
            } else {
                themeToggle.classList.remove('scrolled');
            }
        }
    });

    // Check if user is logged in when accessing dashboard-only pages
    const currentUrl = window.location.pathname;
    if (currentUrl.includes('dashboard') && !localStorage.getItem('eduSyncUser')) {
        window.location.href = 'login.html';
    }
    
    // Login Buttons Redirection
    const teacherLoginBtn = document.getElementById('teacherLogin');
    const studentLoginBtn = document.getElementById('studentLogin');
    
    if (teacherLoginBtn) {
        teacherLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.setItem('loginTab', 'teacher');
            window.location.href = 'login.html';
        });
    }
    
    if (studentLoginBtn) {
        studentLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.setItem('loginTab', 'student');
            window.location.href = 'login.html';
        });
    }
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
            
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mainNav.classList.contains('active') && 
                !mainNav.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                
                mainNav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                
                const icon = mobileMenuBtn.querySelector('i');
                if (icon.classList.contains('fa-times')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active Navigation State on Scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.main-nav a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Testimonial Slider (Simple Version)
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    
    // Only setup slider if we have multiple testimonials
    if (testimonials.length > 1) {
        // Auto-scroll testimonials every 5 seconds
        setInterval(function() {
            testimonials.forEach((testimonial, index) => {
                testimonial.style.display = index === currentTestimonial ? 'block' : 'none';
            });
            
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        }, 5000);
    }

    // Demo Button Handler
    const demoBtn = document.querySelector('.demo-btn');
    
    if (demoBtn) {
        demoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Demo video would play here in a production environment.');
        });
    }
}); 