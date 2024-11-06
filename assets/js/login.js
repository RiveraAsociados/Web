document.addEventListener('DOMContentLoaded', function() {
    // Verificar si ya hay una sesión activa
    if (sessionStorage.getItem('adminLoggedIn')) {
        window.location.href = 'mensajes.html';
    }

    // Manejar el formulario de login
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Aquí puedes definir las credenciales válidas
        if (username === 'admin' && password === 'admin123') {
            // Guardar el estado de la sesión
            sessionStorage.setItem('adminLoggedIn', 'true');
            
            Swal.fire({
                title: '¡Bienvenido!',
                text: 'Inicio de sesión exitoso',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = 'mensajes.html';
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Usuario o contraseña incorrectos',
                icon: 'error'
            });
        }
    });

    // Toggle para mostrar/ocultar contraseña
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });
}); 