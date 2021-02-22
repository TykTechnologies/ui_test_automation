/**
 * Representing all browser objects
 * For detailed description please check function at https://webdriver.io/docs/api.html
 * @class
 */
class Wrapper{
  constructor(selector) {
    this.selector = selector;
    this.element = $(selector);
  }

/**
 * Clicking object
 * if button not exists or is not clickable - function will wait
 * @function
 */
  click() {
    $(this.selector).waitForExist();
    $(this.selector).waitForClickable();
    $(this.selector).click();
  }

/**
 * Clicking browser object using js command executed inside browser
 * Could be used when regular $element.click() is not working
 * @function
 */
  jsClick() {
    console.log(`>>> Clicking ${this.element} executing JS command`)
    return browser.execute("arguments[0].click();", this.element);
  }

  /**
 * @function
 */
  waitForExist() {return $(this.selector).waitForExist();}

/**
 * @function
 */
  waitForClickable() { 
    this.waitForExist();
    return $(this.selector).waitForClickable();
  }

/**
 * @function
 */
  getText() {return $(this.selector).getText();}

/**
 * @function
 */
  getValue() {return $(this.selector).getValue();}

/**
 * @function
 */
  waitForDisplayed() {return $(this.selector).waitForDisplayed();}

/**
 * @function
 */
  getAttribute(attributeName) {return $(this.selector).getAttribute(attributeName);}

/**
 * @function
 */
  getCSSProperty(cssProperty) {return $(this.selector).getCSSProperty(cssProperty);}

/**
 * @function
 */
  getSize() {return $(this.selector).getSize();}

/**
 * @function
 */
  isDisplayed() {return $(this.selector).isDisplayed();}

/**
 * @function
 */
  isClickable() {return $(this.selector).isClickable();}

  /**
 * @function
 */
  isFocused() {return $(this.selector).isFocused();}

/**
 * @function
 */
  isExisting() {return $(this.selector).isExisting();}

/**
 * @function
 */
  waitForExist() {return $(this.selector).waitForExist();}

/**
 * @function
 */
  getProperty(property) {return $(this.selector).getProperty(property);}

/**
 * @function
 */
scrollIntoView() {return $(this.selector).scrollIntoView();}

/**
 * @function
 */
waitForEnabled() {return $(this.selector).waitForEnabled();}
}

module.exports = Wrapper;