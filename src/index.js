'use strict';

var eslint = require('gulp-eslint');
var handyman = require('pipeline-handyman');
var lazypipe = require('lazypipe');
var through2 = require('through2');
var pipelineConfigBuilder = require('./pipeline-config-builder');

module.exports = {
  validateJS: function (options) {
    var config;

    handyman.log('Validating js with ESlint');
    config = pipelineConfigBuilder(options);

    return pipelineFactory(config);
  }
};

function pipelineFactory (config) {
  var stream;

  if (typeof config === 'object') {
    stream = lazypipe()
      .pipe(eslint, config)
      .pipe(eslint.format, config.formatter)
      .pipe(function () {
        var failOnError = config.hasOwnProperty('failOnError') && typeof config.failOnError !== 'undefined' ? config.failOnError : true;

        if (failOnError) {
          return eslint.failOnError();
        } else {
          return through2.obj();
        }
      });

    return stream();

  } else {
    handyman.log('Validate error! Config object required');
    return false;

  }
}