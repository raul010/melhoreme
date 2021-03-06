exports.config = {
    framework: 'mocha',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
        './tests-e2e/**/*.e2e.js'
    ],
    onPrepare: function() {
        browser.manage().window().setSize(1300, 700);
        browser.executeScript('window.scrollTo(0,10000);');

    },

    capabilities : {
        browserName : 'chrome',
        'chromeOptions': {
            args: ['--no-sandbox']
        }
    },

    mochaOpts: {
        reporter: 'spec',
        timeout: 50000
    }
};
