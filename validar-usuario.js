/**
 * 
 */
function validarUsuario() {
  const mails = [ "foobar@gmail.com", "emilianosalcedo@gmail.com" ];
  const sheetId = "33647523";
  const spreadId = "1urhNkPMvE6o_mL8aHIgfdNo7dUxnkKRI9SOcDPrkfWk";
  var user = Session.getActiveUser().getEmail();
  var spreadName = SpreadsheetApp.getActiveSpreadsheet().getName();
  var sheetName = SpreadsheetApp.getActiveSheet().getName();
  var sId = SpreadsheetApp.getActiveSpreadsheet().getSheetId().toString();
  var spsId = SpreadsheetApp.getActiveSpreadsheet().getId().toString();

  if (sId == sheetId && spsId == spreadId) {
    for (i = 0; i < mails.length; i++) {
      if (user == mails[i]) {
        return Logger.log(sId + "\n" + spsId + "\n" + spreadName + "\n" + sheetName + "\n" + user);
      }
    }
  }
}
