const EMAILJS_CONFIG = {
    USER_ID: 'paBFBmZMiSUAMnsS0',
    SERVICE_ID: 'service_5paqxva',
    TEMPLATE_ID: 'template_6t7d4qe'
};

function initializeEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.USER_ID);
        console.log('EmailJS initialized successfully with User ID:', EMAILJS_CONFIG.USER_ID);
        return true;
    } else {
        console.error('EmailJS library not loaded');
        return false;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (typeof emailjs !== 'undefined') {
        initializeEmailJS();
    } else {
        console.warn('EmailJS library not yet loaded, will initialize later');
    }
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = EMAILJS_CONFIG;
}