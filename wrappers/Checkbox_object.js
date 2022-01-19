var Wrapper = require('./Wrapper');

/**
 * Representing browser Checkbox object
 * @class
 */
class Checkbox_object extends Wrapper{
  constructor(selector) {
    super(selector);
  }

/**
 * selecting checkbox
 * if checkbox is already selected nothing will happen
 * @function
 */
  check() {
    console.log('>>> Checking Checkbox!');
    if (this.isSelected()) 
      return;
    this.element.click();
    browser.pause(1000);
    if (this.element.getAttribute('value') === 'false') 
      this.element.click();
  }

/**
 * unselecting checkbox
 * if checkbox is already unselected nothing will happen
 * @function
 */
   uncheck() {
    console.log('>>> Unchecking Checkbox!');
    if (this.isNotSelected()) 
      return;
    this.element.click();
    browser.pause(1000);
    if (this.element.getAttribute('value') === 'true') 
      this.element.click();
  }

/**
 * checking if checkbox is selected (checked)
 * @function
 * @return {boolean}
 */
  isSelected() {
    return $(this.selector).getValue() === true;
  }

/**
 * checking if checkbox is not selected (unchecked)
 * @function
 * @return {boolean}
 */
     isNotSelected() {
      return $(this.selector).getValue() === false;
    }
    
}

module.exports = Checkbox_object;