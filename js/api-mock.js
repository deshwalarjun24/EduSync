/**
 * EduSync - College Management System
 * API Mock JavaScript File
 * 
 * This file demonstrates how the frontend would connect to a backend API.
 * In a real implementation, these functions would make actual HTTP requests.
 */

// Base API URL - would point to your actual backend server
const API_BASE_URL = 'https://api.edusync.example.com';

// Mock function to simulate fetch with a delay
function mockFetch(url, options = {}) {
    console.log(`Mock API Call: ${options.method || 'GET'} ${url}`);
    console.log('Request Options:', options);
    
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            resolve({
                ok: true,
                json: () => Promise.resolve({ success: true, message: 'Data would be returned here', data: [] }),
                status: 200
            });
        }, 500);
    });
}

// Authentication API
const AuthAPI = {
    // Login user
    login: async (email, password, role) => {
        const url = `${API_BASE_URL}/api/auth/login`;
        return mockFetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role })
        });
    },
    
    // Register new user
    register: async (userData) => {
        const url = `${API_BASE_URL}/api/auth/register`;
        return mockFetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
    },
    
    // Logout user
    logout: async () => {
        const url = `${API_BASE_URL}/api/auth/logout`;
        return mockFetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    }
};

// User API
const UserAPI = {
    // Get user profile
    getProfile: async () => {
        const url = `${API_BASE_URL}/api/users/profile`;
        return mockFetch(url, {
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    },
    
    // Update user profile
    updateProfile: async (userData) => {
        const url = `${API_BASE_URL}/api/users/profile`;
        return mockFetch(url, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(userData)
        });
    }
};

// Attendance API
const AttendanceAPI = {
    // Generate QR code for class (teachers only)
    generateQR: async (classId, validMinutes) => {
        const url = `${API_BASE_URL}/api/attendance/generate-qr`;
        return mockFetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ classId, validMinutes })
        });
    },
    
    // Mark attendance via QR code (students only)
    markAttendance: async (qrCode) => {
        const url = `${API_BASE_URL}/api/attendance/mark`;
        return mockFetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ qrCode })
        });
    },
    
    // Get attendance records for a student
    getStudentAttendance: async (studentId, fromDate, toDate) => {
        const url = `${API_BASE_URL}/api/attendance/student/${studentId}?from=${fromDate}&to=${toDate}`;
        return mockFetch(url, {
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    },
    
    // Get attendance records for a class (teachers only)
    getClassAttendance: async (classId, date) => {
        const url = `${API_BASE_URL}/api/attendance/class/${classId}?date=${date}`;
        return mockFetch(url, {
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    }
};

// Assignment API
const AssignmentAPI = {
    // Create new assignment (teachers only)
    createAssignment: async (assignmentData) => {
        const url = `${API_BASE_URL}/api/assignments`;
        return mockFetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(assignmentData)
        });
    },
    
    // Get all assignments
    getAssignments: async (filters = {}) => {
        const queryParams = new URLSearchParams(filters).toString();
        const url = `${API_BASE_URL}/api/assignments?${queryParams}`;
        return mockFetch(url, {
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    },
    
    // Get specific assignment
    getAssignment: async (assignmentId) => {
        const url = `${API_BASE_URL}/api/assignments/${assignmentId}`;
        return mockFetch(url, {
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    },
    
    // Submit assignment (students only)
    submitAssignment: async (assignmentId, submissionData) => {
        const url = `${API_BASE_URL}/api/submissions`;
        return mockFetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                assignmentId,
                ...submissionData
            })
        });
    },
    
    // Grade assignment submission (teachers only)
    gradeSubmission: async (submissionId, gradeData) => {
        const url = `${API_BASE_URL}/api/submissions/${submissionId}/grade`;
        return mockFetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(gradeData)
        });
    }
};

// Notes API
const NotesAPI = {
    // Upload notes (teachers only)
    uploadNotes: async (notesData) => {
        const url = `${API_BASE_URL}/api/notes`;
        return mockFetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(notesData)
        });
    },
    
    // Get all notes
    getNotes: async (filters = {}) => {
        const queryParams = new URLSearchParams(filters).toString();
        const url = `${API_BASE_URL}/api/notes?${queryParams}`;
        return mockFetch(url, {
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    },
    
    // Get specific note
    getNote: async (noteId) => {
        const url = `${API_BASE_URL}/api/notes/${noteId}`;
        return mockFetch(url, {
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    }
};

// Export all API modules
const API = {
    Auth: AuthAPI,
    User: UserAPI,
    Attendance: AttendanceAPI,
    Assignment: AssignmentAPI,
    Notes: NotesAPI
};

// Example of how to use these API functions:
/*
async function loginUser() {
    try {
        const response = await API.Auth.login('student@edusync.com', 'student123', 'student');
        const data = await response.json();
        
        if (data.success) {
            // Store token
            localStorage.setItem('token', data.token);
            // Redirect to dashboard
            window.location.href = 'student-dashboard.html';
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login');
    }
}
*/ 