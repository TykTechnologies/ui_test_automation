var Wrapper = require('./Wrapper');

class Input_object extends Wrapper{
  constructor(selector) {
    super(selector);
    this.selector = selector;
  }

  setValue(value) {
    if ($(this.selector).getValue() === '')
      return $(this.selector).setValue(value);
    $(this.selector).doubleClick(); 
    $(this.selector).keys("\uE017"); //sending 'delete'
    return $(this.selector).setValue(value);
  }

}

module.exports = Input_object;