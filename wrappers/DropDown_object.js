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

}

module.exports = DropDown_object;