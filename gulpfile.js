'use strict';

var gulp = require('gulp');
var validatePipeline = require('./src/index.js');

var validateConfig = {
  files: [
    '*.js',
    './src/*.js',
    './test/**/*.js'
  ],
  rules: {}
};

gulp.task('lint', function() {
  return gulp
    .src(validateConfig.files)
    .pipe(validatePipeline.validateJS(validateConfig.rules));
});

gulp.task('build', ['lint']);