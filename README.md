# EduSync - College Management System

EduSync is a modern web-based platform designed to streamline academic and administrative processes within a college. This system provides role-based access to teachers and students for managing attendance, assignments, notes, events, and academic performance.

## Features

- **Secure Authentication**: Separate login and registration portals for teachers and students
- **QR Code Attendance**: Generate and scan unique QR codes with limited validity
- **Assignment Management**: Upload, submit, and grade assignments with deadline tracking
- **Notes Sharing**: Share and access study materials categorized by subject
- **Event Information**: Stay updated with college events and announcements
- **Academic Performance Tracking**: Monitor progress and academic performance

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **UI Framework**: Custom CSS with responsive design
- **Icons**: Font Awesome
- **Fonts**: Montserrat and Poppins from Google Fonts
- **Authentication**: Client-side authentication using LocalStorage (demo purposes only)

## Getting Started

1. Clone the repository
2. Open `login.html` in your browser
3. Use the demo login credentials provided on the page:
   - **Teacher**: rajesh.sharma@edusync.com / teacher123
   - **Student**: studentx@edusync.com / studentx@123
4. Or register a new account through the signup page

## Pages

- **Login Page**: Secure access point with separate forms for teachers and students
- **Signup Page**: Registration forms for new teachers and students with validation
- **Landing Page**: Main website with information about the system features
- **Teacher Dashboard**: Interface for instructors to manage classes, attendance, and assignments
- **Student Dashboard**: Interface for students to view classes, scan attendance QR codes, and check performance

## Project Structure

```
EduSync/
├── index.html              # Main landing page
├── login.html              # Authentication page
├── signup.html             # Registration page
├── teacher-dashboard.html  # Teacher dashboard interface
├── student-dashboard.html  # Student dashboard interface
├── styles/
│   ├── main.css            # Main stylesheet
│   ├── login.css           # Login page styles
│   ├── signup.css          # Signup page styles
│   └── dashboard.css       # Dashboard specific styles
├── js/
│   ├── main.js             # Main JavaScript functionality
│   ├── login.js            # Authentication functionality
│   ├── signup.js           # Registration functionality
│   └── dashboard.js        # Dashboard specific functionality
└── README.md               # Project documentation
```

## Authentication System

The EduSync system features a role-based authentication system:

- **User Roles**: Separate interfaces for teachers and students
- **Demo Accounts**: Pre-configured accounts for easy testing
- **Registration**: Detailed signup forms with validation for new users
- **Session Management**: Persistent login using browser LocalStorage
- **Security Features**: Password visibility toggle and credential validation
- **Responsive Design**: Optimized for both desktop and mobile devices

## Dashboard Features

### Teacher Dashboard
- Generate QR codes for attendance
- Track student attendance records
- Manage assignment submissions
- Monitor class performance
- Schedule and organize classes
- View upcoming events

### Student Dashboard
- Scan QR codes for attendance
- Submit assignments
- Access course materials
- Track personal attendance and performance
- View class schedule and upcoming events

## Future Enhancements

- Backend implementation with Node.js/Express.js or Django
- Database integration with MySQL or MongoDB
- QR code generation using Google Chart API
- Face recognition for enhanced security
- AI-based performance analysis

## License

This project is available for educational purposes and personal use.

## Contact

For more information, please contact info@edusync.com "# EduSync" 
