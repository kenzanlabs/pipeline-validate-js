'use strict';
var chai = require('chai');
var handyman = require('pipeline-handyman');
var isStream = require('isStream');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var validatePipeline = require('../src/index.js');

chai.should();
chai.use(sinonChai);

describe('pipeline-validateJS', function() {
  var pipeline;

  beforeEach(function() {
    pipeline = validatePipeline.validateJS;
  });

  it('should return a object', function () {
    (typeof validatePipeline).should.equal('object');
  });

  it('should contain a validateJS method', function() {
    pipeline.should.exist;
    (typeof pipeline).should.equal('function');
  });

  describe('validateJS method', function () {
    var stream;

    beforeEach(function() {
      stream = function() {return validatePipeline.validateJS();};
    });

    it('should return a stream', function() {
      isStream(stream()).should.equal(true);
    });

    describe('validateJS pipeline with no options', function() {
      var sandbox = {};
      var spy = {};

      beforeEach(function() {
        sandbox = sinon.sandbox.create();
        spy = sandbox.spy(handyman, 'log');
      });

      afterEach(function() {
        sandbox.restore();
      });

      it('should test validateJS() with no options', function() {
        validatePipeline.validateJS();
        spy.should.have.been.calledWith('Validading js with ESlint');
      });
    });

    describe('ValidateJS Pipeline with options', function() {
      var sandbox = {};
      var spy = {};
      var msg;

      beforeEach(function() {
        sandbox = sinon.sandbox.create();
        spy = sandbox.spy(handyman, 'log');
        msg = '';
      });

      afterEach(function() {
        sandbox.restore();
      });

      it('should test validateJS() with invalid options, number', function() {
        validatePipeline.validateJS(234);
        spy.should.have.been.calledWith('** Options not valid **');
      });

      it('should test validateJS() with invalid options, array', function() {
        validatePipeline.validateJS(['semi', 1]);
        spy.should.have.been.calledWith('** Options not valid **');
      });

      it('should test validateJS() with an invalid file path as an  option', function() {
        var fn = function() { validatePipeline.validateJS('.eslintrc1'); };

        fn.should.throw();
      });

      xit('should test validateJS() with valid url as options', function() {
        msg = 'Linting using /Users/RobertoHernandez/WebstormProjects/kenzanGit/keystone/pipeline-validate-js/.eslintrc3';
        validatePipeline.validateJS('./test/fixtures/.eslintrc3');

        spy.should.have.been.calledWith(msg);
      });

      it('should test validateJS() with valid object options', function() {
        validatePipeline.validateJS({ rules: { 'no-empty': 0 }});

        spy.should.have.been.calledWith('Custom configuration being applied');
      });
    });
  });

});