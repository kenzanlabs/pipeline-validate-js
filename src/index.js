'use strict';

<<<<<<< HEAD
var plugins = require('gulp-load-plugins')({ lazy: true });
=======
var eslint = require('gulp-eslint');
>>>>>>> 9f61d5728960b436cfe33bb3f21ea79f579d7967
var fs = require('fs');
var handyman = require('pipeline-handyman');
var path = require('path');
var lazypipe = require('lazypipe');
<<<<<<< HEAD
=======

>>>>>>> 9f61d5728960b436cfe33bb3f21ea79f579d7967
var esLintConfig = resolveConfigFile('.eslintrc');

module.exports = {
  validateJS: function (options) {
<<<<<<< HEAD
    var defaultConfig = JSON.parse(fs.readFileSync(esLintConfig, 'utf8'));
    var optionType = typeof options;
    var customConfig, config, rules;
=======
    var dest = JSON.parse(fs.readFileSync(esLintConfig, 'utf8'));
    var customConfig = {};
    var origin = {};
    var rules = {};
>>>>>>> 9f61d5728960b436cfe33bb3f21ea79f579d7967

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
    .pipe(eslint, esLintConfig)
    .pipe(eslint.format)
    .pipe(eslint.failOnError);

  handyman.log('Validading js with ESlint ecmaScript5');
  return stream();
}