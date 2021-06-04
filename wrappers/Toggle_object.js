var Wrapper = require('./Wrapper');

const containerClass = 'tyk-toggle__item';
const selectedToggleClass = 'tyk-toggle__item--active';
/**
 * Representing browser Toggle object
 * @class
 */
class Toggle_object extends Wrapper{
  constructor(selector) {
    super(selector);
    this.selector = selector;
  }

/**
 * Clicking Toggle object
 * if Toggle not exists or is not clickable - function will wait
 * @function
 */
  click() {
    console.log(`>>> Clicking toggle: ${this.selector}`);
    const clickableElement = this.getContainer().$('.tyk-toggle__item-notch');
    clickableElement.waitForClickable();
    clickableElement.click();
  }

  /**
 * Checking if toggle is selected
 * if Toggle is selected return true
 * @return {boolean}
 * @function
 */
  isSelected() {
    return this.getContainer().getAttribute('class').includes(selectedToggleClass);
  }

  getContainer() {
    let currentElement = $(this.selector);
    for (let levelsUp = 1; levelsUp <= 6; levelsUp++) {
      currentElement = currentElement.parentElement();
      const currentElementClass = currentElement.getAttribute('class');
      if (currentElementClass !== null && currentElementClass.includes(containerClass))
        return currentElement;
    }
    throw new Error('Unable to find container for toggle: ' + this.selector);
  }

}

module.exports = Toggle_object;