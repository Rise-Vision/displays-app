/**
 * Usage: wait(element, label)
 * element : It will wait for this element to come into view
 * label : just used for the error message
 */
var wait = function (element, label) {
  return browser.wait(function () {
    return element.isPresent().then(function (state) {
      if (state == true) {
        return element.isDisplayed().then(function (state2) {
          if (state2 == true){
            return element.isEnabled().then(function (state3){
              return state3 == true;
            });
          }
        });
      } else {
        return false;
      }
    });
  }, 10000, label + " did not appear");
  //browser.sleep(250);
};
exports.wait = wait;