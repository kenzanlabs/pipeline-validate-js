'use strict';

var validator = require('../src/validator');

module.exports = {
  validateJS: function (options) {
     var config = validator.getLintConfig(options);
     return validator.validate(config);
  }
};
