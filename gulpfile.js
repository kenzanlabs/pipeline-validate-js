'use strict';

var gulp = require('gulp');
var validatePipeline = require('./src/index.js');
var testPipeline = require('pipeline-test-node');

var validateConfig = {
  linter: {
    files: [
      '*.js',
      './src/*.js',
      './test/**/*.js'
    ]
  },
  test: {
    files: [
      '*.js',
      './src/*.js',
      './test/**/*.js',
      '!./test/fixtures/bootstrap.js'
    ]
  }
};

gulp.task('lint', function () {
  return gulp
  .src(validateConfig.linter.files)
  .pipe(validatePipeline.validateJS());
});

gulp.task('test', ['lint'], function () {
  return gulp
  .src(validateConfig.test.files)
  .pipe(testPipeline.test());
});

gulp.task('build', ['test']);
