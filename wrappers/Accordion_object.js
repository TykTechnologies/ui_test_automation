var Wrapper = require('./Wrapper');

/**
 * Representing browser Accordion object
 * @class
 */
class Accordion_object extends Wrapper{
  constructor(selector) {
    super(selector);
    this.selector = selector;
  }

/**
 * expanding section.
 * function will expand section by clicking on accordion icon.
 * @function
 */
  expand() {
    console.log(`>>> Trying to expand section`);
    let accordionIcon = $(this.selector).$('i').getAttribute('class');
    console.log(accordionIcon);
    if (accordionIcon.includes('fa-chevron-up')) {
      console.log('>>> Section was already expanded');
      return
    }
    let i = 1;
    while (accordionIcon.includes('fa-chevron-down')){
      console.log('>>> clicking to expand')
      $(this.selector).click();
      i++ ;
      browser.pause(1000);
      accordionIcon = $(this.selector).$('i').getAttribute('class');
      if (i == 5) {
        throw "Failed to expand section"
      }
    }
  }

/**
 * collapsing seciton.
 * function will collaps section by clicking on accordion icon
 * @function
 */
  collapse() {
    console.log(`>>> Trying to collapse section`);
    let accordionIcon = $(this.selector).$('i').getAttribute('class');
    console.log(accordionIcon);
    if (accordionIcon.includes('fa-chevron-down')) {
      console.log('>>> Section was already collapsed');
      return
    }
    let i = 1;
    while (accordionIcon.includes('fa-chevron-up')){
      console.log('>>> clicking to collapse')
      $(this.selector).click();
      i++;
      browser.pause(1000);
      accordionIcon = $(this.selector).$('i').getAttribute('class');
      if (i == 5) {
        throw "Failed to colapse section"
      }
    }
  }

}

module.exports = Accordion_object;