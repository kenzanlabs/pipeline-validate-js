'use strict';
var chai = require('chai');
var handyman = require('pipeline-handyman');
var sinon = require('sinon');
var validatePipeline = require('../src/index.js');

chai.should();

describe('pipeline-validateJS', function() {
  var pipeline = validatePipeline.validateJS;

  it('should return a object', function () {
    (typeof validatePipeline).should.equal('object');
  });

  it('should contain a validateJS method', function() {
    pipeline.should.exist;
    (typeof pipeline).should.equal('function');
  });

  describe('validateJS method', function () {
    it('should return an object', function() {
      var stream = validatePipeline.validateJS();

      (typeof stream).should.equal('object');
    });

    describe('validateJS log outputs', function() {
      var sandbox = {};
      var spy = {};
      var mySpy = {};

      beforeEach(function() {
        sandbox = sinon.sandbox.create();
        spy = sandbox.spy(handyman, 'log');
      });

      afterEach(function() {
        sandbox.restore();
      });

      it('should test validateJS() with no options', function() {
        validatePipeline.validateJS();
        mySpy = spy.args[0][0];
        mySpy.should.equal('Validading js with ESlint');
      });

      it('should test validateJS() with invalid options, number', function() {
        validatePipeline.validateJS(234);
        mySpy = spy.args[0][0];
        mySpy.should.equal('** Options not valid **');
      });

      it('should test validateJS() with invalid options, array', function() {
        validatePipeline.validateJS(['semi', 1]);
        mySpy = spy.args[0][0];
        mySpy.should.equal('** Options not valid **');
      });

      it('should test validateJS() with an invalid file path as an  option', function() {
        var fn = function() { validatePipeline.validateJS('.eslintrc1'); };

        fn.should.throw();
      });
    });
  });
});