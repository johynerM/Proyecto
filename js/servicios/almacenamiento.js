// Lee directamente de LocalStorage y la devuelve

export function obtener(clave) {
  const texto = localStorage.getItem(clave);
  return texto ? JSON.parse(texto) : []; // Si se encuentra lo convierte a objeto si no devuelve vacio
};
//Se guardan los datos en el LocalStorage como texto
export function guardar(clave, datos) {
  localStorage.setItem(clave, JSON.stringify(datos))
}