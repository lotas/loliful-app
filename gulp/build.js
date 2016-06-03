'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', ['markups'], function() {
    return gulp.src([
            path.join(conf.paths.src, '/app/**/*.html'),
            path.join(conf.paths.tmp, '/serve/app/**/*.html')
        ])
        .pipe($.htmlmin({
            removeEmptyAttributes: true,
            removeAttributeQuotes: true,
            collapseBooleanAttributes: true,
            collapseWhitespace: true
        }))
        .pipe($.angularTemplatecache('templateCacheHtml.js', {
            module: 'loliful',
            root: 'app'
        }))
        .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials'], function() {
    var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), {read: false});
    var partialsInjectOptions = {
        starttag: '<!-- inject:partials -->',
        ignorePath: path.join(conf.paths.tmp, '/partials'),
        addRootSlash: false
    };

    var htmlFilter = $.filter('*.html', {restore: true});
    var jsFilter = $.filter('**/*.js', {restore: true});
    var cssFilter = $.filter('**/*.css', {restore: true});

    return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
        .pipe($.inject(partialsInjectFile, partialsInjectOptions))

        .pipe($.useref())

        .pipe(jsFilter)
        // .pipe($.sourcemaps.init())
        .pipe($.uglify({preserveComments: $.uglifySaveLicense})).on('error', conf.errorHandler('Uglify'))
        .pipe($.rev())
        // .pipe($.sourcemaps.write('maps'))
        .pipe(jsFilter.restore)

        .pipe(cssFilter)
        // .pipe($.sourcemaps.init())
        .pipe($.replace('../fonts/', '../assets/fonts/'))
        .pipe($.cssnano({
            zindex: false
        }))
        .pipe($.rev())
        // .pipe($.sourcemaps.write('maps'))
        .pipe(cssFilter.restore)

        .pipe($.revReplace())

        .pipe(htmlFilter)
        .pipe($.inlineSource({          // inline files
            rootpath: conf.paths.src
        }))

        .pipe($.htmlmin({
            removeEmptyAttributes: true,
            removeAttributeQuotes: true,
            collapseBooleanAttributes: true,
            collapseWhitespace: true
        }))
        .pipe(htmlFilter.restore)

        .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
        .pipe($.size({title: path.join(conf.paths.dist, '/'), showFiles: true}));
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function() {
    return gulp.src($.mainBowerFiles())
        .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe($.flatten())
        .pipe(gulp.dest(path.join(conf.paths.dist, '/assets/fonts/')));
});

var fileFilter = $.filter(function(file) {
    return file.stat.isFile();
});

gulp.task('other', function() {
    return gulp.src([
            path.join(conf.paths.src, '/**/*'),
            path.join('!' + conf.paths.src, '/assets'),
            path.join('!' + conf.paths.src, '/config/*.json'),
            path.join('!' + conf.paths.src, '/**/*.{html,css,js,less,jade}')
        ])
        .pipe(fileFilter)
        .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('favicons', function() {
    return gulp.src([
        path.join(conf.paths.public, '*.{png,xml,ico,json,svg}')
    ])
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('manifest', function() {
    return gulp.src([
        path.join(conf.paths.src, 'manifest.json')
    ])
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

// gulp.task('assets', function() {
//     return gulp.src([
//             path.join(conf.paths.src, '/assets/**/*')
//         ])
//         .pipe(fileFilter)
//         .pipe(gulp.dest(path.join(conf.paths.dist, '/assets')));
// });

gulp.task('clean', function() {
    return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
});

gulp.task('build', ['html', 'fonts', 'other', 'favicons', 'manifest' /*, 'assets'*/]);
