'use strict';

var plugins = require('gulp-load-plugins')({ lazy : true }),
    fs = require('fs'),
    handyman = require('pipeline-handyman'),
    path = require('path'),
    lazypipe = require('lazypipe'),
    esLintConfig = resolveConfigFile('.eslintrc1'),
    pipelineConfig = {
      parseOptions : {
        ecmaVersion : 5
      }
    };


module.exports = {
  validateJS : function (options) {
    var keyArray, customConfig, dest, origin;

    if (options) {
      if (typeof options === 'object' && !Array.isArray(options) || typeof options === 'string') {
        if (typeof options === 'object') {
          keyArray = Object.keys(options);

          keyArray.forEach(function(obj, i) {
            if (keyArray[i] === 'ecmaVersion') {
              pipelineConfig.parseOptions.ecmaVersion = options.ecmaVersion;
            } else {
              handyman.mergeConf(pipelineConfig, options);
            }
          });
          esLintConfig = handyman.mergeConf(esLintConfig, pipelineConfig);
        } else {
          customConfig = resolveConfigFile(options);
          dest = JSON.parse(fs.readFileSync(esLintConfig, 'utf8'));
          origin = JSON.parse(fs.readFileSync(customConfig, 'utf8'));

          esLintConfig = handyman.mergeConf(dest, origin);
        }
      } else {
        handyman.log('Validading js with ESlint ecmaScript5, ** Options not valid **');
      }
    }

    switch (true) {

      case pipelineConfig.parseOptions.ecmaVersion >= 3 && pipelineConfig.parseOptions.ecmaVersion <= 5:
        handyman.log('Validating js version ' + pipelineConfig.parseOptions.ecmaVersion + ' with ESlint');
        break;
      default:
        handyman.log('Validading js with ESlint ecmaScript5, ** ecmaVersion ' + pipelineConfig.parseOptions.ecmaVersion + ' is not supported! **');

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

  return stream();
}
