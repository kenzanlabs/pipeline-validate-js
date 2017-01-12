'use strict';

var eslint = require('gulp-eslint');
var fs = require('fs');
var handyman = require('pipeline-handyman');
var lazypipe = require('lazypipe');
var path = require('path');
var _ = require('lodash');
var through2 = require('through2');

var ESLINT_DEFAULT_CONFIG_PATH = 'node_modules/pipeline-validate-js/.eslintrc';
var ESLINT_ROOT_CONFIG_PATH = '.eslintrc';

module.exports = {
  validateJS: function (options) {
    var config;

    handyman.log('Validating js with ESlint');
    config = checkLocalLintFile(options);

    return pipelineFactory(config);
  }
};

function checkLocalLintFile (options) {
  var config = {};
  var defaultPath = path.join(process.cwd(), ESLINT_DEFAULT_CONFIG_PATH);
  var rootPath = path.join(process.cwd(), ESLINT_ROOT_CONFIG_PATH);
  var customConfig;

  try {
    handyman.log('Linting using default path: ' + defaultPath);
    config = JSON.parse(fs.readFileSync(defaultPath, 'utf-8'));

  } catch (ex) {
    handyman.log(String(ex));

  }

  if (options) {

    if (typeof options === 'string') {
      customConfig = fs.readFileSync(options, 'utf-8');
      handyman.log('Linting using custom path: ' + options);
      config = handyman.mergeConfig(config, JSON.parse(customConfig));
      handyman.log('Linting using custom file');

    } else if (_.isPlainObject(options)) {
      handyman.log('Parsing Options');
      config = handyman.mergeConfig(config, options);

    } else {
      handyman.log('** Options not valid **');
      throw new ReferenceError();

    }
  } else {

    try {
      customConfig = fs.readFileSync(rootPath, 'utf-8');
      handyman.log('Linting using root path: ' + rootPath);
      config = handyman.mergeConfig(config, customConfig);

    } catch (ex) {
      // no op.
    }

  }

  return config;
}

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
