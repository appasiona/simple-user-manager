module.exports = function (config) {
    config.set({
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        browsers: ['ChromeHeadless'],
        reporters: ['progress', 'coverage', 'junit'],
        coverageReporter: {
            dir: require('path').join(__dirname, 'coverage'),
            subdir: '.',
            reporters: [
                { type: 'html' },
                { type: 'text-summary' }
            ]
        },
        junitReporter: {
            outputDir: 'coverage',
            outputFile: 'test-results.xml',
            useBrowserName: false
        },
        singleRun: true
    });
};  