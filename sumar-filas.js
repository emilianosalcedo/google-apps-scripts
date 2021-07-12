function ROWSUM(rango) {

  let resultadoColumna = [];

  for (var i = 0; i < rango.length; i++) {
    var sumaFila = parseFloat(0);

    for (var j = 0; j < rango[i].length; j++) {
        sumaFila += rango[i][j] || 0;
    }

    resultadoColumna.push([sumaFila]);
  }

  return resultadoColumna;
}