/**
 * 
 */
function onEdit(e) {
  addTimestamp(e);
}

function addTimestamp(e) {
  const startRow = 2;
  const targetColumn = 1;
  const ws = "timestamp";

  var row = e.range.getRow();
  var col = e.range.getColumn();

  if (col === targetColumn && row >= startRow && e.source.getActiveSheet().getName() === ws) {
    let currentDate = new Date();

    if (e.source.getActiveSheet().getRange(row, 3).getValue() === "") {
      e.source.getActiveSheet().getRange(row, 3).setValue(currentDate);
    }

    e.source.getActiveSheet().getRange(row, 4).setValue(currentDate);
  }
}