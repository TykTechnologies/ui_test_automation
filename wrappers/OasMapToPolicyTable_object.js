var Wrapper = require('./Wrapper');
var Input_object = require('./Input_object');
var DropDown_object = require('./DropDown_object');

/**
 * Representing OAS Map Claims/Client ID to Policy table object
 * @class
 */
class OasMapToPolicyTable_object extends Wrapper {
  constructor(selector) {
    super(selector);
    this.element = $(selector);
  }

/**
 * getting count of currently displayed rows.
 * each 'li' type node is counted as separate row
 * @function
 * @return {int}
 */
  getRowCount() {
    return $(this.selector).$$('li').length;
  }

/**
 * getting row from table that includes given cell value
 * @function
 * @param {String} cellValue value of cell to find. For example client id or claim name
 * @returns {Webelement}
 */
  getRowWithValue(cellValue) {
    for (let rowNumber = 0; rowNumber < this.getRowCount(); rowNumber++) {
      let rowElement = $(this.selector).$$('li')[rowNumber]
      if (rowElement.$('input').getAttribute('value') === cellValue)
        return rowElement;
    }
  }

/**
 * checking if row exists, only for VIEW mode
 * @function
 * @param {String} cellValue value of cell to find. For example client id or claim name
 * @returns {boolean}
 */
 checkIfRowExists(cellValue) {
  for (let rowNumber = 0; rowNumber < this.getRowCount(); rowNumber++) {
    let rowElement = $(this.selector).$$('li')[rowNumber]
    if (rowElement.$$('div')[0].getText() === cellValue)
      return true;
    return false;
  }
}

/**
 * getting row from table that in VIEW mode only
 * @function
 * @param {String} cellValue value of cell to find. For example client id or claim name
 * @returns {Webelement}
 */
 getRowWithValueFromSavedTable(cellValue) {
  for (let rowNumber = 0; rowNumber < this.getRowCount(); rowNumber++) {
    let rowElement = $(this.selector).$$('li')[rowNumber]
    if (rowElement.$$('div')[0].getText() === cellValue)
      return rowElement;
  }
}

/**
 * adding new row to the table
 * @function
 * @param {String} cellName value of cell to add. For example client id or claim name
 * @param {String} policyName name of policy to select from dropdown
 */
  addNewMapping(cellName, policyName) {
    let row = this.getRowWithValue('');
    let cellInputField = row.$('input');
    let policyDropdown = row.$('span');
    cellInputField.setValue(cellName);
    this.selectPolicyOption(policyDropdown, policyName);
  }

/**
 * changing cell name inside table for existing row
 * @function
 * @param {String} oldCellName value of cell to be replaced. For example client id or claim name
 * @param {String} newCellName new value of cell to be added. For example client id or claim name
 */
  changeName(oldCellName, newCellName) {
    let row = this.getRowWithValue(oldCellName);
    let cellInputField = row.$('input');
    cellInputField.clearValue();
    cellInputField.setValue(newCellName);
  }

/**
 * changing policy inside table for existing row
 * @function
 * @param {String} cellName value of cell for which policy will be replaced. For example client id or claim name
 * @param {String} policyName name of new policy to select from dropdown
 */
  changePolicy(cellName, policyName) {
    let row = this.getRowWithValue(cellName);
    let policyDropdown = row.$('span');
    this.selectPolicyOption(policyDropdown, policyName);
  }

/**
 * delete row from table for given cell
 * @function
 * @param {String} cellName value of cell for which policy will be replaced. For example client id or claim name
 */
  deleteMapping(cellName) {
    let row = this.getRowWithValue(cellName);
    row.$$('i')[1].click();
  }

/**
 * getting policy name for specific cell name. Used in VIEW mode only
 * @function
 * @param {String} cellName value of cell for which we return policy name. For example client id or claim name
 * @return {String}
 */
 getPolicyValueForCell(cellName) {
    let row = this.getRowWithValueFromSavedTable(cellName);
    return row.$$('div')[3].getText();
}

/**
 * selecting option.
 * function will open dropDown list and click on element with provided text
* @param {Webelement} policyDropdown policy dropdown Webelement to use 
* @param {String} policyName policy name to select from dropdown
 * @function
 */
 selectPolicyOption(policyDropdown, policyName) {
    console.log(`>>> Selecting option: li*=${policyName}`);
    const optionElement = $(`//li[@title="${policyName}"]`);
    policyDropdown.waitForExist();
    policyDropdown.click();
    browser.pause(1000);
    if (optionElement.isClickable()) {
      optionElement.click();
      return;
    }
    policyDropdown.click();
    optionElement.click();
  }

}

module.exports = OasMapToPolicyTable_object;