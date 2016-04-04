var async = require('async');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

var User = require('../server/models/User');
var label = require('../server/util/label');
var el = require('./util/el');
var mongoDb = require('./util/mongo-db');
var timers = require('./util/timers');

describe('form signup', function() {
    var btnLoginEl = null;
    var btnCadComEmailEl = null;

    var inputEmailEl = null;
    var inputPasswordEl = null;
    var inputConfirmPasswordEl = null;
    var btnSubmitEl = null;

    var toastEl = null;


    before(function (done) {
        mongoDb.connection.get();
        done();
    });

    after(function (done) {
        mongoDb.model.removeAll(User);
        done();
    });

    beforeEach(function (done) {
        mongoDb.model.removeAll(User);

        inicializaTesteAndElementos();
        done();
    });

    afterEach(function (done) {
        mongoDb.model.removeAll(User);
        done();
    });

    it('válido', function (done) {
        //this.timeout(timers.angularTimeout);

        async.series([
                asyncOpenSignupForm,
                asyncTypeForm,
                asyncSubmitForm
        ], results);

        function asyncOpenSignupForm (next) {
            browser.sleep(timers.clickableSleep);
            btnLoginEl.click().then(function () {
                next();
            });

        }

        function asyncTypeForm (next) {
            browser.sleep(timers.clickableSleep);
            btnCadComEmailEl.click()
                .then(function () {

                    inputEmailEl.sendKeys('raul010@hotmail.com');
                    inputPasswordEl.sendKeys('123456');
                    inputConfirmPasswordEl.sendKeys('123456');

                    browser.sleep(timers.clickableSleep);
                    btnSubmitEl.click().then(function () {
                        next();
                    });
                });
        }

        function asyncSubmitForm (next) {
            browser.sleep(timers.toastSleep);

            browser.ignoreSynchronization = true;

            expect(toastEl.isPresent()).to.eventually.be.false;

            browser.ignoreSynchronization = false;
            next();
        }

        function results (err, result) {
            if (err) {
                console.error(err);
                return done(err);
            }
            done();
        }
    });

    function inicializaTesteAndElementos(done) {
        browser.ignoreSynchronization = true;
        browser.get('https://localhost:3000');

        btnLoginEl = element(by.id('headerButtonLogin'));
        btnCadComEmailEl = element(by.id('loginButtonCadComEmail'));

        inputEmailEl = element(by.id('signupInputEmail'));
        inputPasswordEl = element(by.id('signupInputPassword'));
        inputConfirmPasswordEl = element(by.id('signupInputConfirmPassword'));
        btnSubmitEl = element(by.id('signupButtonSubmit'));

        toastEl = element(by.tagName('md-toast'));

        browser.ignoreSynchronization = false;
    }
});
