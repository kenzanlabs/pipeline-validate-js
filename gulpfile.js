'use strict';

var gulp = require('gulp');
var testPipeline = require('pipeline-test-node')();
var validatePipeline = require('./src/index.js');
var config = {
  lint:{
    files: [
      '*.js',
      './src/*.js',
      './src/**/*.js'
    ],
    rules: {
        'consistent-this': 0,
        'new-cap': 0,
        'no-cond-assign': 0,
        'newline-per-chained-call': 0,
        'semi': [1, 'always']
      }
  },
  test:{
    files:[
      '*.js',
      './src/*.js',
      './src/**/*.js',
      '!./src/bootstrap_linted.js'
    ],
    plugins: {
      mocha: {
        reporter: 'dot'
      },
      istanbul: {
        reporters: ['text-summary'],
        thresholds: {
          global: 0
        }
      }
    }
  }


};


gulp.task('test', function() {
  return gulp
    .src(config.test.files)
    .pipe(testPipeline.test());
});

gulp.task('build', ['test'], function() {
  return gulp
    .src(config.lint.files)
    .pipe(validatePipeline.validateJS());
});
