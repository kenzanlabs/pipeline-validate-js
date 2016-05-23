'use strict';

var path = require('path');
var fs = require('fs');

module.exports = {

  getLintConfig: function () {
    var config = {};
    var defaultPath = path.join(process.cwd(), 'node_modules/pipeline-validate-js/.eslintrc');

    try{
      config = fs.readFileSync(defaultPath, 'utf-8');
    } catch (ex){
      throw new Error(ex);
    }

    return JSON.parse(config);
  }


};