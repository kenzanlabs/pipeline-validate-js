'use strict';

var plugins = require('gulp-load-plugins')({ lazy: true }),
    fs = require('fs'),
    handyman = require('pipeline-handyman'),
    path = require('path'),
    lazypipe = require('lazypipe'),
    esLintConfig = resolveConfigFile('.eslintrc');

module.exports = {
  validateJS: function (options) {
    var dest = JSON.parse(fs.readFileSync(esLintConfig, 'utf8')),
        customConfig, origin, rules;

    if (options) {
      if (typeof options === 'object' && !Array.isArray(options) || typeof options === 'string') {
        if (typeof options === 'object') {
          rules = { rules: options };

          esLintConfig = handyman.mergeConfig(dest, rules);
        } else {
          customConfig = resolveConfigFile(options);
          origin = JSON.parse(fs.readFileSync(customConfig, 'utf8'));

          esLintConfig = handyman.mergeConfig(dest, origin);
        }
      } else {
        handyman.log('Validading js with ESlint ecmaScript5, ** Options not valid **');
      }
    }
    return validateES();
  }
};

function resolveConfigFile(fileName) {
  var configFilesPathUser = path.resolve(process.cwd(), fileName),
      configFilesPathDefault = __dirname.substring(0, __dirname.lastIndexOf('/'));

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
