'use strict';

var plugins = require('gulp-load-plugins')({ lazy: true });
var fs = require('fs');
var handyman = require('pipeline-handyman');
var path = require('path');
var lazypipe = require('lazypipe');
var esLintConfig = resolveConfigFile('.eslintrc');

module.exports = {
  validateJS: function (options) {
    var defaultConfig = JSON.parse(fs.readFileSync(esLintConfig, 'utf8'));
    var optionType = typeof options;
    var customConfig, config, rules;

    if (options) {
      if (optionType === 'object' && !Array.isArray(options)) {
        esLintConfig = handyman.mergeConfig(defaultConfig, options);
      } else if (optionType === 'string') {
        customConfig = resolveConfigFile(options);
        config = JSON.parse(fs.readFileSync(customConfig, 'utf8'));

        esLintConfig = handyman.mergeConfig(defaultConfig, config);
      } else {
        handyman.log('Validading js with ESlint ecmaScript5, ** Options not valid **');
      }
    }

    return validateES();
  }
};

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
    .pipe(plugins.eslint, esLintConfig)
    .pipe(plugins.eslint.format)
    .pipe(plugins.eslint.failOnError);

  handyman.log('Validading js with ESlint ecmaScript5');
  return stream();
}
