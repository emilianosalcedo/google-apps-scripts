function esError(cell) {
  const errores = ["#NULL!", "#DIV/0!", "#VALUE!", "#REF!", "#NAME?", "#NUM!", "#N/A", "#ERROR!"];
  var salida = false;

  for (i = 0; i < errores.length; ++i) {
    if (cell === errores[i]) {
      salida = true;
    }
  }

  return salida;
}