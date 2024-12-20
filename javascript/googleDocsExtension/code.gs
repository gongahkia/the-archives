function onOpen() {
  DocumentApp.getUi()
      .createMenu('Custom Menu')
      .addItem('Show Sidebar', 'showSidebar')
      .addToUi();
}

function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
      .setTitle('My Sidebar');
  DocumentApp.getUi().showSidebar(html);
}

function insertText(text) {
  const body = DocumentApp.getActiveDocument().getBody();
  body.appendParagraph(text);
}