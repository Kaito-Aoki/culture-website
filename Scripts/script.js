// Side menu functionality
const sideMenu = document.getElementById('side-menu');
const sideMenuTrigger = document.createElement('div');
sideMenuTrigger.className = 'side-menu-trigger';
document.body.appendChild(sideMenuTrigger);

let isMenuOpen = false;

sideMenuTrigger.addEventListener('mouseenter', () => {
    sideMenu.style.left = '0';
    isMenuOpen = true;
});

document.addEventListener('click', (event) => {
    if (!sideMenu.contains(event.target) && !sideMenuTrigger.contains(event.target)) {
        sideMenu.style.left = '-250px';
        isMenuOpen = false;
    }
});

// Optional: Re-open menu on hover if it's closed
sideMenuTrigger.addEventListener('mouseenter', () => {
    if (!isMenuOpen) {
        sideMenu.style.left = '0';
        isMenuOpen = true;
    }
});

sideMenu.addEventListener('mouseleave', () => {
    // The menu will now stay open until clicked outside
});


// Card navigation
const cardContainers = document.querySelectorAll('.cards-container');
const navArrows = document.querySelectorAll('.nav-arrow');

let autoMoveInterval;

// Function to move cards
function moveCards(container, direction) {
    const cards = container.querySelectorAll('.card');
    const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight);

    if (direction === 'left') {
        // Move the last card to the beginning
        container.prepend(container.lastElementChild);
        container.scrollLeft += cardWidth;
        
        // Smooth scroll to the left
        container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    } else {
        // Smooth scroll to the right
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });

        // After the scroll animation completes, move the first card to the end
        setTimeout(() => {
            container.append(container.firstElementChild);
            container.scrollLeft -= cardWidth;
        }, 300); // Adjust this timeout to match your scroll behavior duration
    }
}

// Function to start automatic movement
function startAutoMove() {
    autoMoveInterval = setInterval(() => {
        cardContainers.forEach(container => {
            moveCards(container, 'right');
        });
    }, 2000); // Move every 2 seconds
}

// Function to stop automatic movement
function stopAutoMove() {
    clearInterval(autoMoveInterval);
}

// Initialize the scroll position and start auto-move
cardContainers.forEach(container => {
    const cardWidth = container.querySelector('.card').offsetWidth + 
                      parseInt(getComputedStyle(container.querySelector('.card')).marginRight);
    container.scrollLeft = cardWidth * 2; // Start at the third card (adjust as needed)
});

startAutoMove();

// Disable mouse scroll
cardContainers.forEach(container => {
    container.addEventListener('wheel', (e) => e.preventDefault());
});

// Handle manual navigation
navArrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
        const container = arrow.parentElement.querySelector('.cards-container');
        const direction = arrow.classList.contains('left') ? 'left' : 'right';

        stopAutoMove(); // Stop auto-move when user interacts
        moveCards(container, direction);
        startAutoMove(); // Restart auto-move after user interaction
    });
});

// Optional: Pause auto-move when hovering over the container
cardContainers.forEach(container => {
    container.addEventListener('mouseenter', stopAutoMove);
    container.addEventListener('mouseleave', startAutoMove);
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Check if the href is just '#' and ignore it
        if (href === '#') {
            return;
        }
        
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        } else {
            console.warn(`Element with id "${targetId}" not found`);
        }
    });
});

// Animation on scroll
const animatedElements = document.querySelectorAll('.animate-on-scroll');

const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-in-left');
        }
    });
}, { threshold: 0.1 });

animatedElements.forEach(el => {
    elementObserver.observe(el);
});

// Form submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    // For now, we'll just log it to the console
    const formData = new FormData(contactForm);
    console.log('Form submitted with data:', Object.fromEntries(formData));
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Dynamic copyright year
const currentYear = new Date().getFullYear();
document.querySelector('.footer-bottom p').textContent = `© ${currentYear} NovaVault. All rights reserved.`;

// Adding click event to each state in the map
document.querySelectorAll('#india-map svg path').forEach((state) => {
    state.addEventListener('click', () => {
        const stateId = state.getAttribute('id');
        
        if (stateId === 'gujarat') { // Example: Gujarat
            window.location.href = 'gujarat.html'; // Redirect to the Gujarat page
        } else {
            console.log(`State ${stateId} clicked. Add redirection as needed.`);
            // You can add more conditions here for other states
        }
    });
});
