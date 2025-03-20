/**
 * EduSync - College Management System
 * Dashboard JavaScript File
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

    // Check for login status on dashboard pages only
    const currentPath = window.location.pathname;
    if (currentPath.includes('dashboard') || 
        currentPath.includes('attendance') || 
        currentPath.includes('assignments') || 
        currentPath.includes('notes') || 
        currentPath.includes('events') || 
        currentPath.includes('students') || 
        currentPath.includes('performance') || 
        currentPath.includes('settings')) {
        
        // In a real app we would check login status
        // This is simplified for demo purposes
        console.log("Dashboard page accessed");
    }
    
    // Handle logout
    const logoutButton = document.querySelector('.logout-button');
    
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real app this would clear session
            window.location.href = 'login.html';
        });
    }
    
    // Create sidebar overlay for mobile
    let sidebarOverlay = document.querySelector('.sidebar-overlay');

    // Create the overlay element if it doesn't exist
    if (!sidebarOverlay) {
        sidebarOverlay = document.createElement('div');
        sidebarOverlay.classList.add('sidebar-overlay');
        document.body.appendChild(sidebarOverlay);
    }

    // Mobile Menu Toggle with overlay
    const menuToggle = document.querySelector('.menu-toggle');
    const closeSidebar = document.querySelector('.close-sidebar');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when sidebar is open
        });
    }
    
    if (closeSidebar && sidebar) {
        closeSidebar.addEventListener('click', function() {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        });
    }
    
    // Click overlay to close sidebar
    sidebarOverlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    });
    
    // QR Code Countdown Timer (if on attendance page)
    const countdownElement = document.getElementById('countdown');
    const resetCountdownBtn = document.getElementById('resetCountdownBtn');
    const generateQRBtn = document.getElementById('generateQRBtn');
    let countdownInterval;
    
    function startCountdown(duration) {
        let timer = duration;
        let minutes, seconds;
        
        clearInterval(countdownInterval);
        
        countdownInterval = setInterval(function() {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            
            if (countdownElement) {
                countdownElement.textContent = minutes + ":" + seconds;
            }
            
            if (--timer < 0) {
                clearInterval(countdownInterval);
                if (countdownElement) {
                    countdownElement.textContent = "Expired";
                    countdownElement.style.color = '#e74a3b';
                }
                
                // QR code expired logic
                const qrPlaceholder = document.getElementById('qrCodeDisplay');
                if (qrPlaceholder) {
                    qrPlaceholder.classList.add('expired');
                    const img = qrPlaceholder.querySelector('img');
                    if (img) {
                        img.style.opacity = "0.3";
                    }
                }
            }
        }, 1000);
    }
    
    // Initialize countdown if on attendance page
    if (countdownElement && countdownElement.textContent.includes(":")) {
        let initialTime = countdownElement.textContent;
        let parts = initialTime.split(":");
        let minutes = parseInt(parts[0], 10);
        let seconds = parseInt(parts[1], 10);
        let totalSeconds = minutes * 60 + seconds;
        
        startCountdown(totalSeconds);
    }
    
    if (resetCountdownBtn) {
        resetCountdownBtn.addEventListener('click', function() {
            const validityTime = document.getElementById('validityTime');
            let minutes = 5; // Default 5 minutes
            
            if (validityTime && validityTime.value) {
                minutes = parseInt(validityTime.value, 10);
            }
            
            startCountdown(minutes * 60);
            
            // Reset QR code display
            const qrPlaceholder = document.getElementById('qrCodeDisplay');
            if (qrPlaceholder) {
                qrPlaceholder.classList.remove('expired');
                const img = qrPlaceholder.querySelector('img');
                if (img) {
                    img.style.opacity = "1";
                }
            }
        });
    }
    
    if (generateQRBtn) {
        generateQRBtn.addEventListener('click', function() {
            // Generate new QR code - in a real application, this would be a backend API call
            const qrPlaceholder = document.getElementById('qrCodeDisplay');
            if (qrPlaceholder) {
                qrPlaceholder.classList.remove('expired');
                // Simulating QR code change
                const img = qrPlaceholder.querySelector('img');
                if (img) {
                    img.style.opacity = "1";
                    // In a real app, the src would be updated with a new QR code
                }
            }
            
            // Start countdown
            const validityTime = document.getElementById('validityTime');
            let minutes = 5; // Default 5 minutes
            
            if (validityTime && validityTime.value) {
                minutes = parseInt(validityTime.value, 10);
            }
            
            startCountdown(minutes * 60);
        });
    }
    
    // Initialize SVG Circle Animation for Attendance Stats
    const circles = document.querySelectorAll('.circle-fill');
    
    circles.forEach(circle => {
        const percentage = circle.getAttribute('data-percentage');
        if (percentage) {
            const circumference = 2 * Math.PI * 45; // 45 is the radius
            const dashOffset = circumference - (percentage / 100) * circumference;
            
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = dashOffset;
        }
    });
    
    // Table Pagination
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    
    if (paginationBtns.length) {
        paginationBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // This would normally handle actual pagination
                alert('Pagination would be implemented in a full version of the application.');
            });
        });
    }
    
    // Notifications Dropdown
    const notificationIcon = document.querySelector('.notification');
    const messagesIcon = document.querySelector('.messages');
    
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function() {
            alert('Notifications panel would appear here in the full version.');
        });
    }
    
    if (messagesIcon) {
        messagesIcon.addEventListener('click', function() {
            alert('Messages panel would appear here in the full version.');
        });
    }
    
    // Dashboard Search
    const searchInput = document.querySelector('.header-search input');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                alert('Search functionality would be implemented in the full version.');
            }
        });
    }
    
    // Notes page specific interactions
    setupNotesFunctionality();
    
    // Assignments page specific interactions
    setupAssignmentsFunctionality();
    
    // Interactive dashboard elements
    initializeInteractiveComponents();

    // Student Dashboard specific functions
    setupStudentDashboard();
});

// Add hover effects and animations to dashboard cards
function initializeInteractiveComponents() {
    // Card hover effects
    const cards = document.querySelectorAll('.dashboard-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Handle notes page specific functionalities
function setupNotesFunctionality() {
    // Notes actions (view, edit, delete)
    const noteActionButtons = document.querySelectorAll('.notes-actions .btn-icon');
    
    if (noteActionButtons.length) {
        noteActionButtons.forEach(button => {
            button.addEventListener('click', function() {
                const action = this.querySelector('i').className;
                const noteTitle = this.closest('.notes-item').querySelector('h4').textContent;
                
                if (action.includes('eye')) {
                    alert(`Viewing note: ${noteTitle}`);
                } else if (action.includes('edit')) {
                    alert(`Editing note: ${noteTitle}`);
                } else if (action.includes('trash')) {
                    if (confirm(`Are you sure you want to delete note: ${noteTitle}?`)) {
                        alert(`Note deleted: ${noteTitle}`);
                    }
                }
            });
        });
    }
    
    // Notes upload functionality
    const notesFileUpload = document.getElementById('notesFiles');
    
    if (notesFileUpload) {
        notesFileUpload.addEventListener('change', function() {
            const fileInfo = document.querySelector('.file-info');
            
            if (this.files.length > 0) {
                const fileNames = Array.from(this.files).map(file => file.name).join(', ');
                
                if (fileInfo) {
                    fileInfo.innerHTML = `Selected files: ${fileNames}`;
                }
            }
        });
    }
    
    // Comment reply functionality
    const replyButtons = document.querySelectorAll('.feedback-actions .btn');
    
    if (replyButtons.length) {
        replyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const studentName = this.closest('.feedback-item').querySelector('h5').textContent;
                
                alert(`Replying to ${studentName}'s comment...`);
            });
        });
    }
}

// Handle assignments page specific functionalities
function setupAssignmentsFunctionality() {
    // Assignment view buttons
    const viewButtons = document.querySelectorAll('.submission-actions .btn');
    
    if (viewButtons.length) {
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const studentName = this.closest('.submission-item').querySelector('h4').textContent;
                
                const assignmentName = this.closest('.submission-item').querySelector('p').textContent;
                alert(`Viewing ${studentName}'s submission for: ${assignmentName}`);
            });
        });
    }
    
    // Assignment file upload
    const assignmentFileUpload = document.getElementById('assignmentFiles');
    
    if (assignmentFileUpload) {
        assignmentFileUpload.addEventListener('change', function() {
            if (this.files.length > 0) {
                const fileNames = Array.from(this.files).map(file => file.name).join(', ');
                alert(`Files selected: ${fileNames}`);
            }
        });
    }
    
    // Create assignment button
    const createAssignmentBtn = document.querySelector('.assignment-form .btn-primary');
    
    if (createAssignmentBtn) {
        createAssignmentBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('assignmentTitle');
            const desc = document.getElementById('assignmentDesc');
            
            if (title && desc && title.value && desc.value) {
                alert(`Assignment created: ${title.value}`);
                // In a real app, this would submit the form to a backend
                title.value = '';
                desc.value = '';
            } else {
                alert('Please fill in all required fields');
            }
        });
    }
}

// Student Dashboard specific functions
function setupStudentDashboard() {
    // Initialize student dashboard functionality when on student pages
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('student-')) {
        console.log('Student dashboard page loaded');
        
        // Setup page-specific functionality
        if (currentPath.includes('student-attendance')) {
            setupStudentAttendance();
        } else if (currentPath.includes('student-assignments')) {
            setupStudentAssignments(); 
        } else if (currentPath.includes('student-notes')) {
            setupStudentNotes();
        }
    }
}

// Student Attendance page functionality
function setupStudentAttendance() {
    const openCameraBtn = document.getElementById('openCameraBtn');
    
    if (openCameraBtn) {
        openCameraBtn.addEventListener('click', function() {
            // In a real app, this would access the camera and start QR scanning
            alert('In a full implementation, this would open your camera to scan the QR code. For this demo, we simulate a successful scan.');
            
            setTimeout(function() {
                // Simulate successful attendance marking
                showAttendanceSuccess();
            }, 2000);
        });
    }
    
    // For demonstration purposes - show success message
    function showAttendanceSuccess() {
        const scannerPlaceholder = document.querySelector('.scanner-placeholder');
        
        if (scannerPlaceholder) {
            // Save the original content to restore later
            const originalContent = scannerPlaceholder.innerHTML;
            
            // Replace with success message
            scannerPlaceholder.innerHTML = `
                <i class="fas fa-check-circle" style="color: #4CAF50; font-size: 48px;"></i>
                <h3>Attendance Marked!</h3>
                <p>Your attendance has been successfully recorded for Web Development class.</p>
                <button class="btn btn-primary" id="resetScannerBtn">Scan Another Code</button>
            `;
            
            // Add event listener to reset button
            const resetBtn = document.getElementById('resetScannerBtn');
            if (resetBtn) {
                resetBtn.addEventListener('click', function() {
                    scannerPlaceholder.innerHTML = originalContent;
                    
                    // Re-add event listener to the new button
                    const newOpenCameraBtn = document.getElementById('openCameraBtn');
                    if (newOpenCameraBtn) {
                        newOpenCameraBtn.addEventListener('click', function() {
                            alert('Camera would open again in a full implementation.');
                        });
                    }
                });
            }
        }
    }
}

// Student Assignments page functionality
function setupStudentAssignments() {
    // Handle file uploads for assignment submission
    const assignmentSubmission = document.getElementById('assignmentSubmission');
    
    if (assignmentSubmission) {
        assignmentSubmission.addEventListener('change', function() {
            const fileInfo = document.querySelector('.file-info');
            
            if (this.files.length > 0) {
                const fileNames = Array.from(this.files).map(file => file.name).join(', ');
                const totalSize = Array.from(this.files).reduce((total, file) => total + file.size, 0) / (1024 * 1024); // in MB
                
                if (fileInfo) {
                    fileInfo.innerHTML = `Selected ${this.files.length} file(s): ${fileNames} (${totalSize.toFixed(2)} MB)`;
                }
            }
        });
    }
    
    // Handle assignment submission button
    const submitBtn = document.querySelector('.submission-section .btn-primary');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const fileInput = document.getElementById('assignmentSubmission');
            
            if (fileInput && fileInput.files.length > 0) {
                alert('Assignment submitted successfully! Your instructor will be notified.');
                
                // In a real app, this would upload the files to a server
                // Reset the form after submission
                const comment = document.querySelector('.submission-section textarea');
                if (comment) {
                    comment.value = '';
                }
                
                fileInput.value = '';
                document.querySelector('.file-info').innerHTML = 'Maximum 5 files (20MB total)';
            } else {
                alert('Please select at least one file to submit.');
            }
        });
    }
    
    // Handle view buttons for completed assignments
    const viewButtons = document.querySelectorAll('.completed-assignments .btn-sm');
    
    if (viewButtons.length) {
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const assignmentName = this.closest('tr').querySelector('td:first-child').textContent;
                alert(`Viewing details for assignment: ${assignmentName}`);
                // In a real app, this would open a detailed view of the assignment
            });
        });
    }
}

// Student Notes page functionality
function setupStudentNotes() {
    // Search functionality
    const searchInput = document.getElementById('notesSearch');
    const searchButton = document.querySelector('.search-box .btn');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                alert(`Searching for: ${searchTerm}`);
                // In a real app, this would filter the notes based on the search term
            } else {
                alert('Please enter a search term.');
            }
        });
        
        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }
    
    // Filter tag removal
    const filterTags = document.querySelectorAll('.filter-tag');
    
    if (filterTags.length) {
        filterTags.forEach(tag => {
            const removeIcon = tag.querySelector('.fa-times');
            if (removeIcon) {
                removeIcon.addEventListener('click', function() {
                    tag.remove();
                });
            }
        });
    }
    
    // Download buttons
    const downloadButtons = document.querySelectorAll('.notes-actions .btn-primary');
    
    if (downloadButtons.length) {
        downloadButtons.forEach(button => {
            button.addEventListener('click', function() {
                const noteTitle = this.closest('.notes-item').querySelector('h4').textContent;
                alert(`Downloading: ${noteTitle}`);
                // In a real app, this would download the file
            });
        });
    }
    
    // View buttons
    const viewButtons = document.querySelectorAll('.notes-actions .btn:not(.btn-primary)');
    
    if (viewButtons.length) {
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const noteTitle = this.closest('.notes-item').querySelector('h4').textContent;
                const noteClass = this.closest('.notes-item').querySelector('.notes-class').textContent;
                
                // Update the preview panel with the selected note
                const previewHeader = document.querySelector('.preview-header h4');
                const previewMeta = document.querySelector('.preview-header p');
                
                if (previewHeader && previewMeta) {
                    previewHeader.textContent = noteTitle;
                    previewMeta.textContent = noteClass + ' • Lecture Notes';
                }
                
                // Scroll to preview if on mobile
                if (window.innerWidth < 768) {
                    const previewCard = document.querySelector('.notes-preview');
                    if (previewCard) {
                        previewCard.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }
    
    // Folder items click
    const folderItems = document.querySelectorAll('.folder-item');
    
    if (folderItems.length) {
        folderItems.forEach(folder => {
            folder.addEventListener('click', function() {
                const folderName = this.querySelector('h4').textContent;
                alert(`Opening folder: ${folderName}`);
                // In a real app, this would open the folder and show its contents
            });
        });
    }
} 