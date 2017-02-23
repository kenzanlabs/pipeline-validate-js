'use strict';

var chai = require('chai');
var handyman = require('pipeline-handyman');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var dirtyChai = require('dirty-chai');
var fs = require('fs-extra');
var path = require('path');
var rimraf = require('rimraf');
var pipelineConfigBuilder = require('../src/pipeline-config-builder.js');
var expect = chai.expect;

chai.should();
chai.use(sinonChai);
chai.use(dirtyChai);

describe('pipeline-config-builder', function () {

  var esLintFilePath;
  var mockLintConfigPath;
  var esLintFileConfig;

  before(function () {
    esLintFilePath = path.join(process.cwd(), '.eslintrc');
    esLintFileConfig = JSON.parse(fs.readFileSync(esLintFilePath, 'utf-8'));
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

  describe('pipelineConfigBuilder method', function () {

    it('should expose a method', function () {
      expect(pipelineConfigBuilder).to.exist();
      expect(pipelineConfigBuilder).to.be.a('function');
    });

    it('should return an object', function () {
      expect(pipelineConfigBuilder()).to.be.an('object');
    });

    describe('pipelineConfigBuilder with options', function () {
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

      it('should test pipelineConfigBuilder() with invalid options, number', function () {
        fn = function () {
          pipelineConfigBuilder(234);
        };

        fn.should.throw();
        spy.should.have.been.calledWith('** Options not valid **');
      });

      it('should test pipelineConfigBuilder() with invalid options, array', function () {
        fn = function () {
          pipelineConfigBuilder(['semi', 1]);
        };

        fn.should.throw();
        spy.should.have.been.calledWith('** Options not valid **');
      });

      it('should test pipelineConfigBuilder() with an invalid file path as an  option', function () {
        fn = function () {
          pipelineConfigBuilder('.eslintrc1');
        };

        fn.should.throw();
      });

      it('should accept custom options as filepath string', function () {
        var customPath = './test/fixtures/.eslintrc3';

        pipelineConfigBuilder(customPath);
        spy.should.have.been.calledWith('Linting using custom path: ' + customPath);
      });

      it('should accept custom options as object', function () {
        pipelineConfigBuilder({ 'rules': { 'semi': 2 } });
        spy.should.have.been.calledWith('Parsing Options');
      });
    });

    describe('pipelineConfigBuilder without options', function () {
      var sandbox = {};
      var spy = {};

      beforeEach(function () {
        sandbox = sinon.sandbox.create();
        spy = sandbox.spy(handyman, 'log');
      });

      afterEach(function () {
        sandbox.restore();
      });

      it('should use root path', function () {
        pipelineConfigBuilder();
        spy.should.have.been.calledWith('Linting using root path: ' + esLintFilePath);
      });

      it('should should merge root path config', function () {
        var config = pipelineConfigBuilder();

        delete config.envs;
        expect(config).to.deep.equal(esLintFileConfig);
      });
    });
  });
});