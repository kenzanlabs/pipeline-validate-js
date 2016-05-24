'use strict';
var chai = require('chai');
var isStream = require('isstream');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var dirtyChai = require('dirty-chai');
var fs = require('fs-extra');
var path = require('path');
var rimraf = require('rimraf');

var validatePipeline = require('../src/index.js');
var validator = require('../src/validator');

var expect = chai.expect;
chai.use(sinonChai);
chai.use(dirtyChai);

describe('pipeline-validateJS', function () {

  var esLintFilePath;
  var mockLintConfigPath;

  before(function () {
    esLintFilePath = path.join(process.cwd(), '.eslintrc');
    mockLintConfigPath = path.join(process.cwd(), 'node_modules/pipeline-validate-js/.eslintrc');

    try {
      // file exists, do nothing
      fs.accessSync(mockLintConfigPath);
    } catch (ex) {
      fs.copySync(esLintFilePath, mockLintConfigPath);
    }

  });

  after(function () {
    rimraf.sync(mockLintConfigPath.replace('.eslintrc', ''));
  });

  it('should expose a validateJS method', function () {
    expect(validatePipeline.validateJS).to.exist();
  });

  it('should return a stream', function () {
    expect(isStream(validatePipeline.validateJS())).to.be.true();
  });

  it('should utilize the validator.getLintConfig method to lint with the provided options (default)', function () {
    var spy = sinon.spy(validator, 'getLintConfig');
    validatePipeline.validateJS();
    expect(spy).to.have.been.called();
  });
  it('should utilize the validator.getLintConfig method to lint with a custom options object (custom)', function (){

  });
  it('should utilize the validator.getLintConfig method to lint with a custom file path (string)');
  it('should utilize the validator.validate method with the retrieved options');

});
//   should log a message stating that the default (included) .eslintrc is being used
//   should log a message stating that a repo .eslintrc is available, and being merged
//   should check that the merged rules
//   */
//
//  describe('validateJS method', function () {
//
//    describe('validateJS pipeline with no options', function () {
//      var sandbox = {};
//      var spy = {};
//
//      beforeEach(function () {
//        sandbox = sinon.sandbox.create();
//        spy = sandbox.spy(handyman, 'log');
//      });
//
//      afterEach(function () {
//        sandbox.restore();
//      });
//
//      it('should test validateJS() with no options', function () {
//        validateJS();
//        expect(spy).to.have.been.calledWith('Validading js with ESlint');
//      });
//    });
//
//    describe('ValidateJS Pipeline with options', function () {
//      var sandbox = {};
//      var spy = {};
//      var fn;
//
//      beforeEach(function () {
//        sandbox = sinon.sandbox.create();
//        spy = sandbox.spy(handyman, 'log');
//      });
//
//      afterEach(function () {
//        sandbox.restore();
//      });
//
//      it('should test validateJS() with invalid options, number', function () {
//        fn = function () {
//          validateJS(234);
//        };
//
//        expect(fn).to.throw();
//        expect(spy).to.have.been.calledWith('** Options not valid **');
//      });
//
//      it('should test validateJS() with invalid options, array', function () {
//        fn = function () {
//          validateJS(['semi', 1]);
//        };
//
//        expect(fn).to.throw();
//        expect(spy).to.have.been.calledWith('** Options not valid **');
//      });
//
//      it('should test validateJS() with an invalid file path as an  option', function () {
//        fn = function () {
//          validateJS('.eslintrc1');
//        };
//
//        expect(fn).to.throw();
//      });
//
//      it('should test validateJS() with valid url as options', function () {
//        validateJS('./test/fixtures/.eslintrc3');
//
//        expect(spy).to.have.been.calledWith('Linting using custom file');
//      });
//
//      it('should test validateJS() with valid url as options', function () {
//        validateJS('./test/fixtures/.eslintrc3');
//
//        expect(spy).to.have.been.calledWith(sinon.match(/^Linting using.*eslintrc3$/));
//      });
//
//      it('should test validateJS() with valid object as options', function () {
//        validateJS({'rules': {'semi': 2}});
//
//        expect(spy).to.have.been.calledWith('Parsing Options');
//      });
//
//    });
//  });
//});