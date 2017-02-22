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

        // remove envs as it is added
        delete config.envs;
        expect(config).to.deep.equal(esLintFileConfig);
      });
    });
  });
});