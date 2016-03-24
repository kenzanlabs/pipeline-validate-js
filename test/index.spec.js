'use strict';
var should = require('chai').should();
var sinon = require('sinon');
var handyman = require('pipeline-handyman');
var validatePipeline =  require('../src/index.js');
var gulp = require('gulp');

describe('pipeline-validateJS', function(){
  it('should return a object', function () {
    (typeof validatePipeline).should.equal('object');
  });

  it('should contain a validateJS method', function(){
    (validatePipeline.validateJS).should.exist;
    (typeof validatePipeline.validateJS).should.equal('function');
  });

  describe('validateJS method', function (){

    it('should return an object', function(){
      var stream = validatePipeline.validateJS();

      (typeof stream).should.equal('object');
    });

    describe('validateJS log outputs', function(){
      var sandbox, spy;

      beforeEach(function() {
        sandbox = sinon.sandbox.create();
        spy = sandbox.spy(handyman, 'log');
      });

      afterEach(function(){
        sandbox.restore();
      });

      it('should test validateJS() with no options', function() {
        validatePipeline.validateJS();
        (spy.args[0][0]).should.equal('Validading js with ESlint ecmaScript5');
      });

      it('should test validateJS() with invalid options, number', function() {
        validatePipeline.validateJS(234);
        (spy.args[0][0]).should.equal('Validading js with ESlint ecmaScript5, ** Options not valid **');
      });
      
      it('should test validateJS() with invalid options, array', function() {
        validatePipeline.validateJS(["semi", 1]);
        (spy.args[0][0]).should.equal('Validading js with ESlint ecmaScript5, ** Options not valid **');
      });

      it('should test validateJS() with an invalid file path as an  option', function() {
        var fn = function(){ validatePipeline.validateJS('.eslintrc1'); };

        (fn).should.throw();
      });

      it('should test validateJS() with ecmaVersion options', function() {
        //this code throws error because the ecmaVersion is not suposed  to be applien inside of rules object
        var fn = function (){validatePipeline.validateJS({ecmaVersion: 6})};

        (fn).should.throw();
      });

    });
  });
});