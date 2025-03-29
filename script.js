
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('active');
    });
    
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('active');
        });
    });
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        const progress = bar.querySelector('.skill-progress');
        
        progress.style.width = '0%';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        progress.style.width = percent + '%';
                    }, 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(bar);
    });
    
    const animateOnScroll = (elements, className) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(className);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(el => {
            observer.observe(el);
        });
    };
    
    animateOnScroll(document.querySelectorAll('.skill-card'), 'fade-in');
    animateOnScroll(document.querySelectorAll('.project-card'), 'fade-in');
    animateOnScroll(document.querySelectorAll('.cert-card'), 'fade-in');
    
    const typeWriter = (element, text, speed = 100) => {
        let i = 0;
        element.textContent = '';
        
        const typing = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, speed);
    };
    
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                highlightInvalid(nameInput);
                isValid = false;
            } else {
                removeHighlight(nameInput);
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                highlightInvalid(emailInput);
                isValid = false;
            } else {
                removeHighlight(emailInput);
            }
            
            if (!subjectInput.value.trim()) {
                highlightInvalid(subjectInput);
                isValid = false;
            } else {
                removeHighlight(subjectInput);
            }
            
            if (!messageInput.value.trim()) {
                highlightInvalid(messageInput);
                isValid = false;
            } else {
                removeHighlight(messageInput);
            }
            
            if (isValid) {
                
                const successMessage = document.createElement('div');
                successMessage.className = 'bg-green-500 text-white p-4 rounded-lg mt-4 text-center';
                successMessage.textContent = 'Message sent successfully!';
                
                contactForm.appendChild(successMessage);
                
                contactForm.reset();
                
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }
        });
    }
    
    function highlightInvalid(input) {
        input.classList.add('border-red-500');
        input.classList.add('bg-red-50');
        input.classList.add('bg-opacity-10');
    }
    
    function removeHighlight(input) {
        input.classList.remove('border-red-500');
        input.classList.remove('bg-red-50');
        input.classList.remove('bg-opacity-10');
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    
    const themeToggler = document.getElementById('theme-toggle');
    if (themeToggler) {
        themeToggler.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
            
            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        });
        
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
        }
    }
    
}); 