// ========== MATRIX RAIN ==========
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff41';
    ctx.font = `${fontSize}px JetBrains Mono`;

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
});

// ========== LOADING SCREEN ==========
const loader = document.getElementById('loader');
const loaderProgress = document.getElementById('loaderProgress');
const loaderText = document.getElementById('loaderText');

const loadingMessages = [
    'INITIALIZING SYSTEM...',
    'LOADING MODULES...',
    'SCANNING NETWORK...',
    'BYPASSING FIREWALL...',
    'DECRYPTING DATA...',
    'ACCESS GRANTED.'
];

let progress = 0;
let msgIndex = 0;

const loadInterval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress > 100) progress = 100;
    loaderProgress.style.width = progress + '%';

    if (progress > (msgIndex + 1) * (100 / loadingMessages.length)) {
        msgIndex = Math.min(msgIndex + 1, loadingMessages.length - 1);
        loaderText.textContent = loadingMessages[msgIndex];
    }

    if (progress >= 100) {
        clearInterval(loadInterval);
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    }
}, 200);

// ========== TYPING EFFECT ==========
const roles = [
    'Penetration Tester',
    'Security Researcher',
    'Vulnerability Hunter',
    'Cyber Security Specialist',
    'Ethical Hacker'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function typeRole() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    // Add cursor
    typingElement.innerHTML = typingElement.textContent + '<span class="cursor-blink">|</span>';

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        speed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500;
    }

    setTimeout(typeRole, speed);
}

setTimeout(typeRole, 2500);

// ========== MOBILE NAV ==========
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.hack-card, .exp-card, .cert-badge').forEach(el => {
    observer.observe(el);
});

// ========== SKILL BARS ANIMATION ==========
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.skill-fill');
            fills.forEach(fill => {
                const width = fill.getAttribute('data-width');
                setTimeout(() => {
                    fill.style.width = width + '%';
                }, 300);
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-group').forEach(group => {
    skillObserver.observe(group);
});

// ========== NAVBAR SCROLL EFFECT ==========
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.borderBottomColor = '#00ff4120';
    } else {
        navbar.style.borderBottomColor = '#1a1a2e';
    }
});

// ========== ACTIVE SECTION HIGHLIGHT ==========
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.style.color = '';
                link.style.textShadow = '';
            });
            const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.style.color = '#00ff41';
                activeLink.style.textShadow = '0 0 8px #00ff41';
            }
        }
    });
});

// ========== RANDOM GLITCH ON CARDS ==========
function randomGlitch() {
    const cards = document.querySelectorAll('.hack-card');
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    if (randomCard) {
        randomCard.style.transform = `translate(${Math.random() * 2 - 1}px, ${Math.random() * 2 - 1}px)`;
        setTimeout(() => {
            randomCard.style.transform = '';
        }, 100);
    }
}

setInterval(randomGlitch, 5000);

// ========== KONAMI CODE EASTER EGG ==========
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            document.body.style.animation = 'none';
            document.querySelectorAll('.glitch').forEach(el => {
                el.style.textShadow = '0 0 20px #00ff41, 0 0 40px #00ff41, 0 0 80px #00ff41';
            });
            // Intensify matrix
            canvas.style.opacity = '0.15';
            setTimeout(() => {
                canvas.style.opacity = '0.06';
            }, 5000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});
