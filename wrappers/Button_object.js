var Wrapper = require('./Wrapper');

class Button_object extends Wrapper{
  constructor(selector) {
    super(selector);
    this.selector = selector;
  }

  click() {
    console.log(`>>> CLicking button: ${this.selector}`);
    super.click();
  }

}

module.exports = Button_object;