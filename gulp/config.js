'use strict';

var rename = require('gulp-rename');
var gulp = require('gulp');
var ngConstant = require('gulp-ng-constant');
var conf = require('./conf');
var argv = require('yargs').argv;

var serverConfig = require('../../server/config.js');

var allowedEnvs = ['local', 'dev', 'prod', 'testing'];
var env = argv.env || 'local';

if (allowedEnvs.indexOf(env) === -1) {
    throw new Error(`Please provide valid env!
  Given: ${env}
  Supported: ${allowedEnvs.join(',')}
  `);
}

gulp.task('config', function() {
    gulp.src(`${conf.paths.src}/config/${env}.json`)
        .pipe(ngConstant({
            name: 'CONFIG',
            constants: {
                flags: serverConfig.flags
            }
        }))
        .pipe(rename('config.js'))
        .pipe(gulp.dest(`${conf.paths.src}/app/`));
});
