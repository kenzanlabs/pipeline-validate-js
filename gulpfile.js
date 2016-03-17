'use strict';

var gulp = require('gulp'),
    validatePipeline = require('./src/index.js'),
    config = {
      files : [
        '*.js',
        './src/*.js',
        './src/**/*.js'
      ]
    };

gulp.task('build', function() {
  return gulp
    .src(config.files)
    .pipe(validatePipeline.validateJS('.eslintrc2'));
});
