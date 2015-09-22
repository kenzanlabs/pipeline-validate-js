'use strict';

var gulp = require('gulp');
require('./index.js')(gulp);

gulp.task('default', ['validate:js']);
