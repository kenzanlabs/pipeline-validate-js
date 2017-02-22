'use strict';

var fs = require('fs');
var path = require('path');
var handyman = require('pipeline-handyman');
var _ = require('lodash');

var ESLINT_DEFAULT_CONFIG_PATH = 'node_modules/pipeline-validate-js/.eslintrc';
var ESLINT_ROOT_CONFIG_PATH = '.eslintrc';

function pipelineConfigBuilder(options) {
  var config = {};
  var defaultPath = path.join(process.cwd(), ESLINT_DEFAULT_CONFIG_PATH);
  var rootPath = path.join(process.cwd(), ESLINT_ROOT_CONFIG_PATH);
  var customConfig;

  try {
    handyman.log('Linting using default path: ' + defaultPath);
    config = JSON.parse(fs.readFileSync(defaultPath, 'utf-8'));

  } catch (ex) {
    handyman.log(String(ex));

  }

  if (options) {

    if (typeof options === 'string') {
      customConfig = fs.readFileSync(options, 'utf-8');
      handyman.log('Linting using custom path: ' + options);
      config = handyman.mergeConfig(config, JSON.parse(customConfig));
      handyman.log('Linting using custom file');

    } else if (_.isPlainObject(options)) {
      handyman.log('Parsing Options');
      config = handyman.mergeConfig(config, options);

    } else {
      handyman.log('** Options not valid **');
      throw new ReferenceError();

    }
  } else {

    try {
      customConfig = fs.readFileSync(rootPath, 'utf-8');
      handyman.log('Linting using root path: ' + rootPath);
      config = handyman.mergeConfig(config, JSON.parse(customConfig));

    } catch (ex) {
      // no op.
    }

  }

  config.envs = Object.keys(config.env || {}).map(function(name) {
    return config.env[name] ? name : '';
  });

  return config;
}

module.exports = pipelineConfigBuilder;