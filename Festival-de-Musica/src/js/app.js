// Listeners
document.addEventListener('DOMContentLoaded', () => {
    navegacionFija();
    crearGaleria();
    resaltarEnlace();
    scrollNav();
});

// Functions
function navegacionFija() {
    const header = document.querySelector('.header');
    const noticias = document.querySelector('#noticias');

    window.addEventListener('scroll', () => {
        if(noticias.getBoundingClientRect().bottom < 1) {
            header.classList.add('header-fixed');
        } else {
            header.classList.remove('header-fixed');
        };
    });
};

function crearGaleria() {
    const galeria = document.querySelector('.galeria-section__contenedor');
    const cantidadImagenes = 16;
    
    for(let i = 1; i <= cantidadImagenes; i++) {
        const imagenListItem = document.createElement('LI');
        const imagen = document.createElement('IMG');

        imagen.loading = 'lazy';
        imagen.width = '300';
        imagen.height = '200';
        imagen.src = `./src/img/gallery/full/${i}.jpg`;
        imagen.alt = `Imagen de Galeria Numero ${i}`;

        imagenListItem.appendChild(imagen);
        galeria.appendChild(imagenListItem);

        // Event Handler
        imagen.onclick = () => mostrarImagen(i);
    };
};

function mostrarImagen(i) {
    const imagenDiv = document.createElement('DIV');
    const imagen = document.createElement('IMG');

    imagenDiv.classList.add('imagenDiv');

    imagen.src = `./src/img/gallery/full/${i}.jpg`;
    imagen.alt = `Imagen de Galeria Numero ${i}`;

    imagenDiv.appendChild(imagen);

    // Modal
    const modal = document.createElement('DIV');
    modal.classList.add('modal');
    modal.onclick = cerrarModal;

    // Boton Cerrar Modal
    const cerrarModalBtn = document.createElement('BUTTON');
    cerrarModalBtn.textContent = 'X';
    cerrarModalBtn.classList.add('modal-boton');
    cerrarModalBtn.onclick = cerrarModal;

    imagenDiv.appendChild(cerrarModalBtn);
    modal.appendChild(imagenDiv);

    const html = document.querySelector('html');
    html.classList.add('overflow-hidden');
    html.appendChild(modal);
};

function cerrarModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('modal-fadeout');

    setTimeout(() => {
        const html = document.querySelector('html');

        modal?.remove();
        html.classList.remove('overflow-hidden');
    }, 250);
};

function resaltarEnlace() {
    document.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.contenido-header__nav a');

        let actual = '';

        sections.forEach( (section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if(window.scrollY >= (sectionTop - sectionHeight / 3)) {
                actual = section.id;
            };
        });

        navLinks.forEach( (link) => {
            link.classList.remove('header-active');

            if(link.getAttribute('href') === '#' + actual) {
                link.classList.add('header-active');
            };
        });
    });
};

function scrollNav() {
    const navLinks = document.querySelectorAll('.contenido-header__nav a ');

    navLinks.forEach( (link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const sectionScroll = e.target.getAttribute('href');
            const section = document.querySelector(sectionScroll);

            section.scrollIntoView({behavior: 'smooth'});
        });
    });
};