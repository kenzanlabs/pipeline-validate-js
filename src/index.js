'use strict';

var eslint = require('gulp-eslint');
var fs = require('fs');
var handyman = require('pipeline-handyman');
var lazypipe = require('lazypipe');
var path = require('path');

var esLintConfig = resolveConfigFile('.eslintrc');

module.exports = {
  validateJS: function (options) {
    if (options) {checkOptions(options);}
    handyman.log('Validading js with ESlint');

    return validateES();
  }
};

function checkOptions(options) {
  var dest = JSON.parse(fs.readFileSync(esLintConfig, 'utf8'));
  var customConfig = {};
  var origin = {};

  if (options && isObj(options)) {
    esLintConfig = handyman.mergeConfig(dest, options);
  } else if (options && typeof options === 'string') {
    customConfig = resolveConfigFile(options);
    origin = JSON.parse(fs.readFileSync(customConfig, 'utf8'));
    esLintConfig = handyman.mergeConfig(dest, origin);
  } else {
    handyman.log('** Options not valid **');
  }
}

function isObj(entry) {
  if (typeof entry === 'object' && !Array.isArray(entry)) {
    handyman.log('Custom configuration being applied');
    return true;
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

function validateES() {
  var stream = lazypipe()
    .pipe(eslint, esLintConfig)
    .pipe(eslint.format)
    .pipe(eslint.failOnError);

  return stream();
}