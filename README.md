## pipeline-validate-js


## Information

| Package       | Description   | Version|
| ------------- |:-------------:| -----:|
| pipeline-validate-js| Pipeline to validate js files | 0.3.2 |

# Overview

Gulp Pipeline that allows you to validate the js files within your project. This pipeline is opinionated to company specs. It defines an object that contains a 
validateJS() function. The function will use ESLint to complete the task.


This pipeline also offers the possibility of using personalized lint rules in other modules. If you'd like to use other 
rules within your project you can define a `.eslintrc` file. These files should be in the 
root folder of the project. You can also pass in a file path as a parameter 'src/.eslitrcCustom'. This pipeline will prioritize your rules over the default configurations.

**NOTE: as this project is still pre 1.0.0, it is subject to possible backwards incompatible changes as it matures.**

## Install

`npm install pipeline-validate-js --save-dev`

## Usage
```javascript
var gulp = require('gulp');
var validatePipeline = require('pipeline-validate-js');


gulp.task('default', function() {
  return gulp
    .src(files)
    .pipe(validatePipeline.validateJS());
});

gulp.task('default', function() {
  return gulp
    .src(files)
    .pipe(validatePipeline.validateJS({ecmaversion: 4}));
});

gulp.task('default', function() {
  return gulp
    .src(files)
    .pipe(validatePipeline.validateJS('./src/.eslitrcCustom'));
});

gulp.task('default', function() {
  return gulp
    .src(files)
    .pipe(validatePipeline.validateJS({"no-console": 0}));
});
```

## Options

Pipeline options:
* _config_ -> Object that contains the configuration.

    + __pipelineConfig.parseOptions.ecmaVersion:__ Sets the ecmaScript version to be linted, set to '5' by default.


  Default:
  ```javascript
  pipelineCconfig = {
    parseOptions: {
      ecmaVersion: 5
    },
  }
  ```  

## Results

This pipeline returns an object. This object receives a stream with the files to validate. You can call the _validteJS_ 
method to run the validation. The method will report if any issues were found during validation. If no issues are 
present, it will return the stream.

## LICENSE
Copyright 2015 Kenzan, LLC <http://kenzan.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.