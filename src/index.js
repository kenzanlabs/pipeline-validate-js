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
    checkLocalLintFile();

    handyman.log('Validading js with ESlint');
    return pipelineFactory();
  }
};

function checkLocalLintFile() {
  var rootFile = process.cwd() + '/.eslintrc';
  var file = './node_modules/pipeline-validate-js/.eslintrc';

  fs.readFile(rootFile, function (err) {
    if (err) {return;}

    fs.readFile(file, 'utf8', function (err, data) {
      if (err) { return; }

      handyman.log('merging local and custom .eslintrc file');
      esLintConfig = handyman.mergeConfig(esLintConfig, data);
    });
  });
}

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

function pipelineFactory() {
  var stream = lazypipe()
    .pipe(eslint, esLintConfig)
    .pipe(eslint.format)
    .pipe(eslint.failOnError);

  esLintConfig = resolveConfigFile(ESLINT_CONFIG_PATH);
  return stream();
}
