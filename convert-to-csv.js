/*
 * script to export data of the named sheet as an individual csv files
 * sheet downloaded to Google Drive and then downloaded as a CSV file
 * file named according to the name of the sheet
 * original author: Michael Derazon (https://gist.github.com/mderazon/9655893)
*/

var delimiter = ';';

function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var csvMenuEntries = [{ name: "Download As CSV", functionName: "saveAsCSV" }];
  ss.addMenu("Create Custom CSV", csvMenuEntries);
};

function saveAsCSV() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('COPY');
  var dlName = ss.getSheetByName('Perms').getRange('A2').getValue();
  // create a folder from the name of the spreadsheet
  var folder = DriveApp.createFolder(ss.getName().toLowerCase().replace(/ /g, '_') + '_csv_' + new Date().getTime());
  // append ".csv" extension to the sheet name
  fileName = dlName + " Permissions.csv";
  //  fileName = sheet.getName() + ".csv";
  // convert all available sheet data to csv format
  var csvFile = convertRangeToCsvFile_(fileName, sheet);
  // create a file in the Docs List with the given name and the csv data
  var file = folder.createFile(fileName, csvFile);
  //File downlaod
  var downloadURL = file.getDownloadUrl().slice(0, -8);
  showurl(downloadURL);

}

function showurl(downloadURL) {
  var link = HtmlService.createHtmlOutput('<a href="' + downloadURL + '">Click here to download</a>');
  SpreadsheetApp.getUi().showModalDialog(link, 'Your CSV file is ready!');
}

function convertRangeToCsvFile_(csvFileName, sheet) {
  // get available data range in the spreadsheet
  var activeRange = sheet.getDataRange();
  try {
    var data = activeRange.getValues();
    var csvFile = undefined;

    // loop through the data in the range and build a string with the csv data
    if (data.length > 1) {
      var csv = "";

      for (var row = 0; row < data.length; row++) {
        for (var col = 0; col < data[row].length; col++) {
          if (data[row][col].toString().indexOf(",") != -1) {
            data[row][col] = "\"" + data[row][col] + "\"";
          }
        }

        // join each row's columns
        // add a carriage return to end of each row, except for the last one
        if (row < data.length - 1) {
          csv += data[row].join(delimiter) + "\r\n";
        }
        else {
          csv += data[row];
        }
      }

      csvFile = csv;
    }
    return csvFile;
  }
  catch (err) {
    Logger.log(err);
    Browser.msgBox(err);
  }
}