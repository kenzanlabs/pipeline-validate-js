'use strict';

var eslint = require('gulp-eslint');
var fs = require('fs');
var handyman = require('pipeline-handyman');
var lazypipe = require('lazypipe');
var path = require('path');
var _ = require('lodash');

var NODE_MODULES_PATH = 'node_modules/pipeline-validate-js/.eslintrc';

module.exports = {
  validateJS: function (options) {
    var config = checkLocalLintFile(options);

    handyman.log('Validading js with ESlint');
    return pipelineFactory(config);
  }
};

function checkLocalLintFile(options) {
  var config = {};
  var defaultPath = path.join(process.cwd(), NODE_MODULES_PATH);
  var rootPath = path.join(process.cwd(), '.eslintrc');
  var customConfig;

  try {
    handyman.log('Linting using default path: ' + defaultPath);
    config = JSON.parse(fs.readFileSync(defaultPath, 'utf-8'));

  } catch (ex) {
    // no op.

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

function pipelineFactory(config) {
  var stream;

  if (typeof config === 'undefined') {
    handyman.log('Validate error! Config object required');
    return false;

  } else {
    stream = lazypipe()
        .pipe(eslint.format)
        .pipe(eslint, config)
        .pipe(eslint.failOnError);

    return stream();

  }
}