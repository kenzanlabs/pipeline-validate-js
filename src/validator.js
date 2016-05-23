'use strict';

var path = require('path');
var fs = require('fs');
var handyman = require('pipeline-handyman');

module.exports = {

  getLintConfig: function (options) {
    var config = {};
    var defaultPath = path.join(process.cwd(), 'node_modules/pipeline-validate-js/.eslintrc');

    try{
      config = JSON.parse(fs.readFileSync(defaultPath, 'utf-8'));
    } catch (ex){
      throw new Error(ex);
    }

    if (options){
      config = handyman.mergeConfig(config,  options)
    }

    return config;
  }


};