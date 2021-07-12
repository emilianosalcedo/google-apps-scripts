/**
 * 
 */
function sendMail() {
  const first = 0;
  const last = 1;
  const mail = 2;
  //const subject = 3;
  //const name = 4;

  var emailTemp = HtmlService.createTemplateFromFile("email");
  var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Mails");

  var data = ws.getRange("A2:E" + ws.getLastRow()).getValues();
  var subject = ws.getRange("F1").getValue();
  var name = ws.getRange("F2").getValue();

  data = data.filter(function(row) { return row[3] === true });

  data.forEach(function(row) {
    emailTemp.firstName = row[first];
    emailTemp.lastName = row[last];

    let htmlMessage = emailTemp.evaluate().getContent();
    GmailApp.sendEmail(
      row[mail],
      subject,
      "Tu cliente de correo electrónico no soporta HTML.",
      {name: name, htmlBody: htmlMessage}
    );
  });
}
