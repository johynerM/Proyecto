import { iniciarSesion } from './servicios/autentificaciones.js';

const formulario = document.getElementById('form-login');
const mensaje = document.getElementById('mensaje-error');

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();   
  mensaje.textContent = '';
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const usuario = iniciarSesion(email, password);

  if (usuario) {
    window.location.href = 'usuarios.html';
  } else {
    mensaje.textContent = 'Correo o contraseña incorrectos';
  }
});