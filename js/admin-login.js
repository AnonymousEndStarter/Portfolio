// admin-login.js

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('admin-login-form');
    const errorMessage = document.getElementById('login-error');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    
    // Toggle password visibility
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle icon
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }
    
    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // In a real application, you would send this data to a server for authentication
            // For demonstration purposes, we'll use a simple hardcoded check
            // WARNING: This is NOT secure for production use
            if (username === 'Hrithik Chowdhury' && password === 'Hacker99') {
                // Set a session token (in a real app, this would be a secure token from the server)
                sessionStorage.setItem('admin_authenticated', 'true');
                
                // Redirect to admin dashboard
                window.location.href = 'admin-dashboard.html';
            } else {
                // Show error message
                errorMessage.textContent = '// Invalid username or password';
                
                // Clear the error after 3 seconds
                setTimeout(() => {
                    errorMessage.textContent = '';
                }, 3000);
            }
        });
    }
    
    // Check if user is already logged in when loading login page
    if (window.location.pathname.includes('admin-login.html')) {
        if (sessionStorage.getItem('admin_authenticated') === 'true') {
            window.location.href = 'admin-dashboard.html';
        }
    }
});