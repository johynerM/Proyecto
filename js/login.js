// llamamos la funcion iniciar sesion
import { iniciarSesion } from './servicios/autentificaciones.js';
import { obtener, guardar } from './servicios/almacenamiento.js';

// crea un administrador inicial por si no hay usuarios almacenados
const user= obtener('usuarios');

if (user.length === 0) {
  guardar('usuarios', [{
      "id": "admin1",
      "identificacion": "1100223345",
      "nombre": "Andres Gil",
      "email": "andgil@acme.edu",
      "telefono": "3156879502",
      "cargo": "administrador",
      "password": "4321"
    }]);
}

const formulario = document.getElementById('form-login');
const mensaje = document.getElementById('mensaje-error');

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();   //evitamos la recarga de la pagina sin poner el correo y la contraseña en la url
  mensaje.textContent = ''; // quita el mensaje anterior

  // lee lo que ingreso el usuario y despues lo comprueba con iniciar sesion
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const usuario = iniciarSesion(email, password);

  if (usuario) {
    window.location.href = 'usuarios.html'; // si el usuario es correcto lo pasa a la pagina privada de usuarios
  } else {
    mensaje.textContent = 'Correo o contraseña incorrectos';
  }
});