var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('angularjs test', function() {
    this.timeout(15000);

    beforeEach(function() {
        browser.get('https://localhost:83');
    });
    // Nao remover o parametro
    it('it test', function() {

        var testElem = element(by.id('test'));

        expect(testElem.getText()).to.eventually.equal('oioi');

    });
});