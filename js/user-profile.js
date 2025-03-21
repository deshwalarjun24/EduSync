/**
 * EduSync - College Management System
 * User Profile JavaScript File
 */

window.addEventListener('DOMContentLoaded', function() {
    console.log('Profile updater loaded');
    updateUserProfileInDashboard();
});

// Function to update user profile information in dashboard
function updateUserProfileInDashboard() {
    // Load user data from localStorage
    const currentUserData = localStorage.getItem('currentUser');
    console.log('Current user data:', currentUserData);
    
    if (currentUserData) {
        try {
            const userData = JSON.parse(currentUserData);
            console.log('Parsed user data:', userData);
            
            // Update user info in sidebar
            const userNameElement = document.querySelector('.user-details h3');
            const userRoleElement = document.querySelector('.user-details p');
            const userAvatarElement = document.querySelector('.user-avatar img');
            
            if (userNameElement) {
                console.log('Updating user name to:', userData.fullName || 'User');
                userNameElement.textContent = userData.fullName || 'User';
            }
            
            if (userRoleElement) {
                if (userData.role === 'teacher') {
                    console.log('Updating teacher role to:', userData.department || 'Department not set');
                    userRoleElement.textContent = userData.department || 'Department not set';
                } else if (userData.role === 'student') {
                    const courseInfo = `${userData.course || 'Course not set'}${userData.semester ? ', Semester ' + userData.semester : ''}`;
                    console.log('Updating student role to:', courseInfo);
                    userRoleElement.textContent = courseInfo;
                } else {
                    userRoleElement.textContent = userData.role || 'Role not set';
                }
            }
            
            if (userAvatarElement) {
                console.log('Updating profile photo');
                if (userData.profilePhoto) {
                    userAvatarElement.src = userData.profilePhoto;
                } else {
                    // Default avatar if not provided
                    userAvatarElement.src = "https://via.placeholder.com/80x80";
                }
            }
            
            // Also update the welcome message in the dashboard
            const welcomeMessage = document.querySelector('.section-header p');
            if (welcomeMessage) {
                const firstName = userData.fullName ? userData.fullName.split(' ')[0] : 'User';
                if (userData.role === 'teacher') {
                    welcomeMessage.textContent = `Welcome back, ${firstName}! Here's an overview of your classes and activities.`;
                } else if (userData.role === 'student') {
                    welcomeMessage.textContent = `Welcome back, ${firstName}! Here's an overview of your academic activities and upcoming tasks.`;
                } else {
                    welcomeMessage.textContent = `Welcome back, ${firstName}! Here's an overview of your dashboard.`;
                }
                console.log('Updated welcome message for:', firstName);
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
            setDefaultUserInfo();
        }
    } else {
        console.warn('No user data found in localStorage.');
        setDefaultUserInfo();
    }
}

// Function to set default user information when data is missing or invalid
function setDefaultUserInfo() {
    const userNameElement = document.querySelector('.user-details h3');
    const userRoleElement = document.querySelector('.user-details p');
    const userAvatarElement = document.querySelector('.user-avatar img');
    const welcomeMessage = document.querySelector('.section-header p');
    
    if (userNameElement) userNameElement.textContent = 'User';
    if (userRoleElement) userRoleElement.textContent = 'Role not set';
    if (userAvatarElement) userAvatarElement.src = "https://via.placeholder.com/80x80";
    if (welcomeMessage) welcomeMessage.textContent = 'Welcome to your dashboard! Connect to the backend to see your personalized data.';
    
    console.log('Set default user information due to missing or invalid data');
} 