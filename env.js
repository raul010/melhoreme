var path = require('path');

module.exports = (function() {

    // PROJECT PATHS
    function PATH() {
        // DETAILS
        process.env.PROJECT_FOLDER_NAME = this.PROJECT_FOLDER_NAME = 'melhoreme';

        // SOURCE_PATHS (unicos sem comecar sem /)
        process.env.CLIENT  = this.CLIENT   = 'client';
        process.env.SERVER  = this.SERVER   = 'server';
        process.env.TESTS   = this.TESTS    = 'test';
        process.env.BIN     = this.BIN      = '.bin';

        // BACKUP (folder in a level back)
        process.env.BACKUP_FOLDER = this.BACKUP_FOLDER = '..' + '/back_' +this.PROJECT_FOLDER_NAME;

        // CLIENT
        process.env.APP             = this.APP          = path.join(this.CLIENT, '/app');
        process.env.ASSETS          = this.ASSETS       = path.join(this.CLIENT, '/assets');
        process.env.VIEWS           = this.VIEWS        = path.join(this.CLIENT, '/views');

        //CONFIG
        process.env.GULP            = this.GULP         = path.join(this.BIN, '/gulp');

        // APP (Client)
        process.env.CONTROLLERS     = this.CONTROLLERS  = path.join(this.APP, '/controllers');
        process.env.SERVICES        = this.SERVICES     = path.join(this.APP, '/services');
        process.env.DIRECTIVES      = this.DIRECTIVES   = path.join(this.APP, '/directives');
        process.env.TEMPLATES       = this.TEMPLATES    = path.join(this.APP, '/templates');

        // ASSETS
        process.env.CSS             = this.CSS          = path.join(this.ASSETS,  '/css');
        process.env.SASS            = this.SASS         = path.join(this.CSS, '/_sass');
        //process.env.JS              = this.JS           = path.join(this.ASSETS, '/js');
        process.env.LIBS            = this.LIBS         = path.join(this.ASSETS + '/libs');


        // BUILD ROOT
        process.env.BUILD_HOME      = this.BUILD_HOME   = '../melhoreme-build';
        process.env.BUILD_TEMP      = this.BUILD_TEMP   = path.join(this.BUILD_HOME, '/temp');
        process.env.BUILD_CLIENT    = this.BUILD_CLIENT = path.join(this.BUILD_HOME, '/client');

        // BUILD CLIENT
        process.env.BUILD_APP       = this.BUILD_APP    = path.join(this.BUILD_CLIENT, '/app');
        process.env.BUILD_ASSETS    = this.BUILD_ASSETS = path.join(this.BUILD_CLIENT, '/assets');

        // BUILD APP (Client)
        process.env.BUILD_CONTROLLERS  = this.BUILD_CONTROLLERS  = path.join(this.BUILD_APP, '/controllers');
        process.env.BUILD_SERVICES     = this.BUILD_SERVICES     = path.join(this.BUILD_APP, '/services');

        // BUILD ASSETS
        process.env.BUILD_CSS       = this.BUILD_CSS    = path.join(this.BUILD_ASSETS, '/css');
        process.env.BUILD_JS        = this.BUILD_JS     = path.join(this.BUILD_ASSETS, '/js');

        // MONGOOSE
        process.env.MONGOOSE_URI    = 'mongodb://localhost/melhoreme?authSource=melhoreme';
        process.env.MONGOOSE_USER   = 'raul';
        process.env.MONGOOSE_PASS   = 'ra1234ul';

        // MONGOOSE TEST
        process.env.MONGOOSE_URI_TEST    = 'mongodb://localhost/melhoreme-test?authSource=melhoreme-test';
        process.env.MONGOOSE_USER_TEST   = 'raul-test';
        process.env.MONGOOSE_PASS_TEST   = 'ra1234ul';

        // Auth
        process.env.TOKEN_SECRET    = '2rBt+X8[X-Y!aa4L}f[VY6TGUCT;y]';
        process.env.FACEBOOK_SECRET = 'e0b410e60473a65f6514f897916a6c67';
        process.env.GITHUB_SECRET   = '2d0531e392fd557b44abfc14d536905df52608e9';

        //EMAIL
        process.env.EMAIL_USER        = 'emaildetestemelhoreme@gmail.com';
        process.env.EMAIL_PASSWORD    = 'ra1234ul';

        // Secret Captcha
        process.env.CAPTCHA_SECRET_KEY    = '6Ld2EhgTAAAAAPSY0Jf96mksCrq7igbdI_R7u9tf';

        // fim

    };

    new PATH();

})();

