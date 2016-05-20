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

  xdescribe('validateJS method', function () {
    var validateJS;

    beforeEach(function () {
      validateJS = validatePipeline.validateJS;
    });

    it('should return a stream', function () {
      isStream(stream()).should.equal(true);
    });

  });

  /*
   should log a message stating that the default (included) .eslintrc is being used
   should log a message stating that a repo .eslintrc is available, and being merged
   should check that the merged rules
   */

  xdescribe('validateJS method', function () {
    var stream;

    beforeEach(function () {
      stream = function () {
        return pipeline();
      };
    });

    it('should return a stream', function () {
      isStream(stream()).should.equal(true);
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
        spy.should.have.been.calledWith('Validading js with ESlint');
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

      it('should test validateJS() with valid object as options', function () {
        pipeline({'rules': {'semi': 2}});

        spy.should.have.been.calledWith('Parsing Options');
      });

    });
  });
});