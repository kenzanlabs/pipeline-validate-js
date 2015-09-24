
WEWERWEREWREWRWERWE TEST

## Pipeline-validate-js


## Information

| Package       | Description   | Version|
| ------------- |:-------------:| -----:|
| Pipeline-validate-js| Pipeline to validate js files | 0.1.0 |

# Overview

Gulp Pipeline that allows you to validate the js files within your project. It defines two gulp tasks to complete the validation. One uses JSHint and JSCS to complete the task, the other one uses ESLint.

_repo_: `ssh://git@projects.kenzanmedia.com:7999/key/pipeline-validate-js.git`

_jenkins_: `TODO`

## Install
`TODO`

## Usage
```javascript
var gulp = require('gulp');
require('./node_modules/pipeline-validate-js/src/index.js')(gulp);

gulp.task('default', ['pipelineValidateJS']);
```

## Options

Pipeline options:
* _config_ -> Object that contains the configuration.

    + __config.disableJSCS:__ If _true_ doesn't validate the files using `jscsrc`. You might want to disable JSCS if working on a legacy project. Otherwise this option should _false_.

    + __config.files:__ Array with the paths to validate.

    + __config.linter:__ Sets the desire rules to validate the files. It can be set to `JSHint` or `ESLint`.


  Default:
  ```javascript
  config = {
        disableJSCS: false,
        files: [
          '*.js',
          'src/*.js',
          'src/**/*.js'
        ],
        linter: 'JSHint'  
      }
  ```  

## Results

This pipeline adds the following task to the gulp object.

__pipelineValidateJS__

Validates the files found on the paths provided in the options. It will use _ESLint_ if `config.linter = ESLint`. Otherwise it will use _JSHint_ and _JSCS_-- the last one only if disableJSCS is _false_


## Dependencies

| Package       | npm link   |
| ------------- |:-------------:|
|gulp| https://www.npmjs.com/package/gulp |
|gulp-eslint| https://www.npmjs.com/package/gulp-eslint |
|gulp-if| https://www.npmjs.com/package/gulp-if |
|gulp-jscs| https://www.npmjs.com/package/gulp-jscs |
|gulp-jscs-stylish| https://www.npmjs.com/package/gulp-jscs-stylish |
|gulp-jshint| https://www.npmjs.com/package/gulp-jshint |
|gulp-load-plugins| https://www.npmjs.com/package/gulp-load-plugins |
|gulp-piece| https://www.npmjs.com/package/gulp-piece |
|gulp-print| https://www.npmjs.com/package/gulp-print |
|gulp-util| https://www.npmjs.com/package/gulp-util |
|jshint-stylish| https://www.npmjs.com/package/jshint-stylish |
|lodash| https://www.npmjs.com/package/lodash |
|yargs| https://www.npmjs.com/package/yargs |

## devDependencies

| Package       | npm link   |
| ------------- |:-------------:|
|chai| https://www.npmjs.com/package/chai |
|mocha| https://www.npmjs.com/package/mocha |

## LICENSE
