var Wrapper = require('./Wrapper');

const accordionExpandedState = 'fa-chevron-up';
const accordionCollapsedState = 'fa-chevron-down';
const retryCount = 5;
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
    if (accordionIcon.includes(accordionExpandedState)) {
      console.log('>>> Section was already expanded');
      return
    }
    let i = retryCount;
    while (accordionIcon.includes(accordionCollapsedState) && (i > 0)){
      console.log('>>> clicking to expand')
      $(this.selector).click();
      i-- ;
      browser.pause(1000);
      accordionIcon = $(this.selector).$('i').getAttribute('class');
    }
    if (accordionIcon.includes(accordionCollapsedState)) {
      throw '>>> Was not able to expand section'
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
    if (accordionIcon.includes(accordionCollapsedState)) {
      console.log('>>> Section was already collapsed');
      return
    }
    let i = retryCount;
    while (accordionIcon.includes(accordionExpandedState) && (i > 0)){
      console.log('>>> clicking to collapse')
      $(this.selector).click();
      i--;
      browser.pause(1000);
      accordionIcon = $(this.selector).$('i').getAttribute('class');
    }
    if (accordionIcon.includes(accordionExpandedState)) {
      throw '>>> Was not able to collapse section'
    }
  }

}

module.exports = Accordion_object;