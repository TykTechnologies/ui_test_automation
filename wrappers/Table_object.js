var Wrapper = require('./Wrapper');

class Table_object extends Wrapper {
  constructor(selector) {
    super(selector);
    this.element = $(selector);
  }

  getRowCount() {
    return $(selector).$('tbody').$$('tr').length;
  }

  getRowaValues(rowNumber) {
    const rowElement = $(selector).$('tbody').$$('tr')[rowNumber];
    return rowElement.$$('td').map( row => row.getText());
  }

  getRowWithValue(cellValue) {
    for (let rowNumber = 0; rowNumber < this.getRowCount(); rowNumber++) {
      let rowValues = this.getRowaValues(rowNumber);
      if (rowValues.includes(cellValue))
        return rowValues;
    }
  }
  //TODO:
  isRowWithValuesPreset(...values) {
    values.forEach( value => console.log(value) );
  }

  clickCellWithText(text) {
    console.log(`>>> Clicking cell with text ${text}`);
    $(this.selector).$('tbody').waitForExist();
    try{
      browser.waitUntil(() => $(this.selector).$('tbody').$$(`.//*[text() = "${text}"]`).length === 1)
      const cell = $(this.selector).$('tbody').$$(`.//*[text() = "${text}"]`)[0];
      cell.click();
    }
    catch(e) {
      expect.fail(`Unable to click cell with text: ${text}. ${e}. Number of cells found: ${$(this.selector).$('tbody').$$(`td=${text}`).length}`);
    }

  }

  isCellWithTextNotDisplayed(text) {
    if ($(this.selector).isExisting())
      return $(this.selector).$('tbody').$(`.//*[normalize-space() = "${text}"]`).waitForExist({ reverse: true });
    return true;
  }

  waitForExist() {return $(this.selector).waitForExist();}
}

module.exports = Table_object;