function sendEmail() {
  var planilla = SpreadsheetApp.getActiveSpreadsheet();
  var solapa = planilla.getSheetByName("mails");
  var dirCorreo = solapa.getRange("C2").getValue();
  var mensaje = solapa.getRange("F3").getValue();
  var asunto = solapa.getRange("F1").getValue();
  var googleLogoUrl = "http://www.google.com/intl/en_com/images/srpr/logo3w.png";
  var googleLogoBlob = UrlFetchApp.fetch(googleLogoUrl).getBlob().setName("googleLogoBlob");

  GmailApp.sendEmail(dirCorreo, asunto, mensaje);
  /*MailApp.sendEmail({
    to: "",
    subject: "",
    htmlBody: "inline Image <img src='cid:googleLogo'> image! <br>",
    inlineImages: 
      {
        googleLogo: googleLogoBlob
      }
  });*/
}