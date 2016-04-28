/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';

var gulp = require('gulp');
var fs = require('fs');
var path = require('path');

var normalizedPath = path.join(__dirname, 'gulp');

fs.readdirSync(normalizedPath).forEach(function(file) {
    if (file.endsWith('.js')) {
        require('./gulp/' + file);
    }
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
