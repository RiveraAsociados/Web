document.addEventListener('DOMContentLoaded', function() {
    let lastScroll = 0;
    const header = document.querySelector('header');
    const scrollThreshold = 100; // Cantidad de scroll antes de ocultar/mostrar

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Si estamos al inicio de la página, siempre mostrar el header
        if (currentScroll <= 0) {
            header.classList.remove('hide');
            return;
        }

        // Si hemos scrolleado más que el threshold
        if (Math.abs(currentScroll - lastScroll) > scrollThreshold) {
            // Scrolleando hacia abajo
            if (currentScroll > lastScroll) {
                header.classList.add('hide');
            } 
            // Scrolleando hacia arriba
            else {
                header.classList.remove('hide');
            }
            lastScroll = currentScroll;
        }
    });
});