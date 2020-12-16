class Wrapper{
  constructor(selector) {
    this.selector = selector;
    this.element = $(selector);
  }

  click() {
    $(this.selector).waitForExist();
    $(this.selector).waitForClickable();
    $(this.selector).click();
  }

  waitForExist() {return this.element.waitForExist();}

  waitForClickable() { 
    this.waitForExist();
    return this.element.waitForClickable();
  }

  getText() {return $(this.selector).getText();}
}

module.exports = Wrapper;