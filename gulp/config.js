export default {

    browserPort: 3000,
    UIPort: 3001,
    testPort: 3002,

    sourceDir: './app/',
    buildDir: './build/',

    // styles: {
    //     src: [
    //         'app/styles/**/*.css',
    //         'node_modules/**/*.scss',
    //         'node_modules/**/*.less'
    //     ],
    //     dest: 'build/css',
    //     prodSourcemap: false,
    //     sassIncludePaths: []
    // },

    styles: {
        src: [
            'app/styles/**/*.scss',
            'app/styles/**/*.css'
        ],
        dest: 'build/css',
        prodSourcemap: false,
        sassIncludePaths: []
    },

    scripts: {
        src: 'app/js/**/*.js',
        dest: 'build/js',
        test: 'test/**/*.js',
        gulp: 'gulp/**/*.js'
    },

    images: {
        src: 'app/images/**/*',
        dest: 'build/images'
    },

    pages: {
        src: 'app/*.html',
        dest: 'build/'
    },

    fonts: {
        src: ['app/fonts/**/*'],
        dest: 'build/fonts'
    },

    assetExtensions: [
        'js',
        'css',
        'png',
        'jpe?g',
        'gif',
        'svg',
        'eot',
        'otf',
        'ttc',
        'ttf',
        'woff2?'
    ],

    views: {
        index: 'app/index.html',
        src: [
            'app/views/**/*.html',
            'app/**/*.html',
        ],
        dest: 'app/js'
    },

    gzip: {
        src: 'build/**/*.{html,xml,json,css,js,js.map,css.map}',
        dest: 'build/',
        options: {}
    },

    browserify: {
        bundleName: 'main.js',
        prodSourcemap: false
    },

    test: {
        karma: 'test/karma.conf.js',
        protractor: 'test/protractor.conf.js'
    },

    init: function() {
        this.views.watch = [
            this.views.index,
            this.views.src
        ];

        return this;
    }

}.init();