var Wrapper = require('./Wrapper');

/**
 * Representing browser Accordion object
 * @class
 */
class Accordion_object extends Wrapper{
  constructor(selector) {
    super(selector);
  }

/**
 * expanding section.
 * function will expand section by clicking on accordion icon.
 * @param {String} option text
 * @function
 */
  expand() {
    console.log(`>>> Expand section`);
    var accordionIcon = $(this.selector).$('i').getAttribute('class');
    if (accordionIcon.includes('fa-chevron-up')) {
      console.log('>>> Section was already expanded');
      return
    }
    $(this.selector).click();
    browser.pause(1000);
    if (accordionIcon.includes('fa-chevron-up')) {
      console.log('>>> Section was expanded');
      return
    }
    throw 'Was not able to expand section';
  }

/**
 * collapsing seciton.
 * function will collaps section by clicking on accordion icon
 * @param {Array} options array of options to be selected
 * @function
 */
  collapse() {
    console.log(`>>> Collapse section`);
    var accordionIcon = $(this.selector).$('i').getAttribute('class');
    if (accordionIcon.includes('fa-chevron-down')) {
      console.log('>>> Section was already collapsed');
      return
    }
    $(this.selector).click();
    browser.pause(1000);
    if (accordionIcon.includes('fa-chevron-down')) {
      console.log('>>> Section was collapsed');
      return
    }
    throw 'Was not able to collapse section';
  }

}

module.exports = Accordion_object;