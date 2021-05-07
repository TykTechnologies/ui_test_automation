var Wrapper = require('./Wrapper');

/**
 * Representing browser dropDown object
 * @class
 */
class DropDown_object extends Wrapper{
  constructor(selector) {
    super(selector);
  }

/**
 * selecting option.
 * function will open dropDown list and click on element with provided text
 * @param {String} option text
 * @function
 */
  selectOption(text) {
    console.log(`>>> Selecting option: ${text} in ${this.selector}`);
    var option = $(`li*=${text}`);
    this.element.waitForExist();
    this.element.click();
    browser.pause(1000);
    if (option.isExisting()) {
      option.click();
      return;
    }
    this.element.click();
    option.click();
  }

/**
 * selecting multiple options.
 * function will open dropDown list and click on element with provided text
 * @param {Array} options array of options to be selected
 * @function
 */
 selectOptions(options) {
  console.log(`>>> Selecting options: ${options} in ${this.selector}`);
  this.element.waitForExist();
  this.element.click();
  browser.pause(1000);
  options.forEach(option => {
    const optionElement = $(`li*=${option}`);
    optionElement.waitForClickable();
    optionElement.click();
  })
  this.element.keys('\uE00C');//sending Escape to close the list
}

/**
 * selecting first option from list.
 * function will open dropDown list and click on first element
 * @function
 */
  selectFirstOption() {
    this.element.click();
    const optionsList = $('.tyk-combobox2__combobox-list');
    optionsList.waitForExist();
    return optionsList.$$('li')[0].click();
  }

  /**
   * inputing String values into mixed Input-Dropdown fields 
   * @param {String} value
   * @function
   */
   setValue(value) {
    const inputField = $(this.selector).$('input');
    if (!inputField.isExisting()) {
      throw 'inputField does not exist on this dropdown'
    }
    inputField.setValue(value);
    inputField.keys("\uE007");    
  }

}

module.exports = DropDown_object;