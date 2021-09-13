var Wrapper = require('./Wrapper');

/**
 * Representing table object
 * @class
 */
class Table_object extends Wrapper {
  constructor(selector) {
    super(selector);
    this.element = $(selector);
  }

/**
 * getting count of currently displayed rows.
 * each 'tr' type node is counted as separate row
 * @function
 * @return {int}
 */
  getRowCount() {
    return $(this.selector).$('tbody').$$('tr').length;
  }

/**
 * getting values from n'th row. Return values as map
 * @function
 * @param {int} rowNumber row number 0-indexed
 * @return {String[]}
 */
  getRowValues(rowNumber) {
    return this.getRow(rowNumber).$$('td').map( row => row.getText());
  }

/**
 * getting values from n'th row. Return values as map
 * @function
 * @param {int} rowNumber row number 0-indexed
 * @return {String[]}
 */
  getRow(rowNumber) {
  return $(this.selector).$('tbody').$$('tr')[rowNumber];
  }

/**
 * getting values from first row that includes given value. Return values as map
 * @function
 * @param {String} cellValue value of cell to find. For example user name -> to get values that are in user row
 * @returns {String[]}
 */
  getRowWithValue(cellValue) {
    for (let rowNumber = 0; rowNumber < this.getRowCount(); rowNumber++) {
      let rowValues = this.getRowValues(rowNumber);
      if (rowValues.includes(cellValue))
        return rowValues;
    }
  }

  //TODO:
  isRowWithValuesPreset(...values) {
    values.forEach( value => console.log(value) );
  }

/**
 * finding and clicking cell with provided text
 * @function
 * @param {String} cellValue value of cell to find and click. Foe example text of hyperlink displayed in cell
  */
  clickCellWithText(cellValue) {
    console.log(`>>> Clicking cell with text ${cellValue}`);
    $(this.selector).$('tbody').waitForExist();
    try{
      browser.waitUntil(() => $(this.selector).$('tbody').$$(`.//*[text() = "${cellValue}"]`).length === 1)
      const cell = $(this.selector).$('tbody').$$(`.//*[text() = "${cellValue}"]`)[0];
      cell.click();
    }
    catch(e) {
      expect.fail(`Unable to click cell with text: ${cellValue}. ${e}. Number of cells found: ${$(this.selector).$('tbody').$$(`td=${cellValue}`).length}`);
    }

  }

/**
 * checking if table not contains cell with provided value.
 * Function can be used if we want to check if delete operation was performed correctly
 *  and data are no longer visible in table
 * @function
 * @param {String} cellValue value of cell to find and click. Foe example text of hyperlink displayed in cell
 * @return {boolean}
  */
  isCellWithTextNotDisplayed(text) {
    if ($(this.selector).isExisting())
      return $(this.selector).$('tbody').$(`.//*[normalize-space() = "${text}"]`).waitForExist({ reverse: true });
    return true;
  }

  waitForExist() {return $(this.selector).waitForExist();}
}

module.exports = Table_object;