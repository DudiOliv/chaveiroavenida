document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os links de navegação
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Função para rolagem suave
    function smoothScroll(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            updateActiveLink(targetId);
        }
    }
    
    // Função para atualizar o link ativo
    function updateActiveLink(targetId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    // Função para detectar a seção ativa
    function detectActiveSection() {
        const scrollPosition = window.scrollY + 100;
        
        let currentSection = 'inicio';
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section.id;
            }
        });
        
        updateActiveLink(currentSection);
    }
    
    // Event listeners para navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-target');
            
            history.pushState(null, null, `#${targetId}`);
            smoothScroll(targetId);
        });
    });
    
    // Scroll e carregamento
    window.addEventListener('scroll', detectActiveSection);
    detectActiveSection();
    
    // Hash na URL
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        setTimeout(() => {
            smoothScroll(targetId);
        }, 100);
    }
    
    // Observer para animações
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Menu mobile
    initMobileMenu();
});

function initMobileMenu() {
    if (window.innerWidth >= 640) return;
    
    const menuToggle = document.createElement('button');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.className = 'sm:hidden bg-azul-bone text-white p-3 rounded-lg';
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    
    const nav = document.querySelector('nav');
    const navMenu = nav.querySelector('.hidden.sm\\:flex');
    
    if (!navMenu) return;
    
    nav.appendChild(menuToggle);
    
    menuToggle.addEventListener('click', function() {
        const isOpen = navMenu.classList.contains('mobile-open');
        
        if (!isOpen) {
            navMenu.classList.add('mobile-open');
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'white';
            navMenu.style.padding = '1rem';
            navMenu.style.zIndex = '1000';
            navMenu.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        } else {
            navMenu.classList.remove('mobile-open');
            navMenu.style.display = 'none';
        }
    });
    
    // Ajustes para mobile
    const navFixed = document.querySelector('.nav-fixed');
    if (navFixed) {
        navFixed.classList.remove('nav-fixed');
        navFixed.style.position = 'relative';
    }
    
    document.querySelector('main').style.marginTop = '0';
}