const incomeStatementUrl = "https://financialmodelingprep.com/api/v3/financials/income-statement/";

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Finance')
    .addItem('Get Stock Quote', 'getQuote')
    .addItem('Get Annual Income Statement', 'getAnnualIncomeStatement')
    .addItem('Get Quarter Income Statement', 'getQuarterIncomeStatement')
    .addToUi();
}

function getAnnualIncomeStatement() {
  var ui = SpreadsheetApp.getUi(); // Same variations.

  var result = ui.prompt(
    'Get Annual Income Statement',
    'Enter the stock code:',
    ui.ButtonSet.OK_CANCEL);

  // Process the user's response.
  var button = result.getSelectedButton();
  var text = result.getResponseText().trim();
  if (button == ui.Button.OK) {
    if (text.length == 0) {
      ui.alert('Error', 'Please enter a valid stock code', ui.ButtonSet.OK);
    } else {

      /* *************************************
             Get the annual income date
      ************************************** */
      var annualIncomeResp = callAPI(incomeStatementUrl, text, '');
      if (annualIncomeResp['symbol'] != null) {
        generateIncomeStatementData(annualIncomeResp, 'Annual Income Statement');
      } else {
        ui.alert('Error', text + ' is not a valid stock code.', ui.ButtonSet.OK);
      }
    }
  }
}

function getQuarterIncomeStatement() {
  var ui = SpreadsheetApp.getUi(); // Same variations.

  var result = ui.prompt(
    'Get Quarter Income Statement',
    'Enter the stock code:',
    ui.ButtonSet.OK_CANCEL);

  // Process the user's response.
  var button = result.getSelectedButton();
  var text = result.getResponseText().trim();
  if (button == ui.Button.OK) {
    if (text.length == 0) {
      ui.alert('Error', 'Please enter a valid stock code', ui.ButtonSet.OK);
    } else {

      /* *************************************
             Get the quarter income date
      ************************************** */
      var quarterIncomeResp = callAPI(incomeStatementUrl, text, '?period=quarter');
      if (quarterIncomeResp['symbol'] != null) {
        generateIncomeStatementData(quarterIncomeResp, 'Quarter Income Statement');
      } else {
        ui.alert('Error', text + ' is not a valid stock code.', ui.ButtonSet.OK);
      }
    }
  }
}

function generateIncomeStatementData(data, title) {
  // Create a new sheet first
  createNewSheet(data['symbol']);
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange('A1').setFontWeight('bold').setFontSize(18).setFontColor('blue').setValue(data["symbol"]);
  var financials = data['financials'];
  // Print out the header for the table
  var headers = [['Date'], ['Revenue'], ['Gross Profit'], ['Earnings before Tax'], ['Net Income'], ['Net Profit Margin'], ['EPS'], ['EBITDA'], [''], ['Operating Income'], ['Operating Expenses']];

  var rowStart = 3;
  sheet.getRange(rowStart, 1, 1, 1).setFontWeight('bold').setValue(title);
  sheet.getRange(rowStart + 1, 1, headers.length, 1).setFontWeight('bold').setValues(headers);
  sheet.autoResizeColumn(1);
  // Print out the financials in table
  var columnIndex = 2;
  for (var i = financials.length - 1; i >= 0; i-- , columnIndex++) {
    var values = [[financials[i]['date']], [financials[i]['Revenue']], [financials[i]['Gross Profit']], [financials[i]['Earnings before Tax']],
    [financials[i]['Net Income']], [financials[i]['Net Profit Margin']], [financials[i]['EPS']], [financials[i]['EBITDA']],
    [''], [financials[i]['Operating Income']], [financials[i]['Operating Expenses']]];
    sheet.getRange(rowStart + 1, columnIndex, values.length, 1).setValues(values);

  }

  // Set the format of the cells
  if (financials.length > 0) {
    sheet.getRange(rowStart + 2, 2, headers.length - 1, financials.length).setNumberFormat("$#,##0.00;$(#,##0.00)");
    sheet.getRange(rowStart + 6, 2, 1, financials.length).setNumberFormat("##.#%");
    sheet.autoResizeColumns(2, financials.length);
  }

  // Build the chart
  var range = sheet.getRange(rowStart + 1, 1, 5, financials.length + 1);
  var chart = sheet.newChart()
    .setChartType(Charts.ChartType.LINE)
    .setOption('title', title)
    .setOption('hAxis', { title: 'Date', gridlines: { count: financials.length } })
    .setOption('legend', { title: 'Legend', position: 'right' })
    .setOption('width', 1680)
    .setOption('height', 480)
    .addRange(range)
    .setTransposeRowsAndColumns(true)
    .setNumHeaders(1)
    .setPosition(rowStart + values.length + 2, 1, 0, 0)
    .build();

  sheet.insertChart(chart);
}

function getQuote() {
  var ui = SpreadsheetApp.getUi(); // Same variations.

  var result = ui.prompt(
    'Get Stock Quote',
    'Enter the stock code:',
    ui.ButtonSet.OK_CANCEL);

  // Get the stock code
  var proceed = true;
  var button = result.getSelectedButton();
  var stockCode = result.getResponseText().trim();
  if (button == ui.Button.CANCEL || button == ui.Button.CLOSE) {
    proceed = false;
  } else if (button == ui.Button.OK && stockCode.length == 0) {
    proceed = false;
    ui.alert('Error', 'Please enter a valid stock code', ui.ButtonSet.OK);
  }

  // Get the time series
  var timeSeries = 'daily';
  var allowedTime = ['1min', '5min', '15min', '1hour', 'daily'];
  if (proceed) {
    var result = ui.prompt(
      'Get Stock Quote',
      'Enter the time series: ("1min" for 1 min, "5min" for 5 minute, "15min" for 15 minute, "1hour" for hourly, "daily" for daily)',
      ui.ButtonSet.OK_CANCEL);

    // Process the user's response.
    var button = result.getSelectedButton();
    timeSeries = result.getResponseText().trim().toLowerCase();
    if (button == ui.Button.CANCEL || button == ui.Button.CLOSE) {
      proceed = false;
    } else if (button == ui.Button.OK && timeSeries.length == 0) {
      proceed = false;
      ui.alert('Error', 'Please enter time series', ui.ButtonSet.OK);
    } else if (button == ui.Button.OK && allowedTime.indexOf(timeSeries) < 0) {
      proceed = false;
      ui.alert('Error', 'The time series entered is not valid', ui.ButtonSet.OK);
    }
  }

  // Get the amount of data
  var max = 100;
  if (proceed) {
    var result = ui.prompt(
      'Get Stock Quote',
      'Enter the number of data point (eg. 10). Warnings: High number of data point will result in slowness.',
      ui.ButtonSet.OK_CANCEL);
    // Process the user's response.
    var button = result.getSelectedButton();
    var res = result.getResponseText().trim();
    if (button == ui.Button.CANCEL || button == ui.Button.CLOSE) {
      proceed = false;
    } else if (button == ui.Button.OK && !Number.isInteger(parseInt(res))) {
      proceed = false;
      ui.alert('Error', 'Invalid number of data point', ui.ButtonSet.OK);
    } else {
      max = parseInt(res);
    }
  }

  if (proceed) {
    var url = "https://financialmodelingprep.com/api/v3/historical-price-full/";

    if (timeSeries != 'daily') {
      url = "https://financialmodelingprep.com/api/v3/historical-chart/" + timeSeries + "/";
    }

    /* *************************************
              Get the stock quote
    ************************************** */
    var resp = callAPI(url, stockCode, '?timeseries=100');
    if ((timeSeries == 'daily' && resp['symbol'] == null) || (timeSeries != 'daily' && resp.length == 0)) {
      ui.alert('Error', stockCode + ' is not a valid stock code.', ui.ButtonSet.OK);
    } else {
      var data = resp;
      if (timeSeries == 'daily') {
        data = resp['historical'];
      }

      var title = 'Stock Quote (Time Series: ' + timeSeries + ')';
      generateStockQuote(title, stockCode, data, max);
    }
  }
}

function generateStockQuote(title, stockCode, data, max) {
  // Create a new sheet first
  stockCode = stockCode.toUpperCase();
  createNewSheet(stockCode);
  var minNum = Number.MAX_VALUE;
  var maxNum = 0;
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange('A1').setFontWeight('bold').setFontSize(18).setFontColor('blue').setValue(stockCode);
  // Print out the header for the table
  var headers = [['Date'], ['Low'], ['Open'], ['Close'], ['High']];

  var rowStart = 3;
  sheet.getRange(rowStart, 1, 1, 1).setFontWeight('bold').setValue(title);
  sheet.getRange(rowStart + 1, 1, headers.length, 1).setFontWeight('bold').setValues(headers);
  sheet.autoResizeColumn(1);
  // Print out the financials in table
  var columnIndex = 2;
  for (var i = Math.min(max - 1, data.length - 1); i >= 0; i-- , columnIndex++) {
    var values = [[data[i]['date']], [data[i]['low']], [data[i]['open']], [data[i]['close']], [data[i]['high']]];
    sheet.getRange(rowStart + 1, columnIndex, values.length, 1).setValues(values);

    minNum = Math.min(minNum, data[i]['low'], data[i]['open'], data[i]['close'], data[i]['high']);
    maxNum = Math.max(maxNum, data[i]['low'], data[i]['open'], data[i]['close'], data[i]['high']);

  }

  // Set the format of the cells
  if (data.length > 0) {
    sheet.getRange(rowStart + 2, 2, headers.length - 1, columnIndex - 1).setNumberFormat("$#,##0.00;$(#,##0.00)");
    sheet.autoResizeColumns(2, columnIndex - 1);
  }

  // Build the chart
  var range = sheet.getRange(rowStart + 1, 1, headers.length, max + 1);
  var chart = sheet.newChart()
    .setChartType(Charts.ChartType.CANDLESTICK)
    .setOption('title', title)
    .setOption('hAxis', { title: 'Date' })
    .setOption('width', 1680)
    .setOption('height', 480)
    .setOption('vAxes', { 0: { viewWindow: { min: minNum, max: maxNum } } })
    .addRange(range)
    .setTransposeRowsAndColumns(true)
    .setNumHeaders(1)
    .setPosition(rowStart + values.length + 2, 1, 0, 0)
    .build();

  sheet.insertChart(chart);
}

function createNewSheet(sheetName) {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var newSheet = activeSpreadsheet.getSheetByName(sheetName);

  if (newSheet != null) {
    activeSpreadsheet.deleteSheet(newSheet);
  }

  newSheet = activeSpreadsheet.insertSheet();
  newSheet.setName(sheetName);
  newSheet.activate();
}


function callAPI(url, stock, suffix) {
  var url = url + stock + suffix;
  var response = UrlFetchApp.fetch(url);

  // Parse the JSON reply
  var json = response.getContentText();
  return JSON.parse(json);
}