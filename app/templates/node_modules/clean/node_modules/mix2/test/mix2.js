'use strict';

var expect = require('chai').expect;
var mix = require('../');

describe("mix", function(){
  it("null", function(){
    mix(null, null);
  });

  it("null receiver", function(){
    mix(null, {a: 1});
  });

  it("null supplier", function(){
    var a = {a: 1};
    mix(a, null)
    expect(a).to.deep.equal({a: 1});
  });

  it("mix(a, b), normal", function(){
    var a = {a: 1};
    var b = {b: 2};
    var result = mix(a, b);
    expect(a).to.equal(result);
    expect(a).to.deep.equal({a: 1, b: 2});
  });

  it("mix(a, b), override", function(){
    var a = {a: 1};
    var b = {a: 2};
    var result = mix(a, b);
    expect(a).to.equal(result);
    expect(a).to.deep.equal({a: 2});
  });

  it("mix(a, b, true)", function(){
    var a = {a: 1};
    var b = {a: 2};
    var result = mix(a, b, true);
    expect(a).to.equal(result);
    expect(a).to.deep.equal({a: 2});
  });

  it("mix(a, b, false)", function(){
    var a = {a: 1};
    var b = {a: 2};
    var result = mix(a, b, false);
    expect(a).to.equal(result);
    expect(a).to.deep.equal({a: 1});
  });

  it("mix(a, b, true, list)", function(){
    var a = {a: 1};
    var b = {a: 2, b: 3, c: 4};
    var result = mix(a, b, true, ['a', 'b']);
    expect(a).to.equal(result);
    expect(a).to.deep.equal({a: 2, b: 3});
  });

  it("mix(a, b, true, list), nothing to override", function(){
    var a = {a: 1};
    var b = {a: 2, b: 3, c: 4};
    var result = mix(a, b, true, ['c', 'b']);
    expect(a).to.equal(result);
    expect(a).to.deep.equal({a: 1, c: 4, b: 3});
  });

  it("mix(a, b, false, list)", function(){
    var a = {a: 1};
    var b = {a: 2, b: 3, c: 4};
    var result = mix(a, b, false, ['a', 'b']);
    expect(a).to.equal(result);
    expect(a).to.deep.equal({a: 1, b: 3});
  });
});
