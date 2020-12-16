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

  waitForExist() {return $(selector).waitForExist();}

  waitForClickable() { 
    this.waitForExist();
    return $(selector).waitForClickable();
  }

  getText() {return $(this.selector).getText();}
}

module.exports = Wrapper;