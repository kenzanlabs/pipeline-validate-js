'use strict';

var _ = require('lodash');
var args = require('yargs').argv;
var glp = require('gulp-load-plugins')({lazy: true});
var fs = require('fs');

var config = {
      files: [
        '*.js',
        'src/*.js',
        'src/**/*.js'
      ],
      disableJSCS: false
    };

var jsHintConfig = resolveConfigFile('.jshintrc');
var jscsConfig = resolveConfigFile('.jscsrc');

function resolveConfigFile(fileName) {
  var configFile;

  if (fs.accessSync(process.cwd() + '/' + fileName)) {
    configFile = process.cwd() + '/' + fileName;
  } else {
    configFile = __dirname + '/' + fileName;
  }
  return configFile;
}

module.exports = function (gulp, options) {

  if (options) {
    config = updateConfiguration(config, options);
    log(config);
  }
  gulp.task('validate:js', validate);
  gulp.task('validate:ES', validateES);

  function validateJs() {

    return glp.piece(
      glp.jshint(jsHintConfig),
      glp.if(!config.disableJSCS, glp.jscs(jscsConfig))
    );
  }

  function validate() {
    return gulp
      .src(config.files)
      .pipe(glp.if(args.verbose, glp.print()))
      .pipe(validateJs())
      .pipe(glp.if(!config.disableJSCS, glp.jscsStylish.combineWithHintResults()))
      .pipe(glp.jshint.reporter('jshint-stylish'))
      .pipe(glp.jshint.reporter('fail'));
  }

  function validateES() {
    return gulp
      .src(config.files)
      .pipe(glp.eslint())
      .pipe(glp.eslint.format())
      .pipe(glp.eslint.failOnError());

  }

  function updateConfiguration(config, newConfig) {
    return _.merge({}, config, newConfig, replaceArrays);
  }

  function replaceArrays(a, b) {
    if (_.isArray(a)) {
      return b;
    }
  }

  function log(msg) {
    if (typeof(msg) === 'object') {
      for (var item in msg) {
        if (msg.hasOwnProperty(item)) {
          glp.util.log(glp.util.colors.blue(msg[item]));
        }
      }
    } else {
      glp.util.log(glp.util.colors.blue(msg));
    }
  }
};
