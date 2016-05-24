'use strict';
var chai = require('chai');
var handyman = require('pipeline-handyman');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var dirtyChai = require('dirty-chai');
var fs = require('fs-extra');
var path = require('path');
var rimraf = require('rimraf');
var isStream = require('isstream');

var validator = require('../src/validator');

var expect = chai.expect;
chai.use(sinonChai);
chai.use(dirtyChai);

describe('Validator', function () {

  it('should return an object', function () {
    expect(validator).to.be.an('object');
  });

  describe('Method: getLintConfig', function () {
    var esLintFilePath;
    var mockLintConfigPath;

    describe('Node modules do not exist', function () {

      it('should throw an error if node_modules do not exist', function () {
        expect(validator.getLintConfig.bind(validator, '')).to.throw(Error);
      });

    });

    describe('Node modules exist', function () {

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

      it('should expose a getLintConfig method ', function () {
        expect(validator.getLintConfig).to.exist();
        expect(validator.getLintConfig).to.be.a('function');
      });

      it('should return an object', function () {
        expect(validator.getLintConfig()).to.be.an('object');
      });

      it('should return the default .eslintrc object when no options are passed', function () {
        expect(validator.getLintConfig().env).to.exist();
        expect(validator.getLintConfig().globals).to.exist();
        expect(validator.getLintConfig().plugins).to.exist();
        expect(validator.getLintConfig().rules).to.exist();
      });

      it('should merge with options, when provided', function () {
        expect(validator.getLintConfig({env: {node: false}}).env.node).to.be.false();
      });

      it('should merge with a custom .eslintrc when a filepath is provided', function () {
        var customLintConfigPath = path.join(process.cwd(), 'test/fixtures/.mock-eslintrc');

        expect(validator.getLintConfig(customLintConfigPath).rules['no-case-declarations']).to.equal(0);

      });

    });

  });

  describe('Method: validate', function () {

    it('should expose a validate method ', function () {
      expect(validator.validate).to.exist();
      expect(validator.validate).to.be.a('function');
    });

    it('should log an error when called without a config param', function () {
      var spy = sinon.spy(handyman, 'log');
      validator.validate();
      expect(spy).to.have.been.calledWith('Validate error! Config object required');
    });

    it('should return a stream', function () {
      expect(isStream(validator.validate({}))).to.be.true();
    });

  });

});