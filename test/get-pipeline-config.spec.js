'use strict';
var chai = require('chai');
var handyman = require('pipeline-handyman');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var dirtyChai = require('dirty-chai');
var fs = require('fs-extra');
var path = require('path');
var rimraf = require('rimraf');
var getPipelineConfig = require('../src/get-pipeline-config.js');
var expect = chai.expect;

chai.should();
chai.use(sinonChai);
chai.use(dirtyChai);

describe('get-pipeline-config', function () {

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

  describe('getPipelineConfig method', function () {

    it('should expose a method', function () {
      expect(getPipelineConfig).to.exist();
      expect(getPipelineConfig).to.be.a('function');
    });

    it('should return an object', function () {
      expect(getPipelineConfig()).to.be.an('object');
    });

    describe('getPipelineConfig without options', function () {
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
        getPipelineConfig();
        spy.should.have.been.calledWith('Linting using root path: ' + esLintFilePath);
      });

      it('should should merge root path config', function () {
        var config = getPipelineConfig();

        // remove envs as it is added
        delete config.envs;
        expect(config).to.deep.equal(esLintFileConfig);
      });
    });
  });
});