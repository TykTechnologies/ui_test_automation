var Wrapper = require('./Wrapper');

class Table_object extends Wrapper {
  constructor(selector) {
    super(selector);
    this.element = $(selector);
  }

  getRowCount() {
    return this.element.$('tbody').$$('tr').length;
  }

  getRowaValues(rowNumber) {
    const rowElement = this.element.$('tbody').$$('tr')[rowNumber];
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
    this.element.$('tbody').waitForExist();
    try{
      browser.waitUntil(() => this.element.$('tbody').$$(`.//*[normalize-space() = "${text}"]`).length === 1)
      const cell = this.element.$('tbody').$$(`.//*[normalize-space() = "${text}"]`)[0];
      cell.click();
    }
    catch(e) {
      expect.fail(`Unable to click cell with text: ${text}. ${e}. Number of cells found: ${this.element.$('tbody').$$(`td=${text}`).length}`);
    }

  }

  isCellWithTextNotDisplayed(text) {
    if (!this.element.isExisting())
      return true;
    return this.element.$('tbody').$(`.//*[normalize-space() = "${text}"]`).waitForExist({ reverse: true })
  }

  waitForExist() {return this.element.waitForExist();}
}

module.exports = Table_object;