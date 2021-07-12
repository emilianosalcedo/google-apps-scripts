/**
 * Devuelve la última fila no vacía de un rango.
 * 
 * @param {string} Un rango.
 * @return Última fila no vacía.
 * @customfunction
 */
function LASTROW(rangoString) {
  var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  //var ultFila = ss.getLastRow();
  //var ultFila = ss.getRange("A1").getDataRegion().getLastRow();
  var rango = ss.getRange(rangoString).getValues();
  var ultFila;

  for (i = rango.length - 1; i >= 0; i--) {
    ultFila = i;
    var fila = rango[i];
    var esVacio = fila.every(function (c) { return c === ""; });

    if (!esVacio) {
      break;
    }
  }

  return ultFila += 1;
}