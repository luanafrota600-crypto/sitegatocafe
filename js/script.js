// Menu mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Filtro de categorias do cardápio
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (categoryButtons.length > 0 && menuItems.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class de todos os botões
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Adiciona active class ao botão clicado
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                // Filtra os itens do menu
                menuItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Modal para imagens (Funcionalidade JavaScript #3)
    function initImageModals() {
        const images = document.querySelectorAll('.menu-item-image img, .cat-image img');
        
        images.forEach(img => {
            img.addEventListener('click', function() {
                const modal = document.createElement('div');
                modal.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.9);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                    cursor: pointer;
                `;
                
                modal.innerHTML = `
                    <img src="${this.src}" alt="${this.alt}" style="max-width: 90%; max-height: 90%; object-fit: contain;">
                    <button style="position: absolute; top: 20px; right: 20px; background: none; border: none; color: white; font-size: 2rem; cursor: pointer;">×</button>
                `;
                
                document.body.appendChild(modal);
                
                modal.addEventListener('click', function(e) {
                    if (e.target === modal || e.target.tagName === 'BUTTON') {
                        modal.remove();
                    }
                });
            });
        });
    }
    
    // Dark Mode Toggle (Funcionalidade JavaScript #4)
    function initDarkMode() {
        const darkModeToggle = document.createElement('button');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        darkModeToggle.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary);
            color: white;
            border: none;
            cursor: pointer;
            z-index: 1000;
            box-shadow: var(--shadow);
        `;
        
        document.body.appendChild(darkModeToggle);
        
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                this.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('darkMode', 'enabled');
            } else {
                this.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('darkMode', 'disabled');
            }
        });
        
        // Verificar preferência salva
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    // Inicializar funcionalidades
    initImageModals(); // ✅ Funcionalidade JavaScript #3
    initDarkMode();    // ✅ Funcionalidade JavaScript #4
    
    // Marca o link ativo na navegação
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});




// Dropdown functionality
function initDropdowns() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        // Para desktop (hover)
        if (window.innerWidth > 768) {
            const parent = toggle.closest('.dropdown');
            
            parent.addEventListener('mouseenter', () => {
                const menu = parent.querySelector('.dropdown-menu');
                menu.classList.add('show');
                toggle.querySelector('.dropdown-icon').style.transform = 'rotate(180deg)';
            });
            
            parent.addEventListener('mouseleave', () => {
                const menu = parent.querySelector('.dropdown-menu');
                menu.classList.remove('show');
                toggle.querySelector('.dropdown-icon').style.transform = '';
            });
        }
        
        // Para mobile (click)
        if (window.innerWidth <= 768) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const parent = this.closest('.dropdown');
                const menu = parent.querySelector('.dropdown-menu');
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                // Fechar outros dropdowns abertos
                document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
                    if (openMenu !== menu) {
                        openMenu.classList.remove('show');
                        openMenu.previousElementSibling.setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Alternar este dropdown
                if (isExpanded) {
                    menu.classList.remove('show');
                    this.setAttribute('aria-expanded', 'false');
                    this.querySelector('.dropdown-icon').style.transform = '';
                } else {
                    menu.classList.add('show');
                    this.setAttribute('aria-expanded', 'true');
                    this.querySelector('.dropdown-icon').style.transform = 'rotate(180deg)';
                }
            });
        }
    });
    
    // Fechar dropdown ao clicar fora
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                menu.classList.remove('show');
                const toggle = menu.previousElementSibling;
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'false');
                    const icon = toggle.querySelector('.dropdown-icon');
                    if (icon) icon.style.transform = '';
                }
            });
        }
    });
}

// Chame a função no DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... código existente ...
    
    initDropdowns(); // Adicione esta linha
    
    // ... resto do código ...
});

/* --- Lógica do Carrossel (Apenas roda se existir carrossel na página) --- */
let slideIndex = 1;

// Verifica se existe o elemento carrossel na página antes de rodar
if (document.querySelector('.carousel-slide')) {
    showSlides(slideIndex);
    
    // Opcional: Rotação automática a cada 5 segundos
    setInterval(function() {
        plusSlides(1);
    }, 5000);
}

// Controle de "Próximo/Anterior"
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Controle dos pontinhos
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("carousel-slide");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    
    // Esconde todos os slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    // Remove a classe "active" dos pontos
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    // Mostra o slide atual e ativa o ponto correspondente
    slides[slideIndex-1].style.display = "block";  
    if (dots.length > 0) {
        dots[slideIndex-1].className += " active";
    }
}