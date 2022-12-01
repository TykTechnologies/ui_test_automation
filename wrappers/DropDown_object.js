var Wrapper = require('./Wrapper');

/**
 * Representing browser dropDown object
 * @class
 */
class DropDown_object extends Wrapper{
  get selectorTag() {return "select";}
  
  constructor(selector) {
    super(selector);
    if ($(this.selector).isExisting()) {
      this.isDropDownHaveSelectTagName = $(this.selector).getTagName() === this.selectorTag; 
      this.optionTagName =  (this.isDropDownHaveSelectTagName) ? "option" : "li";
      return;
    }
    this.optionTagName = "li";
  }

/**
 * selecting option.
 * function will open dropDown list and click on element equal to provided text or
 * with provided text if equal text option does not exist
 * @param {String} option text
 * @function
 */
 selectOption(text) {
  console.log(`>>> Selecting option: ${this.optionTagName}=${text} in ${this.selector}`);
  let optionElement = $(`${this.optionTagName}=${text}`);
  this.element.waitForExist();
  this.element.click();
  if (!optionElement.isExisting()){
    optionElement = $(`${this.optionTagName}*=${text}`);
  } 
  browser.pause(1000);
  if (optionElement.isClickable()) {
    optionElement.click();
    return;
  }
  this.element.click();
  optionElement.click();
}

/**
 * selecting option in a combobox object.
 * function will click on element equal to provided text or
 * with provided text if equal text option does not exist
 * it does not click the dropdown list
 * @param {String} option text
 * @function
 */
selectComboboxOption(text) {
  console.log(`>>> Selecting option: ${this.optionTagName}=${text} in ${this.selector}`);
  let optionElement = $(`//${this.optionTagName}//span[text()="${text}"]`);
  this.element.waitForExist();  
  if (!optionElement.isExisting()){
    optionElement = $(`${this.optionTagName}*=${text}`);
  }
  browser.pause(1000);
  if (optionElement.isClickable()) {
    optionElement.click();
    return;
  }
  this.element.click();
  optionElement.click();
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
    const optionElement = $(`${this.optionTagName}*=${option}`);
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
    return optionsList.$$(`${this.optionTagName}`)[0].click();
  }

  /**
   * inputing String values into mixed Input-Dropdown fields 
   * @param {String} value
   * @function
   */
   setValue(value) {
    const inputField = $(this.selector).$('input');
    inputField.waitForClickable();
    if (!inputField.isExisting()) {
      throw 'inputField does not exist on this dropdown'
    }
    inputField.setValue(value);
    inputField.keys("\uE007");    
  }

}

module.exports = DropDown_object;