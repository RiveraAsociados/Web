document.addEventListener('DOMContentLoaded', async function() {
    try {
        await initDB();
        console.log('Base de datos inicializada en contacto');

        const form = document.getElementById('contactForm');
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('Formulario enviado');

            try {
                // Mostrar loading
                Swal.fire({
                    title: 'Enviando mensaje',
                    text: 'Por favor espere...',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                // Crear objeto de mensaje
                const mensaje = {
                    nombre: this.nombre.value,
                    email: this.email.value,
                    telefono: this.telefono.value || 'No proporcionado',
                    asunto: this.asunto.value,
                    mensaje: this.mensaje.value,
                    fecha: new Date().toISOString()
                };

                console.log('Guardando mensaje:', mensaje);
                
                // Guardar en IndexedDB
                await guardarMensaje(mensaje);

                // Mostrar éxito
                await Swal.fire({
                    title: '¡Mensaje enviado!',
                    text: 'Tu mensaje ha sido enviado correctamente',
                    icon: 'success',
                    confirmButtonColor: '#2193b0'
                });

                // Limpiar formulario
                this.reset();

            } catch (error) {
                console.error('Error al enviar:', error);
                await Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al enviar el mensaje',
                    icon: 'error',
                    confirmButtonColor: '#dc3545'
                });
            }
        });

    } catch (error) {
        console.error('Error de inicialización:', error);
    }
});