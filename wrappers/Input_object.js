var Wrapper = require('./Wrapper');

/**
 * Representing browser input object
 * @class
 */
class Input_object extends Wrapper{
  constructor(selector) {
    super(selector);
    this.selector = selector;
  }

/**
 * setting value of input field.
 * if field contains any value -> it will be replaced
 * @param {String} value text
 * @function
 */
  setValue(value) {
    $(this.selector).clearValue();
    console.log(`>>> Setting value ${value} in ${this.selector}`);
    if ($(this.selector).getValue() === '')
      return $(this.selector).setValue(value);
    $(this.selector).click();
    this.clear();
    //clearing once more if needed
    if ($(this.selector).getValue() !== '') {
      browser.pause(1000);
      this.clear();
    }
    return $(this.selector).setValue(value);
  }

  clear() {
    //preparing CTRL/COMMAND key code depending on system
    const CTRL_KEY =  (process.platform == 'darwin') ? '\uE03D' : '\uE009'; 
    $(this.selector).keys([CTRL_KEY, 'a']);
    $(this.selector).keys("\uE017"); //sending 'delete'
    if ($(this.selector).getValue() !== '')
      console.warn(`>>> Field was not cleared. Current value: ${$(this.selector).getValue()}`);
  }

/**
 * @function
 */
  clearValue() {return $(this.selector).clearValue();}

}

module.exports = Input_object;