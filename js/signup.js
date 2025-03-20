/**
 * EduSync - College Management System
 * Signup JavaScript File
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

    // Check stored signup tab preference (if coming from index.html)
    const storedTab = localStorage.getItem('signupTab');
    if (storedTab) {
        // Set the active tab based on stored preference
        document.querySelectorAll('.tab-btn').forEach(btn => {
            if (btn.getAttribute('data-tab') === storedTab) {
                btn.click(); // Trigger the click event to activate the tab
            }
        });
        
        // Clear the stored preference after using it
        localStorage.removeItem('signupTab');
    }
    
    // Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const signupForms = document.querySelectorAll('.login-form');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            
            // Update tab buttons
            tabBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Show appropriate form
            signupForms.forEach(form => {
                if (form.id === tab + 'SignupForm') {
                    form.classList.add('active');
                } else {
                    form.classList.remove('active');
                }
            });
        });
    });
    
    // Toggle Password Visibility
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const passwordField = this.previousElementSibling;
            
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                passwordField.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });
    
    // Form Validation Helpers
    const validators = {
        email: (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        },
        password: (value) => {
            // At least 8 characters, 1 letter, 1 number, 1 special character
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            return passwordRegex.test(value);
        },
        mobile: (value) => {
            // 10 digits mobile number
            const mobileRegex = /^\d{10}$/;
            return mobileRegex.test(value);
        },
        required: (value) => {
            return value.trim() !== '';
        },
        confirmPassword: (value, compareValue) => {
            return value === compareValue;
        }
    };
    
    // Show validation error
    const showError = (element, message) => {
        const inputField = element.closest('.input-field');
        let errorElement = inputField.querySelector('.validation-error');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'validation-error';
            errorElement.style.color = '#e74a3b';
            errorElement.style.fontSize = '12px';
            errorElement.style.marginTop = '5px';
            inputField.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        element.style.borderColor = '#e74a3b';
    };
    
    // Clear validation error
    const clearError = (element) => {
        const inputField = element.closest('.input-field');
        const errorElement = inputField.querySelector('.validation-error');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        element.style.borderColor = '';
    };
    
    // Teacher Signup Form Validation & Submission
    const teacherSignupForm = document.getElementById('teacherSignupForm');
    
    if (teacherSignupForm) {
        const teacherFullName = document.getElementById('teacherFullName');
        const teacherEmail = document.getElementById('teacherEmail');
        const teacherDepartment = document.getElementById('teacherDepartment');
        const teacherMobile = document.getElementById('teacherMobile');
        const teacherPassword = document.getElementById('teacherPassword');
        const teacherConfirmPassword = document.getElementById('teacherConfirmPassword');
        const teacherTerms = document.getElementById('teacherTerms');
        
        // Validate inputs on blur
        teacherEmail.addEventListener('blur', function() {
            if (!validators.email(this.value)) {
                showError(this, 'Please enter a valid email address');
            } else {
                clearError(this);
            }
        });
        
        teacherPassword.addEventListener('blur', function() {
            if (!validators.password(this.value)) {
                showError(this, 'Password must be at least 8 characters with letters, numbers & symbols');
            } else {
                clearError(this);
            }
        });
        
        teacherConfirmPassword.addEventListener('blur', function() {
            if (!validators.confirmPassword(this.value, teacherPassword.value)) {
                showError(this, 'Passwords do not match');
            } else {
                clearError(this);
            }
        });
        
        teacherMobile.addEventListener('blur', function() {
            if (!validators.mobile(this.value)) {
                showError(this, 'Please enter a valid 10-digit mobile number');
            } else {
                clearError(this);
            }
        });
        
        // Form submission
        teacherSignupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Validate all fields
            if (!validators.required(teacherFullName.value)) {
                showError(teacherFullName, 'Full name is required');
                isValid = false;
            }
            
            if (!validators.email(teacherEmail.value)) {
                showError(teacherEmail, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (teacherDepartment.value === '') {
                showError(teacherDepartment, 'Please select your department');
                isValid = false;
            }
            
            if (!validators.mobile(teacherMobile.value)) {
                showError(teacherMobile, 'Please enter a valid 10-digit mobile number');
                isValid = false;
            }
            
            if (!validators.password(teacherPassword.value)) {
                showError(teacherPassword, 'Password must be at least 8 characters with letters, numbers & symbols');
                isValid = false;
            }
            
            if (!validators.confirmPassword(teacherConfirmPassword.value, teacherPassword.value)) {
                showError(teacherConfirmPassword, 'Passwords do not match');
                isValid = false;
            }
            
            if (!teacherTerms.checked) {
                alert('Please agree to the Terms & Conditions');
                isValid = false;
            }
            
            if (isValid) {
                // In a real application, this would send data to a server
                // For demo purposes, store in local storage
                
                // Format email for consistent structure (@teacher.edusync.com)
                let email = teacherEmail.value;
                if (!email.endsWith('@teacher.edusync.com')) {
                    // Extract the username part before @ if an email was entered
                    let username = email.includes('@') ? email.split('@')[0] : email;
                    email = username + '@teacher.edusync.com';
                }
                
                // Store the user data
                const userData = {
                    name: teacherFullName.value,
                    email: email,
                    role: 'teacher',
                    department: teacherDepartment.value,
                    mobile: teacherMobile.value,
                    // In a real app, never store passwords in plain text
                    hashedPassword: teacherPassword.value // demo only
                };
                
                // Get existing users or create new array
                let existingUsers = JSON.parse(localStorage.getItem('eduSyncUsers')) || [];
                
                // Check if user already exists
                const userExists = existingUsers.some(user => user.email === email);
                
                if (userExists) {
                    alert('An account with this email already exists. Please login instead.');
                } else {
                    // Add user to array and store
                    existingUsers.push(userData);
                    localStorage.setItem('eduSyncUsers', JSON.stringify(existingUsers));
                    
                    // Show success message and redirect
                    alert('Account created successfully! You can now login.');
                    window.location.href = 'login.html';
                }
            }
        });
    }
    
    // Student Signup Form Validation & Submission
    const studentSignupForm = document.getElementById('studentSignupForm');
    
    if (studentSignupForm) {
        const studentFullName = document.getElementById('studentFullName');
        const studentEmail = document.getElementById('studentEmail');
        const studentDepartment = document.getElementById('studentDepartment');
        const studentSemester = document.getElementById('studentSemester');
        const studentRollNo = document.getElementById('studentRollNo');
        const studentMobile = document.getElementById('studentMobile');
        const studentPassword = document.getElementById('studentPassword');
        const studentConfirmPassword = document.getElementById('studentConfirmPassword');
        const studentTerms = document.getElementById('studentTerms');
        
        // Validate inputs on blur (similar to teacher form)
        studentEmail.addEventListener('blur', function() {
            if (!validators.email(this.value)) {
                showError(this, 'Please enter a valid email address');
            } else {
                clearError(this);
            }
        });
        
        studentPassword.addEventListener('blur', function() {
            if (!validators.password(this.value)) {
                showError(this, 'Password must be at least 8 characters with letters, numbers & symbols');
            } else {
                clearError(this);
            }
        });
        
        studentConfirmPassword.addEventListener('blur', function() {
            if (!validators.confirmPassword(this.value, studentPassword.value)) {
                showError(this, 'Passwords do not match');
            } else {
                clearError(this);
            }
        });
        
        studentMobile.addEventListener('blur', function() {
            if (!validators.mobile(this.value)) {
                showError(this, 'Please enter a valid 10-digit mobile number');
            } else {
                clearError(this);
            }
        });
        
        // Form submission
        studentSignupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Validate all fields
            if (!validators.required(studentFullName.value)) {
                showError(studentFullName, 'Full name is required');
                isValid = false;
            }
            
            if (!validators.email(studentEmail.value)) {
                showError(studentEmail, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (studentDepartment.value === '') {
                showError(studentDepartment, 'Please select your department');
                isValid = false;
            }
            
            if (studentSemester.value === '') {
                showError(studentSemester, 'Please select your semester');
                isValid = false;
            }
            
            if (!validators.required(studentRollNo.value)) {
                showError(studentRollNo, 'Roll number is required');
                isValid = false;
            }
            
            if (!validators.mobile(studentMobile.value)) {
                showError(studentMobile, 'Please enter a valid 10-digit mobile number');
                isValid = false;
            }
            
            if (!validators.password(studentPassword.value)) {
                showError(studentPassword, 'Password must be at least 8 characters with letters, numbers & symbols');
                isValid = false;
            }
            
            if (!validators.confirmPassword(studentConfirmPassword.value, studentPassword.value)) {
                showError(studentConfirmPassword, 'Passwords do not match');
                isValid = false;
            }
            
            if (!studentTerms.checked) {
                alert('Please agree to the Terms & Conditions');
                isValid = false;
            }
            
            if (isValid) {
                // Format email for consistent structure (@student.edusync.com)
                let email = studentEmail.value;
                if (!email.endsWith('@student.edusync.com')) {
                    // Extract the username part before @ if an email was entered
                    let username = email.includes('@') ? email.split('@')[0] : email;
                    email = username + '@student.edusync.com';
                }
                
                // Store the user data
                const userData = {
                    name: studentFullName.value,
                    email: email,
                    role: 'student',
                    department: studentDepartment.value,
                    semester: studentSemester.value,
                    rollNo: studentRollNo.value,
                    mobile: studentMobile.value,
                    // In a real app, never store passwords in plain text
                    hashedPassword: studentPassword.value // demo only
                };
                
                // Get existing users or create new array
                let existingUsers = JSON.parse(localStorage.getItem('eduSyncUsers')) || [];
                
                // Check if user already exists
                const userExists = existingUsers.some(user => user.email === email);
                
                if (userExists) {
                    alert('An account with this email already exists. Please login instead.');
                } else {
                    // Add user to array and store
                    existingUsers.push(userData);
                    localStorage.setItem('eduSyncUsers', JSON.stringify(existingUsers));
                    
                    // Show success message and redirect
                    alert('Account created successfully! You can now login.');
                    window.location.href = 'login.html';
                }
            }
        });
    }
}); 