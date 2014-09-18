'use strict';

var Cleaner = require('../lib/cleaner');
var expect = require('chai').expect;

var node_path = require('path');
var node_url = require('url');

describe("cleaner", function(){
  it("normal, only setter", function(done){
    var c = new Cleaner({
      set: function (v) {
        return v + 1;
      }
    }, {}, 'a');

    c.clean(1, [], function (err, v) {
      expect(err).to.equal(null);
      expect(v).to.equal(2);
      done();
    });
  });

  it("normal, only validator", function(done){
    var c = new Cleaner({
      validate: function (v) {
        return v > 0;
      }
    }, {}, 'a');

    c.clean(1, [], function (err, v) {
      expect(err).to.equal(null);

      c.clean(0, [], function (err, v) {
        expect(err).not.to.equal(null);
        done();
      });
    });
  });

  it("required", function(done){
    var c = new Cleaner({
      required: true
    }, {}, 'a');

    c.clean(undefined, [true], function (err, v) {
      expect(err).not.to.equal(null);
      done();
    });
  });
});


describe("types", function(){
  var d1 = new Date();
  var d2 = 'Tue Aug 12 2014 21:51:09 GMT+0800 (CST)';
  var u = 'http://kael.me';
  var p = '.'

  var cases = [
    // type, value, is_default, err, value
    ['Number', '1', false, null, 1],
    ['Number', 1, true, null, 1],
    ['Number', 'a', false, TypeError],
    ['String', undefined, true, null, ''],
    ['String', 'undefined', false, null, 'undefined'],
    ['Boolean', undefined, true, null, false],
    ['Boolean', true, true, null, true],
    ['Boolean', false, false, null, false],
    ['Boolean', 'false', false, null, false],
    ['Boolean', 'true', false, null, true],
    ['Boolean', 'abc', false, null, true],
    ['Date', undefined, true, null, undefined],
    ['Date', d1, false, null, d1],
    ['Date', d1, true, null, d1],
    ['Date', d2, true, null, new Date(d2)],
    ['Date', 'abc', true, TypeError],
    ['url', undefined, true, null, undefined],
    ['url', '123', true, TypeError],
    ['url', u, true, null, node_url.parse(u).href],
    ['path', undefined, true, null, undefined],
    ['path', p, false, null, node_path.resolve(p)]
  ];

  var types = {
    'number': Number,
    'string': String,
    'boolean': Boolean,
    'date': Date,
    'url': node_url,
    'path': node_path
  };

  function run (c, o) {
    var t = o
      ? types[c[0].toLowerCase()]
      : c[0];
    var v = c[1];
    var args = [c[2]];
    var e = c[3];
    var nv = c[4];
    it((o ? 'Type object: ': 'Type string: ') + c.join(', '), function(done){
      var cleaner = new Cleaner({
        type: t
      }, {});

      cleaner.clean(v, args, function (err, value) {
        if (e === null) {
          expect(err).to.equal(e);
          expect(value).to.deep.equal(nv);
        } else {
          expect(err instanceof e).to.equal(true);
        }

        done();
      });
    });
  }

  cases.forEach(function (c) {
    run(c);
    run(c, true);
  });
});
