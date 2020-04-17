
function onOpen(e) {
  console.log("onOpen called from trigger");
  SpreadsheetApp.getUi()
    .createMenu('Turnips')
    .addItem('Calculate Selected Patterns', 'calcPatternForSelection')
    .addToUi();
}

function onEdit(e) {
  if (e.range.getSheet().getName() == "This Week") {
    if (e.range.getColumn() >= 3 && e.range.getColumn() <= 15) {
      calcPatternForRange(e.range);
    }
  }
}
