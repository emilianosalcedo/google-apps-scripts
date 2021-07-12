/**
 * 
 */
function SHEETNAME(idx) {
  if (!idx)
    return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName();
  else {
    var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
    var idx = parseInt(idx);
    
    if (isNaN(idx) || idx < 1 || sheets.length < idx)
      throw "Invalid parameter (it should be a number from 0 to " + sheets.length + ")";
    return sheets[idx - 1].getName();
  }
}