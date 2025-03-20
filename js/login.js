/**
 * EduSync - College Management System
 * Login JavaScript File
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

    // Check stored login tab preference (if coming from index.html)
    const storedTab = localStorage.getItem('loginTab');
    if (storedTab) {
        // Set the active tab based on stored preference
        document.querySelectorAll('.tab-btn').forEach(btn => {
            if (btn.getAttribute('data-tab') === storedTab) {
                btn.click(); // Trigger the click event to activate the tab
            }
        });
        
        // Clear the stored preference after using it
        localStorage.removeItem('loginTab');
    }
    
    // Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const loginForms = document.querySelectorAll('.login-form');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            
            // Update tab buttons
            tabBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Show appropriate form
            loginForms.forEach(form => {
                if (form.id === tab + 'LoginForm') {
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
    
    // Form Submission (Teacher)
    const teacherLoginForm = document.getElementById('teacherLoginForm');
    
    if (teacherLoginForm) {
        teacherLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('teacherEmail').value;
            const password = document.getElementById('teacherPassword').value;
            
            // Get registered users
            const registeredUsers = JSON.parse(localStorage.getItem('eduSyncUsers')) || [];
            
            // Always check default credentials first
            if (email === 'studentx@edusync.com' && password === 'studentx@123') {
                alert('Please use student login for these credentials.');
                return;
            }
            
            // Demo login - in a real app, this would verify with a server
            if (email === 'rajesh.sharma@edusync.com' && password === 'teacher123') {
                // Set user data in local storage
                localStorage.setItem('eduSyncUser', JSON.stringify({
                    name: 'Rajesh Sharma',
                    role: 'teacher',
                    department: 'Computer Science',
                    email: email
                }));
                
                // Redirect to teacher dashboard
                window.location.href = 'teacher-dashboard.html';
            } 
            // Check if the user is in registered users
            else {
                // Find user in registered users
                const foundUser = registeredUsers.find(user => 
                    user.email === email && 
                    user.hashedPassword === password && 
                    user.role === 'teacher'
                );
                
                if (foundUser) {
                    // Set user data in local storage
                    localStorage.setItem('eduSyncUser', JSON.stringify({
                        name: foundUser.name,
                        role: foundUser.role,
                        department: foundUser.department,
                        email: foundUser.email
                    }));
                    
                    // Redirect to teacher dashboard
                    window.location.href = 'teacher-dashboard.html';
                }
                // Demo purposes - also allow any email with @teacher.edusync.com
                else if (email.endsWith('@teacher.edusync.com') && password.length > 5) {
                    // Extract name from email
                    let name = email.split('@')[0].replace(/\./g, ' ');
                    // Capitalize each word
                    name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                    
                    localStorage.setItem('eduSyncUser', JSON.stringify({
                        name: name,
                        role: 'teacher',
                        department: 'Faculty',
                        email: email
                    }));
                    
                    window.location.href = 'teacher-dashboard.html';
                } else {
                    alert('Invalid credentials. Try the demo account or use an email ending with @teacher.edusync.com');
                }
            }
        });
    }
    
    // Form Submission (Student)
    const studentLoginForm = document.getElementById('studentLoginForm');
    
    if (studentLoginForm) {
        studentLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('studentEmail').value;
            const password = document.getElementById('studentPassword').value;
            
            // Get registered users
            const registeredUsers = JSON.parse(localStorage.getItem('eduSyncUsers')) || [];
            
            // Demo login - use the requested default credentials
            if (email === 'studentx@edusync.com' && password === 'studentx@123') {
                
                // Set user data in local storage
                const userData = {
                    name: 'Student X',
                    role: 'student',
                    department: 'Engineering',
                    email: email
                };
                
                localStorage.setItem('eduSyncUser', JSON.stringify(userData));
                
                // Redirect to student dashboard
                window.location.href = 'student-dashboard.html';
            } 
            // Priya Patel account is still available as a secondary demo
            else if (email === 'priya.patel@edusync.com' && password === 'student123') {
                localStorage.setItem('eduSyncUser', JSON.stringify({
                    name: 'Priya Patel',
                    role: 'student',
                    department: 'Engineering',
                    email: email
                }));
                
                window.location.href = 'student-dashboard.html';
            }
            // Check if the user is in registered users
            else {
                // Find user in registered users
                const foundUser = registeredUsers.find(user => 
                    user.email === email && 
                    user.hashedPassword === password && 
                    user.role === 'student'
                );
                
                if (foundUser) {
                    // Set user data in local storage
                    localStorage.setItem('eduSyncUser', JSON.stringify({
                        name: foundUser.name,
                        role: foundUser.role,
                        department: foundUser.department,
                        email: foundUser.email
                    }));
                    
                    // Redirect to student dashboard
                    window.location.href = 'student-dashboard.html';
                }
                // Demo purposes - also allow any email with @student.edusync.com
                else if (email.endsWith('@student.edusync.com') && password.length > 5) {
                    // Extract name from email
                    let name = email.split('@')[0].replace(/\./g, ' ');
                    // Capitalize each word
                    name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                    
                    localStorage.setItem('eduSyncUser', JSON.stringify({
                        name: name,
                        role: 'student',
                        department: 'Student',
                        email: email
                    }));
                    
                    window.location.href = 'student-dashboard.html';
                } else {
                    alert('Invalid credentials. Try the default account: studentx@edusync.com / studentx@123');
                }
            }
        });
    }
    
    // Fill in demo credentials with a click
    const demoTeacherCredentials = document.querySelector('#teacherLoginForm .demo-user');
    const demoStudentCredentials = document.querySelector('#studentLoginForm .demo-user');
    
    if (demoTeacherCredentials) {
        demoTeacherCredentials.addEventListener('click', function() {
            document.getElementById('teacherEmail').value = 'rajesh.sharma@edusync.com';
            document.getElementById('teacherPassword').value = 'teacher123';
        });
    }
    
    if (demoStudentCredentials) {
        demoStudentCredentials.addEventListener('click', function() {
            document.getElementById('studentEmail').value = 'studentx@edusync.com';
            document.getElementById('studentPassword').value = 'studentx@123';
        });
    }
    
    // Signup links - store which tab to show on signup page
    const teacherSignupLink = document.querySelector('#teacherLoginForm .signup-link a');
    const studentSignupLink = document.querySelector('#studentLoginForm .signup-link a');
    
    if (teacherSignupLink) {
        teacherSignupLink.addEventListener('click', function(e) {
            localStorage.setItem('signupTab', 'teacher');
        });
    }
    
    if (studentSignupLink) {
        studentSignupLink.addEventListener('click', function(e) {
            localStorage.setItem('signupTab', 'student');
        });
    }
    
    // Check if user is already logged in
    const currentUser = localStorage.getItem('eduSyncUser');
    if (currentUser) {
        const userData = JSON.parse(currentUser);
        
        // Redirect to appropriate dashboard if already logged in
        if (userData.role === 'teacher') {
            window.location.href = 'teacher-dashboard.html';
        } else if (userData.role === 'student') {
            window.location.href = 'student-dashboard.html';
        }
    }
    
    // Additional demo users (will be shown in browser console for testing)
    console.log('Additional demo accounts:');
    console.log('Student: studentx@edusync.com / studentx@123');
    console.log('Teacher: rajesh.sharma@edusync.com / teacher123');
    console.log('Teacher: arjun.desai@teacher.edusync.com / password123');
    console.log('Teacher: neha.gupta@teacher.edusync.com / password123');
    console.log('Student: vikram.singh@student.edusync.com / password123');
    console.log('Student: ananya.sharma@student.edusync.com / password123');
    
    // Click to fill default credentials in Student Login
    const defaultCredentialsBanner = document.querySelector('.default-credentials-banner');

    if (defaultCredentialsBanner) {
        defaultCredentialsBanner.addEventListener('click', function() {
            document.getElementById('studentEmail').value = 'studentx@edusync.com';
            document.getElementById('studentPassword').value = 'studentx@123';
        });
        
        // Add cursor pointer style
        defaultCredentialsBanner.style.cursor = 'pointer';
    }
}); 