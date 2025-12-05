// Dark/Light mode toggle
// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
    navLinksMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
    document.body.classList.toggle('nav-open');
});
// Close menu on nav link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 900) {
            navLinksMenu.classList.remove('open');
            hamburger.classList.remove('open');
            document.body.classList.remove('nav-open');
        }
    });
});

// Scroll highlight for navbar
const allSections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');
let scrollHighlightTimeout;
function onScrollHighlight() {
    clearTimeout(scrollHighlightTimeout);
    scrollHighlightTimeout = setTimeout(() => {
        let scrollPos = window.scrollY || document.documentElement.scrollTop;
        allSections.forEach(section => {
            const top = section.offsetTop - 90;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < bottom) {
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, 80);
}
window.addEventListener('scroll', onScrollHighlight);
window.addEventListener('load', onScrollHighlight);

// Scroll-to-top button
const scrollBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});
scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth scroll for nav links
const navLinksSmooth = document.querySelectorAll('.nav-links a');
navLinksSmooth.forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            e.preventDefault();
            window.scrollTo({
                top: targetSection.offsetTop - 60,
                behavior: 'smooth'
            });
        }
    });
});

// Subtle animation on scroll
const sections = document.querySelectorAll('.section');
const fadeInOnScroll = () => {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            section.style.opacity = 1;
            section.style.transform = 'none';
        }
    });
};
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// Contact form JS validation
// const contactForm = document.getElementById('contact-form');
// const formMsg = document.getElementById('form-msg');
// if (contactForm) {
//     contactForm.addEventListener('submit', function(e) {
//         e.preventDefault();
//         const name = contactForm.name.value.trim();
//         const email = contactForm.email.value.trim();
//         const message = contactForm.message.value.trim();
//         formMsg.classList.remove('success');
//         Simple email regex
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!name) {
//             formMsg.textContent = 'Please enter your name.';
//             return;
//         }
//         if (!email || !emailRegex.test(email)) {
//             formMsg.textContent = 'Please enter a valid email address.';
//             return;
//         }
//         if (!message) {
//             formMsg.textContent = 'Please enter your message.';
//             return;
//         }
//         formMsg.textContent = 'Message sent! (Demo only, no backend)';
//         formMsg.classList.add('success');
//         contactForm.reset();
//     });
// }
