'use strict';

var eslint = require('gulp-eslint');
var fs = require('fs');
var handyman = require('pipeline-handyman');
var lazypipe = require('lazypipe');
var path = require('path');
var _ = require('lodash');

var ESLINT_CONFIG_PATH = './.eslintrc';
//var esLintConfig = resolveConfigFile(ESLINT_CONFIG_PATH);

module.exports = {

  validateJS: function (options) {
    //  if (options) {
    //    checkOptions(options);
    //  }
    //  checkLocalLintFile();
    //
    //  return pipelineFactory();
  }

};

//function checkLocalLintFile () {
//  var repoFilePath = process.cwd() + '/.eslintrc';
//  var libraryFilePath = './node_modules/pipeline-validate-js/.eslintrc';
//  var repoFile;
//  var libraryFile;
//
//  console.log('cwd', process.cwd());
//  console.log('cwd', process.cwd());
//
//  fs.readFile(repoFilePath, 'utf-8', function (err, repoFileData) {
//    if (err) {
//      return;
//    }
//
//    handyman.log('Repo .eslintrc available, merging with default');
//    repoFile = repoFileData;
//
//    // access default from package.
//    fs.access(libraryFilePath, fs.F_OK, function (err) {
//      console.log(err ? 'no access!' : 'can read/write');
//    });
//    //
//    //fs.readFile(libraryFilePath, 'utf8', function (err, data) {
//    //  if (err) {
//    //    return;
//    //  }
//    //
//    //  handyman.log('merging local and custom .eslintrc file');
//    //  esLintConfig = handyman.mergeConfig(esLintConfig, data);
//    //});
//  });
//}
//
//function checkOptions (options) {
//  var dest = JSON.parse(fs.readFileSync(esLintConfig, 'utf8'));
//  var customConfig = {};
//  var origin = {};
//
//  if (_.isPlainObject(options)) {
//    handyman.log('Parsing Options');
//    esLintConfig = handyman.mergeConfig(dest, options);
//
//  } else if (typeof options === 'string') {
//    handyman.log('Linting using custom file');
//
//    customConfig = resolveConfigFile(options);
//    origin = JSON.parse(fs.readFileSync(customConfig, 'utf8'));
//    esLintConfig = handyman.mergeConfig(dest, origin);
//  } else {
//    handyman.log('** Options not valid **');
//
//    throw new ReferenceError();
//  }
//}
//
//function resolveConfigFile (fileName) {
//  var configFilesPathUser = path.resolve(process.cwd(), fileName);
//  var configFilesPathDefault = __dirname.substring(0, __dirname.lastIndexOf('/'));
//
//  configFilesPathDefault = path.resolve(configFilesPathDefault, fileName);
//
//  return existsSync(configFilesPathUser) ? configFilesPathUser : configFilesPathDefault;
//}
//
//function existsSync (filename) {
//  if (typeof fs.accessSync === 'function') {
//    try {
//      fs.accessSync(filename);
//      handyman.log('Linting using ' + filename);
//      return true;
//    } catch (error) {
//      if (typeof error !== 'object' || error.code !== 'ENOENT') {
//        handyman.log('Unable to access ' + filename + ':');
//        handyman.log(error.stack);
//      }
//      return false;
//    }
//  } else {
//    return fs.existsSync(filename);
//  }
//}
//
//function pipelineFactory () {
//  var stream = lazypipe()
//    .pipe(eslint, esLintConfig)
//    .pipe(eslint.format)
//    .pipe(eslint.failOnError);
//
//  esLintConfig = resolveConfigFile(ESLINT_CONFIG_PATH);
//  return stream();
//}
