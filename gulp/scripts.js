'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
var webpack = require('webpack-stream');

var $ = require('gulp-load-plugins')();

function webpackWrapper(watch, test, callback) {
    var webpackOptions = {
        quiet: false,
        watch: watch,
        module: {
            preLoaders: [{
                test: /\.js$/,
                exclude: /(node_modules|lb.services.js|bower_components)/,
                loader: 'eslint-loader'
            }],
            loaders: [{
                test: /\.js$/,
                exclude: /(node_modules|lb.services.js|bower_components)/,
                loaders: ['ng-annotate', 'babel-loader?presets[]=es2015&plugins[]=transform-runtime']
            }]
        },
        output: {filename: 'index.module.js'}
    };

    if (watch) {
        webpackOptions.devtool = 'inline-source-map';
    }

    var webpackChangeHandler = function(err, stats) {
        let options = {
            colors: true
        };

        if (err) {
            conf.errorHandler('Webpack')(err);

            if (stats.hasErrors()) {
                options = {
                    colors: true,
                    hash: false,
                    version: false,
                    timings: false,
                    assets: false,
                    chunks: false,
                    chunkModules: false,
                    modules: false,
                    children: false,
                    cached: false,
                    reasons: false,
                    source: false,
                    errorDetails: true,
                    chunkOrigins: false
                };
            }
            console.log(stats.toString(options));
        }
        $.util.log(stats.toString({
            colors: $.util.colors.supportsColor,
            chunks: false,
            hash: false,
            version: false
        }));
        browserSync.reload();
        if (watch) {
            watch = false;
            callback();
        }
    };

    var sources = [path.join(conf.paths.src, '/app/index.module.js')];
    if (test) {
        sources.push(path.join(conf.paths.src, '/app/**/*.spec.js'));
    }

    return gulp.src(sources)
        .pipe(webpack(webpackOptions, null, webpackChangeHandler))
        .on('error', err => {
            console.log('err');
            console.error(err.message);
        })
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app')));
}

gulp.task('scripts', function() {
    return webpackWrapper(false, false);
});

gulp.task('scripts:watch', ['scripts'], function(callback) {
    return webpackWrapper(true, false, callback);
});

gulp.task('scripts:test', function() {
    return webpackWrapper(false, true);
});

gulp.task('scripts:test-watch', ['scripts'], function(callback) {
    return webpackWrapper(true, true, callback);
});
