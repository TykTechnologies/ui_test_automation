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

  waitForDisplayed() {return $(this.selector).waitForDisplayed();}

  getAttribute() {return $(this.selector).getAttribute();}

  getCSSProperty() {return $(this.selector).getCSSProperty();}

  getSize() {return $(this.selector).getSize();}

  isDisplayed() {return $(this.selector).isDisplayed();}

  isExisting() {return $(this.selector).isExisting();}

  waitForExist() {return $(this.selector).waitForExist();}
}

module.exports = Wrapper;