## pipeline-validate-js


## Information

| Package       | Description   | Version|
| ------------- |:-------------:| -----:|
| pipeline-validate-js| Pipeline to validate js files | 1.0.0-rc |

# Overview

Gulp Pipeline that allows you to validate the js files within your project. The company favors the style used by Airbnb, 
as well as adds its own style rules. This pipeline is opinionated to company specs. It defines an object that contains a 
validateJS() function. The function will use ESLint to complete the task.

This pipeline also offers the possibility of using personalized lint rules in other modules. If you'd like to use other 
rules within your project you can define a `.eslintrc` file. These files should be in the root folder of the project. 
You can also pass in a file path as a parameter 'src/.eslitrcCustom', or pass in an object with rules 
`{'no-console: 0'}`. This pipeline will prioritize your rules over the default configuration.

In addition, a fixture has been provided in `test/fixtures/`, of Twitter [Bootstrap][] [JS][], linted according to the rules.
As changes are presented to the default ruleset, the rules will be reflected in this file as well, for easy 
visualiztion of rule set changes.

[Bootstrap][]: http://getbootstrap.com/
[JS][]: https://github.com/twbs/bootstrap/blob/v3.3.6/dist/js/bootstrap.js

**NOTE: this project is now in 1.0.0 release candidate stage.  1.0.0-rc tags will be published to NPM to allow 
developers to review and provided feedback.**

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
    .pipe(validatePipeline.validateJS('./src/.eslitrcCustom'));
});

gulp.task('default', function() {
  return gulp
    .src(files)
    .pipe(validatePipeline.validateJS({"no-console": 0}));
});

gulp.task('default', function() {
  return gulp
    .src(files)
    .pipe(validatePipeline.validateJS(config.rules);
});
```

## Options

Pipeline options:
* _config_ -> Object that contains the configuration.

    + __pipelineConfig.parseOptions.ecmaVersion:__ Sets the ecmaScript version to be linted, set to '5' by default.


  Default:
  ```javascript
  pipelineConfig = {
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