/**
 * Cambia a mayúsculas la primera letra de todas las palabras de una cadena especificada.
 * 
 * @param {"hola mundo"} texto Una cadena de caracteres.
 * @return Texto capitalizado como nombre propio.
 * @customfunction
 */
function PROPERCASE(texto) {
  return texto.replace(/\b\w/g, function(match) { return match.toUpperCase(); })
}