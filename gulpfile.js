'use strict';

var gulp = require('gulp');
<<<<<<< HEAD
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
=======
var validatePipeline = require('./src/index.js');
//var testPipeline = require('pipeline-test-node')({ plugins: {
//  mocha: {
//    reporter: 'spec'
//  },
//  istanbul: {
//    reporters: ['text-summary'],
//    thresholds: {
//      global: 0
//    }
//  }
//}});

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
>>>>>>> 9f61d5728960b436cfe33bb3f21ea79f579d7967
});

gulp.task('build', ['lint'], function() {
  //return gulp
  //  .src(['test/**/*.spec.js'], { read: false })
  //  .pipe(testPipeline.test());
});