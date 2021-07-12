/* Google Docs */
/**
 * 
 */
function openSidebar() {
  const htmlTemplate = HtmlService.createTemplateFromFile("WordCountTemplate");
  const htmlOutput = htmlTemplate.evaluate();
  htmlOutput.setTitle("Word Counts App");
  const ui = DocumentApp.getUi();

  ui.showSidebar(htmlOutput);
}

function createMenu() {
  const ui = DocumentApp.getUi();
  const menu = ui.createMenu("Counter");

  menu.addItem("Words Count", "openSidebar");
  menu.addToUi();
}

function onOpen() {
  createMenu();
}