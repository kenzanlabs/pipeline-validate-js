'use strict';

var gulp = require('gulp');
var validatePipeline = require('./src/index.js');
var testPipeline = require('pipeline-test-node');

var config = {
  plugins: {
    istanbul: {
      includeUntested: true,
      writeReports: {
        reporters: ['html']
      },
      thresholds: {
        global: 75
      }
    }
  }
}

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

gulp.task('lint', function() {
  return gulp
    .src(validateConfig.linter.files)
    .pipe(validatePipeline.validateJS());
});

gulp.task('build', ['lint'], function() {
  return gulp
    .src(validateConfig.test.files)
    .pipe(testPipeline.test(config));
});
