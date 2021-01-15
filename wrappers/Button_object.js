var Wrapper = require('./Wrapper');

/**
 * Representing browser Button object
 * @class
 */
class Button_object extends Wrapper{
  constructor(selector) {
    super(selector);
    this.selector = selector;
  }

/**
 * Clicking Button object
 * if button not exists or is not clickable - function will wait
 * @function
 */
  click() {
    console.log(`>>> Clicking button: ${this.selector}`);
    super.click();
  }

}

module.exports = Button_object;