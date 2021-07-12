/* Google Docs */
/**
 * 
 */
function wordCounts() {
  const ad = DocumentApp.getActiveDocument();
  const body = ad.getBody();
  const text = body.getText();
  const matches = text.toLowerCase().match(/[a-z-]+/g);
  const wordsObject = {};

  matches.forEach(word => {
    if (wordsObject[word]) {
      wordsObject[word] = wordsObject[word] + 1;
    }
    else {
      wordsObject[word] = 1;
    }
  });

  const wordsArray = Object.entries(wordsObject).sort((a, b) => b[1] - a[1]);
  
  return wordsArray;
}