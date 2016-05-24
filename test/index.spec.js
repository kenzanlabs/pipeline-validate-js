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

    spy.restore();
  });

  it('should utilize the validator.getLintConfig method to lint with a custom options object (custom)', function () {
    var mockConfig = {env: {node: true}};
    var spy = sinon.spy(validator, 'getLintConfig');

    validatePipeline.validateJS(mockConfig);

    expect(spy).to.have.been.called(mockConfig);

    spy.restore();
  });

  it('should utilize the validator.getLintConfig method to lint with a custom file path (string)', function () {
    var mockConfigPath = process.cwd() + '/.eslintrc';
    var spy = sinon.spy(validator, 'getLintConfig');

    validatePipeline.validateJS(mockConfigPath);

    expect(spy).to.have.been.called(mockConfigPath);

    spy.restore();
  });

  it('should utilize the validator.validate method to lint the files', function () {
    var spy = sinon.spy(validator, 'validate');

    validatePipeline.validateJS();

    expect(spy).to.have.been.called();

    spy.restore();

  });

});