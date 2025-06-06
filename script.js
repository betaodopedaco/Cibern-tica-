// Efeito de partículas flutuantes simples
function createSimpleParticles() {
    const particlesContainer = document.getElementById('particles-container');
    if (particlesContainer) {
        particlesContainer.style.zIndex = '-1';
        document.body.appendChild(particlesContainer);
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 5 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = `rgba(${Math.random() > 0.5 ? 0 : 125}, ${Math.random() > 0.5 ? 243 : 18}, ${Math.random() > 0.5 ? 255 : 255}, ${Math.random() * 0.3 + 0.1})`;
            particle.style.borderRadius = '50%';
            particle.style.top = Math.random() * 100 + 'vh';
            particle.style.left = Math.random() * 100 + 'vw';
            
            particlesContainer.appendChild(particle);
            
            // Animação flutuante
            gsap.to(particle, {
                y: (Math.random() - 0.5) * 100,
                x: (Math.random() - 0.5) * 100,
                duration: Math.random() * 10 + 10,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    }
}

// Efeito de rolagem suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - (document.querySelector('.site-header').offsetHeight), // Ajusta para o cabeçalho fixo
                behavior: 'smooth'
            });
        }
    });
});

// Animação do cabeçalho na rolagem
window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Animação dos cards de serviço na rolagem com GSAP e ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.service-card').forEach(card => {
    gsap.fromTo(card, 
        { opacity: 0, y: 50, scale: 0.9 }, 
        { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 0.8, 
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 80%", // Começa a animação quando o topo do card entra 80% na viewport
                toggleActions: "play none none none",
                once: true // Anima uma vez
            }
        }
    );

    // Efeito de movimento 3D no hover
    card.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const rotateX = ((e.clientY - centerY) / height) * 10; // Menor rotação
        const rotateY = ((e.clientX - centerX) / width) * -10; // Menor rotação
        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            ease: "power1.out",
            duration: 0.3
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            ease: "elastic.out(1, 0.3)", // Retorno suave
            duration: 0.8
        });
    });
});

// Animação das estatísticas
document.querySelectorAll('.stat-box').forEach(stat => {
    gsap.fromTo(stat,
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
                trigger: stat,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true
            }
        }
    );
});

// Animação dos recursos
document.querySelectorAll('.feature-item').forEach(feature => {
    gsap.fromTo(feature,
        { opacity: 0, x: -50 },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: feature,
                start: "top 80%",
                toggleActions: "play none none none",
                once: true
            }
        }
    );
});

// Toggle do menu mobile (placeholder, pois o CSS para ele está como display: none)
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            // Este é um placeholder. No CSS atual, .main-nav tem display: none.
            // Para fazê-lo aparecer, você precisaria de um CSS para .main-nav.active
            // e uma classe aqui para alternar.
            mainNav.classList.toggle('active'); // Exemplo: main-nav.active { display: flex; flex-direction: column; }
            console.log('Menu toggle clicked!');
        });
    }

    createSimpleParticles();
});

// Tema escuro/claro (se o CSS tivesse um .theme-light)
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('theme-light');
        const isLightTheme = document.documentElement.classList.contains('theme-light');
        themeToggle.querySelector('i').className = isLightTheme ? 'fas fa-moon' : 'fas fa-sun';
    });
}
