/**
 * Sobreescreve o metodo click, do elemento para solucionar:
 * UnknownError: unknown error: Element is not clickable at point (916, 32).
 * @param {Object} element
 */
var ovewriteClickMethod = function ovewriteClickMethod (element) {
    element.click = function () {
        return browser.actions().mouseMove(this).perform();
    };
};

/**
 *
 * @param {ElementFinder} elem
 * @param {Function} browser
 * @returns {Element} proct
 * @param {Number} [time]
 */
var waitElementToBeClickable = function waitElementToBeClickable(elem, browser, proct, time) {
    var EC = proct.ExpectedConditions;
    return browser.wait(EC.elementToBeClickable(elem), time || 50000);
};

/**
 * @param {Function} fn - Callback
 */
var ignoreSyncBlock = function ignoreSyncBlock(fn) {
    browser.ignoreSynchronization = true;
    fn();
    browser.ignoreSynchronization = false;
};

module.exports = {
    ovewriteClickMethod: ovewriteClickMethod,
    waitElementToBeClickable: waitElementToBeClickable,
    ignoreSyncBlock: ignoreSyncBlock
};
