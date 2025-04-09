// Navigation handling
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('nav a');
    
    // Add click event listeners to navigation items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(navItem => {
                navItem.classList.remove('text-blue-500');
                navItem.classList.add('text-gray-500');
            });
            
            // Add active class to clicked item
            item.classList.remove('text-gray-500');
            item.classList.add('text-blue-500');
        });
    });
    
    // Handle scroll behavior
    let lastScroll = 0;
    const header = document.querySelector('app-header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Show/hide header based on scroll direction
        if (currentScroll > lastScroll && currentScroll > 50) {
            header.querySelector('header').style.transform = 'translateY(-100%)';
        } else {
            header.querySelector('header').style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}); 