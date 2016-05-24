'use strict';

var path = require('path');
var fs = require('fs');
var handyman = require('pipeline-handyman');
var lazypipe = require('lazypipe');
var eslint = require('gulp-eslint');

var NODE_MODULES_PATH = 'node_modules/pipeline-validate-js/.eslintrc';

module.exports = {

  getLintConfig: function (options) {
    var config = {};
    var defaultPath = path.join(process.cwd(), NODE_MODULES_PATH);
    var customConfig;

    try {
      config = JSON.parse(fs.readFileSync(defaultPath, 'utf-8'));
    } catch (ex) {
      throw new Error(ex);
    }

    if (options) {

      if (typeof options === 'string') {
        customConfig = fs.readFileSync(options, 'utf-8');
        config = handyman.mergeConfig(config, JSON.parse(customConfig));

      } else {
        config = handyman.mergeConfig(config, options);

      }
    }

    return config;
  },

  validate: function (config) {
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
};