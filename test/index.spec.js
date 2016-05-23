'use strict';
var chai = require('chai');
var handyman = require('pipeline-handyman');
var isStream = require('isstream');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var validatePipeline = require('../src/index.js');

var expect = chai.expect;

chai.use(sinonChai);

describe('pipeline-validateJS', function () {

  var validateJS;

  beforeEach(function () {
    validateJS = validatePipeline.validateJS;
  });

  describe('Initialization', function () {

    it('should exist as an object', function () {
      expect(validatePipeline).to.exist;
      expect(validatePipeline).to.be.an('object');
    });

    it('should expose a validateJS method', function () {
      expect(validatePipeline.validateJS).to.exist;
      expect(validatePipeline.validateJS).to.be.a('function');
    });

  });

  describe('validateJS method', function () {

    it('should return a stream', function () {
      expect(isStream(validateJS())).to.be.true;
    });

  });

  /*
   should log a message stating that the default (included) .eslintrc is being used
   should log a message stating that a repo .eslintrc is available, and being merged
   should check that the merged rules
   */

  describe('validateJS method', function () {

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
        validateJS();
        expect(spy).to.have.been.calledWith('Validading js with ESlint');
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
          validateJS(234);
        };

        expect(fn).to.throw();
        expect(spy).to.have.been.calledWith('** Options not valid **');
      });

      it('should test validateJS() with invalid options, array', function () {
        fn = function () {
          validateJS(['semi', 1]);
        };

        expect(fn).to.throw();
        expect(spy).to.have.been.calledWith('** Options not valid **');
      });

      it('should test validateJS() with an invalid file path as an  option', function () {
        fn = function () {
          validateJS('.eslintrc1');
        };

        expect(fn).to.throw();
      });

      it('should test validateJS() with valid url as options', function () {
        validateJS('./test/fixtures/.eslintrc3');

        expect(spy).to.have.been.calledWith('Linting using custom file');
      });

      it('should test validateJS() with valid url as options', function () {
        validateJS('./test/fixtures/.eslintrc3');

        expect(spy).to.have.been.calledWith(sinon.match(/^Linting using.*eslintrc3$/));
      });

      it('should test validateJS() with valid object as options', function () {
        validateJS({'rules': {'semi': 2}});

        expect(spy).to.have.been.calledWith('Parsing Options');
      });

    });
  });
});