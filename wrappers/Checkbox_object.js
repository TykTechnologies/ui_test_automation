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
 * if checkbox is already selected nothing will happend 
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
 * checking if checkbox is selected (checked)
 * @function
 * @return {boolean}
 */
  isSelected() {
    return $(this.selector).getValue() === true;
  }
    
}

module.exports = Checkbox_object;