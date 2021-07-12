function autoSort(e) {
  const fila = e.range.getRow();
  const columna = e.range.getColumn();
  const ss = e.source;
  const hojaActual = ss.getActiveSheet();
  const hojaNombre = hojaActual.getSheetName();
  const rango = hojaActual.getRange(2, 2, hojaActual.getLastRow() - 1, 5);
  
  if (hojaNombre === "sort" && columna === 5 && fila >= 2) { rango.sort({column: 5, ascending: false}); }
}

function onEdit(e) {
  autoSort(e);
}