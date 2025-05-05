document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get the submit button
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Remove any existing notifications
    const existingNotification = document.querySelector('.form-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'form-notification success';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Message sent successfully! We'll get back to you soon.</span>
    `;
    
    // Insert notification after the form
    this.parentNode.insertBefore(notification, this.nextSibling);
    
    // Reset form
    this.reset();
    
    // Reset button after 2 seconds
    setTimeout(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        
        // Fade out notification after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }, 2000);
    
    // Scroll to notification
    notification.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});