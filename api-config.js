// API Configuration
// Update this file with your deployed API URL after deployment to Render

window.CONTACT_API_CONFIG = {
    // For local development
    development: 'http://localhost:5000',
    
    // For production (update with your Render URL)
    production: 'https://website-contact-api.onrender.com',
    
    // Auto-detect environment
    getApiUrl: function() {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return this.development;
        } else {
            return this.production;
        }
    }
};

// Set the API URL globally
window.CONTACT_API_URL = window.CONTACT_API_CONFIG.getApiUrl();