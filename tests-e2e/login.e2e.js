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

describe('form login', function() {
    var btnLoginEl = null;
    var inputEmailEl = null;
    var inputPasswordlEl = null;
    var btnSubmitEl = null;

    var toast = null;
    var div = null;
    var span = null;

    var toastEl = null;

    before(function (done) {
        //this.timeout(timers.angularTimeout);

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

    it('com usuário NÃO cadastrado', function(done) {
        async.series([
            asynTypeForm,
            asyncSubmitAndResult
        ], results);

        function asynTypeForm (next) {
            browser.sleep(timers.clickableSleep);
            btnLoginEl.click()
                .then(function () {
                    inputEmailEl.sendKeys('raul010@hotmail.com');
                    inputPasswordlEl.sendKeys('123456');
                    next();
                });
        }

        function asyncSubmitAndResult (next) {
            browser.sleep(timers.clickableSleep);
            btnSubmitEl.click()
                .then(function () {
                    el.ignoreSyncBlock(function () {
                        browser.sleep(timers.toastSleep);
                        expect(span.getText()).to.eventually.equal(label.validacao.LOGIN_INVALIDO);
                    });
                    next();
                });
        }

        function results (err, result) {
            if (err) {
                console.error(err);
                done(err);
            } else {
                done();
            }
        }
    });

    it('login com sucesso', function(done) {
        //this.timeout(timers.angularTimeout);

        var userModel = new User({
            email: 'raul010@hotmail.com',
            password: '123456',
            confirmaPassword: '123456'
        });

        userModel.save(function (err, user) {
            if (err) {
                throw new Error(err);
            }
        });

        async.series([
            asynTypeForm,
            asyncSubmitAndResult
        ], results);

        function asynTypeForm (next) {
            browser.sleep(timers.clickableSleep);
            btnLoginEl.click()
                .then(function () {
                    inputEmailEl.sendKeys('raul010@hotmail.com');
                    inputPasswordlEl.sendKeys('123456');
                    next();
                });
        }

        function asyncSubmitAndResult (next) {
            browser.sleep(timers.clickableSleep);
            btnSubmitEl.click()
                .then(function () {

                    el.ignoreSyncBlock(function () {
                        browser.sleep(timers.toastSleep);

                        expect(toastEl.isPresent()).to.eventually.be.false;
                    });
                    next();
                });
        }

        function results (err, result) {
            if (err) {
                console.error(err);
                done(err);
            } else {
                done();
            }
        }
    });

    function inicializaTesteAndElementos() {
        browser.ignoreSynchronization = true;
        browser.get('https://localhost:3000');
        
        btnLoginEl = element(by.id('headerButtonLogin'));
        inputEmailEl = element(by.id('loginInputEmail'));
        inputPasswordlEl = element(by.id('loginInputPassword'));
        btnSubmitEl = element(by.id('loginButtonSubmit'));

        toast = element(by.tagName('md-toast'));
        div = toast.element(by.tagName('div'));
        span = div.element(by.tagName('span'));

        toastEl = element(by.tagName('md-toast'));

        browser.ignoreSynchronization = false;
    }
});
