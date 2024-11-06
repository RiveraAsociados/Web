// Función para cargar el footer
async function loadFooter() {
    try {
        const response = await fetch('./components/footer.html');
        const data = await response.text();
        document.querySelector('footer').innerHTML = data;
    } catch (error) {
        console.error('Error cargando el footer:', error);
    }
}

// Cargar el footer cuando el documento esté listo
document.addEventListener('DOMContentLoaded', loadFooter); 