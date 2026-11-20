export function obtener(clave) {
  const texto = localStorage.getItem(clave);
  return texto ? JSON.parse(texto) : [];
};

export function guardar(clave, datos) {
  localStorage.setItem(clave, JSON.stringify(datos))
}