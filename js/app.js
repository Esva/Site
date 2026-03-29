const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
});


navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});


const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 80}ms`;
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const roles = [
    'modern web apps.',
    'clean APIs.',
    'great UX.',
    'full-stack products.',
    'things that matter.',
];

const roleEl = document.getElementById('roleText');

if (roleEl) {
    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let pauseTimer = null;

    function typeStep() {
        const current = roles[roleIdx];

        if (!deleting) {
            charIdx++;
            roleEl.textContent = current.slice(0, charIdx);
            if (charIdx === current.length) {
                deleting = true;
                pauseTimer = setTimeout(typeStep, 2200);
                return;
            }
        } else {
            charIdx--;
            roleEl.textContent = current.slice(0, charIdx);
            if (charIdx === 0) {
                deleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
                setTimeout(typeStep, 350);
                return;
            }
        }

        setTimeout(typeStep, deleting ? 45 : 75);
    }

    
    setTimeout(typeStep, 1000);
}

const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav__link:not(.nav__cta)');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinkEls.forEach(link => {
            link.style.color = link.getAttribute('href') === `#${id}`
                ? 'var(--text-1)'
                : '';
        });
    });
}, { threshold: 0.45 });

sections.forEach(s => sectionObserver.observe(s));

const orbs = document.querySelectorAll('.hero__orb');

document.querySelector('.hero')?.addEventListener('mousemove', (e) => {
    const { innerWidth: w, innerHeight: h } = window;
    const x = (e.clientX / w - 0.5) * 2;
    const y = (e.clientY / h - 0.5) * 2;

    orbs.forEach((orb, i) => {
        const depth = (i + 1) * 12;
        orb.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
}, { passive: true });
