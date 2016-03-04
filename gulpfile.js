'use strict';

var gulp = require('gulp');
var validatePipeline = require('./src/index.js')();
var config = {
  files: [
    '*.js',
    'src/*.js',
    'src/**/*.js'
  ]
};

gulp.task('build', function () {
  return gulp
    .src(config.files)
    .pipe(validatePipeline.validateJS());
});
