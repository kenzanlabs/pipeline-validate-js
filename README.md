## pipeline-validate-js


## Information

| Package       | Description   | Version|
| ------------- |:-------------:| -----:|
| pipeline-validate-js| Pipeline to validate JavaScript files using ESLint | 1.0.0-rc1 |

# Overview
This is a [Gulp][] pipeline that allows a team to validate the JS files within their project for syntax and style. As 
part of the [Keystone][] project for [Kenzan][], this pipeline is opinionated to promote best practices as favored by 
the organization. It defines a module that contains a `validateJS` method that will use [ESLint][] to complete the 
task.

A fixture has been provided in `test/fixtures/` of Twitter [Bootstrap][]'s [source][], linted according to the rules.
As changes are presented to the default ruleset, the rules will be reflected in this file as well, for easy 
visualiztion of rule set changes.

[Gulp]: http://gulpjs.com/
[Keystone]: https://github.com/kenzanlabs/keystone
[Kenzan]: http://kenzan.com/
[ESLint]: http://eslint.org/
[Bootstrap]: http://getbootstrap.com/
[source]: https://github.com/twbs/bootstrap/blob/v3.3.6/dist/js/bootstrap.js

**NOTE: this project is now in a 1.0.0 release candidate stage.  1.0.0-rc tags will be published to NPM to allow 
developers the chance to review and provide feedback.**

## Install

`npm install pipeline-validate-js --save-dev`

## Usage
In addition to the default rules established within this pipeline, there is support for using personalized linting rules. If you'd like to use other rules within your project you can define a `.eslintrc` file. You can also pass in a file path as a parameter or pass in an object with your custom rules.  This pipeline will merge your rules, favoring your rules over the default configuration.

```javascript
var gulp = require('gulp');
var validatePipeline = require('pipeline-validate-js');

gulp.task('default', function() {
  return gulp
    .src('src/**/*.js')
    .pipe(validatePipeline.validateJS());
});

//specify your own custom eslintrc, that gets merged into the default config
gulp.task('default', function() {
  return gulp
    .src('src/**/*.js')
    .pipe(validatePipeline.validateJS('/some/path/.eslintrcCustom'));
});

//specify your own custom rules object, that gets merged into the default config
gulp.task('default', function() {
  return gulp
    .src('src/**/*.js')
    .pipe(validatePipeline.validateJS({
      "rules": {
        "no-console": 0
      },
      "parserOptions": {
        "ecmaVersion": 6
      }
    });
});
```

## Options

Pipeline options:
* _config_ -> Object that contains the configuration.  It offers a 1:1 mapping with the format of an `eslintrc` file

    + parseOptions.ecmaVersion:__ Sets the ecmaScript version to be linted, set to '5' by default.


  Default:
  ```javascript
  pipelineConfig = {
    parseOptions: {
      ecmaVersion: 5
    }
  }
  ```

If options are invalid it will throw a reference error.

## Results

This pipeline returns an object. This object receives a stream with the files to validate. You can call the _validateJS_
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