## Pipeline-validate-js


## Information

| Package       | Description   | Version|
| ------------- |:-------------:| -----:|
| Pipeline-validate-js| Pipeline to validate js files | 0.1.0 |

# Overview

Gulp Pipeline that allows you to validate the js files within your project. It defines an object that contains a validateJS() function. Depending on the configuration, the function will use JSHint and JSCS to complete the task, or ESLint.

This pipeline also offers the possibility of using personalized lint rules in other modules. If you'd like to use other rules within your project you can define a `.jshintrc`, `.jscs` or a `.eslintrc` file. These files should be in the root folder of the project. This pipeline will prioritize your rules over the default configurations.

_repo_: `https://github.com/kenzanmedia/pipeline-validate-js`

_jenkins_: `https://kenzan.ci.cloudbees.com/job/CI-pipeline-validate-js/`

## Install
`TODO`

## Usage
```javascript
var gulp = require('gulp');
var validatePipeline = require('pipeline-validate-js')();


gulp.task('default', function() {
  return gulp
    .src(['src/**/*.js'])
    .pipe(validatePipeline.validateJS());
});
```

## Options

Pipeline options:
* _config_ -> Object that contains the configuration.

    + __config.disableJSCS:__ If _true_ doesn't validate the files using `jscsrc`. You might want to disable JSCS if working on a legacy project. Otherwise this option should _false_.

    + __config.linter:__ Sets the desire rules to validate the files. It can be set to `JSHint` or `ESLint`.


  Default:
  ```javascript
  config = {
        disableJSCS: false,
        linter: 'JSHint'  
      }
  ```  

## Results

This pipeline returns an object. This object receives a stream with the files to validate. You can call the _validateJS_ method to run the validation. The method will report if any issues were found during validation. If no issues are present, it will return the stream.


## LICENSE
