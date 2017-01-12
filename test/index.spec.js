'use strict';
var chai = require('chai');
var handyman = require('pipeline-handyman');
var isStream = require('isstream');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var dirtyChai = require('dirty-chai');
var fs = require('fs-extra');
var path = require('path');
var rimraf = require('rimraf');
var validatePipeline = require('../src/index.js');
var expect = chai.expect;

var esLint = require('gulp-eslint');

chai.should();
chai.use(sinonChai);
chai.use(dirtyChai);

describe('pipeline-validateJS', function () {

  var esLintFilePath;
  var mockLintConfigPath;
  var pipeline;

  before(function () {
    esLintFilePath = path.join(process.cwd(), '.eslintrc');
    mockLintConfigPath = path.join(process.cwd(), 'node_modules/pipeline-validate-js/.eslintrc');
    pipeline = validatePipeline.validateJS;

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

  describe('validateJS method', function () {

    it('should expose a validateJS method', function () {
      expect(validatePipeline.validateJS).to.exist();
      expect(validatePipeline.validateJS).to.be.a('function');
    });

    it('should return a stream object', function () {
      expect(validatePipeline.validateJS()).to.be.an('object');
      expect(isStream(validatePipeline.validateJS())).to.be.true();
    });

    describe('validateJS pipeline with no options', function () {
      var sandbox = {};
      var spy = {};

      beforeEach(function () {
        sandbox = sinon.sandbox.create();
        spy = sandbox.spy(handyman, 'log');
      });

      afterEach(function () {
        sandbox.restore();
      });

      it('should test validateJS() with no options', function () {
        pipeline();
        spy.should.have.been.calledWith('Validating js with ESlint');
      });

      it('should utilize eslint.format when no options are provided', function () {
        var spy = sinon.spy(esLint, 'format');

        pipeline();

        expect(spy).to.have.been.called();
      });

      it('should utilize eslint.failOnError when no options are provided', function () {
        var spy = sinon.spy(esLint, 'failOnError');

        pipeline();

        expect(spy).to.have.been.called();
      });

    });

    describe('ValidateJS Pipeline with options', function () {
      var sandbox = {};
      var spy = {};
      var fn;

      beforeEach(function () {
        sandbox = sinon.sandbox.create();
        spy = sandbox.spy(handyman, 'log');
      });

      afterEach(function () {
        sandbox.restore();
      });

      it('should test validateJS() with invalid options, number', function () {
        fn = function () {
          pipeline(234);
        };

        fn.should.throw();
        spy.should.have.been.calledWith('** Options not valid **');
      });

      it('should test validateJS() with invalid options, array', function () {
        fn = function () {
          pipeline(['semi', 1]);
        };

        fn.should.throw();
        spy.should.have.been.calledWith('** Options not valid **');
      });

      it('should test validateJS() with an invalid file path as an  option', function () {
        fn = function () {
          pipeline('.eslintrc1');
        };

        fn.should.throw();
      });

      it('should test validateJS() with valid url as options', function () {
        pipeline('./test/fixtures/.eslintrc3');

        spy.should.have.been.calledWith('Linting using custom file');
      });

      it('should test validateJS() with valid url as options', function () {
        pipeline('./test/fixtures/.eslintrc3');

        spy.should.have.been.calledWith(sinon.match(/^Linting using.*eslintrc3$/));
      });

      it('should test validateJS() with valid object as options', function() {
        pipeline({ 'rules': { 'semi': 2 } });

        spy.should.have.been.calledWith('Parsing Options');
      });

    });
  });
});
