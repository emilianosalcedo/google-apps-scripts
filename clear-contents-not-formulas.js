/**
 * 
 */
function clearContentNotFormulas() {
  let planilla = SpreadsheetApp.getActiveSpreadsheet();
  let solapa = planilla.getActiveSheet();
  let rango = solapa.getActiverango();
  let formulas = rango.getFormulas();

  rango.setFormulas(formulas);
}