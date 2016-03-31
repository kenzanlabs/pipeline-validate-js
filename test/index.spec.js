'use strict';
var chai = require('chai');
var handyman = require('pipeline-handyman');
var isStream = require('isstream');
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
    pipeline = validatePipeline.validateJS;
    pipeline.should.exist;
    (typeof pipeline).should.equal('function');
  });

  describe('validateJS method', function () {
    var stream;

    beforeEach(function() {
      stream = function() {return pipeline();};
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
        pipeline();
        spy.should.have.been.calledWith('Validading js with ESlint');
      });
    });

    describe('ValidateJS Pipeline with options', function() {
      var sandbox = {};
      var spy = {};
      var msg;
      var url;

      beforeEach(function() {
        sandbox = sinon.sandbox.create();
        spy = sandbox.spy(handyman, 'log');
        msg = '';
      });

      afterEach(function() {
        sandbox.restore();
      });

      it('should test validateJS() with invalid options, number', function() {
        pipeline(234);
        spy.should.have.been.calledWith('** Options not valid **');
      });

      it('should test validateJS() with invalid options, array', function() {
        pipeline(['semi', 1]);
        spy.should.have.been.calledWith('** Options not valid **');
      });

      it('should test validateJS() with an invalid file path as an  option', function() {
        var fn = function() { pipeline('.eslintrc1'); };

        fn.should.throw();
      });

      it('should test validateJS() with valid object options', function() {
        pipeline({ 'rules': { 'no-empty': 0 }});

        spy.should.have.been.calledWith('Custom configuration being applied');
      });

      it('should test validateJS() with valid url as options', function() {
        url = './test/fixtures/.eslintrc3';
        msg = 'Linting using ' + url;
        pipeline('./test/fixtures/.eslintrc3');

        spy.should.have.been.calledWith(sinon.match(msg));
      });

    });
  });
});
