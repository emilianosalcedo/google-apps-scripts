/**
 * DEVUELVE LOS ELEMENTOS DUPLICADOS EN UN RANGO
 * 
 * @param {string} range - Un rango.
 * @return {string[]} duplicates - Elementos duplicados.
 * @customfunction
 */
function NOTUNIQUE(range) {
  var allValues = '';
  var duplicates = [];

  for (i in range) {
    let thisRow = range[i];
    let thisRowString = thisRow.toString();

    if (allValues.indexOf(thisRowString) == -1) {
      allValues = allValues + ' ' + thisRowString;
    }
    else {
      let duplicatesString = duplicates.toString();

      if (duplicatesString.indexOf(thisRowString) == -1) {
        duplicates.push(thisRow);
      }
    }
  }

  return duplicates;
}