var path = require('path');

module.exports = (function() {

    // PROJECT PATHS
    function PATH() {
        this.PROJECT_HOME    = '.';
        this.CLIENT          = path.join(this.PROJECT_HOME, '/client');
        this.VIEWS           = path.join(this.CLIENT, '/views');
        // ASSETS
        this.ASSETS          = path.join(this.CLIENT, '/assets');
        this.CSS    = path.join(this.ASSETS,  '/css');
        this.SASS   = path.join(this.CSS, '/_sass');
        this.JS     = path.join(this.ASSETS, '/js');
        this.LIBS   = path.join(this.ASSETS + '/libs');
        // PROJECT BUILD
        this.BUILD_HOME     = '../melhoreme-build';
        this.BUILD_CLIENT   = path.join(this.BUILD_HOME, '/client');
        this.BUILD_ASSETS   = path.join(this.BUILD_CLIENT, '/assets');
        this.BUILD_TEMP     = path.join(this.BUILD_HOME, '/temp');

        // BUILD ASSETS
        this.BUILD_CSS  = path.join(this.BUILD_ASSETS, '/css');
        this.BUILD_JS   = path.join(this.BUILD_ASSETS, '/js');

    };

    var PATH = new PATH();

    process.env.PROJECT_HOME    = PATH.PROJECT_HOME;
    process.env.CLIENT          = PATH.CLIENT;
    process.env.VIEWS           = PATH.VIEWS;
    // ASSETS
    process.env.ASSETS      = PATH.ASSETS;
    process.env.CSS         = PATH.CSS;
    process.env.SASS        = PATH.SASS;
    process.env.JS          = PATH.JS;
    process.env.LIBS        = PATH.LIBS;
    // PROJECT BUILD
    process.env.BUILD_HOME     = PATH.BUILD_HOME;
    process.env.BUILD_CLIENT   = PATH.BUILD_CLIENT;
    process.env.BUILD_ASSETS   = PATH.BUILD_ASSETS;
    process.env.BUILD_TEMP     = PATH.BUILD_TEMP;

    // BUILD ASSETS
    process.env.BUILD_CSS  = PATH.BUILD_CSS;
    process.env.BUILD_JS   = PATH.BUILD_JS;

})();

