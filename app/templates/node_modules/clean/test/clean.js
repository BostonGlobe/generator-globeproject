'use strict';

var clean = require('../');
var expect = require('chai').expect;

var node_path = require('path');
var node_url = require('url');

var schema = {
  cwd: {
    type: node_path
  },

  a: {
    type: Boolean
  },

  url: {
    type: node_url
  }
};

var shorthands = {
  'c': 'cwd'
}

describe(".parse()", function() {
  it("complex", function(done) {
    clean({
      schema: schema,
      shorthands: shorthands

    }).parse(['node', 'my command', '-c', 'abc', '-a', '--url', 'abc'], function(err, results) {
      done();
      expect(err).not.to.equal(null);
    });
  });

  it("#13, default value", function(done){
    var schema = {
      cwd: {
        type: node_path
      },

      a: {
        type: Boolean,
        default: true
      }
    };

    clean({
      schema: schema,
      shorthands: shorthands

    }).parse(['node', 'my command', '-c', 'abc', '--url', 'abc'], function(err, results, details) {
      done();
      expect(err).to.equal(null);
      expect(results.cwd).to.equal(node_path.resolve('abc'));
      expect(results.a).to.equal(true);
    });
  });

  it("#13, negative default", function(done){
    var schema = {
      cwd: {
        type: node_path
      },

      a: {
        type: Boolean,
        default: true
      }
    };

    clean({
      schema: schema,
      shorthands: shorthands

    }).parse(['node', 'my command', '-c', 'abc', '--url', 'abc', '--no-a'], function(err, results, details) {
      done();
      expect(err).to.equal(null);
      expect(results.cwd).to.equal(node_path.resolve('abc'));
      expect(results.a).to.equal(false);
    });
  });
});


describe(".argv(argv)", function(){
  it("#12: boolean type", function(){
    var data = clean({
      schema: {
        boolean: {
          type: Boolean
        },
        blah: {
          type: Boolean
        },
        boo: {

        }
      },
      shorthands: {
        'g': 'blah'
      }
    }).argv('node xxxx --boolean abc -g ccc --boo a'.split(' '));
    expect(data.boolean).to.equal(true);
    expect(data.blah).to.equal(true);
    expect(data.boo).to.equal('a');
    expect(data._).to.deep.equal(['abc', 'ccc']);
  });
});


describe(".clean()", function() {
  it("default value of String should be ''", function(done) {
    clean({
      schema: {
        a: {
          type: String
        },
        b: {
          type: String,
          default: null
        }
      }
    }).clean({}, function(err, results) {
      done();

      expect(results.a).to.equal('');
      expect(results.b).to.equal('');
    });
  });
});


describe("options.parallel", function(){
  function run (option, result, done) {
    var flag;
    clean({
      parallel: option,
      schema: {
        a: {
          set: function (v) {
            var done = this.async();
            setTimeout(function () {
              expect(flag).to.equal(result);
              done(null, v);
            }, 100);
          }
        },
        b: {
          set: function (v) {
            var done = this.async();
            setTimeout(function () {
              flag = true;
              done(null, v);
            }, 0);
          }
        }
      }
    }).clean({}, function (err) {
      expect(err).to.equal(null);
      done();
    });
  }

  it("parallel: true", function(done){
    run(true, true, done);
  });

  it("parallel: false", function(done){
    run(false, undefined, done);
  });

  it("parallel, default", function(done){
    run(undefined, undefined, done);
  });
});


describe("option.limit", function(){
  function run (limit, result, done) {
    clean({
      limit: limit,
      schema: {
        a: {},
        b: {
          set: function (v) {
            return v + 1;
          }
        }
      }
    }).clean({
      a: 1,
      b: 2,
      c: 3
    }, function (err, r) {
      expect(err).to.equal(null);
      expect(r).to.deep.equal(result);
      done();
    });
  }

  it("limit: true", function(done){
    run(true, {a: 1, b: 3}, done);
  });

  it("limit: false", function(done){
    run(false, {a: 1, b: 3, c: 3}, done);
  });

  it("limit: default", function(done){
    run(undefined, {a: 1, b: 3, c: 3}, done);
  });
});


describe("options.context, feated with this.get() and this.set()", function(){
  it("could get cleaned data", function(done){
    clean({
      schema: {
        a: {
          set: function (v) {
            return v + 100;
          }
        },
        b: {
          set: function (v) {
            return this.get('a')
          }
        }
      }

    }).clean({
      a: 1,
      b: 2,
      c: 3
    }, function (err, results) {
      expect(err).to.equal(null);
      expect(results).to.deep.equal({
        a: 101,
        b: 101,
        c: 3
      });
      done();
    });
  });

  it("could get uncleaned data", function(done){
    clean({
      schema: {
        a: {
          set: function (v) {
            return v + 100;
          }
        },
        b: {
          set: function (v) {
            return this.get('a') + this.get('c');
          }
        }
      }

    }).clean({
      a: 1,
      b: 2,
      c: 3
    }, function (err, results) {
      expect(err).to.equal(null);
      expect(results).to.deep.equal({
        a: 101,
        b: 104,
        c: 3
      });
      done();
    });
  });

  it("could set data", function(done){
    clean({
      schema: {
        a: {
          set: function (v) {
            return v + 100;
          }
        },
        b: {
          set: function (v) {
            var c = this.get('c');
            var a = this.get('a');

            this.set('c', 1000);
            this.set('a', 1001)
            return a + c;
          }
        }
      }

    }).clean({
      a: 1,
      b: 2,
      c: 3
    }, function (err, results) {
      expect(err).to.equal(null);
      expect(results).to.deep.equal({
        a: 1001,
        b: 104,
        c: 1000
      });
      done();
    });
  });
});


describe("shorthands", function(){
  var shorthands = {
    s: 'string',
    b: 'boolean',
    n: 'number'
  };

  function parse (argv) {
    return clean({
      schema: {
        string: {
          type: String
        },
        boolean: {
          type: Boolean
        },
        number: {
          type: Number
        }
      },
      shorthands: shorthands
    }).argv(argv.split(' '));
  }

  it("number type", function(){
    expect(parse('node xxx -n 1').number).to.equal(1);
  });

  it("boolean type", function(){
    expect(parse('node xxx -b').boolean).to.equal(true);
  });

  it("string type", function(){
    expect(parse('node xxx -s abc').string).to.equal('abc');
  });
});
