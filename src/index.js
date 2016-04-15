'use strict';

var eslint = require('gulp-eslint');
var fs = require('fs');
var handyman = require('pipeline-handyman');
var lazypipe = require('lazypipe');
var path = require('path');
var _ = require('lodash');

var ESLINT_CONFIG_PATH = './.eslintrc';
var esLintConfig = resolveConfigFile(ESLINT_CONFIG_PATH);

module.exports = {
  validateJS: function (options) {
    if (options) { checkOptions(options); }

    handyman.log('Validading js with ESlint');
    return validateES();
  }
};

function checkOptions(options) {
  var dest = JSON.parse(fs.readFileSync(esLintConfig, 'utf8'));
  var customConfig = {};
  var origin = {};

  if (_.isPlainObject(options)) {
    handyman.log('Parsing Options');
    esLintConfig = handyman.mergeConfig(dest, options);

  } else if (typeof options === 'string') {
    handyman.log('Linting using custom file');

    customConfig = resolveConfigFile(options);
    origin = JSON.parse(fs.readFileSync(customConfig, 'utf8'));
    esLintConfig = handyman.mergeConfig(dest, origin);
  } else {
    handyman.log('** Options not valid **');

    throw new ReferenceError();
  }
}

function resolveConfigFile(fileName) {
  var configFilesPathUser = path.resolve(process.cwd(), fileName);
  var configFilesPathDefault = __dirname.substring(0, __dirname.lastIndexOf('/'));

  configFilesPathDefault = path.resolve(configFilesPathDefault, fileName);

  return existsSync(configFilesPathUser) ? configFilesPathUser : configFilesPathDefault;
}

function existsSync(filename) {
  if (typeof fs.accessSync === 'function') {
    try {
      fs.accessSync(filename);
      handyman.log('Linting using ' + filename);
      return true;
    } catch (error) {
      if (typeof error !== 'object' || error.code !== 'ENOENT') {
        handyman.log('Unable to access ' + filename + ':');
        handyman.log(error.stack);
      }
      return false;
    }
  } else {
    return fs.existsSync(filename);
  }
}

function makePipe() {
  var stream = lazypipe()
    .pipe(eslint, esLintConfig)
    .pipe(eslint.format)
    .pipe(eslint.failOnError);

  return stream();
}

function validateES() {
  var pipeline = makePipe();

  esLintConfig = resolveConfigFile(ESLINT_CONFIG_PATH);

  return pipeline;
}