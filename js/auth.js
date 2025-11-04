document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    updateAuthUI(isLoggedIn);

    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Here you would typically make an API call to your backend
            // For demo purposes, we'll just simulate a successful login
            handleLogin({ email, password });
        });
    }

    // Handle signup form submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // Here you would typically make an API call to your backend
            // For demo purposes, we'll just simulate a successful signup
            handleSignup({ email, password });
        });
    }

    // Handle logout
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('logout-btn')) {
            handleLogout();
        }
    });
});

function handleLogin(credentials) {
    // In a real app, you would make an API call to your backend here
    console.log('Logging in with:', credentials);
    
    // Simulate API call with timeout
    setTimeout(() => {
        // On successful login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', credentials.email);
        updateAuthUI(true);
        closeAllModals();
        showNotification('Logged in successfully!', 'success');
    }, 1000);
}

function handleSignup(userData) {
    // In a real app, you would make an API call to your backend here
    console.log('Signing up with:', userData);
    
    // Simulate API call with timeout
    setTimeout(() => {
        // On successful signup
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', userData.email);
        updateAuthUI(true);
        closeAllModals();
        showNotification('Account created successfully!', 'success');
    }, 1000);
}

function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    updateAuthUI(false);
    showNotification('Logged out successfully!', 'info');
}

function updateAuthUI(isLoggedIn) {
    const authButtons = document.querySelectorAll('.auth-buttons, .mobile-auth');
    const userEmail = localStorage.getItem('userEmail');
    
    authButtons.forEach(container => {
        if (isLoggedIn) {
            container.innerHTML = `
                <div class="user-info">
                    <span>${userEmail}</span>
                    <button class="btn btn-outline logout-btn" style="margin-left: 10px;">Logout</button>
                </div>
            `;
        } else {
            container.innerHTML = `
                <a href="#" class="btn btn-outline login-btn">Log In</a>
                <a href="#" class="btn btn-primary signup-btn">Sign Up</a>
            `;
            
            // Add event listeners to new buttons
            container.querySelector('.login-btn')?.addEventListener('click', (e) => {
                e.preventDefault();
                showModal('login');
            });
            
            container.querySelector('.signup-btn')?.addEventListener('click', (e) => {
                e.preventDefault();
                showModal('signup');
            });
        }
    });
}

function showModal(type) {
    closeAllModals();
    
    const modal = document.createElement('div');
    modal.className = 'auth-modal';
    
    if (type === 'login') {
        modal.innerHTML = `
            <div class="auth-modal-content">
                <span class="close-modal">&times;</span>
                <h2>Login to Your Account</h2>
                <form id="loginForm">
                    <div class="form-group">
                        <label for="loginEmail">Email</label>
                        <input type="email" id="loginEmail" required>
                    </div>
                    <div class="form-group">
                        <label for="loginPassword">Password</label>
                        <input type="password" id="loginPassword" required>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 20px;">Login</button>
                </form>
                <p style="text-align: center; margin-top: 15px;">
                    Don't have an account? <a href="#" class="switch-auth">Sign up</a>
                </p>
            </div>
        `;
    } else {
        modal.innerHTML = `
            <div class="auth-modal-content">
                <span class="close-modal">&times;</span>
                <h2>Create an Account</h2>
                <form id="signupForm">
                    <div class="form-group">
                        <label for="signupEmail">Email</label>
                        <input type="email" id="signupEmail" required>
                    </div>
                    <div class="form-group">
                        <label for="signupPassword">Password</label>
                        <input type="password" id="signupPassword" required>
                    </div>
                    <div class="form-group">
                        <label for="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" required>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 20px;">Sign Up</button>
                </form>
                <p style="text-align: center; margin-top: 15px;">
                    Already have an account? <a href="#" class="switch-auth">Login</a>
                </p>
            </div>
        `;
    }
    
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelector('.close-modal')?.addEventListener('click', closeAllModals);
    
    const switchAuth = modal.querySelector('.switch-auth');
    if (switchAuth) {
        switchAuth.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllModals();
            showModal(type === 'login' ? 'signup' : 'login');
        });
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeAllModals();
        }
    });
    
    // Prevent form submission when pressing Enter outside of inputs
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.target.matches('input')) {
            e.preventDefault();
        }
    });
    
    // Add animation class
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeAllModals() {
    document.querySelectorAll('.auth-modal').forEach(modal => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Add show class after a small delay for animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove notification after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Make functions available globally for inline event handlers
window.showModal = showModal;
window.closeAllModals = closeAllModals;
